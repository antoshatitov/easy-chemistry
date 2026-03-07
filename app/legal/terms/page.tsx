import type { Metadata } from "next";

import { LegalReleaseBlockerNotice } from "@/components/legal/legal-release-blocker-notice";
import { legalProfile } from "@/content/legal-content";

export const metadata: Metadata = {
  title: "Пользовательское соглашение",
};

export default function TermsPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Пользовательское соглашение</h1>

      <p>
        Настоящее соглашение регулирует использование сайта и порядок
        взаимодействия пользователя с преподавателем.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">1. Предмет соглашения</h2>
        <p>
          Сайт предоставляет информацию об образовательных услугах и форму для
          отправки заявки на занятие или консультацию.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">2. Обязанности пользователя</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Указывать достоверные контактные данные при отправке заявки.</li>
          <li>Не использовать сайт для рассылки спама и противоправных действий.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">3. Ограничение ответственности</h2>
        <p>
          Владелец сайта не несет ответственности за временные технические сбои,
          включая недоступность сторонних сервисов (например, Telegram API).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">4. Заключительные положения</h2>
        <p>
          Актуальная версия соглашения всегда доступна на этой странице. Продолжая
          использование сайта, пользователь принимает условия соглашения.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">5. Оплата и возврат</h2>
        <p>
          {legalProfile.paymentTerms ||
            "Условия оплаты будут опубликованы перед публичным запуском сайта."}
        </p>
        <p>
          {legalProfile.refundTerms ||
            "Условия возврата и переноса занятий будут опубликованы перед публичным запуском сайта."}
        </p>
      </section>

      <LegalReleaseBlockerNotice />
    </>
  );
}
