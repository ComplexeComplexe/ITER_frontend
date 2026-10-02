import type { Metadata } from "next";
import FinanceServicesHub from "@/components/finance/FinanceServicesHub";
import { getFinanceHub } from "@/lib/content/finance-hub-locales";
import { buildMetadata } from "@/lib/metadata";
export function generateMetadata(): Metadata { const t = getFinanceHub("es"); return buildMetadata({ locale: "es", path: "/es/services", title: t.title + " | Iter Advisors", description: t.description }); }
export default function Page() { return <FinanceServicesHub locale="es" />; }
