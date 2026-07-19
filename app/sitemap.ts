import type { MetadataRoute } from "next";
import { getAuthorSlugs } from "@/lib/content/team";
import { blogPosts } from "@/lib/content/blog-posts";

const BASE = "https://www.iteradvisors.com";

// ── Content-type lastModified dates ──────────────────────────────────────────
// Real per-content-type dates — NOT the build date.
// Google uses lastmod to prioritise recrawl scheduling. Setting "today" on
// every Vercel deploy trains Googlebot to ignore the signal entirely.
// Update each constant only when that category of content meaningfully changes.
const D = {
  homepage:      "2026-05-19", // illustrations + sitemap refresh
  pillar:        "2026-05-17", // DAF / DRH pillar pages — last major copy update
  service:       "2026-05-17", // /services/* — last content update
  local:         "2026-05-17", // geo pages (Barcelona, Paris, Toulouse)
  institutional: "2026-03-01", // a-propos, contact, legal — stable
  tools:         "2026-04-01", // tool sheets built ~April
  glossary:      "2026-04-15", // glossary terms built ~April
  author:        "2026-05-17", // Person schema + author bio pages added
  jobs:          "2026-04-01", // noindexed but discoverable (TICKET-12)
  fiscalite:     "2026-05-31", // Fiscalité Espagne France cocoon — initial publication
} as const;

// ── Helpers ───────────────────────────────────────────────────────────────────
interface LocalizedPaths {
  fr: string;
  en: string;
  es: string;
}

function buildAlternates(paths: LocalizedPaths) {
  return {
    languages: {
      fr:          `${BASE}${paths.fr}`,
      en:          `${BASE}/en${paths.en === "/" ? "" : paths.en}`,
      es:          `${BASE}/es${paths.es === "/" ? "" : paths.es}`,
      "x-default": `${BASE}${paths.fr}`,
    },
  };
}

/** Single FR-canonical URL with hreflang alternates.
 *  Use when one or more locales don't have a page, so we declare the
 *  EN/ES counterparts only in alternates (not as separate sitemap entries). */
function entry(
  paths: LocalizedPaths,
  lastModified: string
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${paths.fr}`,
    lastModified,
    alternates: buildAlternates(paths),
  };
}

/** Three explicit URL entries (FR + EN + ES) sharing the same hreflang cluster.
 *  Use when all three locales return a real HTTP 200. */
function entryAllLocales(
  paths: LocalizedPaths,
  lastModified: string
): MetadataRoute.Sitemap {
  const alternates = buildAlternates(paths);
  return [
    { url: `${BASE}${paths.fr}`,                                    lastModified, alternates },
    { url: `${BASE}/en${paths.en === "/" ? "" : paths.en}`,         lastModified, alternates },
    { url: `${BASE}/es${paths.es === "/" ? "" : paths.es}`,         lastModified, alternates },
  ];
}

/** Real publication date per blog slug, falling back to tools date.
 *  Avoids emitting TODAY for articles that haven't changed since publish. */
function blogModified(slug: string): string {
  return (
    blogPosts.fr[slug]?.publishedDate ??
    blogPosts.en[slug]?.publishedDate ??
    blogPosts.es[slug]?.publishedDate ??
    D.tools
  );
}

// ── Blog slugs per locale ─────────────────────────────────────────────────────
//
// INDEX-02 (mai 2026) — Previously a single flat BLOG_SLUGS list was looped
// × 3 locales, emitting ~90 URLs of which ~60 were 404s or redirects. Each
// slug appears ONLY in the locales where the article returns a real 200.
const FR_BLOG_SLUGS = [
  /* From lib/content/blog-posts.ts (fr section) */
  "agicap-vs-fygr-outil-tresorerie",
  "cas-etude-happy-scribe",
  "cash-burn-calculer-runway-anticiper-levee",
  "checklist-due-diligence-levee-de-fonds",
  "cout-daf-externalise-2026-tarifs-par-mission",
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-drh-externalises-synergie",
  "daf-externalise-barcelone-guide-startups-espagnoles",
  "daf-externalise-vs-daf-salarie",
  "daf-externalise-vs-expert-comptable",
  "data-room-checklist-levee-de-fonds",
  "drh-externalise-quand-et-pourquoi",
  "due-diligence-financiere-investisseurs",
  "externalisation-comptable",
  "externaliser-comptabilite-guide",
  "flux-de-tresorerie",
  "impot-revenu-espagne",
  "la-modernisation-du-role-de-cfo",
  "payfit-vs-silae-comparatif-pme",
  "pennylane-vs-sage-comparatif-40-deploiements",
  "quand-embaucher-daf-externalise-5-signes",
  "reduire-bfr-7-leviers-actionnables",
  "stack-financier-saas-series-a",
  "tableau-de-bord-financier-startup-12-kpis",
  "term-sheet-negocier-clauses-cles",
  /* Dedicated FR-only routes under app/ressources/blog/<slug>/ */
  "les-10-outils-pour-cfos-startup",
  "daf-externalise-guide",
  "levee-de-fonds-guide",
  "ia-et-automatisation-des-taches-repetitives",
  "regimes-fiscaux-france-vs-espagne",
  // T8 (2026-06-07) — new article ciblant "coût externalisation comptable"
  "cout-externalisation-comptable-2026",
  // T#5 (2026-07-13) — article hub comparatif "DAF externalisé vs alternatives"
  "daf-externalise-vs-alternatives",
] as const;

const EN_BLOG_SLUGS = [
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-externalise-vs-daf-salarie",
  "essentiels-outils-tech-finance",
  "externalisation-comptable",
  "flux-de-tresorerie",
  // SITEMAP-FIX: removed — next.config redirects /en/…/organiser-sa-direction-financiere → blog index
  // SITEMAP-FIX: removed — vercel.json redirects /en/…/ia-et-automatisation-… → blog index
] as const;

const ES_BLOG_SLUGS = [
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-externalise-vs-daf-salarie",
  "essentiels-outils-tech-finance",
  "externalisation-comptable",
  "flux-de-tresorerie",
  // SITEMAP-FIX: removed — vercel.json redirects /es/…/ia-et-automatisation-… → blog index
  "organiser-sa-direction-financiere",
  "que-es-fractional-cfo",
] as const;

// ── Tool pages (FR-only — EN/ES tool pages return 404) ────────────────────────
const TOOL_SLUGS = [
  "pennylane", "agicap", "spendesk", "payfit",
  "sage", "cegid-loop", "fygr", "pleo", "silae",
  "lucca", "qonto", "revolut-business", "payhawk",
];

// ── Glossary pages (FR-only — EN/ES glossary have no [slug] routes) ───────────
// SITEMAP-QA (2026-05-19) — "bfr" removed: it duplicates "besoin-fonds-roulement-bfr"
// (both map to the same concept). A 301 redirect is added in next.config.ts so
// existing backlinks and internal links to /ressources/glossaire/bfr don't break.
const GLOSSARY_SLUGS = [
  "ebitda",
  "cfo",
  "besoin-fonds-roulement-bfr",
  "cash-burn-runway",
  "cac-ltv",
  "arr-mrr",
  "churn-rate",
  "run-rate",
  "bspce-bsa",
];

// ── HR service pages (FR-only for now) ───────────────────────────────────────
const HR_SERVICE_SLUGS = [
  "recrutement-talent-acquisition",
  "gestion-paie-charges-sociales",
  "formation-developpement",
  "conformite-droit-travail",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // ── Homepage ──────────────────────────────────────────────────────────────
  entries.push(
    ...entryAllLocales({ fr: "/", en: "/", es: "/" }, D.homepage)
  );

  // ── DAF Externalise ───────────────────────────────────────────────────────
  // HARMO-01: EN canonical aligned on /fractional-cfo/*, ES on /externalizacion-daf/*
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise", en: "/fractional-cfo", es: "/externalizacion-daf" },
      D.pillar
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/metier", en: "/fractional-cfo/metier", es: "/externalizacion-daf/metier" },
      D.pillar
    )
  );
  // tarifs — FR-only (no EN/ES equivalent page exists yet)
  entries.push({
    url: `${BASE}/daf-externalise/tarifs`,
    lastModified: D.pillar,
  });
  // secteurs — FR-only (SITEMAP-QA 2026-05-19: was missing from sitemap)
  // EN localizedPath points to /en/fractional-cfo; /es/externalizacion-daf/sectores not built yet.
  entries.push({
    url: `${BASE}/daf-externalise/secteurs`,
    lastModified: D.pillar,
  });
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/temps-partage", en: "/fractional-cfo/shared-time", es: "/externalizacion-daf/tiempo-compartido" },
      D.pillar
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/transition", en: "/fractional-cfo/transition", es: "/externalizacion-daf/transition" },
      D.pillar
    )
  );

  // ── DRH Externalise ───────────────────────────────────────────────────────
  entries.push(
    ...entryAllLocales(
      { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
      D.pillar
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/drh-externalise/temps-partage", en: "/hr-outsourcing/shared-time", es: "/externalizacion-rrhh/tiempo-compartido" },
      D.pillar
    )
  );

  // ── Services ──────────────────────────────────────────────────────────────
  entries.push(
    ...entryAllLocales({ fr: "/services", en: "/services", es: "/services" }, D.service)
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/previsionnel-tresorerie", en: "/services/cash-flow-forecast", es: "/services/prevision-tesoreria" },
      D.service
    )
  );

  // SITEMAP-FIX: EN "outsourced-financial-management" 308 → /en/fractional-cfo.
  // Emit FR + ES only. SITEMAP-QA (2026-05-19): mutual alternates added so
  // Google can cluster FR↔ES (EN intentionally excluded).
  // Note: the FR page canonical (ticket F3) points to controle-de-gestion-externalise;
  // the canonical tag on the page takes precedence — emitting the URL here is still
  // correct so Googlebot discovers and processes it.
  {
    const gfAlternates = {
      languages: {
        fr:          `${BASE}/services/gestion-financiere-externalisee`,
        es:          `${BASE}/es/services/gestion-financiera-externalizada`,
        "x-default": `${BASE}/services/gestion-financiere-externalisee`,
      },
    };
    entries.push(
      {
        url: `${BASE}/services/gestion-financiere-externalisee`,
        lastModified: D.service,
        alternates: gfAlternates,
      },
      {
        url: `${BASE}/es/services/gestion-financiera-externalizada`,
        lastModified: D.service,
        alternates: gfAlternates,
      },
    );
  }

  entries.push(
    ...entryAllLocales(
      { fr: "/services/accompagnement-levee-de-fond", en: "/services/fund-raising-support", es: "/services/soporte-financiacion" },
      D.service
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/comptabilite-externalisation", en: "/services/outsource-your-accounting", es: "/services/externalizar-contabilidad" },
      D.service
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/controle-de-gestion-externalise", en: "/services/outsourced-management-control", es: "/services/control-gestion-externalizado" },
      D.service
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/ma-due-diligence", en: "/services/ma-due-diligence", es: "/services/ma-due-diligence" },
      D.service
    )
  );

  // ── Ressources ────────────────────────────────────────────────────────────
  // SITEMAP-FIX: ES canonical for /ressources/ is /es/recursos/ — explicit per-locale paths below.
  entries.push(
    ...entryAllLocales({ fr: "/ressources", en: "/ressources", es: "/recursos" }, D.institutional)
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/blog", en: "/ressources/blog", es: "/recursos/blog" }, D.institutional)
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/glossaire", en: "/ressources/glossaire", es: "/recursos/glossaire" },
      D.glossary
    )
  );
  // SITEMAP-FIX: testimonials + case-studies both 308 → /ressources/cas-clients.
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/cas-clients", en: "/ressources/cas-clients", es: "/recursos/cas-clients" },
      D.institutional
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/outils", en: "/ressources/tools", es: "/recursos/herramientas" },
      D.tools
    )
  );
  // Fiscalité Espagne France cocoon — FR-only (no EN/ES equivalents yet).
  // Hub + 1 pillar (Résidence fiscale) shipped 2026-05-31; the 13 remaining
  // pillar/satellite URLs will be added here as each page ships.
  entries.push({
    url: `${BASE}/ressources/fiscalite-espagne-france`,
    lastModified: D.fiscalite,
  });
  entries.push({
    url: `${BASE}/ressources/fiscalite/residence-fiscale-france-espagne`,
    lastModified: D.fiscalite,
  });
  // Piliers 2-5 shipped 2026-05-31 (ticket: complete fiscalite cocoon).
  entries.push({
    url: `${BASE}/ressources/fiscalite/double-imposition-france-espagne`,
    lastModified: D.fiscalite,
  });
  entries.push({
    url: `${BASE}/ressources/fiscalite/impot-revenu-espagne`,
    lastModified: D.fiscalite,
  });
  entries.push({
    url: `${BASE}/ressources/fiscalite/beckham-law`,
    lastModified: D.fiscalite,
  });
  entries.push({
    url: `${BASE}/ressources/fiscalite/modelo-720`,
    lastModified: D.fiscalite,
  });
  // Named-clients page (GEO-5 from AI Visibility audit)
  entries.push(
    ...entryAllLocales(
      { fr: "/clients", en: "/clients", es: "/clients" },
      D.institutional
    )
  );

  // ── Pages institutionnelles ───────────────────────────────────────────────
  entries.push(
    ...entryAllLocales({ fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" }, D.institutional)
  );
  entries.push(
    ...entryAllLocales({ fr: "/contact", en: "/contact", es: "/contact" }, D.institutional)
  );
  // /jobs is noindexed (TICKET-12) but included for discovery
  entries.push(
    ...entryAllLocales({ fr: "/jobs", en: "/jobs", es: "/jobs" }, D.jobs)
  );
  entries.push(
    ...entryAllLocales({ fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" }, D.institutional)
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/politique-de-confidentialite", en: "/privacy-policy", es: "/politica-de-privacidad" },
      D.institutional
    )
  );

  // ── Pages locales DAF ─────────────────────────────────────────────────────
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-barcelone", en: "/outsourced-cfo-barcelona", es: "/cfo-externalizado-barcelona" },
      D.local
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-paris", en: "/outsourced-cfo-paris", es: "/cfo-externalizado-paris" },
      D.local
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-toulouse", en: "/outsourced-cfo-toulouse", es: "/cfo-externalizado-toulouse" },
      D.local
    )
  );

  // Standalone EN Barcelona landing — self-referencing hreflang so Googlebot
  // doesn't treat this as a hreflang orphan. No FR/ES equivalent page exists.
  // (The Barcelona cluster daf-externalise-barcelone↔outsourced-cfo-barcelona↔
  // cfo-externalizado-barcelona already covers FR/ES geo signals.)
  // SITEMAP-QA (2026-05-19): alternates added.
  entries.push({
    url: `${BASE}/en/fractional-cfo-barcelona`,
    lastModified: D.local,
    alternates: {
      languages: {
        en:          `${BASE}/en/fractional-cfo-barcelona`,
        "x-default": `${BASE}/en/fractional-cfo-barcelona`,
      },
    },
  });

  // ── Blog articles ─────────────────────────────────────────────────────────
  //
  // INDEX-02 — emit exactly one URL per locale-where-the-article-exists,
  // with hreflang alternates restricted to those same locales.
  // lastModified uses the real publishedDate from blog-posts.ts (not build date).
  const frSet = new Set<string>(FR_BLOG_SLUGS);
  const enSet = new Set<string>(EN_BLOG_SLUGS);
  const esSet = new Set<string>(ES_BLOG_SLUGS);
  const allSlugs = new Set<string>([
    ...FR_BLOG_SLUGS,
    ...EN_BLOG_SLUGS,
    ...ES_BLOG_SLUGS,
  ]);

  for (const slug of allSlugs) {
    const inFr = frSet.has(slug);
    const inEn = enSet.has(slug);
    const inEs = esSet.has(slug);
    const frPath = `/ressources/blog/${slug}`;
    // SITEMAP-FIX: ES canonical blog path is /es/recursos/blog/ (not /es/ressources/blog/)
    const esUrl = `${BASE}/es/recursos/blog/${slug}`;
    const lastModified = blogModified(slug);

    const languages: Record<string, string> = {};
    if (inFr) languages.fr = `${BASE}${frPath}`;
    if (inEn) languages.en = `${BASE}/en${frPath}`;
    if (inEs) languages.es = esUrl;
    // x-default = FR if available, otherwise the only available locale
    languages["x-default"] = inFr
      ? `${BASE}${frPath}`
      : inEn
        ? `${BASE}/en${frPath}`
        : esUrl;

    const common = { lastModified, alternates: { languages } };
    if (inFr) entries.push({ url: `${BASE}${frPath}`, ...common });
    if (inEn) entries.push({ url: `${BASE}/en${frPath}`, ...common });
    if (inEs) entries.push({ url: esUrl, ...common });
  }

  // ── Tool sheets (FR-only) ─────────────────────────────────────────────────
  // SITEMAP-FIX: EN/ES tool pages return 404 (no route). FR only.
  for (const slug of TOOL_SLUGS) {
    entries.push({
      url: `${BASE}/ressources/outils/${slug}`,
      lastModified: D.tools,
    });
  }

  // ── Glossary terms (FR-only) ──────────────────────────────────────────────
  // SITEMAP-FIX: EN/ES glossary have no [slug] routes — FR only.
  // "bfr" removed (duplicate of "besoin-fonds-roulement-bfr") — 301 in next.config.ts.
  for (const slug of GLOSSARY_SLUGS) {
    entries.push({
      url: `${BASE}/ressources/glossaire/${slug}`,
      lastModified: D.glossary,
    });
  }

  // ── HR service pages (FR-only) ────────────────────────────────────────────
  for (const slug of HR_SERVICE_SLUGS) {
    entries.push({
      url: `${BASE}/services/${slug}`,
      lastModified: D.service,
    });
  }

  // ── Author pages ──────────────────────────────────────────────────────────
  // Hreflang cluster: FR /a-propos/<slug>, EN /en/a-propos/<slug>, ES /es/quienes-somos/<slug>.
  for (const slug of getAuthorSlugs()) {
    entries.push(
      ...entryAllLocales(
        { fr: `/a-propos/${slug}`, en: `/a-propos/${slug}`, es: `/quienes-somos/${slug}` },
        D.author
      )
    );
  }

  return entries;
}
