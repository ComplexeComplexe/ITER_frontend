import { Locale } from "../i18n";

export interface JobDescription {
  title: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  salary?: string;
}

export interface CFOJobDescriptionContent {
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
  fullTimeRole: JobDescription;
  fractionalCFO: JobDescription;
  comparison: {
    heading: string;
    aspects: {
      label: string;
      fullTime: string;
      fractional: string;
    }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

const content: Record<Locale, CFOJobDescriptionContent> = {
  fr: {
    meta: {
      title: "Fiche de poste DAF : Rôle et Compétences | Iter Advisors",
      description:
        "Guide complet du rôle de DAF (CFO) : responsabilités, qualifications requises, salaire. Includes full-time vs fractional CFO comparison.",
    },
    hero: {
      h1: "Le Rôle du Responsable Financier (DAF)",
      intro:
        "Le Responsable Financier ou Chief Financial Officer (CFO) est le pilier de la gestion financière d'une entreprise. Découvrez ses responsabilités, compétences et options de recrutement.",
    },
    intro: {
      paragraph:
        "Comprendre le rôle du CFO vous aide à décider comment structurer votre fonction financière : embaucher un DAF full-time, faire appel à un consultant externe, ou opter pour un DAF externalisé.",
    },
    fullTimeRole: {
      title: "CFO Full-Time (En Interne)",
      description:
        "Un CFO à temps plein est responsable de toute la stratégie et la gestion financière de l'entreprise. C'est un rôle exécutif senior, souvent au conseil d'administration.",
      responsibilities: [
        "Planification financière stratégique et budgets annuels",
        "Gestion de la trésorerie et de la liquidité",
        "Préparation et supervision du reporting financier",
        "Gestion de la relation avec les investisseurs et les banques",
        "Direction des audits internes et conformité réglementaire",
        "Pilotage des acquisitions, fusions et restructurations",
        "Supervision de l'équipe comptable et finance",
        "Reportage au conseil d'administration et au CEO",
      ],
      qualifications: [
        "Formation en finance/comptabilité (minimum Bac+3)",
        "10-15 ans d'expérience en management financier",
        "Connaissance approfondies des normes comptables (IFRS, French GAAP)",
        "Capacités en gestion d'équipe et stratégie",
        "Leadership exécutif et communication C-suite",
        "Expérience en levée de fonds ou M&A (selon le secteur)",
      ],
      salary: "€120,000 - €200,000/an + benefits",
    },
    fractionalCFO: {
      title: "DAF Externalisé / Fractional CFO",
      description:
        "Un DAF externalisé ou fractional CFO fournit des services financiers senior à temps partiel (1-8 jours par mois). Solution flexible et économique pour les startups et PME.",
      responsibilities: [
        "Modélisation financière et prévisions de trésorerie",
        "Mise en place de dashboards KPI et reporting",
        "Support pour les levées de fonds et due diligence",
        "Analyses unit economics et optimisation des coûts",
        "Conseils en stratégie financière et pricing",
        "Supervision de la comptabilité externe",
        "Préparation des présentations investisseurs",
      ],
      qualifications: [
        "Formation en finance/comptabilité",
        "10+ ans d'expérience finance en startups/PME",
        "Expertise multi-secteurs (SaaS, e-commerce, fintech)",
        "Autonomie et adaptabilité",
        "Excellentes compétences en communication",
      ],
      salary: "€2,000 - €6,000/mois according to scope",
    },
    comparison: {
      heading: "Comparaison : CFO Full-Time vs Fractional",
      aspects: [
        {
          label: "Coût mensuel",
          fullTime: "€10,000 - €20,000",
          fractional: "€2,000 - €6,000",
        },
        {
          label: "Disponibilité",
          fullTime: "Full-time (40 heures/semaine)",
          fractional: "1-8 jours/mois",
        },
        {
          label: "Engagement",
          fullTime: "Contrat permanent + équité",
          fractional: "Flexible, month-to-month",
        },
        {
          label: "Expertise",
          fullTime: "Spécialiste de votre secteur",
          fractional: "Multi-secteur, best practices",
        },
        {
          label: "Ramp-up",
          fullTime: "3-6 mois",
          fractional: "1-2 semaines",
        },
        {
          label: "Idéal pour",
          fullTime: "Scale-ups (post-Series A)",
          fractional: "Startups, PME (pre-Series B)",
        },
      ],
    },
    cta: {
      title: "Besoin d'un CFO pour votre entreprise ?",
      description:
        "Chez Iter Advisors, nous proposons des solutions de finance adaptées à votre stage : audit initial, mise en place de reporting, ou accompagnement complet.",
      buttonText: "Discuter de votre besoin",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "CFO Job Description: Roles & Qualifications | Iter Advisors",
      description:
        "Complete guide to CFO role: responsibilities, required qualifications, salary expectations. Includes full-time vs fractional CFO comparison.",
    },
    hero: {
      h1: "The CFO Role: Responsibilities & Qualifications",
      intro:
        "The Chief Financial Officer (CFO) is the cornerstone of financial management in any company. Learn about the role, required skills, and recruitment options.",
    },
    intro: {
      paragraph:
        "Understanding the CFO role helps you decide how to structure your finance function: hire a full-time CFO, engage a consultant, or use a fractional CFO model.",
    },
    fullTimeRole: {
      title: "Full-Time CFO (In-House)",
      description:
        "A full-time CFO is responsible for the entire financial strategy and management of the company. It's a senior executive role, often on the board.",
      responsibilities: [
        "Strategic financial planning and annual budgeting",
        "Cash and liquidity management",
        "Financial reporting and regulatory compliance",
        "Investor and bank relations management",
        "Internal audits and risk management oversight",
        "M&A, acquisitions, and restructuring execution",
        "Finance team leadership and development",
        "Board reporting and CEO advisory",
      ],
      qualifications: [
        "Finance/accounting degree (minimum Bachelor's)",
        "10-15 years of financial management experience",
        "Deep knowledge of accounting standards (IFRS, US GAAP)",
        "Team management and strategy capabilities",
        "C-suite leadership and executive communication",
        "Fundraising or M&A experience (depending on sector)",
      ],
      salary: "$120,000 - $200,000/year + benefits",
    },
    fractionalCFO: {
      title: "Fractional CFO / Outsourced CFO",
      description:
        "A fractional CFO provides senior financial services on a part-time basis (2-8 days per month). A flexible, cost-effective solution for startups and SMEs.",
      responsibilities: [
        "Financial modeling and cash flow forecasting",
        "KPI dashboard setup and reporting",
        "Fundraising support and due diligence",
        "Unit economics and cost optimization analysis",
        "Financial strategy and pricing advice",
        "External accounting oversight",
        "Investor presentation preparation",
      ],
      qualifications: [
        "Finance/accounting degree",
        "10+ years of startup/SME finance experience",
        "Multi-sector expertise (SaaS, e-commerce, fintech)",
        "Autonomy and adaptability",
        "Excellent communication skills",
      ],
      salary: "$2,000 - $6,000/month based on scope",
    },
    comparison: {
      heading: "Comparison: Full-Time CFO vs Fractional",
      aspects: [
        {
          label: "Monthly cost",
          fullTime: "$10,000 - $20,000",
          fractional: "$2,000 - $6,000",
        },
        {
          label: "Availability",
          fullTime: "Full-time (40 hours/week)",
          fractional: "2-8 days/month",
        },
        {
          label: "Commitment",
          fullTime: "Permanent contract + equity",
          fractional: "Flexible, month-to-month",
        },
        {
          label: "Expertise",
          fullTime: "Deep sector specialist",
          fractional: "Multi-sector, best practices",
        },
        {
          label: "Ramp-up time",
          fullTime: "3-6 months",
          fractional: "1-2 weeks",
        },
        {
          label: "Best for",
          fullTime: "Scale-ups (post-Series A)",
          fractional: "Startups, SMEs (pre-Series B)",
        },
      ],
    },
    cta: {
      title: "Need a CFO for your company?",
      description:
        "At Iter Advisors, we offer tailored finance solutions: initial audit, reporting setup, or full CFO support.",
      buttonText: "Discuss your needs",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "Descripción de Puesto CFO — Funciones | Iter Advisors",
      description:
        "Guía completa del Director Financiero (CFO): responsabilidades, competencias y salario. Comparación CFO a tiempo completo vs CFO externalizado.",
    },
    hero: {
      h1: "El Rol del Director Financiero (CFO)",
      intro:
        "El Chief Financial Officer (CFO) o Director Financiero es la piedra angular de la gestión financiera. Descubre sus responsabilidades, competencias y opciones de contratación.",
    },
    intro: {
      paragraph:
        "Entender el rol del CFO te ayuda a decidir cómo estructurar tu función financiera: contratar un CFO tiempo completo, un consultor externo, o un CFO externalizado.",
    },
    fullTimeRole: {
      title: "CFO Tiempo Completo (Interno)",
      description:
        "Un CFO tiempo completo es responsable de toda la estrategia y gestión financiera de la empresa. Es un rol ejecutivo senior, a menudo en la junta directiva.",
      responsibilities: [
        "Planificación financiera estratégica y presupuestos anuales",
        "Gestión de tesorería y liquidez",
        "Preparación y supervisión de reportes financieros",
        "Gestión de relaciones con inversores y bancos",
        "Auditorías internas y cumplimiento regulatorio",
        "Ejecución de fusiones, adquisiciones y reestructuraciones",
        "Liderazgo del equipo de finanzas y contabilidad",
        "Reportes a junta directiva y CEO",
      ],
      qualifications: [
        "Licenciatura en finanzas/contabilidad",
        "10-15 años de experiencia en gestión financiera",
        "Conocimiento profundo de normas contables (IFRS, GAAP)",
        "Capacidades de gestión de equipos y estrategia",
        "Liderazgo ejecutivo y comunicación C-suite",
        "Experiencia en recaudación de fondos o M&A",
      ],
      salary: "€120,000 - €200,000/año + beneficios",
    },
    fractionalCFO: {
      title: "CFO Externalizado / Fractional",
      description:
        "Un CFO externalizado proporciona servicios financieros senior a tiempo parcial (2-8 días por mes). Solución flexible y económica para startups y PMEs.",
      responsibilities: [
        "Modelado financiero y pronósticos de tesorería",
        "Configuración de dashboards KPI y reportes",
        "Apoyo en recaudación de fondos y due diligence",
        "Análisis de unit economics y optimización de costos",
        "Asesoramiento en estrategia financiera y pricing",
        "Supervisión de contabilidad externa",
        "Preparación de presentaciones de inversores",
      ],
      qualifications: [
        "Licenciatura en finanzas/contabilidad",
        "10+ años de experiencia en finanzas de startups/PMEs",
        "Expertise multi-sector (SaaS, e-commerce, fintech)",
        "Autonomía y adaptabilidad",
        "Excelentes habilidades de comunicación",
      ],
      salary: "€2,000 - €6,000/mes según alcance",
    },
    comparison: {
      heading: "Comparación: CFO Tiempo Completo vs Externalizado",
      aspects: [
        {
          label: "Costo mensual",
          fullTime: "€10,000 - €20,000",
          fractional: "€2,000 - €6,000",
        },
        {
          label: "Disponibilidad",
          fullTime: "Tiempo completo (40 horas/semana)",
          fractional: "2-8 días/mes",
        },
        {
          label: "Compromiso",
          fullTime: "Contrato permanente + equity",
          fractional: "Flexible, mes a mes",
        },
        {
          label: "Expertise",
          fullTime: "Especialista profundo del sector",
          fractional: "Multi-sector, mejores prácticas",
        },
        {
          label: "Tiempo de adaptación",
          fullTime: "3-6 meses",
          fractional: "1-2 semanas",
        },
        {
          label: "Ideal para",
          fullTime: "Scale-ups (post-Series A)",
          fractional: "Startups, PMEs (pre-Series B)",
        },
      ],
    },
    cta: {
      title: "¿Necesitas un CFO para tu empresa?",
      description:
        "En Iter Advisors, ofrecemos soluciones de finanzas adaptadas: auditoría inicial, configuración de reportes, o apoyo CFO completo.",
      buttonText: "Discute tu necesidad",
      buttonHref: "/es/contact",
    },
  },
};

export function getCFOJobDescriptionContent(locale: Locale): CFOJobDescriptionContent {
  return content[locale];
}
