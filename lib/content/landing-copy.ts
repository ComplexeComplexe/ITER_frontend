import type { Locale } from '@/lib/i18n';
import copy from './editorial-locales/landing.json';
/** The landing form keeps its event names, field values and validation logic. */
export function lpText(locale: Locale, source: string): string {
  if (locale === 'fr') return source;
  const normalized = source.replace(/\s+/g, ' ').trim();
  const dictionary = copy[locale] as Record<string, string>;
  return dictionary[normalized] === undefined ? source : (source.match(/^\s*/)?.[0] ?? '') + dictionary[normalized] + (source.match(/\s*$/)?.[0] ?? '');
}
