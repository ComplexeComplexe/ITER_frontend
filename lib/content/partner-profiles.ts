import { resolveCompanyCopy, getApprovedPerson, approvedPersonTitle } from "@/lib/company-facts";
import type { Locale } from "@/lib/i18n";
import { GUILLAUME_PROFILE, type PartnerProfile } from "@/lib/content/guillaume-profile";
import profiles from "@/lib/content/partner-profiles.json";

const PARTNER_PROFILES: Record<string, Record<Locale, PartnerProfile>> = {
  ...profiles,
  "guillaume-rostand": GUILLAUME_PROFILE,
};

export function getPartnerProfile(slug: string, locale: Locale): PartnerProfile | undefined {
  if (!Object.hasOwn(PARTNER_PROFILES, slug)) return undefined;
  const profile = resolveCompanyCopy(PARTNER_PROFILES[slug][locale], locale);
  const person = getApprovedPerson(slug);
  return person ? { ...profile, role: person.roles[locale], teamRole: person.roles[locale], metaTitle: approvedPersonTitle(slug, locale)!, sameAs: [person.linkedin] } : profile;
}
