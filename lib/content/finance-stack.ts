import type { Locale } from "@/lib/i18n";

/** Tools and use cases confirmed by Guillaume Rostand on 3 October 2026.
 * This describes engagement scope, not certifications or formal partnerships. */
export const FINANCE_STACK_VALIDATED_DATE = "2026-10-03";
export const FINANCE_STACK = [
  {
    name: "Pennylane",
    logo: "/images/logos/tools/pennylane-official.svg",
    category: "comptabilite",
    url: "https://www.pennylane.com/fr",
    content: {
      fr: {
        description:
          "Comptabilité, facturation et collaboration avec l’expert-comptable.",
        profile: "Startups et PME françaises",
      },
      en: {
        description:
          "Accounting, invoicing and collaboration with the accountant.",
        profile: "French startups and SMEs",
      },
      es: {
        description:
          "Contabilidad, facturación y colaboración con el asesor contable.",
        profile: "Startups y pymes francesas",
      },
    },
  },
  {
    name: "Holded",
    logo: "/images/logos/tools/holded-official.svg",
    category: "comptabilite",
    url: "https://www.holded.com",
    content: {
      fr: {
        description: "Facturation, comptabilité et gestion de l’activité.",
        profile: "Startups et PME, notamment en Espagne",
      },
      en: {
        description: "Invoicing, accounting and business management.",
        profile: "Startups and SMEs, particularly in Spain",
      },
      es: {
        description: "Facturación, contabilidad y gestión del negocio.",
        profile: "Startups y pymes, especialmente en España",
      },
    },
  },
  {
    name: "NetSuite",
    logo: "/images/logos/tools/netsuite-official.svg",
    category: "erp",
    url: "https://www.netsuite.com",
    content: {
      fr: {
        description:
          "ERP cloud : comptabilité, clôture, achats, facturation et consolidation.",
        profile: "Scale-ups et ETI internationales",
      },
      en: {
        description:
          "Cloud ERP: accounting, financial close, purchasing, invoicing and consolidation.",
        profile: "International scale-ups and mid-sized businesses",
      },
      es: {
        description:
          "ERP en la nube: contabilidad, cierre, compras, facturación y consolidación.",
        profile: "Scale-ups y empresas medianas internacionales",
      },
    },
  },
  {
    name: "Odoo",
    logo: "/images/logos/tools/odoo-official.svg",
    category: "erp",
    url: "https://www.odoo.com",
    content: {
      fr: {
        description:
          "ERP modulaire : comptabilité, facturation, ventes, achats et stocks.",
        profile: "PME avec plusieurs processus à connecter",
      },
      en: {
        description:
          "Modular ERP: accounting, invoicing, sales, purchasing and inventory.",
        profile: "SMEs connecting several business processes",
      },
      es: {
        description:
          "ERP modular: contabilidad, facturación, ventas, compras e inventario.",
        profile: "Pymes que necesitan conectar varios procesos",
      },
    },
  },
  {
    name: "Microsoft Dynamics 365 Finance",
    logo: "/images/logos/tools/dynamics-365-official.svg",
    category: "erp",
    url: "https://www.microsoft.com/en-us/dynamics-365/products/finance",
    content: {
      fr: {
        description: "ERP finance et gestion financière reliée aux opérations.",
        profile: "ETI et grands comptes dans l’écosystème Microsoft",
      },
      en: {
        description:
          "Finance ERP and financial management connected to operations.",
        profile: "Mid-sized and large businesses in the Microsoft ecosystem",
      },
      es: {
        description:
          "ERP financiero y gestión financiera conectada con las operaciones.",
        profile: "Empresas medianas y grandes del ecosistema Microsoft",
      },
    },
  },
  {
    name: "Agicap",
    logo: "/images/logos/tools/agicap-official.png",
    category: "tresorerie",
    url: "https://agicap.com",
    content: {
      fr: {
        description:
          "Prévision de trésorerie, reporting cash et connecteurs bancaires.",
        profile: "PME et ETI européennes",
      },
      en: {
        description: "Cash forecasting, cash reporting and bank connections.",
        profile: "European SMEs and mid-sized businesses",
      },
      es: {
        description:
          "Previsión de tesorería, reporting de caja y conexiones bancarias.",
        profile: "Pymes y empresas medianas europeas",
      },
    },
  },
  {
    name: "Kyriba",
    logo: "/images/logos/tools/kyriba-official.svg",
    category: "tresorerie",
    url: "https://www.kyriba.com",
    content: {
      fr: {
        description:
          "Gestion de trésorerie : cash, dette, paiements et risques.",
        profile: "ETI et grands groupes",
      },
      en: {
        description: "Treasury management: cash, debt, payments and risk.",
        profile: "Mid-sized businesses and large groups",
      },
      es: {
        description: "Gestión de tesorería: caja, deuda, pagos y riesgos.",
        profile: "Empresas medianas y grandes grupos",
      },
    },
  },
  {
    name: "Spendesk",
    logo: "/images/logos/tools/spendesk-official.svg",
    category: "depenses",
    url: "https://www.spendesk.com",
    content: {
      fr: {
        description:
          "Cartes, dépenses, factures fournisseurs, achats et remboursements.",
        profile: "PME et scale-ups",
      },
      en: {
        description:
          "Cards, expenses, supplier invoices, purchasing and reimbursements.",
        profile: "SMEs and scale-ups",
      },
      es: {
        description:
          "Tarjetas, gastos, facturas de proveedores, compras y reembolsos.",
        profile: "Pymes y scale-ups",
      },
    },
  },
  {
    name: "Pleo",
    logo: "/images/logos/tools/pleo-official.svg",
    category: "depenses",
    url: "https://www.pleo.io",
    content: {
      fr: {
        description:
          "Cartes d’entreprise, notes de frais et contrôle des dépenses.",
        profile: "Startups et PME",
      },
      en: {
        description: "Corporate cards, expense claims and spending controls.",
        profile: "Startups and SMEs",
      },
      es: {
        description:
          "Tarjetas de empresa, notas de gastos y control del gasto.",
        profile: "Startups y pymes",
      },
    },
  },
  {
    name: "Ramp",
    logo: "",
    category: "depenses",
    url: "https://ramp.com",
    content: {
      fr: {
        description:
          "Gestion des dépenses, cartes et automatisation des comptes fournisseurs.",
        profile: "Entreprises exposées aux États-Unis",
      },
      en: {
        description: "Spend management, cards and accounts payable automation.",
        profile: "Businesses with US operations or exposure",
      },
      es: {
        description:
          "Gestión del gasto, tarjetas y automatización de cuentas a pagar.",
        profile: "Empresas con actividad o exposición en Estados Unidos",
      },
    },
  },
] as const;

export const FINANCE_STACK_LABELS = {
  fr: {
    heading: "Les outils sur lesquels nous intervenons",
    intro:
      "Nous travaillons avec ces solutions selon votre organisation et le périmètre convenu. Le profil indiqué est un repère de choix ; il ne remplace pas la vérification des modules, des intégrations et des conditions proposées pour votre entreprise.",
    tool: "Outil",
    usage: "Usage principal",
    profile: "Profil typique",
    categories: {
      comptabilite: "Comptabilité et facturation",
      erp: "ERP et gestion financière",
      tresorerie: "Trésorerie",
      depenses: "Dépenses et achats",
    },
  },
  en: {
    heading: "The tools we work with",
    intro:
      "We work with these solutions according to your organisation and the agreed scope. The typical profile is a selection guideline; it does not replace checking the modules, integrations and terms offered to your business.",
    tool: "Tool",
    usage: "Main use",
    profile: "Typical profile",
    categories: {
      comptabilite: "Accounting and invoicing",
      erp: "ERP and financial management",
      tresorerie: "Treasury",
      depenses: "Expenses and purchasing",
    },
  },
  es: {
    heading: "Las herramientas con las que trabajamos",
    intro:
      "Trabajamos con estas soluciones según su organización y el alcance acordado. El perfil indicado es una referencia para elegir; no sustituye la comprobación de los módulos, las integraciones y las condiciones ofrecidas a su empresa.",
    tool: "Herramienta",
    usage: "Uso principal",
    profile: "Perfil habitual",
    categories: {
      comptabilite: "Contabilidad y facturación",
      erp: "ERP y gestión financiera",
      tresorerie: "Tesorería",
      depenses: "Gastos y compras",
    },
  },
} as const;

export function getFinanceStackCategories(locale: Locale) {
  const labels = FINANCE_STACK_LABELS[locale];
  return Object.entries(labels.categories).map(([id, heading]) => ({
    id,
    heading,
    description: "",
    tools: FINANCE_STACK.filter((tool) => tool.category === id).map((tool) => ({
      name: tool.name,
      logo: tool.logo,
      url: tool.url,
      category: tool.category,
      ...tool.content[locale],
    })),
  }));
}

export function getFinanceStackSummary(locale: Locale): string {
  const categories = getFinanceStackCategories(locale);
  const list = categories
    .map(
      (category) =>
        `${category.heading} : ${category.tools.map((tool) => tool.name).join(", ")}`,
    )
    .join(" ; ");
  const tail = {
    fr: "Le choix dépend des besoins, des outils déjà en place et du périmètre convenu.",
    en: "The choice depends on your needs, existing tools and the agreed scope.",
    es: "La elección depende de sus necesidades, las herramientas existentes y el alcance acordado.",
  }[locale];
  return `${list}. ${tail}`;
}
