import type { Metadata } from "next";

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

      <p className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
        TODO перед релизом: дополнить условиями оплаты/возврата после
        согласования юридического статуса.
      </p>
    </>
  );
}
