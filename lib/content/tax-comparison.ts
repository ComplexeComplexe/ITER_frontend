/** Rates checked against the linked tax authorities on 26 September 2026.
 * Keep translated articles on the same factual baseline. */
export const TAX_COMPARISON_MODIFIED = "2026-09-26";
export const TAX_COMPARISON_SLUG = "regimes-fiscaux-france-vs-espagne";
export const TAX_COMPARISON_PATHS = {
  fr: `/ressources/blog/${TAX_COMPARISON_SLUG}`,
  es: `/es/recursos/blog/${TAX_COMPARISON_SLUG}`,
};

export const TAX_SOURCES = {
  frIs: "https://www.impots.gouv.fr/international-professionnel/impot-sur-les-societes",
  frConditions: "https://entreprendre.service-public.gouv.fr/vosdroits/F23575?lang=fr",
  esIs: "https://sede.agenciatributaria.gob.es/Sede/ayuda/manuales-videos-folletos/manuales-practicos/folleto-actividades-economicas/4-impuesto-sobre-sociedades/4_3-tipo-gravamen-cuota-integra.html",
  frVat: "https://www.economie.gouv.fr/entreprises/gerer-sa-fiscalite-et-ses-impots/autres-impots-et-taxes/entreprises-ce-que-vous-devez-savoir-sur-la-tva",
  esVat: "https://www3.agenciatributaria.gob.es/Sede/iva/calculo-iva-repercutido-clientes/tipos-impositivos-iva.html",
  frPayroll: "https://www.urssaf.fr/accueil/outils-documentation/simulateurs/cotisations-employeur.html",
  esPayroll: "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/10721/10957/583?changeLanguage=es",
  beckham: "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a93",
} as const;

type Section = { id: string; title: string; paragraphs: string[]; table?: { headers: string[]; rows: string[][]; caption: string }; sources?: Array<keyof typeof TAX_SOURCES> };
type TaxContent = {
  title: string; description: string; category: string; authorRole: string; summary: string;
  sourcesLabel: string; checked: string; sourceLabels: Record<keyof typeof TAX_SOURCES, string>;
  sections: Section[]; faq: Array<{ question: string; answer: string }>;
  cta: { title: string; text: string; serviceHref: string; serviceLabel: string; contactHref: string; contactLabel: string };
};

export const taxComparison: Record<"fr" | "es", TaxContent> = {
  fr: {
    title: "Fiscalité France-Espagne : comparatif 2026",
    description: "IS, TVA et coût employeur en France et en Espagne : taux 2026, conditions des régimes réduits et méthode de comparaison avec sources officielles.",
    category: "Fiscalité internationale",
    authorRole: "Associé fondateur, CFO et investisseur, Iter Advisors",
    summary: "Le taux normal d’impôt sur les sociétés est de 25 % dans les deux pays. Les différences viennent des régimes réduits, de la base imposable, de la TVA et du coût complet des équipes. Il faut comparer une même activité et un même exercice, sans déduire une économie automatique du pays d’implantation.",
    sourcesLabel: "Sources officielles", checked: "Références et taux vérifiés le 26 septembre 2026. Les conditions s’apprécient pour chaque entreprise et chaque exercice.",
    sourceLabels: { frIs: "DGFiP : impôt sur les sociétés", frConditions: "Service Public : conditions du taux réduit français", esIs: "AEAT : taux de l’impôt sur les sociétés", frVat: "Ministère de l’Économie : TVA en France", esVat: "AEAT : taux de TVA en Espagne", frPayroll: "Urssaf : simulateur de cotisations employeur", esPayroll: "Seguridad Social : cotisations du régime général", beckham: "BOE : article 93, régime des impatriés" },
    sections: [
      { id: "impot-societes", title: "Impôt sur les sociétés : 25 % au taux normal, des régimes réduits sous conditions", paragraphs: [
        "En France, le taux normal de 25 % s’applique depuis les exercices ouverts en 2022. Le taux réduit de 15 % porte sur les premiers 42 500 € de bénéfice par période de douze mois, notamment sous conditions de chiffre d’affaires, de libération et de détention du capital. La contribution sociale de 3,3 % sur l’IS obéit à ses propres conditions et à un abattement : elle ne transforme pas le taux normal de toutes les PME en 25,83 %.",
        "En Espagne, il faut distinguer le taux général, les petites entreprises, les microentreprises et les sociétés nouvellement créées. Le tableau ci-dessous concerne les périodes fiscales ouvertes en 2026 et les sociétés relevant du régime commun ; les régimes foraux et autres situations particulières demandent une analyse distincte."
      ], table: { caption: "Repères d’IS pour 2026, à appliquer à la base imposable et sous conditions", headers: ["Situation", "France", "Espagne, régime commun"], rows: [
        ["Taux normal", "25 %", "25 %"],
        ["Petites entreprises éligibles", "15 % jusqu’à 42 500 € de bénéfice, puis 25 %", "23 % pour les entités de dimension réduite éligibles en 2026"],
        ["Microentreprises espagnoles, CA antérieur inférieur à 1 M€", "Pas de régime identique : vérifier l’éligibilité au taux réduit français", "19 % jusqu’à 50 000 € de base imposable, puis 21 % en 2026"],
        ["Nouvelles sociétés éligibles", "Le seul fait de créer une société ne fixe pas son taux", "15 % au premier exercice à base imposable positive et au suivant"],
        ["Entreprises émergentes espagnoles éligibles", "Régimes français à examiner séparément", "15 % au premier exercice bénéficiaire sous ce statut et aux trois suivants, si les conditions restent réunies"]
      ] }, sources: ["frIs", "frConditions", "esIs"] },
      { id: "tva", title: "TVA : 20 % en France métropolitaine et 21 % en Espagne", paragraphs: [
        "Les taux normaux sont proches, mais le traitement dépend du bien ou service et du lieu d’imposition. Les taux réduits français sont notamment 10 % et 5,5 %, avec un taux particulier de 2,1 %. En Espagne, les taux réduits sont 10 % et 4 %, avec un taux zéro pour certaines opérations. Ces repères espagnols ne couvrent pas les territoires ayant une fiscalité indirecte distincte.",
        "Une facture entre deux entreprises de l’Union européenne ne se traite pas en choisissant simplement le taux le plus faible. Vérifiez le statut des parties, leurs numéros de TVA, la nature du flux, le lieu d’imposition et les éventuelles règles d’autoliquidation. Les seuils de franchise dépendent du régime et de l’activité : un montant unique ne convient pas à toutes les entreprises.",
        "Pour le budget, distinguez la TVA récupérable, la TVA non récupérable et le décalage d’encaissement ou de remboursement. Une différence de taux n’est pas nécessairement une différence de coût final."
      ], sources: ["frVat", "esVat"] },
      { id: "cotisations", title: "Cotisations sociales : comparer le coût employeur poste par poste", paragraphs: [
        "Un pourcentage forfaitaire de charges patronales ne permet pas de comparer deux recrutements. Le salaire, le statut, les plafonds, le contrat, l’activité et les réductions applicables modifient le calcul. Il faut aussi séparer les cotisations employeur des retenues supportées par le salarié.",
        "Construisez deux budgets sur douze mois avec le même poste, le même niveau d’expérience et les mêmes avantages. Ajoutez salaire fixe, variable, charges patronales, avantages, recrutement et frais liés à l’organisation. Conservez la date et les hypothèses de chaque simulation. Aucune économie annuelle par salarié ne peut être annoncée sans ce calcul."
      ], sources: ["frPayroll", "esPayroll"] },
      { id: "regimes-speciaux", title: "Microentreprise, indépendants et régime Beckham : distinguer les bénéficiaires", paragraphs: [
        "Le régime français de la microentreprise concerne une activité individuelle et ne se confond pas avec le taux réduit d’IS d’une société. En Espagne, le statut d’autónomo, ses obligations fiscales et ses cotisations doivent être examinés séparément des règles applicables à une SL. Une comparaison fiable part du statut réellement envisagé et de ses conditions d’accès.",
        "Le régime espagnol des impatriés, souvent appelé loi Beckham, concerne des personnes physiques éligibles. Il ne réduit pas l’impôt sur les sociétés d’une filiale. Le motif du déplacement, la résidence fiscale antérieure, les revenus concernés et le délai d’option doivent être vérifiés. Notre [guide du régime Beckham](/ressources/fiscalite/beckham-law) détaille ces points ; la règle applicable figure à l’article 93 de la loi espagnole sur l’IRPF.",
        "L’impôt personnel du dirigeant, l’IS de l’entreprise et le coût des salariés sont trois calculs distincts. Une résidence ou une structure ne se choisit pas en comparant seulement deux taux marginaux."
      ], sources: ["beckham"] },
      { id: "profil", title: "Quelle organisation comparer selon votre activité ?", paragraphs: [
        "Commencez par les clients, les équipes, la direction effective, les contrats et les flux de facturation. Chiffrez ensuite les scénarios compatibles avec cette réalité opérationnelle. Créer une deuxième société ajoute notamment des obligations comptables, des coûts de gestion et des opérations intragroupe à documenter.",
        "Pour une activité dans les deux pays, le [guide de la double imposition France-Espagne](/ressources/fiscalite/double-imposition-france-espagne) aide à identifier les questions à soumettre aux conseils fiscaux. Le [pilotage financier d’une filiale espagnole](/ressources/blog/filiale-espagnole-pilotage-financier) porte sur l’organisation du reporting, du cash et des responsabilités."
      ], table: { caption: "Trois situations de travail, sans recommandation automatique de pays ou de structure", headers: ["Situation", "Calcul à préparer", "Décision à documenter"], rows: [
        ["PME ouvrant une activité en Espagne", "Budget commercial, équipe, fiscalité et coûts de gestion", "Organisation locale et responsabilités"],
        ["Startup préparant son financement", "Trésorerie, pertes fiscales, conditions des régimes applicables", "Structure compatible avec l’activité et le financement"],
        ["Groupe présent dans les deux pays", "Flux intragroupe, marges par entité et trésorerie consolidée", "Conventions, prix de transfert et contrôles"]
      ] } }
    ],
    faq: [
      { question: "L’Espagne est-elle toujours moins imposée que la France pour une entreprise ?", answer: "Non. Le taux normal d’IS est de 25 % dans les deux pays. Le coût final dépend du bénéfice imposable, des régimes applicables, des équipes, des flux et de la structure. Il faut établir une simulation adaptée à l’activité." },
      { question: "Faut-il créer une holding pour travailler entre les deux pays ?", answer: "Pas automatiquement. Le besoin dépend de l’actionnariat, du financement, des activités et des flux entre sociétés. Un seuil de chiffre d’affaires seul ne suffit pas à justifier une holding." },
      { question: "Que peut préparer un DAF externalisé ?", answer: "Le DAF rassemble les données, chiffre les scénarios et leurs effets sur la trésorerie, puis coordonne les échanges avec les experts-comptables et conseils fiscaux. Les choix juridiques et fiscaux sont examinés avec ces professionnels avant leur mise en œuvre." }
    ],
    cta: { title: "Préparer un budget France-Espagne exploitable", text: "Rassemblez vos comptes, effectifs, flux entre pays et calendrier. Nous pouvons cadrer le pilotage financier et les questions à traiter avec vos conseils fiscaux, sans promettre une économie avant simulation.", serviceHref: "/daf-externalise", serviceLabel: "Découvrir les missions de DAF externalisé", contactHref: "/contact#daf", contactLabel: "Décrire votre projet" }
  },
  es: {
    title: "Fiscalidad Francia-España: comparativa 2026",
    description: "IS, IVA y coste laboral en Francia y España: tipos de 2026, requisitos de los regímenes reducidos y método de comparación con fuentes oficiales.",
    category: "Fiscalidad internacional", authorRole: "Cofundador, CFO e inversor, Iter Advisors",
    summary: "El tipo general del Impuesto sobre Sociedades es del 25 % en ambos países. Las diferencias dependen de los regímenes reducidos, la base imponible, el IVA y el coste completo del equipo. Compare la misma actividad y el mismo ejercicio, sin asumir un ahorro automático por el país de establecimiento.",
    sourcesLabel: "Fuentes oficiales", checked: "Referencias y tipos comprobados el 26 de septiembre de 2026. Los requisitos se valoran para cada empresa y ejercicio.",
    sourceLabels: { frIs: "DGFiP: Impuesto sobre Sociedades francés", frConditions: "Service Public: requisitos del tipo reducido francés", esIs: "AEAT: tipos del Impuesto sobre Sociedades", frVat: "Ministerio de Economía: IVA en Francia", esVat: "AEAT: tipos de IVA en España", frPayroll: "Urssaf: simulador de cotizaciones empresariales", esPayroll: "Seguridad Social: cotizaciones del régimen general", beckham: "BOE: artículo 93, régimen de impatriados" },
    sections: [
      { id: "impuesto-sociedades", title: "Impuesto sobre Sociedades: 25 % general y tipos reducidos con requisitos", paragraphs: [
        "En Francia, el tipo general del 25 % se aplica desde los ejercicios iniciados en 2022. El 15 % reducido alcanza los primeros 42.500 € de beneficio por periodo de doce meses, sujeto, entre otros requisitos, a facturación, desembolso y titularidad del capital. La contribución social del 3,3 % sobre el impuesto tiene condiciones y una reducción de base propias: no convierte el tipo general de todas las pymes en un 25,83 %.",
        "En España deben diferenciarse el tipo general, las entidades de reducida dimensión, las microempresas y las entidades de nueva creación. El cuadro se refiere a periodos impositivos iniciados en 2026 y al régimen común; los regímenes forales y otras situaciones especiales requieren un análisis específico."
      ], table: { caption: "Referencias de IS para 2026, aplicables a la base imponible y sujetas a requisitos", headers: ["Situación", "Francia", "España, régimen común"], rows: [
        ["Tipo general", "25 %", "25 %"],
        ["Pequeñas empresas que cumplen los requisitos", "15 % hasta 42.500 € de beneficio y 25 % sobre el resto", "23 % para las entidades de reducida dimensión elegibles en 2026"],
        ["Microempresas españolas, cifra de negocios anterior inferior a 1 M€", "No existe una equivalencia directa: comprobar el tipo reducido francés", "19 % hasta 50.000 € de base imponible y 21 % sobre el resto en 2026"],
        ["Entidades de nueva creación elegibles", "La constitución por sí sola no determina el tipo", "15 % en el primer periodo con base imponible positiva y en el siguiente"],
        ["Empresas emergentes elegibles", "Examinar por separado los regímenes franceses", "15 % en el primer periodo con base positiva bajo este estatuto y los tres siguientes, manteniendo los requisitos"]
      ] }, sources: ["frIs", "frConditions", "esIs"] },
      { id: "iva", title: "IVA: 20 % en Francia metropolitana y 21 % en España", paragraphs: [
        "Los tipos generales son próximos, pero el tratamiento depende del bien o servicio y del lugar de tributación. Francia aplica tipos reducidos del 10 % y del 5,5 %, y un tipo particular del 2,1 %. En España existen tipos reducidos del 10 % y del 4 %, además del tipo cero en determinadas operaciones. Estas referencias españolas no cubren territorios con fiscalidad indirecta distinta.",
        "Una factura entre empresas de la Unión Europea no se resuelve escogiendo el tipo más bajo. Compruebe la condición de las partes, los números de IVA, la naturaleza de la operación, su localización y la posible inversión del sujeto pasivo. Los umbrales y las exenciones dependen de la actividad y del régimen: una cifra única no sirve para todas las empresas.",
        "En el presupuesto, separe IVA deducible, IVA no deducible y desfases de cobro o devolución. Una diferencia de tipo no implica necesariamente una diferencia de coste final."
      ], sources: ["frVat", "esVat"] },
      { id: "cotizaciones", title: "Cotizaciones sociales: comparar el coste empresarial de cada puesto", paragraphs: [
        "Un porcentaje fijo de cargas sociales no basta para comparar dos contrataciones. Salario, bases, topes, contrato, actividad y reducciones cambian el cálculo. También deben separarse las aportaciones empresariales de las retenciones del trabajador.",
        "Prepare dos presupuestos de doce meses para el mismo puesto, experiencia y beneficios. Incluya salario fijo, variable, cotizaciones empresariales, beneficios, contratación y costes de organización. Guarde la fecha y las hipótesis de cada simulación. No puede prometerse un ahorro anual por empleado sin este cálculo."
      ], sources: ["frPayroll", "esPayroll"] },
      { id: "regimenes-especiales", title: "Microempresa, autónomos y ley Beckham: distinguir a quién se aplican", paragraphs: [
        "El régimen francés de microentreprise corresponde a una actividad individual y no equivale al tipo reducido de IS de una sociedad. En España, la condición de autónomo, sus obligaciones fiscales y sus cotizaciones deben analizarse por separado de las reglas de una SL. La comparación parte del estatuto previsto y de sus requisitos de acceso.",
        "El régimen de impatriados, conocido como ley Beckham, se dirige a personas físicas elegibles. No reduce el Impuesto sobre Sociedades de una filial. Deben comprobarse el motivo del traslado, la residencia fiscal previa, las rentas afectadas y el plazo de opción. La [guía de la ley Beckham](/es/services/ley-beckham) explica estos puntos; la norma se encuentra en el artículo 93 de la Ley del IRPF.",
        "La tributación personal del directivo, el impuesto de la sociedad y el coste de los empleados son tres cálculos distintos. No se decide una residencia o estructura comparando únicamente dos tipos marginales."
      ], sources: ["beckham"] },
      { id: "tu-perfil", title: "¿Qué organización comparar según su actividad?", paragraphs: [
        "Empiece por los clientes, el equipo, la dirección efectiva, los contratos y los flujos de facturación. Después presupueste escenarios compatibles con esa realidad. Crear una segunda sociedad añade obligaciones contables, costes de gestión y operaciones vinculadas que documentar.",
        "Para una actividad en ambos países, identifique con sus asesores fiscales el tratamiento de cada flujo antes de ejecutar una reestructuración. El CFO coordina presupuestos, tesorería y reporting entre entidades para que las decisiones puedan basarse en datos comparables."
      ], table: { caption: "Tres situaciones de trabajo, sin recomendar automáticamente un país o una estructura", headers: ["Situación", "Cálculo que preparar", "Decisión que documentar"], rows: [
        ["Pyme que inicia actividad en España", "Presupuesto comercial, equipo, fiscalidad y gestión", "Organización local y responsabilidades"],
        ["Startup que prepara financiación", "Tesorería, pérdidas fiscales y regímenes aplicables", "Estructura compatible con actividad y financiación"],
        ["Grupo presente en ambos países", "Flujos vinculados, márgenes por entidad y tesorería consolidada", "Acuerdos, precios de transferencia y controles"]
      ] } }
    ],
    faq: [
      { question: "¿España siempre tiene menos impuestos que Francia para una empresa?", answer: "No. El tipo general de IS es del 25 % en ambos países. El coste final depende de la base imponible, los regímenes aplicables, el equipo, los flujos y la estructura. Hace falta una simulación adaptada a la actividad." },
      { question: "¿Hace falta una holding para trabajar entre ambos países?", answer: "No automáticamente. Depende del accionariado, la financiación, las actividades y los flujos entre sociedades. Un umbral de facturación por sí solo no justifica una holding." },
      { question: "¿Qué puede preparar un CFO externo?", answer: "El CFO reúne los datos, presupuesta escenarios y efectos sobre la tesorería y coordina a los asesores contables y fiscales. Las decisiones jurídicas y fiscales se examinan con esos profesionales antes de ejecutarlas." }
    ],
    cta: { title: "Preparar un presupuesto Francia-España útil", text: "Reúna cuentas, plantilla, flujos entre países y calendario. Podemos definir el control financiero y las cuestiones que tratar con sus asesores fiscales, sin prometer ahorros antes de simularlos.", serviceHref: "/es/externalizacion-daf", serviceLabel: "Conocer las funciones del CFO externo", contactHref: "/es/contact", contactLabel: "Describir su proyecto" }
  }
};
