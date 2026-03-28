import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "en",
    path: "/",
    fallbackTitle: "Fractional CFO for Startups & SMEs | Iter Advisors",
    fallbackDescription: "Iter Advisors provides fractional CFO and outsourced financial direction for startups and SMEs. Based in Barcelona, Paris and Toulouse. 100M+ EUR raised. Book a free consultation.",
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
