import type { Locale } from "../i18n";
import {
  FINANCE_STACK_LABELS,
  getFinanceStackCategories,
} from "./finance-stack";

export interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
  profile?: string;
}
export interface ToolCategory {
  id: string;
  heading: string;
  description: string;
  tools: Tool[];
}
export interface ToolsPageContent {
  meta: { title: string; description: string };
  breadcrumbLabel: string;
  resourcesLabel: string;
  resourcesHref: string;
  h1: string;
  intro: string;
  categories: ToolCategory[];
  ctaHeading: string;
  ctaText: string;
}
const content = {
  fr: {
    meta: {
      title: "Nos outils finance | Iter Advisors",
      description:
        "Comptabilité, ERP, trésorerie et dépenses : les outils sur lesquels intervient Iter Advisors, leurs usages et les profils d’entreprise concernés.",
    },
    breadcrumbLabel: "Nos outils",
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    h1: "Notre stack technologique",
    ctaHeading: "Besoin d’aide pour structurer votre stack finance ?",
    ctaText:
      "Nous examinons vos besoins et les outils existants avant de définir le périmètre d’intervention.",
  },
  en: {
    meta: {
      title: "Our finance tools | Iter Advisors",
      description:
        "Accounting, ERP, treasury and expenses: the tools Iter Advisors works with, their uses and the typical businesses they serve.",
    },
    breadcrumbLabel: "Our tools",
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    h1: "Our technology stack",
    ctaHeading: "Need help organising your finance tools?",
    ctaText:
      "We review your needs and existing tools before defining the scope of our work.",
  },
  es: {
    meta: {
      title: "Nuestras herramientas financieras | Iter Advisors",
      description:
        "Contabilidad, ERP, tesorería y gastos: las herramientas con las que trabaja Iter Advisors, sus usos y los perfiles de empresa habituales.",
    },
    breadcrumbLabel: "Herramientas",
    resourcesLabel: "Recursos",
    resourcesHref: "/es/recursos",
    h1: "Nuestras herramientas tecnológicas",
    ctaHeading: "¿Necesita organizar sus herramientas financieras?",
    ctaText:
      "Revisamos sus necesidades y herramientas actuales antes de definir el alcance del trabajo.",
  },
} satisfies Record<Locale, Omit<ToolsPageContent, "intro" | "categories">>;

export function getToolsContent(locale: Locale): ToolsPageContent {
  return {
    ...content[locale],
    intro: FINANCE_STACK_LABELS[locale].intro,
    categories: getFinanceStackCategories(locale),
  };
}
