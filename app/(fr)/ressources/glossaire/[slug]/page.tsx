import { Metadata } from "next";
import GlossaryEntryPage from "@/components/pages/GlossaryEntryPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getGlossaryEntryContent } from "@/lib/content/glossary-entries";
import { getCmsNavigation } from "@/lib/strapi";
import { Locale } from "@/lib/i18n";

const validSlugs = [
  "bfr",
  "ebitda",
  "cfo",
  // TICKET 21 — 8 nouvelles pages glossaire dédiées
  "besoin-fonds-roulement-bfr",
  "cash-burn-runway",
  "cac-ltv",
  "arr-mrr",
  "churn-rate",
  "run-rate",
  "bspce-bsa",
  // EC-02 — 4 nouvelles pages glossaire
  "daf",
  "drh-externalise",
  "controle-de-gestion",
  "fractional-cfo",
];

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    return {
      title: "Not Found",
      description: "Glossary entry not found",
    };
  }

  return buildStrapiMetadata({
    endpoint: `glossary-${slug}`,
    locale: "fr",
    path: `/ressources/glossaire/${slug}`,
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
    // GSC-03 (2026-07-30): no [slug] route exists under /en or /es —
    // avoids synthetic hreflang URLs Google was crawling and redirecting.
    disableHreflang: ["en", "es"],
  });
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

// FAQ schemas keyed by slug — injected as JSON-LD for rich-results eligibility.
const faqBySlug: Record<string, { question: string; answer: string }[]> = {
  cfo: [
    {
      question: "Quelle est la différence entre un CFO et un expert-comptable ?",
      answer:
        "L'expert-comptable gère la comptabilité passée (déclarations, bilans). Le CFO pilote la stratégie financière future (prévisions, levées de fonds, board). Les deux sont complémentaires.",
    },
    {
      question: "À quel stade une startup a-t-elle besoin d'un CFO ?",
      answer:
        "Dès 10 salariés et/ou quand vous préparez une levée de fonds. Un CFO seed coûte 2 000 à 3 500 €/mois pour 2 jours/semaine.",
    },
    {
      question: "CFO salarié vs CFO externalisé : que choisir ?",
      answer:
        "Moins de 50 personnes = externalisé (plus flexible, moins cher). Plus de 50 personnes avec une finance complexe = salarié.",
    },
    {
      question: "Le CFO fait-il aussi de la paie et du RH ?",
      answer:
        "Généralement non. La paie est gérée par un outil (PayFit, Silae) ou un cabinet. Le CFO peut superviser la fonction RH mais ne la gère pas directement.",
    },
  ],
  daf: [
    {
      question: "Quelle est la différence entre DAF et CFO ?",
      answer:
        "Le CFO est un titre anglo-saxon, fortement orienté stratégie financière et relations investisseurs. Le DAF est un titre français avec un périmètre plus large incluant la gestion administrative et parfois les RH. Dans les startups, les deux profils convergent.",
    },
    {
      question: "Quel est le salaire d'un DAF en France ?",
      answer:
        "Un directeur financier salarié représente 100 000 à 213 000 € de coût employeur annuel, charges comprises. Un DAF externalisé démarre à 3 000 € HT/mois pour 2 jours/mois.",
    },
    {
      question: "Un DAF peut-il être à temps partiel ?",
      answer:
        "Oui, c'est le modèle du DAF externalisé. Il est particulièrement adapté aux PME de 10 à 200 salariés qui ont besoin d'expertise financière senior sans le coût d'un plein temps.",
    },
    {
      question: "Le DAF gère-t-il les RH ?",
      answer:
        "Dans certaines structures PME, oui — le DAF peut superviser les fonctions RH, juridique et administrative. C'est plus fréquent dans les PME où les rôles sont plus transversaux.",
    },
  ],
  "drh-externalise": [
    {
      question: "Le DRH externalisé gère-t-il la paie ?",
      answer:
        "Il supervise et coordonne la paie mais ne la traite pas directement. Il travaille avec votre expert-comptable ou un partenaire paie pour garantir la conformité.",
    },
    {
      question: "Quelle est la différence entre DRH externalisé et DRH à temps partagé ?",
      answer:
        "C'est la même chose. 'DRH externalisé' est le terme générique. 'DRH à temps partagé' insiste sur le mode d'organisation récurrente.",
    },
    {
      question: "Comment mesurer le ROI d'un DRH externalisé ?",
      answer:
        "Sur 4 axes : time-to-hire réduit (45 à 25 jours), turnover en baisse (15% à 8%), conformité sociale garantie, et 2 à 5 heures/semaine récupérées par le fondateur.",
    },
    {
      question: "Le DRH externalisé intervient-il sur site ?",
      answer:
        "Oui, selon vos besoins. Nos DRH interviennent sur site et en distanciel, avec une expertise particulière sur les sujets transfrontaliers France-Espagne.",
    },
  ],
  "controle-de-gestion": [
    {
      question: "Quelle est la différence entre comptabilité et contrôle de gestion ?",
      answer:
        "La comptabilité enregistre et justifie les flux passés. Le contrôle de gestion analyse ces données pour piloter l'avenir : prévisions, budgets, KPIs, et recommandations d'action.",
    },
    {
      question: "Quand une startup a-t-elle besoin d'un contrôleur de gestion ?",
      answer:
        "Dès que le CA dépasse 500K€ ou que l'équipe dépasse 15 personnes. C'est le moment où le fondateur ne peut plus tout gérer de tête.",
    },
    {
      question: "Combien coûte un contrôleur de gestion externalisé ?",
      answer:
        "Les formules Iter Advisors démarrent à 1 500 €/mois pour un tableau de bord mensuel. La formule complète avec budget et forecast est à 3 500 €/mois.",
    },
    {
      question: "Quels outils utilise un contrôleur de gestion ?",
      answer:
        "Power BI pour les dashboards, Excel pour les modèles financiers, Pennylane pour la comptabilité, et Agicap pour la trésorerie.",
    },
  ],
  "fractional-cfo": [
    {
      question: "Quelle est la différence entre un Fractional CFO et un comptable ?",
      answer:
        "Un comptable enregistre et rapproche les transactions. Un Fractional CFO analyse la performance, construit des prévisions, accompagne les levées de fonds, et conseille le fondateur sur les décisions stratégiques.",
    },
    {
      question: "Un Fractional CFO peut-il aider pour une levée de fonds ?",
      answer:
        "Oui, c'est la mission la plus fréquente. Les Fractional CFO d'Iter Advisors ont accompagné plus de 50 levées de fonds du Seed à la Series B.",
    },
    {
      question: "Dans quel délai un Fractional CFO peut-il intervenir ?",
      answer:
        "Iter Advisors met en relation sous 5 jours ouvrés. Le diagnostic et la mise en route sont réalisés sous 2 semaines.",
    },
    {
      question: "Quelle est la différence entre Fractional CFO et DAF externalisé ?",
      answer:
        "Le Fractional CFO est orienté startups tech, levée de fonds et relations VC. Le DAF externalisé est orienté PME traditionnelles, conformité et gestion opérationnelle. Chez Iter Advisors, nos profils couvrent les deux cas.",
    },
  ],
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    return <div>Glossary entry not found</div>;
  }

  const cmsNavigation = await getCmsNavigation("fr");
  const faqItems = faqBySlug[slug];
  const faqSchema = faqItems
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }
    : null;

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <GlossaryEntryPage locale="fr" content={content} cmsNavigation={cmsNavigation} />
    </>
  );
}
