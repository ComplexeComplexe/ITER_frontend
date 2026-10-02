#!/usr/bin/env python3
"""Validate the preparation manifest, not the future rendered website.

Run from repository root: python3 scripts/validate-locale-parity.py
Optional: --crawl PATH also checks the saved evidence and every source hash.
"""
import argparse
import csv
import hashlib
import json
from collections import Counter
from pathlib import Path
from urllib.parse import urlsplit


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate(catalog, contracts):
    require(catalog["proposalOnly"] is True, "Preparation must remain proposal-only")
    pages = catalog["pages"]
    require(len(pages) == 136, "FR inventory changed: review baseline explicitly")
    ids = [p["id"] for p in pages]
    require(len(set(ids)) == len(ids), "Duplicate page identity")
    current = []
    target = []
    migrations = set()
    for p in pages:
        require(p["proposalOnly"] is True, "Page proposal flag missing")
        require(set(p["locales"]) == {"fr", "en", "es"}, "Missing locale")
        require(len(p["sourceMainTextSha256"]) == 64, "FR text hash missing")
        require(p["sourcePath"] == p["locales"]["fr"]["targetPath"], "Unexpected FR URL migration")
        for locale, item in p["locales"].items():
            path = item["targetPath"]
            require(path.startswith("/") and "?" not in path and "#" not in path and "//" not in path, "Invalid target path")
            require(path == "/" or not path.endswith("/"), "Inconsistent trailing slash")
            require(locale == "fr" or path == f"/{locale}" or path.startswith(f"/{locale}/"), "Wrong locale prefix")
            require(not path.startswith("/en/ressources"), "EN resource target is still French")
            require(not path.startswith("/es/services"), "ES service target is still French")
            require(item["state"] in {"reference-fr", "align-existing", "translate-new"}, "Invalid ledger state")
            require(item["translationApproved"] == (locale == "fr"), "Unreviewed translation declared approved")
            require(item["publishedAtTarget"] == bool(item["currentPath"] and item["currentPath"] == path), "False publication flag")
            if item["state"] == "translate-new":
                require(item["currentPath"] is None and item["mainWords"] is None, "Fabricated current translation")
            else:
                require(item["currentPath"] is not None and item["mainWords"] is not None, "Existing source evidence missing")
            if item["currentPath"]:
                current.append(item["currentPath"])
                if item["currentPath"] != path:
                    migrations.add((item["currentPath"], path))
            target.append(path)
    for p in catalog["retainedLocaleOnlyPages"]:
        require(p["proposalOnly"] is True, "Locale-only page proposal flag missing")
        current.append(p["currentPath"]); target.append(p["targetPath"])
        if p["currentPath"] != p["targetPath"]:
            migrations.add((p["currentPath"], p["targetPath"]))
    require(len(set(current)) == len(current) == 227, "Existing crawl URLs not accounted for exactly once")
    require(len(set(target)) == len(target) == 411, "Missing target or target collision")
    counts = catalog["counts"]
    require(counts["frReferencePages"] == len(pages), "Incorrect FR reference count")
    require(counts["targetCatalogUrlsIncludingRetainedExtras"] == len(target), "Incorrect target count")
    for locale in ("en", "es"):
        require(counts["newTranslations"][locale] == sum(p["locales"][locale]["state"] == "translate-new" for p in pages), "Incorrect missing translation count")
        require(counts["existingToAlign"][locale] == sum(p["locales"][locale]["state"] == "align-existing" for p in pages), "Incorrect alignment count")
    require(counts["families"] == dict(Counter(p["family"] for p in pages)), "Incorrect family counts")
    require(contracts["proposalOnly"] is True, "Contracts must remain proposal-only")
    families = contracts["families"]
    require(len({f["family"] for f in families}) == len(families), "Duplicate family contract")
    require({f["family"] for f in families} == {p["family"] for p in pages}, "Family contract missing")
    for fam in families:
        require(set(fam["referencePages"]) == {p["id"] for p in pages if p["family"] == fam["family"]}, "Incomplete family reference coverage")
    redirects = catalog["proposedRedirects"]
    sources = {r["source"] for r in redirects}
    require(len(sources) == len(redirects) == counts["proposedRedirectsForCurrentlyCrawledUrls"], "Duplicate or incorrect redirect count")
    require(all(r["destination"] in target for r in redirects), "Redirect to unknown target")
    require(all(r["source"] in current for r in redirects), "Migration source absent from baseline")
    require(not any(r["destination"] in sources for r in redirects), "Proposed redirect chain or loop")
    require(all(r["activateOnlyAfter"] for r in redirects), "Missing release gate")
    require({(r["source"], r["destination"]) for r in redirects} == migrations, "Incomplete migration list")
    return {"frReferences": len(pages), "targetsProposed": len(target), "translationsMissing": sum(counts["newTranslations"].values()), "translationsToAlign": sum(counts["existingToAlign"].values()), "familiesCovered": len(families), "directMigrationsProposed": len(redirects), "productionChanged": False}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--directory", default="docs/locale-parity")
    parser.add_argument("--crawl")
    args = parser.parse_args()
    directory = Path(args.directory)
    catalog = json.loads((directory / "page-catalog.json").read_text())
    contracts = json.loads((directory / "template-contracts.json").read_text())
    result = validate(catalog, contracts)
    with (directory / "Matrice-FR-EN-ES.csv").open(encoding="utf-8-sig", newline="") as file:
        matrix = list(csv.DictReader(file, delimiter=";"))
    require(len(matrix) == len(catalog["pages"]) and {m["id"] for m in matrix} == {p["id"] for p in catalog["pages"]}, "CSV inventory mismatch")
    for row in matrix:
        page = next(p for p in catalog["pages"] if p["id"] == row["id"])
        require(row["FR"] == page["sourcePath"] and all(row[f"{l.upper()}_cible"] == page["locales"][l]["targetPath"] for l in ("en", "es")), "CSV target mismatch")
    with (directory / "Redirections-proposees.csv").open(encoding="utf-8-sig", newline="") as file:
        require(list(csv.DictReader(file, delimiter=";")) == catalog["proposedRedirects"], "CSV redirect mismatch")
    repo = Path(__file__).resolve().parents[1]
    for contract in contracts["families"]:
        require((repo / contract["referenceFile"]).is_file(), "Reference component does not exist: " + contract["referenceFile"])
    utilities = json.loads((directory / "utility-catalog.json").read_text())
    utility_current = []
    utility_target = []
    require(utilities["proposalOnly"] is True and len(utilities["pages"]) == 10, "Utility coverage missing")
    for page in utilities["pages"]:
        require(page["proposalOnly"] is True and page["releaseGate"], "Utility release safeguards missing")
        require(set(page["locales"]) == {"fr", "en", "es"}, "Utility locale missing")
        for locale, item in page["locales"].items():
            utility_target.append(item["targetPath"])
            require(item["translationApproved"] == (locale == "fr"), "Utility translation not reviewed")
            if item["currentPath"]:
                utility_current.append(item["currentPath"])
                require(item["httpEvidence"]["status"] == 200 and item["httpEvidence"]["lang"] == locale, "Utility public response not verified")
            else:
                require(item["state"] == "translate-new" and item["httpEvidence"] is None, "Fabricated utility source")
        if page["sourcePath"].startswith("/cads"):
            require(page.get("additionalGate") and page["robotsToPreserve"] == "noindex,nofollow", "CADS unverified guarantees not gated")
    core_targets = {i["targetPath"] for p in catalog["pages"] for i in p["locales"].values()} | {p["targetPath"] for p in catalog["retainedLocaleOnlyPages"]}
    require(len(set(utility_target)) == 30 and not core_targets.intersection(utility_target), "Utility target collision")
    require(len(set(utility_current)) == len(utility_current) == 22, "Utility current coverage mismatch")
    for locale in ("en", "es"):
        require(utilities["newTranslations"][locale] == sum(p["locales"][locale]["state"] == "translate-new" for p in utilities["pages"]), "Utility new count mismatch")
        require(utilities["existingToAlign"][locale] == sum(p["locales"][locale]["state"] == "align-existing" for p in utilities["pages"]), "Utility alignment count mismatch")
    with (directory / "Matrice-complete-FR-EN-ES.csv").open(encoding="utf-8-sig", newline="") as file:
        full_matrix = list(csv.DictReader(file, delimiter=";"))
    require(len(full_matrix) == 146 and len({r["FR"] for r in full_matrix}) == 146, "Incomplete full-site matrix")
    for page in catalog["pages"] + utilities["pages"]:
        row = next(r for r in full_matrix if r["FR"] == page["sourcePath"])
        require(all(row[f"{l.upper()}_cible"] == page["locales"][l]["targetPath"] for l in ("en", "es")), "Full matrix target mismatch")
    result["includingUtilityPages"] = utilities["combinedCounts"]
    if args.crawl:
        crawl_file = Path(args.crawl)
        require(hashlib.sha256(crawl_file.read_bytes()).hexdigest() == catalog["crawlSha256"], "Changed source crawl")
        crawl = json.loads(crawl_file.read_text())
        current = {(urlsplit(p["url"]).path.rstrip("/") or "/"): p for p in crawl}
        require(dict(Counter(p["lang"] for p in crawl)) == catalog["counts"]["current"], "Current locale counts mismatch")
        for page in catalog["pages"]:
            source = current[page["sourcePath"]]
            require(hashlib.sha256(source["maintext"].encode()).hexdigest() == page["sourceMainTextSha256"], "Changed FR source text")
            for item in page["locales"].values():
                if item["currentPath"]:
                    require(current[item["currentPath"]]["main_words"] == item["mainWords"], "Current word-count mismatch")
        require({item["currentPath"] for page in catalog["pages"] for item in page["locales"].values() if item["currentPath"]} | {p["currentPath"] for p in catalog["retainedLocaleOnlyPages"]} == set(current), "Baseline pages lost")
        result["sourceEvidenceVerified"] = True
    print(json.dumps(result, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
