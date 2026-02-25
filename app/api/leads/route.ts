import { NextResponse } from "next/server";

import { leadSchema } from "@/lib/lead-schema";
import { checkRateLimit, markIdempotencyKey } from "@/lib/rate-limit";
import { sendLeadToTelegram } from "@/lib/telegram";

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() || "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";

  return `${ip}:${userAgent}`;
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        code: "INVALID_JSON",
        message: "Некорректный формат запроса",
      },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || "Проверьте поля формы";

    return NextResponse.json(
      {
        ok: false,
        code: "VALIDATION_ERROR",
        message: firstIssue,
      },
      { status: 400 },
    );
  }

  const payload = parsed.data;

  if (payload.company) {
    return NextResponse.json({
      ok: true,
      message: "Заявка принята",
    });
  }

  const rateLimit = checkRateLimit(getClientKey(request));

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        ok: false,
        code: "RATE_LIMITED",
        message: "Слишком много попыток. Повторите позже.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((rateLimit.resetAt - Date.now()) / 1000).toString(),
        },
      },
    );
  }

  const duplicate = markIdempotencyKey(payload.idempotencyKey);

  if (duplicate) {
    return NextResponse.json(
      {
        ok: false,
        code: "DUPLICATE_LEAD",
        message: "Похоже, эта заявка уже отправлена.",
      },
      { status: 409 },
    );
  }

  try {
    await sendLeadToTelegram(payload);

    return NextResponse.json({
      ok: true,
      message: "Заявка отправлена. Скоро свяжусь с вами.",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Не удалось отправить заявку";

    if (errorMessage.includes("TELEGRAM_CONFIG_MISSING")) {
      return NextResponse.json(
        {
          ok: false,
          code: "TELEGRAM_CONFIG_MISSING",
          message: "Сервис временно недоступен. Напишите в Telegram напрямую.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        ok: false,
        code: "TELEGRAM_SEND_FAILED",
        message: "Ошибка отправки. Попробуйте позже или напишите напрямую.",
      },
      { status: 502 },
    );
  }
}
