"use client";

import { useState, useRef, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  TrendingUp,
  Wallet,
  Users,
  Briefcase,
  BarChart3,
  Calendar,
  Send,
  Shield,
  Star,
  FileText,
  PieChart,
  Target,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";

/* ─── i18n content ─── */
const qualContent = {
  fr: {
    badge: "Analyse approfondie",
    h1: "Qualifiez votre entreprise",
    h1Accent: "en 5 minutes",
    subtitle:
      "Répondez à nos questions pour recevoir une analyse personnalisée de votre maturité financière et des recommandations sur mesure.",
    trustLine: "+100 entreprises diagnostiquées",
    /* Sections */
    sections: [
      {
        id: "company",
        title: "Votre entreprise",
        icon: "building",
        questions: [
          {
            id: "sector",
            label: "Secteur d'activité",
            type: "select" as const,
            options: ["SaaS / Tech", "E-commerce", "Marketplace", "Services B2B", "Industrie", "Santé / Biotech", "Fintech", "Autre"],
            required: true,
          },
          {
            id: "creation_year",
            label: "Année de création",
            type: "select" as const,
            options: ["2024-2025", "2022-2023", "2020-2021", "2018-2019", "Avant 2018"],
            required: true,
          },
          {
            id: "employees",
            label: "Nombre de collaborateurs",
            type: "select" as const,
            options: ["1-5", "6-15", "16-50", "51-150", "150+"],
            required: true,
          },
          {
            id: "location",
            label: "Localisation du siège",
            type: "select" as const,
            options: ["France", "Espagne", "Autre pays UE", "Hors UE"],
            required: true,
          },
        ],
      },
      {
        id: "finance",
        title: "Situation financière",
        icon: "wallet",
        questions: [
          {
            id: "revenue",
            label: "Chiffre d'affaires annuel (€)",
            type: "select" as const,
            options: ["Pré-revenu", "< 500K", "500K – 2M", "2M – 10M", "10M+"],
            required: true,
          },
          {
            id: "funding_stage",
            label: "Dernier tour de financement",
            type: "select" as const,
            options: ["Bootstrappé", "Pre-Seed", "Seed", "Série A", "Série B+", "Non applicable"],
            required: true,
          },
          {
            id: "runway",
            label: "Runway actuel (mois de trésorerie)",
            type: "select" as const,
            options: ["< 3 mois", "3-6 mois", "6-12 mois", "12-18 mois", "18+ mois", "Non applicable"],
            required: true,
          },
          {
            id: "has_daf",
            label: "Avez-vous un DAF ou RAF en interne ?",
            type: "select" as const,
            options: ["Oui, à temps plein", "Oui, à temps partiel", "Non, c'est le CEO qui gère", "Non, c'est l'expert-comptable"],
            required: true,
          },
        ],
      },
      {
        id: "needs",
        title: "Vos besoins prioritaires",
        icon: "target",
        questions: [
          {
            id: "priorities",
            label: "Quels sont vos 3 enjeux prioritaires ?",
            type: "multiselect" as const,
            options: [
              "Préparer une levée de fonds",
              "Structurer le reporting financier",
              "Optimiser la trésorerie / cash-flow",
              "Mettre en place des KPIs",
              "Préparer un M&A / cession",
              "Automatiser les processus financiers",
              "Recruter un DAF / RAF",
              "Gérer la relation investisseurs",
              "Structurer la paie / RH",
              "Autre",
            ],
            required: true,
            maxSelect: 3,
          },
          {
            id: "tools",
            label: "Quels outils financiers utilisez-vous ?",
            type: "multiselect" as const,
            options: ["Pennylane", "Qonto / Shine", "Excel / Google Sheets", "Sage / Cegid", "ERP (SAP, Odoo...)", "Aucun outil structuré", "Autre"],
            required: false,
            maxSelect: 5,
          },
          {
            id: "timeline",
            label: "Quand souhaitez-vous démarrer ?",
            type: "select" as const,
            options: ["Immédiatement", "Dans le mois", "Dans le trimestre", "Pas de date précise"],
            required: true,
          },
          {
            id: "budget",
            label: "Budget mensuel envisagé pour un DAF externalisé",
            type: "select" as const,
            options: ["< 1 500€/mois", "1 500 – 3 000€/mois", "3 000 – 6 000€/mois", "6 000€+/mois", "Je ne sais pas encore"],
            required: false,
          },
        ],
      },
    ],
    /* Contact */
    contactTitle: "Dernière étape : vos coordonnées",
    contactSubtitle: "Pour recevoir votre analyse de maturité financière personnalisée.",
    fieldFirstName: "Prénom",
    fieldLastName: "Nom",
    fieldEmail: "Email professionnel",
    fieldPhone: "Téléphone",
    fieldRole: "Votre fonction",
    fieldCompany: "Nom de l'entreprise",
    roleOptions: ["CEO / Fondateur", "COO / DG", "DAF / RAF", "CFO", "Autre"],
    submitButton: "Recevoir mon analyse",
    /* Thank you */
    thankYouTitle: "Analyse en cours",
    thankYouSubtitle: "Un expert Iter Advisors va analyser vos réponses et vous enverra un rapport personnalisé sous 48h.",
    thankYouCTA: "Réserver un appel stratégique",
    thankYouCalendly: "Vous pouvez aussi réserver directement un appel de 30 min avec un Partner.",
    thankYouItems: [
      "Score de maturité financière",
      "Recommandations personnalisées",
      "Profil de DAF idéal pour votre situation",
    ],
    /* Navigation */
    nextButton: "Section suivante",
    prevButton: "Section précédente",
    sectionOf: "sur",
    privacyNote: "Vos données sont protégées. Consultez notre",
    privacyLink: "politique de confidentialité",
    requiredField: "Ce champ est requis",
    selectUpTo: "Sélectionnez jusqu'à",
    options: "options",
  },
  en: {
    badge: "In-depth analysis",
    h1: "Qualify your company",
    h1Accent: "in 5 minutes",
    subtitle:
      "Answer our questions to receive a personalized analysis of your financial maturity and tailored recommendations.",
    trustLine: "+100 companies assessed",
    sections: [
      {
        id: "company",
        title: "Your company",
        icon: "building",
        questions: [
          {
            id: "sector",
            label: "Industry",
            type: "select" as const,
            options: ["SaaS / Tech", "E-commerce", "Marketplace", "B2B Services", "Manufacturing", "Health / Biotech", "Fintech", "Other"],
            required: true,
          },
          {
            id: "creation_year",
            label: "Year founded",
            type: "select" as const,
            options: ["2024-2025", "2022-2023", "2020-2021", "2018-2019", "Before 2018"],
            required: true,
          },
          {
            id: "employees",
            label: "Number of employees",
            type: "select" as const,
            options: ["1-5", "6-15", "16-50", "51-150", "150+"],
            required: true,
          },
          {
            id: "location",
            label: "Headquarters location",
            type: "select" as const,
            options: ["France", "Spain", "Other EU country", "Outside EU"],
            required: true,
          },
        ],
      },
      {
        id: "finance",
        title: "Financial situation",
        icon: "wallet",
        questions: [
          {
            id: "revenue",
            label: "Annual revenue (€)",
            type: "select" as const,
            options: ["Pre-revenue", "< 500K", "500K – 2M", "2M – 10M", "10M+"],
            required: true,
          },
          {
            id: "funding_stage",
            label: "Last funding round",
            type: "select" as const,
            options: ["Bootstrapped", "Pre-Seed", "Seed", "Series A", "Series B+", "Not applicable"],
            required: true,
          },
          {
            id: "runway",
            label: "Current runway (months of cash)",
            type: "select" as const,
            options: ["< 3 months", "3-6 months", "6-12 months", "12-18 months", "18+ months", "Not applicable"],
            required: true,
          },
          {
            id: "has_daf",
            label: "Do you have an in-house CFO or Finance Manager?",
            type: "select" as const,
            options: ["Yes, full-time", "Yes, part-time", "No, the CEO handles it", "No, the accountant does"],
            required: true,
          },
        ],
      },
      {
        id: "needs",
        title: "Your priority needs",
        icon: "target",
        questions: [
          {
            id: "priorities",
            label: "What are your top 3 priorities?",
            type: "multiselect" as const,
            options: [
              "Prepare a fundraising round",
              "Structure financial reporting",
              "Optimize cash flow",
              "Implement KPIs",
              "Prepare an M&A / exit",
              "Automate financial processes",
              "Hire a CFO / Finance Manager",
              "Manage investor relations",
              "Structure payroll / HR",
              "Other",
            ],
            required: true,
            maxSelect: 3,
          },
          {
            id: "tools",
            label: "Which financial tools do you use?",
            type: "multiselect" as const,
            options: ["Pennylane", "Qonto / Shine", "Excel / Google Sheets", "Sage / Cegid", "ERP (SAP, Odoo...)", "No structured tool", "Other"],
            required: false,
            maxSelect: 5,
          },
          {
            id: "timeline",
            label: "When would you like to start?",
            type: "select" as const,
            options: ["Immediately", "Within a month", "Within a quarter", "No specific date"],
            required: true,
          },
          {
            id: "budget",
            label: "Monthly budget for an outsourced CFO",
            type: "select" as const,
            options: ["< €1,500/month", "€1,500 – €3,000/month", "€3,000 – €6,000/month", "€6,000+/month", "I don't know yet"],
            required: false,
          },
        ],
      },
    ],
    contactTitle: "Last step: your details",
    contactSubtitle: "To receive your personalized financial maturity analysis.",
    fieldFirstName: "First name",
    fieldLastName: "Last name",
    fieldEmail: "Professional email",
    fieldPhone: "Phone",
    fieldRole: "Your role",
    fieldCompany: "Company name",
    roleOptions: ["CEO / Founder", "COO / GM", "CFO / Finance Manager", "CFO", "Other"],
    submitButton: "Receive my analysis",
    thankYouTitle: "Analysis in progress",
    thankYouSubtitle: "An Iter Advisors expert will analyze your answers and send you a personalized report within 48h.",
    thankYouCTA: "Book a strategic call",
    thankYouCalendly: "You can also book a 30-min call directly with a Partner.",
    thankYouItems: [
      "Financial maturity score",
      "Personalized recommendations",
      "Ideal CFO profile for your situation",
    ],
    nextButton: "Next section",
    prevButton: "Previous section",
    sectionOf: "of",
    privacyNote: "Your data is protected. See our",
    privacyLink: "privacy policy",
    requiredField: "This field is required",
    selectUpTo: "Select up to",
    options: "options",
  },
  es: {
    badge: "Análisis en profundidad",
    h1: "Califique su empresa",
    h1Accent: "en 5 minutos",
    subtitle:
      "Responda a nuestras preguntas para recibir un análisis personalizado de su madurez financiera y recomendaciones a medida.",
    trustLine: "+100 empresas diagnosticadas",
    sections: [
      {
        id: "company",
        title: "Su empresa",
        icon: "building",
        questions: [
          {
            id: "sector",
            label: "Sector de actividad",
            type: "select" as const,
            options: ["SaaS / Tech", "E-commerce", "Marketplace", "Servicios B2B", "Industria", "Salud / Biotech", "Fintech", "Otro"],
            required: true,
          },
          {
            id: "creation_year",
            label: "Año de creación",
            type: "select" as const,
            options: ["2024-2025", "2022-2023", "2020-2021", "2018-2019", "Antes de 2018"],
            required: true,
          },
          {
            id: "employees",
            label: "Número de colaboradores",
            type: "select" as const,
            options: ["1-5", "6-15", "16-50", "51-150", "150+"],
            required: true,
          },
          {
            id: "location",
            label: "Ubicación de la sede",
            type: "select" as const,
            options: ["Francia", "España", "Otro país UE", "Fuera de UE"],
            required: true,
          },
        ],
      },
      {
        id: "finance",
        title: "Situación financiera",
        icon: "wallet",
        questions: [
          {
            id: "revenue",
            label: "Facturación anual (€)",
            type: "select" as const,
            options: ["Pre-ingresos", "< 500K", "500K – 2M", "2M – 10M", "10M+"],
            required: true,
          },
          {
            id: "funding_stage",
            label: "Última ronda de financiación",
            type: "select" as const,
            options: ["Bootstrapped", "Pre-Seed", "Seed", "Serie A", "Serie B+", "No aplicable"],
            required: true,
          },
          {
            id: "runway",
            label: "Runway actual (meses de tesorería)",
            type: "select" as const,
            options: ["< 3 meses", "3-6 meses", "6-12 meses", "12-18 meses", "18+ meses", "No aplicable"],
            required: true,
          },
          {
            id: "has_daf",
            label: "¿Tiene un DAF o RAF interno?",
            type: "select" as const,
            options: ["Sí, a tiempo completo", "Sí, a tiempo parcial", "No, el CEO se encarga", "No, el contable se encarga"],
            required: true,
          },
        ],
      },
      {
        id: "needs",
        title: "Sus necesidades prioritarias",
        icon: "target",
        questions: [
          {
            id: "priorities",
            label: "¿Cuáles son sus 3 prioridades?",
            type: "multiselect" as const,
            options: [
              "Preparar una ronda de financiación",
              "Estructurar el reporting financiero",
              "Optimizar la tesorería / cash-flow",
              "Implementar KPIs",
              "Preparar un M&A / cesión",
              "Automatizar procesos financieros",
              "Contratar un DAF / RAF",
              "Gestionar relaciones con inversores",
              "Estructurar nóminas / RRHH",
              "Otro",
            ],
            required: true,
            maxSelect: 3,
          },
          {
            id: "tools",
            label: "¿Qué herramientas financieras utiliza?",
            type: "multiselect" as const,
            options: ["Pennylane", "Qonto / Shine", "Excel / Google Sheets", "Sage / Cegid", "ERP (SAP, Odoo...)", "Ninguna herramienta estructurada", "Otro"],
            required: false,
            maxSelect: 5,
          },
          {
            id: "timeline",
            label: "¿Cuándo desea comenzar?",
            type: "select" as const,
            options: ["Inmediatamente", "En el mes", "En el trimestre", "Sin fecha precisa"],
            required: true,
          },
          {
            id: "budget",
            label: "Presupuesto mensual para un DAF externalizado",
            type: "select" as const,
            options: ["< 1.500€/mes", "1.500 – 3.000€/mes", "3.000 – 6.000€/mes", "6.000€+/mes", "Aún no lo sé"],
            required: false,
          },
        ],
      },
    ],
    contactTitle: "Último paso: sus datos",
    contactSubtitle: "Para recibir su análisis de madurez financiera personalizado.",
    fieldFirstName: "Nombre",
    fieldLastName: "Apellido",
    fieldEmail: "Email profesional",
    fieldPhone: "Teléfono",
    fieldRole: "Su función",
    fieldCompany: "Nombre de la empresa",
    roleOptions: ["CEO / Fundador", "COO / DG", "DAF / RAF", "CFO", "Otro"],
    submitButton: "Recibir mi análisis",
    thankYouTitle: "Análisis en curso",
    thankYouSubtitle: "Un experto de Iter Advisors analizará sus respuestas y le enviará un informe personalizado en 48h.",
    thankYouCTA: "Reservar una llamada estratégica",
    thankYouCalendly: "También puede reservar directamente una llamada de 30 min con un Partner.",
    thankYouItems: [
      "Puntuación de madurez financiera",
      "Recomendaciones personalizadas",
      "Perfil de DAF ideal para su situación",
    ],
    nextButton: "Siguiente sección",
    prevButton: "Sección anterior",
    sectionOf: "de",
    privacyNote: "Sus datos están protegidos. Consulte nuestra",
    privacyLink: "política de privacidad",
    requiredField: "Este campo es obligatorio",
    selectUpTo: "Seleccione hasta",
    options: "opciones",
  },
};

const privacyPaths: Record<Locale, string> = {
  fr: "/politique-de-confidentialite",
  en: "/en/privacy-policy",
  es: "/es/politica-de-privacidad",
};

/* ─── Icon helper ─── */
function SectionIcon({ name, className }: { name: string; className?: string }) {
  const props = { size: 24, className: className || "text-iter-violet" };
  switch (name) {
    case "building": return <Building2 {...props} />;
    case "wallet": return <Wallet {...props} />;
    case "target": return <Target {...props} />;
    default: return <Building2 {...props} />;
  }
}

/* ─── Main Component ─── */
export default function QualificationPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: NavItem[];
}) {
  const t = qualContent[locale];
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const totalSections = t.sections.length;
  const isContactStep = currentSection >= totalSections;

  const handleSelectAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleMultiSelectToggle = (questionId: string, value: string, maxSelect: number) => {
    const current = (answers[questionId] as string[]) || [];
    if (current.includes(value)) {
      setAnswers({ ...answers, [questionId]: current.filter((v) => v !== value) });
    } else if (current.length < maxSelect) {
      setAnswers({ ...answers, [questionId]: [...current, value] });
    }
  };

  const handleNext = () => {
    if (currentSection < totalSections) {
      setCurrentSection(currentSection + 1);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePrev = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const progressPercent = isContactStep
    ? 100
    : ((currentSection + 1) / (totalSections + 1)) * 100;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ─── HERO ─── */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-iter-dark via-iter-dark to-[oklch(0.25_0.15_275)] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <rect x="100" y="100" width="400" height="400" rx="20" stroke="white" strokeWidth="0.5" fill="none" />
            <rect x="940" y="50" width="300" height="300" rx="15" stroke="white" strokeWidth="0.3" fill="none" />
            <line x1="500" y1="0" x2="500" y2="600" stroke="white" strokeWidth="0.2" />
          </svg>
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-iter-chartreuse text-sm font-medium mb-8"
            >
              <FileText size={14} />
              {t.badge}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              {t.h1}{" "}
              <span className="text-iter-chartreuse">{t.h1Accent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-white/50"
            >
              <Shield size={16} className="text-iter-chartreuse" />
              <span>{t.trustLine}</span>
              <span className="mx-2 w-px h-4 bg-white/20" />
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-iter-chartreuse fill-iter-chartreuse" />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section ref={formRef} className="py-16 lg:py-24 bg-gray-50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Section tabs */}
            {!submitted && (
              <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
                {t.sections.map((section, i) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(i)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      currentSection === i
                        ? "bg-iter-violet text-white shadow-lg"
                        : currentSection > i
                        ? "bg-iter-chartreuse/20 text-iter-dark"
                        : "bg-white text-gray-400 border border-gray-200"
                    }`}
                  >
                    {currentSection > i ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <SectionIcon name={section.icon} className={currentSection === i ? "text-white" : "text-gray-400"} />
                    )}
                    {section.title}
                  </button>
                ))}
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    isContactStep
                      ? "bg-iter-violet text-white shadow-lg"
                      : "bg-white text-gray-400 border border-gray-200"
                  }`}
                >
                  <Send size={16} className={isContactStep ? "text-white" : "text-gray-400"} />
                  Contact
                </button>
              </div>
            )}

            {/* Progress */}
            {!submitted && (
              <div className="mb-8">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-iter-violet rounded-full"
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {Math.min(currentSection + 1, totalSections + 1)} {t.sectionOf} {totalSections + 1}
                </p>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* Section questions */}
              {!isContactStep && !submitted && (
                <motion.div
                  key={`section-${currentSection}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-iter-violet-light flex items-center justify-center">
                      <SectionIcon name={t.sections[currentSection].icon} />
                    </div>
                    <h2 className="text-2xl font-bold text-iter-dark">
                      {t.sections[currentSection].title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {t.sections[currentSection].questions.map((q) => (
                      <div key={q.id}>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          {q.label}
                          {q.required && <span className="text-red-400 ml-1">*</span>}
                          {q.type === "multiselect" && (
                            <span className="text-gray-400 font-normal ml-2">
                              ({t.selectUpTo} {(q as any).maxSelect} {t.options})
                            </span>
                          )}
                        </label>

                        {q.type === "select" && (
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => handleSelectAnswer(q.id, opt)}
                                className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                  answers[q.id] === opt
                                    ? "border-iter-violet bg-iter-violet-light text-iter-violet"
                                    : "border-gray-200 hover:border-iter-violet/30 text-gray-600"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        )}

                        {q.type === "multiselect" && (
                          <div className="grid grid-cols-2 gap-2">
                            {q.options.map((opt) => {
                              const selected = ((answers[q.id] as string[]) || []).includes(opt);
                              return (
                                <button
                                  key={opt}
                                  type="button"
                                  onClick={() =>
                                    handleMultiSelectToggle(q.id, opt, (q as any).maxSelect || 3)
                                  }
                                  className={`text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                                    selected
                                      ? "border-iter-violet bg-iter-violet-light text-iter-violet"
                                      : "border-gray-200 hover:border-iter-violet/30 text-gray-600"
                                  }`}
                                >
                                  <span className="flex items-center gap-2">
                                    <span
                                      className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                                        selected
                                          ? "border-iter-violet bg-iter-violet"
                                          : "border-gray-300"
                                      }`}
                                    >
                                      {selected && (
                                        <CheckCircle2 size={10} className="text-white" />
                                      )}
                                    </span>
                                    {opt}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                    {currentSection > 0 ? (
                      <button
                        onClick={handlePrev}
                        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <ArrowLeft size={14} />
                        {t.prevButton}
                      </button>
                    ) : (
                      <div />
                    )}
                    <button
                      onClick={handleNext}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-iter-violet text-white font-semibold text-sm hover:shadow-lg transition-all group"
                    >
                      {t.nextButton}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Contact form */}
              {isContactStep && !submitted && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-iter-chartreuse/20 flex items-center justify-center mx-auto mb-4">
                      <Send size={28} className="text-iter-violet" />
                    </div>
                    <h2 className="text-2xl font-bold text-iter-dark mb-2">
                      {t.contactTitle}
                    </h2>
                    <p className="text-gray-500">{t.contactSubtitle}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          {t.fieldFirstName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          {t.fieldLastName} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          {t.fieldCompany} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1.5">
                          {t.fieldRole} *
                        </label>
                        <select
                          required
                          value={formData.role}
                          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800 bg-white"
                        >
                          <option value="">—</option>
                          {t.roleOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        {t.fieldEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        {t.fieldPhone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-bold text-base hover:shadow-[0_0_30px_oklch(0.42_0.28_275/0.3)] transition-all duration-300 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send size={18} />
                          {t.submitButton}
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-3">
                      {t.privacyNote}{" "}
                      <Link href={privacyPaths[locale]} className="underline hover:text-iter-violet">
                        {t.privacyLink}
                      </Link>
                      .
                    </p>
                  </form>

                  <button
                    onClick={handlePrev}
                    className="mt-4 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    {t.prevButton}
                  </button>
                </motion.div>
              )}

              {/* Thank you */}
              {submitted && (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-iter-chartreuse/20 flex items-center justify-center mx-auto mb-6">
                    <BarChart3 size={40} className="text-iter-violet" />
                  </div>
                  <h2 className="text-3xl font-bold text-iter-dark mb-3">
                    {t.thankYouTitle}, {formData.firstName} !
                  </h2>
                  <p className="text-gray-500 text-lg mb-8">{t.thankYouSubtitle}</p>

                  {/* What you'll receive */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left max-w-md mx-auto">
                    <p className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                      {locale === "fr" ? "Vous recevrez :" : locale === "en" ? "You will receive:" : "Recibirá:"}
                    </p>
                    {t.thankYouItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <CheckCircle2 size={18} className="text-iter-violet flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-gray-400 text-sm mb-6">{t.thankYouCalendly}</p>
                  <Link
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-bold text-base hover:shadow-[0_0_30px_oklch(0.42_0.28_275/0.3)] transition-all duration-300 group"
                  >
                    <Calendar size={18} />
                    {t.thankYouCTA}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
