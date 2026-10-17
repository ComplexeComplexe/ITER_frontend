import { describe, expect, it } from 'vitest';
import { COMPANY_GEOGRAPHY, getCompanyGeography } from '@/lib/company-facts';
import { getDafOfferFacts } from '@/lib/content/offer-facts';
import { getHomePilotage } from '@/lib/content/home-pilotage';
import { getHomeContent } from '@/lib/content/home';
import { getAboutContent } from '@/lib/content/about';
import { VILLES_PRESENCE } from '@/lib/content/facts';
import { pillarInterface } from '@/lib/content/daf-pillar-locales';
import { footerContent } from '@/lib/navigation';

describe('approved geographic presence', () => {
  it('keeps the same three cities across locales and distinguishes the headquarters', () => {
    expect(COMPANY_GEOGRAPHY.cities.fr).toEqual(['Paris', 'Barcelone', 'Toulouse']);
    expect(COMPANY_GEOGRAPHY.cities.en).toEqual(['Paris', 'Barcelona', 'Toulouse']);
    expect(COMPANY_GEOGRAPHY.cities.es).toEqual(['París', 'Barcelona', 'Toulouse']);
    expect(VILLES_PRESENCE).toEqual(COMPANY_GEOGRAPHY.cities.fr);
    expect(COMPANY_GEOGRAPHY.headquarters).toBe('Barcelona');
  });

  for (const locale of ['fr', 'en', 'es'] as const) {
    it(`shares ${locale} facts between home variants, the firm, footer and pillar`, () => {
      const geography = getCompanyGeography(locale);
      const home = getHomePilotage(locale);
      expect(getDafOfferFacts(locale).geography).toBe(geography.summary);
      expect(home.faqItems.some(item => item.a === geography.summary)).toBe(true);
      expect(getHomeContent(locale).faqs.some(item => item.a === geography.summary)).toBe(true);
      expect(getAboutContent(locale).whoWeAre.paragraphs).toContain(geography.summary);
      expect(pillarInterface[locale].cities).toEqual(geography.cities);
      expect(footerContent[locale].locations.map(place => place.city)).toEqual(geography.cities);
      expect(footerContent[locale].description).toContain(geography.presence);
      for (const city of geography.cities) {
        expect(home.meta.title).toContain(city);
        expect(home.meta.description).toContain(city);
        expect(home.eyebrow).toContain(city);
      }
      expect(home.meta.title.length).toBeLessThanOrEqual(60);
      expect(geography.summary).not.toMatch(/Lyon|Bordeaux|Madrid/);
      // Keep Paris visible without undoing the approved footer linking policy.
      expect(footerContent[locale].locations[0].href).toBeUndefined();
    });
  }
});
