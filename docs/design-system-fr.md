# Charte des gabarits français

La charte est définie dans `app/design-fr.css`, chargée par le layout FR et limitée à `html[lang="fr"]`. Les variables de `globals.css` conservent les couleurs historiques comme valeurs de repli pour EN et ES.

## Règles communes

- Violet principal `#4320c5`, accent chartreuse `#d8ef65`, texte `#20202b`, texte secondaire `#5b5b6b`, fond clair `#f7f7fa`, bordures `#e0dfe8`.
- Space Grotesk pour les titres, DM Sans pour le texte. H1 de 34 à 56 px, H2 de 28 à 36 px, H3 à 20 px. Les questions de FAQ utilisent une taille de 17 px.
- Grille extérieure de 1184 px et gouttières de 20 à 40 px. Les colonnes de lecture de 768 ou 896 px restent intentionnellement plus étroites.
- Espacement des sections de 48 à 80 px. Cartes à rayon de 16 px, boutons à rayon de 10 px et hauteur minimale de 48 px.

## Usage

Les pages commerciales DAF et services finance utilisent `ServiceHero` : fil d’Ariane, catégorie, H1, introduction, actions, mission en bref et navigation de section. Les contenus et ancres sont spécifiques à chaque prestation.

Les autres familles utilisent les mêmes classes sémantiques : `site-hero`, `site-section`, `site-card`, `site-button-primary`, `site-button-secondary` et `site-copy`. `site-hero--inverse` et `site-contact-band` appliquent la variante sombre avec un bouton chartreuse. Une page éditoriale utilise `site-hero-editorial` lorsque son fil d’Ariane est situé avant le hero.

Ne pas ajouter une nouvelle nuance violette, une taille de titre ou un style de bouton propre à une page. Compléter le socle commun lorsqu’un nouveau besoin apparaît. Conserver des gabarits adaptés au rôle de chaque page : article, fiche outil, service et formulaire n’ont pas le même contenu ni la même densité.

## Vérifications

Tester les changements à 390, 768 et 1440 px. Vérifier les débordements, la lisibilité, le menu mobile, les ancres et les FAQ. Contrôler aussi EN et ES lors d’une modification d’un composant partagé.

Les modifications de présentation ne justifient pas de modifier les dates éditoriales, les URL, les métadonnées ou les faits commerciaux. Les formules doivent revenir à la ligne et les tableaux larges rester dans leur conteneur défilant.
