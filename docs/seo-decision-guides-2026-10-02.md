# Guides de décision et maillage trésorerie : lot 4

Les articles de décision conservent leur URL et répondent à une question différente de la page commerciale DAF. Le comparatif intérimaire contenait des tarifs anciens, excluait à tort l'offre de transition et présentait des scénarios non documentés comme réels. Le guide des cinq signes associait des seuils arbitraires à un besoin automatique de CFO et comportait une citation chiffrée non documentée. Ces affirmations sont remplacées par des critères de choix, des responsabilités et des exemples explicitement fictifs.

## Modifications

- Comparatif salarié : title/H1 centrés sur le choix de l'organisation. Métadonnées, date de publication et auteur du catalogue alignés sur la page existante, Benjamin Ziza. La comparaison de budget utile est conservée. Aucun auteur n'est réattribué pour équilibrer des compteurs.
- Comparatif intérimaire : title, H1 et URL conservés ; tarifs récurrents et transition issus des données d'offre existantes. Suppression des statistiques et économies non documentées. Trois situations fictives identifiées. Un seul BlogPosting et une seule FAQ visible/structurée, générés par le gabarit partagé.
- Cinq signes : questions de diagnostic, alternatives au temps partagé, liens vers les offres adaptées. Suppression des seuils universels, délais garantis et citation non vérifiée. Sébastien Doat reste l'auteur.
- Cash burn : paiements et encaissements distingués du revenu comptable/MRR, périmètre et limites explicités. Exemple fictif : 125 875 € payés moins 45 000 € encaissés = 80 875 € consommés ; 650 000 / 80 875 = environ 8,04 mois sous hypothèses constantes. Les seuils automatiques de levée et décotes non sourcées sont retirés. Lien vers la présentation officielle d'IAS 7, sans prétendre que cette norme définit le runway.
- Prévisionnel : exemple fictif de calendrier. Solde initial 20 000 €, puis -5 000 € en fin de semaine 1 et 15 000 € en fin de semaine 2. Le solde final positif ne masque plus la tension intermédiaire.
- Maillage vers le guide des flux : quatre liens entrants contextuels supplémentaires depuis cash burn, le diagnostic des cinq signes, Agicap/Okimia et la catégorie logiciels de trésorerie (7 à 11 pages sources dans le texte principal). Title de catégorie centré sur la sélection, distinct du comparatif produit. Lien vers le pilier dans l'introduction du guide de sélection d'un cabinet.

Les textes principaux du pilier DAF, de l'article flux de trésorerie et du guide tarifs performant sont inchangés. Toutes les URL sont conservées ; aucune 301 ajoutée dans ce lot. Les 27 fragments historiques des quatre guides restent disponibles. Les versions EN/ES n'ont pas changé de texte principal. Les dates de révision concernent les pages effectivement modifiées, sans rafraîchir tout le sitemap pour un lien de navigation.

## Contrôles sur la version compilée

118 tests unitaires dans 20 fichiers, TypeScript, code modifié et build réussis. 252 pages générées et 227 URL sitemap contrôlées. 237 destinations internes et 668 hreflang vérifiés, aucune page orpheline. 403 questions FAQ et 157 images sans écart ; 524 ancres et 105 liens de contact localisés valides. 337 règles de redirection sans chaîne, boucle ou conflit. Régressions des lots précédents et recette ciblée sur huit pages réussies. La recette des guides est ajoutée au workflow GitHub.

Une seconde lecture HTML indépendante couvre 230 pages, dont les trois offres d'emploi ouvertes : un H1 par page, aucun BreadcrumbList dupliqué ni JSON invalide. Le pilier reste identique à 2 120 mots. Les titres/cartes et listes d'auteurs partagés expliquent les changements secondaires sur d'autres pages ; aucune réécriture de leurs articles n'est déduite de ces différences.

## Arbitrages et limites

La consigne de stabilité du guide flux est respectée. Le comparatif intérimaire conserve ses signaux de recherche mais ses erreurs factuelles sont corrigées malgré la recommandation initiale de ne changer que son maillage. Le comparatif salarié garde une analyse de coût utile ; le retrait aveugle de toute information tarifaire n'aiderait pas le lecteur.

La PR 161 reste en brouillon, sans mise en production. Ces mesures portent sur le HTML compilé, pas sur les classements, conversions, citations IA ou Core Web Vitals terrain. La recette visuelle mobile et les interactions navigateur restent non vérifiées en raison de l'accès navigateur restreint. Aucun contournement de la protection de la préversion n'est utilisé.

À collecter : cas réels de transition et d'accompagnement récurrent, périodes et définitions des chiffres, rôle précis d'Iter, témoignages approuvés et autorisations de publication. Pour une fusion du guide tarifs ou des autres guides performants, obtenir d'abord les données GSC par page/requête sur 12 mois, backlinks et conversions. Les contenus fiscaux restent un chantier distinct avec sources officielles et relecture compétente.
