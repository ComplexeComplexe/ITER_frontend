import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import DrhFrenchPage from '@/components/pages/DrhFrenchPage';
import { HR_FAQ } from '@/lib/content/hr-offer';
import { parityHref } from '@/lib/locale-route-map';

vi.mock('@/components/PageLayout', () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
const locales = ['fr', 'en', 'es'] as const;
const parse = (locale: typeof locales[number]) => new DOMParser().parseFromString(renderToStaticMarkup(<DrhFrenchPage locale={locale} />), 'text/html');

describe('Validated HR commercial offer', () => {
  it('publishes consistent VAT-exclusive fees and visible FAQ across locales without mutating the shared offer', () => {
    const original = JSON.stringify(HR_FAQ);
    for (const locale of locales) {
      const page = parse(locale);
      const schemas = [...page.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent!));
      const service = schemas.find(schema => schema['@type'] === 'Service');
      const offers = service.hasOfferCatalog.itemListElement;
      expect(offers[0].priceSpecification).toBeUndefined();
      expect(offers.every((offer: { price?: string }) => offer.price === undefined)).toBe(true);
      expect(offers[1].priceSpecification).toMatchObject({ minPrice: 3200, maxPrice: 4800, priceCurrency: 'EUR', valueAddedTaxIncluded: false });
      expect(offers[2].priceSpecification).toBeUndefined();
      const faq = schemas.find(schema => schema['@type'] === 'FAQPage');
      expect(faq.mainEntity[1].acceptedAnswer.text).toBe(page.querySelectorAll('#questions details p')[1].textContent);
      const feeText = page.querySelector('#budget')!.textContent!.replace(/[\s.,]/g, '');
      expect(feeText).not.toContain('1800'); expect(feeText).toContain('3200'); expect(feeText).toContain('4800');
      expect(page.querySelector('#budget article')!.textContent).toMatch(/Sur devis|By quotation|Según presupuesto/);
      const comparison = page.querySelector('#alternatives')!.textContent!;
      expect(comparison).toMatch(/brut|gross/);
      expect(comparison).not.toMatch(/250|450|60\s*%/);
    }
    expect(JSON.stringify(HR_FAQ)).toBe(original);
  });
  it('identifies Borith as a real team contact and keeps the organization as service provider', () => {
    for (const locale of locales) {
      const page = parse(locale);
      const schemas = [...page.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent!));
      expect(schemas.some(schema => schema['@type'] === 'Person')).toBe(false);
      const webpage = schemas.find(schema => schema['@type'] === 'WebPage');
      expect(webpage.author).toEqual({ '@id': 'https://www.iteradvisors.com/a-propos/borith-biv#person' });
      expect(schemas.find(schema => schema['@type'] === 'Service').provider['@id']).toBe('https://www.iteradvisors.com/#organization');
      expect(webpage.reviewedBy).toBeUndefined();
      expect(page.querySelector(`a[href="${parityHref('/a-propos/borith-biv', locale)}"]`)).not.toBeNull();
      expect(page.querySelector('#piliers')!.querySelectorAll('article')).toHaveLength(4);
      for (const slug of ['payfit', 'lucca', 'factorial', 'silae']) expect(page.querySelector(`#outils-rh a[href="${parityHref(`/ressources/outils/${slug}`, locale)}"]`)).not.toBeNull();
    }
  });
});
