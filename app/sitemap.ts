import type { MetadataRoute } from "next";

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

/* ── Blog slugs (only those with actual content in blog-posts.ts or Strapi) ── */
const BLOG_SLUGS = [
  /* Static blog posts (blog-posts.ts FR) */
  "flux-de-tresorerie",
  "la-modernisation-du-role-de-cfo",
  "les-10-outils-pour-les-cfos-en-start-up",
  "essentiels-outils-tech-finance",
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
  "organiser-sa-direction-financiere",
  /* Strapi blog posts */
  "levee-de-fonds-dilutif-vs-non-dilutif",
  "consequences-financieres-cyberattaques",
  "regimes-fiscaux-france-vs-espagne",
  "ia-act-opportunite-fintechs",
  "anticiper-financierement-ses-recrutements-guide-pratique",
  /* New articles (mars 2026 brief) */
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-externalise-vs-daf-salarie",
  "checklist-due-diligence-levee-de-fonds",
  "daf-drh-externalises-synergie",
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

  /* ── DAF Externalise ─────────────────────────────────────────────── */
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise", en: "/daf-outsourcing", es: "/externalizacion-daf" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/metier", en: "/daf-outsourcing/metier", es: "/externalizacion-daf/metier" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/temps-partage", en: "/daf-outsourcing/shared-time", es: "/externalizacion-daf/multipropiedad" },
      { priority: 0.9 }
    )
  );
  entries.push(
    ...entryAllLocales(
      { fr: "/daf-externalise/transition", en: "/daf-outsourcing/transition", es: "/externalizacion-daf/transition" },
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

  /* ── Pages institutionnelles ─────────────────────────────────────── */
  entries.push(
    ...entryAllLocales({ fr: "/a-propos", en: "/a-propos", es: "/quienes-somos" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/contact", en: "/contact", es: "/contact" })
  );
  entries.push(
    ...entryAllLocales({ fr: "/jobs", en: "/jobs", es: "/jobs" })
  );
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

  /* ── Landing page Fractional CFO Barcelona (EN-specific) ────────── */
  entries.push(
    entry(
      { fr: "/daf-externalise-barcelone", en: "/fractional-cfo-barcelona", es: "/cfo-externalizado-barcelona" },
      { priority: 0.85 }
    )
  );
  /* EN-only entry for fractional-cfo-barcelona */
  entries.push({
    url: `${BASE}/en/fractional-cfo-barcelona`,
    lastModified: TODAY,
    changeFrequency: "monthly",
    priority: 0.85,
    alternates: {
      languages: {
        fr: `${BASE}/daf-externalise-barcelone`,
        en: `${BASE}/en/fractional-cfo-barcelona`,
        es: `${BASE}/es/cfo-externalizado-barcelona`,
        "x-default": `${BASE}/daf-externalise-barcelone`,
      },
    },
  });

  /* ── Blog articles ───────────────────────────────────────────────── */
  for (const slug of BLOG_SLUGS) {
    const path = `/ressources/blog/${slug}`;
    entries.push(
      ...entryAllLocales(
        { fr: path, en: path, es: path },
        { priority: 0.6 }
      )
    );
  }

  return entries;
}
