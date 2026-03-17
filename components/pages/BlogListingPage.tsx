import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getLocalePath } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import { strapiMediaUrl } from "@/lib/strapi";
import type { StrapiBlogArticle, CmsNavItem } from "@/lib/strapi";

const content: Record<
  Locale,
  {
    resourcesLabel: string;
    resourcesHref: string;
    breadcrumbLabel: string;
    h1: string;
    intro: string;
    discover: string;
    cards: { title: string; href: string; image: string }[];
  }
> = {
  fr: {
    resourcesLabel: "Ressources",
    resourcesHref: "/ressources",
    breadcrumbLabel: "Blog",
    h1: "Nos articles",
    intro:
      "Retrouvez toutes les actualités et analyses de nos experts financiers. Des articles pratiques pour piloter votre croissance.",
    discover: "Lire l'article",
    cards: [
      {
        title: "Les 10 outils pour les CFOs en start-up",
        href: "/ressources/blog/les-10-outils-pour-les-cfos-en-start-up",
        image: "/images/blog/les-10-outils-cfos.jpg",
      },
      {
        title:
          "Flux de trésorerie : définition et importance pour les entreprises",
        href: "/ressources/blog/flux-de-tresorerie",
        image: "/images/blog/flux-de-tresorerie.jpg",
      },
      {
        title: "La modernisation du rôle de CFO",
        href: "/ressources/blog/la-modernisation-du-role-de-cfo",
        image: "/images/blog/modernisation-cfo.jpg",
      },
    ],
  },
  en: {
    resourcesLabel: "Resources",
    resourcesHref: "/en/ressources",
    breadcrumbLabel: "Blog",
    h1: "Our articles",
    intro:
      "Browse all news and analyses from our financial experts. Practical articles to drive your growth.",
    discover: "Read the article",
    cards: [
      {
        title:
          "AI and automation of repetitive tasks in the Finance department",
        href: "/en/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
        image: "/images/blog/ia-automatisation.jpg",
      },
      {
        title: "Organizing your finance department",
        href: "/en/ressources/blog/organiser-sa-direction-financiere",
        image: "/images/blog/organiser-direction-financiere.jpg",
      },
      {
        title: "Essential financial tech tools",
        href: "/en/ressources/blog/essentiels-outils-tech-finance",
        image: "/images/blog/outils-tech-finance.jpg",
      },
    ],
  },
  es: {
    resourcesLabel: "Recursos",
    resourcesHref: "/es/ressources",
    breadcrumbLabel: "Blog",
    h1: "Nuestros artículos",
    intro:
      "Consulte todas las noticias y análisis de nuestros expertos financieros. Artículos prácticos para impulsar su crecimiento.",
    discover: "Leer el artículo",
    cards: [
      {
        title:
          "IA y automatización de tareas repetitivas en el departamento de Finanzas",
        href: "/es/ressources/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance",
        image: "/images/blog/ia-automatisation.jpg",
      },
      {
        title: "Organizar su departamento financiero",
        href: "/es/ressources/blog/organiser-sa-direction-financiere",
        image: "/images/blog/organiser-direction-financiere.jpg",
      },
      {
        title: "Las herramientas tecnológicas esenciales para las finanzas",
        href: "/es/ressources/blog/essentiels-outils-tech-finance",
        image: "/images/blog/outils-tech-finance.jpg",
      },
    ],
  },
};

const blogBasePath = "/ressources/blog";

function getBlogHref(locale: Locale, slug: string): string {
  return getLocalePath(locale, `${blogBasePath}/${slug}`);
}

export default function BlogListingPage({
  locale,
  articles,
  cmsNavigation,
}: {
  locale: Locale;
  articles?: StrapiBlogArticle[] | null;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = content[locale];
  // When Strapi returns articles, use their featuredImage; otherwise fallback to static cards (local images in public/images/blog/)
  const cards =
    articles && articles.length > 0
      ? articles.map((a) => {
          const imageUrl = a.featuredImage?.url
            ? strapiMediaUrl(a.featuredImage)
            : "";
          return {
            title: a.title,
            href: getBlogHref(locale, a.slug),
            image: imageUrl || "/images/blog/placeholder.jpg",
          };
        })
      : t.cards;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
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

      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, i) => (
              <Link key={i} href={card.href} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-5 bg-muted">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-2 block">
                  Blog
                </span>
                <h3 className="text-lg font-semibold font-heading group-hover:text-iter-violet transition-colors leading-snug">
                  {card.title}
                </h3>
                <span className="inline-flex items-center gap-2 mt-3 text-[13px] font-medium text-foreground/40 group-hover:text-iter-violet transition-colors">
                  {t.discover}
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
