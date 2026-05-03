import { Metadata } from 'next';
import type { AnyFrontmatter } from './schema';

/**
 * SEO utilities for generating Next.js Metadata
 * Handles hreflang, OG tags, canonical URLs, etc.
 */

export interface SEOConfig {
  baseUrl: string;
  locale: 'fr' | 'en' | 'es';
  path: string;
  alternates?: Partial<Record<'fr' | 'en' | 'es', string>>;
}

export interface FrontmatterToMetadataOptions {
  baseUrl?: string;
  locale?: 'fr' | 'en' | 'es';
  path?: string;
  alternates?: Partial<Record<'fr' | 'en' | 'es', string>>;
}

/**
 * Convert frontmatter to Next.js Metadata object
 */
export function frontmatterToMetadata(
  frontmatter: AnyFrontmatter,
  options: FrontmatterToMetadataOptions = {}
): Metadata {
  const baseUrl = options.baseUrl || 'https://www.iteradvisors.com';
  const locale = options.locale || frontmatter.locale || 'fr';
  const path = options.path || getPathFromSlug(frontmatter.slug, locale);

  const canonicalUrl = frontmatter.canonical || `${baseUrl}${path}`;
  const alternates = frontmatter.hreflang || options.alternates;

  // Build hreflang links
  const alternatesLanguages: Record<string, string> = {
    [locale]: canonicalUrl,
  };

  if (alternates) {
    Object.assign(alternatesLanguages, alternates);
  }

  // OpenGraph
  const ogTitle = frontmatter.ogTitle || frontmatter.title;
  const ogDescription = frontmatter.ogDescription || frontmatter.description;
  const ogImage = frontmatter.ogImage || `${baseUrl}/images/og-default.png`;

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    canonical: canonicalUrl,

    // Robots
    robots: {
      index: !frontmatter.noindex,
      follow: !frontmatter.nofollow,
    },

    // OpenGraph
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Iter Advisors',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
      creator: '@IterAdvisors1',
    },

    // Alternates for hreflang
    alternates: {
      canonical: canonicalUrl,
      languages: alternatesLanguages,
    },
  };
}

/**
 * Generate a URL path from slug and locale
 */
export function getPathFromSlug(
  slug: string,
  locale: 'fr' | 'en' | 'es',
  type?: 'blog' | 'service' | 'case-study' | 'pages'
): string {
  // Default type is inferred from slug
  if (!type) {
    if (slug.includes('blog')) type = 'blog';
    else if (slug.includes('service')) type = 'service';
    else if (slug.includes('case')) type = 'case-study';
    else type = 'pages';
  }

  const prefix = locale === 'fr' ? '' : `/${locale}`;

  switch (type) {
    case 'blog':
      return `${prefix}/ressources/blog/${slug}`;
    case 'service':
      return `${prefix}/services/${slug}`;
    case 'case-study':
      return `${prefix}/ressources/case-studies/${slug}`;
    case 'pages':
      return `${prefix}/${slug}`;
    default:
      return `${prefix}/${slug}`;
  }
}

/**
 * Build hreflang map for a content item
 * Takes the frontmatter from all locales and returns a map
 */
export function buildHrefLangMap(
  translations: Partial<Record<'fr' | 'en' | 'es', AnyFrontmatter>>,
  baseUrl = 'https://www.iteradvisors.com'
): Partial<Record<'fr' | 'en' | 'es', string>> {
  const result: Partial<Record<'fr' | 'en' | 'es', string>> = {};

  for (const [locale, frontmatter] of Object.entries(translations)) {
    if (frontmatter) {
      const path = getPathFromSlug(frontmatter.slug, locale as 'fr' | 'en' | 'es');
      result[locale as 'fr' | 'en' | 'es'] = `${baseUrl}${path}`;
    }
  }

  return result;
}

/**
 * Validate SEO metrics for a frontmatter object
 * Returns a report of any SEO issues
 */
export interface SEOIssue {
  field: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export function validateSEO(frontmatter: AnyFrontmatter): SEOIssue[] {
  const issues: SEOIssue[] = [];

  // Title validation
  if (!frontmatter.title) {
    issues.push({
      field: 'title',
      severity: 'error',
      message: 'Title is required',
    });
  } else if (frontmatter.title.length < 30) {
    issues.push({
      field: 'title',
      severity: 'warning',
      message: `Title too short (${frontmatter.title.length} chars). Recommended 50-60.`,
    });
  } else if (frontmatter.title.length > 60) {
    issues.push({
      field: 'title',
      severity: 'warning',
      message: `Title too long (${frontmatter.title.length} chars). Recommended 50-60.`,
    });
  }

  // Description validation
  if (!frontmatter.description) {
    issues.push({
      field: 'description',
      severity: 'error',
      message: 'Description is required',
    });
  } else if (frontmatter.description.length < 120) {
    issues.push({
      field: 'description',
      severity: 'warning',
      message: `Description too short (${frontmatter.description.length} chars). Recommended 140-160.`,
    });
  } else if (frontmatter.description.length > 160) {
    issues.push({
      field: 'description',
      severity: 'warning',
      message: `Description too long (${frontmatter.description.length} chars). Recommended 140-160.`,
    });
  }

  // Canonical validation
  if (!frontmatter.canonical) {
    issues.push({
      field: 'canonical',
      severity: 'info',
      message: 'Canonical URL not explicitly set. Will be auto-generated.',
    });
  }

  // hreflang for multilingue pages
  if (!frontmatter.hreflang && frontmatter.type !== 'page') {
    issues.push({
      field: 'hreflang',
      severity: 'warning',
      message: 'No hreflang map provided. Other language versions may not be linked.',
    });
  }

  // OG image for blog/case-studies
  if ((frontmatter.type === 'blog' || frontmatter.type === 'case-study') && !frontmatter.ogImage) {
    issues.push({
      field: 'ogImage',
      severity: 'warning',
      message: 'No OG image. Social sharing preview will be default.',
    });
  }

  // Tags for blog articles
  if (frontmatter.type === 'blog' && (!frontmatter.tags || frontmatter.tags.length === 0)) {
    issues.push({
      field: 'tags',
      severity: 'info',
      message: 'No tags provided. This helps with content discovery.',
    });
  }

  return issues;
}

/**
 * Generate SEO report summary
 */
export function getSEOScore(frontmatter: AnyFrontmatter): {
  score: number;
  issues: SEOIssue[];
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
} {
  const issues = validateSEO(frontmatter);

  const errorCount = issues.filter(i => i.severity === 'error').length;
  const warningCount = issues.filter(i => i.severity === 'warning').length;

  // Simple scoring: -25 per error, -10 per warning
  let score = 100;
  score -= errorCount * 25;
  score -= warningCount * 10;
  score = Math.max(0, Math.min(100, score));

  let grade: 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 80) grade = 'B';
  else if (score >= 70) grade = 'C';
  else if (score >= 60) grade = 'D';

  return { score, issues, grade };
}
