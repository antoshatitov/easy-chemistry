# Easy Chemistry

Одностраничный сайт репетитора по химии (MVP) на `Next.js + TypeScript + Tailwind`.

## Что реализовано

- Лендинг с секциями: Главная, О себе, Результаты, Услуги, Отзывы, Контакты.
- Единая лид-форма (занятие/консультация) с отправкой в Telegram Bot API.
- Защита формы: honeypot, rate limit, idempotency key.
- Подключение Яндекс.Метрики и события:
  - `form_submit`
  - `contact_click`
  - `telegram_click`
- SEO на запуске:
  - metadata (title/description/OG/canonical)
  - `robots.txt`
  - `sitemap.xml`
  - schema.org (`Person`, `Service`, `Offer`)
- Юридические страницы:
  - `/legal/privacy`
  - `/legal/consent`
  - `/legal/terms`
- Production-контур через Docker Compose.

## Локальный запуск

```bash
npm install
cp .env.example .env
npm run dev
```

Сайт будет доступен на `http://localhost:3000`.

## Проверки

```bash
npm run lint
npm run typecheck
npm run build
```

## Переменные окружения

См. `.env.example`.

Критичные переменные:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `NEXT_PUBLIC_YANDEX_METRIKA_ID`
- `NEXT_PUBLIC_SITE_URL`

## Docker (VPS-ready)

```bash
docker compose build
docker compose up -d
```

## TODO перед production

- Заполнить реальные контакты (телефон, `@telegram`, рабочие часы).
- Подставить юридические реквизиты в legal-страницы.
- Добавить скриншоты отзывов в `public/` и вывести в блоке отзывов.
- Указать финальный домен в `NEXT_PUBLIC_SITE_URL`.
