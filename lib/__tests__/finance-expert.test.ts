import { describe, expect, it } from "vitest";
import { articleSchema } from "../schemas";
import { editorialWebPageSchema, FINANCE_AUTHOR, ITER_AUTHOR, authorHref } from "../schemas/editorial";
import { FINANCE_EXPERT, editorialPersonId } from "../content/finance-expert";
import { getContactContext } from "../contact-context";

describe("finance expert identity and attribution", () => {
  it("attributes cabinet copy to the organization rather than inferring a personal author", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      const schema = editorialWebPageSchema({ path: "/services/controle-de-gestion-externalise", name: "Service", description: "Description", locale, author: ITER_AUTHOR });
      expect(schema.author).toMatchObject({ "@type": "Organization", name: "Iter Advisors", "@id": "https://www.iteradvisors.com/#organization" });
      expect(authorHref(locale, ITER_AUTHOR)).toBe({ fr: "/a-propos", en: "/en/about", es: "/es/quienes-somos" }[locale]);
      expect(schema).not.toHaveProperty("reviewedBy");
    }
  });
  it("links translated profiles and article authors to the same person", () => {
    for (const path of ["/a-propos/sebastien-doat", "/en/about/sebastien-doat", "/es/quienes-somos/sebastien-doat/"]) {
      const schema = articleSchema({ headline: "Article", description: "Description", url: "/article", authorName: FINANCE_EXPERT.name, authorUrl: path });
      expect(schema.author).toMatchObject({ "@id": FINANCE_EXPERT.id, name: FINANCE_EXPERT.name });
      expect(editorialPersonId(`https://www.iteradvisors.com${path}`)).toBe(FINANCE_EXPERT.id);
    }
  });
  it("does not reassign existing finance authorship or assert an unperformed review", () => {
    const schema = editorialWebPageSchema({ path: "/services/controle-de-gestion-externalise", name: "Service", description: "Description", locale: "fr", author: FINANCE_AUTHOR });
    expect(schema.author).toMatchObject({ name: "Benjamin Ziza", "@id": "https://www.iteradvisors.com/a-propos/benjamin-ziza#person" });
    expect(schema).not.toHaveProperty("reviewedBy");
  });
  it("recognizes the expert profile contact journey without accepting arbitrary fragments", () => {
    expect(getContactContext("#sebastien-doat")).toEqual({ need: "daf-pme", originPage: "/a-propos/sebastien-doat" });
    expect(getContactContext("#unknown-person")).toBeUndefined();
  });
});
