import { describe, expect, it } from "vitest";
import { getDafOfferFacts } from "@/lib/content/offer-facts";
import { getDafPillarContent } from "@/lib/content/daf-pillar-locales";
import { contractCopy } from "@/lib/content/contract-copy";
describe("withdrawn EN/ES contractual claims", () => {
  it("keeps visible copy and FAQ sources aligned without claiming a notice period", () => {
    for (const locale of ["en", "es"] as const) {
      const text = JSON.stringify(getDafPillarContent(locale)) + getDafOfferFacts(locale).price;
      expect(text).not.toMatch(/30 days.{0,3} notice|preaviso.{0,8}30|no minimum term|sin permanencia mínima/i);
      expect(getDafPillarContent(locale).hero.landmarks).toHaveLength(2);
    }
  });
  it("preserves operational 30-day examples and the approved French offer", () => {
    expect(contractCopy("An invoice is paid in 30 days.", "en")).toBe("An invoice is paid in 30 days.");
    expect(contractCopy("Sans durée minimale, préavis de 30 jours.", "fr")).toBe("Sans durée minimale, préavis de 30 jours.");
  });
});
