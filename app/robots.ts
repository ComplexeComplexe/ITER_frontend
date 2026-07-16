import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/static/ and /_next/image must be crawlable for JS/CSS/images.
        // Only block internal data routes (/_next/data/) and confirmation pages.
        // SEO-16 (2026-07-01) — retiré les résidus WordPress (/wp-admin,
        // /wp-content, /wp-includes, /comments/feed, /feed) qui étaient
        // hérités du site pre-Next.js. Ces routes n'existent plus, les
        // requêtes retournent 404 et le Disallow est inutile / trompeur.
        // Cf. audit SEO 01/07/2026 §1 "Nettoyage du robots.txt".
        disallow: [
          "/api/",
          "/_next/data/",
          "/profil/merci",
          "/campagne/merci",
        ],
      },
      // Allow AI bots to crawl the site for maximum LLM visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Anthropic", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://www.iteradvisors.com/sitemap.xml",
  };
}
