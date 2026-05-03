# 📋 MIGRATION FRONTEND — INVENTAIRE PAGES HARDCODÉES

**Date:** 2026-05-03  
**Status:** Strapi Cloud suspendu — travail sur branche `migration/00-frontend-prep`  
**Pages trouvées:** 12 pages sans dépendance Strapi  

---

## 📊 RÉSUMÉ EXÉCUTIF

| Métrique | Valeur |
|----------|--------|
| **Pages hardcodées** | 12 |
| **Locales couvertes** | FR uniquement |
| **Pages sans Strapi** | 100% |
| **Pages avec SEO complet** | 0% ❌ |
| **Pages avec `<title>`** | 0/12 ❌ |
| **Pages avec `canonical`** | 2/12 ⚠️ |
| **Pages avec `hreflang`** | 0/12 ❌ |
| **Pages avec OG tags** | 0/12 ❌ |

---

## 🔍 ANALYSE PAR CATÉGORIE

### A. PAGES CADS (2 pages)

#### 1. **CADS Dashboard**
- **Route:** `/cads`
- **Fichier:** `app/cads/page.tsx`
- **Locale:** FR
- **Type:** Outil/Calculatrice (CADS)
- **SEO Status:** ⚠️ Partiel
  - ✅ Description présente
  - ✅ Canonical présent
  - ❌ Pas de title
  - ❌ Pas de hreflang
  - ❌ Pas d'OG image
  - ❌ Pas de JSON-LD

**Action requise:** 
- [ ] Ajouter balise `<title>`
- [ ] Ajouter hreflang pour EN/ES
- [ ] Ajouter og:image
- [ ] Vérifier si la page a des liens internes

---

#### 2. **CADS ROI Calculator**
- **Route:** `/cads/roi`
- **Fichier:** `app/cads/roi/page.tsx`
- **Locale:** FR
- **Type:** Outil de calcul ROI
- **SEO Status:** ⚠️ Partiel
  - ✅ Description présente
  - ✅ Canonical présent
  - ❌ Pas de title
  - ❌ Pas de hreflang
  - ❌ Pas d'OG image
  - ❌ Pas de JSON-LD

**Action requise:**
- [ ] Ajouter balise `<title>`
- [ ] Ajouter hreflang pour EN/ES
- [ ] Ajouter og:image

---

### B. ARTICLES BLOG HARDCODÉS (10 pages)

Tous les articles blog partagent les mêmes problèmes SEO:
- ❌ **Pas de `<title>`** — Critique!
- ❌ **Pas de `canonical`** (sauf 0/10) — Risque de duplicate content
- ❌ **Pas de `hreflang`** — Multilingue cassé
- ❌ **Pas d'OG tags** — Social sharing dégradé
- ❌ **Pas de JSON-LD** — Rich snippets absents
- ✅ Description présente (minimal)

#### Articles list:

| # | Titre article | Route | Fichier | Status |
|---|---|---|---|---|
| 1 | Checklist Due Diligence | `/ressources/blog/checklist-due-diligence-levee-de-fonds` | `app/ressources/blog/checklist-due-diligence-levee-de-fonds/page.tsx` | ❌ Critique |
| 2 | Coût DAF Externalise 2026 | `/ressources/blog/cout-daf-externalise-tarifs-prix-2026` | `app/ressources/blog/cout-daf-externalise-tarifs-prix-2026/page.tsx` | ❌ Critique |
| 3 | DAF + DRH Externalises | `/ressources/blog/daf-drh-externalises-synergie` | `app/ressources/blog/daf-drh-externalises-synergie/page.tsx` | ❌ Critique |
| 4 | DAF Externalise vs Salarie | `/ressources/blog/daf-externalise-vs-daf-salarie` | `app/ressources/blog/daf-externalise-vs-daf-salarie/page.tsx` | ❌ Critique |
| 5 | Essentiels Outils Tech Finance | `/ressources/blog/essentiels-outils-tech-finance` | `app/ressources/blog/essentiels-outils-tech-finance/page.tsx` | ❌ Critique |
| 6 | Flux de Tresorerie | `/ressources/blog/flux-de-tresorerie` | `app/ressources/blog/flux-de-tresorerie/page.tsx` | ❌ Critique |
| 7 | IA et Automatisation | `/ressources/blog/ia-et-automatisation-des-taches-repetitives` | `app/ressources/blog/ia-et-automatisation-des-taches-repetitives/page.tsx` | ❌ Critique |
| 8 | Modernisation Role CFO | `/ressources/blog/la-modernisation-du-role-de-cfo` | `app/ressources/blog/la-modernisation-du-role-de-cfo/page.tsx` | ❌ Critique |
| 9 | 10 Outils CFOs Startup | `/ressources/blog/les-10-outils-pour-cfos-startup` | `app/ressources/blog/les-10-outils-pour-cfos-startup/page.tsx` | ❌ Critique |
| 10 | Organiser Direction Financiere | `/ressources/blog/organiser-sa-direction-financiere` | `app/ressources/blog/organiser-sa-direction-financiere/page.tsx` | ❌ Critique |

---

## 🚨 PROBLÈMES CRITIQUES IDENTIFIÉS

### 1. **Balise `<title>` Manquante (12/12 pages)**
**Severity:** 🔴 CRITIQUE  
**Impact:** Les moteurs de recherche générèrent un titre par défaut (mauvais pour CTR)

```diff
- ❌ Aucune page n'a <title> explicite
+ ✅ Attendu: generateMetadata() avec titre SEO 50-60 chars
```

### 2. **Pas de hreflang pour Multilingue (0/12 pages)**
**Severity:** 🔴 CRITIQUE  
**Impact:** Les versions EN/ES ne sont pas découverts et causent du duplicate content

```diff
- ❌ Aucune page n'a hreflang vers les autres locales
+ ✅ Attendu: hreflang fr → en → es dans metadata
```

### 3. **Canonical Manquant sur Articles (8/10 articles)**
**Severity:** 🟠 ÉLEVÉ  
**Impact:** Risque de duplicate content si article répliqué ailleurs

### 4. **Pas d'OG Tags (0/12 pages)**
**Severity:** 🟡 MOYEN  
**Impact:** Mauvais preview sur les réseaux sociaux (LinkedIn, Twitter, etc.)

### 5. **Pas de JSON-LD Schema (0/12 pages)**
**Severity:** 🟡 MOYEN  
**Impact:** Pas de rich snippets possibles; perte de opportunities pour featured snippets

### 6. **Pas de Liens Internes Détectés (0/12 pages)**
**Severity:** 🟡 MOYEN  
**Impact:** Possible: les pages sont isolées; pas de linking strategy cohérente

---

## 📝 PLAN D'ACTION (PRIORITÉ)

### Phase 1: SEO Urgent (OBJECTIF 5)
- [ ] Ajouter `generateMetadata()` à chaque page (title, description, canonical)
- [ ] Implémenter hreflang pour FR/EN/ES
- [ ] Ajouter OG:image, OG:title, OG:description
- [ ] Générer JSON-LD (Article schema pour blogs, Tool schema pour CADS)

### Phase 2: Infrastructure MDX (OBJECTIF 2)
- [ ] Créer `lib/content.ts`, `lib/seo.ts`, `lib/schema.ts` avec validation Zod
- [ ] Structurer `content/{fr,en,es}/{pages,blog}/`
- [ ] Migrer contenu hardcodé → MDX frontmatter

### Phase 3: Migration MDX (OBJECTIF 3)
- [ ] Pour chaque page, créer `.mdx` avec frontmatter complet
- [ ] Extraire body = contenu sémantique (pas JSX wrapper)
- [ ] Garder pages TSX actives en parallèle

### Phase 4: Audit Liens (OBJECTIF 4)
- [ ] Détecter tous les href brisés
- [ ] Corriger links manquants entre FR/EN/ES
- [ ] Générer rapport broken-links-frontend.json

---

## 🔗 PAGES SANS LIENS INTERNES DÉTECTÉS

⚠️ **12/12 pages** — Aucun lien interne (href="/...") détecté.

**Actions:**
- [ ] Vérifier manuellement si pages ont links (parsing regex peut être partiel)
- [ ] Auditer linking strategy: sont-elles trop isolées?
- [ ] Ajouter contexte/navigation si approprié

---

## 📂 STRUCTURE PROPOSÉE POST-MIGRATION

```
content/
├── fr/
│   ├── pages/
│   │   ├── cads.mdx
│   │   └── cads-roi.mdx
│   └── blog/
│       ├── checklist-due-diligence.mdx
│       ├── cout-daf-2026.mdx
│       └── ... (8 autres articles)
├── en/
│   ├── pages/
│   └── blog/
└── es/
    ├── pages/
    └── blog/

lib/
├── content.ts        # Loader MDX + rétro-compat fallback
├── seo.ts            # Extracteur metadata + hreflang
├── schema.ts         # Validation Zod frontmatter
├── i18n.ts           # Routing FR/EN/ES
└── links.ts          # Link resolver + broken detection
```

---

## ✅ NEXT STEPS

1. **Valider l'inventaire** — Vérifier que 12 pages est correct
2. **Lancer OBJECTIF 2** — Créer infrastructure MDX (lib/ + structure content/)
3. **Lancer OBJECTIF 5** — Ajouter SEO à pages existantes (generateMetadata)
4. **Parallèle OBJECTIF 3** — Commencer migration → MDX pour blog articles

**Commit à faire:**
```bash
git add migration/hardcoded-inventory.json migration/HARDCODED_REPORT.md
git commit -m "chore(migration): audit pages hardcodées (Strapi suspendu)"
```

---

## 📋 CHECKLIST DE VÉRIFICATION

- [x] Scan complet: 119 pages trouvées
- [x] Identification: 12 pages sans Strapi dependency
- [x] Audit SEO: généré rapport complet
- [ ] Validation manuelle des 12 pages
- [ ] Priorisation: Blogs > CADS tools
- [ ] Démarrage OBJECTIF 2

