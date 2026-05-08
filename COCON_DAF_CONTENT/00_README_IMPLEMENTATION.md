# Dossier Cocon Sémantique "DAF Externalisé" - Version Implémentable v2
**Mis à jour le :** 8 mai 2026 (post-audit de validation)
**Objectif :** Position #1 sur "DAF externalisé" (480 recherches/mois)
**Site :** iteradvisors.com

---

## ⚠️ Corrections Critiques Issues de l'Audit

L'audit live a identifié 4 problèmes bloquants sur le site en production. Ces corrections sont intégrées dans cette version v2 du dossier.

| Problème | Statut | Correction dans ce dossier |
|---|---|---|
| Erreur 404 sur `/daf-externalise/tarifs` | Bloquant | Contenu complet fourni dans `05_MERE_tarifs.md` |
| Pages mères trop courtes (~500 mots) | Bloquant | Refonte 2 000 mots dans `02`, `03`, `04` |
| Liens vers "tantes" dans les pages mères | Bloquant | Maillage corrigé dans chaque fichier |
| H1 du pilier sur-optimisé (2 mots-clés) | Prioritaire | Correction dans `01_PILLAR` |

---

## Structure du Dossier

```
00_README_IMPLEMENTATION.md     ← Ce fichier (lire en premier)
01_PILLAR_daf-externalise.md    ← Corrections pilier (H1, maillage)
02_MERE_temps-partage.md        ← Refonte 2 000 mots
03_MERE_transition.md           ← Refonte 2 000 mots
04_MERE_metier.md               ← Refonte 2 000 mots
05_MERE_tarifs.md               ← Nouvelle page (2 000 mots)
06_MERE_secteurs.md             ← Nouvelle page hub (700 mots)
07_FILLE_salaire-daf.md         ← Nouvel article blog (1 800 mots)
08_FILLE_daf-temps-partage-fonctionnement.md  ← Nouvel article (1 600 mots)
09_FILLE_tarif-daf-temps-partage.md           ← Nouvel article (1 500 mots)
10_FILLE_daf-transition-quand.md              ← Nouvel article (1 500 mots)
11_FILLE_competences-daf.md                   ← Nouvel article (1 500 mots)
12_GLOSSAIRE_bfr.md             ← Nouvelle entrée glossaire (600 mots)
13_GLOSSAIRE_ebitda.md          ← Nouvelle entrée glossaire (600 mots)
14_GLOSSAIRE_cfo.md             ← Nouvelle entrée glossaire (500 mots)
```

---

## Ordre de Déploiement Strict

L'ordre de publication est critique. Ne jamais publier une page fille avant sa mère.

```
SEMAINE 1 (Fondations)
├── Étape 1 : Corriger le H1 et le maillage du PILLAR /daf-externalise
├── Étape 2 : Supprimer les liens "tantes" dans les 3 pages mères existantes
└── Étape 3 : Créer et publier la page /daf-externalise/tarifs

SEMAINE 2 (Refonte des mères)
├── Étape 4 : Remplacer le contenu de /daf-externalise/temps-partage
├── Étape 5 : Remplacer le contenu de /daf-externalise/transition
└── Étape 6 : Remplacer le contenu de /daf-externalise/metier

SEMAINE 3 (Autorité)
├── Étape 7 : Créer /ressources/glossaire/bfr
├── Étape 8 : Créer /ressources/glossaire/ebitda
└── Étape 9 : Créer /ressources/glossaire/cfo

SEMAINE 4 (Filles - Branche Métier)
├── Étape 10 : Créer /ressources/blog/salaire-daf-2026
└── Étape 11 : Créer /ressources/blog/competences-daf

SEMAINE 5 (Filles - Branche Temps Partagé)
├── Étape 12 : Créer /ressources/blog/daf-temps-partage-fonctionnement
└── Étape 13 : Créer /ressources/blog/tarif-daf-temps-partage

SEMAINE 6 (Filles - Branche Transition)
└── Étape 14 : Créer /ressources/blog/daf-transition-quand

SEMAINE 7 (Finalisation)
├── Étape 15 : Créer /daf-externalise/secteurs
└── Étape 16 : Audit de maillage global (vérifier tous les liens)
```

---

## Règles de Maillage Interne (Rappel Strict)

### Ce que chaque type de page doit faire

**Page Pilier (`/daf-externalise`) :**
- Linke vers : les 6 pages mères (N1) avec ancres exactes
- Ne linke PAS vers : les pages filles (N2) directement, les pages hors cocon

**Pages Mères (N1) :**
- Linkent vers : le pilier (1 lien) + leurs filles (N2) + leurs 5 sœurs (N1)
- Ne linkent PAS vers : les services hors cocon (DRH, M&A, comptabilité), les filles d'autres branches

**Pages Filles (N2) :**
- Linkent vers : leur mère (1 lien) + leurs 2-3 sœurs (N2 même branche)
- Ne linkent PAS vers : le pilier directement, les filles d'autres branches

**Glossaire :**
- Linke vers : le pilier (1 lien) + autres entrées glossaire connexes
- Ne linke PAS vers : les pages mères ou filles

### Tableau des Ancres Exactes à Utiliser

| Destination | Ancre EXACTE à utiliser |
|---|---|
| `/daf-externalise` | "DAF externalisé" |
| `/daf-externalise/temps-partage` | "DAF à temps partagé" |
| `/daf-externalise/transition` | "DAF de transition" |
| `/daf-externalise/metier` | "métier de DAF" |
| `/daf-externalise/tarifs` | "tarifs du DAF externalisé" |
| `/daf-externalise/secteurs` | "DAF externalisé par secteur" |
| `/daf-externalise/locaux` | "DAF externalisé près de chez vous" |
| `/ressources/blog/salaire-daf-2026` | "salaire d'un DAF" |
| `/ressources/blog/daf-temps-partage-fonctionnement` | "fonctionnement du DAF à temps partagé" |
| `/ressources/blog/tarif-daf-temps-partage` | "tarif du DAF à temps partagé" |
| `/ressources/blog/daf-transition-quand` | "quand recruter un DAF de transition" |
| `/ressources/blog/competences-daf` | "compétences d'un DAF" |
| `/ressources/glossaire/bfr` | "BFR (besoin en fonds de roulement)" |
| `/ressources/glossaire/ebitda` | "EBITDA" |
| `/ressources/glossaire/cfo` | "CFO" |

---

## Checklist de Validation Avant Publication (par page)

Avant de publier chaque page, vérifier :

- [ ] URL correcte (pas de majuscules, pas d'espaces)
- [ ] Title entre 50 et 60 caractères
- [ ] H1 unique sur le site, contient le mot-clé principal
- [ ] Meta Description entre 140 et 160 caractères
- [ ] Contenu > 1 200 mots (pages filles) ou > 1 800 mots (pages mères)
- [ ] Mot-clé principal dans le premier paragraphe
- [ ] Liens sortants vers la mère (ou le pilier) avec ancre exacte
- [ ] Liens sortants vers les sœurs avec ancres exactes
- [ ] Aucun lien vers les "tantes" (pages hors du silo)
- [ ] CTA présent (bouton "Prendre rendez-vous" ou "Échanger avec un DAF")
- [ ] Demander l'indexation dans Google Search Console après publication
