import { Locale } from "../i18n";

export interface ResourceCard {
  title: string;
  href: string;
  image: string;
  tag?: string;
}

export interface ResourceCategory {
  id: string;
  heading: string;
  seeAllLabel: string;
  seeAllHref: string;
  cards: ResourceCard[];
}

export interface PopularResource {
  title: string;
  href: string;
  description: string;
}

export interface ResourcesContent {
  meta: {
    title: string;
    description: string;
  };
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  popularSection: {
    heading: string;
    resources: PopularResource[];
  };
  fiscaliteSection: {
    id: string;
    heading: string;
    seeAllLabel: string;
    seeAllHref: string;
    cards: ResourceCard[];
  };
  categories: ResourceCategory[];
  discover: string;
  searchPlaceholder: string;
  searchNoResult: string;
  navLabels: {
    popular: string;
    fiscalite: string;
    casClients: string;
    blog: string;
    glossaire: string;
  };
  faq?: Array<{ question: string; answer: string }>;
}

export const resourcesContent: Record<Locale, ResourcesContent> = {
  fr: {
    meta: {
      title: "Ressources DAF externalisé | Iter Advisors",
      description:
        "Ressources DAF : blog finance, glossaire, fiches métiers, témoignages. Conseils experts en DAF externalisé, levée de fonds, fiscalité France-Espagne.",
    },
    breadcrumbLabel: "Ressources",
    h1: "Ressources",
    intro:
      "Retrouvez tous les contenus réalisés par nos CFOs : articles, fiches thématiques, témoignages, modèles à télécharger et bien plus encore. Notre objectif : vous apporter les clés pour piloter votre croissance financière.",
    searchPlaceholder: "Rechercher une ressource…",
    searchNoResult: "Aucune ressource ne correspond à votre recherche.",
    navLabels: {
      popular: "Populaires",
      fiscalite: "Fiscalité",
      casClients: "Cas clients",
      blog: "Blog",
      glossaire: "Glossaire",
    },
    popularSection: {
      heading: "Ressources populaires",
      resources: [
        {
          title: "DAF externalisé : guide complet",
          href: "/daf-externalise",
          description: "Rôle, missions, coût et critères de choix d'un DAF à temps partagé.",
        },
        {
          title: "Checklist due diligence — levée de fonds",
          href: "/ressources/blog/checklist-due-diligence-levee-de-fonds",
          description: "La liste de contrôle complète pour préparer votre data room.",
        },
        {
          title: "Loi Beckham 2026 : guide complet",
          href: "/ressources/fiscalite/beckham-law",
          description: "Taux 24 %, conditions, démarches et calcul d'économie d'impôt en Espagne.",
        },
        {
          title: "Régimes fiscaux France vs Espagne",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          description: "Comparatif complet IRPF / IR, impôts sur sociétés et conventions fiscales.",
        },
        {
          title: "Glossaire financier",
          href: "/ressources/glossaire",
          description: "EBITDA, BFR, ARR, BSPCE, cash burn… les définitions par nos CFOs.",
        },
        {
          title: "Les 10 outils indispensables des CFOs",
          href: "/ressources/blog/les-10-outils-pour-cfos-startup",
          description: "Pennylane, Agicap, Pigment, Pleo… la stack finance des startups.",
        },
      ],
    },
    fiscaliteSection: {
      id: "fiscalite",
      heading: "Fiscalité France-Espagne",
      seeAllLabel: "Voir tous les articles fiscalité",
      seeAllHref: "/ressources/fiscalite-espagne-france",
      cards: [
        {
          title: "Régimes fiscaux : France vs Espagne — Guide 2026",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalité",
        },
        {
          title: "Loi Beckham 2026 : taux 24 %, conditions et démarches",
          href: "/ressources/fiscalite/beckham-law",
          image: "/images/blog/loi-beckham-espagne.webp",
          tag: "Fiscalité",
        },
        {
          title: "Double imposition France-Espagne : comment l'éviter ?",
          href: "/ressources/fiscalite/double-imposition-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalité",
        },
        {
          title: "Résidence fiscale en Espagne : règles et conditions 2026",
          href: "/ressources/fiscalite/residence-fiscale-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalité",
        },
        {
          title: "IRPF : l'impôt sur le revenu espagnol expliqué",
          href: "/ressources/fiscalite/impot-revenu-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalité",
        },
        {
          title: "Convention fiscale France-Espagne : ce qu'elle change",
          href: "/ressources/fiscalite-espagne-france",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalité",
        },
      ],
    },
    categories: [
      {
        id: "cas-clients",
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
        id: "blog",
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
        id: "fiches-metiers",
        heading: "Fiches métiers",
        seeAllLabel: "Voir toutes nos fiches métiers",
        seeAllHref: "/daf-externalise/metier",
        cards: [
          {
            title: "Fiche métier : Directeur Administratif et Financier",
            href: "/daf-externalise/metier",
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
    searchPlaceholder: "Search a resource…",
    searchNoResult: "No resource matches your search.",
    navLabels: {
      popular: "Popular",
      fiscalite: "Taxation",
      casClients: "Case studies",
      blog: "Blog",
      glossaire: "Glossary",
    },
    popularSection: {
      heading: "Popular resources",
      resources: [
        {
          title: "Fractional CFO: complete guide",
          href: "/en/fractional-cfo",
          description: "Role, missions, cost and selection criteria for a part-time CFO.",
        },
        {
          title: "Due diligence checklist — fundraising",
          href: "/ressources/blog/checklist-due-diligence-levee-de-fonds",
          description: "The complete checklist to prepare your data room.",
        },
        {
          title: "Beckham Law 2026: complete guide",
          href: "/ressources/fiscalite/beckham-law",
          description: "24% flat rate, conditions, and step-by-step guide for expats in Spain.",
        },
        {
          title: "France vs Spain tax regimes",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          description: "Full comparison of IRPF / IR, corporate taxes and tax treaties.",
        },
        {
          title: "Financial glossary",
          href: "/ressources/glossaire",
          description: "EBITDA, working capital, ARR, BSPCE, cash burn… defined by our CFOs.",
        },
        {
          title: "10 essential CFO tools",
          href: "/ressources/blog/les-10-outils-pour-cfos-startup",
          description: "Pennylane, Agicap, Pigment, Pleo… the finance stack for startups.",
        },
      ],
    },
    fiscaliteSection: {
      id: "fiscalite",
      heading: "France-Spain Taxation",
      seeAllLabel: "View all tax articles",
      seeAllHref: "/ressources/fiscalite-espagne-france",
      cards: [
        {
          title: "Tax regimes: France vs Spain — 2026 guide",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Taxation",
        },
        {
          title: "Beckham Law 2026: 24% rate, conditions, and process",
          href: "/ressources/fiscalite/beckham-law",
          image: "/images/blog/loi-beckham-espagne.webp",
          tag: "Taxation",
        },
        {
          title: "France-Spain double taxation: how to avoid it?",
          href: "/ressources/fiscalite/double-imposition-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Taxation",
        },
        {
          title: "Tax residency in Spain: rules and 2026 conditions",
          href: "/ressources/fiscalite/residence-fiscale-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Taxation",
        },
        {
          title: "IRPF: Spanish income tax explained",
          href: "/ressources/fiscalite/impot-revenu-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Taxation",
        },
        {
          title: "France-Spain tax treaty: what it changes",
          href: "/ressources/fiscalite-espagne-france",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Taxation",
        },
      ],
    },
    categories: [
      {
        id: "cas-clients",
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
        id: "blog",
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
            href: "/ressources/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Essential financial tech tools",
            href: "/ressources/blog/essentiels-outils-tech-finance",
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
        id: "fiches-metiers",
        heading: "Job descriptions",
        seeAllLabel: "See all job descriptions",
        seeAllHref: "/en/fractional-cfo/role",
        cards: [
          {
            title: "Job description: Chief Financial Officer",
            href: "/en/fractional-cfo/role",
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
    searchPlaceholder: "Buscar un recurso…",
    searchNoResult: "Ningún recurso coincide con su búsqueda.",
    navLabels: {
      popular: "Populares",
      fiscalite: "Fiscalidad",
      casClients: "Casos prácticos",
      blog: "Blog",
      glossaire: "Glosario",
    },
    popularSection: {
      heading: "Recursos populares",
      resources: [
        {
          title: "DAF externalizado: guía completa",
          href: "/es/externalizacion-daf",
          description: "Rol, misiones, coste y criterios de selección de un DAF a tiempo parcial.",
        },
        {
          title: "Checklist due diligence — ronda de financiación",
          href: "/ressources/blog/checklist-due-diligence-levee-de-fonds",
          description: "La lista de control completa para preparar su data room.",
        },
        {
          title: "Ley Beckham 2026: guía completa",
          href: "/ressources/fiscalite/beckham-law",
          description: "Tipo fijo 24 %, condiciones y trámites para expatriados en España.",
        },
        {
          title: "Regímenes fiscales: Francia vs España",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          description: "Comparativa completa IRPF / IR, impuesto de sociedades y convenios.",
        },
        {
          title: "Glosario financiero",
          href: "/ressources/glossaire",
          description: "EBITDA, BFR, ARR, BSPCE, cash burn… definiciones de nuestros CFOs.",
        },
        {
          title: "Las 10 herramientas esenciales para CFOs",
          href: "/ressources/blog/les-10-outils-pour-cfos-startup",
          description: "Pennylane, Agicap, Pigment, Pleo… el stack financiero de las startups.",
        },
      ],
    },
    fiscaliteSection: {
      id: "fiscalite",
      heading: "Fiscalidad Francia-España",
      seeAllLabel: "Ver todos los artículos de fiscalidad",
      seeAllHref: "/ressources/fiscalite-espagne-france",
      cards: [
        {
          title: "Regímenes fiscales: Francia vs España — Guía 2026",
          href: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalidad",
        },
        {
          title: "Ley Beckham 2026: tipo 24 %, condiciones y trámites",
          href: "/ressources/fiscalite/beckham-law",
          image: "/images/blog/loi-beckham-espagne.webp",
          tag: "Fiscalidad",
        },
        {
          title: "Doble imposición Francia-España: cómo evitarla",
          href: "/ressources/fiscalite/double-imposition-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalidad",
        },
        {
          title: "Residencia fiscal en España: normas y condiciones 2026",
          href: "/ressources/fiscalite/residence-fiscale-france-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalidad",
        },
        {
          title: "IRPF: el impuesto sobre la renta español explicado",
          href: "/ressources/fiscalite/impot-revenu-espagne",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalidad",
        },
        {
          title: "Convenio fiscal Francia-España: qué cambia",
          href: "/ressources/fiscalite-espagne-france",
          image: "/images/blog/regimes-fiscaux-france-vs-espagne.webp",
          tag: "Fiscalidad",
        },
      ],
    },
    categories: [
      {
        id: "cas-clients",
        heading: "Casos prácticos",
        seeAllLabel: "Ver todos los casos prácticos",
        // SEO-ULT §4b (2026-08-15) — le slug espagnol est `casos-de-exito`,
        // comme les quatre liens juste en dessous ; seul le « voir tout »
        // gardait l'ancien chemin français, qui répond 308.
        seeAllHref: "/es/recursos/casos-de-exito",
        cards: [
          {
            title: "Happy Scribe: estructuración financiera de una scale-up",
            href: "/es/recursos/casos-de-exito",
            image: "/images/logos/logo-happyscribe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Ukio: acompañamiento en la ronda de financiación Serie A",
            href: "/es/recursos/casos-de-exito",
            image: "/images/logos/logo-ukio.webp",
            tag: "Caso práctico",
          },
          {
            title: "Surfe: implantación del reporting y seguimiento",
            href: "/es/recursos/casos-de-exito",
            image: "/images/logos/logo-surfe.webp",
            tag: "Caso práctico",
          },
          {
            title: "Yego: optimización de la gestión de tesorería",
            href: "/es/recursos/casos-de-exito",
            image: "/images/logos/logo-yego.webp",
            tag: "Caso práctico",
          },
        ],
      },
      {
        id: "blog",
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
            href: "/ressources/blog/organiser-sa-direction-financiere",
            image: "/images/blog/organiser-direction-financiere.jpg",
            tag: "Blog",
          },
          {
            title: "Las herramientas tecnológicas esenciales para las finanzas",
            href: "/ressources/blog/essentiels-outils-tech-finance",
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
        id: "fiches-metiers",
        heading: "Perfiles profesionales",
        seeAllLabel: "Ver todos los perfiles profesionales",
        // SEO-ULT §4b (2026-08-15) — la rubrique « fiches métier » a été
        // absorbée par le cluster DAF : /ressources/fiche-metier redirige
        // vers la page métier de chaque locale. La section espagnole portait
        // en plus le chemin français, sans préfixe de langue.
        seeAllHref: "/es/externalizacion-daf/funciones",
        cards: [
          {
            title: "Perfil profesional: Director Financiero",
            href: "/es/externalizacion-daf/funciones",
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
