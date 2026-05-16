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
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
  "organiser-sa-direction-financiere",
] as const;

const ES_BLOG_SLUGS = [
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-externalise-vs-daf-salarie",
  "essentiels-outils-tech-finance",
  "externalisation-comptable",
  "flux-de-tresorerie",
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
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
  entries.push(
    ...entryAllLocales(
      { fr: "/services/gestion-financiere-externalisee", en: "/services/outsourced-financial-management", es: "/services/gestion-financiera-externalizada" },
      { priority: 0.8 }
    )
  );
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
  entries.push(
    ...entryAllLocales({ fr: "/ressources", en: "/ressources", es: "/ressources" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/blog", en: "/ressources/blog", es: "/ressources/blog" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/fiche-metier", en: "/ressources/fiche-metier", es: "/ressources/fiche-metier" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/glossaire", en: "/ressources/glossaire", es: "/ressources/glossaire" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/ressources/testimonials", en: "/ressources/testimonials", es: "/ressources/testimonials" })
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/outils", en: "/ressources/tools", es: "/ressources/herramientas" },
      { priority: 0.7 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/ressources/case-studies", en: "/ressources/case-studies", es: "/ressources/case-studies" },
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
  entries.push({
    url: `${BASE}/en/fractional-cfo-barcelona`,
    lastModified: TODAY,
    changeFrequency: "monthly",
    priority: 0.85,
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
    const path = `/ressources/blog/${slug}`;
    const languages: Record<string, string> = {};
    if (inFr) languages.fr = `${BASE}${path}`;
    if (inEn) languages.en = `${BASE}/en${path}`;
    if (inEs) languages.es = `${BASE}/es${path}`;
    // x-default = FR if available, otherwise the only available locale
    languages["x-default"] = inFr
      ? `${BASE}${path}`
      : inEn
        ? `${BASE}/en${path}`
        : `${BASE}/es${path}`;
    const common = {
      lastModified: TODAY,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages },
    };
    if (inFr) entries.push({ url: `${BASE}${path}`, ...common });
    if (inEn) entries.push({ url: `${BASE}/en${path}`, ...common });
    if (inEs) entries.push({ url: `${BASE}/es${path}`, ...common });
  }

  /* ── TICKET 5 — fiches outils ────────────────────────────────────── */
  for (const slug of TOOL_SLUGS) {
    const path = `/ressources/outils/${slug}`;
    entries.push(
      ...entryAllLocales(
        { fr: path, en: path, es: path },
        { priority: 0.7 }
      )
    );
  }

  /* ── TICKET 21 — pages glossaire dédiées ─────────────────────────── */
  for (const slug of GLOSSARY_SLUGS) {
    const path = `/ressources/glossaire/${slug}`;
    entries.push(
      ...entryAllLocales(
        { fr: path, en: path, es: path },
        { priority: 0.6 }
      )
    );
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
