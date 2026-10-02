import { buildMetadata } from "@/lib/metadata";
import type { FinanceService } from "@/lib/content/finance-services";

export function financeServiceMetadata(service: FinanceService) {
  return buildMetadata({
    locale: "fr",
    path: service.path,
    title: service.title,
    description: service.description,
    disableHreflang: ["/services/gestion-financiere-externalisee", "/fractional-cfo-startups"].includes(service.path) ? ["en", "es"] : undefined,
  });
}
