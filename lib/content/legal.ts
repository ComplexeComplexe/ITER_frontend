import { Locale } from "../i18n";

export interface LegalSection {
  heading: string;
  content: string;
}

export interface LegalPageContent {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  sections: LegalSection[];
}

// ---------------------------------------------------------------------------
// MENTIONS LEGALES / LEGAL NOTICE / AVISO LEGAL
// ---------------------------------------------------------------------------

const mentionsLegalesFr: LegalPageContent = {
  meta: {
    title: "Mentions l\u00e9gales | Iter Advisors",
    description: "Mentions l\u00e9gales du site Iter Advisors.",
  },
  h1: "Mentions l\u00e9gales",
  sections: [
    {
      heading: "Informations G\u00e9n\u00e9rales",
      content:
        "Le titulaire du site web www.iteradvisors.com est ITER ADVISORS S.L., soci\u00e9t\u00e9 enregistr\u00e9e sous le NIF B42960849, ayant son si\u00e8ge social situ\u00e9 Calle Balmes 77, Principal 2a, 08007 Barcelone.\n\nInscription au Registre du Commerce de Barcelone, Tome 47726, Folio 138, Feuille B560623, Inscription 1.\n\nPour toute suggestion, question ou demande relative \u00e0 cet avis l\u00e9gal ou pour toute information sur le site web, n\u2019h\u00e9sitez pas \u00e0 nous contacter \u00e0 l\u2019adresse suivante\u00a0: contact@iteradvisors.com",
    },
    {
      heading: "Propri\u00e9t\u00e9 Intellectuelle",
      content:
        "Tous les contenus expos\u00e9s sur cette page web, incluant les designs, textes, images, logos, ic\u00f4nes, noms commerciaux, marques et toute autre information pouvant \u00eatre utilis\u00e9e \u00e0 des fins industrielles et/ou commerciales, sont prot\u00e9g\u00e9s par les droits d\u2019auteur correspondants.\n\nToute reproduction, transmission ou enregistrement de ces informations est strictement interdit sans l\u2019autorisation pr\u00e9alable du titulaire, ITER ADVISORS S.L.\n\nL\u2019utilisateur pourra uniquement utiliser les informations pour la gestion de ses commandes ainsi que les donn\u00e9es de contact associ\u00e9es.",
    },
    {
      heading: "Liens Hypertextes",
      content:
        "ITER ADVISORS S.L. d\u00e9cline toute responsabilit\u00e9 quant aux liens vers d\u2019autres sites ou pages web qui pourraient \u00eatre inclus sur ce site web, \u00e9tant donn\u00e9 qu\u2019elle n\u2019a aucun contr\u00f4le sur ces sites.\n\nL\u2019utilisateur acc\u00e8de \u00e0 ces sites sous sa propre responsabilit\u00e9 et conform\u00e9ment aux conditions d\u2019utilisation qui y sont \u00e9tablies.",
    },
  ],
};

const legalNoticeEn: LegalPageContent = {
  meta: {
    title: "Legal Notice | Iter Advisors",
    description: "Legal notice for the Iter Advisors website.",
  },
  h1: "Legal Notice",
  sections: [
    {
      heading: "General Information",
      content:
        "The owner of the website www.iteradvisors.com is ITER ADVISORS S.L., a company registered under NIF B42960849, with its registered office at Calle Balmes 77, Principal 2a, 08007 Barcelona.\n\nRegistered in the Barcelona Trade Register, Volume 47726, Folio 138, Sheet B560623, Inscription 1.\n\nFor any suggestions, questions or requests regarding this legal notice or for any information about the website, please do not hesitate to contact us at the following address: contact@iteradvisors.com",
    },
    {
      heading: "Intellectual Property",
      content:
        "All content displayed on this website, including designs, texts, images, logos, icons, trade names, trademarks and any other information that may be used for industrial and/or commercial purposes, is protected by the corresponding copyright.\n\nAny reproduction, transmission or storage of this information is strictly prohibited without the prior authorization of the owner, ITER ADVISORS S.L.\n\nThe user may only use the information for the management of their orders and the associated contact data.",
    },
    {
      heading: "Hyperlinks",
      content:
        "ITER ADVISORS S.L. accepts no responsibility for links to other sites or web pages that may be included on this website, as it has no control over these sites.\n\nThe user accesses these sites at their own risk and in accordance with the terms of use established therein.",
    },
  ],
};

const avisoLegalEs: LegalPageContent = {
  meta: {
    title: "Aviso Legal | Iter Advisors",
    description: "Aviso legal del sitio web de Iter Advisors.",
  },
  h1: "Aviso Legal",
  sections: [
    {
      heading: "Informaci\u00f3n General",
      content:
        "El titular del sitio web www.iteradvisors.com es ITER ADVISORS S.L., sociedad inscrita con NIF B42960849, con domicilio social en Calle Balmes 77, Principal 2a, 08007 Barcelona.\n\nInscrita en el Registro Mercantil de Barcelona, Tomo 47726, Folio 138, Hoja B560623, Inscripci\u00f3n 1.\n\nPara cualquier sugerencia, consulta o solicitud relacionada con este aviso legal o para cualquier informaci\u00f3n sobre el sitio web, no dude en ponerse en contacto con nosotros en la siguiente direcci\u00f3n: contact@iteradvisors.com",
    },
    {
      heading: "Propiedad Intelectual",
      content:
        "Todos los contenidos expuestos en esta p\u00e1gina web, incluyendo dise\u00f1os, textos, im\u00e1genes, logos, iconos, nombres comerciales, marcas y cualquier otra informaci\u00f3n que pueda ser utilizada con fines industriales y/o comerciales, est\u00e1n protegidos por los correspondientes derechos de autor.\n\nQueda estrictamente prohibida la reproducci\u00f3n, transmisi\u00f3n o almacenamiento de esta informaci\u00f3n sin la autorizaci\u00f3n previa del titular, ITER ADVISORS S.L.\n\nEl usuario podr\u00e1 utilizar la informaci\u00f3n \u00fanicamente para la gesti\u00f3n de sus pedidos y los datos de contacto asociados.",
    },
    {
      heading: "Enlaces de Hipertexto",
      content:
        "ITER ADVISORS S.L. no asume ninguna responsabilidad sobre los enlaces a otros sitios o p\u00e1ginas web que pudieran incluirse en este sitio web, dado que no tiene ning\u00fan control sobre dichos sitios.\n\nEl usuario accede a estos sitios bajo su propia responsabilidad y de acuerdo con las condiciones de uso establecidas en los mismos.",
    },
  ],
};

// ---------------------------------------------------------------------------
// POLITIQUE DE CONFIDENTIALITE / PRIVACY POLICY / POLITICA DE PRIVACIDAD
// ---------------------------------------------------------------------------

const privacyFr: LegalPageContent = {
  meta: {
    title: "Politique de confidentialit\u00e9 | Iter Advisors",
    description: "Politique de confidentialit\u00e9 du site Iter Advisors.",
  },
  h1: "Politique de confidentialit\u00e9",
  sections: [
    {
      heading: "Introduction",
      content:
        "La pr\u00e9sente Politique de Confidentialit\u00e9 a \u00e9t\u00e9 \u00e9labor\u00e9e en tenant compte des dispositions en vigueur de la Loi Organique sur la Protection des Donn\u00e9es \u00e0 Caract\u00e8re Personnel, ainsi que du R\u00e8glement 2016/679 du Parlement Europ\u00e9en et du Conseil, du 27 avril 2016, relatif \u00e0 la protection des personnes physiques \u00e0 l\u2019\u00e9gard du traitement des donn\u00e9es \u00e0 caract\u00e8re personnel et \u00e0 la libre circulation de ces donn\u00e9es, ci-apr\u00e8s RGPD.\n\nLa pr\u00e9sente Politique de Confidentialit\u00e9 a pour objet d\u2019informer les titulaires des donn\u00e9es \u00e0 caract\u00e8re personnel recueillies sur les aspects concrets relatifs \u00e0 leur traitement, en particulier les finalit\u00e9s pour lesquelles elles sont trait\u00e9es, les coordonn\u00e9es pour l\u2019exercice de leurs droits, le d\u00e9lai de conservation de l\u2019information et les mesures de s\u00e9curit\u00e9 mises en \u0153uvre.",
    },
    {
      heading: "Responsable du Traitement",
      content:
        "En mati\u00e8re de protection des donn\u00e9es, ITER ADVISORS, S.L. a la consid\u00e9ration de Responsable du Traitement pour les fichiers et traitements identifi\u00e9s dans cette politique, en particulier dans la section de traitement des donn\u00e9es.\n\nInformations sur le responsable\u00a0:\n\u2022 Responsable du traitement\u00a0: ITER ADVISORS, S.L.\n\u2022 Adresse postale\u00a0: Calle Balmes 77, Principal 2a, 08007 Barcelone\n\u2022 Adresse e-mail\u00a0: contact@iteradvisors.com",
    },
    {
      heading: "Traitements des Donn\u00e9es",
      content:
        "Les donn\u00e9es personnelles sollicit\u00e9es seront uniquement celles strictement n\u00e9cessaires pour identifier et r\u00e9pondre \u00e0 la demande du titulaire, ci-apr\u00e8s l\u2019int\u00e9ress\u00e9. Ces donn\u00e9es seront trait\u00e9es de mani\u00e8re loyale, licite et transparente. De m\u00eame, les donn\u00e9es collect\u00e9es seront utilis\u00e9es pour des finalit\u00e9s d\u00e9termin\u00e9es, explicites et l\u00e9gitimes, et ne feront pas l\u2019objet d\u2019un traitement ult\u00e9rieur incompatible avec lesdites finalit\u00e9s.\n\nLes donn\u00e9es recueillies seront ad\u00e9quates, pertinentes et limit\u00e9es aux fins pour lesquelles elles sont collect\u00e9es, et seront mises \u00e0 jour si n\u00e9cessaire.\n\nL\u2019int\u00e9ress\u00e9 sera inform\u00e9, pr\u00e9alablement \u00e0 la collecte de ses donn\u00e9es, des principes g\u00e9n\u00e9raux r\u00e9gul\u00e9s par la pr\u00e9sente politique afin qu\u2019il donne son consentement expr\u00e8s, pr\u00e9cis et sans \u00e9quivoque pour le traitement de celles-ci.",
    },
    {
      heading: "Finalit\u00e9s du Traitement",
      content:
        "Les finalit\u00e9s sp\u00e9cifiques de chaque op\u00e9ration de traitement figurent dans les clauses informatives incluses dans les diff\u00e9rents moyens de collecte de donn\u00e9es (formulaires en ligne, formulaires papier, annonces ou notes informatives).\n\nN\u00e9anmoins, les donn\u00e9es personnelles seront utilis\u00e9es exclusivement pour donner une r\u00e9ponse efficace aux demandes de l\u2019utilisateur, d\u00e9finies en fonction du service ou syst\u00e8me de collecte utilis\u00e9.",
    },
    {
      heading: "L\u00e9gitimation",
      content:
        "En r\u00e8gle g\u00e9n\u00e9rale, ITER ADVISORS, S.L. recueille le consentement expr\u00e8s et sans \u00e9quivoque de l\u2019int\u00e9ress\u00e9 pr\u00e9alablement \u00e0 tout traitement de ses donn\u00e9es \u00e0 caract\u00e8re personnel, au moyen de clauses informatives int\u00e9gr\u00e9es dans les diff\u00e9rents syst\u00e8mes de collecte.\n\nSi le consentement n\u2019est pas requis, le traitement sera fond\u00e9 sur un fondement juridique ou r\u00e9glementaire qui autorise ou exige le traitement des donn\u00e9es de l\u2019int\u00e9ress\u00e9.",
    },
    {
      heading: "Destinataires",
      content:
        "En r\u00e8gle g\u00e9n\u00e9rale, ITER ADVISORS, S.L. ne c\u00e8de pas de donn\u00e9es \u00e0 des tiers, sauf obligation l\u00e9gale. En cas de n\u00e9cessit\u00e9 de cession de donn\u00e9es \u00e0 des tiers, l\u2019int\u00e9ress\u00e9 en sera inform\u00e9 au travers des clauses de consentement incluses dans les syst\u00e8mes de collecte de donn\u00e9es personnelles.",
    },
    {
      heading: "Origine des Donn\u00e9es",
      content:
        "En r\u00e8gle g\u00e9n\u00e9rale, les donn\u00e9es personnelles sont collect\u00e9es directement aupr\u00e8s de l\u2019int\u00e9ress\u00e9. Cependant, dans certains cas, elles peuvent \u00eatre obtenues par le biais de tiers ou de services externes. L\u2019int\u00e9ress\u00e9 en sera inform\u00e9 dans un d\u00e9lai raisonnable et, au plus tard, dans un d\u00e9lai d\u2019un mois \u00e0 compter de la collecte des donn\u00e9es.",
    },
    {
      heading: "Dur\u00e9e de Conservation",
      content:
        "L\u2019information sera conserv\u00e9e pendant le temps n\u00e9cessaire \u00e0 l\u2019accomplissement de la finalit\u00e9 pour laquelle elle a \u00e9t\u00e9 collect\u00e9e. Une fois la finalit\u00e9 atteinte, les donn\u00e9es seront supprim\u00e9es.\n\nApr\u00e8s la suppression, les donn\u00e9es resteront bloqu\u00e9es et seules les autorit\u00e9s publiques, les juges et les tribunaux pourront y acc\u00e9der en cas de responsabilit\u00e9 l\u00e9gale pendant le d\u00e9lai de prescription. Une fois ce d\u00e9lai \u00e9coul\u00e9, les donn\u00e9es seront d\u00e9finitivement d\u00e9truites.\n\n\u00c0 titre indicatif, les d\u00e9lais l\u00e9gaux de conservation des donn\u00e9es sont les suivants\u00a0:\n\n\u2022 Documentation sociale et de s\u00e9curit\u00e9 sociale\u00a0: 4 ans (Article 21 du D\u00e9cret Royal L\u00e9gislatif 5/2000)\n\u2022 Documentation comptable et fiscale \u00e0 fins commerciales\u00a0: 6 ans (Article 30 du Code de Commerce)\n\u2022 Documentation comptable et fiscale \u00e0 fins fiscales\u00a0: 4 ans (Articles 66 \u00e0 70 de la Loi G\u00e9n\u00e9rale des Imp\u00f4ts)\n\u2022 Contr\u00f4le d\u2019acc\u00e8s aux b\u00e2timents\u00a0: 1 mois (Instruction AEPD 1/1996)\n\u2022 Vid\u00e9osurveillance\u00a0: 1 mois (Instruction AEPD 1/2006, Loi Organique 4/1997)",
    },
    {
      heading: "Donn\u00e9es de Navigation",
      content:
        "Les donn\u00e9es de navigation recueillies \u00e0 travers le site web seront trait\u00e9es conform\u00e9ment \u00e0 la r\u00e9glementation applicable. Pour plus d\u2019informations, consultez la Politique de Cookies publi\u00e9e sur le site web.",
    },
    {
      heading: "Droits des Int\u00e9ress\u00e9s",
      content:
        "La r\u00e9glementation relative \u00e0 la protection des donn\u00e9es conf\u00e8re une s\u00e9rie de droits aux int\u00e9ress\u00e9s\u00a0:\n\n\u2022 Droit d\u2019acc\u00e8s\u00a0: obtenir des informations sur le traitement de ses donn\u00e9es, les finalit\u00e9s, les destinataires, la dur\u00e9e de conservation et l\u2019origine des donn\u00e9es.\n\n\u2022 Droit de rectification\u00a0: corriger des donn\u00e9es inexactes ou incompl\u00e8tes.\n\n\u2022 Droit de suppression\u00a0: obtenir la suppression des donn\u00e9es dans certains cas\u00a0: lorsque les donn\u00e9es ne sont plus n\u00e9cessaires, lorsque l\u2019int\u00e9ress\u00e9 retire son consentement, lorsque l\u2019int\u00e9ress\u00e9 s\u2019oppose au traitement, lorsque les donn\u00e9es doivent \u00eatre supprim\u00e9es pour respecter une obligation l\u00e9gale, ou lorsque les donn\u00e9es ont \u00e9t\u00e9 collect\u00e9es dans le cadre d\u2019un service num\u00e9rique conform\u00e9ment \u00e0 l\u2019article 8, paragraphe 1, du RGPD.\n\n\u2022 Droit d\u2019opposition\u00a0: s\u2019opposer au traitement fond\u00e9 sur le consentement.\n\n\u2022 Droit \u00e0 la limitation du traitement\u00a0: dans certains cas, lorsque l\u2019exactitude des donn\u00e9es est contest\u00e9e, lorsque le traitement est illicite mais l\u2019int\u00e9ress\u00e9 s\u2019oppose \u00e0 la suppression, lorsque l\u2019entreprise n\u2019a plus besoin des donn\u00e9es mais l\u2019int\u00e9ress\u00e9 en a besoin pour une r\u00e9clamation, ou lorsque l\u2019int\u00e9ress\u00e9 s\u2019est oppos\u00e9 au traitement, dans l\u2019attente de la v\u00e9rification de la l\u00e9gitimit\u00e9 de celui-ci.\n\n\u2022 Droit \u00e0 la portabilit\u00e9\u00a0: obtention de donn\u00e9es dans un format structur\u00e9 pouvant \u00eatre transf\u00e9r\u00e9 \u00e0 un autre responsable du traitement lorsque le traitement est fond\u00e9 sur le consentement et r\u00e9alis\u00e9 par des moyens automatis\u00e9s.\n\n\u2022 Droit de recours\u00a0: pr\u00e9senter une r\u00e9clamation aupr\u00e8s de l\u2019autorit\u00e9 de contr\u00f4le comp\u00e9tente.\n\nL\u2019int\u00e9ress\u00e9 pourra exercer ses droits par demande \u00e9crite adress\u00e9e \u00e0 ITER ADVISORS, S.L., Calle Balmes 77, Principal 2a, 08007 Barcelone, en pr\u00e9cisant dans l\u2019objet le droit qu\u2019il souhaite exercer. ITER ADVISORS, S.L. traitera la demande dans les d\u00e9lais \u00e9tablis par la r\u00e9glementation en vigueur.",
    },
    {
      heading: "S\u00e9curit\u00e9",
      content:
        "Les mesures de s\u00e9curit\u00e9 adopt\u00e9es par ITER ADVISORS, S.L. sont conformes aux dispositions de l\u2019article 32 du RGPD. Ces mesures tiennent compte des avanc\u00e9es technologiques, des co\u00fbts de mise en \u0153uvre et de la nature, de la port\u00e9e et des finalit\u00e9s du traitement des donn\u00e9es, afin de garantir un niveau de s\u00e9curit\u00e9 ad\u00e9quat.\n\nITER ADVISORS, S.L. a mis en place des m\u00e9canismes pour\u00a0:\n\u2022 Garantir la confidentialit\u00e9, l\u2019int\u00e9grit\u00e9 et la disponibilit\u00e9 des syst\u00e8mes et services de traitement.\n\u2022 R\u00e9tablir rapidement l\u2019acc\u00e8s aux donn\u00e9es en cas d\u2019incident physique ou technique.\n\u2022 V\u00e9rifier, \u00e9valuer et am\u00e9liorer p\u00e9riodiquement l\u2019efficacit\u00e9 des mesures de s\u00e9curit\u00e9.\n\u2022 Pseudonymiser et chiffrer les donn\u00e9es personnelles lorsque cela est n\u00e9cessaire.",
    },
  ],
};

const privacyEn: LegalPageContent = {
  meta: {
    title: "Privacy Policy | Iter Advisors",
    description: "Privacy policy for the Iter Advisors website.",
  },
  h1: "Privacy Policy",
  sections: [
    {
      heading: "Introduction",
      content:
        "This Privacy Policy has been drawn up taking into account the current provisions of the Organic Law on the Protection of Personal Data, as well as Regulation 2016/679 of the European Parliament and of the Council, of 27 April 2016, on the protection of natural persons with regard to the processing of personal data and the free movement of such data, hereinafter GDPR.\n\nThis Privacy Policy is intended to inform data subjects about the specific aspects of the processing of their personal data, in particular the purposes for which they are processed, the contact details for exercising their rights, the retention period of the information and the security measures implemented.",
    },
    {
      heading: "Data Controller",
      content:
        "In terms of data protection, ITER ADVISORS, S.L. is considered the Data Controller for the files and processing operations identified in this policy, in particular in the data processing section.\n\nInformation about the controller:\n\u2022 Data Controller: ITER ADVISORS, S.L.\n\u2022 Postal address: Calle Balmes 77, Principal 2a, 08007 Barcelona\n\u2022 Email address: contact@iteradvisors.com",
    },
    {
      heading: "Data Processing",
      content:
        "The personal data requested will only be that which is strictly necessary to identify and respond to the request of the data subject. This data will be processed fairly, lawfully and transparently. Likewise, the data collected will be used for specific, explicit and legitimate purposes, and will not be further processed in a manner incompatible with those purposes.\n\nThe data collected will be adequate, relevant and limited to the purposes for which they are collected, and will be updated if necessary.\n\nThe data subject will be informed, prior to the collection of their data, of the general principles regulated by this policy in order to give their express, precise and unequivocal consent for the processing thereof.",
    },
    {
      heading: "Processing Purposes",
      content:
        "The specific purposes of each processing operation are set out in the informative clauses included in the various data collection methods (online forms, paper forms, advertisements or informative notes).\n\nHowever, personal data will be used exclusively to provide an effective response to user requests, defined according to the service or collection system used.",
    },
    {
      heading: "Legitimization",
      content:
        "As a general rule, ITER ADVISORS, S.L. obtains the express and unequivocal consent of the data subject prior to any processing of their personal data, through informative clauses incorporated into the various collection systems.\n\nIf consent is not required, the processing will be based on a legal or regulatory basis that authorizes or requires the processing of the data subject's data.",
    },
    {
      heading: "Recipients",
      content:
        "As a general rule, ITER ADVISORS, S.L. does not share data with third parties, except by legal obligation. If it becomes necessary to share data with third parties, the data subject will be informed through the consent clauses included in the personal data collection systems.",
    },
    {
      heading: "Data Origin",
      content:
        "As a general rule, personal data is collected directly from the data subject. However, in certain cases, it may be obtained through third parties or external services. The data subject will be informed within a reasonable period and, at the latest, within one month from the date of data collection.",
    },
    {
      heading: "Data Retention",
      content:
        "The information will be retained for the time necessary to achieve the purpose for which it was collected. Once the purpose has been achieved, the data will be deleted.\n\nAfter deletion, the data will remain blocked and only public authorities, judges and courts will be able to access it in the event of legal liability during the limitation period. Once this period has elapsed, the data will be permanently destroyed.\n\nFor information purposes, the legal data retention periods are as follows:\n\n\u2022 Social and social security documentation: 4 years (Article 21 of Royal Legislative Decree 5/2000)\n\u2022 Accounting and tax documentation for commercial purposes: 6 years (Article 30 of the Commercial Code)\n\u2022 Accounting and tax documentation for tax purposes: 4 years (Articles 66 to 70 of the General Tax Law)\n\u2022 Building access control: 1 month (AEPD Instruction 1/1996)\n\u2022 Video surveillance: 1 month (AEPD Instruction 1/2006, Organic Law 4/1997)",
    },
    {
      heading: "Navigation Data",
      content:
        "Navigation data collected through the website will be processed in accordance with applicable regulations. For more information, please consult the Cookie Policy published on the website.",
    },
    {
      heading: "Data Subject Rights",
      content:
        "Data protection regulations confer a number of rights on data subjects:\n\n\u2022 Right of access: to obtain information on the processing of their data, the purposes, the recipients, the retention period and the origin of the data.\n\n\u2022 Right of rectification: to correct inaccurate or incomplete data.\n\n\u2022 Right of erasure: to obtain the deletion of data in certain cases: when the data is no longer necessary, when the data subject withdraws consent, when the data subject objects to the processing, when the data must be deleted to comply with a legal obligation, or when the data has been collected as part of a digital service in accordance with Article 8(1) of the GDPR.\n\n\u2022 Right of opposition: to object to processing based on consent.\n\n\u2022 Right to restrict processing: in certain cases, when the accuracy of the data is contested, when the processing is unlawful but the data subject objects to deletion, when the company no longer needs the data but the data subject needs it for a claim, or when the data subject has objected to the processing, pending verification of its legitimacy.\n\n\u2022 Right to portability: to obtain data in a structured format that can be transferred to another data controller when the processing is based on consent and carried out by automated means.\n\n\u2022 Right of recourse: to lodge a complaint with the competent supervisory authority.\n\nThe data subject may exercise their rights by written request addressed to ITER ADVISORS, S.L., Calle Balmes 77, Principal 2a, 08007 Barcelona, specifying in the subject the right they wish to exercise. ITER ADVISORS, S.L. will process the request within the deadlines established by current regulations.",
    },
    {
      heading: "Security",
      content:
        "The security measures adopted by ITER ADVISORS, S.L. comply with the provisions of Article 32 of the GDPR. These measures take into account technological advances, implementation costs and the nature, scope and purposes of data processing, in order to guarantee an adequate level of security.\n\nITER ADVISORS, S.L. has implemented mechanisms to:\n\u2022 Guarantee the confidentiality, integrity and availability of processing systems and services.\n\u2022 Rapidly restore access to data in the event of a physical or technical incident.\n\u2022 Regularly verify, evaluate and improve the effectiveness of security measures.\n\u2022 Pseudonymize and encrypt personal data when necessary.",
    },
  ],
};

const privacyEs: LegalPageContent = {
  meta: {
    title: "Pol\u00edtica de Privacidad | Iter Advisors",
    description: "Pol\u00edtica de privacidad del sitio web de Iter Advisors.",
  },
  h1: "Pol\u00edtica de Privacidad",
  sections: [
    {
      heading: "Introducci\u00f3n",
      content:
        "La presente Pol\u00edtica de Privacidad ha sido elaborada teniendo en cuenta las disposiciones vigentes de la Ley Org\u00e1nica de Protecci\u00f3n de Datos de Car\u00e1cter Personal, as\u00ed como el Reglamento 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protecci\u00f3n de las personas f\u00edsicas en lo que respecta al tratamiento de datos personales y a su libre circulaci\u00f3n, en adelante GDPR.\n\nLa presente Pol\u00edtica de Privacidad tiene por objeto informar a los titulares de los datos personales recogidos sobre los aspectos concretos relativos a su tratamiento, en particular las finalidades para las que se tratan, los datos de contacto para el ejercicio de sus derechos, el plazo de conservaci\u00f3n de la informaci\u00f3n y las medidas de seguridad implantadas.",
    },
    {
      heading: "Persona Responsable del Tratamiento",
      content:
        "En materia de protecci\u00f3n de datos, ITER ADVISORS, S.L. tiene la consideraci\u00f3n de Responsable del Tratamiento para los ficheros y tratamientos identificados en esta pol\u00edtica, en particular en el apartado de tratamiento de datos.\n\nInformaci\u00f3n sobre el controlador:\n\u2022 Responsable del tratamiento: ITER ADVISORS, S.L.\n\u2022 Direcci\u00f3n postal: Calle Balmes 77, Principal 2a, 08007 Barcelona\n\u2022 Direcci\u00f3n de correo electr\u00f3nico: contact@iteradvisors.com",
    },
    {
      heading: "Tratamiento de Datos",
      content:
        "Los datos personales solicitados ser\u00e1n \u00fanicamente los estrictamente necesarios para identificar y atender la solicitud del titular, en adelante el interesado. Estos datos ser\u00e1n tratados de forma leal, l\u00edcita y transparente. Asimismo, los datos recabados ser\u00e1n utilizados para finalidades determinadas, expl\u00edcitas y leg\u00edtimas, y no ser\u00e1n objeto de tratamiento posterior incompatible con dichas finalidades.\n\nLos datos recogidos ser\u00e1n adecuados, pertinentes y limitados a los fines para los que se recaban, y se actualizar\u00e1n en caso necesario.\n\nEl interesado ser\u00e1 informado, con car\u00e1cter previo a la recogida de sus datos, de los principios generales regulados por la presente pol\u00edtica a fin de que otorgue su consentimiento expreso, preciso e inequ\u00edvoco para el tratamiento de los mismos.",
    },
    {
      heading: "Finalidad del Tratamiento",
      content:
        "Las finalidades espec\u00edficas de cada operaci\u00f3n de tratamiento figuran en las cl\u00e1usulas informativas incluidas en los distintos medios de recogida de datos (formularios en l\u00ednea, formularios en papel, anuncios o notas informativas).\n\nNo obstante, los datos personales se utilizar\u00e1n exclusivamente para dar una respuesta eficaz a las solicitudes del usuario, definidas en funci\u00f3n del servicio o sistema de recogida utilizado.",
    },
    {
      heading: "Legitimaci\u00f3n",
      content:
        "Como regla general, ITER ADVISORS, S.L. recaba el consentimiento expreso e inequ\u00edvoco del interesado con car\u00e1cter previo a cualquier tratamiento de sus datos de car\u00e1cter personal, mediante cl\u00e1usulas informativas incorporadas en los distintos sistemas de recogida.\n\nSi no se requiere el consentimiento, el tratamiento se basar\u00e1 en un fundamento jur\u00eddico o reglamentario que autorice o exija el tratamiento de los datos del interesado.",
    },
    {
      heading: "Destinatarios",
      content:
        "Como norma general, ITER ADVISORS, S.L. no cede datos a terceros, salvo obligaci\u00f3n legal. En caso de ser necesaria la cesi\u00f3n de datos a terceros, se informar\u00e1 al interesado a trav\u00e9s de las cl\u00e1usulas de consentimiento incluidas en los sistemas de recogida de datos personales.",
    },
    {
      heading: "Origen de los Datos",
      content:
        "Por lo general, los datos personales se recogen directamente del interesado. Sin embargo, en determinados casos, pueden obtenerse a trav\u00e9s de terceros o servicios externos. Se informar\u00e1 al interesado en un plazo razonable y, a m\u00e1s tardar, en el plazo de un mes a partir de la recogida de los datos.",
    },
    {
      heading: "Caducidad",
      content:
        "La informaci\u00f3n se conservar\u00e1 durante el tiempo necesario para lograr el prop\u00f3sito para el que se recogi\u00f3. Una vez lograda la finalidad, los datos se suprimir\u00e1n.\n\nTras la supresi\u00f3n, los datos quedar\u00e1n bloqueados y s\u00f3lo podr\u00e1n acceder a ellos las autoridades p\u00fablicas, los jueces y los tribunales en caso de responsabilidad legal durante el plazo de prescripci\u00f3n. Una vez transcurrido este plazo, los datos se destruir\u00e1n definitivamente.\n\nA t\u00edtulo informativo, los per\u00edodos legales de conservaci\u00f3n de datos son los siguientes:\n\n\u2022 Documentaci\u00f3n de car\u00e1cter social o de seguridad social: 4 a\u00f1os (Art\u00edculo 21 del Real Decreto Legislativo 5/2000)\n\u2022 Documentaci\u00f3n contable y fiscal con fines comerciales: 6 a\u00f1os (Art\u00edculo 30 del C\u00f3digo de Comercio)\n\u2022 Documentaci\u00f3n contable y fiscal a efectos fiscales: 4 a\u00f1os (Art\u00edculos 66 a 70 de la Ley General Tributaria)\n\u2022 Control de acceso a edificios: 1 mes (Instrucci\u00f3n AEPD 1/1996)\n\u2022 Videovigilancia: 1 mes (Instrucci\u00f3n 1/2006 de la AEPD, Ley Org\u00e1nica 4/1997)",
    },
    {
      heading: "Datos de Navegaci\u00f3n",
      content:
        "Los datos de navegaci\u00f3n recogidos a trav\u00e9s del sitio web se tratar\u00e1n de conformidad con la normativa aplicable. Para m\u00e1s informaci\u00f3n, consulte la Pol\u00edtica de Cookies publicada en el sitio web.",
    },
    {
      heading: "Derechos de las Partes Interesadas",
      content:
        "La normativa sobre protecci\u00f3n de datos confiere una serie de derechos a los interesados:\n\n\u2022 Derecho de acceso: a obtener informaci\u00f3n sobre el tratamiento de sus datos, los fines, los destinatarios, el per\u00edodo de conservaci\u00f3n y el origen de los datos.\n\n\u2022 Derecho de rectificaci\u00f3n: para corregir datos inexactos o incompletos.\n\n\u2022 Derecho de supresi\u00f3n: obtener la supresi\u00f3n de los datos en determinados casos: cuando los datos ya no son necesarios, cuando el interesado retira su consentimiento, cuando el interesado se oponga al tratamiento, cuando los datos deban suprimirse para cumplir una obligaci\u00f3n legal, o cuando los datos se hayan recopilado como parte de un servicio digital de conformidad con el art\u00edculo 8, apartado 1, del RGPD.\n\n\u2022 Derecho de oposici\u00f3n: oponerse al tratamiento basado en el consentimiento.\n\n\u2022 Derecho a restringir el tratamiento: en determinados casos, cuando se cuestione la exactitud de los datos, cuando el tratamiento sea il\u00edcito pero el interesado se oponga a su supresi\u00f3n, cuando la empresa ya no necesita los datos pero el interesado los necesita para una reclamaci\u00f3n, o cuando el interesado se haya opuesto al tratamiento, a la espera de que se verifique la legitimidad del mismo.\n\n\u2022 Derecho a la portabilidad: obtenci\u00f3n de datos en un formato estructurado que pueda transferirse a otro responsable del tratamiento cuando el tratamiento se base en el consentimiento y se realice por medios automatizados.\n\n\u2022 Derecho de recurso: presentar una reclamaci\u00f3n ante la autoridad de control competente.\n\nEl interesado podr\u00e1 ejercitar sus derechos mediante solicitud escrita dirigida a ITER ADVISORS, S.L., Calle Balmes 77, Principal 2a, 08007 Barcelona, especificando en el asunto el derecho que desea ejercitar. ITER ADVISORS, S.L. atender\u00e1 la solicitud en los plazos establecidos por la normativa vigente.",
    },
    {
      heading: "Seguridad",
      content:
        "Las medidas de seguridad adoptadas por ITER ADVISORS, S.L. cumplen con lo dispuesto en el art\u00edculo 32 del RGPD. Estas medidas tienen en cuenta los avances tecnol\u00f3gicos, los costes de aplicaci\u00f3n y la naturaleza, el alcance y los fines del tratamiento de los datos, con el fin de garantizar un nivel de seguridad adecuado.\n\nITER ADVISORS, S.L. ha puesto en marcha mecanismos para:\n\u2022 Garantizar la confidencialidad, integridad y disponibilidad de los sistemas y servicios de tratamiento.\n\u2022 Restablecer r\u00e1pidamente el acceso a los datos en caso de incidente f\u00edsico o t\u00e9cnico.\n\u2022 Comprobar, evaluar y mejorar peri\u00f3dicamente la eficacia de las medidas de seguridad.\n\u2022 Pseudonimizar y cifrar los datos personales cuando sea necesario.",
    },
  ],
};

// ---------------------------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------------------------

export type LegalPageKey =
  | "mentions-legales"
  | "politique-de-confidentialite"
  | "legal-notice"
  | "privacy-policy"
  | "aviso-legal"
  | "politica-de-privacidad";

const legalPages: Record<LegalPageKey, LegalPageContent> = {
  "mentions-legales": mentionsLegalesFr,
  "politique-de-confidentialite": privacyFr,
  "legal-notice": legalNoticeEn,
  "privacy-policy": privacyEn,
  "aviso-legal": avisoLegalEs,
  "politica-de-privacidad": privacyEs,
};

export function getLegalContent(key: LegalPageKey): LegalPageContent {
  return legalPages[key];
}
