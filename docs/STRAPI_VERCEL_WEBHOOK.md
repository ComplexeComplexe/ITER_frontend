# Déclencher un build Vercel à chaque publication Strapi

Comme le front est en export statique (`output: "export"`), le contenu Strapi est figé au moment du build. Pour que les changements publiés dans Strapi soient visibles en production sans push Git, on peut déclencher un nouveau déploiement Vercel via un **webhook Strapi** qui appelle un **Deploy Hook Vercel**.

## 1. Créer un Deploy Hook sur Vercel

1. Ouvre ton projet sur [vercel.com](https://vercel.com) → **Settings** → **Git**.
2. Descends jusqu’à la section **Deploy Hooks**.
3. **Name** : par ex. `Strapi publish`.
4. **Branch to deploy** : `main` (ou la branche que tu déploies).
5. Clique sur **Create Hook**.
6. Copie l’URL générée (elle ressemble à `https://api.vercel.com/v1/integrations/deploy/...`).  
   **À garder secret** : quiconque avec cette URL peut lancer un build.

## 2. Configurer le webhook dans Strapi

1. Dans l’admin Strapi (Cloud ou self‑hosted), va dans **Settings** (roue dentée) → **Webhooks**.
2. **Create new webhook**.
3. Renseigne :
   - **Name** : `Vercel rebuild on publish`
   - **URL** : colle l’URL du Deploy Hook Vercel.
   - **Headers** : laisser vide (l’URL suffit comme “secret”).
   - **Events** : coche au minimum :
     - `Entry - Publish` (quand tu publies une entrée)
     - éventuellement `Entry - Unpublish` si tu veux aussi rebuild au dépublication.
4. **Save**.

À chaque **Publish** sur une entrée (Homepage, Global, Team Member, article, etc.), Strapi envoie une requête POST vers le Deploy Hook et Vercel lance un nouveau build du front. Les nouveaux contenus seront en ligne une fois le déploiement terminé.

## 3. (Optionnel) Limiter aux content types qui impactent le front

Par défaut, Strapi peut ne proposer qu’un seul set d’événements pour tous les content types. Si tu peux choisir le modèle (selon la version Strapi), restreins si besoin aux types utilisés par le front : **Global**, **Homepage**, **Team Member**, **Blog article**, etc. Sinon, un rebuild à chaque publish (tous types) reste une approche simple et cohérente pour un site statique.

## Références

- [Vercel – Deploy Hooks](https://vercel.com/docs/deployments/deploy-hooks)
- [Strapi – Webhooks](https://docs.strapi.io/dev-docs/backend-customization/webhooks)
