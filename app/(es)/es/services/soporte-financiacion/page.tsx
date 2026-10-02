import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("levee", "es");
 return buildMetadata({ locale: "es", path: "/es/services/soporte-financiacion", title: service.title, description: service.description, localizedPaths: {"fr": "/services/accompagnement-levee-de-fond", "en": "/en/services/fund-raising-support", "es": "/es/services/soporte-financiacion"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("levee", "es")} />; }
