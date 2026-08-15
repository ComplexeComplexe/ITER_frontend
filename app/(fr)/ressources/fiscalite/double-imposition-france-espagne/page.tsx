import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { faqPageSchema } from "@/lib/schemas";
import { blogPosts } from "@/lib/content/blog-posts";

/**
 * Pillar page of the "Fiscalité Espagne France" cocoon.
 * Created 2026-05-31 (ticket: complete fiscalite cocoon — pillars 2-5).
 *
 * Body content is sourced from the validated blog post at slug
 * "double-imposition-france-espagne-convention" in lib/content/blog-posts.ts so the
 * pillar and the corresponding /ressources/blog/<slug> article stay in
 * lockstep without duplicating the htmlContent in two places.
 *
 * Schemas: Article (author Florent Greth, datePublished) + FAQPage + BreadcrumbList.
 * ProfessionalService is already site-wide via app/layout.tsx.
 */

const SOURCE_SLUG = "double-imposition-france-espagne-convention";
const PAGE_URL = "https://www.iteradvisors.com/ressources/fiscalite/double-imposition-france-espagne";
const HUB_URL = "/ressources/fiscalite-espagne-france";
const PUBLISHED_DATE = "2026-05-31";
const AUTHOR_NAME = "Florent Greth";
const AUTHOR_URL = "/a-propos/florent-greth";

// SEO-04 (S31 2026-07-27) — le champ sémantique dominant côté requêtes est
// "convention fiscale", pas "double imposition" : "retraite espagne
// convention" (2 173 impressions, position 17,34, 0 clic) et "convention
// fiscale france espagne" (388, 9,54, 0 clic) ne sont pas servies par
// l'ancien title.
export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Convention fiscale France-Espagne 2026",
  description: "Double imposition, résidence fiscale, retraites, dividendes, plus-values : ce que prévoit la convention France Espagne et comment l'appliquer en 2026.",
  path: "/ressources/fiscalite/double-imposition-france-espagne",
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn\'t crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ derived from the validated content of the source blog article. The
   visible <details> accordion and the FAQPage JSON-LD render from the same
   array so they stay 1:1. */
const FAQ: { question: string; answer: string }[] = [
  {
    question: "Comment fonctionne la convention fiscale franco-espagnole ?",
    answer:
      "La France et l'Espagne ont signé une convention fiscale bilatérale le 10 octobre 1995. Elle établit que c'est la résidence fiscale qui détermine quel État a le droit d'imposer vos revenus mondiaux. Si vous êtes résident fiscal en Espagne, vous devez déclarer l'ensemble de vos revenus (français et espagnols) à l'Hacienda.",
  },
  {
    question: "Qu'est-ce que la méthode du crédit d'impôt ?",
    answer:
      "C'est la méthode la plus courante (applicable notamment aux dividendes, intérêts et redevances). L'Espagne calcule l'impôt sur votre revenu global, puis déduit de cet impôt le montant que vous avez déjà payé en France, dans la limite de l'impôt espagnol correspondant à ce revenu.",
  },
  {
    question: "Qu'est-ce que la méthode de l'exemption avec progressivité ?",
    answer:
      "Applicable notamment aux revenus immobiliers de source française ou aux pensions de retraite de la fonction publique française. Ces revenus ne sont imposables qu'en France, mais l'Espagne exige que vous les déclariez : ils sont pris en compte pour déterminer le taux d'imposition applicable à vos autres revenus espagnols (taux effectif).",
  },
  {
    question: "Quel formulaire utiliser côté français pour éviter la double imposition ?",
    answer:
      "Côté français, pour déclarer des revenus de source étrangère tout en évitant la double imposition, il faut utiliser le formulaire spécifique 2047 en complément de la déclaration classique 2042.",
  },
  {
    question: "Les expatriés qui s'installent en Espagne peuvent-ils bénéficier de la loi Beckham ?",
    answer:
      "Oui. La loi Beckham (régime impatrié espagnol) permet aux personnes qui s'installent en Espagne après 5 ans de résidence à l'étranger d'être imposées à un taux forfaitaire de 24 % sur leurs revenus de source espagnole (jusqu'à 600 000 €), pendant 6 ans — au lieu du barème progressif de l'IRPF (jusqu'à 47 %). Ce régime spécial est totalement distinct de la convention de double imposition franco-espagnole, mais les deux s'articulent : les revenus de source française restent imposables en France, les revenus de source espagnole à 24 % sous Beckham.",
  },
];

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  const post = blogPosts.fr[SOURCE_SLUG];
  if (!post?.htmlContent) {
    // Fail fast in dev if the blog post is removed or renamed in
    // lib/content/blog-posts.ts so this pillar page doesn't silently render empty.
    throw new Error(`Missing blog post "${SOURCE_SLUG}" for pillar page ${PAGE_URL}`);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: post.h1,
        description:
          "Comment fonctionne la convention fiscale franco-espagnole de 1995 ? Méthodes du crédit d'impôt et de l'exemption avec progressivité pour éviter la double imposition.",
        datePublished: PUBLISHED_DATE,
        dateModified: PUBLISHED_DATE,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: AUTHOR_NAME,
          url: `https://www.iteradvisors.com${AUTHOR_URL}`,
        },
        publisher: { "@id": "https://www.iteradvisors.com/#organization" },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `https://www.iteradvisors.com${HUB_URL}#collection`,
        },
      },
      faqPageSchema(FAQ),
      // Pas de BreadcrumbList à la main : le composant <Breadcrumb>
      // en émet déjà un, cohérent site-wide (2026-08-02).
    ],
  };

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="bg-background pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Ressources", href: "/ressources" },
              { label: "Fiscalité Espagne France", href: HUB_URL },
              { label: "Double imposition" },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight">
            {post.h1}
          </h1>
          <p className="text-xs text-muted-foreground mb-6">
            Par{" "}
            <Link href={AUTHOR_URL} className="text-iter-violet hover:underline">
              {AUTHOR_NAME}
            </Link>
            {" · "}
            <time dateTime={PUBLISHED_DATE}>Mis à jour en mai 2026</time>
          </p>
        </div>
      </section>

      {/* Body — htmlContent from the source blog article */}
      <section className="bg-background py-2 sm:py-4">
        <div className="container max-w-3xl">
          <div
            className="prose prose-sm sm:prose-base max-w-none prose-headings:font-heading prose-headings:text-foreground prose-a:text-iter-violet prose-strong:text-foreground prose-li:marker:text-iter-violet"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="container max-w-3xl space-y-12 sm:space-y-14">
          {/* FAQ — visible accordion synced 1:1 with FAQPage JSON-LD */}
          <div id="faq" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 leading-tight">
              Questions fréquentes
            </h2>
            <div className="space-y-3">
              {FAQ.map((q) => (
                <details
                  key={q.question}
                  className="group rounded-lg border border-border/60 bg-background"
                >
                  <summary className="cursor-pointer p-4 sm:p-5 font-semibold text-foreground flex items-start justify-between gap-3 list-none">
                    <h3 className="text-base sm:text-lg font-heading m-0">{q.question}</h3>
                    <span
                      aria-hidden
                      className="text-iter-violet shrink-0 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
                    <p>{q.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Pour aller plus loin */}
          <div className="rounded-3xl border border-border/60 bg-muted/30 p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-3">
              Pour aller plus loin
            </p>
            <ul className="space-y-2 list-none pl-0">
              <li className="flex gap-2.5 text-sm sm:text-base">
                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                <Link href={HUB_URL} className="text-iter-violet hover:underline">
                  Hub : Fiscalité Espagne France — guide complet
                </Link>
              </li>
              <li className="flex gap-2.5 text-sm sm:text-base">
                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                <Link href="/ressources/fiscalite/beckham-law" className="text-iter-violet hover:underline">
                  Loi Beckham : conditions d&apos;éligibilité et économies d&apos;impôt
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <aside className="rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Une question fiscale franco-espagnole ?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Nos experts vous accompagnent pour clarifier votre situation et
              sécuriser votre structuration. Premier échange offert de 30 minutes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
            >
              Demander un diagnostic
              <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      <CTASection locale="fr" />
    </PageLayout>
  );
}
