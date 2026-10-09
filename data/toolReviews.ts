/** Editorial decision criteria, not undocumented hands-on tests or ratings. */
export interface ToolReview {
  verdict: string;
  fit: string;
  avoid: string;
  decision: string;
  alternatives: string[];
}
export const toolReviews: Record<string, ToolReview> = {
  pennylane: {
    verdict: "Notre avis sur Pennylane : un socle utile pour centraliser la comptabilité et préparer une précomptabilité propre. Iter l’utilise depuis quatre ans, pour environ 50 % de ses clients. Notre réserve principale concerne le reporting, encore limité au regard de certains besoins de pilotage.",
    fit: "Pennylane convient à une PME ou une startup française qui veut réunir factures, justificatifs et échanges comptables dans un environnement commun. L’intérêt est particulièrement concret lorsque l’entreprise et son expert-comptable travaillent sur le même dossier : la qualité des pièces et la répartition des tâches deviennent plus faciles à suivre.",
    avoid: "Si votre priorité est un reporting de gestion élaboré, un budget multi-scénarios ou une consolidation complexe, commencez par tester ces restitutions. Notre réserve sur le reporting est un retour d’usage du cabinet ; elle ne signifie pas que Pennylane ne propose aucun rapport. Une couche d’analyse complémentaire peut rester nécessaire.",
    decision: "Avant de migrer, demandez au cabinet comptable qui contrôle les écritures, qui traite les pièces manquantes et qui valide la clôture. Testez un mois complet : factures fournisseurs, encaissements, avoirs, banque et ventilation analytique. Comparez ensuite le reporting obtenu au tableau de bord dont le dirigeant a réellement besoin. Une interface agréable ne compense pas un historique mal repris.",
    alternatives: ['sage', 'cegid-loop', 'power-bi'],
  },
  agicap: {
    verdict: "Agicap mérite d’être étudié lorsque le problème principal est la visibilité sur les échéances de trésorerie, plutôt que la tenue comptable. Le choix dépend de la capacité à alimenter les prévisions avec des dates de paiement crédibles.",
    fit: "Une PME avec plusieurs comptes, des décalages clients-fournisseurs ou une activité saisonnière peut examiner Agicap pour rapprocher les soldes et construire des scénarios. La direction financière doit pouvoir expliquer chaque variation, puis corriger les hypothèses commerciales ou de dépenses.",
    avoid: "Si les factures ne comportent pas d’échéances exploitables ou si personne ne tient à jour les hypothèses, l’automatisation bancaire seule ne résout pas le besoin. Le cash affiché aujourd’hui et le cash disponible dans trois mois répondent à deux questions différentes.",
    decision: "Faites simuler le retard de votre plus gros client, une échéance de TVA et une dépense d’investissement. Demandez une restitution du solde minimum, avec le détail des flux responsables. Pour plusieurs sociétés, vérifiez la distinction entre disponibilités de chaque entité et vision groupe, ainsi que le traitement des transferts internes.",
    alternatives: ['okimia', 'kyriba', 'pennylane'],
  },
  spendesk: {
    verdict: "Spendesk est à examiner pour organiser les dépenses avant leur paiement : demandes, approbations, justificatifs et affectation budgétaire. Le bénéfice recherché doit porter sur le circuit de contrôle, pas seulement sur la distribution de cartes.",
    fit: "Une PME ou une scale-up dans laquelle plusieurs équipes engagent des achats peut étudier Spendesk pour clarifier les délégations. Les responsables de budget et la finance doivent partager la même lecture des dépenses engagées, payées et encore sans justificatif.",
    avoid: "Si les règles d’approbation changent à chaque achat, l’outil risque de formaliser un processus confus. Définissez d’abord les seuils, les exceptions et la personne qui arbitre. Vérifiez aussi le périmètre exact des factures fournisseurs dans l’offre retenue.",
    decision: "Le test utile traverse tout le circuit : un collaborateur demande un achat, son responsable l’approuve, la dépense est payée puis rapprochée dans la comptabilité. Ajoutez une absence de justificatif et un dépassement de budget. Le DAF doit voir qui intervient et ce qui reste bloqué à chaque étape.",
    alternatives: ['pleo', 'payhawk', 'qonto'],
  },
  payfit: {
    verdict: "PayFit est à considérer pour structurer la production de paie et la collecte des données RH. La décision doit commencer par la convention collective et les situations de paie effectivement couvertes, avant l’ergonomie de l’interface.",
    fit: "Une entreprise qui souhaite organiser les variables de paie, les absences et les documents salariés dans un circuit identifié peut examiner PayFit. Le responsable paie doit connaître la date limite de transmission et conserver un contrôle des bulletins avant validation.",
    avoid: "Une démonstration sur un salarié standard n’établit pas la couverture de primes, régularisations, sorties ou statuts particuliers. Si ces situations constituent l’essentiel de votre paie, faites confirmer leur traitement et l’accompagnement prévu dans le contrat.",
    decision: "Préparez un dossier de recette avec une entrée, un départ, une absence et une correction rétroactive. Comparez les bulletins à une référence validée par votre responsable paie. Demandez ensuite comment les écritures arrivent dans la comptabilité et comment une erreur peut être corrigée après clôture.",
    alternatives: ['silae', 'lucca', 'factorial'],
  },
  sage: {
    verdict: "Un avis sur Sage doit identifier le produit concerné. Sage est une gamme de solutions ; comparer la marque entière à Pennylane masque les différences de modules, d’hébergement et de processus comptables.",
    fit: "Une PME déjà équipée peut commencer par évaluer la version Sage en place, ses exports et les compétences de son cabinet ou intégrateur. Conserver une solution documentée peut être pertinent si elle couvre les flux métiers et si ses interfaces restent maintenables.",
    avoid: "Évitez une décision formulée simplement comme « remplacer Sage ». Un besoin de facturation, de gestion de stocks ou de consolidation ne se traite pas avec la même édition. Le coût de migration comprend aussi l’historique, les états personnalisés et les interfaces existantes.",
    decision: "Demandez le nom exact de l’édition et une liste des modules réellement utilisés. Reconstituez un flux de vente et un flux d’achat, jusqu’à la clôture. Une comparaison avec Pennylane devient utile uniquement après avoir isolé les fonctions conservées, celles abandonnées et celles à reconstruire.",
    alternatives: ['pennylane', 'cegid-loop'],
  },
  'cegid-loop': {
    verdict: "Cegid Loop s’examine d’abord avec le cabinet qui organise la production comptable. L’enjeu côté entreprise est de préciser les accès, les échanges de pièces et la restitution des informations utiles au pilotage.",
    fit: "Une entreprise accompagnée par un cabinet utilisant l’écosystème Cegid peut étudier le fonctionnement du dossier partagé. La décision dépend autant du circuit de travail convenu que des fonctionnalités présentées par l’éditeur.",
    avoid: "Ne présumez pas que les fonctions disponibles pour le cabinet seront toutes accessibles au dirigeant. Faites confirmer les droits, les exports et le produit proposé. Un changement d’outil ne doit pas laisser l’entreprise dépendante d’un accès qu’elle ne maîtrise pas.",
    decision: "Demandez au cabinet de montrer une pièce déposée par l’entreprise, sa prise en compte comptable et le retour d’une anomalie. Vérifiez ensuite comment récupérer les journaux, les soldes et les documents en fin de mission. Le calendrier de clôture et la fréquence de restitution doivent être écrits.",
    alternatives: ['pennylane', 'sage'],
  },
  okimia: {
    verdict: "Fygr est devenu Okimia. L’ancienne URL Fygr redirige vers cette fiche Okimia. Cette analyse documentaire examine les conditions et critères de choix actuels, sans prétendre constituer un test d’usage du produit.",
    fit: "Une entreprise qui cherche à organiser sa prévision de trésorerie peut examiner Okimia à partir de ses banques, de ses échéances et de ses catégories de flux. Une prévision exploitable doit relier les mouvements observés aux encaissements et décaissements attendus.",
    avoid: "Le changement de nom ne permet pas de reconduire automatiquement un ancien prix ou un ancien comparatif. Faites vérifier les entités, les connexions et les modules de la formule actuelle. Aucun avantage chiffré de coût par rapport à Agicap n’est établi ici.",
    decision: "Faites reconstruire une semaine de flux puis un scénario de retard client. Comparez les prévisions et les soldes bancaires réels, avec les mêmes dates de référence. La lisibilité des écarts et le temps nécessaire pour corriger une hypothèse comptent davantage qu’un nombre annoncé de fonctionnalités.",
    alternatives: ['agicap', 'kyriba'],
  },
  pleo: {
    verdict: "Pleo est à examiner pour les cartes d’entreprise, les notes de frais et la collecte des justificatifs. Le critère financier central est le passage d’une dépense collaborateur à une écriture contrôlée et correctement affectée.",
    fit: "Une startup ou une PME avec des achats fréquents réalisés par ses équipes peut étudier Pleo pour organiser plafonds, justificatifs et validations. Le circuit doit rester compréhensible pour le collaborateur comme pour la personne qui prépare les comptes.",
    avoid: "Ne choisissez pas Pleo uniquement sur une promesse d’ouverture rapide. Les pays, les entités éligibles et les restrictions de paiement doivent correspondre à votre situation. Une connexion comptable annoncée doit être testée sur vos champs analytiques et vos exceptions.",
    decision: "Testez une dépense en déplacement, un remboursement et une facture sans justificatif. Vérifiez la TVA, la devise et le centre de coût après export. Pour comparer avec Spendesk, utilisez le même scénario d’approbation et le même nombre de collaborateurs actifs, plutôt qu’un tarif d’appel.",
    alternatives: ['spendesk', 'payhawk', 'qonto'],
  },
  silae: {
    verdict: "Silae se juge avec le prestataire qui produit et contrôle la paie. La licence logicielle, le service de paie et les modules RH sont des périmètres distincts, à comparer séparément.",
    fit: "Une PME qui confie sa paie à un cabinet ou à un spécialiste peut examiner Silae avec ce prestataire. Le dossier de choix doit couvrir la convention collective, les établissements, les statuts et la disponibilité du support pour les situations inhabituelles.",
    avoid: "La couverture annoncée d’une convention ne prouve pas que vos accords d’entreprise et vos pratiques de rémunération sont paramétrés. Demandez une recette sur vos règles réelles. Le dirigeant doit également savoir qui assume la correction des erreurs et les délais de transmission.",
    decision: "Reprenez une période de paie représentative avec une régularisation et un départ. Rapprochez les bulletins, les déclarations et les écritures comptables. Faites préciser le traitement d’une urgence hors calendrier et les conditions de récupération du dossier si vous changez de prestataire.",
    alternatives: ['payfit', 'lucca', 'factorial'],
  },
  lucca: {
    verdict: "Lucca doit être évalué module par module : données RH, absences, temps ou dépenses ne répondent pas au même besoin. Une suite RH ne remplace pas automatiquement le moteur de paie déjà utilisé.",
    fit: "Une entreprise qui veut fiabiliser les informations collaborateurs et les flux transmis à la paie peut examiner Lucca. Commencez par le module qui traite votre difficulté principale, puis cartographiez les échanges avec le système de paie et la comptabilité.",
    avoid: "Acheter plusieurs modules dès le départ peut augmenter le coût et les dépendances avant d’avoir validé le premier processus. Vérifiez les habilitations, la conservation des historiques et les différences de règles entre établissements.",
    decision: "Suivez une absence de sa demande à son impact sur la paie, ou une note de frais jusqu’à son écriture comptable. Contrôlez les changements de manager et les départs. Le succès de l’intégration dépend de la donnée de référence et du responsable qui corrige les divergences entre systèmes.",
    alternatives: ['factorial', 'payfit', 'silae'],
  },
  qonto: {
    verdict: "Qonto répond d’abord au besoin de compte professionnel et de paiements. Son évaluation doit distinguer les opérations bancaires, les fonctions de préparation comptable et les éventuels services complémentaires.",
    fit: "Une entreprise qui veut organiser les pouvoirs de paiement et les justificatifs autour de son compte peut examiner Qonto. Le forfait utile dépend des opérations, des cartes et des accès réellement nécessaires, pas uniquement du nombre de personnes dans l’équipe.",
    avoid: "Un compte professionnel ne constitue ni un prévisionnel de trésorerie ni une tenue comptable complète. Si votre besoin principal est le financement, les devises ou la consolidation de plusieurs banques, examinez ces conditions explicitement avant de souscrire.",
    decision: "Faites décrire qui prépare un virement, qui l’approuve et comment les pièces sont transmises au cabinet. Comparez votre volume réel d’opérations aux quotas du forfait. Vérifiez les limites, les frais hors forfait et le fonctionnement des accès quand une personne quitte l’entreprise.",
    alternatives: ['revolut-business', 'pennylane', 'spendesk'],
  },
  'revolut-business': {
    verdict: "Revolut Business est à étudier à partir des flux internationaux de l’entreprise. Le coût pertinent dépend des devises, des volumes et des quotas de la formule, plutôt que d’une promesse générale de change économique.",
    fit: "Une société qui encaisse ou paie dans plusieurs devises peut comparer Revolut Business à son organisation bancaire actuelle. Il faut distinguer la monnaie du compte, les coordonnées disponibles et les types de transferts utilisés dans chaque pays.",
    avoid: "N’extrapolez pas les conditions d’un compte personnel au compte professionnel. Vérifiez l’éligibilité de la société, les pouvoirs des utilisateurs et les frais hors quotas. Les fonctionnalités disponibles peuvent varier selon le marché et la formule.",
    decision: "Construisez un échantillon de virements et de conversions issus d’un mois réel. Chiffrez chaque opération avec la formule proposée, puis rapprochez les écritures et les frais. Un gain sur le change peut être annulé par une réconciliation comptable trop manuelle ou des restrictions de transfert.",
    alternatives: ['qonto', 'payhawk'],
  },
  payhawk: {
    verdict: "Payhawk est à examiner lorsque la gestion des dépenses implique plusieurs entités et un système comptable ou ERP structuré. La recette des interfaces et des droits doit précéder le déploiement des cartes.",
    fit: "Une organisation internationale peut étudier Payhawk pour suivre les dépenses selon les sociétés et les responsabilités budgétaires. Le projet nécessite une cartographie des pays, des devises, des comptes et des règles d’approbation locales.",
    avoid: "La présence du nom de votre ERP dans une liste d’intégrations ne garantit pas la reprise de tous vos champs ou de vos workflows. Faites tester les dimensions analytiques, les taux de change et les rejets. Un projet multi-entités exige un responsable de gouvernance identifié.",
    decision: "Demandez une démonstration sur deux sociétés avec des règles d’approbation différentes. Vérifiez la comptabilisation d’une dépense en devise et l’identification de la bonne entité. Comparez l’effort de paramétrage et la maintenance du connecteur avec Spendesk ou Pleo à périmètre identique.",
    alternatives: ['spendesk', 'pleo'],
  },
  kyriba: {
    verdict: "Kyriba relève d’un projet de trésorerie groupe : liquidité, paiements et risques selon les modules retenus. Sa sélection demande un cadrage des banques, des entités et des responsabilités de contrôle.",
    fit: "Un groupe avec plusieurs sociétés et des flux bancaires complexes peut étudier Kyriba pour structurer la vision de liquidité. La pertinence dépend du périmètre fonctionnel et de la capacité de l’équipe à administrer les connexions et les habilitations.",
    avoid: "Si le problème se limite à maintenir une prévision simple pour une seule société, examinez d’abord une solution proportionnée. Aucun seuil automatique de chiffre d’affaires ne justifie à lui seul un projet Kyriba. L’effort de déploiement doit être chiffré avec les banques et l’intégrateur.",
    decision: "Cartographiez les comptes, les mandats, les formats de paiement et les scénarios de risque. Faites valider la séparation entre préparation et autorisation des paiements. Le pilote doit démontrer la traçabilité des flux, la gestion des incidents et la disponibilité des données nécessaires aux décisions groupe.",
    alternatives: ['agicap', 'okimia'],
  },
  'power-bi': {
    verdict: "Power BI peut servir au reporting financier si les sources et le modèle de données sont préparés. Il constitue une couche d’analyse ; la qualité d’un tableau de bord reste liée à celle des écritures et des référentiels qui l’alimentent.",
    fit: "Une PME qui rapproche plusieurs sources et produit régulièrement des indicateurs de gestion peut examiner Power BI. Le projet doit définir les règles de calcul, les dimensions analytiques et les droits d’accès avant de travailler la présentation des graphiques.",
    avoid: "Des factures incomplètes ou des définitions différentes du chiffre d’affaires ne se corrigent pas par une visualisation. Ne choisissez pas une licence sans préciser qui crée, consulte et partage les rapports. Les coûts de capacité et les connecteurs doivent aussi être examinés.",
    decision: "Choisissez trois indicateurs utilisés en comité de direction et rapprochez-les avec la comptabilité. Testez l’actualisation, une correction de donnée et la restriction d’accès à une entité. Documentez les calculs pour qu’une autre personne puisse reprendre le modèle sans reconstruire tout le reporting.",
    alternatives: ['pennylane'],
  },
  upflow: {
    verdict: "Upflow est à étudier pour structurer le suivi du poste clients et les relances B2B. Le premier critère est la fiabilité du lien entre factures, paiements, litiges et interlocuteurs de recouvrement.",
    fit: "Une entreprise avec des factures à échéance et plusieurs personnes impliquées dans les relances peut examiner Upflow. Le circuit doit distinguer un retard de paiement d’un litige commercial ou d’un paiement déjà reçu mais non rapproché.",
    avoid: "Automatiser les relances sur une balance clients non fiabilisée peut détériorer la relation commerciale. Commencez par les avoirs, les acomptes et les paiements non affectés. Aucun gain de délai d’encaissement n’est établi pour votre entreprise avant un pilote mesuré.",
    decision: "Testez une facture échue, un paiement partiel et un litige qui suspend la relance. Vérifiez les données transmises au commercial et au DAF. Comparez les créances suivies au système de facturation, puis mesurez les délais sur une période comparable avant de conclure sur l’effet de l’outil.",
    alternatives: ['leanpay', 'agicap'],
  },
  leanpay: {
    verdict: "LeanPay peut être examiné pour organiser les relances et le suivi des créances. La décision dépend des règles de recouvrement, des données de facturation et du traitement des litiges commerciaux.",
    fit: "Une PME qui veut rendre son suivi clients plus régulier peut comparer LeanPay à son processus actuel. Identifiez d’abord les comptes prioritaires, les contacts, les échéances et les personnes habilitées à interrompre ou modifier une relance.",
    avoid: "Un scénario automatique ne doit pas relancer une facture annulée, contestée ou déjà payée. Faites préciser le rythme de synchronisation et la gestion des erreurs. Si la difficulté vient surtout de factures émises trop tard, traitez aussi ce processus en amont.",
    decision: "Prenez une balance âgée et rapprochez chaque statut avec la comptabilité. Faites tester un avoir, une échéance négociée et un changement d’interlocuteur client. Le pilotage doit montrer ce qui est réellement encaissé et ce qui reste à arbitrer, avec une piste d’audit des actions de relance.",
    alternatives: ['upflow', 'agicap'],
  },
  factorial: {
    verdict: "Factorial s’évalue selon les modules RH et les pays concernés. Centraliser les dossiers collaborateurs peut faciliter le suivi administratif, mais le périmètre paie et les responsabilités locales doivent être confirmés séparément.",
    fit: "Une PME qui veut organiser les absences, les données salariés et les circuits RH peut examiner Factorial. Pour une équipe France-Espagne, le projet doit préciser quelles règles restent propres à chaque pays et quelles informations sont partagées au niveau du groupe.",
    avoid: "Une interface disponible dans plusieurs langues ne prouve pas la couverture de toutes les obligations sociales locales. Vérifiez le prestataire de paie, les interfaces et les habilitations sur les données personnelles. Choisissez les modules utiles plutôt qu’une suite complète par défaut.",
    decision: "Suivez l’arrivée d’un salarié, une absence et un départ dans chaque pays concerné. Contrôlez ce qui est envoyé à la paie et ce qui reste à valider manuellement. Le DAF doit pouvoir rapprocher les effectifs et la masse salariale avec des périodes et des définitions cohérentes.",
    alternatives: ['lucca', 'payfit', 'silae'],
  },
  carta: {
    verdict: "Carta est à examiner pour la gestion de l’actionnariat et de la table de capitalisation. La question décisive est la couverture des instruments juridiques et des pays de votre société, avec validation par vos conseils.",
    fit: "Une startup avec plusieurs opérations sur le capital peut étudier Carta pour suivre détenteurs, instruments et scénarios de dilution. Le logiciel doit être alimenté à partir des actes et des décisions réellement signés, avec une responsabilité de mise à jour identifiée.",
    avoid: "Ne déduisez pas la prise en charge d’un instrument français de la couverture d’un instrument américain proche. Les BSPCE, les valorisations et les obligations locales nécessitent une confirmation précise. Un tableau lisible ne remplace pas la validation juridique de l’historique.",
    decision: "Reconstituez une opération passée depuis les actes, puis simulez une levée avec conversion et dilution. Comparez les résultats au modèle validé par vos conseils. Faites confirmer les exports, les droits investisseurs et les conditions de sortie avant d’intégrer la plateforme à votre gouvernance.",
    alternatives: ['equify'],
  },
  equify: {
    verdict: "Equify se compare sur le suivi du capital, des détenteurs et des plans d’intéressement. La fiabilité du registre repose sur le rapprochement des opérations avec les pièces juridiques et sur la gestion des habilitations.",
    fit: "Une société qui veut structurer l’administration de son actionnariat peut examiner Equify avec son conseil juridique et sa direction financière. Le dossier doit décrire les titulaires, les instruments et les événements à suivre, y compris les départs et les exercices.",
    avoid: "Une reprise ne doit pas transformer une estimation ou un accord non signé en droit acquis. Faites valider chaque opération et les règles de calcul. Vérifiez également les différences entre accès administrateur, bénéficiaire et investisseur avant d’ouvrir les comptes.",
    decision: "Testez une attribution, une modification et une sortie de bénéficiaire à partir de documents validés. Rapprochez la table de capitalisation et les exports avec votre registre de référence. Comparez ensuite les frais annuels et les opérations incluses avec Carta sur le même nombre de titulaires actifs.",
    alternatives: ['carta'],
  },
};

/** User-confirmed firm experience. No individual quotation or measured ROI implied. */
export const PENNYLANE_EXPERIENCE = {
  confirmedAt: '2026-10-03', years: 4, clientSharePercent: 50,
  strength: 'Centraliser la comptabilité et préparer une précomptabilité propre.',
  limit: 'Un reporting encore limité pour certains besoins de pilotage.',
  specialist: { name: 'Florent Greth', href: '/a-propos/florent-greth' },
};

export function getToolReviewTitle(tool: { slug: string; name: string }) {
  return tool.slug === 'pennylane' ? 'Avis Pennylane : 4 ans d’usage, prix et limites' : `${tool.name} : analyse, prix et intégration`;
}
