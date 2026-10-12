import { describe, expect, it, vi } from 'vitest';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FooterLanguages from '@/components/FooterLanguages';
import { footerContent, navigation } from '@/lib/navigation';
import { parityHref } from '@/lib/locale-route-map';

const location = vi.hoisted(() => ({ pathname: '/daf-externalise' }));
vi.mock('next/navigation', () => ({ usePathname: () => location.pathname }));

const parse = (html: string) => new DOMParser().parseFromString(html, 'text/html');
const locales = ['fr', 'en', 'es'] as const;

describe('translated footer destinations', () => {
  it('keeps every translated label aligned after the invoicing link', () => {
    for (const locale of ['en','es'] as const) {
      const links = footerContent[locale].editorialLinks;
      expect(links.every(link => typeof link.text === 'string' && link.text.length > 0)).toBe(true);
      expect(links.find(link => link.href.endsWith('/jobs'))?.text).toBe(locale === 'en' ? 'Careers' : 'Empleo');
      expect(links.find(link => /\/(clients|clientes)$/.test(link.href))?.text).toBe(locale === 'en' ? 'Our clients' : 'Nuestros clientes');
    }
  });

  for (const locale of locales) {
    it(`keeps the ${locale} footer concise, unique and navigable`, () => {
      location.pathname = parityHref('/daf-externalise', locale);
      const page = parse(renderToStaticMarkup(createElement(Footer, { locale })));
      const footer = page.querySelector('footer')!;
      const links = [...footer.querySelectorAll('a[href]')];
      expect(links).toHaveLength(27);
      const hrefs = links.map(a => a.getAttribute('href')!);
      expect(new Set(hrefs).size).toBe(hrefs.length);
      for (const path of ['/daf-externalise', '/drh-externalise', '/fractional-cfo-startups']) {
        expect(hrefs.filter(href => href === parityHref(path, locale))).toHaveLength(1);
      }
      expect(hrefs).not.toContain(parityHref('/daf-externalise-paris', locale));
      expect(hrefs).not.toContain(parityHref('/drh-externalise/temps-partage', locale));
      const taxGuide = footer.querySelector(`a[href="${parityHref('/ressources/fiscalite-espagne-france', locale)}"]`);
      expect(taxGuide).not.toBeNull();
      expect(taxGuide?.closest('ul')?.querySelectorAll('a')).toHaveLength(1);
      expect(footer.textContent).not.toMatch(/Articles populaires|Popular Articles|Artículos populares/);
      const feeLink = links.find(a => a.getAttribute('href') === parityHref('/daf-externalise/tarifs', locale));
      expect(feeLink?.textContent).toBe(locale === 'fr' ? 'Tarifs' : locale === 'en' ? 'Fees' : 'Precios');
      const trustfolio = footer.querySelector('a[href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"]');
      expect(trustfolio?.textContent).toContain('5/5 Trustfolio');
      expect(trustfolio?.getAttribute('rel')).toBe('noopener noreferrer');
      expect(footer.querySelector('address')?.textContent).toContain('Carrer Casp, 54, 5-1° · 08010 Barcelona');
      expect(footer.querySelector('address')?.textContent).toContain('B42960849');
      expect(hrefs).toContain('mailto:contact@iteradvisors.com');
      for (const link of footerContent[locale].legalLinks) expect(hrefs).toContain(link.href);
      const languages = footer.querySelector('[data-language-links="footer"]')!;
      expect(languages.querySelector('span[aria-current="page"]')).not.toBeNull();
      expect(languages.querySelectorAll('a')).toHaveLength(2);
      expect(languages.querySelector(`a[href="${location.pathname}"]`)).toBeNull();
      expect([...languages.querySelectorAll('a')].map(a => a.getAttribute('href'))).toEqual(
        locales.filter(lang => lang !== locale).map(lang => parityHref('/daf-externalise', lang))
      );
    });

    it(`keeps all ${locale} resource hubs in the initial header HTML`, () => {
      const header = parse(renderToStaticMarkup(createElement(Header, { locale })));
      const resources = navigation[locale].find(item => ['Ressources', 'Resources', 'Recursos'].includes(item.title))!;
      for (const child of resources.children!) {
        expect(header.querySelector(`header a[href="${child.href}"]`)).not.toBeNull();
      }
    });
  }

  it('keeps the current language visible without inventing unpublished alternatives', () => {
    location.pathname = '/unknown-untranslated-resource';
    const page = parse(renderToStaticMarkup(createElement(FooterLanguages, { locale: 'fr' })));
    expect(page.querySelector('span[aria-current="page"]')?.textContent).toBe('Français');
    expect(page.querySelectorAll('a')).toHaveLength(0);
    expect(page.querySelectorAll('span[aria-disabled="true"]')).toHaveLength(2);
  });
});
