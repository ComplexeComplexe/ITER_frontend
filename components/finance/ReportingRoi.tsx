"use client";
import { useId, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { reportingRoi, type ReportingInputs } from "@/lib/reporting-roi";

/** Only calculator labels are shipped to the browser; articles stay server-rendered. */
const copy = {
  fr: {
    labels: ["Temps mensuel actuel", "Temps après, contrôles et reprises inclus", "Coût horaire chargé", "Licences, connecteurs et maintenance supplémentaires", "Mise en place, formation et temps interne"],
    units: ["heures", "heures", "€ / heure", "€ / mois", "€ au départ"],
    intro: "Hypothèses fictives préremplies, à remplacer par vos mesures. Aucun chiffre saisi n’est envoyé à Iter.",
    net: "€ / mois de capacité nette valorisée", hours: "heures libérées par mois.",
    noPayback: "Pas d’amortissement sur ces hypothèses : le gain net est nul ou négatif.",
    payback: "Amortissement indicatif :", months: "mois.", invalid: "Renseignez chaque champ avec un nombre positif ou nul.",
    formula: "Calcul : (temps actuel − temps après) × coût horaire − coûts mensuels supplémentaires. Le coût initial est divisé par le gain net positif. Ce calcul simple n’intègre ni fiscalité ni actualisation ; un temps libéré n’est une économie de trésorerie que si une dépense diminue réellement.",
  },
  en: {
    labels: ["Current monthly time", "Time after, including controls and rework", "Fully loaded hourly cost", "Additional licences, connectors and maintenance", "Setup, training and internal time"],
    units: ["hours", "hours", "€ / hour", "€ / month", "€ upfront"],
    intro: "Pre-filled fictitious assumptions: replace them with your measurements. No entered figure is sent to Iter.",
    net: "€ / month in net capacity value", hours: "hours released per month.",
    noPayback: "No payback on these assumptions: the net benefit is zero or negative.",
    payback: "Indicative payback:", months: "months.", invalid: "Enter a positive number or zero in every field.",
    formula: "Calculation: (current time − time after) × hourly cost − additional monthly costs. Initial cost is divided by the positive net benefit. This simple calculation excludes tax and discounting; released time is a cash saving only when spending actually falls.",
  },
  es: {
    labels: ["Tiempo mensual actual", "Tiempo posterior, incluidos controles y correcciones", "Coste horario total", "Licencias, conectores y mantenimiento adicionales", "Implantación, formación y tiempo interno"],
    units: ["horas", "horas", "€ / hora", "€ / mes", "€ iniciales"],
    intro: "Hipótesis ficticias precargadas: sustitúyelas por tus mediciones. No se envía ninguna cifra a Iter.",
    net: "€ / mes de valor neto de capacidad", hours: "horas liberadas al mes.",
    noPayback: "Sin amortización con estas hipótesis: el beneficio neto es nulo o negativo.",
    payback: "Amortización orientativa:", months: "meses.", invalid: "Introduce un número positivo o cero en cada campo.",
    formula: "Cálculo: (tiempo actual − tiempo posterior) × coste horario − costes mensuales adicionales. El coste inicial se divide por el beneficio neto positivo. Este cálculo no incluye fiscalidad ni descuento; el tiempo liberado solo es ahorro de caja si disminuye realmente un gasto.",
  },
};
const keys: (keyof ReportingInputs)[] = ["before", "after", "hourly", "recurring", "setup"];
export default function ReportingRoi({ locale = "fr" }: { locale?: Locale }) {
  const ui = copy[locale];
  const format = (value: number, digits = 0) => value.toLocaleString({ fr: "fr-FR", en: "en-GB", es: "es-ES" }[locale], { maximumFractionDigits: digits });
  const id = useId();
  const [values, setValues] = useState({ before: "20", after: "8", hourly: "50", recurring: "250", setup: "3000" });
  const result = Object.values(values).some(value => value.trim() === "") ? null : reportingRoi(Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)])) as ReportingInputs);
  return <div className="site-card not-prose rounded-2xl border border-iter-violet/20 bg-muted/30 p-5 sm:p-7">
    <p className="text-sm text-muted-foreground">{ui.intro}</p>
    <div className="my-5 grid gap-4 sm:grid-cols-2">{keys.map((key, i) => <div key={key}>
      <label className="block text-sm font-medium mb-2" htmlFor={`${id}-${key}`}>{ui.labels[i]} ({ui.units[i]})</label>
      <input id={`${id}-${key}`} type="number" min="0" step="any" inputMode="decimal" value={values[key]} onChange={event => setValues({ ...values, [key]: event.target.value })} className="min-h-11 w-full rounded-lg border border-border bg-white p-3 text-foreground focus:outline-2 focus:outline-iter-violet" />
    </div>)}</div>
    <div role="status" aria-live="polite" aria-atomic="true" className="site-card rounded-xl bg-white p-5">
      {result ? <><p className="font-semibold text-lg">{format(result.net)} {ui.net}</p><p className="mt-2 text-sm">{format(result.hours, 1)} {ui.hours} {result.months === null ? ui.noPayback : `${ui.payback} ${format(result.months, 1)} ${ui.months}`}</p></> : <p>{ui.invalid}</p>}
    </div>
    <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{ui.formula}</p>
  </div>;
}
