import { Metadata } from "next";
import ComptabiliteExternalisationPage from "@/components/pages/ComptabiliteExternalisationPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getComptabiliteExternalisationContent } from "@/lib/content/comptabilite-externalisation";

export async function generateMetadata(): Promise<Metadata> {
  const t = getComptabiliteExternalisationContent("fr");

  // Build Service + FAQPage schemas
  const faqSection = t.sections.find((s: any) => s.faqs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity:
      faqSection?.faqs?.map((faq: any) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })) || [],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.iteradvisors.com/services/comptabilite-externalisation#service",
    name: "Externalisation Comptable — Iter Advisors",
    description:
      "Externalisation comptable complète : tenue des comptes, déclarations fiscales, paie et clôture annuelle pour startups et PME",
    provider: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: "https://www.iteradvisors.com",
    },
    areaServed: "FR",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Formules Externalisation Comptable",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Externalisation Comptable - Formule Modulaire",
          description: "Adaptation flexible à votre volume d'activité",
          priceCurrency: "EUR",
          price: "500",
        },
      ],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, faqSchema],
  };

  return buildMetadata({
    locale: "fr",
    path: "/services/comptabilite-externalisation",
    title: t.meta.title,
    description: t.meta.description,
    structuredData,
    localizedPaths: {
      fr: "/services/comptabilite-externalisation",
      en: "/services/outsource-your-accounting",
      es: "/services/externalizar-contabilidad",
    },
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getComptabiliteExternalisationContent("fr");
  return (
    <ComptabiliteExternalisationPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
