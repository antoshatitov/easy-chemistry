import { contacts, metricGoals, teacherProfile } from "@/content/site-content";
import { TrackedLink } from "@/components/analytics/tracked-link";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36"
    >
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src="/hero-background.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/72" />
      <div className="absolute -left-24 top-12 -z-10 h-52 w-52 rounded-full bg-amber-300/35 blur-3xl md:h-72 md:w-72" />
      <div className="absolute bottom-0 right-0 -z-10 h-56 w-56 translate-x-1/4 rounded-full bg-cyan-300/35 blur-3xl md:h-72 md:w-72" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-end">
        <div className="space-y-6 animate-enter">
          <p className="inline-flex rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-100">
            {teacherProfile.classes}
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.06] text-white md:text-6xl">
            {teacherProfile.fullName}
          </h1>
          <p className="max-w-2xl text-lg text-slate-100 md:text-xl">
            {teacherProfile.offer}
          </p>
          <p className="max-w-2xl text-xl font-semibold text-amber-200 md:text-2xl">
            {teacherProfile.tagline}
          </p>
          <p className="max-w-xl rounded-2xl border border-white/25 bg-white/10 px-4 py-3 text-base text-slate-100 backdrop-blur">
            {teacherProfile.yearResults}
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-200"
            >
              Записаться на занятие
            </a>
            <a
              href="#contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 bg-slate-900/45 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
            >
              Записаться на консультацию
            </a>
          </div>
        </div>

        <aside className="rounded-3xl border border-white/25 bg-white/10 p-5 text-slate-100 shadow-2xl backdrop-blur-xl md:p-6 animate-enter-delayed">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-100">Быстрый контакт</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Написать сейчас</h2>
          <p className="mt-3 text-base text-slate-200">
            Нужна консультация по подготовке или разбор программы? Напишите в
            Telegram и я помогу выстроить индивидуальный маршрут.
          </p>
          <TrackedLink
            href={contacts.telegramHref}
            target="_blank"
            rel="noopener noreferrer"
            goal={metricGoals.telegramClick}
            className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-cyan-200/60 bg-cyan-300/90 px-4 py-2 text-base font-semibold text-slate-900 transition hover:bg-cyan-200"
          >
            Написать в Telegram
          </TrackedLink>
          <p className="mt-3 text-sm text-slate-300">{contacts.telegramDisplay}</p>
        </aside>
      </div>
    </section>
  );
}
