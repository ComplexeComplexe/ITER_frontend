import { Metadata } from "next";
import ControleDeGestionExternalisePage from "@/components/pages/ControleDeGestionExternalisePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getControleDeGestionExternaliseeContent } from "@/lib/content/controle-de-gestion-externalise";

export async function generateMetadata(): Promise<Metadata> {
  const t = getControleDeGestionExternaliseeContent("fr");

  // Build Service + FAQPage + Article + Person schemas
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
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: `.faq-answer-${faq.question.toLowerCase().replace(/\s+/g, "-")}`,
          },
        },
      })) || [],
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.iteradvisors.com#sebastien-doat",
    name: "Sébastien Doat",
    jobTitle: "Co-fondateur & CFO Advisor",
    url: "https://www.linkedin.com/in/sebastiendoat",
    sameAs: "https://www.linkedin.com/in/sebastiendoat",
    image: "https://www.iteradvisors.com/images/sebastien-doat.jpg",
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://www.iteradvisors.com/services/controle-de-gestion-externalise#article",
    headline: "Contrôle de gestion externalisé : piloter sa rentabilité sans recruter un contrôleur de gestion",
    description:
      "Contrôle de gestion externalisé pour PME et startups à Paris et en Île-de-France. Tableaux de bord, KPIs, suivi budgétaire. +85 entreprises accompagnées.",
    author: {
      "@type": "Person",
      "@id": "https://www.iteradvisors.com#sebastien-doat",
      name: "Sébastien Doat",
    },
    dateModified: new Date().toISOString().split("T")[0],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.iteradvisors.com/services/controle-de-gestion-externalise#service",
    name: "Contrôle de Gestion Externalisé — Iter Advisors",
    description:
      "Contrôle de gestion externalisé pour startups et PME à Paris et en Île-de-France : tableaux de bord, KPIs, suivi budgétaire et analyse des coûts",
    provider: {
      "@type": "Organization",
      name: "Iter Advisors",
      url: "https://www.iteradvisors.com",
    },
    areaServed: ["FR-75", "FR-92", "FR-93", "FR-94"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Formules Contrôle de Gestion",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Contrôle de Gestion - Formule Modulaire",
          description: "Adaptation flexible à votre complexité métier",
          priceCurrency: "EUR",
          price: "1500",
        },
      ],
    },
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      serviceSchema,
      faqSchema,
      articleSchema,
      personSchema,
    ],
  };

  return buildMetadata({
    locale: "fr",
    path: "/services/controle-de-gestion-externalise",
    title: "Contrôle de gestion externalisé Paris & IDF — Devis 48h | Iter Advisors",
    description:
      "Contrôle de gestion externalisé pour PME et startups à Paris et en Île-de-France. Tableaux de bord, KPIs, suivi budgétaire. +85 entreprises accompagnées.",
    structuredData,
    localizedPaths: {
      fr: "/services/controle-de-gestion-externalise",
      en: "/services/outsourced-management-accounting",
      es: "/services/control-de-gestion-externalizado",
    },
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getControleDeGestionExternaliseeContent("fr");
  return (
    <ControleDeGestionExternalisePage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
