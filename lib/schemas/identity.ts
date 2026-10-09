import { ORG_ID } from '@/lib/company-facts';
/** Stable identities shared by all Schema.org producers. */
export const SITE_ORIGIN = 'https://www.iteradvisors.com';
export const ORGANIZATION_ID = ORG_ID;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export function absoluteSchemaUrl(path: string): string {
  return new URL(path, `${SITE_ORIGIN}/`).href;
}
export function schemaLanguage(url: string): string {
  const path = new URL(url, SITE_ORIGIN).pathname;
  return path.startsWith('/en/') || path === '/en' ? 'en-GB' : path.startsWith('/es/') || path === '/es' ? 'es-ES' : 'fr-FR';
}
/** Prices are estimates for a defined unit, never a fixed fee inferred from a range. */
export function indicativePriceSpecification(min: number, max: number, unitText: string) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max <= min || !unitText.trim()) {
    throw new Error('Indicative prices require a valid range and an explicit unit');
  }
  return { '@type': 'UnitPriceSpecification', minPrice: min, maxPrice: max,
    priceCurrency: 'EUR', valueAddedTaxIncluded: false,
    ...(/^(?:MONTH|mois|month|mes)$/i.test(unitText) ? { unitCode: 'MON', unitText: unitText === 'MONTH' ? 'mois' : unitText } : { unitText }) };
}
