import { examResults } from "@/content/site-content";

export function ResultsSection() {
  return (
    <section id="results" className="px-4 py-14 md:px-8 md:py-18">
      <div className="mx-auto max-w-6xl">
        <p className="section-tag">Результаты</p>
        <h2 className="section-title">Баллы ЕГЭ 2025 и фокус на реальные достижения</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Каждый результат - это системная работа: диагностика, понятные
          объяснения, регулярные домашние задания и точечная работа с ошибками.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {examResults.map((result, index) => (
            <article
              key={`${result.score}-${index}`}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-slate-900/70 p-5 text-center"
            >
              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl transition group-hover:bg-amber-300/30" />
              <p className="relative text-5xl font-semibold text-amber-200">
                {result.score}
              </p>
              <p className="relative mt-2 text-xs uppercase tracking-[0.2em] text-slate-300">
                {result.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
