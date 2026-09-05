# Archives non publiées — 5 septembre 2026

Ces fichiers sont conservés pour l’historique, hors des sources utilisées par le site.

- `content/` : 52 fichiers MDX sans lecteur dans les routes de l’application.
- `mdx-loader.ts.txt` : ancien lecteur MDX sans aucun appelant.
- `strapi.ts.txt` : ancien client réseau ; remplacé par `lib/static-content.ts`.
- `fallback-blog.ts.txt` : ancien catalogue de secours ; les listes utilisent désormais `lib/content/blog-posts.ts`.
- `shadowed-blog-bodies.json` : 17 corps de texte du catalogue masqués par une route dédiée. La route conserve le contenu publié ; le catalogue conserve ses métadonnées et une estimation de lecture.
- La sauvegarde du service et la feuille CSS jamais importée sont archivées également.

Ne pas modifier ces archives pour changer le site. Modifier la route dédiée lorsqu’elle existe ; sinon modifier le contenu local chargé par la route dynamique. Les scripts manuels d’export/seed CMS restent disponibles pour la récupération historique, sans import dans le site. `STRAPI_ENABLED` n’active plus de CMS dans l’application.
