import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* ------------------------------------------------------------------ */
/*  Slug mappings between locales                                      */
/* ------------------------------------------------------------------ */

const SLUG_REDIRECTS: Record<string, string> = {
  /* ── FR slugs appearing in /en/ paths ─────────────────────────────── */
  "/en/daf-externalise": "/en/daf-outsourcing",
  "/en/daf-externalise/metier": "/en/daf-outsourcing/metier",
  "/en/daf-externalise/temps-partage": "/en/daf-outsourcing/shared-time",
  "/en/daf-externalise/transition": "/en/daf-outsourcing/transition",
  "/en/daf-externalise-barcelone": "/en/outsourced-cfo-barcelona",
  "/en/daf-externalise-paris": "/en/outsourced-cfo-paris",
  "/en/daf-externalise-toulouse": "/en/outsourced-cfo-toulouse",
  "/en/drh-externalise": "/en/hr-outsourcing",
  "/en/drh-externalise/temps-partage": "/en/hr-outsourcing/shared-time",
  "/en/mentions-legales": "/en/legal-notice",
  "/en/politique-de-confidentialite": "/en/privacy-policy",

  /* ── ES slugs appearing in /en/ paths ─────────────────────────────── */
  "/en/externalizacion-daf": "/en/daf-outsourcing",
  "/en/externalizacion-daf/metier": "/en/daf-outsourcing/metier",
  "/en/externalizacion-daf/multipropiedad": "/en/daf-outsourcing/shared-time",
  "/en/externalizacion-daf/transition": "/en/daf-outsourcing/transition",
  "/en/externalizacion-rrhh": "/en/hr-outsourcing",
  "/en/externalizacion-rrhh/tiempo-compartido": "/en/hr-outsourcing/shared-time",
  "/en/cfo-externalizado-barcelona": "/en/outsourced-cfo-barcelona",
  "/en/cfo-externalizado-paris": "/en/outsourced-cfo-paris",
  "/en/cfo-externalizado-toulouse": "/en/outsourced-cfo-toulouse",
  "/en/aviso-legal": "/en/legal-notice",
  "/en/politica-de-privacidad": "/en/privacy-policy",
  "/en/quienes-somos": "/en/a-propos",

  /* ── FR slugs appearing in /es/ paths ─────────────────────────────── */
  "/es/daf-externalise": "/es/externalizacion-daf",
  "/es/daf-externalise/metier": "/es/externalizacion-daf/metier",
  "/es/daf-externalise/temps-partage": "/es/externalizacion-daf/multipropiedad",
  "/es/daf-externalise/transition": "/es/externalizacion-daf/transition",
  "/es/daf-externalise-barcelone": "/es/cfo-externalizado-barcelona",
  "/es/daf-externalise-paris": "/es/cfo-externalizado-paris",
  "/es/daf-externalise-toulouse": "/es/cfo-externalizado-toulouse",
  "/es/drh-externalise": "/es/externalizacion-rrhh",
  "/es/drh-externalise/temps-partage": "/es/externalizacion-rrhh/tiempo-compartido",
  "/es/mentions-legales": "/es/aviso-legal",
  "/es/politique-de-confidentialite": "/es/politica-de-privacidad",
  "/es/a-propos": "/es/quienes-somos",

  /* ── EN slugs appearing in /es/ paths ─────────────────────────────── */
  "/es/daf-outsourcing": "/es/externalizacion-daf",
  "/es/daf-outsourcing/metier": "/es/externalizacion-daf/metier",
  "/es/daf-outsourcing/shared-time": "/es/externalizacion-daf/multipropiedad",
  "/es/daf-outsourcing/transition": "/es/externalizacion-daf/transition",
  "/es/hr-outsourcing": "/es/externalizacion-rrhh",
  "/es/hr-outsourcing/shared-time": "/es/externalizacion-rrhh/tiempo-compartido",
  "/es/outsourced-cfo-barcelona": "/es/cfo-externalizado-barcelona",
  "/es/outsourced-cfo-paris": "/es/cfo-externalizado-paris",
  "/es/outsourced-cfo-toulouse": "/es/cfo-externalizado-toulouse",
  "/es/legal-notice": "/es/aviso-legal",
  "/es/privacy-policy": "/es/politica-de-privacidad",

  /* ── EN slugs appearing in FR root ────────────────────────────────── */
  "/daf-outsourcing": "/daf-externalise",
  "/daf-outsourcing/metier": "/daf-externalise/metier",
  "/daf-outsourcing/shared-time": "/daf-externalise/temps-partage",
  "/daf-outsourcing/transition": "/daf-externalise/transition",
  "/hr-outsourcing": "/drh-externalise",
  "/hr-outsourcing/shared-time": "/drh-externalise/temps-partage",
  "/outsourced-cfo-barcelona": "/daf-externalise-barcelone",
  "/outsourced-cfo-paris": "/daf-externalise-paris",
  "/outsourced-cfo-toulouse": "/daf-externalise-toulouse",
  "/legal-notice": "/mentions-legales",
  "/privacy-policy": "/politique-de-confidentialite",
  "/quienes-somos": "/a-propos",

  /* ── ES slugs appearing in FR root ────────────────────────────────── */
  "/externalizacion-daf": "/daf-externalise",
  "/externalizacion-daf/metier": "/daf-externalise/metier",
  "/externalizacion-daf/multipropiedad": "/daf-externalise/temps-partage",
  "/externalizacion-daf/transition": "/daf-externalise/transition",
  "/externalizacion-rrhh": "/drh-externalise",
  "/externalizacion-rrhh/tiempo-compartido": "/drh-externalise/temps-partage",
  "/cfo-externalizado-barcelona": "/daf-externalise-barcelone",
  "/cfo-externalizado-paris": "/daf-externalise-paris",
  "/cfo-externalizado-toulouse": "/daf-externalise-toulouse",
  "/aviso-legal": "/mentions-legales",
  "/politica-de-privacidad": "/politique-de-confidentialite",

  /* ── Service slug corrections (FR) ───────────────────────────────── */
  "/services/externalisation-comptable": "/services/comptabilite-externalisation",
  "/services/gestion-de-tresorerie": "/services/previsionnel-tresorerie",

  /* ── Service EN slugs appearing in /es/ paths ────────────────────── */
  "/es/services/cash-flow-forecast": "/es/services/prevision-tesoreria",
  "/es/services/fund-raising-support": "/es/services/soporte-financiacion",
  "/es/services/outsourced-management-control": "/es/services/control-gestion-externalizado",
  "/es/services/outsource-your-accounting": "/es/services/externalizar-contabilidad",
  "/es/services/outsourced-financial-management": "/es/services/gestion-financiera-externalizada",

  /* ── Service FR slugs appearing in /en/ paths ────────────────────── */
  "/en/services/previsionnel-tresorerie": "/en/services/cash-flow-forecast",
  "/en/services/gestion-financiere-externalisee": "/en/services/outsourced-financial-management",
  "/en/services/accompagnement-levee-de-fond": "/en/services/fund-raising-support",
  "/en/services/comptabilite-externalisation": "/en/services/outsource-your-accounting",
  "/en/services/controle-de-gestion-externalise": "/en/services/outsourced-management-control",

  /* ── Service FR slugs appearing in /es/ paths ────────────────────── */
  "/es/services/previsionnel-tresorerie": "/es/services/prevision-tesoreria",
  "/es/services/gestion-financiere-externalisee": "/es/services/gestion-financiera-externalizada",
  "/es/services/accompagnement-levee-de-fond": "/es/services/soporte-financiacion",
  "/es/services/comptabilite-externalisation": "/es/services/externalizar-contabilidad",
  "/es/services/controle-de-gestion-externalise": "/es/services/control-gestion-externalizado",

  /* ── Service ES slugs appearing in /en/ paths ────────────────────── */
  "/en/services/prevision-tesoreria": "/en/services/cash-flow-forecast",
  "/en/services/gestion-financiera-externalizada": "/en/services/outsourced-financial-management",
  "/en/services/soporte-financiacion": "/en/services/fund-raising-support",
  "/en/services/externalizar-contabilidad": "/en/services/outsource-your-accounting",
  "/en/services/control-gestion-externalizado": "/en/services/outsourced-management-control",

  /* ── Service ES slugs appearing in FR root ───────────────────────── */
  "/services/prevision-tesoreria": "/services/previsionnel-tresorerie",
  "/services/gestion-financiera-externalizada": "/services/gestion-financiere-externalisee",
  "/services/soporte-financiacion": "/services/accompagnement-levee-de-fond",
  "/services/externalizar-contabilidad": "/services/comptabilite-externalisation",
  "/services/control-gestion-externalizado": "/services/controle-de-gestion-externalise",

  /* ── Service EN slugs appearing in FR root ───────────────────────── */
  "/services/cash-flow-forecast": "/services/previsionnel-tresorerie",
  "/services/outsourced-financial-management": "/services/gestion-financiere-externalisee",
  "/services/fund-raising-support": "/services/accompagnement-levee-de-fond",
  "/services/outsource-your-accounting": "/services/comptabilite-externalisation",
  "/services/outsourced-management-control": "/services/controle-de-gestion-externalise",

  /* ── Fractional CFO Barcelona: only exists in EN ─────────────────── */
  "/fractional-cfo-barcelona": "/daf-externalise-barcelone",
  "/es/fractional-cfo-barcelona": "/es/cfo-externalizado-barcelona",
};

/* ── Fiche metier slug mappings between locales ────────────────────── */
const FICHE_METIER_SLUG_MAP: Record<string, Record<string, string>> = {
  /* FR slug -> { en: EN slug, es: ES slug } */
  "controleur-de-gestion": { en: "management-controller", es: "controller-de-gestion" },
  "tresorier": { en: "treasurer", es: "tesorero" },
  "directeur-administratif-et-financier-daf": { en: "chief-financial-officer-cfo", es: "director-financiero-cfo" },
  "directeur-de-la-performance": { en: "chief-performance-officer-performance-director", es: "director-de-la-performance" },
  "responsable-consolidation": { en: "consolidation-manager", es: "responsable-de-consolidacion" },
  "credit-manager": { en: "credit-manager", es: "credit-manager" },
  "responsable-administratif-et-financier-raf": { en: "finance-administration-manager-fam", es: "responsable-administrativo-y-financiero-raf" },
  "business-analyst-finance": { en: "finance-business-analyst", es: "business-analyst-finance" },
  "auditeur-interne": { en: "internal-auditor", es: "auditor-interno" },
  "expert-paie-et-administration-du-personnel": { en: "payroll-hr-administration-expert", es: "experto-en-nominas-y-administracion-de-personal" },
};

/* Build reverse maps: EN slug -> FR slug, ES slug -> FR slug */
const EN_TO_FR_FICHE: Record<string, string> = {};
const ES_TO_FR_FICHE: Record<string, string> = {};
const FR_TO_EN_FICHE: Record<string, string> = {};
const FR_TO_ES_FICHE: Record<string, string> = {};

for (const [frSlug, map] of Object.entries(FICHE_METIER_SLUG_MAP)) {
  if (map.en) {
    EN_TO_FR_FICHE[map.en] = frSlug;
    FR_TO_EN_FICHE[frSlug] = map.en;
  }
  if (map.es) {
    ES_TO_FR_FICHE[map.es] = frSlug;
    FR_TO_ES_FICHE[frSlug] = map.es;
  }
}

/* ── Blog slugs that were in sitemap but have no content ───────────── */
const ORPHAN_BLOG_SLUGS = [
  "cout-daf-externalise",
  "daf-externalise-startup",
  "daf-externalise-vs-comptable",
  "pme-besoin-daf-externalise",
  "daf-externalise-vs-daf-interne",
  "daf-externalise-levee-de-fonds",
  "missions-daf-externalise-temps-partage",
  "choisir-cabinet-daf-externalise",
  "management-transition-financiere",
  "direction-financiere-externalisee",
  "outils-daf-externalise-2026",
  "daf-externalise-barcelone",
  "previsionnel-tresorerie-guide-pme",
];

/* ── FR-only blog slugs (no EN/ES translation) ────────────────────── */
const FR_ONLY_BLOG_SLUGS = [
  "flux-de-tresorerie",
  "la-modernisation-du-role-de-cfo",
  "les-10-outils-pour-les-cfos-en-start-up",
  "organiser-sa-direction-financiere",
  "essentiels-outils-tech-finance",
  "ia-et-automatisation-des-taches-repetitives-du-departement-finance",
  "consequences-financieres-cyberattaques",
  "levee-de-fonds-dilutif-vs-non-dilutif",
  "regimes-fiscaux-france-vs-espagne",
  "anticiper-financierement-ses-recrutements-guide-pratique",
  "ia-act-opportunite-fintechs",
  "cout-daf-externalise-tarifs-prix-2026",
  "daf-externalise-vs-daf-salarie",
  "checklist-due-diligence-levee-de-fonds",
  "daf-drh-externalises-synergie",
];

/* ------------------------------------------------------------------ */
/*  Middleware                                                         */
/* ------------------------------------------------------------------ */

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* ── 1. Fix double-locale prefixes (/en/es/, /es/en/, /en/en/, /es/es/) ── */
  const doubleLocaleMatch = pathname.match(
    /^\/(en|es)\/(en|es)(\/.*)?$/
  );
  if (doubleLocaleMatch) {
    const firstLocale = doubleLocaleMatch[1];
    const rest = doubleLocaleMatch[3] || "";
    const url = request.nextUrl.clone();
    url.pathname = `/${firstLocale}${rest}`;
    return NextResponse.redirect(url, 301);
  }

  /* ── 2. Exact slug redirects ──────────────────────────────────────── */
  const target = SLUG_REDIRECTS[pathname];
  if (target && target !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url, 301);
  }

  /* ── 3. Fiche metier cross-locale redirects ──────────────────────── */
  const ficheMatch = pathname.match(/^(?:\/(en|es))?\/ressources\/fiche-metier\/(.+)$/);
  if (ficheMatch) {
    const locale = ficheMatch[1] || "fr";
    const slug = ficheMatch[2];
    const basePath = locale === "fr" ? "/ressources/fiche-metier" : `/${locale}/ressources/fiche-metier`;

    if (locale === "fr") {
      // On FR: if slug is EN or ES, redirect to FR slug
      const frFromEn = EN_TO_FR_FICHE[slug];
      const frFromEs = ES_TO_FR_FICHE[slug];
      const correctSlug = frFromEn || frFromEs;
      if (correctSlug && correctSlug !== slug) {
        const url = request.nextUrl.clone();
        url.pathname = `${basePath}/${correctSlug}`;
        return NextResponse.redirect(url, 301);
      }
    } else if (locale === "en") {
      // On EN: if slug is FR, redirect to EN slug
      const enSlug = FR_TO_EN_FICHE[slug];
      if (enSlug && enSlug !== slug) {
        const url = request.nextUrl.clone();
        url.pathname = `${basePath}/${enSlug}`;
        return NextResponse.redirect(url, 301);
      }
      // On EN: if slug is ES, redirect to EN slug
      const frFromEs = ES_TO_FR_FICHE[slug];
      if (frFromEs) {
        const enFromFr = FR_TO_EN_FICHE[frFromEs];
        if (enFromFr && enFromFr !== slug) {
          const url = request.nextUrl.clone();
          url.pathname = `${basePath}/${enFromFr}`;
          return NextResponse.redirect(url, 301);
        }
      }
    } else if (locale === "es") {
      // On ES: if slug is FR, redirect to ES slug
      const esSlug = FR_TO_ES_FICHE[slug];
      if (esSlug && esSlug !== slug) {
        const url = request.nextUrl.clone();
        url.pathname = `${basePath}/${esSlug}`;
        return NextResponse.redirect(url, 301);
      }
      // On ES: if slug is EN, redirect to ES slug
      const frFromEn = EN_TO_FR_FICHE[slug];
      if (frFromEn) {
        const esFromFr = FR_TO_ES_FICHE[frFromEn];
        if (esFromFr && esFromFr !== slug) {
          const url = request.nextUrl.clone();
          url.pathname = `${basePath}/${esFromFr}`;
          return NextResponse.redirect(url, 301);
        }
      }
    }
  }

  /* ── 4. Orphan blog slugs -> redirect to blog listing ────────────── */
  const blogMatch = pathname.match(/^(?:\/(en|es))?\/ressources\/blog\/(.+)$/);
  if (blogMatch) {
    const locale = blogMatch[1] || "";
    const slug = blogMatch[2];

    // Orphan slugs (never had content)
    if (ORPHAN_BLOG_SLUGS.includes(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = locale ? `/${locale}/ressources/blog` : "/ressources/blog";
      return NextResponse.redirect(url, 301);
    }

    // FR-only blog posts accessed from EN/ES -> redirect to FR version
    if (locale && FR_ONLY_BLOG_SLUGS.includes(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = `/ressources/blog/${slug}`;
      return NextResponse.redirect(url, 301);
    }
  }

  /* ── 5. Trailing slash normalization ─────────────────────────────── */
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (public images)
     * - favicon.ico, robots.txt, sitemap.xml
     * - api routes
     */
    "/((?!_next/static|_next/image|images|favicon\\.ico|robots\\.txt|sitemap\\.xml|api).*)",
  ],
};
