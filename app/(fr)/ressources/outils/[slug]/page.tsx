import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getToolBySlug, getToolsByCategory, tools } from "@/data/tools";
import CategoryPage from "@/components/Outils/CategoryPage";
import ToolPage from "@/components/Outils/ToolPage";

const categoryMeta = {
  "logiciels-comptabilite": {
    title: "Logiciels comptabilité PME 2026 | Iter Advisors",
    description:
      "Comparatif des meilleurs logiciels comptabilité pour PME 10-100 salariés. Avis d'experts DAF sur Pennylane, Sage, Cegid. Prix, implémentation, avantages.",
  },
  "logiciels-tresorerie": {
    title: "Agicap vs Fygr — Logiciels trésorerie PME | Iter Advisors",
    description:
      "Guide des logiciels trésorerie pour startups et PME. Avis d'expert sur Agicap, Fygr, Kyriba. Prévisions, DSO/DPO, cash flow automation.",
  },
  "gestion-depenses": {
    title: "Gestion des dépenses : Spendesk vs Pleo 2026 | Iter Advisors",
    description:
      "Comparatif des outils de gestion des dépenses : Spendesk, Pleo, Payhawk. Cartes virtuelles, workflows, intégration compta, reporting.",
  },
  "logiciels-paie": {
    title: "Logiciels de paie PME : PayFit vs Silae 2026 | Iter Advisors",
    description:
      "Meilleurs logiciels paie pour startups et PME. Avis expert sur PayFit, Silae, Lucca. DSN automatique, intégration compta, prix.",
  },
};

export async function generateStaticParams() {
  const categoryKeys = Object.keys(categoryMeta);
  const toolSlugs = tools.map((t) => t.slug);
  return [...categoryKeys, ...toolSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check if it's a category
  const categoryEntry = Object.entries(categoryMeta).find(([key]) => key === slug);
  if (categoryEntry) {
    const [, meta] = categoryEntry;
    return buildMetadata({
      locale: "fr",
      title: meta.title,
      description: meta.description,
      path: `/ressources/outils/${slug}`,
      // GSC-03 (2026-07-30): no [slug] route exists under /en or /es —
      // only the outils hub is translated. Emitting synthetic hreflang
      // URLs here made Google crawl and 404/redirect on every tool slug.
      disableHreflang: ["en", "es"],
    });
  }

  // Check if it's a tool
  const tool = getToolBySlug(slug);
  if (tool) {
    // CONTENUS-T1/T2 (2026-08-31) — la requête réelle est « avis {outil} »
    // (« avis pennylane » 260/mois P9, « revolut business avis » 260/mois
    // P11, CPC jusqu'à 10,47 €). Le title générique « {outil} — Avis DAF
    // externalisé » répondait au métier, pas à la requête : l'internaute
    // cherche un avis sur l'outil, pas sur les DAF. La note vient de
    // data/tools.ts — celle que la page affiche déjà, pas une valeur
    // marketing recalculée pour l'occasion.
    const title = `Avis ${tool.name} ${new Date().getFullYear()} : notre retour terrain`;
    const description = `Note ${tool.rating}/5 par nos DAF externalisés. Points forts constatés, limites réelles et pièges d'implémentation de ${tool.name}, observés en mission chez nos clients.`;
    return buildMetadata({
      locale: "fr",
      title,
      description,
      path: `/ressources/outils/${slug}`,
      disableHreflang: ["en", "es"],
    });
  }

  return notFound();
}

interface PageParams {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageParams) {
  const { slug } = await params;
  const cmsNavigation = await getCmsNavigation("fr");

  // Check if it's a category
  if (Object.keys(categoryMeta).includes(slug)) {
    const categorySlugMap: Record<string, any> = {
      "logiciels-comptabilite": "comptabilite",
      "logiciels-tresorerie": "tresorerie",
      "gestion-depenses": "depenses",
      "logiciels-paie": "paie",
    };
    
    const category = categorySlugMap[slug];
    const toolsInCategory = getToolsByCategory(category);
    if (toolsInCategory.length === 0) {
      return notFound();
    }

    return (
      <CategoryPage
        slug={slug}
        locale="fr"
        cmsNavigation={cmsNavigation}
        tools={toolsInCategory}
      />
    );
  }

  // Check if it's a tool
  const tool = getToolBySlug(slug);
  if (!tool) {
    return notFound();
  }

  return (
    <ToolPage slug={slug} locale="fr" cmsNavigation={cmsNavigation} tool={tool} />
  );
}
