import { describe, expect, it } from "vitest";
import {
  aboutHref,
  blogHref,
  caseStudiesHref,
  dafClusterHref,
  drhClusterHref,
  getLocalizedPath,
  glossaryHref,
  resolveBlogArticleHref,
  resourcesHref,
  serviceHref,
  toolsHref,
} from "@/lib/path-localization";

/**
 * Garde de non-régression sur les chemins localisés.
 *
 * SEO-ULT §4b (2026-08-15) — ces fonctions décident de la destination de
 * milliers de liens internes, et leurs erreurs sont invisibles à la lecture du
 * code : le sélecteur de langue calcule son URL dans le navigateur, et les
 * cartes d'articles assemblent la leur à l'exécution. Un crawl de la
 * production avait relevé 102 liens vers des redirections, tous issus d'une
 * poignée de compositions fausses — `/es/ressources/…` au lieu de
 * `/es/recursos/…`, `/en/a-propos/…` au lieu de `/en/about/…`, le slug anglais
 * d'un service servi à l'espagnol.
 *
 * Chaque valeur attendue ci-dessous a été vérifiée en production : elle répond
 * 200 sans redirection. Un test qui échoue ici signale une URL qui partira en
 * 3xx sur le site réel.
 */

describe("racines localisées", () => {
  it("l'espagnol dit recursos, pas ressources", () => {
    expect(resourcesHref("fr")).toBe("/ressources");
    expect(resourcesHref("en")).toBe("/en/ressources");
    expect(resourcesHref("es")).toBe("/es/recursos");
  });

  it("la page équipe s'appelle about en anglais", () => {
    expect(aboutHref("fr", "benjamin-ziza")).toBe("/a-propos/benjamin-ziza");
    expect(aboutHref("en", "benjamin-ziza")).toBe("/en/about/benjamin-ziza");
    expect(aboutHref("es", "benjamin-ziza")).toBe("/es/quienes-somos/benjamin-ziza");
  });

  it("glossaire, outils et cas clients suivent la langue", () => {
    expect(glossaryHref("es")).toBe("/es/recursos/glosario");
    expect(toolsHref("es")).toBe("/es/recursos/herramientas");
    expect(toolsHref("en")).toBe("/en/ressources/tools");
    expect(caseStudiesHref("es")).toBe("/es/recursos/casos-de-exito");
    expect(caseStudiesHref("en")).toBe("/en/ressources/cas-clients");
  });

  it("les articles de blog vivent sous la racine de leur langue", () => {
    expect(blogHref("es", "que-es-fractional-cfo")).toBe("/es/recursos/blog/que-es-fractional-cfo");
    expect(blogHref("en", "flux-de-tresorerie")).toBe("/en/ressources/blog/flux-de-tresorerie");
  });
});

describe("services et clusters", () => {
  it("chaque service porte le slug de sa langue", () => {
    expect(serviceHref("accompagnement-levee-de-fond", "fr")).toBe(
      "/services/accompagnement-levee-de-fond",
    );
    expect(serviceHref("accompagnement-levee-de-fond", "en")).toBe(
      "/en/services/fund-raising-support",
    );
    // C'est ici que les pages villes ES envoyaient vers le slug anglais.
    expect(serviceHref("accompagnement-levee-de-fond", "es")).toBe(
      "/es/services/soporte-financiacion",
    );
    expect(serviceHref("controle-de-gestion-externalise", "es")).toBe(
      "/es/services/control-gestion-externalizado",
    );
    expect(serviceHref("previsionnel-tresorerie", "es")).toBe("/es/services/prevision-tesoreria");
  });

  it("le cluster DAF n'expose jamais /en/daf-externalise", () => {
    expect(dafClusterHref("", "en")).toBe("/en/fractional-cfo");
    expect(dafClusterHref("", "es")).toBe("/es/externalizacion-daf");
    expect(dafClusterHref("temps-partage", "en")).toBe("/en/fractional-cfo/shared-time");
    expect(dafClusterHref("temps-partage", "es")).toBe("/es/externalizacion-daf/tiempo-compartido");
    expect(dafClusterHref("metier", "en")).toBe("/en/fractional-cfo/role");
    expect(dafClusterHref("metier", "es")).toBe("/es/externalizacion-daf/funciones");
  });

  it("le cluster DRH suit la même règle", () => {
    expect(drhClusterHref("temps-partage", "en")).toBe("/en/hr-outsourcing/shared-time");
    expect(drhClusterHref("temps-partage", "es")).toBe("/es/externalizacion-rrhh/tiempo-compartido");
  });
});

describe("sélecteur de langue", () => {
  it("bascule un article de blog sans changer de rubrique", () => {
    expect(getLocalizedPath("/ressources/blog/flux-de-tresorerie", "es")).toBe(
      "/es/recursos/blog/flux-de-tresorerie",
    );
    expect(getLocalizedPath("/es/recursos/blog/flux-de-tresorerie", "fr")).toBe(
      "/ressources/blog/flux-de-tresorerie",
    );
  });

  it("bascule une fiche membre vers la bonne racine", () => {
    expect(getLocalizedPath("/a-propos/benjamin-ziza", "en")).toBe("/en/about/benjamin-ziza");
    expect(getLocalizedPath("/en/about/benjamin-ziza", "es")).toBe("/es/quienes-somos/benjamin-ziza");
    expect(getLocalizedPath("/es/quienes-somos/benjamin-ziza", "fr")).toBe(
      "/a-propos/benjamin-ziza",
    );
  });

  it("envoie les fiches métier vers le cluster DAF, qui les a absorbées", () => {
    expect(getLocalizedPath("/ressources/fiche-metier", "en")).toBe("/en/fractional-cfo/role");
    expect(getLocalizedPath("/ressources/fiche-metier/directeur-financier", "es")).toBe(
      "/es/externalizacion-daf/funciones",
    );
  });

  it("traduit glossaire, outils et cas clients", () => {
    expect(getLocalizedPath("/ressources/glossaire/ebitda", "es")).toBe(
      "/es/recursos/glosario/ebitda",
    );
    expect(getLocalizedPath("/ressources/outils", "es")).toBe("/es/recursos/herramientas");
    expect(getLocalizedPath("/ressources/cas-clients", "es")).toBe("/es/recursos/casos-de-exito");
    expect(getLocalizedPath("/es/recursos/casos-de-exito", "fr")).toBe("/ressources/cas-clients");
  });

  it("laisse le chemin inchangé quand la langue ne change pas", () => {
    expect(getLocalizedPath("/es/recursos/blog", "es")).toBe("/es/recursos/blog");
  });
});

describe("articles sans URL propre dans leur langue", () => {
  it("écarte les slugs fusionnés plutôt que de pointer vers une redirection", () => {
    // Ces quatre-là 308 vers un canonique déjà listé : app/sitemap.ts les
    // avait retirés, le listing continuait de les proposer.
    expect(resolveBlogArticleHref("fr", "externaliser-comptabilite-guide")).toBeNull();
    expect(resolveBlogArticleHref("fr", "cout-daf-externalise-2026-tarifs-par-mission")).toBeNull();
    expect(resolveBlogArticleHref("fr", "data-room-checklist-levee-de-fonds")).toBeNull();
    expect(resolveBlogArticleHref("fr", "due-diligence-financiere-investisseurs")).toBeNull();
  });

  it("suit les articles déplacés vers la section fiscalité", () => {
    expect(resolveBlogArticleHref("fr", "modelo-720-declaration-biens-etranger")).toBe(
      "/ressources/fiscalite/modelo-720",
    );
    expect(resolveBlogArticleHref("fr", "double-imposition-france-espagne-convention")).toBe(
      "/ressources/fiscalite/double-imposition-france-espagne",
    );
  });

  it("renvoie vers le français les traductions retirées de la circulation", () => {
    expect(resolveBlogArticleHref("en", "essentiels-outils-tech-finance")).toBe(
      "/ressources/blog/essentiels-outils-tech-finance",
    );
    expect(resolveBlogArticleHref("es", "organiser-sa-direction-financiere")).toBe(
      "/ressources/blog/organiser-sa-direction-financiere",
    );
  });

  it("écarte les doublons de slug entre langues", () => {
    // La version EN vit sous `fractional-cfo-cost-services-2026`, déjà listée.
    expect(resolveBlogArticleHref("en", "cout-daf-externalise-tarifs-prix-2026")).toBeNull();
    expect(resolveBlogArticleHref("es", "cout-daf-externalise-tarifs-prix-2026")).toBeNull();
  });

  it("laisse passer un article publié normalement", () => {
    expect(resolveBlogArticleHref("fr", "flux-de-tresorerie")).toBe(
      "/ressources/blog/flux-de-tresorerie",
    );
    expect(resolveBlogArticleHref("es", "que-es-fractional-cfo")).toBe(
      "/es/recursos/blog/que-es-fractional-cfo",
    );
  });
});

/**
 * SEO-AUD-0824 §2 — le hreflang souffrait du même mal que les liens internes :
 * des URL composées à la main, qui vieillissaient sans que rien ne le signale.
 * L'audit du 24 août a relevé 59 balises visant une redirection.
 */
describe("hreflang des articles de blog", () => {
  it("n'annonce pas de traduction là où l'article n'existe pas", async () => {
    const { blogHreflangDisabled } = await import("@/lib/blog-hreflang");
    // Article publié seulement en français : les URL /en/… et /es/… existent
    // sous forme de redirections vers lui, ce qui n'en fait pas des traductions.
    expect(blogHreflangDisabled("agicap-vs-fygr-outil-tresorerie").sort()).toEqual(["en", "es"]);
    expect(blogHreflangDisabled("term-sheet-negocier-clauses-cles").sort()).toEqual(["en", "es"]);
  });

  it("garde les trois langues quand les trois versions existent", async () => {
    const { blogHreflangDisabled } = await import("@/lib/blog-hreflang");
    expect(blogHreflangDisabled("flux-de-tresorerie")).toEqual([]);
    expect(blogHreflangDisabled("daf-externalise-vs-daf-salarie")).toEqual([]);
  });

  it("écarte une traduction écrite mais redirigée vers le français", async () => {
    const { blogHreflangDisabled } = await import("@/lib/blog-hreflang");
    // Le contenu EN/ES existe dans blogPosts, mais les deux URL redirigent
    // vers l'article français : ce ne sont pas des pages à elles.
    expect(blogHreflangDisabled("essentiels-outils-tech-finance").sort()).toEqual(["en", "es"]);
  });

  it("écarte le français pour un article qui n'existe qu'en espagnol", async () => {
    const { blogHreflangDisabled } = await import("@/lib/blog-hreflang");
    expect(blogHreflangDisabled("que-es-fractional-cfo")).toContain("fr");
    expect(blogHreflangDisabled("que-es-fractional-cfo")).toContain("en");
  });
});

describe("hreflang des pages service", () => {
  it("isole le service dont les trois pages ne sont pas des traductions", async () => {
    const { serviceHreflangDisabled } = await import("@/lib/strapi");
    expect(serviceHreflangDisabled("gestion-financiere-externalisee", "fr").sort()).toEqual([
      "en",
      "es",
    ]);
    expect(serviceHreflangDisabled("gestion-financiere-externalisee", "es").sort()).toEqual([
      "en",
      "fr",
    ]);
  });

  it("laisse intacts les services réellement traduits", async () => {
    const { serviceHreflangDisabled } = await import("@/lib/strapi");
    expect(serviceHreflangDisabled("previsionnel-tresorerie", "fr")).toEqual([]);
    expect(serviceHreflangDisabled("accompagnement-levee-de-fond", "es")).toEqual([]);
  });
});
