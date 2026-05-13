import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "temps-partage")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "fr",
    path: "/daf-externalise/temps-partage",
    localizedPaths: { fr: "/daf-externalise/temps-partage", en: "/daf-outsourcing/shared-time", es: "/externalizacion-daf/tiempo-compartido" },
    fallbackTitle: "DAF à temps partagé : CFO senior dès 2 jours/mois | Iter Advisors",
    fallbackDescription: "DAF à temps partagé pour PME et startups : bénéficiez d'un directeur financier expérimenté quelques jours par semaine. Flexibilité, expertise et réduction des coûts avec Iter Advisors.",
  });
}

// FAQ JSON-LD for the temps-partage page (SEO ticket A6)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Qu'est-ce qu'un DAF à temps partagé ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Un DAF à temps partagé est un Directeur Administratif et Financier senior qui intervient régulièrement dans votre entreprise — généralement 2 à 8 jours par mois — sans être salarié. Il pilote la trésorerie, le reporting, les budgets et la stratégie financière, en s'inscrivant dans la durée.",
      },
    },
    {
      "@type": "Question",
      name: "Combien coûte un DAF à temps partagé ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Un DAF à temps partagé représente 20-40% du coût d'un DAF en CDI : comptez 2 500 à 4 500 € HT/mois pour 2 jours, contre 80 000-150 000 € brut/an pour un salarié.",
      },
    },
    {
      "@type": "Question",
      name: "Peut-on passer d'un DAF à temps partagé à un DAF interne ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Oui, c'est un scénario fréquent. Une fois la structure mise en place, vous pouvez recruter un DAF junior à temps plein et garder le DAF à temps partagé en conseil pour quelques jours par trimestre.",
      },
    },
    {
      "@type": "Question",
      name: "Quels sont les délais de mise en place ?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Nous démarrons une mission en 48-72 heures après signature. Le diagnostic initial prend 4-6 semaines.",
      },
    },
  ],
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />
    </>
  );
}
