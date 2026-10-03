import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "es",
    path: "/es/quienes-somos",
    // A1 (W31c 2026-08-02) — /en/a-propos 301 vers /en/about.
    localizedPaths: { fr: "/a-propos", en: "/en/about", es: "/es/quienes-somos" },
    // P2-03: Shortened from 72 chars to 49 chars
    title: "Iter Advisors: equipo, historia y oficinas",
    // P1-03: Expanded from 23 chars to full meta description (> 120 chars)
    description: "Conoce al equipo de Iter Advisors, su historia y organización. Apoyo financiero y de RRHH en Francia y España.",
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
