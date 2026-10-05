import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import AuthorPage from "@/components/pages/AuthorPage";
import { getTeamMemberBySlug } from "@/lib/content/team";
import { getPartnerProfile } from "@/lib/content/partner-profiles";
import { parityHref } from "@/lib/locale-route-map";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));

describe("Guillaume's supplied biography", () => {
  for (const locale of ["fr", "en", "es"] as const) {
    it(`preserves the actual career and profile journey in ${locale}`, () => {
      const member = getTeamMemberBySlug("guillaume-rostand", locale)!;
      const doc = new DOMParser().parseFromString(renderToStaticMarkup(<AuthorPage locale={locale} member={member} articles={[]} />), "text/html");
      expect(doc.querySelectorAll("h1")).toHaveLength(1);
      expect(doc.querySelector("h1")?.textContent).toBe("Guillaume Rostand");
      const text = doc.querySelector("main")!.textContent!;
      for (const fact of ["25 startups", "2011", "2017", "2019", "2026", "2025", "CELSA", "Sciences Po", "NRJ Group", "eBay France", "Myfab", "InstantLuxe", "Splendia", "Liligo", "AI Summit Barcelona", "Le Club Startup"]) expect(text).toContain(fact);
      expect(text).not.toMatch(/diplôme d’ingénieur|degree in Engineering|licenciado en Ingeniería|40 relations|40 founder|40 relaciones|former SaaS|ex fundador de startups SaaS/);
      for (const source of ["/a-propos/benjamin-ziza", "/a-propos/sebastien-doat", "/a-propos/florent-greth", "/daf-externalise"]) expect(doc.querySelector(`a[href="${parityHref(source, locale)}"]`)).not.toBeNull();
      const profile = doc.querySelector("[data-partner-profile]")!;
      expect(profile.querySelectorAll("h2")).toHaveLength(5);
      expect(profile.querySelector('section')!.id).toBe('parcours');
      expect(doc.querySelectorAll('aside dl > div')).toHaveLength(5);
      expect(doc.querySelector('aside')!.textContent).toContain('CELSA');
      expect(member.metaTitle).toBe(getPartnerProfile('guillaume-rostand', locale)!.metaTitle);
      expect(member.metaDescription).toBe(getPartnerProfile('guillaume-rostand', locale)!.metaDescription);
      for (const anchor of doc.querySelectorAll('a[href^="#"]')) expect(doc.getElementById(anchor.getAttribute("href")!.slice(1))).not.toBeNull();
      expect(profile.querySelectorAll('a[href^="https://lepetitjournal.com/"]')).toHaveLength(2);
      expect(profile.querySelector('a[href^="https://www.roundtable.eu/"]')).not.toBeNull();
      const graph = JSON.parse(doc.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
      const person = graph.find((entry: Record<string, string>) => entry["@type"] === "Person");
      expect(person["@id"]).toBe("https://www.iteradvisors.com/a-propos/guillaume-rostand#person");
      expect(person.jobTitle).not.toMatch(/CFO|DAF/);
      expect(person.alumniOf.map((school: { name: string }) => school.name)).toEqual(["CELSA", "Sciences Po"]);
      expect(person.workLocation.address.addressLocality).toBe('Barcelona');
      expect(graph.find((entry: Record<string, string>) => entry["@type"] === "ProfilePage").dateModified).toBe("2026-10-05");
      expect(member.metaTitle!.length).toBeLessThanOrEqual(60);
    });
  }
});
