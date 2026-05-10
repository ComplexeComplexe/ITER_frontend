import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";
import { getDafContent } from "@/lib/content/daf";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafContent("en");
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "en",
    path: "/en/fractional-cfo",
    localizedPaths: {
      fr: "/daf-externalise",
      en: "/en/fractional-cfo",
      es: "/es/externalizacion-daf",
    },
    fallbackTitle: t.meta.title,
    fallbackDescription: t.meta.description,
  });
}

export default async function FractionalCFOPage() {
  const [cmsNavigation, teamMembers] = await Promise.all([
    getCmsNavigation("en"),
    getTeamMembers("en"),
  ]);
  return <DafPage locale="en" cmsNavigation={cmsNavigation} teamMembers={teamMembers} />;
}
