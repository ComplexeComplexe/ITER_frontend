import { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getToolBySlug, getToolsByCategory, tools } from "@/data/tools";
import CategoryPage from "@/components/Outils/CategoryPage";
import ToolPage from "@/components/Outils/ToolPage";

const categoryMeta = {
  "logiciels-comptabilite": {
    title: "Logiciels de comptabilité pour PME : Pennylane vs Sage vs Cegid — Comparatif 2026",
    description:
      "Comparatif des meilleurs logiciels comptabilité pour PME 10-100 salariés. Avis d'experts DAF sur Pennylane, Sage, Cegid. Prix, implémentation, avantages.",
  },
  "logiciels-tresorerie": {
    title: "Logiciels de trésorerie pour PME : Agicap vs Fygr — Comparatif 2026",
    description:
      "Guide des logiciels trésorerie pour startups et PME. Avis d'expert sur Agicap, Fygr, Kyriba. Prévisions, DSO/DPO, cash flow automation.",
  },
  "gestion-depenses": {
    title: "Gestion des dépenses et notes de frais : Spendesk vs Pleo vs Payhawk — Comparatif 2026",
    description:
      "Comparatif des outils de gestion des dépenses : Spendesk, Pleo, Payhawk. Cartes virtuelles, workflows, intégration compta, reporting.",
  },
  "logiciels-paie": {
    title: "Logiciels de paie pour PME : PayFit vs Silae vs Lucca — Comparatif 2026",
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
      localizedPaths: {
        fr: `/ressources/outils/${slug}`,
        en: `/en/ressources/tools/${slug}`,
        es: `/es/recursos/herramientas/${slug}`,
      },
    });
  }

  // Check if it's a tool
  const tool = getToolBySlug(slug);
  if (tool) {
    const title = `${tool.name} — Avis DAF externalisé | Iter Advisors`;
    const description = `Notre avis sincère sur ${tool.name}. Pour qui ? Combien de temps d'implémentation ? Quels pièges ? Le retour terrain d'Iter Advisors.`;
    return buildMetadata({
      locale: "fr",
      title,
      description,
      path: `/ressources/outils/${slug}`,
      localizedPaths: {
        fr: `/ressources/outils/${slug}`,
        en: `/en/ressources/tools/${slug}`,
        es: `/es/recursos/herramientas/${slug}`,
      },
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
