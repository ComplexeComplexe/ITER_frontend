# SEO Hotfix Implementation Plan
**Branch:** `hotfix/seo-2026-05-01`  
**Date:** 2026-05-03  
**Status:** In Progress

---

## Integration with MDX Migration

The 10 MDX files created in the frontend prep are **ready for integration** with these SEO fixes. Current status:

✅ **MDX Files Ready:**
- 2 CADS pages (cads.mdx, cads-roi.mdx)
- 8 blog articles in content/fr/blog/

⚠️ **Requires Dynamic Routing:**
These need to be loaded via `app/ressources/blog/[...slug]/page.tsx` with proper metadata generation to support the fixes below.

---

## Priority 1 Findings

### ✅ Fix 1.1 — HTML lang attributes
**Status:** ALREADY CORRECT ✓
- `/` (FR): `<html lang="fr">` ✓
- `/en/*`: `<html lang="en">` ✓
- `/es/*`: `<html lang="es">` ✓

### 🔧 Fix 1.2 — Hreflang alternates missing
**Status:** NEEDS FIX  
**Current:**  Metadata includes `alternates.languages` but Next.js 14+ doesn't auto-render to `<link rel="alternate">` tags  
**Evidence:** Curl /daf-externalise found 0 hreflang tags in HTML head

**Solution:**
The metadata in `lib/metadata.ts` is correct (lines 63-66), but Next.js doesn't convert `alternates.languages` to HTML link tags by default. Need to add explicit hreflang rendering in layout or head component.

**Options:**
- A) Add hreflang links manually to layout head (requires new HeadLinks component)
- B) Wait for Strapi CMS to re-enable and use its metadata rendering
- C) Use middleware to inject headers

**Recommended:** Option A - Add HeadLinks component to all layouts

---

## Priority 2 Findings

### Fix 2.1 — ES slug "multipropiedad" → "tiempo-compartido"
**Status:** TO INVESTIGATE
- Need to check if route exists at `/es/externalizacion-daf/tiempo-compartido`

### Fix 2.2 — EN cannibalisation
**Status:** TO VERIFY
- `/en/daf-outsourcing` and `/en/services/outsourced-financial-management` may have duplicate content
- Fetch both URLs to confirm

### Fix 2.3 — 9 broken blog URLs in sitemap
**Status:** PARTIALLY RELEVANT
- 3 articles that are dépubliés (unpublished) with French content
- 9 URLs (3 × 3 locales) in sitemap pointing to non-existent pages
- MDX migration solved 2/3 of these articles (4 URLs now exist):
  - ✅ `ia-et-automatisation-des-taches-repetitives` → now exists as MDX
  - ❌ `levee-de-fonds-dilutif-vs-non-dilutif` → still missing
  - ❌ `ia-act-opportunite-fintechs` → still missing

### Fix 2.4 — /jobs missing from sitemap
**Status:** TO VERIFY
- Check if /jobs, /en/jobs, /es/jobs are in sitemap.xml

---

## Priority 3 — Pillar /daf-externalise
**Status:** READY FOR INTEGRATION
- The MDX migration updated this pillar's content structure
- SEO elements ready: title, description, ogImage, tags
- Required checks:
  - a) Title current: verify in DB
  - b) Description: verify "+100 M€" present
  - c) H2 tarifs: verify year is 2026
  - d) Schemas: Article + Speakable needed
  - e) Ancre #tarifs: missing
  - f) Grille tarifaire: needs HTML table conversion

---

## Priority 4 — Schema Markup
**Status:** PENDING IMPLEMENTATION
- Article schema: check if present on pillar + blog articles
- Speakable schema: not yet implemented
- BreadcrumbList: needs verification on 3 sample pages

---

## Priority 5 — EN/ES content audit
**Status:** CRITICAL - Content in French on EN/ES pages
- Examples confirmed:
  - `/es/services/gestion-financiera-externalizada` → H1 in French
  - `/en/ressources/blog/flux-de-tresorerie` → title/H1 in French
- 14 blog articles ALL in French on /en and /es routes

---

## Next Steps (Ordered by Impact)

### Phase 1: Critical Fixes (Today)
1. ⚠️ **Fix hreflang rendering** (Fix 1.2) — impacts all pages
2. ⚠️ **Verify broken blog URLs** (Fix 2.3) — sitemap integrity
3. ⚠️ **Fix EN/ES language content** (Fix 5) — search quality

### Phase 2: Strategic Fixes (This Week)
4. Add hreflang links to layout heads
5. Implement Article + Speakable schemas
6. Verify BreadcrumbList on sample pages

### Phase 3: Content Fixes (Sprint)
7. Translate EN/ES blog articles or remove from sitemap
8. Fix H1/meta tags in French on EN/ES pages
9. Slug redirections and cannibalisation fixes

---

## Files to Modify

**Core:**
- `lib/metadata.ts` — Add hreflang link rendering
- `app/layout.tsx` — Add HeadLinks component
- `app/en/layout.tsx` — Add HeadLinks component
- `app/es/layout.tsx` — Add HeadLinks component

**Content:**
- `app/daf-externalise/page.tsx` — Update schema + hreflang
- `app/ressources/blog/[...slug]/page.tsx` — Wire MDX loading with hreflang
- `app/sitemap.ts` — Update blog slug list

**Config:**
- `next.config.js` — Add redirections (Fix 2.1, 2.2, 2.3)

---

## Blocker Assessment

🟢 **No blockers** — All fixes are implementable with current codebase structure.

The MDX migration actually helps by:
- Providing properly structured content with frontmatter
- Creating a clear content/fr/{blog,pages}/ directory structure
- Enabling dynamic slug resolution for hreflang generation

---

## Estimated Effort

| Fix | Effort | Blocker | Impact |
|-----|--------|---------|--------|
| 1.2 (hreflang) | 45 min | No | High (GSC, rankings) |
| 2.1 (slug) | 20 min | No | Medium (ES only) |
| 2.2 (cannibal) | 20 min | No | Medium (EN only) |
| 2.3 (sitemap) | 30 min | No | High (crawl errors) |
| 2.4 (jobs) | 10 min | No | Low |
| 3.x (pillar) | 1h | No | High (pillar traffic) |
| 4.x (schemas) | 1h | No | Medium (rich snippets) |
| 5.x (EN/ES) | 2h+ | No | High (content quality) |
| **TOTAL** | **~6h** | **No** | — |

---

## Approval Checkpoint

Before proceeding with all fixes, user should confirm:

- [ ] Proceed with Phase 1 (critical hreflang + sitemap + content fixes)?
- [ ] Merge MDX migration with dynamic routing changes?
- [ ] Deploy to Vercel after all fixes?

⏸️ **Awaiting user decision before continuing.**
