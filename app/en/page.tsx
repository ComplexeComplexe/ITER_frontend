import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "en",
    path: "/",
    fallbackTitle: "Fractional CFO | Iter Advisors",
    fallbackDescription: "Iter Advisors: fractional CFO for SMEs and startups.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation] = await Promise.all([
    getTeamMembers("en"),
    getCmsNavigation("en"),
  ]);
  return <HomePage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
