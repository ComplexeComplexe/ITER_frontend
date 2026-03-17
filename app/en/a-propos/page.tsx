import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "en",
    path: "/a-propos",
    fallbackTitle: "About | Iter Advisors",
    fallbackDescription: "Discover Iter Advisors.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembers("en"),
    getCmsNavigation("en"),
  ]);
  return <AboutPage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
