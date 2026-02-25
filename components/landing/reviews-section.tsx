import { reviewSources } from "@/content/site-content";

export function ReviewsSection() {
  return (
    <section id="reviews" className="px-4 py-14 md:px-8 md:py-18">
      <div className="mx-auto max-w-6xl">
        <p className="section-tag">Отзывы</p>
        <h2 className="section-title">Публичные отзывы на независимых площадках</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
          Источники с отзывами открыты и доступны по ссылкам. Скриншоты можно
          добавить в этот блок перед production-запуском.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviewSources.map((source) => (
            <article
              key={source.link}
              className="rounded-3xl border border-white/15 bg-slate-900/55 p-5"
            >
              <p className="text-xl font-semibold text-white">{source.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                {source.description}
              </p>
              <a
                href={source.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-full border border-cyan-200/40 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200"
              >
                Открыть источник
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
