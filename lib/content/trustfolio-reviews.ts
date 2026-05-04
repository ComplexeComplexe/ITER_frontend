/**
 * Trustfolio reviews data for rich snippets
 * Source: https://trustfolio.co/profil/iter-advisors-q3yNQhXTUNc/reviews
 * Last updated: 2026-05-04
 * Review count: 35
 */

export interface TrustfolioReview {
  name: string;
  jobTitle: string;
  company: string;
  datePublished: string; // ISO 8601 format
  reviewBody: string;
}

export const TRUSTFOLIO_REVIEW_COUNT = 35;
export const TRUSTFOLIO_RATING = 5;

export const TRUSTFOLIO_REVIEWS: TrustfolioReview[] = [
  {
    name: "Charles Deknudt",
    jobTitle: "PDG et fondateur",
    company: "Eltex",
    datePublished: "2026-04-16",
    reviewBody: "Après avoir levé notre premier tour de table, nous avions besoin de structurer nos opérations financières. Iter a professionnalisé notre fonction financière et s'est avéré être un partenaire financier solide intégré à l'équipe.",
  },
  {
    name: "Arnaud MEGE",
    jobTitle: "Co-founder",
    company: "Unplexed",
    datePublished: "2026-04-15",
    reviewBody: "Les équipes d'Iter ont structuré notre fonction finance avec sérieux, disponibilité et efficacité, dépassant même nos attentes initiales.",
  },
  {
    name: "Mathurin Blouin",
    jobTitle: "CEO",
    company: "MFL",
    datePublished: "2026-03-12",
    reviewBody: "Iter nous a accompagnés sur la mise en place du reporting et de la gestion de trésorerie, offrant une meilleure visibilité et sérénité financière.",
  },
  {
    name: "Quang Lê",
    jobTitle: "Senior Associate - Venture Capital / Growth Equity",
    company: "Seventure Partners",
    datePublished: "2025-11-27",
    reviewBody: "Iter a fourni des livrables de qualité en temps et en heure, malgré les échéances très courtes du processus d'investissement.",
  },
  {
    name: "Magali Quentel-Reme",
    jobTitle: "CEO & Co-Founder",
    company: "Opti Digital",
    datePublished: "2025-11-12",
    reviewBody: "Après 5 ans de collaboration, Iter demeure un véritable atout stratégique offrant expertise multidisciplinaire et vision à long terme.",
  },
];
