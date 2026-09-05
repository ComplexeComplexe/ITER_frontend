import { afterEach, describe, expect, it, vi } from 'vitest';
import { getCmsNavigation, getGlobal, getHomepage, getBlogArticleBySlug, getBlogArticles, getServiceSinglePage, getGlossaryTerms, getCanonicalServiceSlug, strapiMediaUrl } from '../static-content';
import { buildStrapiMetadata } from '../metadata';

afterEach(() => vi.unstubAllGlobals());
describe('static publishing after CMS retirement', () => {
  it('serves service and glossary content without any external CMS request', async () => {
    const fetch = vi.fn(() => { throw new Error('Unexpected external request'); });
    vi.stubGlobal('fetch', fetch);
    expect(await getGlobal('fr')).toBeNull();
    expect(await getCmsNavigation('es')).toBeUndefined();
    expect(await getHomepage('en')).toBeNull();
    expect(await getBlogArticleBySlug('missing', 'fr')).toBeNull();
    expect((await getBlogArticles('fr')).length).toBeGreaterThan(0);
    for (const locale of ['fr', 'en', 'es'] as const) {
      const service = await getServiceSinglePage('previsionnel-tresorerie', locale);
      expect(service?.heroTitle).toBeTruthy();
      expect(service?.content?.length).toBeGreaterThan(0);
      expect((await getGlossaryTerms(locale)).length).toBeGreaterThan(0);
    }
    expect(fetch).not.toHaveBeenCalled();
  });
  it('keeps localized canonical URLs and caller-provided metadata', async () => {
    expect(getCanonicalServiceSlug('es', 'prevision-tesoreria')).toBe('previsionnel-tresorerie');
    expect(getCanonicalServiceSlug('en', 'missing')).toBeNull();
    const result = await buildStrapiMetadata({ endpoint: 'retired-cms', locale: 'fr', path: '/daf-externalise', fallbackTitle: 'Titre validé', fallbackDescription: 'Description validée' });
    expect(result.title).toBe('Titre validé');
    expect(result.description).toBe('Description validée');
    expect(result.alternates?.canonical).toBe('https://www.iteradvisors.com/daf-externalise');
    expect(strapiMediaUrl({ url: '/images/og-logo.png', id: 1, alternativeText: '' })).toBe('/images/og-logo.png');
  });
});
