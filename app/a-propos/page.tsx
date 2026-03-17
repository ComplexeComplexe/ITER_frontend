import { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getTeamMembers, getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "about-page",
    locale: "fr",
    path: "/a-propos",
    fallbackTitle: "À propos | Iter Advisors",
    fallbackDescription: "Découvrez Iter Advisors.",
  });
}

export default async function Page() {
  const teamMembers = await getTeamMembers("fr");
  const cmsNavigation = await getCmsNavigation("fr");
  return <AboutPage locale="fr" teamMembers={teamMembers} cmsNavigation={cmsNavigation} />;
}
