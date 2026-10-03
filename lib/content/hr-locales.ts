import type { Locale } from "@/lib/i18n";
import { hrServices, type HRServiceContent, type HRServiceSlug } from "./hr-services";
import offerEn from "./hr-offer-en.json";
import offerEs from "./hr-offer-es.json";
import servicesEn from "./hr-services-en.json";
import servicesEs from "./hr-services-es.json";

/** Reviewed static server content. Missing translations fail rather than leak French copy. */
export function hrText(source: string, locale: Locale): string {
  if (locale === "fr") return source;
  const dictionary = (locale === "en" ? offerEn : offerEs) as Record<string, string>;
  const value = dictionary[source];
  if (!value) throw new Error(`Missing HR translation: ${locale}/${source}`);
  return value;
}
export function localizeHrValue<T>(value: T, locale: Locale): T {
  if (locale === "fr") return value;
  function walk(v: unknown): unknown {
    if (typeof v === "string") return v.startsWith("/") ? v : hrText(v, locale);
    if (Array.isArray(v)) return v.map(walk);
    if (v && typeof v === "object") return Object.fromEntries(Object.entries(v).map(([key, item]) => [key, walk(item)]));
    return v;
  }
  return walk(value) as T;
}
export function getLocalizedHRService(slug: string, locale: Locale): HRServiceContent {
  const corpus = locale === "fr" ? hrServices : (locale === "en" ? servicesEn : servicesEs);
  const content = corpus[slug as HRServiceSlug];
  if (!content) throw new Error(`Unknown HR service: ${locale}/${slug}`);
  return content;
}
export function hrServiceInterface(locale: Locale) {
  return {
    fr: { eyebrow: "Iter Advisors · Services RH", primary: "Présenter mon besoin RH", method: "Voir la méthode", need: "Votre besoin", work: "Les travaux", scope: "Un périmètre défini avec votre équipe", budget: "Le budget", quote: "Sur devis", perimeter: "Le périmètre", navMethod: "La méthode", formula: "Formule", tableScope: "Périmètre", fee: "Tarif", faq: "Questions fréquentes", cluster: "Direction RH externalisée", clusterIntro: "Ce service est l’une des briques de notre", hr: "direction RH externalisée", available: ", disponible aussi en", partTime: "DRH à temps partagé", siblings: ". Les autres briques :" },
    en: { eyebrow: "Iter Advisors · HR services", primary: "Discuss my HR needs", method: "View the method", need: "Your needs", work: "The work", scope: "A scope agreed with your team", budget: "Budget", quote: "By quotation", perimeter: "Scope", navMethod: "Method", formula: "Engagement", tableScope: "Scope", fee: "Fee", faq: "Frequently asked questions", cluster: "External HR management", clusterIntro: "This service is part of our", hr: "external HR management", available: ", also available as", partTime: "part-time HR management", siblings: ". Other services:" },
    es: { eyebrow: "Iter Advisors · Servicios de RRHH", primary: "Presentar mi necesidad de RRHH", method: "Ver el método", need: "Tu necesidad", work: "Los trabajos", scope: "Un alcance acordado con tu equipo", budget: "El presupuesto", quote: "Según presupuesto", perimeter: "El alcance", navMethod: "El método", formula: "Misión", tableScope: "Alcance", fee: "Honorarios", faq: "Preguntas frecuentes", cluster: "Dirección de RRHH externa", clusterIntro: "Este servicio forma parte de nuestra", hr: "dirección de RRHH externa", available: ", disponible también como", partTime: "dirección de RRHH a tiempo parcial", siblings: ". Otros servicios:" },
  }[locale];
}
