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

/**
 * Sources primaires des pages fiscalité France-Espagne.
 *
 * GEO-02 (2026-08-26) — l'audit de visibilité générative a relevé que les
 * cinq pages fiscalité ne citaient aucune source. Une page qui décrit une
 * obligation déclarative espagnole, ses seuils et ses sanctions sans lien
 * vers l'Agencia Tributaria demande au lecteur — et au modèle — de la croire
 * sur parole. Sur ce type de contenu, un moteur génératif reprend la page qui
 * montre d'où elle tient son chiffre.
 *
 * Chaque URL a été vérifiée avant d'être inscrite ici. Deux références
 * plausibles ont d'ailleurs été écartées à ce moment-là : `BOE-A-1995-16898`
 * n'est pas la convention franco-espagnole mais un arrêté sans rapport, et
 * `BOE-A-2022-4583` concerne le statut des sportifs professionnels. Un
 * identifiant BOE ne se devine pas.
 *
 * À revérifier une fois par an : les administrations réorganisent leurs sites.
 */
const AEAT_MODELO_720 = "https://sede.agenciatributaria.gob.es/Sede/procedimientoini/GI34.shtml";
const AEAT_IRPF = "https://sede.agenciatributaria.gob.es/Sede/irpf.html";
const AEAT_NON_RESIDENTS = "https://sede.agenciatributaria.gob.es/Sede/no-residentes.html";
const BOE_LEY_IRPF = "https://www.boe.es/eli/es/l/2006/11/28/35/con";
const CJUE_720 = "https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:62019CJ0788";
const IMPOTS_CONVENTIONS = "https://www.impots.gouv.fr/les-conventions-internationales";
const BOFIP = "https://bofip.impots.gouv.fr/";
const SERVICE_PUBLIC_RESIDENCE = "https://www.service-public.gouv.fr/particuliers/vosdroits/F62";

export type FiscalitePage =
  | "modelo-720"
  | "impot-revenu-espagne"
  | "beckham-law"
  | "double-imposition-france-espagne"
  | "residence-fiscale-france-espagne";

const referencesFiscalite: Record<FiscalitePage, ExternalReference[]> = {
  "modelo-720": [
    {
      title: "Modelo 720 — Declaración informativa sobre bienes y derechos situados en el extranjero",
      source: "Agencia Tributaria (AEAT), procédure officielle",
      url: AEAT_MODELO_720,
    },
    {
      title:
        "Arrêt C-788/19, Commission européenne contre Royaume d'Espagne — le régime de sanctions du Modelo 720 jugé contraire au droit de l'Union",
      source: "Cour de justice de l'Union européenne",
      url: CJUE_720,
      date: "27 janvier 2022",
    },
  ],
  "impot-revenu-espagne": [
    {
      title: "Impuesto sobre la Renta de las Personas Físicas (IRPF) — barèmes et obligations",
      source: "Agencia Tributaria (AEAT)",
      url: AEAT_IRPF,
    },
    {
      title: "Ley 35/2006 del Impuesto sobre la Renta de las Personas Físicas, texte consolidé",
      source: "Boletín Oficial del Estado (BOE)",
      url: BOE_LEY_IRPF,
    },
  ],
  "beckham-law": [
    {
      title:
        "Ley 35/2006, article 93 — régimen especial aplicable a los trabajadores desplazados a territorio español",
      source: "Boletín Oficial del Estado (BOE), texte consolidé",
      url: BOE_LEY_IRPF,
    },
    {
      title: "Impuesto sobre la Renta de no Residentes — règles applicables au régime spécial",
      source: "Agencia Tributaria (AEAT)",
      url: AEAT_NON_RESIDENTS,
    },
  ],
  "double-imposition-france-espagne": [
    {
      title: "Conventions fiscales internationales conclues par la France, dont l'Espagne",
      source: "Direction générale des Finances publiques — impots.gouv.fr",
      url: IMPOTS_CONVENTIONS,
    },
    {
      title: "Bulletin officiel des finances publiques — doctrine fiscale opposable",
      source: "BOFiP-Impôts",
      url: BOFIP,
    },
  ],
  "residence-fiscale-france-espagne": [
    {
      title: "Domicile fiscal : critères de détermination de la résidence en France",
      source: "service-public.gouv.fr — administration française",
      url: SERVICE_PUBLIC_RESIDENCE,
    },
    {
      title: "Résidence fiscale et obligations des non-résidents en Espagne",
      source: "Agencia Tributaria (AEAT)",
      url: AEAT_NON_RESIDENTS,
    },
  ],
};

/** Sources primaires d'une page fiscalité. */
export function getFiscaliteReferences(page: FiscalitePage): ExternalReference[] {
  return referencesFiscalite[page];
}

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
