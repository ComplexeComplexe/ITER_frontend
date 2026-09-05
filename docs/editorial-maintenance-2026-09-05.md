# Chantiers 4 à 7 — 5 septembre 2026

## 4. Gabarits éditoriaux

Les deux fournisseurs de contenu (routes JSX dédiées et catalogue HTML) partagent désormais BlogHero, ArticleBodyLayout, ArticleMeta, ArticleTOC et BlogRelatedArticles. Les textes complets gardent leur source d’origine. Le gabarit commun aligne H1, badge, auteur, date visible, partage, largeur de lecture, sommaire mobile/ordinateur et cartes associées. Les illustrations locales documentées utilisent le même traitement ; les anciens liens d’image non fiables ne sont pas réactivés.

Corrections découvertes pendant la recette : le signe « + » des combinaisons de logiciels était placé sur une ligne mobile horizontale malgré une largeur de 100 %, créant un débordement ; les logos absents dans le comparatif ont maintenant un repli textuel ; l’animation de la section DAF de l’accueil est contenue horizontalement.

## 5. Tarifs et comparatifs

- 20 fiches outils : suppression des anciennes fourchettes non vérifiées, base tarifaire et source éditeur datées. Les tableaux de catégories et le hub utilisent les mêmes informations. Fygr est identifié comme Okimia ; son URL historique est conservée.
- Guide des dix outils : prix remplacés par des modalités et liens éditeurs, budgets globaux non sourcés retirés, termes et comparaisons corrigés.
- Guide du coût comptable réécrit : même URL et sept ancres, méthode de comparaison des devis, séparation outils/prestation/DAF, exemple arithmétique explicitement hypothétique et FAQ cohérente avec les données structurées. Publication du 7 juin conservée.
- Services comptabilité FR/ES et contrôle de gestion : suppression des grilles de marché sans source et des économies uniformes ; chiffrage selon périmètre. Les conditions de six mois et les trois forfaits de contrôle de gestion contradictoires ont été remplacés par un cadrage sur devis. Les variantes de services localisées sont alignées sur cette distinction.
- Les témoignages anonymes chiffrés non documentés du contrôle de gestion et les récits de ROI sans preuve des quatre fiches outils ont été retirés de l’affichage. Les cas clients documentés et leurs liens sont conservés.

Les tarifs commerciaux d’une direction financière complète restent ceux de l’offre validée. Les sources éditeurs ci-dessous justifient les modalités consultées, pas un audit de toutes les fonctionnalités, notes ou déclarations historiques du site. Les sujets fiscaux ne sont pas réaudités dans ce lot.

## 6. Sources et archives

Le client CMS réseau est remplacé par lib/static-content.ts. Les métadonnées utilisent directement leurs valeurs locales ; aucun aller-retour à un CMS désactivé ni gestion d’exception systématique. Les anciens noms de types sont conservés pour la compatibilité des structures, sans connexion CMS.

Le catalogue de blog local est la source des listes. Les constantes de routage de services sont centralisées. Les 52 fichiers MDX sans lecteur, le lecteur sans appelant, une sauvegarde de service et la feuille CSS non importée sont archivés hors du contenu actif. Dix-sept corps HTML masqués par une route dédiée sont archivés ; le catalogue garde les métadonnées et le temps de lecture de la route lorsqu’il est explicite. Aucun de ces déplacements de fichiers ne constitue une suppression d’URL publique.

Les scripts manuels d’export et de seed historiques sont conservés. Voir migration/archive/README.md pour les sources à modifier ; l’archive n’est pas un dossier de publication.

## 7. Maintenance Next.js

Configuration images.domains remplacée par remotePatterns HTTPS pour les trois hôtes déjà utilisés ; racines de compilation explicites ; middleware.ts renommé proxy.ts avec conservation des règles. Aucun changement de version Next.js ou React. Les exceptions de sécurité et le suivi marketing ne sont pas modifiés.

Références : [convention Proxy](https://nextjs.org/docs/app/api-reference/file-conventions/proxy), [images](https://nextjs.org/docs/app/api-reference/config/next-config-js/images), [racine Turbopack](https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack).

## Sources de tarification consultées

- [pennylane](https://www.pennylane.com/fr/tarifs) — Selon formule et utilisateurs (5 septembre 2026).
- [agicap](https://agicap.com/fr/tarifs/) — Sur devis (5 septembre 2026).
- [spendesk](https://www.spendesk.com/fr/) — Selon périmètre, sur devis (5 septembre 2026).
- [payfit](https://payfit.com/fr/offres/) — Forfait + collaborateurs + options (5 septembre 2026).
- [sage](https://www.sage.com/fr-fr/) — Selon produit, modules et déploiement (5 septembre 2026).
- [cegid-loop](https://www.cegid.com/fr/solutions/expertise-comptable/) — À confirmer auprès de Cegid (5 septembre 2026).
- [fygr](https://www.okimia.com/fr/tarifs) — Selon formule et engagement (5 septembre 2026).
- [pleo](https://www.pleo.io/fr/pricing) — Forfait + utilisateurs supplémentaires (5 septembre 2026).
- [silae](https://www.silae.fr/) — Devis éditeur ou partenaire (5 septembre 2026).
- [lucca](https://www.lucca.fr/tarifs/) — Selon modules et collaborateurs (5 septembre 2026).
- [qonto](https://qonto.com/fr/pricing) — Selon forfait et opérations (5 septembre 2026).
- [revolut-business](https://www.revolut.com/fr-FR/business/business-account-plans/) — Selon forfait et usage (5 septembre 2026).
- [payhawk](https://payhawk.com/fr/tarification-et-abonnements) — Selon modules et périmètre (5 septembre 2026).
- [kyriba](https://www.kyriba.com/fr/) — Devis à demander (5 septembre 2026).
- [power-bi](https://www.microsoft.com/fr-fr/power-platform/products/power-bi/pricing) — Selon licences et capacité (5 septembre 2026).
- [upflow](https://upflow.io/pricing) — Selon offre et périmètre (5 septembre 2026).
- [leanpay](https://www.leanpay.io/en) — Devis à demander (5 septembre 2026).
- [factorial](https://factorial.fr/tarifs) — Selon modules et utilisateurs (5 septembre 2026).
- [carta](https://carta.com/plans/equity-management/) — Selon offre et actionnaires (5 septembre 2026).
- [equify](https://www.equify.eu/fr/tarifs) — Selon titulaires et formule (5 septembre 2026).
- [dext](https://dext.com/fr/tarifs/entreprise-tpe-pme) — Selon utilisateurs et documents (5 septembre 2026).
- [xero](https://www.xero.com/uk/pricing-plans/) — Selon pays et formule (5 septembre 2026).
- [finthesis](https://finthesis.io/tarifs) — Selon formule (5 septembre 2026).
- [looker-studio](https://cloud.google.com/data-studio) — Version gratuite et offre Pro (5 septembre 2026).
- [dealroom](https://dealroom.net/products/pricing) — Selon transaction et périmètre (5 septembre 2026).
- [intralinks](https://www.intralinks.com/guides/how-much-does-intralinks-cost-0) — Sur devis par projet (5 septembre 2026).
- [pulley](https://pulley.com/pricing) — Selon offre et périmètre (5 septembre 2026).

## Corps de blog archivés

- fr / flux-de-tresorerie → `app/(fr)/ressources/blog/flux-de-tresorerie/page.tsx`
- fr / la-modernisation-du-role-de-cfo → `app/(fr)/ressources/blog/la-modernisation-du-role-de-cfo/page.tsx`
- fr / cout-daf-externalise-tarifs-prix-2026 → `app/(fr)/ressources/blog/cout-daf-externalise-tarifs-prix-2026/page.tsx`
- fr / daf-externalise-vs-daf-salarie → `app/(fr)/ressources/blog/daf-externalise-vs-daf-salarie/page.tsx`
- fr / checklist-due-diligence-levee-de-fonds → `app/(fr)/ressources/blog/checklist-due-diligence-levee-de-fonds/page.tsx`
- fr / daf-drh-externalises-synergie → `app/(fr)/ressources/blog/daf-drh-externalises-synergie/page.tsx`
- fr / daf-externalise-vs-daf-interimaire → `app/(fr)/ressources/blog/daf-externalise-vs-daf-interimaire/page.tsx`
- fr / daf-externalise-startup → `app/(fr)/ressources/blog/daf-externalise-startup/page.tsx`
- fr / loi-beckham-espagne-conditions-eligibilite → `app/(fr)/ressources/blog/loi-beckham-espagne-conditions-eligibilite/page.tsx`
- fr / loi-beckham-economie-impot-simulation → `app/(fr)/ressources/blog/loi-beckham-economie-impot-simulation/page.tsx`
- fr / daf-part-time-tarifs-missions-2026 → `app/(fr)/ressources/blog/daf-part-time-tarifs-missions-2026/page.tsx`
- fr / cfo-externe-role-missions-2026 → `app/(fr)/ressources/blog/cfo-externe-role-missions-2026/page.tsx`
- fr / levee-de-fonds-guide → `app/(fr)/ressources/blog/levee-de-fonds-guide/page.tsx`
- fr / ia-et-automatisation-des-taches-repetitives → `app/(fr)/ressources/blog/ia-et-automatisation-des-taches-repetitives/page.tsx`
- fr / cout-externalisation-comptable-2026 → `app/(fr)/ressources/blog/cout-externalisation-comptable-2026/page.tsx`
- en / fractional-cfo-cost-services-2026 → `app/(en)/en/ressources/blog/fractional-cfo-cost-services-2026/page.tsx`
- es / cfo-externo-pymes-precio-2026 → `app/(es)/es/recursos/blog/cfo-externo-pymes-precio-2026/page.tsx`

## Vérifications

Les résultats définitifs de compilation, de navigation, de tests et de publication sont consignés dans le bilan de livraison accompagnant cette proposition. La recette inclut les deux fournisseurs d’articles, les trois langues, les comparateurs et les redirections.
