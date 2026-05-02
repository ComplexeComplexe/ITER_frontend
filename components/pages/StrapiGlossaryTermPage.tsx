import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import { StrapiGlossaryTerm } from "@/lib/strapi";

const labels: Record<Locale, { resources: string; resourcesHref: string; glossary: string; glossaryHref: string; definition: string }> = {
  fr: { resources: "Ressources", resourcesHref: "/ressources", glossary: "Glossaire", glossaryHref: "/ressources/glossaire", definition: "Définition" },
  en: { resources: "Resources", resourcesHref: "/en/ressources", glossary: "Glossary", glossaryHref: "/en/ressources/glossaire", definition: "Definition" },
  es: { resources: "Recursos", resourcesHref: "/es/ressources", glossary: "Glosario", glossaryHref: "/es/ressources/glossaire", definition: "Definición" },
};

export default function StrapiGlossaryTermPage({ locale, term }: { locale: Locale; term: StrapiGlossaryTerm }) {
  const t = labels[locale];

  return (
    <PageLayout locale={locale}>
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.resources, href: t.resourcesHref }, { label: t.glossary, href: t.glossaryHref }, { label: term.title }]} />
          <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground max-w-3xl">{term.title}</h1>
          {term.definition && (
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed italic border-l-4 border-iter-violet/30 pl-4">{term.definition}</p>
          )}
        </div>
      </section>

      <article className="bg-background py-16 lg:py-24">
        <div className="container max-w-3xl">
          <StrapiBlocks blocks={term.content || []} />
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
