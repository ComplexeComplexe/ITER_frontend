import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("transition", "es");
 return buildMetadata({ locale: "es", path: "/es/externalizacion-daf/transicion", title: service.title, description: service.description, localizedPaths: {"fr": "/daf-externalise/transition", "en": "/en/fractional-cfo/transition", "es": "/es/externalizacion-daf/transicion"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("transition", "es")} />; }
