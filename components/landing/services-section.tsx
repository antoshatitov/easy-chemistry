import { services } from "@/content/site-content";

export function ServicesSection() {
  return (
    <section id="services" className="px-4 py-14 md:px-8 md:py-18">
      <div className="mx-auto max-w-6xl">
        <p className="section-tag">Услуги</p>
        <h2 className="section-title">Форматы подготовки под ваш уровень и цель</h2>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.03] p-6"
            >
              <div className="absolute -left-14 -top-14 h-36 w-36 rounded-full bg-cyan-300/10 blur-3xl" />
              <h3 className="relative text-2xl font-semibold text-white">{service.title}</h3>
              <p className="relative mt-3 text-base leading-relaxed text-slate-300">
                {service.description}
              </p>
              <p className="relative mt-4 text-xl font-semibold text-amber-200">
                {service.price}
              </p>
              <p className="relative mt-3 rounded-xl border border-amber-200/30 bg-amber-200/10 px-3 py-2 text-sm text-amber-100">
                {service.accent}
              </p>
              <a
                href="#contacts"
                className="relative mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/30 bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:border-amber-200"
              >
                Оставить заявку
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
