import { getDafOffer } from "./daf-offer";
const offer = getDafOffer("fr");

/** Diagnostic questions, not universal headcount, timing or performance thresholds. */
export const FINANCE_NEED_GUIDE_HTML = `<p>Des chiffres difficiles à rapprocher, des décisions sans scénario de trésorerie ou des responsabilités dispersées peuvent justifier un renfort finance. Ce guide aide à examiner cinq signaux avant de choisir une mission ciblée, un recrutement ou un <a href="/daf-externalise">DAF externalisé</a>. Aucun signal ne rend cette dernière option automatiquement nécessaire.</p>
<h2 id="signe-1-burn-rate">1. Vous ne pouvez pas expliquer la consommation de trésorerie</h2>
<p>Le dirigeant voit son solde bancaire, mais ne sait pas quels paiements, retards clients ou investissements expliquent son évolution. Pour une startup, le burn et le runway doivent être construits sur des définitions partagées, avec les hypothèses de financement identifiées.</p>
<p>Examinez trois questions : le point de départ est-il rapproché des banques ? Les échéances sont-elles connues ? Qui actualise les hypothèses quand un paiement est décalé ? Le temps nécessaire pour retrouver une information ne constitue pas, à lui seul, un seuil de recrutement.</p>
<p>Commencez par comprendre les <a href="/ressources/blog/flux-de-tresorerie">flux de trésorerie</a>, puis examinez le périmètre d’un <a href="/services/previsionnel-tresorerie">prévisionnel de trésorerie</a> si le besoin porte sur les dates et scénarios.</p>
<h2 id="signe-2-compta-retard">2. Les chiffres arrivent après les décisions</h2>
<p>Les comptes utiles à une revue de gestion sont encore provisoires ou incomplets. Identifiez les pièces manquantes, les rapprochements non terminés et le rôle de chaque intervenant. Une difficulté de collecte ou de coordination n’implique pas forcément de changer de cabinet comptable.</p>
<table><caption>Questions à examiner avant de renforcer l’équipe</caption><thead><tr><th scope="col">Question</th><th scope="col">Vérification utile</th></tr></thead><tbody>
<tr><th scope="row">Qu’attend la direction ?</th><td>Décisions à préparer, chiffres nécessaires et calendrier convenu</td></tr>
<tr><th scope="row">Où se situe le retard ?</th><td>Pièces, facturation, banque, stocks ou validation des écritures</td></tr>
<tr><th scope="row">Qui prend la suite ?</th><td>Responsable de correction, interlocuteur du cabinet et date de revue</td></tr>
</tbody></table>
<p>Il n’existe pas ici de délai de clôture présenté comme standard sectoriel. L’objectif est un calendrier réalisable avec votre équipe, en distinguant les chiffres provisoires des données validées.</p>
<h2 id="signe-3-levee-engagee">3. Un financement demande des hypothèses défendables</h2>
<p>Une levée ou un rendez-vous bancaire demande de relier l’activité, les effectifs, les investissements et les besoins de cash. Le modèle doit expliquer ses hypothèses et les écarts au réalisé. Le dirigeant et les conseils restent parties prenantes de la préparation.</p>
<ul><li>Quelles données étayent les prévisions de revenus ?</li><li>Quels engagements restent financés si une recette ou une levée est retardée ?</li><li>Quels documents manquent dans la data room et qui les prépare ?</li></ul>
<p>Une mission d’<a href="/services/accompagnement-levee-de-fond">accompagnement en levée de fonds</a> peut traiter la préparation financière. Son calendrier dépend des données et des intervenants ; aucun pourcentage de réduction du délai ni succès de financement n’est promis.</p>
<h2 id="signe-4-controle-gestion">4. Le budget ne permet pas d’expliquer les écarts</h2>
<p>Vos ventes progressent, mais les responsables ne peuvent pas expliquer les variations de marge, les coûts engagés ou les besoins de stock. Le sujet porte sur les sources et les décisions, pas sur un seuil universel de dix salariés.</p>
<p>Choisissez quelques indicateurs liés à votre activité, précisez leur définition, puis rapprochez le réalisé du budget. Une revue utile identifie un écart, son explication et l’action à suivre. Le <a href="/services/controle-de-gestion-externalise">contrôle de gestion externalisé</a> présente ces livrables sans imposer un nombre de KPIs identique à toutes les entreprises.</p>
<h2 id="signe-5-fondateurs-finance">5. Les tâches finance dépendent trop du fondateur</h2>
<p>Le fondateur collecte les pièces, rapproche les fichiers et relance chaque intervenant. Distinguez les tâches administratives, les contrôles et les décisions : déléguer la collecte ne demande pas les mêmes compétences qu’arbitrer un investissement.</p>
<p>Recensez les tâches sur une période représentative, leurs responsables et les points de blocage. Il n’existe pas ici de nombre d’heures qui déclenche automatiquement un besoin de CFO. La continuité en cas d’absence et la documentation des accès comptent aussi.</p>
<h2 id="section-6-daf-externalise-vs-salarie">6. Choisir le renfort adapté</h2>
<table><caption>Comparer les organisations à partir du travail attendu</caption><thead><tr><th scope="col">Besoin</th><th scope="col">Option à examiner</th><th scope="col">Condition à vérifier</th></tr></thead><tbody>
<tr><th scope="row">Un livrable ou un chantier précis</th><td>Mission ciblée</td><td>Données, livrables, responsabilités et fin de mission</td></tr>
<tr><th scope="row">Un pilotage régulier sans présence quotidienne</th><td>DAF à temps partagé</td><td>Disponibilité convenue et coordination avec l’équipe</td></tr>
<tr><th scope="row">Un management quotidien durable</th><td>DAF salarié</td><td>Charge, séniorité, recrutement et continuité</td></tr>
<tr><th scope="row">Un relais temporaire</th><td>DAF de transition</td><td>Mandat, délégations écrites et passation</td></tr>
</tbody></table>
<p>Le <a href="/ressources/blog/daf-externalise-vs-daf-salarie">comparatif DAF salarié ou externalisé</a> aide à comparer le budget et la disponibilité. Le <a href="/daf-externalise/temps-partage">DAF à temps partagé</a> répond au suivi récurrent ; la <a href="/daf-externalise/transition">transition</a> répond à un mandat temporaire. Pour une startup ou un SaaS, l’offre <a href="/fractional-cfo-startups">Fractional CFO</a> précise le reporting investisseurs et les scénarios de croissance.</p>
<h2 id="faq">Questions avant de contacter un cabinet</h2>
<p><strong>Quel budget prévoir ?</strong> ${offer.price} pour les formules récurrentes Iter, selon le périmètre et le profil. Consultez les <a href="/daf-externalise/tarifs">tarifs DAF externalisé</a> ; un projet ponctuel est défini séparément.</p>
<p><strong>Quels délais prévoir ?</strong> Le démarrage et les premiers livrables dépendent de la disponibilité du profil, des accès et des données. Aucun relais sous 48 heures ni déploiement en deux semaines n’est garanti.</p>
<p><strong>Peut-on conserver notre expert-comptable ?</strong> Oui, si la répartition des travaux et des interlocuteurs est claire. Le CFO ne remplace pas automatiquement la production comptable.</p>
<p><strong>Quel engagement récurrent ?</strong> ${offer.commitment} Les responsabilités et les éventuels projets complémentaires sont formalisés au contrat.</p>
<p>Pour préparer le premier échange, listez les décisions à venir, les outils, les intervenants et les échéances. <a href="/contact#daf">Présenter mon besoin finance</a>.</p>`;
