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

/** Offline, versioned copy only. No browser translation or translation API. */
export function editorialText(text: string, locale: TargetLocale): string {
  const translated = dictionaries[locale][normalize(text)];
  if (translated === undefined) return text;
  return (text.match(/^\s*/)?.[0] ?? '') + contractCopy(translated, locale) + (text.match(/\s*$/)?.[0] ?? '');
}
export function editorialHtml(html: string, locale: TargetLocale): string {
  return html.split(/(<[^>]*>)/g).map(part => part.startsWith('<')
    ? part.replace(/\b(href|alt|title|aria-label|placeholder)=(['"])(.*?)\2/g, (_, key: string, quote: string, raw: string) => `${key}=${quote}${escape(key === 'href' ? parityHref(decode(raw), locale) : editorialText(decode(raw), locale))}${quote}`)
    : escape(editorialText(decode(part), locale))).join('');
}
