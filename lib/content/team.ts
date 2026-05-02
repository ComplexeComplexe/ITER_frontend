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
