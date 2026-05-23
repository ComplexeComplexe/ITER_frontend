import { Metadata } from "next";
import ControleDeGestionExternalisePage from "@/components/pages/ControleDeGestionExternalisePage";
import { buildMetadata } from "@/lib/metadata";
import { getControleDeGestionExternaliseeContent } from "@/lib/content/controle-de-gestion-externalise";

/**
 * Route for /services/controle-de-gestion-externalise.
 *
 * TICKET F2 (2026-05-17) — Replaces the previous metadata and schemas
 * with the canonical @graph required by the SEO brief:
 *
 *   - FinancialService (provider Iter Advisors, hasOfferCatalog with
 *     Pilot / Growth / Scale tiers).
 *   - FAQPage (8 questions matching the visible accordion 1:1 so
 *     Google's rich-result validator doesn't reject the schema).
 *   - Organization (logo + url).
 *   - BreadcrumbList (Accueil → Services → Contrôle de gestion).
 *
 * Title + meta description follow the SEO QA skill (50-60c / 150-160c
 * with primary keyword in first 40c + brand at end).
 */
export async function generateMetadata(): Promise<Metadata> {
  const t = getControleDeGestionExternaliseeContent("fr");
  const url =
    "https://www.iteradvisors.com/services/controle-de-gestion-externalise";

  // Pull the FAQ section once and lift its Q/R pairs into the schema
  // so visible DOM and FAQPage JSON-LD stay in sync.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const faqSection = t.sections.find((s: any) => s.id === "faq") as
    | { faqs: { question: string; answer?: string; answerHtml?: string }[] }
    | undefined;
  const faqEntities = (faqSection?.faqs ?? []).map((q) => ({
    "@type": "Question",
    name: q.question,
    acceptedAnswer: {
      "@type": "Answer",
      // Strip HTML so the schema text is plain (Google requires it).
      text: (q.answerHtml ?? q.answer ?? "")
        .replace(/<[^>]+>/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    },
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FinancialService",
        "@id": `${url}#service`,
        name: "Contrôle de gestion externalisé",
        provider: {
          "@type": "Organization",
          name: "Iter Advisors",
          url: "https://www.iteradvisors.com",
        },
        description:
          "Pilotage financier et reporting de performance pour startups. Tableaux de bord, KPIs, forecast. Dès 2 500 €/mois.",
        areaServed: ["Paris", "Toulouse", "Barcelone"],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Forfaits contrôle de gestion",
          itemListElement: [
            {
              "@type": "Offer",
              name: "Pilot",
              price: "2500",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Growth",
              price: "4500",
              priceCurrency: "EUR",
            },
            {
              "@type": "Offer",
              name: "Scale",
              price: "8000",
              priceCurrency: "EUR",
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: faqEntities,
      },
      {
        "@type": "Organization",
        "@id": "https://www.iteradvisors.com/#organization",
        name: "Iter Advisors",
        url: "https://www.iteradvisors.com",
        logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.iteradvisors.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.iteradvisors.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Contrôle de gestion externalisé",
            item: url,
          },
        ],
      },
    ],
  };

  return buildMetadata({
    locale: "fr",
    path: "/services/controle-de-gestion-externalise",
    title: t.meta.title,
    description: t.meta.description,
    structuredData,
    localizedPaths: {
      fr: "/services/controle-de-gestion-externalise",
      en: "/services/outsourced-management-control",
      es: "/services/control-gestion-externalizado",
    },
  });
}

export default async function Page() {
  const cmsNavigation = undefined;
  const content = getControleDeGestionExternaliseeContent("fr");
  return (
    <ControleDeGestionExternalisePage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
