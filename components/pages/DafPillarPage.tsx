import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin, MapPin } from "lucide-react";
import type { CmsNavItem, StrapiTeamMember } from "@/lib/strapi";
import { strapiMediaUrl } from "@/lib/strapi";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { BOOKING_URL } from "@/lib/navigation";
import { aboutHref } from "@/lib/path-localization";
import { FORMULES } from "@/lib/content/facts";
import {
  dafPillar,
  DAF_PILLAR_MODIFIED,
  DAF_PILLAR_MODIFIED_LABEL,
  DAF_PILLAR_PATH,
  DAF_PILLAR_PUBLISHED,
} from "@/lib/content/daf-pillar";
import { faqPageSchema, speakableSchema } from "@/lib/schemas";
import { editorialWebPageSchema } from "@/lib/schemas/editorial";
import { renderInlineMarkdownLinks, stripInlineMarkdown } from "@/lib/render-markdown-inline-links";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import PageByline from "@/components/PageByline";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

/**
 * Pilier FR /daf-externalise — refonte du 3 septembre 2026.
 *
 * Douze blocs dans l'ordre des questions d'un dirigeant : promesse et
 * preuves, définition unique, missions, méthode, pour qui, tarifs, pourquoi
 * nous, experts, avis, villes, FAQ, ressources. Le sommaire suit le DOM.
 * Composant serveur : la FAQ utilise <details>, aucun état client.
 *
 * Ce qui a quitté la page (et où cela vit) : DAF vs intérimaire
 * (/daf-externalise/transition et l'article dédié), outils du DAF
 * (/ressources/ia-finance/outils), profils temps partagé / transition (pages
 * filles), « L'essentiel en 30 secondes » (redondant avec le hero), neuf
 * questions de FAQ sur dix-sept.
 */
const AUTHOR = { name: "Sébastien Doat", slug: "sebastien-doat" };
const SITE = "https://www.iteradvisors.com";

export default function DafPillarPage({
  cmsNavigation,
  teamMembers,
}: {
  cmsNavigation?: CmsNavItem[];
  teamMembers?: StrapiTeamMember[];
}) {
  const t = dafPillar;
  const teamSource =
    teamMembers && teamMembers.length > 0 ? teamMembers : getFallbackTeamMembers("fr");
  const experts = t.experts.slugs
    .map((slug) => teamSource.find((m) => m.slug === slug))
    .filter((m): m is StrapiTeamMember => Boolean(m));

  const eyebrow = "text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block";
  const h2 = "text-2xl sm:text-3xl font-bold font-heading text-foreground leading-tight text-balance";
  const body = "text-sm sm:text-base text-muted-foreground leading-relaxed";

  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      {/* 01 — Hero */}
      <section className="bg-background pt-20 sm:pt-28 lg:pt-32 pb-10 sm:pb-14">
        <div className="container">
          <Breadcrumb
            locale="fr"
            items={[{ label: "Services", href: "/services" }, { label: t.breadcrumbLabel }]}
          />
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-14 items-start mt-4 sm:mt-6">
            <div data-speakable="true">
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold font-heading text-foreground leading-[1.1] text-balance mb-4">
                {t.hero.h1}
              </h1>
              <PageByline
                locale="fr"
                author={AUTHOR}
                dateModified={DAF_PILLAR_MODIFIED}
                dateLabel={DAF_PILLAR_MODIFIED_LABEL}
                className="mb-5"
              />
              <p className="text-base sm:text-lg text-foreground/80 leading-relaxed mb-6 max-w-[62ch]">
                {t.hero.lead}
              </p>
              <Link
                href={BOOKING_URL}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base"
              >
                {t.hero.cta}
                <ArrowRight size={16} />
              </Link>
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-muted-foreground">
                {t.hero.proofs.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-iter-violet shrink-0" />
                    <span className="tabular-nums">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative aspect-[4/5] w-full max-w-sm ml-auto rounded-3xl overflow-hidden bg-muted/40">
                <Image
                  src={t.hero.photo.src}
                  alt={t.hero.photo.alt}
                  fill
                  className="object-cover object-top"
                  sizes="(min-width: 1024px) 384px, 1px"
                  loading="eager"
                />
              </div>
            </div>
          </div>

          {/* Sommaire — même ordre que le DOM */}
          <nav aria-label="Sommaire" className="mt-10 -mx-4 px-4 overflow-x-auto">
            <ol className="flex gap-2 min-w-max">
              {t.nav.map((n, i) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3 py-1.5 text-xs sm:text-sm text-foreground/80 hover:border-iter-violet/50 hover:text-iter-violet transition-colors"
                  >
                    <span className="tabular-nums text-foreground/40">{String(i + 1).padStart(2, "0")}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* 02 — Définition unique */}
      <section id="comprendre" className="bg-muted/30 py-12 sm:py-16 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <h2 className={h2}>{t.definition.heading}</h2>
          <p className={`${body} mt-4 text-foreground/90`}>
            <dfn className="not-italic font-semibold text-foreground">{t.definition.dfn}</dfn>
            {" : "}
            {renderInlineMarkdownLinks(t.definition.text.replace(/^Un /, "un "))}
          </p>
        </div>
      </section>

      {/* 03 — Missions */}
      <section id="missions" className="bg-background py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className={eyebrow}>Missions</span>
          <h2 className={h2}>{t.missions.heading}</h2>
          <p className={`${body} mt-3 max-w-[62ch]`}>{t.missions.intro}</p>
          <ol className="mt-8 grid sm:grid-cols-2 gap-4">
            {t.missions.items.map((m, i) => (
              <li
                key={m.title}
                className="rounded-2xl border border-border/50 bg-background p-5 flex flex-col gap-2 hover:border-iter-violet/30 transition-colors"
              >
                <span className="text-xs font-semibold tabular-nums text-iter-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">{m.title}</h3>
                <p className={body}>{m.deliverable}</p>
                <Link
                  href={m.href}
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-iter-violet hover:underline"
                >
                  {m.linkLabel}
                  <ArrowRight size={14} />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 04 — Cas clients : rendu seulement avec des cas validés par écrit */}
      {t.cases.length > 0 && (
        <section id="missions-reelles" className="bg-muted/30 py-14 sm:py-20 scroll-mt-24">
          <div className="container max-w-4xl px-4 sm:px-6">
            <span className={eyebrow}>Missions réelles</span>
            <h2 className={h2}>Trois missions, racontées sans enjoliver</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {t.cases.map((c) => (
                <article key={c.sector + c.size} className="rounded-2xl border border-border/50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-iter-violet">
                    {c.sector} · {c.size}
                  </p>
                  <dl className={`${body} mt-3 space-y-2`}>
                    <div><dt className="font-semibold text-foreground">Situation</dt><dd>{c.situation}</dd></div>
                    <div><dt className="font-semibold text-foreground">Intervention</dt><dd>{c.action}</dd></div>
                    <div><dt className="font-semibold text-foreground">Résultat</dt><dd>{c.result}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 05 — Les 90 premiers jours */}
      <section id="methode" className="bg-iter-dark text-white py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse mb-2 block">
            Méthode
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading leading-tight text-balance">
            {t.method.heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/70 leading-relaxed max-w-[62ch]">{t.method.intro}</p>
          <ol className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.method.steps.map((s) => (
              <li key={s.period} className="rounded-2xl border border-white/15 p-5 flex flex-col gap-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-chartreuse">{s.period}</span>
                <h3 className="text-base font-semibold font-heading">{s.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-white/60 leading-relaxed max-w-[70ch]">{t.method.note}</p>
        </div>
      </section>

      {/* 06 — Pour qui */}
      <section id="pour-qui" className="bg-background py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className={eyebrow}>Pour qui</span>
          <h2 className={h2}>{t.forWhom.heading}</h2>
          <p className={`${body} mt-3 max-w-[62ch]`}>{t.forWhom.intro}</p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {t.forWhom.segments.map((s) => (
              <article key={s.title} className="rounded-2xl border border-border/50 p-5 flex flex-col gap-2">
                <h3 className="text-base sm:text-lg font-semibold font-heading text-foreground">{s.title}</h3>
                <p className={body}>
                  <span className="font-semibold text-foreground">Déclencheur : </span>
                  {s.trigger}
                </p>
                <p className={body}>{s.answer}</p>
                {s.href && s.linkLabel && (
                  <Link href={s.href} className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-iter-violet hover:underline">
                    {s.linkLabel}
                    <ArrowRight size={14} />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 06 bis — Secteurs : les requêtes « daf externalisé industrie / commerce /
          startup » atteignent le top 10 sans clic ; ce bloc répond et maille
          les pages sectorielles, qui recevaient peu de liens. */}
      <section id="secteurs" className="bg-muted/30 py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className={eyebrow}>Secteurs</span>
          <h2 className={h2}>{t.forWhom.sectors.heading}</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {t.forWhom.sectors.items.map((s) => (
              <article key={s.title} className="rounded-2xl border border-border/50 bg-background p-5 flex flex-col gap-2">
                <h3 className="text-base font-semibold font-heading text-foreground">{s.title}</h3>
                <p className={body}>{s.text}</p>
                <Link href={s.href} className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-iter-violet hover:underline">
                  {s.linkLabel}
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 07 — Tarifs */}
      <section id="tarifs" className="bg-background py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className={eyebrow}>Tarifs</span>
          <h2 className={h2}>{t.pricing.heading}</h2>
          <p className={`${body} mt-3 max-w-[70ch]`}>{t.pricing.intro}</p>
          <p className="mt-6 text-xs text-muted-foreground">
            Grille 2026 : le volume est une moyenne d'intervention, l'engagement porte sur le périmètre.
          </p>
          {/* Mobile : une carte par formule ; le tableau à cinq colonnes ne tient pas sous 640 px. */}
          <ul className="mt-3 grid gap-3 sm:hidden">
            {t.pricing.tiers.map((tier) => (
              <li key={tier.name} className="rounded-2xl border border-border/60 bg-background p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-base font-semibold font-heading text-foreground">{tier.name}</h3>
                  <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">{tier.volume}</span>
                </div>
                <p className="mt-1 text-base font-semibold text-foreground tabular-nums">{tier.price}</p>
                <p className={`${body} mt-2`}>
                  <span className="font-semibold text-foreground">Pour qui : </span>
                  {tier.audience}
                </p>
                <p className={body}>
                  <span className="font-semibold text-foreground">Profil : </span>
                  {tier.profile}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-3 hidden sm:block overflow-x-auto">
            <table className="w-full text-sm border-collapse bg-background border border-border/60 rounded-2xl overflow-hidden">
              <thead className="bg-iter-violet/5">
                <tr>
                  {["Formule", "Volume moyen", "Tarif", "Pour qui", "Profil"].map((h) => (
                    <th key={h} scope="col" className="text-left font-semibold text-foreground p-3 sm:p-4 border-b border-border/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.pricing.tiers.map((tier) => (
                  <tr key={tier.name} className="even:bg-muted/30 align-top">
                    <th scope="row" className="p-3 sm:p-4 border-b border-border/40 font-semibold text-foreground text-left">{tier.name}</th>
                    <td className="p-3 sm:p-4 border-b border-border/40 text-muted-foreground tabular-nums">{tier.volume}</td>
                    <td className="p-3 sm:p-4 border-b border-border/40 font-semibold text-foreground tabular-nums whitespace-nowrap">{tier.price}</td>
                    <td className="p-3 sm:p-4 border-b border-border/40 text-muted-foreground">{tier.audience}</td>
                    <td className="p-3 sm:p-4 border-b border-border/40 text-muted-foreground">{tier.profile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <aside className="rounded-2xl border border-iter-violet/30 bg-iter-violet/5 p-5">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-iter-violet">{t.pricing.barometer.heading}</h3>
              <p className={`${body} mt-2 text-foreground/90`}>{t.pricing.barometer.text}</p>
            </aside>
            <div className="rounded-2xl border border-border/50 p-5">
              <p className={body}>{t.pricing.economy}</p>
              <p className={`${body} mt-3 font-medium text-foreground`}>{t.pricing.engagement}</p>
            </div>
          </div>
          <p className="mt-6">
            <Link href={t.pricing.link.href} className="inline-flex items-center gap-1 text-sm font-medium text-iter-violet hover:underline">
              {t.pricing.link.label}
              <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </section>

      {/* 08 — Pourquoi Iter + cabinet + experts */}
      <section id="pourquoi-iter" className="bg-muted/30 py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <span className={eyebrow}>Pourquoi nous</span>
          <h2 className={h2}>{t.why.heading}</h2>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {t.why.points.map((p) => (
              <div key={p.title} className="rounded-2xl border border-border/50 bg-background p-5">
                <h3 className="text-base font-semibold font-heading text-foreground">{p.title}</h3>
                <p className={`${body} mt-2`}>{renderInlineMarkdownLinks(p.text)}</p>
              </div>
            ))}
          </div>

          {/* « cabinet de directeur externalisé » : 248 impressions, position 15,
              aucun clic. La question derrière est « pourquoi pas un indépendant ». */}
          <div className="mt-10">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground text-balance">{t.cabinet.heading}</h3>
            <dl className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {t.cabinet.points.map((p) => (
                <div key={p.title} className="border-l-2 border-iter-violet/40 pl-4">
                  <dt className="text-sm font-semibold text-foreground">{p.title}</dt>
                  <dd className={`${body} mt-1`}>{p.text}</dd>
                </div>
              ))}
            </dl>
          </div>

          <figure className="mt-8 rounded-3xl bg-iter-violet text-white p-6 sm:p-8">
            <blockquote className="text-sm sm:text-base leading-relaxed">« {t.why.quote.text} »</blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
              <span>
                <span className="font-semibold text-iter-chartreuse block">{t.why.quote.author}</span>
                <span className="text-white/70">{t.why.quote.role}</span>
              </span>
              <a
                href={t.why.quote.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-iter-chartreuse/90 hover:text-iter-chartreuse underline underline-offset-2"
              >
                {t.why.quote.sourceLabel}
              </a>
            </figcaption>
          </figure>
          <p className="mt-4">
            <Link href={t.why.casesLink.href} className="inline-flex items-center gap-1 text-sm font-medium text-iter-violet hover:underline">
              {t.why.casesLink.label}
              <ArrowRight size={14} />
            </Link>
          </p>

          {experts.length > 0 && (
            <div id="experts" className="mt-12 scroll-mt-24">
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">{t.experts.heading}</h3>
              <p className={`${body} mt-2 max-w-[62ch]`}>{t.experts.intro}</p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-4">
                {experts.map((e) => {
                  // Strapi ne renvoie pas toujours la photo : repli sur le
                  // portrait local (Florent apparaissait sans visage).
                  const photo =
                    strapiMediaUrl(e.photo) ||
                    strapiMediaUrl(getFallbackTeamMembers("fr").find((m) => m.slug === e.slug)?.photo);
                  return (
                    <li key={e.slug} className="rounded-2xl border border-border/50 p-4 sm:p-5 flex items-center gap-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden bg-iter-violet/10">
                        {photo && (
                          <Image
                            src={photo}
                            alt={`${e.firstName} ${e.lastName}, ${e.role}, Iter Advisors`}
                            fill
                            className="object-cover object-top"
                            sizes="80px"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-base font-semibold font-heading text-foreground">
                          <Link href={aboutHref("fr", e.slug)} rel="author" className="hover:text-iter-violet">
                            {e.firstName} {e.lastName}
                          </Link>
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{e.role}</p>
                        {e.linkedIn && (
                          <a
                            href={e.linkedIn}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-center gap-1.5 text-xs text-iter-violet hover:underline"
                            aria-label={`Profil LinkedIn de ${e.firstName} ${e.lastName}`}
                          >
                            <Linkedin size={13} />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* 09 — Avis Trustfolio (widget existant, sans AggregateRating) */}
      <div id="avis" className="scroll-mt-24">
        <TestimonialsSection locale="fr" />
      </div>

      {/* 10 — Villes : trois liens à ancre locale, pas de texte de ville ici */}
      <section id="villes" className="bg-background py-12 sm:py-16 scroll-mt-24">
        <div className="container max-w-4xl px-4 sm:px-6">
          <h2 className={h2}>{t.cities.heading}</h2>
          <p className={`${body} mt-3 max-w-[62ch]`}>{t.cities.text}</p>
          <ul className="mt-5 flex flex-wrap gap-3">
            {t.cities.items.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium text-foreground hover:border-iter-violet/50 hover:text-iter-violet transition-colors"
                >
                  <MapPin size={14} className="text-iter-violet" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 — FAQ resserrée */}
      <section id="faq" className="bg-muted/30 py-14 sm:py-20 scroll-mt-24">
        <div className="container max-w-3xl px-4 sm:px-6">
          <span className={eyebrow}>FAQ</span>
          <h2 className={h2}>Les questions qu'on nous pose avant de démarrer</h2>
          <div className="mt-6 divide-y divide-border/60 rounded-2xl border border-border/60 bg-background">
            {t.faq.map((item) => (
              <details key={item.question} className="group px-5 py-4">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-sm sm:text-base font-semibold text-foreground">
                  <h3 className="font-semibold">{item.question}</h3>
                  <span
                    aria-hidden
                    className="mt-1 shrink-0 text-iter-violet transition-transform group-open:rotate-45 text-lg leading-none"
                  >
                    +
                  </span>
                </summary>
                <p className={`${body} mt-3`}>{renderInlineMarkdownLinks(item.answer)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — Ressources */}
      <section className="bg-background py-12 sm:py-16">
        <div className="container max-w-3xl px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-bold font-heading text-foreground">{t.resources.heading}</h2>
          <ul className="mt-4 grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {t.resources.items.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="inline-flex items-start gap-1.5 text-sm text-iter-violet hover:underline">
                  <ArrowRight size={14} className="mt-0.5 shrink-0" />
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection locale="fr" />

      {/* Données structurées : Service + AggregateOffer (grille de facts.ts),
          WebPage (auteur, dates), FAQPage (réponses sans Markdown), Person
          des associés, Speakable. Le BreadcrumbList vient du composant. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${SITE}${DAF_PILLAR_PATH}#service-offer`,
            serviceType: "DAF externalisé",
            name: "DAF externalisé pour PME et startups",
            description: t.meta.description,
            provider: { "@id": `${SITE}/#organization` },
            areaServed: [
              { "@type": "Country", name: "France" },
              { "@type": "Country", name: "Espagne" },
            ],
            url: `${SITE}${DAF_PILLAR_PATH}`,
            offers: {
              "@type": "AggregateOffer",
              priceCurrency: "EUR",
              lowPrice: String(FORMULES[0].prixMin),
              highPrice: String(FORMULES[FORMULES.length - 1].prixMax),
              offerCount: String(FORMULES.length),
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                priceType: "https://schema.org/MinimumPrice",
                price: String(FORMULES[0].prixMin),
                priceCurrency: "EUR",
                unitText: "MONTH",
              },
              offers: FORMULES.map((f) => ({
                "@type": "Offer",
                name: f.nom,
                description: `${f.volumeIndicatif} — ${f.cible}`,
                price: String(f.prixMin),
                priceCurrency: "EUR",
                priceSpecification: {
                  "@type": "UnitPriceSpecification",
                  price: String(f.prixMin),
                  priceCurrency: "EUR",
                  unitText: "MONTH",
                },
                availability: "https://schema.org/InStock",
              })),
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            editorialWebPageSchema({
              path: DAF_PILLAR_PATH,
              name: t.meta.title,
              description: t.meta.description,
              locale: "fr",
              author: AUTHOR,
              datePublished: DAF_PILLAR_PUBLISHED,
              dateModified: DAF_PILLAR_MODIFIED,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            faqPageSchema(
              t.faq.map((item) => ({ question: item.question, answer: stripInlineMarkdown(item.answer) })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Person",
                "@id": `${SITE}/#sebastien-doat`,
                name: "Sébastien Doat",
                jobTitle: "Associé fondateur, DAF externalisé et CFO",
                url: `${SITE}${aboutHref("fr", "sebastien-doat")}`,
                sameAs: ["https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ["DAF externalisé", "direction financière externalisée", "levée de fonds", "reporting financier", "budget prévisionnel"],
              },
              {
                "@type": "Person",
                "@id": `${SITE}/#florent-greth`,
                name: "Florent Greth",
                jobTitle: "Associé et CFO",
                url: `${SITE}${aboutHref("fr", "florent-greth")}`,
                sameAs: ["https://www.linkedin.com/in/florent-greth-cfo-pennylane/"],
                worksFor: { "@type": "Organization", "@id": `${SITE}/#organization`, name: "Iter Advisors" },
                knowsAbout: ["DAF externalisé", "finance startups", "tableau de bord financier", "contrôle de gestion"],
              },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(speakableSchema({ url: DAF_PILLAR_PATH, cssSelectors: ["[data-speakable]"] })),
        }}
      />
    </PageLayout>
  );
}
