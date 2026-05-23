import type { StrapiTeamMember } from "@/lib/strapi";
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

const fallbackData: FallbackMemberData[] = [
  // === Direction / Partners ===
  {
    id: 1,
    documentId: "sebastien-doat",
    firstName: "Sébastien",
    lastName: "Doat",
    roles: {
      fr: "Associé fondateur - CFO & Investisseur",
      en: "Founding Partner - CFO & Investor",
      es: "Socio fundador - CFO e Inversor"
    },
    h1Roles: {
      fr: "Associé fondateur, DAF externalisé",
      en: "Founding Partner, Fractional CFO",
      es: "Socio fundador, CFO Externalizado",
    },
    slug: "sebastien-doat",
    photo: { url: "/images/team/sebastien-doat.webp" },
    linkedIn: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
    order: 1,
    showInHero: true,
    bio: {
      fr: "Sébastien a passé 15 ans à structurer la finance de startups et de scale-ups en France et en Espagne. Avant de cofonder Iter Advisors, il a tenu le poste de CFO pour plusieurs entreprises en hypercroissance, accompagnant plus de 30 levées de fonds totalisant plus de 150 M€. Son terrain de jeu : la trésorerie, la modélisation financière et la négociation avec les investisseurs.",
      en: "Sébastien has spent 15 years structuring finance for startups and scale-ups across France and Spain. Before co-founding Iter Advisors, he held CFO roles at several hyper-growth companies, supporting 30+ fundraises totalling over €150M. His focus areas: cash management, financial modelling, and investor negotiations.",
      es: "Sébastien ha pasado 15 años estructurando las finanzas de startups y scale-ups en Francia y España. Antes de cofundar Iter Advisors, ocupó el puesto de CFO en varias empresas de hipercrecimiento, acompañando más de 30 rondas de financiación por un total de más de 150 M€. Sus áreas de enfoque: tesorería, modelización financiera y negociación con inversores.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Sébastien dirige le bureau de Paris et travaille directement avec les fondateurs à chaque étape de leur parcours financier — de la mise en place du premier tableau de bord KPI à la préparation des board decks de Série B et à la gestion des négociations avec les investisseurs. Il est spécialisé dans la gestion de trésorerie, les prévisions roulantes à 13 semaines, la modélisation financière et le conseil en M&A. Son portefeuille clients couvre des entreprises SaaS, fintech, proptech et deep tech opérant en France, en Espagne et en Belgique. Il conseille sur l'optimisation du besoin en fonds de roulement, la sélection des outils ERP et financiers, la préparation à la due diligence et l'intégration financière post-acquisition. Les transactions accompagnées vont de rounds seed à 2 M€ jusqu'à des levées de croissance supérieures à 40 M€. Sébastien contribue régulièrement au journal d'Iter Advisors sur les thèmes du DAF externalisé, des benchmarks de cash burn et de la préparation aux levées de fonds.",
      en: "At Iter Advisors, Sébastien leads the Paris office and works directly with founders at every stage of their financial journey — from setting up the first KPI dashboard and cash flow model to preparing Series B board presentations and managing investor negotiations. He specialises in 13-week rolling cash forecasts, financial modelling, M&A advisory, and fundraising preparation. His client portfolio spans SaaS, fintech, proptech, and deep tech companies operating across France, Spain, and Belgium, covering transactions from €2M seed rounds to €40M+ growth rounds and two secondary exits. He advises on working capital optimisation, ERP and tool selection, due diligence readiness, and post-acquisition financial integration. Sébastien contributes regularly to the Iter Advisors journal on fractional CFO pricing, cash burn benchmarks, and fundraising strategy. He holds a Master's in Finance and speaks French, Spanish, and English.",
      es: "En Iter Advisors, lidera la oficina de París y trabaja directamente con fundadores en todas las etapas de su recorrido financiero — desde la creación del primer cuadro de mando KPI hasta la preparación de board decks de Serie B. Asesora sobre previsión de tesorería a 13 semanas, optimización del capital circulante, selección de herramientas financieras y preparación de due diligence. Su cartera de clientes abarca empresas SaaS, fintech, proptech y deep tech en Francia, España y Bélgica, con operaciones desde rondas seed de 2 M€ hasta levantamientos de crecimiento superiores a 40 M€. Sébastien contribuye regularmente al diario de Iter Advisors sobre precios de CFO externalizado, benchmarks de cash burn y estrategia de captación de fondos. Habla francés, español e inglés con fluidez.",
    },
  },
  {
    id: 2,
    documentId: "benjamin-ziza",
    firstName: "Benjamin",
    lastName: "Ziza",
    roles: {
      fr: "Associé fondateur - CFO & Investisseur",
      en: "Founding Partner - CFO & Investor",
      es: "Socio fundador - CFO e Inversor"
    },
    h1Roles: {
      fr: "Associé fondateur, DAF externalisé",
      en: "Founding Partner, Fractional CFO",
      es: "Socio fundador, CFO Externalizado",
    },
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.webp" },
    linkedIn: "https://www.linkedin.com/in/benjamin-ziza/",
    order: 2,
    showInHero: true,
    bio: {
      fr: "Benjamin a structuré la direction financière de startups SaaS et de PME industrielles pendant 12 ans avant de cofonder Iter Advisors. Il pilote aujourd'hui le bureau de Barcelone et accompagne une dizaine de fondateurs par an sur leur stratégie financière, leur fiscalité internationale (notamment la loi Beckham) et la préparation de leurs levées de fonds. Auteur principal du journal d'Iter Advisors, il écrit sur les sujets qu'il pratique au quotidien : trésorerie, KPIs SaaS, externalisation comptable et fiscalité France-Espagne.",
      en: "Benjamin spent 12 years structuring finance for SaaS startups and industrial SMEs before co-founding Iter Advisors. He now runs the Barcelona office and supports around ten founders a year on financial strategy, international taxation (notably the Beckham Law) and fundraising preparation. As lead writer of the Iter Advisors journal, he covers the topics he practices daily: cash management, SaaS KPIs, accounting outsourcing, and Franco-Spanish taxation.",
      es: "Benjamin pasó 12 años estructurando las finanzas de startups SaaS y pymes industriales antes de cofundar Iter Advisors. Hoy dirige la oficina de Barcelona y acompaña a una decena de fundadores al año en su estrategia financiera, su fiscalidad internacional (en particular la ley Beckham) y la preparación de sus rondas de financiación. Autor principal de la revista de Iter Advisors, escribe sobre los temas que practica a diario: tesorería, KPIs SaaS, externalización contable y fiscalidad franco-española.",
    },
    bioExtended: {
      fr: "Basé à Barcelone, Benjamin apporte une double perspective sur la réglementation financière européenne et les réalités pratiques du développement d'une entreprise technologique — de la mise en place de la première paie à la tenue des boards institutionnels. Son expertise couvre les prévisions de trésorerie à 13 semaines, le reporting de gestion, la restructuration financière et la planification fiscale transfrontalière entre la France, l'Espagne et d'autres pays. Il a accompagné des levées de fonds de 500 K€ pre-seed jusqu'à 15 M€ en Série A, ainsi que plusieurs opérations de M&A. Auteur de plus de 20 articles et guides lus par plus de 3 000 professionnels de la finance chaque mois, Benjamin est diplômé d'une grande école de commerce française et s'exprime couramment en français, espagnol et anglais.",
      en: "Based in Barcelona, Benjamin leads Iter Advisors' Spanish operations and brings a dual perspective on European financial regulation and the practicalities of scaling a technology business — from first payroll setup to institutional board meetings. His expertise includes 13-week cash flow forecasting, management reporting, financial restructuring, and cross-border tax planning across France, Spain, and beyond. He has supported fundraising rounds from €500K pre-seed to €15M Series A, as well as M&A transactions. As Iter Advisors' main blog writer, his articles on SaaS KPIs, treasury management, and Franco-Spanish taxation reach over 3,000 finance professionals monthly. Benjamin holds a Master's in Finance from a leading French Grande École and speaks French, Spanish, and English.",
      es: "Desde Barcelona, Benjamin dirige las operaciones de Iter Advisors en España y aporta una doble perspectiva sobre la regulación financiera europea y las realidades prácticas de escalar una empresa tecnológica, desde la primera nómina hasta las reuniones de consejo institucional. Su experiencia abarca previsión de tesorería a 13 semanas, reporting de gestión, reestructuración financiera y planificación fiscal transfronteriza entre Francia, España y más allá. Ha apoyado rondas de financiación desde 500 K€ pre-seed hasta 15 M€ en Serie A, así como transacciones de M&A. Como autor principal del blog de Iter Advisors, sus artículos sobre KPIs SaaS, tesorería y fiscalidad franco-española llegan a más de 3.000 profesionales de las finanzas cada mes. Benjamin es graduado en Finanzas por una de las principales grandes écoles francesas y habla con fluidez francés, español e inglés.",
    },
  },
  {
    id: 3,
    documentId: "guillaume-rostand",
    firstName: "Guillaume",
    lastName: "Rostand",
    roles: {
      fr: "Associé fondateur & CMO",
      en: "Founding Partner & CMO",
      es: "Socio fundador y CMO"
    },
    h1Roles: {
      fr: "Co-fondateur, DAF externalisé",
      en: "Co-Founder, Fractional CFO",
      es: "Cofundador, CFO Externalizado",
    },
    slug: "guillaume-rostand",
    photo: { url: "/images/team/guillaume-rostand.webp" },
    linkedIn: "https://www.linkedin.com/in/rostand/",
    order: 3,
    showInHero: true,
    bio: {
      fr: "Guillaume cofonde et pilote la croissance d'Iter Advisors. Ancien fondateur de startups SaaS, il a passé une décennie côté opérateur avant de basculer côté accompagnement. Il dirige aujourd'hui les sujets marketing, partenariats et développement commercial du cabinet.",
      en: "Guillaume co-founded Iter Advisors and runs its growth function. A former SaaS-startup founder, he spent a decade on the operator side before switching to advisory. He leads the firm's marketing, partnerships and business development efforts.",
      es: "Guillaume cofundó Iter Advisors y dirige su función de crecimiento. Ex fundador de startups SaaS, pasó una década en el lado operativo antes de cambiar al asesoramiento. Hoy lidera las áreas de marketing, alianzas y desarrollo comercial del despacho.",
    },
    bioExtended: {
      fr: "Chez Iter Advisors, Guillaume pilote la stratégie de croissance et de marketing, avec la responsabilité de positionner le cabinet comme la référence du DAF externalisé pour les fondateurs tech européens. Il travaille en étroite collaboration avec l'équipe CFO pour transformer l'expertise financière en ressources pratiques : guides approfondis sur les modèles de DAF externalisé, les stacks d'outils financiers, les processus de due diligence et la stratégie financière des startups, consultés chaque mois par des milliers de fondateurs et professionnels de la finance. En tant qu'ancien fondateur SaaS, Guillaume apporte une compréhension de première main des défis financiers des entreprises en croissance : gérer les relations investisseurs sur plusieurs géographies, choisir entre externalisation et recrutement interne, construire des systèmes financiers capables d'absorber une croissance rapide sans perdre le contrôle. Il est directement impliqué dans plus de 40 relations fondateurs chez Iter Advisors, contribuant à la stratégie commerciale, au positionnement marché et à la formation des équipes en France, en Espagne et en Belgique. Guillaume est basé entre Toulouse et Barcelone. Il est titulaire d'un diplôme d'ingénieur et s'exprime couramment en français, espagnol et anglais. Il contribue régulièrement à des conférences startup européennes et à des programmes de mentorat sur les thèmes de la croissance durable et des opérations financières.",
      en: "At Iter Advisors, Guillaume leads the firm's growth and marketing strategy, with responsibility for positioning Iter Advisors as the reference fractional CFO resource for European tech founders. He works closely with the CFO team to translate deep financial expertise into practical guidance — publishing in-depth guides on outsourced CFO models, financial tool stacks, due diligence processes, and startup finance strategy read by thousands of founders and finance professionals each month. As a former SaaS founder, Guillaume brings first-hand experience of the financial challenges that growth-stage companies face: managing investor relationships across multiple geographies, choosing between outsourcing and in-house hiring, and building financial systems that can absorb rapid growth without losing control. He has been directly involved in more than 40 founder relationships at Iter Advisors, contributing to commercial strategy, market positioning, and team formation across France, Spain, and Belgium. Guillaume is based between Toulouse and Barcelona, holds a degree in Engineering, and speaks French, Spanish, and English. He contributes regularly to European startup conferences and mentorship programmes on sustainable growth and financial operations, and is committed to making expert CFO knowledge accessible to every founder regardless of company stage or sector.",
      es: "En Iter Advisors, Guillaume dirige la estrategia de crecimiento y marketing del despacho, con la responsabilidad de posicionar a Iter Advisors como la referencia del CFO externalizado para los fundadores tech europeos. Trabaja estrechamente con el equipo de CFO para transformar la experiencia financiera en recursos prácticos: guías en profundidad sobre modelos de CFO externalizado, stacks de herramientas financieras, procesos de due diligence y estrategia financiera para startups, leídas mensualmente por miles de fundadores y profesionales de las finanzas. Como ex fundador de SaaS, Guillaume aporta un conocimiento de primera mano de los retos financieros de las empresas en crecimiento: gestionar relaciones con inversores en múltiples geografías, elegir entre externalización y contratación interna, y construir sistemas financieros capaces de absorber un crecimiento rápido sin perder el control. Está directamente implicado en más de 40 relaciones con fundadores en Iter Advisors, contribuyendo a la estrategia comercial, el posicionamiento de mercado y la formación de equipos en Francia, España y Bélgica. Guillaume reside entre Toulouse y Barcelona. Es licenciado en Ingeniería y habla con fluidez francés, español e inglés. Contribuye regularmente a conferencias startup europeas y programas de mentoría sobre crecimiento sostenible y operaciones financieras.",
    },
  },
  {
    id: 4,
    documentId: "florent-greth",
    firstName: "Florent",
    lastName: "Greth",
    roles: {
      fr: "Partner & CFO",
      en: "Partner & CFO",
      es: "Partner y CFO"
    },
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
      en: "Partner Human Capital",
      es: "Partner Capital Humano"
    },
    slug: "borith-biv",
    photo: { url: "/images/team/borith-biv.webp" },
    linkedIn: "https://www.linkedin.com/in/borith-biv-linkb/",
    order: 5,
    showInHero: false,
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
export function getAuthorSlugs(): string[] {
  return fallbackData
    .filter((m) => m.bio && m.bio.fr && m.bio.en && m.bio.es)
    .map((m) => m.slug);
}
