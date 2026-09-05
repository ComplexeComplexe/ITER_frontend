# 📝 Content Directory — MDX Structure

This directory contains all Markdown + JSX content for the Iter Advisors frontend.

## Structure

```
content/
├── fr/                    # French content
│   ├── pages/            # Static pages (À propos, Contact, etc.)
│   ├── blog/             # Blog articles
│   ├── services/         # Service pages
│   └── case-studies/     # Case studies
├── en/                    # English content (same structure)
├── es/                    # Spanish content (same structure)
└── README.md             # This file
```

## Frontmatter Schema

All `.mdx` files must include frontmatter validated against `lib/schema.ts`:

```yaml
---
type: blog | service | case-study | page
title: "Page Title (50-60 chars)"
slug: "url-slug"
locale: fr | en | es
description: "Meta description (140-160 chars)"
publishedAt: "2024-05-03T10:00:00Z"
ogImage: "https://..."
hreflang:
  fr: "https://..."
  en: "https://..."
  es: "https://..."
tags: ["tag1", "tag2"]
---
```

## File Naming

- Use kebab-case: `my-article.mdx`
- No spaces or special characters (except hyphens)
- Slugs must match filenames

## Content Guidelines

### For Blog Articles (`blog/`)

```yaml
type: blog
excerpt: "Short teaser (100-300 chars)"
featuredImage: "https://..."
category: finance | growth | operations | strategy
readingTime: 5  # estimated minutes
```

**Body:** Markdown with optional JSX components

### For Service Pages (`services/`)

```yaml
type: service
serviceType: previsionnel-tresorerie | ...
pricing:
  currency: EUR
  startPrice: 2000
  endPrice: 5000
```

### For Case Studies (`case-studies/`)

```yaml
type: case-study
client:
  name: "Company Name"
  industry: "Industry"
challenge: "The problem they faced"
solution: "How we solved it"
result: "The outcome"
resultMetrics:
  - label: "Revenue growth"
    value: "+45%"
```

### For Pages (`pages/`)

```yaml
type: page
layout: default | sidebar | full
showTOC: true
showRelated: true
```

## Loading Content

Use `lib/content.ts` to load content programmatically:

```typescript
import { getContentBySlug, listContent } from '@/lib/content';

// Get single article
const article = await getContentBySlug('fr', 'blog', 'flux-de-tresorerie');

// List all blog articles
const articles = await listContent('fr', 'blog');

// Get translations
const translations = await getContentTranslations('flux-de-tresorerie', 'blog');
```

## SEO

All frontmatter fields support SEO:

- `title` — Page `<title>`
- `description` — Meta description
- `canonical` — Canonical URL (auto-filled if omitted)
- `hreflang` — Translations map for multilingue pages
- `ogImage` — Open Graph image
- `noindex` — Prevent indexing (default: false)

Use `lib/seo.ts` to validate SEO:

```typescript
import { validateSEO, getSEOScore } from '@/lib/seo';

const issues = validateSEO(frontmatter);
const { score, grade } = getSEOScore(frontmatter);
```

## Migration Status

- [x] Infrastructure (lib/content.ts, lib/schema.ts, lib/seo.ts, lib/links.ts)
- [x] Directory structure created
- [ ] Blog articles migrated (10 articles)
- [ ] Service pages migrated (6 services)
- [ ] CADS pages migrated (2 pages)
- [ ] Router updated to use MDX
- [ ] Search updated to index MDX
- [ ] SEO audit completed

## Next Steps

1. **Migrate hardcoded pages** → MDX files
2. **Validate SEO** for all content
3. **Test routing** (FR/EN/ES)
4. **Update page components** to load from MDX
5. **Deploy to production**

---

**Note:** During migration, both TSX and MDX files are active. TSX files will be phased out once MDX is fully operational.
