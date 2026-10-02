import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("controle", "es");
 return buildMetadata({ locale: "es", path: "/es/services/control-gestion-externalizado", title: service.title, description: service.description, localizedPaths: {"fr": "/services/controle-de-gestion-externalise", "en": "/en/services/outsourced-management-control", "es": "/es/services/control-gestion-externalizado"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("controle", "es")} />; }
