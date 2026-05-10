import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import ClientTestimonials from "@/components/ClientTestimonials";

interface ComptabiliteExternalisationPageProps {
  locale: Locale;
  content: any;
  cmsNavigation?: CmsNavItem[];
}

export default function ComptabiliteExternalisationPage({
  locale,
  content,
  cmsNavigation,
}: ComptabiliteExternalisationPageProps) {
  const t = content;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: locale === "fr" ? "Services" : "Services", href: "/services" },
              { label: locale === "fr" ? "Externalisation comptable" : "Accounting Outsourcing" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {t.h1}
            </h1>
            <div className="prose prose-sm sm:prose-base max-w-none space-y-4 mb-8">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                La comptabilité reste l'un des premiers points de friction pour un dirigeant. Entre les échéances fiscales, la gestion des factures et la préparation de la clôture annuelle, le temps consacré à la tenue des comptes s'accumule vite. Pourtant, rares sont les entreprises en croissance qui justifient dès le départ un comptable interne à temps plein.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                L'externalisation comptable permet de résoudre ce dilemme. Elle donne accès à une expertise de niveau professionnel, sans les contraintes d'un recrutement. Pour une startup qui prépare une levée de fonds ou une PME qui veut structurer sa finance, disposer de données comptables fiables et à jour n'est pas un luxe : c'est une condition de pilotage.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                Chez Iter Advisors, nous accompagnons les dirigeants sur la tenue comptable, les déclarations fiscales et la clôture annuelle. Notre approche s'appuie sur les outils cloud que vous utilisez déjà, sans imposer de migration forcée ni de rupture dans vos processus.
              </p>
            </div>
            {t.tldr && (
              <div className="mb-8 p-6 bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg">
                <p className="text-sm font-semibold text-foreground mb-2">En une ligne</p>
                <p className="text-sm sm:text-base text-foreground leading-relaxed">
                  {t.tldr}
                </p>
              </div>
            )}
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300 mt-2"
            >
              Demander un devis
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl">
          {t.sections.map((section: any, idx: number) => (
            <div key={idx} id={section.id} className="scroll-mt-24 mb-16 sm:mb-24">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
                {section.title}
              </h2>

              {/* Regular paragraphs */}
              {section.paragraphs && (
                <div className="prose prose-sm sm:prose-base max-w-none space-y-4 mb-6">
                  {section.paragraphs.map((para: string, pidx: number) => {
                    // Simple link replacement for [[text|url]] syntax
                    const parts = para.split(/\[\[(.+?)\|(.+?)\]\]/g);
                    return (
                      <p key={pidx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {parts.map((part: string, i: number) => {
                          if (i % 3 === 0) return part; // Regular text
                          if (i % 3 === 1) {
                            // This is the link text, next item is the URL
                            const url = parts[i + 1];
                            return (
                              <Link
                                key={i}
                                href={url}
                                className="text-iter-violet hover:text-iter-violet/80 underline"
                              >
                                {part}
                              </Link>
                            );
                          }
                          return null; // URL part, already processed
                        })}
                      </p>
                    );
                  })}
                </div>
              )}

              {/* Bullet points */}
              {section.bullets && (
                <div className="mb-6">
                  <ul className="space-y-4">
                    {section.bullets.map((bullet: any, bidx: number) => (
                      <li key={bidx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">{bullet.title}</strong> {bullet.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Closing text */}
              {section.closingText && (
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {section.closingText}
                </p>
              )}

              {/* FAQ Section */}
              {section.faqs && (
                <div className="space-y-6">
                  {section.faqs.map((faq: any, fidx: number) => (
                    <div key={fidx}>
                      <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {t.testimonials && (
        <section className="py-16 sm:py-24 lg:py-32 bg-iter-violet/5">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-12 text-center">
              Avis de nos clients
            </h2>
            <ClientTestimonials
              testimonials={t.testimonials}
              trustfolioUrl="https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc"
            />
          </div>
        </section>
      )}

      {/* Sources Section */}
      {t.sources && (
        <section className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="container max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-8">
              Sources et références
            </h2>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <ul className="space-y-3">
                {t.sources.map((source: string, idx: number) => (
                  <li key={idx} className="text-sm sm:text-base text-muted-foreground">
                    {source}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs text-muted-foreground mt-8 pt-8 border-t">
              Les chiffres et références citées dans cet article proviennent de sources publiques officielles.
              Nous nous engageons à maintenir la pertinence et l'exactitude de ces informations.
            </p>
          </div>
        </section>
      )}

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
