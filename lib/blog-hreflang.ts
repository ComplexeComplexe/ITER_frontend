import { blogPosts } from "@/lib/content/blog-posts";
import { resolveBlogArticleHref } from "@/lib/path-localization";
import type { Locale } from "@/lib/i18n";

/**
 * Locales dans lesquelles un article n'existe pas, et dont il ne faut donc pas
 * déclarer d'alternate.
 *
 * SEO-AUD-0824 §2 — les pages d'article déclaraient systématiquement les trois
 * langues. Pour un article publié seulement en français, cela produisait
 * `/en/ressources/blog/<slug>` et `/es/recursos/blog/<slug>` : deux URL qui
 * redirigent vers l'article français. Google les lisait comme des traductions,
 * les crawlait, et recevait une 308 — 26 des 59 hreflang fautifs relevés le
 * 24 août venaient de là.
 *
 * Une balise hreflang affirme « voici cette page dans cette langue ». Une
 * redirection vers une autre langue n'est pas une traduction, c'est un aveu
 * qu'elle n'existe pas. Mieux vaut ne rien déclarer.
 *
 * La vérité est déjà dans le contenu : un article a une version dans une locale
 * si `blogPosts[locale]` en porte une entrée **et** si cette entrée a une URL à
 * elle dans cette locale — `resolveBlogArticleHref` sait dire le contraire,
 * pour les traductions écrites mais retirées de la circulation et pour les
 * doublons de slug.
 */
export function blogHreflangDisabled(slug: string): Locale[] {
  const absentes: Locale[] = [];
  for (const locale of ["fr", "en", "es"] as const) {
    // Le français ne peut pas se contenter de `blogPosts.fr` : une vingtaine
    // d'articles y sont servis par une route dédiée, avec leur contenu écrit
    // dans le composant plutôt que dans le fichier de contenu. Ils existent
    // bel et bien. Ceux qui n'ont vraiment pas de version française sont
    // déclarés dans BLOG_ARTICLE_OVERRIDES, où resolveBlogArticleHref les lit.
    const existe = locale === "fr" ? true : Boolean(blogPosts[locale]?.[slug]);
    const href = existe ? resolveBlogArticleHref(locale, slug) : null;
    const prefixe = locale === "fr" ? "/ressources/" : `/${locale}/`;
    if (!href || !href.startsWith(prefixe)) absentes.push(locale);
  }
  return absentes;
}
