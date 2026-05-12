/**
 * Path localization for the language switcher.
 * Maps the current path to the equivalent path in the target locale.
 */

import { Locale } from "./i18n";
import { getCanonicalServiceSlug, SERVICE_URL_SLUG_BY_LOCALE, type ServicePageSlug } from "./strapi";

// ─── Path segment mappings (canonical key → path per locale) ────────────────

const DAF_BASE: Record<Locale, string> = {
  fr: "daf-externalise",
  en: "fractional-cfo",
  es: "externalizacion-daf",
};

/**
 * Alternate EN slugs still recognized as "DAF base" so the language switcher
 * can map legacy `/en/daf-outsourcing/*` URLs back to FR / ES correctly.
 * The canonical EN slug is now `fractional-cfo` (HARMO-01).
 */
const DAF_BASE_ALIASES_EN = new Set(["daf-outsourcing", "fractional-cfo"]);

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

const COOKIE_PATH: Record<Locale, string> = {
  fr: "politique-cookies",
  en: "cookie-policy",
  es: "politica-cookies",
};

const PROFILE_PATH: Record<Locale, string> = {
  fr: "profil",
  en: "profile",
  es: "perfil",
};

const QUALIFICATION_PATH: Record<Locale, string> = {
  fr: "qualification",
  en: "assessment",
  es: "calificacion",
};

const CAMPAIGN_PATH: Record<Locale, string> = {
  fr: "campagne",
  en: "campaign",
  es: "campana",
};

// City landing pages: daf-externalise-{city} ↔ outsourced-cfo-{city} ↔ cfo-externalizado-{city}
const CITY_PAGES: Record<string, Record<Locale, string>> = {
  barcelone: {
    fr: "daf-externalise-barcelone",
    en: "outsourced-cfo-barcelona",
    es: "cfo-externalizado-barcelona",
  },
  paris: {
    fr: "daf-externalise-paris",
    en: "outsourced-cfo-paris",
    es: "cfo-externalizado-paris",
  },
  toulouse: {
    fr: "daf-externalise-toulouse",
    en: "outsourced-cfo-toulouse",
    es: "cfo-externalizado-toulouse",
  },
};

const CITY_PAGE_LOOKUP = new Map<string, string>();
for (const [key, paths] of Object.entries(CITY_PAGES)) {
  for (const v of Object.values(paths)) CITY_PAGE_LOOKUP.set(v, key);
}

// Resources sub-paths that vary by locale (excluding blog/glossaire which have [slug] handling)
const RESOURCES_TOOLS: Record<Locale, string> = {
  fr: "outils",
  en: "tools",
  es: "herramientas",
};
const RESOURCES_TOOLS_ALIASES = new Set(["outils", "tools", "herramientas"]);

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

  // Contact, Jobs, Clients, Diagnostic (same slug across locales)
  if (segs[0] === "contact" && segs.length === 1) return `${prefix}/contact`;
  if (segs[0] === "jobs") return `${prefix}/${segs.join("/")}`;
  if (segs[0] === "clients" && segs.length === 1) return `${prefix}/clients`;
  if (segs[0] === "diagnostic" && segs.length === 1) return `${prefix}/diagnostic`;

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

  // Cookies
  if (
    segs.length === 1 &&
    (segs[0] === "politique-cookies" || segs[0] === "cookie-policy" || segs[0] === "politica-cookies")
  ) {
    return `${prefix}/${COOKIE_PATH[targetLocale]}`;
  }

  // Profile / Qualification / Campaign (single-page locale variants)
  if (segs.length === 1 && (segs[0] === "profil" || segs[0] === "profile" || segs[0] === "perfil")) {
    return `${prefix}/${PROFILE_PATH[targetLocale]}`;
  }
  if (
    segs.length === 1 &&
    (segs[0] === "qualification" || segs[0] === "assessment" || segs[0] === "calificacion")
  ) {
    return `${prefix}/${QUALIFICATION_PATH[targetLocale]}`;
  }
  if (segs.length === 1 && (segs[0] === "campagne" || segs[0] === "campaign" || segs[0] === "campana")) {
    return `${prefix}/${CAMPAIGN_PATH[targetLocale]}`;
  }

  // City landing pages: daf-externalise-{city} ↔ outsourced-cfo-{city} ↔ cfo-externalizado-{city}
  if (segs.length === 1) {
    const cityKey = CITY_PAGE_LOOKUP.get(segs[0]);
    if (cityKey) return `${prefix}/${CITY_PAGES[cityKey][targetLocale]}`;
  }

  // DAF — accept the EN `fractional-cfo` alias as well, since users may land
  // on the canonical /en/fractional-cfo URL.
  const dafBases = [...Object.values(DAF_BASE), ...DAF_BASE_ALIASES_EN];
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
  // Also handle /recursos (ES canonical) since middleware redirects /es/ressources/* → /es/recursos/*.
  if (segs[0] === "ressources" || segs[0] === "recursos") {
    const resourcesBase = `${prefix}/ressources`;
    if (segs.length === 1) return resourcesBase;

    // Tools hub: outils ↔ tools ↔ herramientas (+ sub-categories share the same slugs)
    if (RESOURCES_TOOLS_ALIASES.has(segs[1])) {
      const toolsBase = `${resourcesBase}/${RESOURCES_TOOLS[targetLocale]}`;
      if (segs.length === 2) return toolsBase;
      return `${toolsBase}/${segs.slice(2).join("/")}`;
    }

    // Same-slug sub-hubs across locales
    if (segs[1] === "cas-clients" || segs[1] === "case-studies") {
      // Canonical is cas-clients; case-studies 301-redirects to it.
      return `${resourcesBase}/cas-clients${segs.length > 2 ? "/" + segs.slice(2).join("/") : ""}`;
    }
    if (segs[1] === "testimonials") return `${resourcesBase}/testimonials`;
    if (segs[1] === "blog") {
      if (segs.length === 2) return `${resourcesBase}/blog`;
      return `${resourcesBase}/blog/${segs.slice(2).join("/")}`;
    }
    if (segs[1] === "fiche-metier" || segs[1] === "job-descriptions") {
      if (segs.length === 2) return `${resourcesBase}/fiche-metier`;
      return `${resourcesBase}/fiche-metier/${segs.slice(2).join("/")}`;
    }
    // Glossary: glossaire (FR/EN canonical) / glossary-en (EN legacy) / preserve [slug] if present
    if (segs[1] === "glossaire" || segs[1] === "glossary-en" || segs[1] === "glossary") {
      if (segs.length === 2) return `${resourcesBase}/glossaire`;
      return `${resourcesBase}/glossaire/${segs.slice(2).join("/")}`;
    }
    // Unknown sub-path under /ressources: preserve segments under the target locale prefix.
    return `${resourcesBase}/${segs.slice(1).join("/")}`;
  }

  // Fallback: preserve the path under the target locale prefix. Most unmapped
  // routes share their slug across locales (or have middleware/next.config
  // redirects that resolve mismatches), so this is safer than dropping the
  // user on the locale home page.
  return `${prefix}/${segs.join("/")}`;
}
