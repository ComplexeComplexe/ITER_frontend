import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("fractional", "es");
 return buildMetadata({ locale: "es", path: "/es/cfo-externo-startups", title: service.title, description: service.description, localizedPaths: {"fr": "/fractional-cfo-startups", "en": "/en/fractional-cfo-for-startups", "es": "/es/cfo-externo-startups"} });
}
export default function Page() { return <FinanceServicePage locale="es" service={getFinanceService("fractional", "es")} />; }
