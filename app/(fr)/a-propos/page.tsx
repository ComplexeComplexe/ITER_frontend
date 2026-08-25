import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "fr",
    path: "/a-propos",
    // SEO-AUD-0824 §2 — « /a-propos » côté EN produisait /en/a-propos, qui
    // redirige vers /en/about depuis la refonte multilingue.
    localizedPaths: { fr: "/a-propos", en: "/about", es: "/quienes-somos" },
    // SEO-001 + SEO-002 (2026-08-09) — deux problèmes sur un seul title.
    // Il reprenait la requête générique du pilier, et il annonçait
    // « depuis 2019 » quand le corps de cette même page dit « Fondé en
    // 2021 » (lib/content/about.ts). La page se contredisait elle-même.
    // Recentrée sur ce qu'elle est : l'équipe, l'histoire et les bureaux.
    fallbackTitle: "Iter Advisors : équipe, histoire et bureaux",
    fallbackDescription: "Cabinet de DAF externalisé fondé à Barcelone. 15 experts financiers, plus de 85 entreprises accompagnées et 100 M€ de levées. Noté 5/5 sur Trustfolio.",
  });
}

export default async function Page() {
  const teamMembers = await getTeamMembersStatic("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <AboutPage locale="fr" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
