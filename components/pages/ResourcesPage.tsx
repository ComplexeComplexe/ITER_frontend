import { Locale } from "@/lib/i18n";
import { getResourcesContent } from "@/lib/content/resources";
import type { CmsNavItem } from "@/lib/static-content";
import { getStaticBlogListing } from "@/lib/blog-listing";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ResourcesHub from "./ResourcesHub";
import ResourcesPageFR from "./ResourcesPageFR";

const NEWS_HEADINGS: Record<Locale, string[]> = {
  fr: ["Actualités", "Articles"],
  en: ["News", "Articles", "Latest"],
  es: ["Noticias", "Actualidades", "Artículos"],
};

const NEWS_TAG: Record<Locale, string> = {
  fr: "Blog",
  en: "Blog",
  es: "Blog",
};

export default function ResourcesPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getResourcesContent(locale);

  // FR gets the SEO-16 rich rewrite (~1200 words, 6 thematic sections + how-to-use
  // + CTA). EN/ES keep the existing card-grid rendering until their content is
  // translated. The FR branch returns early — everything below the if block is
  // the legacy rendering used for EN/ES only.
  if (locale === "fr") {
    return <ResourcesPageFR cmsNavigation={cmsNavigation} />;
  }

  // ─── Legacy card-grid rendering (EN / ES) ──────────────────────────────
  // Replace the hard-coded "Actualités" cards with the 4 newest static
  // articles from lib/content/blog-posts.ts so /ressources stays in sync
  // with /ressources/blog (which now lists all 26 static articles).
  const newsHeadings = NEWS_HEADINGS[locale];
  const newsTag = NEWS_TAG[locale];
  const latest = getStaticBlogListing(locale).slice(0, 4);
  const categories = t.categories.map((category) => {
    if (!newsHeadings.includes(category.heading) || latest.length === 0) {
      return category;
    }
    return {
      ...category,
      cards: latest.map((article) => {
        const featured = article.featuredImage as unknown as {
          url?: string;
          alternativeText?: string;
        };
        return {
          title: article.title,
          // locale is narrowed to "en" | "es" here (FR returns early above)
          // SEO-ULT §4 (2026-08-15) — même correctif que BlogListingPage :
          // la convention ES est /es/recursos/, le gabarit produisait un 308.
          href:
            locale === "es"
              ? `/es/recursos/blog/${article.slug}`
              : `/${locale}/ressources/blog/${article.slug}`,
          image: featured?.url || "/images/og-logo.png", // Ahrefs T-404 (2026-06-08): placeholder.webp missing → og-default
          alt: featured?.alternativeText || article.title,
          tag: newsTag,
        };
      }),
    };
  });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* Interactive hub: sticky nav + search + all sections */}
      <ResourcesHub t={{ ...t, categories }} locale={locale} />

      {/* FAQ section */}
      {t.faq && t.faq.length > 0 && (
        <section className="bg-background py-16 lg:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
              FAQ
            </h2>
            <dl className="space-y-6">
              {t.faq.map((item, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <dt className="font-semibold text-foreground mb-2">{item.question}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}
