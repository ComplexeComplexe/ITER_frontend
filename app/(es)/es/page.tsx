import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: "Iter Advisors: CFO y RR. HH. para pymes y startups",
    fallbackDescription: "Conozca Iter Advisors y su equipo: CFO externo, control de gestión y dirección de RR. HH. para pymes y startups.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation, homepage] = await Promise.all([
    getTeamMembers("es"),
    getCmsNavigation("es"),
    getHomepage("es"),
  ]);
  return (
    <HomePage
      locale="es"
      teamMembers={teamMembers}
      cmsNavigation={cmsNavigation}
      homepage={homepage}
    />
  );
}
