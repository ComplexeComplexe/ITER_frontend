import { Metadata } from "next";
import Link from "next/link";
import { Mail, Linkedin } from "lucide-react";
import { getCmsNavigation } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Analyste financier junior France — Iter Advisors recrute",
    description:
      "Iter Advisors recrute un(e) analyste financier junior à Paris. CDI ou alternance. Cabinet de DAF externalisé. Formation et progression assurées.",
    alternates: {
      canonical: "https://www.iteradvisors.com/jobs/finance-analyst-junior-fr",
    },
    openGraph: {
      title: "Analyste financier junior France — Iter Advisors recrute",
      description:
        "Iter Advisors recrute un(e) analyste financier junior à Paris. CDI ou alternance. Cabinet de DAF externalisé. Formation et progression assurées.",
      url: "https://www.iteradvisors.com/jobs/finance-analyst-junior-fr",
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
              { label: "Analyste financier junior" },
            ]}
          />
          <div className="mt-8 sm:mt-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading text-foreground mb-6 sm:mb-8 leading-tight">
              Analyste financier junior — France | Iter Advisors
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
              Vous sortez d'une école de commerce ou d'ingénieur et cherchez une
              première expérience vraie en finance ? Iter Advisors recrute un(e)
              <strong> analyste financier junior</strong> basé(e) à Paris (Île-de-France) pour
              accompagner nos équipes dans la gestion comptable et le reporting
              des startups tech.
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
                Contacter l'équipe
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
              Tu assisteras nos équipes sur les missions chez nos clients :
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • Saisir les opérations comptables (factures, notes de frais,
                déclarations de TVA)
              </li>
              <li>
                • Préparer les justificatifs et vérifier les contrôles internes
              </li>
              <li>• Construire les tableaux de bord de reporting mensuel</li>
              <li>
                • Assister sur les clôtures comptables et les déclarations
                fiscales
              </li>
              <li>
                • Apprendre les outils : Sage, Pennylane, Notion, Excel
              </li>
              <li>
                • Être formé(e) par un manager senior et grandir rapidement
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
                    • Diplôme bac +3/+5 (école de commerce, ingénieur, Master
                    Finance)
                  </li>
                  <li>
                    • Stage en finance/comptabilité (ou alternance, ou sortie
                    d'école)
                  </li>
                  <li>
                    • Notions de comptabilité générale et de fiscalité
                  </li>
                  <li>
                    • Excel intermédiaire (formules, données)
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold font-heading text-foreground mb-2">
                  Soft skills
                </h3>
                <ul className="space-y-1 text-sm sm:text-base text-muted-foreground">
                  <li>
                    • Rigueur : tu aimes les chiffres qui « collent » et tu
                    cherches l'erreur
                  </li>
                  <li>
                    • Curiosité : tu poses des questions et tu veux comprendre
                  </li>
                  <li>
                    • Proactivité : tu ne dis pas « c'est pas mon boulot »
                  </li>
                  <li>
                    • Bonnes capacités de communication en français (et anglais
                    un plus)
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
                • <strong>CDI (temps plein) ou alternance (2j/semaine) compatible école</strong>
              </li>
              <li>
                • Rémunération : CDI 28-35 k€/an, alternance 1 200 €/mois
              </li>
              <li>
                • Bureau à Paris (Île-de-France) — mode hybride
              </li>
              <li>
                • Mentorat d'un manager qui prend le temps de former
              </li>
              <li>
                • Environnement de startup : pas d'usine, des vraies
                responsabilités
              </li>
              <li>
                • Progression rapide : CDI après 6 mois d'alternance si succès
              </li>
              <li>
                • Rembursement de 50 % de la formation continue (certifications
                Excel, DAF, etc.)
              </li>
            </ul>
          </div>

          {/* Pourquoi rejoindre */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Pourquoi Iter Advisors c'est différent
            </h2>
            <ul className="space-y-2 text-sm sm:text-base text-muted-foreground">
              <li>
                • On te forme vraiment (pas juste du copier-coller de factures)
              </li>
              <li>
                • Tu vois du vrai boulot : tu travailles pour des startups en
                croissance, pas sur des dossiers « simulés »
              </li>
              <li>
                • Carrière claire : junior → analyste senior → manager → CFO
              </li>
              <li>
                • Rythme humain : on te fait grandir sans te casser
              </li>
              <li>
                • Réseau : tu rencontres des fondateurs, des CFOs, des
                investisseurs (rare pour un junior !)
              </li>
            </ul>
          </div>

          {/* Comment postuler */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mb-6 sm:mb-8">
              Comment postuler
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
              Envoie-nous :
            </p>
            <ul className="space-y-1 text-sm sm:text-base text-muted-foreground mb-4">
              <li>
                • Ton CV (avec tes expériences stages + compétences techniques)
              </li>
              <li>
                • Une présentation courte : pourquoi tu veux rejoindre Iter
              </li>
            </ul>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              À : <a
                href="mailto:contact@iteradvisors.com"
                className="text-iter-violet hover:underline font-semibold"
              >
                contact@iteradvisors.com
              </a>
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-4">
              <strong>Process :</strong> 30 min de discussion (valider les bases) + 1h de cas pratique (Excel + comptabilité) +
              rencontre avec l'équipe. Réponse en moins de 1 semaine.
            </p>
          </div>

          {/* CTA Final */}
          <div className="bg-iter-chartreuse/10 border-l-4 border-iter-chartreuse rounded-r-lg p-6 sm:p-8">
            <p className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Prêt(e) à lancer ta carrière en finance ?
            </p>
            <a
              href="mailto:contact@iteradvisors.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-iter-chartreuse text-iter-dark font-semibold hover:shadow-lg transition-all duration-300"
            >
              <Mail size={18} />
              Envoie ton CV
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale="fr" />
    </PageLayout>
  );
}
