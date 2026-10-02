# IA et finance : lot de parité FR, EN, ES

Version du 2 octobre 2026. Ce document décrit l’implémentation et la recette locale avant publication. La preuve de publication se trouve dans le rapport externe `audits/iter-parite-ia-finance-2026-10-02/Etat-implementation.json`, actualisé après vérification du déploiement.

Le hub et les six guides suivent le même gabarit dans les trois langues. Les traductions reprennent les 32 sections, 8 tableaux, 18 questions, prompts, références et réserves du corpus français. Les sept textes FR sont identiques à la production de référence. Aucun nouveau cas ou chiffre Iter n’est ajouté.

| FR | EN sous `/en/resources/ai-finance` | ES sous `/es/recursos/ia-finanzas` |
| --- | --- | --- |
| `/ressources/ia-finance` | hub | hub |
| `automatiser-reporting-financier` | `automate-financial-reporting` | `automatizar-reporting-financiero` |
| `chatgpt-finance` | `chatgpt-finance` | `chatgpt-finanzas` |
| `llm-finance` | `llms-finance` | `llm-finanzas` |
| `outils` | `tools` | `herramientas` |
| `feuille-de-route-90-jours` | `90-day-roadmap` | `hoja-ruta-90-dias` |
| `retours-experience` | `experience-reports` | `experiencias` |

## Parcours et références

Le registre de publication alimente les liens internes, la navigation, les canonical, le sélecteur de langue et le sitemap. Les anciennes variantes IA sont redirigées directement vers leur destination. La redirection générale anglaise `resources` vers `ressources` est remplacée par des familles explicites pour les contenus historiques non migrés. Aucun contenu futur n’est déclaré publié.

Les références encore françaises sont marquées FR. L’identité de Benjamin Ziza reste l’auteur des guides. Le contact financier reste Sébastien Doat. Les nouvelles traductions ont une date de publication réelle au 2 octobre, distincte des dates des originaux. Les sources EN/ES indiquent leur consultation du 2 octobre.

Microsoft U.S. Venture documente des rapprochements précis, pas une clôture entière. Armanino conserve la qualification de bénéfices estimés. Hebbia ne devient pas une promesse de productivité financière. Opti Digital reste un cas de structuration sans gain IA revendiqué. Le tarif Power BI est identifié comme celui de la page française, hors IVA/VAT et avec paiement annuel.

Les kits EN/ES contiennent données valides, fichier avec le doublon R01, solution et instructions UTF-8. Ils retrouvent les totaux 200/180, 150/155 et 50/25, et les écarts −20, +5 et −25. Le solde simplifié n’est pas un EBITDA. Le calculateur garde les cinq hypothèses, refuse les champs invalides et ne propose pas de délai d’amortissement si le gain net est nul ou négatif. Les données du calculateur restent locales. Le retour de copie du prompt distingue succès et échec.

## Recette et limites

145 tests, types, compilation et indexabilité passent. Lint : zéro erreur et 80 avertissements préexistants. Les dix audits de la CI passent localement. 96 pages alignées et 231 destinations internes sont vérifiées. Audit global : 260 URL au sitemap, 274 destinations, 838 hreflang, zéro page orpheline, zéro échec et zéro title au-delà de 60 caractères. Données structurées : 470 questions, zéro différence avec les réponses visibles. 391 règles de redirection, zéro chaîne, boucle ou règle masquée dans l’analyse statique.

Aucune introduction des douze guides traduits dans les 295 chunks JS client contrôlés. Ce contrôle ne constitue pas une mesure Lighthouse. Les tags et conversions ne sont pas modifiés.

La revue visuelle à 360, 768 et 1440 px reste non réalisée : la prévisualisation navigateur avait été bloquée et n’est pas contournée. L’autorisation de publication de l’utilisateur subsiste. Les tests HTML/DOM ne remplacent pas cette revue. Aucune hausse de classement ni citation IA n’est mesurée ici. Les données GSC devront être comparées après découverte des nouvelles pages.

Bilan cumulé après ce lot : 32 références FR alignées, 96 versions, 33 nouvelles traductions et 31 anciennes traductions alignées. Restent 114 références du brief, soit 159 traductions nouvelles et 69 alignements existants. Prochain lot : parcours RH, puis cabinet/profils/contact, avant outils, glossaire, blog et fiscalité.
