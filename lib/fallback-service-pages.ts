import { getFundRaisingService } from "./content/fund-raising-support";
/**
 * Fallback content for service pages when Strapi is unavailable
 * Used to display pages with local illustrations and basic content
 */

import type { StrapiServiceSinglePage } from "@/lib/static-content";
import type { Locale } from "@/lib/i18n";
import { cashForecastService } from "./content/cash-forecast-service";

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

export function getCanonicalServiceSlug(locale: Locale, urlSlug: string): ServicePageSlug | null {
  if (locale === "fr") {
    return (SERVICE_PAGE_SLUGS as readonly string[]).includes(urlSlug) ? (urlSlug as ServicePageSlug) : null;
  }
  for (const canonical of SERVICE_PAGE_SLUGS) {
    if (SERVICE_URL_SLUG_BY_LOCALE[locale][canonical] === urlSlug) return canonical;
  }
  return null;
}


/** List of URL slugs for generateStaticParams for a given locale. */
export function getServiceSlugsForLocale(locale: Locale): string[] {
  return SERVICE_PAGE_SLUGS.map((s) => SERVICE_URL_SLUG_BY_LOCALE[locale][s]);
}

export const fallbackServicePages: Record<string, StrapiServiceSinglePage> = {
  "previsionnel-tresorerie": cashForecastService,

  "gestion-financiere-externalisee": {
  "heroTitle": "Gestion financière externalisée : organiser les opérations et le reporting",
  "heroSubtitle": "Données fiables, calendrier de clôture et responsabilités : structurer le fonctionnement quotidien de la finance.",
  "content": [
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "La gestion financière externalisée organise la circulation des données entre comptabilité, banque et équipes opérationnelles. Son objectif est de produire une information utilisable : un état des encaissements et décaissements, un reporting expliqué et un calendrier partagé."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Cette page décrit l’organisation opérationnelle de la fonction finance. Pour choisir le profil senior qui la pilote et examiner les modalités d’intervention, consultez notre offre de "
        },
        {
          "type": "link",
          "url": "/daf-externalise",
          "children": [
            {
              "type": "text",
              "text": "DAF externalisé"
            }
          ]
        },
        {
          "type": "text",
          "text": "."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Commencer par les données et les responsabilités"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Le diagnostic recense les entités, les comptes bancaires, les logiciels et les échéances. Il identifie les sources qui font référence, les écarts à résoudre et les personnes habilitées à valider les informations. L’expert-comptable conserve les responsabilités définies dans sa lettre de mission ; le dirigeant valide les arbitrages."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Installer un calendrier de clôture exploitable"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Une clôture de gestion suit des étapes connues : collecte des pièces, rapprochement des données, identification des écritures manquantes et revue des écarts. Chaque étape a un responsable et une date convenue. Le reporting précise les estimations provisoires pour éviter de présenter une donnée incomplète comme un résultat arrêté."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Relier trésorerie, reporting et opérations"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Le suivi des factures ouvertes et des échéances alimente le "
        },
        {
          "type": "link",
          "url": "/services/previsionnel-tresorerie",
          "children": [
            {
              "type": "text",
              "text": "prévisionnel de trésorerie"
            }
          ]
        },
        {
          "type": "text",
          "text": ". Les équipes commerciales confirment les encaissements attendus, les achats précisent les engagements et la finance rapproche ces hypothèses de la banque."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Pour suivre les marges par produit ou activité et expliquer les écarts au budget, le "
        },
        {
          "type": "link",
          "url": "/services/controle-de-gestion-externalise",
          "children": [
            {
              "type": "text",
              "text": "contrôle de gestion"
            }
          ]
        },
        {
          "type": "text",
          "text": " complète ce dispositif. Dans une activité industrielle, il faut aussi rapprocher les stocks et les données de production."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Consultez les missions de "
        },
        {
          "type": "link",
          "url": "/daf-externalise/industrie",
          "children": [
            {
              "type": "text",
              "text": "DAF externalisé pour l’industrie"
            }
          ]
        },
        {
          "type": "text",
          "text": " pour le pilotage des coûts de revient, du BFR et des investissements."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Automatiser après avoir fiabilisé les flux"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Avant de connecter les outils, définissez les règles de rapprochement, les droits d’accès et les contrôles. Un flux automatisé doit signaler les exceptions et conserver une trace des corrections. La fréquence de mise à jour dépend des décisions à prendre, pas de la seule capacité du logiciel."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Livrables et revue de fonctionnement"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Le périmètre peut inclure une cartographie des flux, un calendrier de clôture, un registre des anomalies et un reporting mensuel accompagné de commentaires. La revue de direction documente les décisions, leur responsable et les points à suivre lors du prochain échange."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Le "
        },
        {
          "type": "link",
          "url": "/ressources/cas-clients/opti-digital-structuration-financement",
          "children": [
            {
              "type": "text",
              "text": "cas Opti Digital"
            }
          ]
        },
        {
          "type": "text",
          "text": " décrit un accompagnement associant migration ERP, clôtures et reporting. Les résultats présentés restent propres à cette mission."
        }
      ]
    },
    {
      "type": "heading",
      "level": 2,
      "children": [
        {
          "type": "text",
          "text": "Définir le périmètre et le budget"
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Ces travaux peuvent s’inscrire dans les "
        },
        {
          "type": "link",
          "url": "/daf-externalise/tarifs",
          "children": [
            {
              "type": "text",
              "text": "formules de DAF externalisé Iter Advisors"
            }
          ]
        },
        {
          "type": "text",
          "text": ", de 3 000 à 8 000 € HT par mois pour l’accompagnement récurrent. Le devis précise les livrables et la disponibilité ; les jours affichés sont des repères indicatifs. Une reprise de données ou un projet ponctuel est cadré séparément."
        }
      ]
    },
    {
      "type": "paragraph",
      "children": [
        {
          "type": "text",
          "text": "Sans durée d’engagement minimale, résiliable avec un préavis de 30 jours. Aucun dépassement n’est facturé sans avenant signé. Le premier échange permet de préciser la situation de départ, les échéances et les intervenants."
        }
      ]
    }
  ],
  "faq": [],
  "seo": {}
},

  "accompagnement-levee-de-fond": getFundRaisingService("fr"),

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
            text: "Les enjeux en 2026",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "En 2026, le contrôle de gestion n'est plus réservé aux grandes entreprises. Les outils de BI (Power BI, Looker Studio) et de gestion budgétaire (Anaplan, Pigment) sont devenus accessibles aux PME. L'enjeu : mettre en place un système de pilotage agile — tableaux de bord en temps réel, suivi des marges par produit ou segment, alertes sur les dérives — sans recruter une équipe finance interne de trois personnes.",
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
