import { CLIENTS_ACCOMPAGNES, TEAM_LABEL, } from "./facts";
import { getFinanceStackSummary } from "./finance-stack";
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
        "Cabinet de DAF externalisé, Iter Advisors accompagne PME et startups dans la structuration financière, la levée de fonds et le contrôle de gestion.",
    },
    hero: {
      // SEO-001 (2026-08-09) — le H1 reprenait « cabinet de DAF externalisé »,
      // en doublon du title (corrigé de son côté) et de la page pilier. Cette
      // page raconte le cabinet : équipe, histoire, bureaux. Le terme reste
      // présent dans l'intro et le corps, où il décrit l'activité sans
      // disputer la requête générique au pilier.
      h1: "Le cabinet Iter Advisors",
      intro:
        "Cabinet de conseil en finance et DAF externalisé, Iter Advisors accompagne le développement stratégique de ses partenaires par la structuration et le pilotage de leur fonction Finance.",
    },
    whoWeAre: {
      heading: "Qui sommes-nous",
      paragraphs: [
        `Notre équipe réunit ${TEAM_LABEL.fr} et nous avons accompagné ${CLIENTS_ACCOMPAGNES} entreprises depuis la création du cabinet.`,
        "Iter Advisors est un cabinet de conseil en finance d\u2019entreprise spécialisé dans l\u2019accompagnement des startups, PME et ETI en forte croissance. Nous intervenons en tant que DAF externalisé, à temps partagé ou en transition, pour structurer et piloter la fonction financière de nos partenaires. Pour les startups VC-backed, nous proposons aussi une offre dédiée de [fractional CFO](/fractional-cfo-startups).",
        "Fondé en 2021, Iter Advisors réunit des CFOs expérimentés aux parcours complémentaires : audit, contrôle de gestion, direction financière, M&A. Leur vision commune\u00A0: rendre accessible aux entreprises en croissance une direction financière de premier plan.",
        "Avec des équipes à Barcelone et Paris, et une intervention à Toulouse à distance ou sur accord, nous accompagnons nos clients en France, en Espagne et à l\u2019international, avec une approche sur mesure adaptée à chaque étape de leur développement.",
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
          href: "/services/comptabilite-externalisation",
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
          href: "/services/previsionnel-tresorerie",
        },
        {
          title: "Levée de fonds",
          description:
            "Préparez et sécurisez vos financements. Construction du dossier investisseur, modélisation financière, due diligence et négociation avec les fonds d\u2019investissement.",
          href: "/services/accompagnement-levee-de-fond",
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
            "Un DAF externalisé accompagne le dirigeant sur le pilotage financier, selon un périmètre et un rythme convenus. Sa présence, ses responsabilités et ses livrables doivent être comparés à ceux d’un poste interne.",
        },
        {
          question: "Quelle est la différence entre un DAF à temps partagé et un DAF de transition\u00A0?",
          answer:
            "Le temps partagé répond à un besoin régulier de pilotage. Une mission de transition couvre une situation temporaire, comme un remplacement ou une réorganisation. La présence et la disponibilité sont définies dans la proposition.",
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
            "Le devis dépend des livrables, du rythme et de la complexité. La page tarifs présente des repères indicatifs. Une prestation à temps partagé et un poste à temps plein ne couvrent pas automatiquement le même besoin.",
        },
        {
          question: "Quels outils utilisez-vous\u00A0?",
          answer:
            getFinanceStackSummary("fr"),
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
            "La durée, le rythme, le préavis et la passation sont convenus selon la mission. Nous ne publions pas de durée moyenne sans données comparables et datées.",
        },
        {
          question: "Comment prendre contact avec Iter Advisors\u00A0?",
          answer:
            "Le formulaire et nos coordonnées permettent de présenter votre besoin. Nous vous recontactons pour préciser la situation et organiser un échange. Aucun rendez-vous n’est réservé automatiquement.",
        },
      ],
    },
  },
  en: {
    meta: {
      title: "About us | Iter Advisors",
      description:
        "Iter Advisors is a Fractional CFO and finance advisory firm supporting strategic growth through financial structuring, fundraising and management control.",
    },
    hero: {
      h1: "About us",
      intro:
        "Iter Advisors is a Fractional CFO and finance advisory firm that supports the strategic growth of its partners by structuring, managing, and scaling their finance function.",
    },
    whoWeAre: {
      heading: "Who we are",
      paragraphs: [
        `Our team includes ${TEAM_LABEL.en} and we have supported ${CLIENTS_ACCOMPAGNES} companies since the firm was founded.`,
        "Iter Advisors is a corporate finance advisory firm supporting growing startups, SMEs and mid-sized companies. We provide fractional, part-time or interim CFO support to structure and manage their finance function. For VC-backed startups, we also offer dedicated [fractional CFO support](/fractional-cfo-startups).",
        "Founded in 2021, Iter Advisors brings together experienced CFOs from complementary backgrounds: audit, management control, financial management, M&A. Their shared vision: making first-class financial management accessible to growing companies.",
        "With teams in Barcelona and Paris, serving Toulouse remotely or through agreed visits, we support our clients in France, Spain and internationally, with a tailored approach adapted to each stage of their development.",
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
          title: "After fundraising",
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
            "A fractional CFO supports the business leader with financial management within an agreed scope and schedule. Presence, responsibilities and deliverables should be compared with those of an internal position.",
        },
        {
          question: "What is the difference between a shared-time CFO and a transitional CFO?",
          answer:
            "Part-time support addresses an ongoing management need. An interim engagement covers a temporary situation such as a replacement or reorganisation. Presence and availability are set out in the proposal.",
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
            "The quotation depends on deliverables, schedule and complexity. The pricing page provides indicative benchmarks. Part-time support and a full-time position do not automatically cover the same need.",
        },
        {
          question: "What tools do you use?",
          answer:
            getFinanceStackSummary("en"),
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
            "Duration, schedule, notice period and handover are agreed for the engagement. We do not publish an average duration without comparable, dated data.",
        },
        {
          question: "How can I get in touch with Iter Advisors?",
          answer:
            "Use our form or contact details to describe your needs. We will contact you to clarify the situation and arrange a conversation. No appointment is booked automatically.",
        },
      ],
    },
  },
  es: {
    meta: {
      title: "Sobre nosotros | Iter Advisors",
      description:
        "Iter Advisors, firma de CFO externo y consultoría financiera. Apoyamos pymes y startups en estructuración financiera y captación de fondos.",
    },
    hero: {
      h1: "Sobre nosotros",
      intro:
        "Iter Advisors es una firma de consultoría financiera y CFO externo que apoya el crecimiento estratégico de sus socios estructurando, gestionando y escalando su función financiera.",
    },
    whoWeAre: {
      heading: "Quiénes somos",
      paragraphs: [
        `Nuestro equipo cuenta con ${TEAM_LABEL.es} y hemos acompañado a ${CLIENTS_ACCOMPAGNES} empresas desde la creación del gabinete.`,
        "Iter Advisors es una firma de consultoría financiera que acompaña a startups, pymes y empresas medianas en crecimiento. Intervenimos como CFO externo, a tiempo parcial o de transición para estructurar y gestionar su función financiera. Para startups financiadas por capital riesgo ofrecemos también [CFO para startups](/fractional-cfo-startups).",
        "Fundada en 2021, Iter Advisors reúne CFOs experimentados de trayectorias complementarias: auditoría, control de gestión, dirección financiera, M&A. Su visión compartida\u00A0: hacer accesible a las empresas en crecimiento una dirección financiera de primer nivel.",
        "Con equipos en Barcelona y París e intervención en Toulouse en remoto o mediante visitas acordadas, acompañamos a nuestros clientes en Francia, España e internacionalmente, con un enfoque a medida adaptado a cada etapa de su desarrollo.",
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
          question: "¿Qué es un CFO externo?",
          answer:
            "Un CFO externo acompaña al directivo en la gestión financiera según un alcance y una dedicación acordados. Su presencia, responsabilidades y entregables deben compararse con los de un puesto interno.",
        },
        {
          question: "¿Cuál es la diferencia entre un CFO a tiempo compartido y un CFO de transición?",
          answer:
            "El tiempo parcial responde a una necesidad regular de gestión. Una misión de transición cubre una situación temporal, como una sustitución o reorganización. La presencia y disponibilidad se precisan en la propuesta.",
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
          question: "¿Cuánto cuesta un CFO externo?",
          answer:
            "El presupuesto depende de los entregables, la dedicación y la complejidad. La página de precios presenta referencias indicativas. Un acompañamiento a tiempo parcial y un puesto a tiempo completo no cubren automáticamente la misma necesidad.",
        },
        {
          question: "¿Qué herramientas utilizáis?",
          answer:
            getFinanceStackSummary("es"),
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
            "La duración, dedicación, preaviso y traspaso se acuerdan según la misión. No publicamos una duración media sin datos comparables y fechados.",
        },
        {
          question: "¿Cómo contactar con Iter Advisors?",
          answer:
            "El formulario y nuestros datos de contacto permiten presentar tu necesidad. Te contactaremos para precisar la situación y organizar una conversación. No se reserva una cita automáticamente.",
        },
      ],
    },
  },
} as const;

export function getAboutContent(locale: Locale): AboutContent {
  const content = aboutContent[locale];
  return { ...content, whenToCall: { ...content.whenToCall, stages: content.whenToCall.stages.map((stage, i) => ({ ...stage, href: aboutContent.fr.whenToCall.stages[i].href })) } };
}
