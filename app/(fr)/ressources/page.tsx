import { Metadata } from "next";
import ResourcesPageFR from "@/components/pages/ResourcesPageFR";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";

// SEO-14 (2026-07-13) — localizedPaths ajouté (ES utilise /recursos).
export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Ressources Finance & DAF : blog et outils | Iter Advisors",
  description: "Blog finance, glossaire, outils CFO, fiches métiers, cas clients et témoignages : toutes les ressources Iter Advisors pour piloter votre croissance financière.",
  path: "/ressources",
  localizedPaths: {
    fr: "/ressources",
    en: "/ressources",
    es: "/recursos",
  },
});

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://www.iteradvisors.com/ressources#webpage",
  name: "Ressources DAF externalisé | Iter Advisors",
  description:
    "Ressources DAF : blog finance, glossaire, fiches métiers, témoignages et articles fiscalité France-Espagne.",
  url: "https://www.iteradvisors.com/ressources",
  inLanguage: "fr-FR",
  isPartOf: { "@id": "https://www.iteradvisors.com/#website" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.iteradvisors.com" },
      { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.iteradvisors.com/ressources" },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Guides, outils et cas clients Iter Advisors",
    itemListElement: [
      ["Tableau de bord financier", "/ressources/blog/tableau-de-bord-financier-startup-12-kpis"],
      ["Coût d’un DAF externalisé", "/ressources/blog/cout-daf-externalise-tarifs-prix-2026"],
      ["Checklist de due diligence", "/ressources/blog/checklist-due-diligence-levee-de-fonds"],
      ["IA et finance", "/ressources/ia-finance"],
      ["Cas clients documentés", "/ressources/cas-clients"],
      ["Glossaire financier", "/ressources/glossaire"],
    ].map(([name, path], index) => ({
      "@type": "ListItem", position: index + 1, name, url: `https://www.iteradvisors.com${path}`,
    })),
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <ResourcesPageFR cmsNavigation={cmsNavigation} />
    </>
  );
}
