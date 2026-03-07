# Деплой `easychemistry.ru` на shared VPS

Этот runbook рассчитан на ручной деплой по SSH и shared VPS, где уже работает другой сайт.

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
docker --version
docker compose version
ss -ltnp
sudo nginx -T
sudo systemctl status nginx
sudo systemctl status caddy
```

Что нужно подтвердить:

- какой reverse proxy уже используется для `odi-group.ru`
- свободен ли `127.0.0.1:3001`
- установлен ли Docker Compose
- можно ли безопасно добавить второй virtual host, не затрагивая существующий сайт

Если на сервере уже используется Caddy или другой ingress, не поднимайте параллельно новый Nginx. Перенесите тот же upstream и redirect в существующую схему.

## 2. Подготовка репозитория на VPS

```bash
git pull --ff-only origin main
cp .env.example .env
```

Заполните `.env` production-значениями. Для Docker-сборки особенно важны `NEXT_PUBLIC_SITE_URL` и `NEXT_PUBLIC_YANDEX_METRIKA_ID`, потому что они встраиваются в Next.js на этапе `docker compose build`.

Перед публичным запуском заполните юридические поля в `content/legal-content.ts`.

## 3. Сборка и запуск приложения

```bash
docker compose build
docker compose up -d
docker compose ps
docker compose logs --tail=100 web
```

Сервис должен слушать только `127.0.0.1:3001`, а наружу трафик должен идти только через reverse proxy.

## 4. Nginx для `easychemistry.ru`

Если на VPS уже есть host-level Nginx, возьмите шаблон из `docs/deployment/nginx.easychemistry.ru.conf`, установите его как новый server block и выпустите сертификат на `easychemistry.ru` и `www.easychemistry.ru`.

После установки конфига:

```bash
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d easychemistry.ru -d www.easychemistry.ru
sudo systemctl reload nginx
```

## 5. Smoke test после выкладки

```bash
curl -I http://127.0.0.1:3001/api/health
curl -I https://easychemistry.ru
curl -I https://www.easychemistry.ru
curl https://easychemistry.ru/api/health
curl https://easychemistry.ru/robots.txt
curl https://easychemistry.ru/sitemap.xml
```

Проверьте дополнительно:

- форма отправляет тестовую заявку в Telegram
- в HTML/клиентском бандле есть production ID Яндекс.Метрики
- legal-страницы не содержат `TODO` и тестовых заглушек
- `odi-group.ru` продолжает корректно отвечать после reload proxy

## 6. Rollback

Если новый релиз работает некорректно:

```bash
git log --oneline -n 5
git checkout <previous-stable-commit>
docker compose build
docker compose up -d
```

После отката повторите smoke test для `easychemistry.ru` и `odi-group.ru`.
