import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Ressources Finance & DAF : blog, outils, fiches métiers | Iter Advisors",
  description: "Blog finance, glossaire, outils CFO, fiches métiers, cas clients et témoignages : toutes les ressources Iter Advisors pour piloter votre croissance financière.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ResourcesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
