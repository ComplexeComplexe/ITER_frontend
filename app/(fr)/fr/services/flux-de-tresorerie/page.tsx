import { Metadata } from "next";
import CashFlowForecastPage from "@/components/pages/CashFlowForecastPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getCashFlowForecastContent } from "@/lib/content/cash-flow-forecast";

export async function generateMetadata(): Promise<Metadata> {
  const t = getCashFlowForecastContent("fr");
  return buildMetadata({
    locale: "fr",
    path: "/services/flux-de-tresorerie",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const content = getCashFlowForecastContent("fr");
  return <CashFlowForecastPage locale="fr" content={content} cmsNavigation={cmsNavigation} />;
}
