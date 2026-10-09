import { describe, expect, it } from 'vitest';
import { dafPricingGraph } from '@/lib/schemas/pillars';
import { getDafReferenceContent } from '@/lib/content/daf-reference-locales';
import { editorialPersonId } from '@/lib/content/finance-expert';
import { parityHref } from '@/lib/locale-route-map';
import { FORMULES } from '@/lib/content/facts';

const SITE = 'https://www.iteradvisors.com';
describe('pillar identity and indicative fees', () => {
  for (const locale of ['fr', 'en', 'es'] as const) {
    it(`connects ${locale} tariff page to its actual service without fixed fees`, () => {
      const graph = dafPricingGraph(locale, getDafReferenceContent(locale, 'tarifs'));
      const [page, service] = graph['@graph'];
      expect(page).toMatchObject({ mainEntity: { '@id': `${SITE}${parityHref('/daf-externalise', locale)}#service-offer` } });
      expect(service).toHaveProperty('hasOfferCatalog');
      const catalog = (service as { hasOfferCatalog: { itemListElement: Array<Record<string, unknown>> } }).hasOfferCatalog;
      catalog.itemListElement.forEach((offer, index) => {
        expect(offer).not.toHaveProperty('price');
        expect(offer.priceSpecification).toMatchObject({ minPrice: FORMULES[index].prixMin, maxPrice: FORMULES[index].prixMax, valueAddedTaxIncluded: false, unitText: 'MONTH' });
        expect(offer.itemOffered).toEqual(page.mainEntity);
      });
    });
  }
  it('keeps one Florent identity across translated profiles', () => {
    for (const path of ['/a-propos/florent-greth', '/en/about/florent-greth', '/es/quienes-somos/florent-greth']) {
      expect(editorialPersonId(path)).toBe(`${SITE}/a-propos/florent-greth#person`);
    }
  });
});
