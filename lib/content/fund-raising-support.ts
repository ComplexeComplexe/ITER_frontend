import { Locale } from "../i18n";

export interface FundRaisingSupportContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  sections: {
    heading: string;
    content: string[];
  }[];
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

const content: Record<Locale, FundRaisingSupportContent> = {
  "fr": {
    "meta": {
      "title": "Accompagnement levée de fonds | Iter Advisors",
      "description": "Modèle financier, data room et échanges investisseurs : un accompagnement financier défini selon votre stade, vos données et votre calendrier."
    },
    "hero": {
      "h1": "Préparer la finance de votre levée de fonds",
      "intro": "Modèle financier, data room et échanges investisseurs : un accompagnement financier défini selon votre stade, vos données et votre calendrier."
    },
    "sections": [
      {
        "heading": "Ce que nous préparons avec vous",
        "content": [
          "Le DAF aide le dirigeant à traduire son projet en hypothèses financières, à anticiper les besoins de cash et à organiser les documents demandés. La mission porte sur des travaux identifiés : elle ne constitue pas une promesse de montant levé, de valorisation ou de closing.",
          "Le premier échange précise votre stade, les ressources internes, les financements recherchés et les échéances. La qualité des comptes, la maturité du modèle et la disponibilité des interlocuteurs déterminent le travail à réaliser."
        ]
      },
      {
        "heading": "Modèle financier et besoin de financement",
        "content": [
          "Nous construisons ou revoyons les hypothèses de revenus, charges, recrutements et trésorerie avec les responsables de l’entreprise. Les scénarios rendent visibles les besoins de financement et les effets d’un retard commercial ou d’un financement différé.",
          "Le livrable peut comprendre un modèle modifiable, un registre des hypothèses et des contrôles de cohérence. Le dirigeant valide les hypothèses ; les données manquantes ou provisoires restent identifiées."
        ]
      },
      {
        "heading": "Data room et questions financières",
        "content": [
          "Les comptes, le reporting, les échéanciers et les prévisions sont organisés pour faciliter leur lecture. Nous rapprochons les chiffres présentés et préparons les réponses financières avec votre équipe et le cabinet comptable.",
          "La checklist est adaptée au stade de l’entreprise et aux demandes reçues. Les contrats, sujets fiscaux et engagements juridiques sont examinés avec les conseils compétents, dans leurs propres missions."
        ]
      },
      {
        "heading": "DAF, dirigeant et leveur : des rôles complémentaires",
        "content": [
          "Le dirigeant porte le projet et décide des conditions acceptables. Le DAF prépare et explique les chiffres, analyse les scénarios et coordonne les réponses financières. Un leveur, lorsqu’il est mandaté, prend en charge la recherche et l’approche d’investisseurs selon son contrat.",
          "Les éventuelles mises en relation et la répartition des échanges sont précisées au cadrage. La préparation financière et la prospection d’investisseurs sont des prestations distinctes."
        ]
      },
      {
        "heading": "Après l’opération, organiser le suivi",
        "content": [
          "Si cela fait partie de la mission, le DAF actualise le budget, le prévisionnel de trésorerie et le reporting destiné au dirigeant et aux investisseurs. Les responsabilités et le rythme des revues sont convenus ensemble."
        ]
      },
      {
        "heading": "Périmètre, calendrier et honoraires",
        "content": [
          "Une préparation ponctuelle est chiffrée sur devis. Dans un accompagnement récurrent, le contrat précise les travaux inclus et les éventuels projets distincts. Le calendrier tient compte des données disponibles et des intervenants ; celui du financement dépend aussi des investisseurs et des négociations."
        ]
      }
    ],
    "faq": {
      "title": "Questions fréquentes",
      "items": [
        {
          "question": "Êtes-vous leveurs de fonds ?",
          "answer": "Notre rôle décrit ici est la préparation et le suivi financiers. La recherche d’investisseurs relève du dirigeant ou d’un leveur mandaté. Les mises en relation éventuelles et responsabilités de chacun sont définies au cadrage."
        },
        {
          "question": "Quels documents préparer pour le premier échange ?",
          "answer": "Rassemblez vos comptes et reporting disponibles, la trésorerie, les échéanciers de dette et les hypothèses du projet. Le premier échange identifie le travail nécessaire avant de convenir des modalités sécurisées de partage."
        },
        {
          "question": "Quel délai et quel budget prévoir ?",
          "answer": "Le devis dépend des documents disponibles, du nombre d’entités, de la complexité du modèle et des échanges attendus. Il précise les livrables et le calendrier de travail, sans garantir la date de financement."
        }
      ]
    },
    "cta": {
      "title": "Préparer la finance de votre levée de fonds",
      "description": "Modèle financier, data room et échanges investisseurs : un accompagnement financier défini selon votre stade, vos données et votre calendrier.",
      "buttonText": "Décrire mon besoin",
      "buttonHref": "/contact#levee"
    }
  },
  "en": {
    "meta": {
      "title": "Fundraising financial support | Iter Advisors",
      "description": "Financial modelling, data room preparation and investor questions, with a scope based on your stage, data and timing."
    },
    "hero": {
      "h1": "Prepare the financial work for your fundraise",
      "intro": "Financial modelling, data room preparation and investor questions, with a scope based on your stage, data and timing."
    },
    "sections": [
      {
        "heading": "Financial model and cash needs",
        "content": [
          "We help founders document revenue, cost, hiring and cash assumptions. Scenarios show funding needs and the effects of delayed revenues or financing. The founder approves assumptions and open data issues remain explicit."
        ]
      },
      {
        "heading": "Data room and financial questions",
        "content": [
          "The engagement can include reconciling accounts with reporting, organising financial documents and preparing answers alongside the internal team and accountant. Legal and tax advisers handle their own scope."
        ]
      },
      {
        "heading": "Clarify each role",
        "content": [
          "The founder leads the project and decides on terms. The CFO prepares the numbers, explains scenarios and coordinates financial answers. Investor sourcing and outreach are assigned separately to the founder or an appointed fundraising adviser. Any introductions are agreed when defining the engagement."
        ]
      },
      {
        "heading": "Deliverables and follow-up",
        "content": [
          "Agree the model, assumptions register, financial documents and review meetings needed. After funding, support may include updating the budget, cash forecast and investor reporting if included in the mandate."
        ]
      },
      {
        "heading": "Scope, schedule and fees",
        "content": [
          "A standalone preparation project is quoted separately. A recurring engagement specifies included work and additional projects. Timing depends on data and participants; investor decisions and negotiations determine whether and when funding closes."
        ]
      }
    ],
    "faq": {
      "title": "Frequently asked questions",
      "items": [
        {
          "question": "Do you act as fundraising brokers?",
          "answer": "The service described here is financial preparation and follow-up. Investor outreach is assigned separately to the founder or their appointed adviser."
        },
        {
          "question": "What should I prepare?",
          "answer": "Bring available accounts, reporting, cash balances, debt schedules and project assumptions. The initial conversation defines the work and arrangements for secure document sharing."
        },
        {
          "question": "What are the timing and fees?",
          "answer": "The proposal specifies the scope, deliverables and work schedule based on available data and complexity. It does not guarantee funding, valuation or a closing date."
        }
      ]
    },
    "cta": {
      "title": "Prepare the financial work for your fundraise",
      "description": "Financial modelling, data room preparation and investor questions, with a scope based on your stage, data and timing.",
      "buttonText": "Describe my needs",
      "buttonHref": "/en/contact#levee"
    }
  },
  "es": {
    "meta": {
      "title": "Preparación financiera de rondas | Iter Advisors",
      "description": "Modelo financiero, data room y preguntas de inversores, con un alcance definido según su etapa, sus datos y sus plazos."
    },
    "hero": {
      "h1": "Preparar las finanzas de su ronda",
      "intro": "Modelo financiero, data room y preguntas de inversores, con un alcance definido según su etapa, sus datos y sus plazos."
    },
    "sections": [
      {
        "heading": "Modelo financiero y necesidad de fondos",
        "content": [
          "Ayudamos a documentar hipótesis de ingresos, gastos, contrataciones y tesorería. Los escenarios muestran las necesidades de financiación y el efecto de posibles retrasos. El dirigente valida las hipótesis y los datos pendientes quedan identificados."
        ]
      },
      {
        "heading": "Data room y preguntas financieras",
        "content": [
          "La misión puede incluir conciliar cuentas y reporting, organizar documentos y preparar respuestas junto al equipo interno y la asesoría contable. Los asesores legales y fiscales cubren sus propios ámbitos."
        ]
      },
      {
        "heading": "Definir el papel de cada participante",
        "content": [
          "El dirigente presenta el proyecto y decide las condiciones. El CFO prepara las cifras, explica los escenarios y coordina las respuestas financieras. La búsqueda y el contacto con inversores se asignan por separado al dirigente o a un asesor contratado. Las posibles presentaciones se concretan al definir el alcance."
        ]
      },
      {
        "heading": "Entregables y seguimiento",
        "content": [
          "Se acuerdan el modelo, el registro de hipótesis, los documentos y las reuniones necesarios. Tras la financiación, el acompañamiento puede incluir presupuesto, previsión de tesorería y reporting a inversores si están incluidos en el mandato."
        ]
      },
      {
        "heading": "Alcance, calendario y honorarios",
        "content": [
          "Una preparación puntual tiene un presupuesto específico. El contrato recurrente distingue trabajos incluidos y proyectos adicionales. El calendario depende de los datos y los interlocutores; el cierre también depende de inversores y negociaciones."
        ]
      }
    ],
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "¿Actúan como intermediarios de financiación?",
          "answer": "El servicio descrito es preparación y seguimiento financiero. La búsqueda de inversores se asigna por separado al dirigente o a su asesor contratado."
        },
        {
          "question": "¿Qué documentos debo preparar?",
          "answer": "Cuentas, reporting, saldos de tesorería, vencimientos de deuda e hipótesis del proyecto. La primera conversación define el trabajo y las condiciones para compartir documentos de forma segura."
        },
        {
          "question": "¿Qué plazos y honorarios se aplican?",
          "answer": "La propuesta define alcance, entregables y calendario según los datos y la complejidad. No garantiza financiación, valoración ni una fecha de cierre."
        }
      ]
    },
    "cta": {
      "title": "Preparar las finanzas de su ronda",
      "description": "Modelo financiero, data room y preguntas de inversores, con un alcance definido según su etapa, sus datos y sus plazos.",
      "buttonText": "Describir mi necesidad",
      "buttonHref": "/es/contact#levee"
    }
  }
};
export function getFundRaisingSupportContent(locale: Locale): FundRaisingSupportContent { return content[locale]; }

export function getFundRaisingService(locale: Locale): import("../static-content").StrapiServiceSinglePage {
  const t = getFundRaisingSupportContent(locale);
  const paragraph = (text: string): import("../static-content").StrapiBlock => ({ type: "paragraph", children: [{ type: "text", text }] });
  return {
    heroTitle: t.hero.h1, heroSubtitle: t.hero.intro,
    content: t.sections.flatMap(section => [
      { type: "heading", level: 2, children: [{ type: "text", text: section.heading }] } as import("../static-content").StrapiBlock,
      ...section.content.map(paragraph),
    ]),
    faq: t.faq.items.map((item, index) => ({ id: index + 1, question: item.question, answer: [paragraph(item.answer)] })), seo: {},
  };
}
