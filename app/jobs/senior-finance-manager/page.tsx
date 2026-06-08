import { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Senior Finance Manager — Recrutement | Iter Advisors",
    description:
      "Senior Finance Manager pour piloter et coordonner les missions clients chez Iter Advisors. Cabinet DAF externalisé Barcelone, Paris, Toulouse.",
    alternates: {
      canonical: "https://www.iteradvisors.com/jobs/senior-finance-manager",
    },
    openGraph: {
      title: "Senior Finance Manager — Recrutement | Iter Advisors",
      description:
        "Senior Finance Manager pour piloter et coordonner les missions clients chez Iter Advisors. Cabinet DAF externalisé Barcelone, Paris, Toulouse.",
      url: "https://www.iteradvisors.com/jobs/senior-finance-manager",
      type: "website",
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630 }],
  },
  };
}

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");
  return (
    <PageLayout locale="fr" cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="bg-gradient-to-br from-background via-background to-iter-violet/5 pt-20 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
        <div className="container max-w-3xl">
          <Breadcrumb
            locale="fr"
            items={[
              { label: "Carrières", href: "/jobs" },
              { label: "Senior Finance Manager" },
            ]}
          />
          <div className="mt-8 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Senior Finance Manager — rejoindre Iter Advisors
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Rejoignez Iter Advisors en tant que <strong>Senior Finance Manager</strong> pour piloter l'exécution des missions
              clients, coordonner les équipes d'analystes et accompagner nos
              fractional CFOs dans la gestion de notre portefeuille de startups
              tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Mail size={18} />
                Envoyer votre CV
              </a>
              <a
                href="https://www.linkedin.com/in/sebastien-doat-fractional-cfo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-iter-violet text-iter-violet hover:bg-iter-violet/5 transition-all duration-300 font-semibold"
              >
                <Linkedin size={18} />
                Contacter Sébastien
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container max-w-3xl space-y-16 sm:space-y-24">
          {/* Le rôle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Le rôle
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              En tant que <strong>Senior Finance Manager</strong>, vous serez le lien opérationnel entre
              nos fractional CFOs et nos clients. Vos responsabilités incluent :
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • Coordonner et exécuter les missions financières chez nos
                clients (reporting, trésorerie, clôtures)
              </li>
              <li>
                • Animer les équipes d'analystes financiers sur chaque mission
              </li>
              <li>
                • Assurer la qualité et la conformité des livrables (normes
                comptables, best practices)
              </li>
              <li>
                • Être l'interlocuteur privilegié du client pour les questions
                opérationnelles
              </li>
              <li>
                • Identifier les amélirations de processus et optimiser les
                délais
              </li>
              <li>
                • Contribuer à la formation et au mentorat des analystes junior
              </li>
            </ul>
          </div>

          {/* Profil */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Profil recherché
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Expérience requise
                </h3>
                <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • 5-8 ans d'expérience en cabinet d'expertise comptable ou
                    en direction financière interne
                  </li>
                  <li>
                    • Expérience de pilotage de missions multiples en parallèle
                  </li>
                  <li>
                    • Maîtrise des outils : Sage, Pennylane, Excel avancé
                  </li>
                  <li>
                    • Solide connaissance de la comptabilité générale, de la
                    fiscalité et du reporting
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Soft skills
                </h3>
                <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Leadership et capacité à motiver une équipe de 2-4
                    analystes
                  </li>
                  <li>
                    • Rigueur et attention aux détails (les chiffres, c'est
                    important !)
                  </li>
                  <li>
                    • Relationnel client : à l'aise avec la communication et la
                    négociation
                  </li>
                  <li>
                    • Pragmatisme : on résout les problèmes, on ne cherche pas
                    des excuses
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Ce que nous proposons */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Ce que nous proposons
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • CDI temps plein, rémunération 55-75 k€/an selon profil
              </li>
              <li>
                • Bureaux centraux à Paris et Barcelone — mode hybride
              </li>
              <li>
                • Équipe de 2-4 analystes financiers à manager et accompagner
              </li>
              <li>
                • Interaction directe avec les fractional CFOs et les clients
              </li>
              <li>
                • Formations continues : comptabilité, outils, management
              </li>
              <li>
                • Progression claire : cap à un rôle de CFO partner après 2-3
                ans
              </li>
            </ul>
          </div>

          {/* Comment postuler */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Comment postuler
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Envoyez votre CV et une présentation de votre expérience à{" "}
              <a
                href="mailto:recrutement@iteradvisors.com"
                className="text-iter-violet hover:underline font-semibold"
              >
                recrutement@iteradvisors.com
              </a>
              . Entretiens : 1h initial + cas pratique + rencontre équipe. Délai
              moyen : 3-4 semaines.
            </p>
          </div>

          {/* CTA Final */}
          <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Prêt à pilotage des missions et d'une équipe ?
            </p>
            <a
              href="mailto:recrutement@iteradvisors.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Mail size={18} />
              Envoyer votre candidature
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale="fr" />
    </PageLayout>
  );
}
