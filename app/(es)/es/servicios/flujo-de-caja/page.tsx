import { Metadata } from "next";
import CashFlowForecastPage from "@/components/pages/CashFlowForecastPage";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/static-content";
import { getCashFlowForecastContent } from "@/lib/content/cash-flow-forecast";

export async function generateMetadata(): Promise<Metadata> {
  const t = getCashFlowForecastContent("es");
  return buildMetadata({
    locale: "es",
    path: "/services/flujo-de-caja",
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");
  const content = getCashFlowForecastContent("es");
  return <CashFlowForecastPage locale="es" content={content} cmsNavigation={cmsNavigation} />;
}
