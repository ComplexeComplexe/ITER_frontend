import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
  // Hide the X-Powered-By: Next.js header — minor information-disclosure
  // hardening flagged by the technical SEO audit (T-3).
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  async headers() {
    return [
      // Security & SEO headers for all pages
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          // Content-Signal EU - signal that content is human-authored and copyrighted
          { key: "X-Content-Signal", value: "human-authored, copyright=Iter Advisors SAS, jurisdiction=EU" },
        ],
      },
      // Cache headers for static assets
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/:path*.woff2",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/en/daf-outsourcing",
        destination: "/en/fractional-cfo",
        permanent: true, // 301 redirect
      },
      // 404 fix: /resources/ → /ressources/ (English-style path to French-style)
      {
        source: "/resources/:path*",
        destination: "/ressources/:path*",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/resources/:path*",
        destination: "/en/ressources/:path*",
        permanent: true, // 301 redirect
      },
      {
        source: "/es/resources/:path*",
        destination: "/es/ressources/:path*",
        permanent: true, // 301 redirect
      },
      // 404 fix: Blog slug inconsistencies
      {
        source: "/ressources/blog/levee-de-fonds-startup",
        destination: "/services/accompagnement-levee-de-fond",
        permanent: true, // 301 redirect
      },
      {
        source: "/ressources/blog/daf-externalise",
        destination: "/daf-externalise",
        permanent: true, // 301 redirect (pillar page, slug collision)
      },
      {
        source: "/ressources/tools",
        destination: "/ressources/outils",
        permanent: true, // 301 redirect
      },
      {
        source: "/ressources/herramientas",
        destination: "/ressources/outils",
        permanent: true, // 301 redirect (wrong lang slug in FR path)
      },
      // EN/ES blog 404s
      {
        source: "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives",
        destination: "/en/ressources/blog",
        permanent: true, // 301 redirect (article depublished)
      },
      {
        source: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives",
        destination: "/es/ressources/blog",
        permanent: true, // 301 redirect (article depublished)
      },
      {
        source: "/en/ressources/blog/les-10-outils-pour-cfos-startup",
        destination: "/en/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        permanent: true, // 301 redirect (slug mismatch)
      },
      {
        source: "/es/ressources/blog/les-10-outils-pour-cfos-startup",
        destination: "/es/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        permanent: true, // 301 redirect (slug mismatch)
      },
      {
        source: "/es/ressources/tools",
        destination: "/es/ressources/herramientas",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/ressources/herramientas",
        destination: "/en/ressources/tools",
        permanent: true, // 301 redirect
      },
      // Old fractional-cfo cluster slugs (EN)
      {
        source: "/en/fractional-cfo/shared-time",
        destination: "/en/daf-outsourcing/shared-time",
        permanent: true, // 301 redirect (cluster rename)
      },
      {
        source: "/en/fractional-cfo/metier",
        destination: "/en/daf-outsourcing/metier",
        permanent: true, // 301 redirect (cluster rename)
      },
      // Jobs EN/ES (if positions not translated, redirect to hub)
      {
        source: "/en/jobs/fractional-cfo-startups",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/fractional-cfo-startups",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/marketing-growth-strategy",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/marketing-growth-strategy",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/senior-finance-manager",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/senior-finance-manager",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/en/jobs/finance-analyst-junior-fr",
        destination: "/en/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      {
        source: "/es/jobs/finance-analyst-junior-fr",
        destination: "/es/jobs",
        permanent: true, // 301 redirect (not translated)
      },
      // TICKET 2: Spanish slug migration to native Spanish
      {
        source: "/es/ressources/:path*",
        destination: "/es/recursos/:path*",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/profil",
        destination: "/es/perfil",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/qualification",
        destination: "/es/calificacion",
        permanent: true, // 301 redirect (French → Spanish)
      },
      {
        source: "/es/campagne",
        destination: "/es/campana",
        permanent: true, // 301 redirect (French → Spanish)
      },
      // TICKET 3: English URL slug corrections (English → French for canonical paths)
      {
        source: "/en/resources/:path*",
        destination: "/en/ressources/:path*",
        permanent: true, // 301 redirect (normalize to French-style canonical paths)
      },
      {
        source: "/en/profil",
        destination: "/en/profile",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/qualification",
        destination: "/en/assessment",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/campagne",
        destination: "/en/campaign",
        permanent: true, // 301 redirect (French → English)
      },
      // Handle specific ressources → resources mappings for fiche-metier
      {
        source: "/en/ressources/fiche-metier/:path*",
        destination: "/en/ressources/job-descriptions/:path*",
        permanent: true, // 301 redirect (fiche-metier → job-descriptions)
      },
      {
        source: "/en/ressources/glossaire",
        destination: "/en/ressources/glossary",
        permanent: true, // 301 redirect (French → English)
      },
      // TICKET 4: Spanish service page for accounting externalization
      {
        source: "/es/services/comptabilite-externalisation",
        destination: "/es/services/externalizar-contabilidad",
        permanent: true, // 301 redirect (French service → Spanish service)
      },
      // TICKET 4: English service pages for consistency
      {
        source: "/en/services/comptabilite-externalisation",
        destination: "/en/services/outsource-your-accounting",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/accompagnement-levee-de-fond",
        destination: "/en/services/fund-raising-support",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/controle-de-gestion-externalise",
        destination: "/en/services/outsourced-management-control",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/gestion-financiere-externalisee",
        destination: "/en/fractional-cfo",
        permanent: true, // 301 redirect (French → English)
      },
      {
        source: "/en/services/previsionnel-tresorerie",
        destination: "/en/services/cash-flow-forecast",
        permanent: true, // 301 redirect (French → English)
      },
    ];
  },
};

export default nextConfig;
