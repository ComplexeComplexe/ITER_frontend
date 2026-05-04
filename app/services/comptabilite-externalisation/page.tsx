import { Metadata } from "next";
import ComptabiliteExternalisationPage from "@/components/pages/ComptabiliteExternalisationPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getComptabiliteExternalisationContent } from "@/lib/content/comptabilite-externalisation";

export async function generateMetadata(): Promise<Metadata> {
  const t = getComptabiliteExternalisationContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/comptabilite-externalisation",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getComptabiliteExternalisationContent("fr");
  return (
    <ComptabiliteExternalisationPage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
