import { Metadata } from "next";
import MaDueDiligencePage from "@/components/pages/MaDueDiligencePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getMaDueDiligenceContent } from "@/lib/content/ma-due-diligence";

export async function generateMetadata(): Promise<Metadata> {
  const t = getMaDueDiligenceContent("es");
  return buildMetadata({
    locale: "es",
    path: "/services/ma-due-diligence",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  const content = getMaDueDiligenceContent("es");
  return <MaDueDiligencePage locale="es" content={content} cmsNavigation={cmsNavigation} />;
}
