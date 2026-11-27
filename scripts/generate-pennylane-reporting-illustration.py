"""Render the same synthetic reporting example in FR, EN and ES. No client inputs."""
from pathlib import Path
import html
import json

ROOT = Path(__file__).resolve().parents[1]
COPY = {
    "fr": ["PENNYLANE ET LE TRAVAIL DU CFO", "Du grand livre au reporting de gestion", "Illustration pédagogique. Chiffres entièrement fictifs, en k€.", "1. Pennylane", "Factures et transactions", "Catégories et périodes", "2. Contrôles de clôture", "Complétude et affectations", "Écritures de régularisation", "3. Excel ou Google Sheets", "Reporting financier", "Reporting de trésorerie", "Exemple reconstitué hors interface Pennylane", "Mois 1", "Mois 2", "Mois 3", "Chiffre d’affaires", "Coûts directs", "Marge brute", "Charges de structure", "Résultat d’exploitation", "Solde d’ouverture", "Encaissements", "Décaissements", "Flux net", "Solde de clôture", "Charges et produits rattachés à leur période.", "Encaissements et paiements selon leur échéance.", "Processus décrit par Florent Greth, illustré avec des données fictives.", "Aucun dossier client, aucun montant réel, aucun résultat attribué à Pennylane."],
    "en": ["PENNYLANE AND THE CFO’S WORK", "From the general ledger to management reporting", "Educational illustration. Entirely fictitious figures, in €000.", "1. Pennylane", "Invoices and bank transactions", "Categories and periods", "2. Closing checks", "Completeness and allocations", "Period-end adjusting entries", "3. Excel or Google Sheets", "Financial reporting", "Cash reporting", "Example recreated outside the Pennylane interface", "Month 1", "Month 2", "Month 3", "Revenue", "Direct costs", "Gross profit", "Overheads", "Operating profit", "Opening balance", "Cash receipts", "Cash payments", "Net cash flow", "Closing balance", "Expenses and revenue allocated to their period.", "Receipts and payments based on timing.", "Process described by Florent Greth, illustrated with fictitious data.", "No client file, actual amount or result attributed to Pennylane is reproduced."],
    "es": ["PENNYLANE Y EL TRABAJO DEL CFO", "Del libro mayor al reporting de gestión", "Ilustración didáctica. Cifras completamente ficticias, en miles de euros.", "1. Pennylane", "Facturas y movimientos bancarios", "Categorías y períodos", "2. Controles de cierre", "Integridad e imputaciones", "Asientos de ajuste de cierre", "3. Excel o Google Sheets", "Reporting financiero", "Reporting de tesorería", "Ejemplo recreado fuera de la interfaz de Pennylane", "Mes 1", "Mes 2", "Mes 3", "Ingresos", "Costes directos", "Margen bruto", "Gastos de estructura", "Resultado de explotación", "Saldo inicial", "Cobros", "Pagos", "Flujo neto", "Saldo final", "Gastos e ingresos imputados a su período.", "Cobros y pagos según sus vencimientos.", "Proceso descrito por Florent Greth, ilustrado con datos ficticios.", "No se reproduce ningún archivo de cliente, importe real ni resultado atribuido a Pennylane."]
}

for opening, receipts, payments, closing in zip([80, 88, 101], [110, 125, 142], [102, 112, 119], [88, 101, 124]):
    assert opening + receipts - payments == closing
for revenue, direct, overheads, profit in zip([120, 135, 150], [42, 47, 52], [63, 67, 71], [15, 21, 27]):
    assert revenue - direct - overheads == profit

for locale, c in COPY.items():
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1170" viewBox="0 0 1600 1170" role="img" aria-labelledby="title desc" xml:lang="{locale}"><title id="title">{html.escape(c[1])}</title><desc id="desc">{html.escape(c[2])}</desc><rect width="1600" height="1170" fill="#f6f5fa"/><g font-family="Arial, sans-serif">']

    def text(x, y, value, size=25, color="#24232f", bold=False, anchor="start"):
        parts.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{700 if bold else 400}" text-anchor="{anchor}">{html.escape(str(value))}</text>')

    def box(x, y, w, h, fill="#fff"):
        parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="18" fill="{fill}" stroke="#dedbe9" stroke-width="2"/>')

    text(76, 70, c[0], 21, "#4b2fc7", True)
    text(76, 131, c[1], 42 if locale != "en" else 39, bold=True)
    text(76, 181, c[2], 25, "#666475")
    for i in range(3):
        x = 76 + i * 493
        box(x, 220, 461, 146)
        text(x+25, 269, c[3+i*3], 27, bold=True)
        text(x+25, 309, c[4+i*3], 22, "#666475")
        text(x+25, 340, c[5+i*3], 22, "#666475")

    for x, title, labels, values, highlights, foot in [
        (76, c[10], c[16:21], [[120,135,150],[-42,-47,-52],[78,88,98],[-63,-67,-71],[15,21,27]], [2,4], c[26]),
        (816, c[11], c[21:26], [[80,88,101],[110,125,142],[-102,-112,-119],[8,13,23],[88,101,124]], [3,4], c[27]),
    ]:
        box(x, 404, 708, 590)
        text(x+28, 459, title, 29, bold=True)
        text(x+28, 500, c[12], 19, "#666475")
        for i, label in enumerate(c[13:16]):
            text(x+470+i*93, 559, label, 20, "#666475", True, "end")
        for k, (label, row) in enumerate(zip(labels, values)):
            y = 580 + k*58
            if k in highlights:
                parts.append(f'<rect x="{x+18}" y="{y-10}" width="672" height="52" rx="8" fill="#eeeafa"/>')
            text(x+28, y+24, label, 22, bold=k in highlights)
            for i, value in enumerate(row):
                text(x+470+i*93, y+24, value, 23, "#4b2fc7" if k in highlights else "#24232f", k in highlights, "end")
        text(x+28, 959, foot, 20, "#666475")
    text(76, 1056, c[28], 24, bold=True)
    text(76, 1098, c[29], 23, "#666475")
    parts.append('</g></svg>')
    folder = ROOT / "public/images/blog/covers" / (locale if locale != "fr" else "")
    folder.mkdir(parents=True, exist_ok=True)
    (folder / "pennylane-reporting-fictif.svg").write_text('\n'.join(parts)+'\n')

assets_path = ROOT / "lib/content/editorial-locales/assets.json"
assets = json.loads(assets_path.read_text())
assets["/images/blog/covers/pennylane-reporting-fictif.svg"] = {
    "en": "/images/blog/covers/en/pennylane-reporting-fictif.svg",
    "es": "/images/blog/covers/es/pennylane-reporting-fictif.svg",
}
assets_path.write_text(json.dumps(assets, ensure_ascii=False, indent=2)+'\n')
