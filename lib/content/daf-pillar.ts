/**
 * Contenu du pilier FR /daf-externalise — refonte du 3 septembre 2026.
 *
 * Pourquoi un fichier séparé de lib/content/daf.ts : ce dernier alimente le
 * gabarit DafPage partagé par les pages EN et ES ; la refonte du pilier FR
 * change l'ordre, le périmètre et le volume des blocs, sans toucher aux deux
 * autres langues.
 *
 * Diagnostic qui a conduit à la refonte (GSC juin–août 2026) : 7 353
 * impressions, 8 clics, position 21 ; zéro clic sur 1 548 impressions en
 * positions 4 à 10 ; page de 4 391 mots qui définissait cinq fois le DAF
 * externalisé et débordait sur ses propres pages filles (Paris, coût,
 * intérimaire). Cible : une page de vente d'environ 2 700 mots, dans l'ordre
 * des questions d'un dirigeant, qui joue les deux atouts que les concurrents
 * classés n'ont pas — des prix vérifiables et un baromètre propriétaire.
 *
 * Tout chiffre vient de lib/content/facts.ts. Aucun cas client chiffré n'est
 * publié tant que les données validées ne sont pas fournies (règle 4 de
 * facts.ts) : le bloc `cases` reste vide et n'est pas rendu.
 */
import {
  ANNEE_FONDATION,
  CLIENTS_ACCOMPAGNES,
  COUT_DAF_SALARIE,
  DELAIS,
  ECONOMIE_FORMULATION,
  ENGAGEMENT,
  FONDS_LEVES,
  FORMULES,
  REPARTITION_CLIENTS_PAR_FORMULE,
  TRUSTFOLIO_RATING,
  TRUSTFOLIO_REVIEW_COUNT,
} from "@/lib/content/facts";

export const DAF_PILLAR_PATH = "/daf-externalise";
export const DAF_PILLAR_PUBLISHED = "2026-05-17";
export const DAF_PILLAR_MODIFIED = "2026-09-05";
export const DAF_PILLAR_MODIFIED_LABEL = "5 septembre 2026";

export interface PillarMission {
  title: string;
  /** Le livrable concret, pas la promesse. */
  deliverable: string;
  href: string;
  linkLabel: string;
}

export interface PillarStep {
  period: string;
  title: string;
  text: string;
}

export interface PillarSegment {
  title: string;
  trigger: string;
  answer: string;
  href?: string;
  linkLabel?: string;
}

export interface PillarCase {
  sector: string;
  size: string;
  situation: string;
  action: string;
  result: string;
}

export interface PillarFaq {
  question: string;
  /** Peut contenir des liens Markdown `[texte](/chemin)` ; retirés du JSON-LD. */
  answer: string;
}

const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/ | /g, " ");

export const dafPillar = {
  meta: {
    // 56 caractères. Google réécrivait le title précédent en reprenant le H1 :
    // les deux portent désormais la même promesse.
    title: "DAF externalisé PME & startups : tarifs et missions 2026",
    description: `Directeur financier senior 1 à 8 jours par mois, ${fmt(FORMULES[0].prixMin)} à ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT. ${FONDS_LEVES} levés par nos clients, démarrage en ${DELAIS.missionDemarree}, sans durée minimale, préavis de ${ENGAGEMENT.preavisJours} jours.`,
  },
  breadcrumbLabel: "DAF externalisé",

  hero: {
    h1: "DAF externalisé pour PME et startups : une direction financière senior, sans recruter",
    lead: `Un directeur financier expérimenté rejoint votre équipe pour piloter trésorerie, reporting, budget et financement. De ${fmt(FORMULES[0].prixMin)} à ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT par mois selon le périmètre confié ; disponibilité indicative de 1 à 8 jours par mois. Démarrage en ${DELAIS.missionDemarree}, sans durée d'engagement minimale (préavis de ${ENGAGEMENT.preavisJours} jours).`,
    proofs: [
      `${CLIENTS_ACCOMPAGNES} entreprises accompagnées`,
      `${FONDS_LEVES} levés par nos clients depuis ${ANNEE_FONDATION}`,
      `${TRUSTFOLIO_RATING}/5 sur ${TRUSTFOLIO_REVIEW_COUNT} avis Trustfolio`,
      "Paris, Toulouse, Barcelone",
    ],
    cta: "Échanger avec un DAF (appel offert)",
    photo: {
      src: "/images/team/sebastien-doat.webp",
      alt: "Sébastien Doat, associé fondateur et DAF externalisé chez Iter Advisors",
    },
  },

  nav: [
    { id: "comprendre", label: "Définition" },
    { id: "missions", label: "Missions" },
    { id: "methode", label: "90 premiers jours" },
    { id: "pour-qui", label: "Pour qui" },
    { id: "secteurs", label: "Secteurs" },
    { id: "tarifs", label: "Tarifs" },
    { id: "pourquoi-iter", label: "Pourquoi Iter" },
    { id: "villes", label: "Où" },
    { id: "faq", label: "FAQ" },
  ],

  definition: {
    heading: "Un DAF externalisé, c'est quoi ?",
    dfn: "DAF externalisé",
    text: "Un directeur administratif et financier senior qui pilote la finance d'une entreprise sans en être salarié. Il intervient quelques jours par mois, dans la durée ou pour une mission précise, avec les responsabilités d'un DAF interne : trésorerie, reporting, budget, financement, relations investisseurs. On dit aussi directeur financier externalisé, direction financière externalisée ou CFO externalisé ; le [fractional CFO](/fractional-cfo-startups) en est la variante pensée pour les startups financées.",
  },

  missions: {
    heading: "Ce qu'un DAF externalisé fait chez vous",
    intro: "Cinq chantiers reviennent dans la quasi-totalité des missions. Pour chacun, ce que vous recevez concrètement.",
    items: [
      {
        title: "Trésorerie et prévisionnel",
        deliverable: "Un prévisionnel de trésorerie à 13 semaines tenu chaque semaine, le suivi du cash et de la dette, la relation avec vos banques.",
        href: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",
        linkLabel: "Calculer son cash burn et son runway",
      },
      {
        title: "Reporting et pilotage",
        deliverable: "Un reporting mensuel P&L, cash et KPI lisible par le dirigeant et le board, et une revue finance mensuelle pour décider.",
        href: "/services/controle-de-gestion-externalise",
        linkLabel: "Le contrôle de gestion externalisé",
      },
      {
        title: "Budget et business plan",
        deliverable: "Un budget annuel, un business plan à 3 ou 5 ans avec ses scénarios, et des hypothèses défendables devant un investisseur.",
        href: "/ressources/blog/organiser-sa-direction-financiere",
        linkLabel: "Organiser sa direction financière",
      },
      {
        title: "Financement",
        deliverable: "Dossier, modèle financier, data room et pilotage de la due diligence pour une levée de fonds ou une dette non dilutive.",
        href: "/services/accompagnement-levee-de-fond",
        linkLabel: "L'accompagnement en levée de fonds",
      },
      {
        title: "M&A et structuration",
        deliverable: "Due diligence, valorisation et intégration côté acquéreur ou cédant ; comptabilité analytique et outils quand la fonction finance doit grandir.",
        href: "/services/ma-due-diligence",
        linkLabel: "M&A et due diligence",
      },
    ] satisfies PillarMission[],
  },

  /** Rendu uniquement quand des cas validés par écrit sont fournis (règle 4). */
  cases: [] as PillarCase[],

  method: {
    heading: "Les 90 premiers jours d'une mission",
    intro: `Du premier échange au démarrage effectif, comptez ${DELAIS.missionDemarree}. Ensuite, la mission suit un déroulé que nous appliquons à chaque client.`,
    steps: [
      {
        period: "Semaines 1 et 2",
        title: "Diagnostic et cadrage écrit",
        text: "Revue du cash, de la dette, du reporting existant, des outils et des process. Le cadrage écrit fixe le périmètre, les livrables, le rythme d'intervention et vos interlocuteurs.",
      },
      {
        period: "Mois 1",
        title: "Des chiffres fiables",
        text: "Prévisionnel de trésorerie à 13 semaines, premier reporting mensuel P&L, cash et KPI, revue finance avec le dirigeant. Vous savez ce qui est produit, quand, et par qui.",
      },
      {
        period: "Mois 2",
        title: "Piloter",
        text: "Budget ou business plan selon votre stade, reporting investisseurs ou board, et suppression des tâches manuelles qui font perdre du temps à l'équipe.",
      },
      {
        period: "Mois 3",
        title: "Le chantier structurant",
        text: "Selon la formule : préparation d'une levée ou d'une dette non dilutive, automatisation du reporting, due diligence, internationalisation ou structuration post-levée.",
      },
    ] satisfies PillarStep[],
    note: "Le DAF affecté reste le même tout au long de la mission. Un associé relit le travail et assure le relais en cas d'indisponibilité.",
  },

  forWhom: {
    heading: "Un DAF externalisé pour votre PME ou votre startup",
    intro: "Le bon moment n'est pas une question de chiffre d'affaires mais de complexité : une levée, un board à informer, plusieurs entités, des recrutements à anticiper en trésorerie.",
    segments: [
      {
        title: "PME établie, sans levée de fonds",
        trigger: "La trésorerie varie malgré un carnet de commandes rempli, les marges par activité sont difficiles à lire ou un investissement doit être financé.",
        answer: "Le DAF organise un prévisionnel de trésorerie, un reporting de marge, un budget et les échanges avec les banques. Il coordonne le pilotage avec votre expert-comptable. La formule dépend du périmètre et de la complexité, sans condition de financement par des investisseurs.",
        href: "/ressources/cas-clients/opti-digital-structuration-financement",
        linkLabel: "Voir une mission de structuration de PME",
      },
      {
        title: FORMULES[0].cible,
        trigger: "Première levée à préparer, runway à suivre de près, besoin d'un interlocuteur senior face aux investisseurs.",
        answer: `Formule ${FORMULES[0].nom}, ${FORMULES[0].volumeIndicatif} en moyenne : ${FORMULES[0].inclus}`,
      },
      {
        title: FORMULES[1].cible,
        trigger: "Trésorerie plus complexe, reporting investisseurs trimestriel, prochain tour ou dette non dilutive à structurer.",
        answer: `Formule ${FORMULES[1].nom}, ${FORMULES[1].volumeIndicatif} en moyenne : ${FORMULES[1].inclus}`,
      },
      {
        title: `${FORMULES[2].cible}, PME multi-entités`,
        trigger: "Opérations de M&A, gouvernance et board, consolidation, internationalisation, data finance.",
        answer: `Formule ${FORMULES[2].nom}, ${FORMULES[2].volumeIndicatif} en moyenne : ${FORMULES[2].inclus}`,
      },
      {
        title: "ETI ou PME dont le DAF est parti",
        trigger: "Départ du directeur financier, restructuration, intégration post-acquisition.",
        answer: `Un DAF de transition intervient sous ${DELAIS.transitionUrgent}, à temps plein ou presque, jusqu'au recrutement ou à la fin de l'opération.`,
        href: "/daf-externalise/transition",
        linkLabel: "Le DAF de transition",
      },
    ] satisfies PillarSegment[],
    sectors: {
      heading: "Par secteur, les chantiers ne sont pas les mêmes",
      items: [
        {
          title: "SaaS et logiciel",
          text: "MRR, churn, CAC et marge brute par cohorte : le reporting doit parler la langue des investisseurs, et le prévisionnel suivre les cycles de facturation annuels.",
          href: "/fractional-cfo-startups",
          linkLabel: "DAF externalisé pour les startups et SaaS",
        },
        {
          title: "Deep-tech",
          text: "Financements non dilutifs, crédit d'impôt recherche, subventions et jalons techniques : la trésorerie se pilote au rythme des programmes, pas du chiffre d'affaires.",
          href: "/daf-externalise/deep-tech",
          linkLabel: "DAF externalisé pour la deep-tech",
        },
        {
          title: "E-commerce et retail",
          text: "Stocks, BFR saisonnier, marges par canal et coûts d'acquisition : le sujet est le cash immobilisé, et sa rotation.",
          href: "/daf-externalise/ecommerce",
          linkLabel: "DAF externalisé pour le e-commerce",
        },
        {
          title: "Industrie et services",
          text: "Coûts de revient, affaires et projets, investissements et financement bancaire : comptabilité analytique et dialogue avec les banques au premier plan.",
          href: "/daf-externalise/industrie",
          linkLabel: "DAF externalisé pour l'industrie",
        },
      ],
    },
  },

  cabinet: {
    heading: "Un cabinet plutôt qu'un indépendant : ce que ça change",
    points: [
      {
        title: "La continuité",
        text: "Si votre DAF est indisponible, un autre membre de l'équipe prend le relais avec l'historique du dossier. Un indépendant seul, c'est un point de défaillance unique.",
      },
      {
        title: "La relecture",
        text: "Les livrables sensibles (business plan, dossier de levée, due diligence) sont relus par un associé avant d'être présentés à un tiers.",
      },
      {
        title: "Les spécialistes",
        text: "Fiscalité franco-espagnole, M&A, structuration de levée, automatisation et IA : l'équipe couvre ce qui sort du périmètre d'un DAF généraliste, sans changer d'interlocuteur.",
      },
      {
        title: "Le cadre",
        text: "Cadrage écrit, retainer mensuel sans dépassement facturé sans avenant signé, résiliation avec un préavis de 30 jours : le contrat protège les deux parties.",
      },
    ],
  },

  pricing: {
    heading: "Tarifs 2026 : trois formules, un retainer mensuel",
    intro: `De ${fmt(FORMULES[0].prixMin)} à ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT par mois selon le profil engagé et le périmètre confié. Nous ne facturons pas à l'heure : le retainer couvre un périmètre de travail défini au cadrage, revu avec vous. Le volume de jours indiqué est une moyenne d'intervention observée, pas un forfait.`,
    tiers: FORMULES.map((f) => ({
      name: f.nom,
      volume: f.volumeIndicatif,
      price: `${fmt(f.prixMin)} à ${fmt(f.prixMax)} € HT/mois`,
      audience: f.cible,
      profile: f.profil,
    })),
    barometer: {
      heading: "Ce que nos clients paient réellement",
      text: REPARTITION_CLIENTS_PAR_FORMULE.formulation,
    },
    economy: `${ECONOMIE_FORMULATION} Notre référence : un directeur financier salarié de séniorité équivalente représente un ${COUT_DAF_SALARIE.base} de ${fmt(COUT_DAF_SALARIE.min)} à ${fmt(COUT_DAF_SALARIE.max)} € par an, hors coût de recrutement et de vacance de poste, en France comme en Espagne.`,
    engagement: ENGAGEMENT.formulation,
    link: { href: "/daf-externalise/tarifs", label: "Ce qui est inclus dans chaque formule et comment se construit un devis" },
  },

  why: {
    heading: "Pourquoi Iter Advisors",
    points: [
      {
        title: "Un DAF dédié, qui reste",
        text: "Le même directeur financier tout au long de la mission : c'est lui qui connaît votre historique. Le cabinet assure le relais en cas d'indisponibilité.",
      },
      {
        title: "Des associés qui interviennent",
        text: "Les associés relisent les missions et interviennent eux-mêmes sur les sujets structurants : levée, M&A, fiscalité franco-espagnole.",
      },
      {
        title: "France et Espagne",
        text: "Des équipes à Paris et Barcelone, habituées aux environnements financiers français et espagnol. À Toulouse, les missions sont pilotées à distance, avec des déplacements convenus au cadrage.",
      },
      {
        title: "Des outils modernes, sans dogme",
        text: "Automatisation et IA déployées là où elles sont rentables, après avoir fiabilisé les données. Notre méthode est documentée dans le [hub IA & Finance](/ressources/ia-finance).",
      },
    ],
    // Témoignage vérifié sur Trustfolio (profil public du cabinet).
    quote: {
      text: "Nous collaborons avec Iter Advisors depuis 5 ans, et cette relation s'est révélée être un véritable atout stratégique. Bien au-delà d'un simple DAF externalisé, leurs équipes nous ont accompagnés sur des sujets structurants : migration ERP, structuration de la fonction finance, sujets légaux et fiscaux complexes, financement non dilutif. J'apprécie particulièrement leur capacité à nous challenger et à éclairer nos décisions stratégiques.",
      author: "Magali Quentel-Reme",
      role: "CEO et co-fondatrice, Opti Digital",
      sourceUrl: "https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc",
      sourceLabel: "Avis vérifié sur Trustfolio",
    },
    casesLink: { href: "/ressources/cas-clients", label: "Voir nos cas clients" },
  },

  experts: {
    heading: "Qui intervient chez vous",
    intro: "Les associés interviennent eux-mêmes sur les missions stratégiques et supervisent l'ensemble des engagements.",
    slugs: ["sebastien-doat", "florent-greth"],
  },

  cities: {
    heading: "Où nous intervenons",
    text: "Sur site ou à distance, le rythme de présence est défini au cadrage. Nos équipes sont basées à Paris et Barcelone ; nous accompagnons aussi les entreprises toulousaines à distance et sur site selon accord :",
    items: [
      { label: "DAF externalisé à Paris", href: "/daf-externalise-paris" },
      { label: "DAF externalisé à Toulouse", href: "/daf-externalise-toulouse" },
      { label: "DAF externalisé à Barcelone", href: "/daf-externalise-barcelone" },
    ],
  },

  faq: [
    {
      question: "Combien coûte un DAF externalisé ?",
      answer: `Entre ${fmt(FORMULES[0].prixMin)} et ${fmt(FORMULES[FORMULES.length - 1].prixMax)} € HT par mois selon la formule, en retainer mensuel, jamais à l'heure. ${REPARTITION_CLIENTS_PAR_FORMULE.formulation} Le détail de ce qui est inclus est sur la [grille tarifaire](/daf-externalise/tarifs).`,
    },
    {
      question: "En combien de temps la mission démarre-t-elle ?",
      answer: `Du premier échange au démarrage effectif, comptez ${DELAIS.missionDemarree} : qualification sous ${DELAIS.qualification}, profil présenté sous ${DELAIS.profilPresente}, contrat signé sous ${DELAIS.contratSigne}. Les premiers livrables arrivent ${DELAIS.premiersLivrables}.`,
    },
    {
      question: "Y a-t-il une durée d'engagement ?",
      answer: `Non. ${ENGAGEMENT.formulation} L'engagement porte sur un périmètre de travail, revu avec vous quand votre activité change.`,
    },
    {
      question: "À partir de quelle taille d'entreprise un DAF externalisé a-t-il du sens ?",
      answer: `Il n'y a pas de seuil de chiffre d'affaires. Le déclencheur est la complexité : une levée à préparer, un board ou des investisseurs à informer, plusieurs entités, des recrutements à anticiper en trésorerie. Nos plus petits clients sont des ${FORMULES[0].cible.toLowerCase()} ; les plus grands, des groupes en série B et au-delà.`,
    },
    {
      question: "Un DAF externalisé peut-il travailler à distance ?",
      answer: "Oui. La plupart des missions combinent des journées sur site, notamment au démarrage et pour les comités, et du travail à distance sur des outils partagés. Le rythme de présence est fixé au cadrage. Nos équipes sont basées à Paris et Barcelone. À Toulouse, nous intervenons à distance, avec des visites convenues au cadrage ; aucun consultant n’y réside actuellement.",
    },
    {
      question: "Quelle différence avec un expert-comptable ?",
      answer: "Ils sont complémentaires, pas substituables. L'expert-comptable produit et sécurise l'information comptable et fiscale selon sa lettre de mission ; le DAF externalisé s'en sert pour piloter : prévisionnel, reporting de gestion, marges, financement. Une PME structurée a typiquement les deux. Voir [DAF externalisé ou expert-comptable](/ressources/blog/daf-externalise-vs-expert-comptable).",
    },
    {
      question: "Quelle différence avec un DAF intérimaire ou de transition ?",
      answer: `Le DAF externalisé intervient quelques jours par mois, dans la durée. Le [DAF de transition](/daf-externalise/transition) intervient à temps plein ou presque, sous ${DELAIS.transitionUrgent}, pour une période définie : départ du DAF, restructuration, intégration. Le comparatif détaillé est dans [DAF externalisé ou DAF intérimaire](/ressources/blog/daf-externalise-vs-daf-interimaire).`,
    },
    {
      question: "Quelle différence avec un DAF salarié ?",
      answer: `Le coût, le délai et l'engagement. Un DAF salarié représente un ${COUT_DAF_SALARIE.base} de ${fmt(COUT_DAF_SALARIE.min)} à ${fmt(COUT_DAF_SALARIE.max)} € par an et plusieurs mois de recrutement ; un DAF externalisé démarre à ${fmt(FORMULES[0].prixMin)} € HT par mois, en ${DELAIS.missionDemarree}, sans durée minimale. Le recrutement se justifie quand le besoin devient un temps plein durable. Voir [DAF externalisé ou DAF salarié](/ressources/blog/daf-externalise-vs-daf-salarie).`,
    },
  ] satisfies PillarFaq[],

  resources: {
    heading: "Aller plus loin",
    items: [
      { label: "La direction financière à temps partagé, quelques jours par mois", href: "/daf-externalise/temps-partage" },
      { label: "Le DAF de transition, quand le poste est vacant", href: "/daf-externalise/transition" },
      { label: "Notre grille tarifaire détaillée", href: "/daf-externalise/tarifs" },
      { label: "Externaliser ou recruter son directeur financier", href: "/ressources/blog/daf-externalise-vs-daf-salarie" },
      { label: "Cinq critères pour choisir son cabinet", href: "/ressources/blog/choisir-cabinet-daf-externalise" },
    ],
  },
} as const;

export type DafPillarContent = typeof dafPillar;
