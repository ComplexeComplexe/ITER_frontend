import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("temps-partage", "es");
 return buildMetadata({ locale: "es", path: "/es/externalizacion-daf/tiempo-compartido", title: service.title, description: service.description, localizedPaths: {"fr": "/daf-externalise/temps-partage", "en": "/en/fractional-cfo/shared-time", "es": "/es/externalizacion-daf/tiempo-compartido"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("temps-partage", "es")} />; }
