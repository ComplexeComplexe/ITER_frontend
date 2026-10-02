import type { Metadata } from "next";
import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { getFinanceService } from "@/lib/content/finance-service-locales";
import { buildMetadata } from "@/lib/metadata";

export function generateMetadata(): Metadata {
 const service = getFinanceService("due-diligence", "en");
 return buildMetadata({ locale: "en", path: "/en/services/ma-due-diligence", title: service.title, description: service.description, localizedPaths: {"fr": "/services/ma-due-diligence", "en": "/en/services/ma-due-diligence", "es": "/es/services/ma-due-diligence"} });
}
export default function Page() { return <FinanceServicePage locale="en" service={getFinanceService("due-diligence", "en")} />; }
