import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getResourcesContent } from "@/lib/content/resources";
import {
  TRUSTFOLIO_RATING,
  TRUSTFOLIO_REVIEW_COUNT,
} from "@/lib/content/facts";
import type { CmsNavItem } from "@/lib/strapi";
import { getStaticBlogListing } from "@/lib/blog-listing";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ResourcesHub from "./ResourcesHub";

const NEWS_HEADINGS: Record<Locale, string[]> = {
  fr: ["Actualités", "Articles"],
  en: ["News", "Articles", "Latest"],
  es: ["Noticias", "Actualidades", "Artículos"],
};

const NEWS_TAG: Record<Locale, string> = {
  fr: "Blog",
  en: "Blog",
  es: "Blog",
};

export default function ResourcesPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getResourcesContent(locale);

  // FR gets the SEO-16 rich rewrite (~1200 words, 6 thematic sections + how-to-use
  // + CTA). EN/ES keep the existing card-grid rendering until their content is
  // translated. The FR branch returns early — everything below the if block is
  // the legacy rendering used for EN/ES only.
  if (locale === "fr") {
    return <ResourcesPageFR cmsNavigation={cmsNavigation} />;
  }

  // ─── Legacy card-grid rendering (EN / ES) ──────────────────────────────
  // Replace the hard-coded "Actualités" cards with the 4 newest static
  // articles from lib/content/blog-posts.ts so /ressources stays in sync
  // with /ressources/blog (which now lists all 26 static articles).
  const newsHeadings = NEWS_HEADINGS[locale];
  const newsTag = NEWS_TAG[locale];
  const latest = getStaticBlogListing(locale).slice(0, 4);
  const categories = t.categories.map((category) => {
    if (!newsHeadings.includes(category.heading) || latest.length === 0) {
      return category;
    }
    return {
      ...category,
      cards: latest.map((article) => {
        const featured = article.featuredImage as unknown as {
          url?: string;
          alternativeText?: string;
        };
        return {
          title: article.title,
          // locale is narrowed to "en" | "es" here (FR returns early above)
          // SEO-ULT §4 (2026-08-15) — même correctif que BlogListingPage :
          // la convention ES est /es/recursos/, le gabarit produisait un 308.
          href:
            locale === "es"
              ? `/es/recursos/blog/${article.slug}`
              : `/${locale}/ressources/blog/${article.slug}`,
          image: featured?.url || "/images/og-default.webp", // Ahrefs T-404 (2026-06-08): placeholder.webp missing → og-default
          alt: featured?.alternativeText || article.title,
          tag: newsTag,
        };
      }),
    };
  });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.breadcrumbLabel }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </div>
      </section>

      {/* Interactive hub: sticky nav + search + all sections */}
      <ResourcesHub t={t} locale={locale} />

      {/* FAQ section */}
      {t.faq && t.faq.length > 0 && (
        <section className="bg-background py-16 lg:py-24">
          <div className="container max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
              FAQ
            </h2>
            <dl className="space-y-6">
              {t.faq.map((item, i) => (
                <div key={i} className="border-b border-border pb-6">
                  <dt className="font-semibold text-foreground mb-2">{item.question}</dt>
                  <dd className="text-muted-foreground leading-relaxed">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      <CTASection locale={locale} />
    </PageLayout>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FR rewrite — SEO-16 (2026-05-30). Content brief: enrich /ressources from
   122 to ~1200 words. 6 thematic sections (blog, outils, fiches métiers,
   glossaire, cas clients, témoignages), each with intro prose + featured
   items + "see all" link; persona-based "how to use" block; final CTA.

   The blog article links below were all verified against the FR map in
   lib/content/blog-posts.ts. The témoignages quotes come from real
   Trustfolio reviewers (Magali Quentel-Reme, Mathurin Blouin, Quang Lê,
   Patrick Nguyen) — same source as the rest of the site after the
   placeholder-testimonial cleanup.
   ───────────────────────────────────────────────────────────────────── */
function ResourcesPageFR({ cmsNavigation }: { cmsNavigation?: CmsNavItem[] }) {
  const featuredArticles: { heading: string; items: { title: string; href: string }[] }[] = [
    {
      heading: "Trésorerie & pilotage",
      items: [
        {
          title: "Tableau de bord financier startup : les 12 KPIs que tout CFO doit suivre",
          href: "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",
        },
        {
          title: "Le stack financier idéal pour une SaaS en Series A",
          href: "/ressources/blog/stack-financier-saas-series-a",
        },
      ],
    },
    {
      heading: "DAF externalisé",
      items: [
        {
          title: "5 signes que vous avez besoin d'un DAF externalisé",
          href: "/ressources/blog/quand-embaucher-daf-externalise-5-signes",
        },
        {
          title: "DAF externalisé vs DAF salarié : analyse complète",
          href: "/ressources/blog/daf-externalise-vs-daf-salarie",
        },
        {
          title: "Combien coûte un DAF externalisé en 2026 ?",
          href: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
        },
      ],
    },
    {
      heading: "Levée de fonds & M&A",
      items: [
        {
          title: "Checklist due diligence financière : bien préparer sa levée de fonds",
          href: "/ressources/blog/checklist-due-diligence-levee-de-fonds",
        },
        {
          // SEO-DAF-08 (2026-08-09) — pointait vers
          // /ressources/blog/data-room-checklist-levee-de-fonds, fusionné en
          // 301 dans l'article due diligence ci-dessus. Rediriger cette carte
          // vers la même destination aurait donné deux cartes identiques dans
          // la section : remplacée par un article réellement distinct du même
          // thème.
          title: "Cash burn : calculer son runway et anticiper sa levée",
          href: "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",
        },
      ],
    },
    {
      heading: "International",
      items: [
        {
          title: "Impôt sur le revenu en Espagne (IRPF) : guide complet 2026",
          href: "/ressources/fiscalite/impot-revenu-espagne",
        },
      ],
    },
    // IA-FINANCE (2026-09-01) — la section a son hub ; le lier depuis la page
    // ressources est ce qui en fait un cocon plutôt que des pages isolées.
    {
      heading: "IA & Finance",
      items: [
        {
          title: "IA & Finance : le hub — guides, outils et retours de DAF",
          href: "/ressources/ia-finance",
        },
        {
          title: "Automatiser le reporting financier : la méthode en 90 jours",
          href: "/ressources/ia-finance/automatiser-reporting-financier",
        },
        {
          title: "ChatGPT pour la finance : les cas d'usage qui marchent, et ceux à proscrire",
          href: "/ressources/ia-finance/chatgpt-finance",
        },
      ],
    },
  ];

  const toolCategories = [
    "Comptabilité & facturation — Pennylane, Sage, QuickBooks, Xero",
    "Trésorerie & cash management — Agicap, Fygr",
    "Dépenses & cartes entreprise — Spendesk, Payhawk, Qonto",
    "Reporting & BI — Power BI, Looker, Metabase, Google Sheets avancé",
    "ERP — Odoo, NetSuite, SAP Business One",
    "Paie & RH — PayFit",
  ];

  const fiches = [
    "Directeur Administratif et Financier (DAF)",
    "Responsable Administratif et Financier (RAF)",
    "CFO (Chief Financial Officer)",
    "Contrôleur de gestion",
    "Trésorier d'entreprise",
  ];

  const glossaryTerms = [
    "BFR (Besoin en Fonds de Roulement)",
    "Burn rate & runway",
    "EBITDA, EBE, résultat net",
    "ARR / MRR / NRR (métriques SaaS)",
    "CAC & LTV",
    "Term sheet, SHA, SPA",
    "Due diligence",
    "Cap table & dilution",
    "DSO / DPO / DIO",
    "CIR (Crédit d'Impôt Recherche) & JEI",
  ];

  const caseStudies = [
    { client: "SolarMente", sector: "Cleantech · Espagne", result: "Series B 50 M$ (Leonardo DiCaprio Foundation + GNE/Repsol)" },
    { client: "Mitiga Solutions", sector: "Risque climatique · Espagne", result: "Series A 20 M$" },
    { client: "HappyScribe", sector: "SaaS IA", result: "Cash runway ×2" },
    { client: "Seasonly", sector: "D2C Clean Beauty", result: "Marge brute +8 pts" },
    { client: "Rubiko", sector: "iGaming", result: "CA ×7 (500 K€ → 3,5 M€)" },
    { client: "Shanti Travel", sector: "Travel & Leisure", result: "Comptabilité 30–50 % plus efficace" },
  ];

  const testimonials = [
    {
      quote:
        "Bien au-delà d'un DAF externalisé : migration ERP, structuration finance, fiscalité, financement non dilutif. Un véritable actif stratégique depuis 5 ans.",
      author: "Magali Quentel-Reme",
      role: "CEO & Co-Founder · Opti Digital",
    },
    {
      quote:
        "Reporting, cash, structure du holding : meilleure visibilité du runway et tranquillité. Un vrai partenaire stratégique, pas un simple comptable.",
      author: "Mathurin Blouin",
      role: "CEO · MFL (Web3 Football Game)",
    },
    {
      quote:
        "Livrables investment-ready dans les délais VC les plus serrés. Le type de rigueur qui fait la différence en comité d'investissement.",
      author: "Quang Lê",
      role: "Senior Associate · Seventure Partners",
    },
    {
      quote:
        "Un partner essentiel pour accompagner nos startups avec une expérience financière profonde et de long terme.",
      author: "Patrick Nguyen",
      role: "Expert Senior · Wilco",
    },
  ];

  const personas = [
    {
      label: "Vous êtes fondateur en phase Seed/Series A",
      text:
        "Commencez par le blog (DAF externalisé, levée de fonds, KPIs à suivre) et les fiches métiers pour comprendre les profils dont vous avez besoin.",
    },
    {
      label: "Vous cherchez à moderniser votre stack finance",
      text:
        "L'annuaire des outils recense les solutions recommandées par nos CFOs, avec des retours d'expérience terrain sur Pennylane, Agicap, Spendesk et les autres.",
    },
    {
      label: "Vous préparez une levée de fonds",
      text:
        "Les articles sur la due diligence, la data room et la checklist de préparation Series A vous donnent une vision complète du processus côté financier.",
    },
    {
      label: "Vous voulez comprendre le jargon finance",
      text:
        "Le glossaire couvre les 50+ termes que vous rencontrerez dans vos échanges avec des investisseurs ou des banquiers.",
    },
    {
      label: "Vous évaluez Iter Advisors",
      text:
        "Les cas clients et les témoignages Trustfolio vous donnent une vue concrète de ce que nous livrons — secteurs, types de missions, résultats mesurables.",
    },
  ];

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-12 sm:pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb locale="fr" items={[{ label: "Ressources" }]} />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 mt-4 sm:mt-6 leading-tight">
            Ressources finance &amp; DAF externalisé : blog, outils, fiches métiers et cas clients
          </h1>
          <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-4">
            Chez Iter Advisors, nos 15 CFOs seniors publient régulièrement des
            contenus opérationnels sur la direction financière, la levée de
            fonds, la trésorerie, le M&amp;A et les outils finance. Pas du contenu
            marketing générique : des articles écrits par des praticiens qui
            pilotent des situations réelles chaque semaine avec 85+ entreprises
            tech en portefeuille.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Cette page centralise l&apos;ensemble de nos ressources : blog,
            glossaire, outils, fiches métiers, cas clients et témoignages.
            Naviguez par type de contenu selon votre besoin du moment.
          </p>
        </div>
      </section>

      {/* Sticky in-page nav (anchors) */}
      <nav
        aria-label="Sections de la page ressources"
        className="bg-muted/30 border-y border-border/50 sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-muted/60"
      >
        <div className="container max-w-4xl overflow-x-auto">
          <ul className="flex gap-4 sm:gap-6 py-3 text-xs sm:text-sm whitespace-nowrap">
            {[
              { href: "#blog", label: "📝 Blog" },
              { href: "#outils", label: "🔧 Outils" },
              { href: "#fiches-metiers", label: "📋 Fiches métiers" },
              { href: "#glossaire", label: "📖 Glossaire" },
              { href: "#cas-clients", label: "🏆 Cas clients" },
              { href: "#temoignages", label: "⭐ Témoignages" },
            ].map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="text-muted-foreground hover:text-iter-violet font-medium transition-colors"
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <section className="bg-background py-12 sm:py-16">
        <div className="container max-w-4xl space-y-16 sm:space-y-20">
          {/* ── Blog ── */}
          <div id="blog" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              📝 Blog &amp; Actualités finance
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Notre blog couvre les sujets qui comptent pour les fondateurs et
              CFOs de startups et PME tech : comment structurer sa fonction
              finance, préparer une levée de fonds, piloter sa trésorerie,
              choisir ses outils, comprendre un term sheet ou anticiper une due
              diligence.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Les articles sont rédigés par nos associés et CFOs — Sébastien
              Doat, Benjamin Ziza, Florent Greth — à partir de situations
              réelles rencontrées en mission.
            </p>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-4">
              Articles vedettes
            </h3>
            <div className="space-y-5 sm:space-y-6">
              {featuredArticles.map((group) => (
                <div key={group.heading}>
                  <h4 className="text-sm font-semibold text-foreground mb-2">
                    {group.heading}
                  </h4>
                  <ul className="space-y-1.5 list-none pl-0">
                    {group.items.map((article) => (
                      <li key={article.href} className="flex gap-2.5 text-sm sm:text-base">
                        <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                        <Link
                          href={article.href}
                          className="text-iter-violet hover:underline leading-relaxed"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-6">
              <Link
                href="/ressources/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
              >
                👉 Voir tous les articles
                <ArrowRight size={14} aria-hidden />
              </Link>
            </p>
          </div>

          <hr className="border-border/50" />

          {/* ── Outils ── */}
          <div id="outils" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              🔧 Outils &amp; Stack finance
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Notre annuaire d&apos;outils recense les logiciels que nos CFOs
              utilisent et recommandent en mission : comptabilité, trésorerie,
              reporting, BI, paie, dépenses, ERP. Pour chaque outil :
              description courte, cas d&apos;usage, et retour d&apos;expérience
              terrain.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Iter Advisors est{" "}
              <strong className="text-foreground">intégrateur officiel Pennylane</strong>{" "}
              avec 25+ déploiements réalisés — c&apos;est notre recommandation
              principale pour les startups et PME tech qui cherchent à moderniser
              leur stack financier.
            </p>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-3">
              Catégories couvertes
            </h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {toolCategories.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p>
              <Link
                href="/ressources/outils"
                className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
              >
                👉 Voir l&apos;annuaire des outils
                <ArrowRight size={14} aria-hidden />
              </Link>
            </p>
          </div>

          <hr className="border-border/50" />

          {/* ── Fiches métiers ── */}
          <div id="fiches-metiers" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              📋 Fiches métiers
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Nos fiches métiers décrivent en détail les profils clés de la
              direction financière : rôle, missions, compétences, parcours type,
              salaire et positionnement par rapport aux autres fonctions. Elles
              s&apos;adressent aux dirigeants qui cherchent à comprendre quel
              profil recruter ou externaliser, et aux candidats qui souhaitent
              se repérer dans l&apos;écosystème finance d&apos;entreprise.
            </p>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-3">
              Fiches disponibles
            </h3>
            <ul className="space-y-2 list-none pl-0 mb-6">
              {fiches.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm sm:text-base text-muted-foreground">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Pour aller plus loin sur le métier de DAF et ses évolutions en 2026 :{" "}
              <Link
                href="/daf-externalise/metier"
                className="text-iter-violet hover:underline font-medium"
              >
                Métier de DAF — fiche complète
              </Link>
              .
            </p>
            {/* SEO-ULT §4b (2026-08-15) — « Voir toutes les fiches métiers »
                menait à /ressources/fiche-metier, hub absorbé depuis par le
                cluster DAF : la redirection ramenait à la fiche déjà liée
                juste au-dessus. Deux liens pour une seule destination, dont
                un via une 308. Le premier suffit. */}
          </div>

          <hr className="border-border/50" />

          {/* ── Glossaire ── */}
          <div id="glossaire" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              📖 Glossaire finance &amp; DAF
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Le glossaire recense les termes clés de la finance
              d&apos;entreprise, de la levée de fonds et du pilotage
              opérationnel. Chaque définition est rédigée par nos CFOs avec un
              angle pratique — pas un dictionnaire académique, mais des
              explications concrètes dans le contexte d&apos;une startup ou PME
              tech.
            </p>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-3">
              Termes couverts (sélection)
            </h3>
            <ul className="space-y-2 list-none pl-0 mb-6 sm:columns-2">
              {glossaryTerms.map((g) => (
                <li key={g} className="flex gap-2.5 text-sm sm:text-base text-muted-foreground break-inside-avoid">
                  <span aria-hidden className="mt-2 w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
            <p>
              <Link
                href="/ressources/glossaire"
                className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
              >
                👉 Accéder au glossaire
                <ArrowRight size={14} aria-hidden />
              </Link>
            </p>
          </div>

          <hr className="border-border/50" />

          {/* ── Cas clients ── */}
          <div id="cas-clients" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              🏆 Cas clients
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              Nos cas clients détaillent les missions réelles réalisées avec des
              startups et PME tech — contexte, sujets traités, résultats
              obtenus. Chaque cas est validé par le fondateur ou le CFO
              concerné.
            </p>
            <h3 className="text-base sm:text-lg font-bold font-heading text-foreground mb-4">
              Quelques résultats mis en avant
            </h3>
            <div className="-mx-4 sm:mx-0 overflow-x-auto rounded-xl border border-border/60 mb-6">
              <table className="w-full text-sm border-collapse">
                <thead className="bg-muted/40">
                  <tr>
                    {["Client", "Secteur", "Résultat"].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {caseStudies.map((c, i) => (
                    <tr key={c.client} className={i % 2 ? "bg-muted/20" : ""}>
                      <td className="p-3 sm:p-4 align-top border-b border-border/40 font-semibold text-foreground">
                        {c.client}
                      </td>
                      <td className="p-3 sm:p-4 align-top border-b border-border/40 text-muted-foreground">
                        {c.sector}
                      </td>
                      <td className="p-3 sm:p-4 align-top border-b border-border/40 text-muted-foreground">
                        {c.result}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Depuis 2021, Iter Advisors a accompagné{" "}
              <strong className="text-foreground">85+ entreprises tech</strong>{" "}
              en France et en Espagne, facilité{" "}
              <strong className="text-foreground">100 M€ de levées de fonds</strong>{" "}
              en equity et dette.
            </p>
            <p>
              <Link
                href="/ressources/cas-clients"
                className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
              >
                👉 Voir tous les cas clients
                <ArrowRight size={14} aria-hidden />
              </Link>
            </p>
          </div>

          <hr className="border-border/50" />

          {/* ── Témoignages ── */}
          <div id="temoignages" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-4 leading-tight">
              ⭐ Témoignages clients
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
              {/* SEO-DAF-02 (2026-08-09) — annonçait 36 avis, troisième
                  valeur du site après 31 et 35. */}
              Iter Advisors est noté{" "}
              <strong className="text-foreground">
                {TRUSTFOLIO_RATING}/5 sur Trustfolio
              </strong>{" "}
              avec {TRUSTFOLIO_REVIEW_COUNT} avis vérifiés de fondateurs, CFOs
              et investisseurs. Quelques verbatims :
            </p>
            <div className="space-y-5">
              {testimonials.map((tst) => (
                <figure
                  key={tst.author}
                  className="border-l-4 border-iter-violet bg-iter-violet/5 rounded-r-lg p-5"
                >
                  <blockquote className="text-sm sm:text-base text-foreground/80 italic leading-relaxed mb-3">
                    « {tst.quote} »
                  </blockquote>
                  <figcaption className="text-xs sm:text-sm">
                    <span className="font-semibold text-foreground not-italic">
                      {tst.author}
                    </span>
                    <span className="text-muted-foreground"> — {tst.role}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-6">
              <a
                href="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-sm font-semibold text-iter-violet hover:underline"
              >
                👉 Tous les avis sur Trustfolio
                <ArrowRight size={14} aria-hidden />
              </a>
            </p>
          </div>

          <hr className="border-border/50" />

          {/* ── Comment utiliser ces ressources ?── */}
          <div id="comment-utiliser" className="scroll-mt-24">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 leading-tight">
              Comment utiliser ces ressources ?
            </h2>
            <div className="space-y-4">
              {personas.map((p) => (
                <p key={p.label} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{p.label}</strong> →{" "}
                  {p.text}
                </p>
              ))}
            </div>
          </div>

          {/* ── CTA final ── */}
          <aside className="rounded-3xl bg-iter-violet/5 border-l-4 border-iter-violet p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-2">
              Vous ne trouvez pas la ressource qu&apos;il vous faut ?
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              Nos CFOs répondent à vos questions en direct. Premier échange
              offert de 30 minutes.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold hover:bg-iter-violet/90 transition-all duration-300"
            >
              Nous contacter
              <ArrowRight size={16} aria-hidden />
            </Link>
          </aside>
        </div>
      </section>

      <CTASection locale="fr" />
    </PageLayout>
  );
}
