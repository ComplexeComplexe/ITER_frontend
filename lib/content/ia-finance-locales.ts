import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { IA_GUIDES, type IaGuide } from "./ia-finance-guides";
import { IA_FINANCE_HUB, IA_SOURCES, type IaSourceKey } from "./ia-finance-references";
import en from "./ia-finance-en.json";
import es from "./ia-finance-es.json";

/** Only trusted static editorial HTML. Never accept user HTML here. */
export function localizeIaHtml(html: string, locale: Locale): string {
  if (locale === "fr") return html;
  return html.replace(/<a href="(\/[^"<>]*)"([^>]*)>([\s\S]*?)<\/a>/g, (_, source: string, attrs: string, label: string) => {
    const href = parityHref(source, locale);
    const french = !/^\/(en|es)(\/|$)/.test(href);
    return `<a href="${href}"${french ? ' hreflang="fr"' : ''}${attrs}>${label}${french ? ' <span class="text-xs">(FR)</span>' : ''}</a>`;
  });
}
export function getIaGuide(locale: Locale, slug: string): IaGuide {
  const guide = (locale === "fr" ? IA_GUIDES : ({ en, es }[locale] as unknown as Record<string, IaGuide>))[slug];
  if (!guide) throw new Error(`Unknown IA guide: ${locale}/${slug}`);
  return locale === "fr" ? guide : { ...guide, sections: guide.sections.map(s => ({ ...s, html: localizeIaHtml(s.html, locale) })) };
}
export function iaHub(locale: Locale) {
  return { label: { fr: "IA & Finance", en: "AI & Finance", es: "IA y Finanzas" }[locale], href: parityHref(IA_FINANCE_HUB.href, locale) };
}
export function iaGuideHref(slug: string, locale: Locale) { return parityHref(`${IA_FINANCE_HUB.href}/${slug}`, locale); }
const sourceTitles: Record<"en" | "es", Record<IaSourceKey, string>> = {
 en: { usVenture: "U.S. Venture: reconciliations with Copilot for Finance", armanino: "Armanino: drafting document requests", hebbia: "Hebbia: financial-document analysis with Claude", dataAnalysis: "Data analysis with ChatGPT", openaiData: "Business data protection", anthropicData: "Data use for model training", powerBi: "Power BI pricing and licences (French price list)", pennylane: "Introduction to the Pennylane APIs", googleBi: "Data Studio Pro features (formerly Looker Studio)", cnil: "Practical guidance on developing AI systems" },
 es: { usVenture: "U.S. Venture: conciliaciones con Copilot for Finance", armanino: "Armanino: redacción de solicitudes de documentos", hebbia: "Hebbia: análisis de expedientes financieros con Claude", dataAnalysis: "Análisis de datos con ChatGPT", openaiData: "Protección de datos profesionales", anthropicData: "Uso de datos para entrenamiento", powerBi: "Precios y licencias Power BI (tarifa francesa)", pennylane: "Introducción a las API Pennylane", googleBi: "Funciones de Data Studio Pro (antes Looker Studio)", cnil: "Fichas prácticas sobre desarrollo de sistemas IA" },
};
export function iaReference(key: IaSourceKey, locale: Locale) {
 const reference = IA_SOURCES[key];
 if (locale === "fr") return reference;
 return { ...reference, title: sourceTitles[locale][key], date: (key === "usVenture" ? (locale === "en" ? "28 January 2025; " : "28 de enero de 2025; ") : "") + (locale === "en" ? "source rechecked on 2 October 2026" : "fuente revisada el 2 de octubre de 2026") };
}
