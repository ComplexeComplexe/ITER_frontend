export const locales = ["fr", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

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
