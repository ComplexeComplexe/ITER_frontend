import type { Locale } from "@/lib/i18n";

/** Short answers route to the guide that owns the detailed explanation. */
export const IA_HUB_QUESTIONS = {
  fr: [
    { question: "Comment l’IA peut-elle aider une équipe finance ?", answer: "Elle peut préparer des commentaires d’écarts, extraire des informations de documents ou aider à repérer des anomalies. Les connexions et règles de calcul restent distinctes de l’assistant ; le responsable financier vérifie les résultats avant leur utilisation.", slug: "automatiser-reporting-financier", link: "Examiner les tâches et les contrôles" },
    { question: "Par quoi commencer un projet IA en finance ?", answer: "Par une tâche limitée, mesurable et réversible. Définissez le temps passé et les erreurs avant le test, le contrôle humain attendu et les critères de validation. Un pilote peut commencer avec des données fictives avant un déploiement autorisé.", slug: "feuille-de-route-90-jours", link: "Préparer un pilote et ses critères de validation" },
    { question: "Peut-on transmettre des données financières confidentielles à ChatGPT ?", answer: "Cela demande un cadre autorisé par l’entreprise : offre et contrat adaptés, droits d’accès, règles de conservation et paramètres d’utilisation des données. Désactiver l’entraînement ne suffit pas à valider tous ces points. Les exercices des guides utilisent des données fictives.", slug: "chatgpt-finance", link: "Lire les précautions et les exercices ChatGPT" },
  ],
  en: [
    { question: "How can AI help a finance team?", answer: "It can draft variance commentary, extract information from documents or help identify anomalies. Connections and calculation rules remain separate from the assistant; the finance owner checks results before they are used.", slug: "automatiser-reporting-financier", link: "Review tasks and controls" },
    { question: "Where should an AI finance project start?", answer: "With a limited, measurable and reversible task. Establish time spent and errors before the test, the human review required and acceptance criteria. A pilot can start with fictitious data before an authorised deployment.", slug: "feuille-de-route-90-jours", link: "Prepare a pilot and acceptance criteria" },
    { question: "Can confidential financial data be sent to ChatGPT?", answer: "This requires a framework authorised by your company: suitable product and contract, access rights, retention rules and data-use settings. Disabling model training alone does not address all these points. The guide exercises use fictitious data.", slug: "chatgpt-finance", link: "Read ChatGPT precautions and exercises" },
  ],
  es: [
    { question: "¿Cómo puede ayudar la IA a un equipo financiero?", answer: "Puede preparar comentarios de desviaciones, extraer información de documentos o ayudar a detectar anomalías. Las conexiones y reglas de cálculo son distintas del asistente; el responsable financiero verifica los resultados antes de utilizarlos.", slug: "automatiser-reporting-financier", link: "Revisar tareas y controles" },
    { question: "¿Por dónde empezar un proyecto de IA en finanzas?", answer: "Por una tarea limitada, medible y reversible. Defina el tiempo dedicado y los errores antes de la prueba, el control humano y los criterios de validación. Un piloto puede empezar con datos ficticios antes de un despliegue autorizado.", slug: "feuille-de-route-90-jours", link: "Preparar un piloto y sus criterios de validación" },
    { question: "¿Se pueden enviar datos financieros confidenciales a ChatGPT?", answer: "Se necesita un marco autorizado por la empresa: producto y contrato adecuados, permisos de acceso, reglas de conservación y ajustes de uso de los datos. Desactivar el entrenamiento no resuelve todos estos puntos. Los ejercicios de las guías utilizan datos ficticios.", slug: "chatgpt-finance", link: "Leer las precauciones y ejercicios de ChatGPT" },
  ],
} satisfies Record<Locale, {question: string; answer: string; slug: string; link: string}[]>;
