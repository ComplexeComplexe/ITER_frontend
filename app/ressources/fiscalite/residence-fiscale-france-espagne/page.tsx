import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { faqPageSchema } from "@/lib/schemas";

/**
 * Pillar 1 of the "Fiscalité Espagne France" cocoon (Résidence fiscale).
 * Created 2026-05-31 from contenus_piliers_fiscalite.pdf (full content
 * source). Targets the keyword "résidence fiscale espagne" (vol 10, KD 0).
 *
 * Schemas emitted (per livrable_final §2 — Article + FAQPage on pillars):
 *   - Article (author Sébastien Doat, datePublished)
 *   - FAQPage (the 4 H2 questions reformulated as Q/A)
 *   - BreadcrumbList
 * ProfessionalService is already site-wide via app/layout.tsx.
 */

const PAGE_URL = "https://www.iteradvisors.com/ressources/fiscalite/residence-fiscale-france-espagne";
const HUB_URL = "/ressources/fiscalite-espagne-france";
const PUBLISHED_DATE = "2026-05-31";

export const metadata: Metadata = buildMetadata({
  locale: "fr",
  title: "Résidence fiscale Espagne vs France 2026 | Iter Advisors",
  description:
    "Comment déterminer votre résidence fiscale entre la France et l'Espagne ? Règle des 183 jours, centre des intérêts économiques et foyer. Guide complet 2026.",
  path: "/ressources/fiscalite/residence-fiscale-france-espagne",
  // T1 (2026-06-07): FR-only page — drop EN/ES hreflang so Google
  // doesn\'t crawl synthetic /en|/es URLs that 404.
  disableHreflang: ["en", "es"],
});

/* FAQ pulled from the H2 structure of contenus_piliers_fiscalite.pdf. The
   visible <details> accordion and the FAQPage JSON-LD render from this same
   array so they stay 1:1. */
const FAQ: { question: string; answer: string }[] = [
  {
    question: "Quels sont les 3 critères de résidence fiscale en Espagne ?",
    answer:
      "L'administration fiscale espagnole (Hacienda) applique trois critères stricts : (1) la règle des 183 jours de présence physique sur l'année civile, (2) le centre des intérêts économiques (lieu où s'exerce l'activité principale ou se situe la majorité du patrimoine), (3) le centre des intérêts vitaux, c'est-à-dire la résidence habituelle du conjoint non séparé légalement et/ou des enfants mineurs à charge. Il suffit de remplir un seul de ces critères pour être considéré comme résident fiscal en Espagne.",
  },
  {
    question: "Comment fonctionne la règle des 183 jours en Espagne ?",
    answer:
      "Si vous séjournez plus de 183 jours (consécutifs ou non) sur le territoire espagnol au cours d'une année civile (1er janvier au 31 décembre), vous êtes considéré comme résident fiscal espagnol. Les absences sporadiques (vacances, voyages d'affaires) sont comptabilisées comme du temps passé en Espagne, sauf si vous pouvez prouver votre résidence fiscale dans un autre pays via un certificat officiel.",
  },
  {
    question: "Qu'est-ce que le centre des intérêts économiques en fiscalité espagnole ?",
    answer:
      "Même si vous passez moins de 183 jours en Espagne, vous y serez résident fiscal si le centre principal ou la base de vos activités économiques s'y trouve. Concrètement : si la majorité de vos revenus proviennent d'une activité exercée en Espagne, ou si la majorité de votre patrimoine y est située.",
  },
  {
    question: "Le foyer familial peut-il déterminer la résidence fiscale espagnole ?",
    answer:
      "Oui. L'Espagne présume que vous êtes résident fiscal si votre conjoint non séparé légalement et/ou vos enfants mineurs à charge résident habituellement en Espagne. C'est une présomption qui peut être renversée, mais la charge de la preuve vous incombe.",
  },
  {
    question: "Comment résoudre un conflit de résidence fiscale entre la France et l'Espagne ?",
    answer:
      "Quand une personne remplit les critères de résidence fiscale dans les deux pays, les règles de départage (tie-breaker rules) de la convention fiscale franco-espagnole de 1995 s'appliquent dans l'ordre suivant : (1) foyer d'habitation permanent, (2) centre des intérêts vitaux (liens personnels et économiques les plus étroits), (3) séjour habituel, (4) nationalité.",
  },
];

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${PAGE_URL}#article`,
        url: PAGE_URL,
        headline: "Résidence fiscale France Espagne : comment déterminer où payer ses impôts ?",
        description:
          "Comment déterminer votre résidence fiscale entre la France et l'Espagne ? Règle des 183 jours, centre des intérêts économiques et foyer.",
        datePublished: PUBLISHED_DATE,
        dateModified: PUBLISHED_DATE,
        inLanguage: "fr-FR",
        author: {
          "@type": "Person",
          name: "Sébastien Doat",
          url: "https://www.iteradvisors.com/a-propos/sebastien-doat",
        },
        publisher: { "@id": "https://www.iteradvisors.com/#organization" },
        isPartOf: {
          "@type": "CollectionPage",
          "@id": `https://www.iteradvisors.com${HUB_URL}#collection`,
        },
      },
      // Same FAQ data as the visible <details> accordion below.
      faqPageSchema(FAQ),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: "https://www.iteradvisors.com/" },
          { "@type": "ListItem", position: 2, name: "Ressources", item: "https://www.iteradvisors.com/ressources" },
          { "@type": "ListItem", position: 3, name: "Fiscalité Espagne France", item: `https://www.iteradvisors.com${HUB_URL}` },
          { "@type": "ListItem", position: 4, name: "Résidence fiscale", item: PAGE_URL },
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
              { label: "Résidence fiscale" },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight">
            Résidence fiscale France Espagne : comment déterminer où payer ses impôts ?
          </h1>
          <p className="text-xs text-muted-foreground mb-6">
            Par{" "}
            <Link
              href="/a-propos/sebastien-doat"
              className="text-iter-violet hover:underline"
            >
              Sébastien Doat
            </Link>
            {" · "}
            <time dateTime={PUBLISHED_DATE}>Mis à jour en mai 2026</time>
          </p>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
            La détermination de la résidence fiscale est la clé de voûte de
            votre imposition. Contrairement à une idée reçue, il ne suffit pas
            de s&apos;inscrire au consulat ou d&apos;obtenir un NIE pour devenir
            résident fiscal espagnol. L&apos;administration fiscale espagnole
            (<em>Hacienda</em>) applique trois critères stricts. Il suffit de
            remplir <strong className="text-foreground">un seul</strong> de ces
            critères pour être considéré comme résident fiscal en Espagne.
          </p>
        </div>
      </section>

      <section className="bg-background py-12 sm:py-16">
        <div className="container max-w-3xl space-y-12 sm:space-y-14">
          {/* Critère 1 */}
          <div id="critere-1-183-jours" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Critère 1 : la règle des 183 jours (permanence physique)
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Si vous séjournez plus de{" "}
              <strong className="text-foreground">183 jours</strong> (consécutifs
              ou non) sur le territoire espagnol au cours d&apos;une année
              civile (du 1<sup>er</sup> janvier au 31 décembre), vous êtes
              considéré comme résident fiscal espagnol. Les absences sporadiques
              (vacances, voyages d&apos;affaires) sont comptabilisées comme du
              temps passé en Espagne, sauf si vous pouvez prouver votre
              résidence fiscale dans un autre pays via un certificat officiel.
            </p>
          </div>

          {/* Critère 2 */}
          <div id="critere-2-interets-economiques" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Critère 2 : le centre des intérêts économiques
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Même si vous passez moins de 183 jours en Espagne, vous y serez
              résident fiscal si le centre principal ou la base de vos activités
              économiques s&apos;y trouve. Par exemple, si la majorité de vos
              revenus proviennent d&apos;une activité exercée en Espagne ou si
              la majorité de votre patrimoine y est située.
            </p>
          </div>

          {/* Critère 3 */}
          <div id="critere-3-foyer-familial" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Critère 3 : le centre des intérêts vitaux (foyer familial)
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              L&apos;Espagne présume que vous êtes résident fiscal si votre
              conjoint(e) non séparé(e) légalement et/ou vos enfants mineurs à
              charge résident habituellement en Espagne. C&apos;est une
              présomption qui peut être renversée, mais la charge de la preuve
              vous incombe.
            </p>
          </div>

          {/* Conflit de résidence */}
          <div id="conflit-residence" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              Que se passe-t-il en cas de conflit de résidence ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Il arrive fréquemment qu&apos;une personne remplisse les critères
              de résidence fiscale dans les deux pays (par exemple, une famille
              en Espagne mais des revenus majoritairement en France). Dans ce
              cas, ce sont les « règles de départage » (<em>tie-breaker rules</em>)
              de la convention fiscale franco-espagnole de 1995 qui
              s&apos;appliquent, dans un ordre précis :
            </p>
            <ol className="space-y-2 list-decimal pl-6 text-sm sm:text-base text-muted-foreground">
              <li>Foyer d&apos;habitation permanent.</li>
              <li>Centre des intérêts vitaux (liens personnels et économiques les plus étroits).</li>
              <li>Séjour habituel.</li>
              <li>Nationalité.</li>
            </ol>
          </div>

          {/* FAQ — visible accordion synced 1:1 with the FAQPage JSON-LD */}
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
                <Link
                  href="/ressources/blog/impot-revenu-espagne"
                  className="text-iter-violet hover:underline"
                >
                  Impôt sur le revenu en Espagne (IRPF) : guide complet 2026
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <aside className="rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Un doute sur votre statut de résident fiscal ?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Nos experts vous aident à clarifier votre situation pour éviter
              tout risque de redressement. Premier échange offert de 30 minutes.
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
