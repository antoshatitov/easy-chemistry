# Деплой `easychemistry.ru` на shared VPS

Этот runbook рассчитан на ручной деплой по SSH и shared VPS, где уже работает другой сайт.
Текущий production-сценарий для `easychemistry.ru` использует `systemd` и Next.js standalone build.

## Production inputs

До публичного запуска должны быть готовы:

- `NEXT_PUBLIC_SITE_URL=https://easychemistry.ru`
- `NEXT_PUBLIC_YANDEX_METRIKA_ID`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- юридический статус оператора
- email для правовых запросов
- контакт для отзыва согласия
- условия оплаты и возврата

## 1. Безопасная read-only инспекция VPS

Перед любыми изменениями проверьте текущее состояние сервера:

```bash
uname -a
cat /etc/os-release
ss -ltnp
sudo nginx -T
sudo systemctl status nginx
sudo systemctl status caddy
sudo systemctl status easychemistry.service
```

Что нужно подтвердить:

- какой reverse proxy уже используется для `odi-group.ru`
- слушает ли `127.0.0.1:3001` сервис `easychemistry.service`
- запускается ли приложение из `~/easy-chemistry/.next/standalone`
- можно ли безопасно добавить второй virtual host, не затрагивая существующий сайт

Если на сервере уже используется Caddy или другой ingress, не поднимайте параллельно новый Nginx. Перенесите тот же upstream и redirect в существующую схему.

## 2. Подготовка репозитория на VPS

```bash
git pull --ff-only origin main
cp .env.example .env
```

Заполните `.env` production-значениями. Для standalone-сборки особенно важны `NEXT_PUBLIC_SITE_URL` и `NEXT_PUBLIC_YANDEX_METRIKA_ID`, потому что они встраиваются в Next.js на этапе `npm run build:standalone`.

Перед публичным запуском заполните юридические поля в `content/legal-content.ts`.

## 3. Сборка и запуск приложения через systemd

```bash
npm ci
npm run build:standalone
sudo systemctl restart easychemistry.service
sudo systemctl status easychemistry.service --no-pager
```

Сервис должен слушать только `127.0.0.1:3001`, а наружу трафик должен идти только через reverse proxy.

Команда `npm run build:standalone`:

- запускает `next build`
- копирует `.next/static` в `.next/standalone/.next/static`
- копирует `public` в `.next/standalone/public`

Без этого шага standalone-сервер может отдавать HTML, но не отдавать CSS, JS и статические изображения.

## 4. systemd unit для production

Возьмите шаблон из `docs/deployment/easychemistry.service` и установите его как `/etc/systemd/system/easychemistry.service`.
Критичная строка в юните - `ExecStartPre`: она синхронизирует `public` и `.next/static` перед каждым рестартом сервиса и не дает снова получить "голый" HTML после обычного `next build`.
В шаблоне есть fallback для rollback на более старые стабильные коммиты, где еще нет `scripts/prepare-standalone.mjs` или команды `npm run build:standalone`.

Пример юнита:

```ini
[Unit]
Description=Easy Chemistry Next.js standalone app
After=network.target

[Service]
Type=simple
User=anton
WorkingDirectory=/home/anton/easy-chemistry/.next/standalone
Environment=NODE_ENV=production
Environment=HOSTNAME=127.0.0.1
Environment=PORT=3001
EnvironmentFile=/home/anton/easy-chemistry/.env
ExecStartPre=/bin/sh -lc 'cd /home/anton/easy-chemistry && if [ -f scripts/prepare-standalone.mjs ]; then /usr/bin/node scripts/prepare-standalone.mjs; else mkdir -p .next/standalone/.next && rm -rf .next/standalone/.next/static .next/standalone/public && cp -a .next/static .next/standalone/.next/ && cp -a public .next/standalone/; fi'
ExecStart=/usr/bin/node /home/anton/easy-chemistry/.next/standalone/server.js
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

После обновления юнита:

```bash
sudo systemctl daemon-reload
sudo systemctl restart easychemistry.service
sudo systemctl status easychemistry.service --no-pager
```

## 5. Nginx для `easychemistry.ru`

Если на VPS уже есть host-level Nginx, возьмите шаблон из `docs/deployment/nginx.easychemistry.ru.conf`, установите его как новый server block и выпустите сертификат на `easychemistry.ru` и `www.easychemistry.ru`.

После установки конфига:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d easychemistry.ru -d www.easychemistry.ru
sudo systemctl reload nginx
```

## 6. Smoke test после выкладки

```bash
curl -I http://127.0.0.1:3001/api/health
curl -I https://easychemistry.ru
curl -I https://www.easychemistry.ru
curl https://easychemistry.ru/api/health
curl https://easychemistry.ru/robots.txt
curl https://easychemistry.ru/sitemap.xml
CSS_PATH=$(curl -s http://127.0.0.1:3001 | grep -o '/_next/static/chunks/[^"]*\.css' | head -1)
curl -I "http://127.0.0.1:3001$CSS_PATH"
curl -I "https://easychemistry.ru$CSS_PATH"
curl -I https://easychemistry.ru/images/teacher/teacher-photo-960.webp
```

Проверьте дополнительно:

- форма отправляет тестовую заявку в Telegram
- в HTML/клиентском бандле есть production ID Яндекс.Метрики
- legal-страницы не содержат `TODO` и тестовых заглушек
- `/_next/static/...css` отвечает `200 OK`
- в `.next/standalone/.next/static` и `.next/standalone/public` есть файлы после сборки
- `odi-group.ru` продолжает корректно отвечать после reload proxy

## 7. Rollback

Если новый релиз работает некорректно:

```bash
git log --oneline -n 5
git checkout <previous-stable-commit>
npm ci
npm run build
sudo systemctl restart easychemistry.service
```

После отката повторите smoke test для `easychemistry.ru` и `odi-group.ru`.
Даже для старых ревизий `easychemistry.service` сам досинхронизирует `.next/static` и `public` через fallback в `ExecStartPre`.

## 8. Быстрая диагностика "голого" HTML без стилей

Если страница открывается, но выглядит как неоформленный HTML:

```bash
CSS_PATH=$(curl -s http://127.0.0.1:3001 | grep -o '/_next/static/chunks/[^"]*\.css' | head -1)
curl -I "http://127.0.0.1:3001$CSS_PATH"
ls -lah .next/static/chunks | head
ls -lah .next/standalone/.next/static/chunks | head
ls -lah .next/standalone/public/images/teacher
```

Если `./.next/static` заполнена, а `./.next/standalone/.next/static` или `./.next/standalone/public` пусты, повторите:

```bash
npm run build:standalone
sudo systemctl restart easychemistry.service
```
