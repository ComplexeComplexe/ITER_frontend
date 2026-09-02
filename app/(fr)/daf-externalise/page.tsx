import { Metadata } from "next";
import DafPillarPage from "@/components/pages/DafPillarPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";
import { dafPillar } from "@/lib/content/daf-pillar";

export async function generateMetadata(): Promise<Metadata> {
  // Title et description viennent de lib/content/daf-pillar.ts. L'image
  // Open Graph est celle du site (logo officiel, décision du 2 septembre
  // 2026) : plus d'illustration stock spécifique à cette page.
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/daf-externalise",
    localizedPaths: { fr: "/daf-externalise", en: "/en/fractional-cfo", es: "/es/externalizacion-daf" },
    fallbackTitle: dafPillar.meta.title,
    fallbackDescription: dafPillar.meta.description,
  });
}

export default async function Page() {
  const [cmsNavigation, teamMembers] = await Promise.all([
    getCmsNavigation("fr"),
    getTeamMembers("fr"),
  ]);
  return <DafPillarPage cmsNavigation={cmsNavigation} teamMembers={teamMembers} />;
}
