import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import AuthorPage from "@/components/pages/AuthorPage";
import { getTeamMemberBySlug, authorPageTitle } from "@/lib/content/team";
import { getPartnerProfile } from "@/lib/content/partner-profiles";
import { parityHref } from "@/lib/locale-route-map";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));

describe("Published partner profiles", () => {
  for (const slug of ["benjamin-ziza", "sebastien-doat", "florent-greth"]) {
    for (const locale of ["fr", "en", "es"] as const) {
      it(`publishes one approved biography and identity for ${slug} in ${locale}`, () => {
        const member = getTeamMemberBySlug(slug, locale)!;
        const doc = new DOMParser().parseFromString(renderToStaticMarkup(<AuthorPage locale={locale} member={member} articles={[]} />), "text/html");
        expect(member.bio).toBe(getPartnerProfile(slug, locale)!.intro[0]);
        expect(member.bioExtended).toBe(getPartnerProfile(slug, locale)!.intro[1]);
        expect(member.role).toBe(getPartnerProfile(slug, locale)!.teamRole);
        const fullName = `${member.firstName} ${member.lastName}`;
        expect(doc.querySelectorAll("h1")).toHaveLength(1);
        expect(doc.querySelector("h1")!.textContent).toBe(fullName);
        expect(doc.querySelectorAll("[data-partner-profile]")).toHaveLength(1);
        expect(doc.querySelectorAll("[data-partner-profile] h2")).toHaveLength(4);
        const ids = [...doc.querySelectorAll("[id]")].map(node => node.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const anchor of doc.querySelectorAll('a[href^="#"]')) expect(doc.getElementById(anchor.getAttribute("href")!.slice(1))).not.toBeNull();
        const text = doc.querySelector("main")!.textContent!;
        expect(text).not.toMatch(/To complete with|À compléter avec|Para completar con|For review|À relire|Para revisión|15 M€|€15M|2012-2015|15 ans|15 years/);
        expect(text).not.toContain("Outsourced CFO");
        if (slug === "benjamin-ziza") {
          expect(doc.querySelector('a[href="https://www.linkedin.com/in/benjaminziza/"]')).not.toBeNull();
          expect(text).not.toMatch(/chartered accountant|diplômé d’expertise|decena de fundadores/);
          expect(doc.querySelector(`a[href="${parityHref("/services/accompagnement-levee-de-fond", locale)}"]`)).not.toBeNull();
        }
        if (slug === "sebastien-doat") {
          expect(text).toContain("AI Summit Barcelona 2026");
          expect(text).toMatch(/15\s?%/);
          expect(text).toContain("Alice");
          expect(doc.querySelector(`a[href="${parityHref("/daf-externalise", locale)}"]`)).not.toBeNull();
          expect(doc.querySelectorAll('a[href^="https://podcast.ausha.co/"]')).toHaveLength(1);
        }
        if (slug === "florent-greth") {
          for (const fact of ["Pennylane", "50", "PACCOR", "VIIA", "Abertis", "KPMG"]) expect(text).toContain(fact);
          expect(doc.querySelector('a[href="/ressources/outils/pennylane"]')).not.toBeNull();
          expect(doc.querySelector(`a[href="${parityHref("/services/controle-de-gestion-externalise", locale)}"]`)).not.toBeNull();
        }
        const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
        const person = graph.find((n: Record<string, string>) => n["@type"] === "Person");
        expect(person["@id"]).toBe(`https://www.iteradvisors.com/a-propos/${slug}#person`);
        expect(person).not.toHaveProperty("alumniOf");
        expect(person.knowsAbout.length).toBeGreaterThanOrEqual(3);
        expect(person.sameAs).toContain(member.linkedIn);
        const profile = graph.find((n: Record<string, string>) => n["@type"] === "ProfilePage");
        expect(profile.mainEntity["@id"]).toBe(person["@id"]);
        expect(profile.dateModified).toBe("2026-10-03");
        expect(authorPageTitle(fullName, member.h1Role!).length).toBeLessThanOrEqual(60);
      });
    }
  }
});
