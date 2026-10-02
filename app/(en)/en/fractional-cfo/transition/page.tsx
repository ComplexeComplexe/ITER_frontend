import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("transition", "en");
 return buildMetadata({ locale: "en", path: "/en/fractional-cfo/transition", title: service.title, description: service.description, localizedPaths: {"fr": "/daf-externalise/transition", "en": "/en/fractional-cfo/transition", "es": "/es/externalizacion-daf/transicion"} });
}
export default function Page() { return <FinanceServicePage locale="en" service={getFinanceService("transition", "en")} />; }
