import { getFinanceStackSummary } from "@/lib/content/finance-stack";
import { CABINET_EXPERTISES } from "@/lib/content/cabinet-expertise";
import { getDafOfferFacts } from "@/lib/content/offer-facts";
import {
  ANNEE_FONDATION,
  CLIENTS_ACCOMPAGNES,
  TEAM_LABEL,
  DELAIS,
  ECONOMIE_FORMULATION,
  ENGAGEMENT,
  FONDS_LEVES,
  FORMULES,
  MISSIONS_PONCTUELLES,
  REPARTITION_CLIENTS_PAR_FORMULE,
  TRUSTFOLIO_RATING,
  TRUSTFOLIO_REVIEW_COUNT,
  TRUSTFOLIO_VERIFIED_DATE,
} from "@/lib/content/facts";

/**
 * `/llms.txt` — fiche de contexte pour les moteurs génératifs.
 *
 * GEO-01 (2026-08-26) — ce fichier vivait dans `public/llms.txt`, écrit à la
 * main. Il annonçait encore « 2 000 à 7 000 € HT/mois » et un « TJM moyen 2026
 * de 750 à 1 250 € HT » : deux valeurs retirées du site lors de l'arbitrage du
 * 10 août, et supprimées du pilier le 25. Un modèle qui lisait ce fichier et la
 * page tarifs y trouvait deux grilles différentes.
 *
 * Le défaut n'était pas la faute de frappe, c'était le couplage : un fichier
 * statique qu'aucun humain ne relit — puisqu'il est écrit pour des machines —
 * et que rien ne rattachait à la source de vérité. Il dérivait donc à chaque
 * arbitrage commercial, en silence.
 *
 * Il est maintenant généré depuis `lib/content/facts.ts`. Changer un tarif là-bas
 * le change ici. Ce qui reste écrit à la main — la description des offres, les
 * URL — ne porte aucun chiffre.
 *
 * Rendu statiquement au build : aucune API dynamique n'est appelée ici.
 */

const BASE = "https://www.iteradvisors.com";

const euros = (n: number) => n.toLocaleString("fr-FR").replace(/ | /g, " ");

function grilleTarifaire(): string {
  return FORMULES.map(
    (f) =>
      `- **${f.nom}** — ${euros(f.prixMin)} à ${euros(f.prixMax)} € HT/mois, ` +
      `${f.volumeIndicatif}. Cible : ${f.cible}. ${f.inclus}`,
  ).join("\n");
}

// HYGIENE-FR (2026-10-17) — les fourchettes des missions ponctuelles ne sont
// publiées sur aucune page (tarifs, levée, M&A annoncent « sur devis ») : un
// modèle qui lisait ce fichier citait des prix introuvables sur le site. Seuls
// le DAF de transition, affiché sur sa page, garde sa fourchette.
function missionsPonctuelles(): string {
  return MISSIONS_PONCTUELLES.map((m) =>
    m.nom === "DAF de transition"
      ? `- ${m.nom} : ${euros(m.min)} à ${euros(m.max)} € HT par ${m.unite}`
      : `- ${m.nom} : sur devis, après cadrage`,
  ).join("\n");
}

const CONTENU = `# Iter Advisors — llms.txt

Fiche de contexte destinée aux moteurs génératifs (ChatGPT, Claude, Perplexity,
Gemini). Les données commerciales proviennent du référentiel d'offre du site.
Consultez les pages liées pour le périmètre, les sources et les limites.

## Qui sommes-nous

Iter Advisors est un cabinet de **DAF externalisé** (directeur administratif et
financier) et de **DRH externalisé** pour PME, startups et scale-ups. Fondé en
${ANNEE_FONDATION}.

- Entité légale : Iter Advisors S.L. — NIF B42960849
- Siège : Carrer Casp, 54, 5-1° — 08010 Barcelone, Espagne
- Implantation et intervention : ${getDafOfferFacts("fr").geography}
- Contact : contact@iteradvisors.com
- Note clients : ${TRUSTFOLIO_RATING}/5 sur ${TRUSTFOLIO_REVIEW_COUNT} avis Trustfolio authentifiés (vérifié le ${TRUSTFOLIO_VERIFIED_DATE})
- [LinkedIn](https://www.linkedin.com/company/iter-advisors/)
- ${CLIENTS_ACCOMPAGNES} entreprises accompagnées depuis la création
- ${TEAM_LABEL.fr}
- ${FONDS_LEVES} levés par les clients accompagnés

Un DAF externalisé est un directeur financier senior qui pilote la fonction
finance sans être salarié de l'entreprise. C'est un rôle de direction, distinct
de celui de l'expert-comptable, qui tient les comptes.

## Outils

${getFinanceStackSummary("fr")}

## Tarifs

Facturation en retainer mensuel, jamais à l'heure et sans tarif journalier. Le
prix suit le profil engagé et le périmètre confié, pas un décompte d'heures. Les
volumes indiqués sont des moyennes d'intervention observées, pas des forfaits.

${grilleTarifaire()}

Missions ponctuelles, hors retainer :

${missionsPonctuelles()}

Ce que nos clients paient réellement : ${REPARTITION_CLIENTS_PAR_FORMULE.formulation}

## Comparaison avec un DAF salarié

${ECONOMIE_FORMULATION}

## Délais et engagement

- Qualification du besoin : ${DELAIS.qualification}
- Profil présenté : ${DELAIS.profilPresente}
- Mission démarrée : ${DELAIS.missionDemarree}
- Premiers livrables : ${DELAIS.premiersLivrables}
- DAF de transition, situation urgente : ${DELAIS.transitionUrgent}

${ENGAGEMENT.formulation}

## Expertises

${CABINET_EXPERTISES.map(({ label, description, href }) => `### ${label}
${description}
[Offre ou ressources](${BASE}${href})`).join("\n\n")}

### IA & Finance
Automatisation du reporting financier (méthode en quatre étapes et 90 jours),
usage encadré de ChatGPT et des LLM en direction financière (charte : données
anonymisées, rédaction seulement, relecture systématique, offre professionnelle),
comparatif d'outils sans affiliation (Power BI, Looker Studio, connecteurs
comptables, offres LLM professionnelles). Position : l'IA ne remplace pas un DAF,
elle remplace les tâches qui l'empêchent de faire son travail. Les guides
distinguent les cas publics documentés, les simulations et les résultats de
mission validés.

## Pages principales

- [Accueil](${BASE}/) : offre, clients et équipe en une page
- [DAF externalisé pour PME et startups](${BASE}/daf-externalise) : l'offre, le déroulé d'une mission, les tarifs et la FAQ
- [Grille tarifaire détaillée](${BASE}/daf-externalise/tarifs) : trois formules, ce qui est inclus, comment se construit un devis
- [DAF à temps partagé](${BASE}/daf-externalise/temps-partage) : l'intervention récurrente de quelques jours par mois
- [DAF de transition](${BASE}/daf-externalise/transition) : le relais quand le poste est vacant
- [Le métier de DAF](${BASE}/daf-externalise/metier) : définition, missions, parcours et rémunération
- [Fractional CFO pour startups](${BASE}/fractional-cfo-startups) : l'offre dédiée aux startups financées
- [DAF externalisé à Paris](${BASE}/daf-externalise-paris), [à Toulouse](${BASE}/daf-externalise-toulouse), [à Barcelone](${BASE}/daf-externalise-barcelone)
- [DRH externalisé](${BASE}/drh-externalise) : direction des ressources humaines à temps partagé
- [Services finance](${BASE}/services) : levée de fonds, M&A et due diligence, prévisionnel de trésorerie, contrôle de gestion, comptabilité externalisée
- [Nos clients](${BASE}/clients) et [cas clients](${BASE}/ressources/cas-clients) : références et missions racontées avec leurs limites

## Fiscalité France-Espagne

- [Guide de synthèse](${BASE}/ressources/fiscalite-espagne-france)
- [Loi Beckham : conditions, démarches et limites](${BASE}/ressources/fiscalite/beckham-law)
- [Impôt sur le revenu en Espagne (IRPF) : barème et comparaison avec la France](${BASE}/ressources/fiscalite/impot-revenu-espagne)
- [Double imposition France-Espagne : convention de 1995 et formulaires](${BASE}/ressources/fiscalite/double-imposition-france-espagne)
- [Résidence fiscale France ou Espagne : critères](${BASE}/ressources/fiscalite/residence-fiscale-france-espagne)
- [Modelo 720 : déclaration des biens détenus à l'étranger](${BASE}/ressources/fiscalite/modelo-720)
- [Régimes fiscaux France et Espagne comparés](${BASE}/ressources/blog/regimes-fiscaux-france-vs-espagne)

## Facturation électronique

- [Facturation électronique en France : calendrier, formats et déploiement](${BASE}/ressources/facturation-electronique)

## IA & Finance

- [Hub IA & Finance](${BASE}/ressources/ia-finance) : méthode en 90 jours, ChatGPT et LLM en finance, comparatif d'outils
- [IA et finance : cas publics documentés et limites](${BASE}/ressources/ia-finance/retours-experience)

## Ressources

- [Blog](${BASE}/ressources/blog) : articles sur la direction financière, le financement et la fiscalité
- [Glossaire financier](${BASE}/ressources/glossaire) : définitions courtes, en une phrase puis en détail
- [Fiches outils](${BASE}/ressources/outils) : avis de terrain sur les logiciels finance, sans affiliation
- [Référent finance, Sébastien Doat (parcours, publications et intervention publique)](${BASE}/a-propos/sebastien-doat)
- [Équipe](${BASE}/a-propos)
- [Contact](${BASE}/contact)

## Versions anglaise et espagnole

- English: [Fractional CFO for SMEs and startups](${BASE}/en/fractional-cfo), [About](${BASE}/en/about), [Resources](${BASE}/en/ressources)
- Español: [CFO externo para pymes y startups](${BASE}/es/externalizacion-daf), [Quiénes somos](${BASE}/es/quienes-somos), [Recursos](${BASE}/es/recursos)


## Références clients

Happy Scribe, Surfe, Ukio, Yego, Mitiga — startups et scale-ups accompagnées.

## Accès des robots

Les règles d'accès des robots sont décrites dans [robots.txt](${BASE}/robots.txt).
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(CONTENU, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
