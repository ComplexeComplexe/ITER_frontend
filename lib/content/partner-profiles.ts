import type { Locale } from "@/lib/i18n";
import { GUILLAUME_PROFILE, type PartnerProfile } from "@/lib/content/guillaume-profile";
import profiles from "@/lib/content/partner-profiles.json";

const PARTNER_PROFILES: Record<string, Record<Locale, PartnerProfile>> = {
  ...profiles,
  "guillaume-rostand": GUILLAUME_PROFILE,
};

export function getPartnerProfile(slug: string, locale: Locale): PartnerProfile | undefined {
  return Object.hasOwn(PARTNER_PROFILES, slug) ? PARTNER_PROFILES[slug][locale] : undefined;
}
