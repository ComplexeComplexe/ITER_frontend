import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: "Director Financiero Externo | Iter Advisors",
    fallbackDescription: "Iter Advisors: CFO externo para pymes y startups.",
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
