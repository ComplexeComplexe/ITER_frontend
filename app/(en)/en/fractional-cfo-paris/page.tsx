import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("paris", "en");
 return buildMetadata({ locale: "en", path: "/en/fractional-cfo-paris", title: service.title, description: service.description, localizedPaths: {"fr": "/daf-externalise-paris", "en": "/en/fractional-cfo-paris", "es": "/es/cfo-externalizado-paris"} });
}
export default function Page() { return <FinanceServicePage locale="en" service={getFinanceService("paris", "en")} />; }
