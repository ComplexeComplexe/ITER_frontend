import type { Locale } from '@/lib/i18n';

/** Approved by Guillaume on 9 October 2026. Shared by visible copy and JSON-LD. */
const financeTeamSize = 15;
export const COMPANY = {
  name: 'Iter Advisors', legalName: 'Iter Advisors S.L.', foundingYear: 2021,
  clientsCount: 90, financeTeamSize,
  teamLabel: {
    fr: `${financeTeamSize} professionnels de la finance et une direction RH`,
    en: `${financeTeamSize} finance professionals and an HR leadership function`,
    es: `${financeTeamSize} profesionales de las finanzas y una dirección de RRHH`,
  },
  dafMonthlyPrice: { min: 3000, max: 8000, currency: 'EUR' },
  drhMonthlyPrice: { min: 3200, max: 4800, currency: 'EUR' },
  noticeDays: 30, startDelayDays: '8 à 15', validatedAt: '2026-10-09',
} as const;

/** Geographic presence confirmed by Guillaume on 17 October 2026.
 * Presence is distinct from a staffed office or a legal headquarters. */
export const COMPANY_GEOGRAPHY = {
  validatedAt: '2026-10-17',
  cities: {
    fr: ['Paris', 'Barcelone', 'Toulouse'],
    en: ['Paris', 'Barcelona', 'Toulouse'],
    es: ['París', 'Barcelona', 'Toulouse'],
  },
  headquarters: 'Barcelona',
} as const;

export function getCompanyGeography(locale: Locale) {
  const cities = COMPANY_GEOGRAPHY.cities[locale];
  const cityList = `${cities[0]}, ${cities[1]} ${locale === 'fr' ? 'et' : locale === 'en' ? 'and' : 'y'} ${cities[2]}`;
  const presence = {
    fr: `Iter Advisors est présent à ${cityList}.`,
    en: `Iter Advisors has a presence in ${cityList}.`,
    es: `Iter Advisors tiene presencia en ${cityList}.`,
  }[locale];
  const details = {
    fr: 'Barcelone est le siège du cabinet. Les modalités d’intervention sur place ou à distance sont définies au cadrage de chaque mission.',
    en: 'Barcelona is the firm’s headquarters. On-site and remote arrangements are agreed when defining each engagement.',
    es: 'Barcelona es la sede del despacho. Las modalidades presenciales y a distancia se acuerdan al definir cada misión.',
  }[locale];
  return { cities, cityList, presence, summary: `${presence} ${details}` };
}

export const PEOPLE = {
  sebastien: { slug: 'sebastien-doat', name: 'Sébastien Doat', roles: { fr: 'Cofondateur, DAF externalisé et CFO', en: 'Co-founder, fractional CFO and CFO', es: 'Cofundador, CFO externo y CFO' }, linkedin: 'https://www.linkedin.com/in/sebastien-doat-fractional-cfo/' },
  benjamin: { slug: 'benjamin-ziza', name: 'Benjamin Ziza', roles: { fr: 'Cofondateur et CFO', en: 'Co-founder and CFO', es: 'Cofundador y CFO' }, linkedin: 'https://www.linkedin.com/in/benjaminziza/' },
  guillaume: { slug: 'guillaume-rostand', name: 'Guillaume Rostand', roles: { fr: 'Cofondateur et CMO', en: 'Co-founder and CMO', es: 'Cofundador y CMO' }, linkedin: 'https://www.linkedin.com/in/rostand/' },
  florent: { slug: 'florent-greth', name: 'Florent Greth', roles: { fr: 'Partner, CFO et expert Pennylane', en: 'Partner, CFO and Pennylane expert', es: 'Socio, CFO y experto en Pennylane' }, linkedin: 'https://www.linkedin.com/in/florent-greth-cfo-pennylane/' },
  borith: { slug: 'borith-biv', name: 'Borith Biv', roles: { fr: 'Partner Capital Humain', en: 'Human Capital Partner', es: 'Socio de Capital Humano' }, linkedin: 'https://www.linkedin.com/in/borith-biv-linkb/' },
} as const;

export const ORG_ID = 'https://www.iteradvisors.com/#organization';
export const personId = (slug: string) => `https://www.iteradvisors.com/a-propos/${slug}#person`;
export const getApprovedPerson = (slug: string) => Object.values(PEOPLE).find(person => person.slug === slug);

/** Keep the complete approved role; omit the brand suffix when the title would exceed 60 characters. */
export function approvedPersonTitle(slug: string, locale: Locale): string | undefined {
  const person = getApprovedPerson(slug);
  if (!person) return undefined;
  const title = `${person.name}, ${person.roles[locale]}`;
  return title.length + ' | Iter Advisors'.length <= 60 ? `${title} | Iter Advisors` : title;
}

/** Profile templates retain their wording but never duplicate approved numbers or titles. */
export function companyText(text: string, locale: Locale): string {
  return text.replace(/\{\{(foundingYear|financeTeamSize|clientsCount|teamLabel|geographicPresence|geographicSummary|role:([a-z-]+))\}\}/g, (_, key: string, slug?: string) => {
    if (slug) return getApprovedPerson(slug)?.roles[locale] ?? '';
    if (key === 'geographicPresence') return getCompanyGeography(locale).presence;
    if (key === 'geographicSummary') return getCompanyGeography(locale).summary;
    if (key === 'teamLabel') return COMPANY.teamLabel[locale];
    return String(COMPANY[key as 'foundingYear' | 'financeTeamSize' | 'clientsCount']);
  });
}
export function resolveCompanyCopy<T>(value: T, locale: Locale): T {
  if (typeof value === 'string') return companyText(value, locale) as T;
  if (Array.isArray(value)) return value.map(item => resolveCompanyCopy(item, locale)) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveCompanyCopy(item, locale)])) as T;
  return value;
}
