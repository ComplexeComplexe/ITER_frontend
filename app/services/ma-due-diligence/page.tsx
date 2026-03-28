import { Metadata } from "next";
import MaDueDiligencePage from "@/components/pages/MaDueDiligencePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getMaDueDiligenceContent } from "@/lib/content/ma-due-diligence";

export async function generateMetadata(): Promise<Metadata> {
  const t = getMaDueDiligenceContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/ma-due-diligence",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getMaDueDiligenceContent("fr");
  return <MaDueDiligencePage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
