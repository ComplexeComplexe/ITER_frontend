"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Building2,
  Clock,
  Send,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import type { StrapiJobOffer, CmsNavItem } from "@/lib/strapi";
import StrapiBlocks from "@/components/StrapiBlocks";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

const labels: Record<
  Locale,
  {
    backToJobs: string;
    applyNow: string;
    description: string;
    requirements: string;
    location: string;
    contract: string;
    department: string;
    jobDetails: string;
    applyTitle: string;
    applyText: string;
    contractLabels: Record<string, string>;
  }
> = {
  fr: {
    backToJobs: "Retour aux offres",
    applyNow: "Postuler maintenant",
    description: "Description du poste",
    requirements: "Profil recherché",
    location: "Localisation",
    contract: "Type de contrat",
    department: "Département",
    jobDetails: "Détails du poste",
    applyTitle: "Intéressé(e) par ce poste ?",
    applyText:
      "Envoyez-nous votre CV et lettre de motivation. Nous reviendrons vers vous dans les plus brefs délais.",
    contractLabels: {
      cdi: "CDI",
      cdd: "CDD",
      freelance: "Freelance",
      stage: "Stage",
    },
  },
  en: {
    backToJobs: "Back to jobs",
    applyNow: "Apply now",
    description: "Job description",
    requirements: "Requirements",
    location: "Location",
    contract: "Contract type",
    department: "Department",
    jobDetails: "Job details",
    applyTitle: "Interested in this position?",
    applyText:
      "Send us your CV and cover letter. We will get back to you as soon as possible.",
    contractLabels: {
      cdi: "Permanent",
      cdd: "Fixed-term",
      freelance: "Freelance",
      stage: "Internship",
    },
  },
  es: {
    backToJobs: "Volver a ofertas",
    applyNow: "Postular ahora",
    description: "Descripción del puesto",
    requirements: "Perfil buscado",
    location: "Ubicación",
    contract: "Tipo de contrato",
    department: "Departamento",
    jobDetails: "Detalles del puesto",
    applyTitle: "¿Interesado/a en este puesto?",
    applyText:
      "Envíenos su CV y carta de presentación. Le responderemos lo antes posible.",
    contractLabels: {
      cdi: "Indefinido",
      cdd: "Temporal",
      freelance: "Freelance",
      stage: "Prácticas",
    },
  },
};

function getJobsPath(locale: Locale) {
  if (locale === "fr") return "/jobs";
  return `/${locale}/jobs`;
}

export default function JobDetailPage({
  locale,
  job,
  cmsNavigation,
}: {
  locale: Locale;
  job: StrapiJobOffer;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = labels[locale];
  const contractLabel =
    t.contractLabels[job.contractType] || job.contractType;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-background pt-32 pb-16">
        <div className="container max-w-4xl">
          <Breadcrumb
            locale={locale}
            items={[
              { label: "Jobs", href: getJobsPath(locale) },
              { label: job.title },
            ]}
          />

          {/* Back link */}
          <Link
            href={getJobsPath(locale)}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-iter-violet transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t.backToJobs}
          </Link>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold font-heading text-foreground mb-6">
            {job.title}
          </h1>

          {/* Meta badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {job.location && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground/80">
                <MapPin size={16} className="text-iter-violet" />
                {job.location}
              </span>
            )}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground/80">
              <Clock size={16} className="text-iter-violet" />
              {contractLabel}
            </span>
            {job.department && (
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm font-medium text-foreground/80">
                <Building2 size={16} className="text-iter-violet" />
                {job.department}
              </span>
            )}
          </div>

          {/* CTA */}
          <a
            href="mailto:contact@iteradvisors.com?subject=Candidature%20-%20{job.title}"
            className="inline-flex items-center gap-2 px-6 py-3 bg-iter-violet text-white font-semibold rounded-xl hover:bg-iter-violet/90 transition-colors"
          >
            <Send size={18} />
            {t.applyNow}
          </a>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-16 lg:py-24">
        <div className="container max-w-4xl">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12">
            {/* Main content */}
            <div className="space-y-12">
              {/* Description */}
              {job.description && job.description.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <Briefcase size={24} className="text-iter-violet" />
                    {t.description}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <StrapiBlocks blocks={job.description} />
                  </div>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
                    <svg
                      className="text-iter-violet"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    {t.requirements}
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <StrapiBlocks blocks={job.requirements} />
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-32 lg:self-start">
              {/* Job details card */}
              <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-iter-violet">
                  {t.jobDetails}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.location}
                      </p>
                      <p className="text-sm font-medium">
                        {job.location || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock
                      size={18}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.contract}
                      </p>
                      <p className="text-sm font-medium">{contractLabel}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2
                      size={18}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t.department}
                      </p>
                      <p className="text-sm font-medium">
                        {job.department || "—"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Apply card */}
              <div className="bg-iter-violet/5 border border-iter-violet/20 rounded-2xl p-6 space-y-4">
                <h3 className="text-lg font-bold font-heading">
                  {t.applyTitle}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.applyText}
                </p>
                <a
                  href={`mailto:contact@iteradvisors.com?subject=Candidature - ${encodeURIComponent(job.title)}`}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-iter-violet text-white font-semibold rounded-xl hover:bg-iter-violet/90 transition-colors text-sm"
                >
                  <Send size={16} />
                  {t.applyNow}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection locale={locale} />
    </PageLayout>
  );
}
