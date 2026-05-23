import { Locale } from "../i18n";

export interface OutsourceYourAccountingContent {
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

const content: Record<Locale, OutsourceYourAccountingContent> = {
  fr: {
    meta: {
      title: "Comptabilité externalisée - Services expert-comptable | Iter Advisors",
      description:
        "Externalisez votre comptabilité : tenue de livres, déclarations fiscales, clôture annuelle. Experts certifiés, Pennylane, Agicap. Démarrage en 2 semaines.",
    },
    hero: {
      h1: "Comptabilité externalisée pour startups et PME",
      intro:
        "La comptabilité est un défi permanent pour les startups : trop complexe pour être laissée en interne, trop coûteuse pour un expert-comptable full-time. Iter Advisors vous offre une comptabilité externalisée complète, fiable et à coût maîtrisé.",
    },
    sections: [
      {
        heading: "Pourquoi externaliser votre comptabilité ?",
        content: [
          "Conformité garantie : Nous assurons que votre comptabilité respecte les normes françaises et les déclarations obligatoires.",
          "Coûts prévisibles : Pas de surprises, pas de factures d'expert-comptable imprévisibles.",
          "Libérez votre temps : Votre équipe se concentre sur le business, pas sur les déclarations fiscales.",
          "Expertise externe : Vous accédez à des experts certifiés sans les frais d'une embauche interne.",
        ],
      },
      {
        heading: "Ce que couvre notre service",
        content: [
          "Tenue de livres complète : Saisie quotidienne, réconciliation, rapprochements bancaires",
          "Paie et charges sociales : Traitement de la paie, déclarations sociales (URSSAF, retraite)",
          "Déclarations fiscales : TVA mensuelle/trimestrielle, impôt sur les sociétés, liasse fiscale",
          "Clôture annuelle : Établissement du bilan, compte de résultat, notes explicatives",
          "Audit interne : Vérification des comptes, détection des anomalies, conseils d'optimisation",
        ],
      },
      {
        heading: "Notre processus : simple et transparent",
        content: [
          "Audit initial (Semaine 1) : Nous analysons votre situation comptable actuelle.",
          "Migration des données (Semaine 2) : Récupération de l'historique, structuration, intégration dans nos systèmes.",
          "Formation et autonomie (Semaine 3-4) : Votre équipe apprend le processus, vérification des premières transactions.",
          "Suivi mensuel : Clôture de mois, reporting financier, réunion avec votre responsable financier.",
        ],
      },
      {
        heading: "Outils et technologies",
        content: [
          "Pennylane : Automatisation des factures, rapprochement bancaire, agrégation des données.",
          "Agicap : Trésorerie et cash-flow prévisionnels en temps réel.",
          "Sage / QuickBooks : Compatibilité avec vos systèmes existants.",
          "Portail client sécurisé : Accès à vos états financiers 24/7.",
        ],
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Combien coûte une comptabilité externalisée ?",
          answer:
            "Les tarifs dépendent de votre chiffre d'affaires, du nombre de transactions et de la complexité. Comptez entre 800 € et 3 000 € par mois pour une startup. Nous proposons un devis sur mesure après audit.",
        },
        {
          question: "Pouvez-vous reprendre ma comptabilité existante ?",
          answer:
            "Oui, c'est notre spécialité. Nous effectuons un audit, retrouvons les pièces justificatives et restructurons vos données. Délai : 2-4 semaines selon l'état du dossier.",
        },
        {
          question: "Qui est responsable en cas d'erreur ?",
          answer:
            "Nous sommes assurés en responsabilité civile professionnelle. Vous conservez la responsabilité légale de vos comptes, mais nous garantissons la fiabilité de notre travail.",
        },
        {
          question: "Comment accédez-vous à mes données ?",
          answer:
            "Via Pennylane, Agicap ou un accès sécurisé à votre logiciel comptable existant. Vous gardez toujours le contrôle de vos données et pouvez révoquer l'accès à tout moment.",
        },
      ],
    },
    cta: {
      title: "Prêt à externaliser votre comptabilité ?",
      description:
        "Consultez un expert Iter Advisors gratuitement. Nous analysons votre situation et vous proposons un devis sans engagement.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title:
        "Outsourced Accounting for Startups & SMEs | Iter Advisors",
      description:
        "Outsource accounting: bookkeeping, tax filings, year-end closing. Certified experts, Pennylane, Agicap. Start in 2 weeks. Free consultation.",
    },
    hero: {
      h1: "Outsourced Accounting Services for Startups & SMEs",
      intro:
        "Accounting is a perpetual challenge for startups: too complex to handle in-house, too expensive for a full-time accountant. Iter Advisors provides complete, reliable outsourced accounting at a predictable cost.",
    },
    sections: [
      {
        heading: "Why Outsource Your Accounting?",
        content: [
          "Compliance Guaranteed: We ensure your accounting meets regulatory requirements and all mandatory filings are completed on time.",
          "Predictable Costs: No surprises, no unpredictable accounting fees. Fixed monthly rates you can budget for.",
          "Free Up Your Team: Your team focuses on business growth, not tax declarations and reconciliations.",
          "Expert Knowledge: You gain access to certified accountants without the cost of a full-time hire.",
        ],
      },
      {
        heading: "What Our Service Covers",
        content: [
          "Complete Bookkeeping: Daily transaction entry, reconciliation, bank matching, audit trail",
          "Payroll & Compliance: Payroll processing, social declarations (tax authorities, pension contributions)",
          "Tax Filings: Monthly/quarterly VAT, corporate tax, annual tax return and supporting schedules",
          "Year-End Closing: Balance sheet, income statement, notes to financial statements, audit-ready documentation",
          "Financial Reporting: Monthly P&L, balance sheet, cash flow statement, KPI analysis",
        ],
      },
      {
        heading: "Our Process: Simple & Transparent",
        content: [
          "Initial Audit (Week 1): We assess your current accounting situation, identify gaps, and plan the transition.",
          "Data Migration (Week 2): We recover historical records, restructure data, and integrate into our systems.",
          "Training & Handoff (Weeks 3-4): Your team learns the process, we verify the first transactions, and you gain independence.",
          "Monthly Closeout: Recurring month-end closing, financial reporting, and review meeting with your CFO or finance lead.",
        ],
      },
      {
        heading: "Tools & Technology",
        content: [
          "Pennylane: Invoice automation, bank reconciliation, real-time data aggregation.",
          "Agicap: Cash flow and liquidity forecasting with live updates.",
          "Sage / QuickBooks Integration: Full compatibility with your existing systems.",
          "Secure Client Portal: 24/7 access to your financial statements and reports.",
        ],
      },
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How much does outsourced accounting cost?",
          answer:
            "Pricing depends on your revenue, transaction volume, and complexity. Expect €800–€3,000/month for a startup. We provide a custom quote after an initial assessment.",
        },
        {
          question: "Can you take over my existing accounting?",
          answer:
            "Yes, that's our specialty. We audit your current books, recover supporting documents, and restructure your data. Timeline: 2–4 weeks depending on the condition of your files.",
        },
        {
          question: "Who is liable if there's an error?",
          answer:
            "We carry professional liability insurance. You retain legal responsibility for your accounts, but we guarantee the accuracy of our work.",
        },
        {
          question: "How do you access my financial data securely?",
          answer:
            "Via Pennylane, Agicap, or secure access to your existing accounting software. You always control your data and can revoke access anytime.",
        },
      ],
    },
    cta: {
      title: "Ready to Outsource Your Accounting?",
      description:
        "Talk to an Iter Advisors expert for free. We'll assess your situation and provide a custom quote—no commitment.",
      buttonText: "Book a free consultation",
      buttonHref: "/contact",
    },
  },
  es: {
    meta: {
      title: "Contabilidad externalizada para startups y PMEs | Iter Advisors",
      description:
        "Externaliza tu contabilidad: teneduría de libros, declaraciones fiscales, cierre anual. Expertos certificados, Pennylane, Agicap. Comienza en 2 semanas.",
    },
    hero: {
      h1: "Contabilidad externalizada para startups y PMEs",
      intro:
        "La contabilidad es un desafío constante para las startups: demasiado compleja para gestionar internamente, demasiado cara para un contador a tiempo completo. Iter Advisors ofrece contabilidad externalizada completa, confiable y a costo predecible.",
    },
    sections: [
      {
        heading: "¿Por qué externalizar tu contabilidad?",
        content: [
          "Cumplimiento garantizado: Aseguramos que tu contabilidad cumpla con las regulaciones y todas las declaraciones obligatorias.",
          "Costos predecibles: Sin sorpresas, sin facturas impredecibles. Tarifas fijas mensuales que puedes presupuestar.",
          "Libera a tu equipo: Tu equipo se enfoca en el crecimiento del negocio, no en declaraciones fiscales.",
          "Conocimiento experto: Acceso a contadores certificados sin el costo de una contratación interna.",
        ],
      },
      {
        heading: "Qué cubre nuestro servicio",
        content: [
          "Teneduría de libros completa: Entrada de transacciones diarias, conciliación, coincidencia bancaria",
          "Nómina y cumplimiento: Procesamiento de nómina, declaraciones sociales y fiscales",
          "Declaraciones fiscales: IVA mensual/trimestral, impuesto sobre la renta, declaración anual",
          "Cierre de año: Balance, cuenta de resultados, notas a los estados financieros",
          "Informes financieros: P&L mensual, balance, flujo de efectivo, análisis de KPI",
        ],
      },
      {
        heading: "Nuestro proceso: simple y transparente",
        content: [
          "Auditoría inicial (Semana 1): Evaluamos tu situación actual.",
          "Migración de datos (Semana 2): Recuperamos el historial, estructuramos datos e integramos en nuestros sistemas.",
          "Capacitación y transición (Semanas 3-4): Tu equipo aprende el proceso, verificamos primeras transacciones.",
          "Cierre mensual recurrente: Cierre de mes, informes financieros, reunión con tu responsable financiero.",
        ],
      },
      {
        heading: "Herramientas y tecnología",
        content: [
          "Pennylane: Automatización de facturas, conciliación bancaria, agregación de datos en tiempo real.",
          "Agicap: Tesorería y flujo de caja previsional.",
          "Sage / QuickBooks: Compatible con tus sistemas existentes.",
          "Portal seguro: Acceso 24/7 a tus estados financieros.",
        ],
      },
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuánto cuesta la contabilidad externalizada?",
          answer:
            "Los precios dependen de tu facturación, volumen de transacciones y complejidad. Espera entre €800 y €3.000/mes para una startup. Ofrecemos presupuesto personalizado.",
        },
        {
          question: "¿Pueden hacerse cargo de mi contabilidad existente?",
          answer:
            "Sí, es nuestra especialidad. Realizamos auditoría, recuperamos documentos y reestructuramos datos. Plazo: 2-4 semanas según el estado.",
        },
        {
          question: "¿Quién es responsable si hay un error?",
          answer:
            "Contamos con seguro de responsabilidad civil profesional. Tú conservas responsabilidad legal, pero garantizamos la exactitud de nuestro trabajo.",
        },
        {
          question: "¿Cómo acceden a mis datos de forma segura?",
          answer:
            "A través de Pennylane, Agicap o acceso seguro a tu software contable. Siempre controlas tus datos y puedes revocar acceso en cualquier momento.",
        },
      ],
    },
    cta: {
      title: "¿Listo para externalizar tu contabilidad?",
      description:
        "Consulta gratis con un experto de Iter Advisors. Evaluamos tu situación y te ofrecemos un presupuesto sin compromiso.",
      buttonText: "Solicitar consulta gratuita",
      buttonHref: "/contact",
    },
  },
};

export function getOutsourceYourAccountingContent(
  locale: Locale
): OutsourceYourAccountingContent {
  return content[locale] || content.en;
}
