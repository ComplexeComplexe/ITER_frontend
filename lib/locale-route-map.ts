import type { Locale } from "./i18n";

/** Published routes only. The proposed translations are not navigation targets. */
export const LOCALE_ROUTES: Record<string, Record<Locale, string>> = {
  "/": {
    "fr": "/",
    "en": "/en",
    "es": "/es"
  },
  "/daf-externalise": {
    "fr": "/daf-externalise",
    "en": "/en/fractional-cfo",
    "es": "/es/externalizacion-daf"
  },
  "/daf-externalise/metier": {
    "fr": "/daf-externalise/metier",
    "en": "/en/fractional-cfo/role",
    "es": "/es/externalizacion-daf/funciones"
  },
  "/daf-externalise/tarifs": {
    "fr": "/daf-externalise/tarifs",
    "en": "/en/fractional-cfo/pricing",
    "es": "/es/externalizacion-daf/precios"
  },
  "/fractional-cfo-startups": {
    "fr": "/fractional-cfo-startups",
    "en": "/en/fractional-cfo-for-startups",
    "es": "/es/cfo-externo-startups"
  },
  "/daf-externalise/secteurs": {
    "fr": "/daf-externalise/secteurs",
    "en": "/en/fractional-cfo/sectors",
    "es": "/es/externalizacion-daf/sectores"
  },
  "/daf-externalise/ecommerce": {
    "fr": "/daf-externalise/ecommerce",
    "en": "/en/fractional-cfo/ecommerce",
    "es": "/es/externalizacion-daf/ecommerce"
  },
  "/daf-externalise/industrie": {
    "fr": "/daf-externalise/industrie",
    "en": "/en/fractional-cfo/manufacturing",
    "es": "/es/externalizacion-daf/industria"
  },
  "/daf-externalise/deep-tech": {
    "fr": "/daf-externalise/deep-tech",
    "en": "/en/fractional-cfo/deep-tech",
    "es": "/es/externalizacion-daf/deep-tech"
  },
  "/daf-externalise/temps-partage": {
    "fr": "/daf-externalise/temps-partage",
    "en": "/en/fractional-cfo/shared-time",
    "es": "/es/externalizacion-daf/tiempo-compartido"
  },
  "/daf-externalise/transition": {
    "fr": "/daf-externalise/transition",
    "en": "/en/fractional-cfo/transition",
    "es": "/es/externalizacion-daf/transicion"
  },
  "/drh-externalise": {
    "fr": "/drh-externalise",
    "en": "/en/hr-outsourcing",
    "es": "/es/externalizacion-rrhh"
  },
  "/drh-externalise/temps-partage": {
    "fr": "/drh-externalise/temps-partage",
    "en": "/en/hr-outsourcing/shared-time",
    "es": "/es/externalizacion-rrhh/tiempo-compartido"
  },
  "/services": {
    "fr": "/services",
    "en": "/en/services",
    "es": "/es/services"
  },
  "/services/previsionnel-tresorerie": {
    "fr": "/services/previsionnel-tresorerie",
    "en": "/en/services/cash-flow-forecast",
    "es": "/es/services/prevision-tesoreria"
  },
  "/services/gestion-financiere-externalisee": {
    "fr": "/services/gestion-financiere-externalisee",
    "en": "/en/services/financial-operations-organization",
    "es": "/es/services/gestion-financiera-externalizada"
  },
  "/services/accompagnement-levee-de-fond": {
    "fr": "/services/accompagnement-levee-de-fond",
    "en": "/en/services/fund-raising-support",
    "es": "/es/services/soporte-financiacion"
  },
  "/services/comptabilite-externalisation": {
    "fr": "/services/comptabilite-externalisation",
    "en": "/en/services/outsource-your-accounting",
    "es": "/es/services/externalizar-contabilidad"
  },
  "/services/controle-de-gestion-externalise": {
    "fr": "/services/controle-de-gestion-externalise",
    "en": "/en/services/outsourced-management-control",
    "es": "/es/services/control-gestion-externalizado"
  },
  "/services/ma-due-diligence": {
    "fr": "/services/ma-due-diligence",
    "en": "/en/services/ma-due-diligence",
    "es": "/es/services/ma-due-diligence"
  },
  "/ressources": {
    "fr": "/ressources",
    "en": "/en/ressources",
    "es": "/es/recursos"
  },
  "/ressources/blog": {
    "fr": "/ressources/blog",
    "en": "/en/ressources/blog",
    "es": "/es/recursos/blog"
  },
  "/ressources/glossaire": {
    "fr": "/ressources/glossaire",
    "en": "/en/ressources/glossaire",
    "es": "/es/recursos/glosario"
  },
  "/ressources/cas-clients": {
    "fr": "/ressources/cas-clients",
    "en": "/en/ressources/cas-clients",
    "es": "/es/recursos/casos-de-exito"
  },
  "/ressources/outils": {
    "fr": "/ressources/outils",
    "en": "/en/ressources/tools",
    "es": "/es/recursos/herramientas"
  },
  "/ressources/fiscalite-espagne-france": {
    "fr": "/ressources/fiscalite-espagne-france",
    "en": "/ressources/fiscalite-espagne-france",
    "es": "/ressources/fiscalite-espagne-france"
  },
  "/ressources/fiscalite/residence-fiscale-france-espagne": {
    "fr": "/ressources/fiscalite/residence-fiscale-france-espagne",
    "en": "/ressources/fiscalite/residence-fiscale-france-espagne",
    "es": "/ressources/fiscalite/residence-fiscale-france-espagne"
  },
  "/ressources/fiscalite/double-imposition-france-espagne": {
    "fr": "/ressources/fiscalite/double-imposition-france-espagne",
    "en": "/ressources/fiscalite/double-imposition-france-espagne",
    "es": "/ressources/fiscalite/double-imposition-france-espagne"
  },
  "/ressources/fiscalite/impot-revenu-espagne": {
    "fr": "/ressources/fiscalite/impot-revenu-espagne",
    "en": "/ressources/fiscalite/impot-revenu-espagne",
    "es": "/ressources/fiscalite/impot-revenu-espagne"
  },
  "/ressources/fiscalite/beckham-law": {
    "fr": "/ressources/fiscalite/beckham-law",
    "en": "/ressources/fiscalite/beckham-law",
    "es": "/ressources/fiscalite/beckham-law"
  },
  "/ressources/fiscalite/modelo-720": {
    "fr": "/ressources/fiscalite/modelo-720",
    "en": "/ressources/fiscalite/modelo-720",
    "es": "/ressources/fiscalite/modelo-720"
  },
  "/ressources/ia-finance": {
    "fr": "/ressources/ia-finance",
    "en": "/en/resources/ai-finance",
    "es": "/es/recursos/ia-finanzas"
},
  "/ressources/ia-finance/automatiser-reporting-financier": {
    "fr": "/ressources/ia-finance/automatiser-reporting-financier",
    "en": "/en/resources/ai-finance/automate-financial-reporting",
    "es": "/es/recursos/ia-finanzas/automatizar-reporting-financiero"
},
  "/ressources/ia-finance/chatgpt-finance": {
    "fr": "/ressources/ia-finance/chatgpt-finance",
    "en": "/en/resources/ai-finance/chatgpt-finance",
    "es": "/es/recursos/ia-finanzas/chatgpt-finanzas"
},
  "/ressources/ia-finance/llm-finance": {
    "fr": "/ressources/ia-finance/llm-finance",
    "en": "/en/resources/ai-finance/llms-finance",
    "es": "/es/recursos/ia-finanzas/llm-finanzas"
},
  "/ressources/ia-finance/outils": {
    "fr": "/ressources/ia-finance/outils",
    "en": "/en/resources/ai-finance/tools",
    "es": "/es/recursos/ia-finanzas/herramientas"
},
  "/ressources/ia-finance/feuille-de-route-90-jours": {
    "fr": "/ressources/ia-finance/feuille-de-route-90-jours",
    "en": "/en/resources/ai-finance/90-day-roadmap",
    "es": "/es/recursos/ia-finanzas/hoja-ruta-90-dias"
},
  "/ressources/ia-finance/retours-experience": {
    "fr": "/ressources/ia-finance/retours-experience",
    "en": "/en/resources/ai-finance/experience-reports",
    "es": "/es/recursos/ia-finanzas/experiencias"
},
  "/clients": {
    "fr": "/clients",
    "en": "/en/clients",
    "es": "/es/clientes"
  },
  "/a-propos": {
    "fr": "/a-propos",
    "en": "/en/about",
    "es": "/es/quienes-somos"
  },
  "/contact": {
    "fr": "/contact",
    "en": "/en/contact",
    "es": "/es/contact"
  },
  "/mentions-legales": {
    "fr": "/mentions-legales",
    "en": "/en/legal-notice",
    "es": "/es/aviso-legal"
  },
  "/politique-de-confidentialite": {
    "fr": "/politique-de-confidentialite",
    "en": "/en/privacy-policy",
    "es": "/es/politica-de-privacidad"
  },
  "/daf-externalise-barcelone": {
    "fr": "/daf-externalise-barcelone",
    "en": "/en/fractional-cfo-barcelona",
    "es": "/es/cfo-externalizado-barcelona"
  },
  "/daf-externalise-paris": {
    "fr": "/daf-externalise-paris",
    "en": "/en/fractional-cfo-paris",
    "es": "/es/cfo-externalizado-paris"
  },
  "/daf-externalise-toulouse": {
    "fr": "/daf-externalise-toulouse",
    "en": "/en/fractional-cfo-toulouse",
    "es": "/es/cfo-externalizado-toulouse"
  },
  "/ressources/blog/agicap-vs-fygr-outil-tresorerie": {
    "fr": "/ressources/blog/agicap-vs-fygr-outil-tresorerie",
    "en": "/ressources/blog/agicap-vs-fygr-outil-tresorerie",
    "es": "/ressources/blog/agicap-vs-fygr-outil-tresorerie"
  },
  "/ressources/blog/cas-etude-happy-scribe": {
    "fr": "/ressources/blog/cas-etude-happy-scribe",
    "en": "/ressources/blog/cas-etude-happy-scribe",
    "es": "/ressources/blog/cas-etude-happy-scribe"
  },
  "/ressources/blog/cash-burn-calculer-runway-anticiper-levee": {
    "fr": "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",
    "en": "/ressources/blog/cash-burn-calculer-runway-anticiper-levee",
    "es": "/ressources/blog/cash-burn-calculer-runway-anticiper-levee"
  },
  "/ressources/blog/checklist-due-diligence-levee-de-fonds": {
    "fr": "/ressources/blog/checklist-due-diligence-levee-de-fonds",
    "en": "/ressources/blog/checklist-due-diligence-levee-de-fonds",
    "es": "/ressources/blog/checklist-due-diligence-levee-de-fonds"
  },
  "/ressources/blog/cout-daf-externalise-tarifs-prix-2026": {
    "fr": "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
    "en": "/en/ressources/blog/fractional-cfo-cost-services-2026",
    "es": "/es/recursos/blog/cfo-externo-pymes-precio-2026"
  },
  "/ressources/blog/filiale-espagnole-pilotage-financier": {
    "fr": "/ressources/blog/filiale-espagnole-pilotage-financier",
    "en": "/ressources/blog/filiale-espagnole-pilotage-financier",
    "es": "/ressources/blog/filiale-espagnole-pilotage-financier"
  },
  "/ressources/blog/choisir-cabinet-daf-externalise": {
    "fr": "/ressources/blog/choisir-cabinet-daf-externalise",
    "en": "/ressources/blog/choisir-cabinet-daf-externalise",
    "es": "/ressources/blog/choisir-cabinet-daf-externalise"
  },
  "/ressources/blog/daf-drh-externalises-synergie": {
    "fr": "/ressources/blog/daf-drh-externalises-synergie",
    "en": "/ressources/blog/daf-drh-externalises-synergie",
    "es": "/ressources/blog/daf-drh-externalises-synergie"
  },
  "/ressources/blog/daf-externalise-vs-daf-interimaire": {
    "fr": "/ressources/blog/daf-externalise-vs-daf-interimaire",
    "en": "/ressources/blog/daf-externalise-vs-daf-interimaire",
    "es": "/ressources/blog/daf-externalise-vs-daf-interimaire"
  },
  "/ressources/blog/daf-externalise-vs-daf-salarie": {
    "fr": "/ressources/blog/daf-externalise-vs-daf-salarie",
    "en": "/en/ressources/blog/daf-externalise-vs-daf-salarie",
    "es": "/es/recursos/blog/daf-externalise-vs-daf-salarie"
  },
  "/ressources/blog/daf-externalise-vs-expert-comptable": {
    "fr": "/ressources/blog/daf-externalise-vs-expert-comptable",
    "en": "/ressources/blog/daf-externalise-vs-expert-comptable",
    "es": "/ressources/blog/daf-externalise-vs-expert-comptable"
  },
  "/ressources/blog/externalisation-comptable": {
    "fr": "/ressources/blog/externalisation-comptable",
    "en": "/en/ressources/blog/externalisation-comptable",
    "es": "/es/recursos/blog/externalisation-comptable"
  },
  "/ressources/blog/flux-de-tresorerie": {
    "fr": "/ressources/blog/flux-de-tresorerie",
    "en": "/en/ressources/blog/flux-de-tresorerie",
    "es": "/es/recursos/blog/flux-de-tresorerie"
  },
  "/ressources/blog/la-modernisation-du-role-de-cfo": {
    "fr": "/ressources/blog/la-modernisation-du-role-de-cfo",
    "en": "/ressources/blog/la-modernisation-du-role-de-cfo",
    "es": "/ressources/blog/la-modernisation-du-role-de-cfo"
  },
  "/ressources/blog/payfit-vs-silae-comparatif-pme": {
    "fr": "/ressources/blog/payfit-vs-silae-comparatif-pme",
    "en": "/ressources/blog/payfit-vs-silae-comparatif-pme",
    "es": "/ressources/blog/payfit-vs-silae-comparatif-pme"
  },
  "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements": {
    "fr": "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",
    "en": "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements",
    "es": "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements"
  },
  "/ressources/blog/quand-embaucher-daf-externalise-5-signes": {
    "fr": "/ressources/blog/quand-embaucher-daf-externalise-5-signes",
    "en": "/ressources/blog/quand-embaucher-daf-externalise-5-signes",
    "es": "/ressources/blog/quand-embaucher-daf-externalise-5-signes"
  },
  "/ressources/blog/reduire-bfr-7-leviers-actionnables": {
    "fr": "/ressources/blog/reduire-bfr-7-leviers-actionnables",
    "en": "/ressources/blog/reduire-bfr-7-leviers-actionnables",
    "es": "/ressources/blog/reduire-bfr-7-leviers-actionnables"
  },
  "/ressources/blog/stack-financier-saas-series-a": {
    "fr": "/ressources/blog/stack-financier-saas-series-a",
    "en": "/ressources/blog/stack-financier-saas-series-a",
    "es": "/ressources/blog/stack-financier-saas-series-a"
  },
  "/ressources/blog/tableau-de-bord-financier-startup-12-kpis": {
    "fr": "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",
    "en": "/ressources/blog/tableau-de-bord-financier-startup-12-kpis",
    "es": "/ressources/blog/tableau-de-bord-financier-startup-12-kpis"
  },
  "/ressources/blog/term-sheet-negocier-clauses-cles": {
    "fr": "/ressources/blog/term-sheet-negocier-clauses-cles",
    "en": "/ressources/blog/term-sheet-negocier-clauses-cles",
    "es": "/ressources/blog/term-sheet-negocier-clauses-cles"
  },
  "/ressources/blog/les-10-outils-pour-cfos-startup": {
    "fr": "/ressources/blog/les-10-outils-pour-cfos-startup",
    "en": "/ressources/blog/les-10-outils-pour-cfos-startup",
    "es": "/ressources/blog/les-10-outils-pour-cfos-startup"
  },
  "/ressources/blog/levee-de-fonds-guide": {
    "fr": "/ressources/blog/levee-de-fonds-guide",
    "en": "/ressources/blog/levee-de-fonds-guide",
    "es": "/ressources/blog/levee-de-fonds-guide"
  },
  "/ressources/blog/ia-et-automatisation-des-taches-repetitives": {
    "fr": "/ressources/blog/ia-et-automatisation-des-taches-repetitives",
    "en": "/ressources/blog/ia-et-automatisation-des-taches-repetitives",
    "es": "/es/recursos/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance"
  },
  "/ressources/blog/regimes-fiscaux-france-vs-espagne": {
    "fr": "/ressources/blog/regimes-fiscaux-france-vs-espagne",
    "en": "/ressources/blog/regimes-fiscaux-france-vs-espagne",
    "es": "/es/recursos/blog/regimes-fiscaux-france-vs-espagne"
  },
  "/ressources/blog/cfo-externe-role-missions-2026": {
    "fr": "/ressources/blog/cfo-externe-role-missions-2026",
    "en": "/ressources/blog/cfo-externe-role-missions-2026",
    "es": "/ressources/blog/cfo-externe-role-missions-2026"
  },
  "/ressources/blog/essentiels-outils-tech-finance": {
    "fr": "/ressources/blog/essentiels-outils-tech-finance",
    "en": "/ressources/blog/essentiels-outils-tech-finance",
    "es": "/ressources/blog/essentiels-outils-tech-finance"
  },
  "/ressources/blog/ia-finance-automatisation-direction-financiere": {
    "fr": "/ressources/blog/ia-finance-automatisation-direction-financiere",
    "en": "/ressources/blog/ia-finance-automatisation-direction-financiere",
    "es": "/ressources/blog/ia-finance-automatisation-direction-financiere"
  },
  "/ressources/blog/loi-beckham-economie-impot-simulation": {
    "fr": "/ressources/blog/loi-beckham-economie-impot-simulation",
    "en": "/ressources/blog/loi-beckham-economie-impot-simulation",
    "es": "/ressources/blog/loi-beckham-economie-impot-simulation"
  },
  "/ressources/blog/loi-beckham-espagne-conditions-eligibilite": {
    "fr": "/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
    "en": "/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
    "es": "/ressources/blog/loi-beckham-espagne-conditions-eligibilite"
  },
  "/ressources/blog/organiser-sa-direction-financiere": {
    "fr": "/ressources/blog/organiser-sa-direction-financiere",
    "en": "/ressources/blog/organiser-sa-direction-financiere",
    "es": "/ressources/blog/organiser-sa-direction-financiere"
  },
  "/ressources/outils/pennylane": {
    "fr": "/ressources/outils/pennylane",
    "en": "/ressources/outils/pennylane",
    "es": "/ressources/outils/pennylane"
  },
  "/ressources/outils/agicap": {
    "fr": "/ressources/outils/agicap",
    "en": "/ressources/outils/agicap",
    "es": "/ressources/outils/agicap"
  },
  "/ressources/outils/spendesk": {
    "fr": "/ressources/outils/spendesk",
    "en": "/ressources/outils/spendesk",
    "es": "/ressources/outils/spendesk"
  },
  "/ressources/outils/payfit": {
    "fr": "/ressources/outils/payfit",
    "en": "/ressources/outils/payfit",
    "es": "/ressources/outils/payfit"
  },
  "/ressources/outils/sage": {
    "fr": "/ressources/outils/sage",
    "en": "/ressources/outils/sage",
    "es": "/ressources/outils/sage"
  },
  "/ressources/outils/cegid-loop": {
    "fr": "/ressources/outils/cegid-loop",
    "en": "/ressources/outils/cegid-loop",
    "es": "/ressources/outils/cegid-loop"
  },
  "/ressources/outils/fygr": {
    "fr": "/ressources/outils/fygr",
    "en": "/ressources/outils/fygr",
    "es": "/ressources/outils/fygr"
  },
  "/ressources/outils/pleo": {
    "fr": "/ressources/outils/pleo",
    "en": "/ressources/outils/pleo",
    "es": "/ressources/outils/pleo"
  },
  "/ressources/outils/silae": {
    "fr": "/ressources/outils/silae",
    "en": "/ressources/outils/silae",
    "es": "/ressources/outils/silae"
  },
  "/ressources/outils/lucca": {
    "fr": "/ressources/outils/lucca",
    "en": "/ressources/outils/lucca",
    "es": "/ressources/outils/lucca"
  },
  "/ressources/outils/qonto": {
    "fr": "/ressources/outils/qonto",
    "en": "/ressources/outils/qonto",
    "es": "/ressources/outils/qonto"
  },
  "/ressources/outils/revolut-business": {
    "fr": "/ressources/outils/revolut-business",
    "en": "/ressources/outils/revolut-business",
    "es": "/ressources/outils/revolut-business"
  },
  "/ressources/outils/payhawk": {
    "fr": "/ressources/outils/payhawk",
    "en": "/ressources/outils/payhawk",
    "es": "/ressources/outils/payhawk"
  },
  "/ressources/outils/kyriba": {
    "fr": "/ressources/outils/kyriba",
    "en": "/ressources/outils/kyriba",
    "es": "/ressources/outils/kyriba"
  },
  "/ressources/outils/power-bi": {
    "fr": "/ressources/outils/power-bi",
    "en": "/ressources/outils/power-bi",
    "es": "/ressources/outils/power-bi"
  },
  "/ressources/outils/upflow": {
    "fr": "/ressources/outils/upflow",
    "en": "/ressources/outils/upflow",
    "es": "/ressources/outils/upflow"
  },
  "/ressources/outils/leanpay": {
    "fr": "/ressources/outils/leanpay",
    "en": "/ressources/outils/leanpay",
    "es": "/ressources/outils/leanpay"
  },
  "/ressources/outils/factorial": {
    "fr": "/ressources/outils/factorial",
    "en": "/ressources/outils/factorial",
    "es": "/ressources/outils/factorial"
  },
  "/ressources/outils/carta": {
    "fr": "/ressources/outils/carta",
    "en": "/ressources/outils/carta",
    "es": "/ressources/outils/carta"
  },
  "/ressources/outils/equify": {
    "fr": "/ressources/outils/equify",
    "en": "/ressources/outils/equify",
    "es": "/ressources/outils/equify"
  },
  "/ressources/outils/logiciels-comptabilite": {
    "fr": "/ressources/outils/logiciels-comptabilite",
    "en": "/ressources/outils/logiciels-comptabilite",
    "es": "/ressources/outils/logiciels-comptabilite"
  },
  "/ressources/outils/logiciels-tresorerie": {
    "fr": "/ressources/outils/logiciels-tresorerie",
    "en": "/ressources/outils/logiciels-tresorerie",
    "es": "/ressources/outils/logiciels-tresorerie"
  },
  "/ressources/outils/gestion-depenses": {
    "fr": "/ressources/outils/gestion-depenses",
    "en": "/ressources/outils/gestion-depenses",
    "es": "/ressources/outils/gestion-depenses"
  },
  "/ressources/outils/logiciels-paie": {
    "fr": "/ressources/outils/logiciels-paie",
    "en": "/ressources/outils/logiciels-paie",
    "es": "/ressources/outils/logiciels-paie"
  },
  "/carrieres/fractional-cfo": {
    "fr": "/carrieres/fractional-cfo",
    "en": "/carrieres/fractional-cfo",
    "es": "/carrieres/fractional-cfo"
  },
  "/jobs/finance-analyst-junior-fr": {
    "fr": "/jobs/finance-analyst-junior-fr",
    "en": "/jobs/finance-analyst-junior-fr",
    "es": "/jobs/finance-analyst-junior-fr"
  },
  "/jobs/marketing-growth-strategy": {
    "fr": "/jobs/marketing-growth-strategy",
    "en": "/jobs/marketing-growth-strategy",
    "es": "/jobs/marketing-growth-strategy"
  },
  "/jobs/senior-finance-manager": {
    "fr": "/jobs/senior-finance-manager",
    "en": "/jobs/senior-finance-manager",
    "es": "/jobs/senior-finance-manager"
  },
  "/ressources/outils/malibou": {
    "fr": "/ressources/outils/malibou",
    "en": "/ressources/outils/malibou",
    "es": "/ressources/outils/malibou"
  },
  "/ressources/glossaire/arr-mrr": {
    "fr": "/ressources/glossaire/arr-mrr",
    "en": "/ressources/glossaire/arr-mrr",
    "es": "/ressources/glossaire/arr-mrr"
  },
  "/ressources/glossaire/besoin-fonds-roulement-bfr": {
    "fr": "/ressources/glossaire/besoin-fonds-roulement-bfr",
    "en": "/en/ressources/glossaire/bfr",
    "es": "/ressources/glossaire/besoin-fonds-roulement-bfr"
  },
  "/ressources/glossaire/bspce-bsa": {
    "fr": "/ressources/glossaire/bspce-bsa",
    "en": "/ressources/glossaire/bspce-bsa",
    "es": "/ressources/glossaire/bspce-bsa"
  },
  "/ressources/glossaire/cac-ltv": {
    "fr": "/ressources/glossaire/cac-ltv",
    "en": "/ressources/glossaire/cac-ltv",
    "es": "/ressources/glossaire/cac-ltv"
  },
  "/ressources/glossaire/cash-burn-runway": {
    "fr": "/ressources/glossaire/cash-burn-runway",
    "en": "/ressources/glossaire/cash-burn-runway",
    "es": "/ressources/glossaire/cash-burn-runway"
  },
  "/ressources/glossaire/cfo": {
    "fr": "/ressources/glossaire/cfo",
    "en": "/en/ressources/glossaire/cfo",
    "es": "/ressources/glossaire/cfo"
  },
  "/ressources/glossaire/churn-rate": {
    "fr": "/ressources/glossaire/churn-rate",
    "en": "/ressources/glossaire/churn-rate",
    "es": "/ressources/glossaire/churn-rate"
  },
  "/ressources/glossaire/controle-de-gestion": {
    "fr": "/ressources/glossaire/controle-de-gestion",
    "en": "/ressources/glossaire/controle-de-gestion",
    "es": "/ressources/glossaire/controle-de-gestion"
  },
  "/ressources/glossaire/drh-externalise": {
    "fr": "/ressources/glossaire/drh-externalise",
    "en": "/ressources/glossaire/drh-externalise",
    "es": "/ressources/glossaire/drh-externalise"
  },
  "/ressources/glossaire/ebitda": {
    "fr": "/ressources/glossaire/ebitda",
    "en": "/en/ressources/glossaire/ebitda",
    "es": "/ressources/glossaire/ebitda"
  },
  "/ressources/glossaire/fractional-cfo": {
    "fr": "/ressources/glossaire/fractional-cfo",
    "en": "/ressources/glossaire/fractional-cfo",
    "es": "/ressources/glossaire/fractional-cfo"
  },
  "/ressources/glossaire/run-rate": {
    "fr": "/ressources/glossaire/run-rate",
    "en": "/ressources/glossaire/run-rate",
    "es": "/ressources/glossaire/run-rate"
  },
  "/services/recrutement-talent-acquisition": {
    "fr": "/services/recrutement-talent-acquisition",
    "en": "/en/services/recruitment-talent-acquisition",
    "es": "/es/servicios/seleccion-talento"
},
  "/services/gestion-paie-charges-sociales": {
    "fr": "/services/gestion-paie-charges-sociales",
    "en": "/en/services/payroll-coordination",
    "es": "/es/servicios/coordinacion-nominas"
},
  "/services/formation-developpement": {
    "fr": "/services/formation-developpement",
    "en": "/en/services/training-development",
    "es": "/es/servicios/formacion-desarrollo"
},
  "/services/conformite-droit-travail": {
    "fr": "/services/conformite-droit-travail",
    "en": "/en/services/employment-compliance",
    "es": "/es/servicios/cumplimiento-laboral"
},
  "/a-propos/sebastien-doat": {
    "fr": "/a-propos/sebastien-doat",
    "en": "/en/about/sebastien-doat",
    "es": "/es/quienes-somos/sebastien-doat"
  },
  "/a-propos/benjamin-ziza": {
    "fr": "/a-propos/benjamin-ziza",
    "en": "/en/about/benjamin-ziza",
    "es": "/es/quienes-somos/benjamin-ziza"
  },
  "/a-propos/guillaume-rostand": {
    "fr": "/a-propos/guillaume-rostand",
    "en": "/en/about/guillaume-rostand",
    "es": "/es/quienes-somos/guillaume-rostand"
  },
  "/a-propos/florent-greth": {
    "fr": "/a-propos/florent-greth",
    "en": "/en/about/florent-greth",
    "es": "/es/quienes-somos/florent-greth"
  },
  "/a-propos/borith-biv": {
    "fr": "/a-propos/borith-biv",
    "en": "/en/about/borith-biv",
    "es": "/es/quienes-somos/borith-biv"
  },
  "/a-propos/deisy-arias-ramirez": {
    "fr": "/a-propos/deisy-arias-ramirez",
    "en": "/en/about/deisy-arias-ramirez",
    "es": "/es/quienes-somos/deisy-arias-ramirez"
  },
  "/a-propos/sebastien-preel": {
    "fr": "/a-propos/sebastien-preel",
    "en": "/en/about/sebastien-preel",
    "es": "/es/quienes-somos/sebastien-preel"
  },
  "/a-propos/tom-jaufre": {
    "fr": "/a-propos/tom-jaufre",
    "en": "/en/about/tom-jaufre",
    "es": "/es/quienes-somos/tom-jaufre"
  },
  "/a-propos/jessica-barnicaud": {
    "fr": "/a-propos/jessica-barnicaud",
    "en": "/en/about/jessica-barnicaud",
    "es": "/es/quienes-somos/jessica-barnicaud"
  },
  "/a-propos/benjamin-carlot": {
    "fr": "/a-propos/benjamin-carlot",
    "en": "/en/about/benjamin-carlot",
    "es": "/es/quienes-somos/benjamin-carlot"
  },
  "/a-propos/christophe-hoarau": {
    "fr": "/a-propos/christophe-hoarau",
    "en": "/en/about/christophe-hoarau",
    "es": "/es/quienes-somos/christophe-hoarau"
  },
  "/ressources/cas-clients/solarmente-serie-b-cleantech": {
    "fr": "/ressources/cas-clients/solarmente-serie-b-cleantech",
    "en": "/en/ressources/cas-clients/solarmente-serie-b-cleantech",
    "es": "/es/recursos/casos-de-exito/solarmente-serie-b-cleantech"
  },
  "/ressources/cas-clients/seasonly-marge-par-canal-bfr": {
    "fr": "/ressources/cas-clients/seasonly-marge-par-canal-bfr",
    "en": "/en/ressources/cas-clients/seasonly-marge-par-canal-bfr",
    "es": "/es/recursos/casos-de-exito/seasonly-marge-par-canal-bfr"
  },
  "/ressources/cas-clients/opti-digital-structuration-financement": {
    "fr": "/ressources/cas-clients/opti-digital-structuration-financement",
    "en": "/en/ressources/cas-clients/opti-digital-structuration-financement",
    "es": "/es/recursos/casos-de-exito/opti-digital-structuration-financement"
  },
  "/politique-cookies": {
    "fr": "/politique-cookies",
    "en": "/en/cookie-policy",
    "es": "/es/politica-cookies"
  },
  "/cads": {
    "fr": "/cads",
    "en": "/cads",
    "es": "/cads"
  },
  "/cads/roi": {
    "fr": "/cads/roi",
    "en": "/cads/roi",
    "es": "/cads/roi"
  },
  "/campagne": {
    "fr": "/campagne",
    "en": "/en/campaign",
    "es": "/es/campana"
  },
  "/diagnostic": {
    "fr": "/diagnostic",
    "en": "/en/diagnostic",
    "es": "/es/diagnostic"
  },
  "/jobs": {
    "fr": "/jobs",
    "en": "/en/jobs",
    "es": "/es/jobs"
  },
  "/lp/daf-externalise": {
    "fr": "/lp/daf-externalise",
    "en": "/lp/daf-externalise",
    "es": "/lp/daf-externalise"
  },
  "/lp/daf-externalise/merci": {
    "fr": "/lp/daf-externalise/merci",
    "en": "/lp/daf-externalise/merci",
    "es": "/lp/daf-externalise/merci"
  },
  "/profil": {
    "fr": "/profil",
    "en": "/en/profile",
    "es": "/es/perfil"
  },
  "/qualification": {
    "fr": "/qualification",
    "en": "/en/assessment",
    "es": "/es/calificacion"
  }
};

export function parityHref(source: string, locale: Locale): string {
  if (!source.startsWith("/") || source.startsWith("//")) return source;
  const match = source.match(/^([^?#]*)(.*)$/)!;
  const routes = LOCALE_ROUTES[match[1]];
  return routes ? routes[locale] + match[2] : source;
}
