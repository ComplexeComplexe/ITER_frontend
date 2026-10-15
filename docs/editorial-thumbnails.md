# Thumbnails éditoriaux Iter Advisors

## Fonctionnement

Les images sont des fichiers PNG publics, générés avant `next build`. Aucune génération, API image, bibliothèque graphique ou police supplémentaire n'est chargée dans le navigateur. Sharp est une dépendance de développement explicite.

`lib/thumbnails/config.ts` contient la charte, les six catégories, les variantes de diagrammes, les exceptions et le paramètre de retour aux images précédentes. Les couleurs viennent de `app/design-system.css`. La police Space Grotesk et sa licence OFL sont enregistrées avec le générateur. Le logo vient de `public/images/logos/logo-hero.png` ; sa silhouette et ses proportions sont conservées.

`scripts/thumbnails/art.ts` dessine les tableaux financiers, flux de cash, répartition du capital, comparatifs fiscaux, déclarations, interfaces de calcul, stacks, factures, workflows avec contrôle humain et organisations RH. Ces schémas sont illustratifs : aucun taux fiscal, prix, résultat client ou écran de logiciel réel n'est inventé.

`lib/thumbnails/catalog.json` est le registre de publication. Il a été établi sur le HTML public des 440 URL du sitemap, puis revu. Les profils d'équipe, cas clients, pages administratives et visuels dédiés à la facturation électronique sont conservés.

`scripts/generate-thumbnails.ts` produit les fichiers et `lib/thumbnails/manifest.json`. Le hash inclut la page, la langue, le titre court, la charte, les sources du moteur, la police et le logo. Un fichier existant est réutilisé ; une modification produit une nouvelle URL. Le manifeste n'est remplacé qu'après une génération réussie. Une erreur de rendu bloque le build et garde le manifeste précédent. Les anciens fichiers restent disponibles pour les caches et le retour arrière.

## Formats et choix SEO

- `src` : illustration représentative, sans titre intégré, 1200 × 630, pour Open Graph, Article.image, WebPage.primaryImageOfPage et l'illustration éditoriale visible lorsque pertinente.
- `social` : même sujet, titre court et catégorie localisés, 1200 × 630, pour Twitter Cards.
- `square` : composition dédiée de 1200 × 1200 sur les articles et les pages stratégiques configurées ; disponible pour de futurs usages sociaux.

Google recommande une image représentative et déconseille les images dominées par le texte ou un logo générique. Open Graph et `primaryImageOfPage` sont des signaux de préférence, pas une garantie de sélection. Sur LinkedIn/Facebook, l'image épurée accompagne le titre du lien. La home conserve l'identité de marque, conformément au brief.

Sources : [Google Images](https://developers.google.com/search/docs/appearance/google-images), [Article](https://developers.google.com/search/docs/appearance/structured-data/article), [Open Graph](https://ogp.me/).

## Publier un article

1. Créer l'article et ses traductions dans les sources normales du site, avec leurs routes publiées et leurs H1 localisés. Le moteur découvre les nouveaux articles de `blog-posts.ts` lors du build.
2. Pour une page stratégique, ajouter une exception dans `THUMBNAIL_OVERRIDES` : catégorie, variante, titre court et éventuellement format carré. Le titre de vignette ne modifie jamais le H1 ou le title SEO.
3. Lancer `npm run thumbnails:generate`. Pour une régénération complète : `npm run thumbnails:generate -- --force`. Les changements de sources déclenchent aussi une régénération par hash.
4. Contrôler les prototypes avec `node scripts/preview-thumbnails.mjs /chemin/de/revue` et vérifier les rendus à 600, 300, 120 et 64 px ainsi que le recadrage carré.
5. Lancer `npm run test:unit`, `npm run lint`, `npm run build`, puis `npm run thumbnails:check -- --origin=http://127.0.0.1:4143` sur la prévisualisation en fonctionnement.
6. Relire le sujet, l'alt, la langue et la pertinence du schéma avant publication.

Pour une nouvelle page hors blog, le contrôle de build refuse une URL de sitemap absente du registre. Le premier build produit néanmoins son HTML. Démarrer sa prévisualisation, puis actualiser le registre depuis ce HTML :

```sh
node scripts/audit-thumbnail-inventory.mjs --origin=http://127.0.0.1:4143 --out=.next/thumbnail-inventory.json
node --import tsx scripts/generate-thumbnails.ts --inventory=.next/thumbnail-inventory.json
npm run build
```

Cette actualisation est également à faire après une refonte de H1 ou de périmètre. Vérifier les exclusions : les 440 pages ne sont pas toutes des candidates à une illustration générique. `previousImage` trace l'image avant changement, mais le rollback utilise les vraies métadonnées et sources d'images historiques, toujours présentes.

## Retour aux images précédentes

Mettre `THUMBNAILS_ENABLED = false` puis reconstruire. Les helpers de métadonnées, images visibles et schémas reviennent aux anciennes sources. Le test unitaire vérifie ce mécanisme. Pour annuler aussi les modifications de présentation, revenir à la version Git antérieure au lot. Ne pas supprimer les anciennes URLs d'images pendant la période de cache.

## Contrôles et limites

`check-thumbnails.mjs` vérifie les fichiers, dimensions, URLs absolues, OG/Twitter, autorisation des grandes images, cohérence Article/WebPage et présence des illustrations éditoriales dans le HTML. Les trois index blog sont dynamiques et nécessitent `--origin` pour compléter le contrôle statique.

Les adapters de traduction remappent les images et captions du manifeste avant le rendu des pages EN/ES. Les entités Person, Organization et SoftwareApplication conservent leurs portraits/logos propres. Les auteurs, prix, dates de contenu et identités ne sont pas modifiés pour simuler une actualisation éditoriale.

Le système améliore la cohérence et l'éligibilité technique. Il ne démontre ni indexation des images, ni présence dans la SERP, ni gain de CTR, de citations IA ou de Core Web Vitals. Après publication validée, comparer GSC à 28 et 90 jours, par page, requête et appareil, en contrôlant impressions, positions, saisonnalité et autres changements du site. Confirmer le choix réel de vignette sur des recherches datées. Suivre les contacts qualifiés séparément.
