import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import type { ReactNode } from "react";
import TeamMemberCard from "@/components/TeamMemberCard";
import AuthorPage from "@/components/pages/AuthorPage";
import { getTeamMemberBySlug, getTeamMembers } from "@/lib/content/team";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));

const parse = (html: string) => new DOMParser().parseFromString(html, "text/html");
describe("Team profiles and links", () => {
  it("renders independent clickable links for members without a published biography", () => {
    const member = getTeamMembers("fr").find(m => m.slug === "alice-fumeron")!;
    const html = renderToStaticMarkup(<TeamMemberCard member={member} />);
    // Inspect emitted markup before HTML parser repairs invalid nested anchors.
    const container = document.createElement("div");
    expect(html).not.toMatch(/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*<a\b/);
    container.innerHTML = html;
    expect(container.querySelectorAll("a")).toHaveLength(2);
    expect([...container.querySelectorAll("a")].every(a => a.href === member.linkedIn)).toBe(true);
  });
  it("does not emit placeholder navigation when a member has no LinkedIn URL", () => {
    const member = getTeamMembers("fr").find(m => m.slug === "alice-fumeron")!;
    const page = parse(renderToStaticMarkup(<TeamMemberCard member={{ ...member, linkedIn: undefined }} />));
    expect(page.querySelector("a")).toBeNull();
    expect(page.body.textContent).toContain("Alice Fumeron");
  });
  it("uses one Person identity across the three translated CFO profiles", () => {
    for (const slug of ["hugo-lepresle", "gonzalo-serratosa-de-caralt"]) {
      for (const locale of ["fr", "en", "es"] as const) {
        const member = getTeamMemberBySlug(slug, locale)!;
        const page = parse(renderToStaticMarkup(<AuthorPage locale={locale} member={member} articles={[]} />));
        const graph = JSON.parse(page.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
        const person = graph.find((n: Record<string, string>) => n["@type"] === "Person");
        const profile = graph.find((n: Record<string, string>) => n["@type"] === "ProfilePage");
        expect(person["@id"]).toBe(`https://www.iteradvisors.com/a-propos/${slug}#person`);
        expect(profile.mainEntity["@id"]).toBe(person["@id"]);
        expect(profile.datePublished).toBe("2026-10-03T00:00:00.000Z");
        expect(profile.dateModified).toBe("2026-10-03T00:00:00.000Z");
        expect(person.sameAs).toEqual([member.linkedIn]);
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        expect(page.querySelector('a[href="#publications"]')).toBeNull();
      }
    }
  });
});
