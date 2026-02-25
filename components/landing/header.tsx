import { navigationItems } from "@/content/site-content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border border-white/25 bg-slate-950/55 px-4 py-3 backdrop-blur-xl md:px-6">
        <a
          href="#home"
          className="min-h-11 min-w-11 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-amber-200 transition hover:border-amber-200"
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
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-amber-300/60 bg-amber-300 px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-200"
        >
          Оставить заявку
        </a>
      </div>
    </header>
  );
}
