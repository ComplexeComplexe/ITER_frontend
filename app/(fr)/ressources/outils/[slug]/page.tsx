import { getToolReviewTitle } from '@/data/toolReviews';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getToolBySlug, getToolsByCategory, tools } from "@/data/tools";
import CategoryPage from "@/components/Outils/CategoryPage";
import ToolPage from "@/components/Outils/ToolPage";

const categoryMeta = {
  "logiciels-comptabilite": {
    title: "Logiciels comptabilité PME 2026 | Iter Advisors",
    description:
      "Pennylane, Sage et Cegid : usages, limites, reprise comptable et coût total. Critères pour choisir avec votre cabinet.",
  },
  "logiciels-tresorerie": {
    title: "Logiciels de trésorerie : critères de choix | Iter Advisors",
    description:
      "Logiciels de trésorerie pour PME : banques, entités, prévisions, droits et coût total. Une grille pour préparer la sélection selon vos données.",
  },
  "gestion-depenses": {
    title: "Gestion des dépenses : Spendesk vs Pleo 2026 | Iter Advisors",
    description:
      "Comparatif des outils de gestion des dépenses : Spendesk, Pleo, Payhawk. Cartes virtuelles, workflows, intégration compta, reporting.",
  },
  "logiciels-paie": {
    title: "Logiciels de paie PME : PayFit vs Silae 2026 | Iter Advisors",
    description:
      "PayFit, Silae et Lucca : périmètre paie, contrôles, modules RH et coût total. Critères pour préparer une sélection.",
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
    const title = getToolReviewTitle(tool);
    const description = slug === "pennylane" ? "Notre avis Pennylane après quatre ans d’usage chez Iter, pour environ 50 % de nos clients : centralisation comptable, limites du reporting et critères de choix." : `Avis ${tool.name} : points forts, limites, intégrations et critères de choix pour PME et startups. Sources de tarification et questions à poser à l’éditeur.`;
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
    const categorySlugMap: Record<string, (typeof tools)[number]["category"]> = {
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
