import { Metadata } from "next";
import DafExternalisePariPage from "@/components/pages/DafExternalisePariPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getDafExternalisePariContent } from "@/lib/content/daf-externalise-paris";

export async function generateMetadata(): Promise<Metadata> {
  const t = getDafExternalisePariContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/daf-externalise-paris",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getDafExternalisePariContent("fr");
  return (
    <DafExternalisePariPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
