/**
 * Source de vérité éditoriale — chiffres et promesses publiables d'Iter Advisors.
 *
 * Toute valeur chiffrée publiée sur le site vient d'ici ou de la présentation
 * Iter Advisors 2026. Aucune autre source n'est autorisée.
 *
 * Arbitré par Sébastien Doat le 10 août 2026 (questionnaire de validation).
 * Ce que le site publiait avant cet arbitrage : huit fourchettes d'économie,
 * quatre coûts de DAF salarié, quatre promesses de délai et trois régimes
 * d'engagement, selon la page.
 *
 * ── Règles de publication ────────────────────────────────────────────────
 *  1. Le mot « garanti » n'est employé sur aucun délai.
 *  2. « Sans engagement » n'est publiable que si le préavis figure dans la
 *     même phrase.
 *  3. Aucune promesse de démarrage sous 7 jours, DAF de transition compris.
 *  4. Aucun cas client publié sans accord écrit, période de mesure et base de
 *     comparaison.
 *  5. Les tarifs de partenaires et de concurrents sont datés à chaque
 *     publication et revérifiés tous les six mois.
 *  6. Le volume de jours est une moyenne d'intervention observée, jamais un
 *     forfait contractuel : l'engagement porte sur un scope de travail.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ── Identité ──────────────────────────────────────────────────────────── */

/**
 * Année de création du cabinet.
 *
 * Le site annonçait aussi « depuis 2019 » à six endroits, dont le
 * `foundingDate` du balisage Organization : il affirmait donc avoir accompagné
 * des clients deux ans avant sa création.
 */
export const ANNEE_FONDATION = 2021;

/** Note Trustfolio, sur 5. */
export const TRUSTFOLIO_RATING = "5";

/**
 * Avis Trustfolio vérifiés. Le site en annonçait aussi 35 et 36.
 * À remonter dès que Trustfolio en enregistre de nouveaux.
 */
export const TRUSTFOLIO_REVIEW_COUNT = 31;

/** Entreprises accompagnées depuis la création. Le site annonçait aussi « +100 ». */
export const CLIENTS_ACCOMPAGNES = 85;

/** Montant levé par les clients accompagnés, formaté. */
export const FONDS_LEVES = "100 M€";

/** Bureaux. Barcelone est le siège du cabinet, pas une antenne. */
export const BUREAUX = ["Barcelone", "Paris", "Toulouse"] as const;

/* ── Tarifs ────────────────────────────────────────────────────────────── */

/**
 * Prix d'entrée d'une mission DAF — formule Essentiel (STARTER).
 *
 * Les mentions « à partir de 2 000 € » (grille du pilier) et « à partir de
 * 4 500 € » (/fractional-cfo-startups) sont retirées du site.
 */
export const PRIX_ENTREE_HT_MOIS = 3000;

/**
 * Grille officielle — source unique pour toutes les pages commerciales.
 *
 * `volumeIndicatif` est une moyenne observée, pas un forfait : Iter s'engage
 * sur un scope de travail, revu et ajusté selon les besoins. Le prix suit le
 * profil engagé (Finance Manager, CFO senior, CFO senior + analyste), pas un
 * décompte d'heures.
 *
 * Variation : complexité (multi-entités, multi-devises, consolidation, stack à
 * reconstruire) → haut de fourchette. Événement structurant (levée, dette non
 * dilutive, M&A, audit défensif) → formule supérieure ou mission projet en
 * complément. Chaque entité consolidée supplémentaire est chiffrée au cadrage.
 * Facturation en retainer mensuel, jamais à l'heure, aucun dépassement facturé
 * sans avenant signé.
 */
export const VOLUME_DAF_JOURS_MOIS = { min: 1, max: 8 } as const;

export const FORMULES = [
  {
    nom: "Essentiel",
    codeInterne: "STARTER",
    volumeIndicatif: `${VOLUME_DAF_JOURS_MOIS.min} à 2 jours par mois`,
    prixMin: 3000,
    prixMax: 5000,
    cible: "Startups en Seed, moins de 30 collaborateurs",
    inclus:
      "Reporting mensuel P&L, cash et KPIs, prévisionnel de trésorerie 13 semaines, revue finance mensuelle avec le dirigeant, support ad hoc.",
    profil: "CFO ou Finance Manager senior dédié, peer review par un associé.",
  },
  {
    nom: "Croissance",
    codeInterne: "GROWTH",
    volumeIndicatif: "3 à 5 jours par mois",
    prixMin: 5000,
    prixMax: 6500,
    cible: "Série A, 30 à 100 collaborateurs",
    inclus:
      "Scope Essentiel, plus business plan 3 à 5 ans, levée de fonds, dette non dilutive, structuration post-levée et reporting investisseurs.",
    profil: "CFO senior dédié.",
  },
  {
    nom: "Premium",
    codeInterne: "SCALE",
    volumeIndicatif: `5 à ${VOLUME_DAF_JOURS_MOIS.max} jours par mois`,
    prixMin: 6500,
    prixMax: 8000,
    cible: "Série B et au-delà",
    inclus:
      "Scope Croissance, plus M&A et due diligence, board et gouvernance, internationalisation, data et BI finance.",
    profil: "CFO senior dédié et analyste financier.",
  },
] as const;

/**
 * Fractional CFO startup — un positionnement, PAS une quatrième formule.
 *
 * L'entrée se fait par Essentiel ou Croissance selon le stade :
 * /fractional-cfo-startups ne doit plus afficher de grille distincte.
 */
export const FRACTIONAL_CFO_FOURCHETTE = { min: 3000, max: 6500 } as const;

/** Missions ponctuelles, hors retainer — annoncées « sur devis ». */
export const MISSIONS_PONCTUELLES = [
  { nom: "Préparation de levée", min: 15000, max: 40000, unite: "projet" },
  { nom: "Audit défensif / VDD", min: 20000, max: 60000, unite: "projet" },
  { nom: "Audit finance one-shot", min: 10000, max: 25000, unite: "projet" },
  { nom: "DAF de transition", min: 8000, max: 12000, unite: "mois" },
  { nom: "Intégration Pennylane", min: 8000, max: 25000, unite: "projet" },
] as const;

/**
 * Coût de référence d'un DAF salarié — dénominateur de toute comparaison.
 *
 * Base : coût employeur complet, part patronale incluse, package complet
 * (variable, avantages, BSPCE ou equity quand ils font partie de la
 * rémunération d'un profil de séniorité équivalente). France et Espagne.
 *
 * HORS périmètre : coût de recrutement, onboarding, risque de vacance de
 * poste. Ces éléments s'évoquent qualitativement, jamais dans le chiffre.
 *
 * Toute page affichant 90-150 k€, 80-150 k€ ou 95-110 k€ est alignée ici, avec
 * la mention explicite « coût employeur chargé ».
 */
export const COUT_DAF_SALARIE = {
  min: 100000,
  max: 213000,
  median: 150000,
  base: "coût employeur chargé",
} as const;

/**
 * Économie annoncée — fourchette unique.
 *
 * Hypothèse : coût employeur médian de 150 000 €/an comparé au retainer Iter
 * annualisé, soit 36 000 à 96 000 € HT selon la formule. Sur ces bases,
 * l'économie calculée va de 36 % (Premium) à 76 % (Essentiel) ; la fourchette
 * publiée est volontairement conservatrice.
 *
 * ⚠ Point de vigilance acté : comparée au bas de fourchette (100 000 €),
 * l'économie sur Premium tombe sous 10 %. Toute note de méthode doit donc
 * préciser la base médiane.
 *
 * Les sept autres valeurs qui circulaient — 30-50, 50-70, 50-75, 60, 60-70,
 * 60-80 et 60-85 % — sont supprimées.
 */
export const ECONOMIE_VS_SALARIE = { min: 30, max: 60 } as const;

/** Formulation validée, à publier telle quelle plutôt qu'à paraphraser. */
export const ECONOMIE_FORMULATION =
  "Un DAF externalisé Iter Advisors représente 30 à 60 % d'économie par rapport au coût employeur d'un directeur financier salarié de séniorité équivalente, selon le stade de maturité de l'entreprise et le périmètre confié.";

/* ── Délais ────────────────────────────────────────────────────────────── */

/**
 * Parcours du premier contact au démarrage.
 *
 * Remplace « 48 à 72 h » (DAF de transition), « 5 jours » (Fractional CFO),
 * « 7 à 14 jours » et « 1 à 2 semaines » (pilier). Aucune promesse sous 7
 * jours ; le mot « garanti » n'accompagne aucune de ces valeurs.
 */
export const DELAIS = {
  /** À compter de la demande entrante, créneau proposé via agenda en ligne. */
  qualification: "2 jours ouvrés",
  /** Cumulés depuis le premier contact, scope et budget cadrés. */
  profilPresente: "5 jours ouvrés",
  /** Cumulés depuis le premier contact, après validation de la proposition. */
  contratSigne: "8 jours ouvrés",
  /** Bout en bout, du premier échange au démarrage effectif. */
  missionDemarree: "8 à 15 jours",
  /** Pour un reporting mensuel ; au-delà, dépend de la roadmap arrêtée. */
  premiersLivrables: "dès le premier mois d'intervention",
  /** Remplace « 48 à 72 h ». Selon disponibilité du profil et complexité. */
  transitionUrgent: "7 à 10 jours",
  /** Remplace « 5 jours ». Intervention plug and play. */
  fractionalCfo: "8 à 15 jours",
} as const;

/* ── Engagement ────────────────────────────────────────────────────────── */

/**
 * Règle contractuelle unique, toutes offres confondues — DAF externalisé
 * récurrent, temps partagé, fractional CFO, transition, mission ponctuelle.
 *
 * Les mentions de 3 à 6 mois et de 12 à 36 mois sont retirées du site, du
 * référentiel d'offres et des supports commerciaux.
 */
export const ENGAGEMENT = {
  dureeMinimale: null,
  preavisJours: 30,
  /** « Sans engagement » seul n'est pas publiable : le préavis doit suivre. */
  formulation:
    "Sans durée d'engagement minimale, résiliable avec un préavis de 30 jours.",
} as const;

/* ── Baromètre ─────────────────────────────────────────────────────────── */

/**
 * Répartition des clients par niveau de formule, fournie par Guillaume
 * Rostand le 31 août 2026 et arrondie à la dizaine. Observation de
 * portefeuille, pas un engagement : la date d'observation accompagne
 * chaque publication, et la valeur se met à jour ici, nulle part ailleurs.
 */
export const REPARTITION_CLIENTS_PAR_FORMULE = {
  essentielPct: 40,
  croissancePct: 40,
  auDelaPct: 20,
  dateObservation: "2026-09-01",
  formulation:
    "40 % de nos clients sont sur la formule Essentiel (autour de 3 000 € HT par mois), 40 % sur la formule Croissance (autour de 5 000 € HT par mois), 20 % au-delà (formule Premium ou mission de transition). Répartition observée sur notre portefeuille au 1er septembre 2026, arrondie à la dizaine.",
} as const;
