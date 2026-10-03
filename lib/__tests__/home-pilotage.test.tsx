import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import HomePage from "@/components/pages/HomePage";
import {
  getHomePilotage,
  HOME_CASH_EXAMPLE,
} from "@/lib/content/home-pilotage";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { parityHref } from "@/lib/locale-route-map";
import {
  CLIENTS_ACCOMPAGNES,
  ENGAGEMENT,
  FONDS_LEVES,
} from "@/lib/content/facts";

vi.mock("@/components/PageLayout", () => ({
  default: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));
const locales = ["fr", "en", "es"] as const;
const render = (locale: (typeof locales)[number]) =>
  new DOMParser().parseFromString(
    renderToStaticMarkup(<HomePage locale={locale} />),
    "text/html",
  );

describe("published Pilotage homepage", () => {
  it("keeps local conversion routes, every team member and matching visible FAQ/schema", () => {
    for (const locale of locales) {
      const doc = render(locale),
        t = getHomePilotage(locale);
      expect(doc.querySelectorAll("h1")).toHaveLength(1);
      expect(doc.querySelector("h1")?.textContent).toBe(t.headline.join(""));
      const hero = doc.querySelector('[data-journey="home-hero"]')!;
      for (const path of ["/contact#daf", "/daf-externalise/tarifs"])
        expect(
          hero.querySelector(`a[href="${parityHref(path, locale)}"]`),
        ).not.toBeNull();
      expect(
        doc.querySelector(
          `a[href="${parityHref("/daf-externalise", locale)}"]`,
        ),
      ).not.toBeNull();
      for (const member of getFallbackTeamMembers(locale))
        expect(
          doc.querySelector(
            `img[alt="${member.firstName} ${member.lastName}"]`,
          ),
        ).not.toBeNull();
      const visible = [
        ...doc.querySelectorAll('[data-journey="home-faq"] details'),
      ].map((detail) => ({
        q: detail.querySelector("summary")!.textContent,
        a: detail.querySelector("p")!.textContent,
      }));
      const faq = JSON.parse(
        doc.querySelector('script[type="application/ld+json"]')!.textContent!,
      );
      expect(
        faq.mainEntity.map(
          (item: { name: string; acceptedAnswer: { text: string } }) => ({
            q: item.name,
            a: item.acceptedAnswer.text,
          }),
        ),
      ).toEqual(visible);
    }
  });
  it("labels the illustrative forecast and describes the actual minimum and ending cash", () => {
    expect(HOME_CASH_EXAMPLE).toHaveLength(13);
    expect(Math.min(...HOME_CASH_EXAMPLE)).toBe(61);
    expect(HOME_CASH_EXAMPLE.indexOf(61)).toBe(6);
    expect(HOME_CASH_EXAMPLE.at(-1)).toBe(184);
    for (const locale of locales) {
      const doc = render(locale),
        t = getHomePilotage(locale);
      expect(doc.querySelector("aside")!.textContent).toContain(t.sheet.badge);
      expect(
        doc.querySelector('[role="img"]')!.getAttribute("aria-label"),
      ).toBe(t.sheet.description);
      expect(t.sheet.description).toMatch(
        /hypothèse illustrative distincte|separate illustrative assumption|hipótesis ilustrativa independiente/,
      );
    }
  });
  it("derives company proof and notice from the validated facts", () => {
    for (const locale of locales) {
      const t = getHomePilotage(locale);
      expect(t.proofs[0].value).toBe(String(CLIENTS_ACCOMPAGNES));
      expect(t.proofs[1].value.replace(/[^0-9]/g, " ").trim()).toBe(
        FONDS_LEVES.replace(/[^0-9]/g, " ").trim(),
      );
      expect(t.engagement).toContain(String(ENGAGEMENT.preavisJours));
    }
  });
});
