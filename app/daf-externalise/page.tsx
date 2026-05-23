import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/strapi";
import { getDafContent } from "@/lib/content/daf";

export async function generateMetadata(): Promise<Metadata> {
  // Source meta title/description from lib/content/daf.ts so SEO copy edits
  // there propagate to the actual <title>/<meta description>. The Strapi CMS
  // entry still wins when present.
  const t = getDafContent("fr");
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "fr",
    path: "/daf-externalise",
    localizedPaths: { fr: "/daf-externalise", en: "/en/fractional-cfo", es: "/es/externalizacion-daf" },
    fallbackTitle: t.meta.title,
    fallbackDescription: t.meta.description,
  });
}

export default async function Page() {
  const [cmsNavigation, teamMembers] = await Promise.all([
    getCmsNavigation("fr"),
    getTeamMembers("fr"),
  ]);
  return <DafPage locale="fr" cmsNavigation={cmsNavigation} teamMembers={teamMembers} />;
}
