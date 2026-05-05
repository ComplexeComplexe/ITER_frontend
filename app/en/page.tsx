import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "en",
    path: "/",
    fallbackTitle: "Fractional CFO for Fast-Growing Startups | Iter Advisors",
    fallbackDescription: "Need a CFO without the €150K salary? Expert financial direction for fundraising, cash flow & growth. Trusted by 100+ startups. Free consultation available.",
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
