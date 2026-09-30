import type { StrapiBlock, StrapiServiceSinglePage } from "@/lib/static-content";
import { getDafOfferFacts } from "./offer-facts";

const p = (text: string): StrapiBlock => ({ type: "paragraph", children: [{ type: "text", text }] });
const h = (text: string): StrapiBlock => ({ type: "heading", level: 2, children: [{ type: "text", text }] });
const link = (before: string, label: string, url: string, after = ""): StrapiBlock => ({
  type: "paragraph", children: [{ type: "text", text: before }, { type: "link", url, children: [{ type: "text", text: label }] }, { type: "text", text: after }],
});

export const cashForecastService: StrapiServiceSinglePage = {
  heroTitle: "Prévisionnel de trésorerie à 13 semaines pour PME",
  heroSubtitle: "Anticipez les encaissements, les décaissements et les décisions de financement avec un prévisionnel glissant expliqué et suivi.",
  content: [
    p("Votre chiffre d’affaires progresse, mais vous ne savez pas si la trésorerie couvrira les prochaines échéances ? Le prévisionnel rapproche les disponibilités bancaires, les paiements attendus et les dépenses prévues. Il permet de repérer une tension avant l’échéance et d’examiner les décisions possibles avec le dirigeant."),
    h("Quand mettre en place un prévisionnel de trésorerie ?"),
    p("Le besoin apparaît notamment lorsque les délais clients deviennent incertains, que les stocks mobilisent du cash, qu’un recrutement augmente les charges ou qu’un investissement précède les recettes attendues. Le bénéfice comptable ne suffit pas à répondre à ces questions : une facture peut être comptabilisée avant son encaissement."),
    link("Le ", "besoin en fonds de roulement", "/ressources/glossaire/besoin-fonds-roulement-bfr", " aide à comprendre ce décalage. Le prévisionnel le traduit en dates et montants pour décider quelles échéances surveiller."),
    h("Les données à préparer pour le premier échange"),
    p("Rassemblez les soldes bancaires rapprochés, les factures clients et fournisseurs ouvertes, les échéanciers d’emprunts, les salaires, charges et impôts à payer. Ajoutez les dépenses engagées non encore facturées et les recettes attendues. Pour chaque hypothèse importante, identifiez une date, un montant, un responsable et son degré de certitude."),
    p("Une commande signée et une opportunité commerciale ne doivent pas avoir le même statut. Les financements non confirmés restent dans un scénario distinct. Les montants utilisés sont ceux des flux bancaires attendus, y compris la TVA lorsqu’elle est effectivement encaissée ou payée, pour éviter de mélanger résultat hors taxes et mouvements de banque."),
    link("Pour les principes de classement des encaissements et décaissements, consultez ", "le guide du plan de trésorerie de Bpifrance Création", "https://bpifrance-creation.fr/encyclopedie/previsions-financieres-business-plan/previsions-financieres/plan-tresorerie-projet", ". Notre exemple hebdomadaire adapte cette lecture au suivi à court terme."),
    h("Ce que peut contenir la mission"),
    p("Le périmètre est défini avec votre équipe : tableau hebdomadaire glissant, détail des hypothèses, calendrier des échéances et suivi du réalisé. La revue porte sur les écarts, les paiements à confirmer et les décisions à prendre. Le devis précise qui collecte les données, qui actualise le modèle et qui valide les arbitrages."),
    p("Le livrable utile ne se limite pas à un solde de fin de période. Il indique la première semaine sous le seuil de sécurité défini par l’entreprise, les principales incertitudes et les actions à examiner. Un scénario de retard client peut être comparé au scénario de référence, sans présenter l’encaissement comme garanti."),
    h("Comment fonctionne le suivi sur 13 semaines ?"),
    p("Au démarrage, les soldes d’ouverture sont rapprochés de la banque. Les encaissements et décaissements sont placés dans la semaine attendue. À chaque revue, le réalisé remplace les hypothèses échues, les écarts sont expliqués et une nouvelle semaine est ajoutée. Le suivi conserve ainsi un horizon de treize semaines."),
    p("La fréquence dépend de l’activité et des tensions à surveiller. Une revue hebdomadaire permet de suivre le court terme ; un besoin urgent peut nécessiter un suivi plus rapproché. Pour un investissement ou une levée, une projection plus longue complète ce modèle : treize semaines ne remplacent pas un budget annuel ni un plan de financement."),
    h("Du constat aux décisions : BFR, dépenses et financement"),
    link("Le prévisionnel peut conduire à ", "réduire le besoin en fonds de roulement", "/ressources/blog/reduire-bfr-7-leviers-actionnables", " : confirmer les dates clients, revoir les stocks et étudier les échéances fournisseurs dans le respect des accords. Les arbitrages restent sous la responsabilité du dirigeant."),
    link("Pour examiner simultanément rentabilité et trésorerie, le ", "contrôle de gestion externalisé", "/services/controle-de-gestion-externalise", " explique les marges et les écarts au budget. Les deux lectures se complètent : une activité rentable peut mobiliser davantage de cash pendant sa croissance."),
    h("Excel, logiciel de trésorerie ou reporting connecté ?"),
    p("Le choix dépend des comptes bancaires, du volume de factures, des outils existants et des personnes qui maintiennent les hypothèses. Un tableau partagé peut suffire à démarrer ; un connecteur réduit certaines ressaisies, mais ne confirme pas à lui seul la date de paiement d’un client. Les rapprochements et contrôles restent nécessaires."),
    link("Consultez notre ", "sélection de logiciels de trésorerie", "/ressources/outils/logiciels-tresorerie", " pour comparer les besoins couverts."),
    link("Avant de connecter les outils, découvrez comment ", "fiabiliser les données et automatiser le reporting", "/ressources/ia-finance/automatiser-reporting-financier", ". Le guide inclut un exercice fictif et les contrôles à conserver."),
    h("Un exemple de mission documentée"),
    link("Chez Seasonly, les travaux décrits associent lecture de marge par canal, suivi des stocks et financement du BFR. Consultez ", "le cas Seasonly et ses limites", "/ressources/cas-clients/seasonly-marge-par-canal-bfr", " pour comprendre les livrables. Ce cas ne constitue pas une promesse de gain de trésorerie pour une autre entreprise."),
    h("Périmètre, budget et démarrage"),
    p("La construction initiale et le suivi récurrent sont cadrés selon la qualité des données, le nombre d’entités et les échéances. Le premier échange sert à préciser ces éléments ; aucun délai de livraison ni montant de mission ponctuelle n’est garanti avant ce cadrage."),
    p(getDafOfferFacts("fr").price),
    link("Ces formules concernent l’accompagnement récurrent de direction financière. Consultez ", "les tarifs et périmètres du DAF externalisé", "/daf-externalise/tarifs", " ; un projet de prévisionnel seul fait l’objet d’un périmètre et d’un devis spécifiques."),
  ],
  faq: [
    ["Quelle différence entre budget et prévisionnel de trésorerie ?", "Le budget organise les revenus et charges attendus. Le prévisionnel de trésorerie suit les dates d’encaissement et de décaissement. Il intègre les décalages de paiement et les flux qui ne correspondent pas directement à une charge, comme le remboursement du capital d’un emprunt."],
    ["Pourquoi utiliser un horizon de 13 semaines ?", "Cet horizon couvre environ un trimestre et permet un suivi hebdomadaire des échéances proches. Il est actualisé au fil du réalisé. Il doit être complété par une projection plus longue lorsque les décisions d’investissement ou de financement le nécessitent."],
    ["Faut-il changer de logiciel ?", "Pas nécessairement. Le cadrage examine d’abord vos données, les responsabilités et les contrôles. Le choix d’un logiciel vient ensuite, selon le volume de flux, les intégrations disponibles et le travail de maintenance."],
    ["Quels documents transmettre pour cadrer la mission ?", "Préparez les soldes bancaires, factures ouvertes, échéanciers de dette, salaires, charges, impôts et dépenses engagées. Les hypothèses commerciales doivent être distinguées des encaissements confirmés. Les modalités sécurisées de partage sont définies au cadrage."],
    ["Le prévisionnel garantit-il l’absence de tension de trésorerie ?", "Non. Il rend visibles les hypothèses et les risques afin de préparer les décisions. Un retard client, une dépense imprévue ou un financement non obtenu peuvent modifier le résultat ; les mises à jour et scénarios servent à suivre ces incertitudes."],
  ].map(([question, answer], i) => ({ id: i + 1, question, answer: [p(answer)] })),
  seo: {},
};
