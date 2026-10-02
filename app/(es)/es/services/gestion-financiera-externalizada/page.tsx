import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("organisation", "es");
 return buildMetadata({ locale: "es", path: "/es/services/gestion-financiera-externalizada", title: service.title, description: service.description, localizedPaths: {"fr": "/services/gestion-financiere-externalisee", "en": "/en/services/financial-operations-organization", "es": "/es/services/gestion-financiera-externalizada"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("organisation", "es")} />; }
