import type { Metadata } from "next";
import Link from "next/link";
import ComicCharacters from "@/components/offer-joke/ComicCharacters";
import Negotiation from "@/components/offer-joke/Negotiation";
import styles from "./offre.module.css";

export const metadata: Metadata = {
  title: "L’offre imbattable de Starduix & Raleurix | Une blague Iter Advisors",
  description: "Une aventure financière totalement fictive : deux CFO antiques, un abaque et une très mauvaise politique tarifaire.",
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true, "max-snippet": 0 } },
  openGraph: { title: "Vous êtes proches de vos sesterces ?", description: "Starduix & Raleurix, CFO à temps très partiel. Une parodie, pas un devis.", type: "website" },
};

const episodes = [
  { number: "I", title: "Le diagnostic au doigt mouillé", caption: "Avant de piloter, il faut compter. Enfin, essayer.", scene: "ledger", lines: [{ speaker: "Starduix", text: "J’ai trouvé le problème : les dépenses." }, { speaker: "Raleurix", text: "Parfait. On supprime la colonne." }] },
  { number: "II", title: "Le prévisionnel divinatoire", caption: "Un horizon de trésorerie à treize lunes. Fiabilité : variable.", scene: "forecast", lines: [{ speaker: "Raleurix", text: "Le cash est enfin positif !" }, { speaker: "Starduix", text: "Tu as retourné le parchemin." }] },
  { number: "III", title: "Le budget très participatif", caption: "Chaque dépense mérite une explication créative.", scene: "feast", lines: [{ speaker: "Starduix", text: "Le banquet dépasse le budget." }, { speaker: "Raleurix", text: "Passe-le en R&D. Recherche et Digestion." }] },
  { number: "IV", title: "Le reporting rassurant", caption: "La couleur des indicateurs est une décision stratégique.", scene: "report", lines: [{ speaker: "Raleurix", text: "Tous les voyants sont verts." }, { speaker: "Starduix", text: "Normal. Tu n’as acheté que de l’encre verte." }] },
  { number: "V", title: "La levée de sesterces", caption: "On prépare le dossier. Le dossier nous prépare au pire.", scene: "coins", lines: [{ speaker: "Starduix", text: "J’ai trouvé un investisseur !" }, { speaker: "Raleurix", text: "Il ne demande que 120 % du capital." }] },
  { number: "VI", title: "Le passage de relais", caption: "Une mission à temps partiel. Une confiance à plein temps.", scene: "handover", lines: [{ speaker: "Raleurix", text: "Et quand nous ne sommes pas là ?" }, { speaker: "Starduix", text: "Le tableau de bord est autonome. Il panique tout seul." }] },
] as const;

export default function OffreImbattablePage() {
  return <main className={styles.page}>
    <div className={styles.paper}>
      <header className={styles.masthead}>
        <Link href="/" className={styles.brand} prefetch={false}>ITER<span>ADVISORS</span></Link>
        <span className={styles.edition}>Édition très peu sérieuse · 01</span>
        <span className={styles.parody}>100 % parodie</span>
      </header>
      <section className={styles.hero} aria-labelledby="joke-title">
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Le comptoir des CFO antiques présente</p>
          <h1 id="joke-title">Vous êtes proches <br />de vos <span>sesterces ?</span></h1>
          <p className={styles.heroLead}>Nous aussi.<br /><strong>Surtout des vôtres.</strong></p>
          <p className={styles.heroText}>Starduix et Raleurix, CFO à temps partiel, prix en morceaux et idées pas toujours rentables.</p>
          <a href="#la-mission" className={styles.primary}>Lire leur glorieuse mission <span aria-hidden="true">↓</span></a>
        </div>
        <div className={styles.heroArt}>
          <div className={`${styles.heroBubble} ${styles.bubbleStarduix}`}><span>Starduix</span>On va brader notre travail.</div>
          <div className={`${styles.heroBubble} ${styles.bubbleRaleurix}`}><span>Raleurix</span>Encore ? Il reste un prix ?</div>
          <ComicCharacters hero />
          <div className={styles.characterNames}><span>Starduix<small>Le stratège de la remise</small></span><span>Raleurix<small>Le gardien du fond de caisse</small></span></div>
          <span className={styles.stamp}>Prix cassés.<br />Abaque inclus.</span>
        </div>
      </section>
      <div className={styles.ticker} aria-label="Leurs engagements fictifs"><span>Trésorerie au doigt mouillé</span><i aria-hidden="true">✦</i><span>Reporting sur parchemin</span><i aria-hidden="true">✦</i><span>Rentabilité en option</span><i aria-hidden="true">✦</i><span>Humour non amortissable</span></div>
      <section className={styles.mission} id="la-mission" aria-labelledby="mission-title">
        <div className={styles.sectionHeading}><span className={styles.chapter}>Le rouleau de mission</span><h2 id="mission-title">Une mission CFO.<br /><em>Six cases. Zéro retenue.</em></h2><p>Ils arrivent. Ils analysent. Ils négocient contre eux-mêmes.<br />Voici comment tout aurait pu très mal se passer.</p></div>
        <div className={styles.comicGrid}>
          {episodes.map((episode) => <article key={episode.number} className={styles.panel}>
            <div className={styles.panelHeading}><span>{episode.number}</span><h3>{episode.title}</h3></div>
            <div className={styles.panelScene}><div className={styles.dialogues}>{episode.lines.map((line, index) => <p className={`${styles.dialogue} ${index ? styles.reply : ""}`} key={line.speaker}><span>{line.speaker}</span>{line.text}</p>)}</div><ComicCharacters scene={episode.scene} reverse={episode.lines[0].speaker === "Raleurix"} /></div>
            <p className={styles.caption}>{episode.caption}</p>
          </article>)}
        </div>
      </section>
      <section className={styles.closing} aria-labelledby="offer-title">
        <div className={styles.closingCopy}><span className={styles.chapter}>Le moment où tout dérape</span><h2 id="offer-title">Du temps partiel.<br /><em>Un tarif partiellement réfléchi.</em></h2><p>Ils avaient préparé un budget.<br />Puis vous avez demandé une remise.</p><p className={styles.aside}>« Notre marge ? On a surtout laissé de la marge à gauche du parchemin. »<span>Raleurix, directeur de la rentabilité négative</span></p></div>
        <Negotiation />
      </section>
      <footer className={styles.footer}>
        <div><strong>Ils vécurent heureux et clôturèrent beaucoup d’exercices.</strong><p>Cette page est une blague. Les personnages et dialogues sont fictifs. Les vraies missions Iter Advisors sont un peu plus sérieuses.</p></div>
        <Link href="/daf-externalise" prefetch={false}>Retour à une offre raisonnable <span aria-hidden="true">↗</span></Link>
      </footer>
    </div>
  </main>;
}
