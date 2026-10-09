import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import BlogPostPage from '../BlogPostPage';
import PageByline from '../../PageByline';
import { ITER_AUTHOR, FINANCE_AUTHOR } from '@/lib/schemas/editorial';
vi.mock('next/navigation', () => ({ usePathname: () => '/ressources/outils/malibou', useRouter: () => ({ push: vi.fn() }), useSearchParams: () => new URLSearchParams() }));

describe('editorial attribution consistency', () => {
  it('keeps a known named author linked as a Person even without CMS team records', () => {
    for (const locale of ['fr', 'en', 'es'] as const) {
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<BlogPostPage locale={locale} title="Example" author="Benjamin Ziza" slug="example" breadcrumbs={{ resourcesLabel: 'Resources', resourcesHref: '/ressources', blogLabel: 'Blog', blogHref: '/ressources/blog' }} />), 'text/html');
      const article = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(s => JSON.parse(s.textContent!)).find(s => s['@type'] === 'BlogPosting');
      expect(article.author).toMatchObject({ '@id': 'https://www.iteradvisors.com/a-propos/benjamin-ziza#person' });
      const profilePath = { fr: '/a-propos/benjamin-ziza', en: '/en/about/benjamin-ziza', es: '/es/quienes-somos/benjamin-ziza' }[locale];
      expect(doc.querySelector(`a[href="${profilePath}"]`)).not.toBeNull();
    }
  });
  it('distinguishes cabinet publication from personal writing in all languages', () => {
    for (const locale of ['fr', 'en', 'es'] as const) {
      const cabinet = renderToStaticMarkup(<PageByline locale={locale} author={ITER_AUTHOR} />);
      const personal = renderToStaticMarkup(<PageByline locale={locale} author={FINANCE_AUTHOR} />);
      expect(cabinet).toContain({ fr: 'Publié par', en: 'Published by', es: 'Publicado por' }[locale]);
      expect(cabinet).not.toContain('Benjamin Ziza');
      expect(personal).toContain({ fr: 'Rédigé par', en: 'Written by', es: 'Redactado por' }[locale]);
    }
  });
});
