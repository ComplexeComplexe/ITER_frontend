import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getHomeContent } from "@/lib/content/home";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "fr",
    path: "/",
    fallbackTitle: getHomeContent("fr").meta.title,
    fallbackDescription: getHomeContent("fr").meta.description,
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
