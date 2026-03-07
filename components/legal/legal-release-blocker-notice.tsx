import { legalReleaseBlockers } from "@/content/legal-content";

export function LegalReleaseBlockerNotice() {
  if (!legalReleaseBlockers.length) {
    return null;
  }

  return (
    <section className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
      <p className="font-semibold">
        Публичный запуск сайта заблокирован до заполнения обязательных юридических данных.
      </p>
      <ul className="mt-2 list-disc space-y-1 pl-5">
        {legalReleaseBlockers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
