import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "es",
    path: "/es/quienes-somos",
    // A1 (W31c 2026-08-02) — /en/a-propos 301 vers /en/about.
    localizedPaths: { fr: "/a-propos", en: "/en/about", es: "/es/quienes-somos" },
    // P2-03: Shortened from 72 chars to 49 chars
    fallbackTitle: "Quiénes somos - CFO externalizado | Iter Advisors",
    // P1-03: Expanded from 23 chars to full meta description (> 120 chars)
    fallbackDescription: "Gabinete de CFO externalizado en Barcelona, París y Toulouse. 15 CFOs senior, 85 empresas acompañadas, 100 M€ captados. Valorado 5/5 en Trustfolio.",
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
