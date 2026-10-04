import type { NextConfig } from "next";
type Redirect = Awaited<ReturnType<NonNullable<NextConfig["redirects"]>>>[number];

// GSC workbook checked against production on 2026-10-04.
// Keep exact replacements ahead of legacy wildcard fallbacks.
export const gscRedirects: Redirect[] = [
  // Two related chains found by evaluating the effective routing configuration.
  { source: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance", destination: "/es/recursos/blog/ia-automatizacion-tareas-repetitivas-finanzas", statusCode: 301 },
  { source: "/en/ressources/glossaire/daf", destination: "/en/fractional-cfo/role", statusCode: 301 },
  {"source":"/es/recursos/herramientas/logiciels-paie","destination":"/es/recursos/herramientas/software-nominas","statusCode":301},
  {"source":"/en/ressources/glossaire/fusion-acquisition","destination":"/en/services/ma-due-diligence","statusCode":301},
  {"source":"/en/en/ressources/blog/organiser-sa-direction-financiere","destination":"/en/ressources/blog/organize-finance-department","statusCode":301},
  {"source":"/es/en/ressources/blog/organiser-sa-direction-financiere","destination":"/es/recursos/blog/organizar-direccion-financiera","statusCode":301},
  {"source":"/en/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance","destination":"/en/ressources/blog/ai-automation-repetitive-finance-tasks","statusCode":301},
  {"source":"/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance","destination":"/en/ressources/blog/ai-automation-repetitive-finance-tasks","statusCode":301},
  {"source":"/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance","destination":"/ressources/blog/ia-et-automatisation-des-taches-repetitives","statusCode":301},
  {"source":"/es/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance","destination":"/es/recursos/blog/ia-automatizacion-tareas-repetitivas-finanzas","statusCode":301},
  {"source":"/en/es/services/control-gestion-externalizado","destination":"/en/services/outsourced-management-control","statusCode":301},
  {"source":"/es/en/services/fund-raising-support","destination":"/es/services/soporte-financiacion","statusCode":301},
  {"source":"/en/daf-externalise/secteurs","destination":"/en/fractional-cfo/sectors","statusCode":301},
  {"source":"/es/daf-externalise/secteurs","destination":"/es/externalizacion-daf/sectores","statusCode":301},
  {"source":"/es/daf-externalise/tarifs","destination":"/es/externalizacion-daf/precios","statusCode":301},
  {"source":"/en/services/gestion-financiere-externalisee","destination":"/en/services/financial-operations-organization","statusCode":301},
  {"source":"/en/services/outsourced-financial-management","destination":"/en/services/financial-operations-organization","statusCode":301},
  {"source":"/en/en/services/outsourced-financial-management","destination":"/en/services/financial-operations-organization","statusCode":301},
  {"source":"/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif","destination":"/ressources/blog/levee-de-fonds-guide","statusCode":301},
  {"source":"/en/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif","destination":"/en/ressources/blog/fundraising-guide","statusCode":301},
  {"source":"/es/ressources/blog/levee-de-fonds-dilutif-vs-non-dilutif","destination":"/es/recursos/blog/guia-rondas-financiacion","statusCode":301},
  {"source":"/ressources/blog/daf-transition-quand","destination":"/daf-externalise/transition","statusCode":301},
  {"source":"/ressources/testimonials/seasonly","destination":"/ressources/cas-clients/seasonly-marge-par-canal-bfr","statusCode":301},
  {"source":"/ressources/testimonials/solarmente","destination":"/ressources/cas-clients/solarmente-serie-b-cleantech","statusCode":301},
  {"source":"/es/ressources/testimonials/solarmente","destination":"/es/recursos/casos-de-exito/solarmente-serie-b-cleantech","statusCode":301},
  {"source":"/ressources/testimonials/optidigital","destination":"/ressources/cas-clients/opti-digital-structuration-financement","statusCode":301},
  {"source":"/ressources/testimonials/happy-scribe","destination":"/ressources/blog/cas-etude-happy-scribe","statusCode":301},
  {"source":"/es/ressources/testimonials/happy-scribe","destination":"/es/recursos/blog/caso-happy-scribe-finanzas","statusCode":301},
  {"source":"/en/ressources/testimonials/happy-scribe","destination":"/en/ressources/blog/happy-scribe-finance-case-study","statusCode":301},
  {"source":"/en/services/outsourced-management-accounting","destination":"/en/services/outsourced-management-control","statusCode":301},
  {"source":"/en/ressources/blog/previsionnel-tresorerie-guide-pme","destination":"/en/services/cash-flow-forecast","statusCode":301},
  {"source":"/ressources/glossaire/fusion-acquisition","destination":"/services/ma-due-diligence","statusCode":301},
  {"source":"/ressources/fiche-metier/expert-paie-et-administration-du-personnel","destination":"/services/gestion-paie-charges-sociales","statusCode":301},
  {"source":"/en/ressources/fiche-metier/expert-paie-et-administration-du-personnel","destination":"/en/services/payroll-coordination","statusCode":301},
  {"source":"/ressources/outils/reporting-dataviz","destination":"/ressources/outils/power-bi","statusCode":301},
];

export const removedEditorialPaths = new Set([
  "/ressources/consequences-financieres-cyberattaques",
  "/ressources/blog/consequences-financieres-cyberattaques",
  "/ressources/blog/anticiper-financierement-ses-recrutements-guide-pratique",
  "/en/ressources/blog/anticiper-financierement-ses-recrutements-guide-pratique",
  "/ressources/blog/anticiper-financierement-ses-recrutements-guide-pratiqu",
  "/en/ressources/blog/anticiper-financierement-ses-recrutements-guide-prat",
]);

/** Override obsolete destinations without leaving shadowed duplicate rules. */
export function correctedGscRedirects(legacy: Redirect[]): Redirect[] {
  const corrected = new Set(gscRedirects.map(rule => rule.source));
  return [...gscRedirects, ...legacy.filter(rule =>
    !corrected.has(rule.source) && !removedEditorialPaths.has(rule.source)
  )];
}

export function gscRedirectDestination(pathname: string): string | undefined {
  return gscRedirects.find(rule => rule.source === pathname)?.destination;
}
