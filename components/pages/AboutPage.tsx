import { Locale } from "@/lib/i18n";
import { getAboutContent } from "@/lib/content/about";
import type { StrapiTeamMember } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";

function toDisplayMember(m: StrapiTeamMember) {
  return {
    name: `${m.firstName} ${m.lastName}`.trim(),
    role: m.role,
    linkedin: m.linkedIn || "#",
  };
}

export default function AboutPage({
  locale,
  teamMembers: strapiTeam = [],
}: {
  locale: Locale;
  teamMembers?: StrapiTeamMember[];
}) {
  const t = getAboutContent(locale);
  const members =
    strapiTeam.length > 0
      ? strapiTeam.map(toDisplayMember)
      : t.team.members.map((m) => ({ name: m.name, role: m.role, linkedin: m.linkedin }));

  return (
    <PageLayout locale={locale}>
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
            {members.map((member, i) => (
              <a
                key={i}
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-center w-[calc(50%-0.75rem)] sm:w-[calc(33.333%-1rem)] md:w-[calc(25%-1.125rem)] lg:w-[calc(20%-1.2rem)]"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-2xl bg-iter-violet flex items-center justify-center group-hover:bg-iter-violet/80 transition-colors">
                  <span className="text-white font-bold text-lg md:text-xl">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-semibold text-sm group-hover:text-iter-violet transition-colors">
                  {member.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {member.role}
                </p>
                <div className="mt-1.5 flex justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-muted-foreground/40 group-hover:text-iter-violet transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </a>
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
