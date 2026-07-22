# SEO_AUTOMATION_PLAN.md

Plan de mise en place du système éditorial SEO semi-automatisé pour iteradvisors.com.
Rédigé le 2026-07-22 après analyse complète du repository. Aucune modification du site n'a été effectuée.

---

## 1. Architecture actuelle du site

| Élément | Détail |
|---|---|
| Framework | Next.js 16.1.6 (App Router) + React 19.2 + TypeScript 5 |
| Styling | Tailwind CSS 4 (+ @tailwindcss/typography) |
| CMS | Aucun. Strapi a été décommissionné (voir `migration/RUNBOOK_STRAPI_DECOMMISSION.md`). Le contenu est « GitHub-only » |
| Contenu | Registres TypeScript statiques dans `lib/content/*.ts` et `lib/fallback-*.ts` |
| Langues | FR (racine), EN (`/en`), ES (`/es`), gestion hreflang manuelle |
| Hébergement | Vercel (`vercel.json` : headers de sécurité + redirections). Déploiement automatique au push |
| CI GitHub | Aucun workflow (`.github/` absent). Les contrôles sont faits localement + par le build Vercel |
| Emails | Resend (formulaires) |

### Où vivent réellement les articles de blog

Point crucial : le dossier `content/{fr,en,es}/blog/*.mdx` est un **vestige de l'ère Strapi** (il servait de source aux scripts `seed:blog`). Il n'est **pas consommé à l'exécution**. Le module `lib/content.ts` (gray-matter/MDX) n'est importé nulle part.

La source de vérité des articles est :

- `lib/content/blog-posts.ts` (~4 000 lignes) : registre `blogPosts: Record<Locale, Record<slug, BlogPostData>>`. Chaque article contient `meta.title`, `meta.description`, `h1`, `htmlContent` (corps en HTML), `publishedDate`, `author`, `category`.
- Le rendu passe par `components/pages/BlogPostPage` via la route `app/ressources/blog/[slug]/page.tsx` (FR), `app/en/ressources/blog/[slug]` (EN) et `app/es/recursos/blog/[slug]` (ES).

## 2. Fichiers concernés par la publication d'un article

Pour publier un nouvel article FR, il faut toucher :

1. `lib/content/blog-posts.ts` : ajouter l'entrée dans `blogPosts.fr` (et `en`/`es` si traduit). C'est la seule étape strictement obligatoire : le listing (`lib/blog-listing.ts`), les articles liés (`lib/related-articles.ts`), le sitemap et les métadonnées se nourrissent tous de ce registre.
2. `app/sitemap.ts` : inclusion automatique (itération sur les slugs du registre, `lastModified` = `publishedDate`). Rien à faire, sauf cas particulier de localisation.
3. Cover de listing : `lib/blog-covers.ts` est **auto-généré** par `scripts/generate-blog-covers.ts` (ne pas éditer à la main). Ajouter l'entrée dans le script puis relancer `npx tsx scripts/generate-blog-covers.ts`. À défaut, fallback générique via `lib/blog-listing.ts`.
4. Illustration de corps d'article (optionnelle) : `lib/blog-illustrations.ts` + fichier WebP 1200x630 (q=82, ~65 Ko) dans `public/images/blog/illustrations/[slug].webp`. C'est l'élément LCP de la page : compression obligatoire.
5. Article FR-only : si l'article n'existe qu'en FR, ajouter le slug à `FR_ONLY_FISCALITE_BLOG_SLUGS` (ou équivalent) dans `app/ressources/blog/[slug]/page.tsx` (désactive les hreflang EN/ES) et à `FR_ONLY_BLOG_SLUGS` dans `middleware.ts` (301 des variantes EN/ES). Sinon Google crawle des URLs 404 (problème déjà rencontré, cf. Ahrefs T-404).
6. Maillage interne entrant : ajouter des liens depuis les articles existants (modification de leurs `htmlContent` dans le même registre).

## 3. Problèmes techniques identifiés

1. **Fichier monolithique** : `lib/content/blog-posts.ts` concentre tout le blog en un seul fichier TS de 4 000+ lignes. Risques : erreur de syntaxe qui casse tout le build, conflits Git si deux branches ajoutent un article, contexte énorme à charger pour chaque génération. C'est le principal point de friction pour l'automatisation.
2. **Dossier `content/` trompeur** : les `.mdx` legacy ne sont plus utilisés mais ressemblent à la source de vérité. Un agent non averti éditerait le mauvais fichier. À terme : archiver ou documenter clairement.
3. **Lint non exploitable comme garde-fou** : `npm run lint` remonte actuellement ~487 problèmes préexistants (415 erreurs). Impossible d'exiger « lint vert » ; la règle devient « ne pas introduire de nouvelle erreur ».
4. **Pas de CI GitHub** : aucun workflow Actions. La seule validation automatique d'une PR est le build de preview Vercel. Ajouter un workflow minimal (typecheck + build + tests unitaires) sécuriserait les PR automatisées.
5. **Build dépendant de Google Fonts** : `next/font` télécharge DM Sans et Space Grotesk au build. Dans un environnement sandboxé sans accès à fonts.googleapis.com, `npm run build` échoue (constaté ici). Le build Vercel n'est pas affecté. Solutions possibles : self-host des polices, ou considérer le typecheck + tests unitaires comme validation en session cloud.
6. **hreflang fragile** : la gestion FR-only repose sur deux listes codées en dur (page + middleware). Chaque article non traduit doit les mettre à jour, sinon régression SEO.
7. **README obsolète** : parle encore du webhook Strapi/Vercel.
8. **E2E limité** : un seul spec Playwright (`e2e/critical-routes.spec.ts`), nécessitant un serveur local ; les tests unitaires Vitest (19 tests) passent en ~5 s et sont utilisables comme gate.

## 4. Prérequis nécessaires

- [x] Accès Git en lecture/écriture (token fine-grained fourni, cloné et testé).
- [ ] File éditoriale : créer `content/editorial-queue.yml` (format défini dans CLAUDE.md §7).
- [ ] Dossier briefs : `content/briefs/`.
- [ ] Décision sur la stratégie de stockage des articles (voir §8, étape 2) : continuer dans `blog-posts.ts` ou éclater en un fichier par article.
- [ ] (Optionnel) Accès Google Search Console pour la sélection de sujets data-driven.
- [ ] (Optionnel) Outil de génération d'images. Aucun n'est configuré : conformément à CLAUDE.md §13, les PR contiendront une recommandation d'image tant que ce n'est pas en place.
- [ ] (Optionnel) Workflow GitHub Actions de CI minimal sur les PR.

## 5. Workflow éditorial recommandé

Idée de contenu (`content/editorial-queue.yml`, statut `todo`)
→ sélection du sujet (priorité commerciale, anti-cannibalisation)
→ recherche documentaire (sources primaires datées)
→ brief SEO (`content/briefs/[slug].md`)
→ rédaction (entrée dans `lib/content/blog-posts.ts`, HTML conforme aux articles existants)
→ vérification factuelle (chiffres et affirmations sensibles listés pour validation humaine)
→ maillage interne (2 à 6 liens sortants + liens entrants depuis anciens articles, max 10 pages modifiées)
→ métadonnées (title, description, hreflang ou FR-only, sitemap)
→ image (recommandation en PR, ou WebP optimisé si outil fiable configuré)
→ validation technique (typecheck, tests unitaires, build si l'environnement le permet)
→ branche `seo/article-[slug]` → commit → push → pull request
→ **validation humaine** → merge manuel → déploiement Vercel automatique
→ passage du sujet au statut `published` lors d'une exécution suivante.

Le repo utilise déjà ce modèle manuellement (73 PR mergées, branches `feat/seo-*` et `claude/*`) : l'automatisation s'insère dans une pratique existante.

## 6. Accès et variables secrètes manquants

- `GITHUB_TOKEN` : fourni pour cette session. Pour la routine planifiée (sessions fraîches), il devra être re-fourni à chaque configuration de routine ou via un mécanisme de secrets ; ne jamais le committer.
- `GSC` (Search Console) : non configuré, non bloquant en phase 1.
- API images (OpenAI ou autre) : non configurée, non bloquant (recommandation d'image en PR).
- `RESEND_API_KEY`, variables Vercel : existent côté Vercel, aucune interaction nécessaire, ne jamais y toucher.

## 7. Risques identifiés

| Risque | Gravité | Mitigation |
|---|---|---|
| Erreur de syntaxe dans `blog-posts.ts` cassant le build | Élevée | Typecheck systématique avant PR ; à terme éclater le registre |
| Cannibalisation (le site a déjà de nombreuses pages DAF/CFO proches) | Élevée | Contrôle anti-cannibalisation obligatoire dans le brief ; proposer une mise à jour plutôt qu'un nouvel article |
| hreflang cassé sur articles FR-only | Moyenne | Checklist §2.5 dans chaque PR |
| Contenu générique ou chiffres inventés | Élevée | Règles CLAUDE.md §5 ; section « validation humaine requise » dans chaque PR |
| Fuite du token dans un commit ou un log | Élevée | Credentials hors repo ; revue automatique des diffs avant push |
| Conflits Git entre exécutions | Faible | Une seule exécution de routine à la fois, rebase sur main au départ |
| Dérive du volume au détriment de la qualité | Moyenne | Cadence limitée (2/semaine), un seul contenu par exécution |

## 8. Plan de mise en œuvre par étapes

**Étape 0 (cette PR)** : `SEO_AUTOMATION_PLAN.md` + `CLAUDE.md` à la racine. Aucun impact sur le site.

**Étape 1 : structure éditoriale** (après validation humaine de cette PR)
- Créer `content/editorial-queue.yml` avec les premiers sujets validés par Guillaume.
- Créer `content/briefs/` avec un brief exemple.
- Mettre à jour le README (mention de CLAUDE.md, suppression des références Strapi).
- Phase de test : la routine ne produit **que des briefs**, en PR.

**Étape 2 : durcissement technique** (recommandé avant la montée en charge)
- Décider : conserver `blog-posts.ts` monolithique ou migrer vers un fichier par article (`lib/content/blog/[slug].ts` ré-exportés, ou retour à du MDX réellement branché). La migration réduit fortement les risques de build cassé et de conflits.
- Ajouter un workflow GitHub Actions : `tsc --noEmit` + `vitest run` + build sur chaque PR.
- Marquer le dossier `content/*/blog/*.mdx` comme legacy (README dédié) ou l'archiver.

**Étape 3 : production** : la routine (mardi et jeudi 7h, Europe/Madrid) produit brief + article + PR complète, un contenu par exécution, selon la procédure de CLAUDE.md. Fusion toujours humaine.

**Étape 4 : stabilisation** : après plusieurs semaines de PR propres, autoriser la fusion automatique uniquement pour les modifications simples (mises à jour de liens, corrections de métadonnées) ayant passé tous les contrôles. Les nouveaux articles restent à validation humaine.

## 9. Arborescence proposée (à créer en étape 1, après ton accord)

```
ITER_frontend/
├── CLAUDE.md                      # instructions permanentes (cette PR)
├── SEO_AUTOMATION_PLAN.md         # ce document (cette PR)
├── content/
│   ├── editorial-queue.yml        # file éditoriale (étape 1)
│   ├── briefs/                    # briefs SEO par slug (étape 1)
│   │   └── [slug].md
│   └── {fr,en,es}/                # MDX legacy : ne pas utiliser pour publier
└── .github/
    └── workflows/
        └── pr-checks.yml          # CI minimale (étape 2, optionnel)
```

Rien de tout cela n'est développé tant que l'instruction n'est pas donnée.
