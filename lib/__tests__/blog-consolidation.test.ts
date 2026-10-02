import { describe, expect, it } from "vitest";
import config from "../../next.config";
import sitemap from "../../app/sitemap";
import { blogPosts } from "../content/blog-posts";
import { getStaticBlogListing } from "../blog-listing";
import { resolveBlogArticleHref } from "../path-localization";
import { blogHreflangDisabled } from "../blog-hreflang";

const mergers = [
  ["cout-externalisation-comptable-2026", "/ressources/blog/externalisation-comptable"],
  ["drh-externalise-quand-et-pourquoi", "/drh-externalise"],
  ["daf-part-time-tarifs-missions-2026", "/daf-externalise/temps-partage"],
  ["daf-externalise-barcelone-guide-startups-espagnoles", "/daf-externalise-barcelone"],
] as const;

describe("French blog consolidation", () => {
  it("permanently redirects each source to a retained, indexable target without a second configured redirect", async () => {
    const rules = await config.redirects!();
    const entries = await sitemap();
    for (const [slug, destination] of mergers) {
      const source = `/ressources/blog/${slug}`;
      const matches = rules.filter(rule => rule.source === source);
      expect(matches).toHaveLength(1);
      expect(matches[0]).toMatchObject({ destination, statusCode: 301 });
      expect(rules.some(rule => rule.source === destination)).toBe(false);
      expect(entries.some(entry => entry.url.endsWith(source))).toBe(false);
      expect(entries.some(entry => entry.url === `https://www.iteradvisors.com${destination}`)).toBe(true);
      expect(rules.some(rule => rule.destination === source)).toBe(false);
    }
  });

  it("does not offer merged articles in listings or author-page link resolution", () => {
    const listing = getStaticBlogListing("fr");
    for (const [slug] of mergers) {
      expect(blogPosts.fr[slug]).toBeUndefined();
      expect(listing.some(article => article.slug === slug)).toBe(false);
      expect(resolveBlogArticleHref("fr", slug)).toBeNull();
    }
  });

  it("preserves real English and Spanish accounting guides and their reciprocal alternates", () => {
    expect(blogPosts.en["externalisation-comptable"]).toBeDefined();
    expect(blogPosts.es["externalisation-comptable"]).toBeDefined();
    expect(blogHreflangDisabled("externalisation-comptable")).toEqual([]);
  });
});
