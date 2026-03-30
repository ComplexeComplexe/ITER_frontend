import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "es",
    path: "/quienes-somos",
    localizedPaths: { fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" },
    fallbackTitle: "Quiénes somos - Consultoría CFO externalizado desde 2019 | Iter Advisors",
    fallbackDescription: "Descubra Iter Advisors.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembers("es"),
    getCmsNavigation("es"),
  ]);
  return (
    <AboutPage
      locale="es"
      teamMembers={teamMembers}
      cmsNavigation={cmsNavigation}
    />
  );
}
