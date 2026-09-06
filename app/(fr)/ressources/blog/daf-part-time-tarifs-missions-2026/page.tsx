import type { Metadata } from "next";
import Link from "next/link";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import ProseTable from "@/components/blog/ProseTable";
import { getDafOffer } from "@/lib/content/daf-offer";
const offer = getDafOffer("fr");
export const metadata: Metadata = {
  "title": "DAF à temps partagé : rythme et livrables | Iter Advisors",
  "description": "Réunions, calendrier de clôture, trésorerie et responsabilités : organiser une mission de DAF à temps partagé et définir son périmètre.",
  "alternates": {
    "canonical": "https://www.iteradvisors.com/ressources/blog/daf-part-time-tarifs-missions-2026"
  },
  "openGraph": {
    "title": "Travailler avec un DAF à temps partagé : rythme et livrables",
    "description": "Réunions, calendrier de clôture, trésorerie et responsabilités : organiser une mission de DAF à temps partagé et définir son périmètre.",
    "type": "article"
  }
};
export default function Page() { return (
<BlogPostPageRefonte locale="fr"
 breadcrumbs={{resourcesLabel:"Ressources",resourcesHref:"/ressources",blogLabel:"Blog",blogHref:"/ressources/blog"}}
 author={{name:"Benjamin Ziza",avatar:"/images/team/benjamin-ziza.webp",jobTitle:"Associé fondateur — CFO & Investisseur, Iter Advisors",url:"/a-propos/benjamin-ziza"}}
 slug={"daf-part-time-tarifs-missions-2026"}
 category={"Direction financière"}
 title={"Travailler avec un DAF à temps partagé : rythme et livrables"}
 dek={"Réunions, calendrier de clôture, trésorerie et responsabilités : organiser une mission de DAF à temps partagé et définir son périmètre."}
 readingTime={5}
 dateModified={"2026-09-05"}
 datePublished={"2026-07-24"}
 toc={[{"id": "definition", "label": "Définir les décisions que le DAF doit préparer"}, {"id": "rythme", "label": "Construire un rythme à partir des livrables"}, {"id": "premier-mois", "label": "Préparer le premier mois de collaboration"}, {"id": "responsabilites", "label": "Répartir les responsabilités"}, {"id": "budget", "label": "Relier le budget au périmètre convenu"}, {"id": "bilan", "label": "Évaluer la mission sur des résultats observables"}]}
 faqItems={[]}
 relatedArticles={[{"url": "/daf-externalise/tarifs", "category": "Offre Iter", "title": "Formules et tarifs de DAF externalisé"}, {"url": "/daf-externalise/temps-partage", "category": "Accompagnement", "title": "Confier votre direction financière à temps partagé"}]}
>
<h2 id="definition">Définir les décisions que le DAF doit préparer</h2>
<p>Un DAF à temps partagé intervient dans plusieurs entreprises. La réussite de la mission dépend de son intégration à votre organisation : accès aux données, interlocuteurs disponibles et décisions à préparer. Avant de choisir un rythme, listez les questions auxquelles votre direction doit pouvoir répondre : trésorerie disponible, marge par activité, capacité de recrutement ou financement d’un investissement.</p><p>Le DAF prépare les analyses et les recommandations. Le dirigeant conserve les décisions et pouvoirs qui ne font pas l’objet d’une délégation explicite. Les responsabilités de l’expert-comptable restent définies dans sa lettre de mission. Notre <Link href="/daf-externalise/temps-partage">offre de DAF à temps partagé</Link> précise l’accompagnement proposé.</p>
<h2 id="rythme">Construire un rythme à partir des livrables</h2>
<p>Le calendrier ci-dessous est un exemple d’organisation à adapter au volume des opérations et à la disponibilité des données ; il ne constitue pas un forfait de jours ou une promesse de délai.</p><ProseTable><thead><tr><th>Moment</th><th>Travail</th><th>Décision préparée</th></tr></thead><tbody><tr><td>Chaque semaine si nécessaire</td><td>Actualiser les encaissements, décaissements et impayés</td><td>Prioriser les paiements et relances</td></tr><tr><td>Après la clôture mensuelle</td><td>Rapprocher les données et expliquer les écarts au budget</td><td>Revoir les dépenses et les objectifs</td></tr><tr><td>Lors de la revue de direction</td><td>Présenter P&amp;L, trésorerie, hypothèses et risques</td><td>Arbitrer recrutements et investissements</td></tr><tr><td>Avant une échéance exceptionnelle</td><td>Préparer scénarios, dossier bancaire ou reporting investisseurs</td><td>Choisir un financement et ses conditions</td></tr></tbody></ProseTable><p>Une réunion utile se termine avec un responsable, une échéance et une trace de la décision. Les hypothèses modifiées doivent être conservées pour comprendre les écarts le mois suivant.</p>
<h2 id="premier-mois">Préparer le premier mois de collaboration</h2>
<p>Commencez par réunir les balances et grands livres disponibles, les relevés bancaires, la liste des factures ouvertes, les contrats de financement et le budget. Identifiez qui met à jour chaque source et qui valide les données. Le calendrier de clôture doit être convenu avec l’équipe comptable.</p><p>Le premier périmètre peut associer un prévisionnel de trésorerie à 13 semaines, une lecture du résultat et un registre des points à résoudre. Si les données sont incomplètes, le DAF documente les limites et priorise leur fiabilisation avant d’automatiser. Les délais dépendent de cet état initial.</p>
<h2 id="responsabilites">Répartir les responsabilités</h2>
<ul><li><strong>Dirigeant :</strong> fixe les priorités, arbitre et approuve les engagements.</li><li><strong>DAF :</strong> structure le modèle financier, explique les écarts et prépare les options.</li><li><strong>Équipe comptable et expert-comptable :</strong> produisent et sécurisent l’information dans leur périmètre respectif.</li><li><strong>Équipes commerciales et opérationnelles :</strong> confirment les commandes, stocks, délais et hypothèses métier.</li></ul><p>Définissez aussi le canal de contact en cas d’urgence, les accès bancaires, les droits dans les outils et les règles de validation. Une délégation de signature éventuelle se formalise séparément ; elle n’est pas automatique.</p>
<h2 id="budget">Relier le budget au périmètre convenu</h2>
<p>Les formules récurrentes Iter Advisors vont de 3 000 à 8 000 € HT par mois. Elles couvrent un périmètre et des livrables, pas une facturation proportionnelle à chaque heure travaillée. Les volumes de jours affichés sur la <Link href="/daf-externalise/tarifs">grille tarifaire officielle</Link> sont des repères moyens de disponibilité.</p><p>Une levée de fonds ou une acquisition peut nécessiter un périmètre distinct. Toute évolution est cadrée avant facturation. {offer.commitment}</p><p>Pour comparer plusieurs propositions, utilisez notre <Link href="/ressources/blog/cout-daf-externalise-tarifs-prix-2026">méthode de comparaison du coût d’un DAF</Link> : livrables, disponibilité, frais et modalités de sortie doivent être comparables.</p>
<h2 id="bilan">Évaluer la mission sur des résultats observables</h2>
<p>La revue de mission porte sur des éléments vérifiables : les écarts sont-ils expliqués, les prévisions mises à jour, les décisions documentées et les échéances tenues ? Le nombre de réunions ne suffit pas à mesurer la valeur du travail.</p><p>Le <Link href="/ressources/cas-clients/opti-digital-structuration-financement">cas Opti Digital</Link> décrit notamment la structuration des clôtures, du reporting et des processus financiers dans la durée. Il illustre des livrables possibles, avec les limites propres à cette mission.</p>
</BlogPostPageRefonte>); }
