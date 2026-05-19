import type { MetadataRoute } from "next";
import { getAuthorSlugs } from "@/lib/content/team";

const BASE = "https://www.iteradvisors.com";
const TODAY = new Date().toISOString().split("T")[0];

/* ── Helper: build a sitemap entry with hreflang alternates ────────── */
interface LocalizedPaths {
  fr: string;
  en: string;
  es: string;
}

function entry(
  paths: LocalizedPaths,
  opts: { changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number; lastModified?: string } = {}
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${paths.fr}`,
    lastModified: opts.lastModified ?? TODAY,
    changeFrequency: opts.changeFrequency ?? "monthly",
    priority: opts.priority ?? 0.7,
    alternates: {
      languages: {
        fr: `${BASE}${paths.fr}`,
        en: `${BASE}/en${paths.en === "/" ? "" : paths.en}`,
        es: `${BASE}/es${paths.es === "/" ? "" : paths.es}`,
        "x-default": `${BASE}${paths.fr}`,
      },
    },
  };
}

/* Also generate explicit EN and ES entries so search engines discover them */
function entryAllLocales(
  paths: LocalizedPaths,
  opts: { changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"]; priority?: number; lastModified?: string } = {}
): MetadataRoute.Sitemap {
  const alternates = {
    languages: {
      fr: `${BASE}${paths.fr}`,
      en: `${BASE}/en${paths.en === "/" ? "" : paths.en}`,
      es: `${BASE}/es${paths.es === "/" ? "" : paths.es}`,
      "x-default": `${BASE}${paths.fr}`,
    },
  };
  const common = {
    lastModified: opts.lastModified ?? TODAY,
    changeFrequency: opts.changeFrequency ?? ("monthly" as const),
    priority: opts.priority ?? 0.7,
    alternates,
  };
  return [
    { url: `${BASE}${paths.fr}`, ...common },
    { url: `${BASE}/en${paths.en === "/" ? "" : paths.en}`, ...common },
    { url: `${BASE}/es${paths.es === "/" ? "" : paths.es}`, ...common },
  ];
}

/* ── Blog slugs per locale ─────────────────────────────────────────────
 *
 * INDEX-02 (mai 2026) — Previously a single flat `BLOG_SLUGS` list was
 * looped × 3 locales, emitting ~90 URLs of which ~60 were 404s or
 * redirects because most articles only exist in FR. Google wasted its
 * crawl budget on dead URLs.
 *
 * Source of truth: `lib/content/blog-posts.ts` (per-locale dictionaries)
 * plus dedicated FR-only routes under `app/ressources/blog/<slug>/`.
 * Each slug appears ONLY in the locales where the article is reachable
 * via a real 200 response — no duplicates, no orphans. */
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

/* ── TICKET 5 — 9 nouvelles fiches outils ──────────────────────────── */
const TOOL_SLUGS = [
  /* Existing */
  "pennylane",
  "agicap",
  "spendesk",
  "payfit",
  /* New */
  "sage",
  "cegid-loop",
  "fygr",
  "pleo",
  "silae",
  "lucca",
  "qonto",
  "revolut-business",
  "payhawk",
];

/* ── TICKET 21 — 8 nouvelles pages glossaire dédiées ───────────────── */
const GLOSSARY_SLUGS = [
  "bfr",
  "ebitda",
  "cfo",
  /* New */
  "besoin-fonds-roulement-bfr",
  "cash-burn-runway",
  "cac-ltv",
  "arr-mrr",
  "churn-rate",
  "run-rate",
  "bspce-bsa",
];

/* ── TICKET 1 — 4 nouvelles pages services RH dédiées ──────────────── */
const HR_SERVICE_SLUGS = [
  "recrutement-talent-acquisition",
  "gestion-paie-charges-sociales",
  "formation-developpement",
  "conformite-droit-travail",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  /* ── Homepage ────────────────────────────────────────────────────── */
  entries.push(
    ...entryAllLocales(
      { fr: "/", en: "/", es: "/" },
      { changeFrequency: "weekly", priority: 1.0 }
    )
  );

  /* ── DAF Externalise — HARMO-01: EN canonical aligned on /fractional-cfo/* ── */
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise", en: "/fractional-cfo", es: "/externalizacion-daf" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/metier", en: "/fractional-cfo/metier", es: "/externalizacion-daf/metier" },
      { priority: 0.9 }
    )
  );
  /* COCON-02 — /daf-externalise/tarifs was live (200) but missing from sitemap */
  entries.push({
    url: `${BASE}/daf-externalise/tarifs`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  });
  /* SITEMAP-QA (2026-05-19) — /daf-externalise/secteurs was live (200) but missing.
   * No dedicated EN/ES equivalent: EN localizedPath points to /en/fractional-cfo
   * and /es/externalizacion-daf/sectores route does not exist yet.
   * Emitted FR-only; EN/ES can be added when those pages are built. */
  entries.push({
    url: `${BASE}/daf-externalise/secteurs`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  });
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/temps-partage", en: "/fractional-cfo/shared-time", es: "/externalizacion-daf/tiempo-compartido" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/transition", en: "/fractional-cfo/transition", es: "/externalizacion-daf/transition" },
      { priority: 0.9 }
    )
  );

  /* ── DRH Externalise ─────────────────────────────────────────────── */
  entries.push(
    ...entryAllLocales(
      { fr: "/drh-externalise", en: "/hr-outsourcing", es: "/externalizacion-rrhh" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/drh-externalise/temps-partage", en: "/hr-outsourcing/shared-time", es: "/externalizacion-rrhh/tiempo-compartido" },
      { priority: 0.9 }
    )
  );

  /* ── Services ────────────────────────────────────────────────────── */
  entries.push(
    ...entryAllLocales({ fr: "/services", en: "/services", es: "/services" })
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/previsionnel-tresorerie", en: "/services/cash-flow-forecast", es: "/services/prevision-tesoreria" },
      { priority: 0.8 }
    )
  );
  /* SITEMAP-FIX: EN "outsourced-financial-management" 308 → /en/fractional-cfo (vercel.json).
   * The EN canonical for gestion-financière is /en/fractional-cfo (already in sitemap).
   * Emit FR + ES only — no EN hreflang peer for this service page.
   *
   * SITEMAP-QA (2026-05-19) — Added FR↔ES alternates so Google can cluster the two
   * pages. EN intentionally excluded (EN URL permanently redirects to fractional-cfo).
   * Note: the FR page canonical (set in generateMetadata) points to
   * /services/controle-de-gestion-externalise per ticket F3; the canonical tag on the
   * page itself takes precedence for deduplication — emitting the URL here is still
   * correct so Googlebot discovers and processes it. */
  {
    const gfAlternates = {
      languages: {
        fr: `${BASE}/services/gestion-financiere-externalisee`,
        es: `${BASE}/es/services/gestion-financiera-externalizada`,
        "x-default": `${BASE}/services/gestion-financiere-externalisee`,
      },
    };
    entries.push(
      {
        url: `${BASE}/services/gestion-financiere-externalisee`,
        lastModified: TODAY,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: gfAlternates,
      },
      {
        url: `${BASE}/es/services/gestion-financiera-externalizada`,
        lastModified: TODAY,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: gfAlternates,
      },
    );
  }
  entries.push(
    ...entryAllLocales(
      { fr: "/services/accompagnement-levee-de-fond", en: "/services/fund-raising-support", es: "/services/soporte-financiacion" },
      { priority: 0.8 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/comptabilite-externalisation", en: "/services/outsource-your-accounting", es: "/services/externalizar-contabilidad" },
      { priority: 0.8 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/controle-de-gestion-externalise", en: "/services/outsourced-management-control", es: "/services/control-gestion-externalizado" },
      { priority: 0.8 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/services/ma-due-diligence", en: "/services/ma-due-diligence", es: "/services/ma-due-diligence" },
      { priority: 0.8 }
    )
  );

  /* ── Ressources ──────────────────────────────────────────────────── */
  /* SITEMAP-FIX: ES canonical for /ressources/ is /es/recursos/ (not /es/ressources/)
   * — next.config permanent catch-all: /es/ressources/* → /es/recursos/*.
   * Each entry below specifies the correct per-locale path explicitly. */
  entries.push(
    ...entryAllLocales({ fr: "/ressources", en: "/ressources", es: "/recursos" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/blog", en: "/ressources/blog", es: "/recursos/blog" })
  );
  /* SITEMAP-FIX: /ressources/fiche-metier removed — all 3 locales redirect:
   * FR → /daf-externalise/metier (already in sitemap), EN → 404 chain, ES → /es/recursos/fiche-metier.
   * The EN job-descriptions page (redirect destination) returns 404 — separate bug to fix. */
  entries.push(
    ...entryAllLocales({ fr: "/ressources/glossaire", en: "/ressources/glossaire", es: "/recursos/glossaire" })
  );
  /* SITEMAP-FIX: testimonials + case-studies both 308 → /ressources/cas-clients (UX-02 merge).
   * Emit the canonical URL directly; both old slugs are kept as 301 redirects only. */
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/cas-clients", en: "/ressources/cas-clients", es: "/recursos/cas-clients" },
      { priority: 0.7 }
    )
  );
  /* SITEMAP-FIX: /ressources/case-studies removed — 308 → /ressources/cas-clients (emitted above) */
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/outils", en: "/ressources/tools", es: "/recursos/herramientas" },
      { priority: 0.7 }
    )
  );
  // Named-clients page (GEO-5 from AI Visibility audit)
  entries.push(
    ...entryAllLocales(
      { fr: "/clients", en: "/clients", es: "/clients" },
      { priority: 0.8 }
    )
  );

  /* ── Pages institutionnelles ─────────────────────────────────────── */
  entries.push(
    ...entryAllLocales({ fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/contact", en: "/contact", es: "/contact" })
  );
  // /jobs pages are noindexed (TICKET-12) but included in sitemap for discovery
  entries.push(
    ...entryAllLocales({ fr: "/jobs", en: "/jobs", es: "/jobs" }, { priority: 0.5 })
  );

  /* HARMO-01 — `/en/fractional-cfo` is now the EN canonical of the DAF
   * triple emitted above (line ~153). The standalone entry that used to
   * live here (when EN canonical was `/en/daf-outsourcing`) is no longer
   * needed — keeping it would emit `/en/fractional-cfo` twice in the
   * sitemap. */
  entries.push(
    ...entryAllLocales({ fr: "/mentions-legales", en: "/legal-notice", es: "/aviso-legal" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/politique-de-confidentialite", en: "/privacy-policy", es: "/politica-de-privacidad" })
  );

  /* ── Pages locales DAF externalise ────────────────────────────── */
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-barcelone", en: "/outsourced-cfo-barcelona", es: "/cfo-externalizado-barcelona" },
      { priority: 0.8 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-paris", en: "/outsourced-cfo-paris", es: "/cfo-externalizado-paris" },
      { priority: 0.8 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise-toulouse", en: "/outsourced-cfo-toulouse", es: "/cfo-externalizado-toulouse" },
      { priority: 0.8 }
    )
  );

  /* ── EN-specific Fractional CFO Barcelona landing page ────────────
   *
   * Single sitemap entry, no FR duplicate. The audit (T-2) flagged that
   * /daf-externalise-barcelone was emitted twice — once via the
   * outsourced-cfo-barcelona entryAllLocales (which is the canonical
   * Barcelona triple) and once via a redundant entry() block here.
   * The FR URL is kept only on the canonical triple above; the EN
   * Fractional CFO landing self-references for hreflang (no FR claim,
   * since /daf-externalise-barcelone already maps EN → outsourced-cfo).
   */
  /* SITEMAP-QA (2026-05-19) — Added self-referencing EN hreflang so this standalone
   * EN landing is not treated as a hreflang orphan. No FR/ES equivalent page exists
   * (the Barcelona cluster /daf-externalise-barcelone↔outsourced-cfo-barcelona↔
   * cfo-externalizado-barcelona already covers FR/ES). */
  entries.push({
    url: `${BASE}/en/fractional-cfo-barcelona`,
    lastModified: TODAY,
    changeFrequency: "monthly" as const,
    priority: 0.85,
    alternates: {
      languages: {
        en: `${BASE}/en/fractional-cfo-barcelona`,
        "x-default": `${BASE}/en/fractional-cfo-barcelona`,
      },
    },
  });

  /* ── Blog articles ────────────────────────────────────────────────
   *
   * INDEX-02 — emit exactly one URL per locale-where-the-article-exists,
   * with hreflang alternates restricted to those same locales. Articles
   * available in more than one locale (e.g. flux-de-tresorerie in
   * FR/EN/ES) get a clean N-way hreflang group; FR-only articles emit
   * a single entry with no hreflang at all.
   */
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
    // next.config has a permanent catch-all: /es/ressources/* → /es/recursos/*
    const esUrl = `${BASE}/es/recursos/blog/${slug}`;
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
    const common = {
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages },
    };
    if (inFr) entries.push({ url: `${BASE}${frPath}`, ...common });
    if (inEn) entries.push({ url: `${BASE}/en${frPath}`, ...common });
    if (inEs) entries.push({ url: esUrl, ...common });
  }

  /* ── TICKET 5 — fiches outils ────────────────────────────────────── */
  /* SITEMAP-FIX: EN individual tool pages (/en/ressources/outils/[slug]) → 404 (no route).
   * ES individual tool pages (/es/ressources/outils/[slug]) → 308 then 404 (no ES route).
   * Emit FR only. The EN/ES tools hubs (/en/ressources/tools, /es/recursos/herramientas)
   * are already in the sitemap above and link to individual FR pages. */
  for (const slug of TOOL_SLUGS) {
    entries.push({
      url: `${BASE}/ressources/outils/${slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    });
  }

  /* ── TICKET 21 — pages glossaire dédiées ─────────────────────────── */
  /* SITEMAP-FIX: vercel.json has a catch-all redirect /ressources/glossaire/:slug →
   * /ressources/glossaire that was added BEFORE the dedicated [slug] routes were built.
   * The catch-all is removed below (vercel.json fix). EN/ES glossaire have no [slug]
   * routes — emit FR only. */
  for (const slug of GLOSSARY_SLUGS) {
    entries.push({
      url: `${BASE}/ressources/glossaire/${slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }

  /* ── TICKET 1 — pages services RH dédiées (FR uniquement pour l'instant) ── */
  for (const slug of HR_SERVICE_SLUGS) {
    entries.push({
      url: `${BASE}/services/${slug}`,
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    });
  }

  /* ── Author pages (May 2026 — design critique #11). Each founding
   *  partner with a populated multilingual bio gets a /[locale]/(about)/
   *  [slug] page with Person schema. Hreflang cluster: FR canonical at
   *  /a-propos/<slug>, EN at /en/a-propos/<slug>, ES at
   *  /es/quienes-somos/<slug>. */
  for (const slug of getAuthorSlugs()) {
    entries.push(
      ...entryAllLocales(
        {
          fr: `/a-propos/${slug}`,
          en: `/a-propos/${slug}`,
          es: `/quienes-somos/${slug}`,
        },
        { priority: 0.6 }
      )
    );
  }

  return entries;
}
