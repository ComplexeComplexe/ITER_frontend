import type { Locale } from '@/lib/i18n';
import assets from './editorial-locales/assets.json';
import { translatedThumbnailValue } from '../thumbnails';
export function editorialAsset(source: string, locale: Locale): string {
  if (locale === 'fr') return source;
  const thumbnail = translatedThumbnailValue(source,locale);
  if(thumbnail !== source) return thumbnail;
  const origin = 'https://www.iteradvisors.com';
  const absolute = source.startsWith(origin);
  const path = absolute ? source.slice(origin.length) : source;
  const translated = (assets as Record<string, Record<'en' | 'es', string>>)[path]?.[locale];
  return translated ? (absolute ? origin : '') + translated : source;
}
