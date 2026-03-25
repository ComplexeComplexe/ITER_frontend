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

const fallbackData: FallbackMemberData[] = [
  // === Direction / Partners ===
  {
    id: 1,
    documentId: "sebastien-doat",
    firstName: "Sébastien",
    lastName: "Doat",
    roles: { fr: "Associé fondateur, CFO & Investisseur", en: "Founding Partner, CFO & Investor", es: "Socio fundador, CFO e Inversor" },
    slug: "sebastien-doat",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
    order: 1,
    showInHero: true,
  },
  {
    id: 2,
    documentId: "benjamin-ziza",
    firstName: "Benjamin",
    lastName: "Ziza",
    roles: { fr: "Associé fondateur, CFO & Investisseur", en: "Founding Partner, CFO & Investor", es: "Socio fundador, CFO e Inversor" },
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.jpg" },
    linkedIn: "https://www.linkedin.com/in/benjamin-ziza/",
    order: 2,
    showInHero: true,
  },
  {
    id: 3,
    documentId: "guillaume-rostand",
    firstName: "Guillaume",
    lastName: "Rostand",
    roles: { fr: "Associé fondateur & CMO", en: "Founding Partner & CMO", es: "Socio fundador y CMO" },
    slug: "guillaume-rostand",
    photo: { url: "/images/team/guillaume-rostand.jpg" },
    linkedIn: "https://www.linkedin.com/in/guillaumerostand/",
    order: 3,
    showInHero: true,
  },
  {
    id: 4,
    documentId: "florent-greth",
    firstName: "Florent",
    lastName: "Greth",
    roles: { fr: "Partner & CFO", en: "Partner & CFO", es: "Partner & CFO" },
    slug: "florent-greth",
    photo: { url: "/images/team/florent-greth.jpg" },
    linkedIn: "https://www.linkedin.com/in/florent-greth/",
    order: 4,
    showInHero: true,
  },
  // === Finance - CFO ===
  {
    id: 5,
    documentId: "sebastien-preel",
    firstName: "Sébastien",
    lastName: "Preel",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "sebastien-preel",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/sebastienpreel/",
    order: 6,
    showInHero: false,
  },
  {
    id: 6,
    documentId: "deisy-arias-ramirez",
    firstName: "Deisy",
    lastName: "Arias Ramirez",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "deisy-arias-ramirez",
    photo: { url: "/images/team/deisy-arias-ramirez.jpg" },
    linkedIn: "https://www.linkedin.com/in/deisy-arias-ramirez/",
    order: 7,
    showInHero: false,
  },
  {
    id: 7,
    documentId: "tom-jaufre",
    firstName: "Tom",
    lastName: "Jaufre",
    roles: { fr: "CFO & M&A", en: "CFO & M&A", es: "CFO & M&A" },
    slug: "tom-jaufre",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/tom-jaufre-65904175/",
    order: 8,
    showInHero: false,
  },
  {
    id: 8,
    documentId: "jessica-barnicaud",
    firstName: "Jessica",
    lastName: "Barnicaud",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "jessica-barnicaud",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/jessica-barnicaud/",
    order: 10,
    showInHero: false,
  },
  {
    id: 9,
    documentId: "jordi-kopp",
    firstName: "Jordi",
    lastName: "Kopp",
    roles: { fr: "CFO", en: "CFO", es: "CFO" },
    slug: "jordi-kopp",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/jordi-kopp/",
    order: 9,
    showInHero: false,
  },
  // === Finance - Senior Analysts / Managers ===
  {
    id: 10,
    documentId: "ornella-salgado",
    firstName: "Ornella",
    lastName: "Salgado",
    roles: { fr: "Analyste financière senior", en: "Senior Finance Analyst", es: "Analista financiera senior" },
    slug: "ornella-salgado",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/ornellaslgd/",
    order: 11,
    showInHero: false,
  },
  {
    id: 11,
    documentId: "rocio-montesano",
    firstName: "Rocio",
    lastName: "Montesano",
    roles: { fr: "Analyste financière senior", en: "Senior Finance Analyst", es: "Analista financiera senior" },
    slug: "rocio-montesano",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/rociomontesano/",
    order: 12,
    showInHero: false,
  },
  {
    id: 12,
    documentId: "yumara-marie",
    firstName: "Yumara",
    lastName: "Marie",
    roles: { fr: "Analyste financière", en: "Finance Analyst", es: "Analista financiera" },
    slug: "yumara-marie",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/yumara-marie/",
    order: 13,
    showInHero: false,
  },
  {
    id: 13,
    documentId: "benjamin-carlot",
    firstName: "Benjamin",
    lastName: "Carlot",
    roles: { fr: "Head of Finance & Controlling", en: "Head of Finance & Controlling", es: "Head of Finance & Controlling" },
    slug: "benjamin-carlot",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/benjamin-carlot/",
    order: 15,
    showInHero: false,
  },
  {
    id: 15,
    documentId: "pauline-mathieu",
    firstName: "Pauline",
    lastName: "Mathieu",
    roles: { fr: "Analyste financière", en: "Finance Analyst", es: "Analista financiera" },
    slug: "pauline-mathieu",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/pauline-mathieu-082488160/",
    order: 14,
    showInHero: false,
  },
  // === Data ===
  {
    id: 15,
    documentId: "christophe-hoarau",
    firstName: "Christophe",
    lastName: "Hoarau",
    roles: { fr: "CFO & Data Officer", en: "CFO & Data Officer", es: "CFO & Data Officer" },
    slug: "christophe-hoarau",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/christophe-hoarau/",
    order: 15,
    showInHero: false,
  },
  // === Capital Humain ===
  {
    id: 16,
    documentId: "borith-biv",
    firstName: "Borith",
    lastName: "Biv",
    roles: { fr: "Partner Capital Humain", en: "Partner Human Capital Practice", es: "Partner Capital Humano" },
    slug: "borith-biv",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/borith-biv/",
    order: 5,
    showInHero: true,
  },
  // === Finance Interns ===
  {
    id: 17,
    documentId: "andress-ayme",
    firstName: "Andress",
    lastName: "Ayme",
    roles: { fr: "Stagiaire Finance", en: "Finance Intern", es: "Becario de Finanzas" },
    slug: "andress-ayme",
    photo: null,
    linkedIn: "",
    order: 17,
    showInHero: false,
  },
  {
    id: 18,
    documentId: "nina-eskinazi",
    firstName: "Nina",
    lastName: "Eskinazi",
    roles: { fr: "Stagiaire Finance", en: "Finance Intern", es: "Becaria de Finanzas" },
    slug: "nina-eskinazi",
    photo: null,
    linkedIn: "",
    order: 18,
    showInHero: false,
  },
];

/**
 * Get fallback team members with locale-appropriate roles.
 * Used when Strapi CMS data is unavailable or incomplete.
 */
export function getFallbackTeamMembers(locale: Locale = "fr"): StrapiTeamMember[] {
  return fallbackData.map((m) => ({
    id: m.id,
    documentId: m.documentId,
    firstName: m.firstName,
    lastName: m.lastName,
    role: m.roles[locale] ?? m.roles.fr,
    slug: m.slug,
    photo: m.photo as any,
    linkedIn: m.linkedIn,
    order: m.order,
    showInHero: m.showInHero,
  }));
}

/**
 * @deprecated Use getFallbackTeamMembers(locale) instead for locale-aware roles.
 * Kept for backward compatibility — returns FR roles.
 */
export const fallbackTeamMembers: StrapiTeamMember[] = getFallbackTeamMembers("fr");
