import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import AuthorPage from '@/components/pages/AuthorPage';
import { getTeamMembers } from '@/lib/content/team';
import { editorialPersonId } from '@/lib/content/finance-expert';
import { articleSchema, personSchema, serviceSchema } from '@/lib/schemas';
import { indicativePriceSpecification, ORGANIZATION_ID } from '@/lib/schemas/identity';

vi.mock('@/components/PageLayout', () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
describe('Schema.org V2 identities', () => {
  it('uses one person identity for every published member across all three languages', () => {
    for (const locale of ['fr', 'en', 'es'] as const) {
      for (const member of getTeamMembers(locale).filter(m => m.bio)) {
        const path = `/${locale === 'fr' ? 'a-propos' : locale === 'en' ? 'en/about' : 'es/quienes-somos'}/${member.slug}`;
        const canonical = `https://www.iteradvisors.com/a-propos/${member.slug}#person`;
        expect(editorialPersonId(path)).toBe(canonical);
        const html = renderToStaticMarkup(<AuthorPage locale={locale} member={member} articles={[]} />);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)['@graph'];
        const profile = graph.find((n: Record<string, unknown>) => n['@type'] === 'ProfilePage');
        expect(profile.mainEntity['@id']).toBe(canonical);
        expect(profile.publisher['@id']).toBe(ORGANIZATION_ID);
        if (profile.dateModified) expect(profile.dateModified).toMatch(/T.*(?:Z|[+-]\d\d:\d\d)$/);
      }
    }
  });
  it('links article identities and preserves a real person without misclassifying them as an organization', () => {
    const article = articleSchema({ headline: 'A guide', description: 'Finance guide', url: '/en/ressources/blog/test', authorName: 'Unknown author' });
    expect(editorialPersonId('https://example.org/a-propos/florent-greth')).toBe('https://example.org/a-propos/florent-greth#person');
    expect(article.inLanguage).toBe('en-GB');
    expect(article.author).toEqual({ '@type': 'Person', name: 'Unknown author' });
    expect(article.publisher).toHaveProperty('@id', ORGANIZATION_ID);
    expect(article.mainEntityOfPage).toMatchObject({ '@id': 'https://www.iteradvisors.com/en/ressources/blog/test#webpage', mainEntity: { '@id': article['@id'] } });
    expect(personSchema({ name: 'Florent Greth', url: '/es/quienes-somos/florent-greth' }).worksFor).toHaveProperty('@id', ORGANIZATION_ID);
    expect(serviceSchema({ name: 'Support', description: 'Scope', url: '/services/test' }).provider).toHaveProperty('@id', ORGANIZATION_ID);
  });
  it('rejects inverted or missing-unit ranges instead of emitting misleading prices', () => {
    expect(() => indicativePriceSpecification(8000, 3000, 'MONTH')).toThrow();
    expect(() => indicativePriceSpecification(3000, 8000, '')).toThrow();
    expect(() => indicativePriceSpecification(3000, 3000, 'MONTH')).toThrow();
    expect(indicativePriceSpecification(3000, 8000, 'MONTH')).not.toHaveProperty('price');
  });
});
