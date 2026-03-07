import type { Metadata } from "next";

import { LegalReleaseBlockerNotice } from "@/components/legal/legal-release-blocker-notice";
import { legalProfile } from "@/content/legal-content";

export const metadata: Metadata = {
  title: "Согласие на обработку персональных данных",
};

export default function ConsentPage() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-white">
        Согласие на обработку персональных данных
      </h1>

      <p>
        Оставляя заявку на сайте, пользователь подтверждает, что дает согласие
        на обработку персональных данных в соответствии с требованиями
        законодательства РФ.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">1. Перечень данных</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Имя.</li>
          <li>Контактные данные (телефон или Telegram).</li>
          <li>Дополнительные сведения, указанные в комментарии.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">2. Цели обработки</h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Связь по вопросу занятий и консультаций.</li>
          <li>Подбор учебного формата и расписания.</li>
          <li>Ведение внутренней статистики обращений.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">3. Срок действия согласия</h2>
        <p>
          Согласие действует до достижения целей обработки или до момента отзыва
          пользователем в письменной или электронной форме.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-white">4. Отзыв согласия</h2>
        <p>
          Для отзыва согласия пользователь направляет запрос по контактам
          оператора:
          {" "}
          <strong>
            {legalProfile.consentWithdrawalContact ||
              "Контакт для отзыва согласия будет добавлен перед публичным запуском сайта."}
          </strong>
          .
        </p>
      </section>

      <LegalReleaseBlockerNotice />
    </>
  );
}
