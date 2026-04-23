import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import { getCookiePolicyContent } from "@/lib/content/cookies";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import ManageCookiesButton from "@/components/ManageCookiesButton";

export default function CookiePolicyPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const content = getCookiePolicyContent(locale);

  const headings = {
    fr: { name: "Nom", provider: "Fournisseur", purpose: "Finalité", duration: "Durée", type: "Type" },
    en: { name: "Name", provider: "Provider", purpose: "Purpose", duration: "Duration", type: "Type" },
    es: { name: "Nombre", provider: "Proveedor", purpose: "Finalidad", duration: "Duración", type: "Tipo" },
  }[locale];

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: content.h1 }]} />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground">
            {content.h1}
          </h1>
          <p className="text-sm text-muted-foreground mt-2">{content.lastUpdated}</p>
        </div>
      </section>

      <section className="bg-background pb-16 lg:pb-20">
        <div className="container max-w-4xl">
          <p className="text-muted-foreground leading-relaxed mb-10 whitespace-pre-line">
            {content.intro}
          </p>

          {content.sections.map((section) => (
            <div key={section.category} className="mb-12 last:mb-0">
              <h2 className="text-lg font-semibold font-heading mb-3 pb-2 border-b border-border/50">
                {section.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {section.description}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/40 text-left">
                      <th className="p-3 font-medium">{headings.name}</th>
                      <th className="p-3 font-medium">{headings.provider}</th>
                      <th className="p-3 font-medium">{headings.purpose}</th>
                      <th className="p-3 font-medium">{headings.duration}</th>
                      <th className="p-3 font-medium">{headings.type}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.cookies.map((c, i) => (
                      <tr key={i} className="border-t border-border/50">
                        <td className="p-3 font-mono text-xs align-top">{c.name}</td>
                        <td className="p-3 align-top">{c.provider}</td>
                        <td className="p-3 align-top text-muted-foreground">
                          {c.purpose}
                        </td>
                        <td className="p-3 align-top">{c.duration}</td>
                        <td className="p-3 align-top text-muted-foreground">{c.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border/50">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line mb-4">
              {content.outro}
            </p>
            <ManageCookiesButton label={content.managePrefsLabel} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
