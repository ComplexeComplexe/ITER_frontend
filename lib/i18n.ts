export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

/**
 * Étiquette BCP 47 à passer à Intl pour chaque langue du site.
 *
 * NATIF-EN-ES phase 2 (2026-10-18) — `Intl.DateTimeFormat("en", …)` retombe
 * sur l'anglais américain et rendait « October 2, 2026 » sur les bylines
 * anglaises, quand les autres pages écrivent « 13 September 2026 ». Le site
 * s'adresse à un lectorat britannique et européen : en-GB partout.
 */
export const INTL_LOCALE: Record<Locale, string> = { fr: "fr-FR", en: "en-GB", es: "es-ES" };

/** Date longue dans la langue de la page (« 2 octobre 2026 », « 2 October 2026 », « 2 de octubre de 2026 »). */
export function formatLongDate(isoDate: string, locale: Locale): string {
  const value = /^\d{4}-\d{2}-\d{2}$/.test(isoDate) ? `${isoDate}T12:00:00Z` : isoDate;
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

export function getLocaleFromPath(pathname: string): Locale {
  const seg = pathname.split("/")[1];
  if (seg === "en" || seg === "es") return seg;
  return "fr";
}

export function getLocalePath(locale: Locale, path: string): string {
  // T3 (2026-05-31) — defensive normalization. GSC's "Pages avec redirection"
  // report flagged /en/en/X and /es/en/X URLs. The next.config catch-alls
  // already redirect them, but the root cause was callers occasionally
  // passing an already-localized path here (e.g. "/en/ressources/blog/X"
  // when locale="en"). Strip any pre-existing /en/ or /es/ prefix before
  // re-applying so the function is idempotent and the bug can't reappear.
  if (path === "/en" || path === "/es") path = "/";
  else if (path.startsWith("/en/") || path.startsWith("/es/")) path = path.slice(3);
  if (locale === "fr") return path;
  return `/${locale}${path === "/" ? "" : path}`;
}

export function getAlternateUrls(path: string): Record<Locale, string> {
  const base = "https://www.iteradvisors.com";
  return {
    fr: `${base}${path}`,
    en: `${base}/en${path === "/" ? "/" : path}`,
    es: `${base}/es${path === "/" ? "/" : path}`,
  };
}
