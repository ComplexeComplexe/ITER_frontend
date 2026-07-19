# Runbook — Décommissionnement de Strapi

Goal: passer d'une archi Next.js + Strapi Cloud à du **GitHub-only** (contenus statiques en `lib/content/*.ts`, images en `public/images/`).

Cette PR met en place les outils nécessaires. L'exécution finale (qui nécessite des credentials Strapi live) reste manuelle pour pouvoir vérifier que tout le contenu dynamique est bien capturé avant de couper.

## Pourquoi un décommissionnement en plusieurs étapes ?

Le ticket original demandait trois actions atomiques. La réalité du codebase :

- **200 fichiers** importent `lib/strapi.ts` ou appellent `buildStrapiMetadata` / `buildStrapiCollectionMetadata`.
- Tous les `.tsx` de page ont déjà un **chemin de fallback statique** (`lib/content/*.ts`, `lib/fallback-*.ts`) qui se déclenche quand Strapi répond `null` ou throw.
- Aucun moyen de lancer `npm run build` en environnement isolé pour valider 200 modifs en un seul commit.

D'où la stratégie :

1. **Step 1 — Export** : un script lit Strapi et dumpe tout en JSON (`scripts/export-strapi.ts`).
2. **Step 2 — Images** : un deuxième script télécharge les images CDN et produit un mapping URL → fichier local (`scripts/migrate-cdn-images.ts`).
3. **Step 3 — Kill switch** : un flag `STRAPI_DISABLED` court-circuite tous les fetchs Strapi à runtime. Les fallbacks statiques prennent le relais immédiatement, sans toucher un seul caller.
4. **Step 4 — Cleanup** : une fois la kill-switch validée en prod pendant quelques jours, on supprime `lib/strapi.ts` et on remplace les imports par les statiques. C'est un PR séparé.

## Step 1 — Exporter tout le contenu Strapi

```bash
# Avec les vraies credentials (cf. .env.local ou Vercel env vars)
STRAPI_API_URL=https://your-strapi.cloud \
STRAPI_API_TOKEN=… \
npx tsx scripts/export-strapi.ts
```

Sortie : `migration/strapi-export.json` (~quelques MB). Contient :

- `homepage`, `global`, `aboutPage`, `contactPage`, `dafPage` (un par locale)
- `blogArticles`, `teamMembers`, `testimonials`, `clientLogos`, `jobOffers`
- `mediaUrls[]` — toutes les URLs d'images détectées partout dans l'export, dédupées et triées

**Sanity check :**

```bash
# Compter les articles de blog par locale
jq '.blogArticles[] | "\(.locale): \(.articles | length)"' migration/strapi-export.json

# Compter les images
jq '.mediaUrls | length' migration/strapi-export.json
```

Si le compte d'articles est < 15 (le minimum cité dans le ticket), Strapi a probablement un filtre `published_at` ou un rôle API qui bloque l'accès — vérifier le token.

## Step 2 — Rapatrier les images CDN

```bash
npx tsx scripts/migrate-cdn-images.ts
```

Sortie :

- `public/images/blog/<filename>` pour chaque image téléchargée (idempotent, skip les fichiers déjà présents)
- `migration/cdn-to-local.json` — map `{ "https://…nhost.run/abc.webp": "/images/blog/abc.webp" }`

**Application du mapping** dans le code statique :

```bash
# Quick-and-dirty (à valider à la main avant commit !) :
node -e '
  const fs = require("fs");
  const map = JSON.parse(fs.readFileSync("migration/cdn-to-local.json", "utf8"));
  for (const target of ["lib/content/blog-posts.ts", "lib/content/home.ts"]) {
    let s = fs.readFileSync(target, "utf8");
    for (const [cdn, local] of Object.entries(map)) s = s.split(cdn).join(local);
    fs.writeFileSync(target, s);
  }
'
```

## Step 3 — Activer le kill switch Strapi (cette PR)

`lib/strapi.ts` lit `STRAPI_DISABLED`. Quand le flag est truthy :

- `strapiFetch()` retourne immédiatement `{ data: [], meta: { pagination: { pageCount: 0, total: 0 } } }`.
- `getGlobal()`, `getHomepage()`, `getTeamMembers()`, etc. throw / retournent null sur cette enveloppe vide → les pages tombent sur leurs fallbacks statiques sans 500.

**Rollout :**

1. PR mergée → Vercel rebuild avec `STRAPI_DISABLED` toujours non défini (= false). Aucun changement de comportement.
2. Sur Vercel → Settings → Environment Variables : ajouter `STRAPI_DISABLED=true` pour **Preview** seulement.
3. Tirer la branche `main` ou n'importe quelle PR → ouvrir la preview Vercel → smoke-test :
   - `/` (FR), `/en`, `/es` rendent leur hero correctement
   - `/ressources/blog` liste bien les articles
   - 5-10 articles ouverts au hasard rendent leur contenu
   - `/a-propos` affiche l'équipe
   - Header / Footer i18n cohérents
4. Si OK, dupliquer le var pour **Production** et redéployer.

**Rollback en 30 s :** supprimer la var → Vercel redeploy → Strapi-driven content réactivé.

> **Update (MIG-03 partial — PR #21)** : la sémantique du flag a été inversée. Par défaut Strapi est désormais **OFF**, le flag d'opt-in est `STRAPI_ENABLED=true` (utilisé uniquement pour relancer le script d'export). Tu peux supprimer `STRAPI_DISABLED=true` de Vercel — le comportement par défaut est identique.

## Step 4 — Nettoyage final (PR séparé, après ~1 semaine en prod sous kill switch)

Une fois confiance acquise :

1. Supprimer `lib/strapi.ts`.
2. Dans `lib/metadata.ts`, supprimer `buildStrapiMetadata` et `buildStrapiCollectionMetadata`. Remplacer tous les appels par `buildMetadata` (les fallbackTitle / fallbackDescription deviennent les vraies valeurs).
3. Dans chaque page `.tsx` :
   - Remplacer `await getBlogArticleBySlug(slug, locale)` par `blogPosts[locale]?.[slug]`
   - Remplacer `await getCmsNavigation(locale)` par `undefined` (le Header utilisera `navigation[locale]`)
   - Remplacer `await getTeamMembers(locale)` par `getFallbackTeamMembers(locale)` (déjà importé dans plusieurs pages)
   - Supprimer les destructurations `Promise.all` orphelines
4. Supprimer dans `next.config.ts` :
   ```ts
   'ztynwacifpvzaemkqifh.storage.eu-central-1.nhost.run', // Strapi CDN
   ```
5. Supprimer dans `app/layout.tsx` :
   ```tsx
   <link rel="dns-prefetch" href="https://ztynwacifpvzaemkqifh.storage.eu-central-1.nhost.run" />
   ```
6. Supprimer de `.env.example` et `.env.local` :
   ```
   STRAPI_API_URL=
   STRAPI_API_TOKEN=
   STRAPI_DISABLED=
   ```
7. `npm run build` — confirmer qu'il ne reste aucun import vers `@/lib/strapi`.

À ce stade Strapi peut être éteint côté infra.

## État après cette PR

- `scripts/export-strapi.ts` : prêt à lancer.
- `scripts/migrate-cdn-images.ts` : prêt à lancer.
- `lib/strapi.ts` : ajout du kill switch `STRAPI_DISABLED`. Aucune autre modif. Comportement par défaut inchangé.
- Aucun fichier de page touché. La PR est mergeable sans risque.
