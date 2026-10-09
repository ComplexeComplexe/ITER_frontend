import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import AuthorPage from "@/components/pages/AuthorPage";
import { getTeamMemberBySlug } from "@/lib/content/team";
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
        expect(doc.querySelectorAll("[data-partner-profile] h2")).toHaveLength(slug === "sebastien-doat" ? 3 : 4);
        const ids = [...doc.querySelectorAll("[id]")].map(node => node.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const anchor of doc.querySelectorAll('a[href^="#"]')) expect(doc.getElementById(anchor.getAttribute("href")!.slice(1))).not.toBeNull();
        const text = doc.querySelector("main")!.textContent!;
        const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
        const person = graph.find((n: Record<string, string>) => n["@type"] === "Person");
        expect(text).not.toMatch(/To complete with|À compléter avec|Para completar con|For review|À relire|Para revisión|15 M€|€15M|2012-2015|15 ans|15 years/);
        expect(text).not.toContain("Outsourced CFO");
        if (slug === "benjamin-ziza") {
          expect(doc.querySelector('a[href="https://www.linkedin.com/in/benjaminziza/"]')).not.toBeNull();
          expect(text).not.toMatch(/is a chartered accountant|est expert-comptable diplômé|decena de fundadores/);
          for (const fact of ["Mazars", "Amaris", "IWG", "Billy Mobile", "SAP", "11", "60", "26"]) expect(text).toContain(fact);
          expect(person.hasCredential).toHaveLength(2);
          expect(doc.querySelector(`a[href="${parityHref("/services/accompagnement-levee-de-fond", locale)}"]`)).not.toBeNull();
        }
        if (slug === "sebastien-doat") {
          expect(text).not.toContain("AI Summit Barcelona");
          expect(text).not.toMatch(/15\s?%/);
          expect(text).not.toContain("Alice");
          expect(doc.querySelector('#cas-aisb')).toBeNull();
          for (const fact of ["ACA Nexia", "Mama Shelter", "Terres de Café", "Carts Guru", "Equito", "NuuBB", "65"]) expect(text).toContain(fact);
          expect(person.hasCredential).toHaveLength(2);
          expect(doc.querySelector(`a[href="${parityHref("/daf-externalise", locale)}"]`)).not.toBeNull();
          expect(doc.querySelectorAll('a[href^="https://podcast.ausha.co/"]')).toHaveLength(1);
        }
        if (slug === "florent-greth") {
          for (const fact of ["Pennylane", "50", "PACCOR", "VIIA", "Abertis", "KPMG"]) expect(text).toContain(fact);
          expect(doc.querySelector(`a[href="${parityHref("/ressources/outils/pennylane", locale)}"]`)).not.toBeNull();
          expect(doc.querySelector(`a[href="${parityHref("/services/controle-de-gestion-externalise", locale)}"]`)).not.toBeNull();
        }
        expect(person["@id"]).toBe(`https://www.iteradvisors.com/a-propos/${slug}#person`);
        expect(person.alumniOf.length).toBeGreaterThanOrEqual(1);
        expect(person.workLocation.address.addressLocality).toBe("Barcelona");
        expect(person.knowsLanguage).toContain("fr");
        expect(person.knowsLanguage).toContain("en");
        expect(person.knowsLanguage).toContain("es");
        expect(doc.querySelectorAll("aside dl > div")).toHaveLength(5);
        expect(person.knowsAbout.length).toBeGreaterThanOrEqual(3);
        expect(person.sameAs).toContain(member.linkedIn);
        const profile = graph.find((n: Record<string, string>) => n["@type"] === "ProfilePage");
        expect(profile.mainEntity["@id"]).toBe(person["@id"]);
        expect(profile.dateModified).toBe("2026-10-09T05:32:44.000Z");
        expect(member.metaTitle).toContain(member.role);
        expect(member.metaTitle!.length).toBeLessThanOrEqual(60);
        expect(member.metaTitle).not.toContain("—");
        expect(member.metaDescription).toBe(getPartnerProfile(slug, locale)!.metaDescription);
      });
    }
  }
});
