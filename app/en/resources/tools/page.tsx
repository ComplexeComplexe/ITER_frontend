import { Metadata } from "next";
import ToolsPage from "@/components/pages/ToolsPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getToolsContent } from "@/lib/content/tools";

const t = getToolsContent("en");

export const metadata: Metadata = buildMetadata({
  locale: "en",
  title: t.meta.title,
  description: t.meta.description,
  path: "/en/ressources/tools",
});

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  return <ToolsPage locale="en" cmsNavigation={cmsNavigation} />;
}
