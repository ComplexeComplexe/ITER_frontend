import type { ExternalReference } from "@/lib/content/references";

/**
 * Sources de la section « IA & Finance » (/ressources/ia-finance/*).
 *
 * IA-FINANCE (2026-09-01) — les contenus livrés par l'audit citaient des
 * prix d'outils et des politiques de confidentialité sans lien. Chaque URL
 * ci-dessous a été vérifiée (200) le 1er septembre 2026 ; les prix cités dans
 * les pages renvoient à ces grilles éditeur, jamais à une estimation maison.
 */
const REFS = {
  powerBiPricing: {
    title: "Power BI : plans de tarification",
    source: "Microsoft",
    url: "https://www.microsoft.com/fr-fr/power-platform/products/power-bi/pricing",
    date: "consulté le 1er septembre 2026",
  },
  powerBiLicences: {
    title: "Types de licences et fonctionnalités du service Power BI",
    source: "Microsoft Learn",
    url: "https://learn.microsoft.com/fr-fr/power-bi/fundamentals/service-features-license-type",
    date: "consulté le 1er septembre 2026",
  },
  lookerStudio: {
    title: "Looker Studio",
    source: "Google",
    url: "https://lookerstudio.google.com/",
    date: "consulté le 1er septembre 2026",
  },
  openaiPricing: {
    title: "Tarification ChatGPT (Team, Enterprise)",
    source: "OpenAI",
    url: "https://openai.com/chatgpt/pricing/",
    date: "consulté le 1er septembre 2026",
  },
  openaiData: {
    title: "How your data is used to improve model performance",
    source: "OpenAI Help Center",
    url: "https://help.openai.com/en/articles/5722486-how-your-data-is-used-to-improve-model-performance",
    date: "consulté le 1er septembre 2026",
  },
  anthropicPricing: {
    title: "Plans & Pricing — Claude",
    source: "Anthropic",
    url: "https://www.anthropic.com/pricing",
    date: "consulté le 1er septembre 2026",
  },
  anthropicData: {
    title: "Is my data used for model training?",
    source: "Anthropic Privacy Center",
    url: "https://privacy.anthropic.com/en/articles/7996868-is-my-data-used-for-model-training",
    date: "consulté le 1er septembre 2026",
  },
  googlePrivacy: {
    title: "Guide sur la confidentialité de l'IA générative dans Google Workspace",
    source: "Google Workspace",
    url: "https://support.google.com/a/answer/15706919?hl=fr",
    date: "consulté le 1er septembre 2026",
  },
  googlePricing: {
    title: "Tarifs Google Workspace",
    source: "Google",
    url: "https://workspace.google.com/intl/fr/pricing",
    date: "consulté le 1er septembre 2026",
  },
  cnil: {
    title: "Les fiches pratiques IA",
    source: "CNIL",
    url: "https://www.cnil.fr/fr/les-fiches-pratiques-ia",
    date: "consulté le 1er septembre 2026",
  },
} satisfies Record<string, ExternalReference>;

export type IaFinancePage =
  | "automatiser-reporting-financier"
  | "chatgpt-finance"
  | "llm-finance"
  | "outils"
  | "feuille-de-route-90-jours";

const BY_PAGE: Record<IaFinancePage, ExternalReference[]> = {
  "automatiser-reporting-financier": [REFS.powerBiPricing, REFS.lookerStudio, REFS.openaiData],
  "chatgpt-finance": [REFS.openaiPricing, REFS.openaiData, REFS.cnil],
  "llm-finance": [
    REFS.openaiPricing,
    REFS.openaiData,
    REFS.anthropicPricing,
    REFS.anthropicData,
    REFS.googlePricing,
    REFS.googlePrivacy,
    REFS.cnil,
  ],
  outils: [
    REFS.powerBiPricing,
    REFS.powerBiLicences,
    REFS.lookerStudio,
    REFS.openaiPricing,
    REFS.anthropicPricing,
    REFS.googlePricing,
  ],
  "feuille-de-route-90-jours": [REFS.lookerStudio, REFS.powerBiPricing, REFS.cnil],
};

export function getIaFinanceReferences(page: IaFinancePage): ExternalReference[] {
  return BY_PAGE[page];
}

export const IA_FINANCE_HUB = { label: "IA & Finance", href: "/ressources/ia-finance" } as const;
export const IA_FINANCE_AUTHOR = { name: "Benjamin Ziza", url: "/a-propos/benjamin-ziza" } as const;
