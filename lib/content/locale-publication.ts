import { LOCALE_ROUTES } from "@/lib/locale-route-map";

/** Reviewed page families implemented in the shared templates, 2 October 2026.
 * Other existing translations stay live but are not declared aligned. */
export const ALIGNED_PAGE_IDS = [
  "/",
  "/daf-externalise", "/services", "/fractional-cfo-startups", "/daf-externalise-paris",
  "/daf-externalise/temps-partage", "/daf-externalise/transition",
  "/services/controle-de-gestion-externalise", "/services/comptabilite-externalisation",
  "/services/previsionnel-tresorerie", "/services/gestion-financiere-externalisee",
  "/services/accompagnement-levee-de-fond", "/services/ma-due-diligence",
  "/ressources/cas-clients/solarmente-serie-b-cleantech", "/ressources/cas-clients/seasonly-marge-par-canal-bfr", "/ressources/cas-clients/opti-digital-structuration-financement",
  "/daf-externalise/tarifs", "/daf-externalise/metier",
  "/daf-externalise-barcelone", "/daf-externalise-toulouse",
  "/daf-externalise/secteurs", "/daf-externalise/ecommerce", "/daf-externalise/industrie", "/daf-externalise/deep-tech",
  "/ressources",
  "/ressources/ia-finance",
  "/ressources/ia-finance/automatiser-reporting-financier",
  "/ressources/ia-finance/chatgpt-finance",
  "/ressources/ia-finance/llm-finance",
  "/ressources/ia-finance/outils",
  "/ressources/ia-finance/feuille-de-route-90-jours",
  "/ressources/ia-finance/retours-experience",

] as const;
export const LOCALE_ALIGNMENT_DATE = "2026-10-02";
export function alignedPaths(sourcePath: string) {
  return (ALIGNED_PAGE_IDS as readonly string[]).includes(sourcePath) ? LOCALE_ROUTES[sourcePath] : undefined;
}
