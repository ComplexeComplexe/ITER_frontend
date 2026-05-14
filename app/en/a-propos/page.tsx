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
    localizedPaths: { fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" },
    fallbackTitle: "About us - Outsourced CFO firm since 2019 | Iter Advisors",
    fallbackDescription: "Iter Advisors is a fractional CFO firm based in Barcelona, Paris and Toulouse. Meet our team of senior CFOs, accountants and finance experts.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembersStatic("en"),
    getCmsNavigation("en"),
  ]);
  return <AboutPage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
