import type { Locale } from "./i18n";
import { blogPosts } from "./content/blog-posts";
import { caseStudiesHref, dafClusterHref, glossaryHref, resolveBlogArticleHref } from "./path-localization";

/** Only replace a French link when an equivalent is actually published. */
export function localizeEditorialLink(href: string, locale: Locale): string {
  if (locale === "fr" || !href.startsWith("/") || /^\/(en|es)(\/|$)/.test(href)) return href;
  const blog = href.match(/^\/ressources\/blog\/([^/#?]+)$/);
  if (blog && blogPosts[locale]?.[blog[1]]) {
    const translated = resolveBlogArticleHref(locale, blog[1]);
    if (translated?.startsWith(`/${locale}/`)) return translated;
  }
  if (href === "/daf-externalise") return dafClusterHref("", locale);
  if (href === "/daf-externalise/metier") return dafClusterHref("metier", locale);
  if (href === "/ressources/glossaire") return glossaryHref(locale);
  if (href === "/ressources/cas-clients") return caseStudiesHref(locale);
  return href;
}

export function editorialLinkLabel(title: string, href: string, locale: Locale): string {
  const french = locale !== "fr" && href.startsWith("/") && !/^\/(en|es)(\/|$)/.test(href);
  return french ? `${title} ${locale === "en" ? "(in French)" : "(en francés)"}` : title;
}
