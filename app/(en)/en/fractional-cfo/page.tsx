import type { Metadata } from "next";
import DafPillarPage from "@/components/pages/DafPillarPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/static-content";
import { getDafPillarContent } from "@/lib/content/daf-pillar-locales";

export function generateMetadata(): Metadata {
  const t = getDafPillarContent("en");
  return buildMetadata({
    locale: "en", path: "/en/fractional-cfo", title: t.meta.title, description: t.meta.description,
    localizedPaths: { fr: "/daf-externalise", en: "/en/fractional-cfo", es: "/es/externalizacion-daf" },
  });
}

export default async function Page() {
  const [cmsNavigation, teamMembers] = await Promise.all([getCmsNavigation("en"), getTeamMembers("en")]);
  return <DafPillarPage locale="en" cmsNavigation={cmsNavigation} teamMembers={teamMembers} />;
}
