import { Metadata } from "next";
import ControleDeGestionExternalisePage from "@/components/pages/ControleDeGestionExternalisePage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getControleDeGestionExternaliseeContent } from "@/lib/content/controle-de-gestion-externalise";

export async function generateMetadata(): Promise<Metadata> {
  const t = getControleDeGestionExternaliseeContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/controle-de-gestion-externalise",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getControleDeGestionExternaliseeContent("fr");
  return (
    <ControleDeGestionExternalisePage
      locale="fr"
      content={content}
      cmsNavigation={cmsNavigation}
    />
  );
}
