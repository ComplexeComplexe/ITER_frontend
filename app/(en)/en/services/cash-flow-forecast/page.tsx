import { Metadata } from "next";
import CashFlowForecastPage from "@/components/pages/CashFlowForecastPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import { getCashFlowForecastContent } from "@/lib/content/cash-flow-forecast";

export async function generateMetadata(): Promise<Metadata> {
  const t = getCashFlowForecastContent("en");
  return buildMetadata({
    locale: "en",
    path: "/services/cash-flow-forecast",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("en");
  const content = getCashFlowForecastContent("en");
  return <CashFlowForecastPage locale="en" content={content} cmsNavigation={cmsNavigation} />;
}
