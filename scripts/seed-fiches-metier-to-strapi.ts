/**
 * Seed fiches métier (job-metiers) in Strapi in FR, EN and ES.
 * Loads STRAPI_* from .env.local / .env. Run: npm run seed:fiches-metier
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFiles() {
  const root = resolve(process.cwd());
  for (const name of [".env.local", ".env"]) {
    const path = resolve(root, name);
    if (existsSync(path)) {
      const content = readFileSync(path, "utf8");
      for (const line of content.split("\n")) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
        if (m && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
        }
      }
    }
  }
}
loadEnvFiles();

import { dafSubContent } from "../lib/content/daf-sub";
import type { StrapiBlock, StrapiParagraphBlock, StrapiHeadingBlock, StrapiTextNode } from "../lib/static-content";

// API base URL: Strapi REST API is at the root, not under /admin
const rawStrapiUrl = process.env.STRAPI_API_URL || "http://localhost:1337";
const STRAPI_URL = rawStrapiUrl.replace(/\/admin\/?$/, "") || rawStrapiUrl;
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || "";

function paragraph(text: string): StrapiParagraphBlock {
  return { type: "paragraph", children: [{ type: "text", text }] as StrapiTextNode[] };
}
function heading(level: 1 | 2 | 3, text: string): StrapiHeadingBlock {
  return { type: "heading", level, children: [{ type: "text", text }] as StrapiTextNode[] };
}

function sectionsToBlocks(sections: { heading?: string; content: string[] }[]): StrapiBlock[] {
  const blocks: StrapiBlock[] = [];
  for (const section of sections) {
    if (section.heading) blocks.push(heading(2, section.heading));
    for (const p of section.content) blocks.push(paragraph(p));
  }
  return blocks;
}

type FicheLocale = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  content: StrapiBlock[];
};

// 10 fiches métier : slug commun, contenu par locale (fr, en, es)
const FICHES_METIER: Array<{
  slug: string;
  fr: FicheLocale;
  en: FicheLocale;
  es: FicheLocale;
}> = [
  {
    slug: "directeur-administratif-et-financier-daf",
    fr: {
      title: "Directeur Administratif et Financier (DAF)",
      metaTitle: "Fiche métier DAF | Iter Advisors",
      metaDescription: "Découvrez le métier de DAF : rôle, missions, compétences clés et évolution du poste.",
      content: sectionsToBlocks(dafSubContent.fr.metier.sections),
    },
    en: {
      title: "Chief Financial Officer (CFO)",
      metaTitle: "CFO job description | Iter Advisors",
      metaDescription: "Discover the CFO role: responsibilities, key skills and how the position has evolved.",
      content: sectionsToBlocks(dafSubContent.en.metier.sections),
    },
    es: {
      title: "Director Financiero (CFO)",
      metaTitle: "Perfil Director Financiero | Iter Advisors",
      metaDescription: "Descubra el rol del Director Financiero: responsabilidades, competencias clave y evolución.",
      content: sectionsToBlocks(dafSubContent.es.metier.sections),
    },
  },
  {
    slug: "responsable-administratif-et-financier-raf",
    fr: {
      title: "Responsable Administratif et Financier (RAF)",
      metaTitle: "Fiche métier RAF | Iter Advisors",
      metaDescription: "Rôle, missions et compétences du RAF en entreprise.",
      content: [
        heading(2, "Qu'est-ce qu'un RAF ?"),
        paragraph("Le RAF assure la gestion opérationnelle de la fonction finance : comptabilité, trésorerie, reporting."),
        heading(2, "Missions principales"),
        paragraph("Tenue de la comptabilité, clôtures, suivi de trésorerie, tableaux de bord et reporting."),
        heading(2, "Compétences clés"),
        paragraph("Normes comptables, ERP, Excel, rigueur et respect des délais réglementaires."),
      ],
    },
    en: {
      title: "Finance & Administration Manager (FAM)",
      metaTitle: "Finance Manager job description | Iter Advisors",
      metaDescription: "Role, missions and skills of the Finance & Administration Manager.",
      content: [
        heading(2, "What is a Finance & Administration Manager?"),
        paragraph("The FAM handles day-to-day finance operations: accounting, treasury, and reporting under the CFO or CEO."),
        heading(2, "Key responsibilities"),
        paragraph("Accounting, month-end and year-end close, cash management, dashboards and management reporting."),
        heading(2, "Key skills"),
        paragraph("Accounting standards, ERP, Excel, rigor and ability to meet regulatory deadlines."),
      ],
    },
    es: {
      title: "Responsable Administrativo y Financiero (RAF)",
      metaTitle: "Perfil RAF | Iter Advisors",
      metaDescription: "Rol, misiones y competencias del Responsable Administrativo y Financiero.",
      content: [
        heading(2, "¿Qué es un RAF?"),
        paragraph("El RAF asegura la gestión operativa de la función financiera: contabilidad, tesorería, reporting."),
        heading(2, "Misiones principales"),
        paragraph("Contabilidad, cierres mensuales y anuales, seguimiento de tesorería, cuadros de mando y reporting."),
        heading(2, "Competencias clave"),
        paragraph("Normas contables, ERP, Excel, rigor y respeto de los plazos reglamentarios."),
      ],
    },
  },
  {
    slug: "controleur-de-gestion",
    fr: {
      title: "Contrôleur de gestion",
      metaTitle: "Fiche métier Contrôleur de gestion | Iter Advisors",
      metaDescription: "Pilotage de la performance, budgets et reporting.",
      content: [
        heading(2, "Rôle du contrôleur de gestion"),
        paragraph("Il construit et anime le pilotage de la performance : budgets, prévisionnels, analyse des écarts et tableaux de bord."),
        heading(2, "Missions"),
        paragraph("Élaboration du budget et des prévisionnels, suivi des KPIs, reporting management."),
        heading(2, "Compétences"),
        paragraph("Analyse de données, BI, esprit de synthèse et communication avec les métiers."),
      ],
    },
    en: {
      title: "Management Controller",
      metaTitle: "Management Controller job description | Iter Advisors",
      metaDescription: "Performance management, budgeting and reporting.",
      content: [
        heading(2, "Role of the Management Controller"),
        paragraph("They design and run performance management: budgets, forecasts, variance analysis and dashboards."),
        heading(2, "Responsibilities"),
        paragraph("Budget and forecast preparation, KPI monitoring, management reporting."),
        heading(2, "Skills"),
        paragraph("Data analysis, BI tools, synthesis and communication with business units."),
      ],
    },
    es: {
      title: "Controller de gestión",
      metaTitle: "Perfil Controller de gestión | Iter Advisors",
      metaDescription: "Pilotaje del rendimiento, presupuestos y reporting.",
      content: [
        heading(2, "Rol del Controller de gestión"),
        paragraph("Construye y anima el pilotaje del rendimiento: presupuestos, previsiones, análisis de desviaciones y cuadros de mando."),
        heading(2, "Misiones"),
        paragraph("Elaboración del presupuesto y previsiones, seguimiento de KPIs, reporting de gestión."),
        heading(2, "Competencias"),
        paragraph("Análisis de datos, BI, síntesis y comunicación con los métiers."),
      ],
    },
  },
  {
    slug: "credit-manager",
    fr: {
      title: "Credit Manager",
      metaTitle: "Fiche métier Credit Manager | Iter Advisors",
      metaDescription: "Gestion du risque client et du recouvrement.",
      content: [
        heading(2, "Qu'est-ce qu'un Credit Manager ?"),
        paragraph("Il pilote la politique de crédit client et le recouvrement, en limitant le risque d'impayés."),
        heading(2, "Missions"),
        paragraph("Plafonds et délais de paiement, suivi des encours, relances, contentieux et reporting risque client."),
        heading(2, "Compétences"),
        paragraph("Droit des affaires, recouvrement, négociation, analyse de la solvabilité."),
      ],
    },
    en: {
      title: "Credit Manager",
      metaTitle: "Credit Manager job description | Iter Advisors",
      metaDescription: "Customer credit risk and collections management.",
      content: [
        heading(2, "What is a Credit Manager?"),
        paragraph("They oversee credit policy and collections, limiting the risk of bad debt while preserving customer relationships."),
        heading(2, "Responsibilities"),
        paragraph("Credit limits and payment terms, receivables monitoring, collections, disputes and risk reporting."),
        heading(2, "Skills"),
        paragraph("Business law, collections procedures, negotiation, credit analysis."),
      ],
    },
    es: {
      title: "Credit Manager",
      metaTitle: "Perfil Credit Manager | Iter Advisors",
      metaDescription: "Gestión del riesgo de crédito y del cobro.",
      content: [
        heading(2, "¿Qué es un Credit Manager?"),
        paragraph("Gestiona la política de crédito y el cobro, limitando el riesgo de impagos."),
        heading(2, "Misiones"),
        paragraph("Límites y plazos de pago, seguimiento de saldos, gestiones de cobro, litigios y reporting de riesgo."),
        heading(2, "Competencias"),
        paragraph("Derecho mercantil, procedimientos de cobro, negociación, análisis de solvencia."),
      ],
    },
  },
  {
    slug: "tresorier",
    fr: {
      title: "Trésorier",
      metaTitle: "Fiche métier Trésorier | Iter Advisors",
      metaDescription: "Gestion de la trésorerie et des financements.",
      content: [
        heading(2, "Rôle du trésorier"),
        paragraph("Il assure la gestion des flux de trésorerie, des financements et des relations bancaires."),
        heading(2, "Missions"),
        paragraph("Prévisionnel de trésorerie, BFR, lignes de crédit, placement des excédents, risques de taux et de change."),
        heading(2, "Compétences"),
        paragraph("Produits de trésorerie, marchés financiers, outils de cash management, négociation."),
      ],
    },
    en: {
      title: "Treasurer",
      metaTitle: "Treasurer job description | Iter Advisors",
      metaDescription: "Cash and funding management.",
      content: [
        heading(2, "Role of the Treasurer"),
        paragraph("They manage cash flows, funding and banking relationships, ensuring liquidity and optimizing cost of debt."),
        heading(2, "Responsibilities"),
        paragraph("Cash flow forecasting, working capital, credit lines, surplus investment, interest and FX risk."),
        heading(2, "Skills"),
        paragraph("Treasury products, financial markets, cash management tools, negotiation."),
      ],
    },
    es: {
      title: "Tesorero",
      metaTitle: "Perfil Tesorero | Iter Advisors",
      metaDescription: "Gestión de la tesorería y de los financiamientos.",
      content: [
        heading(2, "Rol del tesorero"),
        paragraph("Asegura la gestión de los flujos de tesorería, financiaciones y relaciones bancarias."),
        heading(2, "Misiones"),
        paragraph("Previsional de tesorería, fondo de maniobra, líneas de crédito, colocación de excedentes, riesgo de tipo y cambio."),
        heading(2, "Competencias"),
        paragraph("Productos de tesorería, mercados financieros, herramientas de cash management, negociación."),
      ],
    },
  },
  {
    slug: "responsable-consolidation",
    fr: {
      title: "Responsable consolidation",
      metaTitle: "Fiche métier Responsable consolidation | Iter Advisors",
      metaDescription: "Consolidation des comptes et reporting groupe.",
      content: [
        heading(2, "Rôle"),
        paragraph("Il prépare les comptes consolidés du groupe et le reporting destiné à la direction et aux actionnaires."),
        heading(2, "Missions"),
        paragraph("Collecte des données des filiales, éliminations, normes IFRS ou françaises, support aux auditeurs."),
        heading(2, "Compétences"),
        paragraph("Normes de consolidation, outils et ERP, rigueur, animation d'un réseau de correspondants."),
      ],
    },
    en: {
      title: "Consolidation Manager",
      metaTitle: "Consolidation Manager job description | Iter Advisors",
      metaDescription: "Group consolidation and reporting.",
      content: [
        heading(2, "Role"),
        paragraph("They prepare the group's consolidated accounts and financial reporting for management and shareholders."),
        heading(2, "Responsibilities"),
        paragraph("Subsidiary data collection, eliminations, IFRS or local GAAP, audit support."),
        heading(2, "Skills"),
        paragraph("Consolidation standards, tools and ERP, rigor, coordinating a network of contributors."),
      ],
    },
    es: {
      title: "Responsable de consolidación",
      metaTitle: "Perfil Responsable consolidación | Iter Advisors",
      metaDescription: "Consolidación de cuentas y reporting de grupo.",
      content: [
        heading(2, "Rol"),
        paragraph("Prepara los estados consolidados del grupo y el reporting para dirección y accionistas."),
        heading(2, "Misiones"),
        paragraph("Recogida de datos de filiales, eliminaciones, normas NIIF o locales, apoyo a auditores."),
        heading(2, "Competencias"),
        paragraph("Normas de consolidación, herramientas y ERP, rigor, animación de una red de corresponsales."),
      ],
    },
  },
  {
    slug: "expert-paie-et-administration-du-personnel",
    fr: {
      title: "Expert paie et administration du personnel",
      metaTitle: "Fiche métier Expert paie | Iter Advisors",
      metaDescription: "Paie, déclarations sociales et administration du personnel.",
      content: [
        heading(2, "Rôle de l'expert paie"),
        paragraph("Il assure le calcul des salaires, les déclarations sociales et l'administration du personnel."),
        heading(2, "Missions"),
        paragraph("Bulletins de paie, déclarations URSSAF, gestion des congés et absences, relation avec les organismes."),
        heading(2, "Compétences"),
        paragraph("Droit du travail, convention collective, logiciels de paie, discrétion et rigueur."),
      ],
    },
    en: {
      title: "Payroll & HR Administration Expert",
      metaTitle: "Payroll Expert job description | Iter Advisors",
      metaDescription: "Payroll, social security and HR administration.",
      content: [
        heading(2, "Role of the Payroll Expert"),
        paragraph("They handle payroll calculation, social security filings and part of HR administration."),
        heading(2, "Responsibilities"),
        paragraph("Pay slips, social security declarations, leave and absence management, liaison with authorities."),
        heading(2, "Skills"),
        paragraph("Labour law, collective agreements, payroll software, discretion and rigor."),
      ],
    },
    es: {
      title: "Experto en nóminas y administración de personal",
      metaTitle: "Perfil Experto nóminas | Iter Advisors",
      metaDescription: "Nóminas, declaraciones sociales y administración de personal.",
      content: [
        heading(2, "Rol del experto en nóminas"),
        paragraph("Asegura el cálculo de salarios, declaraciones sociales y parte de la administración de personal."),
        heading(2, "Misiones"),
        paragraph("Nóminas, declaraciones a la seguridad social, gestión de vacaciones y ausencias, relación con organismos."),
        heading(2, "Competencias"),
        paragraph("Derecho laboral, convenio colectivo, software de nóminas, discreción y rigor."),
      ],
    },
  },
  {
    slug: "auditeur-interne",
    fr: {
      title: "Auditeur interne",
      metaTitle: "Fiche métier Auditeur interne | Iter Advisors",
      metaDescription: "Contrôle interne et audit.",
      content: [
        heading(2, "Rôle de l'auditeur interne"),
        paragraph("Il évalue le contrôle interne et les processus pour identifier les risques et proposer des recommandations."),
        heading(2, "Missions"),
        paragraph("Plan d'audit, missions sur les processus financiers et opérationnels, rapports et suivi des plans d'action."),
        heading(2, "Compétences"),
        paragraph("Normes d'audit (IIA), analyse de processus, rédaction de rapports, indépendance et esprit critique."),
      ],
    },
    en: {
      title: "Internal Auditor",
      metaTitle: "Internal Auditor job description | Iter Advisors",
      metaDescription: "Internal control and audit.",
      content: [
        heading(2, "Role of the Internal Auditor"),
        paragraph("They assess internal control and processes to identify risks and recommend improvements."),
        heading(2, "Responsibilities"),
        paragraph("Audit plan, financial and operational process audits, reports and follow-up on action plans."),
        heading(2, "Skills"),
        paragraph("Audit standards (IIA), process analysis, report writing, independence and critical thinking."),
      ],
    },
    es: {
      title: "Auditor interno",
      metaTitle: "Perfil Auditor interno | Iter Advisors",
      metaDescription: "Control interno y auditoría.",
      content: [
        heading(2, "Rol del auditor interno"),
        paragraph("Evalúa el control interno y los procesos para identificar riesgos y proponer recomendaciones."),
        heading(2, "Misiones"),
        paragraph("Plan de auditoría, misiones sobre procesos financieros y operativos, informes y seguimiento de planes de acción."),
        heading(2, "Competencias"),
        paragraph("Normas de auditoría (IIA), análisis de procesos, redacción de informes, independencia y espíritu crítico."),
      ],
    },
  },
  {
    slug: "business-analyst-finance",
    fr: {
      title: "Business Analyst Finance",
      metaTitle: "Fiche métier Business Analyst Finance | Iter Advisors",
      metaDescription: "Analyse de données et pilotage par la donnée.",
      content: [
        heading(2, "Rôle du Business Analyst Finance"),
        paragraph("Il transforme les données financières et opérationnelles en indicateurs et analyses pour éclairer les décisions."),
        heading(2, "Missions"),
        paragraph("Modélisation de données, reportings et dashboards, analyse ad hoc, formation aux outils et aux KPIs."),
        heading(2, "Compétences"),
        paragraph("BI (Power BI, Looker), SQL, modélisation financière, dialogue avec la direction et les opérationnels."),
      ],
    },
    en: {
      title: "Finance Business Analyst",
      metaTitle: "Finance Business Analyst job description | Iter Advisors",
      metaDescription: "Data analysis and data-driven decision support.",
      content: [
        heading(2, "Role of the Finance Business Analyst"),
        paragraph("They turn financial and operational data into metrics and analysis to support decisions."),
        heading(2, "Responsibilities"),
        paragraph("Data modelling, reporting and dashboards, ad hoc analysis, training on tools and KPIs."),
        heading(2, "Skills"),
        paragraph("BI (Power BI, Looker), SQL, financial modelling, communication with management and operations."),
      ],
    },
    es: {
      title: "Business Analyst Finance",
      metaTitle: "Perfil Business Analyst Finance | Iter Advisors",
      metaDescription: "Análisis de datos y pilotaje por datos.",
      content: [
        heading(2, "Rol del Business Analyst Finance"),
        paragraph("Transforma los datos financieros y operativos en indicadores y análisis para apoyar las decisiones."),
        heading(2, "Misiones"),
        paragraph("Modelización de datos, reportings y cuadros de mando, análisis ad hoc, formación en herramientas y KPIs."),
        heading(2, "Competencias"),
        paragraph("BI (Power BI, Looker), SQL, modelización financiera, diálogo con dirección y operativos."),
      ],
    },
  },
  {
    slug: "directeur-de-la-performance",
    fr: {
      title: "Directeur de la performance",
      metaTitle: "Fiche métier Directeur de la performance | Iter Advisors",
      metaDescription: "Pilotage de la performance et stratégie.",
      content: [
        heading(2, "Rôle du Directeur de la performance"),
        paragraph("Il pilote la définition des objectifs, le suivi des KPIs et l'accompagnement des équipes pour atteindre les résultats."),
        heading(2, "Missions"),
        paragraph("Stratégie et objectifs, tableaux de bord, analyse des écarts, animation des revues et plans d'action."),
        heading(2, "Compétences"),
        paragraph("Vision stratégique, pilotage (budget, prévisionnel, KPIs), leadership et fédération des métiers."),
      ],
    },
    en: {
      title: "Chief Performance Officer / Performance Director",
      metaTitle: "Performance Director job description | Iter Advisors",
      metaDescription: "Performance management and strategy.",
      content: [
        heading(2, "Role of the Performance Director"),
        paragraph("They drive goal-setting, KPI monitoring and support teams to deliver results."),
        heading(2, "Responsibilities"),
        paragraph("Strategy and objectives, dashboards, variance analysis, review meetings and action plans."),
        heading(2, "Skills"),
        paragraph("Strategic vision, management (budget, forecast, KPIs), leadership and ability to align business units."),
      ],
    },
    es: {
      title: "Director de la performance",
      metaTitle: "Perfil Director de la performance | Iter Advisors",
      metaDescription: "Pilotaje del rendimiento y estrategia.",
      content: [
        heading(2, "Rol del Director de la performance"),
        paragraph("Pilota la definición de objetivos, el seguimiento de KPIs y el acompañamiento de los equipos para alcanzar resultados."),
        heading(2, "Misiones"),
        paragraph("Estrategia y objetivos, cuadros de mando, análisis de desviaciones, animación de revisiones y planes de acción."),
        heading(2, "Competencias"),
        paragraph("Visión estratégica, pilotaje (presupuesto, previsional, KPIs), liderazgo y federación de los métiers."),
      ],
    },
  },
];

async function createFicheLocale(
  slug: string,
  locale: string,
  data: FicheLocale,
  method: "POST" | "PUT",
  documentId?: string
): Promise<string | null> {
  const body = {
    data: {
      title: data.title,
      ...(method === "POST" ? { slug } : {}),
      content: data.content,
      faq: [],
      seo: {
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
      },
    },
  };

  const path =
    method === "POST"
      ? `api/job-metiers?locale=${encodeURIComponent(locale)}`
      : `api/job-metiers/${documentId}?locale=${encodeURIComponent(locale)}`;
  const url = `${STRAPI_URL.replace(/\/$/, "")}/${path}`;
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    const hint =
      res.status === 405
        ? " → Vérifiez dans Strapi : Settings → API Tokens → Job-métier → create (et createLocalization pour EN/ES)."
        : "";
    throw new Error(`Strapi ${method} failed ${res.status}: ${text.slice(0, 200)}${hint}`);
  }

  const json = await res.json();
  return json.data?.documentId ?? json.data?.id ?? null;
}

async function main() {
  if (!STRAPI_TOKEN) {
    console.error("Missing STRAPI_API_TOKEN. Set it in .env.local or .env");
    process.exit(1);
  }
  console.log("Seeding", FICHES_METIER.length, "fiches métier (FR + EN + ES) to Strapi at", STRAPI_URL);

  for (const fiche of FICHES_METIER) {
    try {
      const docId = await createFicheLocale(fiche.slug, "fr-FR", fiche.fr, "POST");
      if (docId) {
        console.log(`  ✅ [fr-FR] ${fiche.slug} → ${docId}`);
        try {
          await createFicheLocale(fiche.slug, "en", fiche.en, "PUT", docId);
          console.log(`  ✅ [en]    ${fiche.slug}`);
        } catch (e) {
          console.error(`  ❌ [en]    ${fiche.slug}:`, e);
        }
        try {
          await createFicheLocale(fiche.slug, "es-ES", fiche.es, "PUT", docId);
          console.log(`  ✅ [es-ES] ${fiche.slug}`);
        } catch (e) {
          console.error(`  ❌ [es-ES] ${fiche.slug}:`, e);
        }
      }
    } catch (e) {
      console.error(`  ❌ ${fiche.slug}:`, e);
    }
  }
  console.log("\nDone.");
}

main();
