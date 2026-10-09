import CampaignSource from "@/app/(fr)/campagne/page";
import CadsRoiSource from "@/app/(fr)/cads/roi/page";
import Utility1495 from "@/app/(fr)/cads/page";
import Source0 from "@/app/(fr)/carrieres/fractional-cfo/page";
import Source1 from "@/app/(fr)/jobs/page";
import Source2 from "@/app/(fr)/jobs/finance-analyst-junior-fr/page";
import Source3 from "@/app/(fr)/jobs/marketing-growth-strategy/page";
import Source4 from "@/app/(fr)/jobs/senior-finance-manager/page";
import Source5 from "@/app/(fr)/lp/daf-externalise/page";
import Source6 from "@/app/(fr)/lp/daf-externalise/merci/page";
import Source7 from "@/app/(fr)/ressources/blog/page";
import Source8 from "@/app/(fr)/ressources/blog/[slug]/page";
import Source9 from "@/app/(fr)/ressources/blog/cfo-externe-role-missions-2026/page";
import Source10 from "@/app/(fr)/ressources/blog/checklist-due-diligence-levee-de-fonds/page";
import Source11 from "@/app/(fr)/ressources/blog/cout-daf-externalise-tarifs-prix-2026/page";
import Source12 from "@/app/(fr)/ressources/blog/daf-drh-externalises-synergie/page";
import Source13 from "@/app/(fr)/ressources/blog/daf-externalise-vs-daf-interimaire/page";
import Source14 from "@/app/(fr)/ressources/blog/daf-externalise-vs-daf-salarie/page";
import Source15 from "@/app/(fr)/ressources/blog/essentiels-outils-tech-finance/page";
import Source16 from "@/app/(fr)/ressources/blog/flux-de-tresorerie/page";
import Source17 from "@/app/(fr)/ressources/blog/ia-et-automatisation-des-taches-repetitives/page";
import Source18 from "@/app/(fr)/ressources/blog/ia-finance-automatisation-direction-financiere/page";
import Source19 from "@/app/(fr)/ressources/blog/la-modernisation-du-role-de-cfo/page";
import Source20 from "@/app/(fr)/ressources/blog/les-10-outils-pour-cfos-startup/page";
import Source21 from "@/app/(fr)/ressources/blog/levee-de-fonds-guide/page";
import Source22 from "@/app/(fr)/ressources/blog/loi-beckham-economie-impot-simulation/page";
import Source23 from "@/app/(fr)/ressources/blog/loi-beckham-espagne-conditions-eligibilite/page";
import Source24 from "@/app/(fr)/ressources/blog/organiser-sa-direction-financiere/page";
import Source25 from "@/app/(fr)/ressources/blog/regimes-fiscaux-france-vs-espagne/page";
import Source26 from "@/app/(fr)/ressources/cas-clients/page";
import Source27 from "@/app/(fr)/ressources/fiscalite-espagne-france/page";
import Source28 from "@/app/(fr)/ressources/fiscalite/beckham-law/page";
import Source29 from "@/app/(fr)/ressources/fiscalite/double-imposition-france-espagne/page";
import Source30 from "@/app/(fr)/ressources/fiscalite/impot-revenu-espagne/page";
import Source31 from "@/app/(fr)/ressources/fiscalite/modelo-720/page";
import Source32 from "@/app/(fr)/ressources/fiscalite/residence-fiscale-france-espagne/page";
import Source33 from "@/app/(fr)/ressources/glossaire/page";
import Source34 from "@/app/(fr)/ressources/glossaire/[slug]/page";
import Source35 from "@/app/(fr)/ressources/outils/page";
import Source36 from "@/app/(fr)/ressources/outils/[slug]/page";
import Source37 from "@/app/(fr)/ressources/outils/malibou/page";

export const EDITORIAL_SOURCE_PAGES = {
  "/campagne": { component: CampaignSource, params: {} },
  "/cads/roi": { component: CadsRoiSource, params: {} },
  "/cads": { component: Utility1495, params: {} },
  "/carrieres/fractional-cfo": { component: Source0, params: {} },
  "/jobs": { component: Source1, params: {} },
  "/jobs/finance-analyst-junior-fr": { component: Source2, params: {} },
  "/jobs/marketing-growth-strategy": { component: Source3, params: {} },
  "/jobs/senior-finance-manager": { component: Source4, params: {} },
  "/lp/daf-externalise": { component: Source5, params: {} },
  "/lp/daf-externalise/merci": { component: Source6, params: {} },
  "/ressources/blog": { component: Source7, params: {} },
  "/ressources/blog/agicap-vs-fygr-outil-tresorerie": { component: Source8, params: {"slug": "agicap-vs-fygr-outil-tresorerie"} },
  "/ressources/blog/cas-etude-happy-scribe": { component: Source8, params: {"slug": "cas-etude-happy-scribe"} },
  "/ressources/blog/cash-burn-calculer-runway-anticiper-levee": { component: Source8, params: {"slug": "cash-burn-calculer-runway-anticiper-levee"} },
  "/ressources/blog/cfo-externe-role-missions-2026": { component: Source9, params: {} },
  "/ressources/blog/checklist-due-diligence-levee-de-fonds": { component: Source10, params: {} },
  "/ressources/blog/choisir-cabinet-daf-externalise": { component: Source8, params: {"slug": "choisir-cabinet-daf-externalise"} },
  "/ressources/blog/cout-daf-externalise-tarifs-prix-2026": { component: Source11, params: {} },
  "/ressources/blog/daf-drh-externalises-synergie": { component: Source12, params: {} },
  "/ressources/blog/daf-externalise-vs-daf-interimaire": { component: Source13, params: {} },
  "/ressources/blog/daf-externalise-vs-daf-salarie": { component: Source14, params: {} },
  "/ressources/blog/daf-externalise-vs-expert-comptable": { component: Source8, params: {"slug": "daf-externalise-vs-expert-comptable"} },
  "/ressources/blog/essentiels-outils-tech-finance": { component: Source15, params: {} },
  "/ressources/blog/externalisation-comptable": { component: Source8, params: {"slug": "externalisation-comptable"} },
  "/ressources/blog/filiale-espagnole-pilotage-financier": { component: Source8, params: {"slug": "filiale-espagnole-pilotage-financier"} },
  "/ressources/blog/flux-de-tresorerie": { component: Source16, params: {} },
  "/ressources/blog/ia-et-automatisation-des-taches-repetitives": { component: Source17, params: {} },
  "/ressources/blog/ia-finance-automatisation-direction-financiere": { component: Source18, params: {} },
  "/ressources/blog/la-modernisation-du-role-de-cfo": { component: Source19, params: {} },
  "/ressources/blog/les-10-outils-pour-cfos-startup": { component: Source20, params: {} },
  "/ressources/blog/levee-de-fonds-guide": { component: Source21, params: {} },
  "/ressources/blog/loi-beckham-economie-impot-simulation": { component: Source22, params: {} },
  "/ressources/blog/loi-beckham-espagne-conditions-eligibilite": { component: Source23, params: {} },
  "/ressources/blog/organiser-sa-direction-financiere": { component: Source24, params: {} },
  "/ressources/blog/payfit-vs-silae-comparatif-pme": { component: Source8, params: {"slug": "payfit-vs-silae-comparatif-pme"} },
  "/ressources/blog/pennylane-vs-sage-comparatif-40-deploiements": { component: Source8, params: {"slug": "pennylane-vs-sage-comparatif-40-deploiements"} },
  "/ressources/blog/quand-embaucher-daf-externalise-5-signes": { component: Source8, params: {"slug": "quand-embaucher-daf-externalise-5-signes"} },
  "/ressources/blog/reduire-bfr-7-leviers-actionnables": { component: Source8, params: {"slug": "reduire-bfr-7-leviers-actionnables"} },
  "/ressources/blog/regimes-fiscaux-france-vs-espagne": { component: Source25, params: {} },
  "/ressources/blog/stack-financier-saas-series-a": { component: Source8, params: {"slug": "stack-financier-saas-series-a"} },
  "/ressources/blog/tableau-de-bord-financier-startup-12-kpis": { component: Source8, params: {"slug": "tableau-de-bord-financier-startup-12-kpis"} },
  "/ressources/blog/term-sheet-negocier-clauses-cles": { component: Source8, params: {"slug": "term-sheet-negocier-clauses-cles"} },
  "/ressources/cas-clients": { component: Source26, params: {} },
  "/ressources/fiscalite-espagne-france": { component: Source27, params: {} },
  "/ressources/fiscalite/beckham-law": { component: Source28, params: {} },
  "/ressources/fiscalite/double-imposition-france-espagne": { component: Source29, params: {} },
  "/ressources/fiscalite/impot-revenu-espagne": { component: Source30, params: {} },
  "/ressources/fiscalite/modelo-720": { component: Source31, params: {} },
  "/ressources/fiscalite/residence-fiscale-france-espagne": { component: Source32, params: {} },
  "/ressources/glossaire": { component: Source33, params: {} },
  "/ressources/glossaire/arr-mrr": { component: Source34, params: {"slug": "arr-mrr"} },
  "/ressources/glossaire/besoin-fonds-roulement-bfr": { component: Source34, params: {"slug": "besoin-fonds-roulement-bfr"} },
  "/ressources/glossaire/bspce-bsa": { component: Source34, params: {"slug": "bspce-bsa"} },
  "/ressources/glossaire/cac-ltv": { component: Source34, params: {"slug": "cac-ltv"} },
  "/ressources/glossaire/cash-burn-runway": { component: Source34, params: {"slug": "cash-burn-runway"} },
  "/ressources/glossaire/cfo": { component: Source34, params: {"slug": "cfo"} },
  "/ressources/glossaire/churn-rate": { component: Source34, params: {"slug": "churn-rate"} },
  "/ressources/glossaire/controle-de-gestion": { component: Source34, params: {"slug": "controle-de-gestion"} },
  "/ressources/glossaire/drh-externalise": { component: Source34, params: {"slug": "drh-externalise"} },
  "/ressources/glossaire/ebitda": { component: Source34, params: {"slug": "ebitda"} },
  "/ressources/glossaire/fractional-cfo": { component: Source34, params: {"slug": "fractional-cfo"} },
  "/ressources/glossaire/run-rate": { component: Source34, params: {"slug": "run-rate"} },
  "/ressources/outils": { component: Source35, params: {} },
  "/ressources/outils/agicap": { component: Source36, params: {"slug": "agicap"} },
  "/ressources/outils/carta": { component: Source36, params: {"slug": "carta"} },
  "/ressources/outils/cegid-loop": { component: Source36, params: {"slug": "cegid-loop"} },
  "/ressources/outils/equify": { component: Source36, params: {"slug": "equify"} },
  "/ressources/outils/factorial": { component: Source36, params: {"slug": "factorial"} },
  "/ressources/outils/okimia": { component: Source36, params: {"slug": "okimia"} },
  "/ressources/outils/gestion-depenses": { component: Source36, params: {"slug": "gestion-depenses"} },
  "/ressources/outils/kyriba": { component: Source36, params: {"slug": "kyriba"} },
  "/ressources/outils/leanpay": { component: Source36, params: {"slug": "leanpay"} },
  "/ressources/outils/logiciels-comptabilite": { component: Source36, params: {"slug": "logiciels-comptabilite"} },
  "/ressources/outils/logiciels-paie": { component: Source36, params: {"slug": "logiciels-paie"} },
  "/ressources/outils/logiciels-tresorerie": { component: Source36, params: {"slug": "logiciels-tresorerie"} },
  "/ressources/outils/lucca": { component: Source36, params: {"slug": "lucca"} },
  "/ressources/outils/malibou": { component: Source37, params: {} },
  "/ressources/outils/payfit": { component: Source36, params: {"slug": "payfit"} },
  "/ressources/outils/payhawk": { component: Source36, params: {"slug": "payhawk"} },
  "/ressources/outils/pennylane": { component: Source36, params: {"slug": "pennylane"} },
  "/ressources/outils/pleo": { component: Source36, params: {"slug": "pleo"} },
  "/ressources/outils/power-bi": { component: Source36, params: {"slug": "power-bi"} },
  "/ressources/outils/qonto": { component: Source36, params: {"slug": "qonto"} },
  "/ressources/outils/revolut-business": { component: Source36, params: {"slug": "revolut-business"} },
  "/ressources/outils/sage": { component: Source36, params: {"slug": "sage"} },
  "/ressources/outils/silae": { component: Source36, params: {"slug": "silae"} },
  "/ressources/outils/spendesk": { component: Source36, params: {"slug": "spendesk"} },
  "/ressources/outils/upflow": { component: Source36, params: {"slug": "upflow"} },
};
