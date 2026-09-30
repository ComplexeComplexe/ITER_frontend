/** Substantive page changes. Shared navigation changes do not refresh every URL. */
export const PAGE_REVISIONS: Record<string, string> = {
  "/es/cfo-externalizado-barcelona": "2026-09-30",
  "/es/cfo-externalizado-paris": "2026-09-30",
  "/en/outsourced-cfo-barcelona": "2026-09-30",
  "/en/outsourced-cfo-paris": "2026-09-30",
  "/es/recursos/blog/que-es-fractional-cfo": "2026-09-30",
  "/ressources/glossaire/daf": "2026-09-30",
  "/ressources/glossaire/fractional-cfo": "2026-09-30",
  "/ressources/ia-finance/automatiser-reporting-financier": "2026-09-30",
  "/ressources/ia-finance/chatgpt-finance": "2026-09-30",
  "/contact": "2026-09-30",
  "/en/contact": "2026-09-30",
  "/es/contact": "2026-09-30",

  "/ressources/glossaire/bspce-bsa": "2026-09-13",
  "/ressources/blog/cfo-externe-role-missions-2026": "2026-09-13",
  "/ressources/glossaire/cfo": "2026-09-13",
  "/": "2026-09-30",
  "/en": "2026-09-30",
  "/es": "2026-09-30",
  "/ressources": "2026-09-12",
  "/en/ressources": "2026-09-12",
  "/es/recursos": "2026-09-12",
  "/daf-externalise": "2026-09-30",
  "/daf-externalise/tarifs": "2026-09-26",
  "/daf-externalise/transition": "2026-09-12",
  "/services/controle-de-gestion-externalise": "2026-09-12",
  "/en/services/outsource-your-accounting": "2026-09-12",
  "/en/services/outsourced-management-control": "2026-09-12",
  "/en/services/fund-raising-support": "2026-09-13",
  "/es/services/soporte-financiacion": "2026-09-13",
  "/es/externalizacion-daf/transicion": "2026-09-13",
  "/drh-externalise": "2026-09-13",
  "/en/hr-outsourcing": "2026-09-13",
  "/es/externalizacion-rrhh": "2026-09-13",
  "/ressources/blog/daf-externalise-vs-daf-salarie": "2026-09-13",
  "/ressources/blog/checklist-due-diligence-levee-de-fonds": "2026-09-13",
};

export function latestRevision(...dates: Array<string | Date | undefined>): string {
  return dates.filter((date): date is string | Date => !!date)
    .map(date => (date instanceof Date ? date.toISOString() : date).slice(0, 10))
    .sort().at(-1) ?? "";
}
