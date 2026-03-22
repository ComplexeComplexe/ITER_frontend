import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/profil/merci", "/campagne/merci"],
      },
    ],
    sitemap: "https://www.iteradvisors.com/sitemap.xml",
  };
}
