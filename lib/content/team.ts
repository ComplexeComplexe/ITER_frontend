import type { StrapiTeamMember } from "@/lib/strapi";
import type { Locale } from "@/lib/i18n";

interface FallbackMemberData {
  id: number;
  documentId: string;
  firstName: string;
  lastName: string;
  roles: Record<Locale, string>;
  slug: string;
  photo: { url: string } | null;
  linkedIn: string;
  order: number;
  showInHero: boolean;
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
    roles: {
      fr: "Associé fondateur - CFO & Investisseur",
      en: "Founding Partner - CFO & Investor",
      es: "Socio fundador - CFO e Inversor"
    },
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.webp" },
    linkedIn: "https://www.linkedin.com/in/benjamin-ziza/",
    order: 2,
    showInHero: true,
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
