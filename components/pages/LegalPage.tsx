import { Locale } from "@/lib/i18n";
import { LegalPageContent } from "@/lib/content/legal";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";

export default function LegalPage({
  locale,
  content,
  cmsNavigation,
}: {
  locale: Locale;
  content: LegalPageContent;
  cmsNavigation?: CmsNavItem[];
}) {
  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: content.h1 }]} />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground">{content.h1}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-3xl">
          {content.sections.map((section, i) => (
            <div key={i} className="mb-12 last:mb-0">
              <h2 className="text-lg font-semibold font-heading mb-4 pb-3 border-b border-border/50">{section.heading}</h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">{section.content}</div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
