import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation, getHomepage } from "@/lib/static-content";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "homepage",
    locale: "en",
    path: "/",
    fallbackTitle: "Outsourced CFO for Startups in France & Spain | Iter",
    fallbackDescription: "Fractional CFO services for startups and SMEs in Paris, Barcelona and Toulouse. Senior finance leadership from 2 days/month. Free assessment.",
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
