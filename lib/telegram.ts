import type { LeadPayload } from "@/lib/lead-schema";

function mapGoal(goal: LeadPayload["goal"]) {
  switch (goal) {
    case "oge":
      return "ОГЭ";
    case "ege":
      return "ЕГЭ";
    case "olympiad":
      return "Олимпиада";
    default:
      return "Другое";
  }
}

function mapFormat(format: LeadPayload["format"]) {
  return format === "individual" ? "Индивидуально" : "Групповое";
}

function mapRequestType(requestType: LeadPayload["requestType"]) {
  return requestType === "lesson" ? "Занятие" : "Консультация";
}

export async function sendLeadToTelegram(payload: LeadPayload) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("TELEGRAM_CONFIG_MISSING");
  }

  const textLines = [
    "Новая заявка Easy Chemistry",
    "",
    `Тип заявки: ${mapRequestType(payload.requestType)}`,
    `Имя: ${payload.name}`,
    `Контакт: ${payload.contact}`,
    `Цель: ${mapGoal(payload.goal)}`,
    `Формат: ${mapFormat(payload.format)}`,
    `Комментарий: ${payload.comment || "-"}`,
    `Источник: ${payload.source}`,
    `Ключ идемпотентности: ${payload.idempotencyKey}`,
  ];

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: textLines.join("\n"),
      }),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`TELEGRAM_SEND_FAILED:${response.status}:${body}`);
  }

  return response.json();
}
