# Logo et préférences de cookies

La vignette générique affichait le logo noir accompagné d'un sous-titre financier français. Les métadonnées FR, EN et ES utilisent désormais le logo exact du header, blanc sur le violet #4320c5, sans slogan. Le graphe Organization et les publishers utilisent la même identité en format carré. Les anciens fichiers restent accessibles avec le visuel corrigé. Les couvertures spécifiques d'articles sont conservées.

Le générateur `scripts/build-brand-images.mjs` réutilise les contours du fichier source existant. Il produit les formats 1200 × 630 et 512 × 512. Il ne redessine pas la marque. Google choisit ses illustrations : ces déclarations ne garantissent pas le remplacement immédiat de la miniature dans les résultats.

La bannière initiale dispose d'une croix. Fermer la bannière ou les préférences à la première visite mémorise uniquement les cookies nécessaires. La croix, le fond de la modale et Échap ferment les préférences. Un brouillon non enregistré ne modifie pas un choix précédent. Les actions restent visibles dans une zone fixe, seul le contenu des catégories défile. La position des interrupteurs est explicite. Le focus reste dans le dialogue et le défilement de la page est temporairement bloqué.

Le bouton de la politique cookies ouvre le dialogue par un événement local, sans supprimer le consentement et sans recharger la page. Les traductions FR, EN et ES sont partagées par le même composant. Aucun suivi facultatif n'est autorisé par une simple fermeture. Un stockage navigateur bloqué ne peut pas mémoriser le choix entre visites, mais le choix reste effectif dans la visite courante.

Validation : compilation, TypeScript, indexabilité de 274 URL du sitemap, lint sans erreur, suite de 164 tests initialement passée et 11 tests ciblés après ajout de la croix. Vérification visuelle et fonctionnelle locale : trois langues, quatre tailles (1440 × 900, 390 × 844, 390 × 568, 844 × 390), 12 scénarios réussis. La suite complète et le pipeline SEO sont exécutés de nouveau sur le commit final par la CI.
