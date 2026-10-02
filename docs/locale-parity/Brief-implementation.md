# Parité FR / EN / ES : préparation complète

Statut : spécification et inventaire prêts à développer. Aucun changement de page, de contenu publié, de sitemap ou de redirection n'est activé par ce dossier.

Référence : commit `524d76e56ec845e06dc7c86c9211f8289e6dc4bb`, production relevée dans le crawl du lot 163. Inventaire préparé le 2 octobre 2026. La parité complète des traductions EN et ES a été explicitement demandée par Guillaume.

## Périmètre mesuré

| État | FR | EN | ES |
| --- | ---: | ---: | ---: |
| URL dans le crawl de référence | 136 | 45 | 46 |
| Pages associées au catalogue FR | 136 | 44 | 44 |
| Traductions à créer | 0 | 92 | 92 |
| Versions existantes à aligner | référence | 44 | 44 |

Pour le périmètre du sitemap : 184 traductions nouvelles et 88 versions existantes à revoir. Les 136 références FR comprennent les trois offres d'emploi confirmées ouvertes par Guillaume. Le catalogue cible représente 408 URL pour ces références, plus trois URL locales conservées séparément, soit 411 URL. Ce chiffre n'est pas un objectif d'indexation : les consignes robots, les décisions de consolidation et la qualité effective des traductions restent déterminantes.

Le contrôle complémentaire hors sitemap ajoute dix références FR : politique cookies, deux pages CADS, campagne, diagnostic, listing jobs, landing publicitaire et sa page de remerciement, profil et qualification. Les 22 versions existantes de ces parcours ont été vérifiées en HTTP 200 le 2 octobre. Huit traductions restent à créer et douze versions à aligner. Le périmètre complet préparé est donc **146 références FR, 192 traductions nouvelles, 100 versions traduites à aligner et 441 URL cibles**. Les pages utilitaires/publicitaires conservent leur noindex; la politique cookies conserve son exception actuelle. Le chiffre 441 ne doit pas devenir un objectif de taille du sitemap.

Le dossier contient 136 lignes dans `Matrice-FR-EN-ES.csv`, toutes avec une cible EN et ES explicite. Il ne transforme pas les anciennes entrées dépubliées du catalogue du blog en pages à republier.

`Matrice-complete-FR-EN-ES.csv` réunit ces 136 pages et les dix parcours supplémentaires. Les anciens alias, fiches métier redirigées et routes dépubliées sont des sources de migration, pas des traductions à recréer.

## Causes vérifiées dans le code

1. `app/(fr)/layout.tsx` importe `app/design-fr.css`. Les layouts `(en)` et `(es)` ne l'importent pas. Les règles de ce fichier ciblent uniquement `html[lang="fr"]` : palette, grille, typographie, boutons, navigation et formulaire divergent même à contenu comparable.
2. Le pilier FR utilise `DafPillarPage`; EN et ES utilisent encore `DafPage`. Dans le HTML principal, FR contient huit H2 et 2 120 mots, EN dix-huit H2 et 3 767 mots, ES quinze H2 et 3 300 mots. Les titres du menu et du bandeau cookies sont exclus du comptage.
3. Le hub Services FR utilise `FinanceServicesHub`; EN et ES utilisent `ServicesPage`. Le hub Ressources FR utilise `ResourcesPageFR`, les versions traduites un parcours différent.
4. Les pages RH FR utilisent `DrhFrenchPage`; EN/ES `DrhPage` et `DrhSubPage`. Les sous-pages de finance FR utilisent `FinanceServicePage`, tandis que leurs équivalents traduits passent par plusieurs composants historiques.
5. `HomePage` est partagé, mais des conditions `locale === "fr"` réservent au FR des blocs RH, des ressources orientées décision et le contact expert.
6. Plusieurs composants récents sont codés uniquement en FR : `ServiceHero`, les coordonnées de l'expert, les breadcrumbs, les libellés de tableaux et les liens. Leur ajout direct à une route EN/ES laisserait des éléments français dans la page.
7. `/cads/roi`, hors sitemap et en noindex, contient encore une promesse « ROI 5x sur 12 mois » dans ses métadonnées. Aucune preuve de ce résultat n'est fournie dans ce dossier. Corriger la version FR avant d'en préparer les traductions, et vérifier que la campagne est toujours utilisée. Une page noindex ne dispense pas d'une offre exacte.

## Architecture à construire

### Une identité de page, trois contenus, un rendu

Créer un registre de publication par `pageId` et locale, distinct du présent catalogue de préparation. Une entrée contient l'URL canonique réelle, le statut de traduction, la famille, la variante et l'identifiant de contenu. Une traduction ne devient `published` qu'après relecture et recette. Aucune URL proposée du présent dossier ne doit alimenter automatiquement le sitemap.

Les liens des contenus utilisent des identifiants stables, puis un résolveur de liens localisés. Conserver les fragments d'ancre quand ils existent dans les trois versions; maintenir les anciens fragments FR utiles. Le résolveur renvoie uniquement une page effectivement publiée. Pendant la migration, une référence française encore nécessaire reste explicitement annoncée comme telle; à la fin, aucune sortie involontaire de langue dans le parcours éditorial.

Chaque famille utilise un composant serveur avec `locale`, `content`, `pageId` et éventuellement une variante. Les traductions sont des données, pas trois copies indépendantes de JSX. Les groupes de services, les besoins, les livrables, les preuves et les liens gardent leurs identifiants et leur ordre. La longueur d'un titre traduit peut changer sans forcer une hauteur identique.

Importer uniquement la locale et le contenu de la page au serveur. Ne pas importer toutes les traductions du blog dans `HomePage`, le header ou un composant client. Conserver les îlots interactifs nécessaires aux formulaires et menus; FAQ éditoriales rendues en HTML avec `details` lorsque déjà présentes.

### Socle graphique commun

Remplacer le contrat réservé au FR par `app/design-system.css`, importé dans les trois layouts. Étendre les tokens existants aux trois langues, puis les styles des composants migrés. Ne pas supprimer en bloc la restriction de langue avant de vérifier les anciennes pages et leurs images/tableaux.

Valeurs de référence réellement présentes dans le code : violet `#4320c5`, encre `#20202b`, accent `#d8ef65`, fond `#f7f7fa`, largeur de grille `1184px`, cartes `16px`, boutons `10px`, hauteur minimale des CTA `48px`, espacements de section `clamp(48px, 6vw, 80px)`. Conserver les colonnes de lecture plus étroites et les exceptions d'une famille lorsqu'elles servent la lecture. Les règles d'accessibilité ne dépendent plus de la langue.

Adapter `ServiceHero` à `locale`, aux libellés UI et aux liens localisés; faire de même pour `FinanceExpert`, `HRExpert`, `Breadcrumb`, `PageByline`, `CTASection` et les formulaires. Éviter un design propre à chaque URL et chaque langue.

### Navigation et métadonnées

Le menu conserve les six groupes FR : direction financière, services finance, RH, ressources, cabinet, contact. Les groupes, sous-groupes et ordre sont communs; les intitulés diffèrent selon la langue. Partager aussi le footer et les cartes de décision. Revoir le mapping CMS pour qu'il ne réintroduise pas une ancienne arborescence ou des labels français.

Titres, H1, descriptions, Open Graph, breadcrumbs, `lang`, `inLanguage`, bylines, aria-labels, validation des formulaires et messages de succès sont traduits. Finance EN : « Fractional CFO », avec « part-time CFO » ou « interim CFO » pour les intentions correspondantes. Finance ES : « CFO externo » et « director financiero externo »; le slug principal `/es/externalizacion-daf` reste stable. Ne pas annoncer des volumes de recherche non mesurés.

Chaque traduction a sa propre canonical. Les alternates sont réciproques et incluent la page elle-même; `x-default` pointe vers la version FR pertinente. Le même identifiant Organization relie les langues. Une variante légale ou fiscale réellement différente ne devient pas un alternate uniquement parce qu'elle traite un sujet proche.

## Contrats des principales familles

| Famille | Composant à mutualiser | Structure commune à conserver |
| --- | --- | --- |
| Accueil | `HomePage` et données `home` | promesse, services finance, offre DAF, RH, méthode, cabinet/expertise, preuves, besoins, ressources de décision, contact expert |
| Pilier DAF | `DafPillarPage` et `daf-pillar` | besoin, livrables/décisions, missions documentées, méthode, budget/périmètre, experts, FAQ, contact |
| Finance et villes | `FinanceServicePage`, `FinanceServicesHub` | hero/synthèse, besoin, livrables, exemple/calendrier si présent, méthode, périmètre, budget, preuve si documentée, FAQ, ressources, contact |
| RH | `DrhFrenchPage` à renommer, `HRServicePage` | besoin, alternatives selon variante, livrables, méthode, budget sur devis, cadrage, interlocuteur RH, rôles, services liés, FAQ |
| Ressources | `ResourcesPageFR` à renommer | six besoins, cas documentés, outils, indicateurs/glossaire, métiers, RH et contact |
| Articles et guides IA | `BlogPostPageRefonte`, gabarit des guides IA | intention/réponse, auteur/date réels, sommaire unique, corps, exemples correctement qualifiés, limites, sources, FAQ pertinente, lecture suivante |
| Fiscalité | `GuideFiscalPage` | résumé, points clés, sommaire, corps, démarches et limites, sources officielles, FAQ, ressources liées |
| Outils | `ToolsPage` et détail outil | usage, périmètre produit, critères de choix, parcours financier, limites, sources/méthode, ressources et service lié |
| Glossaire | `GlossaryEntryPage` | définition, interprétation/formule si pertinente, exemple, limites, ressources et offre liée |
| Cas clients | données `documented-cases` et `published-cases` | contexte, travaux, livrables, résultats publiables, limites, attribution/source et offre pertinente |
| Cabinet et profils | `AboutPage`, `AuthorPage` | fonction actuelle, expérience sourcée, domaines d'intervention, publications traduites, liens externes vérifiés et contact |
| Légal, carrière, jobs, contact | composants existants | structure de la référence FR et champs réellement applicables, avec traduction intégrale des libellés |

Les variantes restent explicites : un service avec calendrier conserve le calendrier dans ses trois versions; une page sans cas client n'en reçoit pas un inventé pour égaliser les autres. Le contrat détaillé de chaque page est disponible dans les clés `sourceH2`, `sourceSectionIds` et la signature du texte FR dans `page-catalog.json`. Ajouter des identifiants sémantiques de bloc au rendu pour tester l'ordre, pas l'égalité textuelle entre langues.

## Règles éditoriales par corpus

- Pilier : préserver le contenu FR, actuellement 2 120 mots. EN/ES reprennent les huit blocs; la longueur dépend de la langue, sans remplir une cible de mots. Intégrer les comparaisons utiles dans ces blocs plutôt que répéter bénéfices, missions et profils dans plusieurs sections.
- Offres finance : même périmètre et même grille issue de `facts.ts`. Le temps mensuel est indicatif et ne devient pas une promesse de disponibilité permanente. Devis, exclusions et évolution de périmètre restent explicites.
- Organisation financière et comptabilité ES : repartir de l'offre FR approuvée. Ne pas promettre tenue comptable, déclarations de TVA, paie ou une durée moyenne de mission non documentée. La supervision/coordination d'un expert-comptable ne vaut pas production directe de ces prestations. Lever l'association hreflang désactivée uniquement après alignment sémantique.
- RH : traduire les quatre services FR et les deux offres; conserver les conditions RH sur devis, sans les remplacer par les prix DAF. Ne pas réintroduire les témoignages retirés du lot 163. L'interlocuteur RH reste la personne compétente, pas automatiquement Sébastien.
- Cas clients : traduire SolarMente, Seasonly et Opti Digital à partir des fiches existantes. Conserver nombres, unités, période, attribution et limites. Une citation traduite est signalée et reliée à sa source. « AI Summit Barcelona » seul ne documente pas encore une économie de temps ou un ROI publiable.
- IA : traduire le hub et les six guides intégralement, y compris prompts, exemples, exercices, tableaux et corrigés. Conserver la distinction entre démonstration fictive et mission réelle. Vérifier les liens vers les sources/outils à la livraison, les données sensibles et la validation humaine. Aucun volume, délai ou gain d'automatisation inventé.
- Outils : 21 fiches et quatre catégories. Les produits français, notamment Silae, PayFit, Malibou et les dispositifs de paie, gardent leur périmètre national réel. Une traduction ES ne signifie pas que le logiciel ou la prestation est disponible en Espagne. Idem BSPCE/BSA : expliquer le dispositif français, sans le transformer en droit espagnol.
- Fiscalité : cinq guides et le hub. Traduire le droit décrit, pas le remplacer par le droit britannique ou américain. Même dossier de sources officielles, mêmes dates réellement revues. Revalider les éléments sensibles avant publication; conserver auteur et liens rel=author.
- Blog : 31 références publiées. Préserver l'intention de chaque article et le lien vers son offre; faire apparaître une seule table des matières dans la page. Les comparatifs « 40 déploiements » gardent les limites de preuve actuelles, sans nouveaux chiffres non validés.
- Profils : onze personnes; traduire les fonctions et expériences existantes. Ne pas allonger les biographies courtes avec des qualifications, anciennetés ou clients supposés.
- Jobs : trois offres confirmées ouvertes. Même poste, conditions et identifiant d'offre dans les langues; recontrôler l'ouverture et l'éventuelle date de validité au moment de publier. Ne pas inventer salaire, télétravail ou politique de visa.
- Pages légales : traduction du texte applicable à Iter, sans créer des clauses nouvelles. Conserver la politique d'indexation pertinente; demander une revue juridique pour les clauses substantiellement modifiées, pas pour bloquer la préparation des autres corpus.

## Migrations d'URL

Les slugs de la matrice sont des propositions cohérentes, pas une promesse de gain de position. Conserver les pages DAF principales et les trois nouvelles URL anglaises `fractional-cfo-{city}` du lot 163.

Les nouveaux contenus EN sont sous `/en/resources/{blog,glossary,tools,case-studies,ai-finance,tax}`. Les nouveaux contenus ES utilisent `/es/recursos/{blog,glosario,herramientas,casos-de-exito,ia-finanzas,fiscalidad}`. Le hub et les services ES passent de `/es/services` à `/es/servicios`.

26 migrations concernent des URL actuellement présentes dans le crawl. Ce n'est pas le décompte complet des règles historiques : avant activation, inventorier également les 339 règles existantes et tous leurs alias, les rewrites et les règles Vercel. Raccorder chaque ancien alias directement à la nouvelle destination finale. Ne pas laisser l'ancienne redirection `/en/resources/*` vers `/en/ressources/*` après inversion du sens canonique.

Fichiers de routage à traiter ensemble : `next.config.ts`, `proxy.ts`, `vercel.json`, `lib/path-localization.ts`, `lib/hooks/use-page-translations.ts`, `lib/metadata.ts`, `app/sitemap.ts`, `lib/navigation.ts`, registres de contenu, routes statiques/dynamiques et paramètres générés.

Procédure par famille : créer et relire la destination; vérifier HTTP 200 et canonical; mettre à jour liens/nav/CMS et alternates; appliquer une 301 directe des anciennes URL; retirer les anciennes URL du sitemap; tester tous les alias. Des rewrites techniques internes peuvent conserver les dossiers français; elles ne doivent pas devenir des canonical ou des liens publics.

Conserver séparément les deux pages locales Beckham et l'article espagnol `que-es-fractional-cfo` jusqu'à une décision fondée sur contenu et Search Console. Les articles prix EN/ES sont associés au blog prix FR dans la préparation, mais ne sont pas fusionnés dans la page tarifs de l'offre. Les consolidations du brief T04/T22/T23/T24/T25/T27 restent conditionnelles aux données GSC sur douze mois.

## Ordre de livraison

| Lot | Chantiers | Nouvelles traductions |
| --- | --- | ---: |
| 0 | consentement, pages utilitaires/publicitaires, correction des garanties non étayées, même politique robots | 8 |
| 1 | design partagé, navigation, accueil, pilier, services finance, tarifs, métier, secteurs, hub Ressources | 13 |
| 2 | trois cas clients, IA, RH, cabinet/profils et contact | 28 |
| 3 | outils et glossaire | 71 |
| 4 | blog, fiscalité, légal, carrière et jobs | 72 |

Le nombre de traductions ne donne pas une durée de travail fiable. Le lot 1 doit d'abord valider le rendu de trois pages représentatives FR/EN/ES, puis déployer les autres pages du même contrat. Les migrations de routes sont livrées avec la famille correspondante, pas avant le contenu. Chaque lot fournit une PR relisible, un crawl de recette et un registre des traductions validées.

## Recette finale bloquante

1. Catalogue de 136 références : aucune traduction EN/ES requise manquante; les trois pages locales supplémentaires restent documentées. Pas d'alternate ni de sitemap vers une traduction simplement planifiée.
2. Même identifiant de gabarit, variante, ordre de blocs, regroupement des cartes et comportement de navigation pour chaque trio. Ne pas exiger un nombre de mots ou des hauteurs de cartes identiques entre langues.
3. Couleurs, grille, boutons, typo, états focus et formulaires partagent leurs tokens. Revue visuelle à 360, 768 et 1440 px, textes longs compris; aucune page ne déborde horizontalement. La mesure des styles calculés complète la revue, elle ne la remplace pas.
4. Un H1, hiérarchie pertinente, sommaire unique, FAQ et JSON-LD cohérents avec le contenu visible; auteurs et dates réels. Zéro « outsourced CFO » visible, tout en conservant les sources de redirection historiques.
5. Toutes les destinations finales en 200; aucune chaîne ou boucle depuis les alias; self-canonical et alternates réciproques; lang/schema corrects; aucun lien interne vers une redirection dans la navigation et les parcours migrés.
6. Vérifier toutes les métadonnées, libellés, erreurs/succès des formulaires et emails transactionnels de confirmation. Une soumission réelle de recette se fait avec des coordonnées de test identifiées et sans déclencher un envoi à des prospects.
7. Preuves, tarifs et responsabilité comptable/RH cohérents dans les trois langues; pas de faux cas client, produit prétendument localisé, garantie de gain ou promesse contractuelle ajoutée.
8. Lint, types, build/indexabilité et tests existants; audits SEO, navigation, redirections, schemas et contrats de gabarit. FR protégé contre toute réécriture non prévue par comparaison du texte et des captures de référence.
9. Poids et Lighthouse avant/après sur les trois piliers et un guide IA. Pas de chargement de corpus traduits dans le JS client. Les scripts marketing nécessitent leur propre validation des conversions et du consentement, pas une suppression pour alléger ce lot.
10. Vérification HTTP de production après publication et suivi GSC ensuite. Une indexation demandée, un audit statique ou un déploiement réussi ne prouvent ni classement ni visibilité dans les moteurs génératifs.

## Mesurer les effets

Avant chaque lot, exporter GSC par page/pays/appareil et langue : clics, impressions, CTR et position des familles DAF, part-time/interim, CFO externo, contrôle de gestion et IA-finance. Enregistrer les demandes commerciales par page d'entrée et langue, avec le consentement approprié. Contrôler les erreurs techniques après livraison, puis comparer des fenêtres de 28 jours et suivre six à huit semaines les pages commerciales sans réécritures lourdes successives. Les nouvelles traductions nécessitent leur propre délai de découverte; ne pas attribuer immédiatement tout mouvement à la refonte.

Références officielles Google : [versions linguistiques](https://developers.google.com/search/docs/specialty/international/localized-versions) et [sites multilingues](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites). Google recommande des URL distinctes et une langue réellement présente dans le contenu; changer un slug seul ne constitue pas un gain SEO démontré.

## Fichiers et reproduction

- `page-catalog.json` : inventaire machine, hashes de référence FR, H2 et sections, URL actuelles/cibles et statut de chaque locale. `proposalOnly=true` sur le dossier et ses propositions.
- `Matrice-FR-EN-ES.csv` : inventaire lisible dans Excel, une ligne par référence FR.
- `Matrice-complete-FR-EN-ES.csv` : 146 références, parcours hors sitemap compris.
- `utility-catalog.json`, `Parcours-hors-sitemap.csv` et `utility-responses.json` : annexe et preuves HTTP pour les dix parcours supplémentaires.
- `Redirections-proposees.csv` : 26 migrations d'URL actuelles, sans activation.
- `Tickets.csv` : dépendances, fichiers, critères et propriétaires fonctionnels proposés.
- `template-contracts.json` : contrats et garde-fous par famille.
- `scripts/prepare-locale-parity.py` : génération reproductible depuis le crawl du lot 163.
- `scripts/validate-locale-parity.py` : validation de la préparation, sans prétendre tester des traductions non développées.

Le présent dossier n'est pas importé par l'application. Il prépare la migration, il ne déclare aucune nouvelle page en production.
