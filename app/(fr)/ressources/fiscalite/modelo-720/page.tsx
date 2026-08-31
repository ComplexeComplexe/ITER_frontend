import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import References from "@/components/References";
import { getFiscaliteReferences } from "@/lib/content/references";
import { faqPageSchema } from "@/lib/schemas";
import { blogPosts } from "@/lib/content/blog-posts";

/**
 * Pillar page of the "Fiscalité Espagne France" cocoon.
 * Created 2026-05-31 (ticket: complete fiscalite cocoon — pillars 2-5).
 *
 * Body content is sourced from the validated blog post at slug
 * "modelo-720-declaration-biens-etranger" in lib/content/blog-posts.ts so the
 * pillar and the corresponding /ressources/blog/<slug> article stay in
 * lockstep without duplicating the htmlContent in two places.
 *
 * Schemas: Article (author Florent Greth, datePublished) + FAQPage + BreadcrumbList.
 * ProfessionalService is already site-wide via app/layout.tsx.
 */

const SOURCE_SLUG = "modelo-720-declaration-biens-etranger";
const PAGE_URL = "https://www.iteradvisors.com/ressources/fiscalite/modelo-720";
const HUB_URL = "/ressources/fiscalite-espagne-france";
const PUBLISHED_DATE = "2026-05-31";
// SEO-07 (2026-08-31) — la page affichait « mis à jour en mai » et déclarait
// dateModified = datePublished, alors qu'elle a été substantiellement révisée
// en août (sources primaires, contenu). Date réelle, jamais celle du build.
const MODIFIED_DATE = "2026-08-31";
const AUTHOR_NAME = "Florent Greth";
const AUTHOR_URL = "/a-propos/florent-greth";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Modelo 720 Espagne : biens à l'étranger | Iter Advisors",
  description: "Résident fiscal en Espagne ? Déclarez vos comptes, assurances-vie et biens immobiliers situés en France via le Modelo 720 si leur valeur dépasse 50 000 €.",
  path: "/ressources/fiscalite/modelo-720",
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn\'t crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ derived from the validated content of the source blog article. The
   visible <details> accordion and the FAQPage JSON-LD render from the same
   array so they stay 1:1. */
const FAQ: { question: string; answer: string }[] = [
  {
    question: "Qui doit déclarer le Modelo 720 en Espagne ?",
    answer:
      "Tout résident fiscal en Espagne possédant des biens ou des droits situés à l'étranger dont la valeur totale dépasse 50 000 € dans l'une des trois catégories (comptes bancaires, valeurs/assurances-vie, immobilier). Le seuil s'apprécie par catégorie distincte.",
  },
  {
    question: "Quel est le délai pour déposer le Modelo 720 ?",
    answer:
      "La déclaration doit être effectuée par voie télématique auprès de l'Agencia Tributaria (AEAT) entre le 1er janvier et le 31 mars de l'année suivant l'exercice concerné (par exemple, avant le 31 mars 2026 pour l'exercice 2025).",
  },
  {
    question: "Quelles sont les sanctions Modelo 720 en 2026 ?",
    answer:
      "Suite à la condamnation par la CJUE jugeant les sanctions initiales \"disproportionnées\", les amendes forfaitaires fixes extrêmement lourdes ont été supprimées. Le régime général des sanctions fiscales s'applique désormais, mais l'obligation déclarative reste strictement en vigueur.",
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
          "Résident fiscal en Espagne ? Déclarez vos comptes, assurances-vie et biens immobiliers situés en France via le Modelo 720 si leur valeur dépasse 50 000 €.",
        datePublished: PUBLISHED_DATE,
        dateModified: MODIFIED_DATE,
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
              { label: "Modelo 720" },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight">
            {post.h1}
          </h1>
          <p className="text-xs text-muted-foreground mb-6">
            Par{" "}
            <Link href={AUTHOR_URL} rel="author" className="text-iter-violet hover:underline">
              {AUTHOR_NAME}
            </Link>
            {" · "}
            <time dateTime={MODIFIED_DATE}>Mis à jour le 31 août 2026</time>
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
              {/* MAILLAGE-T7 (2026-08-31) — le cluster fiscalité était bien maillé

                  en interne mais coupé de l'offre : aucun lien vers le cabinet qui

                  traite précisément ces situations depuis Barcelone. */}

              <li className="flex gap-2.5 text-sm sm:text-base">

                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />

                <Link href="/daf-externalise-barcelone" className="text-iter-violet hover:underline">

                  DAF externalisé à Barcelone — pilotage financier France-Espagne

                </Link>

              </li>
              <li className="flex gap-2.5 text-sm sm:text-base">
                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                <Link href={HUB_URL} className="text-iter-violet hover:underline">
                  Hub : Fiscalité Espagne France — guide complet
                </Link>
              </li>
              {/* SEO-ULT §4b (2026-08-15) — un lien « Article blog » pointait
                  ici vers /ressources/blog/${SOURCE_SLUG}, qui redirige vers
                  cette page même : le lecteur revenait où il était. Cette page
                  EST l'article, la ligne n'avait plus d'objet. */}
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

      {/* GEO-02 (2026-08-26) — cette page décrivait des obligations

          fiscales, leurs seuils et leurs sanctions sans citer une seule

          source. Les références sont vérifiées une à une dans

          lib/content/references.ts. */}

      <References locale="fr" refs={getFiscaliteReferences("modelo-720")} />

      <CTASection locale="fr" />
    </PageLayout>
  );
}
