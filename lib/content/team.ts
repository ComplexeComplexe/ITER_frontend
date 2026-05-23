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
  /** Long-form bio used by the dedicated author page (E-E-A-T signal).
   *  Only populated for founding partners; other members fall back to
   *  the team listing on /a-propos. */
  bio?: Record<Locale, string>;
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
): (StrapiTeamMember & { bio: string; h1Role?: string }) | null {
  const member = fallbackData.find((m) => m.slug === slug);
  if (!member || !member.bio?.[locale]) return null;
  return {
    ...member,
    title: `${member.firstName} ${member.lastName}`,
    role: member.roles[locale],
    bio: member.bio[locale],
    h1Role: member.h1Roles?.[locale],
  } as StrapiTeamMember & { bio: string; h1Role?: string };
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
