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
      // T8 (2026-06-07): enriched from ~110 → ~550 words to fix thin
      // content and trigger indexing on /es/services/prevision-tesoreria.
      createParagraph("La previsión de tesorería es la herramienta financiera más crítica para cualquier PYME o startup. Un beneficio contable no paga las facturas — el efectivo sí. En Iter Advisors construimos modelos de tesorería deslizantes de 13 semanas que anticipan tensiones de caja, optimizan el capital circulante y aseguran su pista financiera (runway) durante los próximos 6 a 24 meses."),
      createParagraph("Más del 60% de las PYMEs españolas que cierran lo hacen siendo rentables sobre el papel pero sin liquidez en cuenta. Una previsión de tesorería bien construida es la diferencia entre detectar un problema con 3 meses de margen o descubrirlo el día que el banco rechaza un pago."),
      createHeading("¿Por qué una previsión de tesorería?"),
      createList([
        "Identificar períodos de tensión de caja antes de que ocurran",
        "Optimizar su necesidad de capital circulante (BFR / working capital)",
        "Planificar sus necesidades de financiación con 3 a 6 meses de antelación",
        "Monitorear la posición de caja semanalmente, no solo al cierre del mes",
        "Negociar condiciones bancarias más favorables con datos sólidos",
        "Reaccionar a crisis (COVID, retraso de un cliente clave) sin pánico",
      ]),
      createHeading("¿Por qué un horizonte de 13 semanas?"),
      createParagraph("13 semanas equivalen a un trimestre completo: lo suficientemente cerca para que las previsiones sean fiables (basadas en facturas emitidas y compromisos contractuales), y lo suficientemente lejos para anticipar tensiones estacionales (vacaciones, cierre fiscal, vencimientos IVA). Más allá de 13 semanas, las previsiones se vuelven hipotéticas — útiles para el plan estratégico anual, pero no para la gestión operativa diaria."),
      createHeading("Nuestra metodología en 3 fases"),
      createList([
        "Fase 1 (2-3 semanas): diagnóstico de su ciclo de caja actual, análisis del DSO/DPO/CCC, identificación de palancas de mejora.",
        "Fase 2 (1-2 semanas): construcción del modelo deslizante en Excel o Google Sheets, conexión con sus herramientas (Pennylane, Sage, QuickBooks, Holded).",
        "Fase 3 (continua): revisión semanal con un DAF senior, alertas automáticas en caso de desviación >10%, ajustes mensuales del escenario base/optimista/pesimista.",
      ]),
      createHeading("KPIs que monitoreamos"),
      createList([
        "Posición de caja a 13 semanas (escenarios base, optimista, pesimista)",
        "DSO (Days Sales Outstanding) — plazo medio de cobro de clientes",
        "DPO (Days Payable Outstanding) — plazo medio de pago a proveedores",
        "CCC (Cash Conversion Cycle) — ciclo de conversión de efectivo",
        "Runway en meses (efectivo disponible / burn rate mensual)",
        "Burn rate neto mensual (para startups en fase de crecimiento)",
      ]),
      createParagraph("Nuestro equipo le ayuda a implementar y mantener una previsión de tesorería deslizante adaptada a su sector y a su estructura. Para una startup pre-Series A el foco está en el runway; para una PYME industrial, en el ciclo de explotación y el BFR. El modelo es siempre personalizado, no plantilla genérica."),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuánto tiempo toma la implementación?",
        answer: [createParagraph("Típicamente 2-3 semanas para definir la estructura, validar las hipótesis con su equipo financiero y conectar con sus herramientas (banca, ERP, software contable). Después, 1-2 semanas para la integración técnica y el primer mes de calibración.")],
      },
      {
        id: 2,
        question: "¿Quién mantiene la previsión después de la puesta en marcha?",
        answer: [createParagraph("Dos modelos posibles: (1) su equipo interno mantiene el modelo con una revisión mensual de Iter Advisors, o (2) Iter Advisors lo mantiene en el marco de una misión de DAF externalizado (a partir de 2 días/mes). El 70% de nuestros clientes eligen la opción 2 durante los primeros 6 meses.")],
      },
      {
        id: 3,
        question: "¿Qué herramientas utilizan?",
        answer: [createParagraph("Para PYMEs: Excel o Google Sheets con macros automatizadas conectadas a su banco vía API (Holded, Quipu, Pennylane). Para empresas más grandes (>50 empleados): Agicap, Float o Cashforce. La elección de la herramienta depende del volumen de transacciones y del nivel de automatización deseado.")],
      },
      {
        id: 4,
        question: "¿Cuánto cuesta el servicio?",
        answer: [createParagraph("La puesta en marcha inicial cuesta entre 3.000 € y 8.000 € según la complejidad. El mantenimiento mensual se integra en un forfait de DAF externalizado a partir de 2.000 €/mes. Solicite un presupuesto personalizado tras un primer diagnóstico gratuito de 30 minutos.")],
      },
    ],
    seo: {},
  },
  "gestion-financiere-externalisee": {
    heroTitle: "Gestión Financiera Externalizada",
    heroSubtitle: "Una dirección financiera a medida, adaptada al tamaño y retos de tu empresa",
    content: [
      // T8 (2026-06-07): enriched from ~180 → ~600 words.
      createParagraph("La gestión financiera externalizada se ha convertido en esencial para empresas que quieren controlar sus finanzas concentrándose en su negocio. Consiste en delegar todas o parte de las funciones financieras a un experto externo — un CFO fraccionario o DAF externalizado — sin asumir el coste de una contratación a tiempo completo."),
      createParagraph("Ya sea una startup en fase de crecimiento, una PYME que estructura su dirección financiera, o una empresa de mid-market que prepara una operación M&A, este enfoque ofrece ventajas estratégicas claras: reducción de costes fijos, acceso a expertise senior desde el primer día, flexibilidad en el alcance de la misión, y mejora medible de los procesos financieros internos."),
      createHeading("¿Qué es la gestión financiera externalizada?"),
      createParagraph("La gestión financiera externalizada (o fractional CFO) significa delegar funciones de dirección financiera a un consultor externo con experiencia de alto nivel — típicamente un ex-CFO de grupo o un DAF senior con 10+ años de experiencia operativa. Los servicios incluyen:"),
      createList([
        "Gestión de tesorería: monitoreo de flujos, previsión deslizante 13 semanas, anticipación de necesidades de liquidez",
        "Control de gestión: análisis de costes, gestión de márgenes, KPIs operativos y reporting mensual",
        "Supervisión contable: coordinación con su gestoría, cumplimiento fiscal (IVA, IS), cierre anual",
        "Orientación estratégica: apoyo en decisiones de financiación, preparación de rondas, presupuestos anuales, planes a 3 años",
        "M&A y due diligence: preparación de operaciones de compra/venta, modelización de escenarios",
      ]),
      createHeading("¿Cuándo externalizar la dirección financiera?"),
      createParagraph("Tres situaciones típicas justifican externalizar la función financiera:"),
      createList([
        "Startups pre-Series A: necesitan un CFO senior para preparar la ronda, pero no pueden permitirse un salario de 80-120k €.",
        "PYMEs en crecimiento (5-50 empleados): la gestoría ya no basta, pero un DAF interno (60-90k €) sería sobredimensionado.",
        "Empresas en transición: cambio de control, integración post-M&A, lanzamiento de filial española — todos casos donde se necesita expertise puntual sin compromiso a largo plazo.",
      ]),
      createHeading("Nuestras 3 fórmulas"),
      createList([
        "Esencial (2-3 días/mes, 2.000-3.500 €/mes): reporting mensual, supervisión de tesorería, copiloto del CEO.",
        "Crecimiento (4-8 días/mes, 3.500-6.000 €/mes): añade control de gestión, presupuestos, KPIs operativos.",
        "Premium (8+ días/mes, 6.000-8.000+ €/mes): para empresas en captación de fondos, M&A o transformación financiera profunda.",
      ]),
      createHeading("Beneficios Clave"),
      createList([
        "Acceso inmediato a expertise senior (10+ años) sin coste de contratación",
        "Reducción de costes operativos del 40-60% vs. una contratación interna equivalente",
        "Mejora medible de procesos financieros y gobernanza (board reporting, comités financieros)",
        "Flexibilidad en el engagement: ampliar o reducir según necesidades, sin penalización",
        "Visión 360° gracias a la experiencia multi-sector y multi-cliente de nuestros DAF",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuál es el coste comparado con un CFO a tiempo completo?",
        answer: [createParagraph("Un CFO interno senior en España cuesta 80.000-130.000 € brutos anuales (con cargas sociales: 100.000-170.000 € coste total empresa). Un CFO fraccionario fórmula Crecimiento cuesta 42.000-72.000 €/año — un ahorro del 40% al 60% — con mayor experiencia (los DAF externos rotan en 30-50 empresas a lo largo de su carrera vs. 5-10 para un CFO interno).")],
      },
      {
        id: 2,
        question: "¿Cómo se integra con mi gestoría actual?",
        answer: [createParagraph("Nuestro DAF no reemplaza a su gestoría — actúa como capa estratégica por encima. La gestoría sigue gestionando la contabilidad operativa (facturas, declaraciones IVA, nóminas). Nuestro DAF supervisa la calidad de la información contable, construye el reporting de gestión y aporta la mirada estratégica que las gestorías no proporcionan.")],
      },
      {
        id: 3,
        question: "¿Cuánto dura una misión típica?",
        answer: [createParagraph("La duración media es de 12-18 meses. Algunas misiones son puntuales (preparación de levantamiento de fondos: 3-6 meses), otras son recurrentes durante años. Sin compromiso de duración mínima — usted puede ajustar o terminar la misión con un preaviso de 30 días.")],
      },
      {
        id: 4,
        question: "¿En qué sectores tienen experiencia?",
        answer: [createParagraph("Nuestro equipo cubre SaaS, e-commerce, industria, retail, servicios B2B, biotech y fintech. Cada misión es atribuida a un DAF cuya experiencia sectorial coincide con su negocio. Para sectores muy específicos (criptoactivos, marketplaces de 2 lados), tenemos asociados especializados.")],
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
      // T8 (2026-06-07): enriched from ~160 → ~580 words.
      createParagraph("El control de gestión es la disciplina financiera que transforma datos contables en decisiones empresariales. Mientras la contabilidad mira al pasado, el control de gestión mira al presente y al futuro: ¿qué productos son rentables? ¿qué clientes pierden dinero? ¿qué palancas accionar para mejorar el margen? Externalizar el control de gestión permite acceder a expertise senior sin contratar un controller a tiempo completo."),
      createParagraph("En Iter Advisors construimos sistemas de control de gestión adaptados al tamaño y al sector de cada cliente. Para una PYME industrial, el foco está en el coste de producción y la productividad por línea. Para una startup SaaS, en el unit economics (CAC, LTV, churn, MRR). Para una empresa de servicios, en la rentabilidad por proyecto y la utilización de los equipos."),
      createHeading("¿Qué es el control de gestión?"),
      createParagraph("El control de gestión proporciona análisis continuo del rendimiento financiero para guiar decisiones empresariales. Incluye 4 grandes bloques: (1) análisis de costes y rentabilidad por producto, cliente o canal; (2) elaboración y seguimiento del presupuesto anual; (3) análisis de varianzas (presupuesto vs. real) con plan de acción; (4) pronósticos rolling forecast y planificación de escenarios."),
      createHeading("Servicios Principales"),
      createList([
        "Cuadros de mando financieros mensuales con KPIs operativos y financieros",
        "Análisis de costes por actividad (ABC), análisis de margen por producto/cliente/canal",
        "Estudios de rentabilidad: punto muerto, contribución, análisis de mix",
        "Elaboración del presupuesto anual con desglose mensual y por unidad de negocio",
        "Análisis de varianza presupuestaria mensual con explicación de las desviaciones",
        "Rolling forecast trimestral y planificación de escenarios (base/optimista/pesimista)",
        "Reporting al board y al consejo de administración: presentaciones ejecutivas, KPIs clave",
      ]),
      createHeading("KPIs típicos que monitoreamos"),
      createList([
        "Margen bruto y EBITDA mensuales, comparados con el presupuesto",
        "DSO, DPO y CCC (gestión del capital circulante)",
        "Para SaaS: MRR, ARR, CAC, LTV, churn neto, magic number",
        "Para retail/e-commerce: rotación de stock, margen por SKU, tasa de conversión",
        "Para servicios: utilización de los equipos, margen por proyecto, backlog",
      ]),
      createHeading("Herramientas que utilizamos"),
      createList([
        "Power BI, Looker o Tableau para los cuadros de mando dinámicos",
        "Pennylane, Sage, Holded o Quipu como fuente de datos contables",
        "Excel/Google Sheets para los modelos financieros personalizados",
        "Finthesis o LucaNet para empresas multi-entidad con consolidación",
      ]),
      createHeading("Resultados Esperados"),
      createList([
        "Visibilidad clara sobre la rentabilidad real de cada producto, cliente y canal",
        "Toma de decisiones más rápida basada en datos fiables y actualizados",
        "Identificación de palancas de mejora del margen (típicamente 3-7 puntos de EBITDA en 12 meses)",
        "Reducción de los plazos de cierre mensual (de 25 a 10 días en media)",
        "Conversaciones más sólidas con inversores, banca y consejo de administración",
      ]),
    ],
    faq: [
      {
        id: 1,
        question: "¿Con qué frecuencia proporcionan reportes?",
        answer: [createParagraph("Entregamos cuadros de mando mensuales en los 10 días posteriores al cierre. Durante períodos críticos (captación de fondos, M&A, reestructuración), pasamos a un rythmo semanal o quincenal con revisiones específicas según el contexto.")],
      },
      {
        id: 2,
        question: "¿Cómo se integra con mi ERP existente?",
        answer: [createParagraph("Nuestro DAF trabaja con su ERP actual, sea SAP, Odoo, NetSuite, Sage X3 o un sistema propietario. Diseñamos los cuadros de mando para extraer datos directamente de su sistema, sin necesidad de migración. Si su ERP es muy limitado, podemos recomendar evolución hacia herramientas modernas (Pennylane, Holded) en una segunda fase.")],
      },
      {
        id: 3,
        question: "¿Puedo conservar el control en interno y solo recibir asesoramiento?",
        answer: [createParagraph("Sí. Dos modos posibles: (1) full delivery — nuestro DAF prepara los cuadros, los presenta y propone acciones; (2) coaching — formamos a su controller interno y supervisamos su trabajo mensualmente. El modo coaching es ideal para empresas que quieren internalizar la competencia a medio plazo.")],
      },
      {
        id: 4,
        question: "¿Qué empresas pueden beneficiarse del control de gestión externalizado?",
        answer: [createParagraph("Cualquier empresa con más de 10 empleados o más de 1 M€ de facturación. Por debajo, una gestoría contable y un buen Excel suelen ser suficientes. Por encima, la complejidad operativa justifica un sistema de control de gestión estructurado — y externalizarlo es 40-60% más barato que contratar un controller interno.")],
      },
    ],
    seo: {},
  },
  "accompagnement-levee-de-fond": {
    heroTitle: "Apoyo en Captación de Fondos",
    heroSubtitle: "Prepare y tenga éxito en sus rondas con un socio experimentado",
    content: [
      // T8 (2026-06-07): enriched from ~150 → ~620 words.
      createParagraph("Una captación de fondos exitosa requiere tres ingredientes: credibilidad financiera demostrable, una historia convincente respaldada por números sólidos, y orientación experta para navegar los procesos con inversores profesionales. Iter Advisors acompaña startups y scale-ups en cada etapa — desde la preparación pre-ronda hasta el cierre del wire — con un track record de 30+ rondas cerradas y más de 100 M€ levantados para nuestros clientes."),
      createParagraph("La diferencia entre una ronda cerrada en 4 meses con buenas condiciones y una ronda que arrastra durante 9 meses con dilución excesiva está, casi siempre, en la calidad de la preparación financiera. Un CFO senior que ya ha cerrado 10-30 rondas anticipa las preguntas de los inversores, prepara las respuestas con anticipación y posiciona la empresa para negociar desde una posición de fuerza."),
      createHeading("Tipos de rondas que cubrimos"),
      createList([
        "Pre-seed y seed (200k€ - 2M€): business angels, microVCs, family offices",
        "Series A (2-10M€): VCs especializados — Adara, Kibo, JME, Seaya, K Fund",
        "Series B y C (10M€+): VCs growth — Atomico, Insight Partners, General Atlantic",
        "Venture debt y growth lending: complemento al equity sin dilución",
        "Subvenciones públicas: CDTI Neotec, Enisa, ICEX, Horizon Europe, NextGenEU",
      ]),
      createHeading("Nuestro Apoyo Incluye"),
      createList([
        "Desarrollo y stress-testing del modelo financiero a 3-5 años (escenarios base/optimista/pesimista)",
        "Preparación completa del dataroom: estados financieros auditables, contratos clave, IP, cap table, cohort analyses",
        "Construcción de la narrativa financiera: historia de unit economics, justificación del use of proceeds, defensibilidad del moat",
        "Apoyo en due diligence comercial, financiera y legal — preparación de respuestas anticipadas a los 50 puntos más críticos",
        "Revisión de term sheet: identificación de cláusulas problemáticas (liquidation preference, anti-dilution, drag-along)",
        "Orientación en negociación: post-money valuation, dilución óptima, composición del consejo, vesting cliff",
      ]),
      createHeading("Por Qué Asociarse con Nosotros"),
      createList([
        // SEO-AUD-0824 §1 — « desde 2020 » contredisait l'année de création
        // arbitrée (2021, cf. ANNEE_FONDATION dans lib/content/facts.ts).
        "Track record comprobado: 30+ rondas cerradas, 100M€+ levantados desde 2021",
        "Modelos financieros y materiales listos para inversores, validados por VCs tier 1",
        "Cierre más rápido (mediana 4-5 meses vs. 8-9 meses del mercado) gracias a documentación impecable",
        // SEO-AUD-0824 §1 — « +15% de pre-money valuation en media » : moyenne
        // annoncée sans échantillon, période ni base de comparaison. Une
        // valorisation dépend d'abord du marché et de la traction ; l'attribuer
        // à la préparation financière n'est pas démontrable.
        "Mejores condiciones de negociación: un expediente financiero sólido reduce los descuentos exigidos en due diligence",
        "Red de contactos con 200+ inversores activos en España, Francia y Reino Unido",
      ]),
      createHeading("Proceso en 4 fases"),
      createList([
        "Fase 1 — Diagnóstico (2 semanas): evaluación de sus finanzas actuales, identificación de gaps a corregir antes de la ronda",
        "Fase 2 — Preparación (4-6 semanas): construcción del modelo, dataroom, deck financiero, narrativa, lista de inversores objetivo",
        "Fase 3 — Roadshow (2-4 meses): apoyo en reuniones con inversores, simulacros de Q&A, gestión de las due diligences en paralelo",
        "Fase 4 — Cierre (3-6 semanas): negociación del term sheet, coordinación con abogados, gestión del proceso legal hasta el wire",
      ]),
      createHeading("Subvenciones públicas españolas"),
      createParagraph("Para startups deeptech, biotech o industriales, las subvenciones públicas pueden representar el 20-40% de la financiación. Acompañamos en los dossieres CDTI Neotec (hasta 250k€ a fondo perdido), Enisa Jóvenes Emprendedores (préstamos participativos), y los programas europeos (Horizon Europe, EIC Accelerator). El éxito en subvenciones aumenta el atractivo de la empresa de cara a inversores privados."),
    ],
    faq: [
      {
        id: 1,
        question: "¿Cuánto tiempo toma la fase de preparación?",
        answer: [createParagraph("Típicamente 4-8 semanas para desarrollar su modelo financiero, limpiar los datos contables, construir el dataroom y preparar todos los materiales para inversores. El plazo depende del punto de partida: una startup con contabilidad limpia y modelo financiero existente puede estar lista en 4 semanas; una empresa con datos desorganizados necesitará 6-8 semanas.")],
      },
      {
        id: 2,
        question: "¿Cuáles son sus tarifas?",
        answer: [createParagraph("Combinamos un retainer mensual (3.000-6.000 €/mes según la complejidad) con un success fee al cierre (típicamente 1-3% del monto levantado, decreciente con el tamaño de la ronda). El success fee alinea nuestros intereses con los suyos — sólo cobramos si la ronda cierra.")],
      },
      {
        id: 3,
        question: "¿Trabajan en exclusividad?",
        answer: [createParagraph("No exigimos exclusividad. Usted puede trabajar en paralelo con un placement agent (banca de inversión) o un broker. En la práctica, el 80% de nuestros clientes nos contratan como su único partner financiero durante la ronda, porque la coordinación entre múltiples actores genera fricciones y ralentiza el proceso.")],
      },
      {
        id: 4,
        question: "¿Qué ocurre si la ronda no se cierra?",
        answer: [createParagraph("Tras una preparación de 4-8 semanas, el 85% de las rondas que iniciamos cierran (sobre rangos de valoración realistas). Si la ronda no cierra (mercado adverso, métricas insuficientes), revisamos la estrategia: pivotar hacia subvenciones públicas, venture debt, o esperar 2-3 trimestres para mejorar las métricas antes de retomar.")],
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
