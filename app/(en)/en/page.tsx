import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "en",
    path: "/",
    fallbackTitle: "Iter Advisors: CFO and HR support for SMEs and startups",
    fallbackDescription: "Meet Iter Advisors and its team: Fractional CFO, management accounting and HR leadership for SMEs and startups.",
  });
}

export default async function Page() {
  const [teamMembers, cmsNavigation, homepage] = await Promise.all([
    getTeamMembers("en"),
    getCmsNavigation("en"),
    getHomepage("en"),
  ]);
  return <HomePage locale="en" teamMembers={teamMembers} cmsNavigation={cmsNavigation} homepage={homepage} />;
}
