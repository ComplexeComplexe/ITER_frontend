"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  TrendingUp,
  BarChart3,
  Wallet,
  Users,
  Building2,
  Rocket,
  Calendar,
  Quote,
  ChevronDown,
  Filter,
  Star,
  CheckCircle2,
  Globe,
  Zap,
  Target,
} from "lucide-react";
import { Locale } from "@/lib/i18n";
import { getContactPath, BOOKING_URL } from "@/lib/navigation";
import type { CmsNavItem } from "@/lib/strapi";
import PageLayout from "@/components/PageLayout";
import Breadcrumb from "@/components/Breadcrumb";
import CTASection from "@/components/CTASection";

/* ─── Types ─── */
interface CaseStudy {
  id: string;
  company: string;
  logo: string;
  sector: string;
  sectorTag: string;
  serviceTag: string;
  stage: string;
  location: string;
  challenge: string;
  solution: string;
  results: { metric: string; value: string }[];
  testimonial: { quote: string; author: string; role: string };
  highlight: string;
}

/* ─── Content per locale ─── */
function getContent(locale: Locale) {
  const t = {
    fr: {
      hero: {
        badge: "CAS CLIENTS",
        h1: "Des résultats concrets pour des entreprises ambitieuses",
        subtitle:
          "Découvrez comment nous avons accompagné des startups, scale-ups et PME dans la structuration de leur direction financière.",
        cta: "Prendre rendez-vous",
        ctaSecondary: "Découvrir nos services",
      },
      filters: {
        all: "Tous",
        sectors: ["SaaS / Tech", "Marketplace", "E-commerce", "Mobilité", "PropTech", "FoodTech"],
        services: [
          "DAF externalisé",
          "Levée de fonds",
          "Trésorerie",
          "Contrôle de gestion",
          "Comptabilité",
        ],
        filterLabel: "Filtrer par",
      },
      caseStudies: [
        {
          id: "happyscribe",
          company: "HappyScribe",
          logo: "/images/logos/logo-happyscribe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "DAF externalisé",
          stage: "Série A",
          location: "Barcelone",
          challenge:
            "HappyScribe, plateforme SaaS de transcription automatique, connaissait une croissance rapide après sa Série A mais manquait de visibilité financière pour piloter son scaling international.",
          solution:
            "Mise en place d'un CFO à temps partagé pour structurer le reporting financier, déployer des KPIs SaaS (MRR, churn, LTV/CAC) et préparer les discussions avec les investisseurs pour le prochain tour.",
          results: [
            { metric: "Temps de clôture mensuelle", value: "-60%" },
            { metric: "Visibilité trésorerie", value: "12 mois" },
            { metric: "KPIs SaaS automatisés", value: "15+" },
          ],
          testimonial: {
            quote:
              "Iter Advisors nous a apporté la rigueur financière dont nous avions besoin pour passer à l'échelle, tout en restant agile.",
            author: "HappyScribe",
            role: "Founding Team",
          },
          highlight: "-60% temps de clôture",
        },
        {
          id: "surfe",
          company: "Surfe",
          logo: "/images/logos/logo-surfe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "Levée de fonds",
          stage: "Série A",
          location: "Paris",
          challenge:
            "Surfe, outil de synchronisation CRM-LinkedIn en forte croissance, devait structurer sa fonction finance pour préparer sa Série A et convaincre des investisseurs tier-1.",
          solution:
            "Accompagnement complet sur la préparation de la data room, la modélisation financière, le business plan et le coaching des fondateurs pour les pitchs investisseurs.",
          results: [
            { metric: "Levée de fonds réussie", value: "Série A" },
            { metric: "Data room prête en", value: "4 semaines" },
            { metric: "Investisseurs rencontrés", value: "30+" },
          ],
          testimonial: {
            quote:
              "L'équipe Iter a été déterminante dans le succès de notre Série A. Leur expertise et leur réactivité ont fait la différence.",
            author: "Surfe",
            role: "CEO",
          },
          highlight: "Série A réussie",
        },
        {
          id: "ukio",
          company: "Ukio",
          logo: "/images/logos/logo-ukio.jpg",
          sector: "PropTech",
          sectorTag: "PropTech",
          serviceTag: "Contrôle de gestion",
          stage: "Scale-up",
          location: "Barcelone",
          challenge:
            "Ukio, plateforme de location flexible pour digital nomads, avait besoin de structurer son contrôle de gestion pour piloter sa croissance multi-pays (Espagne, France, Portugal).",
          solution:
            "Déploiement d'un contrôle de gestion externalisé avec tableaux de bord par pays, suivi de la rentabilité par appartement et optimisation du BFR dans un contexte de forte croissance.",
          results: [
            { metric: "Marge opérationnelle", value: "+8 pts" },
            { metric: "Reporting par pays", value: "Temps réel" },
            { metric: "Optimisation BFR", value: "-25%" },
          ],
          testimonial: {
            quote:
              "Grâce à Iter, nous avons une vision claire de la rentabilité de chaque marché. C'est un game-changer pour nos décisions stratégiques.",
            author: "Ukio",
            role: "COO",
          },
          highlight: "+8 pts marge opérationnelle",
        },
        {
          id: "seasonly",
          company: "Seasonly",
          logo: "/images/logos/logo-seasonly.jpg",
          sector: "E-commerce",
          sectorTag: "E-commerce",
          serviceTag: "Trésorerie",
          stage: "PME",
          location: "Paris",
          challenge:
            "Seasonly, marque de cosmétiques bio en ligne, faisait face à des tensions de trésorerie récurrentes liées à la saisonnalité de son activité et aux délais de paiement fournisseurs.",
          solution:
            "Mise en place d'un prévisionnel de trésorerie glissant sur 12 mois, renégociation des conditions fournisseurs et optimisation du cycle de cash conversion.",
          results: [
            { metric: "Cash runway étendu", value: "+6 mois" },
            { metric: "Délai fournisseur", value: "+30 jours" },
            { metric: "Prévisionnel glissant", value: "12 mois" },
          ],
          testimonial: {
            quote:
              "On est passé d'une gestion au jour le jour à une vraie visibilité sur notre trésorerie. Iter nous a donné la sérénité pour investir dans notre croissance.",
            author: "Seasonly",
            role: "Fondatrice",
          },
          highlight: "+6 mois de runway",
        },
        {
          id: "neat",
          company: "Neat",
          logo: "/images/logos/logo-neat.jpg",
          sector: "FoodTech",
          sectorTag: "FoodTech",
          serviceTag: "DAF externalisé",
          stage: "Seed",
          location: "Barcelone",
          challenge:
            "Neat, startup FoodTech en phase Seed, avait besoin d'un DAF pour structurer sa comptabilité, ses processus financiers et préparer son premier reporting investisseurs.",
          solution:
            "DAF externalisé à temps partagé (2 jours/semaine) pour mettre en place la comptabilité analytique, le reporting mensuel et les processus de facturation et encaissement.",
          results: [
            { metric: "Processus financiers", value: "100% structurés" },
            { metric: "Reporting investisseurs", value: "Mensuel" },
            { metric: "Temps DAF", value: "2j/semaine" },
          ],
          testimonial: {
            quote:
              "Avoir un DAF Iter dès le Seed nous a permis de poser des bases solides. Nos investisseurs apprécient la qualité de notre reporting.",
            author: "Neat",
            role: "CEO",
          },
          highlight: "100% processus structurés",
        },
        {
          id: "yego",
          company: "Yego",
          logo: "/images/logos/logo-yego.jpg",
          sector: "Mobilité",
          sectorTag: "Mobilité",
          serviceTag: "Comptabilité",
          stage: "Scale-up",
          location: "Barcelone",
          challenge:
            "Yego, opérateur de scooters électriques en libre-service, avait besoin d'externaliser sa comptabilité multi-pays tout en maintenant un haut niveau de fiabilité pour ses investisseurs.",
          solution:
            "Externalisation comptable complète (Espagne, France) avec mise en place de processus de clôture rapide, réconciliation bancaire automatisée et reporting consolidé.",
          results: [
            { metric: "Clôture mensuelle", value: "J+5" },
            { metric: "Pays couverts", value: "2" },
            { metric: "Erreurs comptables", value: "-90%" },
          ],
          testimonial: {
            quote:
              "L'externalisation avec Iter nous a permis de réduire nos coûts tout en améliorant drastiquement la qualité de notre comptabilité.",
            author: "Yego",
            role: "CFO",
          },
          highlight: "Clôture à J+5",
        },
      ] as CaseStudy[],
      stats: {
        heading: "L'impact Iter Advisors en chiffres",
        items: [
          { value: "50+", label: "Entreprises accompagnées" },
          { value: "15+", label: "Experts CFO" },
          { value: "€200M+", label: "De fonds levés par nos clients" },
          { value: "5/5", label: "Note Trustfolio" },
        ],
      },
      detail: {
        challenge: "Le défi",
        solution: "Notre solution",
        results: "Résultats",
        readMore: "Voir le détail",
        close: "Fermer",
      },
      methodology: {
        badge: "NOTRE APPROCHE",
        heading: "Une méthode éprouvée, des résultats mesurables",
        steps: [
          {
            icon: "Target",
            title: "Diagnostic",
            desc: "Audit complet de votre situation financière et identification des enjeux prioritaires.",
          },
          {
            icon: "Zap",
            title: "Plan d'action",
            desc: "Co-construction d'une feuille de route avec des objectifs mesurables et des jalons concrets.",
          },
          {
            icon: "Rocket",
            title: "Déploiement",
            desc: "Nos experts s'intègrent à votre équipe et déploient les solutions opérationnelles.",
          },
          {
            icon: "TrendingUp",
            title: "Résultats",
            desc: "Suivi continu, ajustement de la stratégie et accompagnement dans la durée.",
          },
        ],
      },
    },
    en: {
      hero: {
        badge: "CASE STUDIES",
        h1: "Concrete results for ambitious companies",
        subtitle:
          "Discover how we've helped startups, scale-ups and SMEs structure their financial management.",
        cta: "Book a meeting",
        ctaSecondary: "Discover our services",
      },
      filters: {
        all: "All",
        sectors: ["SaaS / Tech", "Marketplace", "E-commerce", "Mobility", "PropTech", "FoodTech"],
        services: [
          "Outsourced CFO",
          "Fundraising",
          "Treasury",
          "Management control",
          "Accounting",
        ],
        filterLabel: "Filter by",
      },
      caseStudies: [
        {
          id: "happyscribe",
          company: "HappyScribe",
          logo: "/images/logos/logo-happyscribe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "Outsourced CFO",
          stage: "Series A",
          location: "Barcelona",
          challenge:
            "HappyScribe, an automatic transcription SaaS platform, was experiencing rapid growth after its Series A but lacked financial visibility to manage its international scaling.",
          solution:
            "Deployment of a part-time CFO to structure financial reporting, implement SaaS KPIs (MRR, churn, LTV/CAC) and prepare discussions with investors for the next round.",
          results: [
            { metric: "Monthly close time", value: "-60%" },
            { metric: "Cash visibility", value: "12 months" },
            { metric: "Automated SaaS KPIs", value: "15+" },
          ],
          testimonial: {
            quote:
              "Iter Advisors brought us the financial rigor we needed to scale, while remaining agile.",
            author: "HappyScribe",
            role: "Founding Team",
          },
          highlight: "-60% close time",
        },
        {
          id: "surfe",
          company: "Surfe",
          logo: "/images/logos/logo-surfe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "Fundraising",
          stage: "Series A",
          location: "Paris",
          challenge:
            "Surfe, a fast-growing CRM-LinkedIn sync tool, needed to structure its finance function to prepare its Series A and convince tier-1 investors.",
          solution:
            "End-to-end support on data room preparation, financial modeling, business plan and founder coaching for investor pitches.",
          results: [
            { metric: "Successful fundraise", value: "Series A" },
            { metric: "Data room ready in", value: "4 weeks" },
            { metric: "Investors met", value: "30+" },
          ],
          testimonial: {
            quote:
              "The Iter team was decisive in the success of our Series A. Their expertise and responsiveness made all the difference.",
            author: "Surfe",
            role: "CEO",
          },
          highlight: "Series A closed",
        },
        {
          id: "ukio",
          company: "Ukio",
          logo: "/images/logos/logo-ukio.jpg",
          sector: "PropTech",
          sectorTag: "PropTech",
          serviceTag: "Management control",
          stage: "Scale-up",
          location: "Barcelona",
          challenge:
            "Ukio, a flexible rental platform for digital nomads, needed to structure its management control to steer multi-country growth (Spain, France, Portugal).",
          solution:
            "Deployment of outsourced management control with dashboards by country, profitability tracking per apartment and working capital optimization in a high-growth context.",
          results: [
            { metric: "Operating margin", value: "+8 pts" },
            { metric: "Country reporting", value: "Real-time" },
            { metric: "Working capital", value: "-25%" },
          ],
          testimonial: {
            quote:
              "Thanks to Iter, we have a clear view of each market's profitability. It's a game-changer for our strategic decisions.",
            author: "Ukio",
            role: "COO",
          },
          highlight: "+8 pts operating margin",
        },
        {
          id: "seasonly",
          company: "Seasonly",
          logo: "/images/logos/logo-seasonly.jpg",
          sector: "E-commerce",
          sectorTag: "E-commerce",
          serviceTag: "Treasury",
          stage: "SME",
          location: "Paris",
          challenge:
            "Seasonly, an online organic cosmetics brand, faced recurring cash flow tensions linked to seasonality and supplier payment terms.",
          solution:
            "Implementation of a rolling 12-month cash forecast, renegotiation of supplier terms and optimization of the cash conversion cycle.",
          results: [
            { metric: "Cash runway extended", value: "+6 months" },
            { metric: "Supplier terms", value: "+30 days" },
            { metric: "Rolling forecast", value: "12 months" },
          ],
          testimonial: {
            quote:
              "We went from day-to-day management to real visibility on our cash flow. Iter gave us the peace of mind to invest in growth.",
            author: "Seasonly",
            role: "Founder",
          },
          highlight: "+6 months runway",
        },
        {
          id: "neat",
          company: "Neat",
          logo: "/images/logos/logo-neat.jpg",
          sector: "FoodTech",
          sectorTag: "FoodTech",
          serviceTag: "Outsourced CFO",
          stage: "Seed",
          location: "Barcelona",
          challenge:
            "Neat, a Seed-stage FoodTech startup, needed a CFO to structure its accounting, financial processes and prepare its first investor reporting.",
          solution:
            "Part-time outsourced CFO (2 days/week) to set up analytical accounting, monthly reporting and invoicing/collection processes.",
          results: [
            { metric: "Financial processes", value: "100% structured" },
            { metric: "Investor reporting", value: "Monthly" },
            { metric: "CFO time", value: "2d/week" },
          ],
          testimonial: {
            quote:
              "Having an Iter CFO from Seed allowed us to lay solid foundations. Our investors appreciate the quality of our reporting.",
            author: "Neat",
            role: "CEO",
          },
          highlight: "100% processes structured",
        },
        {
          id: "yego",
          company: "Yego",
          logo: "/images/logos/logo-yego.jpg",
          sector: "Mobility",
          sectorTag: "Mobilité",
          serviceTag: "Accounting",
          stage: "Scale-up",
          location: "Barcelona",
          challenge:
            "Yego, an electric scooter sharing operator, needed to outsource its multi-country accounting while maintaining high reliability for investors.",
          solution:
            "Full accounting outsourcing (Spain, France) with fast close processes, automated bank reconciliation and consolidated reporting.",
          results: [
            { metric: "Monthly close", value: "D+5" },
            { metric: "Countries covered", value: "2" },
            { metric: "Accounting errors", value: "-90%" },
          ],
          testimonial: {
            quote:
              "Outsourcing with Iter allowed us to reduce costs while drastically improving accounting quality.",
            author: "Yego",
            role: "CFO",
          },
          highlight: "Close at D+5",
        },
      ] as CaseStudy[],
      stats: {
        heading: "The Iter Advisors impact in numbers",
        items: [
          { value: "50+", label: "Companies supported" },
          { value: "15+", label: "CFO experts" },
          { value: "€200M+", label: "Raised by our clients" },
          { value: "5/5", label: "Trustfolio rating" },
        ],
      },
      detail: {
        challenge: "The challenge",
        solution: "Our solution",
        results: "Results",
        readMore: "View details",
        close: "Close",
      },
      methodology: {
        badge: "OUR APPROACH",
        heading: "A proven method, measurable results",
        steps: [
          {
            icon: "Target",
            title: "Diagnostic",
            desc: "Complete audit of your financial situation and identification of priority issues.",
          },
          {
            icon: "Zap",
            title: "Action plan",
            desc: "Co-construction of a roadmap with measurable objectives and concrete milestones.",
          },
          {
            icon: "Rocket",
            title: "Deployment",
            desc: "Our experts integrate into your team and deploy operational solutions.",
          },
          {
            icon: "TrendingUp",
            title: "Results",
            desc: "Continuous monitoring, strategy adjustment and long-term support.",
          },
        ],
      },
    },
    es: {
      hero: {
        badge: "CASOS DE ÉXITO",
        h1: "Resultados concretos para empresas ambiciosas",
        subtitle:
          "Descubra cómo hemos acompañado a startups, scale-ups y PYMEs en la estructuración de su dirección financiera.",
        cta: "Concertar una cita",
        ctaSecondary: "Descubrir nuestros servicios",
      },
      filters: {
        all: "Todos",
        sectors: ["SaaS / Tech", "Marketplace", "E-commerce", "Movilidad", "PropTech", "FoodTech"],
        services: [
          "DAF externalizado",
          "Levantamiento de fondos",
          "Tesorería",
          "Control de gestión",
          "Contabilidad",
        ],
        filterLabel: "Filtrar por",
      },
      caseStudies: [
        {
          id: "happyscribe",
          company: "HappyScribe",
          logo: "/images/logos/logo-happyscribe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "DAF externalizado",
          stage: "Serie A",
          location: "Barcelona",
          challenge:
            "HappyScribe, plataforma SaaS de transcripción automática, experimentaba un crecimiento rápido tras su Serie A pero carecía de visibilidad financiera para gestionar su escalado internacional.",
          solution:
            "Implementación de un CFO a tiempo parcial para estructurar el reporting financiero, desplegar KPIs SaaS (MRR, churn, LTV/CAC) y preparar las discusiones con inversores para la siguiente ronda.",
          results: [
            { metric: "Tiempo de cierre mensual", value: "-60%" },
            { metric: "Visibilidad de tesorería", value: "12 meses" },
            { metric: "KPIs SaaS automatizados", value: "15+" },
          ],
          testimonial: {
            quote:
              "Iter Advisors nos aportó el rigor financiero que necesitábamos para escalar, manteniendo la agilidad.",
            author: "HappyScribe",
            role: "Founding Team",
          },
          highlight: "-60% tiempo de cierre",
        },
        {
          id: "surfe",
          company: "Surfe",
          logo: "/images/logos/logo-surfe.jpg",
          sector: "SaaS / Tech",
          sectorTag: "SaaS / Tech",
          serviceTag: "Levantamiento de fondos",
          stage: "Serie A",
          location: "París",
          challenge:
            "Surfe, herramienta de sincronización CRM-LinkedIn en fuerte crecimiento, necesitaba estructurar su función financiera para preparar su Serie A y convencer a inversores tier-1.",
          solution:
            "Acompañamiento completo en la preparación de la data room, modelización financiera, plan de negocio y coaching de fundadores para los pitchs con inversores.",
          results: [
            { metric: "Ronda exitosa", value: "Serie A" },
            { metric: "Data room lista en", value: "4 semanas" },
            { metric: "Inversores contactados", value: "30+" },
          ],
          testimonial: {
            quote:
              "El equipo de Iter fue determinante en el éxito de nuestra Serie A. Su experiencia y reactividad marcaron la diferencia.",
            author: "Surfe",
            role: "CEO",
          },
          highlight: "Serie A cerrada",
        },
        {
          id: "ukio",
          company: "Ukio",
          logo: "/images/logos/logo-ukio.jpg",
          sector: "PropTech",
          sectorTag: "PropTech",
          serviceTag: "Control de gestión",
          stage: "Scale-up",
          location: "Barcelona",
          challenge:
            "Ukio, plataforma de alquiler flexible para nómadas digitales, necesitaba estructurar su control de gestión para pilotar su crecimiento multi-país (España, Francia, Portugal).",
          solution:
            "Despliegue de un control de gestión externalizado con dashboards por país, seguimiento de rentabilidad por apartamento y optimización del capital circulante en contexto de fuerte crecimiento.",
          results: [
            { metric: "Margen operativo", value: "+8 pts" },
            { metric: "Reporting por país", value: "Tiempo real" },
            { metric: "Capital circulante", value: "-25%" },
          ],
          testimonial: {
            quote:
              "Gracias a Iter, tenemos una visión clara de la rentabilidad de cada mercado. Es un game-changer para nuestras decisiones estratégicas.",
            author: "Ukio",
            role: "COO",
          },
          highlight: "+8 pts margen operativo",
        },
        {
          id: "seasonly",
          company: "Seasonly",
          logo: "/images/logos/logo-seasonly.jpg",
          sector: "E-commerce",
          sectorTag: "E-commerce",
          serviceTag: "Tesorería",
          stage: "PYME",
          location: "París",
          challenge:
            "Seasonly, marca de cosmética bio online, enfrentaba tensiones de tesorería recurrentes vinculadas a la estacionalidad y los plazos de pago a proveedores.",
          solution:
            "Implementación de un previsional de tesorería deslizante a 12 meses, renegociación de condiciones con proveedores y optimización del ciclo de conversión de caja.",
          results: [
            { metric: "Runway extendido", value: "+6 meses" },
            { metric: "Plazo proveedores", value: "+30 días" },
            { metric: "Previsional deslizante", value: "12 meses" },
          ],
          testimonial: {
            quote:
              "Pasamos de una gestión día a día a una verdadera visibilidad sobre nuestra tesorería. Iter nos dio la serenidad para invertir en crecimiento.",
            author: "Seasonly",
            role: "Fundadora",
          },
          highlight: "+6 meses de runway",
        },
        {
          id: "neat",
          company: "Neat",
          logo: "/images/logos/logo-neat.jpg",
          sector: "FoodTech",
          sectorTag: "FoodTech",
          serviceTag: "DAF externalizado",
          stage: "Seed",
          location: "Barcelona",
          challenge:
            "Neat, startup FoodTech en fase Seed, necesitaba un DAF para estructurar su contabilidad, procesos financieros y preparar su primer reporting para inversores.",
          solution:
            "DAF externalizado a tiempo parcial (2 días/semana) para implementar contabilidad analítica, reporting mensual y procesos de facturación y cobro.",
          results: [
            { metric: "Procesos financieros", value: "100% estructurados" },
            { metric: "Reporting inversores", value: "Mensual" },
            { metric: "Tiempo DAF", value: "2d/semana" },
          ],
          testimonial: {
            quote:
              "Tener un DAF Iter desde el Seed nos permitió sentar bases sólidas. Nuestros inversores aprecian la calidad de nuestro reporting.",
            author: "Neat",
            role: "CEO",
          },
          highlight: "100% procesos estructurados",
        },
        {
          id: "yego",
          company: "Yego",
          logo: "/images/logos/logo-yego.jpg",
          sector: "Movilidad",
          sectorTag: "Mobilité",
          serviceTag: "Contabilidad",
          stage: "Scale-up",
          location: "Barcelona",
          challenge:
            "Yego, operador de scooters eléctricos compartidos, necesitaba externalizar su contabilidad multi-país manteniendo alta fiabilidad para sus inversores.",
          solution:
            "Externalización contable completa (España, Francia) con procesos de cierre rápido, conciliación bancaria automatizada y reporting consolidado.",
          results: [
            { metric: "Cierre mensual", value: "D+5" },
            { metric: "Países cubiertos", value: "2" },
            { metric: "Errores contables", value: "-90%" },
          ],
          testimonial: {
            quote:
              "La externalización con Iter nos permitió reducir costes mejorando drásticamente la calidad contable.",
            author: "Yego",
            role: "CFO",
          },
          highlight: "Cierre en D+5",
        },
      ] as CaseStudy[],
      stats: {
        heading: "El impacto de Iter Advisors en cifras",
        items: [
          { value: "50+", label: "Empresas acompañadas" },
          { value: "15+", label: "Expertos CFO" },
          { value: "€200M+", label: "Levantados por nuestros clientes" },
          { value: "5/5", label: "Nota Trustfolio" },
        ],
      },
      detail: {
        challenge: "El desafío",
        solution: "Nuestra solución",
        results: "Resultados",
        readMore: "Ver detalle",
        close: "Cerrar",
      },
      methodology: {
        badge: "NUESTRO ENFOQUE",
        heading: "Un método probado, resultados medibles",
        steps: [
          {
            icon: "Target",
            title: "Diagnóstico",
            desc: "Auditoría completa de su situación financiera e identificación de prioridades.",
          },
          {
            icon: "Zap",
            title: "Plan de acción",
            desc: "Co-construcción de una hoja de ruta con objetivos medibles y hitos concretos.",
          },
          {
            icon: "Rocket",
            title: "Despliegue",
            desc: "Nuestros expertos se integran en su equipo y despliegan soluciones operativas.",
          },
          {
            icon: "TrendingUp",
            title: "Resultados",
            desc: "Seguimiento continuo, ajuste de estrategia y acompañamiento a largo plazo.",
          },
        ],
      },
    },
  };
  return t[locale];
}

const iconMap: Record<string, React.ElementType> = {
  Target,
  Zap,
  Rocket,
  TrendingUp,
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-4xl lg:text-5xl font-bold font-heading text-white"
    >
      {value}
    </motion.span>
  );
}

/* ─── Case Card Component ─── */
function CaseCard({
  cs,
  index,
  locale,
  onSelect,
}: {
  cs: CaseStudy;
  index: number;
  locale: Locale;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const t = getContent(locale);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-white border border-border/50 rounded-2xl overflow-hidden hover:border-iter-violet/30 hover:shadow-lg transition-all duration-300"
    >
      {/* Header with logo and tags */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/30">
            <Image
              src={cs.logo}
              alt={cs.company}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-iter-violet/10 text-iter-violet">
              {cs.sectorTag}
            </span>
            <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-iter-chartreuse/30 text-iter-dark">
              {cs.serviceTag}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold font-heading mb-1 group-hover:text-iter-violet transition-colors">
          {cs.company}
        </h3>
        <div className="flex items-center gap-3 text-[13px] text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Building2 size={13} />
            {cs.stage}
          </span>
          <span className="flex items-center gap-1">
            <Globe size={13} />
            {cs.location}
          </span>
        </div>

        {/* Highlight metric */}
        <div className="bg-iter-violet/5 rounded-xl p-4 mb-4">
          <div className="text-2xl font-bold font-heading text-iter-violet">{cs.highlight}</div>
        </div>

        {/* Challenge excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
          {cs.challenge}
        </p>
      </div>

      {/* Results preview */}
      <div className="px-6 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {cs.results.map((r, i) => (
            <div key={i} className="text-center">
              <div className="text-base font-bold font-heading text-iter-dark">{r.value}</div>
              <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{r.metric}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 pb-6">
        <button
          onClick={onSelect}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-iter-dark text-white text-sm font-semibold hover:bg-iter-violet transition-colors duration-300"
        >
          {t.detail.readMore}
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}

/* ─── Detail Modal ─── */
function CaseDetail({
  cs,
  locale,
  onClose,
}: {
  cs: CaseStudy;
  locale: Locale;
  onClose: () => void;
}) {
  const t = getContent(locale);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="sticky top-0 bg-white border-b border-border/30 p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center overflow-hidden border border-border/30">
              <Image src={cs.logo} alt={cs.company} width={36} height={36} className="object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">{cs.company}</h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{cs.stage}</span>
                <span>·</span>
                <span>{cs.location}</span>
                <span>·</span>
                <span>{cs.sectorTag}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors text-lg"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Challenge */}
          <div>
            <h4 className="text-sm font-semibold text-iter-violet uppercase tracking-wide mb-2">
              {t.detail.challenge}
            </h4>
            <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
          </div>

          {/* Solution */}
          <div>
            <h4 className="text-sm font-semibold text-iter-violet uppercase tracking-wide mb-2">
              {t.detail.solution}
            </h4>
            <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
          </div>

          {/* Results */}
          <div>
            <h4 className="text-sm font-semibold text-iter-violet uppercase tracking-wide mb-3">
              {t.detail.results}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {cs.results.map((r, i) => (
                <div key={i} className="bg-iter-violet/5 rounded-xl p-4 text-center">
                  <div className="text-xl font-bold font-heading text-iter-violet">{r.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{r.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-iter-dark rounded-xl p-6">
            <Quote size={24} className="text-iter-chartreuse mb-3" />
            <p className="text-white/90 leading-relaxed italic mb-4">
              &ldquo;{cs.testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-iter-violet flex items-center justify-center text-white text-xs font-bold">
                {cs.testimonial.author.charAt(0)}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{cs.testimonial.author}</div>
                <div className="text-white/50 text-xs">{cs.testimonial.role}</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Link
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-iter-violet text-white font-semibold text-sm hover:bg-iter-violet/90 transition-colors"
            >
              {getContent(locale).hero.cta}
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
            >
              {t.detail.close}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page Component ─── */
export default function CasClientsPage({
  locale,
  cmsNavigation,
}: {
  locale: Locale;
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getContent(locale);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const serviceFilters = t.caseStudies
    .map((cs) => cs.serviceTag)
    .filter((v, i, a) => a.indexOf(v) === i);

  const filteredCases =
    activeFilter === "all"
      ? t.caseStudies
      : t.caseStudies.filter(
          (cs) => cs.sectorTag === activeFilter || cs.serviceTag === activeFilter
        );

  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      {/* Hero */}
      <section className="relative bg-iter-violet pt-32 pb-20 lg:pb-28 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <circle cx="300" cy="100" r="400" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="1100" cy="400" r="300" stroke="white" strokeWidth="0.5" fill="none" />
            <circle cx="700" cy="300" r="200" stroke="white" strokeWidth="0.3" fill="none" />
          </svg>
        </div>

        <div className="container relative z-10">
          <Breadcrumb locale={locale} items={[{ label: t.hero.badge }]} variant="dark" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-block text-[11px] font-semibold tracking-widest text-iter-chartreuse uppercase mb-4">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl lg:text-6xl font-bold font-heading text-white leading-tight mb-6">
              {t.hero.h1}
            </h1>
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-iter-chartreuse text-iter-dark font-semibold text-base hover:shadow-xl transition-all duration-300 group"
              >
                <Calendar size={18} />
                {t.hero.cta}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={locale === "fr" ? "/services" : `/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-all duration-300"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </motion.div>

          {/* Client logos strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 flex items-center gap-8 flex-wrap"
          >
            {t.caseStudies.slice(0, 6).map((cs) => (
              <div
                key={cs.id}
                className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden"
              >
                <Image
                  src={cs.logo}
                  alt={cs.company}
                  width={32}
                  height={32}
                  className="object-contain opacity-70"
                />
              </div>
            ))}
            <div className="flex items-center gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-iter-chartreuse fill-iter-chartreuse" />
              ))}
              <span className="text-white/50 text-xs ml-1">5/5 Trustfolio</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-iter-dark py-12">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {t.stats.items.map((stat, i) => (
              <div key={i}>
                <AnimatedCounter value={stat.value} />
                <div className="text-white/50 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Cases */}
      <section className="bg-background py-20 lg:py-28">
        <div className="container">
          {/* Filter bar */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <Filter size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground font-medium">
                {t.filters.filterLabel}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === "all"
                    ? "bg-iter-violet text-white"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted"
                }`}
              >
                {t.filters.all}
              </button>
              {serviceFilters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeFilter === f
                      ? "bg-iter-violet text-white"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Case cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="wait">
              {filteredCases.map((cs, i) => (
                <CaseCard
                  key={cs.id}
                  cs={cs}
                  index={i}
                  locale={locale}
                  onSelect={() => setSelectedCase(cs)}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="bg-muted/30 py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <span className="inline-block text-[11px] font-semibold tracking-widest text-iter-violet uppercase mb-3">
              {t.methodology.badge}
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading">{t.methodology.heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.methodology.steps.map((step, i) => {
              const Icon = iconMap[step.icon] || Target;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-border/50"
                >
                  <div className="w-12 h-12 rounded-xl bg-iter-violet/10 flex items-center justify-center mb-4">
                    <Icon size={22} className="text-iter-violet" />
                  </div>
                  <div className="text-xs font-bold text-iter-violet/50 mb-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection locale={locale} />

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCase && (
          <CaseDetail cs={selectedCase} locale={locale} onClose={() => setSelectedCase(null)} />
        )}
      </AnimatePresence>
    </PageLayout>
  );
}
