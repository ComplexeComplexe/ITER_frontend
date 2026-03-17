import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import type { StrapiBlock, CmsNavItem } from "@/lib/strapi";

interface BlogPostPageProps {
  locale: Locale;
  title: string;
  cmsNavigation?: CmsNavItem[];
  breadcrumbs: {
    resourcesLabel: string;
    resourcesHref: string;
    blogLabel: string;
    blogHref: string;
  };
  /** Legacy: paragraphs as strings (when not using Strapi) */
  content?: string[];
  /** Strapi: rich text blocks (takes precedence over content) */
  blocks?: StrapiBlock[];
}

export default function BlogPostPage({
  locale,
  title,
  breadcrumbs,
  content = [],
  blocks,
  cmsNavigation,
}: BlogPostPageProps) {
  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              {
                label: breadcrumbs.resourcesLabel,
                href: breadcrumbs.resourcesHref,
              },
              { label: breadcrumbs.blogLabel, href: breadcrumbs.blogHref },
              { label: title },
            ]}
          />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">
            {title}
          </h1>
        </div>
      </section>

      <article className="bg-background py-24 lg:py-16">
        <div className="container max-w-3xl">
          {blocks && blocks.length > 0 ? (
            <StrapiBlocks
              blocks={blocks}
              className="text-muted-foreground"
              prose
              contactHref={getContactPath(locale)}
            />
          ) : (
            content.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-6">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
