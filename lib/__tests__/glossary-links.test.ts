import { describe, expect, it } from "vitest";
import { linkGlossaryTerms, htmlMentionsGlossary } from "../glossary-links";

describe("linkGlossaryTerms", () => {
  it("lie la première occurrence d'un terme, et seulement la première", () => {
    const out = linkGlossaryTerms("<p>L'EBITDA monte. L'EBITDA baisse.</p>");
    expect(out).toBe(
      '<p>L\'<a href="/ressources/glossaire/ebitda" class="glossary-link">EBITDA</a> monte. L\'EBITDA baisse.</p>',
    );
  });

  it("ne lie jamais dans un titre, un lien existant ou du code", () => {
    const html = '<h2>Calculer le BFR</h2><a href="/x">BFR ici</a><code>BFR</code><p>Le BFR final.</p>';
    const out = linkGlossaryTerms(html);
    expect(out).toContain("<h2>Calculer le BFR</h2>");
    expect(out).toContain('<a href="/x">BFR ici</a>');
    expect(out).toContain("<code>BFR</code>");
    expect(out).toContain('<p>Le <a href="/ressources/glossaire/besoin-fonds-roulement-bfr" class="glossary-link">BFR</a> final.</p>');
  });

  it("regroupe les variantes d'un même terme sur une seule fiche", () => {
    const out = linkGlossaryTerms("<p>Le burn rate fixe le runway.</p>");
    expect(out.match(/glossary-link/g)?.length).toBe(1);
    expect(out).toContain('glossaire/cash-burn-runway" class="glossary-link">burn rate</a>');
  });

  it("ne touche pas aux autres locales", () => {
    const html = "<p>EBITDA</p>";
    expect(linkGlossaryTerms(html, "en")).toBe(html);
  });

  it("plafonne le nombre de liens par article", () => {
    const html = "<p>EBITDA BFR churn runway CAC MRR run rate BSPCE</p>";
    expect(linkGlossaryTerms(html).match(/glossary-link/g)?.length ?? 0).toBeLessThanOrEqual(6);
  });
});

describe("htmlMentionsGlossary", () => {
  it("détecte un terme dans le texte mais pas dans les balises", () => {
    expect(htmlMentionsGlossary("<p>Notre MRR double.</p>", "arr-mrr")).toBe(true);
    expect(htmlMentionsGlossary('<img alt="EBITDA">', "ebitda")).toBe(false);
  });
});
