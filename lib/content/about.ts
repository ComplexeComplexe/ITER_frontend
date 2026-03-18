import { Locale } from "../i18n";

export interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
}

export interface VisionCard {
  title: string;
  description: string;
}

export interface TimelineStage {
  title: string;
  description: string;
  href?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AboutContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  whoWeAre: {
    heading: string;
    paragraphs: string[];
  };
  vision: {
    heading: string;
    intro: string;
    cards: VisionCard[];
  };
  whenToCall: {
    heading: string;
    intro: string;
    stages: TimelineStage[];
  };
  team: {
    heading: string;
    intro: string;
    members: TeamMember[];
  };
  faq: {
    heading: string;
    items: FAQItem[];
  };
}

export const aboutContent: Record<Locale, AboutContent> = {
  fr: {
    meta: {
      title: "À propos | Iter Advisors",
      description:
        "Cabinet de conseil en finance et DAF externalisé, Iter Advisors accompagne le développement stratégique de ses partenaires par la structuration et le pilotage de leur fonction Finance.",
    },
    hero: {
      h1: "À propos",
      intro:
        "Cabinet de conseil en finance et DAF externalisé, Iter Advisors accompagne le développement stratégique de ses partenaires par la structuration et le pilotage de leur fonction Finance.",
    },
    whoWeAre: {
      heading: "Qui sommes-nous",
      paragraphs: [
        "Iter Advisors est un cabinet de conseil en finance d\u2019entreprise spécialisé dans l\u2019accompagnement des startups, PME et ETI en forte croissance. Nous intervenons en tant que DAF externalisé, à temps partagé ou en transition, pour structurer et piloter la fonction financière de nos partenaires.",
        "Fondé en 2021, Iter Advisors réunit une équipe de CFOs expérimentés, issus de parcours complémentaires (audit, contrôle de gestion, direction financière, M&A), au service d\u2019une vision commune\u00A0: rendre accessible aux entreprises en croissance une direction financière de premier plan.",
        "Basés à Barcelone, Paris et Toulouse, nous accompagnons nos clients en France, en Espagne et à l\u2019international, avec une approche sur mesure adaptée à chaque étape de leur développement.",
      ],
    },
    vision: {
      heading: "Notre vision",
      intro:
        "Nous croyons qu\u2019une direction financière solide est le socle de toute entreprise performante. Notre approche repose sur quatre piliers fondamentaux\u00A0:",
      cards: [
        {
          title: "Une comptabilité saine",
          description:
            "La base de toute gestion financière efficace. Nous veillons à ce que vos comptes soient tenus avec rigueur, transparence et en conformité avec les normes en vigueur.",
        },
        {
          title: "Des projections financières solides",
          description:
            "Anticiper pour mieux décider. Nous construisons des modèles prévisionnels robustes qui vous permettent de piloter votre activité avec confiance et de préparer vos levées de fonds.",
        },
        {
          title: "Une optimisation financière",
          description:
            "Maximiser la performance de chaque euro investi. Nous identifions les leviers d\u2019optimisation pour améliorer votre rentabilité, votre trésorerie et votre structure de coûts.",
        },
        {
          title: "Un fort esprit entrepreneurial",
          description:
            "Nous pensons comme des entrepreneurs. Chaque recommandation est guidée par une compréhension profonde des enjeux opérationnels et stratégiques de votre entreprise.",
        },
      ],
    },
    whenToCall: {
      heading: "Quand faire appel à Iter Advisors\u00A0?",
      intro:
        "Nous intervenons à chaque étape clé de la vie de votre entreprise\u00A0:",
      stages: [
        {
          title: "Lancement",
          description:
            "Structurez votre fonction finance dès le départ. Mise en place de la comptabilité, des outils de gestion et des premiers tableaux de bord pour piloter votre activité.",
          href: "/services/externalisation-comptable",
        },
        {
          title: "Croissance",
          description:
            "Accompagnez votre montée en puissance. Renforcement des process financiers, construction de business plans, pilotage de la performance et préparation aux levées de fonds.",
          href: "/daf-externalise",
        },
        {
          title: "Gestion de crise",
          description:
            "Réagissez rapidement face aux difficultés. Plan de trésorerie d\u2019urgence, renégociation avec les créanciers, restructuration financière et accompagnement stratégique.",
          href: "/services/gestion-de-tresorerie",
        },
        {
          title: "Levée de fonds",
          description:
            "Préparez et sécurisez vos financements. Construction du dossier investisseur, modélisation financière, due diligence et négociation avec les fonds d\u2019investissement.",
          href: "/services/levee-de-fonds",
        },
        {
          title: "Post-levée",
          description:
            "Déployez efficacement les fonds levés. Mise en place du reporting investisseurs, structuration de la croissance, recrutement et organisation de la direction financière.",
          href: "/services/controle-de-gestion-externalise",
        },
      ],
    },
    team: {
      heading: "Notre équipe",
      intro:
        "Une équipe de CFOs expérimentés aux parcours complémentaires, unis par une même passion pour l\u2019accompagnement des entreprises en croissance.",
      members: [],
    },
    faq: {
      heading: "Questions fréquentes",
      items: [
        {
          question: "Qu\u2019est-ce qu\u2019un DAF externalisé\u00A0?",
          answer:
            "Un DAF externalisé est un Directeur Administratif et Financier qui intervient au sein de votre entreprise à temps partiel ou en mission ponctuelle, sans être salarié. Il apporte la même expertise qu\u2019un DAF en interne, avec plus de flexibilité et à moindre coût.",
        },
        {
          question: "Quelle est la différence entre un DAF à temps partagé et un DAF de transition\u00A0?",
          answer:
            "Le DAF à temps partagé intervient de manière récurrente sur une période longue (quelques jours par semaine ou par mois). Le DAF de transition intervient à temps plein sur une durée limitée, généralement pour gérer une situation spécifique (restructuration, levée de fonds, remplacement temporaire).",
        },
        {
          question: "À quel type d\u2019entreprise s\u2019adresse Iter Advisors\u00A0?",
          answer:
            "Nous accompagnons principalement les startups, PME et ETI en croissance, de la phase d\u2019amorçage à la phase de scale-up. Nos clients évoluent dans des secteurs variés\u00A0: tech, SaaS, e-commerce, services, industrie, etc.",
        },
        {
          question: "Comment fonctionne une mission avec Iter Advisors\u00A0?",
          answer:
            "Après un premier échange pour comprendre vos besoins, nous vous proposons un CFO adapté à votre contexte. La mission démarre par un diagnostic de votre fonction finance, suivi d\u2019un plan d\u2019action concret. Nous intervenons ensuite de manière régulière selon la formule choisie.",
        },
        {
          question: "Combien coûte un DAF externalisé\u00A0?",
          answer:
            "Le coût varie en fonction du volume d\u2019intervention et de la complexité de la mission. En général, un DAF externalisé coûte entre 30\u00A0% et 60\u00A0% moins cher qu\u2019un DAF salarié à temps plein, tout en offrant une expertise de haut niveau.",
        },
        {
          question: "Quels outils utilisez-vous\u00A0?",
          answer:
            "Nous travaillons avec les meilleurs outils du marché\u00A0: Pennylane, QuickBooks, Xero pour la comptabilité\u00A0; Agicap, Fygr pour la trésorerie\u00A0; Google Sheets, Excel, Notion pour le reporting\u00A0; et bien d\u2019autres solutions adaptées à chaque besoin.",
        },
        {
          question: "Intervenez-vous à l\u2019international\u00A0?",
          answer:
            "Oui, nous accompagnons des entreprises en France, en Espagne et à l\u2019international. Notre équipe est bilingue (français/anglais) et certains de nos CFOs parlent également espagnol.",
        },
        {
          question: "Pouvez-vous nous accompagner sur une levée de fonds\u00A0?",
          answer:
            "Absolument. L\u2019accompagnement en levée de fonds est l\u2019une de nos spécialités. Nous intervenons sur la préparation du dossier investisseur, la modélisation financière, la data room, la due diligence et la négociation avec les fonds.",
        },
        {
          question: "Quelle est la durée moyenne d\u2019une mission\u00A0?",
          answer:
            "La durée dépend du type de mission. Un DAF à temps partagé intervient généralement sur 6 à 24 mois. Un DAF de transition intervient sur 3 à 6 mois. Une mission ponctuelle (levée de fonds, restructuration) dure en moyenne 2 à 4 mois.",
        },
        {
          question: "Comment prendre contact avec Iter Advisors\u00A0?",
          answer:
            "Vous pouvez nous contacter via notre formulaire en ligne, par email ou en prenant directement rendez-vous sur notre site. Nous vous répondons sous 24 heures et organisons un premier échange gratuit pour comprendre vos besoins.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "About us | Iter Advisors",
      description:
        "Iter Advisors is a Fractional CFO and finance advisory firm that supports the strategic growth of its partners by structuring, managing, and scaling their finance function.",
    },
    hero: {
      h1: "About us",
      intro:
        "Iter Advisors is a Fractional CFO and finance advisory firm that supports the strategic growth of its partners by structuring, managing, and scaling their finance function.",
    },
    whoWeAre: {
      heading: "Who we are",
      paragraphs: [
        "Iter Advisors is a corporate finance advisory firm specializing in supporting high-growth startups, SMEs and mid-cap companies. We act as an outsourced CFO, on a shared-time or transitional basis, to structure and manage the finance function of our partners.",
        "Founded in 2021, Iter Advisors brings together a team of experienced CFOs from complementary backgrounds (audit, management control, financial management, M&A), united by a shared vision: making first-class financial management accessible to growing companies.",
        "Based in Barcelona, Paris and Toulouse, we support our clients in France, Spain and internationally, with a tailored approach adapted to each stage of their development.",
      ],
    },
    vision: {
      heading: "Our vision",
      intro:
        "We believe that a solid finance function is the foundation of every successful business. Our approach is built on four fundamental pillars:",
      cards: [
        {
          title: "Best-in-class accounting",
          description:
            "The foundation of all effective financial management. We ensure that your accounts are maintained with rigor, transparency and in compliance with current standards.",
        },
        {
          title: "High-quality financial forecasting",
          description:
            "Anticipate to make better decisions. We build robust forecasting models that allow you to steer your business with confidence and prepare your fundraising rounds.",
        },
        {
          title: "Financial optimization",
          description:
            "Maximizing the performance of every euro invested. We identify optimization levers to improve your profitability, cash flow and cost structure.",
        },
        {
          title: "A strong entrepreneurial spirit",
          description:
            "We think like entrepreneurs. Every recommendation is guided by a deep understanding of the operational and strategic challenges facing your business.",
        },
      ],
    },
    whenToCall: {
      heading: "When should you call on Iter Advisors?",
      intro:
        "We step in at every key stage of your company\u2019s life cycle:",
      stages: [
        {
          title: "Launch",
          description:
            "Structure your finance function from the outset. Setting up accounting, management tools and initial dashboards to steer your business.",
        },
        {
          title: "Growth",
          description:
            "Support your scaling efforts. Strengthening financial processes, building business plans, managing performance and preparing for fundraising.",
        },
        {
          title: "Crisis management",
          description:
            "React quickly to difficulties. Emergency cash flow planning, renegotiation with creditors, financial restructuring and strategic support.",
        },
        {
          title: "Fund raising",
          description:
            "Prepare and secure your financing. Building the investor file, financial modeling, due diligence and negotiation with investment funds.",
        },
        {
          title: "Post-emergence",
          description:
            "Deploy raised funds effectively. Setting up investor reporting, structuring growth, recruiting and organizing the finance department.",
        },
      ],
    },
    team: {
      heading: "Our team",
      intro:
        "A team of experienced CFOs with complementary backgrounds, united by a shared passion for supporting growing companies.",
      members: [],
    },
    faq: {
      heading: "Frequently asked questions",
      items: [
        {
          question: "What is a fractional CFO?",
          answer:
            "A fractional CFO is a Chief Financial Officer who works within your company on a part-time or project basis, without being a full-time employee. They bring the same expertise as an in-house CFO, with greater flexibility and at a lower cost.",
        },
        {
          question: "What is the difference between a shared-time CFO and a transitional CFO?",
          answer:
            "A shared-time CFO works on a recurring basis over a long period (a few days per week or per month). A transitional CFO works full-time for a limited period, usually to manage a specific situation (restructuring, fundraising, temporary replacement).",
        },
        {
          question: "What type of company does Iter Advisors work with?",
          answer:
            "We primarily support growing startups, SMEs and mid-cap companies, from seed stage to scale-up phase. Our clients operate in a variety of sectors: tech, SaaS, e-commerce, services, industry, etc.",
        },
        {
          question: "How does an engagement with Iter Advisors work?",
          answer:
            "After an initial discussion to understand your needs, we propose a CFO suited to your context. The engagement starts with a diagnostic of your finance function, followed by a concrete action plan. We then work on a regular basis according to the chosen formula.",
        },
        {
          question: "How much does a fractional CFO cost?",
          answer:
            "The cost varies depending on the volume of work and the complexity of the engagement. In general, a fractional CFO costs between 30% and 60% less than a full-time salaried CFO, while providing high-level expertise.",
        },
        {
          question: "What tools do you use?",
          answer:
            "We work with the best tools on the market: Pennylane, QuickBooks, Xero for accounting; Agicap, Fygr for cash management; Google Sheets, Excel, Notion for reporting; and many other solutions tailored to each need.",
        },
        {
          question: "Do you work internationally?",
          answer:
            "Yes, we support companies in France, Spain and internationally. Our team is bilingual (French/English) and some of our CFOs also speak Spanish.",
        },
        {
          question: "Can you support us on a fundraising round?",
          answer:
            "Absolutely. Fundraising support is one of our specialties. We assist with investor file preparation, financial modeling, data room, due diligence and negotiation with funds.",
        },
        {
          question: "What is the average duration of an engagement?",
          answer:
            "The duration depends on the type of engagement. A shared-time CFO typically works over 6 to 24 months. A transitional CFO works over 3 to 6 months. A specific engagement (fundraising, restructuring) lasts on average 2 to 4 months.",
        },
        {
          question: "How can I get in touch with Iter Advisors?",
          answer:
            "You can contact us via our online form, by email or by booking an appointment directly on our website. We respond within 24 hours and organize a free initial call to understand your needs.",
        },
      ],
    },
  },
  es: {
    meta: {
      title: "Sobre nosotros | Iter Advisors",
      description:
        "Iter Advisors es una firma de consultoría financiera y CFO externalizado que apoya el crecimiento estratégico de sus socios estructurando, gestionando y escalando su función financiera.",
    },
    hero: {
      h1: "Sobre nosotros",
      intro:
        "Iter Advisors es una firma de consultoría financiera y CFO externalizado que apoya el crecimiento estratégico de sus socios estructurando, gestionando y escalando su función financiera.",
    },
    whoWeAre: {
      heading: "Quiénes somos",
      paragraphs: [
        "Iter Advisors es una firma de consultoría en finanzas corporativas especializada en el acompañamiento de startups, pymes y empresas de mediana capitalización en fuerte crecimiento. Actuamos como CFO externalizado, a tiempo compartido o de transición, para estructurar y gestionar la función financiera de nuestros socios.",
        "Fundada en 2021, Iter Advisors reúne un equipo de CFOs experimentados de trayectorias complementarias (auditoría, control de gestión, dirección financiera, M&A), unidos por una visión compartida\u00A0: hacer accesible a las empresas en crecimiento una dirección financiera de primer nivel.",
        "Con sede en Barcelona, París y Toulouse, acompañamos a nuestros clientes en Francia, España e internacionalmente, con un enfoque a medida adaptado a cada etapa de su desarrollo.",
      ],
    },
    vision: {
      heading: "Nuestra visión",
      intro:
        "Creemos que una función financiera sólida es la base de toda empresa exitosa. Nuestro enfoque se sustenta en cuatro pilares fundamentales:",
      cards: [
        {
          title: "Una contabilidad de primer nivel",
          description:
            "La base de toda gestión financiera eficaz. Nos aseguramos de que sus cuentas se mantengan con rigor, transparencia y en conformidad con las normas vigentes.",
        },
        {
          title: "Proyecciones financieras sólidas",
          description:
            "Anticipar para decidir mejor. Construimos modelos de previsión robustos que le permiten pilotar su actividad con confianza y preparar sus rondas de financiación.",
        },
        {
          title: "Optimización financiera",
          description:
            "Maximizar el rendimiento de cada euro invertido. Identificamos palancas de optimización para mejorar su rentabilidad, tesorería y estructura de costes.",
        },
        {
          title: "Un fuerte espíritu emprendedor",
          description:
            "Pensamos como emprendedores. Cada recomendación está guiada por una comprensión profunda de los retos operativos y estratégicos de su empresa.",
        },
      ],
    },
    whenToCall: {
      heading: "¿Cuándo recurrir a Iter Advisors?",
      intro:
        "Intervenimos en cada etapa clave del ciclo de vida de su empresa:",
      stages: [
        {
          title: "Lanzamiento",
          description:
            "Estructure su función financiera desde el inicio. Puesta en marcha de la contabilidad, herramientas de gestión y primeros cuadros de mando para pilotar su actividad.",
        },
        {
          title: "Crecimiento",
          description:
            "Acompañe su escalada. Refuerzo de los procesos financieros, construcción de planes de negocio, pilotaje del rendimiento y preparación para rondas de financiación.",
        },
        {
          title: "Gestión de crisis",
          description:
            "Reaccione rápidamente ante las dificultades. Plan de tesorería de emergencia, renegociación con acreedores, reestructuración financiera y apoyo estratégico.",
        },
        {
          title: "Ronda de financiación",
          description:
            "Prepare y asegure su financiación. Elaboración del dossier para inversores, modelización financiera, due diligence y negociación con fondos de inversión.",
        },
        {
          title: "Post-ronda",
          description:
            "Despliegue eficazmente los fondos recaudados. Implantación del reporting para inversores, estructuración del crecimiento, contratación y organización del departamento financiero.",
        },
      ],
    },
    team: {
      heading: "Nuestro equipo",
      intro:
        "Un equipo de CFOs experimentados con trayectorias complementarias, unidos por una misma pasión por el acompañamiento de empresas en crecimiento.",
      members: [],
    },
    faq: {
      heading: "Preguntas frecuentes",
      items: [
        {
          question: "¿Qué es un CFO externalizado?",
          answer:
            "Un CFO externalizado es un Director Financiero que trabaja en su empresa a tiempo parcial o por proyecto, sin ser empleado a tiempo completo. Aporta la misma experiencia que un CFO interno, con mayor flexibilidad y a menor coste.",
        },
        {
          question: "¿Cuál es la diferencia entre un CFO a tiempo compartido y un CFO de transición?",
          answer:
            "El CFO a tiempo compartido interviene de forma recurrente durante un período largo (algunos días por semana o por mes). El CFO de transición interviene a tiempo completo por un período limitado, generalmente para gestionar una situación específica (reestructuración, ronda de financiación, sustitución temporal).",
        },
        {
          question: "¿A qué tipo de empresa se dirige Iter Advisors?",
          answer:
            "Acompañamos principalmente a startups, pymes y empresas de mediana capitalización en crecimiento, desde la fase semilla hasta la fase de scale-up. Nuestros clientes operan en sectores variados: tech, SaaS, e-commerce, servicios, industria, etc.",
        },
        {
          question: "¿Cómo funciona una misión con Iter Advisors?",
          answer:
            "Tras un primer intercambio para comprender sus necesidades, le proponemos un CFO adaptado a su contexto. La misión comienza con un diagnóstico de su función financiera, seguido de un plan de acción concreto. Luego intervenimos de forma regular según la fórmula elegida.",
        },
        {
          question: "¿Cuánto cuesta un CFO externalizado?",
          answer:
            "El coste varía en función del volumen de intervención y la complejidad de la misión. En general, un CFO externalizado cuesta entre un 30% y un 60% menos que un CFO asalariado a tiempo completo, ofreciendo al mismo tiempo una experiencia de alto nivel.",
        },
        {
          question: "¿Qué herramientas utilizáis?",
          answer:
            "Trabajamos con las mejores herramientas del mercado: Pennylane, QuickBooks, Xero para la contabilidad; Agicap, Fygr para la tesorería; Google Sheets, Excel, Notion para el reporting; y muchas otras soluciones adaptadas a cada necesidad.",
        },
        {
          question: "¿Trabajáis a nivel internacional?",
          answer:
            "Sí, acompañamos a empresas en Francia, España e internacionalmente. Nuestro equipo es bilingüe (francés/inglés) y algunos de nuestros CFOs también hablan español.",
        },
        {
          question: "¿Podéis acompañarnos en una ronda de financiación?",
          answer:
            "Por supuesto. El acompañamiento en rondas de financiación es una de nuestras especialidades. Intervenimos en la preparación del dossier para inversores, la modelización financiera, la data room, la due diligence y la negociación con los fondos.",
        },
        {
          question: "¿Cuál es la duración media de una misión?",
          answer:
            "La duración depende del tipo de misión. Un CFO a tiempo compartido interviene generalmente de 6 a 24 meses. Un CFO de transición interviene de 3 a 6 meses. Una misión puntual (ronda de financiación, reestructuración) dura en promedio de 2 a 4 meses.",
        },
        {
          question: "¿Cómo contactar con Iter Advisors?",
          answer:
            "Puede contactarnos a través de nuestro formulario en línea, por correo electrónico o reservando directamente una cita en nuestra web. Le respondemos en 24 horas y organizamos una primera llamada gratuita para comprender sus necesidades.",
        },
      ],
    },
  },
} as const;

export function getAboutContent(locale: Locale): AboutContent {
  return aboutContent[locale];
}
