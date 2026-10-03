import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildMetadata } from "@/lib/metadata";
import { getTeamMembers as getTeamMembersStatic } from "@/lib/content/team";
import { getCmsNavigation } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    locale: "en",
    path: "/en/about",
    localizedPaths: { fr: "/a-propos", en: "/en/about", es: "/es/quienes-somos" },
    // SEO-002 (2026-08-09) — 2021 confirmé par la direction.
    title: "Iter Advisors: team, history and offices",
    description: "Meet the Iter Advisors team and discover the firm’s history and organisation. Finance and HR support in France and Spain.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembersStatic("en"),
    getCmsNavigation("en"),
  ]);
  return <AboutPage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
