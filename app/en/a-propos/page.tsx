import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "en",
    path: "/en/a-propos",
    localizedPaths: { fr: "/a-propos", en: "/en/a-propos", es: "/es/quienes-somos" },
    fallbackTitle: "About us - Fractional CFO firm since 2019 | Iter Advisors",
    // P1-03: Expanded from 23 chars to full meta description (> 120 chars)
    fallbackDescription: "Iter Advisors is a fractional CFO firm based in Barcelona, Paris and Toulouse. 15+ senior CFOs, 85+ companies served, €100M+ raised. Rated 5/5 on Trustfolio.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembersStatic("en"),
    getCmsNavigation("en"),
  ]);
  return <AboutPage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
