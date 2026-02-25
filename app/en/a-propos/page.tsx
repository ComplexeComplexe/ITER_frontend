import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers } from "@/lib/strapi";

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
  const teamMembers = await getTeamMembers("fr");
  return <AboutPage locale="en" teamMembers={teamMembers} />;
}
