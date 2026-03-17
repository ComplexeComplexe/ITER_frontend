import Image from "next/image";
import { Locale } from "@/lib/i18n";
import { getContactPath } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiJobMetier, CmsNavItem } from "@/lib/strapi";

interface FicheMetierDetailPageProps {
  locale: Locale;
  fiche: StrapiJobMetier;
  cmsNavigation?: CmsNavItem[];
  breadcrumbs: {
    resourcesLabel: string;
    resourcesHref: string;
    fichesLabel: string;
    fichesHref: string;
  };
}

export default function FicheMetierDetailPage({
  locale,
  fiche,
  breadcrumbs,
  cmsNavigation,
}: FicheMetierDetailPageProps) {
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
              { label: breadcrumbs.fichesLabel, href: breadcrumbs.fichesHref },
              { label: fiche.title },
            ]}
          />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">
            {fiche.title}
          </h1>
          {fiche.featuredImage?.url && (
            <div className="relative mt-8 aspect-video max-w-3xl overflow-hidden rounded-2xl bg-muted">
              <Image
                src={strapiMediaUrl(fiche.featuredImage)}
                alt={fiche.featuredImage.alternativeText || fiche.title}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <article className="bg-background py-24 lg:py-16">
        <div className="container max-w-3xl">
          <StrapiBlocks
            blocks={fiche.content}
            className="text-muted-foreground"
            prose
            contactHref={getContactPath(locale)}
          />
          {fiche.faq && fiche.faq.length > 0 && (
            <div className="mt-16 border-t border-border pt-16">
              <h2 className="text-2xl font-bold font-heading text-foreground mb-6">
                FAQ
              </h2>
              <div className="space-y-8">
                {fiche.faq.map((item, i) => (
                  <div key={i}>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.question}
                    </h3>
                    <StrapiBlocks
                      blocks={item.answer}
                      className="text-muted-foreground text-sm"
                      contactHref={getContactPath(locale)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
