import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/**
 * Route for /carrieres/fractional-cfo.
 *
 * Created 2026-05-30 (FCFO-S01 / FCFO-S02). The recruitment content + the
 * `JobPosting` JSON-LD previously lived at the bottom of
 * /jobs/fractional-cfo-startups, which sent mixed signals to Google
 * (commercial Service + JobPosting on the same URL) and confused both
 * founders and CFO candidates. They now live here, on a dedicated URL with a
 * clean recruitment-only intent — so Google for Jobs continues to surface the
 * offer, /jobs/fractional-cfo-startups can become an unambiguous commercial
 * Service page, and candidates land directly on the right page.
 *
 * Content body extracted verbatim from the prior #jobs-section on
 * /jobs/fractional-cfo-startups (lines 766-1257 at HEAD before the split).
 */

const PAGE_URL = "https://www.iteradvisors.com/carrieres/fractional-cfo";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // ── JobPosting (moved from /jobs/fractional-cfo-startups so Google for
      //    Jobs continues to surface the offer at its canonical URL) ───────
      {
        "@type": "JobPosting",
        title: "Fractional CFO senior — Iter Advisors",
        description:
          "Iter Advisors recrute des fractional CFOs seniors pour accompagner un portefeuille de startups tech (SaaS, deep-tech, e-commerce) basées en France et en Espagne. Vous prendrez en charge la direction financière de 3 à 5 clients en parallèle, sur un mode part-time flexible (freelance, portage ou CDI).",
        datePosted: "2026-05-30",
        validThrough: "2026-12-31",
        employmentType: ["CONTRACTOR", "FULL_TIME", "PART_TIME"],
        hiringOrganization: {
          "@type": "Organization",
          name: "Iter Advisors",
          sameAs: "https://www.iteradvisors.com",
          logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
        },
        jobLocation: [
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Carrer Casp, 54, 5-1°",
              addressLocality: "Barcelona",
              postalCode: "08010",
              addressRegion: "Catalunya",
              addressCountry: "ES",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Paris",
              addressRegion: "Île-de-France",
              addressCountry: "FR",
            },
          },
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Toulouse",
              addressRegion: "Occitanie",
              addressCountry: "FR",
            },
          },
        ],
        jobLocationType: "TELECOMMUTE",
        applicantLocationRequirements: [
          { "@type": "Country", name: "France" },
          { "@type": "Country", name: "Spain" },
          { "@type": "Country", name: "European Union" },
        ],
        baseSalary: {
          "@type": "MonetaryAmount",
          currency: "EUR",
          value: {
            "@type": "QuantitativeValue",
            minValue: 750,
            maxValue: 1250,
            unitText: "DAY",
          },
        },
        directApply: true,
        industry: "Financial Services",
        occupationalCategory: "11-3031.00 Financial Managers",
        qualifications:
          "10+ years of experience as CFO, Head of Finance or DAF in VC-backed startups or growing SMEs. Series A or B fundraising experience required. SaaS metrics expertise highly valued.",
        responsibilities:
          "Monthly financial reporting, cash flow management, fundraising support (data room, business plan, term sheet negotiation), management control, KPIs setup, strategic advisory to founders, board meetings preparation.",
        skills:
          "Pennylane, Sage, Agicap, Notion, Looker, Power BI, financial modelling, cash flow forecasting, fundraising, M&A",
        url: PAGE_URL,
      },
      {
        "@type": "Organization",
        "@id": "https://www.iteradvisors.com/#organization",
        name: "Iter Advisors",
        url: "https://www.iteradvisors.com",
        logo: "https://www.iteradvisors.com/images/logos/logo-og-square.png",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: "https://www.iteradvisors.com/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Carrières",
            item: "https://www.iteradvisors.com/jobs",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Fractional CFO",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return {
    title: "Rejoindre Iter Advisors comme Fractional CFO senior | Iter Advisors",
    description:
      "Iter Advisors recrute des fractional CFOs seniors (10+ ans) pour accompagner un portefeuille de startups tech VC-backed. Freelance, portage ou CDI. Barcelone, Paris, Toulouse — mode hybride.",
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: "Rejoindre Iter Advisors comme Fractional CFO senior",
      description:
        "Iter Advisors recrute des fractional CFOs seniors (10+ ans) pour accompagner un portefeuille de startups tech VC-backed. Freelance, portage ou CDI. Barcelone, Paris, Toulouse — mode hybride.",
      url: PAGE_URL,
      type: "website",
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630 }],
  },
    other: {
      "application/ld+json": JSON.stringify(structuredData),
    },
  };
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Carrières", href: "/jobs" },
              { label: "Fractional CFO" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Rejoindre Iter Advisors comme Fractional CFO senior
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-foreground/80 font-medium leading-relaxed mb-6">
              Accompagnez un portefeuille de startups tech VC-backed (3 à 5
              clients en parallèle) en France et en Espagne. Flexibilité
              d&apos;engagement, équipe de pairs seniors, missions déjà
              qualifiées.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={18} aria-hidden="true" />
                Envoyer votre CV
              </a>
              <Link
                href="/jobs/fractional-cfo-startups"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border/60 text-foreground font-medium hover:border-iter-violet hover:text-iter-violet transition-all"
              >
                Découvrir le service côté client
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Recruitment content (extracted verbatim from the prior
            #jobs-section on /jobs/fractional-cfo-startups) ─── */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl space-y-16 sm:space-y-24">
          {/* Le rôle */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Le rôle d&apos;un fractional CFO chez Iter Advisors
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Un <strong>fractional CFO</strong> (ou DAF à temps partagé) est
                un directeur financier senior qui intervient dans plusieurs
                entreprises sans être salarié à temps plein dans aucune. Il
                assume les mêmes responsabilités qu&apos;un CFO interne —
                pilotage financier, trésorerie, reporting, relations
                investisseurs — mais sur un mode flexible adapté aux besoins de
                chaque startup.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Chez Iter Advisors, vos missions typiques incluent :
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>• Mettre en place et opérer le reporting financier mensuel</li>
                <li>
                  • Piloter la trésorerie et construire les prévisionnels (cash
                  flow forecast 13 semaines, plan de trésorerie 12 mois)
                </li>
                <li>
                  • Préparer et accompagner les levées de fonds (data room,
                  business plan, négociation term sheet)
                </li>
                <li>
                  • Structurer le contrôle de gestion et les KPIs business (ARR,
                  NRR, CAC, LTV pour le SaaS)
                </li>
                <li>
                  • Conseiller la direction sur les décisions stratégiques
                  (pricing, recrutements, M&amp;A)
                </li>
                <li>
                  • Animer les comités stratégiques et les boards investisseurs
                </li>
              </ul>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Vous interviendrez sur un portefeuille de{" "}
                <strong>startups tech en croissance</strong> : SaaS B2B,
                deep-tech, e-commerce, fintech. La majorité de nos clients ont
                entre 10 et 80 personnes, sont basés en France ou en Espagne, et
                ont déjà levé un seed ou une Series A.
              </p>
            </div>
          </div>

          {/* Profil recherché */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Profil recherché
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-3">
                  Expérience
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • <strong>10 ans minimum</strong> en direction financière
                    (CFO, DAF, head of finance) dans des startups VC-backed ou
                    des PME en croissance
                  </li>
                  <li>
                    • Expérience d&apos;au moins une{" "}
                    <strong>levée de fonds Series A ou B</strong> menée en tant
                    que CFO
                  </li>
                  <li>
                    • Idéalement une expérience préalable en mode{" "}
                    <strong>fractional / part-time / freelance</strong> (mais
                    pas obligatoire)
                  </li>
                  <li>
                    • Connaissance approfondie du business model SaaS et de ses
                    métriques (ARR, NRR, CAC, LTV, burn, runway)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-3">
                  Compétences
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Maîtrise des outils modernes : Pennylane, Sage, Agicap,
                    Notion, Looker / Power BI
                  </li>
                  <li>
                    • Capacité à structurer rapidement une fonction finance from
                    scratch
                  </li>
                  <li>
                    • Aisance relationnelle avec les fondateurs et les
                    investisseurs
                  </li>
                  <li>
                    • Anglais professionnel courant (la moitié de nos clients
                    communiquent en anglais)
                  </li>
                  <li>• Espagnol apprécié (cabinet basé à Barcelone)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-3">
                  Mindset
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Autonomie et capacité à gérer plusieurs clients en
                    parallèle
                  </li>
                  <li>
                    • Goût pour les environnements entrepreneuriaux et
                    l&apos;incertitude
                  </li>
                  <li>• Pragmatisme : on construit, on teste, on ajuste</li>
                  <li>
                    • Volonté de transmettre et de faire grandir ses pairs au
                    sein du cabinet
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ce que nous proposons */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Ce que nous proposons
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                • <strong>Modèle d&apos;engagement flexible</strong> : freelance,
                portage salarial ou CDI selon votre situation
              </li>
              <li>
                • <strong>Rémunération attractive</strong> : indexée sur le
                volume de missions et le type de client (typiquement 750–1 250 €
                HT par jour selon séniorité)
              </li>
              <li>
                • <strong>Bureaux centraux</strong> à Barcelone (Rambla de
                Catalunya), Paris et Toulouse — mode hybride, pas de présence
                imposée
              </li>
              <li>
                • <strong>Portefeuille de clients déjà constitué</strong> : pas
                de prospection à faire, vous arrivez sur des missions
                qualifiées
              </li>
              <li>
                • <strong>Équipe support</strong> : analystes financiers et CFOs
                partners pour vous épauler sur les missions complexes
              </li>
              <li>
                • <strong>Réseau d&apos;experts</strong> : avocats d&apos;affaires,
                banquiers, experts-comptables, fonds VCs partenaires
              </li>
              <li>
                • <strong>Formation continue</strong> et participation à des
                conférences (DFCG, France Digitale, EU-Startups)
              </li>
              <li>
                •{" "}
                <strong>
                  Culture fondée sur la confiance et l&apos;autonomie
                </strong>
              </li>
            </ul>
          </div>

          {/* Pourquoi rejoindre */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Pourquoi rejoindre Iter Advisors plutôt que rester en solo ?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Beaucoup de CFOs seniors hésitent entre rester en freelance
              indépendant et rejoindre un cabinet. Voici ce que vous gagnez en
              rejoignant Iter Advisors :
            </p>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                • <strong>Flux de missions stable</strong> : nous générons les
                leads, vous vous concentrez sur la finance
              </li>
              <li>
                • <strong>Backup en cas d&apos;imprévu</strong> : un partner
                peut prendre le relai sur un client si besoin
              </li>
              <li>
                • <strong>Cadre méthodologique partagé</strong> : nos templates
                et nos process accélèrent vos missions
              </li>
              <li>
                • <strong>Communauté de pairs seniors</strong> : 15 CFOs et
                analystes avec qui échanger
              </li>
              <li>
                • <strong>Couverture cross-border</strong> : nos clients sont
                aussi bien en France qu&apos;en Espagne, vous élargissez votre
                champ d&apos;intervention
              </li>
            </ul>
          </div>

          {/* Chiffres */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Iter Advisors en quelques chiffres
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • <strong>+85 entreprises</strong> tech accompagnées depuis 2019
              </li>
              <li>
                • <strong>+100 M€</strong> levés par nos clients (seed, Series
                A, Series B)
              </li>
              <li>
                • <strong>5/5 sur 35 avis Trustfolio</strong>
              </li>
              <li>
                • <strong>3 bureaux</strong> : Barcelone, Paris, Toulouse
              </li>
              <li>
                • Recommandé par{" "}
                <Link
                  href="https://wilco-startup.com"
                  target="_blank"
                  rel="noopener"
                  className="text-iter-violet hover:underline"
                >
                  WILCO
                </Link>{" "}
                et présent dans l&apos;écosystème{" "}
                <Link
                  href="https://francedigitale.org"
                  target="_blank"
                  rel="noopener"
                  className="text-iter-violet hover:underline"
                >
                  France Digitale
                </Link>
              </li>
            </ul>
          </div>

          {/* Comment postuler */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Comment postuler
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Envoyez votre CV et un message court présentant votre parcours et
              vos motivations à{" "}
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="text-iter-violet hover:underline font-semibold"
              >
                recrutement@iteradvisors.com
              </a>
              , ou directement à{" "}
              <a
                href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-iter-violet hover:underline font-semibold"
              >
                Sébastien Doat sur LinkedIn
              </a>
              .
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 font-semibold">
              Le process de recrutement comprend :
            </p>
            <ol className="space-y-2 text-sm sm:text-base text-muted-foreground list-decimal list-inside">
              <li>Échange initial de 30 minutes avec Sébastien (founding partner)</li>
              <li>Entretien approfondi avec un partner et un CFO senior (1h30)</li>
              <li>Cas pratique sur un dossier client réel anonymisé (2h, à votre rythme)</li>
              <li>Rencontre informelle avec l&apos;équipe</li>
              <li>Offre et démarrage sous 4 semaines maximum</li>
            </ol>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
              <strong>
                Délai moyen entre la candidature et la première mission : 6
                semaines
              </strong>
              .
            </p>
          </div>

          {/* Pour aller plus loin */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              Pour aller plus loin
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Avant de candidater, vous pouvez approfondir votre compréhension
              de notre métier et de notre approche :
            </p>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                •{" "}
                <Link
                  href="/daf-externalise"
                  className="text-iter-violet hover:underline"
                >
                  Notre offre de DAF externalisé
                </Link>{" "}
                — la version FR de ce que vous ferez côté client
              </li>
              <li>
                •{" "}
                <Link
                  href="/jobs/fractional-cfo-startups"
                  className="text-iter-violet hover:underline"
                >
                  Le service Fractional CFO côté client
                </Link>{" "}
                — la promesse commerciale que vous délivrerez
              </li>
              <li>
                •{" "}
                <Link
                  href="/services/controle-de-gestion-externalise"
                  className="text-iter-violet hover:underline"
                >
                  Contrôle de gestion externalisé
                </Link>{" "}
                — l&apos;une de vos missions clés côté client
              </li>
              <li>
                •{" "}
                <Link
                  href="/services/comptabilite-externalisation"
                  className="text-iter-violet hover:underline"
                >
                  Externalisation comptable
                </Link>{" "}
                — la base de votre travail
              </li>
            </ul>
          </div>

          {/* FAQ recrutement */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground mb-6">
              FAQ — questions fréquentes sur le recrutement
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Suis-je obligé(e) d&apos;être en freelance ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Non. Nous proposons trois modes d&apos;engagement : freelance
                  pur, portage salarial ou CDI temps plein avec rémunération
                  variable selon les missions. Le choix dépend de votre
                  situation personnelle et fiscale.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Puis-je continuer à avoir des clients en propre en parallèle ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Oui, à condition qu&apos;il n&apos;y ait pas de conflit
                  d&apos;intérêts avec nos clients (concurrence directe). Nous
                  validons cela ensemble lors de la signature.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Combien de jours par mois faut-il être disponible ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Au minimum 8 jours par mois (équivalent 2 missions de formule
                  Essentiel). La plupart de nos fractional CFOs travaillent
                  entre 12 et 18 jours par mois pour Iter Advisors.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Y a-t-il une obligation de présence à Barcelone, Paris ou Toulouse ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Non. Vous pouvez résider n&apos;importe où en France, en
                  Espagne ou en Europe. Une présence ponctuelle dans nos bureaux
                  est appréciée pour les comités, mais pas obligatoire. La
                  plupart des missions se déroulent en hybride (1 jour sur site
                  / 1 jour distant) ou 100 % distant.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Quel est le profil typique d&apos;un fractional CFO recruté chez Iter Advisors ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Ancien CFO ou head of finance dans une scale-up (Series A à
                  Series C), 10–20 ans d&apos;expérience, ayant déjà mené au
                  moins une levée de fonds. La majorité de nos CFOs ont une
                  expérience SaaS, deep-tech ou e-commerce.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Quel est le délai entre ma candidature et la première mission ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  En moyenne 6 semaines : 3 semaines de process de recrutement,
                  puis 3 semaines pour vous matcher avec un client adapté à
                  votre profil.
                </p>
              </div>
            </div>
          </div>

          {/* CTA recrutement final */}
          <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Prêt à rejoindre l&apos;équipe ?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={18} aria-hidden="true" />
                Envoyer votre CV
              </a>
              <a
                href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
              >
                <Linkedin size={18} aria-hidden="true" />
                Contacter Sébastien
              </a>
            </div>
          </div>
        </div>
      </section>

      <CTASection locale="fr" />
    </PageLayout>
  );
}
