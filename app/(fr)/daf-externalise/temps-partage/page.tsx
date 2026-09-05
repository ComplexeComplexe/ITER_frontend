import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/static-content";

const content = getDafSubContent("fr", "temps-partage")!;
const PAGE_URL = "https://www.iteradvisors.com/daf-externalise/temps-partage";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "fr",
    path: "/daf-externalise/temps-partage",
    localizedPaths: { fr: "/daf-externalise/temps-partage", en: "/en/fractional-cfo/shared-time", es: "/externalizacion-daf/tiempo-compartido" },
    // T#2 (2026-07-13) — fallback aligné sur content lib (title T#2 :
    // "DAF à temps partagé : directeur financier 2-8 j/mois").
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
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
          "Un DAF à temps partagé représente 30 à 60 % d'économie face au coût employeur d'un salarié : de 3 000 à 8 000 € HT/mois selon la formule, contre 100 000 à 213 000 € par an charges comprises.",
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
          "Du premier échange au démarrage effectif, comptez 8 à 15 jours. Le diagnostic initial prend ensuite 4 à 6 semaines.",
      },
    },
  ],
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  // SEO-005 (2026-08-09) — BreadcrumbList manuel retiré. Le composant
  // <Breadcrumb> rendu par DafSubPage émet déjà le sien, construit
  // depuis le pathname réel : les deux coexistaient et la page servait
  // deux fils d'Ariane identiques à un libellé près. Même correctif que
  // sur les pages fiscalité et /ressources/outils/malibou.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DafSubPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        heroImage={{
          src: "/images/illustrations/team-video-call.svg",
          alt: "Réunion d'équipe en visioconférence : un DAF à temps partagé pilote la finance d'Iter Advisors à distance",
        }}
      />
    </>
  );
}
