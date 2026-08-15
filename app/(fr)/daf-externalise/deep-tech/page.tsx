import { Metadata } from "next";
import DafSubPage from "@/components/pages/DafSubPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getDafSubContent } from "@/lib/content/daf-sub";
import { getCmsNavigation } from "@/lib/strapi";

const content = getDafSubContent("fr", "deep-tech")!;

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: "daf-deep-tech-page",
    locale: "fr",
    path: "/daf-externalise/deep-tech",
    localizedPaths: {
      fr: "/daf-externalise/deep-tech",
      en: "/en/fractional-cfo/deep-tech",
      es: "/es/externalizacion-daf/deep-tech",
    },
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <DafSubPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
