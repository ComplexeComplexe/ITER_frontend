import { describe, it, expect, vi, afterEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import type { ReactNode } from "react";
import { IA_GUIDES } from "@/lib/content/ia-finance-guides";
import { getIaGuide, iaGuideHref, localizeIaHtml } from "@/lib/content/ia-finance-locales";
import { parityHref } from "@/lib/locale-route-map";
import IaFinanceHub from "@/components/pages/IaFinanceHub";
import IaFinanceGuide from "@/components/pages/IaFinanceGuide";
import GuideFiscalPage from "@/components/pages/GuideFiscalPage";
import ReportingRoi from "@/components/finance/ReportingRoi";
import CopyPrompt from "@/components/finance/CopyPrompt";

vi.mock("@/components/PageLayout", () => ({ default: ({ children }: { children: ReactNode }) => <main>{children}</main> }));
vi.mock("@/lib/static-content", () => ({ getCmsNavigation: async () => undefined }));
const locales = ["fr", "en", "es"] as const;
const doc = (html: string) => new DOMParser().parseFromString(html, "text/html");
const text = (element: Element) => element.textContent!.replace(/\s+/g, " ").trim();
afterEach(cleanup);

describe("reviewed AI-finance journeys", () => {
  it("preserves sections, tables, prompts, source links and qualifications in every guide", () => {
    for (const slug of Object.keys(IA_GUIDES)) {
      const source = getIaGuide("fr", slug);
      for (const locale of locales) {
        const guide = getIaGuide(locale, slug);
        expect(guide.sections.map(s => s.id)).toEqual(source.sections.map(s => s.id));
        expect(guide.sources).toEqual(source.sources);
        expect(guide.related).toEqual(source.related);
        expect(guide.summary).toHaveLength(source.summary.length);
        expect(guide.faq).toHaveLength(source.faq.length);
        for (const [i, section] of guide.sections.entries()) {
          const original = doc(source.sections[i].html), translated = doc(section.html);
          for (const tag of ["p", "li", "table", "caption", "th", "td", "blockquote", "a"]) {
            expect(translated.querySelectorAll(tag), `${locale}/${slug}/${section.id} ${tag}`).toHaveLength(original.querySelectorAll(tag).length);
          }
          const expected = [...original.querySelectorAll("a")].map(a => parityHref(a.getAttribute("href")!, locale));
          expect([...translated.querySelectorAll("a")].map(a => a.getAttribute("href"))).toEqual(expected);
          if (locale !== "fr") {
            expect(section.title).not.toBe(source.sections[i].title);
            for (const a of translated.querySelectorAll('a[href^="/ressources/"]')) {
              expect(a.getAttribute("hreflang")).toBe("fr");
              expect(a.textContent).toContain("(FR)");
            }
          }
        }
      }
    }
    for (const locale of ["en", "es"] as const) {
      const examples = getIaGuide(locale, "chatgpt-finance");
      expect(examples.sections[0].html).toContain("120");
      expect(examples.sections[1].html).toContain("100");
      expect(examples.sections[0].html).toMatch(/not accounting EBITDA|no un EBITDA contable/);
      expect(getIaGuide(locale, "outils").sections[4].html).toMatch(/French pricing page|página francesa/);
      expect(getIaGuide(locale, "retours-experience").sections[1].html).toMatch(/estimated or expected|estimados o esperados/);
      expect(getIaGuide(locale, "retours-experience").sections[3].html).toMatch(/neither use of an AI model|No acredita uso de un modelo IA/);
    }
    expect(localizeIaHtml('<a href="/ressources/ia-finance/chatgpt-finance#pieces">Test</a>', "es")).toContain('/es/recursos/ia-finanzas/chatgpt-finanzas#pieces');
  });
  it("renders complete hubs with six local guide links and identical blocks", async () => {
    const rendered = await Promise.all(locales.map(async locale => renderToStaticMarkup(await IaFinanceHub({ locale }))));
    const blocks = (html: string) => [...doc(html).querySelectorAll("[data-block-key]")].map(e => e.getAttribute("data-block-key"));
    for (const [i, locale] of locales.entries()) {
      expect(blocks(rendered[i])).toEqual(blocks(rendered[0]));
      const page = doc(rendered[i]);
      expect(page.querySelectorAll("h1")).toHaveLength(1);
      expect(page.querySelectorAll("h2")).toHaveLength(5);
      for (const slug of Object.keys(IA_GUIDES)) expect(page.querySelector(`a[href="${iaGuideHref(slug, locale)}"]`)).not.toBeNull();
      const schema = JSON.parse(page.querySelector('script[type="application/ld+json"]')!.textContent!);
      expect(schema.hasPart).toHaveLength(6);
      expect(schema.hasPart.map((s: { url: string }) => s.url)).toEqual(["automatiser-reporting-financier", "chatgpt-finance", "llm-finance", "outils", "retours-experience", "feuille-de-route-90-jours"].map(slug => "https://www.iteradvisors.com" + iaGuideHref(slug, locale)));
    }
  });
  it("keeps visible FAQ and Article schema accurate, with complete exercises", async () => {
    for (const slug of Object.keys(IA_GUIDES)) {
      for (const locale of locales) {
        const element = IaFinanceGuide({ slug, locale });
        const page = doc(renderToStaticMarkup(await GuideFiscalPage(element.props)));
        expect(page.querySelectorAll("h1")).toHaveLength(1);
        const schema = JSON.parse(page.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
        const article = schema.find((s: { "@type": string }) => s["@type"] === "Article");
        expect(article.url).toBe("https://www.iteradvisors.com" + iaGuideHref(slug, locale));
        expect(article.inLanguage).toBe({ fr: "fr-FR", en: "en-GB", es: "es-ES" }[locale]);
        expect(article.author).not.toHaveProperty("name");
        expect(article.author["@id"]).toBe("https://www.iteradvisors.com/a-propos/benjamin-ziza#person");
        if (locale !== "fr") expect(article.datePublished).toBe("2026-10-02");
        const faq = schema.find((s: { "@type": string }) => s["@type"] === "FAQPage");
        expect([...page.querySelectorAll("#faq details")].map(d => ({ q: text(d.querySelector("h3")!), a: text(d.querySelector("p")!) }))).toEqual(faq.mainEntity.map((q: { name: string; acceptedAnswer: { text: string } }) => ({ q: q.name, a: q.acceptedAnswer.text })));
        for (const a of page.querySelectorAll('a[href^="#"]')) expect(page.getElementById(a.getAttribute("href")!.slice(1))).not.toBeNull();
        const hasKit = ["automatiser-reporting-financier", "chatgpt-finance"].includes(slug);
        expect(Boolean(page.getElementById("kit-reporting"))).toBe(hasKit);
        expect(Boolean(page.getElementById("calculateur-roi"))).toBe(slug === "automatiser-reporting-financier");
        if (hasKit && locale !== "fr") {
          expect(page.querySelector(`a[href="/downloads/reporting-kit-${locale}.zip"]`)).not.toBeNull();
          expect(page.querySelector(`a[href="/downloads/reporting-exercise-${locale}.csv"]`)).not.toBeNull();
          expect(page.querySelector("button")!.textContent).toBe(locale === "en" ? "Copy the prompt" : "Copiar el prompt");
        }
      }
    }
  });
  it("calculates net capacity, refuses nonpositive payback and invalid fields in all languages", () => {
    for (const locale of locales) {
      const { container, unmount } = render(<ReportingRoi locale={locale} />);
      expect(screen.getByRole("status").textContent).toContain("350");
      expect(screen.getByRole("status").textContent).toContain(locale === "en" ? "8.6" : "8,6");
      const fields = container.querySelectorAll("input");
      expect(fields).toHaveLength(5);
      for (const field of fields) expect(container.querySelector(`label[for="${field.id}"]`)).not.toBeNull();
      fireEvent.change(fields[1], { target: { value: "20" } });
      expect(screen.getByRole("status").textContent).toMatch(/Pas d’amortissement|No payback|Sin amortización/);
      fireEvent.change(fields[0], { target: { value: "" } });
      expect(screen.getByRole("status").textContent).toMatch(/Renseignez chaque champ|Enter a positive number|Introduce un número/);
      unmount();
    }
  });
  it("reports clipboard success and failure truthfully in the selected language", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    for (const locale of locales) {
      const { unmount } = render(<CopyPrompt locale={locale} text="A fictitious prompt" />);
      fireEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getByRole("status").textContent).toMatch(/copié|copied|copiado/));
      expect(writeText).toHaveBeenCalledWith("A fictitious prompt");
      writeText.mockRejectedValueOnce(new Error("Denied"));
      fireEvent.click(screen.getByRole("button"));
      await waitFor(() => expect(screen.getByRole("status").textContent).toMatch(/Copiez|Select and copy|Selecciona y copia/));
      unmount();
    }
  });
});
