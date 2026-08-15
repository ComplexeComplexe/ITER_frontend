import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";
import { getDafContent } from "@/lib/content/daf";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/fr/fractional-cfo",
    localizedPaths: {
      fr: "/fr/fractional-cfo",
      en: "/en/fractional-cfo",
      es: "/es/externalizacion-daf",
    },
    fallbackTitle: "Fractional CFO France — Direction Financière à Temps Partiel | Iter Advisors",
    fallbackDescription:
      "Fractional CFO en France : un directeur financier senior à temps partiel pour piloter votre stratégie financière, accompagner vos levées de fonds et structurer votre reporting. Devis sous 48h.",
  });
}

const financialServiceSchema = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "@id": "https://www.iteradvisors.com/fr/fractional-cfo#service",
  name: "Fractional CFO — Iter Advisors",
  url: "https://www.iteradvisors.com/fr/fractional-cfo",
  provider: {
    "@id": "https://www.iteradvisors.com/#organization",
  },
  description:
    "Direction financière externalisée à temps partiel pour PME et startups. Pilotage financier, levées de fonds, reporting investisseurs et planification stratégique.",
  areaServed: [
    { "@type": "Country", name: "France" },
    { "@type": "Country", name: "Spain" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Formules Fractional CFO",
    itemListElement: [
      { "@type": "Offer", name: "Starter", price: "4500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Growth", price: "8500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Scale", price: "15000", priceCurrency: "EUR" },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Accueil",
      item: "https://www.iteradvisors.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Fractional CFO",
      item: "https://www.iteradvisors.com/fr/fractional-cfo",
    },
  ],
};

export default async function FractionalCFOFrPage() {
  const t = getDafContent("fr");
  const [cmsNavigation, teamMembers] = await Promise.all([
    getCmsNavigation("fr"),
    getTeamMembers("fr"),
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DafPage locale="fr" cmsNavigation={cmsNavigation} teamMembers={teamMembers} />
    </>
  );
}
