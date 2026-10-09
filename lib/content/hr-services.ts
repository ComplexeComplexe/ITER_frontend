import { Locale } from "../i18n";

/**
 * HR service pages (TICKET 1) — 4 dedicated pages spun out of /drh-externalise
 * to resolve the 5-card cannibalization on /services. FR content only for
 * now; EN/ES translations to follow.
 */

export interface HRServiceUseCase {
  title: string;
  description: string;
}

export interface HRServicePricingRow {
  formula: string;
  scope: string;
  price: string;
}

export interface HRServiceContent {
  slug: string;
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  breadcrumb: string;
  intro: string[];
  whatIs: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  };
  whyOutsource: {
    heading: string;
    benefits: { label: string; description: string }[];
  };
  approach: {
    heading: string;
    phases: { step: string; description: string }[];
  };
  useCases: {
    heading: string;
    cases: HRServiceUseCase[];
  };
  pricing: {
    heading: string;
    rows: HRServicePricingRow[];
    note?: string;
  };
  /** REDESIGN-P4 (2026-09-01) — le visible et le FAQPage sont générés depuis ce tableau. */
  faq?: { question: string; answer: string }[];
  cta: {
    heading: string;
    body: string;
    buttonLabel: string;
  };
}

export type HRServiceSlug =
  | "recrutement-talent-acquisition"
  | "gestion-paie-charges-sociales"
  | "formation-developpement"
  | "conformite-droit-travail";

export const hrServices: Record<HRServiceSlug, HRServiceContent> = {
  "recrutement-talent-acquisition": {
    "slug": "recrutement-talent-acquisition",
    "meta": {
      "title": "Recrutement externalisé | Iter Advisors",
      "description": "Organiser vos recrutements, de la définition du besoin à l’arrivée du collaborateur. Périmètre, méthode et responsabilités définis avec votre équipe."
    },
    "h1": "Recrutement externalisé pour PME et startups",
    "breadcrumb": "Recrutement et intégration",
    "intro": [
      "Vous souhaitez recruter un profil finance ou renforcer vos équipes. Le premier travail consiste à préciser le rôle, le budget, les compétences attendues et la capacité de votre organisation à intégrer la personne.",
      "L’accompagnement est défini avec vous : cadrage du poste, recherche de candidats, préparation des entretiens ou suivi de l’intégration. Les responsabilités de décision restent explicites."
    ],
    "whatIs": {
      "heading": "Ce que peut couvrir la mission",
      "paragraphs": [
        "Organiser vos recrutements, de la définition du besoin à l’arrivée du collaborateur.",
        "Les livrables et le partage des responsabilités sont précisés dans la proposition."
      ],
      "bullets": [
        "Une fiche de poste et des critères de sélection partagés",
        "Un processus d’entretien avec rôles, étapes et retours aux candidats",
        "Un suivi des candidatures et des prochaines décisions",
        "Une trame d’intégration avec points de suivi"
      ]
    },
    "whyOutsource": {
      "heading": "Un accompagnement adapté à votre organisation",
      "benefits": [
        {
          "label": "Des priorités explicites",
          "description": "Définir les sujets à traiter et les décisions à préparer avec les interlocuteurs concernés."
        },
        {
          "label": "Des rôles clarifiés",
          "description": "Articuler le travail du dirigeant, des managers et des prestataires dans le périmètre convenu."
        }
      ]
    },
    "approach": {
      "heading": "Comment organiser l’accompagnement",
      "phases": [
        {
          "step": "Cadrer le poste",
          "description": "Définir le besoin, la rémunération envisagée, les critères et les acteurs de la décision."
        },
        {
          "step": "Organiser la recherche",
          "description": "Choisir les canaux adaptés et les modalités de présélection. Les délais dépendent notamment du profil et du marché."
        },
        {
          "step": "Préparer la sélection",
          "description": "Structurer les entretiens et la comparaison des candidatures sur les critères convenus."
        },
        {
          "step": "Accompagner l’intégration",
          "description": "Préparer les premiers objectifs, les interlocuteurs et les points de suivi avec le manager."
        }
      ]
    },
    "useCases": {
      "heading": "Exemples de besoins à cadrer",
      "cases": [
        {
          "title": "Recruter un premier responsable finance",
          "description": "Clarifier le rôle attendu entre comptabilité, reporting et pilotage, puis organiser la sélection avec le dirigeant."
        },
        {
          "title": "Préparer plusieurs recrutements",
          "description": "Prioriser les postes, répartir les entretiens et vérifier la capacité d’intégration avant d’accélérer la recherche."
        }
      ]
    },
    "pricing": {
      "heading": "Budget et périmètre",
      "rows": [
        {
          "formula": "Mission définie avec vous",
          "scope": "Travaux, livrables et rythme convenus",
          "price": "Sur devis"
        }
      ],
      "note": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
    },
    "faq": [
      {
        "question": "Quel délai prévoir pour recruter ?",
        "answer": "Il dépend du profil, du marché, de la disponibilité des décideurs et du processus retenu. Le calendrier et les points de suivi sont définis au cadrage ; aucun délai de recrutement n’est garanti."
      },
      {
        "question": "Comment sont calculés les honoraires ?",
        "answer": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
      },
      {
        "question": "Qui choisit le candidat ?",
        "answer": "L’entreprise conserve sa décision de recrutement. L’accompagnement prépare les éléments de comparaison et facilite les échanges avec les personnes concernées."
      }
    ],
    "cta": {
      "heading": "Quel sujet RH souhaitez-vous faire avancer ?",
      "body": "Décrivez votre organisation, vos interlocuteurs actuels et vos priorités. Le premier échange permettra de préciser la suite.",
      "buttonLabel": "Présenter mon besoin RH"
    }
  },
  "gestion-paie-charges-sociales": {
    "slug": "gestion-paie-charges-sociales",
    "meta": {
      "title": "Coordination et contrôle de la paie | Iter Advisors",
      "description": "Clarifier qui collecte, produit, contrôle et valide votre paie. Périmètre, méthode et responsabilités définis avec votre équipe."
    },
    "h1": "Coordination de la paie : organiser les rôles et les contrôles",
    "breadcrumb": "Paie et coordination",
    "intro": [
      "La paie repose sur une circulation fiable des informations entre salariés, managers, administration du personnel, prestataire de paie et direction financière.",
      "La mission RH peut organiser cette coordination et le suivi des contrôles. La production des bulletins et des déclarations fait l’objet d’un périmètre explicite avec le prestataire concerné ; elle n’est pas automatiquement incluse dans une mission de DRH."
    ],
    "whatIs": {
      "heading": "Ce que peut couvrir la mission",
      "paragraphs": [
        "Clarifier qui collecte, produit, contrôle et valide votre paie.",
        "Les livrables et le partage des responsabilités sont précisés dans la proposition."
      ],
      "bullets": [
        "Un calendrier de collecte et de validation des variables",
        "Une répartition des responsabilités avec le prestataire",
        "Une liste de contrôles et un suivi des écarts",
        "Une procédure pour les entrées, sorties et changements de situation"
      ]
    },
    "whyOutsource": {
      "heading": "Un accompagnement adapté à votre organisation",
      "benefits": [
        {
          "label": "Des priorités explicites",
          "description": "Définir les sujets à traiter et les décisions à préparer avec les interlocuteurs concernés."
        },
        {
          "label": "Des rôles clarifiés",
          "description": "Articuler le travail du dirigeant, des managers et des prestataires dans le périmètre convenu."
        }
      ]
    },
    "approach": {
      "heading": "Comment organiser l’accompagnement",
      "phases": [
        {
          "step": "Cartographier",
          "description": "Identifier les outils, les prestataires, les données échangées et les personnes autorisées à les consulter."
        },
        {
          "step": "Définir les contrôles",
          "description": "Convenir des validations, des pièces nécessaires et des dates avec les interlocuteurs concernés."
        },
        {
          "step": "Organiser les échanges",
          "description": "Documenter les transmissions et le traitement des questions sans multiplier les copies de données personnelles."
        },
        {
          "step": "Suivre les écarts",
          "description": "Examiner les anomalies et leur résolution, puis adapter les pratiques avec le prestataire et l’équipe."
        }
      ]
    },
    "useCases": {
      "heading": "Exemples de besoins à cadrer",
      "cases": [
        {
          "title": "Une paie suivie par plusieurs interlocuteurs",
          "description": "Clarifier les responsabilités et le calendrier pour éviter les demandes contradictoires ou les validations implicites."
        },
        {
          "title": "Un changement de logiciel ou de prestataire",
          "description": "Préparer les données, les contrôles de reprise et la passation, dans le périmètre convenu."
        }
      ]
    },
    "pricing": {
      "heading": "Budget et périmètre",
      "rows": [
        {
          "formula": "Mission définie avec vous",
          "scope": "Travaux, livrables et rythme convenus",
          "price": "Sur devis"
        }
      ],
      "note": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
    },
    "faq": [
      {
        "question": "La production de paie est-elle incluse ?",
        "answer": "Elle doit être expressément précisée dans la proposition, avec le prestataire, les pays et les responsabilités. La supervision RH et la production des bulletins sont deux rôles distincts."
      },
      {
        "question": "Quels outils utilisez-vous ?",
        "answer": "Le cadrage part de votre organisation et de votre logiciel existant. Le choix d’un outil dépend des besoins, du pays et du niveau de délégation."
      },
      {
        "question": "Comment sont définis le budget et l’engagement ?",
        "answer": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
      }
    ],
    "cta": {
      "heading": "Quel sujet RH souhaitez-vous faire avancer ?",
      "body": "Décrivez votre organisation, vos interlocuteurs actuels et vos priorités. Le premier échange permettra de préciser la suite.",
      "buttonLabel": "Présenter mon besoin RH"
    }
  },
  "formation-developpement": {
    "slug": "formation-developpement",
    "meta": {
      "title": "Formation et développement RH | Iter Advisors",
      "description": "Relier les besoins de compétences au travail des équipes. Périmètre, méthode et responsabilités définis avec votre équipe."
    },
    "h1": "Formation et développement des équipes",
    "breadcrumb": "Formation et développement",
    "intro": [
      "Un plan de développement commence par les situations de travail : quelles compétences manquent, pour quelles missions et avec quels effets attendus ?",
      "Iter peut vous accompagner dans la structuration de ces besoins, la coordination des actions et le suivi avec les managers. Les formations spécialisées, les organismes et leurs conditions sont identifiés séparément."
    ],
    "whatIs": {
      "heading": "Ce que peut couvrir la mission",
      "paragraphs": [
        "Relier les besoins de compétences au travail des équipes.",
        "Les livrables et le partage des responsabilités sont précisés dans la proposition."
      ],
      "bullets": [
        "Une synthèse des besoins de compétences par équipe",
        "Des priorités partagées avec les managers",
        "Un plan d’action avec responsables et calendrier",
        "Des points de suivi pour examiner l’utilisation des acquis"
      ]
    },
    "whyOutsource": {
      "heading": "Un accompagnement adapté à votre organisation",
      "benefits": [
        {
          "label": "Des priorités explicites",
          "description": "Définir les sujets à traiter et les décisions à préparer avec les interlocuteurs concernés."
        },
        {
          "label": "Des rôles clarifiés",
          "description": "Articuler le travail du dirigeant, des managers et des prestataires dans le périmètre convenu."
        }
      ]
    },
    "approach": {
      "heading": "Comment organiser l’accompagnement",
      "phases": [
        {
          "step": "Comprendre les besoins",
          "description": "Échanger sur les missions, les difficultés rencontrées et les attentes des collaborateurs et managers."
        },
        {
          "step": "Choisir les actions",
          "description": "Comparer formation, accompagnement au poste, transmission interne et évolution de l’organisation."
        },
        {
          "step": "Organiser la réalisation",
          "description": "Définir les participants, les modalités et les prestataires nécessaires en tenant compte de l’activité."
        },
        {
          "step": "Évaluer l’usage",
          "description": "Examiner ce qui est mis en pratique et les ajustements nécessaires avec l’équipe."
        }
      ]
    },
    "useCases": {
      "heading": "Exemples de besoins à cadrer",
      "cases": [
        {
          "title": "Accompagner de nouveaux managers",
          "description": "Identifier les situations pour lesquelles ils ont besoin de repères et organiser un parcours adapté."
        },
        {
          "title": "Préparer une évolution des outils",
          "description": "Relier les besoins d’apprentissage aux tâches réellement modifiées et prévoir un suivi après la prise en main."
        }
      ]
    },
    "pricing": {
      "heading": "Budget et périmètre",
      "rows": [
        {
          "formula": "Mission définie avec vous",
          "scope": "Travaux, livrables et rythme convenus",
          "price": "Sur devis"
        }
      ],
      "note": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
    },
    "faq": [
      {
        "question": "Réalisez-vous toutes les formations ?",
        "answer": "La proposition distingue l’accompagnement RH, les actions internes et les prestations de formation réalisées par des organismes spécialisés."
      },
      {
        "question": "Un financement est-il garanti ?",
        "answer": "Non. Les possibilités et conditions de financement doivent être vérifiées auprès des organismes concernés selon la situation et l’action retenue."
      },
      {
        "question": "Comment mesurer l’utilité des actions ?",
        "answer": "Définir au départ les situations de travail visées, puis examiner avec le manager si les acquis sont utilisés. Une présence en formation ne suffit pas à démontrer un résultat."
      }
    ],
    "cta": {
      "heading": "Quel sujet RH souhaitez-vous faire avancer ?",
      "body": "Décrivez votre organisation, vos interlocuteurs actuels et vos priorités. Le premier échange permettra de préciser la suite.",
      "buttonLabel": "Présenter mon besoin RH"
    }
  },
  "conformite-droit-travail": {
    "slug": "conformite-droit-travail",
    "meta": {
      "title": "Conformité RH et droit du travail | Iter Advisors",
      "description": "Identifier les sujets à traiter et mobiliser les bons interlocuteurs. Périmètre, méthode et responsabilités définis avec votre équipe."
    },
    "h1": "Conformité RH et coordination des conseils",
    "breadcrumb": "Conformité et relations sociales",
    "intro": [
      "La direction RH organise le suivi des pratiques, des documents et des sujets sociaux. Elle identifie les questions qui nécessitent un conseil spécialisé et prépare les informations utiles à leur traitement.",
      "Le droit applicable, les responsabilités de l’employeur et le rôle des conseils doivent être examinés dans le contexte de votre entreprise et du pays concerné. Un accompagnement RH ne remplace pas automatiquement une consultation juridique."
    ],
    "whatIs": {
      "heading": "Ce que peut couvrir la mission",
      "paragraphs": [
        "Identifier les sujets à traiter et mobiliser les bons interlocuteurs.",
        "Les livrables et le partage des responsabilités sont précisés dans la proposition."
      ],
      "bullets": [
        "Un état des sujets RH et des documents à examiner",
        "Une liste de priorités et des interlocuteurs compétents",
        "Un calendrier de suivi des actions convenues",
        "Une documentation des décisions et des échanges nécessaires"
      ]
    },
    "whyOutsource": {
      "heading": "Un accompagnement adapté à votre organisation",
      "benefits": [
        {
          "label": "Des priorités explicites",
          "description": "Définir les sujets à traiter et les décisions à préparer avec les interlocuteurs concernés."
        },
        {
          "label": "Des rôles clarifiés",
          "description": "Articuler le travail du dirigeant, des managers et des prestataires dans le périmètre convenu."
        }
      ]
    },
    "approach": {
      "heading": "Comment organiser l’accompagnement",
      "phases": [
        {
          "step": "Délimiter la mission",
          "description": "Préciser les établissements, les pratiques et les sujets concernés, ainsi que les conseils déjà mobilisés."
        },
        {
          "step": "Examiner l’organisation",
          "description": "Recueillir les documents utiles auprès des personnes autorisées et repérer les questions à approfondir."
        },
        {
          "step": "Coordonner les spécialistes",
          "description": "Préparer les éléments nécessaires et organiser les échanges avec les conseils compétents."
        },
        {
          "step": "Suivre les actions",
          "description": "Attribuer les responsabilités, suivre les échéances et documenter les changements convenus."
        }
      ]
    },
    "useCases": {
      "heading": "Exemples de besoins à cadrer",
      "cases": [
        {
          "title": "Structurer une fonction RH",
          "description": "Distinguer les tâches courantes, les contrôles et les sujets qui doivent être examinés par un spécialiste."
        },
        {
          "title": "Accompagner une évolution de l’organisation",
          "description": "Préparer les informations et les échanges nécessaires, avec un conseil adapté au contexte juridique."
        }
      ]
    },
    "pricing": {
      "heading": "Budget et périmètre",
      "rows": [
        {
          "formula": "Mission définie avec vous",
          "scope": "Travaux, livrables et rythme convenus",
          "price": "Sur devis"
        }
      ],
      "note": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
    },
    "faq": [
      {
        "question": "L’accompagnement RH remplace-t-il un avocat ?",
        "answer": "Non. Les sujets nécessitant un conseil juridique spécialisé sont traités avec un professionnel compétent. La proposition définit le rôle de chaque intervenant."
      },
      {
        "question": "Intervenez-vous sur plusieurs pays ?",
        "answer": "Le cadrage identifie les pays, les compétences disponibles et les partenaires nécessaires. Les pratiques ne sont pas transposées automatiquement d’un pays à l’autre."
      },
      {
        "question": "Peut-on définir une mission ponctuelle ?",
        "answer": "Le devis précise les livrables, le rythme, le budget, la durée, le préavis et les modalités d’ajustement. Les prestations spécialisées et les frais éventuels sont identifiés séparément."
      }
    ],
    "cta": {
      "heading": "Quel sujet RH souhaitez-vous faire avancer ?",
      "body": "Décrivez votre organisation, vos interlocuteurs actuels et vos priorités. Le premier échange permettra de préciser la suite.",
      "buttonLabel": "Présenter mon besoin RH"
    }
  }
};

export function getHRServiceContent(slug: string): HRServiceContent | undefined {
  return hrServices[slug as HRServiceSlug];
}

export const HR_SERVICE_SLUGS: HRServiceSlug[] = [
  "recrutement-talent-acquisition",
  "gestion-paie-charges-sociales",
  "formation-developpement",
  "conformite-droit-travail",
];

export function getAllHRServices(_locale: Locale = "fr"): HRServiceContent[] {
  return HR_SERVICE_SLUGS.map((slug) => hrServices[slug]);
}
