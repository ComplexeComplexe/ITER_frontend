import partnerSummaries from "@/lib/content/partner-summaries.json";
import type { StrapiTeamMember } from "@/lib/static-content";
import type { Locale } from "@/lib/i18n";

interface FallbackMemberData {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  roles: Record<Locale, string>;
  /** Optional locale-specific label used exclusively in the page H1.
   *  Falls back to `roles[locale]` when absent. */
  h1Roles?: Record<Locale, string>;
  slug: string;
  photo: { url: string } | null;
  linkedIn: string;
  order: number;
  showInHero: boolean;
  /** Short bio used in schema.org Person.description and the meta description (≤ 160 chars recommended).
   *  Only populated for founding partners; other members fall back to
   *  the team listing on /a-propos. */
  bio?: Record<Locale, string>;
  /** Extended bio paragraphs rendered on the author page for SEO word-count depth (SEO-15).
   *  Separate from `bio` so schema.org description stays concise. */
  bioExtended?: Record<Locale, string>;
}

// Helper function to convert name to slug format
function nameToSlug(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase().replace(/[éèê]/g, 'e')}-${lastName.toLowerCase().replace(/[éèê]/g, 'e')}`;
}

/** Keep listing, metadata and profile copy aligned with the same approved content. */
function partnerMemberData(slug: string): Pick<FallbackMemberData, "roles" | "h1Roles" | "bio" | "bioExtended"> {
  const summary = (partnerSummaries as Record<string, typeof partnerSummaries["guillaume-rostand"]>)[slug];
  const { fr, en, es } = summary ?? {};
  if (!fr || !en || !es) throw new Error(`Missing partner profile: ${slug}`);
  const localize = (select: (profile: typeof partnerSummaries["guillaume-rostand"]["fr"]) => string): Record<Locale, string> => ({
    fr: select(fr), en: select(en), es: select(es),
  });
  return {
    roles: localize(profile => profile.role),
    h1Roles: localize(profile => profile.metaRole),
    bio: localize(profile => profile.bio),
    bioExtended: localize(profile => profile.bioExtended),
  };
}

const fallbackData: FallbackMemberData[] = [
  // === Direction / Partners ===
  {
    id: 1,
    documentId: "sebastien-doat",
    firstName: "Sébastien",
    lastName: "Doat",
    ...partnerMemberData("sebastien-doat"),
    slug: "sebastien-doat",
    photo: { url: "/images/team/sebastien-doat.webp" },
    linkedIn: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
    order: 1,
    showInHero: true,
  },
  {
    id: 2,
    documentId: "benjamin-ziza",
    firstName: "Benjamin",
    lastName: "Ziza",
    ...partnerMemberData("benjamin-ziza"),
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.webp" },
    linkedIn: "https://www.linkedin.com/in/benjaminziza/",
    order: 2,
    showInHero: true,
  },
  {
    id: 3,
    documentId: "guillaume-rostand",
    firstName: "Guillaume",
    lastName: "Rostand",
    ...partnerMemberData("guillaume-rostand"),
    slug: "guillaume-rostand",
    photo: { url: "/images/team/guillaume-rostand.webp" },
    linkedIn: "https://www.linkedin.com/in/rostand/",
    order: 3,
    showInHero: true,
  },
  {
    id: 4,
    documentId: "florent-greth",
    firstName: "Florent",
    lastName: "Greth",
    ...partnerMemberData("florent-greth"),
    slug: "florent-greth",
    photo: { url: "/images/team/florent-greth.webp" },
    linkedIn: "https://www.linkedin.com/in/florent-greth-cfo-pennylane/?locale=en",
    order: 4,
    showInHero: true,
  },
  {
    id: 5,
    documentId: "borith-biv",
    firstName: "Borith",
    lastName: "Biv",
    roles: {
      fr: "Partner Capital Humain",
      en: "Human Capital Partner",
      es: "Socio de Capital Humano"
    },
    h1Roles: {
      fr: "Partner Capital Humain & DRH externalisé",
      en: "Human Capital Partner and external HR director",
      es: "Socio de Capital Humano y dirección de RRHH externa",
    },
    slug: "borith-biv",
    photo: { url: "/images/team/borith-biv.webp" },
    linkedIn: "https://www.linkedin.com/in/borith-biv-linkb/",
    order: 5,
    showInHero: false,
    bio: {
      fr: "Borith est Partner Capital Humain chez Iter Advisors. Il accompagne les PME et startups sur la structuration RH, le recrutement des profils financiers et la gestion des équipes en croissance.",
      en: "Borith is Human Capital Partner at Iter Advisors. He supports SMEs and startups with HR organisation, recruitment of finance professionals and management of growing teams.",
      es: "Borith es socio de Capital Humano en Iter Advisors. Acompaña a pymes y startups en la estructuración de RRHH, la contratación de perfiles financieros y la gestión de equipos en crecimiento.",
    },
    bioExtended: {
      fr: "La mission commence par la compréhension de votre organisation, des ressources internes et des sujets à traiter. Les responsabilités, le rythme et les intervenants nécessaires sont définis au cadrage. Les prestations de paie et les sujets juridiques spécialisés doivent être identifiés séparément. Le parcours détaillé, les références pertinentes et les modalités d’intervention peuvent être précisés lors du premier échange.",
      en: "The engagement starts with understanding your organisation, internal resources and matters to address. Responsibilities, schedule and required professionals are agreed at scoping. Payroll services and specialist legal matters must be identified separately. Detailed experience, relevant references and working arrangements can be discussed in the first conversation.",
      es: "La misión empieza por comprender tu organización, los recursos internos y los asuntos que tratar. Las responsabilidades, dedicación y profesionales necesarios se definen al delimitar el alcance. Las prestaciones de nóminas y los asuntos jurídicos especializados se identifican por separado. La experiencia detallada, referencias pertinentes y condiciones de intervención pueden precisarse en la primera conversación.",
    },
  },

  // === Finance - CFO ===
  {
    id: 6,
    documentId: "deisy-arias-ramirez",
    firstName: "Deisy",
    lastName: "Arias Ramirez",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "deisy-arias-ramirez",
    photo: { url: "/images/team/deisy-arias-ramirez.webp" },
    linkedIn: "https://www.linkedin.com/in/deisyarias/",
    order: 6,
    showInHero: false,
    bio: {
      fr: "Deisy est CFO chez Iter Advisors. Elle accompagne des startups et PME sur le pilotage financier, la gestion de trésorerie et la préparation aux levées de fonds.",
      en: "Deisy is a CFO at Iter Advisors, supporting startups and SMEs on financial management, cash flow and fundraising preparation.",
      es: "Deisy es CFO en Iter Advisors y acompaña a startups y pymes en control financiero, gestión de tesorería y preparación para rondas de inversión.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Deisy intervient auprès de startups et PME en croissance pour structurer leur pilotage financier et les préparer aux étapes clés de leur développement. Ses missions couvrent la mise en place de tableaux de bord financiers, la construction de prévisionnels de trésorerie, l'analyse des marges et la préparation des dossiers d'investissement. Elle est spécialisée dans les secteurs SaaS et tech, où elle accompagne les fondateurs sur les métriques financières propres à ces modèles (ARR, CAC, LTV, unit economics). Deisy intervient également sur la structuration comptable et l'optimisation des process financiers, en s'appuyant sur les meilleurs outils du marché. Son approche pragmatique et orientée résultats lui permet d'être rapidement opérationnelle et d'apporter de la valeur dès les premières semaines de mission. Elle parle couramment français, espagnol et anglais.",
      en: "At Iter Advisors, Deisy works with growth-stage startups and SMEs to structure their financial management and prepare them for key milestones. Her engagements cover financial dashboard setup, cash flow forecasting, margin analysis and investor file preparation. She specialises in SaaS and tech sectors, guiding founders on financial metrics specific to these models (ARR, CAC, LTV, unit economics). Deisy also works on accounting structuring and financial process optimisation, leveraging best-in-class tools. Her pragmatic, results-oriented approach allows her to become operational quickly and deliver value from the first weeks of an engagement. She speaks fluent French, Spanish and English.",
      es: "En Iter Advisors, Deisy trabaja con startups y pymes en crecimiento para estructurar su control financiero y prepararlas para hitos clave. Sus misiones incluyen implementación de cuadros de mando financieros, previsiones de tesorería, análisis de márgenes y preparación de documentación para inversores. Está especializada en los sectores SaaS y tech, donde guía a los fundadores en las métricas financieras propias de estos modelos (ARR, CAC, LTV, unit economics). Habla con fluidez francés, español e inglés.",
    },
  },
  {
    id: 7,
    documentId: "sebastien-preel",
    firstName: "Sébastien",
    lastName: "Preel",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "sebastien-preel",
    photo: { url: "/images/team/sebastien-preel.webp" },
    linkedIn: "https://www.linkedin.com/in/spreel/",
    order: 7,
    showInHero: false,
    bio: {
      fr: "Sébastien est CFO chez Iter Advisors. Il accompagne PME et ETI sur la structuration financière, le contrôle de gestion et les opérations de M&A.",
      en: "Sébastien is a CFO at Iter Advisors, supporting SMEs and mid-caps on financial structuring, management control and M&A transactions.",
      es: "Sébastien es CFO en Iter Advisors y acompaña a pymes y medianas empresas en estructuración financiera, control de gestión y operaciones de M&A.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Sébastien intervient auprès de PME et ETI pour structurer leur direction financière, optimiser leur contrôle de gestion et les accompagner dans leurs opérations de croissance externe. Ses missions couvrent la mise en place de reporting de gestion, la construction de modèles financiers pour des opérations de M&A, l'analyse de la rentabilité par activité et la préparation des comités de direction. Il est spécialisé dans les secteurs industriels, de services et de distribution, où il apporte une vision financière structurée au service des décisions opérationnelles. Sébastien intervient également sur les due diligences financières (vendeur ou acquéreur), la valorisation d'entreprises et la négociation avec les partenaires financiers. Son expérience en finance d'entreprise lui permet d'identifier rapidement les leviers de performance et de les traduire en actions concrètes pour les dirigeants. Il parle couramment français et anglais.",
      en: "At Iter Advisors, Sébastien works with SMEs and mid-caps to structure their finance function, optimise management control and support their external growth transactions. His engagements cover management reporting setup, financial model building for M&A transactions, profitability analysis by business line and board preparation. He specialises in industrial, services and distribution sectors, bringing structured financial vision to operational decisions. Sébastien also works on financial due diligence (sell-side and buy-side), business valuation and negotiations with financial partners. His corporate finance experience allows him to quickly identify performance levers and translate them into concrete actions for management. He speaks fluent French and English.",
      es: "En Iter Advisors, Sébastien trabaja con pymes y medianas empresas para estructurar su dirección financiera, optimizar el control de gestión y acompañarlas en sus operaciones de crecimiento externo. Sus misiones cubren la implementación de reporting de gestión, la construcción de modelos financieros para operaciones de M&A, el análisis de rentabilidad por línea de negocio y la preparación de comités de dirección. Está especializado en los sectores industrial, de servicios y distribución. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 8,
    documentId: "tom-jaufre",
    firstName: "Tom",
    lastName: "Jaufre",
    roles: {
      fr: "CFO & M&A",
      en: "CFO & M&A",
      es: "CFO y M&A"
    },
    slug: "tom-jaufre",
    photo: { url: "/images/team/tom-jaufre.webp" },
    linkedIn: "https://www.linkedin.com/in/tom-jaufre-65904175/",
    order: 8,
    showInHero: false,
    bio: {
      fr: "Tom est CFO & M&A chez Iter Advisors. Spécialiste des opérations de cession-acquisition, il accompagne PME et scale-ups sur la structuration financière et les transactions de croissance externe.",
      en: "Tom is a CFO & M&A specialist at Iter Advisors, supporting SMEs and scale-ups on financial structuring and external growth transactions.",
      es: "Tom es CFO y M&A en Iter Advisors. Especialista en operaciones de compraventa, acompaña a pymes y scale-ups en estructuración financiera y transacciones de crecimiento externo.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Tom est le spécialiste des opérations M&A. Il intervient sur l'ensemble du cycle d'une transaction : de l'analyse stratégique initiale à la clôture finale, en passant par la due diligence financière, la valorisation et la négociation des termes. Ses missions couvrent aussi bien le conseil aux cédants (structuration de la cession, préparation de la data room, accompagnement des négociations) que l'accompagnement des acquéreurs (due diligence buy-side, analyse des synergies, modélisation du business plan post-acquisition). Au-delà des opérations M&A, Tom assure des missions de CFO externalisé pour des PME en croissance : reporting de gestion, pilotage de trésorerie, préparation aux levées de fonds et structuration des process financiers. Il est spécialisé dans les secteurs tech, services et industrie légère. Son approche combine rigueur financière et sens des affaires, avec une capacité à comprendre rapidement les enjeux spécifiques de chaque entreprise. Tom parle couramment français et anglais.",
      en: "At Iter Advisors, Tom is the M&A specialist. He is involved throughout the transaction cycle: from initial strategic analysis to final closing, through financial due diligence, valuation and term negotiation. His engagements cover vendor advisory (sale structuring, data room preparation, negotiation support) and buyer advisory (buy-side due diligence, synergy analysis, post-acquisition business plan modelling). Beyond M&A transactions, Tom provides fractional CFO services to growth-stage SMEs: management reporting, cash flow management, fundraising preparation and financial process structuring. He specialises in tech, services and light manufacturing sectors. His approach combines financial rigour with business acumen, with an ability to quickly grasp each company's specific challenges. Tom speaks fluent French and English.",
      es: "En Iter Advisors, Tom es el especialista en M&A. Interviene en todo el ciclo de una transacción: desde el análisis estratégico inicial hasta el cierre final, pasando por la due diligence financiera, la valoración y la negociación de términos. Sus misiones cubren tanto el asesoramiento al vendedor como al comprador. Más allá de las operaciones de M&A, Tom presta servicios de CFO externalizado para pymes en crecimiento: reporting de gestión, gestión de tesorería y preparación de rondas de financiación. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 9,
    documentId: "jessica-barnicaud",
    firstName: "Jessica",
    lastName: "Barnicaud",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "jessica-barnicaud",
    photo: { url: "/images/team/jessica-barnicaud.webp" },
    linkedIn: "https://www.linkedin.com/in/jessica-barnicaud/",
    order: 9,
    showInHero: false,
    bio: {
      fr: "Jessica est CFO chez Iter Advisors. Elle accompagne startups et PME sur le pilotage financier, la structuration des process comptables et la préparation aux levées de fonds.",
      en: "Jessica is a CFO at Iter Advisors, supporting startups and SMEs on financial management, accounting process structuring and fundraising preparation.",
      es: "Jessica es CFO en Iter Advisors y acompaña a startups y pymes en control financiero, estructuración de procesos contables y preparación para rondas de inversión.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Jessica accompagne startups et PME dans la structuration de leur fonction financière et la mise en place d'outils de pilotage adaptés à leur stade de développement. Ses missions couvrent la mise en place du reporting financier mensuel, la construction de prévisionnels de trésorerie, l'analyse des marges et des coûts, la sélection et l'implémentation d'outils comptables (Pennylane, QuickBooks, Xero) et la préparation des dossiers investisseurs. Elle est spécialisée dans les entreprises SaaS et tech à forte croissance, où elle aide les fondateurs à maîtriser leurs métriques financières et à construire une direction financière solide avant d'accélérer. Jessica travaille également sur la mise en conformité fiscale et sociale, la coordination avec les experts-comptables et la préparation aux due diligences. Son approche pédagogique et opérationnelle lui permet d'accompagner aussi bien des fondateurs non financiers que des équipes finance en cours de structuration. Elle parle couramment français et anglais.",
      en: "At Iter Advisors, Jessica supports startups and SMEs in structuring their finance function and implementing management tools suited to their stage of development. Her engagements cover monthly financial reporting, cash flow forecasting, margin and cost analysis, selection and implementation of accounting tools (Pennylane, QuickBooks, Xero) and investor file preparation. She specialises in high-growth SaaS and tech companies, where she helps founders master their financial metrics and build a solid finance function before accelerating. Jessica also works on tax and payroll compliance, coordination with external accountants and due diligence preparation. Her educational and operational approach allows her to work equally well with non-financial founders and finance teams in the process of structuring. She speaks fluent French and English.",
      es: "En Iter Advisors, Jessica acompaña a startups y pymes en la estructuración de su función financiera y la implementación de herramientas de control adaptadas a su etapa de desarrollo. Sus misiones cubren reporting financiero mensual, previsiones de tesorería, análisis de márgenes y costes, selección e implementación de herramientas contables y preparación de documentación para inversores. Está especializada en empresas SaaS y tech de alto crecimiento. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 10,
    documentId: "benjamin-carlot",
    firstName: "Benjamin",
    lastName: "Carlot",
    roles: {
      fr: "Head of Finance & Controlling",
      en: "Head of Finance & Controlling",
      es: "Jefe de Finanzas y Control"
    },
    slug: "benjamin-carlot",
    photo: { url: "/images/team/benjamin-carlot.webp" },
    linkedIn: "https://www.linkedin.com/in/benjamin-carlot-fractional-cfo-43303120/",
    order: 10,
    showInHero: false,
    bio: {
      fr: "Benjamin est Head of Finance & Controlling chez Iter Advisors. Il accompagne PME et scale-ups sur le contrôle de gestion, l'analyse de performance et la structuration des process finance.",
      en: "Benjamin is Head of Finance & Controlling at Iter Advisors, supporting SMEs and scale-ups on management control, performance analysis and finance process structuring.",
      es: "Benjamin es Jefe de Finanzas y Control en Iter Advisors y acompaña a pymes y scale-ups en control de gestión, análisis de rendimiento y estructuración de procesos financieros.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Benjamin pilote les missions de contrôle de gestion externalisé, accompagnant des PME et scale-ups dans la mise en place de systèmes de pilotage de la performance adaptés à leurs enjeux. Ses missions couvrent la construction de plans comptables analytiques, la mise en place d'outils de Business Intelligence (Power BI, Metabase, Google Looker), le suivi des KPIs par activité et la production de reportings mensuels et trimestriels à destination des équipes dirigeantes et des investisseurs. Benjamin est spécialisé dans les entreprises multi-entités et multi-pays, où la consolidation des données financières et la comparabilité des performances constituent un enjeu central. Il travaille également sur la structuration des processus budgétaires (budget annuel, forecasts glissants, analyse des écarts) et la mise en conformité des process de clôture. Son approche est systématique et orientée données : il construit des architectures financières qui permettent une prise de décision rapide et éclairée. Benjamin est certifié CFO à temps partagé et intervient principalement en France et en Belgique. Il parle couramment français et anglais.",
      en: "At Iter Advisors, Benjamin leads outsourced management control engagements, supporting SMEs and scale-ups in building performance management systems tailored to their needs. His work covers analytical chart of accounts structuring, Business Intelligence tool implementation (Power BI, Metabase, Google Looker), KPI tracking by business line and production of monthly and quarterly reports for management teams and investors. Benjamin specialises in multi-entity and multi-country companies, where financial data consolidation and performance comparability are central challenges. He also works on budgeting process structuring (annual budgets, rolling forecasts, variance analysis) and closing process optimisation. His approach is systematic and data-driven: he builds financial architectures that enable fast, informed decision-making. Benjamin holds a fractional CFO certification and works primarily in France and Belgium. He speaks fluent French and English.",
      es: "En Iter Advisors, Benjamin lidera los proyectos de control de gestión externalizado, apoyando a pymes y scale-ups en la construcción de sistemas de gestión del rendimiento. Sus misiones cubren estructuración de planes de cuentas analíticos, implementación de herramientas de Business Intelligence (Power BI, Metabase), seguimiento de KPIs y producción de informes mensuales y trimestrales. Está especializado en empresas multi-entidad y multi-país. Habla con fluidez francés e inglés.",
    },
  },
  {
    id: 11,
    documentId: "christophe-hoarau",
    firstName: "Christophe",
    lastName: "Hoarau",
    roles: {
      fr: "CFO & Data Officer",
      en: "CFO & Data Officer",
      es: "CFO y Oficial de Datos"
    },
    slug: "christophe-hoarau",
    photo: { url: "/images/team/christophe-hoarau.webp" },
    linkedIn: "https://www.linkedin.com/in/christophe-hoarau-2bb8b8ab/",
    order: 11,
    showInHero: false,
    bio: {
      fr: "Christophe est CFO & Data Officer chez Iter Advisors. Il combine expertise financière et maîtrise de la data pour accompagner PME et scale-ups sur le pilotage analytique et la Business Intelligence.",
      en: "Christophe is CFO & Data Officer at Iter Advisors, combining financial expertise and data mastery to support SMEs and scale-ups on analytical management and Business Intelligence.",
      es: "Christophe es CFO y Data Officer en Iter Advisors. Combina experiencia financiera y dominio de los datos para acompañar a pymes y scale-ups en el pilotaje analítico y la Business Intelligence.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Christophe incarne la convergence entre la finance et la data. Il accompagne PME et scale-ups dans la mise en place de systèmes de pilotage financier modernes, combinant les outils CFO traditionnels avec des solutions de Business Intelligence et d'automatisation de la donnée. Ses missions couvrent la construction d'architectures de données financières, l'implémentation de dashboards temps réel (Power BI, Tableau, Metabase), la mise en place de pipelines de données automatisés et la définition d'indicateurs financiers et opérationnels clés. Christophe intervient également comme CFO externalisé classique, assurant la trésorerie, le reporting de gestion et la préparation aux levées de fonds — mais avec une dimension data systématiquement intégrée qui accélère la prise de décision. Il est spécialisé dans les entreprises tech et marketplace, où la volumétrie des données transactionnelles est importante et où la réconciliation entre les métriques produit et les données financières constitue un enjeu central. Son approche : construire un système de mesure de la performance qui réconcilie la vision financière, la vision opérationnelle et la vision produit dans un tableau de bord unique. Christophe parle couramment français et anglais.",
      en: "At Iter Advisors, Christophe embodies the convergence of finance and data. He supports SMEs and scale-ups in building modern financial management systems, combining traditional CFO tools with Business Intelligence solutions and data automation. His work covers financial data architecture design, real-time dashboard implementation (Power BI, Tableau, Metabase), automated data pipeline setup and definition of key financial and operational indicators. Christophe also acts as a traditional fractional CFO, handling cash management, management reporting and fundraising preparation — but with a data dimension systematically integrated to accelerate decision-making. He specialises in tech and marketplace companies, where transactional data volumes are significant and reconciling product metrics with financial data is a central challenge. His approach: build a performance measurement system that reconciles the financial, operational and product view in a single dashboard. Christophe speaks fluent French and English.",
      es: "En Iter Advisors, Christophe encarna la convergencia entre las finanzas y los datos. Apoya a pymes y scale-ups en la construcción de sistemas modernos de gestión financiera, combinando herramientas CFO tradicionales con soluciones de Business Intelligence y automatización de datos. Sus misiones cubren diseño de arquitecturas de datos financieros, implementación de dashboards en tiempo real (Power BI, Tableau, Metabase) y definición de indicadores financieros y operativos clave. También actúa como CFO externalizado clásico, gestionando tesorería, reporting y preparación de rondas de financiación. Habla con fluidez francés e inglés.",
    },
  },

  // === Analysts ===
  {
    id: 12,
    documentId: "ornella-salgado",
    firstName: "Ornella",
    lastName: "Salgado",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "ornella-salgado",
    photo: { url: "/images/team/ornella-salgado.webp" },
    linkedIn: "https://www.linkedin.com/in/ornellaslgd/",
    order: 12,
    showInHero: false,
  },
  {
    id: 13,
    documentId: "pauline-mathieu",
    firstName: "Pauline",
    lastName: "Mathieu",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "pauline-mathieu",
    photo: { url: "/images/team/pauline-mathieu.webp" },
    linkedIn: "https://www.linkedin.com/in/pauline-mathieu-082488160/",
    order: 13,
    showInHero: false,
  },
  {
    id: 14,
    documentId: "alice-fumeron",
    firstName: "Alice",
    lastName: "Fumeron",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "alice-fumeron",
    photo: { url: "/images/team/alice-fumeron.webp" },
    linkedIn: "https://www.linkedin.com/in/alicefumeron/",
    order: 14,
    showInHero: false,
  },
  {
    id: 15,
    documentId: "carole-casse",
    firstName: "Carole",
    lastName: "Casse",
    roles: {
      fr: "Financial Analyst",
      en: "Financial Analyst",
      es: "Analista Financiero"
    },
    slug: "carole-casse",
    photo: { url: "/images/team/carole-casse.webp" },
    linkedIn: "https://www.linkedin.com/in/carole-casse/",
    order: 15,
    showInHero: false,
  },
  {
    id: 16,
    documentId: "andress-ayme",
    firstName: "Andress",
    lastName: "Ayme",
    roles: {
      fr: "Intern Financial Analyst",
      en: "Intern Financial Analyst",
      es: "Analista Financiero Interno"
    },
    slug: "andress-ayme",
    photo: { url: "/images/team/andress-ayme.webp" },
    linkedIn: "https://www.linkedin.com/in/andress-ayme-089904276/",
    order: 16,
    showInHero: false,
  },
  // Membership and CFO roles confirmed by the site owner on 2026-10-03.
  // Career summary: public LinkedIn profiles and Sébastien's arrival announcement.
  {
    id: 17,
    documentId: "hugo-lepresle",
    firstName: "Hugo",
    lastName: "Lepresle",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    h1Roles: { fr: "DAF externalisé", en: "Fractional CFO", es: "CFO externo" },
    slug: "hugo-lepresle",
    photo: { url: "/images/team/hugo-lepresle.webp" },
    linkedIn: "https://www.linkedin.com/in/hugo-lepresle-84ab7a90/",
    order: 17,
    showInHero: false,
    bio: {
      fr: "Hugo Lepresle est CFO chez Iter Advisors. Son parcours comprend la direction financière de Pepette et le contrôle de gestion chez Michel et Augustin.",
      en: "Hugo Lepresle is a CFO at Iter Advisors. His background includes finance leadership at Pepette and management control at Michel et Augustin.",
      es: "Hugo Lepresle es CFO en Iter Advisors. Su trayectoria incluye la dirección financiera de Pepette y el control de gestión en Michel et Augustin.",
    },
  },
  {
    id: 18,
    documentId: "gonzalo-serratosa-de-caralt",
    firstName: "Gonzalo",
    lastName: "Serratosa de Caralt",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    h1Roles: { fr: "DAF externalisé", en: "Fractional CFO", es: "CFO externo" },
    slug: "gonzalo-serratosa-de-caralt",
    photo: { url: "/images/team/gonzalo-serratosa-de-caralt.webp" },
    linkedIn: "https://www.linkedin.com/in/gonzalo-serratosa-de-caralt-585178157/",
    order: 18,
    showInHero: false,
    bio: {
      fr: "Gonzalo Serratosa de Caralt est CFO chez Iter Advisors. Il a travaillé en audit chez EY puis comme consultant financier auprès de startups.",
      en: "Gonzalo Serratosa de Caralt is a CFO at Iter Advisors. He worked in audit at EY before becoming a financial consultant for startups.",
      es: "Gonzalo Serratosa de Caralt es CFO en Iter Advisors. Trabajó en auditoría en EY antes de ejercer como consultor financiero para startups.",
    },
  },
];

export function getTeamMembers(locale: Locale): StrapiTeamMember[] {
  return fallbackData.map((member) => ({
    ...member,
    title: `${member.firstName} ${member.lastName}`,
    role: member.roles[locale],
  })) as StrapiTeamMember[];
}

// Alias for backward compatibility
export const getFallbackTeamMembers = getTeamMembers;

/**
 * Locate a single team member by slug + return them with the locale's
 * role + bio resolved. Returns `null` if the slug is unknown OR if the
 * member has no bio for this locale (no point rendering an empty
 * author page).
 */
export function getTeamMemberBySlug(
  slug: string,
  locale: Locale,
): (StrapiTeamMember & { bio: string; h1Role?: string; bioExtended?: string }) | null {
  const member = fallbackData.find((m) => m.slug === slug);
  if (!member || !member.bio?.[locale]) return null;
  return {
    ...member,
    title: `${member.firstName} ${member.lastName}`,
    role: member.roles[locale],
    bio: member.bio[locale],
    h1Role: member.h1Roles?.[locale],
    bioExtended: member.bioExtended?.[locale],
  } as StrapiTeamMember & { bio: string; h1Role?: string; bioExtended?: string };
}

/**
 * Slugs that have a dedicated author page (i.e. have a bio in every
 * locale). Used by `generateStaticParams` and the sitemap.
 */
/**
 * Title et description d'une fiche de membre.
 *
 * SEO-AUD-0824 §8 (2026-08-24) — les onze fiches partageaient leur title entre
 * FR, EN et ES : il ne portait que le nom, identique par nature d'une langue à
 * l'autre. Le rôle, lui, est traduit — c'est donc lui qui distingue les trois
 * versions, et accessoirement ce qui rend le title informatif.
 *
 * SEO-REP §7 (2026-08-15) avait retiré ce rôle parce qu'il poussait les titles
 * à 63-71 caractères. On le remet, mais en cédant du terrain par étapes :
 * d'abord la marque, puis la partie du rôle qui suit le séparateur. Le nom
 * seul reste le dernier recours, jamais le premier choix.
 */
export function authorPageTitle(fullName: string, role: string): string {
  const suffixe = " | Iter Advisors";
  const court = role.split(/\s[-–&]\s|\s(?:y|e)\s/)[0].trim();
  const candidats = [
    `${fullName} — ${role}${suffixe}`,
    `${fullName} — ${role}`,
    `${fullName} — ${court}${suffixe}`,
    `${fullName} — ${court}`,
  ];
  return candidats.find((c) => c.length <= 60) ?? `${fullName}${suffixe}`;
}

/**
 * Description d'une fiche de membre, coupée sur une frontière de mot.
 *
 * `bio.slice(0, 160)` tranchait au caractère près, donc parfois au milieu d'un
 * mot — ce que le lecteur voit dans les résultats de recherche.
 */
export function authorPageDescription(bio: string): string {
  if (bio.length <= 160) return bio;
  const coupe = bio.slice(0, 157);
  const dernierEspace = coupe.lastIndexOf(" ");
  return `${coupe.slice(0, dernierEspace > 100 ? dernierEspace : 157).replace(/[,;:.\s]+$/, "")}…`;
}

/**
 * URL de la fiche d'un membre à partir de son nom complet, ou undefined si
 * aucune fiche publiée ne correspond.
 *
 * SEO-06 (2026-08-31) — dix articles passaient un auteur sans `url` : le
 * schéma Article le déclarait alors en Organization. Le nom suffit pourtant à
 * retrouver la fiche quand elle existe.
 */
export function resolveAuthorUrl(fullName: string): string | undefined {
  const membre = fallbackData.find(
    (m) => `${m.firstName} ${m.lastName}`.trim().toLowerCase() === fullName.trim().toLowerCase(),
  );
  if (!membre) return undefined;
  return getAuthorSlugs().includes(membre.slug) ? `/a-propos/${membre.slug}` : undefined;
}

export function getAuthorSlugs(): string[] {
  return fallbackData
    .filter((m) => m.bio && m.bio.fr && m.bio.en && m.bio.es)
    .map((m) => m.slug);
}
