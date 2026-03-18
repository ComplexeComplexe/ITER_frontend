import { Locale } from "@/lib/i18n";
import { getAboutContent } from "@/lib/content/about";
import { getFallbackTeamMembers } from "@/lib/content/team";
import type { StrapiTeamMember, CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import TeamMemberCard from "@/components/TeamMemberCard";

export default function AboutPage({
  locale,
  teamMembers: strapiTeam = [],
  cmsNavigation,
}: {
  locale: Locale;
  teamMembers?: StrapiTeamMember[];
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getAboutContent(locale);

  // Use Strapi team if available, otherwise fall back to static data
  const team = strapiTeam.length > 0 ? strapiTeam : getFallbackTeamMembers(locale);

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.hero.h1 }]} />
          <h1 className="text-4xl lg:text-5xl font-bold font-heading text-foreground max-w-2xl mb-6">
            {t.hero.h1}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t.hero.intro}
          </p>
        </div>
      </section>

      {/* Who we are */}
      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              {locale === "fr"
                ? "Qui sommes-nous"
                : locale === "en"
                  ? "Who we are"
                  : "Quiénes somos"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
              {t.whoWeAre.heading}
            </h2>
            {t.whoWeAre.paragraphs.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Vision */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
            {locale === "fr"
              ? "Notre vision"
              : locale === "en"
                ? "Our vision"
                : "Nuestra visión"}
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4">
            {t.vision.heading}
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            {t.vision.intro}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.vision.cards.map((card, i) => (
              <div
                key={i}
                className="bg-background border border-border/50 rounded-2xl shadow-sm p-6 group hover:border-iter-violet/30 transition-all duration-300"
              >
                <span className="text-[11px] font-bold text-iter-violet/40 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold font-heading text-foreground mt-2 mb-3 group-hover:text-iter-violet transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to call */}
      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              {locale === "fr"
                ? "Accompagnement"
                : locale === "en"
                  ? "Support"
                  : "Acompañamiento"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">
              {t.whenToCall.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-12">
              {t.whenToCall.intro}
            </p>
            <div className="relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-iter-violet/10" />
              <div className="space-y-8">
                {t.whenToCall.stages.map((stage, i) => (
                  <div key={i} className="relative flex gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-[15px] h-[15px] rounded-full bg-iter-violet border-[3px] border-background shadow-sm mt-1" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold font-heading text-iter-violet mb-2">
                        {stage.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="border-b border-border/50" />
      </div>

      {/* Team */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              {locale === "fr"
                ? "L'équipe"
                : locale === "en"
                  ? "Team"
                  : "Equipo"}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">
              {t.team.heading}
            </h2>
            <p className="text-muted-foreground leading-relaxed mt-4">
              {t.team.intro}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {team.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-24 lg:py-16">
        <div className="container">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-iter-violet mb-3 block">
              FAQ
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">
              {t.faq.heading}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-3">
            {t.faq.items.map((item, i) => (
              <details
                key={i}
                className="group border border-border/50 rounded-2xl overflow-hidden hover:border-iter-violet/30 transition-colors"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left font-semibold text-foreground hover:text-iter-violet transition-colors">
                  <span>{item.question}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 ml-4 text-foreground/30 transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection locale={locale} />
      <CTASection locale={locale} />
    </PageLayout>
  );
}
