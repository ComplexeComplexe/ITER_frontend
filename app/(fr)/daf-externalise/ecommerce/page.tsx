import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "ecommerce")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-ecommerce-page",
    locale: "fr",
    path: "/daf-externalise/ecommerce",
    // GEO-03 (2026-08-26) — cette page est française uniquement : les deux
    // URL déclarées comme traductions répondent 404. Le défaut est resté
    // invisible tant que la page était absente du sitemap, donc hors de
    // portée de la recette.
    disableHreflang: ["en", "es"],
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
