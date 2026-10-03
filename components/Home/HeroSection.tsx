import Image from "next/image";
import Link from "@/components/PublishedLocaleLink";
import { parityHref } from "@/lib/locale-route-map";
import {
  getHomePilotage,
  HOME_TRUSTFOLIO_URL,
} from "@/lib/content/home-pilotage";
import type { Locale } from "@/lib/i18n";
import CashForecast from "./CashForecast";
import styles from "./pilotage.module.css";

export default function HeroSection({ locale }: { locale: Locale }) {
  const t = getHomePilotage(locale);
  return (
    <section data-journey="home-hero" className={styles.hero}>
      <div className={styles.wrap}>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{t.eyebrow}</p>
            <h1>
              {t.headline[0]}
              <em>{t.headline[1]}</em>
              {t.headline[2]}
            </h1>
            <p className={styles.lead}>{t.subtitle}</p>
            <div className={styles.actions}>
              <Link
                locale={locale}
                href={parityHref("/contact#daf", locale)}
                className={styles.primary}
              >
                {t.contact}
                <span aria-hidden="true">↗</span>
              </Link>
              <Link
                locale={locale}
                href={parityHref("/daf-externalise/tarifs", locale)}
                className={styles.secondary}
              >
                {t.fees}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className={styles.price}>
              {t.engagement}
            </p>
            <p className={styles.start}>
              {t.noMinimum} {t.start}
            </p>
            <div className={styles.proofs}>
              {t.proofs.map((proof, i) =>
                i === 2 ? (
                  <a
                    key={proof.label}
                    href={HOME_TRUSTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <strong>{proof.value}</strong>
                    <span>{proof.label}</span>
                  </a>
                ) : (
                  <div key={proof.label}>
                    <strong>{proof.value}</strong>
                    <span>{proof.label}</span>
                  </div>
                ),
              )}
            </div>
          </div>
          <CashForecast locale={locale} />
        </div>
        <div className={styles.rhSignal}>
          <Image
            src="/images/team/borith-biv.webp"
            alt="Borith Biv"
            width={40}
            height={40}
            className={styles.avatar}
          />
          <p>
            <strong>{t.rhSignal}</strong> {t.rhSignalText}
          </p>
          <Link locale={locale} href={parityHref("/drh-externalise", locale)}>
            {t.rhLink} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
