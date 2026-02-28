import Image from "next/image";

import { HeroBackgroundVideo } from "@/components/landing/hero-background-video";
import { teacherProfile } from "@/content/site-content";

const teacherPhotoBlurDataUrl =
  "data:image/jpeg;base64,/9j/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAgABgDASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAQFAwb/xAAkEAACAgICAgAHAAAAAAAAAAABAgADBBEhMQUSEyIjJEFRcf/EABYBAQEBAAAAAAAAAAAAAAAAAAECA//EABgRAQEBAQEAAAAAAAAAAAAAAAEAEUEC/9oADAMBAAIRAxEAPwDmcnGNVxCD5fxN3rK4aMK9E9nUbspa11Uck8alJMVzimqxNpvQMzayha+zUn9wm+XUaq/h+pGj1qESGseMprRHvbRtUaVSY1iZIs+j2/ZkGm1Xyi1hOyONGN4zLjubCC2hyQZU7g1e5RpvYJs9EwkuzyeHZWfYsP7CDvI8h2//2Q==";

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden px-4 pb-12 pt-28 md:px-8 md:pb-16 md:pt-36"
    >
      <HeroBackgroundVideo />
      <div className="absolute inset-0 -z-10 bg-slate-950/72" />
      <div className="absolute -left-24 top-12 -z-10 h-52 w-52 rounded-full bg-amber-300/35 blur-3xl md:h-72 md:w-72" />
      <div className="absolute bottom-0 right-0 -z-10 h-56 w-56 translate-x-1/4 rounded-full bg-cyan-300/35 blur-3xl md:h-72 md:w-72" />

      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.35fr_1fr] lg:items-center">
        <div className="space-y-6 animate-enter">
          <p className="inline-flex rounded-full border border-white/25 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-100">
            {teacherProfile.classes}
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.06] text-white md:text-6xl">
            {teacherProfile.fullName}
          </h1>
          <p className="max-w-2xl text-lg text-slate-100 md:text-xl">
            {teacherProfile.offer}
          </p>
          <p className="max-w-2xl text-xl font-semibold text-amber-200 md:text-2xl">
            {teacherProfile.tagline}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-200"
            >
              Записаться на занятие
            </a>
            <a
              href="#contacts"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 bg-slate-900/45 px-6 py-3 text-base font-semibold text-white transition hover:border-white"
            >
              Записаться на консультацию
            </a>
          </div>
        </div>

        <aside className="animate-enter-delayed mx-auto w-full max-w-sm lg:mx-0 lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/25 bg-slate-900/30 shadow-2xl backdrop-blur-sm">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/images/teacher/teacher-photo-960.webp"
                alt={`Преподаватель химии ${teacherProfile.fullName}`}
                fill
                priority
                placeholder="blur"
                blurDataURL={teacherPhotoBlurDataUrl}
                sizes="(max-width: 640px) 82vw, (max-width: 1024px) 55vw, 420px"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10" />
            </div>
            <p className="absolute bottom-4 left-4 rounded-full border border-white/40 bg-slate-950/55 px-3 py-1 text-xs uppercase tracking-[0.14em] text-amber-100 backdrop-blur">
              Преподаватель
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
