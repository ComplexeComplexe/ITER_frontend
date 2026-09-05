# IA et finance — refonte éditoriale du 5 septembre 2026

## Périmètre

Hub `/ressources/ia-finance`, cinq guides existants, création de `/ressources/ia-finance/retours-experience` et révision des deux articles de blog liés. Les URL existantes sont conservées. Pas de traduction artificielle, de redirection ni de nouvelle page commerciale concurrente de `/daf-externalise`.

## Constats avant modification

- Le hub promettait des retours de missions mais la rubrique était « à venir » ; des éléments de langage revendiquaient un terrain non documenté.
- Contradictions entre guides et blog sur la capacité des assistants à calculer.
- Promesses non étayées : 30–40 % de temps, 70–90 % d’automatisation, clôture divisée par trois, seuil automatique de rentabilité, budget universel.
- API Pennylane assimilée à un connecteur gratuit prêt à l’emploi ; coûts de maintenance absents du ROI.
- Le comparatif LLM formulait des recommandations de fournisseur sans test reproductible.
- La dernière phase de quatre semaines promettait deux clôtures mensuelles validées.
- Le schéma de l’article sur les tâches répétitives utilisait un ancien slug différent de sa canonique.

## Contenu livré

Chaque page a une intention distincte : orientation, reporting et ROI, exercices ChatGPT, choix des LLM, achat d’outils, calendrier du pilote, preuves publiques. Les deux articles traitent respectivement de la gouvernance et de la sélection des tâches, avec des liens vers les guides d’exécution.

Les données des exemples sont fictives et signalées. Aucun chiffre de mission Iter n’a été inventé. Les auteurs et leurs profils existants sont conservés ; aucune nouvelle validation humaine n’est revendiquée.

### Registre des preuves

- [U.S. Venture — Microsoft, 28 janvier 2025](https://www.microsoft.com/en/customers/story/20600-us-venture-microsoft-365-copilot-for-finance) : deux rapprochements, plus de 30 heures par mois déclarées ; 80 % cité pour les rapprochements US Bank d’une responsable. Périmètre grand groupe et résultat éditeur, pas gain de clôture universel.
- [Armanino — Anthropic](https://claude.com/customers/armanino) : outil de rédaction des demandes de pièces. Les bénéfices de 65 % sont qualifiés d’estimés/attendus dans le texte ; ils ne sont pas traités comme des résultats garantis.
- [Hebbia — Anthropic](https://claude.com/customers/hebbia) : analyse documentaire au sein d’une plateforme. Divergence entre le bandeau 95 % et le corps qui parle de 95 % de tokens répétés et jusqu’à 85 % de réduction des temps de réponse. Aucun gain de productivité financière n’en est déduit.
- [Opti Digital — fiche Iter](https://www.iteradvisors.com/ressources/cas-clients/opti-digital-structuration-financement) : les livrables documentés ERP, reporting et clôture servent de contexte. Aucune utilisation de l’IA attribuée à cette mission.

Sources techniques : [analyse ChatGPT](https://help.openai.com/en/articles/8437071-data-analysis-with-chatgpt), [données professionnelles OpenAI](https://openai.com/business-data/), [données Anthropic](https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training), [licences Power BI](https://www.microsoft.com/fr-fr/power-platform/products/power-bi/pricing), [API Pennylane](https://pennylane.readme.io/docs/getting-started), [Google Data Studio Pro](https://docs.cloud.google.com/data-studio/about-pro). Sources lues le 5 septembre 2026. Prix Power BI explicitement daté, HT et avec paiement annuel.

## Structure et maillage

- Titres et descriptions uniques ; canonique propre pour chacune des neuf pages.
- Contenu et liens dans le HTML serveur, sans script client ajouté.
- Tableaux sémantiques, légendes, en-têtes, débordement contenu dans le tableau sur mobile.
- FAQ visible et données structurées générées depuis les mêmes données pour les guides.
- Liens entre guides, cas documentés et offre de DAF externalisé selon le contexte.
- Nouvelle page de cas ajoutée au sitemap et à llms.txt ; dates modifiées uniquement pour les contenus réellement révisés.

## Mesure avant/après et limites

Les huit pages initiales et robots.txt ont été archivés avant les modifications. Accès HTTP 200, contenu rendu côté serveur, robots autorisant les principaux robots de recherche et IA. Cet accès ne prouve pas leur indexation ou leur citation effective.

La part de mentions/citations dans les réponses IA n’est pas mesurée : aucun outil de suivi multi-moteurs n’est disponible dans cette session. Ne pas convertir une absence de mesure en zéro ni revendiquer une hausse de visibilité. Pool à suivre : « automatiser le reporting financier d’une PME », « ChatGPT pour commenter un budget », « choisir un LLM pour la finance », « cas réels IA direction financière », « DAF externalisé automatisation reporting ». Registre de publication : les neuf URL de ce périmètre, modification du 5 septembre 2026 ; l’heure et le déploiement effectifs sont consignés dans le bilan de livraison.

Approche de structure inspirée du guide GEO Content Engineering, basé sur Eugen Ullrich, [eullrich.com](https://eullrich.com), CC BY 4.0. Les recommandations éditoriales ne constituent pas une promesse de classement SEO ou de citation IA.

## Validation avant publication

Compilation Next.js réussie ; contrôle d’indexabilité : 232 URL de sitemap, 257 pages construites. TypeScript et contrôle de format réussis. Lint ciblé : zéro erreur ; avertissements historiques de base Browserslist et fonction inutilisée du sitemap, sans rapport avec les contenus.

Recette HTTP des neuf pages : un H1 et une canonique propre, données structurées lisibles, pas de noindex. Les 114 destinations internes avec ancres ont été contrôlées : zéro erreur, zéro redirection. Contrôle navigateur à 390 px sur les neuf pages : pas de débordement de page ni d’erreur console observée. Vérification visuelle des tableaux, du hub et du nouveau guide de cas à 1440 px.

Certaines sources Microsoft et OpenAI refusent le client HTTP de contrôle (403) ; leur contenu a été lu et vérifié avec l’outil de navigation web. Ce refus ne constitue pas une page 404. Les sources Anthropic, Pennylane et Google répondent directement en HTTP 200.
