/**
 * Fallback content for service pages when Strapi is unavailable
 * Used to display pages with local illustrations and basic content
 */

import type { StrapiServiceSinglePage } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";

// ── Routing constants (kept here so service pages don't import lib/strapi) ──

export const SERVICE_PAGE_SLUGS = [
  "previsionnel-tresorerie",
  "gestion-financiere-externalisee",
  "accompagnement-levee-de-fond",
  "comptabilite-externalisation",
  "controle-de-gestion-externalise",
] as const;

export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[number];

/** URL slug per locale (FR = canonical; EN/ES = localized slugs) */
export const SERVICE_URL_SLUG_BY_LOCALE: Record<Locale, Record<ServicePageSlug, string>> = {
  fr: {
    "previsionnel-tresorerie": "previsionnel-tresorerie",
    "gestion-financiere-externalisee": "gestion-financiere-externalisee",
    "accompagnement-levee-de-fond": "accompagnement-levee-de-fond",
    "comptabilite-externalisation": "comptabilite-externalisation",
    "controle-de-gestion-externalise": "controle-de-gestion-externalise",
  },
  en: {
    "previsionnel-tresorerie": "cash-flow-forecast",
    "gestion-financiere-externalisee": "outsourced-financial-management",
    "accompagnement-levee-de-fond": "fund-raising-support",
    "comptabilite-externalisation": "outsource-your-accounting",
    "controle-de-gestion-externalise": "outsourced-management-control",
  },
  es: {
    "previsionnel-tresorerie": "prevision-tesoreria",
    "gestion-financiere-externalisee": "gestion-financiera-externalizada",
    "accompagnement-levee-de-fond": "soporte-financiacion",
    "comptabilite-externalisation": "externalizar-contabilidad",
    "controle-de-gestion-externalise": "control-gestion-externalizado",
  },
};

/** List of URL slugs for generateStaticParams for a given locale. */
export function getServiceSlugsForLocale(locale: Locale): string[] {
  return SERVICE_PAGE_SLUGS.map((s) => SERVICE_URL_SLUG_BY_LOCALE[locale][s]);
}

export const fallbackServicePages: Record<string, StrapiServiceSinglePage> = {
  "previsionnel-tresorerie": {
    heroTitle: "Prévisionnel de Trésorerie",
    heroSubtitle: "Modèle Glissant 13 Semaines - Anticipez vos besoins de cash",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Construisez un prévisionnel de trésorerie robuste pour anticiper les tensions de cash, optimiser votre BFR et sécuriser votre runway financier.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Pourquoi un prévisionnel de trésorerie ?",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Identifier les périodes de tension de trésorerie",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Optimiser votre besoin en fonds de roulement (BFR)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Planifier vos besoins de financement",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Pilotage mensuel de votre trésorerie",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Notre équipe vous aide à mettre en place et suivre un prévisionnel de trésorerie glissant sur 13 semaines, adapté à votre secteur d'activité.",
          },
        ],
      },
    ],
    faq: [
      {
        id: 1,
        question: "Quel est le délai pour mettre en place un prévisionnel ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "En général, 2 à 3 semaines pour définir la structure et les hypothèses, puis 1 à 2 semaines pour l'intégration dans votre système.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },

  "gestion-financiere-externalisee": {
    heroTitle: "Gestion Financière Externalisée",
    heroSubtitle: "Une direction financière à la carte, adaptée à la taille et aux enjeux de votre entreprise",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "La gestion financière externalisée est devenue un levier incontournable pour les entreprises souhaitant mieux maîtriser leurs finances tout en se concentrant sur leur activité principale. Concrètement, il s'agit de confier à un expert externe tout ou partie des fonctions financières, du suivi de la trésorerie au reporting en passant par le contrôle de gestion.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Que vous soyez une startup, une PME ou une ETI, cette approche offre de nombreux avantages stratégiques : réduction des coûts fixes, accès à des compétences spécialisées et amélioration des processus financiers. Vous bénéficiez ainsi d'un accompagnement sur mesure pour piloter la santé financière de votre entreprise, sans les contraintes d'un recrutement en interne.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Qu'est-ce que la gestion financière externalisée ?",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "La gestion financière externalisée consiste à déléguer la gestion de tout ou partie des fonctions financières à un prestataire externe, souvent un consultant en gestion financière ou un DAF externalisé. Les services pris en charge peuvent inclure :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "La gestion de la trésorerie : suivi des flux financiers, anticipation des besoins en liquidité",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Le contrôle de gestion : analyse des coûts, gestion des marges et reporting",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "La supervision comptable : coordination avec l'expert-comptable, contrôle des déclarations fiscales et sociales",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'accompagnement stratégique : soutien dans les décisions de financement, levée de fonds, prévisions budgétaires",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les avantages de la gestion financière externalisée",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Expertise et compétences spécialisées",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "L'un des principaux atouts de l'externalisation est l'accès immédiat à des compétences pointues :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse financière avancée : Calcul des marges, gestion des ratios financiers",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Optimisation fiscale : Réduction des charges fiscales et respect des obligations déclaratives",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Gestion des risques : Identification des risques financiers et mise en place de plans correctifs",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Réduction des coûts et flexibilité",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Recruter un DAF en interne représente souvent un coût conséquent. Avec l'externalisation :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Pas de coût de recrutement ou de formation",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Paiement à la mission : généralement entre 1 500 € et 5 000 € par mois selon l'étendue de la prestation",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Une flexibilité totale : le nombre de jours d'intervention peut être ajusté en fonction de vos besoins",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Amélioration des processus financiers",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Un expert externe apporte non seulement ses compétences techniques mais aussi des solutions pour améliorer vos processus internes :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Automatisation des tâches répétitives : facturation, rapprochements bancaires, suivi de trésorerie",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Mise en place d'outils de reporting : tableaux de bord financiers clairs et actionnables",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Optimisation des délais de clôture comptable : réduction des délais de clôture mensuelle et annuelle",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les principaux services proposés",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Gestion de la trésorerie : suivi quotidien, prévisions et gestion des flux financiers",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Contrôle de gestion : mise en place d'indicateurs, analyse des marges, suivi budgétaire",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Reporting financier : tableaux de bord, rapports mensuels et outils d'analyse",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Accompagnement stratégique : structuration financière, préparation des levées de fonds",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Supervision comptable : coordination avec les experts-comptables et validation des clôtures",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Pourquoi choisir Iter Advisors ?",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Iter Advisors propose une approche personnalisée et efficace pour répondre à vos besoins financiers. Nos atouts incluent :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Une expertise sectorielle variée : Plus de 10 ans d'expérience auprès de PME, startups et ETI dans des secteurs comme la tech et les services",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Des outils performants : Nous utilisons des solutions modernes comme Pennylane, Spendesk ou Metabase pour un pilotage en temps réel",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Un accompagnement sur mesure : Que ce soit pour une mission ponctuelle ou un suivi régulier, nos prestations sont adaptées à vos objectifs",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Une coordination fluide : Nous collaborons avec vos équipes internes et vos partenaires comptables pour garantir une gestion optimisée",
              },
            ],
          },
        ],
      },
    ],
    faq: [
      {
        id: 1,
        question: "À partir de combien de jours/mois ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "À partir de 2 jours par mois. Le nombre de jours dépend de votre complexité comptable, nombre de transactions et besoins en reporting.",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        question: "À qui s'adresse la gestion financière externalisée ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Cette solution convient aux PME et ETI en croissance qui souhaitent structurer leurs processus financiers, aux startups en développement pour établir des indicateurs solides avant une levée de fonds, et à toute entreprise souhaitant bénéficier d'une expertise pointue sans coûts de recrutement.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },

  "comptabilite-externalisation": {
    heroTitle: "Externalisation Comptabilité",
    heroSubtitle: "Tenue, Déclarations & Clôture - Migration en 2 semaines",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Externalisez votre comptabilité : tenue des comptes, déclarations fiscales et clôture annuelle. Compatible avec Pennylane, Sage, QuickBooks et tous les logiciels cloud.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Périmètre d'externalisation",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Tenue de comptabilité générale",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Déclarations TVA et fiscales",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Gestion de paie et charges sociales",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Clôture comptable annuelle",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Migration en 2 semaines, sans interruption de service.",
          },
        ],
      },
    ],
    faq: [
      {
        id: 1,
        question: "Quel est le délai de migration ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Environ 2 semaines : 1 semaine pour audit et setup, 1 semaine pour test et validation.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },

  "accompagnement-levee-de-fond": {
    heroTitle: "Accompagnement Levée de Fonds",
    heroSubtitle: "Préparez et réussissez vos levées avec un partenaire expérimenté à vos côtés",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "La levée de fonds est une étape cruciale dans la vie d'une entreprise, particulièrement pour les startups et les PME en quête de croissance. Pourtant, réussir ce processus peut s'avérer complexe sans un accompagnement adapté.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Chez Iter Advisors, nous sommes spécialisés dans l'optimisation des projets de financement, en mettant à profit notre expertise et notre réseau pour maximiser vos chances de succès. Avec un accompagnement expert, vous pourrez structurer votre projet, identifier les bons investisseurs et négocier des conditions avantageuses pour accélérer votre développement.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Pourquoi faire appel à un accompagnement pour votre levée de fonds ?",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Gain de temps : concentrez-vous sur votre cœur de métier",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "La levée de fonds est un processus exigeant qui nécessite une grande préparation. Un accompagnateur expérimenté gère les démarches chronophages telles que :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'analyse des besoins financiers",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "La rédaction et l'optimisation des documents-clés (business plan, pitch deck, projections financières)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "La prise de contact et la relance des investisseurs potentiels",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Expertise : des conseils stratégiques pour structurer votre projet",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Un consultant expert en levée de fonds apporte une connaissance approfondie des attentes des investisseurs. Il vous aide à affiner chaque aspect de votre dossier pour qu'il soit convaincant et aligné avec les critères des acteurs financiers. Cela inclut :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Une structuration claire de votre projet : vos ambitions sont traduites en données compréhensibles et mesurables",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Une stratégie adaptée : chaque secteur et chaque type d'investisseur a des attentes spécifiques",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Des prévisions financières solides : basées sur des hypothèses réalistes et des benchmarks sectoriels",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Réseau qualifié : accédez à des investisseurs pertinents",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "L'un des grands défis lors d'une levée de fonds est de trouver les bons investisseurs. Un accompagnateur expérimenté dispose souvent d'un réseau solide comprenant :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Des fonds d'investissement spécialisés dans votre secteur",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Des business angels prêts à soutenir les entreprises en phase de lancement ou de croissance",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Des banques ou institutions financières offrant des solutions adaptées aux besoins des PME et startups",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les étapes clés d'une levée de fonds réussie",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "1. Analyse du projet : comprendre vos besoins financiers",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "La première étape consiste à définir clairement pourquoi vous avez besoin de fonds et à quel montant. Il s'agit d'évaluer vos besoins financiers en fonction de vos objectifs stratégiques, comme le développement de nouveaux produits, l'expansion sur un marché international ou le renforcement des équipes commerciales.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "2. Préparation des documents clés : pensez à soigner votre présentation",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Une levée de fonds repose en grande partie sur la qualité des documents présentés aux investisseurs. Parmi les principaux éléments à préparer :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Business plan complet : Décrivez votre marché, votre stratégie et vos objectifs de manière structurée",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Projections financières détaillées : Incluez des prévisions de revenus, marges et trésorerie sur les 3 à 5 prochaines années",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Pitch deck accrocheur : Un support visuel clair et percutant pour convaincre rapidement vos interlocuteurs",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse des risques : Identifiez les challenges potentiels et expliquez comment vous comptez les surmonter",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "3. Recherche d'investisseurs : ciblez les bons partenaires",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Trouver les bons investisseurs est une étape clé pour sécuriser un financement. Chaque projet s'adresse à des investisseurs spécifiques, en fonction du secteur, de la taille de l'entreprise ou encore de l'objectif de financement.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "4. Négociations : obtenez les meilleures conditions",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Les négociations avec les investisseurs sont une phase délicate qui exige une parfaite maîtrise des aspects financiers et juridiques. Elles portent sur plusieurs éléments cruciaux : la valorisation de l'entreprise, le pourcentage de dilution, et les conditions de sortie.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "5. Finalisation : concrétisez votre levée de fonds",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Une fois les accords trouvés, il est temps de formaliser et d'exécuter les décisions. Cela inclut la signature des documents juridiques, la mise en œuvre des financements, et la préparation des reportings financiers pour assurer un suivi transparent des investissements.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les 3 acteurs clés de votre levée de fonds",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "L'entrepreneur : le moteur du projet",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "En tant que dirigeant, vous êtes au cœur du processus. Votre implication personnelle est déterminante pour définir des objectifs clairs, raconter une histoire convaincante, et démontrer votre leadership.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Les investisseurs : les partenaires du succès",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Les investisseurs ne sont pas de simples sources de financement ; ils deviennent des alliés stratégiques. Leur rôle peut varier selon leur nature : business angels, fonds d'investissement, ou institutions financières.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Le leveur de fonds : votre guide tout au long du processus",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Faire appel à un leveur de fonds expérimenté peut être une véritable valeur ajoutée pour structurer efficacement votre démarche. Son expertise permet de cibler les investisseurs adaptés, optimiser vos documents financiers et juridiques, et négocier des termes avantageux.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Pourquoi choisir Iter Advisors pour vous accompagner ?",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Lever des fonds est une démarche stratégique qui nécessite une expertise pointue et un accompagnement sur mesure. Chez Iter Advisors, nous nous positionnons comme des partenaires de confiance pour vous guider dans cette étape cruciale.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Une expertise reconnue et un réseau de partenaires fiables",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Nous sommes habitués à gérer des projets de financement complexes pour des entreprises de toutes tailles. Nous mettons à votre disposition notre expertise en gestion financière stratégique, notre réseau étendu d'investisseurs et de partenaires, et notre capacité à structurer vos besoins financiers et vous conseiller sur le choix des investisseurs.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Un accompagnement personnalisé à chaque étape",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Chez Iter Advisors, nous savons que chaque projet est unique. C'est pourquoi nous offrons un accompagnement sur mesure, basé sur vos besoins spécifiques. Nous structurons vos besoins financiers, vous conseillons sur le choix des investisseurs, et assurons un suivi rigoureux pour garantir la fluidité et le succès du processus.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Avec Iter Advisors, votre levée de fonds devient plus qu'un simple financement : c'est une opportunité stratégique pour accélérer votre croissance et renforcer vos bases financières.",
          },
        ],
      },
    ],
    faq: [
      {
        id: 1,
        question: "Combien de temps dure l'accompagnement ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "De 3 à 6 mois en général : préparation (4-6 semaines), due diligence (4-8 semaines), négociation (2-4 semaines).",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        question: "Êtes-vous leveurs de fonds ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Bien que nous ne soyons pas leveurs de fonds au sens classique, nous offrons un accompagnement complet en gestion financière stratégique, préparation de dossiers, et conseils pour optimiser votre levée de fonds. Notre réseau étendu d'investisseurs et de partenaires est un atout majeur pour maximiser vos opportunités.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },

  "controle-de-gestion-externalise": {
    heroTitle: "Contrôle de Gestion Externalisé",
    heroSubtitle: "Tableaux de Bord Financiers, Analyse des Coûts & Optimisation de la Rentabilité",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Le contrôle de gestion externalisé est une solution stratégique permettant aux entreprises de piloter leur activité avec des données fiables et actionnables. Il consiste à déléguer à un expert externe la mise en place et le suivi des indicateurs financiers clés de votre entreprise.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Que vous soyez une startup en croissance, une PME ou une ETI, le contrôle de gestion externalisé offre une visibilité accrue sur votre rentabilité, vos marges, et la performance de chaque secteur d'activité. Vous bénéficiez ainsi d'une aide à la décision basée sur des données fiables et en temps réel.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Qu'est-ce que le contrôle de gestion externalisé ?",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Le contrôle de gestion externalisé consiste à confier à un expert externe la responsabilité de mettre en place et suivre les indicateurs clés de votre entreprise. Les services pris en charge incluent :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "La mise en place de tableaux de bord financiers : structure, sélection des KPIs pertinents",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Le suivi mensuel/trimestriel : analyse des chiffres, interprétation des résultats",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'analyse des écarts : comparaison entre les prévisions et la réalité",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'optimisation des coûts : identification des leviers d'amélioration et recommandations",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les 4 piliers du contrôle de gestion",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "1. Tableaux de bord de pilotage : Voir pour décider",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Les tableaux de bord sont le cœur du contrôle de gestion. Ils offrent une vue d'ensemble de la santé financière de l'entreprise. Nos experts mettent en place des tableaux de bord adaptés à votre secteur et vos enjeux, incluant :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Suivi du chiffre d'affaires par produit, marché ou client",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse des marges brutes et nettes",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Gestion du besoin en fonds de roulement (BFR)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Monitoring des dépenses opérationnelles",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "2. Analyse des coûts : Comprendre vos charges",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Une bonne maîtrise des coûts est essentielle pour optimiser votre rentabilité. Notre approche inclut :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Catégorisation des coûts : charges directes vs indirectes",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse par centre de coûts",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Identification des coûts variables et fixes",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Détermination du seuil de rentabilité (break-even point)",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "3. Reporting stratégique : Agir avec données",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Le reporting permet de communiquer les résultats financiers de manière claire et actionnelle. Nous produisons :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Rapports mensuels/trimestriels avec analyses détaillées",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Dashboards visuels pour une prise de décision rapide",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Comparaison avec les prévisions et les années antérieures",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Recommandations d'optimisation et d'amélioration",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "4. Optimisation budgétaire : Maitriser l'avenir",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Un bon contrôle budgétaire est essentiel pour maîtriser votre croissance. Nous vous accompagnons dans :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'élaboration de budgets réalistes et flexibles",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Le suivi mensuel des variances",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "L'ajustement du budget en fonction des évolutions",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Le calcul des marges cibles et des objectifs de profitabilité",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Les avantages du contrôle de gestion externalisé",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Meilleure visibilité sur la rentabilité",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Grâce à des tableaux de bord bien structurés, vous avez une vision claire et en temps réel de votre profitabilité par secteur, produit, ou client. Cela vous permet de prendre des décisions éclairées.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Optimisation des coûts",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "L'identification des gaspillages et des inefficacités permet de réduire les coûts de 5 à 15% selon les secteurs et les pratiques. C'est une source de cash flow directe.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Prise de décision stratégique améliorée",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Les données fiables permettent de prioriser les investissements, d'évaluer l'impact des initiatives stratégiques, et d'ajuster rapidement votre cap si nécessaire.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "Réduction des coûts internes",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Externaliser le contrôle de gestion coûte sensiblement moins cher qu'un contrôleur de gestion interne, tout en offrant une expertise comparable ou supérieure.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Services proposés",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Mise en place de tableaux de bord personnalisés",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse mensuelle/trimestrielle des écarts et des performances",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Suivi des KPIs par centre de profit ou unité opérationnelle",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Recommandations d'optimisation des coûts et des marges",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Budgétisation et suivi budgétaire",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Support pour la présentation des résultats aux investisseurs ou au conseil",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Pourquoi choisir Iter Advisors ?",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Chez Iter Advisors, nous avons accompagné plus de 50 entreprises dans la mise en place et l'optimisation de leur contrôle de gestion. Notre approche est :",
          },
        ],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Pragmatique : Nous adaptons les outils et les indicateurs à votre contexte, sans surcharger vos équipes",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Orientée résultats : Notre objectif est d'améliorer votre rentabilité et votre visibilité financière",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Flexible : Le nombre de jours d'intervention s'ajuste en fonction de votre complexité et de vos besoins",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Collaborative : Nous travaillons en étroite collaboration avec votre équipe interne et vos partenaires",
              },
            ],
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Le contrôle de gestion externalisé n'est pas une commodité : c'est un investissement stratégique qui booste votre profitabilité et sécurise votre croissance.",
          },
        ],
      },
    ],
    faq: [
      {
        id: 1,
        question: "Quels sont les résultats attendus ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Amélioration de la visibilité : réduction des coûts de 5-15%, meilleure allocation des ressources et anticipation des écarts. Vous bénéficiez également d'une aide à la décision basée sur des données fiables.",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        question: "À partir de combien de jours/mois ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "À partir de 1-2 jours par mois pour les petites structures. Le nombre de jours dépend de votre taille, votre complexité opérationnelle et vos besoins en reporting. En moyenne, les PME et ETI nécessitent 3-5 jours par mois.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },
};
