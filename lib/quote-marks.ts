import type { Locale } from "@/lib/i18n";

/**
 * Guillemets de citation par langue.
 *
 * NATIF-EN-ES (2026-10-17) — plusieurs composants partagés entouraient les
 * témoignages de « … » en dur : les pages anglaises affichaient des
 * guillemets français, les pages espagnoles des comillas latinas espacées à
 * la française (l'usage espagnol est «así», sans espace intérieur).
 */
export function quoteMarks(locale: Locale): { open: string; close: string } {
  if (locale === "en") return { open: "“", close: "”" };
  if (locale === "es") return { open: "«", close: "»" };
  return { open: "« ", close: " »" };
}

/** Entoure un texte des guillemets de sa langue. */
export function quoted(text: string, locale: Locale): string {
  const { open, close } = quoteMarks(locale);
  return `${open}${text}${close}`;
}
