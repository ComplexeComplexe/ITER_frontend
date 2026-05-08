# DAF Semantic Silo - 7-Week Implementation Guide

**Project:** Build semantic silo for "DAF Externalisé" (Outsourced CFO) topic cluster  
**Total Content:** 14 pieces, ~14,000 words  
**Timeline:** 7 weeks, phased rollout  
**Location:** `./COCON_DAF_CONTENT/` directory contains all markdown files  
**Status:** Ready to implement  

---

## 📋 Quick Reference

| Week | Phase | Tasks | Content Files |
|------|-------|-------|----------------|
| 1 | Critical Corrections | Fix H1, remove "tante" links, create /tarifs | 00b, 01, 05 |
| 2 | Mother Pages Rewrite | Update 3 existing pages + create 2 new | 02, 03, 04, 05, 06 |
| 3 | Glossary | Create 3 glossary entries | 12, 13, 14 |
| 4 | Blog - Métier | Create 2 blog articles | 07, 11 |
| 5 | Blog - Temps Partagé | Create 2 blog articles | 08, 09 |
| 6 | Blog - Transition | Create 1 blog article | 10 |
| 7 | Finalization | Create sectors hub + verify links | 06 |

---

## 🔴 WEEK 1: Critical Corrections (PRIORITY)

**Files to Reference:**
- `00b_CORRECTIONS_URGENTES_SITE_LIVE.md` - Critical issues
- `01_PILLAR_daf-externalise.md` - Pillar page corrections
- `05_MERE_tarifs.md` - New tarifs page

### Tasks:

1. **Update H1 on `/daf-externalise`**
   - Current: `DAF Externalisé & Directeur Financier Externalisé pour PME et Startups`
   - New: `DAF Externalisé pour PME et Startups : votre direction financière`
   - File: `lib/content/daf.ts` (line with h1 property)

2. **Remove "Tante" Links**
   - Pages affected: `/daf-externalise/temps-partage`, `/daf-externalise/transition`, `/daf-externalise/metier`
   - Remove links to: Accompagnement levée de fonds, Contrôle de gestion, DRH, M&A, Prévisionnel
   - File: These are Strapi pages - must be updated in CMS or via page components

3. **Create `/daf-externalise/tarifs` Page**
   - Copy content from `05_MERE_tarifs.md`
   - Title: `Tarifs DAF Externalisé 2026 - Grille de Prix | Iter Advisors` (59 chars)
   - H1: `Tarifs DAF Externalisé 2026 : grille de prix et comparatif`
   - Meta: `Combien coûte un DAF externalisé ? Grille de tarifs 2026 : de 2 000 à 8 000 € HT/mois selon la formule. Transparence totale, sans surprise.` (156 chars)

4. **Add Homepage Link**
   - Add link to "DAF externalisé" → `/daf-externalise` on homepage
   - Location: Services section or Hero

---

## 🟡 WEEK 2: Mother Pages Rewrite (2,000 words each)

**Files to Process:**
- `02_MERE_temps-partage.md` → `/daf-externalise/temps-partage`
- `03_MERE_transition.md` → `/daf-externalise/transition`
- `04_MERE_metier.md` → `/daf-externalise/metier`
- `05_MERE_tarifs.md` → `/daf-externalise/tarifs` (created in Week 1)
- `06_MERE_secteurs.md` → `/daf-externalise/secteurs`

### Process for Each Page:
1. Extract full content from markdown file (section after `## CONTENU COMPLET`)
2. Update page content in code or CMS
3. Verify all metadata (Title, H1, Meta Description)
4. Check linking rules (see below)
5. Test in browser

### Linking Rules for Mother Pages:
- **Link TO:** Pillar (1 link) + Sister pages (5 links) + Daughter pages (2-3 links)
- **DON'T link TO:** Other services (DRH, M&A, Comptabilité), Daughter pages of other branches
- **Use exact anchors** from `00_README_IMPLEMENTATION.md` (lines 101-119)

---

## 🟢 WEEK 3: Glossary Entries

**Files to Process:**
- `12_GLOSSAIRE_bfr.md` → `/ressources/glossaire/bfr`
- `13_GLOSSAIRE_ebitda.md` → `/ressources/glossaire/ebitda`
- `14_GLOSSAIRE_cfo.md` → `/ressources/glossaire/cfo`

### Integration:
1. Add entries to `lib/content/glossary.ts`
2. Follow same structure as existing glossary entries
3. Metadata:
   - Title: As specified in markdown
   - Meta Description: First sentence from content
   - H1: Term name
4. Links: Link to pillar + other glossary entries

---

## 🔵 WEEKS 4-6: Blog Articles (1,500-1,800 words each)

### Week 4: Métier Branch
- `07_FILLE_salaire-daf.md` → `/ressources/blog/salaire-daf-2026`
- `11_FILLE_competences-daf.md` → `/ressources/blog/competences-daf`

### Week 5: Temps Partagé Branch
- `08_FILLE_daf-temps-partage-fonctionnement.md` → `/ressources/blog/daf-temps-partage-fonctionnement`
- `09_FILLE_tarif-daf-temps-partage.md` → `/ressources/blog/tarif-daf-temps-partage`

### Week 6: Transition Branch
- `10_FILLE_daf-transition-quand.md` → `/ressources/blog/daf-transition-quand`

### Integration:
1. Add entries to `lib/content/blog-posts.ts`
2. Follow existing blog post structure
3. Metadata from each markdown file
4. Linking: Link to mother page (1 link) + sister pages (2-3 links)
5. **Important:** Don't link directly to pillar or other branches

---

## ⚪ WEEK 7: Finalization

1. **Create Sectors Hub**
   - File: `06_MERE_secteurs.md` → `/daf-externalise/secteurs`
   - Already prepared, just needs implementation

2. **Verify All Links**
   - Use checklist from `00_README_IMPLEMENTATION.md` (lines 123-138)
   - Check each page has correct outbound links
   - Verify exact anchor text matches specification
   - Ensure no broken links

3. **SEO Validation**
   - Title: 50-60 characters
   - Meta Description: 140-160 characters
   - H1: Unique on site, contains main keyword
   - Content: >1,200 words

4. **Submit to Google Search Console**
   - Request indexing for all new pages
   - Monitor for crawl errors

---

## 📌 Critical Linking Rules (MUST FOLLOW)

**Pillar Page (`/daf-externalise`):**
- Links TO: 6 mother pages with exact anchors
- DON'T link TO: Daughter pages, other services

**Mother Pages (N1):**
- Links TO: Pillar (1) + Daughters (2-3) + Sisters (5)
- DON'T link TO: Other services, daughters of other branches

**Daughter/Blog Pages (N2):**
- Links TO: Mother (1) + Sisters same branch (2-3)
- DON'T link TO: Pillar directly, daughters of other branches

**Glossary:**
- Links TO: Pillar (1) + other glossary entries
- DON'T link TO: Mother/Daughter pages

---

## 🔗 Exact Anchors to Use

All specified in `00_README_IMPLEMENTATION.md` (lines 101-119).  
Use these EXACTLY - case and spacing matter for SEO.

Example:
- "DAF externalisé" → `/daf-externalise`
- "DAF à temps partagé" → `/daf-externalise/temps-partage`
- "tarifs du DAF externalisé" → `/daf-externalise/tarifs`

---

## ✅ Validation Checklist (Per Page)

Before publishing each page:

- [ ] URL correct (lowercase, no spaces)
- [ ] Title: 50-60 characters
- [ ] H1: Unique, contains main keyword
- [ ] Meta Description: 140-160 characters
- [ ] Content: >1,200 words (>1,800 for mother pages)
- [ ] Main keyword in first paragraph
- [ ] Outbound links to mother with exact anchor
- [ ] Links to sisters with exact anchors
- [ ] NO links to "tantes" (other services)
- [ ] CTA present (meeting button or contact)
- [ ] Submit to Google Search Console

---

## 📂 File Organization

```
./COCON_DAF_CONTENT/
├── 00_README_IMPLEMENTATION.md       ← START HERE
├── 00b_CORRECTIONS_URGENTES_SITE_LIVE.md
├── 01_PILLAR_daf-externalise.md
├── 02_MERE_temps-partage.md
├── 03_MERE_transition.md
├── 04_MERE_metier.md
├── 05_MERE_tarifs.md
├── 06_MERE_secteurs.md
├── 07_FILLE_salaire-daf.md
├── 08_FILLE_daf-temps-partage-fonctionnement.md
├── 09_FILLE_tarif-daf-temps-partage.md
├── 10_FILLE_daf-transition-quand.md
├── 11_FILLE_competences-daf.md
├── 12_GLOSSAIRE_bfr.md
├── 13_GLOSSAIRE_ebitda.md
└── 14_GLOSSAIRE_cfo.md
```

---

## 🚀 Getting Started

1. **Read** `./COCON_DAF_CONTENT/00_README_IMPLEMENTATION.md`
2. **Start** Week 1 critical corrections (most urgent)
3. **Follow** the 7-week timeline for phased rollout
4. **Reference** the exact anchors and linking rules
5. **Validate** each page before publishing
6. **Commit** after each week's batch

---

## 📊 Progress Tracking

- Week 1 ⬜ Corrections (Due: May 15)
- Week 2 ⬜ Mother Pages (Due: May 22)
- Week 3 ⬜ Glossary (Due: May 29)
- Week 4 ⬜ Blog Métier (Due: Jun 5)
- Week 5 ⬜ Blog Temps Partagé (Due: Jun 12)
- Week 6 ⬜ Blog Transition (Due: Jun 19)
- Week 7 ⬜ Finalization (Due: Jun 26)

---

## 💡 Tips for Success

1. **Strict Linking:** The linking rules are critical for SEO. Don't skip or improvise.
2. **Metadata First:** Ensure title, H1, and meta description are correct BEFORE content.
3. **Test Links:** After adding links, verify they work and use exact anchors.
4. **Phase by Phase:** Don't jump ahead. Each phase depends on previous ones.
5. **Backup:** Commit to git after each week.
6. **Monitor:** Watch Search Console for crawl errors and indexing progress.

---

## ❓ Questions?

- Check `00_README_IMPLEMENTATION.md` for detailed specifications
- All metadata (Title, H1, Meta) is in each markdown file
- Content starts after `## CONTENU COMPLET` section
- Linking rules are in lines 101-119 of README

**Status: Ready to start implementation. Begin with Week 1 corrections.**
