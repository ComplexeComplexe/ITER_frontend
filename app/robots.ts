import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /_next/static/ and /_next/image must be crawlable for JS/CSS/images.
        // Only block internal data routes (/_next/data/) that have no SEO value.
        disallow: ["/api/", "/_next/data/", "/profil/merci", "/campagne/merci"],
      },
      // Allow AI bots to crawl the site for maximum LLM visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Anthropic", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: "https://www.iteradvisors.com/sitemap.xml",
  };
}
