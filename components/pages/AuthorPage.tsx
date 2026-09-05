import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { resolveBlogArticleHref } from "@/lib/path-localization";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import type { StrapiTeamMember, CmsNavItem } from "@/lib/static-content";

interface AuthorPageArticle {
  title: string;
  slug: string;
  publishedDate?: string;
  excerpt?: string;
  category?: string | null;
}

interface AuthorPageProps {
  locale: Locale;
  member: StrapiTeamMember & { bio: string; h1Role?: string; bioExtended?: string };
  articles: AuthorPageArticle[];
  cmsNavigation?: CmsNavItem[];
}

const STRINGS: Record<
  Locale,
  {
    breadcrumbAbout: string;
    aboutHref: string;
    articlesH2: string;
    articlesEmpty: string;
    readArticle: string;
    linkedInLabel: string;
    role: string;
    readTimeJoin: string;
  }
> = {
  fr: {
    breadcrumbAbout: "À propos",
    aboutHref: "/a-propos",
    articlesH2: "Articles publiés",
    articlesEmpty:
      "Aucun article publié pour le moment. Revenez bientôt.",
    readArticle: "Lire l’article",
    linkedInLabel: "Profil LinkedIn",
    role: "Rôle",
    readTimeJoin: " · ",
  },
  en: {
    breadcrumbAbout: "About",
    aboutHref: "/en/about",
    articlesH2: "Published articles",
    articlesEmpty: "No articles published yet. Check back soon.",
    readArticle: "Read the article",
    linkedInLabel: "LinkedIn profile",
    role: "Role",
    readTimeJoin: " · ",
  },
  es: {
    breadcrumbAbout: "Sobre nosotros",
    aboutHref: "/es/quienes-somos",
    articlesH2: "Artículos publicados",
    articlesEmpty: "Aún no hay artículos publicados. Vuelva pronto.",
    readArticle: "Leer el artículo",
    linkedInLabel: "Perfil de LinkedIn",
    role: "Cargo",
    readTimeJoin: " · ",
  },
};

function formatDate(iso: string | undefined, locale: Locale): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const tag: Record<Locale, string> = {
    fr: "fr-FR",
    en: "en-GB",
    es: "es-ES",
  };
  return d.toLocaleDateString(tag[locale], {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AuthorPage({
  locale,
  member,
  articles,
  cmsNavigation,
}: AuthorPageProps) {
  const { bioExtended } = member;
  const t = STRINGS[locale];

  // SEO-ULT §4b (2026-08-15) — la bibliographie d'un auteur listait ses
  // articles à l'URL de la locale courante, sans vérifier qu'elle les sert.
  // En ES, chaque entrée partait vers `/es/ressources/blog/...` (308), et
  // l'ancien slug `cout-daf-externalise-tarifs-prix-2026` y figurait encore
  // alors que sa traduction vit sous un autre nom.
  const publishedArticles = articles.filter(
    (a) => resolveBlogArticleHref(locale, a.slug) !== null,
  );

  // Person schema (E-E-A-T / GEO signal). The Person is identified by
  // their slug + linked to the Iter Advisors Organization via worksFor.
  // sameAs picks up the LinkedIn profile so search engines can merge
  // the entity across the web.
  const fullName = `${member.firstName} ${member.lastName}`;
  const canonicalPath = `${t.aboutHref}/${member.slug}`;
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://www.iteradvisors.com${canonicalPath}#person`,
    name: fullName,
    givenName: member.firstName,
    familyName: member.lastName,
    jobTitle: member.role,
    description: member.bio,
    url: `https://www.iteradvisors.com${canonicalPath}`,
    image: member.photo?.url
      ? `https://www.iteradvisors.com${member.photo.url}`
      : undefined,
    sameAs: member.linkedIn ? [member.linkedIn] : undefined,
    worksFor: {
      "@type": "Organization",
      "@id": "https://www.iteradvisors.com/#organization",
      name: "Iter Advisors",
    },
  };

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Person JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <section className="bg-background pt-32 pb-12 lg:pb-16">
        <div className="container">
          <Breadcrumb
            locale={locale}
            items={[
              { label: t.breadcrumbAbout, href: t.aboutHref },
              { label: fullName },
            ]}
          />
          <div className="grid lg:grid-cols-[200px_1fr] gap-8 lg:gap-12 items-start max-w-4xl">
            {member.photo?.url && (
              <div className="relative w-40 h-40 lg:w-[200px] lg:h-[200px] shrink-0">
                <Image
                  src={member.photo.url}
                  alt={fullName}
                  fill
                  sizes="200px"
                  priority
                  className="rounded-2xl object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground mb-3">
                {fullName} — {member.h1Role ?? member.role}
              </h1>
              <p className="text-lg text-iter-violet font-medium mb-6">
                {member.role}
              </p>
              <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-4">
                {member.bio}
              </p>
              {bioExtended && (
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed mb-6">
                  {bioExtended}
                </p>
              )}
              {member.linkedIn && (
                <a
                  href={member.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-iter-violet text-white font-medium text-sm hover:brightness-110 transition-all"
                  aria-label={`${t.linkedInLabel} de ${fullName}`}
                >
                  <Linkedin size={16} aria-hidden="true" />
                  {t.linkedInLabel}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Le bloc « articles publiés » n'est rendu que s'il y a des articles.
          Auparavant, les 17 fiches auteur sans publication affichaient un
          H2 suivi de « Aucun article publié » : un module vide sur une page
          indexable, qui dilue le contenu utile de la fiche (2026-08-02). */}
      <section className="bg-background pb-24 lg:pb-16">
        <div className="container max-w-4xl">
          {publishedArticles.length > 0 && (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-8">
                {t.articlesH2}{" "}
                <span className="text-base font-normal text-muted-foreground">
                  ({publishedArticles.length})
                </span>
              </h2>
              <ul className="divide-y divide-border/60">
              {publishedArticles.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={resolveBlogArticleHref(locale, a.slug) as string}
                    className="group flex items-start justify-between gap-6 py-5 hover:bg-muted/30 -mx-4 px-4 rounded-xl transition-colors"
                  >
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold font-heading text-foreground group-hover:text-iter-violet transition-colors mb-1">
                        {a.title}
                      </h3>
                      {(a.publishedDate || a.category) && (
                        <p className="text-xs text-foreground/55 font-medium">
                          {a.category}
                          {a.category && a.publishedDate ? t.readTimeJoin : ""}
                          {formatDate(a.publishedDate, locale)}
                        </p>
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm text-iter-violet shrink-0 mt-1">
                      {t.readArticle}
                      <ArrowRight
                        size={14}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </li>
              ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
