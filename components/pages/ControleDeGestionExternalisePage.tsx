import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

interface ControleDeGestionExternaliseePageProps {
  locale: Locale;
  content: any;
  cmsNavigation?: CmsNavItem[];
}

export default function ControleDeGestionExternalisePage({
  locale,
  content,
  cmsNavigation,
}: ControleDeGestionExternaliseePageProps) {
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
              { label: locale === "fr" ? "Contrôle de gestion externalisé" : "Outsourced Management Control" },
            ]}
          />
          <div className="mt-6 sm:mt-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              {t.h1}
            </h1>
            <div className="prose prose-sm sm:prose-base max-w-none">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                Le contrôle de gestion est souvent relégué au second plan dans les startups et PME en croissance. Pourtant, c'est l'outil qui permet à un dirigeant de piloter son entreprise plutôt que de la subir.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
                Structurer son contrôle de gestion ne signifie pas recruter un contrôleur de gestion interne. Pour une entreprise de quinze à soixante personnes, un tel poste est souvent surdimensionné et coûteux. L'alternative : externaliser ce pilotage auprès d'un expert qui intervient régulièrement, avec du recul et une vision comparative.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                Chez Iter Advisors, nous mettez en place les tableaux de bord, analysons vos coûts, structurons votre budget et vous accompagnons dans la prise de décision. Notre approche s'appuie sur les outils existants, sans imposer de surcharge administratif.
              </p>
            </div>
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
                  {section.paragraphs.map((para: string, pidx: number) => (
                    <p key={pidx} className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {para}
                    </p>
                  ))}
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

              {/* Pillars (special case for quatre-piliers section) */}
              {section.pillars && (
                <div className="space-y-6 mb-6">
                  {section.pillars.map((pillar: any, pidx: number) => (
                    <div key={pidx} className="border-l-4 border-iter-chartreuse pl-4">
                      <h3 className="text-lg sm:text-xl font-semibold font-heading text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {pillar.text}
                      </p>
                    </div>
                  ))}
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

      {/* CTA */}
      <CTASection locale={locale} />
    </PageLayout>
  );
}
