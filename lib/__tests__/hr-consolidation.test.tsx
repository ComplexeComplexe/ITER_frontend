import { describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import type { ReactNode } from 'react';
import GlossaryEntryPage from '@/components/pages/GlossaryEntryPage';
import HrToolPractice from '@/components/HrToolPractice';
import { getGlossaryEntryContent } from '@/lib/content/glossary-entries';
import { getGlossaryAuthor } from '@/lib/glossary-links';
import { editorialText } from '@/lib/content/editorial-text';
import { HR_COMMERCIAL_COPY, HR_COMMERCIAL_TERMS } from '@/lib/content/hr-commercial';
import { parityHref } from '@/lib/locale-route-map';

vi.mock('@/components/PageLayout', () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock('@/components/TestimonialsSection', () => ({ default: () => null }));
vi.mock('@/components/CTASection', () => ({ default: () => null }));
const parse = (html: string) => new DOMParser().parseFromString(html, 'text/html');
const locales = ['fr', 'en', 'es'] as const;

describe('HR consolidation without invented endorsements', () => {
  it('localises revised dates when the byline renders the date as its own text node', () => {
    expect(editorialText('6 novembre 2026', 'en')).toBe('6 November 2026');
    expect(editorialText('6 novembre 2026', 'es')).toBe('6 de noviembre de 2026');
    expect(editorialText('1er septembre 2026', 'en')).toBe('1 September 2026');
  });
  it('attributes the HR definition to the editorial organisation and routes its CTA to the local offer', () => {
    const content = getGlossaryEntryContent('fr', 'drh-externalise')!;
    const body = JSON.stringify(content);
    expect(body).not.toMatch(/10 à 50|50 à 150|4 à 8 jours|même réalité/);
    expect(getGlossaryAuthor('drh-externalise').id).toBe('https://www.iteradvisors.com/#organization');
    expect(getGlossaryAuthor('cfo').id).toContain('sebastien-doat#person');
    for (const locale of locales) {
      const page = parse(renderToStaticMarkup(<GlossaryEntryPage locale={locale} slug="drh-externalise" content={content} modified="2026-11-06" />));
      expect(page.querySelector('a[rel="author"]')!.textContent).toBe('Iter Advisors');
      expect(page.querySelector('.site-button-primary')!.getAttribute('href')).toBe(parityHref('/drh-externalise', locale));
      expect(page.body.textContent).not.toMatch(/Nos DAF externalisés le mesurent|fractional CFOs measure|CFO externalizados lo miden/);
      if (locale !== 'fr') {
        // These strings pass through the shared editorial renderer for EN/ES pages.
        for (const section of content.sections) for (const text of section.content) {
          expect(editorialText(text, locale)).not.toBe(text);
        }
      }
    }
  });

  it('preserves direct-use and second-hand distinctions on the local software pages', () => {
    for (const locale of locales) {
      for (const slug of ['payfit', 'silae', 'factorial', 'lucca']) {
        const page = parse(renderToStaticMarkup(<HrToolPractice slug={slug} locale={locale} />));
        expect(page.querySelector('a')!.getAttribute('href')).toBe(parityHref('/drh-externalise', locale));
        expect(page.body.textContent).toContain('Borith');
        expect(page.body.textContent).not.toMatch(/reviewedBy|certifi/);
      }
      expect(renderToStaticMarkup(<HrToolPractice slug="pennylane" locale={locale} />)).toBe('');
    }
    expect(renderToStaticMarkup(<HrToolPractice slug="silae" />)).toContain('ne constituent pas un test personnel');
    expect(renderToStaticMarkup(<HrToolPractice slug="lucca" />)).toContain('n’a pas encore testé Lucca');
  });

  it('presents the approved recurring budget with its actual cadence in all three intros', () => {
    const { min, max } = HR_COMMERCIAL_TERMS.regular;
    for (const locale of locales) {
      const copy = HR_COMMERCIAL_COPY[locale];
      expect(copy.intro).toContain('Borith Biv');
      const numbers = copy.budget.replace(/[\s.,]/g, '');
      expect(numbers).toContain(String(min));
      expect(numbers).toContain(String(max));
      expect(numbers).not.toContain('1800');
      expect(copy.budget).toMatch(/3.*4/);
    }
  });
});
