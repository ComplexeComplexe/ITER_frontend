import { Metadata } from "next";
import GlossaryEntryPage from "@/components/pages/GlossaryEntryPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getGlossaryEntryContent, getGlossaryPages } from "@/lib/content/glossary-entries";
import { blogPosts } from "@/lib/content/blog-posts";
import { resolveBlogArticleHref } from "@/lib/path-localization";
import {
  GLOSSARY_AUTHOR,
  GLOSSARY_MODIFIED,
  GLOSSARY_PUBLISHED,
  htmlMentionsGlossary,
} from "@/lib/glossary-links";
import { getCmsNavigation } from "@/lib/static-content";
import { Locale } from "@/lib/i18n";

/**
 * Fiches qui ont une version anglaise servie (voir app/(en)/…/glossaire), avec
 * le slug anglais correspondant. `besoin-fonds-roulement-bfr` est le cas
 * croisé : sa version anglaise vit sous le slug court `bfr`.
 */
const SLUG_EN: Record<string, string> = {
  cfo: "cfo",
  ebitda: "ebitda",
  "besoin-fonds-roulement-bfr": "bfr",
};

const validSlugs = getGlossaryPages("fr").map(entry => entry.slug);

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
    // GSC-03 (2026-07-30) : aucune route [slug] n'existait sous /en ni /es,
    // d'où des hreflang synthétiques que Google crawlait puis redirigeait.
    //
    // TRAFIC-01 (2026-08-31) — trois fiches ont désormais une vraie version
    // anglaise. Pour celles-là, et pour elles seules, l'alternate est réel.
    disableHreflang: slug in SLUG_EN ? ["es"] : ["en", "es"],
    ...(slug in SLUG_EN
      ? {
          localizedPaths: {
            fr: `/ressources/glossaire/${slug}`,
            en: `/ressources/glossaire/${SLUG_EN[slug]}`,
            es: `/ressources/glossaire/${slug}`,
          },
        }
      : {}),
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
        // FACTS (2026-09-01) — annonçait « 2 000 à 3 500 €/mois pour 2 jours/semaine » :
        // la formule d'entrée arbitrée est à 3 000 € HT/mois (facts.ts).
        "Dès 10 salariés et/ou quand vous préparez une levée de fonds. Chez Iter Advisors, la formule d'entrée démarre à 3 000 € HT par mois pour 1 à 2 jours d'intervention mensuels.",
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
        // FACTS (2026-09-01) — les valeurs chiffrées (45 → 25 jours, 15 → 8 %)
        // n'avaient ni source ni échantillon : mesures avant/après, mission par mission.
        "Sur quatre axes, mesurés avant et après sur chaque mission : le délai de recrutement, le turnover, la conformité sociale, et le temps de dirigeant récupéré chaque semaine.",
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
        "Oui, c'est la mission la plus fréquente. Les Fractional CFO d'Iter Advisors ont accompagné des dizaines de levées, du seed à la série B — plus de 100 M€ levés par nos clients depuis 2021.",
    },
    {
      question: "Dans quel délai un Fractional CFO peut-il intervenir ?",
      answer:
        // FACTS (2026-09-01) — aligné sur DELAIS (facts.ts) : profil présenté
        // sous 5 jours ouvrés, mission démarrée en 8 à 15 jours.
        "Iter Advisors présente un profil sous 5 jours ouvrés après le premier échange ; la mission démarre en 8 à 15 jours, premiers livrables dès le premier mois d'intervention.",
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
  const pageUrl = `https://www.iteradvisors.com/ressources/glossaire/${slug}`;

  // REDESIGN-P3 (2026-09-01) — les articles du blog qui emploient le terme,
  // pour la section « où ce terme apparaît ». Résolus via
  // resolveBlogArticleHref pour ne jamais lier un slug qui redirige.
  const mentions = Object.entries(blogPosts.fr)
    .filter(([, p]) => p.htmlContent && htmlMentionsGlossary(p.htmlContent, slug))
    .map(([s, p]) => ({ href: resolveBlogArticleHref("fr", s), title: p.h1 }))
    .filter((m): m is { href: string; title: string } => m.href !== null && !m.href.includes("/glossaire/"))
    .filter((m, i, arr) => arr.findIndex((x) => x.href === m.href) === i)
    .slice(0, 4);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Article : c'est ce qui porte l'auteur et les dates — la garde E-E-A-T
      // de la recette les exige désormais sur le glossaire aussi.
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: content.h1,
        description: content.meta.description,
        datePublished: GLOSSARY_PUBLISHED,
        dateModified: GLOSSARY_MODIFIED,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: GLOSSARY_AUTHOR.name,
          url: `https://www.iteradvisors.com${GLOSSARY_AUTHOR.url}`,
        },
        publisher: { "@id": "https://www.iteradvisors.com/#organization" },
        isPartOf: { "@type": "CollectionPage", "@id": "https://www.iteradvisors.com/ressources/glossaire#collection" },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${pageUrl}#term`,
        name: content.h1.split(/\s[:(]/)[0].trim(),
        description: content.meta.description,
        url: pageUrl,
        inDefinedTermSet: "https://www.iteradvisors.com/ressources/glossaire",
      },
      ...(faqItems
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GlossaryEntryPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        slug={slug}
        mentions={mentions}
      />
    </>
  );
}
