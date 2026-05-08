import { Metadata } from "next";
import ResourcesPage from "@/components/pages/ResourcesPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Ressources DAF externalisé | Iter Advisors",
  description: "Ressources DAF : blog finance, glossaire, fiches métiers, témoignages. Conseils experts en DAF externalisé, levée de fonds, gestion financière.",
  path: "/ressources",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ResourcesPage locale="fr" cmsNavigation={cmsNavigation} />;
}
