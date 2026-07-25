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
 * "loi-beckham-espagne-conditions-2026" in lib/content/blog-posts.ts so the
 * pillar and the corresponding /ressources/blog/<slug> article stay in
 * lockstep without duplicating the htmlContent in two places.
 *
 * Schemas: Article (author Sébastien Doat, datePublished) + FAQPage + BreadcrumbList.
 * ProfessionalService is already site-wide via app/layout.tsx.
 */

const SOURCE_SLUG = "loi-beckham-espagne-conditions-2026";
const PAGE_URL = "https://www.iteradvisors.com/ressources/fiscalite/beckham-law";
const HUB_URL = "/ressources/fiscalite-espagne-france";
const PUBLISHED_DATE = "2026-05-31";
const AUTHOR_NAME = "Sébastien Doat";
const AUTHOR_URL = "/a-propos/sebastien-doat";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Loi Beckham Espagne 2026 : conditions et taux 24% | Iter Advisors",
  description: "Le régime fiscal des impatriés en Espagne : taux fixe d'IRPF à 24 % pendant 6 ans, conditions d'éligibilité 2026, digital nomads. Guide complet.",
  path: "/ressources/fiscalite/beckham-law",
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn\'t crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ derived from the validated content of the source blog article. The
   visible <details> accordion and the FAQPage JSON-LD render from the same
   array so they stay 1:1. */
const FAQ: { question: string; answer: string }[] = [
  {
    question: "Quel est le taux d'imposition de la Loi Beckham ?",
    answer:
      "Vos revenus du travail de source espagnole sont imposés à un taux fixe de 24 % jusqu'à 600 000 €. Au-delà de ce montant, le taux passe à 47 %. C'est bien plus avantageux que le barème progressif IRPF classique (qui atteint déjà 47 % à 300 000 €).",
  },
  {
    question: "Combien de temps dure le régime Beckham ?",
    answer:
      "Le régime s'applique pendant l'année de votre arrivée en Espagne et les cinq années suivantes, soit 6 ans au total.",
  },
  {
    question: "Qui peut bénéficier de la Loi Beckham en 2026 ?",
    answer:
      "Vous devez ne pas avoir été résident fiscal en Espagne au cours des 5 années fiscales précédentes (10 ans avant la réforme). Le déplacement doit être justifié par un contrat de travail, une mutation intra-groupe, ou l'acquisition du statut d'administrateur d'une société. Depuis la loi sur les startups, les digital nomads disposant du visa approprié sont également éligibles.",
  },
  {
    question: "Dans quel délai faut-il faire la demande Beckham ?",
    answer:
      "La demande doit être déposée auprès de l'administration fiscale dans un délai maximum de 6 mois à compter de la date de début de l'activité figurant sur l'inscription à la Sécurité Sociale espagnole.",
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
          "Le régime fiscal des impatriés en Espagne : taux fixe d'IRPF à 24 % pendant 6 ans, conditions d'éligibilité 2026, digital nomads. Guide complet.",
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
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.iteradvisors.com/" },
          { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.iteradvisors.com/ressources" },
          { "@type": "ListItem", position: 3, name: "Fiscalité Espagne France", item: `https://www.iteradvisors.com${HUB_URL}` },
          { "@type": "ListItem", position: 4, name: "Loi Beckham", item: PAGE_URL },
        ],
      },
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
              { label: "Loi Beckham" },
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
                <Link href="/ressources/fiscalite/residence-fiscale-france-espagne" className="text-iter-violet hover:underline">
                  Résidence fiscale France-Espagne : les critères de détermination
                </Link>
              </li>
              <li className="flex gap-2.5 text-sm sm:text-base">
                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                <Link href="/ressources/fiscalite/modelo-720" className="text-iter-violet hover:underline">
                  Modelo 720 : obligations déclaratives pour les biens détenus en France
                </Link>
              </li>
              <li className="flex gap-2.5 text-sm sm:text-base">
                <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                <Link href="/daf-externalise-barcelone" className="text-iter-violet hover:underline">
                  DAF externalisé à Barcelone : accompagnement CFO pour dirigeants impatriés
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
