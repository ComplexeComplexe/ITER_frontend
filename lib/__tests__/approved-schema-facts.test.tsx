import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import AuthorPage from '@/components/pages/AuthorPage';
import { COMPANY, PEOPLE, personId } from '@/lib/company-facts';
import { getTeamMemberBySlug } from '@/lib/content/team';
import { getPartnerProfile } from '@/lib/content/partner-profiles';
import { tools } from '@/data/tools';
import { generateToolArticleSchema, generateToolWebPageSchema } from '@/lib/schemas/toolSchemas';
import { getToolDirectory } from '@/data/toolDirectory';
import { parityHref } from '@/lib/locale-route-map';
import config from '@/next.config';

vi.mock('@/components/PageLayout', () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));

describe('approved October identity, author and migration corrections', () => {
  for (const locale of ['fr', 'en', 'es'] as const) {
    it(`keeps ${locale} visible profiles and Person titles aligned with the approved facts`, () => {
      for (const person of Object.values(PEOPLE)) {
        const member = getTeamMemberBySlug(person.slug, locale)!;
        const profile = getPartnerProfile(person.slug, locale);
        expect(member.role).toBe(person.roles[locale]);
        if (profile) expect(profile.role).toBe(member.role);
        const html = renderToStaticMarkup(<AuthorPage locale={locale} member={member} articles={[]} />);
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)['@graph'];
        const node = graph.find((entry: Record<string, unknown>) => entry['@type'] === 'Person');
        expect(node).toMatchObject({ '@id': personId(person.slug), jobTitle: member.role, worksFor: { '@id': 'https://www.iteradvisors.com/#organization' } });
        expect(node.sameAs).toEqual([person.linkedin]);
        expect(doc.body.textContent).toContain(member.role);
        expect(html).not.toContain('{{');
        expect(node.description).not.toMatch(/created in 2020|founded in 2020|créé en 2020|creó en 2020/);
      }
      expect(COMPANY.teamLabel[locale]).toContain(String(COMPANY.financeTeamSize));
    });
    it(`describes all ${locale} visible tool entries and localizes Okimia's canonical URL`, () => {
      const directory = getToolDirectory(locale);
      expect(directory.filter(tool => tool.slug === 'malibou')).toHaveLength(1);
      expect(directory.filter(tool => tool.slug === 'okimia')).toHaveLength(1);
      expect(directory.some(tool => tool.slug === 'fygr')).toBe(false);
      expect(parityHref('/ressources/outils/okimia', locale)).toBe({ fr: '/ressources/outils/okimia', en: '/en/ressources/tools/okimia', es: '/es/recursos/herramientas/okimia' }[locale]);
    });
  }
  it('distinguishes Pennylane authorship from review and keeps the existing publication date', () => {
    const tool = tools.find(tool => tool.slug === 'pennylane')!;
    const article = generateToolArticleSchema(tool);
    const page = generateToolWebPageSchema(tool);
    expect(article.author).toEqual({ '@id': personId(PEOPLE.florent.slug) });
    expect(page.reviewedBy).toEqual({ '@id': personId(PEOPLE.sebastien.slug) });
    expect(article.datePublished).toBe('2026-09-01');
    expect(page.lastReviewed).toBe('2026-10-09');
    expect(page.mainEntity).toEqual({ '@id': article['@id'] });
  });
  it('redirects legacy tool URLs in one hop with HTTP 301 in all languages', async () => {
    const rules = await config.redirects!();
    for (const [source, destination] of [
      ['/ressources/outils/fygr', '/ressources/outils/okimia'],
      ['/en/ressources/tools/fygr', '/en/ressources/tools/okimia'],
      ['/es/recursos/herramientas/fygr', '/es/recursos/herramientas/okimia'],
    ]) {
      const rule = rules.find(rule => rule.source === source)!;
      expect(rule).toMatchObject({ destination, statusCode: 301 });
      expect(rules.find(rule => rule.source === destination)).toBeUndefined();
    }
  });
});
