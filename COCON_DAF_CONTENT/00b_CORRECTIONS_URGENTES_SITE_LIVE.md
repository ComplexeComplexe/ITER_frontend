# Corrections Urgentes sur le Site Live (Avant Publication)
**Priorité :** P0 - Bloquant
**À faire avant de publier tout nouveau contenu**

---

## Correction 1 : Supprimer les Liens "Tantes" dans les Pages Mères

L'audit a révélé que les 3 pages mères existantes font des liens vers des pages hors du cocon DAF (DRH externalisé, M&A, Contrôle de gestion, etc.). Ces liens brisent l'étanchéité du silo sémantique et diluent l'autorité vers le pilier.

### Dans le CMS, aller sur chaque page et supprimer les liens suivants :

**Page `/daf-externalise/temps-partage` - Supprimer ces liens :**
- Lien vers "Accompagnement levée de fonds"
- Lien vers "Contrôle de gestion externalisé"
- Lien vers "Prévisionnel de trésorerie"
- Lien vers "DRH externalisé"
- Lien vers "M&A & Due Diligence"

**Page `/daf-externalise/transition` - Supprimer ces liens :**
- Lien vers "Accompagnement levée de fonds"
- Lien vers "Contrôle de gestion externalisé"
- Lien vers "Prévisionnel de trésorerie"
- Lien vers "DRH externalisé"
- Lien vers "M&A & Due Diligence"

**Page `/daf-externalise/metier` - Supprimer ces liens :**
- Lien vers "Accompagnement levée de fonds"
- Lien vers "Contrôle de gestion externalisé"
- Lien vers "Prévisionnel de trésorerie"
- Lien vers "DRH externalisé"
- Lien vers "M&A & Due Diligence"

**Remplacer ces liens par les liens vers les sœurs du cocon :**
- "DAF à temps partagé" → `/daf-externalise/temps-partage`
- "DAF de transition" → `/daf-externalise/transition`
- "métier de DAF" → `/daf-externalise/metier`
- "tarifs du DAF externalisé" → `/daf-externalise/tarifs` (après création)
- "DAF externalisé par secteur" → `/daf-externalise/secteurs` (après création)

---

## Correction 2 : Modifier le H1 de la Page Pilier

**Aller sur `/daf-externalise` dans le CMS et modifier :**

```
H1 actuel  : DAF Externalisé & Directeur Financier Externalisé pour PME et Startups
H1 corrigé : DAF Externalisé pour PME et Startups : votre direction financière
```

---

## Correction 3 : Ajouter un Lien depuis la Homepage

**Aller sur la page d'accueil `/` dans le CMS et ajouter :**

Dans la section "Nos services" ou "Hero", ajouter un lien contextuel :
- Texte du lien (ancre) : "DAF externalisé"
- URL de destination : `/daf-externalise`

---

## Correction 4 : Vérifier les Liens Cassés

La page `/daf-externalise/tarifs` renvoie actuellement une erreur 404. Si la page pilier ou d'autres pages font un lien vers cette URL, soit :
- Supprimer temporairement ces liens jusqu'à la création de la page
- Ou créer la page en priorité (contenu disponible dans `05_MERE_tarifs.md`)

---

## Checklist de Vérification Post-Corrections

Après avoir effectué ces corrections, vérifier dans Google Search Console :
- [ ] Demander la réindexation de `/daf-externalise`
- [ ] Demander la réindexation de `/daf-externalise/temps-partage`
- [ ] Demander la réindexation de `/daf-externalise/transition`
- [ ] Demander la réindexation de `/daf-externalise/metier`
- [ ] Vérifier qu'aucune erreur 404 n'est signalée dans les rapports de couverture
