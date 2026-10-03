import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { getHomePilotage } from "@/lib/content/home-pilotage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = getHomePilotage("es");
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: meta.title,
    fallbackDescription: meta.description,
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembers("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <HomePage
      locale="es"
      teamMembers={teamMembers}
      cmsNavigation={cmsNavigation}
    />
  );
}
