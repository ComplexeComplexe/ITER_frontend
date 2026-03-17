import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Ressources | Iter Advisors",
  description: "Retrouvez toutes nos ressources : blog, glossaire, fiches métiers et témoignages clients.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ResourcesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
