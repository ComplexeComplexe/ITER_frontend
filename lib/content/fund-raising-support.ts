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
  fr: {
    meta: {
      title: "Accompagnement levée de fonds - Iter Advisors",
      description:
        "Levée de fonds externalisée : modèles financiers, data rooms, pitch decks. Plus de 100 M€ levés par nos clients depuis 2021. Expertise Seed à Series B.",
    },
    hero: {
      h1: "Accompagnement levée de fonds pour startups",
      intro:
        "La levée de fonds est un marathon, pas un sprint. Iter Advisors accompagne les startups et PME à chaque étape : préparation financière, modélisation, présentation aux investisseurs et due diligence.",
    },
    sections: [
      {
        heading: "Pourquoi accompagnement professionnel pour une levée de fonds ?",
        content: [
          "Crédibilité financière : Les investisseurs cherchent des fondateurs qui maîtrisent leurs chiffres. Un modèle financier robuste est une signature de compétence.",
          "Temps d'équipe libéré : Votre CEO focus sur le produit et les clients, pas sur l'Excel et les réunions avec les investisseurs.",
          "Optimisation du prix de la levée : Une bonne préparation financière permet de négocier une valuation plus favorable.",
          "Réduction des risques : Anticipate les questions difficiles des investisseurs et préparez les réponses.",
        ],
      },
      {
        heading: "Ce que couvre notre service",
        content: [
          "Diagnostic financier : Audit de votre base financière, identification des forces et faiblesses.",
          "Modèles financiers : Construction de prévisionnels 3-5 ans (P&L, trésorerie, bilan) selon les hypothèses de croissance.",
          "Data room : Organisation de vos documents légaux, fiscaux, financiers et opérationnels.",
          "Investor deck support : Validation des slides financières, histoires alignées avec les données.",
          "Due diligence management : Préparation aux questions des investisseurs, organisation des documents pour audit.",
          "Post-investment support : Aide à la signature et intégration des termes de la levée.",
        ],
      },
      {
        heading: "Notre processus",
        content: [
          "Semaine 1-2 : Diagnostic initial et audit financier complet.",
          "Semaine 3-4 : Construction du modèle financier et scénarios de croissance.",
          "Semaine 5-6 : Préparation de la data room et validation des documents.",
          "Semaine 7+ : Suivi des discussions avec les investisseurs et support due diligence.",
        ],
      },
      {
        heading: "Outils et technologies",
        content: [
          "Modèles Excel sophistiqués : Scénarios dynamiques, analyses de sensibilité, planning détaillé.",
          "Notion : Organisation de la data room et documents d'investisseurs.",
          "Google Slides / PowerPoint : Support sur les slides financières du pitch deck.",
          "Agicap : Suivi de trésorerie en temps réel pendant la levée.",
        ],
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Combien de temps prend une levée de fonds ?",
          answer:
            // DONNÉE (2026-08-31, Guillaume Rostand) — durée réelle observée sur
            // les levées accompagnées : 6 à 9 mois de bout en bout.
            "Sur les levées que nous accompagnons, comptez 6 à 9 mois entre le début de la préparation et le closing. La préparation — comptes, data room, modèle financier — prend 2 à 3 mois ; la phase investisseurs, de la prise de contact à la signature, 4 à 6 mois. C'est la préparation que nous compressons, pas la décision des fonds.",
        },
        {
          question: "Pouvez-vous m'aider même si mes chiffres sont mauvais ?",
          answer:
            "Oui. Un modèle transparent et honnête avec un plan d'amélioration est plus crédible qu'une histoire trop belle. Nous aidons à narrer les chiffres de manière à montrer la trajectoire positive.",
        },
        {
          question: "Que se passe-t-il si je n'obtiens pas ma levée ?",
          answer:
            "Les modèles financiers et la clarté acquise vous sont utiles au-delà de la levée : amélioration de votre pilotage, conversations avec les banques ou clients stratégiques.",
        },
        {
          question: "Travaillez-vous avec tous les types de startups ?",
          answer:
            "Oui. SaaS, e-commerce, deeptech, services, fintech. Chaque secteur a sa logique financière ; nous adaptons les modèles à votre réalité.",
        },
      ],
    },
    cta: {
      title: "Prêt à lever des fonds ?",
      description:
        "Consultez un expert Iter Advisors. Nous analysons votre situation actuelle et proposons un plan d'accompagnement adapté.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Fundraising Support for Startups | Iter Advisors",
      description:
        "Financial model, data room, investor deck: we prepare your Series A from A to Z. €100M+ raised by our clients.",
    },
    hero: {
      h1: "Fund-Raising Support for Startups",
      intro:
        "Fundraising is a marathon, not a sprint. Iter Advisors guides startups and SMEs through every stage: financial preparation, modeling, investor presentations, and due diligence.",
    },
    sections: [
      {
        heading: "Why Professional Fund-Raising Support Matters",
        content: [
          "Financial Credibility: Investors look for founders who own their numbers. A robust financial model is a signature of competence.",
          "Time Back to Your Team: Your CEO focuses on product and customers, not Excel and investor meetings.",
          "Valuation Optimization: Strong financial preparation enables better negotiation of valuation and terms.",
          "Risk Mitigation: Anticipate tough investor questions and prepare answers rooted in data.",
        ],
      },
      {
        heading: "What Our Fund-Raising Service Covers",
        content: [
          "Financial Diagnostic: Full audit of your current financial state, strengths, and weaknesses.",
          "Financial Modeling: 3-5 year projections (P&L, cash flow, balance sheet) aligned with realistic growth assumptions.",
          "Data Room Setup: Organization of legal, fiscal, financial, and operational documents for investor review.",
          "Investor Deck Support: Validation of financial slides, alignment of narrative with data.",
          "Due Diligence Management: Preparation for investor questions, document organization for audit.",
          "Post-Investment Support: Signature support and integration of fundraising terms into operations.",
        ],
      },
      {
        heading: "Our Process",
        content: [
          "Weeks 1-2: Initial diagnostic and financial audit.",
          "Weeks 3-4: Build financial models and growth scenarios.",
          "Weeks 5-6: Data room setup and document validation.",
          "Weeks 7+: Investor discussion support and due diligence assistance.",
        ],
      },
      {
        heading: "Tools & Technology",
        content: [
          "Advanced Excel Models: Dynamic scenarios, sensitivity analysis, detailed planning.",
          "Notion: Data room organization and investor document management.",
          "Google Slides / PowerPoint: Financial slide support for pitch decks.",
          "Agicap: Real-time cash flow tracking during the fundraising period.",
        ],
      },
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How long does fundraising take?",
          answer:
            "On the rounds we support, count 6 to 9 months from the start of preparation to closing: 2 to 3 months of preparation (accounts, data room, financial model), then 4 to 6 months with investors, from first contact to signature. Preparation is the phase we compress — not the investors' decision.",
        },
        {
          question: "Can you help me if my numbers are bad?",
          answer:
            "Yes. A transparent, honest model with an improvement plan is more credible than a fairy tale. We help tell your story in a way that shows positive trajectory.",
        },
        {
          question: "What if I don't close the fundraise?",
          answer:
            "The financial models and clarity you gain benefit you beyond fundraising: better operational management, conversations with banks or strategic customers.",
        },
        {
          question: "Do you work with all types of startups?",
          answer:
            "Yes. SaaS, e-commerce, deeptech, services, fintech. Every sector has its financial logic; we adapt models to your reality.",
        },
      ],
    },
    cta: {
      title: "Ready to raise capital?",
      description:
        "Talk to an Iter Advisors expert. We'll assess your current situation and propose a tailored fundraising support plan.",
      buttonText: "Book a free consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Apoyo a la captación de fondos para startups | Iter Advisors",
      description:
        "Apoyo a la captación de fondos: modelos financieros, data rooms, validación de pitches. 50+ rondas acompañadas. Desde Seed hasta Series B.",
    },
    hero: {
      h1: "Apoyo a la captación de fondos para startups",
      intro:
        "La captación de fondos es un maratón, no un sprint. Iter Advisors guía a startups y PMEs en cada etapa: preparación financiera, modelado, presentación a inversores y due diligence.",
    },
    sections: [
      {
        heading: "¿Por qué el apoyo profesional en captación de fondos importa?",
        content: [
          "Credibilidad financiera: Los inversores buscan fundadores que dominen sus números. Un modelo financiero robusto es una firma de competencia.",
          "Tiempo para tu equipo: Tu CEO se enfoca en producto y clientes, no en Excel y reuniones con inversores.",
          "Optimización de valoración: Una buena preparación financiera permite negociar mejor valoración y términos.",
          "Mitigación de riesgos: Anticipa preguntas difíciles de inversores y prepara respuestas basadas en datos.",
        ],
      },
      {
        heading: "Qué cubre nuestro servicio",
        content: [
          "Diagnóstico financiero: Auditoría completa de tu estado financiero actual, fortalezas y debilidades.",
          "Modelos financieros: Proyecciones 3-5 años (P&L, flujo de caja, balance) alineadas con supuestos de crecimiento.",
          "Data room: Organización de documentos legales, fiscales, financieros y operacionales.",
          "Validación de pitch deck: Revisión de slides financieras, alineación de narrativa con datos.",
          "Gestión de due diligence: Preparación para preguntas de inversores, organización de documentos.",
          "Apoyo post-inversión: Soporte en firma e integración de términos de financiación.",
        ],
      },
      {
        heading: "Nuestro proceso",
        content: [
          "Semanas 1-2: Diagnóstico inicial y auditoría financiera.",
          "Semanas 3-4: Construcción de modelos y escenarios de crecimiento.",
          "Semanas 5-6: Setup de data room y validación de documentos.",
          "Semanas 7+: Soporte en conversaciones con inversores y due diligence.",
        ],
      },
      {
        heading: "Herramientas y tecnología",
        content: [
          "Modelos Excel avanzados: Escenarios dinámicos, análisis de sensibilidad, planificación detallada.",
          "Notion: Organización de data room y gestión de documentos.",
          "Google Slides / PowerPoint: Soporte en slides financieras de pitch decks.",
          "Agicap: Seguimiento de flujo de caja en tiempo real.",
        ],
      },
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto tiempo toma una ronda de financiación?",
          answer:
            "Seed: 2-3 meses prep, 3-4 meses negociación. Series A/B: 2-3 meses prep, 4-6 meses negociación. Aceleramos la fase de preparación.",
        },
        {
          question: "¿Pueden ayudarme si mis números son malos?",
          answer:
            "Sí. Un modelo transparente y honesto con plan de mejora es más creíble que una historia demasiado bonita. Ayudamos a contar tu historia mostrando trayectoria positiva.",
        },
        {
          question: "¿Qué pasa si no cierro la ronda?",
          answer:
            "Los modelos financieros y claridad que ganas te benefician más allá de la financiación: mejor gestión operativa, conversaciones con bancos o clientes estratégicos.",
        },
        {
          question: "¿Trabajan con todos los tipos de startups?",
          answer:
            "Sí. SaaS, e-commerce, deeptech, servicios, fintech. Cada sector tiene su lógica; adaptamos modelos a tu realidad.",
        },
      ],
    },
    cta: {
      title: "¿Listo para captar fondos?",
      description:
        "Consulta con un experto de Iter Advisors. Evaluamos tu situación actual y proponemos un plan de apoyo personalizado.",
      buttonText: "Solicitar consulta gratuita",
      buttonHref: "/es/contact",
    },
  },
};

export function getFundRaisingSupportContent(
  locale: Locale
): FundRaisingSupportContent {
  return content[locale];
}
