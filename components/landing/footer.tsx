import { contacts, siteMeta } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-slate-950 py-10">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 text-sm text-slate-300 md:grid-cols-2 md:px-8">
        <div>
          <p className="font-semibold text-slate-100">{siteMeta.siteName}</p>
          <p className="mt-2 max-w-md text-slate-400">
            Репетитор по химии для 8-11 классов: ОГЭ, ЕГЭ, олимпиады и
            восполнение пробелов.
          </p>
          <p className="mt-3 text-xs text-amber-200">{contacts.city}</p>
        </div>

        <div className="grid gap-2 md:justify-items-end">
          <a className="hover:text-amber-200" href="/legal/privacy">
            Политика конфиденциальности
          </a>
          <a className="hover:text-amber-200" href="/legal/consent">
            Согласие на обработку ПДн
          </a>
          <a className="hover:text-amber-200" href="/legal/terms">
            Пользовательское соглашение
          </a>
        </div>
      </div>
    </footer>
  );
}
