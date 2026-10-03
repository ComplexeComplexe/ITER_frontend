import { publishedMetadataAlternates } from "@/lib/metadata";
import type { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { FINANCE_STACK_GUIDE, FINANCE_STACK_GUIDE_HTML } from "@/lib/content/finance-stack-guide";
import { estimateReadMinutes } from "@/lib/blog-read-time";

const PAGE_URL = "https://www.iteradvisors.com/ressources/blog/essentiels-outils-tech-finance";
export const metadata: Metadata = {
  title: FINANCE_STACK_GUIDE.title,
  description: FINANCE_STACK_GUIDE.description,
  alternates: {...publishedMetadataAlternates("/ressources/blog/essentiels-outils-tech-finance"),  canonical: PAGE_URL },
  openGraph: {
    title: FINANCE_STACK_GUIDE.title,
    description: FINANCE_STACK_GUIDE.description,
    type: "article",
    url: PAGE_URL,
    images: [{ url: "/images/blog/essentiels-outils-tech-finance.webp", width: 1200, height: 630 }],
  },
};

export default function EssentielsOutilsTechFinancePage() {
  return <BlogPostPageRefonte
    locale="fr"
    breadcrumbs={{ resourcesLabel: "Ressources", resourcesHref: "/ressources", blogLabel: "Blog", blogHref: "/ressources/blog" }}
    slug="essentiels-outils-tech-finance"
    category="Outils & stack"
    title={FINANCE_STACK_GUIDE.h1}
    dek="Partir des décisions et des données, comparer les connexions et le coût complet, puis tester un flux avant de généraliser."
    author={{ name: FINANCE_STACK_GUIDE.author, avatar: "/images/team/benjamin-ziza.webp", jobTitle: "Associé fondateur, Iter Advisors" }}
    readingTime={estimateReadMinutes(FINANCE_STACK_GUIDE_HTML)}
    datePublished={FINANCE_STACK_GUIDE.publishedDate}
    dateModified="2026-10-02"
    heroImage="/images/blog/covers/essentiels-outils-tech-finance.svg"
    metaDescription={FINANCE_STACK_GUIDE.description}
    toc={[
      { id: "pourquoi-digitaliser", label: "Le travail à améliorer" },
      { id: "stack-essentiels", label: "Quatre couches complémentaires" },
      { id: "comptabilite-cloud", label: "Données et comptabilité" },
      { id: "tresorerie-et-previsions", label: "Trésorerie et hypothèses" },
      { id: "reporting-et-bi", label: "Indicateurs et reporting" },
      { id: "securite-et-gouvernance", label: "Exploitation et réversibilité" },
      { id: "methode-selection", label: "Devis et pilote" },
    ]}
    tldr="Choisir les outils finance demande un périmètre, des données vérifiées, des responsabilités et un coût complet. Un pilote mesure la production et les corrections ; une licence seule ne garantit pas le résultat."
    relatedArticles={[
      { url: "/ressources/blog/les-10-outils-pour-cfos-startup", category: "Panorama", title: "Outils pour CFO en startup" },
      { url: "/ressources/blog/stack-financier-saas-series-a", category: "SaaS", title: "Organiser la stack après une Series A" },
      { url: "/ressources/ia-finance/outils", category: "IA & reporting", title: "Choisir la couche IA et ses contrôles" },
    ]}
  >
    <div dangerouslySetInnerHTML={{ __html: FINANCE_STACK_GUIDE_HTML }} />
  </BlogPostPageRefonte>;
}
