import Image from "next/image";
import { Locale } from "@/lib/i18n";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";
import StrapiBlocks from "@/components/StrapiBlocks";
import { StrapiTestimonial, strapiMediaUrl } from "@/lib/static-content";

const labels: Record<Locale, { resources: string; resourcesHref: string; testimonials: string; testimonialsHref: string; challenge: string; solution: string; results: string; industry: string; teamSize: string; revenue: string; engagement: string }> = {
  // T4 (2026-05-31): testimonialsHref now points to /ressources/cas-clients
  // (the unified social-proof hub). The old /ressources/testimonials path
  // 301-redirects to cas-clients per next.config.ts UX-02, so internal links
  // through this breadcrumb must use the canonical destination directly.
  fr: { resources: "Ressources", resourcesHref: "/ressources", testimonials: "Cas clients", testimonialsHref: "/ressources/cas-clients", challenge: "Le défi", solution: "Notre solution", results: "Résultats", industry: "Secteur", teamSize: "Équipe", revenue: "CA initial", engagement: "Type de mission" },
  en: { resources: "Resources", resourcesHref: "/en/ressources", testimonials: "Case studies", testimonialsHref: "/en/ressources/cas-clients", challenge: "The challenge", solution: "Our solution", results: "Results", industry: "Industry", teamSize: "Team size", revenue: "Initial revenue", engagement: "Engagement type" },
  es: { resources: "Recursos", resourcesHref: "/es/recursos", testimonials: "Casos prácticos", testimonialsHref: "/es/recursos/casos-de-exito", challenge: "El desafío", solution: "Nuestra solución", results: "Resultados", industry: "Sector", teamSize: "Equipo", revenue: "Facturación inicial", engagement: "Tipo de misión" },
};

export default function StrapiTestimonialPage({ locale, testimonial }: { locale: Locale; testimonial: StrapiTestimonial }) {
  const t = labels[locale];
  const logoSrc = strapiMediaUrl(testimonial.clientLogo);

  return (
    <PageLayout locale={locale}>
      <section className="bg-background pt-32 pb-16">
        <div className="container">
          <Breadcrumb locale={locale} items={[{ label: t.resources, href: t.resourcesHref }, { label: t.testimonials, href: t.testimonialsHref }, { label: testimonial.title }]} />
          <div className="flex items-center gap-6 mb-6">
            {logoSrc && (
              <div className="w-16 h-16 relative flex-shrink-0 bg-white rounded-xl border border-border/50 p-2">
                <Image src={logoSrc} alt={testimonial.title} fill sizes="64px" className="object-contain" />
              </div>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold font-heading text-foreground">{testimonial.title}</h1>
          </div>
        </div>
      </section>

      <section className="bg-background pb-12">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonial.industry && (
              <div className="bg-muted/30 rounded-2xl p-5"><span className="text-xs font-bold text-iter-violet/60 uppercase tracking-widest">{t.industry}</span><p className="font-semibold text-foreground mt-1">{testimonial.industry}</p></div>
            )}
            {testimonial.teamSize && (
              <div className="bg-muted/30 rounded-2xl p-5"><span className="text-xs font-bold text-iter-violet/60 uppercase tracking-widest">{t.teamSize}</span><p className="font-semibold text-foreground mt-1">{testimonial.teamSize}</p></div>
            )}
            {testimonial.initialRevenue && (
              <div className="bg-muted/30 rounded-2xl p-5"><span className="text-xs font-bold text-iter-violet/60 uppercase tracking-widest">{t.revenue}</span><p className="font-semibold text-foreground mt-1">{testimonial.initialRevenue}</p></div>
            )}
            {testimonial.engagementType && (
              <div className="bg-muted/30 rounded-2xl p-5"><span className="text-xs font-bold text-iter-violet/60 uppercase tracking-widest">{t.engagement}</span><p className="font-semibold text-foreground mt-1">{testimonial.engagementType}</p></div>
            )}
          </div>
        </div>
      </section>

      <article className="bg-background py-16 lg:py-24">
        <div className="container max-w-3xl space-y-12">
          {testimonial.challenge && testimonial.challenge.length > 0 && (
            <div><h2 className="text-2xl font-bold font-heading text-foreground mb-4">{t.challenge}</h2><StrapiBlocks blocks={testimonial.challenge} /></div>
          )}
          {testimonial.solution && testimonial.solution.length > 0 && (
            <div><h2 className="text-2xl font-bold font-heading text-foreground mb-4">{t.solution}</h2><StrapiBlocks blocks={testimonial.solution} /></div>
          )}
          {testimonial.results && testimonial.results.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold font-heading text-foreground mb-4">{t.results}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {testimonial.results.map((r) => (
                  <div key={r.id} className="bg-muted/30 rounded-2xl p-6 border border-border/30">
                    <span className="text-2xl font-bold text-iter-violet">{r.metric}</span>
                    <p className="text-muted-foreground mt-1">{r.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
