import FinanceServicePage from "@/components/finance/FinanceServicePage";
import { FINANCE_SERVICES } from "@/lib/content/finance-services";
import { buildMetadata } from "@/lib/metadata";

const service = FINANCE_SERVICES.paris;
export function generateMetadata() {
  return buildMetadata({ locale: "fr", path: service.path, title: service.title, description: service.description,
    localizedPaths: { fr: "/daf-externalise-paris", en: "/fractional-cfo-paris", es: "/cfo-externalizado-paris" },
  });
}
export default function Page() { return <FinanceServicePage service={service} />; }
