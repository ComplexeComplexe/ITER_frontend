import { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers } from "@/lib/strapi";

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
  const teamMembers = await getTeamMembers("fr");
  return <HomePage locale="en" teamMembers={teamMembers} />;
}
