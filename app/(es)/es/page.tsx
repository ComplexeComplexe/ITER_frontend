import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "es",
    path: "/",
    fallbackTitle: "Director Financiero Externo | Iter Advisors",
    fallbackDescription: "Iter Advisors: CFO externo para pymes y startups en Barcelona, París y Toulouse. Dirección financiera senior a tiempo compartido, desde 3.000 € al mes.",
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
