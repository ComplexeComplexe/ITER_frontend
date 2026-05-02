/**
 * Fallback content for service pages when Strapi is unavailable
 * Used to display pages with local illustrations and basic content
 */

import type { StrapiServiceSinglePage } from "@/lib/strapi";

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
    heroSubtitle: "DAF à Temps Partagé dès 2 jours/mois - Reporting & Pilotage",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Externalisez votre gestion financière avec un DAF expérimenté. Reporting mensuel, pilotage budgétaire et stratégie financière adaptés à votre croissance.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Nos services incluent",
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
                text: "Reporting financier mensuel et tableaux de bord",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Pilotage du budget et suivi des variances",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Stratégie financière et conseils de trésorier",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Relation avec banquiers et investisseurs",
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
            text: "Nos DAF externalisés accompagnent startups et PME de 5 à 500 collaborateurs.",
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
    heroSubtitle: "Data Room, Due Diligence & Négociation - +30 tours accompagnés",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Accompagnement complet pour votre levée de fonds : business plan, data room, due diligence financière et négociation avec les investisseurs.",
          },
        ],
      },
      {
        type: "heading",
        level: 2,
        children: [
          {
            type: "text",
            text: "Notre accompagnement comprend",
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
                text: "Audit financier et préparation des documents",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Constitution de la data room (100+ documents)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Due diligence financière (processus et réponses)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Négociation des termes financiers",
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
            text: "Nous avons accompagné 30+ tours pour un total de 100M EUR+ levés. Diagnostic gratuit pour valider votre maturité financière.",
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
    ],
    seo: {},
  },

  "controle-de-gestion-externalise": {
    heroTitle: "Contrôle de Gestion Externalisé",
    heroSubtitle: "Tableaux de Bord, Analyse & Optimisation des Coûts",
    content: [
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Contrôle de gestion externalisé : tableaux de bord de pilotage, analyse des écarts, suivi des KPIs et recommandations d'optimisation des coûts.",
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
                text: "Tableaux de bord de gestion mensuels/trimestriels",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Analyse des écarts (budget vs réalité)",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Suivi des KPIs par centre de profit",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text: "Recommandations d'optimisation des coûts",
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
            text: "Résultats concrets dès le 1er mois : meilleure visibilité sur la rentabilité et optimisation des marges.",
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
                text: "Amélioration de la visibilité : réduction des coûts de 5-15%, meilleure allocation des ressources et anticipation des écarts.",
              },
            ],
          },
        ],
      },
    ],
    seo: {},
  },
};
