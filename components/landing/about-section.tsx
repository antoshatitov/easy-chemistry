import {
  achievements,
  education,
  experience,
  teacherProfile,
} from "@/content/site-content";

export function AboutSection() {
  return (
    <section id="about" className="px-4 py-14 md:px-8 md:py-18">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="section-tag">О преподавателе</p>
            <h2 className="section-title">Системная подготовка с понятными объяснениями</h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300">
              {teacherProfile.intro}
            </p>
            <p className="mt-3 text-base leading-relaxed text-amber-200">
              {teacherProfile.support}
            </p>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-5 md:p-6">
            <h3 className="text-xl font-semibold text-white">Ключевые факты</h3>
            <ul className="mt-4 grid gap-2.5 text-sm leading-relaxed text-slate-300 md:text-base">
              {achievements.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/15 bg-slate-900/60 p-5 md:p-6">
            <h3 className="text-lg font-semibold text-white">Образование</h3>
            <ul className="mt-4 space-y-3">
              {education.map((item) => (
                <li key={`${item.title}-${item.years}`} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-medium text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.details}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-amber-200">
                    {item.years}
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-white/15 bg-slate-900/60 p-5 md:p-6">
            <h3 className="text-lg font-semibold text-white">Опыт</h3>
            <ul className="mt-4 space-y-3">
              {experience.map((item) => (
                <li key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                  <p className="font-medium text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-300">{item.details}</p>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
