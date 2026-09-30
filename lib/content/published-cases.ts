import type { Locale } from "@/lib/i18n";
import type { CaseStudy } from "./case-studies";
import { DOCUMENTED_CASES } from "./documented-cases";

// The historical scenarios remain in the editorial archive until their
// evidence and publication rights are confirmed. Public summaries use the
// same source as the dedicated pages, not a second set of client metrics.
const summaries = {
  en: {
    "solarmente-serie-b-cleantech": ["SolarMente: finance preparation for fundraising and acquisition", "Structure the finance function for international fundraising and an acquisition.", "Financial scenarios, a data room, board reporting and financial integration of the acquisition."],
    "seasonly-marge-par-canal-bfr": ["Seasonly: channel margins and working capital", "Understand margins across direct sales, retail and marketplaces, and plan inventory funding.", "Channel P&Ls, inventory monitoring, a working capital financing plan and weekly reporting."],
    "opti-digital-structuration-financement": ["Opti Digital: building the finance function", "Organise closing, reporting and ERP migration while supporting growth financing.", "ERP migration, monthly reporting, closing processes and support for non-dilutive financing."],
  },
  es: {
    "solarmente-serie-b-cleantech": ["SolarMente: preparar las finanzas para una ronda y una adquisición", "Estructurar la función financiera para una ronda internacional y una adquisición.", "Escenarios financieros, data room, reporting al consejo e integración financiera de la adquisición."],
    "seasonly-marge-par-canal-bfr": ["Seasonly: márgenes por canal y capital circulante", "Entender los márgenes en venta directa, retail y marketplaces, y planificar la financiación del stock.", "Pérdidas y ganancias por canal, seguimiento del stock, plan de financiación del circulante y reporting semanal."],
    "opti-digital-structuration-financement": ["Opti Digital: estructurar la función financiera", "Organizar cierres, reporting y migración del ERP, y acompañar la financiación del crecimiento.", "Migración del ERP, reporting mensual, procesos de cierre y apoyo a la financiación no dilutiva."],
  },
};

export function getPublishedCases(locale: Locale): CaseStudy[] {
  return DOCUMENTED_CASES.map(item => {
    if (locale === "fr") return { ...item, results: [...item.results], teamSize: "", duration: "" };
    const [title, challenge, solution] = summaries[locale][item.slug];
    return { ...item, title, challenge, solution, description: challenge,
      sectorTag: item.company, teamSize: "", duration: "", quote: undefined,
      quoteAuthor: undefined, quoteRole: undefined,
      results: [locale === "en" ? "Scope, deliverables and limitations are described in the detailed French case study. Results are specific to this engagement." : "El alcance, los entregables y los límites se describen en el caso detallado en francés. Los resultados son propios de esta misión."],
    };
  });
}
