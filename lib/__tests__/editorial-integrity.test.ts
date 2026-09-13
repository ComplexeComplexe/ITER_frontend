import { describe, it, expect } from 'vitest';
import { glossaryFaqItems } from '../glossary-faq';
import { getGlossaryEntryContent } from '../content/glossary-entries';
import sitemap from '../../app/sitemap';
import robots from '../../app/robots';

describe('editorial integrity', () => {
  it('uses the visible glossary FAQ rather than a separate outdated list', () => {
    const entry = getGlossaryEntryContent('fr', 'cfo')!;
    const faq = glossaryFaqItems(entry);
    expect(faq.length).toBeGreaterThan(0);
    for (const item of faq) {
      expect(entry.sections.flatMap(section => section.content).join(' ')).toContain(item.question);
      expect(item.answer).not.toContain('**');
    }
    expect(glossaryFaqItems(getGlossaryEntryContent('fr', 'fractional-cfo')!)).toEqual([]);
  });
  it('keeps current content dates when applying historical sitemap overrides', async () => {
    const entries = await sitemap();
    expect(entries.find(item => item.url.endsWith('/daf-externalise'))?.lastModified).toBe('2026-09-12');
    expect(entries.find(item => item.url.endsWith('/en/ressources/blog/daf-externalise-vs-daf-salarie'))?.lastModified).toBe('2026-09-13');
    expect(entries.find(item => item.url.endsWith('/politique-cookies'))?.lastModified).not.toBe('2026-09-13');
  });
  it('keeps private routes excluded for explicitly named AI crawlers too', () => {
    const rules = robots().rules;
    expect(Array.isArray(rules)).toBe(true);
    for (const rule of Array.isArray(rules) ? rules : [rules]) {
      expect(rule.allow).toBe('/');
      expect(rule.disallow).toContain('/api/');
    }
  });
});
