export type LeadGoal = "oge" | "ege" | "olympiad" | "other";
export type LessonFormat = "individual" | "group";
export type LeadRequestType = "lesson" | "consultation";

export const siteMeta = {
  siteName: "Easy Chemistry",
  title: "Репетитор по химии: ОГЭ, ЕГЭ и олимпиады онлайн",
  description:
    "Жигирова Надежда Викторовна. Подготовка к ОГЭ и ЕГЭ по химии, помощь школьникам и студентам, разбор сложных тем простым языком.",
  city: "Онлайн по всей России",
};

export const navigationItems = [
  { label: "Главная", href: "#home" },
  { label: "О себе", href: "#about" },
  { label: "Результаты", href: "#results" },
  { label: "Услуги", href: "#services" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contacts" },
] as const;

export const teacherProfile = {
  fullName: "Жигирова Надежда Викторовна",
  tagline: "Перевожу с химического языка на русский",
  classes: "Химия 8-11 класс",
  offer: "Качественная подготовка к ЕГЭ и ОГЭ",
  yearResults: "Результаты ЕГЭ 2025: 100, 95, 90, 88",
  intro:
    "Готовлю к успешной сдаче ОГЭ и ЕГЭ, к олимпиадам, помогаю закрыть пробелы школьной программы и поддерживаю студентов: поступление, домашние задания, непонятные темы и вступительные испытания.",
  support: "Связь с учеником 24/7 и регулярная обратная связь с родителями.",
};

export const achievements = [
  "Учитель химии.",
  "БФУ им. И. Канта, направление «Химия» (бакалавриат).",
  "БФУ им. И. Канта, «Фармацевтическая химия» (магистратура).",
  "Член комиссии жюри химбиоseasons для школьников.",
  "Член комиссии жюри регионального этапа VI Межрегионального химического турнира.",
  "Призер школьных, региональных и областных олимпиад по химии.",
  "Автор статей по органической химии.",
] as const;

export const education = [
  {
    title: "БФУ им. И. Канта",
    details: "Химия",
    years: "2015-2019",
  },
  {
    title: "БФУ им. И. Канта",
    details: "Фармацевтическая химия",
    years: "2019-2021",
  },
] as const;

export const experience = [
  {
    title: "Учитель химии",
    details: "с 2018 года (8 лет)",
  },
  {
    title: "Работа на образовательных сервисах",
    details: "с апреля 2021 года (4 года)",
  },
] as const;

export const examResults = [
  { score: 100, label: "ЕГЭ" },
  { score: 95, label: "ЕГЭ" },
  { score: 90, label: "ЕГЭ" },
  { score: 88, label: "ЕГЭ" },
] as const;

export const services = [
  {
    id: "individual",
    title: "Индивидуальные занятия",
    description:
      "Персональная программа подготовки: от диагностики слабых мест до системной отработки заданий экзамена.",
    price: "2 000 ₽ / 60 минут",
    accent: "При оплате 10 занятий - 11-е в подарок",
  },
  {
    id: "group",
    title: "Групповые занятия",
    description:
      "Мини-группа с регулярной практикой, разбором ошибок и контролем динамики каждого ученика.",
    price: "Стоимость и формат - по запросу",
    accent: "Оставьте заявку и получите индивидуальное предложение",
  },
] as const;

export const reviewSources = [
  {
    title: "Profi.ru",
    description:
      "Отзывы учеников и родителей, подробный профиль преподавателя и подтвержденный опыт.",
    link: "https://profi.ru/profile/ZhigirovaNV4/?srsltid=AfmBOoqTM4Xui58Zrm65Y38P-uwvY7-9Tw3-ye7-0JTf9kJOLv4GuT81",
  },
  {
    title: "Avito: профиль бренда",
    description:
      "Отзывы и активные предложения по занятиям.",
    link: "https://www.avito.ru/brands/52adddcfc6904d65af1fc7a0faec3dd9?src=sharing",
  },
  {
    title: "Avito: карточка услуги",
    description:
      "Подробное описание подхода и подготовки на высокие баллы.",
    link: "https://www.avito.ru/novosibirsk/predlozheniya_uslug/repetitor_po_himii_na_vysokie_bally_ege_oge_2546982755?utm_campaign=native&utm_medium=item_page_ios&utm_source=soc_sharing",
  },
  {
    title: "Instagram",
    description:
      "Публичный профиль с контентом и дополнительными подтверждениями экспертности.",
    link: "https://www.instagram.com/zhigirovan?igsh=aGM1NWsydmJxd2Vk",
  },
] as const;

export const contacts = {
  phoneDisplay: "TODO: +7 (___) ___-__-__",
  phoneHref: "tel:+70000000000",
  telegramDisplay: "TODO: @replace_before_release",
  telegramHref: "https://t.me/replace_before_release",
  workingHours: "TODO: укажите часы для связи",
  city: "Онлайн по всей России",
};

export const leadGoalOptions: Array<{ value: LeadGoal; label: string }> = [
  { value: "oge", label: "ОГЭ" },
  { value: "ege", label: "ЕГЭ" },
  { value: "olympiad", label: "Олимпиада" },
  { value: "other", label: "Другое" },
];

export const lessonFormatOptions: Array<{ value: LessonFormat; label: string }> = [
  { value: "individual", label: "Индивидуально" },
  { value: "group", label: "Группа" },
];

export const requestTypeOptions: Array<{
  value: LeadRequestType;
  label: string;
}> = [
  { value: "lesson", label: "Запись на занятие" },
  { value: "consultation", label: "Запись на консультацию" },
];

export const metricGoals = {
  formSubmit: "form_submit",
  contactClick: "contact_click",
  telegramClick: "telegram_click",
} as const;
