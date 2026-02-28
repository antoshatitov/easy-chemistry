export type MetricGoal = "form_submit" | "contact_click" | "telegram_click" | "vk_click";

declare global {
  interface Window {
    ym?: (
      id: number,
      action: string,
      goal: string,
      params?: Record<string, string>,
    ) => void;
  }
}

export function reachGoal(goal: MetricGoal, params?: Record<string, string>) {
  if (typeof window === "undefined") {
    return;
  }

  const metrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  if (!metrikaId || !window.ym) {
    return;
  }

  const parsedId = Number(metrikaId);

  if (!Number.isFinite(parsedId)) {
    return;
  }

  window.ym(parsedId, "reachGoal", goal, params);
}
