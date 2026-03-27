import { Locale } from "../i18n";

export interface Tool {
  name: string;
  description: string;
  url: string;
  category: string;
}

export interface ToolCategory {
  id: string;
  heading: string;
  description: string;
  tools: Tool[];
}

export interface ToolsPageContent {
  meta: { title: string; description: string };
  breadcrumbLabel: string;
  resourcesLabel: string;
  resourcesHref: string;
  h1: string;
  intro: string;
  categories: ToolCategory[];
  ctaHeading: string;
  ctaText: string;
}

export function getToolsContent(locale: Locale): ToolsPageContent {
  return toolsContent[locale];
}

const toolsContent: Record<Locale, ToolsPageContent> = {
  fr: {
    meta: {
      title: "Nos outils - Stack technologique DAF externalisé | Iter Advisors",
      description:
        "Découvrez les outils et logiciels utilisés par nos DAF externalisés : comptabilité, trésorerie, reporting, ERP, CRM et collaboration. Stack technologique éprouvée.",
    },
    breadcrumbLabel: "Nos outils",
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    h1: "Notre stack technologique",
    intro:
      "Nos DAF externalisés s'appuient sur un écosystème d'outils éprouvés pour piloter efficacement votre direction financière. Voici les solutions que nous déployons au quotidien chez nos clients.",
    ctaHeading: "Besoin d'aide pour structurer votre stack finance ?",
    ctaText: "Nos DAF externalisés vous accompagnent dans le choix et le déploiement des outils adaptés à votre entreprise.",
    categories: [
      {
        id: "comptabilite",
        heading: "Comptabilité et facturation",
        description: "Les solutions de comptabilité cloud que nous maîtrisons pour automatiser la saisie, le rapprochement bancaire et la production des états financiers.",
        tools: [
          { name: "Pennylane", description: "Comptabilité collaborative et automatisée pour les startups et PME. Synchronisation bancaire, facturation et reporting en temps réel.", url: "https://www.pennylane.com", category: "comptabilite" },
          { name: "QuickBooks", description: "Solution de comptabilité cloud internationale, idéale pour les entreprises multi-pays avec gestion multi-devises.", url: "https://quickbooks.intuit.com", category: "comptabilite" },
          { name: "Xero", description: "Logiciel de comptabilité en ligne avec un écosystème d'intégrations riche, très utilisé dans les contextes internationaux.", url: "https://www.xero.com", category: "comptabilite" },
          { name: "Sage", description: "Suite comptable et ERP complète, adaptée aux PME et ETI avec des besoins de gestion avancés.", url: "https://www.sage.com", category: "comptabilite" },
          { name: "Indy", description: "Comptabilité automatisée pour les indépendants et petites structures, avec déclarations fiscales intégrées.", url: "https://www.indy.fr", category: "comptabilite" },
        ],
      },
      {
        id: "tresorerie",
        heading: "Trésorerie et prévisionnel",
        description: "Les outils de pilotage de trésorerie que nous utilisons pour construire des prévisionnels fiables et suivre les flux en temps réel.",
        tools: [
          { name: "Agicap", description: "Pilotage de trésorerie en temps réel avec prévisionnel automatisé, consolidation multi-entités et scénarios.", url: "https://agicap.com", category: "tresorerie" },
          { name: "Fygr", description: "Outil de gestion de trésorerie simple et efficace pour les PME, avec synchronisation bancaire et prévisions.", url: "https://www.fygr.io", category: "tresorerie" },
          { name: "Cashlab", description: "Plateforme de pilotage cash pour les directions financières, avec modélisation de scénarios et reporting avancé.", url: "https://www.cashlab.fr", category: "tresorerie" },
        ],
      },
      {
        id: "banque",
        heading: "Banque et paiements",
        description: "Les solutions bancaires et de paiement que nous recommandons pour optimiser la gestion des flux financiers.",
        tools: [
          { name: "Qonto", description: "Compte professionnel en ligne avec gestion des dépenses, cartes corporate et intégrations comptables.", url: "https://qonto.com", category: "banque" },
          { name: "Stripe", description: "Infrastructure de paiement en ligne pour les entreprises tech, avec API puissante et reporting détaillé.", url: "https://stripe.com", category: "banque" },
          { name: "Revolut Business", description: "Compte multi-devises avec taux de change compétitifs, idéal pour les entreprises internationales.", url: "https://www.revolut.com/business", category: "banque" },
        ],
      },
      {
        id: "reporting",
        heading: "Reporting et BI",
        description: "Les outils de Business Intelligence et de reporting que nous déployons pour transformer vos données financières en décisions stratégiques.",
        tools: [
          { name: "Google Sheets", description: "Tableur collaboratif en temps réel, base de nombreux reportings financiers avec formules avancées et automatisations.", url: "https://sheets.google.com", category: "reporting" },
          { name: "Microsoft Excel", description: "Le standard du reporting financier avec Power Query, tableaux croisés dynamiques et macros VBA.", url: "https://www.microsoft.com/excel", category: "reporting" },
          { name: "Notion", description: "Espace de travail tout-en-un pour la documentation financière, les process et le suivi de projets.", url: "https://www.notion.so", category: "reporting" },
          { name: "Power BI", description: "Plateforme de Business Intelligence Microsoft pour créer des dashboards financiers interactifs et automatisés.", url: "https://powerbi.microsoft.com", category: "reporting" },
          { name: "Pigment", description: "Plateforme FP&A de nouvelle génération pour la planification financière, la budgétisation et les forecasts.", url: "https://www.pigment.com", category: "reporting" },
        ],
      },
      {
        id: "erp",
        heading: "ERP et gestion commerciale",
        description: "Les ERP et outils de gestion que nous intégrons pour connecter la finance aux opérations.",
        tools: [
          { name: "Odoo", description: "ERP open-source modulaire couvrant la comptabilité, les ventes, les achats, l'inventaire et les RH.", url: "https://www.odoo.com", category: "erp" },
          { name: "NetSuite", description: "ERP cloud Oracle pour les entreprises en croissance, avec gestion financière, CRM et e-commerce intégrés.", url: "https://www.netsuite.com", category: "erp" },
          { name: "Sellsy", description: "CRM et facturation tout-en-un pour les PME françaises, avec gestion commerciale et trésorerie.", url: "https://www.sellsy.com", category: "erp" },
        ],
      },
      {
        id: "collaboration",
        heading: "Collaboration et productivité",
        description: "Les outils de collaboration que nous utilisons pour travailler efficacement avec les équipes de nos clients.",
        tools: [
          { name: "Slack", description: "Messagerie d'équipe avec canaux thématiques, intégrations et automatisations pour une communication fluide.", url: "https://slack.com", category: "collaboration" },
          { name: "Google Workspace", description: "Suite collaborative complète : Gmail, Drive, Docs, Sheets, Meet pour le travail en équipe.", url: "https://workspace.google.com", category: "collaboration" },
          { name: "Microsoft 365", description: "Suite bureautique et collaborative Microsoft : Teams, Outlook, OneDrive, SharePoint.", url: "https://www.microsoft.com/microsoft-365", category: "collaboration" },
          { name: "Loom", description: "Enregistrement vidéo asynchrone pour expliquer des analyses financières et former les équipes.", url: "https://www.loom.com", category: "collaboration" },
        ],
      },
    ],
  },
  en: {
    meta: {
      title: "Our tools - Outsourced CFO tech stack | Iter Advisors",
      description:
        "Discover the tools and software used by our outsourced CFOs: accounting, treasury, reporting, ERP, CRM and collaboration. Proven technology stack.",
    },
    breadcrumbLabel: "Our tools",
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    h1: "Our technology stack",
    intro:
      "Our outsourced CFOs rely on a proven ecosystem of tools to effectively manage your financial operations. Here are the solutions we deploy daily for our clients.",
    ctaHeading: "Need help structuring your finance stack?",
    ctaText: "Our outsourced CFOs guide you in choosing and deploying the right tools for your business.",
    categories: [
      {
        id: "accounting",
        heading: "Accounting and invoicing",
        description: "The cloud accounting solutions we master to automate data entry, bank reconciliation and financial statement production.",
        tools: [
          { name: "Pennylane", description: "Collaborative and automated accounting for startups and SMEs. Bank sync, invoicing and real-time reporting.", url: "https://www.pennylane.com", category: "accounting" },
          { name: "QuickBooks", description: "International cloud accounting solution, ideal for multi-country businesses with multi-currency management.", url: "https://quickbooks.intuit.com", category: "accounting" },
          { name: "Xero", description: "Online accounting software with a rich integration ecosystem, widely used in international contexts.", url: "https://www.xero.com", category: "accounting" },
          { name: "Sage", description: "Complete accounting and ERP suite, adapted for SMEs and mid-market companies with advanced management needs.", url: "https://www.sage.com", category: "accounting" },
          { name: "Indy", description: "Automated accounting for freelancers and small businesses, with integrated tax returns.", url: "https://www.indy.fr", category: "accounting" },
        ],
      },
      {
        id: "treasury",
        heading: "Treasury and forecasting",
        description: "The treasury management tools we use to build reliable forecasts and monitor cash flows in real time.",
        tools: [
          { name: "Agicap", description: "Real-time treasury management with automated forecasting, multi-entity consolidation and scenario planning.", url: "https://agicap.com", category: "treasury" },
          { name: "Fygr", description: "Simple and effective cash management tool for SMEs, with bank sync and forecasting.", url: "https://www.fygr.io", category: "treasury" },
          { name: "Cashlab", description: "Cash management platform for finance departments, with scenario modeling and advanced reporting.", url: "https://www.cashlab.fr", category: "treasury" },
        ],
      },
      {
        id: "banking",
        heading: "Banking and payments",
        description: "The banking and payment solutions we recommend to optimize financial flow management.",
        tools: [
          { name: "Qonto", description: "Online business account with expense management, corporate cards and accounting integrations.", url: "https://qonto.com", category: "banking" },
          { name: "Stripe", description: "Online payment infrastructure for tech companies, with powerful API and detailed reporting.", url: "https://stripe.com", category: "banking" },
          { name: "Revolut Business", description: "Multi-currency account with competitive exchange rates, ideal for international businesses.", url: "https://www.revolut.com/business", category: "banking" },
        ],
      },
      {
        id: "reporting",
        heading: "Reporting and BI",
        description: "The Business Intelligence and reporting tools we deploy to transform your financial data into strategic decisions.",
        tools: [
          { name: "Google Sheets", description: "Real-time collaborative spreadsheet, the foundation of many financial reports with advanced formulas and automations.", url: "https://sheets.google.com", category: "reporting" },
          { name: "Microsoft Excel", description: "The financial reporting standard with Power Query, pivot tables and VBA macros.", url: "https://www.microsoft.com/excel", category: "reporting" },
          { name: "Notion", description: "All-in-one workspace for financial documentation, processes and project tracking.", url: "https://www.notion.so", category: "reporting" },
          { name: "Power BI", description: "Microsoft Business Intelligence platform for creating interactive and automated financial dashboards.", url: "https://powerbi.microsoft.com", category: "reporting" },
          { name: "Pigment", description: "Next-generation FP&A platform for financial planning, budgeting and forecasting.", url: "https://www.pigment.com", category: "reporting" },
        ],
      },
      {
        id: "erp",
        heading: "ERP and business management",
        description: "The ERPs and management tools we integrate to connect finance with operations.",
        tools: [
          { name: "Odoo", description: "Modular open-source ERP covering accounting, sales, purchasing, inventory and HR.", url: "https://www.odoo.com", category: "erp" },
          { name: "NetSuite", description: "Oracle cloud ERP for growing businesses, with integrated financial management, CRM and e-commerce.", url: "https://www.netsuite.com", category: "erp" },
          { name: "Sellsy", description: "All-in-one CRM and invoicing for French SMEs, with business management and treasury.", url: "https://www.sellsy.com", category: "erp" },
        ],
      },
      {
        id: "collaboration",
        heading: "Collaboration and productivity",
        description: "The collaboration tools we use to work effectively with our clients' teams.",
        tools: [
          { name: "Slack", description: "Team messaging with themed channels, integrations and automations for smooth communication.", url: "https://slack.com", category: "collaboration" },
          { name: "Google Workspace", description: "Complete collaborative suite: Gmail, Drive, Docs, Sheets, Meet for teamwork.", url: "https://workspace.google.com", category: "collaboration" },
          { name: "Microsoft 365", description: "Microsoft office and collaborative suite: Teams, Outlook, OneDrive, SharePoint.", url: "https://www.microsoft.com/microsoft-365", category: "collaboration" },
          { name: "Loom", description: "Asynchronous video recording to explain financial analyses and train teams.", url: "https://www.loom.com", category: "collaboration" },
        ],
      },
    ],
  },
  es: {
    meta: {
      title: "Nuestras herramientas - Stack tecnológico CFO externalizado | Iter Advisors",
      description:
        "Descubra las herramientas y software utilizados por nuestros CFOs externalizados: contabilidad, tesorería, reporting, ERP, CRM y colaboración.",
    },
    breadcrumbLabel: "Nuestras herramientas",
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    h1: "Nuestro stack tecnológico",
    intro:
      "Nuestros CFOs externalizados se apoyan en un ecosistema de herramientas probadas para gestionar eficazmente su dirección financiera. Estas son las soluciones que desplegamos a diario para nuestros clientes.",
    ctaHeading: "Necesita ayuda para estructurar su stack financiero?",
    ctaText: "Nuestros CFOs externalizados le guían en la elección y despliegue de las herramientas adecuadas para su empresa.",
    categories: [
      {
        id: "contabilidad",
        heading: "Contabilidad y facturación",
        description: "Las soluciones de contabilidad cloud que dominamos para automatizar la entrada de datos, la conciliación bancaria y la producción de estados financieros.",
        tools: [
          { name: "Pennylane", description: "Contabilidad colaborativa y automatizada para startups y pymes. Sincronización bancaria, facturación y reporting en tiempo real.", url: "https://www.pennylane.com", category: "contabilidad" },
          { name: "QuickBooks", description: "Solución de contabilidad cloud internacional, ideal para empresas multi-país con gestión multi-divisa.", url: "https://quickbooks.intuit.com", category: "contabilidad" },
          { name: "Xero", description: "Software de contabilidad en línea con un rico ecosistema de integraciones, muy utilizado en contextos internacionales.", url: "https://www.xero.com", category: "contabilidad" },
          { name: "Sage", description: "Suite contable y ERP completa, adaptada a pymes y medianas empresas con necesidades de gestión avanzadas.", url: "https://www.sage.com", category: "contabilidad" },
          { name: "Indy", description: "Contabilidad automatizada para autónomos y pequeñas estructuras, con declaraciones fiscales integradas.", url: "https://www.indy.fr", category: "contabilidad" },
        ],
      },
      {
        id: "tesoreria",
        heading: "Tesorería y previsión",
        description: "Las herramientas de gestión de tesorería que utilizamos para construir previsiones fiables y seguir los flujos en tiempo real.",
        tools: [
          { name: "Agicap", description: "Gestión de tesorería en tiempo real con previsión automatizada, consolidación multi-entidad y escenarios.", url: "https://agicap.com", category: "tesoreria" },
          { name: "Fygr", description: "Herramienta de gestión de tesorería simple y eficaz para pymes, con sincronización bancaria y previsiones.", url: "https://www.fygr.io", category: "tesoreria" },
          { name: "Cashlab", description: "Plataforma de gestión de cash para direcciones financieras, con modelización de escenarios y reporting avanzado.", url: "https://www.cashlab.fr", category: "tesoreria" },
        ],
      },
      {
        id: "banca",
        heading: "Banca y pagos",
        description: "Las soluciones bancarias y de pago que recomendamos para optimizar la gestión de flujos financieros.",
        tools: [
          { name: "Qonto", description: "Cuenta profesional en línea con gestión de gastos, tarjetas corporativas e integraciones contables.", url: "https://qonto.com", category: "banca" },
          { name: "Stripe", description: "Infraestructura de pago en línea para empresas tech, con API potente y reporting detallado.", url: "https://stripe.com", category: "banca" },
          { name: "Revolut Business", description: "Cuenta multi-divisa con tipos de cambio competitivos, ideal para empresas internacionales.", url: "https://www.revolut.com/business", category: "banca" },
        ],
      },
      {
        id: "reporting",
        heading: "Reporting y BI",
        description: "Las herramientas de Business Intelligence y reporting que desplegamos para transformar sus datos financieros en decisiones estratégicas.",
        tools: [
          { name: "Google Sheets", description: "Hoja de cálculo colaborativa en tiempo real, base de muchos reportings financieros con fórmulas avanzadas y automatizaciones.", url: "https://sheets.google.com", category: "reporting" },
          { name: "Microsoft Excel", description: "El estándar del reporting financiero con Power Query, tablas dinámicas y macros VBA.", url: "https://www.microsoft.com/excel", category: "reporting" },
          { name: "Notion", description: "Espacio de trabajo todo-en-uno para documentación financiera, procesos y seguimiento de proyectos.", url: "https://www.notion.so", category: "reporting" },
          { name: "Power BI", description: "Plataforma de Business Intelligence de Microsoft para crear dashboards financieros interactivos y automatizados.", url: "https://powerbi.microsoft.com", category: "reporting" },
          { name: "Pigment", description: "Plataforma FP&A de nueva generación para planificación financiera, presupuestos y forecasts.", url: "https://www.pigment.com", category: "reporting" },
        ],
      },
      {
        id: "erp",
        heading: "ERP y gestión comercial",
        description: "Los ERPs y herramientas de gestión que integramos para conectar las finanzas con las operaciones.",
        tools: [
          { name: "Odoo", description: "ERP open-source modular que cubre contabilidad, ventas, compras, inventario y RRHH.", url: "https://www.odoo.com", category: "erp" },
          { name: "NetSuite", description: "ERP cloud de Oracle para empresas en crecimiento, con gestión financiera, CRM y e-commerce integrados.", url: "https://www.netsuite.com", category: "erp" },
          { name: "Sellsy", description: "CRM y facturación todo-en-uno para pymes francesas, con gestión comercial y tesorería.", url: "https://www.sellsy.com", category: "erp" },
        ],
      },
      {
        id: "colaboracion",
        heading: "Colaboración y productividad",
        description: "Las herramientas de colaboración que utilizamos para trabajar eficazmente con los equipos de nuestros clientes.",
        tools: [
          { name: "Slack", description: "Mensajería de equipo con canales temáticos, integraciones y automatizaciones para una comunicación fluida.", url: "https://slack.com", category: "colaboracion" },
          { name: "Google Workspace", description: "Suite colaborativa completa: Gmail, Drive, Docs, Sheets, Meet para el trabajo en equipo.", url: "https://workspace.google.com", category: "colaboracion" },
          { name: "Microsoft 365", description: "Suite ofimática y colaborativa de Microsoft: Teams, Outlook, OneDrive, SharePoint.", url: "https://www.microsoft.com/microsoft-365", category: "colaboracion" },
          { name: "Loom", description: "Grabación de vídeo asíncrona para explicar análisis financieros y formar equipos.", url: "https://www.loom.com", category: "colaboracion" },
        ],
      },
    ],
  },
};
