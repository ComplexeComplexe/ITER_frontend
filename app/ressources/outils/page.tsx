import { Metadata } from "next";
import ToolsPage from "@/components/pages/ToolsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getToolsContent } from "@/lib/content/tools";

const t = getToolsContent("fr");

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: t.meta.title,
  description: t.meta.description,
  path: "/ressources/outils",
    localizedPaths: { fr: "/ressources/outils", en: "/ressources/tools", es: "/ressources/herramientas" },
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return <ToolsPage locale="fr" cmsNavigation={cmsNavigation} />;
}
