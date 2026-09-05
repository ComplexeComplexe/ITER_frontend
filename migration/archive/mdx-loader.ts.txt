import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { validateFrontmatter, type AnyFrontmatter } from './schema';

/**
 * Content loader for MDX files
 * Reads frontmatter + body from .mdx files across locales
 */

const CONTENT_DIR = path.join(process.cwd(), 'content');

export interface ContentFile {
  frontmatter: AnyFrontmatter;
  body: string;
  path: string;
  locale: string;
}

/**
 * Load a single MDX file by locale and slug
 */
export async function getContentBySlug(
  locale: 'fr' | 'en' | 'es',
  type: 'blog' | 'service' | 'case-study' | 'pages',
  slug: string
): Promise<ContentFile | null> {
  const filePath = path.join(CONTENT_DIR, locale, type, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  // Validate frontmatter against schema
  const typeMap = { pages: 'page', blog: 'blog', service: 'service', 'case-study': 'case-study' } as const;
  const contentType = typeMap[type];

  const frontmatter = validateFrontmatter({ ...data, type: contentType }, contentType);

  return {
    frontmatter,
    body: content,
    path: filePath,
    locale,
  };
}

/**
 * List all content of a specific type and locale
 */
export async function listContent(
  locale: 'fr' | 'en' | 'es',
  type: 'blog' | 'service' | 'case-study' | 'pages'
): Promise<ContentFile[]> {
  const dirPath = path.join(CONTENT_DIR, locale, type);

  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.mdx'));
  const content: ContentFile[] = [];

  for (const file of files) {
    const slug = file.replace('.mdx', '');
    const result = await getContentBySlug(locale, type, slug);

    if (result) {
      content.push(result);
    }
  }

  return content;
}

/**
 * Get all translations of a content by slug
 * Returns { fr, en, es } keyed by locale
 */
export async function getContentTranslations(
  slug: string,
  type: 'blog' | 'service' | 'case-study' | 'pages'
): Promise<Partial<Record<'fr' | 'en' | 'es', ContentFile>>> {
  const locales: ('fr' | 'en' | 'es')[] = ['fr', 'en', 'es'];
  const result: Partial<Record<'fr' | 'en' | 'es', ContentFile>> = {};

  for (const locale of locales) {
    const content = await getContentBySlug(locale, type, slug);
    if (content) {
      result[locale] = content;
    }
  }

  return result;
}

/**
 * Search content across all locales by title/description/tags
 */
export async function searchContent(
  query: string,
  type?: 'blog' | 'service' | 'case-study' | 'pages'
): Promise<ContentFile[]> {
  const locales: ('fr' | 'en' | 'es')[] = ['fr', 'en', 'es'];
  const types: Array<'blog' | 'service' | 'case-study' | 'pages'> = type
    ? [type]
    : ['blog', 'service', 'case-study', 'pages'];

  const results: ContentFile[] = [];
  const queryLower = query.toLowerCase();

  for (const locale of locales) {
    for (const contentType of types) {
      const content = await listContent(locale, contentType);

      for (const item of content) {
        if (
          item.frontmatter.title.toLowerCase().includes(queryLower) ||
          item.frontmatter.description.toLowerCase().includes(queryLower) ||
          item.frontmatter.tags?.some(tag => tag.toLowerCase().includes(queryLower))
        ) {
          results.push(item);
        }
      }
    }
  }

  return results;
}

/**
 * Get related content by tags
 */
export async function getRelatedContent(
  slug: string,
  type: 'blog' | 'service' | 'case-study' | 'pages',
  locale: 'fr' | 'en' | 'es',
  limit = 3
): Promise<ContentFile[]> {
  const item = await getContentBySlug(locale, type, slug);
  if (!item || !item.frontmatter.tags?.length) {
    return [];
  }

  const allContent = await listContent(locale, type);
  const related = allContent
    .filter(c => c.frontmatter.slug !== slug)
    .filter(c => c.frontmatter.tags?.some(tag => item.frontmatter.tags?.includes(tag)))
    .slice(0, limit);

  return related;
}

/**
 * Fallback: Get from legacy source if MDX doesn't exist
 * (Used during migration while Strapi is suspended)
 */
export async function getContentWithFallback(
  locale: 'fr' | 'en' | 'es',
  type: 'blog' | 'service' | 'case-study' | 'pages',
  slug: string
): Promise<ContentFile | null> {
  // Try MDX first
  const mdxContent = await getContentBySlug(locale, type, slug);
  if (mdxContent) {
    return mdxContent;
  }

  // Fallback: could import from lib/content/blog-posts, lib/content/daf, etc.
  // This will be implemented later when those modules are ready
  return null;
}
