import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import PageLayout from "@/components/PageLayout";
import FinanceExpert from "@/components/FinanceExpert";
import { FINANCE_EXPERT } from "@/lib/content/finance-expert";
import {
  PENNYLANE_REVIEW as review,
  PENNYLANE_SOURCES as sources,
} from "@/data/pennylaneReview";
import {
  generateFAQSchema,
  generateToolArticleSchema,
  getToolAuthor,
} from "@/lib/schemas/toolSchemas";
import type { ToolPageProps } from "./ToolPage";

const sections = [
  ["verdict", "Notre avis"],
  ["experience", "Notre expérience"],
  ["profils", "Pour qui ?"],
  ["analyse", "Avantages et limites"],
  ["tarifs", "Tarifs"],
  ["selection", "Avant de migrer"],
  ["alternatives", "Alternatives"],
  ["faq", "Questions"],
  ["sources", "Sources"],
] as const;
const heading = "text-2xl lg:text-3xl font-bold font-heading mb-6";
const copy = "site-copy text-foreground/80 leading-relaxed";
const link = "text-iter-violet underline underline-offset-4";

/** Server-rendered review: one source of truth for visible content and FAQ schema. */
export default function PennylaneReviewPage({
  tool,
  cmsNavigation,
}: ToolPageProps) {
  const author = getToolAuthor(tool);
  const article = {
    ...generateToolArticleSchema(tool),
    headline: review.headline,
    description: review.description,
    dateModified: review.reviewedAt,
    image:
      "https://www.iteradvisors.com/images/logos/tools/pennylane-official.png",
  };
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateFAQSchema(tool.name, [...review.faq], tool.slug),
          ),
        }}
      />
      <section className="site-hero bg-background pt-32 pb-10">
        <div className="container max-w-5xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Ressources", href: "/ressources" },
              { label: "Outils", href: "/ressources/outils" },
              {
                label: "Comptabilité",
                href: "/ressources/outils/logiciels-comptabilite",
              },
              { label: "Avis Pennylane" },
            ]}
          />
          <div className="mt-8 flex items-center gap-3">
            <Image
              src={tool.logo}
              alt="Logo Pennylane"
              width={48}
              height={48}
            />
            <p className="text-sm font-semibold text-iter-violet">
              Analyse de la fonction finance
            </p>
          </div>
          <h1 className="max-w-4xl text-4xl lg:text-5xl font-bold font-heading mt-5 mb-5">
            {review.headline}
          </h1>
          <p className="text-sm text-muted-foreground mb-5">
            Repères éditoriaux par{" "}
            <Link href={author.url} rel="author" className={link}>
              {author.name}
            </Link>{" "}
            ({FINANCE_EXPERT.role}) · documentation vérifiée le{" "}
            <time dateTime={review.reviewedAt}>3 octobre 2026</time>
          </p>
          <p className={`${copy} text-lg max-w-3xl`}>{review.intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            Retour d’usage du cabinet et documentation éditeur. Les exemples de
            tests ci-dessous ne sont pas des résultats clients mesurés.{" "}
            <Link href="/ressources/outils/methode" className={link}>
              Lire notre méthode éditoriale
            </Link>
            .
          </p>
          <nav
            aria-label="Sommaire de l’avis Pennylane"
            className="mt-7 flex flex-wrap gap-2"
          >
            {sections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className="rounded-full border border-border px-4 py-2 text-sm hover:border-iter-violet hover:text-iter-violet focus-visible:outline-2 focus-visible:outline-iter-violet"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <div className="container max-w-5xl pb-16">
        <section
          id="verdict"
          className="scroll-mt-28 site-card rounded-3xl border border-iter-violet/20 bg-iter-violet/5 p-6 lg:p-8"
        >
          <h2 className={heading}>Notre avis Pennylane en bref</h2>
          <p className={copy}>{review.verdict}</p>
          <div className="mt-7 grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Ce qui rend le choix intéressant",
                items: review.strengths,
              },
              { title: "Les conditions à vérifier", items: review.cautions },
            ].map((group) => (
              <div key={group.title}>
                <h3 className="font-semibold mb-3">{group.title}</h3>
                <ul className="list-disc pl-5 space-y-3 text-foreground/80">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm">
            <a href="#analyse" className={link}>
              Voir les sources et les vérifications pour chaque point
            </a>
          </p>
        </section>
        <section id="experience" className="scroll-mt-28 pt-12">
          <h2 className={heading}>{review.experience.heading}</h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <p className="rounded-2xl border border-border p-5 font-semibold">
              {review.experience.duration}
            </p>
            <p className="rounded-2xl border border-border p-5 font-semibold">
              {review.experience.coverage}
            </p>
          </div>
          <p className={`${copy} max-w-3xl`}>{review.experience.benefits}</p>
          <p className={`${copy} max-w-3xl mt-4`}>
            {review.experience.limitation}
          </p>
          <p className="text-sm text-muted-foreground mt-5">
            {review.experience.attribution}{" "}
            <Link href="/a-propos/guillaume-rostand" className={link}>
              Son rôle chez Iter Advisors
            </Link>
            .
          </p>
        </section>
        <section id="profils" className="scroll-mt-28 py-12">
          <h2 className={heading}>
            À quelles entreprises Pennylane convient-il ?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {review.profiles.map((profile) => (
              <div
                key={profile.title}
                className="site-card rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold mb-3">{profile.title}</h3>
                <p className={copy}>{profile.text}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="analyse" className="scroll-mt-28 pb-12">
          <h2 className={heading}>
            Avantages et limites : six points à examiner avec votre DAF
          </h2>
          <div className="space-y-8 max-w-3xl">
            {review.criteria.map((criterion) => (
              <div key={criterion.title}>
                <h3 className="text-xl font-semibold mb-3">
                  {criterion.title}
                </h3>
                <p className={copy}>{criterion.fact}</p>
                <p className="mt-2 text-sm">
                  <a href={sources[criterion.source].url} className={link}>
                    {sources[criterion.source].label} : documentation Pennylane
                  </a>
                </p>
                <p className={`${copy} mt-4`}>
                  <strong>Notre lecture de CFO.</strong> {criterion.analysis}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section
          id="tarifs"
          className="scroll-mt-28 py-10 border-y border-border"
        >
          <h2 className={heading}>
            Tarifs Pennylane : comparer la même configuration
          </h2>
          <p className={`${copy} max-w-3xl mb-5`}>
            Repères affichés par l’éditeur pour la configuration TPE à 5
            utilisateurs gestion, consultés le 3 octobre 2026. Il existe
            d’autres configurations ; ces montants ne constituent pas un devis
            pour votre PME.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full text-sm">
              <caption className="sr-only">
                Tarifs publics Pennylane, TPE à 5 utilisateurs gestion au 3
                octobre 2026
              </caption>
              <thead className="bg-iter-violet/5">
                <tr>
                  <th scope="col" className="p-4 text-left">
                    Formule
                  </th>
                  <th scope="col" className="p-4 text-left">
                    Prix public HT
                  </th>
                  <th scope="col" className="p-4 text-left">
                    Configuration
                  </th>
                </tr>
              </thead>
              <tbody>
                {review.pricing.map((row) => (
                  <tr key={row.plan} className="border-t border-border">
                    <th scope="row" className="p-4 text-left font-medium">
                      {row.plan}
                    </th>
                    <td className="p-4 whitespace-nowrap">{row.price}</td>
                    <td className="p-4">{row.scope}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm">
            <a href={sources.pricing.url} className={link}>
              Vérifier la grille tarifaire officielle et les conditions
              actuelles
            </a>
          </p>
          <p className={`${copy} mt-5 max-w-3xl`}>
            L’offre Custom est sur mesure. La facture du projet inclut aussi la
            reprise, la formation, les connexions et le temps de contrôle.
            Obtenez un devis au même périmètre pour chaque solution, avec les
            fonctions indispensables explicitement incluses. Un prix d’appel
            pour un indépendant ne représente pas le coût d’une équipe finance.
          </p>
        </section>
        <section id="selection" className="scroll-mt-28 py-12">
          <h2 className={heading}>
            Avant de migrer : cinq vérifications concrètes
          </h2>
          <p className={`${copy} max-w-3xl mb-6`}>
            Ce protocole de sélection sert à préparer une démonstration et une
            reprise. Il ne remplace pas le plan de migration établi avec votre
            cabinet. Définissez les critères de validation avant le test et
            conservez la trace des écarts.
          </p>
          <ol className="space-y-5 max-w-3xl">
            {review.steps.map((step, index) => (
              <li
                key={step.title}
                id={`step${index + 1}`}
                className="scroll-mt-28 rounded-2xl border border-border p-6"
              >
                <h3 className="font-semibold mb-3">
                  {index + 1}. {step.title}
                </h3>
                <p className={copy}>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="alternatives" className="scroll-mt-28 pb-12">
          <h2 className={heading}>Quelles alternatives considérer ?</h2>
          <p className={`${copy} mb-6 max-w-3xl`}>
            Choisir un outil est un arbitrage entre vos contraintes, les
            fonctions couvertes et le coût de changement. Une recommandation
            utile dépend du dossier ; un classement unique ne le remplace pas.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {review.alternatives.map((item) => (
              <div
                key={item.name}
                className="site-card rounded-2xl border border-border p-5"
              >
                <h3 className="font-semibold mb-3">
                  <Link href={item.href} className={link}>
                    {item.name}
                  </Link>
                </h3>
                <p className={copy}>{item.text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5">
            <Link
              href="/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements"
              className={link}
            >
              Pennylane vs Sage : la grille de comparaison
            </Link>{" "}
            ·{" "}
            <Link
              href="/ressources/outils/logiciels-comptabilite"
              className={link}
            >
              Les critères de sélection d’un logiciel comptable
            </Link>
          </p>
        </section>
        <section id="faq" className="scroll-mt-28 pb-12">
          <h2 className={heading}>Questions fréquentes sur Pennylane</h2>
          <div className="space-y-4 max-w-3xl">
            {review.faq.map((item) => (
              <details
                key={item.question}
                className="rounded-2xl border border-border p-5"
              >
                <summary className="cursor-pointer font-semibold">
                  {item.question}
                </summary>
                <p className={`${copy} mt-4`}>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <section
          id="sources"
          className="scroll-mt-28 border-t border-border pt-10"
        >
          <h2 className={heading}>Sources et méthode</h2>
          <p className={`${copy} max-w-3xl`}>
            Chaque source officielle ci-dessous a été consultée le 3 octobre
            2026. Les faits produit sont distingués de notre analyse et du
            retour d’usage du cabinet, confirmé par Guillaume Rostand le 3
            octobre 2026. Les fonctions et les tarifs peuvent évoluer ; vérifiez
            leur disponibilité dans votre offre avant de signer. Cette page ne
            publie pas de note ni de mesure de performance client.
          </p>
          <ul className="mt-5 space-y-2">
            {Object.values(sources).map((source) => (
              <li key={source.url}>
                <a href={source.url} className={link}>
                  {source.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-5">
            <Link href="/ressources/outils/methode" className={link}>
              Comment nous préparons nos analyses d’outils
            </Link>
          </p>
          <div className="mt-8">
            <FinanceExpert locale="fr" />
          </div>
          <p className={`${copy} mt-6`}>
            Besoin de cadrer le projet ? Notre{" "}
            <Link
              href="/services/comptabilite-externalisation"
              className={link}
            >
              accompagnement de la fonction comptable
            </Link>{" "}
            précise le rôle d’Iter et celui de votre expert-comptable. Un{" "}
            <Link href="/daf-externalise" className={link}>
              DAF externalisé
            </Link>{" "}
            peut organiser les indicateurs, les contrôles et les décisions
            autour des outils.
          </p>
        </section>
      </div>
    </PageLayout>
  );
}
