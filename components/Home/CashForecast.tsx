import type { Locale } from "@/lib/i18n";
import {
  getHomePilotage,
  HOME_CASH_EXAMPLE,
} from "@/lib/content/home-pilotage";
import styles from "./pilotage.module.css";

/** Illustrative forecast rendered without a chart package or client script. */
export default function CashForecast({ locale }: { locale: Locale }) {
  const t = getHomePilotage(locale).sheet;
  return (
    <aside className={styles.sheet} aria-label={t.intro}>
      <div className={styles.sheetTop}>
        <span>ITER / FINANCE</span>
        <span className={styles.label}>{t.badge}</span>
      </div>
      <h2>{t.title}</h2>
      <p className={styles.sheetIntro}>{t.intro}</p>
      <dl className={styles.kpis}>
        {t.kpis.map((label, i) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>
              {
                [
                  locale === "en" ? "€184k" : "184 k€",
                  t.runway,
                  locale === "en" ? "€61k" : "61 k€",
                ][i]
              }
            </dd>
          </div>
        ))}
      </dl>
      <div className={styles.chart} role="img" aria-label={t.description}>
        <p className={styles.axis}>{t.axis}</p>
        <div className={styles.plot}>
          <div
            className={styles.threshold}
            style={{ bottom: `${(50 / 220) * 100}%` }}
          >
            <span>{t.threshold}</span>
          </div>
          <div className={styles.bars} aria-hidden="true">
            {HOME_CASH_EXAMPLE.map((cash, i) => (
              <div className={styles.column} key={i}>
                <span
                  className={`${styles.bar} ${i === 6 ? styles.low : ""}`}
                  style={{ height: `${(cash / 220) * 100}%` }}
                />
                <span className={styles.week}>
                  {t.week}
                  {i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.sheetFooter}>
        <span>{t.rhythm}</span>
        <span>{t.process}</span>
      </div>
    </aside>
  );
}
