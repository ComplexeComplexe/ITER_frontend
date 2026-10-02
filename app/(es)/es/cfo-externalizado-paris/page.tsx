import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("paris", "es");
 return buildMetadata({ locale: "es", path: "/es/cfo-externalizado-paris", title: service.title, description: service.description, localizedPaths: {"fr": "/daf-externalise-paris", "en": "/en/fractional-cfo-paris", "es": "/es/cfo-externalizado-paris"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("paris", "es")} />; }
