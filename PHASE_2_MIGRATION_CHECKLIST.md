# Blog Refonte — Phase 2 Migration Checklist

## Overview

Phase 1 (component creation) is complete. Phase 2 involves migrating all 14 existing blog articles to use the new `BlogPostLayout` component.

This document provides a step-by-step checklist for each article migration.

---

## Per-Article Checklist

Use this template for each blog article:

### Article: [Title]
**URL**: `/ressources/blog/[slug]`  
**Status**: ⬜ Not started | 🟨 In progress | ✅ Complete

#### 1. Content Audit
- [ ] Read current article, identify main sections
- [ ] Count words (target: 800–1200 words)
- [ ] Note existing headings/structure (if any)
- [ ] Identify comparison data (needs table)
- [ ] List key metrics/statistics
- [ ] Find or create hero image (720×360px, WebP, <150KB)

#### 2. Metadata Setup
- [ ] Set **category** (e.g., "Fiscalité", "DAF externalisé", "Financement")
- [ ] Write **dek** (1-2 sentences: what value does reader get?)
- [ ] Set **readingTime** (estimate: 1 min per 250 words)
- [ ] Set **author**: "Iter Advisors" + avatar + job title
- [ ] Set **dateModified**: current date in ISO format

#### 3. Content Structure
- [ ] Create **TOC items** (map H2 sections):
  ```
  { id: "section-1-slug", label: "1. Section Name" }
  { id: "section-2-slug", label: "2. Section Name" }
  ...
  ```
- [ ] Restructure article body:
  - [ ] Add H2 headings (min 5–8 per 1000 words)
  - [ ] Add H3 sub-headings where needed
  - [ ] Break paragraphs into 2–4 sentences max
  - [ ] Mark comparison sections (→ table)
  - [ ] Identify warning/note sections (→ Callout)
  - [ ] Extract stat/metric lines (→ StatGrid)

#### 4. Components Placement
- [ ] Add **Tldr** summary (3–4 key takeaways)
- [ ] Add **Callout**(s) for warnings/notes (optional, type: info|warning|success|danger)
- [ ] Add **StatGrid** for metrics if applicable (e.g., pricing, savings, timelines)
- [ ] Add **ProseTable**(s) for comparisons
- [ ] Add **InlineCta** mid-article (optional, but recommended for conversion)

#### 5. Related Articles
- [ ] Identify 2–3 **semantically-linked** articles:
  - Same topic cluster (e.g., fiscal articles linking to tax guides)
  - NOT just "latest 3 articles" (avoid generic related)
  - Should improve reader's context/journey
- [ ] Create `relatedArticles` array with url, category, title

#### 6. Code Integration
- [ ] Create/update page component at `/app/ressources/blog/[slug]/page.tsx`
- [ ] Import: `import { BlogPostLayout } from '@/components/blog'`
- [ ] Wrap article content with `<BlogPostLayout>` props
- [ ] Render article body (HTML, JSX, or parsed markdown)
- [ ] Update/remove old date, author duplication

#### 7. Validation
- [ ] **Mobile view**: Test on mobile breakpoints (375px, 540px, 768px)
- [ ] **Desktop view**: Verify 720px max-width on wide screens
- [ ] **TOC anchors**: Click each TOC link, verify navigation works
- [ ] **Related articles**: Links navigate to correct articles
- [ ] **Images**: Hero image loads, responsive, no layout shift
- [ ] **Typography**: Headings, body text, lists render correctly
- [ ] **InlineCTA**: CTA button visible, clickable, correct href

#### 8. Schema Validation
- [ ] Run URL through [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify `ArticlePosting` schema parsed correctly
- [ ] Check: headline, description, datePublished, dateModified, author, image

#### 9. Commit & Deploy
- [ ] Stage files: `git add app/ressources/blog/[slug]/`
- [ ] Commit: `"feat(blog): refonte [Article Title]"`
- [ ] Push to staging branch
- [ ] Deploy to preview
- [ ] Verify live at preview URL

---

## Batch Schedule (Estimated)

**Dependency**: All articles depend on Phase 1 being complete (✅ DONE)

| Week | Articles | Days | Notes |
|------|----------|------|-------|
| W1 (May 1–3) | 2–3 pilot | 2–3 | Start with `regimes-fiscaux-france-vs-espagne` |
| W2 (May 5–10) | 4–5 main articles | 3–4 | Mid-sized articles, good case studies |
| W3 (May 12–17) | 5–6 remaining | 3–4 | Smaller/longer articles, patterns emerge |

**Parallel**: While articles are being migrated, prepare:
- [ ] Email/Slack template for editorial team (checklist above)
- [ ] Template page component (for copy/paste)
- [ ] Image guidelines (size, format, naming)

---

## Article List (14 Total)

Update this as you progress:

### Tier 1: Pilot (Start Here)
- [ ] `regimes-fiscaux-france-vs-espagne` — **Complex**, comparison table, multiple CTAs
  - Reason: Most impactful example, addresses P1–P12
  - Estimated time: 1–2 hours (content already strong)

### Tier 2: Core Articles (Week 1–2)
- [ ] `daf-externalise` (or variant)
- [ ] `levee-fonds-startup`
- [ ] `cfo-outsourcing`
- [ ] `trésorerie-pme`

### Tier 3: Supporting Articles (Week 2–3)
- [ ] `glossaire-*` articles (shorter, simpler)
- [ ] `guide-*` articles (longer, segmented)
- [ ] Remaining filler articles

---

## Template: Page Component

Save as `/app/ressources/blog/[SLUG]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { BlogPostLayout, Callout, StatGrid, InlineCTA } from '@/components/blog';
import { buildStrapiMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return buildStrapiMetadata({
    endpoint: 'blog-article-[slug]',
    locale: 'fr',
    path: '/ressources/blog/[slug]',
    fallbackTitle: '[ARTICLE_TITLE]',
    fallbackDescription: '[DEK_SUBTITLE]',
  });
}

export default function ArticlePage() {
  return (
    <BlogPostLayout
      category="[CATEGORY]"
      title="[TITLE]"
      dek="[SUBTITLE]"
      author={{
        name: 'Iter Advisors',
        avatar: '/images/authors/iter.jpg',
        jobTitle: 'Cabinet de DAF externalisé',
      }}
      readingTime={[TIME_IN_MINUTES]}
      dateModified="[DATE_ISO]"
      heroImage="/images/blog/[slug].webp"
      toc={[
        { id: 'section-1', label: '1. Section Name' },
        { id: 'section-2', label: '2. Section Name' },
      ]}
      tldr="[SUMMARY_3_SENTENCES]"
      relatedArticles={[
        {
          url: '/ressources/blog/related-1',
          category: 'Related Category',
          title: 'Related Article Title',
        },
        {
          url: '/ressources/blog/related-2',
          category: 'Related Category',
          title: 'Related Article Title',
        },
      ]}
    >
      <h2 id="section-1">1. Section Name</h2>
      <p>Content here...</p>

      <Callout type="info" title="À savoir">
        Key point or warning
      </Callout>

      <h2 id="section-2">2. Section Name</h2>
      <p>Content...</p>

      <StatGrid
        items={[
          { label: 'Metric 1', value: '€X,XXX', sublabel: 'per month' },
          { label: 'Metric 2', value: 'Y%', sublabel: 'improvement' },
        ]}
      />

      <InlineCTA
        title="Ready to optimize?"
        body="Our team helps you implement these strategies."
        ctaLabel="Schedule a consultation"
        ctaHref="/contact"
      />

      {/* More content */}
    </BlogPostLayout>
  );
}
```

---

## Image Guidelines

### Hero Image
- **Size**: 720×360px (2:1 aspect ratio)
- **Format**: WebP (or JPG fallback)
- **File size**: <150KB (use compression)
- **Naming**: `/public/images/blog/[slug].webp`
- **Alt text**: Article title or key phrase

### Inline Images (Optional)
- **Size**: ~600px wide max
- **Format**: WebP or optimized JPG
- **File size**: <100KB each
- Use Next.js `<Image>` component with `sizes` attribute

---

## Category Reference

Use consistent categories across articles:

| Category | Usage | Color (CSS) |
|----------|-------|------------|
| Fiscalité | Tax/regulatory articles | blue-600 |
| DAF externalisé | Outsourcing CFO | blue-700 |
| Financement | Fundraising, M&A, capital | green-600 |
| Trésorerie | Cash management, finance ops | purple-600 |
| Gestion RH | Payroll, benefits, HR | orange-600 |
| Reporting | Financial reports, KPIs | slate-600 |

---

## Success Metrics

**Per article**, measure:
- [ ] **Typography**: Headings, paragraphs render with correct sizing
- [ ] **Readability**: Line-height 1.7, max-width 720px enforced
- [ ] **Engagement**: Related articles visible, inline CTA clickable
- [ ] **Performance**: Hero image loads <2s, no CLS (layout shift)
- [ ] **SEO**: Schema valid, meta tags updated, internal links functional

**Batch metrics** (after all 14 migrated):
- [ ] **Dwell time**: +20% average session duration
- [ ] **Scroll depth**: +15% below-fold engagement
- [ ] **Internal links**: +30% CTR to related articles
- [ ] **Schema**: 0 errors in Rich Results Test
- [ ] **GSC data**: Improved impressions/clicks on target keywords

---

## Common Issues & Fixes

### Issue: TOC anchor links don't scroll smoothly
**Fix**: Ensure each H2 has unique `id` attribute matching TOC entry. Verify `scroll-behavior: smooth;` in globals.css (already set).

### Issue: Related articles not appearing
**Fix**: Check `relatedArticles` prop array is not empty. Verify article URLs are correct.

### Issue: Hero image distorted or oversized
**Fix**: Ensure image is 720×360px aspect ratio. Use `object-cover` in Image component (already set).

### Issue: Callout styling not applying
**Fix**: Verify Callout component imported correctly. Check `type` prop is one of: info|warning|success|danger.

### Issue: InlineCTA button not clickable
**Fix**: Verify `ctaHref` is a valid route. Check button is within viewport (not hidden by layout).

---

## Editorial Guidelines for Future Articles

**For all NEW blog articles going forward:**

1. **Author**: Always "Iter Advisors" (or specific consultant name if applicable)
2. **Category**: Pick one from the reference list above
3. **Dek**: Write 1-2 sentences summarizing key value
4. **Structure**: Min 5 H2 sections (per 1000 words), H3 for subsections
5. **Visuals**: Hero image required (720×360px WebP)
6. **Components**: At least 1 Callout, 1 StatGrid, or 1 Table per article
7. **Length**: 800–2000 words (scannability > length)
8. **CTA**: Always include 1 InlineCTA + final CTA at end
9. **Related**: Select 2–3 semantic links (not generic "latest")
10. **Dates**: Show only "Mis à jour [mois année]" (no publication date)

---

**Next Step**: Start with **Tier 1 pilot** article, follow checklist, then expand to Tier 2 & 3.

Good luck! 🚀
