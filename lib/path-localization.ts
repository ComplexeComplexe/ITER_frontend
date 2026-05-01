/**
 * Path localization for the language switcher.
 * Maps the current path to the equivalent path in the target locale.
 */

import { Locale } from "./i18n";
import { getCanonicalServiceSlug, SERVICE_URL_SLUG_BY_LOCALE, type ServicePageSlug } from "./strapi";

// ─── Path segment mappings (canonical key → path per locale) ────────────────

const DAF_BASE: Record<Locale, string> = {
  fr: "daf-externalise",
  en: "daf-outsourcing",
  es: "externalizacion-daf",
};

const DAF_SUB_PATHS: Record<string, Record<Locale, string>> = {
  // ES path renamed multipropiedad → tiempo-compartido (audit V2 R-4):
  // "multipropiedad" means real-estate timeshare in Spanish, mistranslation.
  "temps-partage": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "shared-time": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "tiempo-compartido": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  // Legacy ES slug kept for backwards path-localization until 301s expire:
  multipropiedad: { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  transition: { fr: "transition", en: "transition", es: "transition" },
  metier: { fr: "metier", en: "metier", es: "metier" },
};

const DRH_BASE: Record<Locale, string> = {
  fr: "drh-externalise",
  en: "hr-outsourcing",
  es: "externalizacion-rrhh",
};

const DRH_SUB_PATHS: Record<string, Record<Locale, string>> = {
  "temps-partage": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "shared-time": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
  "tiempo-compartido": { fr: "temps-partage", en: "shared-time", es: "tiempo-compartido" },
};

const ABOUT_PATH: Record<Locale, string> = {
  fr: "a-propos",
  en: "a-propos",
  es: "quienes-somos",
};

const LEGAL_NOTICE_PATH: Record<Locale, string> = {
  fr: "mentions-legales",
  en: "legal-notice",
  es: "aviso-legal",
};

const PRIVACY_PATH: Record<Locale, string> = {
  fr: "politique-de-confidentialite",
  en: "privacy-policy",
  es: "politica-de-privacidad",
};

function getPathWithoutLocale(pathname: string): { locale: Locale; path: string } {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "en" || segments[0] === "es") {
    return { locale: segments[0] as Locale, path: "/" + segments.slice(1).join("/") };
  }
  return { locale: "fr", path: pathname || "/" };
}

/**
 * Returns the equivalent path in the target locale when switching languages.
 * Falls back to home if the route cannot be mapped.
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  const { locale: currentLocale, path } = getPathWithoutLocale(pathname);
  if (currentLocale === targetLocale) {
    return pathname;
  }

  const prefix = targetLocale === "fr" ? "" : `/${targetLocale}`;

  // Home
  if (path === "/" || path === "") {
    return prefix || "/";
  }

  const segs = path.split("/").filter(Boolean);

  // Contact, Jobs (same path)
  if (segs[0] === "contact" && segs.length === 1) return `${prefix}/contact`;
  if (segs[0] === "jobs" && segs.length === 1) return `${prefix}/jobs`;

  // About
  if (segs[0] === "a-propos" && segs.length === 1) return `${prefix}/${ABOUT_PATH[targetLocale]}`;
  if (segs[0] === "quienes-somos" && segs.length === 1) return `${prefix}/${ABOUT_PATH[targetLocale]}`;

  // Legal
  if (segs[0] === "mentions-legales" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "legal-notice" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "aviso-legal" && segs.length === 1) return `${prefix}/${LEGAL_NOTICE_PATH[targetLocale]}`;
  if (segs[0] === "politique-de-confidentialite" && segs.length === 1)
    return `${prefix}/${PRIVACY_PATH[targetLocale]}`;
  if (segs[0] === "privacy-policy" && segs.length === 1) return `${prefix}/${PRIVACY_PATH[targetLocale]}`;
  if (segs[0] === "politica-de-privacidad" && segs.length === 1)
    return `${prefix}/${PRIVACY_PATH[targetLocale]}`;

  // DAF
  const dafBases = Object.values(DAF_BASE);
  if (dafBases.includes(segs[0]) && segs.length >= 1) {
    const base = `${prefix}/${DAF_BASE[targetLocale]}`;
    if (segs.length === 1) return base;
    const sub = segs[1];
    const subMap = DAF_SUB_PATHS[sub];
    if (subMap) return `${base}/${subMap[targetLocale]}`;
    return `${base}/${sub}`;
  }

  // DRH
  const drhBases = Object.values(DRH_BASE);
  if (drhBases.includes(segs[0]) && segs.length >= 1) {
    const base = `${prefix}/${DRH_BASE[targetLocale]}`;
    if (segs.length === 1) return base;
    const sub = segs[1];
    const subMap = DRH_SUB_PATHS[sub];
    if (subMap) return `${base}/${subMap[targetLocale]}`;
    return `${base}/${sub}`;
  }

  // Services
  if (segs[0] === "services") {
    if (segs.length === 1) return `${prefix}/services`;
    const urlSlug = segs[1];
    const canonical = getCanonicalServiceSlug(currentLocale, urlSlug);
    if (canonical) {
      const targetSlug = SERVICE_URL_SLUG_BY_LOCALE[targetLocale][canonical as ServicePageSlug];
      return `${prefix}/services/${targetSlug}`;
    }
    return `${prefix}/services/${urlSlug}`;
  }

  // Resources (ressources) — structure: /ressources, /ressources/blog, /ressources/blog/[slug], etc.
  if (segs[0] === "ressources") {
    const resourcesBase = `${prefix}/ressources`;
    if (segs.length === 1) return resourcesBase;
    if (segs[1] === "testimonials") return `${resourcesBase}/testimonials`;
    if (segs[1] === "blog") {
      if (segs.length === 2) return `${resourcesBase}/blog`;
      return `${resourcesBase}/blog/${segs.slice(2).join("/")}`;
    }
    if (segs[1] === "fiche-metier") {
      if (segs.length === 2) return `${resourcesBase}/fiche-metier`;
      return `${resourcesBase}/fiche-metier/${segs.slice(2).join("/")}`;
    }
    if (segs[1] === "glossaire") return `${resourcesBase}/glossaire`;
    return pathname;
  }

  // Fallback: home
  return prefix || "/";
}
