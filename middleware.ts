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
};

/* ── Blog slugs that were in sitemap but have no content - redirect to blog listing ── */
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

  /* ── 3. Orphan blog slugs -> redirect to blog listing ─────────────── */
  const blogMatch = pathname.match(/^(?:\/(en|es))?\/ressources\/blog\/(.+)$/);
  if (blogMatch) {
    const locale = blogMatch[1] || "";
    const slug = blogMatch[2];
    if (ORPHAN_BLOG_SLUGS.includes(slug)) {
      const url = request.nextUrl.clone();
      url.pathname = locale ? `/${locale}/ressources/blog` : "/ressources/blog";
      return NextResponse.redirect(url, 301);
    }
  }

  /* ── 4. Trailing slash normalization ──────────────────────────────── */
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
