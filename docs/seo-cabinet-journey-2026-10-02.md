# Cabinet, opérations, fiscalité et outils : lot 5

L'accueil utilisait un title proche de l'offre DAF, la page d'organisation gardait un titre commercial général, et le hub fiscalité ne distinguait pas assez les questions du dirigeant de celles de sa société. Le guide des outils annonçait des gains non documentés et 150 entreprises digitalisées, en contradiction avec le référentiel publié. Ce lot clarifie ces intentions sans déplacer de page performante.

## Corrections

- T26 : title d'accueil centré sur le cabinet DAF et DRH pour PME et startups, tiré du même référentiel que les métadonnées locales. H1 conservé ; lien visible du premier écran vers la direction financière externalisée. La page de gestion financière est centrée sur les opérations, les responsabilités et les données. Les tâches produites par l'équipe, le cabinet comptable et Iter sont précisées au contrat ; aucune offre nouvelle de tenue, relance ou paiement n'est inventée. URL et liens vers le pilier/contrôle conservés.
- T30 : introduction du hub fiscalité pour dirigeants, entrepreneurs et filiales. Liens vers le pilotage d'une filiale espagnole et le DAF de Barcelone. Les décisions fiscales restent soumises à la validation des professionnels compétents. L'entité globale et llms.txt utilisent les mêmes cinq expertises : DAF, DRH, contrôle de gestion, levée de fonds, fiscalité France-Espagne. L'ordre assure la cohérence des données ; il ne garantit pas une préférence d'un moteur.
- QA du hub : la position des entrées avait été décalée par l'ajout de la filiale. Les groupes sont sélectionnés par identifiant, avec la filiale dans les entreprises et le Modelo 720 dans les particuliers. Le sujet succession retrouve sa place dans le patrimoine. Une carte IRPF en double est remplacée par la filiale ; aucune URL à venir ne devient cliquable.
- T22, partiellement : le guide général devient une méthode de sélection et d'intégration, distincte du panorama startup et de la stack SaaS Series A. Sept anciens fragments conservés. Suppression des pourcentages de performance, benchmarks, moyennes de coûts et nombre de clients non documentés. Pas de durée ou de ROI automatique. Sources éditeurs Pennylane, Agicap et Microsoft vérifiées ; critères de données, contrôles, licences, coût complet, maintenance, pilote et réversibilité.
- Catalogue : le guide général existait en FR mais manquait du catalogue FR. Son entrée reprend le titre partagé, Benjamin Ziza, la publication existante du 1er mai 2026 et une durée de lecture calculée. Son texte intégral n'est pas dupliqué dans le catalogue. Liens complémentaires depuis Series A et le guide IA, lequel renvoie également vers l'annuaire général.

Les trois contenus protégés (pilier DAF, guide flux, article tarifs performant) restent identiques. Aucune redirection, suppression de page, nouvelle illustration, bibliothèque ou modification de tracking. Les corps EN/ES restent inchangés ; l'entité globale est contrôlée sur les trois langues.

## Recette et recherche de régressions

Build : 227 URL sitemap, 252 pages générées. 118 tests dans 20 fichiers et TypeScript réussis. ESLint : aucune erreur, avertissement existant sur le head du layout racine. Contrôles globaux des liens, hreflang, FAQ, images, ancres et redirections ; recettes des quatre lots précédents et huit pages de ce lot. La recette du parcours cabinet est ajoutée à GitHub.

Lecture HTML indépendante : 230 pages dont les trois emplois ouverts. Un H1, aucune duplication du fil d'Ariane ni JSON invalide. Recherche des changements de texte sur tout le site : seules les six pages prévues, le catalogue du blog et la liste des publications de Benjamin changent de texte principal. Les propriétés de l'entité sont relues sur les pages FR, EN et ES et dans llms.txt.

La première recette a détecté un title de 61 caractères. Il a été raccourci, puis le build, la recette SEO et la lecture indépendante ont été relancés. Le contrôle du canonical racine tient compte de la normalisation déjà présente de l'URL d'accueil, sans modifier le canonical publié.

## Décisions restantes

T22 n'est pas marqué terminé : la fusion des deux guides dépend des requêtes, clics et backlinks sur 12 mois. Les fichiers disponibles localement contiennent des comparaisons de 28 jours et des exports datés de septembre, insuffisants pour ce choix. Les articles fiscalité, CFO et tarifs gardent leurs URL tant que leurs informations uniques et données de recherche n'ont pas été examinées. Les résultats clients et témoignages ne sont pas remplacés par des statistiques inventées.

La PR reste en brouillon, sans publication production. Les contrôles de HTML ne prouvent ni classements, cannibalisation résolue, conversions, citations IA, ni Core Web Vitals terrain. Recette visuelle mobile et interactions non confirmées, accès navigateur restreint. Après publication : vérifier le commit en production et comparer des périodes GSC complètes, en séparant marque et requêtes transactionnelles.

Sources consultées le 2 octobre 2026 : https://help.pennylane.com/fr/articles/18770-utiliser-les-api-publiques-pennylane ; https://agicap.com/fr/produits/plan-de-tresorerie/ ; https://learn.microsoft.com/en-us/power-bi/fundamentals/service-features-license-type.
