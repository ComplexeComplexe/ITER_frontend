import { publishedMetadataAlternates } from "@/lib/metadata";
import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';

export const metadata: Metadata = {
  title: "Loi Beckham : méthode de simulation de l’impôt",
  description:
    "Comparez Beckham et IRPF ordinaire : données à réunir, assiette, région, situation familiale et exemple fictif du calcul au taux légal.",
  alternates: {...publishedMetadataAlternates("/ressources/blog/loi-beckham-economie-impot-simulation"),
    canonical:
      "https://www.iteradvisors.com/ressources/blog/loi-beckham-economie-impot-simulation",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Loi Beckham : méthode de simulation de l’impôt",
    description:
      "Comparez Beckham et IRPF ordinaire : données à réunir, assiette, région, situation familiale et exemple fictif du calcul au taux légal.",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80",
        alt: "Loi Beckham : simulation de l'économie d'impôt par niveau de salaire",
      },
    ],
  },
};

export default function Page() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="loi-beckham-economie-impot-simulation"
      category="Fiscalité Espagne"
      title="Loi Beckham : comment préparer une simulation fiable"
      dek="Une méthode de comparaison avec des hypothèses explicites. Aucun seuil de salaire ne garantit à lui seul une économie."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Cofondateur et CFO, Iter Advisors",
        url: "/a-propos/benjamin-ziza",
      }}
      readingTime={5}
      dateModified="2026-10-09"
      heroImage="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80"
      toc={[
        { id: "principe-calcul", label: "Comment fonctionne le calcul" },
        { id: "tableau-simulation", label: "Les données de la simulation" },
        { id: "plafond-600k", label: "Le plafond à 600 000 €" },
        { id: "duree-6-ans", label: "La durée : 6 ans max" },
        { id: "comparaison-france", label: "Comparaison avec la France" },
      ]}
      tldr="Le régime spécial applique 24 % jusqu’à 600 000 € de base relevant de ce barème, puis 47 % au-delà. Pour savoir s’il est avantageux, comparez les deux régimes selon votre année fiscale, votre communauté autonome, vos revenus et votre situation personnelle."
      relatedArticles={[
        {
          url: "/ressources/fiscalite/beckham-law",
          category: "Fiscalité",
          title: "Guide complet de la loi Beckham en Espagne",
        },
        {
          url: "/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
          category: "Fiscalité",
          title: "Loi Beckham : les conditions d'éligibilité en 2026",
        },
        {
          url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          category: "Fiscalité",
          title: "Régimes fiscaux France vs Espagne",
        },
      ]}
    >
      <h2 id="principe-calcul">{"Deux calculs avec des hypothèses identiques"}</h2>
      <p>{"Il n’existe pas de seuil universel à partir duquel la loi Beckham devient avantageuse. L’éligibilité et le résultat fiscal sont deux questions distinctes. Confirmez d’abord l’accès au régime, puis comparez l’impôt total dans chaque option."}</p>
      <p>{"Un taux marginal s’applique à une tranche de revenus ; le taux effectif rapporte l’impôt total à une assiette définie. Comparer directement 24 % à un taux marginal maximal ne mesure pas une économie."}</p>
      <h2 id="tableau-simulation">{"Les données à réunir avant la simulation"}</h2>
      <p>{"Documentez l’année fiscale, la communauté autonome, les dates de résidence, la composition du foyer, le salaire fixe et variable, les avantages, les autres revenus et les actifs concernés. Séparez salaire brut, assiette imposable, cotisations et impôt."}</p>
      <p>{"Pour l’IRPF ordinaire, utilisez les barèmes étatique et autonomique de l’année retenue ainsi que les réductions réellement applicables. Pour Beckham, confirmez la qualification et la source des revenus. Présentez les résultats sur un périmètre identique."}</p>
      <h2 id="plafond-600k">{"Un exemple fictif du calcul au taux légal"}</h2>
      <p>{"L’article 93 de la loi IRPF prévoit un taux de 24 % jusqu’à 600 000 € pour la base relevant de ce barème, puis 47 % sur l’excédent. Les revenus du capital soumis à un barème distinct doivent être calculés séparément."}</p>
      <p>{"Exemple purement arithmétique : pour une assiette imposable fictive de 700 000 € entièrement soumise à ce barème, 600 000 × 24 % + 100 000 × 47 % = 191 000 €. Ce montant ne mesure ni un revenu net ni une économie face à l’IRPF ordinaire ; aucune cotisation ni autre imposition n’y est incluse."}</p>
      <h2 id="duree-6-ans">{"Évaluer chaque année de la période"}</h2>
      <p>{"Le régime peut s’appliquer pendant l’année fiscale d’acquisition de la résidence espagnole et les cinq années suivantes, sous réserve des conditions applicables. Ne multipliez pas automatiquement une économie annuelle par six : revenus, foyer, résidence et règles fiscales peuvent évoluer."}</p>
      <h2 id="comparaison-france">{"Comparer avec la France et faire valider le résultat"}</h2>
      <p>{"Une comparaison France–Espagne doit aussi traiter la résidence fiscale, la source des revenus et les règles de double imposition. Elle ne se réduit pas à appliquer deux taux au même salaire brut. Faites vérifier la simulation et ses sources par un professionnel compétent avant de décider."}</p>
      <h2>{"Sources du calcul"}</h2>
      <ul>
        <li><a href="https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a93">BOE : Ley 35/2006, artículo 93</a></li>
        <li><a href="https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/manual-tributacion-no-residentes/regimenes-opcionales/regimen-especial-impatriados.html">AEAT : régime spécial des impatriés</a></li>
      </ul>
      <p><Link href="/ressources/fiscalite/beckham-law">{"Consulter les conditions et la procédure du régime Beckham"}</Link></p>
      <p><Link href="/contact">{"Présenter ma situation à Iter Advisors"}</Link></p>
    </BlogPostPageRefonte>
  );
}
