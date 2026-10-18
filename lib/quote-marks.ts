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
  return { open: "« ", close: " »" };
}

/** Entoure un texte des guillemets de sa langue. */
export function quoted(text: string, locale: Locale): string {
  const { open, close } = quoteMarks(locale);
  return `${open}${text}${close}`;
}

/**
 * Séparateurs de ponctuation haute par langue.
 *
 * NATIF-EN-ES phase 2 (2026-10-18) — le pied de page, les blocs RH, le
 * résumé de la stack finance et plusieurs gabarits écrivaient « : » et « ; »
 * à la française, avec une espace devant, sur toutes les pages anglaises et
 * espagnoles (« Your finance contact : », « NIF : »). En anglais comme en
 * espagnol, le signe est collé au mot qui précède ; en français il est
 * précédé d'une espace insécable.
 */
export function colon(locale: Locale): string {
  return locale === "fr" ? "\u00A0: " : ": ";
}

export function semicolon(locale: Locale): string {
  return locale === "fr" ? "\u00A0; " : "; ";
}

/**
 * Retire l'espace française devant « : », « ; », « ? » et « ! » d'un texte
 * anglais ou espagnol. Idempotent ; sans effet en français. Le filet de
 * sécurité couvre les nœuds de texte traduits par le dictionnaire comme les
 * fragments « : » laissés tels quels entre deux nœuds.
 */
export function nativePunctuation(text: string, locale: Locale): string {
  if (locale === "fr") return text;
  return text.replace(/[ \u00A0\u202F]+([:;?!])(?=\s|$)/g, "$1");
}

/** Même normalisation sur du HTML : seuls les nœuds de texte sont touchés. */
export function nativePunctuationHtml(html: string, locale: Locale): string {
  if (locale === "fr") return html;
  return html.split(/(<[^>]*>)/g).map((part) => (part.startsWith("<") ? part : part.replace(/[ \u00A0\u202F]+([:;?!])(?=\s|<|$)/g, "$1"))).join("");
}
