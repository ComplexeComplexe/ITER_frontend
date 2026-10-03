import { describe, expect, it } from 'vitest';
import registry from '../content/editorial-locales/registry.json';
import { parityHref, publishedPaths } from '../locale-route-map';
import { editorialHtml, editorialText } from '../content/editorial-text';
import { resolveBlogArticleHref } from '../path-localization';
import nextConfig from '../../next.config';
import sitemap from '../../app/sitemap';
import assets from '../content/editorial-locales/assets.json';

describe('Exhaustive published locale parity', () => {
  it('keeps every indexed French page in exactly one reciprocal three-language sitemap cluster', async () => {
    const entries = await sitemap();
    const rules = await nextConfig.redirects!();
    for (const page of Object.values(registry).filter(page => !page.noindex)) {
      for (const path of Object.values(page.paths)) {
        const matches = entries.filter(item => item.url === 'https://www.iteradvisors.com' + path);
        expect(matches, path).toHaveLength(1);
        expect(rules.some(rule => rule.source === path), path).toBe(false);
        const equivalents = Object.values(matches[0].alternates!.languages!);
        for (const alternate of Object.values(page.paths)) expect(equivalents).toContain('https://www.iteradvisors.com' + alternate);
      }
    }
  });
  it('switches any reference page to its exact counterpart and retains query and section', () => {
    for (const page of Object.values(registry)) for (const original of Object.values(page.paths)) for (const locale of ['fr', 'en', 'es'] as const) {
      expect(parityHref(original + '?utm_source=test#section', locale)).toBe(page.paths[locale] + '?utm_source=test#section');
    }
    expect(parityHref('/es/recursos/herramientas/pennylane', 'fr')).toBe('/ressources/outils/pennylane');
  });
  it('repairs a legacy French slug without introducing a second redirect or an unrelated page', () => {
    expect(parityHref('/es/recursos/blog/regimes-fiscaux-france-vs-espagne', 'es')).toBe('/es/recursos/blog/regimenes-fiscales-francia-espana');
    expect(publishedPaths('/es/recursos/blog/que-es-fractional-cfo')).toBeUndefined();
    expect(resolveBlogArticleHref('es', 'que-es-fractional-cfo')).toBe('/es/recursos/blog/que-es-fractional-cfo');
    expect(resolveBlogArticleHref('en', 'impot-revenu-espagne')).toBe('/en/ressources/tax/spain-income-tax');
    expect(resolveBlogArticleHref('es', 'modelo-720-declaration-biens-etranger')).toBe('/es/recursos/fiscalidad/modelo-720');
  });
  it('translates HTML entities and links without escaping away the original markup', () => {
    const html = editorialHtml('<p><a href="/ressources/outils/pennylane?source=guide#sources">Sources et méthode</a></p>', 'en');
    expect(html).toContain('href="/en/ressources/tools/pennylane?source=guide#sources"');
    expect(html).toContain('Sources and methodology');
    expect(html).toContain('<p>');
    expect(editorialText('L’essentiel', 'es')).not.toBe('L’essentiel');
    expect(editorialText('Pennylane', 'en')).toBe('Pennylane');
  });
  it('provides a translated SVG illustration for both languages without replacing the French asset', () => {
    expect(Object.keys(assets)).toHaveLength(32);
    for (const [original, localized] of Object.entries(assets)) {
      expect(original).not.toContain('/en/');
      expect(localized.en).toMatch(/\/covers\/en\/.*\.svg$/);
      expect(localized.es).toMatch(/\/covers\/es\/.*\.svg$/);
    }
  });
});
