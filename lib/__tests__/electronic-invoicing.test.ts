import { describe, it, expect } from 'vitest';
import { getInvoiceContent, invoiceMetadata, INVOICE_ROUTES, INVOICE_SOURCES } from '../content/electronic-invoicing';
import { publishedPaths, parityHref } from '../locale-route-map';
import { navigation } from '../navigation';
import { existsSync, readFileSync } from 'node:fs';

const keys = Object.keys(INVOICE_ROUTES) as (keyof typeof INVOICE_ROUTES)[];
const locales = ['fr', 'en', 'es'] as const;
describe('Electronic invoicing publication', () => {
  it('exposes every translated family through the menu and language switcher', () => {
    for (const locale of locales) {
      expect(navigation[locale].flatMap(item => item.children ?? []).some(item => item.href === INVOICE_ROUTES.guide[locale])).toBe(true);
      for (const key of keys) {
        const paths = INVOICE_ROUTES[key];
        expect(publishedPaths(paths[locale])).toEqual(paths);
        for (const target of locales) expect(parityHref(paths[locale], target)).toBe(paths[target]);
        expect(existsSync(`app/(${locale})${paths[locale]}/page.tsx`)).toBe(true);
      }
    }
  });
  it('keeps equivalent translated structures and valid source and cluster links', () => {
    for (const key of keys) {
      const fr = getInvoiceContent(key, 'fr');
      for (const locale of locales) {
        const page = getInvoiceContent(key, locale);
        expect(page.sections.map(s => [s.id, s.paragraphs.length, s.bullets.length, s.table?.rows.length, s.links, s.sources])).toEqual(fr.sections.map(s => [s.id, s.paragraphs.length, s.bullets.length, s.table?.rows.length, s.links, s.sources]));
        expect(page.faq.length).toBe(fr.faq.length);
        for (const section of page.sections) {
          section.sources.forEach(id => expect(INVOICE_SOURCES[id]).toBeDefined());
          section.links.forEach(id => expect(keys).toContain(id));
          if (section.table) section.table.rows.forEach(row => expect(row).toHaveLength(section.table!.headers.length));
        }
      }
    }
  });
  it('does not publish unapproved client facts, prices or invented observed results', () => {
    const all = JSON.stringify(keys.flatMap(key => locales.map(locale => getInvoiceContent(key, locale))));
    expect(all).not.toMatch(/91 jours|91 days|91 días|Tom Jaufre|C5|\$|\b15%/);
    expect(JSON.stringify(locales.map(locale => getInvoiceContent('cout-deploiement', locale)))).not.toMatch(/€|\$/);
    expect(getInvoiceContent('e-reporting', 'fr').sections.find(s => s.id === 'rapprochement')?.paragraphs[0]).toContain('ne sont pas mécaniquement égaux');
    expect(getInvoiceContent('cout-deploiement', 'fr').quote).toContain('lorsque');
    for (const locale of locales) {
      const csv = readFileSync(`public/downloads/checklist-facturation-electronique-${locale}.csv`, 'utf8');
      expect(csv.trim().split('\n')).toHaveLength(9);
    }
  });
  it('publishes article metadata with concise titles, dedicated images and independent descriptions', () => {
    for (const key of keys) for (const locale of locales) {
      const page = getInvoiceContent(key, locale);
      const metadata = invoiceMetadata(key, locale);
      expect(page.seoTitle.length).toBeLessThanOrEqual(60);
      expect(page.description.length).toBeGreaterThanOrEqual(140);
      expect(page.description.length).toBeLessThanOrEqual(155);
      expect(metadata.openGraph).toHaveProperty('type', 'article');
      expect(metadata.openGraph).toHaveProperty('images.0.url', expect.stringContaining(`/electronic-invoicing/${key}-${locale}.png`));
      expect(existsSync(`public/images/electronic-invoicing/${key}-${locale}.png`)).toBe(true);
    }
  });
  it('keeps practitioner quotes and removes production-process or unmeasured-results claims', () => {
    for (const key of keys) for (const locale of locales) {
      const page = getInvoiceContent(key, locale);
      const text = JSON.stringify(page);
      expect(text).not.toMatch(/À partir des réponses|réponses recueillies|Sébastien (signale|propose|ne dispose)|livrables envisagés|orientation à vérifier|Based on answers|A partir de las respuestas|—/i);
      expect(page.faq.length).toBeGreaterThanOrEqual(6);
      expect(page.faq.length).toBeLessThanOrEqual(8);
      const quotes = Number(Boolean(page.quote)) + page.sections.filter(s => s.quote).length;
      expect(quotes).toBeGreaterThanOrEqual(2);
      expect(quotes).toBeLessThanOrEqual(3);
      expect(page.sections.every(s => s.paragraphs.length > 0)).toBe(true);
    }
  });
  it('ties legal figures to dated primary sources and keeps the published launch tolerance', () => {
    const guide = getInvoiceContent('guide', 'fr');
    const penalties = guide.sections.find(s => s.id === 'sanctions')!;
    expect(penalties.sources).toEqual(['penaltyInvoice', 'penaltyReporting', 'tolerance']);
    expect(penalties.paragraphs.join(' ')).toMatch(/Au 6 octobre 2026/);
    expect(penalties.paragraphs.join(' ')).toMatch(/jusqu’à la fin de 2026/);
    expect(guide.sections.find(s => s.id === 'france-espagne')?.sources).toEqual(['spainSystems', 'spainB2B', 'spainOrder']);
  });
});
