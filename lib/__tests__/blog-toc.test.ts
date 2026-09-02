import { describe, expect, it } from "vitest";
import { extractToc, injectHeadingIds } from "../blog-toc";

describe("injectHeadingIds", () => {
  it("pose sur chaque titre l'id que extractToc dériverait", () => {
    const html =
      "<h2>Qui est concerné et quels sont les seuils ?</h2><p>…</p><h3>Délais &amp; sanctions</h3>";
    const out = injectHeadingIds(html);
    expect(out).toContain('<h2 id="qui-est-concerne-et-quels-sont-les-seuils">');
    expect(out).toContain('<h3 id="delais-amp-sanctions">');
    // Le sommaire lit les ids posés : chaque ancre existe dans le DOM.
    const toc = extractToc(out);
    expect(toc.map((h) => h.id)).toEqual([
      "qui-est-concerne-et-quels-sont-les-seuils",
      "delais-amp-sanctions",
    ]);
  });

  it("conserve les ids existants et dédoublonne les autres", () => {
    const html = '<h2 id="faq">FAQ</h2><h2>Délais</h2><h2>Délais</h2>';
    const out = injectHeadingIds(html);
    expect(out).toContain('<h2 id="faq">FAQ</h2>');
    expect(out).toContain('<h2 id="delais">Délais</h2>');
    expect(out).toContain('<h2 id="delais-2">Délais</h2>');
  });

  it("laisse intact le texte et les attributs", () => {
    const html = '<h2 class="x">Taux <em>2026</em></h2>';
    expect(injectHeadingIds(html)).toBe('<h2 id="taux-2026" class="x">Taux <em>2026</em></h2>');
  });
});
