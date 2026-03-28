import { Locale } from "../i18n";

export interface MaDueDiligenceContent {
  meta: {
    title: string;
    description: string;
  };
  hero: {
    h1: string;
    intro: string;
  };
  sections: {
    heading: string;
    content: string;
  }[];
  services: {
    title: string;
    items: { name: string; description: string }[];
  };
  process: {
    title: string;
    steps: { step: string; title: string; description: string }[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  cta: {
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

const content: Record<Locale, MaDueDiligenceContent> = {
  fr: {
    meta: {
      title: "M&A et Due Diligence financiere - Accompagnement expert | Iter Advisors",
      description:
        "Accompagnement M&A et due diligence financiere pour startups et PME. Preparation, execution et negociation. +100M EUR de transactions accompagnees. Diagnostic gratuit.",
    },
    hero: {
      h1: "M&A et Due Diligence financiere : securisez vos operations strategiques",
      intro:
        "Que vous prepariez une levee de fonds, une acquisition ou une cession, la due diligence financiere est l'etape critique qui determine le succes de votre operation. Nos CFOs experts vous accompagnent de la preparation a la cloture.",
    },
    sections: [
      {
        heading: "Pourquoi la due diligence financiere est essentielle",
        content: `<p>La due diligence financiere est le processus d'investigation approfondie des comptes et de la situation financiere d'une entreprise dans le cadre d'une transaction (levee de fonds, acquisition, cession, fusion). Elle permet aux investisseurs et aux acquereurs de <strong>verifier la realite des chiffres presentes</strong> et d'identifier les risques financiers potentiels.</p>
<p>Pour les dirigeants, preparer sa due diligence en amont est un avantage strategique majeur. Une entreprise "DD-ready" inspire confiance, accelere les negociations et maximise sa valorisation. A l'inverse, des comptes mal tenus ou des zones d'ombre financieres peuvent faire echouer une operation ou entrainer des decotes significatives.</p>
<p>Chez Iter Advisors, nous avons accompagne plus de <strong>100 millions d'euros de transactions</strong> - levees de fonds, acquisitions et cessions - pour des startups et PME en France et en Espagne.</p>`,
      },
      {
        heading: "Les composantes d'une due diligence financiere",
        content: `<ul>
<li><strong>Analyse des etats financiers</strong> : revue des bilans, comptes de resultat et tableaux de flux sur 3 a 5 ans. Verification de la coherence et de la fiabilite des donnees comptables.</li>
<li><strong>Qualite des revenus (Quality of Earnings)</strong> : distinction entre revenus recurrents et non-recurrents, analyse de la croissance organique vs. acquisitions, verification du chiffre d'affaires normalise.</li>
<li><strong>Analyse du BFR et de la tresorerie</strong> : etude du besoin en fonds de roulement, des cycles de paiement clients/fournisseurs, et de la position de tresorerie nette.</li>
<li><strong>Dette et engagements hors bilan</strong> : identification de toutes les dettes financieres, des engagements de credit-bail, des garanties donnees et des litiges en cours.</li>
<li><strong>Projections et business plan</strong> : validation des hypotheses de croissance, des marges previsionnelles et de la coherence du plan de financement.</li>
<li><strong>Conformite fiscale et sociale</strong> : verification des declarations fiscales, des obligations sociales et des risques de redressement.</li>
</ul>`,
      },
    ],
    services: {
      title: "Nos services M&A et due diligence",
      items: [
        {
          name: "Preparation a la due diligence (Vendor DD)",
          description:
            "Nous preparons votre entreprise a recevoir une due diligence : nettoyage des comptes, preparation de la dataroom, redaction du rapport financier vendeur et anticipation des questions des investisseurs.",
        },
        {
          name: "Due diligence acquereur (Buy-side DD)",
          description:
            "Nous realisons la due diligence financiere pour le compte d'acquereurs : analyse des comptes cibles, identification des risques, ajustements de prix et recommandations d'investissement.",
        },
        {
          name: "Accompagnement levee de fonds",
          description:
            "De la preparation du financial model a la negociation du term sheet, nous accompagnons les fondateurs a chaque etape de leur levee de fonds. Plus de 100M EUR leves pour nos clients.",
        },
        {
          name: "Valorisation d'entreprise",
          description:
            "Methodes DCF, multiples de marche et transactions comparables pour etablir une valorisation robuste et defensible de votre entreprise.",
        },
        {
          name: "Integration post-acquisition (PMI)",
          description:
            "Accompagnement dans l'integration financiere post-acquisition : harmonisation des systemes comptables, consolidation des reporting et optimisation des synergies.",
        },
      ],
    },
    process: {
      title: "Notre processus d'accompagnement",
      steps: [
        {
          step: "01",
          title: "Diagnostic initial",
          description:
            "Audit de votre situation financiere actuelle, identification des zones de risque et definition du perimetre de la mission. Livrable : rapport de diagnostic avec plan d'action.",
        },
        {
          step: "02",
          title: "Preparation de la dataroom",
          description:
            "Organisation et verification de tous les documents financiers, juridiques et operationnels. Mise en place de la dataroom virtuelle avec acces securises.",
        },
        {
          step: "03",
          title: "Execution de la due diligence",
          description:
            "Analyse approfondie des donnees financieres, sessions de Q&A avec les parties prenantes, et redaction du rapport de due diligence.",
        },
        {
          step: "04",
          title: "Negociation et closing",
          description:
            "Support dans les negociations de prix, les ajustements post-DD et l'accompagnement jusqu'a la signature definitive.",
        },
      ],
    },
    faq: {
      title: "Questions frequentes",
      items: [
        {
          question: "Combien de temps dure une due diligence financiere ?",
          answer:
            "La duree varie selon la complexite de l'operation : 2 a 4 semaines pour une levee de fonds seed/Serie A, 4 a 8 semaines pour une acquisition de PME, et jusqu'a 12 semaines pour des operations plus complexes. La preparation en amont (vendor DD) peut prendre 4 a 6 semaines supplementaires.",
        },
        {
          question: "Quel est le cout d'un accompagnement due diligence ?",
          answer:
            "Nos honoraires dependent du perimetre de la mission. Pour une preparation de levee de fonds, comptez entre 5 000 et 15 000 EUR. Pour une due diligence complete d'acquisition, les honoraires se situent entre 10 000 et 30 000 EUR selon la taille et la complexite de la cible.",
        },
        {
          question: "Pouvez-vous intervenir en urgence sur une due diligence en cours ?",
          answer:
            "Oui, nous avons l'habitude d'intervenir rapidement. Nous pouvons mobiliser une equipe en 48 heures pour des situations urgentes, comme une due diligence deja lancee par un investisseur ou un acquereur.",
        },
        {
          question: "Travaillez-vous avec des entreprises hors de France ?",
          answer:
            "Oui, nous accompagnons des entreprises en France, en Espagne et a l'international. Notre equipe est trilingue (francais, anglais, espagnol) et maitrise les normes comptables francaises (PCG), espagnoles (PGC) et internationales (IFRS).",
        },
      ],
    },
    cta: {
      title: "Preparez votre prochaine operation",
      description:
        "Que vous prepariez une levee de fonds, une acquisition ou une cession, nos experts sont la pour vous accompagner. Prenez rendez-vous pour un diagnostic gratuit de 30 minutes.",
      buttonText: "Prendre rendez-vous",
      buttonHref: "/contact",
    },
  },
  en: {
    meta: {
      title: "M&A and Financial Due Diligence - Expert Advisory | Iter Advisors",
      description:
        "M&A and financial due diligence for startups and SMEs. Preparation, execution and negotiation. 100M+ EUR in transactions supported. Free consultation.",
    },
    hero: {
      h1: "M&A and Financial Due Diligence: Secure Your Strategic Operations",
      intro:
        "Whether you are preparing a fundraise, an acquisition or a divestiture, financial due diligence is the critical step that determines the success of your transaction. Our expert CFOs guide you from preparation to closing.",
    },
    sections: [
      {
        heading: "Why financial due diligence matters",
        content: `<p>Financial due diligence is the process of thoroughly investigating a company's accounts and financial position in the context of a transaction (fundraising, acquisition, divestiture, merger). It allows investors and acquirers to <strong>verify the reality of the figures presented</strong> and identify potential financial risks.</p>
<p>For business leaders, preparing your due diligence in advance is a major strategic advantage. A "DD-ready" company inspires confidence, accelerates negotiations and maximizes valuation. Conversely, poorly maintained accounts or financial grey areas can derail a transaction or lead to significant discounts.</p>
<p>At Iter Advisors, we have supported over <strong>100 million euros in transactions</strong> - fundraises, acquisitions and divestitures - for startups and SMEs in France and Spain.</p>`,
      },
      {
        heading: "Components of financial due diligence",
        content: `<ul>
<li><strong>Financial statement analysis</strong>: review of balance sheets, income statements and cash flow statements over 3 to 5 years.</li>
<li><strong>Quality of Earnings</strong>: distinction between recurring and non-recurring revenues, organic vs. acquisition growth analysis.</li>
<li><strong>Working capital and cash analysis</strong>: study of working capital requirements, customer/supplier payment cycles, and net cash position.</li>
<li><strong>Debt and off-balance sheet commitments</strong>: identification of all financial debts, lease commitments, guarantees and ongoing litigation.</li>
<li><strong>Projections and business plan</strong>: validation of growth assumptions, forecast margins and financing plan consistency.</li>
<li><strong>Tax and social compliance</strong>: verification of tax filings, social obligations and audit risks.</li>
</ul>`,
      },
    ],
    services: {
      title: "Our M&A and due diligence services",
      items: [
        {
          name: "Due diligence preparation (Vendor DD)",
          description:
            "We prepare your company to receive due diligence: account clean-up, data room preparation, vendor financial report and anticipation of investor questions.",
        },
        {
          name: "Buy-side due diligence",
          description:
            "We conduct financial due diligence on behalf of acquirers: target account analysis, risk identification, price adjustments and investment recommendations.",
        },
        {
          name: "Fundraising support",
          description:
            "From financial model preparation to term sheet negotiation, we support founders at every stage of their fundraise. Over 100M EUR raised for our clients.",
        },
        {
          name: "Business valuation",
          description:
            "DCF, market multiples and comparable transactions methods to establish a robust and defensible valuation of your company.",
        },
        {
          name: "Post-acquisition integration (PMI)",
          description:
            "Support in post-acquisition financial integration: accounting system harmonization, reporting consolidation and synergy optimization.",
        },
      ],
    },
    process: {
      title: "Our advisory process",
      steps: [
        {
          step: "01",
          title: "Initial diagnostic",
          description:
            "Audit of your current financial situation, identification of risk areas and definition of the engagement scope.",
        },
        {
          step: "02",
          title: "Data room preparation",
          description:
            "Organization and verification of all financial, legal and operational documents. Virtual data room setup with secure access.",
        },
        {
          step: "03",
          title: "Due diligence execution",
          description:
            "In-depth analysis of financial data, Q&A sessions with stakeholders, and due diligence report drafting.",
        },
        {
          step: "04",
          title: "Negotiation and closing",
          description:
            "Support in price negotiations, post-DD adjustments and guidance through to final signing.",
        },
      ],
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          question: "How long does a financial due diligence take?",
          answer:
            "Duration varies by complexity: 2-4 weeks for a seed/Series A fundraise, 4-8 weeks for an SME acquisition, and up to 12 weeks for more complex transactions.",
        },
        {
          question: "What does due diligence advisory cost?",
          answer:
            "Our fees depend on the scope. For fundraising preparation, expect 5,000-15,000 EUR. For a full acquisition due diligence, fees range from 10,000-30,000 EUR.",
        },
        {
          question: "Can you intervene urgently on an ongoing due diligence?",
          answer:
            "Yes, we can mobilize a team within 48 hours for urgent situations such as an already-launched investor or acquirer due diligence.",
        },
        {
          question: "Do you work with companies outside France?",
          answer:
            "Yes, we support companies in France, Spain and internationally. Our team is trilingual (French, English, Spanish) and masters French (PCG), Spanish (PGC) and international (IFRS) accounting standards.",
        },
      ],
    },
    cta: {
      title: "Prepare your next transaction",
      description:
        "Whether you are preparing a fundraise, an acquisition or a divestiture, our experts are here to guide you. Book a free 30-minute consultation.",
      buttonText: "Book a consultation",
      buttonHref: "/en/contact",
    },
  },
  es: {
    meta: {
      title: "M&A y Due Diligence financiera - Asesoramiento experto | Iter Advisors",
      description:
        "Asesoramiento M&A y due diligence financiera para startups y PYMEs. Preparacion, ejecucion y negociacion. +100M EUR en transacciones acompanadas. Consulta gratuita.",
    },
    hero: {
      h1: "M&A y Due Diligence financiera: asegure sus operaciones estrategicas",
      intro:
        "Ya sea que prepare una ronda de financiacion, una adquisicion o una desinversion, la due diligence financiera es el paso critico que determina el exito de su operacion. Nuestros CFOs expertos le acompanan desde la preparacion hasta el cierre.",
    },
    sections: [
      {
        heading: "Por que la due diligence financiera es esencial",
        content: `<p>La due diligence financiera es el proceso de investigacion exhaustiva de las cuentas y la situacion financiera de una empresa en el contexto de una transaccion. Permite a los inversores y adquirentes <strong>verificar la realidad de las cifras presentadas</strong> e identificar los riesgos financieros potenciales.</p>
<p>En Iter Advisors, hemos acompanado mas de <strong>100 millones de euros en transacciones</strong> para startups y PYMEs en Francia y Espana.</p>`,
      },
      {
        heading: "Componentes de una due diligence financiera",
        content: `<ul>
<li><strong>Analisis de estados financieros</strong>: revision de balances, cuentas de resultados y estados de flujo de efectivo.</li>
<li><strong>Calidad de ingresos</strong>: distincion entre ingresos recurrentes y no recurrentes.</li>
<li><strong>Analisis de capital circulante y tesoreria</strong>: estudio de las necesidades de capital circulante.</li>
<li><strong>Deuda y compromisos fuera de balance</strong>: identificacion de todas las deudas financieras.</li>
<li><strong>Proyecciones y plan de negocio</strong>: validacion de hipotesis de crecimiento.</li>
<li><strong>Cumplimiento fiscal y social</strong>: verificacion de declaraciones fiscales.</li>
</ul>`,
      },
    ],
    services: {
      title: "Nuestros servicios de M&A y due diligence",
      items: [
        {
          name: "Preparacion para due diligence (Vendor DD)",
          description:
            "Preparamos su empresa para recibir una due diligence: limpieza de cuentas, preparacion del data room y anticipacion de preguntas.",
        },
        {
          name: "Due diligence del comprador (Buy-side DD)",
          description:
            "Realizamos la due diligence financiera en nombre de adquirentes: analisis de cuentas, identificacion de riesgos y recomendaciones.",
        },
        {
          name: "Acompanamiento en rondas de financiacion",
          description:
            "Desde la preparacion del modelo financiero hasta la negociacion del term sheet. Mas de 100M EUR levantados para nuestros clientes.",
        },
        {
          name: "Valoracion de empresas",
          description:
            "Metodos DCF, multiplos de mercado y transacciones comparables para establecer una valoracion robusta.",
        },
        {
          name: "Integracion post-adquisicion (PMI)",
          description:
            "Acompanamiento en la integracion financiera post-adquisicion: armonizacion de sistemas contables y consolidacion.",
        },
      ],
    },
    process: {
      title: "Nuestro proceso de acompanamiento",
      steps: [
        {
          step: "01",
          title: "Diagnostico inicial",
          description: "Auditoria de su situacion financiera actual e identificacion de areas de riesgo.",
        },
        {
          step: "02",
          title: "Preparacion del data room",
          description: "Organizacion y verificacion de todos los documentos financieros, juridicos y operativos.",
        },
        {
          step: "03",
          title: "Ejecucion de la due diligence",
          description: "Analisis en profundidad de los datos financieros y redaccion del informe.",
        },
        {
          step: "04",
          title: "Negociacion y cierre",
          description: "Apoyo en las negociaciones de precio y acompanamiento hasta la firma definitiva.",
        },
      ],
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          question: "Cuanto tiempo dura una due diligence financiera?",
          answer:
            "La duracion varia segun la complejidad: 2-4 semanas para una ronda seed/Serie A, 4-8 semanas para una adquisicion de PYME.",
        },
        {
          question: "Cual es el coste de un acompanamiento de due diligence?",
          answer:
            "Nuestros honorarios dependen del alcance. Para preparacion de rondas, entre 5.000 y 15.000 EUR. Para due diligence completa, entre 10.000 y 30.000 EUR.",
        },
        {
          question: "Pueden intervenir de urgencia?",
          answer: "Si, podemos movilizar un equipo en 48 horas para situaciones urgentes.",
        },
        {
          question: "Trabajan con empresas fuera de Francia?",
          answer:
            "Si, acompanamos empresas en Francia, Espana e internacionalmente. Nuestro equipo es trilingue (frances, ingles, espanol).",
        },
      ],
    },
    cta: {
      title: "Prepare su proxima operacion",
      description:
        "Ya sea que prepare una ronda de financiacion, una adquisicion o una desinversion, nuestros expertos estan aqui para acompanarle. Reserve una consulta gratuita de 30 minutos.",
      buttonText: "Reservar una consulta",
      buttonHref: "/es/contact",
    },
  },
};

export function getMaDueDiligenceContent(locale: Locale): MaDueDiligenceContent {
  return content[locale];
}
