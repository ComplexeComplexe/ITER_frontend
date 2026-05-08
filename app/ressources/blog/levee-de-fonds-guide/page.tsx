import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/strapi";
import { Callout, StatGrid, ProseTable, InlineCTA } from "@/components/blog";

export const metadata: Metadata = {
  title: "Guide Levée Fonds | Iter Advisors",
  description:
    "Guide complet levée de fonds. Préparation comptable, due diligence, documentation, valorisation. Iter Advisors a assisté startups à lever +100M€.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        url: "/images/blog/levee-de-fonds.webp",
        alt: "Levée de fonds : préparation financière et juridique 2026",
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
      slug="levee-de-fonds-guide"
      category="Financement"
      title="Levée de fonds : préparation financière et juridique 2026"
      dek="Comment préparer votre levée de fonds ? Due diligence financière, documentations requises, valorisation. Guide avec checklist."
      author={{
        name: "Iter Advisors",
        avatar: "/images/authors/iter-advisors.jpg",
        jobTitle: "Cabinet de DAF externalisé et CFO à temps partagé",
      }}
      readingTime={10}
      dateModified="2026-05-01T00:00:00Z"
      heroImage="/images/blog/levee-de-fonds.webp"
      toc={[
        { id: "pourquoi", label: "1. Pourquoi bien préparer sa levée ?" },
        { id: "timeline", label: "2. Timeline et étapes clés" },
        { id: "preparation", label: "3. Préparation financière" },
        { id: "due-diligence", label: "4. La due diligence financière" },
        { id: "checklist", label: "5. Checklist complète" },
      ]}
      tldr={
        <>
          <p>
            <strong>Levée de fonds bien préparée = succès 90% plus probable.</strong> Les
            investisseurs jugent d'abord sur finances : croissance, rentabilité,
            trésorerie.
          </p>
          <p>
            <strong>Préparation minimale :</strong> 3-6 mois avant pitch. Budget,
            comptabilité à jour, due diligence décou verte, cap table propre.
          </p>
          <p>
            <strong>ROI de la préparation :</strong> Meilleure valorisation (+ 15-30%),
            levée plus rapide (2-4 mois au lieu de 6-12).
          </p>
        </>
      }
      relatedArticles={[
        {
          url: "/ressources/blog/daf-externalise-guide",
          category: "DAF externalisé",
          title: "DAF externalisé : guide complet et cas clients",
        },
        {
          url: "/ressources/blog/regimes-fiscaux-france-vs-espagne",
          category: "Fiscalité",
          title: "Régimes fiscaux France vs Espagne : optimisation",
        },
      ]}
      metaDescription="Levée de fonds : préparation financière et juridique. Due diligence, checklist, valorisation. Iter Advisors a aidé startups à lever 100M€+."
    >
      <h2 id="pourquoi">1. Pourquoi bien préparer sa levée ?</h2>

      <p>
        Une levée de fonds bien préparée multiplie vos chances de succès. Les données
        montrent que :
      </p>

      <StatGrid
        items={[
          {
            label: "Startups bien préparées",
            value: "90%",
            sublabel: "succès de levée (vs 40% pour mal préparées)",
          },
          {
            label: "Amélioration valorisation",
            value: "+25%",
            sublabel: "en moyenne pour financiers propres",
          },
          {
            label: "Réduction durée levée",
            value: "-60%",
            sublabel: "due diligence rapide = closing rapide",
          },
        ]}
        columns={3}
      />

      <Callout type="info" title="Réalité des investisseurs">
        Les investisseurs consacrent 30% du temps de due diligence sur finances, 20%
        sur juridique, 50% sur marché/équipe/traction. Négliger les finances = risque
        immédiat.
      </Callout>

      <p>
        Une bonne préparation signale aussi votre maturité. Les investisseurs aiment les
        founders qui comprennent leurs finances, pilotent le cash, projettent
        intelligemment.
      </p>

      <h2 id="timeline">2. Timeline et étapes clés</h2>

      <p>
        Une levée se prépare sur 6-12 mois. Voici le calendrier recommandé :
      </p>

      <h3>T-6 mois : Discovery et diagnostic</h3>

      <ul>
        <li>Audit financier interne : historique 2-3 ans, identifier holes</li>
        <li>Audit juridique : statuts, cap table, contrats salariés/fournisseurs</li>
        <li>Audit fiscal : structures, expositions, crédits d'impôt</li>
        <li>Construction du data room (centralisé et versionnée)</li>
      </ul>

      <h3>T-4 mois : Nettoyage</h3>

      <ul>
        <li>Corriger cap table (actions de complaisance, BSPCE non documentés)</li>
        <li>Mettre à jour statuts et registre d'actionnaires</li>
        <li>Signer les documents manquants (contrats d'emploi, NDA)</li>
        <li>Clôturer comptes N-2, N-1 complètement</li>
      </ul>

      <h3>T-3 mois : Préparation financière</h3>

      <ul>
        <li>Projections financières 3-5 ans (revenue, EBITDA, burn rate)</li>
        <li>Modèle de valorisation DCF (discounted cash flow)</li>
        <li>Budget d'utilisation des fonds (use of proceeds)</li>
        <li>Pitch deck financier (10-15 slides avec métriques)</li>
      </ul>

      <h3>T-2 mois : Outreach & pitch</h3>

      <ul>
        <li>Lister 30-50 investisseurs cibles (VCs, BA, corporate, family offices)</li>
        <li>Pitch meetings (format 20-30 min, deck + démo)</li>
        <li>Term sheet négociation (premiers intéressés)</li>
      </ul>

      <h3>T-1 mois : Due diligence</h3>

      <ul>
        <li>
          Répondre questions financières détaillées (cohort analysis, unit economics,
          CAC/LTV)
        </li>
        <li>Accès data room aux avocats/auditeurs de l'investisseur</li>
        <li>Appels référence clients, partenaires, clients</li>
      </ul>

      <h3>T-0 : Closing</h3>

      <ul>
        <li>Signature documents légaux et financiers</li>
        <li>Virement des fonds</li>
        <li>Enregistrement cap table + governance</li>
      </ul>

      <ProseTable>
        <thead>
          <tr>
            <th>Phase</th>
            <th>Durée</th>
            <th>Acteurs clés</th>
            <th>Livrables</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Discovery</td>
            <td>6-8 sem</td>
            <td>CFO, avocat, auditeur</td>
            <td>Audit complet, diagnostique</td>
          </tr>
          <tr>
            <td>Nettoyage</td>
            <td>4-6 sem</td>
            <td>CFO, généraliste</td>
            <td>Cap table clean, docs signés</td>
          </tr>
          <tr>
            <td>Préparation</td>
            <td>4-8 sem</td>
            <td>CFO, founder</td>
            <td>Business plan, pitch deck, data room</td>
          </tr>
          <tr>
            <td>Outreach</td>
            <td>6-12 sem</td>
            <td>Founder, sponsor</td>
            <td>Term sheet</td>
          </tr>
          <tr>
            <td>Due diligence</td>
            <td>4-8 sem</td>
            <td>CFO, avocat, auditeur</td>
            <td>Reports financiers/légaux</td>
          </tr>
          <tr>
            <td>Closing</td>
            <td>2-4 sem</td>
            <td>Avocat, CFO</td>
            <td>Financement reçu</td>
          </tr>
        </tbody>
      </ProseTable>

      <h2 id="preparation">3. Préparation financière</h2>

      <p>
        La préparation financière est le fondement. Elle couvre 4 piliers :
      </p>

      <h3>Pilier 1 : Historique financier solide</h3>

      <p>
        Les investisseurs veulent voir une comptabilité propre sur 2-3 ans minimum.
        Cela signifie :
      </p>

      <ul>
        <li>Comptes annuels certifiés (non certifiés = red flag)</li>
        <li>Compte de résultat détaillé (par produit, par canal d'acquisition)</li>
        <li>Bilan consolidant tous les actifs/passifs</li>
        <li>Cash flow statement (SG&A vs dépenses croissance)</li>
      </ul>

      <Callout type="warning" title="Erreur courante">
        Beaucoup de startups ont comptabilité non à jour ou incohérente (décalage
        factures/encaissements). Prévoir 2-3 mois pour régulariser.
      </Callout>

      <h3>Pilier 2 : Métriques et KPIs</h3>

      <p>
        Les investisseurs veulent des SaaS-like metrics même pour non-SaaS :
      </p>

      <ul>
        <li>
          <strong>SaaS :</strong> MRR, ARR, churn, LTV, CAC, payback period
        </li>
        <li>
          <strong>E-commerce :</strong> AOV, CAC, LTV, repeat rate, gross margin
        </li>
        <li>
          <strong>Marketplace :</strong> GMV, take rate, seller NPS, liquidity
        </li>
      </ul>

      <p>
        Ces métriques doivent être en croissance stable (trajectoire prévisible).
      </p>

      <h3>Pilier 3 : Projections crédibles</h3>

      <p>
        Les projections 3-5 ans doivent être :
      </p>

      <ul>
        <li>
          <strong>Détaillées :</strong> Par ligne (revenue, COGS, SG&A, opex, capex)
        </li>
        <li>
          <strong>Conservatrices :</strong> Ne pas projeter 200% croissance sans traction
        </li>
        <li>
          <strong>Sensibles :</strong> Scénarios base/bull/bear avec hypothèses claires
        </li>
        <li>
          <strong>Justifiées :</strong> Benchmarks industrie, études marché, retours
          clients
        </li>
      </ul>

      <p>
        Exemple : "Hypothèse CAC $500, LTV $5k, payback 2 mois = croissance 120%/an"
        (cohérent). vs "Projection 500% croissance" (non crédible).
      </p>

      <h3>Pilier 4 : Budget use of proceeds</h3>

      <p>
        Les investisseurs exigent un budget détaillé d'utilisation des fonds. Exemple
        pour levée €2M :
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Poste</th>
            <th>%</th>
            <th>Montant</th>
            <th>Justification</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Équipe (2 eng + 1 product)</td>
            <td>50%</td>
            <td>€1,000k</td>
            <td>Salaires + charges 18 mois</td>
          </tr>
          <tr>
            <td>Marketing & acquisition</td>
            <td>20%</td>
            <td>€400k</td>
            <td>CAC payback strategy</td>
          </tr>
          <tr>
            <td>Infrastructure & ops</td>
            <td>15%</td>
            <td>€300k</td>
            <td>Cloud, outils, support</td>
          </tr>
          <tr>
            <td>Working capital</td>
            <td>10%</td>
            <td>€200k</td>
            <td>Buffer trésorerie 3 mois</td>
          </tr>
          <tr>
            <td>Réserve</td>
            <td>5%</td>
            <td>€100k</td>
            <td>Flexibilité</td>
          </tr>
        </tbody>
      </ProseTable>

      <h2 id="due-diligence">4. La due diligence financière</h2>

      <p>
        La due diligence est le processus par lequel l'investisseur audite votre
        entreprise. Financièrement, cela inclut :
      </p>

      <h3>Phase 1 : Desk review (2 sem)</h3>

      <p>
        L'investisseur examine documents sans rencontres. Il vérifie :
      </p>

      <ul>
        <li>Comptes annuels, bilans, P&L</li>
        <li>Contrats clés (clients, fournisseurs, partenariats)</li>
        <li>Cap table et structure actionnariale</li>
        <li>Brevets, propriété intellectuelle, licences</li>
      </ul>

      <h3>Phase 2 : Management meetings (3-4 sem)</h3>

      <p>
        L'investisseur rencontre équipe et demande clarifications. Questions typiques :
      </p>

      <ul>
        <li>"Pourquoi churn a augmenté T2?" (analyse par cohorte)</li>
        <li>"Quels sont les clients &gt;10% de revenue?" (concentration risk)</li>
        <li>"Burn rate ? Runway ?" (projections de trésorerie)</li>
        <li>"Unit economics par segment ?" (profitabilité granulaire)</li>
      </ul>

      <h3>Phase 3 : Audit externe (4-6 sem)</h3>

      <p>
        L'investisseur fait auditer par cabinet indépendant :
      </p>

      <ul>
        <li>
          <strong>Audit financier :</strong> Vérification comptes (validité chiffres,
          provisions, conformité IFRS)
        </li>
        <li>
          <strong>Audit légal :</strong> Structure, litigations, conformité (AVA, data,
          employeurs)
        </li>
        <li>
          <strong>Audit fiscal :</strong> Exposition fiscale, crédits d'impôt,
          restructuration
        </li>
      </ul>

      <InlineCTA
        title="Due diligence financière intimidée ?"
        body="Nos CFOs externalisés préparent vos équipes, organisent data room, répondent questions investisseurs."
        ctaLabel="Assistance levée de fonds"
        ctaHref="/contact"
      />

      <h2 id="checklist">5. Checklist complète de préparation</h2>

      <h3>Comptabilité & Finance</h3>

      <ul>
        <li>☐ Comptes annuels N-1 et N-2 certifiés par expert-comptable</li>
        <li>☐ Comptes N-3 mois à jour (pas de décalage &gt; 1 mois)</li>
        <li>☐ Cash flow statement 24 mois avec forecast 36 mois</li>
        <li>☐ Détail revenue par produit/segment/canal sur 24 mois</li>
        <li>☐ Dashboard KPIs mis à jour (MRR, churn, CAC, LTV, burn rate)</li>
        <li>☐ Budget use of proceeds détaillé (12-36 mois)</li>
        <li>☐ Valorisation DCF avec hypothèses justifiées</li>
      </ul>

      <h3>Structure & Cap table</h3>

      <ul>
        <li>☐ Cap table Excel clean (actionnaires, nombre actions, %) à jour</li>
        <li>☐ Pas d'actions de complaisance (accordées sans trace)</li>
        <li>☐ BSPCE documentés et signés (stock-options plan)</li>
        <li>☐ Statuts à jour + enregistrement RCS</li>
        <li>☐ Procès-verbaux assemblées/conseil 2 ans</li>
        <li>☐ Pas de conflits d'intérêt non déclarés</li>
      </ul>

      <h3>Contrats & Juridique</h3>

      <ul>
        <li>☐ Contrats employés (CDI, non-concurrence, clauses IP)</li>
        <li>☐ Contrats clients majeurs (top 10 clients &gt;= 80% revenue?)</li>
        <li>☐ Contrats fournisseurs critiques</li>
        <li>☐ NDAs et contrats confidentialité</li>
        <li>☐ Accord partenariats stratégiques (si relevant)</li>
        <li>☐ Pas de litigations en cours (certification d'avocat)</li>
      </ul>

      <h3>Fiscalité & Conformité</h3>

      <ul>
        <li>☐ Certifications fiscales N-2, N-1 et provisions</li>
        <li>☐ Crédits d'impôt identifiés (CIR, JEI si applicable)</li>
        <li>☐ Pas d'exposition URSSAF ou tax back (vérification)
</li>
        <li>☐ Structure optimisée pour impôts post-levée</li>
        <li>☐ RGPD/data privacy audit (si collecte données)</li>
      </ul>

      <h3>Propriété Intellectuelle</h3>

      <ul>
        <li>☐ Brevets/marques enregistrés (liste et statuts)</li>
        <li>☐ Code source déposé (escrow ou cabinet d'avocats)</li>
        <li>☐ Contrats de cession d'IP des salariés</li>
        <li>☐ Pas de dépendance à code tiers (licences open source vérifiées)</li>
      </ul>

      <h3>Data room</h3>

      <ul>
        <li>☐ Organisée par dossiers (Finance, Légal, Tech, Marché, Team)</li>
        <li>☐ Accessible 24/7 via plateforme sécurisée (Intralinks, Citrix, etc.)</li>
        <li>☐ Index/table des matières</li>
        <li>☐ Versions finales non-drafts seulement</li>
        <li>☐ NDA signé avant accès complet</li>
      </ul>

      <Callout type="success" title="Prochaines étapes">
        Une fois cette checklist validée, vous êtes prêt pour la levée. Durée totale
        préparation : 3-6 mois. ROI : meilleure valorisation + process plus rapide.
      </Callout>
    </BlogPostPageRefonte>
  );
}
