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
  {
    id: 1,
    documentId: "benjamin-ziza",
    firstName: "Benjamin",
    lastName: "Ziza",
    roles: { fr: "Co-fondateur et CFO", en: "Co-founder & CFO", es: "Cofundador y CFO" },
    slug: "benjamin-ziza",
    photo: { url: "/images/team/benjamin-ziza.jpg" },
    linkedIn: "https://www.linkedin.com/in/benjamin-ziza/",
    order: 1,
    showInHero: true,
  },
  {
    id: 2,
    documentId: "deisy-arias-ramirez",
    firstName: "Deisy",
    lastName: "Arias Ramirez",
    roles: { fr: "DAF externalisé", en: "Fractional CFO", es: "CFO externalizado" },
    slug: "deisy-arias-ramirez",
    photo: { url: "/images/team/deisy-arias-ramirez.jpg" },
    linkedIn: "https://www.linkedin.com/in/deisy-arias-ramirez/",
    order: 2,
    showInHero: false,
  },
  {
    id: 3,
    documentId: "florent-greth",
    firstName: "Florent",
    lastName: "Greth",
    roles: { fr: "DAF externalisé", en: "Fractional CFO", es: "CFO externalizado" },
    slug: "florent-greth",
    photo: { url: "/images/team/florent-greth.jpg" },
    linkedIn: "https://www.linkedin.com/in/florent-greth/",
    order: 3,
    showInHero: false,
  },
  {
    id: 4,
    documentId: "guillaume-rostand",
    firstName: "Guillaume",
    lastName: "Rostand",
    roles: { fr: "Associé fondateur et CMO", en: "Founding Partner & CMO", es: "Socio fundador y CMO" },
    slug: "guillaume-rostand",
    photo: { url: "/images/team/guillaume-rostand.jpg" },
    linkedIn: "https://www.linkedin.com/in/guillaumerostand/",
    order: 4,
    showInHero: false,
  },
  {
    id: 5,
    documentId: "sebastien-doat",
    firstName: "Sébastien",
    lastName: "Doat",
    roles: { fr: "Co-fondateur et CFO", en: "Co-founder & CFO", es: "Cofundador y CFO" },
    slug: "sebastien-doat",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/sebastien-doat-fractional-cfo/",
    order: 5,
    showInHero: false,
  },
  {
    id: 6,
    documentId: "ornella-salgado",
    firstName: "Ornella",
    lastName: "Salgado",
    roles: { fr: "Analyste financière", en: "Financial Analyst", es: "Analista financiera" },
    slug: "ornella-salgado",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/ornellaslgd/",
    order: 6,
    showInHero: false,
  },
  {
    id: 7,
    documentId: "tom-jaufre",
    firstName: "Tom",
    lastName: "Jaufre",
    roles: { fr: "Finance CFO", en: "Finance CFO", es: "CFO finanzas" },
    slug: "tom-jaufre",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/tom-jaufre-65904175/",
    order: 7,
    showInHero: false,
  },
  {
    id: 8,
    documentId: "pauline-mathieu",
    firstName: "Pauline",
    lastName: "Mathieu",
    roles: { fr: "Analyste financière", en: "Financial Analyst", es: "Analista financiera" },
    slug: "pauline-mathieu",
    photo: null,
    linkedIn: "https://www.linkedin.com/in/pauline-mathieu-082488160/",
    order: 8,
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
