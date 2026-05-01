# Blog Post Layout — Usage Guide

## Overview

The `BlogPostLayout` component provides a complete, production-ready template for blog articles on iteradvisors.com. It solves all 12 identified UX problems (P1-P12) in the current blog template.

## Component Structure

```
BlogPostLayout
├── BlogHero (hero image, category, title, dek, author, date)
├── TableOfContents (auto-anchored TOC)
├── Tldr ("À retenir en 30 secondes" summary)
├── Article Content (prose-blog typography)
│   ├── H2/H3 structure
│   ├── Paragraphs (2-4 sentences max)
│   ├── Callout (info/warning/success/danger)
│   ├── StatGrid (key metrics)
│   ├── ProseTable (comparison tables)
│   └── InlineCta (mid-article conversion)
└── RelatedArticles (2-3 semantically-linked articles)
```

## Usage Example

```tsx
import { BlogPostLayout } from '@/components/blog';

export default function BlogArticlePage() {
  return (
    <BlogPostLayout
      category="Fiscalité internationale"
      title="Régimes fiscaux : France vs Espagne"
      dek="Comparaison complète des IS, TVA, cotisations sociales et régimes spéciaux en 2026"
      author={{
        name: "Iter Advisors",
        avatar: "/images/authors/iter.jpg",
        jobTitle: "Cabinet de DAF externalisé",
      }}
      readingTime={8}
      dateModified="2026-05-01T00:00:00Z"
      heroImage="/images/blog/fiscalite.jpg"
      toc={[
        { id: "impot-societes", label: "1. Impôt sur les sociétés" },
        { id: "tva", label: "2. TVA et numéro INTRA-communautaire" },
        { id: "cotisations", label: "3. Cotisations sociales" },
        { id: "regimes-speciaux", label: "4. Régimes spéciaux" },
        { id: "profil", label: "5. Quel choix selon votre profil ?" },
      ]}
      tldr={
        <>
          <p>
            <strong>France :</strong> IS 25,83%, TVA 20%, cotisations élevées
          </p>
          <p>
            <strong>Espagne :</strong> IS 25%, TVA 21%, PVN/PAC pour petites
            structures
          </p>
          <p>
            <strong>À retenir :</strong> Consulter un expert avant changement de
            régime
          </p>
        </>
      }
      relatedArticles={[
        {
          url: "/ressources/blog/daf-externalise",
          category: "DAF externalisé",
          title: "Guide complet du DAF externalisé",
        },
        {
          url: "/ressources/blog/levee-fonds",
          category: "Financement",
          title: "Préparer sa levée de fonds : aspects juridiques et fiscaux",
        },
      ]}
    >
      {/* Article content here — plain HTML or MDX */}
      <h2 id="impot-societes">1. Impôt sur les sociétés</h2>
      <p>
        L'impôt sur les sociétés diffère significativement entre la France et
        l'Espagne...
      </p>

      {/* Example of components */}
      <Callout type="info" title="À savoir">
        Les régimes fiscaux peuvent être modifiés en France par décret, en
        Espagne par ordonnance ministérielle.
      </Callout>

      <h2 id="tva">2. TVA et numéro INTRA-communautaire</h2>
      {/* ... content ... */}

      <StatGrid
        items={[
          { label: "Économie potentielle", value: "€7,500", sublabel: "par employé/an" },
          { label: "Temps d'implémentation", value: "2-4 mois", sublabel: "avant optimisation" },
        ]}
      />

      {/* ... more content ... */}

      <h2 id="regimes-speciaux">4. Régimes spéciaux</h2>

      <ProseTable>
        <thead>
          <tr>
            <th>Critère</th>
            <th>France</th>
            <th>Espagne</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CA micro-entreprise</td>
            <td>€176 200</td>
            <td>€600 000</td>
          </tr>
          {/* ... rows ... */}
        </tbody>
      </ProseTable>

      <InlineCTA
        title="Besoin d'un audit fiscal complet ?"
        body="Notre équipe analyse votre situation et identifie les optimisations possibles."
        ctaLabel="Demander un échange"
        ctaHref="/contact"
      />

      {/* ... final sections ... */}
    </BlogPostLayout>
  );
}
```

## Component Props Reference

### BlogPostLayout

```typescript
interface BlogPostLayoutProps {
  category: string;                     // "Fiscalité internationale"
  title: string;                        // Page H1
  dek: string;                          // 1-line subtitle
  author: {
    name: string;
    avatar?: string;                    // URL to avatar image
    jobTitle?: string;
  };
  readingTime: number;                  // in minutes
  dateModified: string;                 // ISO 8601
  heroImage?: string;                   // 720x360px WebP
  toc: Array<{ id: string; label: string }>;
  tldr: ReactNode;                      // 3-4 sentences, HTML or string
  children: ReactNode;                  // Article HTML/MDX content
  relatedArticles?: Array<{
    url: string;
    category: string;
    title: string;
  }>;
}
```

### Sub-Components

#### Callout

```typescript
<Callout
  type="warning" | "info" | "success" | "danger"
  title="Optional title"
>
  Content here
</Callout>
```

#### StatGrid

```typescript
<StatGrid
  items={[
    { label: "Label", value: "123", sublabel: "Optional" },
  ]}
  columns={2 | 3 | 4}  // default: 2
/>
```

#### InlineCTA

```typescript
<InlineCTA
  title="Title"
  body="Body text"
  ctaLabel="Button text"
  ctaHref="/path"
/>
```

#### ProseTable

```typescript
<ProseTable>
  <thead>
    <tr><th>Col 1</th><th>Col 2</th></tr>
  </thead>
  <tbody>
    <tr><td>Row</td><td>Data</td></tr>
  </tbody>
</ProseTable>
```

## Migration Checklist

For each existing blog article:

- [ ] Add hero image (720×360px, WebP, lazy-loaded)
- [ ] Set category tag
- [ ] Write dek (1-line summary)
- [ ] Get/create author avatar
- [ ] Structure content in H2/H3 (5-8 H2 per 1000 words)
- [ ] Break long paragraphs (max 2-4 sentences)
- [ ] Add table(s) for comparisons
- [ ] Add 1-2 callouts for warnings/notes
- [ ] Add stat cards for key metrics
- [ ] Add TL;DR (3-4 sentences)
- [ ] Add 1 inline CTA (mid-article)
- [ ] Identify 2-3 semantically-linked related articles
- [ ] Remove date duplication
- [ ] Remove author name duplication
- [ ] Test responsive layout (mobile + tablet)
- [ ] Validate JSON-LD schema (Person + Article)

## Typography Defaults

### Colors

- **Text**: `oklch(0.20 0.01 270)` (dark slate)
- **Headings**: `oklch(0.15 0.01 270)` (darker slate)
- **Links**: `#2563eb` (blue)
- **Backgrounds**: `oklch(0.96 0.003 270)` (light gray)

### Spacing

- **Max-width**: 720px
- **Line-height**: 1.7
- **H2 margin-top**: 2rem
- **Paragraph margin-bottom**: 1.25rem
- **Section spacing**: 2rem

### Fonts

- **Headings**: Space Grotesk, weight 500
- **Body**: DM Sans, weight 400

## Files

- `BlogPostLayout.tsx` — Main component
- `BlogHero.tsx` — Hero section
- `TableOfContents.tsx` — Anchored TOC
- `Tldr.tsx` — Summary box
- `Callout.tsx` — Info/warning boxes
- `StatGrid.tsx` — Metrics cards
- `ProseTable.tsx` — Table wrapper
- `InlineCta.tsx` — Contextual CTA
- `RelatedArticles.tsx` — Related articles section
- `AuthorByline.tsx` — Author display
- `BlogPostLayout.module.css` — Typography styles
- `tailwind.config.ts` — Extended Tailwind config
