import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, ProseTable } from '@/components/blog';
import MidArticleSoftCTA from '@/components/blog/MidArticleSoftCTA';

// COMP-01 (2026-07-24) — article comparatif ciblant la requête
// "DAF externalisé vs DAF intérimaire" + variantes (directeur financier
// interim vs externalise, CFO intérimaire prix).

const PAGE_URL =
  'https://www.iteradvisors.com/ressources/blog/daf-externalise-vs-daf-interimaire';

export const metadata: Metadata = {
  title:
    'DAF externalisé vs DAF intérimaire : lequel choisir en 2026 ? | Iter Advisors',
  description:
    'Externalisé ou intérimaire : durée, coût, mission, engagement. Le comparatif complet pour choisir le bon modèle de direction financière.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title:
      'DAF externalisé vs DAF intérimaire : lequel choisir en 2026 ?',
    description:
      'Externalisé ou intérimaire : durée, coût, mission, engagement. Le comparatif complet pour choisir le bon modèle de direction financière.',
    type: 'article',
    url: PAGE_URL,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: { index: true, follow: true },
};

const FAQ_ITEMS: { question: string; answer: string }[] = [
  {
    question:
      'Quelle est la différence principale entre DAF externalisé et DAF intérimaire ?',
    answer:
      'Le DAF intérimaire intervient à temps plein (ou quasi) pour une mission courte (3-18 mois), souvent en situation de crise ou transition. Le DAF externalisé travaille à temps partagé (1-3 jours/semaine) dans une relation longue durée avec l\'entreprise.',
  },
  {
    question: 'Quel est le coût d\'un DAF intérimaire ?',
    answer:
      'Le TJM d\'un DAF intérimaire est généralement de 900 à 1 500 € par jour. Sur une mission de 6 mois à 4 jours/semaine, cela représente 90 000 à 160 000 €.',
  },
  {
    question: 'Dans quel cas choisir un DAF intérimaire ?',
    answer:
      'Le DAF intérimaire est adapté en cas de départ inattendu du DAF, de fusion-acquisition, de restructuration financière ou de situation de crise nécessitant une présence quotidienne.',
  },
  {
    question: 'Le DAF externalisé peut-il remplacer définitivement un DAF salarié ?',
    answer:
      'Oui, pour les PME et startups qui n\'ont pas besoin d\'un DAF à temps plein. Le DAF externalisé offre le même niveau d\'expertise à 50-70 % du coût d\'un salarié.',
  },
  {
    question: 'Peut-on passer du DAF intérimaire au DAF externalisé ?',
    answer:
      'Oui, c\'est même une pratique recommandée. Le DAF intérimaire stabilise la situation en urgence, puis le DAF externalisé prend le relais pour assurer la continuité à moindre coût.',
  },
  {
    question: 'Quel modèle choisir pour une PME de 5-20M€ de CA ?',
    answer:
      'Pour une PME en croissance régulière, le DAF externalisé est généralement plus adapté et plus économique. Le DAF intérimaire n\'est justifié qu\'en situation exceptionnelle.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((it) => ({
    '@type': 'Question',
    name: it.question,
    acceptedAnswer: { '@type': 'Answer', text: it.answer },
  })),
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${PAGE_URL}#article`,
  headline: 'DAF externalisé ou DAF intérimaire : que choisir ?',
  description:
    'Durée, coût, continuité, engagement : le tableau comparatif complet pour choisir entre DAF externalisé et DAF intérimaire selon votre situation.',
  author: {
    '@type': 'Person',
    name: 'Benjamin Ziza',
    jobTitle: 'Associé fondateur — CFO & Investisseur, Iter Advisors',
    url: 'https://www.iteradvisors.com/a-propos/benjamin-ziza',
  },
  datePublished: '2026-07-24',
  dateModified: '2026-07-24',
  mainEntityOfPage: PAGE_URL,
  publisher: {
    '@type': 'Organization',
    '@id': 'https://www.iteradvisors.com/#organization',
    name: 'Iter Advisors',
  },
};

export default function DafExternalisVsDafInterimairePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostPageRefonte
        locale="fr"
        breadcrumbs={{
          resourcesLabel: 'Ressources',
          resourcesHref: '/ressources',
          blogLabel: 'Blog',
          blogHref: '/ressources/blog',
        }}
        slug="daf-externalise-vs-daf-interimaire"
        category="Comparaison"
        title="DAF externalisé ou DAF intérimaire : que choisir ?"
        dek="Durée, coût, continuité, engagement : le tableau comparatif complet pour choisir entre DAF externalisé et DAF intérimaire selon votre situation."
        author={{
          name: 'Benjamin Ziza',
          avatar: '/images/team/benjamin-ziza.webp',
          jobTitle: 'Associé fondateur — CFO & Investisseur, Iter Advisors',
          url: '/a-propos/benjamin-ziza',
        }}
        readingTime={7}
        dateModified="2026-07-24"
        heroImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
        toc={[
          { id: 'differences-fondamentales', label: '1. Différences fondamentales' },
          { id: 'tableau-comparatif', label: '2. Tableau comparatif' },
          { id: 'cout-tjm', label: '3. Coûts et TJM' },
          { id: 'quand-choisir', label: '4. Quand choisir lequel ?' },
          { id: 'cas-usage', label: '5. Cas d\'usage concrets' },
          { id: 'conclusion', label: '6. Notre recommandation' },
        ]}
        tldr="DAF intérimaire pour les missions courtes et la gestion de crise (3-18 mois, TJM 900-1500€). DAF externalisé pour une direction financière structurée dans la durée (temps partagé, €30-70k/an). 80% des PME en croissance choisissent l'externalisé."
        relatedArticles={[
          {
            url: '/ressources/blog/cout-daf-externalise-tarifs-prix-2026',
            category: 'Tarifs',
            title: 'Combien coûte un DAF externalisé en 2026 ?',
          },
          {
            url: '/ressources/blog/daf-externalise-vs-daf-salarie',
            category: 'Comparaison',
            title: 'DAF externalisé vs DAF salarié : analyse complète',
          },
          {
            url: '/ressources/blog/daf-externalise-vs-alternatives',
            category: 'Comparaison',
            title: 'DAF externalisé : comparatif des alternatives',
          },
        ]}
      >
        <h2 id="differences-fondamentales">1. Différences fondamentales</h2>
        <p>
          Lorsqu&apos;une PME ou une scale-up cherche à renforcer sa direction financière
          sans recruter un DAF à temps plein, deux options reviennent systématiquement dans
          les discussions : le <strong>DAF intérimaire</strong> et le{' '}
          <strong>DAF externalisé</strong>. Ces deux modèles partagent un point commun —
          ils font appel à un professionnel externe — mais leurs logiques d&apos;intervention,
          leur durée et leur structure de coût sont fondamentalement différentes.
        </p>

        <h3>Le DAF intérimaire : la réponse à l&apos;urgence</h3>
        <p>
          Le DAF intérimaire est un directeur financier sénior qui intervient{' '}
          <strong>à temps quasi-plein</strong> (3 à 5 jours par semaine) pour une durée
          délimitée, typiquement <strong>3 à 18 mois</strong>. Sa mission est le plus
          souvent définie par une situation exceptionnelle : départ soudain du DAF en
          poste, restructuration financière, fusion-acquisition, dépôt de bilan à prévenir,
          ou préparation d&apos;une levée de fonds imminente.
        </p>
        <p>
          Le DAF intérimaire s&apos;intègre à l&apos;équipe comme s&apos;il était salarié.
          Il assiste aux comités de direction, participe aux négociations bancaires, manage
          l&apos;équipe finance en place. Sa valeur réside dans sa <strong>disponibilité
          quasi-totale</strong> et sa capacité à absorber l&apos;urgence. En contrepartie,
          son coût est élevé : un TJM entre <strong>900 et 1 500 € par jour</strong>, pour
          une facture mensuelle souvent comprise entre 15 000 et 26 000 €.
        </p>

        <h3>Le DAF externalisé : la direction financière de long terme</h3>
        <p>
          Le DAF externalisé opère sur un modèle radicalement différent. Il intervient à{' '}
          <strong>temps partagé</strong> — généralement 1 à 3 jours par semaine — sur la
          durée, dans une relation qui s&apos;étend souvent sur 12 à 36 mois ou plus. Ce
          n&apos;est pas une solution de crise : c&apos;est une <strong>solution de
          structuration</strong> pour les entreprises qui ont besoin d&apos;une direction
          financière sérieuse sans la charge salariale d&apos;un DAF à temps plein.
        </p>
        <p>
          Concrètement, un DAF externalisé prend en charge le reporting mensuel, la
          gestion du cash et du BFR, la relation avec les banques et les actionnaires,
          la supervision de la comptabilité, et — selon le stade de l&apos;entreprise —
          la préparation de levées de fonds ou d&apos;opérations de croissance externe.
          Son tarif, calculé sur une base mensuelle forfaitaire, est généralement compris
          entre <strong>2 500 et 6 000 € par mois</strong>, soit 30 000 à 70 000 € par an.
        </p>

        <h2 id="tableau-comparatif">2. Tableau comparatif</h2>
        <p>
          Ce tableau synthétise les critères décisifs pour choisir entre les deux modèles :
        </p>

        <ProseTable>
          <thead>
            <tr>
              <th>Critère</th>
              <th>DAF intérimaire</th>
              <th>DAF externalisé</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Durée de mission</strong></td>
              <td>3 à 18 mois (délimitée)</td>
              <td>12 mois et plus (ouverte)</td>
            </tr>
            <tr>
              <td><strong>Présence hebdomadaire</strong></td>
              <td>3 à 5 jours / semaine</td>
              <td>1 à 3 jours / semaine</td>
            </tr>
            <tr>
              <td><strong>TJM moyen</strong></td>
              <td>900 – 1 500 € / jour</td>
              <td>600 – 1 000 € / jour</td>
            </tr>
            <tr>
              <td><strong>Coût mensuel estimé</strong></td>
              <td>15 000 – 26 000 €</td>
              <td>2 500 – 6 000 €</td>
            </tr>
            <tr>
              <td><strong>Coût annuel estimé</strong></td>
              <td>80 000 – 200 000 € (mission)</td>
              <td>30 000 – 70 000 €</td>
            </tr>
            <tr>
              <td><strong>Profil idéal</strong></td>
              <td>Crise, transition, M&amp;A, départ DAF</td>
              <td>Croissance, structuration, pilotage</td>
            </tr>
            <tr>
              <td><strong>Continuité long terme</strong></td>
              <td>Non — mission définie dans le temps</td>
              <td>Oui — relation durable</td>
            </tr>
            <tr>
              <td><strong>Connaissance de l&apos;entreprise</strong></td>
              <td>Se construit rapidement, puis repart</td>
              <td>S&apos;approfondit au fil du temps</td>
            </tr>
            <tr>
              <td><strong>Flexibilité du temps</strong></td>
              <td>Faible (mobilisation quasi-totale)</td>
              <td>Forte (ajustable au besoin)</td>
            </tr>
            <tr>
              <td><strong>Sourcing</strong></td>
              <td>Cabinets spécialisés interim management</td>
              <td>Cabinets DAF externalisé, indépendants</td>
            </tr>
          </tbody>
        </ProseTable>

        <h2 id="cout-tjm">3. Coûts et TJM : ce que vous payez vraiment</h2>
        <p>
          Le coût est souvent le premier critère de différenciation, mais il faut le
          lire avec nuance. Le TJM affiché n&apos;est pas le seul facteur — la durée
          de la mission et le niveau de présence hebdomadaire sont tout aussi
          déterminants.
        </p>

        <h3>Le coût réel d&apos;un DAF intérimaire</h3>
        <p>
          Prenons un cas typique : un DAF intérimaire mobilisé 4 jours par semaine pendant
          6 mois, à un TJM de 1 200 €. Le calcul est le suivant :{' '}
          <strong>4 jours × 4,3 semaines × 6 mois × 1 200 € = 123 840 €</strong> sur la
          période. Auxquels il faut ajouter les frais de cabinet (10 à 20 % du TJM pour
          un cabinet d&apos;interim management), soit un budget total de{' '}
          <strong>136 000 à 149 000 € HT</strong> pour six mois.
        </p>
        <p>
          Ce coût est justifié lorsque la situation l&apos;exige : un départ de DAF
          trois semaines avant un audit de data room, une crise de trésorerie aiguë
          ou une opération de M&amp;A imposent une présence intensive qui ne peut
          pas attendre. Mais en dehors de ces situations exceptionnelles, ce niveau
          de dépense est rarement optimisé.
        </p>

        <h3>Le coût réel d&apos;un DAF externalisé</h3>
        <p>
          Le DAF externalisé travaille sur un modèle forfaitaire mensuel, calibré
          en fonction du volume de travail et de la complexité de l&apos;entreprise.
          Pour une PME de 20 à 50 salariés avec un CA compris entre 5 et 20 M€,
          les forfaits Iter Advisors se situent entre <strong>3 000 et 5 500 € par
          mois</strong>, soit 36 000 à 66 000 € par an — 50 à 70 % moins cher qu&apos;un
          DAF salarié équivalent (dont le coût total employeur dépasse les 90 000 €
          dans cette tranche).
        </p>
        <p>
          Le calcul du TJM implicite d&apos;un DAF externalisé — ramené aux jours
          effectifs de présence — donne une fourchette de <strong>600 à 1 000 €</strong>,
          inférieure à celle de l&apos;intérimaire. Cette différence s&apos;explique
          par plusieurs facteurs : le DAF externalisé mutualise ses coûts entre
          plusieurs clients, il n&apos;a pas les contraintes d&apos;exclusivité
          d&apos;un intérimaire, et il s&apos;appuie souvent sur une infrastructure
          partagée (outils, templates, équipe comptable).
        </p>

        <MidArticleSoftCTA locale="fr" />

        <h2 id="quand-choisir">4. Quand choisir lequel ?</h2>
        <p>
          La question n&apos;est pas &laquo; lequel est meilleur &raquo; — les deux
          modèles répondent à des besoins distincts. La vraie question est : quelle est
          votre situation aujourd&apos;hui ?
        </p>

        <Callout type="warning" title="Choisissez le DAF intérimaire si…">
          <ul>
            <li>
              <strong>Votre DAF vient de partir sans préavis</strong> et l&apos;entreprise
              ne peut pas se permettre un vide de plusieurs mois dans la fonction financière.
            </li>
            <li>
              <strong>Vous êtes engagé dans une opération de M&amp;A</strong> (acquisition,
              cession, fusion) qui requiert une disponibilité quasi-totale du directeur
              financier pendant 6 à 12 mois.
            </li>
            <li>
              <strong>Vous traversez une crise de trésorerie</strong> ou êtes en situation
              de pré-défaillance, où chaque jour compte et où la négociation bancaire
              exige une présence physique intensive.
            </li>
            <li>
              <strong>Vous devez préparer une data room en urgence</strong> pour une due
              diligence dans les 4 à 8 semaines à venir, avec un périmètre documentaire
              conséquent.
            </li>
            <li>
              Vous avez besoin d&apos;un DAF qui <strong>manage une équipe finance
              existante</strong> au quotidien, avec une autorité hiérarchique claire
              pendant la transition.
            </li>
          </ul>
        </Callout>

        <Callout type="success" title="Choisissez le DAF externalisé si…">
          <ul>
            <li>
              <strong>Votre entreprise est en croissance régulière</strong> et vous avez
              besoin d&apos;une direction financière structurée sur le long terme, sans
              justifier un DAF à temps plein.
            </li>
            <li>
              <strong>Vous préparez une levée de fonds dans les 12 à 18 mois</strong> et
              souhaitez un partenaire financier qui construit le modèle, prépare les
              documents et accompagne les discussions avec les fonds sur la durée.
            </li>
            <li>
              <strong>Votre comptabilité est externalisée</strong> et vous cherchez
              un interlocuteur senior qui pilote la fonction finance de bout en bout,
              y compris la supervision du cabinet comptable.
            </li>
            <li>
              <strong>Votre CA est compris entre 2 et 30 M€</strong> — la tranche dans
              laquelle un DAF à temps plein est souvent surdimensionné mais où l&apos;absence
              de DAF crée des angles morts réels (BFR, budget, reporting investisseurs).
            </li>
            <li>
              Vous souhaitez une <strong>relation de confiance qui s&apos;inscrit dans
              la durée</strong>, où votre DAF connaît l&apos;historique de l&apos;entreprise,
              les actionnaires, les partenaires bancaires.
            </li>
          </ul>
        </Callout>

        <h2 id="cas-usage">5. Cas d&apos;usage concrets</h2>
        <p>
          Pour rendre ces critères plus tangibles, voici trois scénarios réels rencontrés
          chez nos clients ou dans notre réseau.
        </p>

        <h3>Cas 1 — Départ du DAF en pleine négociation bancaire (intérimaire)</h3>
        <p>
          Une PME industrielle de 12 M€ de CA perd son DAF de 8 ans, partant pour raisons
          personnelles, en plein milieu d&apos;une renégociation de lignes de crédit avec
          deux banques partenaires. La direction générale n&apos;a pas le profil pour
          conduire ces négociations seule. La solution retenue : un DAF intérimaire mobilisé
          4 jours par semaine pendant 5 mois, le temps de finaliser les accords bancaires,
          de stabiliser la fonction finance, et de recruter un DAF permanent.{' '}
          <strong>Coût : ~110 000 € sur la période.</strong> Entièrement justifié au regard
          du risque représenté par un échec des négociations.
        </p>

        <h3>Cas 2 — Scale-up SaaS B2B en hypercroissance (externalisé)</h3>
        <p>
          Une scale-up SaaS de 7 M€ ARR, 45 salariés, passe de 3 M€ à 7 M€ de revenus
          en 18 mois. Le fondateur gère lui-même les finances avec un contrôleur de gestion
          junior. Il a besoin d&apos;un DAF pour structurer le reporting MRR/ARR/Churn,
          préparer la prochaine levée de fonds Série A, et mettre en place un modèle
          financier robuste. Un DAF externalisé intervient 2 jours par semaine.{' '}
          <strong>Coût : 4 200 €/mois, soit 50 400 €/an.</strong> Un DAF salarié équivalent
          coûterait 95 000 à 110 000 € par an tout compris.
        </p>

        <h3>Cas 3 — Transition intérimaire → externalisé post-crise (les deux)</h3>
        <p>
          Une ETI de distribution (28 M€ de CA) traverse une rupture de trésorerie liée
          à un pic de BFR saisonnier amplifié par une erreur de prévision. Un DAF
          intérimaire est mobilisé en urgence (6 semaines, 5 jours/semaine) pour sécuriser
          les lignes de crédit court terme et mettre en place un suivi de trésorerie
          hebdomadaire. Une fois la crise résolue, un DAF externalisé prend le relais
          à 2 jours par semaine pour pérenniser les outils et piloter la fonction finance
          dans la durée. <strong>Ce passage de relais est la séquence la plus efficace</strong>{' '}
          dans les situations de crise résolue qui nécessitent ensuite une vraie structure.
        </p>

        <h2 id="conclusion">6. Notre recommandation</h2>
        <p>
          La règle empirique que nous appliquons chez Iter Advisors est simple :{' '}
          <strong>si la situation est exceptionnelle et urgente, prenez un intérimaire.
          Si la situation est normale ou en croissance, prenez un externalisé.</strong>
        </p>
        <p>
          Plus précisément, notre expérience auprès des PME et startups françaises nous
          montre que <strong>environ 80 % des dirigeants qui pensent avoir besoin d&apos;un
          DAF intérimaire ont en réalité besoin d&apos;un DAF externalisé</strong>. La
          confusion vient du fait que les deux répondent au même besoin apparent —{' '}
          &laquo; avoir un DAF sans l&apos;embaucher &raquo; — mais leurs cas d&apos;usage
          sont très différents.
        </p>
        <p>
          Le DAF intérimaire est une réponse chirurgicale à une situation de crise ou
          de transition intensive. Il coûte cher parce qu&apos;il vaut cher dans ce contexte
          précis. Mais le mobiliser pour structurer la croissance d&apos;une PME de 8 M€ de
          CA sur 24 mois, c&apos;est utiliser un scalpel là où une main régulière suffit —
          et payer trois fois le prix nécessaire.
        </p>
        <p>
          À l&apos;inverse, le DAF externalisé n&apos;est pas l&apos;outil adapté lorsque
          la maison brûle. Sa force est la continuité, la profondeur de connaissance de
          l&apos;entreprise, la construction progressive d&apos;une fonction finance robuste.
          Il ne peut pas traiter une urgence à 5 % de son temps disponible.
        </p>
        {/* C3 (W31c 2026-08-02) — maillage vers les pages commerciales du
            cluster DAF : l'article n'en portait que 2 (contact + gestion
            financière) alors qu'il traite frontalement l'arbitrage. */}
        <p>
          Concrètement, si votre besoin est ponctuel et intensif, c&apos;est une{' '}
          <Link href="/daf-externalise/transition" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            mission de DAF de transition
          </Link>{' '}
          qu&apos;il vous faut. S&apos;il est récurrent et étalé dans le temps, c&apos;est{' '}
          <Link href="/daf-externalise/temps-partage" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            un DAF à temps partagé
          </Link>
          , la formule la plus courante de notre offre de{' '}
          <Link href="/daf-externalise" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            direction financière externalisée
          </Link>
          . Les{' '}
          <Link href="/daf-externalise/tarifs" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            tarifs de DAF externalisé
          </Link>{' '}
          varient selon le volume de jours retenu. Si votre échéance est une levée,
          notre{' '}
          <Link href="/services/accompagnement-levee-de-fond" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            accompagnement de levée de fonds
          </Link>{' '}
          se combine avec l&apos;un ou l&apos;autre de ces formats. Pour le détail des
          missions du poste, voir notre{' '}
          <Link href="/ressources/blog/cfo-externe-role-missions-2026" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
            analyse du rôle et des missions d&apos;un CFO externe
          </Link>
          .
        </p>

        <Callout type="info" title="Notre approche chez Iter Advisors">
          <p>
            Iter Advisors positionne exclusivement ses DAFs sur des <strong>missions
            externalisées de longue durée</strong>. Nous n&apos;intervenons pas sur des
            missions intérimaires pures (crise aiguë, M&amp;A en cours), mais nous
            accompagnons régulièrement des entreprises qui sortent d&apos;une mission
            intérimaire et cherchent à <strong>pérenniser la fonction finance à un coût
            maîtrisé</strong>. Si vous êtes dans cette situation, notre{' '}
            <Link href="/contact" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
              appel de découverte de 30 minutes
            </Link>{' '}
            permet de cadrer rapidement le bon dispositif.
          </p>
        </Callout>

        <h2 id="faq">FAQ — DAF externalisé vs DAF intérimaire</h2>

        {FAQ_ITEMS.map((item, i) => (
          <details
            key={i}
            className="my-3 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-4"
          >
            <summary className="cursor-pointer font-semibold text-foreground">
              {item.question}
            </summary>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}

        <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
          <h3 className="mb-3 text-lg font-semibold text-slate-900">
            Vous hésitez encore entre les deux modèles ?
          </h3>
          <p className="mb-5 text-slate-700">
            Nos DAFs vous donnent un avis clair en 30 minutes sur le modèle adapté à
            votre situation — sans engagement. Découvrez aussi notre page dédiée à la{' '}
            <Link
              href="/services/gestion-financiere-externalisee"
              className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
            >
              direction financière externalisée
            </Link>{' '}
            ou{' '}
            <Link
              href="/contact"
              className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
            >
              prenez rendez-vous directement
            </Link>{' '}
            pour cadrer votre besoin et recevoir une proposition sous 5 jours ouvrés.
          </p>
        </div>
      </BlogPostPageRefonte>
    </>
  );
}
