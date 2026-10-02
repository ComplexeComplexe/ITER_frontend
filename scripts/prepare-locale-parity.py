#!/usr/bin/env python3
"""Prepare a non-publishing locale migration inventory from a saved public crawl.

Usage: python3 scripts/prepare-locale-parity.py CRAWL_JSON RAW_DIR OUTPUT_DIR
The output is a specification, never an input to the live sitemap or routing.
"""
import csv
import hashlib
import json
import sys
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit

ORIGIN = "https://www.iteradvisors.com"
BASE_COMMIT = "524d76e56ec845e06dc7c86c9211f8289e6dc4bb"

# Source FR slug | proposed EN slug | proposed ES slug. Product and person names
# stay unchanged. Existing coherent commercial URLs stay stable where possible.
FIXED = """
/|/en|/es
/daf-externalise|/en/fractional-cfo|/es/externalizacion-daf
/daf-externalise/metier|/en/fractional-cfo/role|/es/externalizacion-daf/funciones
/daf-externalise/tarifs|/en/fractional-cfo/pricing|/es/externalizacion-daf/precios
/fractional-cfo-startups|/en/fractional-cfo-for-startups|/es/cfo-externo-startups
/daf-externalise/secteurs|/en/fractional-cfo/sectors|/es/externalizacion-daf/sectores
/daf-externalise/ecommerce|/en/fractional-cfo/ecommerce|/es/externalizacion-daf/ecommerce
/daf-externalise/industrie|/en/fractional-cfo/manufacturing|/es/externalizacion-daf/industria
/daf-externalise/deep-tech|/en/fractional-cfo/deep-tech|/es/externalizacion-daf/deep-tech
/daf-externalise/temps-partage|/en/fractional-cfo/shared-time|/es/externalizacion-daf/tiempo-compartido
/daf-externalise/transition|/en/fractional-cfo/transition|/es/externalizacion-daf/transicion
/drh-externalise|/en/hr-outsourcing|/es/externalizacion-rrhh
/drh-externalise/temps-partage|/en/hr-outsourcing/shared-time|/es/externalizacion-rrhh/tiempo-compartido
/services|/en/services|/es/servicios
/services/previsionnel-tresorerie|/en/services/cash-flow-forecast|/es/servicios/prevision-tesoreria
/services/gestion-financiere-externalisee|/en/services/financial-operations-organization|/es/servicios/gestion-financiera-externalizada
/services/accompagnement-levee-de-fond|/en/services/fund-raising-support|/es/servicios/soporte-financiacion
/services/comptabilite-externalisation|/en/services/outsource-your-accounting|/es/servicios/externalizar-contabilidad
/services/controle-de-gestion-externalise|/en/services/outsourced-management-control|/es/servicios/control-gestion-externalizado
/services/ma-due-diligence|/en/services/ma-due-diligence|/es/servicios/ma-due-diligence
/services/recrutement-talent-acquisition|/en/services/recruitment-talent-acquisition|/es/servicios/seleccion-talento
/services/gestion-paie-charges-sociales|/en/services/payroll-coordination|/es/servicios/coordinacion-nominas
/services/formation-developpement|/en/services/training-development|/es/servicios/formacion-desarrollo
/services/conformite-droit-travail|/en/services/employment-compliance|/es/servicios/cumplimiento-laboral
/ressources|/en/resources|/es/recursos
/ressources/blog|/en/resources/blog|/es/recursos/blog
/ressources/glossaire|/en/resources/glossary|/es/recursos/glosario
/ressources/cas-clients|/en/resources/case-studies|/es/recursos/casos-de-exito
/ressources/outils|/en/resources/tools|/es/recursos/herramientas
/ressources/fiscalite-espagne-france|/en/resources/france-spain-tax|/es/recursos/fiscalidad-francia-espana
/ressources/ia-finance|/en/resources/ai-finance|/es/recursos/ia-finanzas
/clients|/en/clients|/es/clientes
/a-propos|/en/about|/es/quienes-somos
/contact|/en/contact|/es/contact
/mentions-legales|/en/legal-notice|/es/aviso-legal
/politique-de-confidentialite|/en/privacy-policy|/es/politica-de-privacidad
/daf-externalise-barcelone|/en/fractional-cfo-barcelona|/es/cfo-externalizado-barcelona
/daf-externalise-paris|/en/fractional-cfo-paris|/es/cfo-externalizado-paris
/daf-externalise-toulouse|/en/fractional-cfo-toulouse|/es/cfo-externalizado-toulouse
/carrieres/fractional-cfo|/en/careers/fractional-cfo|/es/carreras/cfo-externo
/jobs/finance-analyst-junior-fr|/en/jobs/junior-finance-analyst|/es/empleos/analista-financiero-junior
/jobs/marketing-growth-strategy|/en/jobs/marketing-growth-strategy|/es/empleos/marketing-estrategia-crecimiento
/jobs/senior-finance-manager|/en/jobs/senior-finance-manager|/es/empleos/responsable-financiero-senior
"""
BLOG = """
agicap-vs-fygr-outil-tresorerie|agicap-vs-fygr-cash-flow-tools|agicap-vs-fygr-tesoreria
cas-etude-happy-scribe|happy-scribe-finance-case-study|caso-happy-scribe-finanzas
cash-burn-calculer-runway-anticiper-levee|cash-burn-runway-fundraising|cash-burn-runway-financiacion
checklist-due-diligence-levee-de-fonds|fundraising-due-diligence-checklist|checklist-due-diligence-financiacion
cout-daf-externalise-tarifs-prix-2026|fractional-cfo-cost-services-2026|cfo-externo-pymes-precio-2026
filiale-espagnole-pilotage-financier|spanish-subsidiary-financial-management|gestion-financiera-filial-espana
choisir-cabinet-daf-externalise|choose-fractional-cfo-firm|elegir-consultora-cfo-externo
daf-drh-externalises-synergie|fractional-cfo-hr-director-coordination|coordinacion-cfo-director-rrhh
daf-externalise-vs-daf-interimaire|fractional-cfo-vs-interim-cfo|cfo-externo-vs-cfo-interino
daf-externalise-vs-daf-salarie|fractional-cfo-vs-in-house-cfo|cfo-externo-vs-cfo-interno
daf-externalise-vs-expert-comptable|fractional-cfo-vs-accountant|cfo-externo-vs-asesoria-contable
externalisation-comptable|accounting-outsourcing|externalizacion-contable
flux-de-tresorerie|cash-flow|flujo-de-caja
la-modernisation-du-role-de-cfo|modern-cfo-role|evolucion-funcion-cfo
payfit-vs-silae-comparatif-pme|payfit-vs-silae-sme-comparison|payfit-vs-silae-comparativa-pymes
pennylane-vs-sage-comparatif-40-deploiements|pennylane-vs-sage-comparison|pennylane-vs-sage-comparativa
quand-embaucher-daf-externalise-5-signes|when-to-hire-fractional-cfo|cuando-contratar-cfo-externo
reduire-bfr-7-leviers-actionnables|reduce-working-capital-requirements|reducir-necesidades-capital-circulante
stack-financier-saas-series-a|saas-series-a-finance-stack|herramientas-financieras-saas-serie-a
tableau-de-bord-financier-startup-12-kpis|startup-financial-dashboard-kpis|cuadro-mando-financiero-startup-kpis
term-sheet-negocier-clauses-cles|term-sheet-key-clauses|term-sheet-clausulas-clave
les-10-outils-pour-cfos-startup|startup-cfo-tools|herramientas-cfo-startup
levee-de-fonds-guide|fundraising-guide|guia-rondas-financiacion
ia-et-automatisation-des-taches-repetitives|ai-automation-repetitive-finance-tasks|ia-automatizacion-tareas-repetitivas-finanzas
regimes-fiscaux-france-vs-espagne|france-spain-tax-comparison|regimenes-fiscales-francia-espana
cfo-externe-role-missions-2026|external-cfo-role-responsibilities|cfo-externo-funciones
essentiels-outils-tech-finance|essential-finance-technology-tools|herramientas-tecnologia-financiera
ia-finance-automatisation-direction-financiere|ai-finance-department-automation|ia-automatizacion-direccion-financiera
loi-beckham-economie-impot-simulation|beckham-law-tax-savings-simulation|ley-beckham-simulacion-ahorro-fiscal
loi-beckham-espagne-conditions-eligibilite|beckham-law-spain-eligibility|ley-beckham-espana-requisitos
organiser-sa-direction-financiere|organize-finance-department|organizar-direccion-financiera
"""
TAX = """
residence-fiscale-france-espagne|france-spain-tax-residence|residencia-fiscal-francia-espana
double-imposition-france-espagne|france-spain-double-taxation|doble-imposicion-francia-espana
impot-revenu-espagne|spain-income-tax|irpf-espana
beckham-law|beckham-law|ley-beckham
modelo-720|form-720|modelo-720
"""
AI = """
automatiser-reporting-financier|automate-financial-reporting|automatizar-reporting-financiero
chatgpt-finance|chatgpt-finance|chatgpt-finanzas
llm-finance|llms-finance|llm-finanzas
outils|tools|herramientas
feuille-de-route-90-jours|90-day-roadmap|hoja-ruta-90-dias
retours-experience|experience-reports|experiencias
"""
GLOSSARY = """
arr-mrr|arr-mrr|arr-mrr
besoin-fonds-roulement-bfr|working-capital-requirement|necesidades-capital-circulante
bspce-bsa|french-equity-incentives-bspce-bsa|incentivos-capital-francia-bspce-bsa
cac-ltv|cac-ltv|cac-ltv
cash-burn-runway|cash-burn-runway|cash-burn-runway
cfo|cfo|cfo
churn-rate|churn-rate|tasa-churn
controle-de-gestion|management-control|control-gestion
drh-externalise|external-hr-director|director-rrhh-externo
ebitda|ebitda|ebitda
fractional-cfo|fractional-cfo|cfo-tiempo-parcial
run-rate|run-rate|run-rate
"""
TOOL_CATEGORIES = """
logiciels-comptabilite|accounting-software|software-contabilidad
logiciels-tresorerie|cash-flow-software|software-tesoreria
gestion-depenses|expense-management|gestion-gastos
logiciels-paie|payroll-software|software-nominas
"""
CASES = """
solarmente-serie-b-cleantech|solarmente-series-b-cleantech|solarmente-serie-b-cleantech
seasonly-marge-par-canal-bfr|seasonly-channel-margins-working-capital|seasonly-margen-canal-capital-circulante
opti-digital-structuration-financement|opti-digital-finance-organization-funding|opti-digital-organizacion-financiera-financiacion
"""


def parse_table(table):
    return [line.strip().split("|") for line in table.strip().splitlines()]


def normalized_path(url):
    return urlsplit(url).path.rstrip("/") or "/"


class MainStructure(HTMLParser):
    """Exclude header/menu/cookie overlay, which are outside <main>."""
    def __init__(self):
        super().__init__()
        self.inside = False
        self.heading = None
        self.heading_text = ""
        self.headings = []
        self.section_ids = []

    def handle_starttag(self, tag, attrs):
        if tag == "main":
            self.inside = True
        if not self.inside:
            return
        if tag in ("h1", "h2", "h3"):
            self.heading, self.heading_text = tag, ""
        if tag == "section":
            self.section_ids.append(dict(attrs).get("id"))

    def handle_endtag(self, tag):
        if tag == self.heading:
            self.headings.append({"level": tag, "text": self.heading_text.strip()})
            self.heading = None
        if tag == "main":
            self.inside = False

    def handle_data(self, data):
        if self.heading:
            self.heading_text += data


def family(path):
    if path == "/": return "home"
    if path == "/daf-externalise": return "cfo-pillar"
    if path in ("/drh-externalise", "/drh-externalise/temps-partage"): return "hr-offer"
    if path.startswith("/services/"):
        return "hr-service" if path.split("/")[-1] in {"recrutement-talent-acquisition", "gestion-paie-charges-sociales", "formation-developpement", "conformite-droit-travail"} else "finance-service"
    if path == "/services": return "finance-hub"
    if path.startswith("/daf-externalise-") or path in ("/daf-externalise/temps-partage", "/daf-externalise/transition", "/fractional-cfo-startups"): return "finance-service"
    if path == "/daf-externalise/tarifs": return "pricing"
    if path == "/daf-externalise/metier": return "cfo-role"
    if path.startswith("/daf-externalise/"): return "cfo-sector"
    if path == "/ressources": return "resources-hub"
    if path == "/ressources/blog": return "blog-list"
    if path.startswith("/ressources/blog/"): return "blog-article"
    if path == "/ressources/outils": return "tools-hub"
    if path.startswith("/ressources/outils/"): return "tool-category" if path.split("/")[-1] in {x[0] for x in parse_table(TOOL_CATEGORIES)} else "tool-detail"
    if path == "/ressources/glossaire": return "glossary-hub"
    if path.startswith("/ressources/glossaire/"): return "glossary-entry"
    if path == "/ressources/cas-clients": return "cases-hub"
    if path.startswith("/ressources/cas-clients/"): return "case-study"
    if path == "/ressources/ia-finance": return "ai-hub"
    if path.startswith("/ressources/ia-finance/"): return "ai-guide"
    if path == "/ressources/fiscalite-espagne-france": return "tax-hub"
    if path.startswith("/ressources/fiscalite/"): return "tax-guide"
    if path == "/a-propos": return "about"
    if path.startswith("/a-propos/"): return "expert-profile"
    if path == "/clients": return "clients"
    if path == "/contact": return "contact"
    if path in ("/mentions-legales", "/politique-de-confidentialite"): return "legal"
    if path.startswith("/jobs/"): return "job"
    if path.startswith("/carrieres/"): return "careers"
    raise ValueError(f"Unclassified page: {path}")


def phase(fam):
    if fam in {"home", "cfo-pillar", "finance-hub", "resources-hub", "finance-service", "pricing", "cfo-role", "cfo-sector"}: return "1-Offres-finance-et-parcours"
    if fam in {"hr-offer", "hr-service", "cases-hub", "case-study", "ai-hub", "ai-guide", "about", "expert-profile", "clients", "contact"}: return "2-Preuves-IA-RH-cabinet"
    if fam in {"tools-hub", "tool-category", "tool-detail", "glossary-hub", "glossary-entry"}: return "3-Outils-et-glossaire"
    return "4-Blog-fiscalite-legal-carrieres"


def main():
    crawl_path, raw_dir, out_dir = map(Path, sys.argv[1:])
    rows = json.loads(crawl_path.read_text())
    current = {normalized_path(p["url"]): p for p in rows}
    fr = [p for p in rows if p["lang"] == "fr"]
    by_fr = {}
    for p in rows:
        if p["lang"] not in {"en", "es"}: continue
        alternate = next((h["href"] for h in p["hreflang"] if h["hreflang"].startswith("fr")), None)
        if alternate:
            key = normalized_path(alternate)
            assert key in current, (p["url"], alternate)
            assert p["lang"] not in by_fr.setdefault(key, {}), (key, p["lang"])
            by_fr[key][p["lang"]] = normalized_path(p["url"])

    # These existing pages lack FR alternates. An association is preparation
    # only: do not emit hreflang before semantic/commercial alignment.
    associations = {
        "/ressources/blog/cout-daf-externalise-tarifs-prix-2026": {"en": "/en/ressources/blog/fractional-cfo-cost-services-2026", "es": "/es/recursos/blog/cfo-externo-pymes-precio-2026"},
        "/ressources/blog/ia-et-automatisation-des-taches-repetitives": {"es": "/es/recursos/blog/ia-et-automatisation-des-taches-repetitives-du-departement-finance"},
        "/services/gestion-financiere-externalisee": {"es": "/es/services/gestion-financiera-externalizada"},
    }
    for key, locales in associations.items():
        for locale, path in locales.items():
            assert path in current and current[path]["lang"] == locale
            by_fr.setdefault(key, {})[locale] = path

    targets = {r[0]: dict(zip(("fr", "en", "es"), r)) for r in parse_table(FIXED)}
    for table, prefix_fr, prefix_en, prefix_es in [
        (BLOG, "/ressources/blog/", "/en/resources/blog/", "/es/recursos/blog/"),
        (TAX, "/ressources/fiscalite/", "/en/resources/tax/", "/es/recursos/fiscalidad/"),
        (AI, "/ressources/ia-finance/", "/en/resources/ai-finance/", "/es/recursos/ia-finanzas/"),
        (GLOSSARY, "/ressources/glossaire/", "/en/resources/glossary/", "/es/recursos/glosario/"),
        (TOOL_CATEGORIES, "/ressources/outils/", "/en/resources/tools/", "/es/recursos/herramientas/"),
        (CASES, "/ressources/cas-clients/", "/en/resources/case-studies/", "/es/recursos/casos-de-exito/"),
    ]:
        for fr_slug, en_slug, es_slug in parse_table(table):
            path = prefix_fr + fr_slug
            assert path not in targets
            targets[path] = {"fr": path, "en": prefix_en + en_slug, "es": prefix_es + es_slug}
    for p in fr:
        path = normalized_path(p["url"])
        if path in targets: continue
        slug = path.split("/")[-1]
        if path.startswith("/a-propos/"):
            targets[path] = {"fr": path, "en": "/en/about/" + slug, "es": "/es/quienes-somos/" + slug}
        elif path.startswith("/ressources/outils/"):
            targets[path] = {"fr": path, "en": "/en/resources/tools/" + slug, "es": "/es/recursos/herramientas/" + slug}
        else: raise ValueError(f"Missing explicit translation: {path}")
    assert set(targets) == {normalized_path(p["url"]) for p in fr}

    catalog = []
    assigned = set()
    for p in fr:
        path = normalized_path(p["url"])
        parser = MainStructure()
        parser.feed((raw_dir / p["raw_file"]).read_text())
        locales = {"fr": path, **by_fr.get(path, {})}
        fam = family(path)
        entry = {
            "id": "home" if path == "/" else path.strip("/").replace("/", ":"),
            "family": fam, "phase": phase(fam), "sourcePath": path,
            "sourceTitle": p["title"], "sourceRobots": p["robots"],
            "sourceMainTextSha256": hashlib.sha256(p["maintext"].encode()).hexdigest(),
            "sourceH2": [h["text"] for h in parser.headings if h["level"] == "h2"],
            "sourceSectionIds": parser.section_ids,
            "proposalOnly": True,
            "associationNeedsReview": path in associations,
            "locales": {},
        }
        for locale in ("fr", "en", "es"):
            old = locales.get(locale)
            assigned.add(old) if old else None
            entry["locales"][locale] = {
                "currentPath": old, "targetPath": targets[path][locale],
                "mainWords": current[old]["main_words"] if old else None,
                "state": "reference-fr" if locale == "fr" else "align-existing" if old else "translate-new",
                "translationApproved": locale == "fr",
                "publishedAtTarget": bool(old and old == targets[path][locale]),
            }
        catalog.append(entry)

    # Locale-only editorial pages stay live. Their intent is NOT silently
    # merged into a French guide; that requires a separate evidence-based choice.
    extra_targets = {
        "/en/services/ley-beckham": "/en/services/beckham-law",
        "/es/services/ley-beckham": "/es/servicios/ley-beckham",
        "/es/recursos/blog/que-es-fractional-cfo": "/es/recursos/blog/que-es-fractional-cfo",
    }
    extras = []
    for old, p in current.items():
        if old in assigned: continue
        assert old in extra_targets, f"Unaccounted live page: {old}"
        extras.append({"currentPath": old, "targetPath": extra_targets[old], "locale": p["lang"], "title": p["title"], "state": "retain-separate-intent-review", "proposalOnly": True})
    all_targets = [v["targetPath"] for c in catalog for v in c["locales"].values()] + [x["targetPath"] for x in extras]
    assert len(set(all_targets)) == len(all_targets), "Target collision"
    redirects = []
    for c in catalog:
        for locale, item in c["locales"].items():
            if item["currentPath"] and item["currentPath"] != item["targetPath"]:
                redirects.append({"pageId": c["id"], "locale": locale, "source": item["currentPath"], "destination": item["targetPath"], "activateOnlyAfter": "translated-target-200-self-canonical-and-reviewed"})
    for x in extras:
        if x["currentPath"] != x["targetPath"]:
            redirects.append({"pageId": "locale-only", "locale": x["locale"], "source": x["currentPath"], "destination": x["targetPath"], "activateOnlyAfter": "target-200-self-canonical-and-intent-review"})
    sources = {r["source"] for r in redirects}
    assert len(sources) == len(redirects)
    assert not any(r["destination"] in sources for r in redirects), "Proposed redirect chain"
    counts = {
        "current": dict(Counter(p["lang"] for p in rows)),
        "frReferencePages": len(fr),
        "newTranslations": {locale: sum(c["locales"][locale]["state"] == "translate-new" for c in catalog) for locale in ("en", "es")},
        "existingToAlign": {locale: sum(c["locales"][locale]["state"] == "align-existing" for c in catalog) for locale in ("en", "es")},
        "families": dict(Counter(c["family"] for c in catalog)),
        "phaseNewTranslations": {ph: sum(v["state"] == "translate-new" for c in catalog if c["phase"] == ph for v in c["locales"].values()) for ph in sorted({c["phase"] for c in catalog})},
        "retainedLocaleOnlyPages": len(extras),
        "targetCatalogUrlsIncludingRetainedExtras": len(all_targets),
        "proposedRedirectsForCurrentlyCrawledUrls": len(redirects),
    }
    payload = {"version": 1, "preparedOn": "2026-10-02", "baseCommit": BASE_COMMIT, "sourceCrawl": str(crawl_path), "crawlSha256": hashlib.sha256(crawl_path.read_bytes()).hexdigest(), "proposalOnly": True, "counts": counts, "pages": catalog, "retainedLocaleOnlyPages": extras, "proposedRedirects": redirects}
    out_dir.mkdir(parents=True, exist_ok=True)
    (out_dir / "page-catalog.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n")
    with (out_dir / "Matrice-FR-EN-ES.csv").open("w", newline="", encoding="utf-8-sig") as f:
        fields = ["id", "famille", "lot", "FR", "titre_FR", "mots_FR", "H2_FR", "EN_actuelle", "EN_cible", "EN_action", "mots_EN", "ES_actuelle", "ES_cible", "ES_action", "mots_ES", "association_a_revoir", "robots_FR"]
        writer = csv.DictWriter(f, fieldnames=fields, delimiter=";", lineterminator="\n"); writer.writeheader()
        for c in catalog:
            writer.writerow(dict(zip(fields, [c["id"], c["family"], c["phase"], c["sourcePath"], c["sourceTitle"], c["locales"]["fr"]["mainWords"], len(c["sourceH2"]), c["locales"]["en"]["currentPath"], c["locales"]["en"]["targetPath"], c["locales"]["en"]["state"], c["locales"]["en"]["mainWords"], c["locales"]["es"]["currentPath"], c["locales"]["es"]["targetPath"], c["locales"]["es"]["state"], c["locales"]["es"]["mainWords"], c["associationNeedsReview"], c["sourceRobots"]])))
    with (out_dir / "Redirections-proposees.csv").open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=["pageId", "locale", "source", "destination", "activateOnlyAfter"], delimiter=";", lineterminator="\n"); writer.writeheader(); writer.writerows(redirects)
    print(json.dumps(counts, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
