import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import { getCmsNavigation } from "@/lib/strapi";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        title: "Fractional CFO pour startups",
        description:
          "Iter Advisors recrute des fractional CFOs seniors pour accompagner un portefeuille de startups tech (SaaS, deep-tech, e-commerce) basées en France et en Espagne. Vous prendrez en charge la direction financière de 3 à 5 clients en parallèle, sur un mode part-time flexible (freelance, portage ou CDI).",
        datePosted: "2026-05-04",
        validThrough: "2026-12-31",
        employmentType: ["CONTRACTOR", "FULL_TIME", "PART_TIME"],
        hiringOrganization: {
          "@type": "Organization",
          name: "Iter Advisors",
          sameAs: "https://www.iteradvisors.com",
          logo: "https://www.iteradvisors.com/images/logos/logo-hero.webp",
        },
        jobLocation: [
          {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Barcelona",
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
        url: "https://www.iteradvisors.com/jobs/fractional-cfo-startups",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Iter Advisors",
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
            name: "Fractional CFO startups",
            item: "https://www.iteradvisors.com/jobs/fractional-cfo-startups",
          },
        ],
      },
    ],
  };

  return {
    title: "Fractional CFO startups — recrutement | Iter Advisors",
    description:
      "Rejoignez Iter Advisors comme fractional CFO. Cabinet basé à Barcelone, Paris, Toulouse. +85 entreprises tech accompagnées, +100 M€ levés. Postes ouverts.",
    openGraph: {
      title: "Fractional CFO startups — recrutement | Iter Advisors",
      description:
        "Rejoignez Iter Advisors comme fractional CFO. Cabinet basé à Barcelone, Paris, Toulouse. +85 entreprises tech accompagnées, +100 M€ levés. Postes ouverts.",
      url: "https://www.iteradvisors.com/jobs/fractional-cfo-startups",
      type: "website",
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Carrières", href: "/jobs" },
              { label: "Fractional CFO startups" },
            ]}
          />
          <div className="mt-8 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Fractional CFO pour startups : rejoignez Iter Advisors
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              <strong>Vous êtes un CFO senior</strong> qui souhaite accompagner
              plusieurs startups tech à la fois, en gardant la flexibilité d'un
              mode part-time ? Iter Advisors recrute des{" "}
              <strong>fractional CFOs</strong> pour ses bureaux de Barcelone,
              Paris et Toulouse.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              En tant que <strong>fractional CFO</strong> chez Iter Advisors,
              vous prenez en charge la direction financière de 3 à 5 startups en
              parallèle, en moyenne 2 à 8 jours par mois et par client. Vous
              combinez ainsi la liberté du freelancing avec la stabilité d'un
              cabinet structuré et la richesse d'un portefeuille diversifié.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={18} />
                Envoyer votre CV
              </a>
              <a
                href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
              >
                <Linkedin size={18} />
                Contacter Sébastien
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl space-y-16 sm:space-y-24">
          {/* Le rôle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Le rôle d'un fractional CFO chez Iter Advisors
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Un <strong>fractional CFO</strong> (ou DAF à temps partagé) est
                un directeur financier senior qui intervient dans plusieurs
                entreprises sans être salarié à temps plein dans aucune. Il
                assume les mêmes responsabilités qu'un CFO interne — pilotage
                financier, trésorerie, reporting, relations investisseurs —
                mais sur un mode flexible adapté aux besoins de chaque startup.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Chez Iter Advisors, vos missions typiques incluent :
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                <li>
                  • Mettre en place et opérer le reporting financier mensuel
                </li>
                <li>
                  • Piloter la trésorerie et construire les prévisionnels (cash
                  flow forecast 13 semaines, plan de trésorerie 12 mois)
                </li>
                <li>
                  • Préparer et accompagner les levées de fonds (data room,
                  business plan, négociation term sheet)
                </li>
                <li>
                  • Structurer le contrôle de gestion et les KPIs business
                  (ARR, NRR, CAC, LTV pour le SaaS)
                </li>
                <li>
                  • Conseiller la direction sur les décisions stratégiques
                  (pricing, recrutements, M&A)
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
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Profil recherché
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-3">
                  Expérience
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • <strong>10 ans minimum</strong> en direction financière
                    (CFO, DAF, head of finance) dans des startups VC-backed ou
                    des PME en croissance
                  </li>
                  <li>
                    • Expérience d'au moins une <strong>levée de fonds Series A ou B</strong> menée en tant que CFO
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
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-3">
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
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-3">
                  Mindset
                </h3>
                <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Autonomie et capacité à gérer plusieurs clients en
                    parallèle
                  </li>
                  <li>
                    • Goût pour les environnements entrepreneuriaux et
                    l'incertitude
                  </li>
                  <li>
                    • Pragmatisme : on construit, on teste, on ajuste
                  </li>
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
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Ce que nous proposons
            </h2>
            <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                • <strong>Modèle d'engagement flexible</strong> : freelance,
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
                de prospection à faire, vous arrivez sur des missions qualifiées
              </li>
              <li>
                • <strong>Équipe support</strong> : analystes financiers et
                CFOs partners pour vous épauler sur les missions complexes
              </li>
              <li>
                • <strong>Réseau d'experts</strong> : avocats d'affaires,
                banquiers, experts-comptables, fonds VCs partenaires
              </li>
              <li>
                • <strong>Formation continue</strong> et participation à des
                conférences (DFCG, France Digitale, EU-Startups)
              </li>
              <li>
                • <strong>Culture fondée sur la confiance et l'autonomie</strong>
              </li>
            </ul>
          </div>

          {/* Pourquoi rejoindre */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
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
                • <strong>Backup en cas d'imprévu</strong> : un partner peut
                prendre le relai sur un client si besoin
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
                aussi bien en France qu'en Espagne, vous élargissez votre champ
                d'intervention
              </li>
            </ul>
          </div>

          {/* Chiffres */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Iter Advisors en quelques chiffres
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • <strong>+85 entreprises</strong> tech accompagnées depuis 2019
              </li>
              <li>
                • <strong>+100 M€</strong> levés par nos clients (seed, Series A,
                Series B)
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
                et présent dans l'écosystème{" "}
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
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
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
              <li>
                1️⃣ Échange initial de 30 minutes avec Sébastien (founding
                partner)
              </li>
              <li>
                2️⃣ Entretien approfondi avec un partner et un CFO senior (1h30)
              </li>
              <li>
                3️⃣ Cas pratique sur un dossier client réel anonymisé (2h, à
                votre rythme)
              </li>
              <li>4️⃣ Rencontre informelle avec l'équipe</li>
              <li>5️⃣ Offre et démarrage sous 4 semaines maximum</li>
            </ol>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
              <strong>Délai moyen entre la candidature et la première mission : 6 semaines</strong>.
            </p>
          </div>

          {/* Pour aller plus loin */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Pour aller plus loin
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Avant de candidater, vous pouvez approfondir votre compréhension
              de notre métier et de notre approche :
            </p>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                • <Link
                  href="/daf-externalise"
                  className="text-iter-violet hover:underline"
                >
                  Notre offre de DAF externalisé
                </Link>{" "}
                — la version FR de ce que vous ferez côté client
              </li>
              <li>
                • <Link
                  href="/daf-externalise"
                  className="text-iter-violet hover:underline"
                >
                  DAF à temps partagé : missions, formules et tarifs
                </Link>
              </li>
              <li>
                • <Link
                  href="/services/controle-de-gestion-externalise"
                  className="text-iter-violet hover:underline"
                >
                  Contrôle de gestion externalisé
                </Link>{" "}
                — l'une de vos missions clés côté client
              </li>
              <li>
                • <Link
                  href="/services/comptabilite-externalisation"
                  className="text-iter-violet hover:underline"
                >
                  Externalisation comptable
                </Link>{" "}
                — la base de votre travail
              </li>
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              FAQ — questions fréquentes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                  Suis-je obligé(e) d'être en freelance ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Non. Nous proposons trois modes d'engagement : freelance pur,
                  portage salarial ou CDI temps plein avec rémunération variable
                  selon les missions. Le choix dépend de votre situation
                  personnelle et fiscale.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                  Puis-je continuer à avoir des clients en propre en parallèle ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Oui, à condition qu'il n'y ait pas de conflit d'intérêts avec
                  nos clients (concurrence directe). Nous validons cela ensemble
                  lors de la signature.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                  Combien de jours par mois faut-il être disponible ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Au minimum 8 jours par mois (équivalent 2 missions de formule
                  Essentiel). La plupart de nos fractional CFOs travaillent
                  entre 12 et 18 jours par mois pour Iter Advisors.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                  Y a-t-il une obligation de présence à Barcelone, Paris ou
                  Toulouse ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Non. Vous pouvez résider n'importe où en France, en Espagne ou
                  en Europe. Une présence ponctuelle dans nos bureaux est
                  appréciée pour les comités, mais pas obligatoire. La plupart
                  des missions se déroulent en hybride (1 jour sur site / 1 jour
                  distant) ou 100 % distant.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                  Quel est le profil typique d'un fractional CFO recruté chez
                  Iter Advisors ?
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Ancien CFO ou head of finance dans une scale-up (Series A à
                  Series C), 10–20 ans d'expérience, ayant déjà mené au moins
                  une levée de fonds. La majorité de nos CFOs ont une expérience
                  SaaS, deep-tech ou e-commerce.
                </p>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
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

          {/* CTA Final */}
          <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Prêt à rejoindre l'équipe ?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={18} />
                Envoyer votre CV
              </a>
              <a
                href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
              >
                <Linkedin size={18} />
                Contacter Sébastien
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale="fr" />
    </PageLayout>
  );
}
