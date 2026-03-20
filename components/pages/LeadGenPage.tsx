"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Building2,
  Target,
  Users,
  Clock,
  User,
  TrendingUp,
  Shield,
  BarChart3,
  Wallet,
  Calendar,
  ChevronDown,
  ChevronUp,
  Star,
  Zap,
  Eye,
  PiggyBank,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import { Locale } from "@/lib/i18n";
import { BOOKING_URL } from "@/lib/navigation";
import type { NavItem } from "@/lib/navigation";

/* ─────────────────────────── i18n Content ─────────────────────────── */

const content: Record<
  Locale,
  {
    breadcrumb: string;
    hero: {
      badge: string;
      title: string;
      titleHighlight: string;
      subtitle: string;
      cta: string;
      ctaSecondary: string;
      socialProof: string;
      trustfolio: string;
    };
    problem: {
      surtitle: string;
      title: string;
      problems: { icon: string; title: string; desc: string }[];
      solutionTitle: string;
      solutionDesc: string;
      benefits: { title: string; desc: string }[];
    };
    form: {
      surtitle: string;
      title: string;
      subtitle: string;
      steps: {
        question: string;
        options: { label: string; icon?: string }[];
      }[];
      contactStep: {
        title: string;
        subtitle: string;
        fields: {
          firstName: string;
          lastName: string;
          email: string;
          phone: string;
          company: string;
        };
        submit: string;
        privacy: string;
      };
      successStep: {
        title: string;
        subtitle: string;
        cta: string;
        ctaDesc: string;
      };
      progress: string;
      next: string;
      prev: string;
    };
    testimonials: {
      surtitle: string;
      title: string;
      items: {
        quote: string;
        name: string;
        role: string;
        company: string;
        result: string;
      }[];
    };
    faq: {
      surtitle: string;
      title: string;
      items: { q: string; a: string }[];
    };
    finalCta: {
      title: string;
      subtitle: string;
      cta: string;
    };
  }
> = {
  fr: {
    breadcrumb: "Diagnostic financier",
    hero: {
      badge: "Diagnostic gratuit en 2 min",
      title: "La meilleure version de votre direction financière,",
      titleHighlight: "sans les coûts d'un temps plein.",
      subtitle:
        "Évaluez vos besoins financiers en 2 minutes et découvrez comment nos DAF externalisés peuvent structurer votre croissance.",
      cta: "Obtenir mon diagnostic gratuit",
      ctaSecondary: "Découvrir nos services",
      socialProof: "Rejoint par +100 entreprises",
      trustfolio: "5/5 Trustfolio",
    },
    problem: {
      surtitle: "LE CONSTAT",
      title: "Vous pilotez à vue ?",
      problems: [
        {
          icon: "eye",
          title: "Manque de visibilité",
          desc: "Vous n'avez pas de prévisionnel de trésorerie fiable au-delà de 3 mois.",
        },
        {
          icon: "chart",
          title: "Reporting inexistant",
          desc: "Vos KPIs financiers ne sont pas suivis ou arrivent trop tard pour agir.",
        },
        {
          icon: "wallet",
          title: "Cash-flow sous tension",
          desc: "Les fins de mois sont stressantes et vous manquez de runway pour investir.",
        },
      ],
      solutionTitle: "La solution : un DAF expert, intégré à votre équipe",
      solutionDesc:
        "De 1 à 4 jours par mois, un directeur financier expérimenté pilote votre stratégie financière avec la même rigueur qu'un CFO à temps plein.",
      benefits: [
        {
          title: "Visibilité cash-flow à 12 mois",
          desc: "Prévisionnel glissant actualisé chaque semaine pour anticiper et décider sereinement.",
        },
        {
          title: "Structuration levée de fonds",
          desc: "Business plan, data room, modélisation financière : tout est prêt pour convaincre les investisseurs.",
        },
        {
          title: "Pilotage de la rentabilité",
          desc: "Tableaux de bord, KPIs SaaS/e-commerce, reporting investisseurs automatisé.",
        },
      ],
    },
    form: {
      surtitle: "VOTRE DIAGNOSTIC",
      title: "Évaluez vos besoins en 2 minutes",
      subtitle:
        "Répondez à 4 questions simples pour recevoir des recommandations personnalisées.",
      steps: [
        {
          question: "Quel est le stade de développement de votre entreprise ?",
          options: [
            { label: "Seed / Early stage", icon: "seed" },
            { label: "Série A", icon: "serieA" },
            { label: "Série B+", icon: "serieB" },
            { label: "PME établie", icon: "pme" },
            { label: "Autre", icon: "other" },
          ],
        },
        {
          question: "Quel est votre enjeu financier prioritaire ?",
          options: [
            { label: "Préparer une levée de fonds", icon: "fundraise" },
            { label: "Structurer le reporting et les KPIs", icon: "reporting" },
            { label: "Gérer la trésorerie (Cash-flow)", icon: "cashflow" },
            { label: "Remplacer un départ (DAF/RAF)", icon: "replace" },
            { label: "Autre besoin", icon: "other" },
          ],
        },
        {
          question: "Combien de collaborateurs comptez-vous ?",
          options: [
            { label: "1 – 10", icon: "small" },
            { label: "11 – 50", icon: "medium" },
            { label: "51 – 200", icon: "large" },
            { label: "200+", icon: "xlarge" },
          ],
        },
        {
          question:
            "Quand aimeriez-vous qu'un DAF externalisé soit opérationnel ?",
          options: [
            { label: "Dès que possible", icon: "asap" },
            { label: "Dans le mois", icon: "month" },
            { label: "Dans le trimestre", icon: "quarter" },
            { label: "Je me renseigne", icon: "info" },
          ],
        },
      ],
      contactStep: {
        title: "Parfait ! Nous avons l'expert idéal pour votre situation.",
        subtitle:
          "Où devons-nous envoyer votre diagnostic personnalisé ?",
        fields: {
          firstName: "Prénom",
          lastName: "Nom",
          email: "Email professionnel",
          phone: "Téléphone (optionnel)",
          company: "Nom de l'entreprise",
        },
        submit: "Voir mes résultats & Prendre RDV",
        privacy:
          "Vos données sont protégées. Nous ne les partagerons jamais avec des tiers.",
      },
      successStep: {
        title: "Merci ! Votre demande est confirmée.",
        subtitle:
          "Un expert Iter Advisors vous contactera sous 24h avec votre diagnostic personnalisé. En attendant, réservez un créneau pour en discuter.",
        cta: "Réserver un créneau de 15 min",
        ctaDesc: "Gratuit et sans engagement",
      },
      progress: "Étape",
      next: "Continuer",
      prev: "Retour",
    },
    testimonials: {
      surtitle: "ILS NOUS FONT CONFIANCE",
      title: "Des résultats concrets, mesurables",
      items: [
        {
          quote:
            "Grâce à Iter Advisors, nous avons sécurisé notre levée de 2M€ en 3 mois. Leur DAF a structuré notre data room et piloté tout le processus avec les investisseurs.",
          name: "Thomas R.",
          role: "CEO",
          company: "Startup SaaS B2B",
          result: "Levée de 2M€ en 3 mois",
        },
        {
          quote:
            "Avant Iter, nous n'avions aucune visibilité sur notre trésorerie au-delà de 2 semaines. Aujourd'hui, nous avons un prévisionnel glissant à 12 mois et des KPIs suivis en temps réel.",
          name: "Sophie M.",
          role: "COO",
          company: "E-commerce D2C",
          result: "+6 mois de runway sécurisé",
        },
      ],
    },
    faq: {
      surtitle: "QUESTIONS FRÉQUENTES",
      title: "Tout ce que vous devez savoir",
      items: [
        {
          q: "Combien coûte un DAF externalisé ?",
          a: "Le tarif dépend de la fréquence d'intervention (1 à 4 jours/mois) et de la complexité de votre situation. Un premier diagnostic gratuit permet de définir précisément vos besoins et le budget associé. En moyenne, un DAF externalisé coûte 3 à 5 fois moins qu'un DAF à temps plein.",
        },
        {
          q: "Quel est l'engagement minimum ?",
          a: "Nous proposons des engagements flexibles à partir de 3 mois, renouvelables. Pas de contrat long terme imposé. L'objectif est de vous apporter de la valeur rapidement et de construire une relation de confiance dans la durée.",
        },
        {
          q: "Comment se passe l'intégration ?",
          a: "Votre DAF externalisé s'intègre à vos outils existants (Slack, Google Workspace, ERP, outils comptables) et participe à vos réunions clés. En 2 semaines, il est pleinement opérationnel et autonome sur votre périmètre financier.",
        },
        {
          q: "Quelle est la différence avec un cabinet comptable ?",
          a: "Un cabinet comptable produit vos comptes annuels et vos déclarations fiscales. Un DAF externalisé pilote votre stratégie financière : prévisionnel, levée de fonds, reporting investisseurs, optimisation du cash-flow. Les deux sont complémentaires.",
        },
        {
          q: "Travaillez-vous avec des startups early-stage ?",
          a: "Oui, nous accompagnons des entreprises de la phase Seed à la Série B+, ainsi que des PME établies. Nos experts adaptent leur approche à votre stade de maturité et à vos enjeux spécifiques.",
        },
      ],
    },
    finalCta: {
      title: "Prêt à structurer votre direction financière ?",
      subtitle:
        "Obtenez votre diagnostic gratuit en 2 minutes et découvrez comment un DAF externalisé peut accélérer votre croissance.",
      cta: "Démarrer mon diagnostic",
    },
  },
  en: {
    breadcrumb: "Financial Diagnostic",
    hero: {
      badge: "Free diagnostic in 2 min",
      title: "The best version of your finance department,",
      titleHighlight: "without the cost of a full-time hire.",
      subtitle:
        "Assess your financial needs in 2 minutes and discover how our outsourced CFOs can structure your growth.",
      cta: "Get my free diagnostic",
      ctaSecondary: "Discover our services",
      socialProof: "Trusted by 100+ companies",
      trustfolio: "5/5 Trustfolio",
    },
    problem: {
      surtitle: "THE CHALLENGE",
      title: "Flying blind?",
      problems: [
        {
          icon: "eye",
          title: "Lack of visibility",
          desc: "You don't have a reliable cash forecast beyond 3 months.",
        },
        {
          icon: "chart",
          title: "No reporting",
          desc: "Your financial KPIs aren't tracked or arrive too late to act.",
        },
        {
          icon: "wallet",
          title: "Cash-flow under pressure",
          desc: "Month-ends are stressful and you lack runway to invest.",
        },
      ],
      solutionTitle: "The solution: an expert CFO, embedded in your team",
      solutionDesc:
        "1 to 4 days per month, an experienced CFO drives your financial strategy with the same rigor as a full-time hire.",
      benefits: [
        {
          title: "12-month cash-flow visibility",
          desc: "Rolling forecast updated weekly to anticipate and decide with confidence.",
        },
        {
          title: "Fundraising readiness",
          desc: "Business plan, data room, financial modeling: everything ready to convince investors.",
        },
        {
          title: "Profitability management",
          desc: "Dashboards, SaaS/e-commerce KPIs, automated investor reporting.",
        },
      ],
    },
    form: {
      surtitle: "YOUR DIAGNOSTIC",
      title: "Assess your needs in 2 minutes",
      subtitle:
        "Answer 4 simple questions to receive personalized recommendations.",
      steps: [
        {
          question: "What stage is your company at?",
          options: [
            { label: "Seed / Early stage", icon: "seed" },
            { label: "Series A", icon: "serieA" },
            { label: "Series B+", icon: "serieB" },
            { label: "Established SME", icon: "pme" },
            { label: "Other", icon: "other" },
          ],
        },
        {
          question: "What is your top financial priority?",
          options: [
            { label: "Prepare a fundraise", icon: "fundraise" },
            { label: "Structure reporting & KPIs", icon: "reporting" },
            { label: "Manage cash-flow", icon: "cashflow" },
            { label: "Replace a departing CFO", icon: "replace" },
            { label: "Other need", icon: "other" },
          ],
        },
        {
          question: "How many employees do you have?",
          options: [
            { label: "1 – 10", icon: "small" },
            { label: "11 – 50", icon: "medium" },
            { label: "51 – 200", icon: "large" },
            { label: "200+", icon: "xlarge" },
          ],
        },
        {
          question: "When would you like an outsourced CFO to be operational?",
          options: [
            { label: "As soon as possible", icon: "asap" },
            { label: "Within a month", icon: "month" },
            { label: "Within a quarter", icon: "quarter" },
            { label: "Just exploring", icon: "info" },
          ],
        },
      ],
      contactStep: {
        title: "Great! We have the perfect expert for your situation.",
        subtitle: "Where should we send your personalized diagnostic?",
        fields: {
          firstName: "First name",
          lastName: "Last name",
          email: "Professional email",
          phone: "Phone (optional)",
          company: "Company name",
        },
        submit: "See my results & Book a call",
        privacy:
          "Your data is protected. We will never share it with third parties.",
      },
      successStep: {
        title: "Thank you! Your request is confirmed.",
        subtitle:
          "An Iter Advisors expert will contact you within 24h with your personalized diagnostic. In the meantime, book a slot to discuss.",
        cta: "Book a 15-min slot",
        ctaDesc: "Free, no commitment",
      },
      progress: "Step",
      next: "Continue",
      prev: "Back",
    },
    testimonials: {
      surtitle: "THEY TRUST US",
      title: "Concrete, measurable results",
      items: [
        {
          quote:
            "Thanks to Iter Advisors, we secured our €2M raise in 3 months. Their CFO structured our data room and managed the entire process with investors.",
          name: "Thomas R.",
          role: "CEO",
          company: "B2B SaaS Startup",
          result: "€2M raised in 3 months",
        },
        {
          quote:
            "Before Iter, we had no cash visibility beyond 2 weeks. Today, we have a 12-month rolling forecast and real-time KPI tracking.",
          name: "Sophie M.",
          role: "COO",
          company: "D2C E-commerce",
          result: "+6 months runway secured",
        },
      ],
    },
    faq: {
      surtitle: "FAQ",
      title: "Everything you need to know",
      items: [
        {
          q: "How much does an outsourced CFO cost?",
          a: "Pricing depends on frequency (1 to 4 days/month) and complexity. A free initial diagnostic defines your needs and budget. On average, an outsourced CFO costs 3 to 5 times less than a full-time hire.",
        },
        {
          q: "What is the minimum commitment?",
          a: "We offer flexible commitments starting from 3 months, renewable. No long-term contract required. The goal is to deliver value quickly and build trust over time.",
        },
        {
          q: "How does onboarding work?",
          a: "Your outsourced CFO integrates with your existing tools (Slack, Google Workspace, ERP, accounting software) and joins key meetings. Within 2 weeks, they're fully operational.",
        },
        {
          q: "What's the difference with an accounting firm?",
          a: "An accounting firm produces your annual accounts and tax filings. An outsourced CFO drives your financial strategy: forecasting, fundraising, investor reporting, cash-flow optimization. Both are complementary.",
        },
        {
          q: "Do you work with early-stage startups?",
          a: "Yes, we support companies from Seed to Series B+, as well as established SMEs. Our experts adapt their approach to your maturity stage and specific challenges.",
        },
      ],
    },
    finalCta: {
      title: "Ready to structure your finance department?",
      subtitle:
        "Get your free diagnostic in 2 minutes and discover how an outsourced CFO can accelerate your growth.",
      cta: "Start my diagnostic",
    },
  },
  es: {
    breadcrumb: "Diagnóstico financiero",
    hero: {
      badge: "Diagnóstico gratuito en 2 min",
      title: "La mejor versión de su dirección financiera,",
      titleHighlight: "sin los costes de un tiempo completo.",
      subtitle:
        "Evalúe sus necesidades financieras en 2 minutos y descubra cómo nuestros DAF externalizados pueden estructurar su crecimiento.",
      cta: "Obtener mi diagnóstico gratuito",
      ctaSecondary: "Descubrir nuestros servicios",
      socialProof: "Más de 100 empresas confían en nosotros",
      trustfolio: "5/5 Trustfolio",
    },
    problem: {
      surtitle: "EL DESAFÍO",
      title: "¿Navega sin rumbo?",
      problems: [
        {
          icon: "eye",
          title: "Falta de visibilidad",
          desc: "No tiene un previsional de tesorería fiable más allá de 3 meses.",
        },
        {
          icon: "chart",
          title: "Sin reporting",
          desc: "Sus KPIs financieros no se monitorizan o llegan demasiado tarde.",
        },
        {
          icon: "wallet",
          title: "Cash-flow bajo presión",
          desc: "Los cierres de mes son estresantes y le falta runway para invertir.",
        },
      ],
      solutionTitle: "La solución: un DAF experto, integrado en su equipo",
      solutionDesc:
        "De 1 a 4 días al mes, un director financiero experimentado pilota su estrategia financiera con el mismo rigor que un CFO a tiempo completo.",
      benefits: [
        {
          title: "Visibilidad de cash-flow a 12 meses",
          desc: "Previsional continuo actualizado semanalmente para anticipar y decidir con confianza.",
        },
        {
          title: "Preparación para rondas de financiación",
          desc: "Business plan, data room, modelización financiera: todo listo para convencer a los inversores.",
        },
        {
          title: "Gestión de la rentabilidad",
          desc: "Dashboards, KPIs SaaS/e-commerce, reporting automatizado para inversores.",
        },
      ],
    },
    form: {
      surtitle: "SU DIAGNÓSTICO",
      title: "Evalúe sus necesidades en 2 minutos",
      subtitle:
        "Responda 4 preguntas simples para recibir recomendaciones personalizadas.",
      steps: [
        {
          question: "¿En qué etapa se encuentra su empresa?",
          options: [
            { label: "Seed / Early stage", icon: "seed" },
            { label: "Serie A", icon: "serieA" },
            { label: "Serie B+", icon: "serieB" },
            { label: "PYME establecida", icon: "pme" },
            { label: "Otro", icon: "other" },
          ],
        },
        {
          question: "¿Cuál es su prioridad financiera principal?",
          options: [
            { label: "Preparar una ronda de financiación", icon: "fundraise" },
            { label: "Estructurar el reporting y KPIs", icon: "reporting" },
            { label: "Gestionar la tesorería (Cash-flow)", icon: "cashflow" },
            { label: "Reemplazar una salida (DAF/RAF)", icon: "replace" },
            { label: "Otra necesidad", icon: "other" },
          ],
        },
        {
          question: "¿Cuántos colaboradores tiene?",
          options: [
            { label: "1 – 10", icon: "small" },
            { label: "11 – 50", icon: "medium" },
            { label: "51 – 200", icon: "large" },
            { label: "200+", icon: "xlarge" },
          ],
        },
        {
          question:
            "¿Cuándo le gustaría que un DAF externalizado esté operativo?",
          options: [
            { label: "Lo antes posible", icon: "asap" },
            { label: "En el mes", icon: "month" },
            { label: "En el trimestre", icon: "quarter" },
            { label: "Solo me informo", icon: "info" },
          ],
        },
      ],
      contactStep: {
        title: "¡Perfecto! Tenemos al experto ideal para su situación.",
        subtitle:
          "¿Dónde debemos enviar su diagnóstico personalizado?",
        fields: {
          firstName: "Nombre",
          lastName: "Apellido",
          email: "Email profesional",
          phone: "Teléfono (opcional)",
          company: "Nombre de la empresa",
        },
        submit: "Ver mis resultados y reservar",
        privacy:
          "Sus datos están protegidos. Nunca los compartiremos con terceros.",
      },
      successStep: {
        title: "¡Gracias! Su solicitud está confirmada.",
        subtitle:
          "Un experto de Iter Advisors le contactará en 24h con su diagnóstico personalizado. Mientras tanto, reserve una cita.",
        cta: "Reservar 15 min",
        ctaDesc: "Gratuito y sin compromiso",
      },
      progress: "Paso",
      next: "Continuar",
      prev: "Volver",
    },
    testimonials: {
      surtitle: "CONFÍAN EN NOSOTROS",
      title: "Resultados concretos y medibles",
      items: [
        {
          quote:
            "Gracias a Iter Advisors, aseguramos nuestra ronda de 2M€ en 3 meses. Su DAF estructuró nuestra data room y gestionó todo el proceso con los inversores.",
          name: "Thomas R.",
          role: "CEO",
          company: "Startup SaaS B2B",
          result: "Ronda de 2M€ en 3 meses",
        },
        {
          quote:
            "Antes de Iter, no teníamos visibilidad de tesorería más allá de 2 semanas. Hoy tenemos un previsional a 12 meses y KPIs en tiempo real.",
          name: "Sophie M.",
          role: "COO",
          company: "E-commerce D2C",
          result: "+6 meses de runway asegurado",
        },
      ],
    },
    faq: {
      surtitle: "PREGUNTAS FRECUENTES",
      title: "Todo lo que necesita saber",
      items: [
        {
          q: "¿Cuánto cuesta un DAF externalizado?",
          a: "El precio depende de la frecuencia (1 a 4 días/mes) y la complejidad. Un diagnóstico inicial gratuito define sus necesidades y presupuesto. En promedio, un DAF externalizado cuesta 3 a 5 veces menos que uno a tiempo completo.",
        },
        {
          q: "¿Cuál es el compromiso mínimo?",
          a: "Ofrecemos compromisos flexibles desde 3 meses, renovables. Sin contrato a largo plazo obligatorio. El objetivo es aportar valor rápidamente y construir confianza.",
        },
        {
          q: "¿Cómo funciona la integración?",
          a: "Su DAF externalizado se integra con sus herramientas existentes (Slack, Google Workspace, ERP, software contable) y participa en reuniones clave. En 2 semanas, es plenamente operativo.",
        },
        {
          q: "¿Cuál es la diferencia con una asesoría contable?",
          a: "Una asesoría contable produce sus cuentas anuales y declaraciones fiscales. Un DAF externalizado pilota su estrategia financiera: previsiones, rondas, reporting para inversores, optimización del cash-flow. Ambos son complementarios.",
        },
        {
          q: "¿Trabajan con startups early-stage?",
          a: "Sí, acompañamos empresas desde Seed hasta Serie B+, así como PYMEs establecidas. Nuestros expertos adaptan su enfoque a su etapa de madurez.",
        },
      ],
    },
    finalCta: {
      title: "¿Listo para estructurar su dirección financiera?",
      subtitle:
        "Obtenga su diagnóstico gratuito en 2 minutos y descubra cómo un DAF externalizado puede acelerar su crecimiento.",
      cta: "Iniciar mi diagnóstico",
    },
  },
};

/* ─────────────────────────── Logos ─────────────────────────── */

const clientLogos = [
  { name: "HappyScribe", src: "/images/logos/logo-happyscribe.jpg" },
  { name: "Surfe", src: "/images/logos/logo-surfe.jpg" },
  { name: "Ukio", src: "/images/logos/logo-ukio.jpg" },
  { name: "Seasonly", src: "/images/logos/logo-seasonly.jpg" },
  { name: "Neat", src: "/images/logos/logo-neat.jpg" },
  { name: "Yego", src: "/images/logos/logo-yego.jpg" },
];

/* ─────────────────────────── Step Icon Helper ─────────────────────────── */

function StepIcon({ step }: { step: number }) {
  const icons = [
    <Building2 key={0} size={24} />,
    <Target key={1} size={24} />,
    <Users key={2} size={24} />,
    <Clock key={3} size={24} />,
    <User key={4} size={24} />,
    <Check key={5} size={24} />,
  ];
  return icons[step] || <Building2 size={24} />;
}

function ProblemIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "eye":
      return <Eye size={28} className="text-red-400" />;
    case "chart":
      return <BarChart3 size={28} className="text-red-400" />;
    case "wallet":
      return <Wallet size={28} className="text-red-400" />;
    default:
      return <Zap size={28} className="text-red-400" />;
  }
}

function BenefitIcon({ index }: { index: number }) {
  const icons = [
    <PiggyBank key={0} size={28} className="text-iter-chartreuse" />,
    <TrendingUp key={1} size={28} className="text-iter-chartreuse" />,
    <BarChart3 key={2} size={28} className="text-iter-chartreuse" />,
  ];
  return icons[index] || <Shield size={28} className="text-iter-chartreuse" />;
}

/* ─────────────────────────── Main Component ─────────────────────────── */

export default function LeadGenPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: NavItem[];
}) {
  const t = content[locale];
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalSteps = t.form.steps.length + 1; // 4 questions + contact form
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (currentStep < t.form.steps.length && selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentStep] = t.form.steps[currentStep].options[selectedOption].label;
      setAnswers(newAnswers);
      setCurrentStep(currentStep + 1);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedOption(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send data to an API
    console.log("Lead data:", { answers, formData });
    setIsSubmitted(true);
  };

  /* ─── FAQ state ─── */
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ─── Section refs for animations ─── */
  const problemRef = useRef<HTMLDivElement>(null);
  const problemInView = useInView(problemRef, { once: true, margin: "-80px" });
  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqInView = useInView(faqRef, { once: true, margin: "-80px" });

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative bg-iter-violet overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-white/[0.03]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-iter-chartreuse/[0.05]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/[0.04]" />
        </div>

        <div className="container relative z-10">
          <Breadcrumb
            locale={locale}
            items={[{ label: t.breadcrumb }]}
            variant="dark"
          />

          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-iter-chartreuse/10 border border-iter-chartreuse/20 mb-8"
            >
              <Zap size={14} className="text-iter-chartreuse" />
              <span className="text-iter-chartreuse text-sm font-medium">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              {t.hero.title}
              <br />
              <span className="text-iter-chartreuse">{t.hero.titleHighlight}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <button
                onClick={scrollToForm}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:shadow-xl hover:shadow-iter-chartreuse/20 transition-all duration-300 group"
              >
                {t.hero.cta}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <Link
                href={locale === "fr" ? "/services" : `/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-all duration-300"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {clientLogos.slice(0, 5).map((logo, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-white/10 border-2 border-iter-violet flex items-center justify-center overflow-hidden"
                    >
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-white/60 text-sm">{t.hero.socialProof}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-iter-chartreuse fill-iter-chartreuse" />
                ))}
                <span className="text-white/60 text-sm ml-1">{t.hero.trustfolio}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ PROBLEM / SOLUTION ═══════════════════ */}
      <section className="py-20 lg:py-28 bg-white" ref={problemRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-iter-violet text-sm font-semibold tracking-widest uppercase">
              {t.problem.surtitle}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark mt-4">
              {t.problem.title}
            </h2>
          </motion.div>

          {/* Problems */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {t.problem.problems.map((problem, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center p-8 rounded-2xl bg-red-50/50 border border-red-100"
              >
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-5">
                  <ProblemIcon icon={problem.icon} />
                </div>
                <h3 className="text-lg font-bold text-iter-dark mb-3">
                  {problem.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {problem.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Solution */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={problemInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-iter-violet rounded-3xl p-10 lg:p-16"
          >
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                {t.problem.solutionTitle}
              </h3>
              <p className="text-white/70 text-lg leading-relaxed">
                {t.problem.solutionDesc}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {t.problem.benefits.map((benefit, i) => (
                <div key={i} className="text-center">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-5">
                    <BenefitIcon index={i} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">
                    {benefit.title}
                  </h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ MULTI-STEP FORM ═══════════════════ */}
      <section
        ref={formRef}
        id="diagnostic"
        className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white"
      >
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-iter-violet text-sm font-semibold tracking-widest uppercase">
              {t.form.surtitle}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark mt-4 mb-4">
              {t.form.title}
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {t.form.subtitle}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Progress bar */}
            {!isSubmitted && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-foreground/50">
                    {t.form.progress} {currentStep + 1} / {totalSteps}
                  </span>
                  <div className="flex gap-2">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          i <= currentStep
                            ? "bg-iter-violet w-8"
                            : "bg-gray-200 w-4"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-iter-violet rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((currentStep + 1) / totalSteps) * 100}%`,
                    }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
              </div>
            )}

            {/* Form card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-iter-violet/5 border border-gray-100 overflow-hidden">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  /* ─── Success Step ─── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="p-10 lg:p-14 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-iter-chartreuse/20 flex items-center justify-center mx-auto mb-8">
                      <Check size={40} className="text-iter-violet" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-bold text-iter-dark mb-4">
                      {t.form.successStep.title.replace("!", `, ${formData.firstName} !`)}
                    </h3>
                    <p className="text-foreground/60 text-lg leading-relaxed mb-10 max-w-lg mx-auto">
                      {t.form.successStep.subtitle}
                    </p>
                    <Link
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-violet text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
                    >
                      <Calendar size={18} />
                      {t.form.successStep.cta}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </Link>
                    <p className="text-foreground/40 text-sm mt-4">
                      {t.form.successStep.ctaDesc}
                    </p>
                  </motion.div>
                ) : currentStep < t.form.steps.length ? (
                  /* ─── Question Steps ─── */
                  <motion.div
                    key={`step-${currentStep}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="p-10 lg:p-14"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center text-iter-violet">
                        <StepIcon step={currentStep} />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-iter-dark">
                        {t.form.steps[currentStep].question}
                      </h3>
                    </div>

                    <div className="space-y-3 mb-10">
                      {t.form.steps[currentStep].options.map((option, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionSelect(i)}
                          className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 group ${
                            selectedOption === i
                              ? "border-iter-violet bg-iter-violet/5 shadow-md"
                              : "border-gray-100 hover:border-iter-violet/30 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium text-base ${
                                selectedOption === i
                                  ? "text-iter-violet"
                                  : "text-iter-dark"
                              }`}
                            >
                              {option.label}
                            </span>
                            <div
                              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                selectedOption === i
                                  ? "border-iter-violet bg-iter-violet"
                                  : "border-gray-300"
                              }`}
                            >
                              {selectedOption === i && (
                                <Check size={14} className="text-white" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      {currentStep > 0 ? (
                        <button
                          onClick={handlePrev}
                          className="inline-flex items-center gap-2 text-foreground/50 hover:text-iter-violet transition-colors font-medium"
                        >
                          <ArrowLeft size={16} />
                          {t.form.prev}
                        </button>
                      ) : (
                        <div />
                      )}
                      <button
                        onClick={handleNext}
                        disabled={selectedOption === null}
                        className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-base transition-all duration-300 group ${
                          selectedOption !== null
                            ? "bg-iter-violet text-white hover:shadow-lg"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {t.form.next}
                        <ArrowRight
                          size={16}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* ─── Contact Step ─── */
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className="p-10 lg:p-14"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-iter-chartreuse/20 flex items-center justify-center text-iter-violet">
                        <User size={24} />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold text-iter-dark">
                        {t.form.contactStep.title}
                      </h3>
                    </div>
                    <p className="text-foreground/60 mb-8 text-lg">
                      {t.form.contactStep.subtitle}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-2">
                            {t.form.contactStep.fields.firstName} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({ ...formData, firstName: e.target.value })
                            }
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/10 outline-none transition-all text-base"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground/70 mb-2">
                            {t.form.contactStep.fields.lastName} *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({ ...formData, lastName: e.target.value })
                            }
                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/10 outline-none transition-all text-base"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-2">
                          {t.form.contactStep.fields.company} *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({ ...formData, company: e.target.value })
                          }
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/10 outline-none transition-all text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-2">
                          {t.form.contactStep.fields.email} *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/10 outline-none transition-all text-base"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground/70 mb-2">
                          {t.form.contactStep.fields.phone}
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:border-iter-violet focus:ring-2 focus:ring-iter-violet/10 outline-none transition-all text-base"
                        />
                      </div>

                      {/* Navigation */}
                      <div className="flex justify-between items-center pt-4">
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="inline-flex items-center gap-2 text-foreground/50 hover:text-iter-violet transition-colors font-medium"
                        >
                          <ArrowLeft size={16} />
                          {t.form.prev}
                        </button>
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:shadow-xl hover:shadow-iter-chartreuse/20 transition-all duration-300 group"
                        >
                          {t.form.contactStep.submit}
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>

                      <p className="text-foreground/40 text-xs text-center flex items-center justify-center gap-1.5 pt-2">
                        <Shield size={12} />
                        {t.form.contactStep.privacy}
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section className="py-20 lg:py-28 bg-white" ref={testimonialRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-iter-violet text-sm font-semibold tracking-widest uppercase">
              {t.testimonials.surtitle}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark mt-4">
              {t.testimonials.title}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {t.testimonials.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                className="bg-gray-50 rounded-3xl p-8 lg:p-10 relative"
              >
                {/* Result badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-iter-chartreuse/20 text-iter-dark text-sm font-semibold mb-6">
                  <TrendingUp size={14} />
                  {item.result}
                </div>

                {/* Quote */}
                <p className="text-foreground/70 text-base leading-relaxed mb-8 italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-iter-violet/10 flex items-center justify-center">
                    <User size={20} className="text-iter-violet" />
                  </div>
                  <div>
                    <p className="font-semibold text-iter-dark">{item.name}</p>
                    <p className="text-foreground/50 text-sm">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section className="py-20 lg:py-28 bg-gray-50" ref={faqRef}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-iter-violet text-sm font-semibold tracking-widest uppercase">
              {t.faq.surtitle}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-iter-dark mt-4">
              {t.faq.title}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {t.faq.items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-semibold text-iter-dark text-base pr-4">
                    {item.q}
                  </span>
                  {openFaq === i ? (
                    <ChevronUp size={20} className="text-iter-violet flex-shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-foreground/40 flex-shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-foreground/60 text-sm leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-24 lg:py-32 bg-iter-chartreuse relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <circle cx="200" cy="300" r="300" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
            <circle cx="1200" cy="200" r="200" stroke="#0A0A0A" strokeWidth="0.5" fill="none" />
          </svg>
        </div>
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-iter-dark leading-tight mb-6">
              {t.finalCta.title}
            </h2>
            <p className="text-lg text-iter-dark/70 leading-relaxed mb-10">
              {t.finalCta.subtitle}
            </p>
            <button
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-dark text-white font-semibold text-base hover:shadow-xl transition-all duration-300 group"
            >
              {t.finalCta.cta}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
