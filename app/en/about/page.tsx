import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "en",
    path: "/en/about",
    localizedPaths: { fr: "/a-propos", en: "/en/about", es: "/es/quienes-somos" },
    fallbackTitle: "About Iter Advisors | Fractional CFO Firm Since 2019",
    fallbackDescription: "15+ senior CFOs, 85+ companies, €100M+ raised. Iter Advisors brings hands-on CFO leadership to startups and SMEs across France and Spain. Meet the team.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembersStatic("en"),
    getCmsNavigation("en"),
  ]);
  return <AboutPage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
