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
        destination: "/ressources/blog/levee-de-fonds-guide",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/ressources/blog/levee-de-fonds-startup",
        destination: "/en/ressources/blog/levee-de-fonds-guide",
        permanent: true, // 301 redirect
      },
      {
        source: "/ressources/blog/daf-externalise",
        destination: "/ressources/blog/daf-externalise-guide",
        permanent: true, // 301 redirect
      },
      {
        source: "/en/ressources/blog/daf-externalise",
        destination: "/en/ressources/blog/daf-externalise-guide",
        permanent: true, // 301 redirect
      },
      // 404 fix: /fractional-cfo/metier should redirect to correct resource
      {
        source: "/en/fractional-cfo/metier",
        destination: "/en/ressources/fiche-metier",
        permanent: true, // 301 redirect
      },
      {
        source: "/fractional-cfo/metier",
        destination: "/ressources/fiche-metier",
        permanent: true, // 301 redirect
      },
      // 404 fix: /fractional-cfo/shared-time → /fractional-cfo page
      {
        source: "/en/fractional-cfo/shared-time",
        destination: "/en/fractional-cfo",
        permanent: true, // 301 redirect
      },
      {
        source: "/fractional-cfo/shared-time",
        destination: "/fractional-cfo",
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
