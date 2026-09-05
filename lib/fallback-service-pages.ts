/**
 * Fallback content for service pages when Strapi is unavailable
 * Used to display pages with local illustrations and basic content
 */

import type { StrapiServiceSinglePage } from "@/lib/static-content";
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
            text: "Les enjeux en 2026",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "En 2026, les entreprises font face à une pression accrue sur leur liquidité : hausse des taux d'intérêt, délais de paiement allongés et environnement macro incertain. Les outils de prévision de trésorerie se sont digitalisés (Agicap, Fygr, Pennylane) et l'analyse en temps réel est devenue accessible à toutes les tailles d'entreprise. Un prévisionnel glissant n'est plus un luxe — c'est le tableau de bord de survie de la PME moderne.",
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
            text: "Les enjeux en 2026",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "En 2026, le marché de la levée de fonds a profondément mûri : les investisseurs exigent des fondamentaux solides (revenus récurrents, maîtrise du burn rate, cash runway supérieur à 18 mois) avant d'entrer en discussion sérieuse. La due diligence s'est intensifiée et les processus s'allongent (6 à 12 mois pour une Series A). L'enjeu : arriver préparé avec une data room complète, des prévisions auditables et un narratif financier cohérent.",
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
      // CONTENUS-T6 (2026-08-31) — la page sort en P17 sur « leveur de
      // fond » (110/mois) sans jamais définir le métier. La FAQ existante
      // répond « êtes-vous leveurs de fonds ? » ; ces deux entrées répondent
      // à « c'est quoi » et « comment le choisir », les deux questions que
      // tape l'internaute. Aucun pourcentage de success fee n'est publié :
      // pas de donnée arbitrée, on décrit les modèles, pas les taux.
      {
        id: 3,
        question: "Qu'est-ce qu'un leveur de fonds ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Un leveur de fonds est un intermédiaire qui met une entreprise en relation avec des investisseurs et pilote le processus de levée : ciblage, mise en concurrence, négociation. Il est généralement rémunéré par un honoraire fixe (retainer), un pourcentage du montant levé (success fee), ou une combinaison des deux. Notre rôle est différent et complémentaire : le DAF externalisé prépare l'entreprise à être investissable — business plan, data room, prévisionnel, due diligence — et reste après le closing pour tenir le reporting investisseurs. Le leveur ouvre des portes ; le DAF fait que ce qu'il y a derrière tient l'examen.",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        question: "Comment choisir un leveur de fonds ?",
        answer: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: "Trois vérifications avant de signer : ses références sur des tours comparables au vôtre (stade, secteur, montant), la transparence de sa rémunération, et ce qu'il attend de votre préparation — un bon leveur refuse un dossier dont la data room n'est pas prête. C'est précisément cette préparation que nous assurons en amont.",
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
