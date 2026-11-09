import type { Locale } from "@/lib/i18n";
import { DOCUMENTED_CASES } from "./documented-cases";
import { parityHref } from "@/lib/locale-route-map";

interface CaseTranslation {
  metaTitle: string; title: string; summary: string; proof: string; sectorTag: string;
  description: string; challenge: string; solution: string; results: string[];
  deliverables: string[]; limits: string; offerLabel: string; sourceLabel?: string; relatedLabel?: string;
}
const translations: Record<"en" | "es", CaseTranslation[]> = {
  en: [
    {
      metaTitle: "SolarMente: finance and fundraising | Iter Advisors",
      title: "SolarMente: preparing finance for fundraising and an acquisition",
      summary: "Financial modelling, a data room, board reporting and financial integration: the work of a Fractional CFO in a growing cleantech business.",
      proof: "Multiple-scenario financial model, data room and board reporting",
      sectorTag: "Cleantech / Energy",
      description: "A Spanish cleantech scale-up growing rapidly and expanding from Spain to the United States. The finance function needed to be built to support an international funding round: there was no multiple-scenario model or consolidated investor reporting, and the finance tools needed integration.",
      challenge: "Manage an international Series B in an unstable regulatory and macroeconomic environment, while also pursuing an acquisition and building a finance function that did not yet exist at this scale.",
      solution: "Strategic finance leadership and management of the finance function. Series B financial preparation: multiple-scenario modelling with decision triggers, data room, coordination of due diligence, valuation and term sheet negotiations. Execution of the Eltex acquisition in 2024, from sourcing to finance integration. Integration of Stripe, Payhawk, PayFit and Vuala. Weekly involvement and participation in management committees and board meetings.",
      results: ["Financial preparation for international fundraising", "Eltex acquisition in 2024 and integration of the finance function", "Multiple-scenario model, data room and cash control procedures implemented"],
      deliverables: ["Multiple-scenario financial model and decision criteria", "Data room and tracking of due diligence questions", "Board reporting and cash control procedures", "Financial integration of the Eltex acquisition in 2024"],
      limits: "The case covers 2022–2024. The transactions involved management, investors and their advisers. The role described here is finance leadership; their success cannot be attributed solely to Iter's support.",
      offerLabel: "Fundraising support", sourceLabel: "Testimonial by Victor Gardrinier, SolarMente co-founder, on Trustfolio",
    },
    {
      metaTitle: "Seasonly: channel margins and cash | Iter Advisors",
      title: "Seasonly finance handover and margin reporting by channel",
      summary: "How Iter took over finance at Seasonly and set up reporting on margins by channel, inventory and cash flow.",
      proof: "Channel P&Ls and weekly cash flow monitoring",
      sectorTag: "D2C / Beauty",
      description: "In November 2024, the departure of Seasonly’s finance lead prompted a handover. The beauty brand needed to keep track of cash and report to investors while expanding.",
      challenge: "Get a weekly view of cash before committing to inventory purchases or new openings.",
      solution: "After the handover, Iter reviewed cash flows, inventory and reporting in December 2024. In January 2025, the team set up dashboards and profit and loss accounts by channel. Weekly cash flow and working capital monitoring followed.",
      results: ["Continuity of the finance function after the handover", "Profit and loss accounts by channel to track margins", "Weekly reporting and cash flow forecasts"],
      deliverables: ["Review of cash flows, inventory and reporting", "Profit and loss accounts by channel for studios, retail, e-commerce and B2B", "Weekly dashboards and cash flow forecast", "Monitoring of working capital requirements"],
      limits: "This case describes the work and deliverables. The public testimonial from management addresses continuity of the finance function.",
      offerLabel: "Fractional CFO for e-commerce", relatedLabel: "management accounting support",
      sourceLabel: "Testimonial from Seasonly’s management on Trustfolio",
    },
    {
      metaTitle: "Opti Digital: building the finance function | Iter Advisors",
      title: "Opti Digital: building a finance function over time",
      summary: "ERP migration, reporting, closing and non-dilutive financing: how Iter supports an adtech SME in building its finance function.",
      proof: "Structured finance function and non-dilutive financing", sectorTag: "Adtech / Media",
      description: "An advertising monetisation company building its organisation: a finance function to establish, an ERP to migrate, complex tax and legal matters not covered internally, and a need to finance growth without issuing equity.",
      challenge: "Build a reliable finance function and closing process while migrating the ERP, without diluting the founders to fund growth.",
      solution: "ERP migration and structuring of the finance function. Support on complex tax and legal matters in conjunction with external advisers. Non-dilutive financing obtained. Participation in strategic decisions, including constructively challenging management's assumptions.",
      results: ["Structured finance function: monthly reporting and closing procedures", "ERP migration completed", "Non-dilutive financing obtained without issuing equity", "Five years of continuous support, as described in the testimonial dated 12 November 2025"],
      deliverables: ["Monthly reporting and closing procedures", "ERP migration and organisation of finance processes", "Support for non-dilutive financing", "Coordination of tax and legal matters with external advisers"],
      limits: "The CEO's testimonial, published on 12 November 2025, describes five years of collaboration at that date. The results on this page remain qualitative: no financing amount or quantified productivity improvement is stated.",
      offerLabel: "Part-time CFO for an SME", sourceLabel: "Testimonial by Magali Quentel-Reme, Opti Digital CEO, on Trustfolio",
    },
  ],
  es: [
    {
      metaTitle: "SolarMente: financiación y tesorería | Iter Advisors",
      title: "SolarMente: preparar las finanzas para una ronda y una adquisición",
      summary: "Modelo financiero, data room, reporting al consejo e integración financiera: el trabajo de un CFO externo en una cleantech en crecimiento.",
      proof: "Modelo con varios escenarios, data room y reporting al consejo", sectorTag: "Cleantech / Energía",
      description: "Scale-up cleantech española en rápido crecimiento, con expansión de España a Estados Unidos. Había que construir la función financiera para una ronda internacional: no existía un modelo con varios escenarios ni reporting consolidado para inversores, y era necesario integrar las herramientas financieras.",
      challenge: "Gestionar una Serie B internacional en un entorno regulatorio y macroeconómico inestable, al tiempo que se realizaba una adquisición y se estructuraba una función financiera que todavía no existía a esa escala.",
      solution: "Dirección financiera estratégica y gestión de la función financiera. Preparación financiera de la Serie B: modelo con varios escenarios y criterios de decisión, data room, coordinación de due diligence, valoración y negociación de term sheets. Ejecución de la adquisición de Eltex en 2024, desde la búsqueda hasta la integración financiera. Integración de Stripe, Payhawk, PayFit y Vuala. Intervención semanal y participación en comités de dirección y reuniones del consejo.",
      results: ["Preparación financiera de la ronda internacional", "Adquisición de Eltex en 2024 e integración de la función financiera", "Implantación de un modelo con varios escenarios, data room y procedimientos de control de tesorería"],
      deliverables: ["Modelo financiero con varios escenarios y criterios de decisión", "Data room y seguimiento de preguntas de due diligence", "Reporting al consejo y procedimientos de control de tesorería", "Integración financiera de la adquisición de Eltex en 2024"],
      limits: "El caso abarca el periodo 2022–2024. Las operaciones implicaron a los directivos, los inversores y sus asesores. Aquí se describe la función de dirección financiera; el éxito no puede atribuirse únicamente al asesoramiento de Iter.",
      offerLabel: "Asesoramiento en rondas de financiación", sourceLabel: "Testimonio de Victor Gardrinier, cofundador de SolarMente, en Trustfolio",
    },
    {
      metaTitle: "Seasonly: márgenes por canal y circulante | Iter Advisors",
      title: "Seasonly, del traspaso financiero al seguimiento del margen por canal",
      summary: "Cómo Iter asumió la dirección financiera de Seasonly e implantó el seguimiento del margen por canal, las existencias y la tesorería.",
      proof: "Cuentas de resultados por canal y seguimiento semanal de tesorería",
      sectorTag: "D2C / Belleza",
      description: "En noviembre de 2024, la salida de la responsable financiera de Seasonly hizo necesario un traspaso. La marca de belleza debía seguir controlando la tesorería e informando a sus inversores en plena expansión.",
      challenge: "Tener una visión semanal de la tesorería antes de comprometer compras de existencias o nuevas aperturas.",
      solution: "Tras el traspaso, Iter revisó los flujos, las existencias y los informes en diciembre de 2024. En enero de 2025, el equipo implantó los cuadros de mando y las cuentas de resultados por canal. Después estableció un seguimiento semanal de la tesorería y del circulante.",
      results: ["Continuidad de la función financiera tras el traspaso", "Cuentas de resultados por canal para seguir el margen", "Informes y previsiones semanales de tesorería"],
      deliverables: ["Revisión de flujos, existencias e informes", "Cuentas de resultados por canal para estudios, retail, comercio electrónico y B2B", "Cuadros de mando y previsión de tesorería semanales", "Seguimiento de las necesidades de capital circulante"],
      limits: "El caso describe los trabajos y entregables del encargo. El testimonio público de la dirección se refiere a la continuidad de la función financiera.",
      offerLabel: "CFO externo para e-commerce", relatedLabel: "control de gestión externo",
      sourceLabel: "Testimonio de la dirección de Seasonly en Trustfolio",
    },
    {
      metaTitle: "Opti Digital: dirección financiera | Iter Advisors",
      title: "Opti Digital: estructurar la función financiera a largo plazo",
      summary: "Migración del ERP, reporting, cierre y financiación no dilutiva: cómo Iter ayuda a una pyme adtech a estructurar su función financiera.",
      proof: "Función financiera estructurada y financiación no dilutiva", sectorTag: "Adtech / Medios",
      description: "Empresa de monetización publicitaria en fase de estructuración: función financiera por construir, ERP por migrar, asuntos fiscales y jurídicos complejos no cubiertos internamente y necesidad de financiar el crecimiento sin abrir el capital.",
      challenge: "Construir una función financiera y un proceso de cierre fiables mientras se migra el ERP, sin diluir a los fundadores para financiar el crecimiento.",
      solution: "Migración del ERP y estructuración de la función financiera. Apoyo en asuntos fiscales y jurídicos complejos, en coordinación con asesores externos. Obtención de financiación no dilutiva. Participación en las decisiones estratégicas, cuestionando de forma constructiva las hipótesis de la dirección.",
      results: ["Función financiera estructurada: reporting mensual y procedimientos de cierre", "Migración del ERP completada", "Financiación no dilutiva obtenida sin abrir el capital", "Cinco años de asesoramiento continuo, según el testimonio del 12 de noviembre de 2025"],
      deliverables: ["Reporting mensual y procedimientos de cierre", "Migración del ERP y organización de los procesos financieros", "Apoyo a la financiación no dilutiva", "Coordinación de asuntos fiscales y jurídicos con asesores externos"],
      limits: "El testimonio de la CEO, publicado el 12 de noviembre de 2025, describe cinco años de colaboración en esa fecha. Los resultados de esta página son cualitativos: no se anuncia ningún importe de financiación ni mejora de productividad cuantificada.",
      offerLabel: "CFO a tiempo parcial para una pyme", sourceLabel: "Testimonio de Magali Quentel-Reme, CEO de Opti Digital, en Trustfolio",
    },
  ],
};

export function getReviewedCases(locale: Locale) {
  return DOCUMENTED_CASES.map((item, index) => {
    if (locale === "fr") return item;
    const t = translations[locale][index];
    return { ...item, ...t, href: parityHref(item.href, locale), modified: item.modified > "2026-10-02" ? item.modified : "2026-10-02",
      offer: { href: parityHref(item.offer.href, locale), label: t.offerLabel },
      ...("source" in item ? { source: { href: item.source.href, label: t.sourceLabel! } } : {}),
      ...("relatedService" in item ? { relatedService: { href: parityHref(item.relatedService.href, locale), label: t.relatedLabel! } } : {}),
      quote: undefined, quoteAuthor: undefined, quoteRole: undefined,
    };
  });
}
export const getReviewedCase = (slug: string, locale: Locale) => getReviewedCases(locale).find(item => item.href.split("/").pop() === slug);

export const caseInterface = {
  fr: { resources: "Ressources", cases: "Cas clients", case: "Cas client", by: "Par", published: "Publié le", updated: "Mis à jour le", situation: "La situation de départ", need: "Le besoin du dirigeant", work: "Le travail réalisé par Iter", outputs: "Les livrables de la mission", results: "Les résultats et leur portée", feedback: "Le retour du client", feedbackText: "Consultez le témoignage de la direction sur la plateforme d’avis.", comparable: "Un besoin comparable dans votre entreprise ?", ctaText: "Le premier échange sert à identifier vos priorités, les livrables utiles et le profil adapté. Le périmètre et le budget sont définis avant le démarrage.", offer: "Missions d’un DAF externalisé pour PME et startups", prices: "Tarifs et périmètres", contact: "Décrire mon besoin", channelText: "Pour mettre en place un P&L par canal et une revue régulière des marges, découvrez notre" },
  en: { resources: "Resources", cases: "Case studies", case: "Case study", by: "By", published: "Published", updated: "Updated", situation: "The starting situation", need: "Management's need", work: "The work carried out by Iter", outputs: "Engagement deliverables", results: "Results and their scope", feedback: "Client feedback", feedbackText: "Read management's testimonial on the review platform.", comparable: "A similar need in your business?", ctaText: "The initial conversation identifies your priorities, useful deliverables and the appropriate profile. Scope and budget are agreed before work begins.", offer: "Fractional CFO responsibilities for SMEs and startups", prices: "Fees and scope", contact: "Describe my needs", channelText: "To implement channel P&Ls and regular margin reviews, explore our" },
  es: { resources: "Recursos", cases: "Casos de éxito", case: "Caso de cliente", by: "Por", published: "Publicado el", updated: "Actualizado el", situation: "La situación inicial", need: "La necesidad de la dirección", work: "El trabajo realizado por Iter", outputs: "Los entregables del encargo", results: "Los resultados y su alcance", feedback: "La opinión del cliente", feedbackText: "Consulte el testimonio de la dirección en la plataforma de opiniones.", comparable: "¿Una necesidad similar en su empresa?", ctaText: "La primera conversación identifica sus prioridades, los entregables útiles y el perfil adecuado. El alcance y el presupuesto se definen antes de comenzar.", offer: "Funciones de un CFO externo para pymes y startups", prices: "Honorarios y alcance", contact: "Describir mi necesidad", channelText: "Para implantar cuentas de resultados por canal y revisar regularmente los márgenes, descubra nuestro" },
};
