import { Metadata } from "next";
import DrhPage from "@/components/pages/DrhPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDrhExternalisePage, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "drh-externalise-page",
    locale: "fr",
    path: "/drh-externalise",
    localizedPaths: { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
    // R4 (2026-05-17) — 70c: keyword + variante "direction RH à temps partagé", cibles PME & Startup, brand
    fallbackTitle: "DRH externalisé — Direction RH temps partagé | Iter Advisors",
    fallbackDescription: "DRH externalisé et direction RH à temps partagé pour PME et startups. Recrutement, paie, conformité et stratégie RH par des experts seniors.",
  });
}

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.iteradvisors.com/drh-externalise#service",
  name: "DRH Externalisé — Iter Advisors",
  url: "https://www.iteradvisors.com/drh-externalise",
  provider: {
    "@id": "https://www.iteradvisors.com/#organization",
  },
  description: "Direction des ressources humaines externalisée pour PME et startups. Recrutement, conformité sociale, gestion des talents et stratégie RH par des experts dédiés. Paris, Toulouse, Barcelone.",
  areaServed: [
    { "@type": "Country", "name": "France" },
    { "@type": "Country", "name": "Spain" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Formules DRH Externalisé",
    itemListElement: [
      { "@type": "Offer", name: "Essentiel", price: "2500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Croissance", price: "4500", priceCurrency: "EUR" },
      { "@type": "Offer", name: "Premium", price: "8000", priceCurrency: "EUR" },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "31",
    bestRating: "5",
    worstRating: "1",
  },
};

export default async function Page() {
  const strapiData = await getDrhExternalisePage("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <DrhPage
        locale="fr"
        strapiCategories={strapiData?.serviceCategories ?? null}
        cmsNavigation={cmsNavigation}
      />
    </>
  );
}
