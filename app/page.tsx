import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { AboutSection } from "@/components/landing/about-section";
import { ContactsSection } from "@/components/landing/contacts-section";
import { HeroSection } from "@/components/landing/hero-section";
import { ResultsSection } from "@/components/landing/results-section";
import { ReviewsSection } from "@/components/landing/reviews-section";
import { ServicesSection } from "@/components/landing/services-section";
import { contacts, services, teacherProfile } from "@/content/site-content";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl().toString().replace(/\/$/, "");

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: teacherProfile.fullName,
  jobTitle: "Учитель химии",
  description: `${teacherProfile.offer}. ${teacherProfile.yearResults}`,
  areaServed: "Россия",
  url: siteUrl,
  sameAs: [contacts.telegramHref],
};

const serviceSchema = services.map((service) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: service.title,
  provider: {
    "@type": "Person",
    name: teacherProfile.fullName,
  },
  areaServed: "Россия",
  offers:
    service.id === "individual"
      ? {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: "2000",
          description: service.price,
        }
      : {
          "@type": "Offer",
          description: service.price,
        },
}));

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden pt-2">
        <HeroSection />
        <AboutSection />
        <ResultsSection />
        <ServicesSection />
        <ReviewsSection />
        <ContactsSection />
      </main>
      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
