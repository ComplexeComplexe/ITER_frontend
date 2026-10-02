import { alignedPaths } from "@/lib/content/locale-publication";
import { buildMetadata } from "@/lib/metadata";
import type { FinanceService } from "@/lib/content/finance-services";

export function financeServiceMetadata(service: FinanceService) {
  return buildMetadata({
    locale: "fr",
    path: service.path,
    title: service.title,
    description: service.description,
    localizedPaths: alignedPaths(service.path),
    disableHreflang: !alignedPaths(service.path) && ["/services/gestion-financiere-externalisee", "/fractional-cfo-startups"].includes(service.path) ? ["en", "es"] : undefined,
  });
}
