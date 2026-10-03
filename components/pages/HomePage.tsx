import Image from "next/image";
import Link from "@/components/PublishedLocaleLink";
import PageLayout from "@/components/PageLayout";
import TeamMemberCard from "@/components/TeamMemberCard";
import HeroSection from "@/components/Home/HeroSection";
import HomeDecisionResources from "@/components/HomeDecisionResources";
import styles from "@/components/Home/pilotage.module.css";
import { getHomeContent } from "@/lib/content/home";
import {
  getHomeJourney,
  HOME_CLUSTER_PATHS,
  HOME_HR_PATHS,
} from "@/lib/content/home-journey";
import {
  getHomePilotage,
  HOME_CLIENT_LOGOS,
  HOME_CLIENT_NAMES,
  HOME_LEAD_SLUGS,
  HOME_NEED_PATHS,
  HOME_TRUSTFOLIO_URL,
} from "@/lib/content/home-pilotage";
import { getFallbackTeamMembers } from "@/lib/content/team";
import { parityHref } from "@/lib/locale-route-map";
import { faqPageSchema } from "@/lib/schemas";
import { strapiMediaUrl } from "@/lib/static-content";
import type { Locale } from "@/lib/i18n";
import type { StrapiTeamMember, CmsNavItem } from "@/lib/static-content";

/** Shared server-rendered homepage. PageLayout keeps the existing footer. */
export default function HomePage({
  locale,
  teamMembers = [],
  cmsNavigation,
}: {
  locale: Locale;
  teamMembers?: StrapiTeamMember[];
  cmsNavigation?: CmsNavItem[];
}) {
  const t = getHomePilotage(locale),
    journey = getHomeJourney(locale);
  const services = getHomeContent(locale).financeServices;
  const href = (path: string) => parityHref(path, locale);
  const members = [...getFallbackTeamMembers(locale), ...teamMembers]
    .filter((m, i, all) => all.findIndex((item) => item.slug === m.slug) === i)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
  const leads = HOME_LEAD_SLUGS.map((slug) =>
    members.find((m) => m.slug === slug),
  ).filter((member): member is StrapiTeamMember => !!member);
  const others = members.filter(
    (m) => !(HOME_LEAD_SLUGS as readonly string[]).includes(m.slug),
  );
  return (
    <PageLayout locale={locale} cmsNavigation={cmsNavigation}>
      <div className={styles.page} data-home-template="pilotage">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              faqPageSchema(
                t.faqItems.map((f) => ({ question: f.q, answer: f.a })),
              ),
            ),
          }}
        />
        <HeroSection locale={locale} />
        <section className={styles.logos} aria-label={t.logoLabel}>
          <div className={styles.wrap}>
            <p>{t.logoLabel}</p>
            <div>
              {HOME_CLIENT_LOGOS.map((slug, i) => (
                <Image
                  key={slug}
                  src={`/images/logos/logo-${slug}.${slug === "hosco" ? "svg" : "webp"}`}
                  alt={HOME_CLIENT_NAMES[i]}
                  width={140}
                  height={48}
                  sizes="(max-width: 600px) 100px, 140px"
                  unoptimized={slug === "hosco"}
                />
              ))}
            </div>
          </div>
        </section>
        <section className={styles.section} data-journey="home-needs">
          <div className={styles.wrap}>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>{t.needs.eyebrow}</p>
              <h2>{t.needs.title}</h2>
              <p>{t.needs.intro}</p>
            </div>
            <div className={styles.needs}>
              {t.needs.cards.map((item, i) => (
                <Link
                  key={item.title}
                  locale={locale}
                  href={href(HOME_NEED_PATHS[i])}
                >
                  <span className={styles.number}>
                    {String(i + 1).padStart(2, "0")} / {item.label}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className={styles.arrow} aria-hidden="true">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
        <section
          id="services"
          className={`${styles.section} ${styles.inverse}`}
        >
          <div className={`${styles.wrap} ${styles.split}`}>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>{t.services.eyebrow}</p>
              <h2>{t.services.title}</h2>
            </div>
            <div className={styles.services}>
              {services.map((item, i) => (
                <details key={item.title} open={i === 0}>
                  <summary>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {item.title}
                  </summary>
                  <p>{item.desc}</p>
                  <Link locale={locale} href={item.href}>
                    {t.services.link} <span aria-hidden="true">→</span>
                  </Link>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.section} data-journey="home-finance-offer">
          <div className={`${styles.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>{t.offer.eyebrow}</p>
              <h2>{t.offer.title}</h2>
            </div>
            <div>
              <p>{t.offer.text}</p>
              <p>
                {t.offer.link}{" "}
                <Link
                  locale={locale}
                  className={styles.textLink}
                  href={href("/daf-externalise")}
                >
                  {t.offer.anchor} <span aria-hidden="true">→</span>
                </Link>
              </p>
              <div className={styles.pricing}>
                <strong>{t.price}</strong>
                <p>{t.priceDetail}</p>
                <Link
                  locale={locale}
                  className={styles.textLink}
                  href={href("/daf-externalise/tarifs")}
                >
                  {t.fees} →
                </Link>
              </div>
              <nav className={styles.related} aria-label={t.offer.related}>
                {HOME_CLUSTER_PATHS.map((path, i) => (
                  <Link locale={locale} key={path} href={href(path)}>
                    {journey.cluster[i]}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </section>
        <section
          id="direction-rh"
          data-journey="home-rh-section"
          className={`${styles.section} ${styles.tint}`}
        >
          <div className={`${styles.wrap} ${styles.hrGrid}`}>
            <figure className={styles.hrPortrait}>
              <Image
                src="/images/team/borith-biv.webp"
                alt="Borith Biv"
                width={320}
                height={380}
                sizes="(max-width: 600px) 220px, 320px"
              />
              <figcaption>
                <Link locale={locale} href={href("/a-propos/borith-biv")}>
                  Borith Biv
                </Link>{" "}
                · {t.rh.role}
              </figcaption>
            </figure>
            <div>
              <p className={styles.eyebrow}>{t.rh.eyebrow}</p>
              <h2>{t.rh.title}</h2>
              <p className={styles.intro}>{t.rh.text}</p>
              <nav className={styles.related} aria-label={journey.hr.nav}>
                {HOME_HR_PATHS.map((path, i) => (
                  <Link key={path} locale={locale} href={href(path)}>
                    {journey.hr.links[i]}
                  </Link>
                ))}
              </nav>
              <Link
                locale={locale}
                href={href("/drh-externalise")}
                className={styles.textLink}
              >
                {t.rhLink} →
              </Link>
            </div>
          </div>
        </section>
        <section className={styles.section} data-journey="home-method">
          <div className={styles.wrap}>
            <div className={styles.heading}>
              <p className={styles.eyebrow}>{t.method.eyebrow}</p>
              <h2>{t.method.title}</h2>
            </div>
            <ol className={styles.method}>
              {t.method.steps.map((step, i) => (
                <li key={step.title}>
                  <b>{String(i + 1).padStart(2, "0")}</b>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.tint}`}
          data-journey="home-why"
        >
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{t.why.eyebrow}</p>
            <h2>{t.why.title}</h2>
            <div className={styles.three}>
              {t.why.items.map((item) => (
                <div key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section
          id="equipe"
          className={styles.section}
          data-journey="home-team"
        >
          <div className={styles.wrap}>
            <div className={`${styles.heading} ${styles.headingLink}`}>
              <div>
                <p className={styles.eyebrow}>{t.team.eyebrow}</p>
                <h2>{t.team.title}</h2>
              </div>
              <Link
                locale={locale}
                className={styles.textLink}
                href={href("/a-propos")}
              >
                {t.team.link} →
              </Link>
            </div>
            <div className={styles.leads}>
              {leads.map((member) => (
                <figure key={member.slug}>
                  <Link locale={locale} href={href(`/a-propos/${member.slug}`)}>
                    <Image
                      src={strapiMediaUrl(member.photo)}
                      alt={`${member.firstName} ${member.lastName}`}
                      width={280}
                      height={320}
                      sizes="(max-width: 600px) 45vw, 24vw"
                    />
                    <figcaption>
                      <strong>
                        {member.firstName} {member.lastName}
                      </strong>
                      <span>{member.role}</span>
                    </figcaption>
                  </Link>
                </figure>
              ))}
            </div>
            <div className={styles.teamRest}>
              {others.map((member) => (
                <TeamMemberCard
                  key={member.slug}
                  member={member}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        </section>
        <section
          className={`${styles.section} ${styles.inverse}`}
          data-journey="home-reviews"
        >
          <div className={styles.wrap}>
            <p className={styles.eyebrow}>{t.reviews.eyebrow}</p>
            <h2>{t.reviews.title}</h2>
            <div className={styles.quotes}>
              {t.reviewItems.map((review) => (
                <figure key={review.name}>
                  <blockquote>« {review.body} »</blockquote>
                  <figcaption>
                    <strong>{review.name}</strong>
                    <span>
                      {review.jobTitle} · {review.company}
                    </span>
                    {t.reviews.translated && (
                      <small>{t.reviews.translated}</small>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
            <a
              href={HOME_TRUSTFOLIO_URL}
              className={styles.reviewSource}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.reviews.source} →
            </a>
          </div>
        </section>
        <section className={styles.section} data-journey="home-moments">
          <div className={`${styles.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>{t.moments.eyebrow}</p>
              <h2>{t.moments.title}</h2>
            </div>
            <ul className={styles.moments}>
              {t.moments.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <section className={styles.section} data-journey="home-faq">
          <div className={`${styles.wrap} ${styles.split}`}>
            <div>
              <p className={styles.eyebrow}>{t.faq.eyebrow}</p>
              <h2>{t.faq.title}</h2>
            </div>
            <div className={styles.faq}>
              {t.faqItems.map((faq, i) => (
                <details key={faq.q} open={i === 0}>
                  <summary>{faq.q}</summary>
                  <p>{faq.a}</p>
                </details>
              ))}
              <Link
                locale={locale}
                className={styles.textLink}
                href={href("/daf-externalise")}
              >
                {t.faq.link} →
              </Link>
            </div>
          </div>
        </section>
        <div className={styles.resources}>
          <HomeDecisionResources locale={locale} />
        </div>
        <section
          className={`${styles.section} ${styles.inverse}`}
          data-journey="home-contact"
        >
          <div className={`${styles.wrap} ${styles.final}`}>
            <div>
              <p className={styles.eyebrow}>{t.final.eyebrow}</p>
              <h2>{t.final.title}</h2>
              <p className={styles.intro}>{t.final.text}</p>
              <Link
                locale={locale}
                className={styles.primary}
                href={href("/contact#daf")}
              >
                {t.contact}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
            <figure>
              <Image
                src="/images/team/sebastien-doat.webp"
                alt="Sébastien Doat"
                width={140}
                height={170}
              />
              <figcaption>
                <Link locale={locale} href={href("/a-propos/sebastien-doat")}>
                  Sébastien Doat
                </Link>
                <span>{t.final.role}</span>
              </figcaption>
            </figure>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
