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
  "/en/a-propos": "/en/a-propos", // already correct

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

  /* ── Service slug corrections ─────────────────────────────────────── */
  "/services/externalisation-comptable": "/services/comptabilite-externalisation",
  "/services/gestion-de-tresorerie": "/services/previsionnel-tresorerie",
  "/es/services/cash-flow-forecast": "/es/services/prevision-tesoreria",
  "/es/services/fund-raising-support": "/es/services/soporte-financiacion",
  "/es/services/outsourced-management-control": "/es/services/control-gestion-externalizado",
  "/en/services/ma-due-diligence": "/en/services/ma-due-diligence",
  "/es/services/ma-due-diligence": "/es/services/ma-due-diligence",
};

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
    // Keep the first locale prefix, strip the second
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
