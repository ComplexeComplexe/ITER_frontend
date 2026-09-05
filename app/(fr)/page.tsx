import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "fr",
    path: "/",
    // SEO-001 (2026-08-09) — voir la note dans lib/content/home.ts. Ce title
    // reprenait à la fois « DAF externalisé » (requête du pilier) et « DAF à
    // temps partagé » (requête de /daf-externalise/temps-partage) : l'accueil
    // disputait donc deux requêtes à ses propres pages. Il porte désormais la
    // marque et le périmètre complet du cabinet, finance et RH.
    fallbackTitle: "Iter Advisors | Direction financière et RH externalisée",
    fallbackDescription:
      "DAF externalisé et CFO à temps partagé pour PME et startups. Pilotage financier, levée de fonds, trésorerie. Barcelone, Paris, Toulouse.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation, homepage] = await Promise.all([
    getTeamMembers("fr"),
    getCmsNavigation("fr"),
    getHomepage("fr"),
  ]);
  return (
    <HomePage
      locale="fr"
      teamMembers={teamMembers}
      cmsNavigation={cmsNavigation}
      homepage={homepage}
    />
  );
}
