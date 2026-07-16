import { Locale } from "../i18n";

export interface ExternalReference {
  title: string;
  source: string;
  url: string;
  date?: string;
}

const referencesFr: ExternalReference[] = [
  {
    title:
      "Étude rémunérations DAF — pratiques de rémunération en direction financière",
    source: "DFCG (Association des Directeurs Financiers et de Contrôle de Gestion)",
    url: "https://www.dfcg.fr/",
    date: "2025",
  },
  {
    title: "Démographie et caractéristiques des PME en France",
    source: "INSEE — Institut national de la statistique et des études économiques",
    url: "https://www.insee.fr/fr/statistiques?debut=0&categorie=1",
    date: "2024",
  },
  {
    title: "Financement des PME et startups — dispositifs publics",
    source: "Bpifrance",
    url: "https://www.bpifrance.fr/",
    date: "2025",
  },
  {
    title: "Référentiel professionnel de l'expert-comptable et missions de DAF",
    source: "Conseil Supérieur de l'Ordre des Experts-Comptables",
    url: "https://www.experts-comptables.fr/",
    date: "2024",
  },
  {
    title: "France Digitale Barometer — financement et structuration des startups",
    source: "France Digitale",
    url: "https://francedigitale.org/",
    date: "2025",
  },
];

const referencesEn: ExternalReference[] = [
  {
    title: "CFO Compensation Study — pay practices in finance leadership",
    source: "DFCG (French CFO Association)",
    url: "https://www.dfcg.fr/",
    date: "2025",
  },
  {
    title: "French SMEs — demographics and characteristics",
    source: "INSEE — French National Institute for Statistics and Economic Studies",
    url: "https://www.insee.fr/en/statistiques/",
    date: "2024",
  },
  {
    title: "SME and startup financing — public-sector instruments",
    source: "Bpifrance — French Public Investment Bank",
    url: "https://www.bpifrance.fr/",
    date: "2025",
  },
  {
    title: "France Digitale Barometer — startup funding and structuring",
    source: "France Digitale",
    url: "https://francedigitale.org/",
    date: "2025",
  },
];

const referencesEs: ExternalReference[] = [
  {
    title: "Estudio de retribuciones del CFO — prácticas en dirección financiera",
    source: "DFCG (Asociación francesa de directores financieros)",
    url: "https://www.dfcg.fr/",
    date: "2025",
  },
  {
    title: "Las PYMES en España — informe anual",
    source:
      "Ministerio de Industria, Comercio y Turismo / Dirección General de Industria y de la PYME",
    url: "https://industria.gob.es/",
    date: "2024",
  },
  {
    title: "Financiación pública para startups y PYMES",
    source: "ENISA — Empresa Nacional de Innovación",
    url: "https://www.enisa.es/",
    date: "2025",
  },
  {
    title: "Programa Beckham y régimen fiscal de los nuevos residentes",
    source: "Agencia Tributaria — España",
    url: "https://www.agenciatributaria.es/",
    date: "2024",
  },
];

export function getDafReferences(locale: Locale): ExternalReference[] {
  if (locale === "en") return referencesEn;
  if (locale === "es") return referencesEs;
  return referencesFr;
}

export function getReferencesHeading(locale: Locale): string {
  if (locale === "en") return "Sources & references";
  if (locale === "es") return "Fuentes y referencias";
  return "Sources et références";
}
