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
  "/ressources/facturation-electronique",
  "/ressources/facturation-electronique/deploiement-pme",
  "/ressources/facturation-electronique/e-reporting",
  "/ressources/facturation-electronique/choisir-plateforme-agreee",
  "/ressources/facturation-electronique/formats-factur-x",
  "/ressources/facturation-electronique/cout-deploiement",

  "/ressources/ia-finance",
  "/ressources/ia-finance/automatiser-reporting-financier",
  "/ressources/ia-finance/chatgpt-finance",
  "/ressources/ia-finance/llm-finance",
  "/ressources/ia-finance/outils",
  "/ressources/ia-finance/feuille-de-route-90-jours",
  "/ressources/ia-finance/retours-experience",

  "/services/recrutement-talent-acquisition",
  "/services/gestion-paie-charges-sociales",
  "/services/formation-developpement",
  "/services/conformite-droit-travail",
  "/drh-externalise", "/drh-externalise/temps-partage",
  "/a-propos", "/contact", "/a-propos/sebastien-doat", "/a-propos/borith-biv",
] as const;
export const LOCALE_ALIGNMENT_DATE = "2026-10-02";
export function alignedPaths(sourcePath: string) {
  return (ALIGNED_PAGE_IDS as readonly string[]).includes(sourcePath) ? LOCALE_ROUTES[sourcePath] : undefined;
}

/** Dates reflect the actual reviewed family, not the most recent batch globally. */
const HR_CABINET_IDS = new Set<string>(["/drh-externalise", "/drh-externalise/temps-partage", "/services/recrutement-talent-acquisition", "/services/gestion-paie-charges-sociales", "/services/formation-developpement", "/services/conformite-droit-travail", "/a-propos", "/contact", "/a-propos/sebastien-doat", "/a-propos/borith-biv"]);
export function localeAlignmentDate(sourcePath: string): string { return sourcePath.startsWith("/ressources/facturation-electronique") ? "2026-10-06" : sourcePath === "/" || HR_CABINET_IDS.has(sourcePath) ? "2026-10-03" : LOCALE_ALIGNMENT_DATE; }
