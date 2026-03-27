import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: "Finance job descriptions - CFO, controller, treasurer | Iter Advisors",
  description: "Discover our detailed job descriptions: CFO, Finance Director, Controller and other corporate finance roles.",
  path: "/ressources/fiche-metier",
});

export default async function Page() {
  const [fiches, cmsNavigation] = await Promise.all([
    getJobMetiers("en"),
    getCmsNavigation("en"),
  ]);
  return <FicheMetierListingPage locale="en" fiches={fiches} cmsNavigation={cmsNavigation} />;
}
