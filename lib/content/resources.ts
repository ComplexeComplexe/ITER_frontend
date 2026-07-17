import { Locale } from "../i18n";

export interface ResourceCard {
  title: string;
  href: string;
  image: string;
  tag?: string;
}

export interface ResourceCategory {
  heading: string;
  seeAllLabel: string;
  seeAllHref: string;
  cards: ResourceCard[];
}

export interface ResourcesContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  categories: ResourceCategory[];
  discover: string;
  faq?: Array<{ question: string; answer: string }>;
}

export const resourcesContent: Record<Locale, ResourcesContent> = {
  fr: {
    meta: {
      title: "Ressources | Iter Advisors",
      description:
        "Retrouvez toutes nos ressources : cas clients, articles de blog, fiches métiers et glossaire. Expertise financière par Iter Advisors.",
    },
    breadcrumbLabel: "Ressources",
    h1: "Ressources",
    intro:
      "Retrouvez tous les contenus réalisés par nos CFOs : articles, fiches thématiques, témoignages, modèles à télécharger et bien plus encore. Notre objectif : vous apporter les clés pour piloter votre croissance financière.",
    categories: [
      {
        heading: "Cas clients",
        seeAllLabel: "Voir tous nos cas clients",
        seeAllHref: "/ressources/cas-clients",
        cards: [
          {
            title: "Happy Scribe : structuration financière d'une scale-up",
            href: "/ressources/cas-clients",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Cas client",
          },
          {
            title: "Ukio : accompagnement à la levée de fonds Série A",
            href: "/ressources/cas-clients",
            image: "/images/logos/logo-ukio.webp",
            tag: "Cas client",
          },
          {
            title: "Surfe : mise en place du reporting et pilotage",
            href: "/ressources/cas-clients",
            image: "/images/logos/logo-surfe.webp",
            tag: "Cas client",
          },
          {
            title: "Yego : optimisation de la gestion de trésorerie",
            href: "/ressources/cas-clients",
            image: "/images/logos/logo-yego.webp",
            tag: "Cas client",
          },
        ],
      },
      {
        heading: "Actualités",
        seeAllLabel: "Voir tous nos articles",
        seeAllHref: "/ressources/blog",
        cards: [
          {
            title: "Les 10 outils pour les CFOs en start-up",
            href: "/ressources/blog/les-10-outils-pour-cfos-startup",
            image: "/images/blog/covers/les-10-outils-pour-cfos-startup.svg",
            tag: "Blog",
          },
          {
            title: "Flux de trésorerie : définition et importance pour les entreprises",
            href: "/ressources/blog/flux-de-tresorerie",
            image: "/images/blog/flux-de-tresorerie.jpg",
            tag: "Blog",
          },
          {
            title: "La modernisation du rôle de CFO",
            href: "/ressources/blog/la-modernisation-du-role-de-cfo",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
          {
            title: "Comment structurer sa direction financière ?",
            href: "/ressources/blog",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Fiches métiers",
        seeAllLabel: "Voir toutes nos fiches métiers",
        seeAllHref: "/ressources/fiche-metier",
        cards: [
          {
            title: "Fiche métier : Directeur Administratif et Financier",
            href: "/ressources/fiche-metier",
            image: "/images/logos/logo-og-square.png",
            tag: "Fiche métier",
          },
        ],
      },
    ],
    discover: "Découvrir",
  },
  en: {
    meta: {
      title: "Resources | Iter Advisors",
      description:
        "Browse all our resources: case studies, blog articles, job descriptions and glossary. Financial expertise by Iter Advisors.",
    },
    breadcrumbLabel: "Resources",
    h1: "Resources",
    intro:
      "Browse all the content created by our CFOs: articles, thematic sheets, testimonials, downloadable templates and more. Our goal: to give you the keys to manage your financial growth and make informed decisions at every stage of your company's development. Our library covers fractional CFO and finance management, fundraising, accounting, cash flow, M&A, HR outsourcing, and the tools modern finance teams rely on. Whether you are preparing a fundraise, restructuring your finance function, or benchmarking outsourced CFO pricing, our resources are grounded in real client experience across France, Spain, and Belgium. Every guide is written by a practising CFO, reviewed for accuracy, and updated as regulations evolve.",
    categories: [
      {
        heading: "Case studies",
        seeAllLabel: "See all case studies",
        seeAllHref: "/en/ressources/cas-clients",
        cards: [
          {
            title: "Happy Scribe: financial structuring of a scale-up",
            href: "/en/ressources/cas-clients",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Case study",
          },
          {
            title: "Ukio: Series A fundraising support",
            href: "/en/ressources/cas-clients",
            image: "/images/logos/logo-ukio.webp",
            tag: "Case study",
          },
          {
            title: "Surfe: reporting setup and performance management",
            href: "/en/ressources/cas-clients",
            image: "/images/logos/logo-surfe.webp",
            tag: "Case study",
          },
          {
            title: "Yego: cash management optimization",
            href: "/en/ressources/cas-clients",
            image: "/images/logos/logo-yego.webp",
            tag: "Case study",
          },
        ],
      },
      {
        heading: "Blog",
        seeAllLabel: "See all articles",
        seeAllHref: "/en/ressources/blog",
        cards: [
          {
            title: "AI and automation of repetitive tasks in the Finance department",
            href: "/en/ressources/blog",
            image: "/images/blog/ia-automatisation.jpg",
            tag: "Blog",
          },
          {
            title: "Organizing your finance department",
            href: "/en/ressources/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Essential financial tech tools",
            href: "/en/ressources/blog/essentiels-outils-tech-finance",
            image: "/images/blog/outils-tech-finance.jpg",
            tag: "Blog",
          },
          {
            title: "How to structure your financial department",
            href: "/en/ressources/blog",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Job descriptions",
        seeAllLabel: "See all job descriptions",
        seeAllHref: "/en/ressources/fiche-metier",
        cards: [
          {
            title: "Job description: Chief Financial Officer",
            href: "/en/ressources/fiche-metier",
            image: "/images/logos/logo-og-square.png",
            tag: "Job description",
          },
        ],
      },
    ],
    discover: "Discover",
    faq: [
      {
        question: "What is a fractional CFO?",
        answer: "A fractional CFO is a senior finance director who splits their time between several companies on a recurring basis (2 to 8 days per month). Unlike a full-time CFO (€100k–€180k/year in total cost), a fractional CFO costs €2,000–€7,000/month — giving you C-suite financial expertise without the full-time salary. At Iter Advisors, our fractional CFOs cover reporting, cash flow management, fundraising preparation, and financial strategy for startups and SMEs across France, Spain, and Belgium.",
      },
      {
        question: "How do I know if I need a fractional CFO?",
        answer: "Five signals that it's time: (1) your revenue exceeds €500k and spreadsheets no longer cut it; (2) you are preparing a fundraise (Seed to Series B); (3) your full-time CFO has left and you need an immediate replacement; (4) you are expanding internationally and need local expertise; (5) your board or investors are asking for monthly reporting you can't produce. Most of our clients have 10–200 employees and need between 2 and 6 days of CFO time per month.",
      },
      {
        question: "What resources does Iter Advisors offer for free?",
        answer: "All the guides, templates, and analyses on this page are free. You will find: financial dashboard templates for startups and SMEs, due diligence checklists for fundraising, CFO cost benchmarks and pricing guides, cash flow models, SaaS KPI frameworks, and international tax comparisons (France vs Spain). Our blog is updated every month with articles written by practising CFOs. No email required.",
      },
    ],
  },
  es: {
    meta: {
      title: "Recursos | Iter Advisors",
      description:
        "Consulte todos nuestros recursos: casos prácticos, artículos de blog, perfiles profesionales y glosario. Experiencia financiera de Iter Advisors.",
    },
    breadcrumbLabel: "Recursos",
    h1: "Recursos",
    intro:
      "Consulte todos los contenidos creados por nuestros CFOs: artículos, fichas temáticas, testimonios, plantillas descargables y mucho más. Nuestro objetivo: darle las claves para gestionar su crecimiento financiero y tomar decisiones informadas en cada etapa del desarrollo de su empresa. Nuestra biblioteca cubre el DAF externalizado, la gestión financiera, las rondas de inversión, la contabilidad, el flujo de tesorería, la fusiones y adquisiciones, la externalización de RRHH y las herramientas que utilizan los equipos financieros modernos. Tanto si está preparando una ronda de inversión, restructurando su función financiera o comparando precios de DAF externalizados, nuestros recursos se basan en la experiencia real con clientes en España, Francia y Bélgica. Cada guía está redactada por un CFO en ejercicio, revisada para garantizar su exactitud y actualizada cuando evolucionan las normativas.",
    categories: [
      {
        heading: "Casos prácticos",
        seeAllLabel: "Ver todos los casos prácticos",
        seeAllHref: "/es/recursos/cas-clients",
        cards: [
          {
            title: "Happy Scribe: estructuración financiera de una scale-up",
            href: "/es/recursos/cas-clients",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Ukio: acompañamiento en la ronda de financiación Serie A",
            href: "/es/recursos/cas-clients",
            image: "/images/logos/logo-ukio.webp",
            tag: "Caso práctico",
          },
          {
            title: "Surfe: implantación del reporting y seguimiento",
            href: "/es/recursos/cas-clients",
            image: "/images/logos/logo-surfe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Yego: optimización de la gestión de tesorería",
            href: "/es/recursos/cas-clients",
            image: "/images/logos/logo-yego.webp",
            tag: "Caso práctico",
          },
        ],
      },
      {
        heading: "Blog",
        seeAllLabel: "Ver todos los artículos",
        seeAllHref: "/es/recursos/blog",
        cards: [
          {
            title: "IA y automatización de tareas repetitivas en el departamento de Finanzas",
            href: "/es/recursos/blog",
            image: "/images/blog/ia-automatisation.jpg",
            tag: "Blog",
          },
          {
            title: "Organizar su departamento financiero",
            href: "/es/recursos/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Las herramientas tecnológicas esenciales para las finanzas",
            href: "/es/recursos/blog/essentiels-outils-tech-finance",
            image: "/images/blog/outils-tech-finance.jpg",
            tag: "Blog",
          },
          {
            title: "Cómo estructurar su departamento financiero",
            href: "/es/recursos/blog",
            image: "/images/blog/modernisation-cfo.jpg",
            tag: "Blog",
          },
        ],
      },
      {
        heading: "Perfiles profesionales",
        seeAllLabel: "Ver todos los perfiles profesionales",
        seeAllHref: "/ressources/fiche-metier",
        cards: [
          {
            title: "Perfil profesional: Director Financiero",
            href: "/ressources/fiche-metier",
            image: "/images/logos/logo-og-square.png",
            tag: "Perfil profesional",
          },
        ],
      },
    ],
    discover: "Descubra",
    faq: [
      {
        question: "¿Qué es un DAF externalizado?",
        answer: "Un DAF externalizado (Director Administrativo y Financiero externalizado) es un director financiero sénior que dedica parte de su tiempo a varias empresas de forma recurrente (2 a 8 días al mes). A diferencia de un DAF interno (100.000–150.000 €/año en coste total), un DAF externalizado cuesta entre 2.000 y 7.000 €/mes. En Iter Advisors, nuestros DAFs externalizados cubren el reporting, la gestión de tesorería, la preparación de rondas de inversión y la estrategia financiera para startups y PYMEs en España, Francia y Bélgica.",
      },
      {
        question: "¿Cuándo necesito un DAF externalizado?",
        answer: "Cinco señales que indican que ha llegado el momento: (1) su facturación supera los 500.000 € y las hojas de cálculo ya no son suficientes; (2) está preparando una ronda de inversión (Seed a Series B); (3) su DAF interno se ha ido y necesita un sustituto inmediato; (4) se está expandiendo internacionalmente y necesita experiencia local; (5) su consejo o inversores le piden un reporting mensual que no puede proporcionar. La mayoría de nuestros clientes tienen entre 10 y 200 empleados.",
      },
      {
        question: "¿Son gratuitos los recursos de Iter Advisors?",
        answer: "Sí, todos los contenidos de esta página son gratuitos. Encontrará: plantillas de dashboard financiero para startups, checklists de due diligence para rondas de inversión, comparativas de costes de DAF externalizado, modelos de flujo de tesorería, marcos de KPIs para SaaS y comparativas fiscales internacionales (Francia vs España). Nuestro blog se actualiza cada mes con artículos escritos por CFOs en ejercicio. Sin registro requerido.",
      },
    ],
  },
};

export function getResourcesContent(locale: Locale) {
  return resourcesContent[locale];
}
