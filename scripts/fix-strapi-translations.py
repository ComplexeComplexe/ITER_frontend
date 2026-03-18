#!/usr/bin/env python3
"""
Fix translation inconsistencies in Strapi CMS for Iter Advisors.
New Strapi URL: https://different-luck-485c590426.strapiapp.com
"""

import json
import time
import subprocess
import sys

STRAPI_URL = "https://different-luck-485c590426.strapiapp.com"
STRAPI_TOKEN = "8e7577d8418e046ddec12879f2f0d3559642565a1ff50c1d030f7fd7c0b7f1622ad0ce12131a1a029c5d8bfa069340f7c57ff88e59df7e70826a7e36afa0f7a9f339b1c15f7269f312a739014794f237982edd6e9347d7551f1071ee6e9445e112e6e6e44859746fa571442515b06452de5125c0f73bc7f2180bfc96b8a38e7d"


def api_get(endpoint, params=None):
    url = f"{STRAPI_URL}/api/{endpoint}"
    if params:
        qs = "&".join(f"{k}={v}" for k, v in params.items())
        url += f"?{qs}"
    r = subprocess.run(
        ["curl", "-s", "--max-time", "30", "-g",
         "-H", f"Authorization: Bearer {STRAPI_TOKEN}", url],
        capture_output=True, text=True
    )
    try:
        return json.loads(r.stdout)
    except:
        print(f"  ERROR parsing GET {url}: {r.stdout[:200]}")
        return None


def api_put(endpoint, data):
    url = f"{STRAPI_URL}/api/{endpoint}"
    r = subprocess.run(
        ["curl", "-s", "--max-time", "30", "-g", "-X", "PUT",
         "-H", f"Authorization: Bearer {STRAPI_TOKEN}",
         "-H", "Content-Type: application/json",
         "-d", json.dumps({"data": data}), url],
        capture_output=True, text=True
    )
    try:
        return json.loads(r.stdout)
    except:
        print(f"  ERROR parsing PUT {url}: {r.stdout[:200]}")
        return None


def fix_team_roles_fr():
    """Fix FR team member roles that are in English."""
    print("\n=== 1. Fix team member roles (FR) ===")
    fixes = {
        "Co-founder & CFO": "Co-fondateur et CFO",
        "Fractional CFO": "DAF externalisé",
        "Founding Partner & CMO": "Associé fondateur et CMO",
        "Finance Analyst": "Analyste financier(e)",
    }
    resp = api_get("team-members", {
        "locale": "fr-FR",
        "pagination[pageSize]": "20",
        "sort": "order",
    })
    if not resp or "data" not in resp:
        print("  FAILED to fetch FR team members")
        return

    for m in resp["data"]:
        name = f"{m['firstName']} {m['lastName']}"
        role = m.get("role", "")
        doc_id = m["documentId"]
        if role in fixes:
            new_role = fixes[role]
            print(f"  {name}: '{role}' -> '{new_role}'")
            result = api_put(f"team-members/{doc_id}?locale=fr-FR", {"role": new_role})
            if result and "data" in result:
                print(f"    OK")
            else:
                print(f"    FAILED: {result}")
            time.sleep(1)
        else:
            print(f"  {name}: '{role}' (OK)")


def fix_homepage_stats_fr():
    """Fix FR homepage stat labels that are in English."""
    print("\n=== 2. Fix homepage stats (FR) ===")
    resp = api_get("homepage", {
        "locale": "fr-FR",
        "populate[statistics]": "*",
    })
    if not resp or "data" not in resp:
        print("  FAILED to fetch FR homepage")
        return

    d = resp["data"]
    doc_id = d["documentId"]
    stats = d.get("statistics", [])

    label_fixes = {
        "Companies supported by Iter Advisors": "Entreprises accompagnées par Iter Advisors",
        "Fundraising raised by our clients since 2021": "Levées de fonds par nos clients depuis 2021",
    }

    updated = []
    changed = False
    for s in stats:
        label = s.get("label", "") or ""
        if label in label_fixes:
            print(f"  Stat: '{label}' -> '{label_fixes[label]}'")
            s["label"] = label_fixes[label]
            changed = True
        # Also fix None values
        if s.get("value") is None or s.get("label") is None:
            print(f"  Removing empty stat id={s.get('id')}")
            continue
        updated.append({"value": s["value"], "label": s["label"]})

    if changed:
        result = api_put(f"homepage/{doc_id}?locale=fr-FR", {"statistics": updated})
        if result and "data" in result:
            print(f"  Homepage FR stats updated!")
        else:
            print(f"  FAILED: {result}")
    else:
        print("  No changes needed")


def fix_homepage_stats_en():
    """Fix EN homepage stat labels (also check for issues)."""
    print("\n=== 3. Fix homepage stats (EN) ===")
    resp = api_get("homepage", {
        "locale": "en",
        "populate[statistics]": "*",
    })
    if not resp or "data" not in resp:
        print("  FAILED to fetch EN homepage")
        return

    d = resp["data"]
    doc_id = d["documentId"]
    stats = d.get("statistics", [])

    # EN stats should be correct, just clean up None values
    updated = []
    changed = False
    for s in stats:
        if s.get("value") is None or s.get("label") is None:
            print(f"  Removing empty stat id={s.get('id')}")
            changed = True
            continue
        updated.append({"value": s["value"], "label": s["label"]})
        print(f"  Stat: value='{s['value']}' label='{s['label']}' (OK)")

    if changed:
        result = api_put(f"homepage/{doc_id}?locale=en", {"statistics": updated})
        if result and "data" in result:
            print(f"  Homepage EN stats cleaned!")
        else:
            print(f"  FAILED: {result}")


def fix_service_seo():
    """Fix service page SEO metaTitles."""
    print("\n=== 4. Fix service page SEO metaTitles ===")

    fixes = [
        {
            "endpoint": "gestion-financiere-externalisee-page",
            "locale": "fr-FR",
            "doc_id": "ynzrb6u9nksueoo3gjfj9qfc",
            "new_title": "Gestion financière externalisée | Iter Advisors",
            "new_desc": "Direction financière externalisée. Comptabilité, trésorerie, contrôle de gestion.",
        },
        {
            "endpoint": "controle-de-gestion-externalise-page",
            "locale": "fr-FR",
            "doc_id": "z4s1kffaze8c9lvazxvwdo8z",
            "new_title": "Contrôle de gestion externalisé | Iter Advisors",
            "new_desc": "Contrôle de gestion, budgets et reporting. Iter Advisors.",
        },
    ]

    for fix in fixes:
        print(f"\n  [{fix['locale']}] {fix['endpoint']}")
        print(f"    New title: '{fix['new_title']}'")
        result = api_put(
            f"{fix['endpoint']}/{fix['doc_id']}?locale={fix['locale']}",
            {"seo": {"metaTitle": fix["new_title"], "metaDescription": fix["new_desc"]}}
        )
        if result and "data" in result:
            print(f"    OK")
        else:
            print(f"    FAILED: {result}")
        time.sleep(1)


def main():
    print("=" * 60)
    print("Iter Advisors - Strapi Translation Fix Script")
    print(f"Strapi: {STRAPI_URL}")
    print("=" * 60)

    # Test connection
    resp = api_get("team-members", {"pagination[pageSize]": "1"})
    if not resp or "data" not in resp:
        print("\nERROR: Cannot connect to Strapi!")
        sys.exit(1)
    print("Connected to Strapi OK")

    fix_team_roles_fr()
    fix_homepage_stats_fr()
    fix_homepage_stats_en()
    fix_service_seo()

    print("\n" + "=" * 60)
    print("All fixes applied!")
    print("=" * 60)


if __name__ == "__main__":
    main()
