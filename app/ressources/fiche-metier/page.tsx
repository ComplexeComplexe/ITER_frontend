import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Fiches métiers finance - DAF, contrôleur de gestion, trésorier | Iter Advisors",
  description: "Découvrez nos fiches métiers détaillées : DAF, RAF, CFO et autres métiers de la finance d'entreprise.",
  path: "/ressources/fiche-metier",
});

export default async function Page() {
  const fiches = await getJobMetiers("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <FicheMetierListingPage locale="fr" fiches={fiches} cmsNavigation={cmsNavigation} />;
}
