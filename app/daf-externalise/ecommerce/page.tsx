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
    localizedPaths: {
      fr: "/daf-externalise/ecommerce",
      en: "/en/fractional-cfo/ecommerce",
      es: "/es/externalizacion-daf/ecommerce",
    },
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
