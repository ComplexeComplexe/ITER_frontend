/**
 * Localized fallback content for service pages in English and Spanish
 * Used when Strapi is unavailable to provide non-French content
 */

import type { StrapiServiceSinglePage } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";
import { fallbackServicePages } from "@/lib/fallback-service-pages";

const createParagraph = (text: string) => ({
  type: "paragraph" as const,
  children: [{ type: "text" as const, text }],
});

const createHeading = (text: string, level: 2 | 3 = 2) => ({
  type: "heading" as const,
  level,
  children: [{ type: "text" as const, text }],
});

const createList = (items: string[]) => ({
  type: "list" as const,
  format: "unordered" as const,
  children: items.map((text) => ({
    type: "list-item" as const,
    children: [{ type: "text" as const, text }],
  })),
});

// English fallback service pages
const fallbackServicePagesEn: Record<string, StrapiServiceSinglePage> = {
  "previsionnel-tresorerie": {
    heroTitle: "Cash Flow Forecast",
    heroSubtitle: "13-Week Rolling Model - Anticipate Your Cash Needs",
    content: [
      createParagraph("Build a robust cash flow forecast to anticipate cash tensions, optimize working capital, and secure your financial runway."),
      createHeading("Why a Cash Flow Forecast?"),
      createList([
        "Identify periods of cash tension",
        "Optimize your working capital requirement",
        "Plan your financing needs",
        "Monitor cash position monthly",
      ]),
      createParagraph("Our team helps you implement and maintain a rolling 13-week cash flow forecast adapted to your industry."),
    ],
    faq: [
      {
        id: 1,
        question: "How long does implementation take?",
        answer: [createParagraph("Typically 2-3 weeks to define structure and assumptions, then 1-2 weeks for system integration.")],
      },
    ],
    seo: {},
  },
  "gestion-financiere-externalisee": {
    heroTitle: "Part-time Financial Management",
    heroSubtitle: "Financial leadership tailored to your company's size and needs",
    content: [
      createParagraph("Outsourced financial management has become essential for companies wanting to control their finances while focusing on their core business. It means delegating all or part of financial functions to an external expert."),
      createParagraph("Whether you're a startup, SME, or mid-market company, this approach offers strategic advantages: reduced fixed costs, access to specialized skills, and improved financial processes."),
      createHeading("What is Part-time Financial Management?"),
      createParagraph("Part-time financial management means delegating financial functions to an external consultant or fractional CFO. Services typically include:"),
      createList([
        "Cash management: monitoring financial flows and anticipating liquidity needs",
        "Management control: cost analysis, margin management, and reporting",
        "Accounting supervision: coordination with accountants and tax compliance",
        "Strategic guidance: support with financing decisions, fundraising, and budgeting",
      ]),
      createHeading("Key Benefits"),
      createList([
        "Access to specialized expertise and experience",
        "Reduced operating costs compared to full-time hiring",
        "Improved financial processes and governance",
        "Flexible engagement based on your needs",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "What is the cost compared to a full-time CFO?",
        answer: [createParagraph("Part-time CFO services typically cost 30-50% less than a full-time hire, while providing more experience and flexibility.")],
      },
    ],
    seo: {},
  },
  "comptabilite-externalisation": {
    heroTitle: "Accounting Services",
    heroSubtitle: "Bookkeeping, Filings & Close - Migration in 2 weeks",
    content: [
      createParagraph("Outsourced accounting ensures accurate financial records and regulatory compliance without the cost of internal staff."),
      createHeading("What We Handle"),
      createList([
        "Monthly bookkeeping and reconciliation",
        "Tax filings and compliance",
        "Financial statement preparation",
        "Audit support and coordination",
      ]),
      createHeading("Benefits"),
      createList([
        "Compliance and accuracy",
        "Cost savings vs. internal staff",
        "Expert guidance on tax optimization",
        "Time savings for your team",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "How long is the migration process?",
        answer: [createParagraph("Most companies transition to our accounting services within 2 weeks, depending on your existing systems and volume of transactions.")],
      },
    ],
    seo: {},
  },
  "controle-de-gestion-externalise": {
    heroTitle: "Part-time Management Control",
    heroSubtitle: "Financial Dashboards, Cost Analysis & Profitability Optimization",
    content: [
      createParagraph("Management control helps you understand your business performance through financial analysis and strategic planning."),
      createHeading("What is Management Control?"),
      createParagraph("Management control provides ongoing analysis of your financial performance to guide business decisions. It includes cost analysis, profitability by product or customer, variance analysis, and forecasting."),
      createHeading("Key Services"),
      createList([
        "Monthly financial dashboards and KPI tracking",
        "Cost analysis and profitability studies",
        "Budget variance analysis",
        "Forecast updates and scenario planning",
      ]),
      createHeading("Expected Outcomes"),
      createList([
        "Better visibility into your business performance",
        "Faster decision-making with reliable data",
        "Improved margins and cost efficiency",
        "Stronger investor conversations",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "How often do you provide reports?",
        answer: [createParagraph("We deliver monthly dashboards and analyses, with flexibility for more frequent reviews during critical periods like fundraising or expansion.")],
      },
    ],
    seo: {},
  },
  "accompagnement-levee-de-fond": {
    heroTitle: "Fundraising Support",
    heroSubtitle: "Prepare and succeed in your fundraising with an experienced partner",
    content: [
      createParagraph("Successful fundraising requires financial credibility, a compelling story, and expert guidance. Our team supports you at every stage."),
      createHeading("Our Support Includes"),
      createList([
        "Financial model development and stress testing",
        "Investor dataroom preparation and documentation",
        "Financial narrative and story development",
        "Due diligence support and Q&A preparation",
        "Term sheet review and negotiation guidance",
      ]),
      createHeading("Why Partner With Us"),
      createList([
        "Proven track record with multiple rounds",
        "Investor-ready financial models and materials",
        "Faster close with organized documentation",
        "Better terms through experienced negotiation",
      ]),
      createHeading("Process"),
      createList([
        "Assessment of your current financials and readiness",
        "Model development and investor materials preparation",
        "Mock investor meetings and pitch practice",
        "Ongoing support through close",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "How long does the preparation phase take?",
        answer: [createParagraph("Typically 4-8 weeks to develop your financial model, clean your data, and prepare investor materials, depending on your starting point.")],
      },
    ],
    seo: {},
  },
};

// Spanish fallback service pages
const fallbackServicePagesEs: Record<string, StrapiServiceSinglePage> = {
  "previsionnel-tresorerie": {
    heroTitle: "Previsión de Tesorería",
    heroSubtitle: "Modelo Deslizante 13 Semanas - Anticipe sus necesidades de caja",
    content: [
      createParagraph("Construya una previsión de tesorería robusta para anticipar tensiones de caja, optimizar su necesidad de capital circulante y asegurar su pista financiera."),
      createHeading("Por qué una previsión de tesorería?"),
      createList([
        "Identificar períodos de tensión de caja",
        "Optimizar su necesidad de capital circulante",
        "Planificar sus necesidades de financiación",
        "Monitorear la posición de caja mensualmente",
      ]),
      createParagraph("Nuestro equipo le ayuda a implementar y mantener una previsión de tesorería deslizante de 13 semanas adaptada a su sector."),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuánto tiempo toma la implementación?",
        answer: [createParagraph("Típicamente 2-3 semanas para definir estructura e hipótesis, luego 1-2 semanas para la integración del sistema.")],
      },
    ],
    seo: {},
  },
  "gestion-financiere-externalisee": {
    heroTitle: "Gestión Financiera Externalizada",
    heroSubtitle: "Una dirección financiera a medida, adaptada al tamaño y retos de tu empresa",
    content: [
      createParagraph("La gestión financiera externalizada se ha convertido en esencial para empresas que quieren controlar sus finanzas concentrándose en su negocio. Consiste en delegar todas o parte de las funciones financieras a un experto externo."),
      createParagraph("Ya sea una startup, PYME o empresa de mid-market, este enfoque ofrece ventajas estratégicas: reducción de costes fijos, acceso a expertise especializado, y mejora de procesos financieros."),
      createHeading("¿Qué es la gestión financiera externalizada?"),
      createParagraph("La gestión financiera externalizada significa delegar funciones financieras a un consultor externo o DAF fraccionario. Los servicios típicamente incluyen:"),
      createList([
        "Gestión de tesorería: monitoreo de flujos y anticipación de necesidades de liquidez",
        "Control de gestión: análisis de costes, gestión de márgenes y reporting",
        "Supervisión contable: coordinación con contables y cumplimiento fiscal",
        "Orientación estratégica: apoyo en decisiones de financiación, captación de fondos y presupuestos",
      ]),
      createHeading("Beneficios Clave"),
      createList([
        "Acceso a expertise especializado y experiencia",
        "Reducción de costes operativos vs. contratación interna",
        "Mejora de procesos financieros y gobernanza",
        "Flexibilidad en el engagement según necesidades",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuál es el coste comparado con un CFO a tiempo completo?",
        answer: [createParagraph("Los servicios de CFO fraccionario típicamente cuestan 30-50% menos que una contratación a tiempo completo, mientras proporcionan más experiencia y flexibilidad.")],
      },
    ],
    seo: {},
  },
  "comptabilite-externalisation": {
    heroTitle: "Servicios Contables",
    heroSubtitle: "Contabilidad, Declaraciones y Cierre - Migración en 2 semanas",
    content: [
      createParagraph("La externalización contable asegura registros financieros precisos y cumplimiento regulatorio sin los costes de personal interno."),
      createHeading("Lo que Manejamos"),
      createList([
        "Contabilidad mensual y conciliación",
        "Declaraciones fiscales y cumplimiento",
        "Preparación de estados financieros",
        "Apoyo de auditoría y coordinación",
      ]),
      createHeading("Beneficios"),
      createList([
        "Cumplimiento y precisión",
        "Ahorro de costes vs. personal interno",
        "Orientación experta en optimización fiscal",
        "Ahorro de tiempo para su equipo",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuánto dura el proceso de migración?",
        answer: [createParagraph("La mayoría de empresas transicionan en 2 semanas, dependiendo de sus sistemas existentes y volumen de transacciones.")],
      },
    ],
    seo: {},
  },
  "controle-de-gestion-externalise": {
    heroTitle: "Control de Gestión Externalizado",
    heroSubtitle: "Cuadros de Mando Financieros, Análisis de Costes y Optimización de Rentabilidad",
    content: [
      createParagraph("El control de gestión le ayuda a entender el rendimiento de su negocio a través de análisis financiero y planificación estratégica."),
      createHeading("¿Qué es el control de gestión?"),
      createParagraph("El control de gestión proporciona análisis continuo del rendimiento financiero para guiar decisiones empresariales. Incluye análisis de costes, rentabilidad por producto o cliente, análisis de varianzas y pronósticos."),
      createHeading("Servicios Principales"),
      createList([
        "Cuadros de mando financieros mensuales y seguimiento de KPIs",
        "Análisis de costes y estudios de rentabilidad",
        "Análisis de varianza presupuestaria",
        "Actualizaciones de pronósticos y planificación de escenarios",
      ]),
      createHeading("Resultados Esperados"),
      createList([
        "Mejor visibilidad del rendimiento de su negocio",
        "Toma de decisiones más rápida con datos fiables",
        "Márgenes mejorados y eficiencia de costes",
        "Conversaciones más sólidas con inversores",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Con qué frecuencia proporcionan reportes?",
        answer: [createParagraph("Entregamos cuadros de mando mensuales, con flexibilidad para revisiones más frecuentes durante períodos críticos como captación de fondos o expansión.")],
      },
    ],
    seo: {},
  },
  "accompagnement-levee-de-fond": {
    heroTitle: "Apoyo en Captación de Fondos",
    heroSubtitle: "Prepare y tenga éxito en sus rondas con un socio experimentado",
    content: [
      createParagraph("La captación de fondos exitosa requiere credibilidad financiera, una historia convincente y orientación experta. Nuestro equipo le apoya en cada etapa."),
      createHeading("Nuestro Apoyo Incluye"),
      createList([
        "Desarrollo de modelo financiero y stress-testing",
        "Preparación de dataroom para inversores",
        "Desarrollo de narrativa financiera",
        "Apoyo en due diligence y preparación de preguntas",
        "Revisión de term sheet y orientación en negociación",
      ]),
      createHeading("Por Qué Asociarse con Nosotros"),
      createList([
        "Track record comprobado con múltiples rondas",
        "Modelos financieros y materiales listos para inversores",
        "Cierre más rápido con documentación organizada",
        "Mejores condiciones a través de negociación experta",
      ]),
      createHeading("Proceso"),
      createList([
        "Evaluación de sus finanzas actuales y preparación",
        "Desarrollo de modelo y preparación de materiales",
        "Simulacros de presentación ante inversores",
        "Apoyo continuo hasta cierre",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuánto tiempo toma la fase de preparación?",
        answer: [createParagraph("Típicamente 4-8 semanas para desarrollar su modelo financiero, limpiar sus datos y preparar materiales para inversores, dependiendo de su punto de partida.")],
      },
    ],
    seo: {},
  },
};

export function getFallbackServicePage(
  slug: string,
  locale: Locale
): StrapiServiceSinglePage | undefined {
  if (locale === "en") {
    return fallbackServicePagesEn[slug];
  }
  if (locale === "es") {
    return fallbackServicePagesEs[slug];
  }
  return undefined;
}

/**
 * INDEX-04 — single static resolver replacing `getServiceSinglePage` in
 * route handlers. Synchronous (no Strapi/network call), so route SSR
 * never throws / hits the catch-all 500 page when CMS is offline.
 */
export function getStaticServicePage(
  slug: string,
  locale: Locale
): StrapiServiceSinglePage | null {
  if (locale === "fr") {
    return fallbackServicePages[slug] ?? null;
  }
  return getFallbackServicePage(slug, locale) ?? null;
}
