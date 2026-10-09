/** Editorial selection protocols. No undocumented implementation or client-result claims. */
export interface ToolSelection {
  source: string;
  intro: string;
  scenario: string;
  uses: string[];
  warnings: string[];
  checks: Array<{ title: string; text: string }>;
  limit: string;
  question: string;
  answer: string;
  cost: string;
  comparison: { href: string; label: string };
  service: { href: string; label: string };
}
export const TOOL_SELECTION_REVIEW_DATE = "2026-10-02";
export const toolSelection: Record<string, ToolSelection> = {
  "pennylane": {
    "source": "https://www.pennylane.com/fr",
    "intro": "Pennylane réunit facturation, dépenses et comptabilité. Son intérêt se juge sur la collaboration avec votre cabinet et la continuité entre les pièces, les écritures et les tableaux de bord. Une interface agréable ne suffit pas à fiabiliser une clôture.",
    "scenario": "Une PME de services veut éviter de ressaisir les factures dans plusieurs systèmes. Le dossier de démonstration doit aller de la facture fournisseur au paiement, puis à la ventilation analytique et au rapprochement comptable.",
    "uses": [
      "Factures et pièces dans un environnement partagé",
      "Échanges entre entreprise et cabinet comptable",
      "Suivi analytique à tester sur vos activités"
    ],
    "warnings": [
      "Reprise des soldes et des justificatifs à organiser",
      "Stocks et flux métiers à examiner séparément"
    ],
    "checks": [
      {
        "title": "Reprendre un dossier comptable",
        "text": "Sur une période arrêtée, rapprochez la balance importée, les écritures et les pièces avec le système précédent. Faites valider les soldes de reprise par le responsable comptable."
      },
      {
        "title": "Traiter un achat jusqu’à la clôture",
        "text": "Testez une facture, un avoir, une immobilisation et une ventilation entre deux activités. Vérifiez les corrections et les exports sans présumer que chaque automatisation couvre vos exceptions."
      },
      {
        "title": "Tester une connexion existante",
        "text": "Choisissez votre banque ou votre outil de dépenses réel. Vérifiez le sens de synchronisation, les doublons, les rejets et la personne chargée de les corriger."
      }
    ],
    "limit": "Le logiciel ne remplace pas le contrôle comptable. Si le cabinet utilise un autre système, convenez du fichier échangé, du rythme et du responsable de validation avant la migration.",
    "question": "Comment préparer une migration vers Pennylane ?",
    "answer": "Arrêtez une date de reprise, listez les dossiers ouverts et les pièces à conserver, puis validez une balance et une clôture test. Le délai dépend de la reprise et des connexions ; un calendrier fixe ne peut pas être déduit du seul nom du logiciel.",
    "cost": "Abonnement, accès du cabinet, modules, historique repris et accompagnement doivent figurer dans le même devis.",
    "comparison": {
      "href": "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",
      "label": "Comparer Pennylane et une solution Sage identifiée"
    },
    "service": {
      "href": "/services/comptabilite-externalisation",
      "label": "Organiser les travaux comptables"
    }
  },
  "agicap": {
    "source": "https://agicap.com/fr/",
    "intro": "Agicap présente une plateforme de trésorerie et de gestion des postes clients et fournisseurs. Pour la direction financière, le point décisif est de relier les soldes observés aux échéances et aux hypothèses de prévision, plutôt que d’afficher seulement le cash disponible.",
    "scenario": "Une entreprise doit anticiper des retards clients et un investissement. Préparez un scénario central et un scénario dégradé, avec le détail des factures et des dates de paiement supposées.",
    "uses": [
      "Suivi des comptes et des flux de trésorerie",
      "Prévision à confronter aux échéances réelles",
      "Lecture des postes clients et fournisseurs"
    ],
    "warnings": [
      "Connexions de chaque banque à confirmer",
      "Hypothèses de paiement à maintenir"
    ],
    "checks": [
      {
        "title": "Rapprocher les soldes bancaires",
        "text": "Comparez les comptes connectés à leurs relevés, à une date précise. Identifiez les comptes manquants et la fréquence de mise à jour."
      },
      {
        "title": "Construire un scénario de retard client",
        "text": "Décalez un encaissement attendu et vérifiez son effet sur le solde minimum. Séparez factures engagées, hypothèses et flux réalisés."
      },
      {
        "title": "Revoir le prévisionnel après une semaine",
        "text": "Expliquez les écarts entre prévision et réalisé, puis corrigez les dates ou montants. Testez séparément les flux intersociétés si vous consolidez plusieurs entités."
      }
    ],
    "limit": "Aucune connexion bancaire ne garantit la justesse des prévisions. Les échéances, la saisonnalité et les décisions de financement restent à renseigner et à contrôler.",
    "question": "Agicap remplace-t-il un prévisionnel entretenu par le DAF ?",
    "answer": "Il peut servir de support au suivi et aux scénarios, mais les hypothèses et l’analyse des écarts restent du ressort de la personne qui pilote la trésorerie. Demandez une démonstration avec vos factures et vos dates d’encaissement.",
    "cost": "Faites chiffrer les entités, les banques, les modules clients et fournisseurs, ainsi que la reprise des données.",
    "comparison": {
      "href": "/ressources/blog/agicap-vs-fygr-outil-tresorerie",
      "label": "Comparer Agicap et Okimia, anciennement Fygr"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Construire un prévisionnel de trésorerie"
    }
  },
  "spendesk": {
    "source": "https://www.spendesk.com/fr/",
    "intro": "Spendesk se positionne sur la gestion des dépenses et des achats. Le besoin à examiner est le circuit de décision : qui demande, qui approuve, qui paie et qui valide l’écriture comptable. Le nombre de cartes ne détermine pas à lui seul le choix.",
    "scenario": "Une équipe répartie sur plusieurs sites veut suivre ses engagements. Testez une demande d’achat, une dépense par carte et une facture fournisseur jusqu’à leur affectation au bon centre de coût.",
    "uses": [
      "Circuit de demandes et d’approbations",
      "Collecte des dépenses et des justificatifs",
      "Connexion des dépenses au suivi budgétaire"
    ],
    "warnings": [
      "Délégations et exceptions à définir",
      "Export vers le logiciel comptable à tester"
    ],
    "checks": [
      {
        "title": "Dessiner le circuit d’approbation",
        "text": "Sur une dépense représentative, identifiez demandeur, valideur et payeur. Testez aussi l’absence du valideur et le dépassement d’un budget."
      },
      {
        "title": "Suivre une pièce manquante",
        "text": "Vérifiez les relances et la visibilité d’une dépense sans justificatif. Définissez qui l’examine avant clôture."
      },
      {
        "title": "Vérifier l’écriture exportée",
        "text": "Rapprochez montant, TVA, fournisseur, centre de coût et pièce dans le logiciel comptable cible. Simulez une correction pour éviter une écriture en double."
      }
    ],
    "limit": "Un workflow de dépenses ne remplace pas une délégation bancaire ni un contrôle de clôture. Les pouvoirs de validation doivent correspondre à l’organisation réelle.",
    "question": "Comment comparer Spendesk avec Pleo ou Payhawk ?",
    "answer": "Soumettez aux candidats le même circuit d’approbation, les mêmes entités et le même export comptable. Comparez les interventions manuelles, les droits, les frais et le traitement des exceptions plutôt qu’un seuil de salariés ou de cartes.",
    "cost": "Distinguez cartes, achats, factures, notes de frais, utilisateurs et entités. Vérifiez quels services sont inclus dans la formule proposée.",
    "comparison": {
      "href": "/ressources/outils/gestion-depenses",
      "label": "Comparer les outils de gestion des dépenses"
    },
    "service": {
      "href": "/services/controle-de-gestion-externalise",
      "label": "Relier les dépenses au contrôle de gestion"
    }
  },
  "payfit": {
    "source": "https://payfit.com/fr/",
    "intro": "PayFit présente un logiciel de paie et des services d’accompagnement. Le choix dépend autant de la convention collective et des situations de paie que de l’autonomie souhaitée : précisez qui saisit les variables, contrôle les bulletins et valide les déclarations.",
    "scenario": "Une PME veut sécuriser sa première paie dans un nouvel outil. Utilisez un mois avec entrée, absence, prime et sortie d’un salarié pour éprouver le parcours complet.",
    "uses": [
      "Paie et données collaborateurs",
      "Collecte des variables et documents RH",
      "Accompagnement à préciser selon l’offre"
    ],
    "warnings": [
      "Convention collective à confirmer",
      "Responsabilité de production et de contrôle à écrire"
    ],
    "checks": [
      {
        "title": "Définir le dossier de paie",
        "text": "Listez établissements, conventions, contrats, cumuls et cas particuliers. Faites confirmer leur prise en charge avant de fixer la date de bascule."
      },
      {
        "title": "Comparer une paie test",
        "text": "Avec la personne responsable de la paie, rapprochez brut, net, cotisations, absences et cumuls du mois précédent. Documentez chaque écart."
      },
      {
        "title": "Contrôler le parcours déclaratif",
        "text": "Vérifiez les validations, les retours déclaratifs, les paiements et l’écriture comptable. Répartissez les tâches entre entreprise, outil et prestataire."
      }
    ],
    "limit": "L’automatisation ne dispense pas du contrôle des variables, des bulletins et des retours déclaratifs. La couverture d’une convention ou d’un cas particulier doit être confirmée sur le dossier.",
    "question": "Qui produit la paie avec PayFit ?",
    "answer": "Précisez le mode d’utilisation et le service retenu avec l’éditeur. Écrivez qui prépare les variables, produit et valide les bulletins, traite les anomalies et les déclarations ; le nom du logiciel ne suffit pas à répartir ces responsabilités.",
    "cost": "Comparez abonnement, salariés, établissements, reprise des cumuls et service d’accompagnement, hors promotion.",
    "comparison": {
      "href": "/ressources/blog/payfit-vs-silae-comparatif-pme",
      "label": "Comparer PayFit, Silae et l’organisation de la paie"
    },
    "service": {
      "href": "/services/gestion-paie-charges-sociales",
      "label": "Cadrer la gestion de paie"
    }
  },
  "sage": {
    "source": "https://www.sage.com/fr-fr/produits/",
    "intro": "Sage désigne plusieurs solutions de comptabilité, de gestion et d’ERP. Identifiez d’abord le produit et ses modules : une conclusion sur Sage 100 ne vaut pas pour Sage Active, Intacct ou X3.",
    "scenario": "Une entreprise souhaite relier achats, stocks et comptabilité. Faites traiter le même cycle dans l’édition Sage proposée.",
    "uses": [
      "Édition et hébergement à identifier"
    ],
    "warnings": [
      "Migration et modules à chiffrer"
    ],
    "checks": [
      {
        "title": "Rapprocher un cycle achat-stock-vente",
        "text": "Contrôlez les mouvements de stock, les factures et les écritures associées sur une référence représentative."
      },
      {
        "title": "Tester un actif et l’analytique",
        "text": "Vérifiez acquisition, amortissement, sortie et restitution par activité dans les modules réellement proposés."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Quelle solution Sage faut-il comparer ?",
    "answer": "Demandez le nom de l’édition, l’hébergement, les modules et l’intégrateur. Comparez ensuite ces fonctions à votre dossier ; la marque seule ne décrit pas le périmètre.",
    "cost": "Licences, hébergement, modules, intégration et maintenance doivent être distingués.",
    "comparison": {
      "href": "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",
      "label": "Comparer Pennylane et Sage"
    },
    "service": {
      "href": "/services/comptabilite-externalisation",
      "label": "Organisation comptable"
    }
  },
  "cegid-loop": {
    "source": "https://www.cegid.com/fr/solutions/expertise-comptable/",
    "intro": "Cegid présente Loop dans son offre de production comptable pour cabinets. Le choix se prépare avec l’expert-comptable : définissez les échanges et les accès dont l’entreprise a besoin, sans lui attribuer les fonctions de toute la gamme Cegid.",
    "scenario": "Un cabinet et son client veulent éviter les envois dispersés de pièces. Testez l’accès du dirigeant et celui du collaborateur comptable.",
    "uses": [
      "Production comptable avec le cabinet"
    ],
    "warnings": [
      "Accès entreprise et cabinet à définir"
    ],
    "checks": [
      {
        "title": "Vérifier une pièce jusqu’à l’écriture",
        "text": "Testez le dépôt d’une facture, sa correction et sa validation avec le cabinet responsable du dossier."
      },
      {
        "title": "Vérifier le reporting transmis",
        "text": "Rapprochez une balance et un export avec la période comptable validée. Confirmez les droits de consultation et de correction."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Cegid Loop est-il un logiciel de caisse ou de stock ?",
    "answer": "La présentation Loop porte sur la production comptable. Ne lui attribuez pas automatiquement les modules caisse, retail ou stocks d’autres produits Cegid : demandez leur référence exacte.",
    "cost": "Distinguez licence cabinet, accès entreprise et prestation comptable.",
    "comparison": {
      "href": "/ressources/outils/logiciels-comptabilite",
      "label": "Comparer les organisations comptables"
    },
    "service": {
      "href": "/services/comptabilite-externalisation",
      "label": "Organisation comptable"
    }
  },
  "okimia": {
    "source": "https://www.okimia.com/fr",
    "intro": "Fygr est devenu Okimia. La solution présente un suivi et une prévision de trésorerie reliés aux banques et à l’ERP. Conservez cette fiche pour comprendre l’évolution du produit, puis vérifiez l’offre actuellement proposée.",
    "scenario": "Une PME veut remplacer un suivi dispersé dans des tableurs par une lecture des échéances et des soldes.",
    "uses": [
      "Suivi de trésorerie et prévision"
    ],
    "warnings": [
      "Connexions et entités à confirmer"
    ],
    "checks": [
      {
        "title": "Rapprocher une banque",
        "text": "Comparez les soldes et transactions affichés avec votre relevé ; notez la fréquence de synchronisation."
      },
      {
        "title": "Tester un décalage d’encaissement",
        "text": "Reportez une facture et observez son effet sur la prévision. Vérifiez comment séparer hypothèses et réalisé."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Fygr et Okimia sont-ils deux solutions différentes ?",
    "answer": "Le site éditeur présente Okimia comme le nouveau nom de Fygr. Pour choisir, vérifiez les fonctionnalités et conditions actuelles ; un ancien tarif Fygr ne décrit pas nécessairement l’offre Okimia.",
    "cost": "Entités, banques, intégrations et durée de facturation sont à préciser.",
    "comparison": {
      "href": "/ressources/blog/agicap-vs-fygr-outil-tresorerie",
      "label": "Comparer Okimia et Agicap"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Prévisionnel de trésorerie"
    }
  },
  "pleo": {
    "source": "https://www.pleo.io/fr",
    "intro": "Pleo présente une gestion des dépenses professionnelles, des cartes et des justificatifs. Son intérêt se vérifie sur l’expérience du collaborateur et le contrôle conservé par la finance, sans supposer qu’une petite équipe n’a pas besoin d’approbations.",
    "scenario": "Une équipe mobile veut déclarer ses dépenses tout en gardant une piste de contrôle pour la clôture.",
    "uses": [
      "Dépenses et justificatifs collaborateurs"
    ],
    "warnings": [
      "Droits, entités et plafonds à tester"
    ],
    "checks": [
      {
        "title": "Tester une dépense en déplacement",
        "text": "Vérifiez la capture de pièce, la catégorie, l’approbation et le traitement d’un remboursement."
      },
      {
        "title": "Rapprocher l’export comptable",
        "text": "Contrôlez la TVA, la devise et l’affectation analytique d’une dépense dans le logiciel cible."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Un nombre de cartes suffit-il à choisir Pleo ?",
    "answer": "Non. Testez les délégations, les dépenses en devises, les justificatifs et les exports. Une équipe réduite peut avoir un circuit complexe, et l’inverse est possible.",
    "cost": "Incluez utilisateurs supplémentaires, cartes, remboursements et options.",
    "comparison": {
      "href": "/ressources/outils/gestion-depenses",
      "label": "Comparer Pleo, Spendesk et Payhawk"
    },
    "service": {
      "href": "/services/controle-de-gestion-externalise",
      "label": "Contrôle des dépenses"
    }
  },
  "silae": {
    "source": "https://www.silae.fr/",
    "intro": "Silae présente des solutions de paie et de RH, notamment mySilae. Distinguez le logiciel et le prestataire qui produit la paie : la qualité du dossier dépend du paramétrage, des variables et de la validation, même lorsque des contrôles sont automatisés.",
    "scenario": "Une entreprise veut confier sa paie à un partenaire tout en suivant les informations collaborateurs.",
    "uses": [
      "Production de paie et données RH"
    ],
    "warnings": [
      "Convention et prestataire à confirmer"
    ],
    "checks": [
      {
        "title": "Contrôler le dossier repris",
        "text": "Faites rapprocher contrats, cumuls, absences et paramétrage conventionnel avant le premier bulletin."
      },
      {
        "title": "Tester un cas exceptionnel",
        "text": "Soumettez une entrée, une sortie ou une prime spécifique au gestionnaire. Vérifiez calculs, justificatifs et retours déclaratifs."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Silae garantit-il une paie sans erreur ?",
    "answer": "Un outil ne permet pas de garantir l’absence d’erreur sur votre dossier. Précisez les contrôles du gestionnaire et la responsabilité de validation des variables, bulletins et déclarations.",
    "cost": "Séparez licence, production de paie, modules RH et assistance.",
    "comparison": {
      "href": "/ressources/blog/payfit-vs-silae-comparatif-pme",
      "label": "Comparer les modèles de production de paie"
    },
    "service": {
      "href": "/services/gestion-paie-charges-sociales",
      "label": "Gestion de paie"
    }
  },
  "lucca": {
    "source": "https://www.lucca.fr/",
    "intro": "Lucca présente plusieurs solutions RH. Une sélection utile précise les modules recherchés et le lien avec la paie : suivre les absences ou les temps ne suffit pas à définir qui produit les bulletins.",
    "scenario": "La RH souhaite fiabiliser les absences transmises au gestionnaire de paie.",
    "uses": [
      "Données RH, temps et absences"
    ],
    "warnings": [
      "Modules et interfaces paie à identifier"
    ],
    "checks": [
      {
        "title": "Tester une absence validée",
        "text": "Suivez sa saisie, son approbation et sa transmission au gestionnaire de paie, avec la bonne période de rattachement."
      },
      {
        "title": "Vérifier les accès collaborateurs",
        "text": "Testez une arrivée, un départ et un changement de manager. Vérifiez les données visibles et les droits conservés."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Lucca remplace-t-il le logiciel de paie ?",
    "answer": "Le périmètre dépend des solutions et services retenus. Faites identifier la brique qui produit la paie et testez les échanges de variables ; ne présumez pas qu’un module RH couvre toute la paie.",
    "cost": "Additionnez uniquement les modules utiles, les collaborateurs et la mise en place.",
    "comparison": {
      "href": "/ressources/outils/logiciels-paie",
      "label": "Choisir son organisation paie et RH"
    },
    "service": {
      "href": "/drh-externalise",
      "label": "Pilotage RH"
    }
  },
  "qonto": {
    "source": "https://qonto.com/fr",
    "intro": "Qonto présente un compte professionnel avec des services de paiement et de gestion financière. Comparez-le sur vos opérations réelles et sur les contrôles de paiement, plutôt que sur le seul prix d’un forfait d’entrée.",
    "scenario": "Une entreprise souhaite séparer préparation et validation des paiements, puis transmettre les pièces à son cabinet.",
    "uses": [
      "Compte professionnel et paiements"
    ],
    "warnings": [
      "Quotas, pouvoirs et financement à examiner"
    ],
    "checks": [
      {
        "title": "Tester un circuit de virement",
        "text": "Vérifiez les droits du préparateur et du valideur, ainsi que les plafonds et les justificatifs conservés."
      },
      {
        "title": "Rapprocher les flux comptables",
        "text": "Sur une période arrêtée, comparez relevé, pièces et écritures. Vérifiez l’export ou la connexion avec votre logiciel comptable."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Qonto couvre-t-il tous les besoins bancaires d’une PME ?",
    "answer": "Listez vos besoins de virements, devises, cartes, encaissements et financement. Confirmez les services et conditions proposés ; un compte professionnel ne décrit pas à lui seul un dispositif complet de financement.",
    "cost": "Chiffrez cartes, utilisateurs, virements et opérations au-delà du forfait.",
    "comparison": {
      "href": "/ressources/outils/revolut-business",
      "label": "Examiner les opérations en devises avec Revolut Business"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Pilotage des flux bancaires"
    }
  },
  "revolut-business": {
    "source": "https://www.revolut.com/business/",
    "intro": "Revolut Business présente des comptes et services pour les opérations professionnelles en devises. L’arbitrage doit porter sur le coût total des conversions et des paiements, l’éligibilité de l’entreprise et les services disponibles dans son pays.",
    "scenario": "Une société encaisse dans une devise et paie des fournisseurs dans une autre. Comparez un mois réel de transactions.",
    "uses": [
      "Paiements professionnels en devises"
    ],
    "warnings": [
      "Pays, coordonnées de compte et frais à confirmer"
    ],
    "checks": [
      {
        "title": "Chiffrer un mois de change",
        "text": "Rejouez les conversions, virements et dépassements de quotas sur chaque formule envisagée ; distinguez les frais inclus et additionnels."
      },
      {
        "title": "Tester un encaissement international",
        "text": "Vérifiez coordonnées nécessaires, devise reçue, frais et rapprochement comptable avant de modifier les instructions clients."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Un compte en devise donne-t-il toujours un IBAN local ?",
    "answer": "Faites confirmer les coordonnées de réception disponibles pour votre entité et chaque devise. Un solde en devise ne suffit pas à garantir des coordonnées locales ou un mode de réception particulier.",
    "cost": "Incluez change, transferts, quotas, cartes et frais supplémentaires.",
    "comparison": {
      "href": "/ressources/outils/qonto",
      "label": "Comparer les besoins de compte professionnel"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Prévisionnel multidevise"
    }
  },
  "payhawk": {
    "source": "https://payhawk.com/",
    "intro": "Payhawk présente une plateforme de dépenses et de paiements avec un contrôle par entité et des connexions ERP. La complexité de vos sociétés et des circuits de validation compte davantage qu’un seuil d’effectif.",
    "scenario": "Un groupe veut suivre une dépense jusqu’à son imputation dans l’ERP de la bonne filiale.",
    "uses": [
      "Dépenses et contrôles par entité"
    ],
    "warnings": [
      "Pays, devises et connecteurs à tester"
    ],
    "checks": [
      {
        "title": "Tester une dépense de filiale",
        "text": "Vérifiez valideur, entité juridique, devise, taxe et centre de coût sur un parcours complet."
      },
      {
        "title": "Tester la correction dans l’ERP",
        "text": "Simulez un rejet et une correction ; contrôlez le sens des échanges, la piste d’audit et l’absence de doublon."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Payhawk convient-il automatiquement à une entreprise internationale ?",
    "answer": "Vérifiez les pays, les entités, les moyens de paiement et les connecteurs inclus dans l’offre. Une présence internationale ne suffit pas à prouver la couverture de votre organisation.",
    "cost": "Faites chiffrer modules, entités, utilisateurs et intégration ERP.",
    "comparison": {
      "href": "/ressources/outils/gestion-depenses",
      "label": "Comparer les solutions de gestion des dépenses"
    },
    "service": {
      "href": "/services/controle-de-gestion-externalise",
      "label": "Contrôle de gestion multi-entités"
    }
  },
  "kyriba": {
    "source": "https://www.kyriba.com/fr/",
    "intro": "Kyriba présente une plateforme de trésorerie, de liquidité et de paiements. Son étude demande un cahier des charges de trésorerie groupe : banques, entités, droits, flux et interfaces, plutôt qu’une simple comparaison de tableaux de bord.",
    "scenario": "Une direction trésorerie souhaite centraliser des flux de plusieurs sociétés et banques.",
    "uses": [
      "Liquidité et trésorerie groupe"
    ],
    "warnings": [
      "Connectivité bancaire et gouvernance à cadrer"
    ],
    "checks": [
      {
        "title": "Cartographier les flux du groupe",
        "text": "Décrivez banques, comptes, devises, entités et formats échangés. Identifiez les interfaces critiques et leurs responsables."
      },
      {
        "title": "Tester le contrôle d’un paiement",
        "text": "Vérifiez habilitations, séparation des tâches et piste d’audit sur une transaction représentative du groupe."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Kyriba est-il interchangeable avec un outil de prévision PME ?",
    "answer": "Comparez les périmètres : trésorerie groupe, paiements, connectivité et intégration peuvent nécessiter un projet différent d’un suivi de cash PME. Le cahier des charges doit précéder la sélection.",
    "cost": "Incluez modules, connexions bancaires, intégration, exploitation et accompagnement.",
    "comparison": {
      "href": "/ressources/outils/logiciels-tresorerie",
      "label": "Comparer les périmètres de trésorerie"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Cadrer la prévision financière"
    }
  },
  "power-bi": {
    "source": "https://learn.microsoft.com/fr-fr/power-bi/fundamentals/power-bi-overview",
    "intro": "Power BI distingue la création et la modélisation dans Desktop du partage dans le service en ligne. Pour un reporting financier, la priorité est un modèle de données réconcilié avec la comptabilité, puis un accès adapté à chaque lecteur.",
    "scenario": "Une direction veut lire marge et budget par activité sans multiplier les exports manuels.",
    "uses": [
      "Modélisation et reporting financier"
    ],
    "warnings": [
      "Qualité des données et droits de partage à cadrer"
    ],
    "checks": [
      {
        "title": "Rapprocher un indicateur au grand livre",
        "text": "Sur un mois clôturé, reproduisez le chiffre d’affaires et la marge. Expliquez les exclusions, dates et règles de ventilation."
      },
      {
        "title": "Tester actualisation et droits",
        "text": "Simulez un échec de source et un accès limité à une entité. Vérifiez que la date de mise à jour et les restrictions sont visibles."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Power BI Desktop suffit-il pour partager les rapports ?",
    "answer": "Microsoft distingue Desktop et le service Power BI. Définissez les créateurs et les lecteurs, puis vérifiez les licences et la capacité nécessaires au mode de partage retenu.",
    "cost": "Distinguez création, licences lecteurs, capacité, connecteurs et maintenance du modèle.",
    "comparison": {
      "href": "/ressources/blog/essentiels-outils-tech-finance",
      "label": "Cadrer les données et les outils finance"
    },
    "service": {
      "href": "/services/controle-de-gestion-externalise",
      "label": "Construire un reporting de gestion"
    }
  },
  "upflow": {
    "source": "https://upflow.io/",
    "intro": "Upflow présente un outil de gestion du poste clients et du recouvrement. Son intérêt se vérifie sur la fiabilité des factures ouvertes et le suivi des relances, pas sur une promesse automatique de réduction des délais de paiement.",
    "scenario": "L’équipe finance souhaite éviter de relancer une facture déjà réglée ou contestée.",
    "uses": [
      "Poste clients et relances"
    ],
    "warnings": [
      "Factures, paiements et litiges à synchroniser"
    ],
    "checks": [
      {
        "title": "Rapprocher la balance âgée",
        "text": "Comparez factures, avoirs et paiements à la comptabilité avant d’activer les relances. Vérifiez les règlements partiels."
      },
      {
        "title": "Simuler un litige client",
        "text": "Testez suspension des relances, affectation à un responsable et historique des échanges pour une facture contestée."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Une automatisation des relances garantit-elle un DSO plus bas ?",
    "answer": "Non. Mesurez les délais sur des périodes comparables, en tenant compte des litiges, conditions de paiement et changements de portefeuille. L’outil soutient le processus ; il ne garantit pas le comportement du client.",
    "cost": "Précisez entités, portefeuille de créances, intégrations et assistance.",
    "comparison": {
      "href": "/ressources/outils/leanpay",
      "label": "Examiner LeanPay pour le poste clients"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Relier recouvrement et prévision de cash"
    }
  },
  "leanpay": {
    "source": "https://www.leanpay.io/",
    "intro": "LeanPay présente une gestion du recouvrement, des litiges et du risque clients. Pour choisir, vérifiez surtout comment une facture change de statut et comment les équipes commerciale et finance coordonnent leurs actions.",
    "scenario": "Une société veut distinguer retard de paiement, litige commercial et créance à traiter autrement.",
    "uses": [
      "Relances et suivi des créances"
    ],
    "warnings": [
      "Qualité de la balance et traitement des litiges à vérifier"
    ],
    "checks": [
      {
        "title": "Tester un paiement partiel",
        "text": "Rapprochez la créance restante et la relance suivante après un encaissement partiel et un avoir."
      },
      {
        "title": "Tester une facture contestée",
        "text": "Vérifiez suspension des relances, pièces disponibles et historique avant de transmettre le dossier à un spécialiste si nécessaire."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "LeanPay remplace-t-il le traitement humain des litiges ?",
    "answer": "Les fonctions de suivi peuvent organiser les échanges, mais la résolution d’un désaccord commercial reste à attribuer à un responsable. Testez les statuts et l’escalade avant d’automatiser les messages.",
    "cost": "Chiffrez entités, créances, interfaces et services de recouvrement retenus.",
    "comparison": {
      "href": "/ressources/outils/upflow",
      "label": "Examiner Upflow pour le poste clients"
    },
    "service": {
      "href": "/services/previsionnel-tresorerie",
      "label": "Piloter les encaissements attendus"
    }
  },
  "factorial": {
    "source": "https://factorial.fr/",
    "intro": "Factorial présente une plateforme de gestion d’entreprise comprenant des fonctions RH. Délimitez les modules utiles, les données collaborateurs et les échanges avec la paie avant de comparer le coût et la charge d’administration.",
    "scenario": "Une PME veut centraliser absences, temps et documents collaborateurs sans recréer un second référentiel de paie.",
    "uses": [
      "Données collaborateurs et processus RH"
    ],
    "warnings": [
      "Modules, paie et droits à préciser"
    ],
    "checks": [
      {
        "title": "Tester un changement de contrat",
        "text": "Suivez date d’effet, document, validation et transfert de la donnée vers la personne responsable de la paie."
      },
      {
        "title": "Tester une absence et ses droits",
        "text": "Vérifiez le solde, l’approbation et les accès du collaborateur et du manager, puis la transmission des variables."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Factorial produit-il automatiquement toute ma paie ?",
    "answer": "Faites préciser le produit, le pays et le service proposé. Vérifiez les fonctions de production et les interfaces avec votre prestataire ; un SIRH ne décrit pas automatiquement un service de paie complet.",
    "cost": "Comparez modules, collaborateurs, reprise du référentiel et service d’accompagnement.",
    "comparison": {
      "href": "/ressources/outils/lucca",
      "label": "Examiner Lucca pour les processus RH"
    },
    "service": {
      "href": "/drh-externalise",
      "label": "Cadrer l’organisation RH"
    }
  },
  "carta": {
    "source": "https://carta.com/uk/en/",
    "intro": "Carta présente une offre de gestion du capital et de l’actionnariat. Pour une société française ou internationale, commencez par la prise en charge des instruments juridiques concernés et par la traçabilité des opérations de capital.",
    "scenario": "Une startup prépare une opération de financement et doit expliquer la dilution de chaque détenteur.",
    "uses": [
      "Table de capitalisation et actionnariat"
    ],
    "warnings": [
      "Pays et instruments juridiques à confirmer"
    ],
    "checks": [
      {
        "title": "Reconstituer la table à une date",
        "text": "Rapprochez titres, documents et détenteurs avec vos registres, en distinguant capital émis et instruments dilutifs."
      },
      {
        "title": "Simuler une opération de capital",
        "text": "Vérifiez dilution, vesting et conditions d’exercice avec le conseil juridique sur les instruments réellement utilisés."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Carta couvre-t-il tous les instruments français ?",
    "answer": "Demandez une confirmation pour chaque instrument et chaque juridiction. Un outil de cap table ne remplace pas la validation des actes et des règles applicables par le conseil juridique.",
    "cost": "Distinguez détenteurs, instruments, administration, valorisation et services souscrits.",
    "comparison": {
      "href": "/ressources/outils/equify",
      "label": "Examiner Equify pour l’actionnariat"
    },
    "service": {
      "href": "/services/accompagnement-levee-de-fond",
      "label": "Préparer les données financières d’une levée"
    }
  },
  "equify": {
    "source": "https://www.equify.eu/fr/produit-table-de-capitalisation",
    "intro": "Equify présente une table de capitalisation et une gestion de l’actionnariat, notamment des dispositifs français. La sélection doit partir de vos registres et des instruments attribués, puis vérifier les droits de chaque intervenant.",
    "scenario": "Une entreprise veut suivre les attributions et exercices de BSPCE en cohérence avec les mouvements de titres.",
    "uses": [
      "Capitalisation et suivi des instruments"
    ],
    "warnings": [
      "Historique juridique et habilitations à rapprocher"
    ],
    "checks": [
      {
        "title": "Reconstituer une attribution",
        "text": "Vérifiez décision, bénéficiaire, calendrier d’acquisition et conditions d’exercice, avec les documents associés."
      },
      {
        "title": "Rapprocher registre et cap table",
        "text": "Testez un exercice ou une émission et contrôlez la cohérence entre titres, registre et vue diluée avec votre conseil juridique."
      }
    ],
    "limit": "Les données et les contrôles de ce parcours doivent être validés par le responsable métier avant la bascule.",
    "question": "Une cap table numérique remplace-t-elle les actes juridiques ?",
    "answer": "Non. Rapprochez les données avec les actes et les registres validés. Les fonctions de suivi ne dispensent pas de vérifier les décisions, signatures et règles de chaque instrument.",
    "cost": "Précisez titulaires, opérations, signatures et services d’accompagnement.",
    "comparison": {
      "href": "/ressources/outils/carta",
      "label": "Examiner Carta pour l’actionnariat international"
    },
    "service": {
      "href": "/services/accompagnement-levee-de-fond",
      "label": "Préparer les données d’une levée"
    }
  }
};
