import type { MetadataRoute } from "next";

// HYGIENE-2 (2026-10-18) — /profil/merci et /campagne/merci retirés : ces
// routes n'existent pas dans app/ (la seule page de remerciement est
// /lp/daf-externalise/merci, déjà en noindex) et répondaient 404. Un
// Disallow vers une 404 est inutile et trompeur pour les crawlers.
const privatePaths = ["/api/", "/_next/data/"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/static/ and /_next/image must be crawlable for JS/CSS/images.
        // Only block internal data routes (/_next/data/) and the API.
        // SEO-16 (2026-07-01) — retiré les résidus WordPress (/wp-admin,
        // /wp-content, /wp-includes, /comments/feed, /feed) qui étaient
        // hérités du site pre-Next.js. Ces routes n'existent plus, les
        // requêtes retournent 404 et le Disallow est inutile / trompeur.
        // Cf. audit SEO 01/07/2026 §1 "Nettoyage du robots.txt".
        disallow: privatePaths,
      },
      // Allow AI bots to crawl the site for maximum LLM visibility
      { userAgent: "GPTBot", allow: "/", disallow: privatePaths },
      { userAgent: "OAI-SearchBot", allow: "/", disallow: privatePaths },
      { userAgent: "ChatGPT-User", allow: "/", disallow: privatePaths },
      { userAgent: "ClaudeBot", allow: "/", disallow: privatePaths },
      { userAgent: "anthropic-ai", allow: "/", disallow: privatePaths },
      { userAgent: "Anthropic", allow: "/", disallow: privatePaths },
      { userAgent: "CCBot", allow: "/", disallow: privatePaths },
      { userAgent: "PerplexityBot", allow: "/", disallow: privatePaths },
      { userAgent: "Google-Extended", allow: "/", disallow: privatePaths },
    ],
    sitemap: "https://www.iteradvisors.com/sitemap.xml",
  };
}
