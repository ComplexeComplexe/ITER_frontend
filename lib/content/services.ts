import { Locale } from "../i18n";

export interface ServiceCard {
  title: string;
  href: string;
  category?: "finance" | "rh";
}

export interface WhyOutsourceBenefit {
  label: string;
  description: string;
}

export interface ExpertiseDomain {
  label: string;
  description: string;
}

export interface MethodologyStep {
  step: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ServicesContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
  };
  intro: {
    paragraph: string;
    bullets: string[];
  };
  body: {
    heading: string;
    paragraphs: string[];
  };
  services: ServiceCard[];
  // Optional enrichment sections (TICKET 11) — present on FR, can be added per locale later.
  whyOutsource?: {
    heading: string;
    intro: string;
    benefits: WhyOutsourceBenefit[];
  };
  expertise?: {
    heading: string;
    domains: ExpertiseDomain[];
  };
  methodology?: {
    heading: string;
    steps: MethodologyStep[];
  };
  faq?: {
    heading: string;
    items: FaqItem[];
  };
}

const servicesFr: ServicesContent = {
  meta: {
    title: "Services | Iter Advisors",
    description:
      "Iter Advisors vous accompagne avec des solutions adaptees : levee de fonds, controle de gestion, comptabilite, gestion financiere et tresorerie.",
  },
  hero: {
    h1: "Services",
  },
  intro: {
    paragraph:
      "Une gestion financi\u00e8re efficace est essentielle pour assurer la stabilit\u00e9 et la croissance de votre entreprise. Nous vous accompagnons avec des solutions adapt\u00e9es \u00e0 vos enjeux.",
    bullets: [
      "Des outils et m\u00e9thodes pour anticiper, analyser et optimiser vos finances.",
      "De l\u2019audit \u00e0 la gestion des risques, nous renfor\u00e7ons la fiabilit\u00e9 de vos d\u00e9cisions.",
      "Une approche sur-mesure pour soutenir votre croissance.",
    ],
  },
  body: {
    heading: "Nos services pour structurer et optimiser votre gestion financi\u00e8re",
    paragraphs: [
      "Chez Iter Advisors, nous accompagnons les entreprises \u00e0 chaque \u00e9tape de leur d\u00e9veloppement pour les aider \u00e0 structurer, piloter et optimiser leurs finances.",
      "Que ce soit pour am\u00e9liorer votre contr\u00f4le de gestion, fiabiliser votre reporting financier, s\u00e9curiser une lev\u00e9e de fonds ou optimiser votre tr\u00e9sorerie, nous vous apportons des solutions sur-mesure.",
      "Nous intervenons \u00e9galement sur l\u2019audit financier, la gestion des risques et l\u2019optimisation des co\u00fbts, afin de vous aider \u00e0 prendre des d\u00e9cisions \u00e9clair\u00e9es et p\u00e9rennes.",
      "Notre \u00e9quipe travaille \u00e0 vos c\u00f4t\u00e9s pour mettre en place des outils et des strat\u00e9gies qui renforcent la performance financi\u00e8re et soutiennent votre croissance.",
    ],
  },
  services: [
    { title: "Accompagnement levée de fonds", href: "/services/accompagnement-levee-de-fond", category: "finance" },
    { title: "Contrôle de gestion externalisé", href: "/services/controle-de-gestion-externalise", category: "finance" },
    { title: "Comptabilité externalisée", href: "/services/comptabilite-externalisation", category: "finance" },
    { title: "Prévisionnel de trésorerie", href: "/services/previsionnel-tresorerie", category: "finance" },
    { title: "M&A & Due Diligence", href: "/services/ma-due-diligence", category: "finance" },
    { title: "Gestion financière externalisée", href: "/services/gestion-financiere-externalisee", category: "finance" },
    { title: "DRH externalisé", href: "/drh-externalise", category: "rh" },
    { title: "Recrutement & talent acquisition", href: "/drh-externalise", category: "rh" },
    { title: "Gestion de la paie & charges sociales", href: "/drh-externalise", category: "rh" },
    { title: "Formation & développement", href: "/drh-externalise", category: "rh" },
    { title: "Conformité & droit du travail", href: "/drh-externalise", category: "rh" },
  ],
  whyOutsource: {
    heading: "Pourquoi externaliser vos services financiers ?",
    intro:
      "Externaliser votre direction financière, c’est choisir la flexibilité et l’expertise sans le coût d’un salarié interne. Un DAF externalisé apporte une vision fraîche, une expérience multi-secteurs et une méthodologie éprouvée — sans les contraintes d’un CDI.",
    benefits: [
      {
        label: "Réduction des coûts",
        description: "30 à 50 % moins cher qu’un DAF salarié (charges incluses).",
      },
      {
        label: "Flexibilité",
        description: "Missions de 2 jours/mois à temps plein, adaptables à votre charge réelle.",
      },
      {
        label: "Expertise",
        description: "Accès à une équipe de CFOs avec expérience multi-secteurs.",
      },
      {
        label: "Scalabilité",
        description: "Montée en charge progressive selon votre croissance et vos cycles.",
      },
    ],
  },
  expertise: {
    heading: "Nos domaines d’expertise",
    domains: [
      {
        label: "Finance",
        description:
          "Comptabilité, contrôle de gestion, prévisionnel de trésorerie, reporting mensuel, accompagnement levée de fonds, M&A & due diligence.",
      },
      {
        label: "Ressources Humaines",
        description: "Recrutement, gestion de la paie, formation, conformité & droit du travail.",
      },
    ],
  },
  methodology: {
    heading: "Comment ça marche ?",
    steps: [
      {
        step: "Diagnostic — semaine 1",
        description: "Audit de votre situation financière et identification des leviers prioritaires.",
      },
      {
        step: "Recommandation — semaine 2",
        description: "Proposition d’une mission adaptée : périmètre, rythme, livrables.",
      },
      {
        step: "Implémentation — semaines 3 à 4",
        description: "Déploiement des outils (Pennylane, Agicap, Spendesk, PayFit) et des process.",
      },
      {
        step: "Pilotage — mensuel",
        description: "Reporting, ajustements et accompagnement opérationnel en continu.",
      },
    ],
  },
  faq: {
    heading: "Questions fréquentes",
    items: [
      {
        question: "Quel est le coût d’un DAF externalisé ?",
        answer:
          "De 2 000 €/mois (2 jours/semaine) à 8 000 €/mois (temps plein), selon la charge et la complexité de la mission.",
      },
      {
        question: "Dans quels délais peut-on démarrer ?",
        answer:
          "Diagnostic en 1 semaine, démarrage effectif de la mission en 2 à 3 semaines après le brief initial.",
      },
      {
        question: "Quels outils utilisez-vous ?",
        answer:
          "Pennylane, Agicap, Spendesk, PayFit selon vos besoins. Voir notre comparatif complet des outils CFO sur /ressources/outils.",
      },
      {
        question: "Intervenez-vous à l’international ?",
        answer:
          "Oui, nos bureaux à Barcelone, Paris et Toulouse couvrent la France et l’Espagne. Missions Europe possibles.",
      },
    ],
  },
};

const servicesEn: ServicesContent = {
  meta: {
    title: "Services | Iter Advisors",
    description:
      "Iter Advisors supports you with tailored solutions: fund-raising, management control, accounting, financial management and cash flow.",
  },
  hero: {
    h1: "Fractional CFO Services - Treasury, Accounting & Fundraising",
  },
  intro: {
    paragraph:
      "Effective financial management is essential to the stability and growth of your business. We support you with solutions tailored to your needs.",
    bullets: [
      "Tools and methods to anticipate, analyze and optimize your finances.",
      "From auditing to risk management, we reinforce the reliability of your decisions.",
      "A customized approach to support your growth.",
    ],
  },
  body: {
    heading: "Our services to structure and optimize your financial management",
    paragraphs: [
      "At Iter Advisors, we support companies at every stage of their development, helping them to structure, manage and optimize their finances.",
      "Whether you need to improve your management control, make your financial reporting more reliable, secure a fund-raising operation or optimize your cash flow, we can provide you with tailor-made solutions.",
      "We are also involved in financial auditing, risk management and cost optimization, to help you make informed, sustainable decisions.",
      "Our team works alongside you to implement tools and strategies that boost financial performance and support your growth.",
    ],
  },
  services: [
    { title: "Fund-raising support", href: "/en/services/fund-raising-support", category: "finance" },
    { title: "Part-time management control", href: "/en/services/outsourced-management-control", category: "finance" },
    { title: "Outsource your accounting", href: "/en/services/outsource-your-accounting", category: "finance" },
    { title: "Cash flow forecast", href: "/en/services/cash-flow-forecast", category: "finance" },
    { title: "M&A & Due Diligence", href: "/en/services/ma-due-diligence", category: "finance" },
    { title: "Outsourced financial management", href: "/en/fractional-cfo", category: "finance" },
    { title: "Fractional HR Director", href: "/en/drh-externalise", category: "rh" },
    { title: "Recruitment & talent acquisition", href: "/en/drh-externalise", category: "rh" },
    { title: "Payroll & social charges", href: "/en/drh-externalise", category: "rh" },
    { title: "Training & development", href: "/en/drh-externalise", category: "rh" },
    { title: "Compliance & labor law", href: "/en/drh-externalise", category: "rh" },
  ],
};

const servicesEs: ServicesContent = {
  meta: {
    title: "Servicios | Iter Advisors",
    description:
      "Iter Advisors le acompa\u00f1a con soluciones adaptadas: captaci\u00f3n de fondos, control de gesti\u00f3n, contabilidad, gesti\u00f3n financiera y tesorer\u00eda.",
  },
  hero: {
    h1: "Servicios",
  },
  intro: {
    paragraph:
      "Una gesti\u00f3n financiera eficaz es esencial para la estabilidad y el crecimiento de su empresa. Le acompa\u00f1amos con soluciones adaptadas a sus necesidades.",
    bullets: [
      "Herramientas y m\u00e9todos para anticipar, analizar y optimizar sus finanzas.",
      "Desde la auditor\u00eda hasta la gesti\u00f3n de riesgos, reforzamos la fiabilidad de sus decisiones.",
      "Un enfoque a medida para apoyar su crecimiento.",
    ],
  },
  body: {
    heading: "Nuestros servicios para estructurar y optimizar su gesti\u00f3n financiera",
    paragraphs: [
      "En Iter Advisors trabajamos con empresas en todas las fases de su desarrollo para ayudarles a estructurar, gestionar y optimizar sus finanzas.",
      "Si desea mejorar el control de su gesti\u00f3n, hacer m\u00e1s fiables sus informes financieros, asegurar una operaci\u00f3n de captaci\u00f3n de fondos u optimizar su tesorer\u00eda, podemos ofrecerle soluciones a medida.",
      "Tambi\u00e9n participamos en la auditor\u00eda financiera, la gesti\u00f3n de riesgos y la optimizaci\u00f3n de costes, para ayudarle a tomar decisiones informadas y a largo plazo.",
      "Nuestro equipo trabaja junto a usted para implantar herramientas y estrategias que impulsen el rendimiento financiero y apoyen su crecimiento.",
    ],
  },
  services: [
    { title: "Apoyo a la captacion de fondos", href: "/es/services/soporte-financiacion", category: "finance" },
    { title: "Control de gestion externalizado", href: "/es/services/control-gestion-externalizado", category: "finance" },
    { title: "Gestion financiera externalizada", href: "/es/services/gestion-financiera-externalizada", category: "finance" },
    { title: "Prevision de tesoreria", href: "/es/services/prevision-tesoreria", category: "finance" },
    { title: "M&A & Due Diligence", href: "/es/services/ma-due-diligence", category: "finance" },
    { title: "Director de RRHH externalizado", href: "/es/drh-externalise", category: "rh" },
    { title: "Reclutamiento & adquisicion de talento", href: "/es/drh-externalise", category: "rh" },
    { title: "Nomina y cargas sociales", href: "/es/drh-externalise", category: "rh" },
    { title: "Formacion y desarrollo", href: "/es/drh-externalise", category: "rh" },
    { title: "Cumplimiento y derecho laboral", href: "/es/drh-externalise", category: "rh" },
  ],
};

export const servicesContent: Record<Locale, ServicesContent> = {
  fr: servicesFr,
  en: servicesEn,
  es: servicesEs,
};

export function getServicesContent(locale: Locale): ServicesContent {
  return servicesContent[locale];
}
