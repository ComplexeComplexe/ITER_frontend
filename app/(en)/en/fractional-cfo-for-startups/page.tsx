import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("fractional", "en");
 return buildMetadata({ locale: "en", path: "/en/fractional-cfo-for-startups", title: service.title, description: service.description, localizedPaths: {"fr": "/fractional-cfo-startups", "en": "/en/fractional-cfo-for-startups", "es": "/es/cfo-externo-startups"} });
}
export default function Page() { return <FinanceServicePage locale="en" service={getFinanceService("fractional", "en")} />; }
