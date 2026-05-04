import { Locale } from "../i18n";
import type { StrapiGlossaryTerm } from "../strapi";

export interface GlossaryTerm {
  title: string;
  definition: string;
  context: string;
}

export interface GlossaryContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  intro: {
    paragraph: string;
  };
  terms: GlossaryTerm[];
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

// Helper function to convert our static glossary terms to StrapiGlossaryTerm format
export function convertToStrapiTerms(terms: GlossaryTerm[]): StrapiGlossaryTerm[] {
  return terms.map((term, idx) => ({
    id: idx + 1,
    documentId: `glossary-${idx + 1}`,
    title: term.title,
    slug: term.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    definition: term.definition,
    content: [],
  }));
}

const content: Record<Locale, GlossaryContent> = {
  fr: {
    meta: {
      title: "Glossaire Financier - Iter Advisors",
      description: "Définitions claires de 20+ termes financiers essentiels pour les startups et PME.",
    },
    hero: {
      h1: "Glossaire Financier",
      intro:
        "Démystifiez la finance avec nos définitions claires et pratiques. Les termes essentiels pour piloter votre entreprise.",
    },
    intro: {
      paragraph:
        "Comprendre la terminologie financière est essentiel pour prendre des décisions éclairées. Voici les termes que vous rencontrerez en tant que fondateur ou manager.",
    },
    terms: [
      {
        title: "Besoin en Fonds de Roulement (BFR)",
        definition:
          "La différence entre vos dettes court terme (fournisseurs, salaires) et vos actifs court terme (clients à recevoir, stock). Un BFR élevé signifie que vous avez besoin de plus de trésorerie pour fonctionner.",
        context:
          "Exemple : Un e-commerce paie ses fournisseurs en 30 jours mais ses clients paient en 45 jours. Son BFR = 15 jours de dépenses opérationnelles.",
      },
      {
        title: "Cash Burn",
        definition:
          "Montant mensuel moyen de trésorerie que votre entreprise dépense. Le cash burn indique combien de temps vous pouvez opérer avec votre trésorerie actuelle avant de lever des fonds.",
        context: "Une startup avec €500k de trésorerie et €50k de burn mensuel a 10 mois de runway.",
      },
      {
        title: "CAC (Customer Acquisition Cost)",
        definition:
          "Le coût moyen pour acquérir un client. Calculé en divisant le budget marketing par le nombre de clients acquis.",
        context:
          "Si vous dépensez €10k en marketing et gagnez 100 clients, votre CAC = €100.",
      },
      {
        title: "LTV (Lifetime Value)",
        definition:
          "Revenu total que vous attendez d'un client sur toute sa vie. Plus votre LTV est élevée, mieux vous pouvez vous permettre de dépenser en acquisition.",
        context:
          "Si un client SaaS paie €100/mois pendant 3 ans et se résilie, son LTV = €3,600.",
      },
      {
        title: "Term Sheet",
        definition:
          "Document non-contraignant décrivant les termes principales d'un investissement (montant, valorisation, droits de vote, liquidation).",
        context:
          "Un term sheet spécifie que vous levez €2M à une valorisation de €10M pré-money.",
      },
      {
        title: "Cap Table (Capitalization Table)",
        definition:
          "Tableau montrant la structure de propriété de votre entreprise : qui possède combien de parts (fondateurs, investisseurs, employés avec options).",
        context:
          "Votre cap table peut montrer : Fondateur 1 : 40%, Fondateur 2 : 40%, Investisseur Seed : 15%, Option pool : 5%.",
      },
      {
        title: "Runway",
        definition:
          "Nombre de mois pendant lesquels vous pouvez opérer avec votre trésorerie actuelle avant de manquer d'argent.",
        context:
          "Si vous avez €500k et brûlez €50k/mois, vous avez 10 mois de runway.",
      },
      {
        title: "MRR (Monthly Recurring Revenue)",
        definition:
          "Revenu mensuel prévisible générée par abonnements ou contrats récurrents. La base de calcul pour SaaS et modèles récurrents.",
        context:
          "100 clients payant €100/mois = €10k MRR. C'est votre métrique clé à suivre.",
      },
      {
        title: "Taux de Rétention",
        definition:
          "Pourcentage de clients qui restent actifs après une période donnée (généralement calculé mensuellement ou annuellement).",
        context:
          "Un taux de rétention de 90% signifie que 10% de vos clients partent chaque mois.",
      },
      {
        title: "EBITDA",
        definition:
          "Earnings Before Interest, Taxes, Depreciation, and Amortization. Profit avant déductions financières et comptables.",
        context:
          "L'EBITDA montre la rentabilité opérationnelle réelle de votre entreprise, indépendamment de la structure d'endettement.",
      },
    ],
    cta: {
      title: "Besoin d'aide pour interpréter vos chiffres ?",
      description:
        "Consultez un expert Iter Advisors. Nous vous aidons à comprendre vos métriques financières.",
      buttonText: "Demander une consultation",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "Financial Glossary - Iter Advisors",
      description: "Clear definitions of 20+ essential financial terms for startups and SMEs.",
    },
    hero: {
      h1: "Financial Glossary",
      intro:
        "Demystify finance with our clear, practical definitions. The essential terms for running your business.",
    },
    intro: {
      paragraph:
        "Understanding financial terminology is essential for making informed decisions. Here are the terms you'll encounter as a founder or manager.",
    },
    terms: [
      {
        title: "Working Capital",
        definition:
          "The difference between your short-term liabilities (suppliers, salaries) and short-term assets (customer receivables, inventory). High working capital means you need more cash to operate.",
        context:
          "Example: An e-commerce company pays suppliers in 30 days but customers pay in 45 days. Working capital = 15 days of operating expenses.",
      },
      {
        title: "Cash Burn",
        definition:
          "The average monthly amount of cash your company spends. Cash burn indicates how long you can operate with current cash before raising funds.",
        context:
          "A startup with €500k cash and €50k monthly burn has 10 months of runway.",
      },
      {
        title: "CAC (Customer Acquisition Cost)",
        definition:
          "The average cost to acquire one customer. Calculated by dividing your marketing spend by the number of customers acquired.",
        context:
          "If you spend €10k in marketing and gain 100 customers, your CAC = €100.",
      },
      {
        title: "LTV (Lifetime Value)",
        definition:
          "Total revenue expected from a customer over their lifetime. The higher your LTV, the more you can afford to spend on acquisition.",
        context:
          "If a SaaS customer pays €100/month for 3 years, their LTV = €3,600.",
      },
      {
        title: "Term Sheet",
        definition:
          "Non-binding document outlining the principal terms of an investment (amount, valuation, voting rights, liquidation preferences).",
        context:
          "A term sheet specifies you're raising €2M at a €10M pre-money valuation.",
      },
      {
        title: "Cap Table (Capitalization Table)",
        definition:
          "Table showing your company's ownership structure: who owns how many shares (founders, investors, employees with options).",
        context:
          "Your cap table might show: Founder 1: 40%, Founder 2: 40%, Seed Investor: 15%, Option pool: 5%.",
      },
      {
        title: "Runway",
        definition:
          "Number of months you can operate with current cash before running out of money.",
        context:
          "If you have €500k cash and burn €50k monthly, you have 10 months of runway.",
      },
      {
        title: "MRR (Monthly Recurring Revenue)",
        definition:
          "Predictable monthly revenue from subscriptions or recurring contracts. The foundation metric for SaaS and subscription models.",
        context:
          "100 customers paying €100/month = €10k MRR. This is your key metric to track.",
      },
      {
        title: "Retention Rate",
        definition:
          "Percentage of customers who remain active after a given period (typically calculated monthly or annually).",
        context:
          "A 90% retention rate means 10% of your customers leave each month.",
      },
      {
        title: "EBITDA",
        definition:
          "Earnings Before Interest, Taxes, Depreciation, and Amortization. Profit before financial and accounting deductions.",
        context:
          "EBITDA shows your operational profitability regardless of debt structure.",
      },
    ],
    cta: {
      title: "Need help interpreting your numbers?",
      description:
        "Talk to an Iter Advisors expert. We help you understand your financial metrics.",
      buttonText: "Book a free consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Glosario Financiero - Iter Advisors",
      description: "Definiciones claras de 20+ términos financieros esenciales para startups y PMEs.",
    },
    hero: {
      h1: "Glosario Financiero",
      intro:
        "Desmitificar las finanzas con nuestras definiciones claras y prácticas. Los términos esenciales para dirigir tu negocio.",
    },
    intro: {
      paragraph:
        "Entender la terminología financiera es esencial para tomar decisiones informadas. Aquí están los términos que encontrarás como fundador o gerente.",
    },
    terms: [
      {
        title: "Capital de Trabajo",
        definition:
          "La diferencia entre tus pasivos a corto plazo (proveedores, salarios) y activos a corto plazo (clientes por cobrar, inventario). Capital de trabajo alto significa que necesitas más efectivo para operar.",
        context:
          "Ejemplo: Una empresa de e-commerce paga proveedores en 30 días pero los clientes pagan en 45 días. Capital de trabajo = 15 días de gastos operativos.",
      },
      {
        title: "Cash Burn",
        definition:
          "El monto mensual promedio de efectivo que tu empresa gasta. El burn indica cuánto tiempo puedes operar con el efectivo actual antes de recaudar fondos.",
        context:
          "Una startup con €500k de efectivo y €50k de burn mensual tiene 10 meses de runway.",
      },
      {
        title: "CAC (Costo de Adquisición de Clientes)",
        definition:
          "El costo promedio para adquirir un cliente. Se calcula dividiendo el gasto en marketing por la cantidad de clientes adquiridos.",
        context:
          "Si gastas €10k en marketing y adquieres 100 clientes, tu CAC = €100.",
      },
      {
        title: "LTV (Valor de Vida del Cliente)",
        definition:
          "Ingresos totales esperados de un cliente a lo largo de su vida. Cuanto mayor sea tu LTV, más puedes permitirte gastar en adquisición.",
        context:
          "Si un cliente SaaS paga €100/mes durante 3 años, su LTV = €3,600.",
      },
      {
        title: "Term Sheet",
        definition:
          "Documento no vinculante que describe los términos principales de una inversión (monto, valoración, derechos de voto, preferencias de liquidación).",
        context:
          "Un term sheet especifica que estás recaudando €2M con una valoración pre-money de €10M.",
      },
      {
        title: "Cap Table (Tabla de Capitalización)",
        definition:
          "Tabla que muestra la estructura de propiedad de tu empresa: quién posee cuántas acciones (fundadores, inversores, empleados con opciones).",
        context:
          "Tu cap table podría mostrar: Fundador 1: 40%, Fundador 2: 40%, Inversor Seed: 15%, Pool de opciones: 5%.",
      },
      {
        title: "Runway",
        definition:
          "Número de meses que puedes operar con el efectivo actual antes de quedarte sin dinero.",
        context:
          "Si tienes €500k de efectivo y quemas €50k al mes, tienes 10 meses de runway.",
      },
      {
        title: "MRR (Ingresos Recurrentes Mensuales)",
        definition:
          "Ingresos mensuales predecibles generados por suscripciones o contratos recurrentes. La métrica fundamental para SaaS y modelos de suscripción.",
        context:
          "100 clientes pagando €100/mes = €10k MRR. Esta es tu métrica clave a seguir.",
      },
      {
        title: "Tasa de Retención",
        definition:
          "Porcentaje de clientes que permanecen activos después de un período determinado (típicamente calculado mensual o anualmente).",
        context:
          "Una tasa de retención del 90% significa que el 10% de tus clientes se van cada mes.",
      },
      {
        title: "EBITDA",
        definition:
          "Beneficio antes de intereses, impuestos, depreciación y amortización. Beneficio antes de deducciones financieras y contables.",
        context:
          "EBITDA muestra tu rentabilidad operacional independientemente de la estructura de deuda.",
      },
    ],
    cta: {
      title: "¿Necesitas ayuda para interpretar tus números?",
      description:
        "Consulta con un experto de Iter Advisors. Te ayudamos a entender tus métricas financieras.",
      buttonText: "Solicitar consulta gratuita",
      buttonHref: "/es/contact",
    },
  },
};

export function getGlossaryContent(locale: Locale): GlossaryContent {
  return content[locale];
}
