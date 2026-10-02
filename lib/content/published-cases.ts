import type { Locale } from "@/lib/i18n";
import type { CaseStudy } from "./case-studies";
import { DOCUMENTED_CASES } from "./documented-cases";
import { getReviewedCases } from "./documented-case-locales";

// The historical scenarios remain in the editorial archive until their
// evidence and publication rights are confirmed. Public summaries use the
// same source as the dedicated pages, not a second set of client metrics.
export function getPublishedCases(locale: Locale): CaseStudy[] {
  return DOCUMENTED_CASES.map(item => {
    if (locale === "fr") return { ...item, results: [...item.results], teamSize: "", duration: "" };
    const reviewed = getReviewedCases(locale).find(detail => detail.slug === item.slug)!;
    return { ...reviewed, results: [...reviewed.results], teamSize: "", duration: "", quote: undefined, quoteAuthor: undefined, quoteRole: undefined };
  });
}
