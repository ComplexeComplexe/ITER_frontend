import { Metadata } from "next";
import FicheMetierListingPage from "@/components/pages/FicheMetierListingPage";
import { getJobMetiers, getCmsNavigation } from "@/lib/strapi";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Fiches Métiers Finance | Iter Advisors",
  description: "Fiches métiers finance : DAF, RAF, CFO, Trésorier, Contrôleur. Missions, compétences, salaires détaillés. Guide expert gratuit 2026 pour managers.",
  path: "/ressources/fiche-metier",
});

export default async function Page() {
  const fiches = await getJobMetiers("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <FicheMetierListingPage locale="fr" fiches={fiches} cmsNavigation={cmsNavigation} />;
}
