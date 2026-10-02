import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("tresorerie", "es");
 return buildMetadata({ locale: "es", path: "/es/services/prevision-tesoreria", title: service.title, description: service.description, localizedPaths: {"fr": "/services/previsionnel-tresorerie", "en": "/en/services/cash-flow-forecast", "es": "/es/services/prevision-tesoreria"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("tresorerie", "es")} />; }
