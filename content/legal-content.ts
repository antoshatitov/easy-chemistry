import { contacts, teacherProfile } from "@/content/site-content";

export const legalProfile = {
  operatorName: teacherProfile.fullName,
  operatorStatus: "",
  operatorEmail: "",
  operatorPhoneDisplay: contacts.phoneDisplay,
  operatorPhoneHref: contacts.phoneHref,
  consentWithdrawalContact: "",
  paymentTerms: "",
  refundTerms: "",
} as const;

export const legalReleaseBlockers = [
  !legalProfile.operatorStatus && "Указать юридический статус оператора персональных данных.",
  !legalProfile.operatorEmail && "Добавить email для правовых запросов и отзывов согласия.",
  !legalProfile.consentWithdrawalContact && "Указать отдельный канал для отзыва согласия.",
  !legalProfile.paymentTerms && "Заполнить условия оплаты занятий и консультаций.",
  !legalProfile.refundTerms && "Заполнить условия возврата или переноса оплаченных занятий.",
].filter((value): value is string => Boolean(value));

export function getOperatorDescription() {
  if (!legalProfile.operatorStatus) {
    return legalProfile.operatorName;
  }

  return `${legalProfile.operatorStatus}, ${legalProfile.operatorName}`;
}
