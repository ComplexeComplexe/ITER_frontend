import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { REMUNERATION_GUIDE, REMUNERATION_SLUGS, REMUNERATION_IMAGE, REMUNERATION_ALTS } from "@/lib/content/director-remuneration-guide";
import { publishedMetadataAlternates } from "@/lib/metadata";
import { estimateReadMinutes } from "@/lib/blog-read-time";
import { extractToc } from "@/lib/blog-toc";
import { transformArticleHtml } from "@/lib/blog-html-transform";
import BlogPostPageRefonte from "./BlogPostPageRefonte";

export function remunerationMetadata(locale: Locale): Metadata {
  const post = REMUNERATION_GUIDE[locale];
  const url = `${post.breadcrumbs.blogHref}/${REMUNERATION_SLUGS[locale]}`;
  const images = [{ url: REMUNERATION_IMAGE, width: 1200, height: 630, alt: REMUNERATION_ALTS[locale] }];
  return {
    ...post.meta,
    alternates: publishedMetadataAlternates(url),
    robots: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
    openGraph: {
      ...post.meta, type: "article", url,
      locale: { fr: "fr_FR", en: "en_GB", es: "es_ES" }[locale],
      siteName: "Iter Advisors", publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate, images,
    },
    twitter: { card: "summary_large_image", ...post.meta, images },
  };
}

export default function DirectorRemunerationGuidePage({ locale }: { locale: Locale }) {
  const post = REMUNERATION_GUIDE[locale];
  const html = post.htmlContent ?? "";
  return (
    <BlogPostPageRefonte
      locale={locale}
      breadcrumbs={post.breadcrumbs}
      slug={REMUNERATION_SLUGS[locale]}
      category={post.category!}
      title={post.h1}
      dek={post.meta.description}
      author={{ name: "Iter Advisors" }}
      readingTime={estimateReadMinutes(html)}
      datePublished={post.publishedDate!}
      dateModified={post.updatedDate!}
      toc={extractToc(html)}
      metaDescription={post.meta.description}
    >
      <div dangerouslySetInnerHTML={{ __html: transformArticleHtml(html).html }} />
    </BlogPostPageRefonte>
  );
}
