import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/static/ and /_next/image must be crawlable for JS/CSS/images.
        // Only block internal data routes (/_next/data/) that have no SEO value.
        // T9 (2026-05-31): also block WordPress residuals (/comments/feed,
        // /feed, /wp-*) that GSC still occasionally surfaces from the
        // pre-Next.js era — the Next.js site doesn't generate them, so any
        // request would 404 anyway, but explicit Disallow keeps them out of
        // the crawl budget.
        disallow: [
          "/api/",
          "/_next/data/",
          "/profil/merci",
          "/campagne/merci",
          "/comments/feed",
          "*/comments/feed",
          "/feed",
          "*/feed/",
          "/wp-admin/",
          "/wp-content/",
          "/wp-includes/",
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
