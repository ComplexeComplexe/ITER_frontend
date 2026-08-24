import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("es", "tiempo-compartido")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-temps-partage-page",
    locale: "es",
    path: "/externalizacion-daf/tiempo-compartido",
    // SEO-AUD-0824 §2 — le slug anglais du cluster DAF est `fractional-cfo`
    // depuis HARMO-01 ; `daf-outsourcing` ne subsiste que comme redirection.
    // Les chemins sont désormais déduits par getLocalizedPath.
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
