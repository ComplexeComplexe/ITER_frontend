import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/profil/merci", "/campagne/merci"],
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
