import { Locale } from "@/lib/i18n";
import { getResourcesContent } from "@/lib/content/resources";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ResourcesHub from "./ResourcesHub";

export default function ResourcesPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getResourcesContent(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* Interactive hub: sticky nav + search + all sections */}
      <ResourcesHub t={t} locale={locale} />

      <CTASection locale={locale} />
    </PageLayout>
  );
}
