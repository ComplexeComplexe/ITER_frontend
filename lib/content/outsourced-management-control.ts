import { Locale } from "../i18n";

export interface OutsourcedManagementControlContent {
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

const content: Record<Locale, OutsourcedManagementControlContent> = {
  fr: {
    meta: {
      title: "Contrôle de gestion et FP&A externalisés | Iter Advisors",
      description:
        "Contrôle de gestion externalisé : tableaux de bord KPI, analyses de variance, optimisation des coûts. Reportings mensuels. Démarrage rapide.",
    },
    hero: {
      h1: "Contrôle de gestion et FP&A externalisés",
      intro:
        "Le contrôle de gestion est la clé pour transformer les données financières en décisions stratégiques. Iter Advisors vous offre un contrôle de gestion à temps partiel, flexible et actionnable.",
    },
    sections: [
      {
        heading: "Pourquoi un contrôle de gestion externalisé ?",
        content: [
          "Pilotage en temps réel : Tableaux de bord actualisés chaque semaine pour suivre vos KPI critiques.",
          "Analyses causales : Comprendre pourquoi vos chiffres changent, pas seulement les chiffres eux-mêmes.",
          "Décisions éclairées : Budgets, prix, allocations de ressources basés sur des données, pas sur l'intuition.",
          "Scalabilité : Vous payez pour ce dont vous avez besoin, quand vous en avez besoin.",
        ],
      },
      {
        heading: "Ce que couvre notre service FP&A",
        content: [
          "Tableaux de bord KPI : Chiffre d'affaires, marge brute, CAC, LTV, taux de rétention, cash-burn, etc.",
          "Analyse de variance : Comparaison budget vs réel, identification des écarts significatifs et causes.",
          "Modélisation financière : Scénarios de croissance (base case, optimiste, pessimiste) et analyses de sensibilité.",
          "Unit economics : Calcul des coûts de production, marges par client, par produit, par canal.",
          "Optimisation des coûts : Identification des inefficacités, recommandations d'économies, benchmarking interne.",
        ],
      },
      {
        heading: "Notre processus",
        content: [
          "Diagnostic initial : Audit de votre chaîne de valeur, identification des drivers financiers clés.",
          "Définition des KPI : Ensemble de 8-12 KPI critiques alignés sur votre stratégie.",
          "Mise en place des tableaux de bord : Construction sur Excel, Tableau, Power BI ou Agicap.",
          "Reporting mensuel : Analyse détaillée, tendances, recommandations, réunion de pilotage.",
        ],
      },
      {
        heading: "Outils et technologies",
        content: [
          "Power BI / Tableau : Tableaux de bord interactifs et automatisés.",
          "Agicap : Prévisionnel de trésorerie et KPI financiers en temps réel.",
          "Notion : Documentation des formules, manuels de pilotage, définitions des KPI.",
          "Excel avancé : Modèles financiers sophistiqués, scénarios et analyses what-if.",
        ],
      },
    ],
    faq: {
      title: "Questions fréquentes",
      items: [
        {
          question: "Quel est le coût du contrôle de gestion externalisé ?",
          answer:
            "Entre 2 000 € et 6 000 € par mois selon la complexité de votre activité et le nombre de KPI. Nous proposons un devis après audit.",
        },
        {
          question: "Combien de temps pour mettre en place les tableaux de bord ?",
          answer:
            "Généralement 4-6 semaines. Diagnostic (2 semaines) + mise en place des outils (2 semaines) + validation (2 semaines).",
        },
        {
          question: "Pouvez-vous analyser mes données historiques ?",
          answer:
            "Oui, nous effectuons un retraitement des données historiques pour calculer les KPI rétrospectifs et identifier les tendances.",
        },
        {
          question: "Qui définit les KPI à suivre ?",
          answer:
            "Nous proposons des KPI standards par secteur, puis nous les affinons avec vous selon votre stratégie et vos priorités.",
        },
      ],
    },
    cta: {
      title: "Prêt à piloter votre business par les données ?",
      description:
        "Consultez un expert en FP&A. Nous analysons vos besoins et vous proposons un plan d'action.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Outsourced Management Control & FP&A | Iter Advisors",
      description:
        "Management control & FP&A: KPI dashboards, variance analysis, cost optimization. Monthly reporting. Predictable fees. Start in 4 weeks.",
    },
    hero: {
      h1: "Outsourced Management Control & FP&A Services",
      intro:
        "Management control turns financial data into strategic decisions. Iter Advisors provides part-time, flexible, and actionable management control tailored to your growth stage.",
    },
    sections: [
      {
        heading: "Why Outsource Management Control?",
        content: [
          "Real-Time Monitoring: Weekly dashboards to track your critical KPIs and business health.",
          "Causal Analysis: Understand why your numbers change, not just what they are.",
          "Data-Driven Decisions: Budgets, pricing, and resource allocation based on analytics, not intuition.",
          "Scalability: Pay for what you need, when you need it. Scale up or down as you grow.",
        ],
      },
      {
        heading: "What Our FP&A Service Includes",
        content: [
          "KPI Dashboards: Revenue, gross margin, CAC, LTV, retention rate, cash burn, churn, payback period",
          "Variance Analysis: Budget vs. actual comparison, driver identification, root-cause analysis",
          "Financial Modeling: Growth scenarios (base, optimistic, pessimistic), sensitivity analysis, forecasting",
          "Unit Economics: Cost per customer, margin by product/channel, contribution analysis",
          "Cost Optimization: Inefficiency identification, savings recommendations, benchmarking",
        ],
      },
      {
        heading: "Our Engagement Process",
        content: [
          "Initial Diagnostic: Audit of your value chain, identify financial drivers and strategic priorities.",
          "KPI Definition: Build a set of 8–12 critical KPI aligned with your strategy and growth stage.",
          "Dashboard Setup: Build on Excel, Tableau, Power BI, or Agicap—your choice.",
          "Monthly Reporting: Detailed analysis, trend interpretation, recommendations, business review meeting.",
        ],
      },
      {
        heading: "Tools & Technology",
        content: [
          "Power BI / Tableau: Interactive, automated dashboards with drill-down capability.",
          "Agicap: Real-time cash forecasting and financial KPI aggregation.",
          "Notion: Documentation of formulas, KPI definitions, methodology guides.",
          "Advanced Excel: Sophisticated financial models, scenario building, what-if analysis.",
        ],
      },
    ],
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "What does outsourced management control cost?",
          answer:
            "€2,000–€6,000/month depending on complexity and number of KPI. We provide a custom quote after an assessment.",
        },
        {
          question: "How long to implement dashboards?",
          answer:
            "Typically 4–6 weeks: diagnosis (2 weeks) + tool setup (2 weeks) + validation (1–2 weeks).",
        },
        {
          question: "Can you analyze my historical data?",
          answer:
            "Yes, we reprocess historical data to calculate retroactive KPI and identify trends over time.",
        },
        {
          question: "Who decides which KPI to track?",
          answer:
            "We propose industry-standard KPI, then customize them with you based on your strategy and priorities.",
        },
      ],
    },
    cta: {
      title: "Ready to Drive Decisions with Data?",
      description:
        "Talk to an FP&A expert. We'll assess your needs and propose a tailored implementation plan.",
      buttonText: "Book a free consultation",
      buttonHref: "/contact",
    },
  },
  es: {
    meta: {
      title: "Control de gestión y FP&A externalizados | Iter Advisors",
      description:
        "Control de gestión: cuadros de mando KPI, análisis de varianza, optimización de costos. Reportes mensuales. Comienza en 4 semanas.",
    },
    hero: {
      h1: "Control de gestión y FP&A externalizados",
      intro:
        "El control de gestión transforma datos financieros en decisiones estratégicas. Iter Advisors ofrece control de gestión a tiempo parcial, flexible y basado en datos.",
    },
    sections: [
      {
        heading: "¿Por qué externalizar el control de gestión?",
        content: [
          "Monitoreo en tiempo real: Cuadros de mando semanales para seguir tus KPI críticos.",
          "Análisis causal: Entiende por qué cambian tus números, no solo cuáles son.",
          "Decisiones basadas en datos: Presupuestos, precios y asignación de recursos respaldados por análisis.",
          "Escalabilidad: Paga solo lo que necesitas, cuando lo necesitas.",
        ],
      },
      {
        heading: "Qué incluye nuestro servicio FP&A",
        content: [
          "Cuadros de mando KPI: Ingresos, margen bruto, CAC, LTV, retención, quema de caja, etc.",
          "Análisis de varianza: Presupuesto vs. real, identificación de conductores de varianza.",
          "Modelado financiero: Escenarios de crecimiento, análisis de sensibilidad, pronósticos.",
          "Unidad económica: Costos por cliente, márgenes por producto/canal, análisis de contribución.",
          "Optimización de costos: Identificación de ineficiencias, recomendaciones de ahorro.",
        ],
      },
      {
        heading: "Nuestro proceso de compromiso",
        content: [
          "Diagnóstico inicial: Auditoría de tu cadena de valor, identificación de conductores financieros.",
          "Definición de KPI: Conjunto de 8-12 KPI críticos alineados con tu estrategia.",
          "Configuración de cuadros de mando: Construcción en Excel, Tableau, Power BI o Agicap.",
          "Reportaje mensual: Análisis detallado, interpretación de tendencias, recomendaciones.",
        ],
      },
      {
        heading: "Herramientas y tecnología",
        content: [
          "Power BI / Tableau: Cuadros de mando interactivos y automatizados.",
          "Agicap: Pronóstico de tesorería y agregación de KPI financieros en tiempo real.",
          "Notion: Documentación de fórmulas, definiciones de KPI, guías de metodología.",
          "Excel avanzado: Modelos financieros sofisticados, análisis de escenarios.",
        ],
      },
    ],
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "¿Cuál es el costo del control de gestión externalizado?",
          answer:
            "€2.000–€6.000/mes según complejidad y cantidad de KPI. Ofrecemos presupuesto personalizado.",
        },
        {
          question: "¿Cuánto tiempo para implementar los cuadros de mando?",
          answer:
            "Típicamente 4–6 semanas: diagnóstico (2 semanas) + configuración (2 semanas) + validación (1–2 semanas).",
        },
        {
          question: "¿Pueden analizar mis datos históricos?",
          answer:
            "Sí, reprocesamos datos históricos para calcular KPI retroactivos e identificar tendencias.",
        },
        {
          question: "¿Quién decide qué KPI rastrear?",
          answer:
            "Proponemos KPI estándar por industria, luego los personalizamos según tu estrategia.",
        },
      ],
    },
    cta: {
      title: "¿Listo para impulsar decisiones con datos?",
      description:
        "Consulta con un experto en FP&A. Evaluamos tus necesidades y proponemos un plan de implementación.",
      buttonText: "Solicitar consulta gratuita",
      buttonHref: "/contact",
    },
  },
};

export function getOutsourcedManagementControlContent(
  locale: Locale
): OutsourcedManagementControlContent {
  return content[locale] || content.en;
}
