import { Locale } from "../i18n";

export interface CashFlowForecastContent {
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

const content: Record<Locale, CashFlowForecastContent> = {
  fr: {
    meta: {
      title: "Flux de trésorerie et prévisionnel - Guide complet | Iter Advisors",
      description: "Maîtrisez votre flux de trésorerie avec notre guide complet. Modèles 13 semaines, templates et bonnes pratiques pour sécuriser votre runway.",
    },
    hero: {
      h1: "Cash Flow Forecast: L'outil financier essentiel pour les startups",
      intro: "Le flux de trésorerie est le cœur de votre startup. Ce guide vous montre comment construire et maintenir un prévisionnel robuste de 13 semaines—l'or standard de la gestion financière des startups.",
    },
    sections: [
      {
        heading: "Pourquoi le prévisionnel de trésorerie est non-négociable pour les startups",
        content: [
          "Vous pouvez avoir des bénéfices positifs et faire faillite. Pourquoi ? Parce que le cash est différent du profit.",
          "Sans un prévisionnel de trésorerie, vous naviguez à l'aveugle.",
        ],
      },
      {
        heading: "Les quatre problèmes que le prévisionnel de trésorerie résout",
        content: [
          "Anticipe les déficits de trésorerie - Identifiez les mois où vous aurez besoin d'un financement externe",
          "Optimise le besoin en fonds de roulement - Comprenez l'écart entre le paiement des fournisseurs et la collecte des clients",
          "Sécurise les conversations de financement - Les investisseurs veulent une preuve que vous avez pensé au runway",
          "Guide la prise de décision - Le runway de trésorerie façonne les décisions : embaucher maintenant ou attendre ?",
        ],
      },
      {
        heading: "Qu'est-ce qu'un prévisionnel de trésorerie ?",
        content: [
          "Un prévisionnel de trésorerie prédit chaque euro entrant et sortant de votre entreprise sur une période spécifique—généralement les 13 prochaines semaines.",
          "Entrees: Paiements des clients, rounds de financement, emprunts, autres revenus",
          "Sorties: Salaires, fournisseurs, loyer, marketing, services professionnels, impôts, remboursement de dettes, investissements",
        ],
      },
      {
        heading: "Pourquoi 13 semaines ? La puissance des prévisionnels glissants",
        content: [
          "Trop court (1-4 semaines): Manque les motifs saisonniers et les gros frais",
          "Trop long (un an complet): La précision se dégrade; les hypothèses deviennent irréalistes",
          "13 semaines (3 mois): Assez granulaire pour les actions hebdomadaires, assez lointain pour attraper les défis à venir",
        ],
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "À quelle fréquence devons-nous mettre à jour notre prévisionnel ?",
          answer: "Chaque semaine est le standard or pour les startups en phase de pré-Series B. Mensuel fonctionne si vous avez des revenus prévisibles et des dépenses stables.",
        },
        {
          question: "Et si notre revenu est trop imprévisible pour être prévu ?",
          answer: "Même les entreprises très volatiles peuvent prévoir de manière conservatrice : utilisez 50% du pipeline comme 'probable', décalez les revenus de 1-2 semaines, suivez la réalité vs prévision chaque semaine.",
        },
        {
          question: "Quand devons-nous lever des fonds ?",
          answer: "Quand votre prévisionnel indique 6 mois de runway restants. Cela vous donne 3-4 mois pour lever sans panique.",
        },
      ],
    },
    cta: {
      title: "Besoin d'aide pour votre prévisionnel de trésorerie ?",
      description: "Iter Advisors aide les startups et les PME à modéliser les scénarios de trésorerie, les stratégies de levée de fonds et l'optimisation du besoin en fonds de roulement.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Cash Flow Forecast 13-Week Rolling Guide | Iter Advisors",
      description: "Master cash flow forecasting: 13-week rolling models, templates and best practices to avoid cash crisis and manage startup runway. Guide by Iter Advisors.",
    },
    hero: {
      h1: "Cash Flow Forecasting Services for Growing Businesses",
      intro: "Cash flow is king. While startups focus on growth and revenue, many fail because they run out of cash. This comprehensive guide shows you how to build and maintain a 13-week rolling cash flow forecast—the gold standard in startup financial management.",
    },
    sections: [
      {
        heading: "Why Cash Flow Forecasting Is Non-Negotiable for Startups",
        content: [
          "You can have positive earnings and still go bankrupt. Why? Because cash is different from profit.",
          "Real-world scenario: A SaaS startup grows revenue 50% year-over-year. Profit margins improve. Yet the CFO becomes increasingly anxious—because customer payments arrive 45 days late, while employee salaries must be paid weekly.",
          "Without a cash flow forecast, you're flying blind.",
        ],
      },
      {
        heading: "The Four Problems Cash Flow Forecasting Solves",
        content: [
          "Anticipates Cash Gaps - Identify months when you'll need external funding or when cash drops below safe minimums",
          "Optimizes Working Capital - Understand the gap between paying suppliers and collecting from customers",
          "Secures Funding Conversations - Investors want proof you've thought about cash runway; a good forecast is credible evidence",
          "Guides Decision-Making - Knowing cash runway shapes decisions: hire now or wait? Launch new product or refocus?",
        ],
      },
      {
        heading: "What Is a Cash Flow Forecast?",
        content: [
          "A cash flow forecast predicts every dollar flowing in and out of your business over a specific period—typically the next 13 weeks.",
          "Inflows: Customer payments (ARR, subscription, project fees), Investor funding rounds, Loans or credit lines, Other revenue (partnerships, grants)",
          "Outflows: Employee salaries and benefits, Vendor payments (COGS, subscriptions, tools), Rent and facilities, Marketing and sales, Professional services, Taxes and compliance, Debt repayment, Capital expenditure",
        ],
      },
      {
        heading: "Why 13 Weeks? The Power of Rolling Forecasts",
        content: [
          "Too short (1-4 weeks): Misses seasonal patterns and large expenses",
          "Too long (full year): Accuracy degrades; assumptions become unrealistic",
          "13 weeks (3 months): Granular enough for weekly actions, far enough to catch upcoming challenges",
          "How it works: Every week, you drop the oldest week and add a new week 13 weeks out. This keeps you constantly looking ahead while staying grounded in recent reality.",
        ],
      },
      {
        heading: "Building Your First Cash Flow Forecast: Step-by-Step",
        content: [
          "Step 1: Choose Your Unit and Frequency - Decide if you're forecasting weekly, biweekly, or monthly",
          "Step 2: Map Your Revenue Streams - List every way cash enters your business",
          "Step 3: Map Your Cash Outflows - Create a detailed expense calendar (fixed, variable, irregular)",
          "Step 4: Create Your Excel Model - Build a simple 13-week rolling forecast structure",
          "Step 5: Update Weekly - Pick a day each week to update: adjust assumptions, add new expenses, review the horizon, drop oldest week and add week 14",
        ],
      },
      {
        heading: "Critical Metrics to Track",
        content: [
          "Cash Runway: Definition: Months of cash remaining at current burn rate. Formula: Current Cash / Average Monthly Burn",
          "Interpretation: 0-3 months = Emergency funding needed (NOW), 3-6 months = Start fundraising immediately, 6-12 months = Comfortable position, 12+ months = Focus on operations/growth",
          "Cash Conversion Cycle: Days between paying suppliers and collecting from customers. A 45-day cycle means your business must carry 45 days of cash.",
          "Monthly Cash Burn: Track obsessively in your first 2 years. When net burn reaches zero, you've hit cash flow breakeven.",
        ],
      },
      {
        heading: "Common Cash Flow Mistakes to Avoid",
        content: [
          "Mistake 1: Being Too Optimistic on Revenue Timing - Use historical data, not best-case assumptions",
          "Mistake 2: Forgetting Payroll Tax Liability - Segregate payroll tax in a separate account",
          "Mistake 3: Underestimating 'Nice to Have' Expenses - Create a 'discretionary expenses' bucket",
          "Mistake 4: Forecasting Funding Like Guaranteed Income - Separate 'base case' (no new funding) from 'optimistic' forecast",
        ],
      },
    ],
    faq: {
      title: "FAQ: Cash Flow Forecasting",
      items: [
        {
          question: "How frequently should we update our forecast?",
          answer: "Weekly is the gold standard for early startups (pre-Series B). Monthly works if you have predictable revenue and stable expenses. Daily updates are usually wasteful.",
        },
        {
          question: "What if revenue is too unpredictable to forecast?",
          answer: "Even high-volatility businesses can forecast conservatively: Use 50% of pipeline as 'likely', Push all revenue 1-2 weeks later than expected, Track actual vs. forecast every week to improve.",
        },
        {
          question: "When should we raise money?",
          answer: "When your forecast shows 6 months of runway remaining. This gives you 3-4 months to fundraise without panic.",
        },
        {
          question: "Should we include buffer for unexpected costs?",
          answer: "Yes. Add a 'contingency' line item of 10-15% of operating expenses. Real emergencies happen (broken infrastructure, urgent hire, legal issue).",
        },
      ],
    },
    cta: {
      title: "Need help building or interpreting your cash flow forecast?",
      description: "Iter Advisors helps startups and scale-ups model cash scenarios, fundraising strategies, and working capital optimization.",
      buttonText: "Schedule a consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Flujo de Caja para Startups: Guía Completa del Modelo Rodante de 13 Semanas | 2026",
      description: "Domina la previsión de tesorería: modelos rodantes de 13 semanas, plantillas y mejores prácticas para evitar crisis de efectivo. Guía de Iter Advisors.",
    },
    hero: {
      h1: "Flujo de Caja: La Herramienta Financiera Esencial para Startups",
      intro: "El flujo de caja es lo más importante. Aunque las startups se enfoquen en crecimiento e ingresos, muchas fracasan porque se quedan sin dinero. Esta guía integral te muestra cómo construir y mantener un flujo de caja rodante de 13 semanas.",
    },
    sections: [
      {
        heading: "¿Por qué la previsión de flujo de caja es innegociable para startups?",
        content: [
          "Puedes tener ganancias positivas e ir a la quiebra. ¿Por qué? Porque el efectivo es diferente de la ganancia.",
          "Sin una previsión de flujo de caja, vuelas a ciegas.",
        ],
      },
      {
        heading: "Los cuatro problemas que resuelve la previsión de flujo de caja",
        content: [
          "Anticipa déficits de efectivo - Identifica meses cuando necesitarás financiamiento externo",
          "Optimiza el capital de trabajo - Comprende la brecha entre pagar proveedores y cobrar clientes",
          "Asegura conversaciones de financiación - Los inversores quieren prueba de que pensaste en el runway de efectivo",
          "Guía la toma de decisiones - Saber el runway de efectivo forma decisiones: ¿contratar ahora o esperar?",
        ],
      },
      {
        heading: "¿Qué es una previsión de flujo de caja?",
        content: [
          "Una previsión de flujo de caja predice cada dólar que entra y sale de tu negocio durante un período específico—típicamente las próximas 13 semanas.",
          "Entradas: Pagos de clientes, rondas de inversión, préstamos, otros ingresos",
          "Salidas: Salarios, proveedores, alquiler, marketing, servicios profesionales, impuestos, reembolso de deudas, gastos de capital",
        ],
      },
      {
        heading: "¿Por qué 13 semanas? El poder de los pronósticos rodantes",
        content: [
          "Muy corto (1-4 semanas): Pierde patrones estacionales y gastos grandes",
          "Muy largo (un año completo): La precisión se degrada; los supuestos se vuelven poco realistas",
          "13 semanas (3 meses): Lo suficientemente granular para acciones semanales, lo suficientemente lejano para anticipar desafíos",
        ],
      },
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Con qué frecuencia debemos actualizar nuestro pronóstico?",
          answer: "Semanalmente es el estándar oro para startups tempranas (pre-Serie B). Mensualmente funciona si tienes ingresos predecibles y gastos estables.",
        },
        {
          question: "¿Qué si nuestro ingreso es demasiado impredecible para pronosticar?",
          answer: "Incluso negocios altamente volátiles pueden pronosticar conservadoramente: usa 50% del pipeline como 'probable', posterga ingresos 1-2 semanas, rastrea real vs. pronóstico cada semana.",
        },
        {
          question: "¿Cuándo debemos recaudar fondos?",
          answer: "Cuando tu pronóstico muestre 6 meses de runway restantes. Esto te da 3-4 meses para recaudar sin pánico.",
        },
      ],
    },
    cta: {
      title: "¿Necesitas ayuda construyendo tu previsión de flujo de caja?",
      description: "Iter Advisors ayuda a startups y empresas en crecimiento a modelar escenarios de flujo de caja, estrategias de recaudación y optimización del capital de trabajo.",
      buttonText: "Agendar una consulta",
      buttonHref: "/es/contact",
    },
  },
};

export function getCashFlowForecastContent(locale: Locale): CashFlowForecastContent {
  return content[locale];
}
