import { Metadata } from "next";
import ToolsPage from "@/components/pages/ToolsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getToolsContent } from "@/lib/content/tools";

const t = getToolsContent("es");

export const metadata: Metadata = buildMetadata({
  locale: "es",
  title: t.meta.title,
  description: t.meta.description,
  path: "/es/ressources/herramientas",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  return <ToolsPage locale="es" cmsNavigation={cmsNavigation} />;
}
