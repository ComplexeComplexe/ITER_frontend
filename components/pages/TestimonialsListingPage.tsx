"use client";

import { Locale } from "@/lib/i18n";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, Building2, Users, TrendingUp, Briefcase } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Use cases data                                                    */
/* ------------------------------------------------------------------ */

interface UseCase {
  company: string;
  sector: string;
  person: string;
  role: string;
  title: string;
  quote: string;
  tags: string[];
  icon: "building" | "users" | "trending" | "briefcase";
}

const useCases: Record<Locale, UseCase[]> = {
  fr: [
    {
      company: "SolarMente",
      sector: "Énergies renouvelables",
      person: "Victor Gardrinier",
      role: "Co-fondateur",
      title: "Leadership financier transformateur pour la levée de fonds",
      quote: "Iter Advisors a joué un rôle clé dans la réussite de notre levée de fonds et dans la structuration de notre stratégie financière. Un accompagnement transformateur.",
      tags: ["Levée de fonds", "Stratégie financière", "Scale-up"],
      icon: "trending",
    },
    {
      company: "Tool4staffing",
      sector: "SaaS / RH Tech",
      person: "Antoine Détis",
      role: "CEO & Founder",
      title: "Reporting fiable et gain de temps significatif",
      quote: "Un reporting financier fiable et un gain de temps considérable grâce à Iter Advisors. Leur expertise nous a permis de nous concentrer sur notre cœur de métier.",
      tags: ["Reporting", "Automatisation", "SaaS"],
      icon: "briefcase",
    },
    {
      company: "WILCO",
      sector: "Accélérateur / VC",
      person: "Patrick Nguyen",
      role: "Senior Expert",
      title: "Partenaire incontournable pour l'écosystème startup",
      quote: "Un partenaire incontournable pour accompagner nos startups avec une expertise financière de long terme. Iter Advisors comprend les enjeux spécifiques des startups.",
      tags: ["Startups", "Accompagnement", "Écosystème"],
      icon: "users",
    },
    {
      company: "Gladys",
      sector: "iGaming / Tech",
      person: "Alexis Audibert",
      role: "CEO",
      title: "Du chaos à la croissance : +600% de CA annuel",
      quote: "L'accompagnement financier stratégique d'Iter Advisors a été un catalyseur de notre croissance. Nous sommes passés du chaos à une croissance maîtrisée de 600% du CA annuel.",
      tags: ["Hypercroissance", "Structuration", "CFO"],
      icon: "trending",
    },
    {
      company: "Founders Future",
      sector: "Venture Studio / VC",
      person: "Louis Sautet",
      role: "Investment Director",
      title: "Transformation des données financières et montée en compétence",
      quote: "Iter a été le CFO intérimaire de plusieurs de nos participations avec toujours beaucoup de succès. Transformation du suivi de la donnée financière et montée en compétence des équipes.",
      tags: ["CFO intérimaire", "Portefeuille", "Data financière"],
      icon: "building",
    },
    {
      company: "Pôle Action Media",
      sector: "Cluster numérique",
      person: "Thomas Coignard",
      role: "Managing Director",
      title: "Accompagnement financier innovant en contexte transfrontalier",
      quote: "Une réactivité exemplaire, une expertise issue du background des fondateurs et un accompagnement appréciable dans un contexte transfrontalier fort entre la France et l'Espagne.",
      tags: ["Transfrontalier", "Innovation", "Numérique"],
      icon: "building",
    },
    {
      company: "Ben&Vic",
      sector: "Conseil Growth Strategy",
      person: "Dirigeant",
      role: "CEO",
      title: "Structuration financière et vision stratégique renforcées",
      quote: "Amélioration de notre vision business, meilleure maîtrise de nos marges et de nos budgets. Iter est force de proposition sur les décisions stratégiques.",
      tags: ["Pilotage", "Marges", "Stratégie"],
      icon: "briefcase",
    },
    {
      company: "Incubateur HEC Paris",
      sector: "Incubateur",
      person: "Responsable programme",
      role: "Directeur",
      title: "Conseils financiers opérationnels pour les startups HEC",
      quote: "Iter Advisor est intervenu à plusieurs reprises à l'Incubateur HEC Paris pour aider nos startups sur des problématiques de comptabilité ou de sujets de type CFO. Nos startups ont reçu de bons conseils activables et opérationnels.",
      tags: ["Incubateur", "Comptabilité", "CFO"],
      icon: "users",
    },
  ],
  en: [
    {
      company: "SolarMente",
      sector: "Renewable Energy",
      person: "Victor Gardrinier",
      role: "Co-founder",
      title: "Transformative financial leadership for fundraising",
      quote: "Iter Advisors played a key role in the success of our fundraising and in structuring our financial strategy. A truly transformative support.",
      tags: ["Fundraising", "Financial strategy", "Scale-up"],
      icon: "trending",
    },
    {
      company: "Tool4staffing",
      sector: "SaaS / HR Tech",
      person: "Antoine Détis",
      role: "CEO & Founder",
      title: "Reliable reporting and significant time savings",
      quote: "Reliable financial reporting and considerable time savings thanks to Iter Advisors. Their expertise allowed us to focus on our core business.",
      tags: ["Reporting", "Automation", "SaaS"],
      icon: "briefcase",
    },
    {
      company: "WILCO",
      sector: "Accelerator / VC",
      person: "Patrick Nguyen",
      role: "Senior Expert",
      title: "Essential partner for the startup ecosystem",
      quote: "An essential partner to support our startups with long-term financial expertise. Iter Advisors understands the specific challenges of startups.",
      tags: ["Startups", "Support", "Ecosystem"],
      icon: "users",
    },
    {
      company: "Gladys",
      sector: "iGaming / Tech",
      person: "Alexis Audibert",
      role: "CEO",
      title: "From chaos to growth: +600% annual revenue increase",
      quote: "Iter Advisors' strategic financial support was a catalyst for our growth. We went from chaos to controlled growth of 600% annual revenue.",
      tags: ["Hypergrowth", "Structuring", "CFO"],
      icon: "trending",
    },
    {
      company: "Founders Future",
      sector: "Venture Studio / VC",
      person: "Louis Sautet",
      role: "Investment Director",
      title: "Financial data transformation and team upskilling",
      quote: "Iter served as interim CFO for several of our portfolio companies, always with great success. Financial data tracking transformation and team upskilling.",
      tags: ["Interim CFO", "Portfolio", "Financial data"],
      icon: "building",
    },
    {
      company: "Pôle Action Media",
      sector: "Digital cluster",
      person: "Thomas Coignard",
      role: "Managing Director",
      title: "Innovative financial support in a cross-border context",
      quote: "Exemplary responsiveness, expertise from the founders' background, and valuable support in a strong cross-border context between France and Spain.",
      tags: ["Cross-border", "Innovation", "Digital"],
      icon: "building",
    },
    {
      company: "Ben&Vic",
      sector: "Growth Strategy Consulting",
      person: "CEO",
      role: "CEO",
      title: "Strengthened financial structuring and strategic vision",
      quote: "Improved business vision, better control of our margins and budgets. Iter is proactive in strategic decisions.",
      tags: ["Steering", "Margins", "Strategy"],
      icon: "briefcase",
    },
    {
      company: "HEC Paris Incubator",
      sector: "Incubator",
      person: "Program Manager",
      role: "Director",
      title: "Operational financial advice for HEC startups",
      quote: "Iter Advisors has intervened several times at the HEC Paris Incubator to help our startups with accounting or CFO-type issues. Our startups received actionable and operational advice.",
      tags: ["Incubator", "Accounting", "CFO"],
      icon: "users",
    },
  ],
  es: [
    {
      company: "SolarMente",
      sector: "Energías renovables",
      person: "Victor Gardrinier",
      role: "Cofundador",
      title: "Liderazgo financiero transformador para la recaudación de fondos",
      quote: "Iter Advisors desempeñó un papel clave en el éxito de nuestra ronda de financiación y en la estructuración de nuestra estrategia financiera. Un acompañamiento transformador.",
      tags: ["Recaudación", "Estrategia financiera", "Scale-up"],
      icon: "trending",
    },
    {
      company: "Tool4staffing",
      sector: "SaaS / HR Tech",
      person: "Antoine Détis",
      role: "CEO y Fundador",
      title: "Reporting fiable y ahorro de tiempo significativo",
      quote: "Un reporting financiero fiable y un ahorro de tiempo considerable gracias a Iter Advisors. Su experiencia nos permitió centrarnos en nuestro negocio principal.",
      tags: ["Reporting", "Automatización", "SaaS"],
      icon: "briefcase",
    },
    {
      company: "WILCO",
      sector: "Aceleradora / VC",
      person: "Patrick Nguyen",
      role: "Experto Senior",
      title: "Socio imprescindible para el ecosistema startup",
      quote: "Un socio imprescindible para acompañar a nuestras startups con una experiencia financiera a largo plazo. Iter Advisors entiende los desafíos específicos de las startups.",
      tags: ["Startups", "Acompañamiento", "Ecosistema"],
      icon: "users",
    },
    {
      company: "Gladys",
      sector: "iGaming / Tech",
      person: "Alexis Audibert",
      role: "CEO",
      title: "Del caos al crecimiento: +600% de facturación anual",
      quote: "El apoyo financiero estratégico de Iter Advisors fue un catalizador de nuestro crecimiento. Pasamos del caos a un crecimiento controlado del 600% de facturación anual.",
      tags: ["Hipercrecimiento", "Estructuración", "CFO"],
      icon: "trending",
    },
    {
      company: "Founders Future",
      sector: "Venture Studio / VC",
      person: "Louis Sautet",
      role: "Director de Inversiones",
      title: "Transformación de datos financieros y desarrollo de equipos",
      quote: "Iter fue el CFO interino de varias de nuestras participadas, siempre con mucho éxito. Transformación del seguimiento de datos financieros y desarrollo de competencias de los equipos.",
      tags: ["CFO interino", "Cartera", "Datos financieros"],
      icon: "building",
    },
    {
      company: "Pôle Action Media",
      sector: "Cluster digital",
      person: "Thomas Coignard",
      role: "Director General",
      title: "Apoyo financiero innovador en contexto transfronterizo",
      quote: "Una reactividad ejemplar, una experiencia derivada del background de los fundadores y un acompañamiento apreciable en un contexto transfronterizo fuerte entre Francia y España.",
      tags: ["Transfronterizo", "Innovación", "Digital"],
      icon: "building",
    },
    {
      company: "Ben&Vic",
      sector: "Consultoría Growth Strategy",
      person: "CEO",
      role: "CEO",
      title: "Estructuración financiera y visión estratégica reforzadas",
      quote: "Mejora de nuestra visión de negocio, mejor control de nuestros márgenes y presupuestos. Iter es proactivo en las decisiones estratégicas.",
      tags: ["Pilotaje", "Márgenes", "Estrategia"],
      icon: "briefcase",
    },
    {
      company: "Incubadora HEC Paris",
      sector: "Incubadora",
      person: "Responsable de programa",
      role: "Director",
      title: "Asesoramiento financiero operativo para startups HEC",
      quote: "Iter Advisors ha intervenido en varias ocasiones en la Incubadora HEC Paris para ayudar a nuestras startups con problemas de contabilidad o temas de tipo CFO. Nuestras startups recibieron consejos accionables y operativos.",
      tags: ["Incubadora", "Contabilidad", "CFO"],
      icon: "users",
    },
  ],
};

const pageContent: Record<Locale, {
  resourcesLabel: string;
  resourcesHref: string;
  breadcrumbLabel: string;
  h1: string;
  intro: string;
  useCasesHeading: string;
  useCasesSubtitle: string;
  trustfolioHeading: string;
}> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Cas clients",
    h1: "Nos cas clients",
    intro: "Découvrez comment Iter Advisors accompagne ses clients au quotidien. Témoignages et retours d'expérience de dirigeants qui nous font confiance.",
    useCasesHeading: "Ils nous font confiance",
    useCasesSubtitle: "Startups, scale-ups, PME et fonds d'investissement : découvrez comment nous les accompagnons dans leur croissance.",
    trustfolioHeading: "Tous les avis vérifiés",
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Case studies",
    h1: "Our case studies",
    intro: "Discover how Iter Advisors supports its clients every day. Testimonials and feedback from business leaders who trust us.",
    useCasesHeading: "They trust us",
    useCasesSubtitle: "Startups, scale-ups, SMEs and investment funds: discover how we support their growth.",
    trustfolioHeading: "All verified reviews",
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Casos prácticos",
    h1: "Nuestros casos prácticos",
    intro: "Descubra cómo Iter Advisors acompaña a sus clientes en el día a día. Testimonios y experiencias de directivos que confían en nosotros.",
    useCasesHeading: "Confían en nosotros",
    useCasesSubtitle: "Startups, scale-ups, pymes y fondos de inversión: descubra cómo les apoyamos en su crecimiento.",
    trustfolioHeading: "Todas las opiniones verificadas",
  },
};

const iconMap = {
  building: Building2,
  users: Users,
  trending: TrendingUp,
  briefcase: Briefcase,
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TestimonialsListingPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = pageContent[locale];
  const cases = useCases[locale];
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.resourcesLabel, href: t.resourcesHref },
              { label: t.breadcrumbLabel },
            ]}
          />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.intro}
          </p>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-iter-violet/10 text-iter-violet text-xs font-semibold uppercase tracking-widest mb-4">
              Use Cases
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {t.useCasesHeading}
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t.useCasesSubtitle}
            </p>
          </div>

          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {cases.map((uc, i) => {
              const Icon = iconMap[uc.icon];
              return (
                <motion.article
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={gridInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative bg-muted/30 border border-border/50 rounded-2xl p-7 lg:p-8 hover:border-iter-violet/30 hover:shadow-lg hover:shadow-iter-violet/5 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-iter-violet/10 flex items-center justify-center">
                        <Icon size={20} className="text-iter-violet" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base">
                          {uc.company}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {uc.sector}
                        </span>
                      </div>
                    </div>
                    <Quote size={24} className="text-iter-violet/20 shrink-0" />
                  </div>

                  {/* Title */}
                  <h4 className="font-semibold text-foreground mb-3 leading-snug">
                    {uc.title}
                  </h4>

                  {/* Quote */}
                  <blockquote className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                    &laquo; {uc.quote} &raquo;
                  </blockquote>

                  {/* Person */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {uc.person}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {uc.role}, {uc.company}
                      </p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    {uc.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 rounded-full bg-iter-violet/5 text-iter-violet text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trustfolio verified reviews */}
      <section className="py-4 bg-muted/20">
        <div className="container text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            {t.trustfolioHeading}
          </h2>
        </div>
      </section>

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
