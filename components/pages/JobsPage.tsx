import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  Users,
  Globe,
  TrendingUp,
  MapPin,
  Clock,
  Building2,
  Megaphone,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getJobsContent } from "@/lib/content/jobs";
import type { StrapiJobOffer, CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/* Icon mapping by slug for a more meaningful visual */
const iconMap: Record<string, typeof Briefcase> = {
  "senior-finance-manager": TrendingUp,
  "fractional-cfo-startups": Briefcase,
  "finance-analyst-junior-fr": Globe,
  "marketing-growth-strategy": Megaphone,
};

const contractLabels: Record<Locale, Record<string, string>> = {
  fr: { cdi: "CDI", cdd: "CDD", freelance: "Freelance", stage: "Stage" },
  en: { cdi: "Permanent", cdd: "Fixed-term", freelance: "Freelance", stage: "Internship" },
  es: { cdi: "Indefinido", cdd: "Temporal", freelance: "Freelance", stage: "Prácticas" },
};

const sectionLabels: Record<Locale, { perks: string; perksItems: string[]; whyTitle: string; whyItems: { title: string; desc: string }[] }> = {
  fr: {
    perks: "Pourquoi nous rejoindre ?",
    perksItems: [
      "Environnement international et multiculturel",
      "Bureaux au cœur de Barcelone (Rambla de Catalunya)",
      "Salaire compétitif et assurance santé privée",
      "Culture fondée sur la confiance et l'autonomie",
    ],
    whyTitle: "Ce qui nous différencie",
    whyItems: [
      { title: "Croissance rapide", desc: "Rejoignez une entreprise en pleine expansion depuis 2021, avec un portefeuille de clients en constante croissance." },
      { title: "Impact direct", desc: "Travaillez directement avec les fondateurs, les CFOs et les C-suite de startups innovantes." },
      { title: "Développement personnel", desc: "Accès à des formations, e-learning et conférences pour développer vos compétences." },
      { title: "Équipe internationale", desc: "Une équipe de 15+ consultants de différentes nationalités, unis par la passion de la finance." },
    ],
  },
  en: {
    perks: "Why join us?",
    perksItems: [
      "International and multicultural environment",
      "Offices in the heart of Barcelona (Rambla de Catalunya)",
      "Competitive salary and private health insurance",
      "Culture built on trust and autonomy",
    ],
    whyTitle: "What sets us apart",
    whyItems: [
      { title: "Rapid growth", desc: "Join a fast-growing company since 2021, with an ever-expanding client portfolio." },
      { title: "Direct impact", desc: "Work directly with founders, CFOs and C-suite of innovative startups." },
      { title: "Personal development", desc: "Access to training, e-learning and conferences to grow your skills." },
      { title: "International team", desc: "A team of 15+ consultants from different nationalities, united by a passion for finance." },
    ],
  },
  es: {
    perks: "¿Por qué unirse a nosotros?",
    perksItems: [
      "Entorno internacional y multicultural",
      "Oficinas en el corazón de Barcelona (Rambla de Catalunya)",
      "Salario competitivo y seguro médico privado",
      "Cultura basada en la confianza y la autonomía",
    ],
    whyTitle: "Lo que nos diferencia",
    whyItems: [
      { title: "Crecimiento rápido", desc: "Únase a una empresa en plena expansión desde 2021, con una cartera de clientes en constante crecimiento." },
      { title: "Impacto directo", desc: "Trabaje directamente con fundadores, CFOs y C-suite de startups innovadoras." },
      { title: "Desarrollo personal", desc: "Acceso a formaciones, e-learning y conferencias para desarrollar sus habilidades." },
      { title: "Equipo internacional", desc: "Un equipo de 15+ consultores de diferentes nacionalidades, unidos por la pasión por las finanzas." },
    ],
  },
};

function getJobHref(slug: string, locale: Locale) {
  if (locale === "fr") return `/jobs/${slug}`;
  return `/${locale}/jobs/${slug}`;
}

export default function JobsPage({
  locale,
  cmsNavigation,
  cmsJobs,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
  cmsJobs?: StrapiJobOffer[];
}) {
  const t = getJobsContent(locale);
  const section = sectionLabels[locale];

  /* Prefer CMS jobs if available, fall back to static list */
  const jobs: { title: string; href: string; slug: string; location?: string; contractType?: string; department?: string }[] =
    cmsJobs && cmsJobs.length > 0
      ? cmsJobs.map((j) => ({
          title: j.title,
          href: getJobHref(j.slug, locale),
          slug: j.slug,
          location: j.location,
          contractType: j.contractType,
          department: j.department,
        }))
      : t.jobs.map((j) => {
          const slug = j.href.split("/").pop() || "";
          return { title: j.title, href: j.href, slug, location: "Barcelone, Espagne" };
        });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-background via-background to-iter-violet/5 pt-32 pb-20">
        <div className="container max-w-5xl">
          <Breadcrumb locale={locale} items={[{ label: "Jobs" }]} />
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-iter-violet/10 flex items-center justify-center">
                  <Users size={24} className="text-iter-violet" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet">
                  {locale === "fr" ? "Carrières" : locale === "en" ? "Careers" : "Carreras"}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold font-heading text-foreground max-w-3xl mb-6 leading-tight">
                {t.hero.h1}
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {t.intro}
              </p>
            </div>
            <div className="relative hidden lg:block">
              <Image
                src="/images/bg/bg-3d.webp"
                alt={locale === "fr" ? "Rejoignez l'equipe Iter Advisors" : "Join the Iter Advisors team"}
                width={560}
                height={400}
                className="rounded-2xl object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-16 lg:py-20">
        <div className="container max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
                {locale === "fr" ? "À propos" : locale === "en" ? "About" : "Acerca de"}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-4">{t.about.heading}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.about.paragraph}</p>
            </div>
            <div className="bg-iter-violet/5 rounded-2xl p-8">
              <h3 className="text-lg font-bold font-heading mb-4">{section.perks}</h3>
              <ul className="space-y-3">
                {section.perksItems.map((perk, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-iter-violet/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-iter-violet">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-foreground/80">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="container max-w-5xl"><div className="border-b border-border/50" /></div>

      {/* Job Cards - redesigned */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Nos offres" : locale === "en" ? "Open positions" : "Ofertas"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">
            {locale === "fr"
              ? `${jobs.length} postes ouverts`
              : locale === "en"
                ? `${jobs.length} open positions`
                : `${jobs.length} puestos abiertos`}
          </h2>
          <div className="space-y-4">
            {jobs.map((job, i) => {
              const Icon = iconMap[job.slug] || Briefcase;
              const contract = job.contractType
                ? contractLabels[locale][job.contractType] || job.contractType
                : null;
              return (
                <Link
                  key={i}
                  href={job.href}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-background border border-border/50 rounded-2xl p-6 sm:p-8 hover:border-iter-violet/30 hover:shadow-lg transition-all duration-300"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center shrink-0">
                    <Icon size={22} className="text-iter-violet" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold font-heading group-hover:text-iter-violet transition-colors mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {job.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={14} />
                          {job.location}
                        </span>
                      )}
                      {contract && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock size={14} />
                          {contract}
                        </span>
                      )}
                      {job.department && (
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 size={14} />
                          {job.department}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-muted group-hover:bg-iter-violet/10 transition-colors shrink-0">
                    <ArrowRight size={18} className="text-muted-foreground group-hover:text-iter-violet transition-colors group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why join - 4 cards */}
      <section className="bg-background py-24 lg:py-32">
        <div className="container max-w-5xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr" ? "Culture" : locale === "en" ? "Culture" : "Cultura"}
          </span>
          <h2 className="text-2xl lg:text-3xl font-bold font-heading mb-10">{section.whyTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {section.whyItems.map((item, i) => (
              <div key={i} className="bg-muted/30 rounded-2xl p-8">
                <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-4">
                  <span className="text-iter-violet font-bold text-lg">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="text-lg font-semibold font-heading mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
