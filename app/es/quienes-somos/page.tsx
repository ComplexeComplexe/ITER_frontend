import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "es",
    path: "/quienes-somos",
    localizedPaths: { fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" },
    fallbackTitle: "Quiénes somos — CFO externalizado desde 2019 | Iter Advisors",
    fallbackDescription: "Iter Advisors, gabinete de CFO externalizado fundado en 2019. Equipo senior con sede en Barcelona, París y Toulouse. Conozca a nuestros directores financieros.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembersStatic("es"),
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
