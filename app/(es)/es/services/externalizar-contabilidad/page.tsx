import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("comptabilite", "es");
 return buildMetadata({ locale: "es", path: "/es/services/externalizar-contabilidad", title: service.title, description: service.description, localizedPaths: {"fr": "/services/comptabilite-externalisation", "en": "/en/services/outsource-your-accounting", "es": "/es/services/externalizar-contabilidad"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("comptabilite", "es")} />; }
