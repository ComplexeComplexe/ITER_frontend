import { Metadata } from 'next';
import Link from 'next/link';
import BlogPostPageRefonte from '@/components/pages/BlogPostPageRefonte';
import { Callout, ProseTable } from '@/components/blog';
import { getCmsNavigation } from '@/lib/strapi';

export const metadata: Metadata = {
  title: "Loi Beckham : les conditions d'éligibilité en 2026 | Iter Advisors",
  description:
    "Qui peut bénéficier de la loi Beckham en Espagne ? Conditions, délais de demande, salariés et dirigeants : le point complet 2026.",
  alternates: {
    canonical:
      "https://www.iteradvisors.com/ressources/blog/loi-beckham-espagne-conditions-eligibilite",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80",
        alt: "Loi Beckham : conditions d'éligibilité en Espagne 2026",
      },
    ],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("fr");

  return (
    <BlogPostPageRefonte
      locale="fr"
      cmsNavigation={cmsNavigation}
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="loi-beckham-espagne-conditions-eligibilite"
      category="Fiscalité Espagne"
      title="Loi Beckham : êtes-vous éligible au régime des impatriés ?"
      dek="Taux fixe de 24 %, durée 6 ans, conditions strictes : tout ce qu'il faut vérifier avant de demander le régime Beckham en Espagne."
      author={{
        name: "Benjamin Ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Associé fondateur — CFO & Investisseur, Iter Advisors",
        url: "/a-propos/benjamin-ziza",
      }}
      readingTime={6}
      dateModified="2026-07-24"
      heroImage="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=80"
      toc={[
        { id: "principe", label: "1. Le principe du régime" },
        { id: "conditions-base", label: "2. Les 4 conditions de base" },
        { id: "profils-eligibles", label: "3. Profils éligibles" },
        { id: "profils-exclus", label: "4. Profils exclus" },
        { id: "delai-demande", label: "5. Délai et procédure" },
        { id: "quiz", label: "6. Test d'éligibilité" },
      ]}
      faqItems={[
        {
          question:
            "Peut-on bénéficier de la loi Beckham en tant qu'indépendant (freelance) ?",
          answer:
            "Depuis 2023, oui — uniquement via le visa Digital Nomad qui ouvre le régime aux travailleurs indépendants dont les clients sont majoritairement à l'étranger (>80%). Sans ce visa, un freelance classique ne peut pas accéder au régime Beckham.",
        },
        {
          question:
            "Combien de temps à l'avance faut-il déposer la demande ?",
          answer:
            "La demande (formulaire 149 auprès de l'AEAT) doit être déposée dans les 6 mois suivant l'embauche ou l'entrée en Espagne. Passé ce délai, le droit est définitivement perdu pour le séjour en cours.",
        },
        {
          question: "La loi Beckham s'applique-t-elle aux revenus mondiaux ?",
          answer:
            "Non. Le régime Beckham impose les revenus de source espagnole au taux fixe de 24%. Les revenus étrangers sont en principe exonérés d'IRPF (mais peuvent être soumis à d'autres impôts selon les conventions fiscales).",
        },
        {
          question:
            "Peut-on bénéficier du régime Beckham si on était déjà venu vivre en Espagne il y a 8 ans ?",
          answer:
            "Oui, à condition de ne pas avoir été résident fiscal en Espagne pendant les 5 années précédant immédiatement le retour. Un séjour d'il y a 8 ans est donc compatible avec le régime.",
        },
        {
          question:
            "Le dirigeant d'une SARL française peut-il bénéficier de la loi Beckham en Espagne ?",
          answer:
            "Non directement. Le régime exige un contrat de travail espagnol ou une nomination comme dirigeant d'une entité espagnole. Un dirigeant rémunéré uniquement par sa société française ne remplit pas cette condition.",
        },
        {
          question:
            "La loi Beckham est-elle cumulable avec la convention fiscale franco-espagnole ?",
          answer:
            "Ces deux dispositifs ont des interactions complexes. La convention franco-espagnole peut limiter la possibilité d'imposition en Espagne sur certains revenus français. Une analyse au cas par cas par un fiscaliste est indispensable.",
        },
      ]}
      tldr={
        <>
          <p>
            <strong>4 conditions cumulatives :</strong> non-résident fiscal les 5 ans
            précédents + transfert professionnel + contrat espagnol + revenus
            principaux en Espagne.
          </p>
          <p>
            <strong>Délai impératif :</strong> demande dans les 6 mois via formulaire
            149 déposé auprès de l&apos;AEAT.
          </p>
          <p>
            <strong>Avantage :</strong> taux fixe de 24 % sur les revenus espagnols
            pendant 6 ans (vs barème progressif jusqu&apos;à 47 %).
          </p>
        </>
      }
      relatedArticles={[
        {
          url: "/ressources/fiscalite/loi-beckham",
          category: "Fiscalité",
          title: "Guide complet de la loi Beckham en Espagne 2026",
        },
        {
          url: "/ressources/blog/loi-beckham-economie-impot-simulation",
          category: "Fiscalité",
          title: "Loi Beckham : combien d'impôt économisez-vous vraiment ?",
        },
        {
          url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          category: "Fiscalité",
          title: "Régimes fiscaux France vs Espagne : le comparatif",
        },
      ]}
      metaDescription="Qui peut bénéficier de la loi Beckham en Espagne ? Conditions, délais de demande, salariés et dirigeants : le point complet 2026."
    >
      {/* ─── 1. Le principe du régime ─────────────────────────────────────── */}
      <h2 id="principe">1. Le principe du régime</h2>

      <p>
        La loi Beckham — officiellement le <em>Régime spécial des impatriés</em> (article
        93 de la loi espagnole sur l&apos;IRPF) — permet aux personnes qui s&apos;installent en
        Espagne pour des raisons professionnelles de choisir d&apos;être imposées comme des
        non-résidents pendant une durée maximale de <strong>6 ans</strong>. Concrètement,
        cela signifie un <strong>taux fixe de 24 %</strong> sur les revenus de source
        espagnole jusqu&apos;à 600 000 € (47 % au-delà), là où le barème progressif classique
        de l&apos;IRPF peut atteindre 47 % dès les tranches supérieures.
      </p>

      <p>
        Le dispositif a été profondément réformé par la <em>Ley de Startups</em> en 2023,
        qui a étendu son accès à de nouveaux profils et assoupli certaines conditions. Il
        reste néanmoins soumis à des critères stricts que tout candidat doit vérifier
        avant de déposer sa demande.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Régime</th>
            <th>Taux applicable</th>
            <th>Durée</th>
            <th>Revenus concernés</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Régime Beckham (impatrié)</td>
            <td>24 % jusqu&apos;à 600 000 €</td>
            <td>6 ans</td>
            <td>Source espagnole uniquement</td>
          </tr>
          <tr>
            <td>IRPF classique (résident)</td>
            <td>19 % à 47 % (progressif)</td>
            <td>Illimité</td>
            <td>Revenus mondiaux</td>
          </tr>
          <tr>
            <td>Au-delà de 600 000 € (Beckham)</td>
            <td>47 %</td>
            <td>6 ans</td>
            <td>Source espagnole</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="info" title="Pourquoi « loi Beckham » ?">
        Le régime doit son surnom populaire à David Beckham, qui en aurait bénéficié
        lors de son arrivée au Real Madrid en 2003. La dénomination officielle est{' '}
        <em>Régimen especial aplicable a los trabajadores, profesionales,
        emprendedores e inversores desplazados a territorio español</em>.
      </Callout>

      {/* ─── 2. Les 4 conditions de base ──────────────────────────────────── */}
      <h2 id="conditions-base">2. Les 4 conditions de base</h2>

      <p>
        L&apos;accès au régime Beckham est conditionné à la réunion <strong>simultanée</strong>{' '}
        des quatre critères suivants. L&apos;absence de l&apos;un seul d&apos;entre eux entraîne le
        rejet de la demande.
      </p>

      <h3>Condition 1 — Non-résident fiscal en Espagne les 5 années précédentes</h3>

      <p>
        Le demandeur ne doit pas avoir été résident fiscal en Espagne au cours des{' '}
        <strong>5 années civiles</strong> précédant immédiatement le transfert. Cette
        condition est appréciée strictement : une résidence fiscale espagnole, même
        partielle, au cours de cette période disqualifie le candidat. En revanche, de
        simples séjours touristiques ou professionnels ponctuels ne constituent pas une
        résidence fiscale au sens de la loi espagnole.
      </p>

      <h3>Condition 2 — Déménagement en Espagne pour raisons professionnelles</h3>

      <p>
        L&apos;installation en Espagne doit être motivée par une activité professionnelle, et
        non par des raisons personnelles. L&apos;administration fiscale espagnole (AEAT) vérifie
        que le transfert est antérieur ou concomitant au début de l&apos;activité en Espagne.
        Un déménagement intervenu plusieurs mois avant la prise de poste peut faire
        l&apos;objet d&apos;une question.
      </p>

      <h3>Condition 3 — Contrat de travail espagnol ou nomination comme dirigeant</h3>

      <p>
        Le demandeur doit justifier soit d&apos;un <strong>contrat de travail avec une
        entité espagnole</strong>, soit d&apos;une <strong>nomination comme membre du
        conseil d&apos;administration</strong> (administrador, consejero) d&apos;une société
        espagnole, à condition que cette société ne soit pas une simple société
        patrimoniale. Depuis 2023, les travailleurs détachés par une entreprise étrangère
        peuvent également satisfaire cette condition, sous réserve de justifier du
        détachement.
      </p>

      <h3>Condition 4 — Revenus principaux de source espagnole</h3>

      <p>
        Les revenus du travail doivent être <strong>principalement générés en Espagne</strong>.
        Cette condition est en pratique vérifiée par le fait que le travailleur exerce
        son activité sur le territoire espagnol. Les revenus de source étrangère sont
        exclus de la base imposable au titre du régime Beckham — ce qui constitue un
        avantage notable pour les personnes percevant des dividendes ou des revenus
        immobiliers à l&apos;étranger.
      </p>

      <Callout type="warning" title="Condition cumulative">
        Ces quatre conditions doivent être réunies <strong>simultanément</strong> au moment
        du dépôt de la demande. La non-satisfaction d&apos;une seule condition, même
        marginalement, entraîne un rejet que l&apos;AEAT ne corrige pas rétroactivement.
      </Callout>

      {/* ─── 3. Profils éligibles ─────────────────────────────────────────── */}
      <h2 id="profils-eligibles">3. Profils éligibles</h2>

      <p>
        Depuis la réforme de 2023, le spectre des bénéficiaires potentiels du régime
        Beckham s&apos;est élargi. Les profils suivants sont expressément visés par la loi :
      </p>

      <h3>Salariés d&apos;entreprises espagnoles</h3>

      <p>
        C&apos;est le cas le plus courant et le plus solidement établi. Toute personne
        recrutée par une société espagnole — PME, filiale d&apos;un groupe international,
        startup — peut bénéficier du régime dès lors qu&apos;elle remplit les conditions
        de non-résidence préalable et de contrat de travail local. Les cadres supérieurs
        et les profils techniques internationaux sont les bénéficiaires les plus fréquents.
      </p>

      <h3>Dirigeants d&apos;entités espagnoles</h3>

      <p>
        Les personnes nommées comme <em>administrador único</em>, <em>consejero
        delegado</em> ou membre d&apos;un <em>consejo de administración</em> d&apos;une société
        espagnole opérationnelle (excluant les holdings pures) sont éligibles. Cette
        porte d&apos;entrée est particulièrement utilisée par les fondateurs d&apos;entreprises
        qui s&apos;installent en Espagne pour piloter leur activité locale.
      </p>

      <h3>Travailleurs détachés par une entreprise étrangère</h3>

      <p>
        Une personne détachée depuis son employeur étranger vers une entité espagnole du
        même groupe (ou vers un client espagnol dans le cadre d&apos;un accord commercial)
        peut prétendre au régime. Le détachement doit être formalisé par une lettre de
        mission ou un avenant au contrat de travail initial.
      </p>

      <h3>Digital nomads (depuis 2023)</h3>

      <p>
        La <em>Ley de Startups</em> de 2022, entrée en vigueur en 2023, a introduit le{' '}
        <strong>visa Digital Nomad</strong> espagnol, qui ouvre explicitement l&apos;accès au
        régime Beckham aux travailleurs indépendants (freelances) dont plus de 80 % des
        revenus proviennent de clients établis en dehors de l&apos;Espagne. C&apos;est une
        nouveauté importante qui répond à une demande croissante de la communauté des
        télétravailleurs internationaux installés en Espagne.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Profil</th>
            <th>Éligibilité</th>
            <th>Condition spécifique</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Salarié d&apos;une entreprise espagnole</td>
            <td>Oui</td>
            <td>Contrat de travail local</td>
          </tr>
          <tr>
            <td>Dirigeant nommé (administrador)</td>
            <td>Oui</td>
            <td>Société espagnole opérationnelle</td>
          </tr>
          <tr>
            <td>Travailleur détaché (groupe)</td>
            <td>Oui</td>
            <td>Lettre de mission formalisée</td>
          </tr>
          <tr>
            <td>Digital nomad (freelance)</td>
            <td>Oui (depuis 2023)</td>
            <td>Visa Digital Nomad + clients étrangers &gt;80 %</td>
          </tr>
        </tbody>
      </ProseTable>

      {/* ─── 4. Profils exclus ────────────────────────────────────────────── */}
      <h2 id="profils-exclus">4. Profils exclus</h2>

      <p>
        Certains profils, malgré leur installation en Espagne, ne peuvent pas accéder au
        régime Beckham. Il est essentiel de vérifier ces exclusions avant d&apos;engager toute
        démarche.
      </p>

      <h3>Travailleurs indépendants sans entité espagnole (hors visa Digital Nomad)</h3>

      <p>
        Un freelance qui s&apos;installe en Espagne pour travailler à son compte, sans obtenir
        le visa Digital Nomad, ne peut pas accéder au régime. La simple inscription au
        régime d&apos;<em>autónomo</em> (équivalent espagnol du statut d&apos;auto-entrepreneur)
        ne suffit pas : il faut soit un contrat de travail avec une entité espagnole,
        soit le visa spécifique créé par la Ley de Startups.
      </p>

      <h3>Personnes ayant déjà bénéficié du régime Beckham</h3>

      <p>
        Le régime ne peut être utilisé qu&apos;une seule fois par personne et par séjour en
        Espagne. Si vous avez déjà bénéficié du régime lors d&apos;un précédent séjour en
        Espagne, vous ne pouvez pas le demander à nouveau lors d&apos;un retour ultérieur.
      </p>

      <h3>Résidents fiscaux espagnols récents</h3>

      <p>
        Comme mentionné, toute personne ayant été résident fiscal en Espagne au cours de
        l&apos;une des cinq années civiles précédant le transfert est exclue. Cette condition
        est parfois sous-estimée par les personnes qui ont vécu brièvement en Espagne dans
        le passé ou qui y ont maintenu un domicile secondaire.
      </p>

      <h3>Dirigeants de sociétés patrimoniales</h3>

      <p>
        La loi exclut expressément les administrateurs de <em>sociedades patrimoniales</em>
        (sociétés dont l&apos;actif est principalement composé de valeurs mobilières ou
        immobilières non affectées à une activité économique). Une holding purement
        financière ne permet donc pas d&apos;accéder au régime par la voie de la nomination
        comme dirigeant.
      </p>

      <Callout type="info" title="Le cas du dirigeant de société française">
        Un dirigeant rémunéré uniquement par sa société française (SARL, SAS) ne remplit
        pas la condition de contrat espagnol ou de nomination dans une entité espagnole.
        Pour accéder au régime, il lui faut soit créer une entité espagnole et y être
        nommé, soit conclure un contrat de travail avec une société espagnole existante.
      </Callout>

      {/* ─── 5. Délai et procédure ────────────────────────────────────────── */}
      <h2 id="delai-demande">5. Délai et procédure</h2>

      <p>
        La demande d&apos;application du régime Beckham est formalisée via le{' '}
        <strong>formulaire 149</strong>, à déposer auprès de l&apos;Agencia Tributaria (AEAT).
        Ce formulaire doit impérativement être soumis dans les <strong>6 mois suivant
        l&apos;embauche</strong> ou, pour les digital nomads, suivant l&apos;entrée en Espagne.
      </p>

      <Callout type="warning" title="Délai impératif : 6 mois">
        Le formulaire 149 doit être déposé dans les 6 mois. Une seule journée de retard
        vous fait perdre le régime pour toute la durée du séjour. L&apos;AEAT n&apos;accorde aucune
        prorogation et ne reconnaît aucune cause de force majeure hors circonstances
        exceptionnelles très strictement définies.
      </Callout>

      <h3>Les étapes de la demande</h3>

      <ol>
        <li>
          <strong>Rassembler les documents justificatifs :</strong> contrat de travail
          espagnol, NIE (Número de Identificación de Extranjero), certificat de résidence
          fiscale antérieure dans le pays d&apos;origine, et tout document prouvant la nature
          professionnelle du transfert.
        </li>
        <li>
          <strong>Compléter le formulaire 149</strong> (disponible en ligne sur le portail
          de l&apos;AEAT) en indiquant la date d&apos;embauche, le début d&apos;activité en Espagne et
          le motif du transfert.
        </li>
        <li>
          <strong>Déposer le formulaire</strong> dans les 6 mois suivant la date
          d&apos;embauche, soit en ligne via le portail de l&apos;AEAT (avec certificat électronique
          ou Cl@ve PIN), soit en présentiel dans un bureau de l&apos;AEAT.
        </li>
        <li>
          <strong>Conserver l&apos;accusé de réception</strong> : l&apos;AEAT délivre une
          confirmation qui servira de justificatif auprès de l&apos;employeur pour appliquer
          la retenue à la source au taux de 24 % dès les premiers salaires.
        </li>
      </ol>

      <p>
        Une fois le régime accordé, il s&apos;applique automatiquement pour les 6 années
        suivantes — y compris l&apos;année d&apos;arrivée, qui compte comme première année complète.
        Le contribuable déclare ses revenus chaque année via le{' '}
        <strong>formulaire 151</strong> (et non le formulaire standard 100 de l&apos;IRPF).
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Étape</th>
            <th>Formulaire</th>
            <th>Délai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Demande d&apos;option pour le régime</td>
            <td>Formulaire 149</td>
            <td>Dans les 6 mois suivant l&apos;embauche</td>
          </tr>
          <tr>
            <td>Déclaration annuelle de revenus</td>
            <td>Formulaire 151</td>
            <td>Avril–juin de l&apos;année N+1</td>
          </tr>
          <tr>
            <td>Renonciation au régime (optionnel)</td>
            <td>Formulaire 149 (renonciation)</td>
            <td>Avant le 31 mars de l&apos;année concernée</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="info">
        Pour aller plus loin sur le calcul de l&apos;économie d&apos;impôt réelle, consultez notre{' '}
        <Link href="/ressources/fiscalite/loi-beckham">
          guide complet de la loi Beckham
        </Link>{' '}
        qui détaille les simulations chiffrées par tranche de revenus.
      </Callout>

      {/* ─── 6. Test d'éligibilité ────────────────────────────────────────── */}
      <h2 id="quiz">6. Test d&apos;éligibilité</h2>

      <p>
        Parcourez ces 6 questions pour évaluer rapidement votre situation. Un « non » à
        l&apos;une des 4 premières questions indique une exclusion probable du régime.
      </p>

      <div
        style={{
          border: '1.5px solid #e2e8f0',
          borderRadius: '12px',
          padding: '1.5rem',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
        }}
      >
        <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>①</span>
            <div>
              <strong>N&apos;avez-vous pas été résident fiscal en Espagne au cours des 5 dernières années ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (condition remplie) &nbsp;&nbsp; ☐ Non (condition non remplie — exclusion probable)
              </div>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>②</span>
            <div>
              <strong>Déménagez-vous en Espagne pour une raison professionnelle (emploi, direction, détachement) ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (condition remplie) &nbsp;&nbsp; ☐ Non (condition non remplie — exclusion probable)
              </div>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>③</span>
            <div>
              <strong>Disposez-vous d&apos;un contrat de travail espagnol ou d&apos;une nomination comme dirigeant d&apos;une entité espagnole opérationnelle ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (condition remplie) &nbsp;&nbsp; ☐ Non (condition non remplie — exclusion probable)
              </div>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>④</span>
            <div>
              <strong>Vos revenus principaux seront-ils de source espagnole (activité exercée en Espagne) ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (condition remplie) &nbsp;&nbsp; ☐ Non (condition non remplie — exclusion probable)
              </div>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>⑤</span>
            <div>
              <strong>N&apos;avez-vous jamais bénéficié du régime Beckham lors d&apos;un précédent séjour en Espagne ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (jamais utilisé — compatible) &nbsp;&nbsp; ☐ Non (déjà utilisé — exclusion certaine)
              </div>
            </div>
          </li>
          <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, fontWeight: 700, color: '#6d4aff' }}>⑥</span>
            <div>
              <strong>Êtes-vous en mesure de déposer le formulaire 149 dans les 6 mois suivant votre prise de poste en Espagne ?</strong>
              <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#64748b' }}>
                ☐ Oui (procédure faisable) &nbsp;&nbsp; ☐ Non (délai dépassé — accès au régime impossible)
              </div>
            </div>
          </li>
        </ol>

        <div
          style={{
            marginTop: '1.25rem',
            padding: '1rem',
            background: '#f8f5ff',
            borderRadius: '8px',
            fontSize: '0.9rem',
            color: '#3d2b8e',
          }}
        >
          <strong>Résultat :</strong> Si vous avez répondu « Oui » aux 6 questions, votre
          profil est a priori compatible avec le régime Beckham. Un point vert ne garantit
          toutefois pas l&apos;acceptation : l&apos;AEAT peut demander des justificatifs complémentaires.
          Faites vérifier votre dossier par un fiscaliste avant le dépôt.
        </div>
      </div>

      <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          Votre profil semble éligible ? Ne ratez pas le délai de 6 mois.
        </h3>
        <p className="mb-5 text-slate-700">
          Iter Advisors accompagne les cadres et dirigeants qui s&apos;installent en Espagne dans
          la constitution et le dépôt de leur dossier Beckham — vérification des conditions,
          préparation des justificatifs, dépôt du formulaire 149 et suivi de la déclaration
          annuelle 151.
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Consultez notre{' '}
              <Link
                href="/ressources/fiscalite/loi-beckham"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                guide complet de la loi Beckham
              </Link>{' '}
              pour les simulations d&apos;économie d&apos;impôt selon votre rémunération.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Besoin d&apos;un accompagnement fiscal complet à Barcelone ou Madrid ? Découvrez
              notre offre de{' '}
              <Link
                href="/daf-externalise"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                DAF externalisé
              </Link>{' '}
              avec gestion fiscale espagnole intégrée.
            </span>
          </li>
        </ul>
      </div>
    </BlogPostPageRefonte>
  );
}
