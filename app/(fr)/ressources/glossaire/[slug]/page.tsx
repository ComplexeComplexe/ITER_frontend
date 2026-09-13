import { notFound } from "next/navigation";
import { Metadata } from "next";
import GlossaryEntryPage from "@/components/pages/GlossaryEntryPage";
import { buildStrapiMetadata } from "@/lib/metadata";
import { getGlossaryEntryContent, getGlossaryPages } from "@/lib/content/glossary-entries";
import { blogPosts } from "@/lib/content/blog-posts";
import { resolveBlogArticleHref } from "@/lib/path-localization";
import {
  GLOSSARY_AUTHOR,
  GLOSSARY_MODIFIED,
  GLOSSARY_PUBLISHED,
  htmlMentionsGlossary,
} from "@/lib/glossary-links";
import { getCmsNavigation } from "@/lib/static-content";
import { faqPageSchema } from "@/lib/schemas";
import { glossaryFaqItems } from "@/lib/glossary-faq";
import { PAGE_REVISIONS, latestRevision } from "@/lib/content/page-revisions";

/**
 * Fiches qui ont une version anglaise servie (voir app/(en)/…/glossaire), avec
 * le slug anglais correspondant. `besoin-fonds-roulement-bfr` est le cas
 * croisé : sa version anglaise vit sous le slug court `bfr`.
 */
const SLUG_EN: Record<string, string> = {
  cfo: "cfo",
  ebitda: "ebitda",
  "besoin-fonds-roulement-bfr": "bfr",
};

const validSlugs = getGlossaryPages("fr").map(entry => entry.slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    return {
      title: "Not Found",
      description: "Glossary entry not found",
    };
  }

  return buildStrapiMetadata({
    endpoint: `glossary-${slug}`,
    locale: "fr",
    path: `/ressources/glossaire/${slug}`,
    fallbackTitle: content.meta.title,
    fallbackDescription: content.meta.description,
    // GSC-03 (2026-07-30) : aucune route [slug] n'existait sous /en ni /es,
    // d'où des hreflang synthétiques que Google crawlait puis redirigeait.
    //
    // TRAFIC-01 (2026-08-31) — trois fiches ont désormais une vraie version
    // anglaise. Pour celles-là, et pour elles seules, l'alternate est réel.
    disableHreflang: slug in SLUG_EN ? ["es"] : ["en", "es"],
    ...(slug in SLUG_EN
      ? {
          localizedPaths: {
            fr: `/ressources/glossaire/${slug}`,
            en: `/ressources/glossaire/${SLUG_EN[slug]}`,
            es: `/ressources/glossaire/${slug}`,
          },
        }
      : {}),
  });
}

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = getGlossaryEntryContent("fr", slug);
  if (!content) {
    notFound();
  }

  const cmsNavigation = await getCmsNavigation("fr");
  const faqItems = glossaryFaqItems(content);
  const pageUrl = `https://www.iteradvisors.com/ressources/glossaire/${slug}`;
  const modified = latestRevision(GLOSSARY_MODIFIED, PAGE_REVISIONS[`/ressources/glossaire/${slug}`]);

  // REDESIGN-P3 (2026-09-01) — les articles du blog qui emploient le terme,
  // pour la section « où ce terme apparaît ». Résolus via
  // resolveBlogArticleHref pour ne jamais lier un slug qui redirige.
  const mentions = Object.entries(blogPosts.fr)
    .filter(([, p]) => p.htmlContent && htmlMentionsGlossary(p.htmlContent, slug))
    .map(([s, p]) => ({ href: resolveBlogArticleHref("fr", s), title: p.h1 }))
    .filter((m): m is { href: string; title: string } => m.href !== null && !m.href.includes("/glossaire/"))
    .filter((m, i, arr) => arr.findIndex((x) => x.href === m.href) === i)
    .slice(0, 4);

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Article : c'est ce qui porte l'auteur et les dates — la garde E-E-A-T
      // de la recette les exige désormais sur le glossaire aussi.
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        url: pageUrl,
        headline: content.h1,
        description: content.meta.description,
        datePublished: GLOSSARY_PUBLISHED,
        dateModified: modified,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: GLOSSARY_AUTHOR.name,
          url: `https://www.iteradvisors.com${GLOSSARY_AUTHOR.url}`,
        },
        publisher: { "@id": "https://www.iteradvisors.com/#organization" },
        isPartOf: { "@type": "CollectionPage", "@id": "https://www.iteradvisors.com/ressources/glossaire#collection" },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${pageUrl}#term`,
        name: content.h1.split(/\s[:(]/)[0].trim(),
        description: content.meta.description,
        url: pageUrl,
        inDefinedTermSet: "https://www.iteradvisors.com/ressources/glossaire",
      },
      ...(faqItems.length ? [faqPageSchema(faqItems)] : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <GlossaryEntryPage
        locale="fr"
        content={content}
        cmsNavigation={cmsNavigation}
        slug={slug}
        modified={modified}
        mentions={mentions}
      />
    </>
  );
}
