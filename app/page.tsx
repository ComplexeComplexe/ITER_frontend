import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "fr",
    path: "/",
    fallbackTitle: "DAF externalisé & DAF à temps partagé | Iter Advisors",
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
