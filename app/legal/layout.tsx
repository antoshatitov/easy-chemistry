import type { ReactNode } from "react";
import Link from "next/link";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <main className="px-4 py-10 md:px-8 md:py-16">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/15 bg-slate-950/65 p-6 md:p-8">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:border-amber-200"
        >
          Вернуться на главную
        </Link>
        <div className="mt-6 space-y-5 text-base leading-relaxed text-slate-300">
          {children}
        </div>
      </div>
    </main>
  );
}
