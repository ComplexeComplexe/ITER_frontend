import { z } from 'zod';

/**
 * Schema validation for MDX frontmatter
 * Used across all content types: pages, blog, case-studies, services
 */

/* ────────────────────────────────────────────────────────────── */
/* Base metadata shared across all content types                   */
/* ────────────────────────────────────────────────────────────── */

export const BaseFrontmatterSchema = z.object({
  // Core identity
  title: z.string().min(10).max(100).describe('Page/Article title (SEO 50-60 chars ideally)'),
  slug: z.string().regex(/^[a-z0-9-]+$/).describe('URL slug (lowercase, hyphens only)'),
  locale: z.enum(['fr', 'en', 'es']).describe('Content language'),

  // SEO
  description: z.string().min(50).max(200).describe('Meta description (140-160 chars)'),
  canonical: z.string().url().optional().describe('Canonical URL (auto-filled if omitted)'),
  hreflang: z.record(z.string(), z.string().url()).optional().describe('Translations map: { fr: url, en: url, es: url }'),

  // OpenGraph & social
  ogImage: z.string().url().optional().describe('OG image URL (1200x630 recommended)'),
  ogTitle: z.string().max(100).optional().describe('OG title (falls back to title)'),
  ogDescription: z.string().max(200).optional().describe('OG description (falls back to description)'),

  // Content metadata
  publishedAt: z.string().datetime().optional().describe('ISO 8601 timestamp'),
  updatedAt: z.string().datetime().optional().describe('ISO 8601 timestamp'),
  author: z.string().optional().describe('Author name or company'),

  // Categorization
  tags: z.array(z.string()).optional().describe('Array of topic tags'),
  relatedPages: z.array(z.string()).optional().describe('Array of slug references'),

  // Display settings
  noindex: z.boolean().optional().default(false).describe('Block search indexing'),
  nofollow: z.boolean().optional().default(false).describe('Block link following'),
});

export type BaseFrontmatter = z.infer<typeof BaseFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Blog article frontmatter (extends Base)                         */
/* ────────────────────────────────────────────────────────────── */

export const BlogFrontmatterSchema = BaseFrontmatterSchema.extend({
  type: z.literal('blog'),

  // Blog-specific
  excerpt: z.string().min(100).max(300).describe('Short teaser for listing pages'),
  featuredImage: z.string().url().optional().describe('Featured image URL'),
  readingTime: z.number().optional().describe('Estimated reading time in minutes'),

  // Editorial
  category: z.enum(['finance', 'growth', 'operations', 'strategy']).optional(),
});

export type BlogFrontmatter = z.infer<typeof BlogFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Service page frontmatter (extends Base)                         */
/* ────────────────────────────────────────────────────────────── */

export const ServiceFrontmatterSchema = BaseFrontmatterSchema.extend({
  type: z.literal('service'),

  // Service-specific
  serviceType: z.enum([
    'previsionnel-tresorerie',
    'comptabilite-externalisation',
    'accompagnement-levee-de-fond',
    'controle-de-gestion-externalise',
    'gestion-financiere-externalisee',
    'ma-due-diligence'
  ]),

  // Pricing (optional, for service pages that show pricing)
  pricing: z.object({
    currency: z.string().default('EUR'),
    startPrice: z.number().optional(),
    endPrice: z.number().optional(),
    description: z.string().optional(),
  }).optional(),

  // Service metadata
  icon: z.string().optional().describe('Icon component name or emoji'),
  longDescription: z.string().optional().describe('Extended description for service listings'),
});

export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Case study frontmatter (extends Base)                           */
/* ────────────────────────────────────────────────────────────── */

export const CaseStudyFrontmatterSchema = BaseFrontmatterSchema.extend({
  type: z.literal('case-study'),

  // Case study specifics
  client: z.object({
    name: z.string().describe('Client company name'),
    logo: z.string().url().optional(),
    industry: z.string().optional(),
    website: z.string().url().optional(),
  }),

  challenge: z.string().describe('The business challenge'),
  solution: z.string().describe('How we solved it'),
  result: z.string().describe('Measurable outcome'),

  resultMetrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    change: z.string().optional().describe('e.g., "+23%"'),
  })).optional(),

  services: z.array(z.string()).describe('Services used'),
});

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Generic page frontmatter (extends Base)                         */
/* ────────────────────────────────────────────────────────────── */

export const PageFrontmatterSchema = BaseFrontmatterSchema.extend({
  type: z.literal('page'),

  // Page structure
  layout: z.enum(['default', 'sidebar', 'full']).optional().default('default'),
  showTOC: z.boolean().optional().default(true).describe('Show table of contents'),
  showRelated: z.boolean().optional().default(true).describe('Show related content'),
});

export type PageFrontmatter = z.infer<typeof PageFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Union type for any content                                      */
/* ────────────────────────────────────────────────────────────── */

export const AnyFrontmatterSchema = z.discriminatedUnion('type', [
  BlogFrontmatterSchema,
  ServiceFrontmatterSchema,
  CaseStudyFrontmatterSchema,
  PageFrontmatterSchema,
]);

export type AnyFrontmatter = z.infer<typeof AnyFrontmatterSchema>;

/* ────────────────────────────────────────────────────────────── */
/* Helper functions for validation                                 */
/* ────────────────────────────────────────────────────────────── */

export function validateFrontmatter(data: unknown, type: 'blog' | 'service' | 'case-study' | 'page'): AnyFrontmatter {
  const schemaMap = {
    blog: BlogFrontmatterSchema,
    service: ServiceFrontmatterSchema,
    'case-study': CaseStudyFrontmatterSchema,
    page: PageFrontmatterSchema,
  };

  return schemaMap[type].parse(data);
}

export function parseFrontmatter(frontmatterString: string): Record<string, any> {
  // Simple YAML-like frontmatter parser
  // For production, use a proper YAML parser
  const lines = frontmatterString.split('\n');
  const result: Record<string, any> = {};

  for (const line of lines) {
    if (!line.includes(':')) continue;
    const [key, value] = line.split(':').map(s => s.trim());

    // Simple type inference
    if (value === 'true') result[key] = true;
    else if (value === 'false') result[key] = false;
    else if (!isNaN(Number(value))) result[key] = Number(value);
    else result[key] = value;
  }

  return result;
}
