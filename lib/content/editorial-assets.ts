import type { Locale } from '@/lib/i18n';
import assets from './editorial-locales/assets.json';
export function editorialAsset(source: string, locale: Locale): string {
  if (locale === 'fr') return source;
  const origin = 'https://www.iteradvisors.com';
  const absolute = source.startsWith(origin);
  const path = absolute ? source.slice(origin.length) : source;
  const translated = (assets as Record<string, Record<'en' | 'es', string>>)[path]?.[locale];
  return translated ? (absolute ? origin : '') + translated : source;
}
