import CopyPrompt from "./CopyPrompt";
import type { Locale } from "@/lib/i18n";
import { parityHref } from "@/lib/locale-route-map";
import { reportingKitText } from "@/lib/content/reporting-kit-locales";
export default function ReportingKit({ locale = "fr" }: { locale?: Locale }) {
  const t = (source: string) => reportingKitText(locale, source);
  return <section>
    <h2 id="kit-reporting" className="scroll-mt-24">{t("Essayez sur un reporting fictif, avec son corrigé")}</h2>
    <p>{t("Ce kit pédagogique ne contient aucune donnée client. Il décrit un mois pour une entreprise fictive, en milliers d’euros, avec des charges positives. Le solde CA moins charges n’est pas un EBITDA comptable.")}</p>
    <p><a href={locale === "fr" ? "/downloads/kit-reporting-pme.zip" : `/downloads/reporting-kit-${locale}.zip`} download className="font-semibold">{t("Télécharger le kit complet (ZIP)")}</a> {t("ou")} <a href={locale === "fr" ? "/downloads/reporting-pme-exercice.csv" : `/downloads/reporting-exercise-${locale}.csv`} download>{t("ouvrir le fichier CSV")}</a>.</p>
    <ol><li>{t("Ouvrez les données dans Excel ou votre tableur : séparateur point-virgule, encodage UTF-8. Vérifiez la période, l’entité, l’unité et l’unicité des identifiants.")}</li><li>{t("Agrégez le chiffre d’affaires et les charges, puis calculez les écarts. Comparez avec le corrigé fourni.")}</li><li>{t("Utilisez le prompt ci-dessous sur ce fichier fictif. Rejetez toute cause non présente dans les données.")}</li><li>{t("Testez ensuite le fichier avec doublon : le contrôle doit identifier la ligne répétée avant de valider le total.")}</li></ol>
    <div className="prose-table-wrapper"><table><caption>{t("Résultat attendu du fichier valide, en k€")}</caption><thead><tr><th scope="col">{t("Indicateur")}</th><th scope="col">{t("Budget")}</th><th scope="col">{t("Réel")}</th><th scope="col">{t("Écart")}</th></tr></thead><tbody><tr><th scope="row">{t("Chiffre d’affaires")}</th><td>200</td><td>180</td><td>−20 (−10 %)</td></tr><tr><th scope="row">{t("Charges")}</th><td>150</td><td>155</td><td>{t("+5 (+3,33 %)")}</td></tr><tr><th scope="row">{t("Solde simplifié")}</th><td>50</td><td>25</td><td>−25 (−50 %)</td></tr></tbody></table></div>
    <CopyPrompt locale={locale} text={t("Analyse ce reporting fictif en k€. Vérifie les identifiants dupliqués, les périodes, les unités et les champs vides avant tout calcul. En cas d’anomalie, indique-la et suspends la validation des totaux. Sinon, calcule le CA, les charges et le solde simplifié, puis leurs écarts au budget. Montre les opérations ou le code utilisé. Rédige un commentaire de 120 mots maximum, en séparant faits, hypothèses et questions. N’invente aucune cause. Un pourcentage avec budget nul est non calculable.")} />
    <p><strong>{t("Commentaire de référence :")}</strong> {t("le CA est inférieur au budget de 20 k€ et les charges le dépassent de 5 k€. Le solde simplifié baisse donc de 25 k€. Les données ne permettent pas d’attribuer ces écarts à un prix, un volume ou un recrutement : ces causes doivent être vérifiées auprès des responsables.")}</p>
    <p>{t("La réussite de cet exercice ne valide pas un déploiement sur vos comptes. Le")} <a href={parityHref("/ressources/ia-finance/feuille-de-route-90-jours", locale)}>{t("protocole de pilote")}</a> {t("décrit les contrôles à organiser avec votre équipe.")}</p>
  </section>;
}
