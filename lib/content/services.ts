import { Locale } from "../i18n";

export interface ServiceCard {
  title: string;
  href: string;
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
    { title: "Accompagnement lev\u00e9e de fonds", href: "/services/accompagnement-levee-de-fond" },
    { title: "Contr\u00f4le de gestion externalis\u00e9", href: "/services/controle-de-gestion-externalise" },
    { title: "Externalisation comptabilit\u00e9", href: "/services/comptabilite-externalisation" },
    { title: "Gestion financi\u00e8re externalis\u00e9e", href: "/services/gestion-financiere-externalisee" },
    { title: "Pr\u00e9visionnel de tr\u00e9sorerie", href: "/services/previsionnel-tresorerie" },
    { title: "DRH externalis\u00e9", href: "/services/drh-externalise" },
  ],
};

const servicesEn: ServicesContent = {
  meta: {
    title: "Services | Iter Advisors",
    description:
      "Iter Advisors supports you with tailored solutions: fund-raising, management control, accounting, financial management and cash flow.",
  },
  hero: {
    h1: "Services",
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
    { title: "Fund-raising support", href: "/en/services/fund-raising-support" },
    { title: "Outsourced management control", href: "/en/services/outsourced-management-control" },
    { title: "Accounting outsourcing", href: "/en/services/outsource-your-accounting" },
    { title: "Outsourced financial management", href: "/en/services/outsourced-financial-management" },
    { title: "Cash flow forecast", href: "/en/services/cash-flow-forecast" },
    { title: "Outsourced HR Director", href: "/en/services/drh-externalise" },
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
    { title: "Apoyo a la recaudaci\u00f3n de fondos", href: "/es/services/soporte-financiacion" },
    { title: "Control de gesti\u00f3n externalizado", href: "/es/services/control-gestion-externalizado" },
    { title: "Externalizaci\u00f3n de la contabilidad", href: "/es/services/externalizar-contabilidad" },
    { title: "Gesti\u00f3n financiera externalizada", href: "/es/services/gestion-financiera-externalizada" },
    { title: "Previsi\u00f3n de tesorer\u00eda", href: "/es/services/prevision-tesoreria" },
    { title: "Director de RRHH externalizado", href: "/es/services/drh-externalise" },
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
