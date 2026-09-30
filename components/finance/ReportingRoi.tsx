"use client";
import { useId, useState } from "react";
import { reportingRoi, type ReportingInputs } from "@/lib/reporting-roi";
const fields: { key: keyof ReportingInputs; label: string; unit: string }[] = [
  { key: "before", label: "Temps mensuel actuel", unit: "heures" },
  { key: "after", label: "Temps après, contrôles et reprises inclus", unit: "heures" },
  { key: "hourly", label: "Coût horaire chargé", unit: "€ / heure" },
  { key: "recurring", label: "Licences, connecteurs et maintenance supplémentaires", unit: "€ / mois" },
  { key: "setup", label: "Mise en place, formation et temps interne", unit: "€ au départ" },
];
const money = (value: number) => value.toLocaleString("fr-FR", { maximumFractionDigits: 0 });
export default function ReportingRoi() {
  const id = useId();
  const [values, setValues] = useState({ before: "20", after: "8", hourly: "50", recurring: "250", setup: "3000" });
  const result = Object.values(values).some(value => value.trim() === "") ? null : reportingRoi(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])) as ReportingInputs);
  return <div className="not-prose rounded-2xl border border-iter-violet/20 bg-muted/30 p-5 sm:p-7">
    <p className="text-sm text-muted-foreground">Hypothèses fictives préremplies, à remplacer par vos mesures. Aucun chiffre saisi n’est envoyé à Iter.</p>
    <div className="my-5 grid gap-4 sm:grid-cols-2">{fields.map(field => <div key={field.key}>
      <label className="block text-sm font-medium mb-2" htmlFor={`${id}-${field.key}`}>{field.label} ({field.unit})</label>
      <input id={`${id}-${field.key}`} type="number" min="0" step="any" inputMode="decimal" value={values[field.key]} onChange={event => setValues({ ...values, [field.key]: event.target.value })} className="min-h-11 w-full rounded-lg border border-border bg-white p-3 text-foreground focus:outline-2 focus:outline-iter-violet" />
    </div>)}</div>
    <div role="status" aria-live="polite" aria-atomic="true" className="rounded-xl bg-white p-5">
      {result ? <><p className="font-semibold text-lg">{money(result.net)} € / mois de capacité nette valorisée</p><p className="mt-2 text-sm">{result.hours.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} heures libérées par mois. {result.months === null ? "Pas d’amortissement sur ces hypothèses : le gain net est nul ou négatif." : `Amortissement indicatif : ${result.months.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} mois.`}</p></> : <p>Renseignez chaque champ avec un nombre positif ou nul.</p>}
    </div>
    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Calcul : (temps actuel − temps après) × coût horaire − coûts mensuels supplémentaires. Le coût initial est divisé par le gain net positif. Ce calcul simple n’intègre ni fiscalité ni actualisation ; un temps libéré n’est une économie de trésorerie que si une dépense diminue réellement.</p>
  </div>;
}
