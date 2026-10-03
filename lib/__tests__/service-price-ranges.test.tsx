import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import DafPillarPage from "@/components/pages/DafPillarPage";
import { FORMULES } from "@/lib/content/facts";

vi.mock("@/components/PageLayout", () => ({
  default: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));

describe("CFO indicative pricing", () => {
  it("publishes a VAT-exclusive range instead of a fixed or minimum-only structured price in every locale", () => {
    for (const locale of ["fr", "en", "es"] as const) {
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<DafPillarPage locale={locale} />), "text/html");
      const schemas = [...doc.querySelectorAll('script[type="application/ld+json"]')].map(node => JSON.parse(node.textContent!));
      const offer = schemas.find(schema => schema["@type"] === "Service").offers;
      expect(offer.price).toBeUndefined();
      expect(offer.priceSpecification.price).toBeUndefined();
      expect(offer.priceSpecification).toMatchObject({
        minPrice: String(FORMULES[0].prixMin),
        maxPrice: String(FORMULES.at(-1)!.prixMax),
        priceCurrency: "EUR",
        valueAddedTaxIncluded: false,
      });
      const visible = doc.querySelector("#tarifs")!.textContent!.replace(/[\s,.–]/g, "");
      expect(visible).toContain(offer.priceSpecification.minPrice);
      expect(visible).toContain(offer.priceSpecification.maxPrice);
    }
  });
});
