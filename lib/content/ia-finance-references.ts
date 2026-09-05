import type { ExternalReference } from "@/lib/content/references";

/** Sources lues le 5 septembre 2026. Les cas éditeur ne sont pas des missions Iter. */
export const IA_SOURCES = {
  usVenture: { title: "U.S. Venture : rapprochements avec Copilot for Finance", source: "Microsoft Customer Stories", url: "https://www.microsoft.com/en/customers/story/20600-us-venture-microsoft-365-copilot-for-finance", date: "28 janvier 2025 ; consulté le 5 septembre 2026" },
  armanino: { title: "Armanino : assistance à la rédaction des demandes de pièces", source: "Anthropic / Claude", url: "https://claude.com/customers/armanino", date: "consulté le 5 septembre 2026" },
  hebbia: { title: "Hebbia : analyse de dossiers financiers avec Claude", source: "Anthropic / Claude", url: "https://claude.com/customers/hebbia", date: "consulté le 5 septembre 2026" },
  dataAnalysis: { title: "Analyse de données avec ChatGPT", source: "OpenAI Help Center", url: "https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt", date: "consulté le 5 septembre 2026" },
  openaiData: { title: "Protection des données des offres professionnelles", source: "OpenAI", url: "https://openai.com/business-data/", date: "consulté le 5 septembre 2026" },
  anthropicData: { title: "Utilisation des données pour l’entraînement", source: "Anthropic Privacy Center", url: "https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training", date: "consulté le 5 septembre 2026" },
  powerBi: { title: "Tarification et licences Power BI", source: "Microsoft", url: "https://www.microsoft.com/fr-fr/power-platform/products/power-bi/pricing", date: "consulté le 5 septembre 2026" },
  pennylane: { title: "Introduction aux API Pennylane", source: "Pennylane", url: "https://pennylane.readme.io/docs/getting-started", date: "consulté le 5 septembre 2026" },
  googleBi: { title: "Fonctions de Data Studio Pro (anciennement Looker Studio)", source: "Google Cloud", url: "https://docs.cloud.google.com/data-studio/about-pro", date: "consulté le 5 septembre 2026" },
  cnil: { title: "Fiches pratiques sur le développement des systèmes d’IA", source: "CNIL", url: "https://www.cnil.fr/fr/les-fiches-pratiques-ia", date: "consulté le 5 septembre 2026" },
} satisfies Record<string, ExternalReference>;
export type IaSourceKey = keyof typeof IA_SOURCES;
export const IA_FINANCE_HUB = { label: "IA & Finance", href: "/ressources/ia-finance" } as const;
export const IA_FINANCE_AUTHOR = { name: "Benjamin Ziza", url: "/a-propos/benjamin-ziza" } as const;
