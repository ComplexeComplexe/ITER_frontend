import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { FINANCE_SERVICES } from "@/lib/content/finance-services";
import { financeServiceMetadata } from "@/lib/finance-service-metadata";

const service = FINANCE_SERVICES["temps-partage"];
export function generateMetadata() { return financeServiceMetadata(service); }
export default function Page() { return <FinanceServicePage service={service} />; }
