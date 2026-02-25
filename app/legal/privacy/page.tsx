import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
};

export default function PrivacyPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">Политика конфиденциальности</h1>
      <p>
        Данный документ определяет порядок обработки и защиты персональных данных
        пользователей сайта репетитора по химии.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">1. Оператор персональных данных</h2>
        <p>
          ФИО: <strong>TODO: указать юридический статус и ФИО оператора</strong>.
        </p>
        <p>
          Контакты: <strong>TODO: email и телефон оператора</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">2. Какие данные собираются</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Имя пользователя.</li>
          <li>Контактные данные (телефон или Telegram).</li>
          <li>Цель обращения и комментарий из формы заявки.</li>
          <li>Технические данные аналитики (Яндекс.Метрика, cookies).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">3. Цели обработки</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Обработка заявок на занятия и консультации.</li>
          <li>Обратная связь с пользователями.</li>
          <li>Анализ эффективности сайта и рекламных каналов.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">4. Правовые основания</h2>
        <p>
          Обработка данных осуществляется на основании согласия пользователя,
          выраженного через форму на сайте.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">5. Передача третьим лицам</h2>
        <p>
          Данные из формы могут передаваться в Telegram Bot API исключительно для
          оперативной обработки заявок.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">6. Срок хранения</h2>
        <p>
          Персональные данные хранятся не дольше, чем это необходимо для целей
          обработки, либо до отзыва согласия субъектом данных.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">7. Права пользователя</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Получать сведения об обработке его данных.</li>
          <li>Требовать уточнения, блокирования или удаления данных.</li>
          <li>Отозвать согласие на обработку персональных данных.</li>
        </ul>
      </section>

      <p className="rounded-xl border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm text-amber-100">
        TODO перед релизом: заполнить юридические реквизиты и контакт оператора.
      </p>
    </>
  );
}
