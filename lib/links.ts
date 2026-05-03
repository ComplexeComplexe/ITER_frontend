/**
 * Link utilities for detecting and fixing broken links
 * Scans content for internal href patterns and validates them
 */

import { getLocalePath, type Locale } from './i18n';

/**
 * Remove locale prefix from a path to get the neutral/canonical version
 * e.g. "/en/services" -> "/services", "/es/blog" -> "/blog", "/" -> "/"
 */
function getNeutralPath(path: string): string {
  if (path === '/en' || path === '/es') return '/';
  if (path.startsWith('/en/')) return path.slice(3);
  if (path.startsWith('/es/')) return path.slice(3);
  return path;
}

/**
 * Represents a detected link and its validation status
 */
export interface DetectedLink {
  source: string; // File that contains the link
  href: string; // Original href value
  target: string; // Resolved target URL
  type: 'internal' | 'external' | 'anchor' | 'email';
  exists: boolean; // Whether target exists
  locale?: Locale;
  suggestedFix?: string; // Suggestion if broken
}

/**
 * List of known valid routes in the app
 * Used to validate internal links
 */
export const KNOWN_ROUTES: Record<Locale, Set<string>> = {
  fr: new Set([
    '/',
    '/services',
    '/services/previsionnel-tresorerie',
    '/services/comptabilite-externalisation',
    '/services/accompagnement-levee-de-fond',
    '/services/controle-de-gestion-externalise',
    '/services/gestion-financiere-externalisee',
    '/services/ma-due-diligence',
    '/daf-externalise',
    '/daf-externalise/metier',
    '/daf-externalise/temps-partage',
    '/daf-externalise/transition',
    '/daf-externalise-barcelone',
    '/daf-externalise-paris',
    '/daf-externalise-toulouse',
    '/drh-externalise',
    '/drh-externalise/temps-partage',
    '/ressources',
    '/ressources/blog',
    '/ressources/fiche-metier',
    '/ressources/glossaire',
    '/ressources/testimonials',
    '/ressources/tools',
    '/ressources/case-studies',
    '/a-propos',
    '/contact',
    '/clients',
    '/legal-notice',
    '/privacy-policy',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/cads',
    '/cads/roi',
  ]),
  en: new Set([
    '/',
    '/services',
    '/services/cash-flow-forecast',
    '/services/fund-raising-support',
    '/services/outsource-your-accounting',
    '/services/outsourced-management-control',
    '/services/outsourced-financial-management',
    '/services/ma-due-diligence',
    '/daf-outsourcing',
    '/daf-outsourcing/metier',
    '/daf-outsourcing/shared-time',
    '/daf-outsourcing/transition',
    '/outsourced-cfo-barcelona',
    '/outsourced-cfo-paris',
    '/outsourced-cfo-toulouse',
    '/fractional-cfo',
    '/fractional-cfo-barcelona',
    '/hr-outsourcing',
    '/hr-outsourcing/shared-time',
    '/ressources',
    '/ressources/blog',
    '/ressources/fiche-metier',
    '/ressources/glossaire',
    '/ressources/testimonials',
    '/ressources/tools',
    '/ressources/case-studies',
    '/a-propos',
    '/contact',
    '/clients',
    '/legal-notice',
    '/privacy-policy',
  ]),
  es: new Set([
    '/',
    '/services',
    '/services/prevision-tesoreria',
    '/services/soporte-financiacion',
    '/services/externalizar-contabilidad',
    '/services/control-gestion-externalizado',
    '/services/gestion-financiera-externalizada',
    '/services/ma-due-diligence',
    '/externalizacion-daf',
    '/externalizacion-daf/metier',
    '/externalizacion-daf/tiempo-compartido',
    '/externalizacion-daf/transition',
    '/cfo-externalizado-barcelona',
    '/cfo-externalizado-paris',
    '/cfo-externalizado-toulouse',
    '/externalizacion-rrhh',
    '/externalizacion-rrhh/tiempo-compartido',
    '/ressources',
    '/ressources/blog',
    '/ressources/fiche-metier',
    '/ressources/glossaire',
    '/ressources/testimonials',
    '/ressources/tools',
    '/ressources/case-studies',
    '/quienes-somos',
    '/contact',
    '/clients',
    '/aviso-legal',
    '/politica-de-privacidad',
  ]),
};

/**
 * Validate if a route exists for a given locale
 */
export function isValidRoute(href: string, locale: Locale = 'fr'): boolean {
  // Normalize href
  const normalized = getNeutralPath(href);

  // Get routes for locale
  const routes = KNOWN_ROUTES[locale];

  // Check if exact match
  if (routes.has(normalized)) {
    return true;
  }

  // Check if it's a blog article pattern
  if (normalized.startsWith('/ressources/blog/')) {
    return true; // Dynamic routes
  }

  // Check if it's a service pattern
  if (normalized.startsWith('/services/')) {
    return true; // Could be dynamic
  }

  return false;
}

/**
 * Suggest a fix for a broken link
 */
export function suggestLinkFix(href: string, locale: Locale = 'fr'): string | null {
  const normalized = getNeutralPath(href);

  // Common fixes
  const fixes: Record<string, string> = {
    '/services/': '/services',
    '/blog/': '/ressources/blog/',
    '/glossaire/': '/ressources/glossaire/',
    '/ressources/blog/testimonials': '/ressources/testimonials',
    '/testimonials/': '/ressources/testimonials',
    '/fiche-metier/': '/ressources/fiche-metier/',
    '/cads-roi': '/cads/roi',
    '/#services': '/services',
    '/#about': '/a-propos',
  };

  for (const [broken, fixed] of Object.entries(fixes)) {
    if (normalized.includes(broken)) {
      return normalized.replace(broken, fixed);
    }
  }

  // Missing locale prefix for EN/ES
  if (locale !== 'fr' && !normalized.startsWith('/')) {
    const prefixed = getLocalePath(locale, normalized);
    if (isValidRoute(prefixed, locale)) {
      return prefixed;
    }
  }

  return null;
}

/**
 * Extract all href attributes from text content using regex
 */
export function extractLinks(content: string): string[] {
  const patterns = [
    /href=["']([^"']*?)["']/g, // href="..." or href='...'
    /href\s*=\s*\{`([^`]*?)`\}/g, // href={`...`}
    /\[([^\]]+)\]\(([^)]+)\)/g, // [text](url)
  ];

  const links = new Set<string>();

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      const href = match[1] || match[2];
      if (href && !href.startsWith('http')) {
        links.add(href);
      }
    }
  }

  return Array.from(links);
}

/**
 * Categorize and validate a link
 */
export function validateLink(href: string, locale: Locale = 'fr'): DetectedLink {
  // Determine link type
  let type: DetectedLink['type'];

  if (href.startsWith('http')) {
    type = 'external';
  } else if (href.startsWith('#')) {
    type = 'anchor';
  } else if (href.includes('@')) {
    type = 'email';
  } else {
    type = 'internal';
  }

  // Validate
  let exists = false;
  let suggestedFix: string | undefined;

  if (type === 'internal') {
    exists = isValidRoute(href, locale);

    if (!exists) {
      suggestedFix = suggestLinkFix(href, locale) || undefined;
    }
  } else {
    // For external/email/anchor, assume they're valid
    exists = true;
  }

  return {
    source: '',
    href,
    target: href,
    type,
    exists,
    locale,
    suggestedFix,
  };
}

/**
 * Batch validate multiple links
 */
export function validateLinks(hrefs: string[], locale: Locale = 'fr'): DetectedLink[] {
  return hrefs.map(href => validateLink(href, locale));
}

/**
 * Generate a report of broken links
 */
export interface LinkReport {
  totalLinks: number;
  brokenLinks: number;
  externalLinks: number;
  internalValid: number;
  internalInvalid: number;
  details: DetectedLink[];
}

export function generateLinkReport(links: DetectedLink[]): LinkReport {
  const report: LinkReport = {
    totalLinks: links.length,
    brokenLinks: 0,
    externalLinks: 0,
    internalValid: 0,
    internalInvalid: 0,
    details: links,
  };

  for (const link of links) {
    if (!link.exists) {
      report.brokenLinks++;
    }

    if (link.type === 'external') {
      report.externalLinks++;
    } else if (link.type === 'internal') {
      if (link.exists) {
        report.internalValid++;
      } else {
        report.internalInvalid++;
      }
    }
  }

  return report;
}
