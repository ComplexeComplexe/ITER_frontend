"use client";

import { useState, useRef, FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Target,
  Users,
  Clock,
  Send,
  Star,
  Shield,
  TrendingUp,
  BarChart3,
  Zap,
  Calendar,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";
import PageLayout from "@/components/PageLayout";

/* ─── i18n content ─── */
const leadContent = {
  fr: {
    badge: "Diagnostic gratuit en 2 minutes",
    h1: "La meilleure version de votre direction financière",
    h1Accent: "sans les coûts d'un temps plein.",
    subtitle:
      "Évaluez vos besoins financiers et découvrez comment nos DAF externalisés peuvent structurer votre croissance.",
    ctaPrimary: "Obtenir mon diagnostic gratuit",
    ctaSecondary: "Prendre rendez-vous",
    trustLine: "entreprises accompagnées",
    trustRating: "5/5 sur Trustfolio",
    trustReviews: "avis authentifiés",
    /* Problem / Solution */
    problemTitle: "Vous pilotez à vue ?",
    problemItems: [
      "Pas de visibilité sur votre cash-flow à 6 mois",
      "Reporting financier inexistant ou approximatif",
      "Difficulté à convaincre investisseurs et banques",
    ],
    solutionTitle: "Iter Advisors, votre DAF externalisé",
    solutionItems: [
      { icon: "chart", title: "Visibilité cash-flow", desc: "Projection à 12 mois, mise à jour mensuelle" },
      { icon: "target", title: "Structuration levée de fonds", desc: "Business plan, data room, pitch financier" },
      { icon: "zap", title: "Pilotage de la rentabilité", desc: "KPIs, reporting, tableaux de bord sur mesure" },
    ],
    /* Quiz */
    quizTitle: "Votre diagnostic en 4 questions",
    quizSubtitle: "Découvrez le profil d'accompagnement idéal pour votre entreprise.",
    steps: [
      {
        question: "Quel est le stade de développement de votre entreprise ?",
        icon: "building",
        options: ["Pre-Seed / Seed", "Série A", "Série B+", "PME établie (>5 ans)", "Autre"],
      },
      {
        question: "Quel est votre enjeu financier prioritaire ?",
        icon: "target",
        options: [
          "Préparer une levée de fonds",
          "Structurer le reporting & KPIs",
          "Gérer la trésorerie (Cash-flow)",
          "Remplacer un DAF / RAF",
          "Autre",
        ],
      },
      {
        question: "Combien de collaborateurs comptez-vous ?",
        icon: "users",
        options: ["1 – 10", "11 – 50", "51 – 200", "200+"],
      },
      {
        question: "Quand souhaitez-vous qu'un DAF soit opérationnel ?",
        icon: "clock",
        options: ["Dès que possible", "Dans le mois", "Dans le trimestre", "Je me renseigne"],
      },
    ],
    contactTitle: "Parfait ! Nous avons l'expert idéal pour vous.",
    contactSubtitle: "Où devons-nous envoyer votre diagnostic personnalisé ?",
    fieldFirstName: "Prénom",
    fieldLastName: "Nom",
    fieldEmail: "Email professionnel",
    fieldPhone: "Téléphone (optionnel)",
    fieldCompany: "Nom de l'entreprise",
    submitButton: "Voir mes résultats",
    /* Thank you */
    thankYouTitle: "Merci",
    thankYouSubtitle: "Votre demande est confirmée. Un expert Iter Advisors vous contactera sous 24h.",
    thankYouCTA: "Réserver un créneau maintenant",
    thankYouCalendly: "Gagnez du temps : bloquez directement un créneau de 30 min avec un Partner.",
    /* Testimonials */
    testimonialsTitle: "Ce que disent nos clients",
    testimonials: [
      {
        quote: "Grâce à Iter Advisors, nous avons structuré notre direction financière en 3 mois et sécurisé notre Série A de 2,5M€.",
        name: "CEO",
        company: "Startup SaaS B2B",
        stars: 5,
      },
      {
        quote: "Un vrai bras droit financier. L'équipe Iter nous a permis de passer de 0 à un reporting mensuel complet en 6 semaines.",
        name: "Fondateur",
        company: "Scale-up E-commerce",
        stars: 5,
      },
    ],
    /* FAQ */
    faqTitle: "Questions fréquentes",
    faqs: [
      {
        q: "Combien coûte un DAF externalisé ?",
        a: "Nos formules démarrent à partir de 1 jour par mois. Le tarif dépend du niveau de séniorité et du volume d'intervention. Contactez-nous pour un devis personnalisé.",
      },
      {
        q: "Quel est l'engagement minimum ?",
        a: "Nous proposons des engagements flexibles, sans durée minimale imposée. Vous pouvez ajuster le volume mois par mois selon vos besoins.",
      },
      {
        q: "Comment se passe l'intégration ?",
        a: "Votre DAF externalisé est opérationnel dès la première semaine. Il s'intègre à vos outils existants (Pennylane, Qonto, etc.) et participe à vos comités.",
      },
      {
        q: "Quelle est la différence avec un cabinet comptable ?",
        a: "Un DAF externalisé est un stratège financier qui pilote votre performance. Il va bien au-delà de la comptabilité : prévisions, levées de fonds, KPIs, relations investisseurs.",
      },
    ],
    nextButton: "Suivant",
    prevButton: "Précédent",
    stepOf: "sur",
    privacyNote: "Vos données sont protégées. Consultez notre",
    privacyLink: "politique de confidentialité",
  },
  en: {
    badge: "Free assessment in 2 minutes",
    h1: "The best version of your financial management",
    h1Accent: "without the cost of a full-time hire.",
    subtitle:
      "Assess your financial needs and discover how our outsourced CFOs can structure your growth.",
    ctaPrimary: "Get my free assessment",
    ctaSecondary: "Book a meeting",
    trustLine: "companies supported",
    trustRating: "5/5 on Trustfolio",
    trustReviews: "verified reviews",
    problemTitle: "Flying blind?",
    problemItems: [
      "No visibility on your cash flow for the next 6 months",
      "Non-existent or approximate financial reporting",
      "Difficulty convincing investors and banks",
    ],
    solutionTitle: "Iter Advisors, your outsourced CFO",
    solutionItems: [
      { icon: "chart", title: "Cash flow visibility", desc: "12-month projection, monthly updates" },
      { icon: "target", title: "Fundraising structuring", desc: "Business plan, data room, financial pitch" },
      { icon: "zap", title: "Profitability management", desc: "KPIs, reporting, custom dashboards" },
    ],
    quizTitle: "Your assessment in 4 questions",
    quizSubtitle: "Discover the ideal support profile for your company.",
    steps: [
      {
        question: "What stage is your company at?",
        icon: "building",
        options: ["Pre-Seed / Seed", "Series A", "Series B+", "Established SME (>5 years)", "Other"],
      },
      {
        question: "What is your priority financial challenge?",
        icon: "target",
        options: [
          "Prepare a fundraising round",
          "Structure reporting & KPIs",
          "Manage cash flow",
          "Replace a CFO / Finance Manager",
          "Other",
        ],
      },
      {
        question: "How many employees do you have?",
        icon: "users",
        options: ["1 – 10", "11 – 50", "51 – 200", "200+"],
      },
      {
        question: "When would you like a CFO to be operational?",
        icon: "clock",
        options: ["As soon as possible", "Within a month", "Within a quarter", "Just exploring"],
      },
    ],
    contactTitle: "Great! We have the perfect expert for you.",
    contactSubtitle: "Where should we send your personalized assessment?",
    fieldFirstName: "First name",
    fieldLastName: "Last name",
    fieldEmail: "Professional email",
    fieldPhone: "Phone (optional)",
    fieldCompany: "Company name",
    submitButton: "See my results",
    thankYouTitle: "Thank you",
    thankYouSubtitle: "Your request is confirmed. An Iter Advisors expert will contact you within 24h.",
    thankYouCTA: "Book a slot now",
    thankYouCalendly: "Save time: book a 30-min slot directly with a Partner.",
    testimonialsTitle: "What our clients say",
    testimonials: [
      {
        quote: "Thanks to Iter Advisors, we structured our financial management in 3 months and secured our €2.5M Series A.",
        name: "CEO",
        company: "B2B SaaS Startup",
        stars: 5,
      },
      {
        quote: "A true financial right hand. The Iter team helped us go from zero to complete monthly reporting in 6 weeks.",
        name: "Founder",
        company: "E-commerce Scale-up",
        stars: 5,
      },
    ],
    faqTitle: "Frequently asked questions",
    faqs: [
      {
        q: "How much does an outsourced CFO cost?",
        a: "Our plans start from 1 day per month. The rate depends on the seniority level and scope of work. Contact us for a personalized quote.",
      },
      {
        q: "What is the minimum commitment?",
        a: "We offer flexible commitments with no minimum duration. You can adjust the volume month by month according to your needs.",
      },
      {
        q: "How does onboarding work?",
        a: "Your outsourced CFO is operational from the first week. They integrate with your existing tools (Pennylane, Qonto, etc.) and attend your meetings.",
      },
      {
        q: "What's the difference with an accounting firm?",
        a: "An outsourced CFO is a financial strategist who drives your performance. They go far beyond accounting: forecasts, fundraising, KPIs, investor relations.",
      },
    ],
    nextButton: "Next",
    prevButton: "Previous",
    stepOf: "of",
    privacyNote: "Your data is protected. See our",
    privacyLink: "privacy policy",
  },
  es: {
    badge: "Diagnóstico gratuito en 2 minutos",
    h1: "La mejor versión de su dirección financiera",
    h1Accent: "sin los costes de un puesto a tiempo completo.",
    subtitle:
      "Evalúe sus necesidades financieras y descubra cómo nuestros DAF externalizados pueden estructurar su crecimiento.",
    ctaPrimary: "Obtener mi diagnóstico gratuito",
    ctaSecondary: "Concertar una cita",
    trustLine: "empresas acompañadas",
    trustRating: "5/5 en Trustfolio",
    trustReviews: "opiniones verificadas",
    problemTitle: "¿Navega a ciegas?",
    problemItems: [
      "Sin visibilidad sobre su flujo de caja a 6 meses",
      "Reporting financiero inexistente o aproximado",
      "Dificultad para convencer a inversores y bancos",
    ],
    solutionTitle: "Iter Advisors, su DAF externalizado",
    solutionItems: [
      { icon: "chart", title: "Visibilidad cash-flow", desc: "Proyección a 12 meses, actualización mensual" },
      { icon: "target", title: "Estructuración de rondas", desc: "Business plan, data room, pitch financiero" },
      { icon: "zap", title: "Pilotaje de la rentabilidad", desc: "KPIs, reporting, cuadros de mando a medida" },
    ],
    quizTitle: "Su diagnóstico en 4 preguntas",
    quizSubtitle: "Descubra el perfil de acompañamiento ideal para su empresa.",
    steps: [
      {
        question: "¿En qué etapa se encuentra su empresa?",
        icon: "building",
        options: ["Pre-Seed / Seed", "Serie A", "Serie B+", "PYME establecida (>5 años)", "Otro"],
      },
      {
        question: "¿Cuál es su desafío financiero prioritario?",
        icon: "target",
        options: [
          "Preparar una ronda de financiación",
          "Estructurar el reporting y KPIs",
          "Gestionar la tesorería (Cash-flow)",
          "Reemplazar un DAF / RAF",
          "Otro",
        ],
      },
      {
        question: "¿Cuántos colaboradores tiene?",
        icon: "users",
        options: ["1 – 10", "11 – 50", "51 – 200", "200+"],
      },
      {
        question: "¿Cuándo desea que un DAF esté operativo?",
        icon: "clock",
        options: ["Lo antes posible", "En el mes", "En el trimestre", "Solo me informo"],
      },
    ],
    contactTitle: "¡Perfecto! Tenemos al experto ideal para usted.",
    contactSubtitle: "¿Dónde debemos enviar su diagnóstico personalizado?",
    fieldFirstName: "Nombre",
    fieldLastName: "Apellido",
    fieldEmail: "Email profesional",
    fieldPhone: "Teléfono (opcional)",
    fieldCompany: "Nombre de la empresa",
    submitButton: "Ver mis resultados",
    thankYouTitle: "Gracias",
    thankYouSubtitle: "Su solicitud está confirmada. Un experto de Iter Advisors le contactará en 24h.",
    thankYouCTA: "Reservar un horario ahora",
    thankYouCalendly: "Ahorre tiempo: reserve directamente un espacio de 30 min con un Partner.",
    testimonialsTitle: "Lo que dicen nuestros clientes",
    testimonials: [
      {
        quote: "Gracias a Iter Advisors, estructuramos nuestra dirección financiera en 3 meses y aseguramos nuestra Serie A de 2,5M€.",
        name: "CEO",
        company: "Startup SaaS B2B",
        stars: 5,
      },
      {
        quote: "Un verdadero brazo derecho financiero. El equipo Iter nos permitió pasar de cero a un reporting mensual completo en 6 semanas.",
        name: "Fundador",
        company: "Scale-up E-commerce",
        stars: 5,
      },
    ],
    faqTitle: "Preguntas frecuentes",
    faqs: [
      {
        q: "¿Cuánto cuesta un DAF externalizado?",
        a: "Nuestras fórmulas comienzan desde 1 día al mes. La tarifa depende del nivel de seniority y del volumen de intervención. Contáctenos para un presupuesto personalizado.",
      },
      {
        q: "¿Cuál es el compromiso mínimo?",
        a: "Ofrecemos compromisos flexibles, sin duración mínima impuesta. Puede ajustar el volumen mes a mes según sus necesidades.",
      },
      {
        q: "¿Cómo funciona la integración?",
        a: "Su DAF externalizado está operativo desde la primera semana. Se integra con sus herramientas existentes (Pennylane, Qonto, etc.) y participa en sus comités.",
      },
      {
        q: "¿Cuál es la diferencia con un despacho contable?",
        a: "Un DAF externalizado es un estratega financiero que pilota su rendimiento. Va mucho más allá de la contabilidad: previsiones, rondas de financiación, KPIs, relaciones con inversores.",
      },
    ],
    nextButton: "Siguiente",
    prevButton: "Anterior",
    stepOf: "de",
    privacyNote: "Sus datos están protegidos. Consulte nuestra",
    privacyLink: "política de privacidad",
  },
};

const privacyPaths: Record<Locale, string> = {
  fr: "/politique-de-confidentialite",
  en: "/en/privacy-policy",
  es: "/es/politica-de-privacidad",
};

/* ─── Client logos ─── */
const clientLogos = [
  { src: "/images/logos/logo-happyscribe.jpg", alt: "HappyScribe" },
  { src: "/images/logos/logo-surfe.jpg", alt: "Surfe" },
  { src: "/images/logos/logo-ukio.jpg", alt: "Ukio" },
  { src: "/images/logos/logo-seasonly.jpg", alt: "Seasonly" },
  { src: "/images/logos/logo-neat.jpg", alt: "Neat" },
  { src: "/images/logos/logo-yego.jpg", alt: "Yego" },
];

/* ─── Icon helper ─── */
function StepIcon({ name, className }: { name: string; className?: string }) {
  const props = { size: 28, className: className || "text-iter-violet" };
  switch (name) {
    case "building": return <Building2 {...props} />;
    case "target": return <Target {...props} />;
    case "users": return <Users {...props} />;
    case "clock": return <Clock {...props} />;
    default: return <Building2 {...props} />;
  }
}

function SolutionIcon({ name, className }: { name: string; className?: string }) {
  const props = { size: 24, className: className || "text-iter-chartreuse" };
  switch (name) {
    case "chart": return <BarChart3 {...props} />;
    case "target": return <Target {...props} />;
    case "zap": return <Zap {...props} />;
    default: return <TrendingUp {...props} />;
  }
}

/* ─── Main Component ─── */
export default function LeadPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: NavItem[];
}) {
  const t = leadContent[locale];
  const [currentStep, setCurrentStep] = useState(-1); // -1 = not started
  const [answers, setAnswers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const quizRef = useRef<HTMLDivElement>(null);
  const totalSteps = t.steps.length;

  const handleStartQuiz = () => {
    setCurrentStep(0);
    setTimeout(() => {
      quizRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = option;
    setAnswers(newAnswers);
    // Auto-advance after selection
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setCurrentStep(totalSteps); // Go to contact form
      }
    }, 300);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const stepLabels = ["stage", "challenge", "teamSize", "urgency"];
      const quizAnswers: Record<string, string> = {};
      answers.forEach((answer, i) => {
        if (stepLabels[i]) quizAnswers[stepLabels[i]] = answer;
      });
      const payload = {
        source: "profil",
        data: {
          ...formData,
          ...quizAnswers,
        },
      };
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error("Lead API error:", await res.text());
      }
    } catch (err) {
      console.error("Failed to send lead:", err);
    }
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const progressPercent =
    currentStep < 0
      ? 0
      : currentStep >= totalSteps
      ? 100
      : ((currentStep + 1) / (totalSteps + 1)) * 100;

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ─── HERO ─── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-iter-dark via-iter-dark to-[oklch(0.25_0.15_275)]">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
            <circle cx="720" cy="450" r="400" stroke="white" strokeWidth="0.5" />
            <circle cx="720" cy="450" r="300" stroke="white" strokeWidth="0.3" />
            <circle cx="720" cy="450" r="200" stroke="white" strokeWidth="0.2" />
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                x1="720"
                y1="450"
                x2={720 + 500 * Math.cos((i * Math.PI) / 4)}
                y2={450 + 500 * Math.sin((i * Math.PI) / 4)}
                stroke="white"
                strokeWidth="0.2"
              />
            ))}
          </svg>
        </div>

        <div className="container relative z-10 py-20 lg:py-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-iter-chartreuse text-sm font-medium mb-8"
            >
              <Zap size={14} />
              {t.badge}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              {t.h1}
              <br />
              <span className="text-iter-chartreuse">{t.h1Accent}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              {t.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <button
                onClick={handleStartQuiz}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-bold text-base hover:shadow-[0_0_30px_oklch(0.91_0.22_120/0.4)] transition-all duration-300 group"
              >
                {t.ctaPrimary}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/5 transition-all duration-300"
              >
                <Calendar size={18} />
                {t.ctaSecondary}
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50"
            >
              <span className="flex items-center gap-2">
                <Shield size={16} className="text-iter-chartreuse" />
                <strong className="text-white">+100</strong> {t.trustLine}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/20" />
              <span className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="text-iter-chartreuse fill-iter-chartreuse"
                  />
                ))}
                <span className="ml-1">{t.trustRating}</span>
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/20" />
              <span>
                <strong className="text-white">32</strong> {t.trustReviews}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── CLIENT LOGOS ─── */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {clientLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM / SOLUTION ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-semibold mb-6 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                {t.problemTitle}
              </div>
              <div className="space-y-4">
                {t.problemItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-red-50/50 border border-red-100"
                  >
                    <span className="mt-0.5 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-500 text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-6 uppercase tracking-wider">
                <CheckCircle2 size={14} />
                {t.solutionTitle}
              </div>
              <div className="space-y-4">
                {t.solutionItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl bg-iter-dark text-white"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      <SolutionIcon name={item.icon} />
                    </div>
                    <div>
                      <h3 className="font-bold text-base mb-1">{item.title}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── QUIZ / FORM SECTION ─── */}
      <section
        ref={quizRef}
        id="diagnostic"
        className="py-20 lg:py-28 bg-gradient-to-b from-iter-violet-light/30 to-white"
      >
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark mb-4">
                {t.quizTitle}
              </h2>
              <p className="text-gray-500 text-lg">{t.quizSubtitle}</p>
            </div>

            {/* Progress bar */}
            {currentStep >= 0 && !submitted && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>
                    {t.steps[Math.min(currentStep, totalSteps - 1)]?.question.split(" ").slice(0, 3).join(" ")}...
                  </span>
                  <span>
                    {Math.min(currentStep + 1, totalSteps + 1)} {t.stepOf} {totalSteps + 1}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-iter-violet rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            )}

            {/* Quiz not started */}
            {currentStep < 0 && !submitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <button
                  onClick={handleStartQuiz}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-iter-violet text-white font-bold text-lg hover:shadow-[0_0_40px_oklch(0.42_0.28_275/0.3)] transition-all duration-300 group"
                >
                  {t.ctaPrimary}
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </motion.div>
            )}

            {/* Quiz steps */}
            <AnimatePresence mode="wait">
              {currentStep >= 0 && currentStep < totalSteps && !submitted && (
                <motion.div
                  key={`step-${currentStep}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-iter-violet-light flex items-center justify-center">
                      <StepIcon name={t.steps[currentStep].icon} />
                    </div>
                    <h3 className="text-xl font-bold text-iter-dark">
                      {t.steps[currentStep].question}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {t.steps[currentStep].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all duration-200 font-medium ${
                          answers[currentStep] === option
                            ? "border-iter-violet bg-iter-violet-light text-iter-violet"
                            : "border-gray-200 hover:border-iter-violet/40 hover:bg-iter-violet-light/30 text-gray-700"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  {currentStep > 0 && (
                    <button
                      onClick={() => setCurrentStep(currentStep - 1)}
                      className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ArrowLeft size={14} />
                      {t.prevButton}
                    </button>
                  )}
                </motion.div>
              )}

              {/* Contact form step */}
              {currentStep >= totalSteps && !submitted && (
                <motion.div
                  key="contact-form"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-iter-chartreuse/20 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-iter-violet" />
                    </div>
                    <h3 className="text-2xl font-bold text-iter-dark mb-2">
                      {t.contactTitle}
                    </h3>
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
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
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
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        {t.fieldCompany} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/20 outline-none transition-all text-gray-800"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1.5">
                        {t.fieldEmail} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
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
                      <Link
                        href={privacyPaths[locale]}
                        className="underline hover:text-iter-violet"
                      >
                        {t.privacyLink}
                      </Link>
                      .
                    </p>
                  </form>

                  <button
                    onClick={() => setCurrentStep(totalSteps - 1)}
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
                    <CheckCircle2 size={40} className="text-iter-violet" />
                  </div>
                  <h3 className="text-3xl font-bold text-iter-dark mb-3">
                    {t.thankYouTitle}, {formData.firstName} !
                  </h3>
                  <p className="text-gray-500 text-lg mb-8">{t.thankYouSubtitle}</p>
                  <p className="text-gray-400 text-sm mb-6">{t.thankYouCalendly}</p>
                  <Link
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-bold text-base hover:shadow-[0_0_30px_oklch(0.42_0.28_275/0.3)] transition-all duration-300 group"
                  >
                    <Calendar size={18} />
                    {t.thankYouCTA}
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark text-center mb-12">
            {t.testimonialsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {t.testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl bg-gray-50 border border-gray-100"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <Star
                      key={j}
                      size={16}
                      className="text-iter-chartreuse fill-iter-chartreuse"
                    />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-iter-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark text-center mb-12">
            {t.faqTitle}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between font-semibold text-iter-dark hover:bg-gray-50 transition-colors"
                >
                  {faq.q}
                  <motion.span
                    animate={{ rotate: expandedFaq === i ? 45 : 0 }}
                    className="text-iter-violet text-xl flex-shrink-0 ml-4"
                  >
                    +
                  </motion.span>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="py-24 lg:py-32 bg-iter-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <circle cx="720" cy="300" r="300" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            {t.quizTitle.replace("4", "2")}
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto mb-10">
            {t.subtitle}
          </p>
          <button
            onClick={() => {
              setCurrentStep(0);
              setAnswers([]);
              setSubmitted(false);
              setTimeout(() => {
                quizRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
              }, 100);
            }}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-iter-chartreuse text-iter-dark font-bold text-lg hover:shadow-[0_0_30px_oklch(0.91_0.22_120/0.4)] transition-all duration-300 group"
          >
            {t.ctaPrimary}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
