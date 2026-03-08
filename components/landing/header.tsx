import { navigationItems } from "@/content/site-content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-8 md:pt-4">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-[1.75rem] border border-white/25 bg-slate-950/55 px-3 py-3 backdrop-blur-xl sm:gap-3 sm:px-4 md:gap-4 md:px-6">
        <a
          href="#home"
          className="inline-flex min-h-11 min-w-0 shrink items-center justify-center whitespace-nowrap rounded-full border border-white/25 px-3 py-2 text-center text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-200 transition hover:border-amber-200 sm:px-4 sm:text-sm sm:tracking-[0.14em]"
        >
          Easy Chemistry
        </a>

        <nav aria-label="Разделы сайта" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-4 py-2 text-sm text-slate-100 transition hover:bg-white/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contacts"
          aria-label="Оставить заявку"
          className="inline-flex min-h-11 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-amber-300/60 bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-200 sm:px-5"
        >
          <span className="md:hidden">Заявка</span>
          <span className="hidden md:inline">Оставить заявку</span>
        </a>
      </div>
    </header>
  );
}
