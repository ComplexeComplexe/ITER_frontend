import { writeFileSync } from "node:fs";
import { getPartnerProfile } from "../lib/content/partner-profiles";

// Team cards in client components need short bios, not the complete profile content.
const summaries = Object.fromEntries(
  ["guillaume-rostand", "benjamin-ziza", "sebastien-doat", "florent-greth"].map(slug => [
    slug,
    Object.fromEntries((["fr", "en", "es"] as const).map(locale => {
      const profile = getPartnerProfile(slug, locale);
      if (!profile) throw new Error(`Missing partner profile: ${slug}/${locale}`);
      return [locale, { role: profile.teamRole, metaRole: profile.metaRole, bio: profile.intro[0], bioExtended: profile.intro[1] }];
    })),
  ]),
);
writeFileSync("lib/content/partner-summaries.json", JSON.stringify(summaries, null, 2) + "\n");
