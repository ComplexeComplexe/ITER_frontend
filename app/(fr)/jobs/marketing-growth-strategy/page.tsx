import { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { getCmsNavigation } from "@/lib/static-content";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Marketing & Growth Strategy — Recrutement | Iter Advisors",
    description:
      "Iter Advisors recrute un(e) responsable Marketing & Growth Strategy. Cabinet de DAF externalisé à Barcelone, Paris, Toulouse. Postes ouverts.",
    alternates: {
      canonical: "https://www.iteradvisors.com/jobs/marketing-growth-strategy",
    },
    openGraph: {
      title: "Marketing & Growth Strategy — Recrutement | Iter Advisors",
      description:
        "Iter Advisors recrute un(e) responsable Marketing & Growth Strategy. Cabinet de DAF externalisé à Barcelone, Paris, Toulouse. Postes ouverts.",
      url: "https://www.iteradvisors.com/jobs/marketing-growth-strategy",
      type: "website",
    images: [{ url: "/images/og-logo.png", width: 1200, height: 630 }],
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
              { label: "Responsable Marketing & Growth" },
            ]}
          />
          <div className="mt-8 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Responsable Marketing & Growth Strategy — Iter Advisors
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Iter Advisors, cabinet de direction financière externalisée pour
              startups et PME, recrute un(e) <strong>Responsable Marketing & Growth Strategy</strong> pour piloter
              notre croissance et notre visibilité auprès des startups tech en
              Île-de-France et en Espagne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:contact@iteradvisors.com"
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
              Vous piloterez l'ensemble de notre stratégie marketing et croissance :
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • Définir et exécuter la stratégie d'acquisition et de
                positionnement auprès des startups et PME
              </li>
              <li>
                • Gérer notre présence digitale (site web, SEO, content
                marketing, réseaux sociaux)
              </li>
              <li>
                • Piloter les campagnes acquisition et les partenariats
                stratégiques
              </li>
              <li>
                • Analyser les données de performance (Google Analytics, SEO,
                taux de conversion)
              </li>
              <li>
                • Coordonner avec l'équipe ventes pour l'inbound et l'outbound
              </li>
              <li>
                • Suivre la réputation et la présence de marque en ligne
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
                    • 4-6 ans d'expérience en marketing B2B, idéalement dans
                    le secteur du conseil ou des services
                  </li>
                  <li>
                    • Expérience du growth hacking ou de l'inbound marketing
                  </li>
                  <li>
                    • Maîtrise des outils : Google Analytics, CMS, SEO tools,
                    Mailchimp/HubSpot
                  </li>
                  <li>
                    • Capacité à analyser des données et prendre des décisions
                    data-driven
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Soft skills
                </h3>
                <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Créativité et capacité à penser « growth » en
                    permanence
                  </li>
                  <li>
                    • Aisance rédactionnelle (copywriting pour landing pages,
                    emails, blogs)
                  </li>
                  <li>
                    • Leadership : capable de gérer plusieurs projets en
                    parallèle
                  </li>
                  <li>
                    • Autonomie et entrepreneuriat (vous construisez, vous
                    testez, vous apprenez)
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
              <li>• CDI temps plein, rémunération 50-70 k€/an selon profil</li>
              <li>
                • Bureaux centraux à Paris (La Défense) et Barcelone — mode
                hybride
              </li>
              <li>
                • Environnement startup : liberté, responsabilité, impact
                direct
              </li>
              <li>
                • Budget marketing dédié pour tester et itérer rapidement
              </li>
              <li>
                • Équipe support : analyste et fondateurs disponibles pour
                questions stratégiques
              </li>
              <li>
                • Formation continue et participation à des événements (Tech,
                Growth, Marketing)
              </li>
            </ul>
          </div>

          {/* Comment postuler */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Comment postuler
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Envoyez votre CV et une lettre de motivation courte à{" "}
              <a
                href="mailto:contact@iteradvisors.com"
                className="text-iter-violet hover:underline font-semibold"
              >
                contact@iteradvisors.com
              </a>
              . Entretien initial : 30 min avec Sébastien. Délai moyen : 3-4
              semaines.
            </p>
          </div>

          {/* CTA Final */}
          <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Envie de rejoindre une équipe en croissance ?
            </p>
            <a
              href="mailto:contact@iteradvisors.com"
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
