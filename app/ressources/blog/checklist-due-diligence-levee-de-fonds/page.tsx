'use client';

import { Metadata } from 'next';
import { BlogPostPageRefonte } from '@/components/pages/BlogPostPageRefonte';
import { Callout, StatGrid, InlineCta } from '@/components/blog';

export const metadata: Metadata = {
  title: "Checklist due diligence levée de fonds | Iter Advisors",
  description: "Checklist complète pour préparer la due diligence financi de votre levée de fonds. Documentations, analyses, et préparation des investisseurs.",
  openGraph: {
    title: "Checklist due diligence levée de fonds | Iter Advisors",
    description: "Checklist complète pour préparer la due diligence financière de votre levée de fonds.",
    type: "article",
  },
};

export default function ChecklistDueDiligencePage() {
  return (
    <BlogPostPageRefonte
      locale="fr"
      breadcrumbs={{
        resourcesLabel: "Ressources",
        resourcesHref: "/ressources",
        blogLabel: "Blog",
        blogHref: "/ressources/blog",
      }}
      slug="checklist-due-diligence-levee-de-fonds"
      category="Levée de fonds"
      title="Checklist due diligence : préparation financière complète pour la levée de fonds"
      dek="Guide complet avec checklist détaillée pour préparer votre due diligence financière. Documents, analyses, et préparation avec nos experts."
      author={{
        name: "Iter Advisors",
        avatar: "/images/authors/iter.jpg",
        jobTitle: "Cabinet de DAF externalisé",
      }}
      readingTime={13}
      dateModified="2026-05-01"
      heroImage="/images/blog/due-diligence-checklist.webp"
      toc={[
        { id: "definition", label: "1. Qu'est-ce que la due diligence ?" },
        { id: "documents-financiers", label: "2. Documents financiers à préparer" },
        { id: "analyses-cles", label: "3. Analyses clés à avoir prêts" },
        { id: "dataroom", label: "4. Organisation dataroom" },
        { id: "timeline", label: "5. Timeline et plannification" },
        { id: "erreurs-eviter", label: "6. Erreurs à éviter" },
      ]}
      tldr="La due diligence financière est l'audit le plus critique d'une levée. Préparation : documents financiers (3 ans), cap table, contrats, prévisions, comptes de résultat. Dataroom bien organisée = gain 2-3 semaines. Erreurs à éviter : docs manquants, prévisions pas réalistes, antériorité comptable < 2 ans."
      relatedArticles={[
        {
          url: "/ressources/blog/cout-daf-externalise-tarifs-prix-2026",
          category: "Tarifs",
          title: "Combien coûte un DAF externalisé en 2026 ?",
        },
        {
          url: "/ressources/blog/daf-externalise-vs-daf-salarie",
          category: "DAF externalisé",
          title: "DAF externalisé vs DAF salarié : analyse complète",
        },
        {
          url: "/ressources/blog/flux-de-tresorerie",
          category: "Trésorerie",
          title: "Flux de trésorerie : définition et importance",
        },
      ]}
    >
      <h2 id="definition">1. Qu'est-ce que la due diligence ?</h2>
      <p>
        La due diligence est l'audit complet que les investisseurs (VCs, business angels, fonds) effectuent avant d'investir. Elle comprend plusieurs dimensions : financière, légale, technique, commerciale. Nous nous concentrons ici sur la financière, qui est souvent la plus chronophage.
      </p>
      <p>
        <strong>Objectifs de la DD financière :</strong>
      </p>
      <ul>
        <li>Vérifier que les chiffres reportés sont exacts et auditables</li>
        <li>Comprendre la structure des coûts et marges</li>
        <li>Évaluer la trésorerie et les besoins de financement</li>
        <li>Valider les prévisions et les hypothèses</li>
        <li>Identifier les risques financiers</li>
      </ul>

      <Callout type="warning" title="Attention">
        Si votre DD financière est mal préparée, l'investisseur va douter de votre sérieux. Cela peut couler une levée avant même de discuter des termes.
      </Callout>

      <h2 id="documents-financiers">2. Documents financiers à préparer</h2>
      <p>
        <strong>Documents obligatoires :</strong>
      </p>
      <ul>
        <li>☑️ <strong>Bilans</strong> : 3 dernières années (ou depuis fondation)</li>
        <li>☑️ <strong>Comptes de résultat</strong> : 3 dernières années, mensuel/trimestiel</li>
        <li>☑️ <strong>Tableaux de flux de trésorerie</strong> : 24 mois historique + 12 mois prévisions</li>
        <li>☑️ <strong>Cap table</strong> : Actions, options, ESOP, pourcentages</li>
        <li>☑️ <strong>Prévisions 3 ans</strong> : P&L, bilan, trésorerie (détaillé)</li>
        <li>☑️ <strong>Dossier d'imposition</strong> : Liasses fiscales, déclarations TVA</li>
      </ul>
      <p>
        <strong>Documents importants :</strong>
      </p>
      <ul>
        <li>📎 Audits / Certifications : Audit externe (si >€50M), Certifications ISO</li>
        <li>📎 Contrats clients clés : Top 20 clients (revenus récurrents ?)</li>
        <li>📎 Contrats fournisseurs : Dépendances critiques</li>
        <li>📎 Analyses de coûts : Détail des marges par business unit</li>
      </ul>

      <h2 id="analyses-cles">3. Analyses clés à avoir prêts</h2>
      <p>
        Au-delà des documents bruts, les investisseurs veulent des analyses qui montrent votre compréhension du business.
      </p>
      <p>
        <strong>Analyse 1 : Unit Economics</strong>
      </p>
      <ul>
        <li>Coût d'acquisition client (CAC) par canal</li>
        <li>Lifetime value (LTV)</li>
        <li>Ratio LTV/CAC (cible : >3)</li>
      </ul>
      <p>
        <strong>Analyse 2 : Runway et Burn</strong>
      </p>
      <ul>
        <li>Cash en banque</li>
        <li>Burn mensuel (dépenses opérationnelles)</li>
        <li>Runway = Mois avant épuisement cash</li>
        <li>Point de break-even (si applicable)</li>
      </ul>
      <p>
        <strong>Analyse 3 : Sensibilités / Scénarios</strong>
      </p>
      <ul>
        <li>Cas base : Croissance modérée, assomptions raisonnables</li>
        <li>Cas upside : +50 % CA, meilleure retention</li>
        <li>Cas downside : -20 % CA, retention réduite</li>
      </ul>

      <StatGrid items={[
        {
          label: "Documents à préparer",
          value: "12-15",
          sublabel: "Financiers + légaux",
        },
        {
          label: "Temps de préparation",
          value: "4-8 semaines",
          sublabel: "Si documents prêts",
        },
        {
          label: "Analyses clés",
          value: "3-5",
          sublabel: "Unit econ, runway, sensibilités",
        },
      ]} />

      <h2 id="dataroom">4. Organisation dataroom</h2>
      <p>
        Tout doit être stocké dans une dataroom virtuelle sécurisée (Dealroom, VDR, Citrix ShareFile).
      </p>
      <p>
        <strong>Structure de dossiers recommandée :</strong>
      </p>
      <ul>
        <li>📁 Financial Documents (bilans, P&L, prévisions)</li>
        <li>📁 Cap Table &amp; Equity (actions, options, dilution)</li>
        <li>📁 Tax &amp; Compliance (fiscalité, compliance, audits)</li>
        <li>📁 Contracts &amp; Legal (clients, fournisseurs, employés)</li>
        <li>📁 Due Diligence Summary (résumé exécutif, FAQs, réponses questions)</li>
      </ul>
      <p>
        <strong>Bonnes pratiques :</strong>
      </p>
      <ul>
        <li>Versioning clair (v1, v2, etc.)</li>
        <li>Documents PDF nom fichiers explicites</li>
        <li>Index avec descriptions (une page word pointant vers chaque doc)</li>
        <li>Accès granulaire par rôle (lead investor vs other angel)</li>
      </ul>

      <h2 id="timeline">5. Timeline et plannification</h2>
      <p>
        <strong>T-12 semaines : Préparation</strong>
      </p>
      <ul>
        <li>Audit comptable : vérifier que les chiffres sont justes</li>
        <li>Compilation documents : rassembler tout</li>
        <li>Rédaction prévisions : build prévisions 3 ans crédibles</li>
      </ul>
      <p>
        <strong>T-8 semaines : DD informelle</strong>
      </p>
      <ul>
        <li>Conversations seed avec business angels</li>
        <li>Feedback sur prévisions / assumptions</li>
      </ul>
      <p>
        <strong>T-4 semaines : Pitch + DataRoom</strong>
      </p>
      <ul>
        <li>Launch dataroom (accès restreint d'abord)</li>
        <li>Documents disponibles pour lead investor</li>
      </ul>
      <p>
        <strong>T-0 (DD sérieuse) : 2-4 semaines</strong>
      </p>
      <ul>
        <li>Investisseurs posent questions</li>
        <li>Audits complètes</li>
        <li>Term sheet + DD terminée = closing</li>
      </ul>

      <h2 id="erreurs-eviter">6. Erreurs à éviter</h2>
      <ul>
        <li>❌ Prévisions trop agressives (réduisez de 30-50 % vos hypothèses, soyez réaliste)</li>
        <li>❌ Documents incomplets (si factures manquent, préparez attentes clientes)</li>
        <li>❌ Comptabilité mal tenue (antériorité < 1 ans : problème majeur)</li>
        <li>❌ Secrets de bisness mélangés (dataroom sensible : documents NDA)</li>
        <li>❌ Pas de CFO/DAF pour répondre questions : avoir un expert dédié</li>
      </ul>

      <InlineCta
        title="Vous préparez une levée et besoin d'aide pour la DD financière ?"
        body="Nos experts DAF accompagnent founders à préparer et structurer leur due diligence. Audit, prévisions, dataroom, réponses aux questions VCs. Support 100 % aligné sur votre levée."
        ctaLabel="Aide levée de fonds (consultation)"
        ctaHref="/contact?type=levee-de-fonds"
      />

      <h2>Conclusion</h2>
      <p>
        Une DD bien préparée accélère votre levée de 2-4 semaines et augmente la confiance des investisseurs. Elle montre que vous prenez votre finance au sérieux.
      </p>
      <p>
        Chez Iter Advisors, nous avons accompagné 200+ founders à travers des levées. Nous savons exactement ce que les VCs veulent voir et comment le présenter. Si vous levez, faites-nous un call.
      </p>
    </BlogPostPageRefonte>
  );
}
