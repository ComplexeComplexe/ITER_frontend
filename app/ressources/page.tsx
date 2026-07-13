import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

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

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ResourcesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
