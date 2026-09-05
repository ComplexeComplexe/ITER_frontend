# Scripts marketing, consentement et conversions — 5 septembre 2026

## Périmètre et constat initial

Lecture du conteneur GTM-KZZ9L5VZ, espace de travail 17, et de la propriété GA4 536211786 (flux G-FJ0L99KFL0). L’espace de travail GTM ne comportait aucun changement en attente au début de l’intervention.

Le site chargeait GTM et un gtag Ads autonome sur inactivité ou simple interaction, même sans choix du bandeau. GTM chargeait lui aussi AW-18030187059. Lighthouse mobile a confirmé deux téléchargements Ads, environ 578 Kio de JavaScript inutilisé au total et un score de performance de 86 sur la mesure initiale. Ce score est une mesure de laboratoire, pas une donnée terrain.

Deux commandes de consentement par défaut coexistaient : le document HTML et une balise HTML personnalisée GTM. Les deux balises de formulaires Ads étaient en pause, utilisaient le même ID et le même libellé de conversion. GA4 ne recevait que sept événements automatiques sur la liste des événements récents ; les événements clés existants n’avaient pas de flux actif sur 28 jours. Aucun événement GA4 de succès de formulaire n’était configuré dans GTM.

## Cartographie et configuration retenue

| Balise / source | Déclenchement | Décision |
| --- | --- | --- |
| Chargement GTM dans le site | Consentement valide Analytics ou marketing | Un seul chargeur ; aucun chargement sur scroll, survol ou délai sans accord |
| gtag Ads autonome dans le site | Ancien délai / interaction | Retiré : doublon de la balise Google Ads GTM |
| Consent Mode - Default, GTM 8 | Initialisation consentement | Mis en pause ; défaut denied et réglages de réduction des données conservés dans le document avant tout chargement |
| Conversion Linker, GTM 9 | Initialisation GTM | Conservé avec ses contrôles de consentement intégrés |
| GA4 - Google Tag - Configuration, GTM 14 | Initialisation GTM | Conservée, G-FJ0L99KFL0 |
| Google Ads - Balise Google, GTM 11 | Initialisation GTM | Conservée, AW-18030187059 |
| GAds - Conversion - Prospect confirme, GTM 6 | lead_form_submitted, après succès serveur | Réactivée et renommée ; consentement supplémentaire ad_storage obligatoire ; ID/libellé existants conservés |
| Ancien formulaire Contact, GTM 12 | Soumission de formulaire sur /contact | Reste en pause : doublon de destination et déclenchement avant confirmation serveur |
| Ancien clic RDV Calendar, GTM 13 | Lien calendar.google.com/calendar/appointments | Mis en pause : aucun lien actif correspondant dans le code ; BOOKING_URL mène à /contact |
| GA4 - Prospect confirme - generate_lead, GTM 24 | lead_form_submitted | Ajoutée ; consentement analytics_storage obligatoire ; aucun paramètre personnel ajouté |

GA4 : `generate_lead` est marqué comme événement clé, sans valeur monétaire artificielle, avec comptage une fois par événement. Les objectifs historiques restent conservés. Les campagnes, enchères et paramètres d’import Ads ne sont pas modifiés.

## Modifications du site

- Un chargeur GTM après accord positif et une initialisation unique du consentement. Suppression du chargement Ads séparé, des préconnexions Google et de l’iframe noscript qui contournait le bandeau JavaScript.
- Restauration des choix valides, refus des dates invalides/futures/expirées et des valeurs non booléennes ; un stockage bloqué ne casse plus la sauvegarde du choix courant. Le retrait met à jour les quatre signaux Google et empêche les nouveaux événements du site.
- Les événements de formulaire sans consentement ne sont pas mis en attente pour un accord ultérieur. Les données de conversion avancée ne sont exposées dans la couche de données qu’avec un accord marketing. Le nouveau tag GA4 n’envoie aucun de ces champs. Le traitement effectif de conversion avancée reste dépendant de la configuration Google ; ce lot ne prétend pas le certifier.
- Contact, landing page DAF, profil et diagnostic utilisent le même événement de succès. Le diagnostic historique ne compte plus de conversion et n’affiche plus de succès si Web3Forms échoue, même en cas de réponse HTTP 200 avec success:false. Ses champs ont désormais des noms et des labels associés.

Le changement supprime les pings sans consentement avant choix/refus : la couverture des sessions mesurées et de la modélisation peut donc diminuer. Après un accord partiel, les deux destinations Google utilisent leurs contrôles intégrés ; le consentement supplémentaire protège séparément les événements de prospect GA4 et Ads. Il n’est pas revendiqué que la bibliothèque Ads disparaisse après un accord Analytics seul.

## Validation et exploitation

78 tests : refus, accord Analytics seul, expiration, stockage bloqué, chargement unique, succès et erreurs des formulaires. Compilation réussie : 256 pages et 231 URL au sitemap. Contrôle TypeScript et lint ciblé ; avertissement historique du composant racine HTML et recommandation Browserslist conservés.

Recette navigateur de la page DAF : contenu et bandeau affichés, aucun script Google avant choix/après refus, un GTM après accord, aucun chargement Ads autonome supplémentaire. Une page de test locale séparée bloque les points de collecte afin de ne pas envoyer de fausses conversions.

Le bilan de livraison contient la version GTM publiée, la proposition GitHub, les contrôles de production et la mesure Lighthouse finale. Pour un retour arrière, rétablir la version GTM précédente et annuler le commit du site ; ne pas réactiver simultanément les deux balises Ads de formulaire.

Sources techniques : [Consent Mode](https://developers.google.com/tag-platform/security/concepts/consent-mode), [mise en place du consentement](https://developers.google.com/tag-platform/security/guides/consent), [gestion de la balise Google](https://support.google.com/tagmanager/answer/12329709).
