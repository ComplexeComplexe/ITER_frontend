import { getDafContent } from "@/lib/content/daf";
import { Metadata } from "next";
import DafPage from "@/components/pages/DafPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const content = getDafContent("es");
  return buildStrapiMetadata({
    endpoint: "daf-externalise-page",
    locale: "es",
    path: "/externalizacion-daf",
    // SEO-AUD-0824 §2 — le slug anglais du cluster DAF est `fractional-cfo`
    // depuis HARMO-01 ; `daf-outsourcing` ne subsiste que comme redirection.
    // Les chemins sont désormais déduits par getLocalizedPath.
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <DafPage locale="es" cmsNavigation={cmsNavigation} />;
}
