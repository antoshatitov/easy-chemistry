import type { Metadata } from "next";

import { YandexMetrika } from "@/components/analytics/yandex-metrika";
import { siteMeta, teacherProfile } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteMeta.title,
    template: `%s | ${siteMeta.siteName}`,
  },
  description: siteMeta.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: siteMeta.siteName,
    title: siteMeta.title,
    description: siteMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  keywords: [
    "репетитор по химии",
    "подготовка к ЕГЭ по химии",
    "подготовка к ОГЭ по химии",
    "репетитор химия онлайн",
    teacherProfile.fullName,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
