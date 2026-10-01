# Parcours RH et priorité Finance

Mise à jour du 1er octobre 2026. Périmètre éditorial : français.

## Principes

- L’accueil conserve son H1 Finance, sa description SEO et tous ses liens Finance de contenu. Son title se concentre sur la direction financière.
- L’offre RH dispose d’un accès direct dans la navigation, d’une carte secondaire dans le premier bloc et d’une section dédiée. Le pilier RH présente l’offre ; la page temps partagé décrit le fonctionnement.
- Borith Biv est présenté comme interlocuteur RH. Cette présentation ne constitue pas une attribution automatique d’auteur ou de relecteur.
- Les prix, durées, délais et résultats RH sans justificatif ne sont pas des promesses publiques. Le périmètre et les conditions sont précisés au devis. Les conditions Finance ne sont pas transposées au RH.
- Les exemples de besoins ne sont pas des cas clients. Les auteurs historiques des articles sont conservés ; le catalogue est aligné sur la signature de la page réellement publiée.

## Parcours de contact

Les fragments drh, drh-temps-partage, borith-biv et les quatre services RH préremplissent le besoin RH et conservent la page d’origine. Les contrôles du formulaire utilisent un envoi simulé, sans transmission réelle.

## Mesure à finaliser dans GTM / GA4

Le code émet `service_navigation` dans dataLayer uniquement après consentement analytics. Aucune nouvelle bibliothèque publicitaire n’est ajoutée. Les paramètres sont :

- `service_family` : finance ou rh
- `placement` : home-hero, home-rh-section, navigation, footer ou content
- `target_path` : chemin appartenant à une liste contrôlée, sans paramètres ni fragment
- `page_variant` : finance-first-rh-2026-10

L’émission dataLayer est testée. L’acheminement vers GA4 n’est pas configuré ni vérifié dans ce lot. Avant toute publication GTM : vérifier si une balise existante reprend déjà cet événement, puis créer si nécessaire un déclencheur Événement personnalisé de même nom et une balise GA4 avec ces paramètres, soumise au consentement analytics. Tester refus et acceptation en mode aperçu et vérifier une seule émission par clic dans DebugView. Ne pas transformer les clics en conversions principales.

La conversion existante `lead_form_submitted` reste unique après livraison confirmée et permet de distinguer le besoin RH. Comparer clics et demandes qualifiées par famille sur des périodes comparables ; ne pas attribuer une variation au seul design sans tenir compte du trafic et des campagnes.

## Contenus à obtenir avant publication de preuves

1. Borith : parcours vérifiable, expertises exactes, secteurs et langues réellement couverts.
2. Une mission RH publiable : contexte, dates, travaux, limites, rôle de chacun, livrables et accord client.
3. Un résultat documenté : indicateur, méthode, valeur initiale, valeur finale et période. Pas de pourcentage isolé.
4. Un témoignage signé : texte approuvé, nom, fonction, société, date et autorisation de diffusion.
5. Un livrable anonymisé : feuille de route, calendrier ou matrice de responsabilités, avec autorisation.
6. Les modalités commerciales RH validées pour préciser, si pertinent, le budget et les conditions aujourd’hui indiqués sur devis.

## Vérification et limites

La recette comprend la compilation, les tests unitaires, les liens du sitemap, les métadonnées, les hreflang, les FAQ structurées et une comparaison des 143 pages FR avec le relevé avant intervention.

Le navigateur de cette session n’a pas pu ouvrir la prévisualisation locale : contrôle de sécurité indisponible. La recette visuelle n’est donc pas certifiée. Vérifier en priorité l’accueil à 390 et 360 pixels, le menu à 1280 pixels, la page DRH et le contact RH, sans envoyer de formulaire de test en production.
