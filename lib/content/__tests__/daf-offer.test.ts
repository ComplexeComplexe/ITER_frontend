import { describe, expect, it } from "vitest";
import { getDafContent } from "../daf";
import { getDafSubContent } from "../daf-sub";
import { getDafOffer } from "../daf-offer";
import { ENGAGEMENT, FORMULES } from "../facts";

describe("published DAF commercial information", () => {
  it.each(["en", "es"] as const)("keeps %s prices and notice consistent across summaries, tables and FAQ", locale => {
    const content = getDafContent(locale);
    const offer = getDafOffer(locale);
    expect(content.pricingTable?.tiers).toHaveLength(FORMULES.length);
    expect(content.pricingTable?.tiers).toEqual(offer.tiers);
    expect(content.essential?.points.some(point => point.text === offer.commitment)).toBe(true);
    expect(content.faq.some(item => item.answer.includes(offer.price) && item.answer.includes(offer.commitment))).toBe(true);
    const published = JSON.stringify(content);
    expect(published).not.toMatch(/(?:EUR |€ ?)(?:2[ ,.\u00a0\u202f]000|7[ ,.\u00a0\u202f]000)(?:\+|\/| excl)/);
    expect(published).not.toMatch(/no notice period|sin preaviso|within 5 days|7 to 14 days|7 a 14 días/);
    expect(published).toContain(String(ENGAGEMENT.preavisJours));
  });

  it("includes every approved plan and deliverable in the French pricing table", () => {
    const content = getDafSubContent("fr", "tarifs")!;
    const grid = content.sections.find(section => section.id === "grille-tarifaire");
    expect(grid?.table?.rows.map(row => row[0])).toEqual(FORMULES.map(plan => plan.nom));
    for (const plan of FORMULES) expect(grid?.table?.rows.flat()).toContain(plan.inclus);
    expect(JSON.stringify(content)).not.toContain("[grille tarifaire](/daf-externalise/tarifs)");
  });
});
