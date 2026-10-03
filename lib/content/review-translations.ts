import type { Locale } from '@/lib/i18n';
import { TRUSTFOLIO_REVIEWS } from './trustfolio-reviews';
/** Faithful translations of published French reviews; author and dates unchanged. */
const copy = {
  en: [
    ['CEO and founder', 'After raising our first funding round, we needed to structure our financial operations. Iter professionalised our finance function and proved to be a reliable financial partner integrated into the team.'],
    ['Co-founder', 'The Iter team structured our finance function with care, availability and efficiency, exceeding our initial expectations.'],
    ['CEO', 'Iter helped us implement reporting and cash flow management, giving us greater visibility and financial peace of mind.'],
    ['Senior Associate, Venture Capital / Growth Equity', 'Iter delivered high-quality work on time, despite the very short deadlines of the investment process.'],
    ['CEO and co-founder', 'After 5 years of collaboration, Iter remains a real strategic asset, offering multidisciplinary expertise and a long-term perspective.'],
  ],
  es: [
    ['CEO y fundador', 'Tras cerrar nuestra primera ronda de financiación, necesitábamos estructurar nuestras operaciones financieras. Iter profesionalizó nuestra función financiera y demostró ser un socio financiero sólido, integrado en el equipo.'],
    ['Cofundador', 'El equipo de Iter estructuró nuestra función financiera con rigor, disponibilidad y eficacia, superando nuestras expectativas iniciales.'],
    ['CEO', 'Iter nos ayudó a implantar el reporting y la gestión de tesorería, aportándonos mayor visibilidad y tranquilidad financiera.'],
    ['Senior Associate, Venture Capital / Growth Equity', 'Iter entregó un trabajo de calidad a tiempo, a pesar de los plazos muy ajustados del proceso de inversión.'],
    ['CEO y cofundadora', 'Después de 5 años de colaboración, Iter sigue siendo un activo estratégico, con experiencia multidisciplinar y una visión a largo plazo.'],
  ],
};
export function reviewsForLocale(locale: Locale) {
  return TRUSTFOLIO_REVIEWS.map((review, i) => locale === 'fr' ? review : { ...review, jobTitle: copy[locale][i][0], reviewBody: copy[locale][i][1] });
}
