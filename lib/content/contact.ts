import { Locale } from "../i18n";

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  required: boolean;
  half?: boolean;
}

export interface ContactContent {
  meta: {
    title: string;
    description: string;
  };
  h1: string;
  paragraphs: [string, string];
  form: {
    fields: ContactFormField[];
    submit: string;
  };
}

export const contactContent: Record<Locale, ContactContent> = {
  fr: {
    meta: {
      title: "Contact | Iter Advisors",
      description:
        "Contactez Iter Advisors pour un accompagnement sur mesure en direction financière externalisée, levée de fonds et M&A.",
    },
    h1: "Découvrez nos services et passez à l\u2019action\u00A0!",
    paragraphs: [
      "Chez Iter Advisors, nous comprenons les défis financiers uniques auxquels votre entreprise est confrontée.",
      "Grâce à nos DAF externalisés (ou CFO part-time), nous vous offrons un accompagnement sur mesure, adapté à vos besoins stratégiques et opérationnels.",
    ],
    form: {
      fields: [
        { name: "company", label: "Entreprise (facultatif)", type: "text", required: false },
        { name: "lastName", label: "Nom", type: "text", required: true, half: true },
        { name: "firstName", label: "Prénom", type: "text", required: true, half: true },
        { name: "email", label: "E-mail", type: "email", required: true, half: true },
        { name: "phone", label: "Téléphone", type: "tel", required: false, half: true },
        { name: "message", label: "Votre besoin en quelques mots (facultatif)", type: "textarea", required: false },
      ],
      submit: "Envoyer",
    },
  },
  en: {
    meta: {
      title: "Contact - En | Iter Advisors",
      description:
        "Contact Iter Advisors for customized support in outsourced financial management, fundraising and M&A.",
    },
    h1: "Discover our services and take action!",
    paragraphs: [
      "At Iter Advisors, we understand the unique financial challenges your business faces.",
      "Thanks to our outsourced CFOs (or CFO part-time), we can offer you customized support tailored to your strategic and operational needs.",
    ],
    form: {
      fields: [
        { name: "company", label: "Company (optional)", type: "text", required: false },
        { name: "lastName", label: "Last name", type: "text", required: true, half: true },
        { name: "firstName", label: "First name", type: "text", required: true, half: true },
        { name: "email", label: "E-mail", type: "email", required: true, half: true },
        { name: "phone", label: "Phone", type: "tel", required: false, half: true },
        { name: "message", label: "Your needs in a few words (optional)", type: "textarea", required: false },
      ],
      submit: "Send",
    },
  },
  es: {
    meta: {
      title: "Contact ES | Iter Advisors",
      description:
        "Contacte con Iter Advisors para un apoyo personalizado en gestión financiera externalizada, captación de fondos y M&A.",
    },
    h1: "Infórmese sobre nuestros servicios y pase a la acción.",
    paragraphs: [
      "En Iter Advisors, entendemos los retos financieros únicos a los que se enfrenta su empresa.",
      "Gracias a nuestros CFO externalizados (o CFO a tiempo parcial), podemos ofrecerle un apoyo adaptado a sus necesidades estratégicas y operativas.",
    ],
    form: {
      fields: [
        { name: "company", label: "Empresa (opcional)", type: "text", required: false },
        { name: "lastName", label: "Apellido", type: "text", required: true, half: true },
        { name: "firstName", label: "Nombre", type: "text", required: true, half: true },
        { name: "email", label: "Correo", type: "email", required: true, half: true },
        { name: "phone", label: "Teléfono", type: "tel", required: false, half: true },
        { name: "message", label: "Su necesidad en pocas palabras (opcional)", type: "textarea", required: false },
      ],
      submit: "Enviar",
    },
  },
} as const;

export function getContactContent(locale: Locale) {
  return contactContent[locale];
}
