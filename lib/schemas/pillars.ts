import type { Locale } from '@/lib/i18n';
import type { DafSubContent } from '@/lib/content/daf-sub';
import { FORMULES } from '@/lib/content/facts';
import { getDafOffer } from '@/lib/content/daf-offer';
import { parityHref } from '@/lib/locale-route-map';
import { editorialWebPageSchema, ITER_AUTHOR } from './editorial';

const SITE = 'https://www.iteradvisors.com';

/** The tariff page describes the existing DAF service, not a separate fixed-price product. */
export function dafPricingGraph(locale: Locale, content: DafSubContent) {
  const path = parityHref('/daf-externalise/tarifs', locale);
  const serviceUrl = `${SITE}${parityHref('/daf-externalise', locale)}`;
  const serviceId = `${serviceUrl}#service-offer`;
  const offer = getDafOffer(locale);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        ...editorialWebPageSchema({ path, name: content.meta.title, description: content.meta.description,
          locale, author: ITER_AUTHOR, dateModified: content.modified?.date }),
        mainEntity: { '@id': serviceId },
      },
      {
        '@type': 'Service', '@id': serviceId, url: serviceUrl,
        provider: { '@id': `${SITE}/#organization` },
        hasOfferCatalog: {
          '@type': 'OfferCatalog', '@id': `${SITE}${path}#offers`, name: content.h1,
          itemListElement: FORMULES.map((plan, i) => ({
            '@type': 'Offer', name: offer.tiers[i].name,
            description: offer.billing,
            url: `${SITE}${path}`, itemOffered: { '@id': serviceId },
            priceSpecification: {
              '@type': 'UnitPriceSpecification', minPrice: plan.prixMin, maxPrice: plan.prixMax,
              priceCurrency: 'EUR', valueAddedTaxIncluded: false, unitText: 'MONTH',
            },
          })),
        },
      },
    ],
  };
}
