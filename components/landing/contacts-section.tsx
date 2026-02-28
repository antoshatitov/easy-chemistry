import { LeadForm } from "@/components/lead-form";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { contacts, metricGoals } from "@/content/site-content";

export function ContactsSection() {
  return (
    <section id="contacts" className="px-4 py-14 md:px-8 md:py-18">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <article className="rounded-3xl border border-white/15 bg-gradient-to-b from-cyan-300/10 to-amber-300/10 p-6">
          <p className="section-tag">Контакты</p>
          <h2 className="section-title mt-3">Свяжитесь со мной удобным способом</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-200">
            Для быстрого старта оставьте заявку через форму или напишите сразу в
            Telegram.
          </p>

          <dl className="mt-6 grid gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-300">Телефон</dt>
              <dd className="mt-2">
                <TrackedLink
                  href={contacts.phoneHref}
                  goal={metricGoals.contactClick}
                  className="text-lg font-semibold text-white underline decoration-amber-300 underline-offset-4"
                >
                  {contacts.phoneDisplay}
                </TrackedLink>
              </dd>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-300">Telegram</dt>
              <dd className="mt-2">
                <TrackedLink
                  href={contacts.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  goal={metricGoals.telegramClick}
                  className="text-lg font-semibold text-white underline decoration-cyan-200 underline-offset-4"
                >
                  {contacts.telegramDisplay}
                </TrackedLink>
              </dd>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
              <dt className="text-xs uppercase tracking-[0.18em] text-slate-300">VK</dt>
              <dd className="mt-2">
                <TrackedLink
                  href={contacts.vkHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  goal={metricGoals.vkClick}
                  className="text-lg font-semibold text-white underline decoration-cyan-200 underline-offset-4"
                >
                  {contacts.vkDisplay}
                </TrackedLink>
              </dd>
            </div>
          </dl>
        </article>

        <div>
          <LeadForm source="contacts_form" />
        </div>
      </div>
    </section>
  );
}
