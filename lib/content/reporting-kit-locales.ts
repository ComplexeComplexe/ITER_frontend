import type { Locale } from "@/lib/i18n";
const translations: Record<"en" | "es", Record<string, string>> = {
  "en": {
    "Essayez sur un reporting fictif, avec son corrigé": "Try fictitious reporting with its answer key",
    "Ce kit pédagogique ne contient aucune donnée client. Il décrit un mois pour une entreprise fictive, en milliers d’euros, avec des charges positives. Le solde CA moins charges n’est pas un EBITDA comptable.": "This teaching kit contains no client data. It describes one month for a fictitious company, in thousands of euros, with positive expenses. The revenue-minus-expenses balance is not accounting EBITDA.",
    "Télécharger le kit complet (ZIP)": "Download the complete kit (ZIP)",
    "ou": "or",
    "ouvrir le fichier CSV": "open the CSV file",
    "Ouvrez les données dans Excel ou votre tableur : séparateur point-virgule, encodage UTF-8. Vérifiez la période, l’entité, l’unité et l’unicité des identifiants.": "Open the data in Excel or your spreadsheet: semicolon delimiter, UTF-8 encoding. Check period, entity, unit and unique identifiers.",
    "Agrégez le chiffre d’affaires et les charges, puis calculez les écarts. Comparez avec le corrigé fourni.": "Aggregate revenue and expenses, then calculate variances. Compare with the supplied answer key.",
    "Utilisez le prompt ci-dessous sur ce fichier fictif. Rejetez toute cause non présente dans les données.": "Use the prompt below on this fictitious file. Reject any cause absent from the data.",
    "Testez ensuite le fichier avec doublon : le contrôle doit identifier la ligne répétée avant de valider le total.": "Then test the file containing a duplicate: the control must identify the repeated row before validating the total.",
    "Résultat attendu du fichier valide, en k€": "Expected result for the valid file, in k€",
    "Indicateur": "Indicator",
    "Budget": "Budget",
    "Réel": "Actual",
    "Écart": "Variance",
    "Chiffre d’affaires": "Revenue",
    "Charges": "Expenses",
    "Solde simplifié": "Simplified balance",
    "+5 (+3,33 %)": "+5 (+3.33%)",
    "Analyse ce reporting fictif en k€. Vérifie les identifiants dupliqués, les périodes, les unités et les champs vides avant tout calcul. En cas d’anomalie, indique-la et suspends la validation des totaux. Sinon, calcule le CA, les charges et le solde simplifié, puis leurs écarts au budget. Montre les opérations ou le code utilisé. Rédige un commentaire de 120 mots maximum, en séparant faits, hypothèses et questions. N’invente aucune cause. Un pourcentage avec budget nul est non calculable.": "Analyse this fictitious reporting in k€. Check duplicate identifiers, periods, units and empty fields before any calculation. If an anomaly exists, identify it and suspend validation of totals. Otherwise, calculate revenue, expenses and the simplified balance, then their budget variances. Show the operations or code used. Write commentary of no more than 120 words, separating facts, hypotheses and questions. Invent no cause. A percentage with a zero budget is not calculable.",
    "Commentaire de référence :": "Reference commentary:",
    "le CA est inférieur au budget de 20 k€ et les charges le dépassent de 5 k€. Le solde simplifié baisse donc de 25 k€. Les données ne permettent pas d’attribuer ces écarts à un prix, un volume ou un recrutement : ces causes doivent être vérifiées auprès des responsables.": "revenue is €20k below budget and expenses exceed budget by €5k. The simplified balance therefore falls by €25k. The data does not allow attribution to price, volume or hiring: these causes must be checked with the owners.",
    "La réussite de cet exercice ne valide pas un déploiement sur vos comptes. Le": "Passing this exercise does not validate deployment on your accounts. The",
    "protocole de pilote": "pilot protocol",
    "décrit les contrôles à organiser avec votre équipe.": "describes controls to organise with your team."
  },
  "es": {
    "Essayez sur un reporting fictif, avec son corrigé": "Prueba un reporting ficticio con su solución",
    "Ce kit pédagogique ne contient aucune donnée client. Il décrit un mois pour une entreprise fictive, en milliers d’euros, avec des charges positives. Le solde CA moins charges n’est pas un EBITDA comptable.": "Este kit didáctico no contiene datos de clientes. Describe un mes de una empresa ficticia en miles de euros, con gastos positivos. El saldo ingresos menos gastos no es un EBITDA contable.",
    "Télécharger le kit complet (ZIP)": "Descargar el kit completo (ZIP)",
    "ou": "o",
    "ouvrir le fichier CSV": "abrir el archivo CSV",
    "Ouvrez les données dans Excel ou votre tableur : séparateur point-virgule, encodage UTF-8. Vérifiez la période, l’entité, l’unité et l’unicité des identifiants.": "Abre los datos en Excel o tu hoja de cálculo: separador punto y coma, codificación UTF-8. Verifica periodo, entidad, unidad e identificadores únicos.",
    "Agrégez le chiffre d’affaires et les charges, puis calculez les écarts. Comparez avec le corrigé fourni.": "Agrega ingresos y gastos, calcula las desviaciones y compara con la solución incluida.",
    "Utilisez le prompt ci-dessous sur ce fichier fictif. Rejetez toute cause non présente dans les données.": "Utiliza el prompt siguiente con el archivo ficticio. Rechaza causas no presentes en los datos.",
    "Testez ensuite le fichier avec doublon : le contrôle doit identifier la ligne répétée avant de valider le total.": "Prueba después el archivo con duplicado: el control debe identificar la fila repetida antes de validar el total.",
    "Résultat attendu du fichier valide, en k€": "Resultado esperado del archivo válido, en k€",
    "Indicateur": "Indicador",
    "Budget": "Presupuesto",
    "Réel": "Real",
    "Écart": "Desviación",
    "Chiffre d’affaires": "Ingresos",
    "Charges": "Gastos",
    "Solde simplifié": "Saldo simplificado",
    "+5 (+3,33 %)": "+5 (+3,33 %)",
    "Analyse ce reporting fictif en k€. Vérifie les identifiants dupliqués, les périodes, les unités et les champs vides avant tout calcul. En cas d’anomalie, indique-la et suspends la validation des totaux. Sinon, calcule le CA, les charges et le solde simplifié, puis leurs écarts au budget. Montre les opérations ou le code utilisé. Rédige un commentaire de 120 mots maximum, en séparant faits, hypothèses et questions. N’invente aucune cause. Un pourcentage avec budget nul est non calculable.": "Analiza este reporting ficticio en k€. Verifica identificadores duplicados, periodos, unidades y campos vacíos antes de calcular. Si hay una anomalía, indícala y suspende la validación de totales. Si no, calcula ingresos, gastos y saldo simplificado, y sus desviaciones respecto al presupuesto. Muestra las operaciones o el código. Redacta un comentario de 120 palabras como máximo, separando hechos, hipótesis y preguntas. No inventes causas. Un porcentaje con presupuesto cero no es calculable.",
    "Commentaire de référence :": "Comentario de referencia:",
    "le CA est inférieur au budget de 20 k€ et les charges le dépassent de 5 k€. Le solde simplifié baisse donc de 25 k€. Les données ne permettent pas d’attribuer ces écarts à un prix, un volume ou un recrutement : ces causes doivent être vérifiées auprès des responsables.": "los ingresos son 20 k€ inferiores al presupuesto y los gastos lo superan en 5 k€. El saldo simplificado cae 25 k€. Los datos no permiten atribuirlo a precio, volumen o contratación: esas causas deben verificarse con los responsables.",
    "La réussite de cet exercice ne valide pas un déploiement sur vos comptes. Le": "Superar el ejercicio no valida un despliegue sobre tus cuentas. El",
    "protocole de pilote": "protocolo del piloto",
    "décrit les contrôles à organiser avec votre équipe.": "describe los controles que debes organizar con tu equipo."
  }
};
export function reportingKitText(locale: Locale, source: string) {
 if (locale === "fr") return source;
 const value = translations[locale][source];
 if (value === undefined) throw new Error(`Missing kit translation: ${source}`);
 return value;
}
