import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import DocumentShell from '@/components/DocumentShell';
import { COMPANY, COMPANY_PROFILES, ORG_ID, getCompanyIdentity } from '@/lib/company-facts';
import { parityHref } from '@/lib/locale-route-map';
import { GET } from '@/app/llms.txt/route';

vi.mock('next/font/google', () => ({
  DM_Sans: () => ({ variable: 'font-body' }),
  Space_Grotesk: () => ({ variable: 'font-heading' }),
}));
vi.mock('@/components/CookieConsent', () => ({ default: () => null }));

describe('shared company identity', () => {
  for (const locale of ['fr', 'en', 'es'] as const) {
    it(`publishes the same legal identity and official profiles in ${locale}`, () => {
      const html = renderToStaticMarkup(<DocumentShell locale={locale}><main>Content</main></DocumentShell>);
      const doc = new DOMParser().parseFromString(html, 'text/html');
      const nodes = [...doc.querySelectorAll('script[type="application/ld+json"]')]
        .flatMap(script => JSON.parse(script.textContent!)['@graph']);
      const organizations = nodes.filter(node => node['@type'] === 'Organization');
      expect(organizations).toHaveLength(1);
      const organization = organizations[0];
      expect(organization).toMatchObject({
        '@id': ORG_ID, legalName: COMPANY.legalName, taxID: COMPANY.taxID,
        vatID: COMPANY.vatID, foundingDate: String(COMPANY.foundingYear),
        sameAs: [...COMPANY_PROFILES], disambiguatingDescription: getCompanyIdentity(locale),
        address: [{ '@type': 'PostalAddress', ...COMPANY.registeredAddress }],
      });
      expect(organization).not.toHaveProperty('telephone');
      expect(organization.contactPoint).not.toHaveProperty('telephone');
      expect(organization).not.toHaveProperty('aggregateRating');
    });
  }
  it('keeps the context file tied to localized identity, approved prices and canonical routes', async () => {
    const response = GET();
    const text = await response.text();
    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8');
    for (const locale of ['fr', 'en', 'es'] as const) expect(text).toContain(getCompanyIdentity(locale));
    for (const profile of COMPANY_PROFILES) expect(text).toContain(profile);
    expect(text).toContain(`EUR ${COMPANY.dafMonthlyPrice.min.toLocaleString('en-GB')} to ${COMPANY.dafMonthlyPrice.max.toLocaleString('en-GB')}`);
    for (const locale of ['en', 'es'] as const) {
      for (const source of ['/daf-externalise', '/daf-externalise/tarifs', '/daf-externalise-barcelone']) {
        expect(text).toContain(`https://www.iteradvisors.com${parityHref(source, locale)}`);
      }
    }
    expect(text).not.toContain('/es/externalizacion-daf/tarifas');
  });
});
