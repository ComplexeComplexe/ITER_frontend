import { Locale } from "../i18n";

export interface MaDueDiligenceContent {
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
    content: string;
  }[];
  services: {
    title: string;
    items: { name: string; description: string }[];
  };
  process: {
    title: string;
    steps: { step: string; title: string; description: string }[];
  };
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

const content: Record<Locale, MaDueDiligenceContent> = {
  "fr": {
    "meta": {
      "title": "M&A et due diligence financière | Iter Advisors",
      "description": "Préparez une acquisition, une cession ou une levée : données financières, BFR, dette et scénarios. Périmètre, livrables et honoraires sur devis."
    },
    "hero": {
      "h1": "M&A et due diligence financière : préparer vos décisions",
      "intro": "Acquéreur, dirigeant ou cédant : nous vous aidons à organiser et analyser les informations financières utiles à votre opération. Le périmètre distingue la préparation du dossier, la revue financière et les travaux des autres conseils."
    },
    "sections": [
      {
        "heading": "Quel besoin souhaitez-vous traiter ?",
        "content": "<p>Côté dirigeant ou vendeur, il peut s’agir de préparer une data room et d’expliquer les comptes. Côté acquéreur, la revue financière examine les résultats, la dette, le BFR et les hypothèses de la cible. Le mandat précise les destinataires, les documents disponibles et les analyses attendues.</p><p>La préparation d’un dossier ne remplace pas une due diligence indépendante. Les sujets juridiques, fiscaux et sociaux sont traités avec les conseils compétents selon les missions convenues.</p>"
      },
      {
        "heading": "Les analyses et livrables à définir",
        "content": "<ul><li><strong>Résultats :</strong> rapprochement des comptes et du reporting, revenus récurrents ou ponctuels, éléments à retraiter et pièces justificatives.</li><li><strong>Cash et BFR :</strong> créances, stocks, fournisseurs, saisonnalité et hypothèses de financement.</li><li><strong>Dette :</strong> échéanciers, engagements identifiés et questions à approfondir avec les conseils.</li><li><strong>Prévisions :</strong> cohérence des hypothèses, scénarios et besoins de financement.</li></ul><p>Selon la mission, les livrables peuvent comprendre une data room organisée, une liste de questions, une note d’analyse et un suivi des points ouverts. Les données manquantes et les limites de l’analyse sont précisées.</p><p>Pour préparer vos pièces, consultez la <a href=\"/ressources/blog/checklist-due-diligence-levee-de-fonds\">checklist de due diligence</a>. Le <a href=\"/ressources/cas-clients/solarmente-serie-b-cleantech\">cas SolarMente</a> illustre des travaux de préparation financière et d’intégration, avec leur périmètre.</p>"
      }
    ],
    "services": {
      "title": "Des missions distinctes selon votre opération",
      "items": [
        {
          "name": "Préparation financière côté vendeur",
          "description": "Organiser les pièces, rapprocher les chiffres et préparer les réponses aux questions. Une éventuelle vendor due diligence et ses destinataires sont cadrés séparément."
        },
        {
          "name": "Due diligence financière côté acquéreur",
          "description": "Examiner les données disponibles de la cible, documenter les points de vigilance et préparer les analyses utiles aux négociations."
        },
        {
          "name": "Préparation d’une levée de fonds",
          "description": "Construire le modèle financier, préparer la data room et accompagner les échanges financiers. Le dirigeant reste responsable des décisions et le rôle du leveur éventuel est distinct."
        },
        {
          "name": "Modélisation et valorisation",
          "description": "Comparer des hypothèses et méthodes de valorisation, expliciter les sensibilités et les données utilisées. Le prix d’une transaction dépend aussi de la négociation."
        },
        {
          "name": "Intégration après acquisition",
          "description": "Définir les priorités de reporting, les responsabilités, les données à reprendre et la coordination avec les équipes comptables."
        }
      ]
    },
    "process": {
      "title": "Comment cadrer et suivre la mission",
      "steps": [
        {
          "step": "01",
          "title": "Premier échange et périmètre",
          "description": "Préciser l’opération, les échéances, les intervenants, les documents disponibles et les livrables attendus. Formaliser les honoraires et le calendrier au devis."
        },
        {
          "step": "02",
          "title": "Collecte et contrôles",
          "description": "Organiser les accès et rapprocher les informations financières. Identifier les pièces manquantes et convenir du traitement des questions."
        },
        {
          "step": "03",
          "title": "Analyse et restitution",
          "description": "Présenter les constats, leurs justificatifs et leurs limites. Distinguer les résultats vérifiés des hypothèses et des sujets à approfondir."
        },
        {
          "step": "04",
          "title": "Suivi des points ouverts",
          "description": "Préparer les réponses financières et suivre les actions prévues au mandat, en coordination avec le dirigeant et les autres conseils."
        }
      ]
    },
    "faq": {
      "title": "Questions fréquentes",
      "items": [
        {
          "question": "Combien de temps dure une due diligence financière ?",
          "answer": "Le calendrier dépend de l’opération, des entités, de la qualité des pièces et de la disponibilité des interlocuteurs. Il est défini après examen du périmètre et actualisé si les données ou les demandes évoluent."
        },
        {
          "question": "Quel est le coût d’un accompagnement ?",
          "answer": "Chaque mission ponctuelle fait l’objet d’un devis : préparation de dossier, revue vendeur et analyse acquéreur ne couvrent pas les mêmes travaux. Les honoraires précisent les livrables, les responsabilités et les éventuels travaux complémentaires."
        },
        {
          "question": "Pouvez-vous intervenir en urgence ?",
          "answer": "Indiquez votre échéance et les travaux déjà engagés. Nous confirmons la disponibilité du profil adapté et les analyses réalisables dans le délai. Aucun démarrage n’est confirmé avant ce cadrage."
        },
        {
          "question": "La revue garantit-elle la réussite de l’opération ?",
          "answer": "Non. Elle apporte des analyses financières pour éclairer les décisions. L’accord des parties, le financement et les autres diligences restent déterminants ; les conseils juridiques et fiscaux interviennent dans leur propre périmètre."
        }
      ]
    },
    "cta": {
      "title": "Préparer votre opération",
      "description": "Décrivez votre opération, son calendrier et les pièces disponibles pour cadrer un premier échange.",
      "buttonText": "Décrire mon besoin",
      "buttonHref": "/contact#due-diligence"
    }
  },
  "en": {
    "meta": {
      "title": "M&A and Financial Due Diligence | Iter Advisors",
      "description": "Financial due diligence for an acquisition, sale or fundraise. Define the financial work, deliverables and fees for your transaction."
    },
    "hero": {
      "h1": "M&A and financial due diligence: prepare your decisions",
      "intro": "We help founders, sellers and acquirers organise and analyse financial information. Preparation, buyer-side review and the work of legal and tax advisers have distinct scopes."
    },
    "sections": [
      {
        "heading": "Scope, evidence and limitations",
        "content": "<p>Agree the purpose of the engagement, recipients, available information and expected deliverables. Review earnings, working capital, cash, debt and forecast assumptions within that scope. Document missing information and open questions.</p><p>Preparing a data room is distinct from an independent due diligence review. Legal, tax and employment matters are coordinated with the relevant advisers. Financial analysis informs a decision; it does not guarantee a transaction or its valuation.</p>"
      }
    ],
    "services": {
      "title": "Our M&A and due diligence services",
      "items": [
        {
          "name": "Due diligence preparation (Vendor DD)",
          "description": "We prepare your company to receive due diligence: account clean-up, data room preparation, vendor financial report and anticipation of investor questions."
        },
        {
          "name": "Buy-side due diligence",
          "description": "We conduct financial due diligence on behalf of acquirers: target account analysis, risk identification, price adjustments and investment recommendations."
        },
        {
          "name": "Fundraising support",
          "description": "Financial modelling, data room preparation and support for financial questions. Investor outreach, where needed, is assigned separately to the founder or their appointed adviser."
        },
        {
          "name": "Business valuation",
          "description": "DCF, market multiples and comparable transactions methods to establish a robust and defensible valuation of your company."
        },
        {
          "name": "Post-acquisition integration (PMI)",
          "description": "Support in post-acquisition financial integration: accounting system harmonization, reporting consolidation and synergy optimization."
        }
      ]
    },
    "process": {
      "title": "Our advisory process",
      "steps": [
        {
          "step": "01",
          "title": "Initial diagnostic",
          "description": "Agree the scope, documents, deliverables, fees and timetable."
        },
        {
          "step": "02",
          "title": "Data room preparation",
          "description": "Organise financial documents and identify missing information."
        },
        {
          "step": "03",
          "title": "Due diligence execution",
          "description": "Review the agreed data and report findings, assumptions and limitations."
        },
        {
          "step": "04",
          "title": "Negotiation and closing",
          "description": "Follow up the financial questions within the mandate, alongside the founder and other advisers."
        }
      ]
    },
    "faq": {
      "title": "Frequently asked questions",
      "items": [
        {
          "question": "How long does a financial due diligence take?",
          "answer": "Timing depends on the transaction, entities, data quality and availability of stakeholders. We agree a schedule after reviewing the scope and revise it if information or requirements change."
        },
        {
          "question": "What does due diligence advisory cost?",
          "answer": "Fees are quoted for the specific engagement. Data room preparation, seller assistance and buyer-side due diligence cover different work. The proposal defines deliverables, responsibilities, timing and any additional work."
        },
        {
          "question": "Can you intervene urgently on an ongoing due diligence?",
          "answer": "Tell us your deadline and the work already under way. We confirm availability and a realistic scope before agreeing a start date."
        },
        {
          "question": "Do you work with companies outside France?",
          "answer": "We work with businesses in France and Spain. Applicable accounting frameworks and the involvement of local legal and tax advisers are defined for each engagement."
        }
      ]
    },
    "cta": {
      "title": "Prepare your next transaction",
      "description": "Describe your transaction, deadline and available documents to scope an initial conversation.",
      "buttonText": "Describe my needs",
      "buttonHref": "/en/contact#due-diligence"
    }
  },
  "es": {
    "meta": {
      "title": "M&A y Due Diligence financiera | Iter Advisors",
      "description": "Due diligence financiera para adquisiciones, ventas y financiación. Defina el alcance, los entregables y los honorarios de su operación."
    },
    "hero": {
      "h1": "M&A y due diligence financiera: preparar sus decisiones",
      "intro": "Ayudamos a dirigentes, vendedores y compradores a organizar y analizar la información financiera. La preparación, la revisión del comprador y el trabajo de los asesores legales y fiscales tienen alcances distintos."
    },
    "sections": [
      {
        "heading": "Alcance, documentación y límites",
        "content": "<p>Se definen el objetivo, los destinatarios, la información disponible y los entregables. La revisión puede cubrir resultados, circulante, tesorería, deuda e hipótesis financieras. Se identifican las piezas que faltan y las preguntas pendientes.</p><p>Preparar una data room es distinto de una revisión independiente. Las cuestiones legales, fiscales y laborales se coordinan con los asesores correspondientes. El análisis financiero ayuda a decidir; no garantiza el cierre ni la valoración.</p>"
      }
    ],
    "services": {
      "title": "Nuestros servicios de M&A y due diligence",
      "items": [
        {
          "name": "Preparacion para due diligence (Vendor DD)",
          "description": "Preparamos su empresa para recibir una due diligence: limpieza de cuentas, preparacion del data room y anticipacion de preguntas."
        },
        {
          "name": "Due diligence del comprador (Buy-side DD)",
          "description": "Realizamos la due diligence financiera en nombre de adquirentes: analisis de cuentas, identificacion de riesgos y recomendaciones."
        },
        {
          "name": "Acompanamiento en rondas de financiacion",
          "description": "Modelo financiero, preparación de la data room y apoyo a las preguntas financieras. La búsqueda de inversores, si procede, se asigna por separado al dirigente o a su asesor designado."
        },
        {
          "name": "Valoracion de empresas",
          "description": "Metodos DCF, multiplos de mercado y transacciones comparables para establecer una valoracion robusta."
        },
        {
          "name": "Integracion post-adquisicion (PMI)",
          "description": "Acompanamiento en la integracion financiera post-adquisicion: armonizacion de sistemas contables y consolidacion."
        }
      ]
    },
    "process": {
      "title": "Nuestro proceso de acompanamiento",
      "steps": [
        {
          "step": "01",
          "title": "Diagnostico inicial",
          "description": "Definir alcance, documentos, entregables, honorarios y calendario."
        },
        {
          "step": "02",
          "title": "Preparacion del data room",
          "description": "Organizar las piezas financieras e identificar la información que falta."
        },
        {
          "step": "03",
          "title": "Ejecucion de la due diligence",
          "description": "Analizar los datos acordados y explicar resultados, hipótesis y límites."
        },
        {
          "step": "04",
          "title": "Negociacion y cierre",
          "description": "Dar seguimiento a las preguntas financieras dentro del mandato, junto al dirigente y los otros asesores."
        }
      ]
    },
    "faq": {
      "title": "Preguntas frecuentes",
      "items": [
        {
          "question": "Cuanto tiempo dura una due diligence financiera?",
          "answer": "El calendario depende de la operación, las entidades, la calidad de los datos y la disponibilidad de los interlocutores. Se acuerda tras revisar el alcance y se actualiza si cambian las necesidades."
        },
        {
          "question": "Cual es el coste de un acompanamiento de due diligence?",
          "answer": "Cada misión tiene un presupuesto específico. La preparación del expediente, la asistencia al vendedor y la revisión del comprador cubren trabajos distintos. La propuesta define entregables, responsabilidades, calendario y trabajos adicionales."
        },
        {
          "question": "Pueden intervenir de urgencia?",
          "answer": "Indique su plazo y los trabajos ya iniciados. Confirmamos la disponibilidad y el alcance realizable antes de acordar una fecha de inicio."
        },
        {
          "question": "Trabajan con empresas fuera de Francia?",
          "answer": "Acompañamos a empresas en Francia y España. Las normas contables aplicables y la intervención de asesores legales y fiscales locales se definen para cada misión."
        }
      ]
    },
    "cta": {
      "title": "Prepare su proxima operacion",
      "description": "Describa la operación, el calendario y los documentos disponibles para concretar una primera conversación.",
      "buttonText": "Describir mi necesidad",
      "buttonHref": "/es/contact#due-diligence"
    }
  }
};

export function getMaDueDiligenceContent(locale: Locale): MaDueDiligenceContent { return content[locale]; }
