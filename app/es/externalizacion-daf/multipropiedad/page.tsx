import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("es", "multipropiedad")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "es",
    path: "/externalizacion-daf/multipropiedad",
    fallbackTitle: "CFO a tiempo compartido | Iter Advisors",
    fallbackDescription: "CFO a tiempo compartido para pymes.",
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return (
    <DafSubPage
      locale="es"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
