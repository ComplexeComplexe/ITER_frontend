import { describe, expect, it } from 'vitest';
import { footerContent } from '@/lib/navigation';
describe('translated footer destinations', () => {
  it('keeps every translated label aligned after the invoicing link', () => {
    for (const locale of ['en','es'] as const) {
      const links = footerContent[locale].editorialLinks;
      expect(links.every(link => typeof link.text === 'string' && link.text.length > 0)).toBe(true);
      expect(links.find(link => link.href.endsWith('/jobs'))?.text).toBe(locale === 'en' ? 'Careers' : 'Empleo');
      expect(links.find(link => /\/(clients|clientes)$/.test(link.href))?.text).toBe(locale === 'en' ? 'Our clients' : 'Nuestros clientes');
    }
  });
});
