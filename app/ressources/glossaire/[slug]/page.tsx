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
