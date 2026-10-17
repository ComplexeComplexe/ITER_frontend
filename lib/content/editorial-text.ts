import { getCompanyGeography } from "@/lib/company-facts";
import { contractCopy } from "./contract-copy";
import { decodeHTML } from "entities";
import english from './editorial-locales/en.json';
import spanish from './editorial-locales/es.json';
import overrides from './editorial-locales/overrides.json';
import { parityHref } from '@/lib/locale-route-map';
type TargetLocale = 'en' | 'es';
const dictionaries: Record<TargetLocale, Record<string, string>> = { en: { ...english, ...overrides.en }, es: { ...spanish, ...overrides.es } };
const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
const escape = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const decode = decodeHTML;

/**
 * NATIF-EN-ES (2026-10-17) — formats de nombres par langue.
 *
 * Les nœuds de texte qui ne contiennent qu'un montant ou un pourcentage
 * (« 600 000 € », « 7 % » dans une cellule de tableau) n'ont pas d'entrée au
 * dictionnaire : ils sortaient en format français sur les pages anglaises et
 * espagnoles. Le format suit la langue : « €600,000 » et « 7% » en anglais,
 * « 600.000 € » en espagnol (le « 7 % » espacé est correct en espagnol).
 * Idempotent : un texte déjà au bon format ne change pas.
 */
export function formatNumbers(text: string, locale: TargetLocale): string {
  // Le séparateur de milliers français est une espace, insécable (U+00A0) ou
  // fine insécable (U+202F) selon la source : les trois formes sont traitées.
  const grouped = /(\d{1,3}(?:[   ]\d{3})+)[   ]?€/g;
  // Nœud sans lettres (« 96 000 », « 36 000–96 000 », « 0 – 12 450 € ») : le
  // « € » ou l'unité sont souvent dans le nœud voisin, on ne change que les
  // séparateurs de milliers. Un nœud qui contient des lettres (une phrase,
  // un numéro de téléphone avec indicatif) n'est pas touché par cette règle.
  const digitsOnly = /^[\d\s  €%–\-−+,.()/]+$/.test(text) && /\d{1,3}[   ]\d{3}/.test(text);
  const regroup = (t: string, sep: string) => t.replace(/\d{1,3}(?:[   ]\d{3})+/g, (n) => n.replace(/[   ]/g, sep));
  if (locale === 'en') {
    const out = text
      .replace(grouped, (_, n: string) => `€${n.replace(/[   ]/g, ',')}`)
      .replace(/(\d)[   ]%/g, '$1%');
    return digitsOnly ? regroup(out, ',') : out;
  }
  const out = text
    .replace(grouped, (_, n: string) => `${n.replace(/[   ]/g, '.')} €`)
    .replace(/(\d{1,3}(?:\.\d{3})+)€/g, '$1 €');
  return digitsOnly ? regroup(out, '.') : out;
}

/**
 * Libellés dynamiques (chiffre ou date variable) que le dictionnaire, indexé
 * par phrase exacte, ne peut pas couvrir : « 7 min de lecture », « Mis à
 * jour le 2 octobre 2026 ». Ils sortaient en français sur les pages EN et ES.
 */
const MONTHS_FR = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const MONTHS: Record<TargetLocale, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  es: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
};
function translateDynamic(text: string, locale: TargetLocale): string | undefined {
  const read = text.match(/^(\d+) min de lecture$/);
  if (read) return locale === 'en' ? `${read[1]} min read` : `${read[1]} min de lectura`;
  const updated = text.match(/^Mis à jour le (1er|\d{1,2}) ([a-zéû]+) (\d{4})$/i);
  if (updated) {
    const m = MONTHS_FR.indexOf(updated[2].toLowerCase());
    if (m < 0) return undefined;
    const day = updated[1] === '1er' ? '1' : updated[1];
    return locale === 'en' ? `Updated on ${day} ${MONTHS.en[m]} ${updated[3]}` : `Actualizado el ${day} de ${MONTHS.es[m]} de ${updated[3]}`;
  }
  return undefined;
}

/** Offline, versioned copy only. No browser translation or translation API. */
export function editorialText(text: string, locale: TargetLocale): string {
  const sourceGeography = getCompanyGeography('fr');
  const normalized = normalize(text);
  const geographicKey = normalized === sourceGeography.presence ? 'presence' : normalized === sourceGeography.summary ? 'summary' : undefined;
  const translated = geographicKey ? getCompanyGeography(locale)[geographicKey] : (dictionaries[locale][normalized] ?? translateDynamic(normalized, locale));
  if (translated === undefined) return formatNumbers(text, locale);
  const body = formatNumbers(contractCopy(translated, locale), locale);
  // En anglais, un nœud qui commence par « % » suit un nombre rendu dans le
  // nœud voisin (« {pct} % de nos clients ») : l'espace française avant le
  // signe est retirée pour obtenir « 50% of our customers ».
  const lead = locale === 'en' && body.startsWith('%') ? '' : (text.match(/^\s*/)?.[0] ?? '');
  return lead + body + (text.match(/\s*$/)?.[0] ?? '');
}
export function editorialHtml(html: string, locale: TargetLocale): string {
  return html.split(/(<[^>]*>)/g).map(part => part.startsWith('<')
    ? part.replace(/\b(href|alt|title|aria-label|placeholder)=(['"])(.*?)\2/g, (_, key: string, quote: string, raw: string) => `${key}=${quote}${escape(key === 'href' ? parityHref(decode(raw), locale) : editorialText(decode(raw), locale))}${quote}`)
    : escape(editorialText(decode(part), locale))).join('');
}
