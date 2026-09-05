# SEO, contenus, design et performance — 5 septembre 2026

## Changements de ce lot

- Offre DAF conservée comme destination principale ; aucun déplacement d'URL ni nouvelle redirection.
- Colonne Services du pied de page rétablie : le composant cherchait un intitulé qui n'existait plus dans la navigation. Lien global vers les tarifs commerciaux ajouté, guide de coût identifié comme comparaison de budget.
- Guides coût et temps partagé réécrits avec des intentions distinctes. Les chiffres de marché non documentés, les promesses d'économie et les conditions générales ambiguës ont été retirés des deux pages servies. Le guide coût explique un calcul illustratif explicite ; le guide temps partagé décrit calendrier, responsabilités et livrables. Leurs URL et anciennes ancres du guide coût sont conservées.
- Titres et descriptions du catalogue synchronisés avec ces guides. Ses anciens corps de texte de secours restent conservés ; la route dédiée sert le guide complet actualisé.
- Gestion financière externalisée conservée et recentrée sur données, clôtures, responsabilités et processus ; budget relié à la grille Iter. L'offre de direction financière reste sur /daf-externalise.
- Liens de contexte ajoutés depuis les articles outils, stack SaaS et cash burn vers startup/SaaS, depuis cash burn vers deep tech et depuis le glossaire BFR vers industrie.
- Industrie et deep tech : exemples de structures de pilotage, tableaux de données et arbitrages. Ils sont explicitement illustratifs, pas présentés comme des documents clients.
- Présence Toulouse clarifiée dans les pages DAF, startup et le pied de page. Le service couvre Toulouse ; les équipes sont à Paris et Barcelone, avec visites convenues au cadrage.
- Mise à jour des dates du sitemap pour les contenus concernés ; séparation facultative des dates de publication et de modification dans le gabarit d'article ; date visible de la page opérations synchronisée.

## Design : corrigé

- Fil d'Ariane du gabarit d'article JSX masqué en partie sous le menu fixe : marge supérieure adaptée.
- Articles populaires du pied de page répartis sur la largeur disponible plutôt qu’en colonne isolée.
- Menu mobile positionné au milieu de la largeur par une grille à trois colonnes : grille à deux colonnes sur mobile, trois sur ordinateur.
- Gabarit d'article bleu différent de la charte : catégories, sommaire, encadrés informatifs et liens associés harmonisés avec le violet du site ; titre principal aligné sur la typographie de marque.
- Nom accessible ajouté au lien LinkedIn du pied de page, auparavant réduit à une icône sans nom sur mobile.
- Taille de cible augmentée pour les liens des principales colonnes du pied de page ; contraste du texte amélioré.
- Avatar auteur empêché de se comprimer ; nom et temps de lecture peuvent revenir à la ligne.

## Performance : interventions limitées et mesurées

Les enveloppes non interactives des articles sont désormais rendues côté serveur. Le menu n'importe plus indirectement l'ancien module CMS pour localiser les chemins. Les fonctionnalités interactives restent disponibles.

Le navigateur envoyait des rapports de politique de sécurité vers /api/csp-report, endpoint absent produisant des 404. La référence au collecteur inexistant a été retirée du header Report-Only ; les directives de sécurité restent identiques. Ce header reste uniquement en observation. Un vrai collecteur et une revue des domaines autorisés restent un chantier distinct.

Mesures Lighthouse initiales, Chrome mobile simulé, même machine le 5 septembre :

| Page | Performance | Accessibilité | Bonnes pratiques | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| /daf-externalise | 84 | 93 | 93 | 100 | 4,1 s | 200 ms | 0 |
| Guide temps partagé | 99 | 88 | 93 | 100 | 2,0 s | 90 ms | 0 |

Ces mesures de laboratoire varient avec le réseau, les scripts tiers et la machine. Elles ne sont pas des données utilisateurs CrUX et ne permettent pas d'affirmer un gain de classement. Le score SEO Lighthouse ne mesure pas la compétitivité sur les mots-clés.

## Reste à améliorer, par priorité

1. **Scripts marketing et tiers — priorité haute.** Lighthouse estime environ 579 Kio de JavaScript inutilisé au chargement de la page DAF initiale, dont une part importante des tags Google. Cette estimation n'autorise pas une suppression automatique : cartographier les tags réellement utiles, leurs déclencheurs et le consentement, puis vérifier les conversions avant changement. Le suivi publicitaire n'a pas été modifié dans ce lot.
2. **Preuves clients — priorité haute.** Les trois cas existent avec liens depuis les offres. Pour aller plus loin, obtenir des captures anonymisées autorisées, les périodes de mesure exactes manquantes et un témoignage approuvé. Aucune nouvelle donnée client, attestation ou promesse n'a été inventée. La disponibilité d'un document privé ne constitue pas une autorisation de publication.
3. **Bannière de consentement mobile — priorité moyenne.** Sur un écran de 390 × 900, le panneau occupe près de la moitié de l'espace visible au premier passage. Étudier une présentation plus compacte en conservant des choix accepter/refuser de même accessibilité et le lien de personnalisation.
4. **Gabarits éditoriaux multiples — priorité moyenne.** Les articles JSX et les articles issus du catalogue utilisent encore deux mises en page. La palette est rapprochée dans ce lot ; unifier progressivement espacements, sommaires, dates et traitement des illustrations sans réécrire les contenus à cette occasion.
5. **Tarifs de logiciels et autres comparatifs — priorité moyenne.** Plusieurs articles historiques affichent des prix ou des gains sans source précise. Le lot traite les guides DAF ciblés. Prévoir une revue datée des outils, du contrôle de gestion et des autres offres avant de généraliser leurs chiffres.
6. **Ancien CMS et copies éditoriales — priorité moyenne.** Les modules de compatibilité Strapi et plusieurs copies MDX/de secours subsistent. Certaines ne sont pas publiées. Cartographier les lecteurs effectifs avant suppression ; ne pas compter ces fichiers comme des URL indexées ni conclure à un doublon public à partir de leur seule présence dans le dépôt.
7. **Maintenance framework — priorité basse.** La compilation signale images.domains, l'ancienne convention middleware et un contexte local à plusieurs fichiers de verrouillage. Traiter dans un lot technique ciblé ; aucune montée de version opportuniste ici.

## Validation

- 63 tests unitaires existants réussis.
- Compilation de production et contrôle d'indexabilité : 231 URL de sitemap et 256 pages construites, réussis sur la version finale.
- Contrôle navigateur initial et local : sept pages, chacune à 390 et 1440 pixels, soit 14 configurations ; aucune image cassée, aucun débordement horizontal ni erreur JavaScript détecté.
- Le lint des fichiers touchés remonte 29 erreurs d'apostrophes JSX déjà présentes avant le lot (14 sur startup et 15 sur l'article outils), ainsi qu’un type any préexistant dans ServiceSinglePage et des avertissements préexistants. Aucune erreur nouvelle dans les deux guides réécrits. Les contrôles de compilation restent distincts du lint.
- Aucun formulaire de prospect soumis ; aucune modification des balises publicitaires.

## Suivi SEO

Comparer les groupes DAF, tarifs, temps partagé et startup/SaaS par URL dans GSC à 28 jours, puis à 8–12 semaines, après prise en compte de l'exploration. Suivre aussi les demandes qualifiées. Les changements précédents du 5 septembre et les futurs backlinks empêchent d'attribuer une évolution à un seul élément de ce lot.
