"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  leadGoalOptions,
  lessonFormatOptions,
  metricGoals,
  requestTypeOptions,
} from "@/content/site-content";
import { reachGoal } from "@/lib/metrics";

type FormStatus =
  | { type: "idle" }
  | { type: "loading" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

function generateIdempotencyKey() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export function LeadForm({ source }: { source: string }) {
  const [status, setStatus] = useState<FormStatus>({ type: "idle" });
  const [idempotencyKey, setIdempotencyKey] = useState(generateIdempotencyKey);

  const isPending = status.type === "loading";

  const statusClassName = useMemo(() => {
    if (status.type === "success") {
      return "border-emerald-400/50 bg-emerald-500/15 text-emerald-100";
    }

    if (status.type === "error") {
      return "border-rose-400/50 bg-rose-500/15 text-rose-100";
    }

    return "";
  }, [status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isPending) {
      return;
    }

    setStatus({ type: "loading" });

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const payload = {
      name: String(formData.get("name") || ""),
      contact: String(formData.get("contact") || ""),
      goal: String(formData.get("goal") || ""),
      format: String(formData.get("format") || ""),
      requestType: String(formData.get("requestType") || ""),
      comment: String(formData.get("comment") || ""),
      consent: formData.get("consent") === "on",
      source,
      company: String(formData.get("company") || ""),
      idempotencyKey,
    };

    const timeoutMs = 12_000;
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, timeoutMs);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const responseData = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !responseData?.ok) {
        setStatus({
          type: "error",
          message: responseData?.message ||
            "Не удалось отправить заявку. Попробуйте позже.",
        });

        return;
      }

      setStatus({
        type: "success",
        message: responseData.message || "Заявка отправлена.",
      });

      reachGoal(metricGoals.formSubmit, {
        source,
        type: payload.requestType,
        format: payload.format,
      });

      formElement.reset();
      setIdempotencyKey(generateIdempotencyKey());
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setStatus({
          type: "error",
          message: "Сервер долго отвечает. Попробуйте отправить заявку ещё раз.",
        });

        return;
      }

      setStatus({
        type: "error",
        message: "Ошибка соединения. Попробуйте позже или напишите в Telegram.",
      });
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <form
      className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur md:p-6"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-1.5 text-sm text-slate-100 md:col-span-2">
          Имя
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            className="min-h-11 rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
            placeholder="Как к вам обращаться?"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-100 md:col-span-2">
          Контакт (телефон или Telegram)
          <input
            name="contact"
            autoComplete="tel"
            required
            className="min-h-11 rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
            placeholder="+7... или @username"
          />
        </label>

        <label className="grid gap-1.5 text-sm text-slate-100">
          Цель
          <select
            name="goal"
            required
            defaultValue={leadGoalOptions[0]?.value}
            className="min-h-11 rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
          >
            {leadGoalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-100">
          Формат
          <select
            name="format"
            required
            defaultValue={lessonFormatOptions[0]?.value}
            className="min-h-11 rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
          >
            {lessonFormatOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-100 md:col-span-2">
          Тип заявки
          <select
            name="requestType"
            required
            defaultValue={requestTypeOptions[0]?.value}
            className="min-h-11 rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
          >
            {requestTypeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1.5 text-sm text-slate-100 md:col-span-2">
          Комментарий
          <textarea
            name="comment"
            rows={4}
            className="rounded-xl border border-white/30 bg-slate-950/60 px-3 py-2 text-base text-white outline-none transition focus:border-amber-300"
            placeholder="Укажите класс, текущий уровень и цель по баллам"
          />
        </label>

        <div className="pointer-events-none absolute -left-[9999px] -top-[9999px]" aria-hidden="true">
          <label>
            Company
            <input name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className="md:col-span-2 flex items-start gap-2 text-sm leading-relaxed text-slate-200">
          <input
            type="checkbox"
            name="consent"
            required
            className="mt-1 h-5 w-5 shrink-0 accent-amber-400"
          />
          <span>
            Даю согласие на обработку персональных данных и принимаю условия
            <a className="underline decoration-amber-300 underline-offset-4" href="/legal/privacy">
              {" "}
              политики конфиденциальности
            </a>
            <span>, </span>
            <a className="underline decoration-amber-300 underline-offset-4" href="/legal/consent">
              согласия
            </a>
            <span> и </span>
            <a className="underline decoration-amber-300 underline-offset-4" href="/legal/terms">
              пользовательского соглашения
            </a>
            .
          </span>
        </label>
      </div>

      <input type="hidden" name="idempotencyKey" value={idempotencyKey} readOnly />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-300/70 bg-amber-300 px-6 py-2.5 text-base font-semibold text-slate-900 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Отправляем..." : "Отправить заявку"}
        </button>
        <p className="text-xs text-slate-300">
          Нажимая кнопку, вы отправляете заявку в Telegram-чат.
        </p>
      </div>

      {(status.type === "success" || status.type === "error") && (
        <p className={`mt-4 rounded-xl border px-4 py-3 text-sm ${statusClassName}`}>
          {status.message}
        </p>
      )}
    </form>
  );
}
