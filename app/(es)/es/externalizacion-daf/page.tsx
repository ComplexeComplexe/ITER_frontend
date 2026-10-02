import type { Metadata } from "next";
import DafPillarPage from "@/components/pages/DafPillarPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation, getTeamMembers } from "@/lib/static-content";
import { getDafPillarContent } from "@/lib/content/daf-pillar-locales";

export function generateMetadata(): Metadata {
  const t = getDafPillarContent("es");
  return buildMetadata({
    locale: "es", path: "/es/externalizacion-daf", title: t.meta.title, description: t.meta.description,
    localizedPaths: { fr: "/daf-externalise", en: "/en/fractional-cfo", es: "/es/externalizacion-daf" },
  });
}

export default async function Page() {
  const [cmsNavigation, teamMembers] = await Promise.all([getCmsNavigation("es"), getTeamMembers("es")]);
  return <DafPillarPage locale="es" cmsNavigation={cmsNavigation} teamMembers={teamMembers} />;
}
