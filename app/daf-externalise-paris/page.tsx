import { Metadata } from "next";
import DafExternalisePariEnrichedPage from "@/components/pages/DafExternalisePariEnrichedPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafExternalisePariEnrichedContent } from "@/lib/content/daf-externalise-paris-enriched";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafExternalisePariEnrichedContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/daf-externalise-paris",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getDafExternalisePariEnrichedContent("fr");
  return (
    <DafExternalisePariEnrichedPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
