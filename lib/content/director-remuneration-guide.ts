import type { Locale } from '../i18n';
import type { BlogPostData } from './blog-posts';

export const REMUNERATION_SLUGS: Record<Locale, string> = {
  fr: 'remuneration-dirigeant-tresorerie-pme',
  en: 'director-remuneration-sme-cash-flow',
  es: 'remuneracion-directivo-tesoreria-pyme',
};
export const REMUNERATION_IMAGE = '/images/blog/remuneration-dirigeant-tresorerie-pme.webp';
export const REMUNERATION_ALTS: Record<Locale, string> = {
  fr: 'Illustration du budget partagé entre rémunération du dirigeant, entreprise et réserve de trésorerie, avec un calendrier de paiement.',
  en: 'Illustration of a budget allocated between director remuneration, the business and a cash reserve, alongside a payment calendar.',
  es: 'Ilustración del presupuesto repartido entre la remuneración del directivo, la empresa y una reserva de tesorería, junto a un calendario de pagos.',
};

const common = { publishedDate: '2026-10-21', updatedDate: '2026-10-21', author: 'Iter Advisors', content: [] };

export const REMUNERATION_GUIDE: Record<Locale, BlogPostData> = {
  fr: {
    ...common,
    meta: {
      title: 'Rémunération du dirigeant et trésorerie | Iter Advisors',
      description: 'Construisez un budget de rémunération compatible avec la trésorerie de votre PME : coût complet, calendrier, scénarios et validations nécessaires.',
    },
    h1: 'Rémunération du dirigeant : combien verser sans fragiliser la trésorerie de sa PME ?',
    category: 'Gestion financière',
    breadcrumbs: { resourcesLabel: 'Ressources', resourcesHref: '/ressources', blogLabel: 'Blog', blogHref: '/ressources/blog' },
    htmlContent: `
<p>Une rémunération soutenable permet au dirigeant de couvrir ses besoins tout en laissant à l’entreprise les moyens de fonctionner et d’investir. Pour la déterminer, il faut rapprocher le revenu personnel recherché du coût complet pour la société et des dates auxquelles elle devra payer.</p>
<p>Le travail commence par un budget. Les arbitrages entre rémunération régulière, dividendes et autres dispositifs doivent ensuite être chiffrés et validés selon la situation du dirigeant et de l’entreprise.</p>
<p><strong>Périmètre :</strong> les dispositifs juridiques et fiscaux évoqués dans ce guide concernent une société française. La méthode de pilotage reste utilisable ailleurs, avec des hypothèses adaptées au pays concerné.</p>
<h2 id="revenu">Quel revenu personnel faut-il financer ?</h2>
<p>Le premier montant à préciser est le revenu dont le dirigeant souhaite disposer, en indiquant s’il est exprimé avant ou après impôt personnel.</p>
<p>Il est utile de distinguer le besoin mensuel régulier d’un objectif annuel complémentaire. Un besoin de revenu stable toute l’année ne pose pas les mêmes contraintes qu’un versement ponctuel, envisagé après examen des comptes et de la trésorerie.</p>
<p>Cette distinction permet de construire des scénarios comparables. Elle évite de rapprocher un salaire mensuel net, un dividende brut annuel et une économie fiscale estimée comme s’il s’agissait de montants équivalents.</p>
<h2 id="cout-complet">Comment calculer le coût complet pour l’entreprise ?</h2>
<p>Le budget doit faire apparaître tous les flux associés à l’option étudiée, ainsi que leurs échéances. Le montant reçu sur le compte personnel du dirigeant ne représente pas nécessairement la totalité des décaissements de la société.</p>
<p>Pour chaque scénario, préparez une fiche simple :</p>
<table><thead><tr><th scope="col">Élément à préciser</th><th scope="col">Question à résoudre</th></tr></thead><tbody>
<tr><th scope="row">Revenu du dirigeant</th><td>Quel montant reste disponible, avant et après impôt personnel ?</td></tr>
<tr><th scope="row">Coût pour la société</th><td>Quels versements, cotisations, frais et autres coûts faut-il financer ?</td></tr>
<tr><th scope="row">Calendrier</th><td>À quelles dates chaque sortie intervient-elle ?</td></tr>
<tr><th scope="row">Conditions</th><td>Quelles validations et formalités sont nécessaires ?</td></tr>
<tr><th scope="row">Conséquences</th><td>Quels effets sur la protection sociale, la trésorerie et les projets ?</td></tr>
</tbody></table>
<p>Les hypothèses fiscales et sociales doivent être préparées ou validées par les professionnels compétents. Le DAF les intègre ensuite au budget et au prévisionnel.</p>
<h2 id="dividendes-redevance">Quelle place donner aux dividendes et à la redevance de marque ?</h2>
<p>Les dividendes s’examinent en fonction des droits des associés, de la situation de la société et des conditions de distribution. Leur fiscalité dépend également du bénéficiaire. La fiche de <a href="https://entreprendre.service-public.gouv.fr/vosdroits/F32963">Service Public sur les dividendes</a> constitue un point de départ pour préparer cette analyse.</p>
<p>La redevance de marque relève d’une autre logique : elle rémunère un droit d’exploitation. Elle suppose notamment d’examiner la propriété de la marque, sa valeur économique, son utilisation et les conditions du contrat. Elle ne doit pas être traitée comme une simple ligne de rémunération interchangeable avec un salaire.</p>
<p>Le <a href="https://remup.fr/blog/redevance-de-marque-2026/">guide de RemUp sur la redevance de marque</a> présente l’approche de ce spécialiste. Pour le DAF, l’étape suivante consiste à intégrer les hypothèses du projet dans les comptes prévisionnels et le calendrier des paiements. La qualification et les conséquences juridiques, fiscales et sociales restent à valider avec les conseils compétents.</p>
<p>Une économie d’impôt estimée ne suffit pas à démontrer qu’un dispositif convient à l’entreprise. Il faut aussi examiner les frais, les obligations et les sorties de trésorerie qu’il entraîne.</p>
<h2 id="previsionnel">Comment intégrer la rémunération au prévisionnel de trésorerie ?</h2>
<p>Le budget annuel montre le coût global. Le prévisionnel de trésorerie révèle les moments où l’entreprise devra effectivement mobiliser l’argent.</p>
<p>Les versements au dirigeant doivent y apparaître aux côtés des salaires, fournisseurs, impôts, remboursements d’emprunts et investissements. Les encaissements clients doivent être positionnés à leur date probable de règlement.</p>
<p>Notre guide sur les <a href="/ressources/blog/flux-de-tresorerie">flux de trésorerie et leur prévision</a> détaille cette distinction entre résultat et mouvements d’argent.</p>
<p>Une méthode consiste à comparer un scénario central avec un scénario de retard d’encaissement. Pour chaque option de rémunération, on observe alors le point bas de trésorerie et les dépenses qui pourraient devenir difficiles à financer.</p>
<h2 id="arbitrage">Que faire si le budget ne permet pas le revenu souhaité ?</h2>
<p>L’écart doit être rendu visible avant de prendre des engagements.</p>
<p>Le dirigeant peut examiner le montant envisagé, son calendrier et les autres décisions de l’entreprise. Certaines dépenses peuvent être revues ; d’autres correspondent à des obligations ou à des engagements déjà pris. Les modifications doivent tenir compte des règles applicables à chaque forme de versement.</p>
<p>Il faut également comprendre l’origine de l’écart. Une tension liée à un retard client appelle un traitement différent d’une activité durablement insuffisamment rentable. Financer systématiquement une rémunération par de nouveaux emprunts ne résout pas un déséquilibre d’exploitation.</p>
<h2 id="documents">Quels documents préparer pour décider ?</h2>
<p>Une revue utile peut partir des éléments suivants :</p>
<ul><li>Les derniers comptes et une situation comptable récente.</li><li>Le détail des rémunérations et versements actuels.</li><li>Les créances clients et les dettes fournisseurs avec leurs échéances.</li><li>Le calendrier des impôts, cotisations et emprunts.</li><li>Le budget des recrutements et investissements.</li><li>Les simulations des conseils, avec leur date et leurs hypothèses.</li><li>Les contrats et justificatifs propres aux dispositifs envisagés.</li></ul>
<p>Le DAF rapproche ces informations et prépare les scénarios. Le dirigeant arbitre avec les conseils concernés, puis définit les événements qui déclencheront une nouvelle revue : baisse d’activité, retard d’encaissement, recrutement ou changement de situation personnelle.</p>
<p>Chez Iter Advisors, les missions de <a href="/daf-externalise">DAF externalisé</a> associent budget, prévisions de trésorerie et préparation des décisions. Le périmètre est défini selon les données disponibles et les besoins de l’entreprise.</p>
<p><a href="/contact">Échanger sur mon besoin de pilotage financier</a></p>`,
  },
  en: {
    ...common,
    meta: { title: 'Director remuneration and cash flow | Iter Advisors', description: 'Build a director remuneration budget that your SME can sustain: total company cost, payment timing, cash flow scenarios and the checks to complete.' },
    h1: 'Director remuneration: how much can your SME afford to pay?',
    category: 'Financial management',
    breadcrumbs: { resourcesLabel: 'Resources', resourcesHref: '/en/ressources', blogLabel: 'Blog', blogHref: '/en/ressources/blog' },
    htmlContent: `
<p>Sustainable director remuneration covers personal needs while leaving the company enough cash to operate and invest. To establish an affordable amount, compare the director’s target income with the full cost to the company and the dates on which payments fall due.</p>
<p>Start with a budget. Regular remuneration, dividends and any other arrangements can then be assessed and validated against the circumstances of both the director and the business.</p>
<p><strong>Scope:</strong> the legal and tax arrangements discussed in this guide concern a French company. The cash planning method can be used elsewhere, with assumptions adapted to the relevant jurisdiction. This is not a guide to UK remuneration rules.</p>
<h2 id="revenu">What personal income needs to be funded?</h2>
<p>First, specify the income the director wants to receive and whether the target is before or after personal income tax.</p>
<p>Separate regular monthly needs from an additional annual target. A stable income throughout the year creates different constraints from a one-off payment considered after reviewing the accounts and cash position.</p>
<p>This distinction makes scenarios comparable. It prevents a monthly net salary, an annual gross dividend and an estimated tax saving from being treated as equivalent figures.</p>
<h2 id="cout-complet">How do you calculate the full cost to the company?</h2>
<p>The budget should show every cash flow associated with the option being considered, together with its payment date. The amount reaching the director’s personal bank account does not necessarily represent the company’s total cash outflow.</p>
<p>Prepare a short assessment for each scenario:</p>
<table><thead><tr><th scope="col">Item to establish</th><th scope="col">Question to answer</th></tr></thead><tbody>
<tr><th scope="row">Director’s income</th><td>What amount remains available before and after personal income tax?</td></tr>
<tr><th scope="row">Company cost</th><td>Which payments, social contributions, fees and other costs need funding?</td></tr>
<tr><th scope="row">Timing</th><td>When does each cash outflow occur?</td></tr>
<tr><th scope="row">Conditions</th><td>Which approvals and formalities are required?</td></tr>
<tr><th scope="row">Consequences</th><td>What are the implications for social protection, cash flow and business plans?</td></tr>
</tbody></table>
<p>Tax and social contribution assumptions should be prepared or validated by the relevant advisers. The CFO then incorporates those assumptions into the budget and forecast.</p>
<h2 id="dividendes-redevance">How do dividends and trademark royalties fit into the decision?</h2>
<p>Dividends need to be assessed against shareholders’ rights, the company’s position and the conditions for a distribution. Their tax treatment also depends on the recipient. The French government’s <a href="https://entreprendre.service-public.gouv.fr/vosdroits/F32963">Service Public guidance on dividends (in French)</a> provides a starting point for that discussion.</p>
<p>A trademark royalty serves a different purpose: it pays for the right to use a trademark. An assessment must consider ownership, economic value, actual use and the terms of the licence. A royalty should not be treated as a remuneration item that can simply replace a salary.</p>
<p>The <a href="https://remup.fr/blog/redevance-de-marque-2026/">RemUp guide to trademark royalties (in French)</a> explains this specialist’s approach. The CFO’s next step is to incorporate the project’s assumptions into the forecast accounts and payment schedule. The legal classification and legal, tax and social contribution implications still require validation by the appropriate advisers.</p>
<p>An estimated tax saving alone does not establish that an arrangement suits the company. Its fees, obligations and cash outflows also need to be examined.</p>
<h2 id="previsionnel">How should remuneration enter the cash flow forecast?</h2>
<p>The annual budget shows the overall cost. The cash flow forecast shows when the company will actually need the funds.</p>
<p>Payments to the director should appear alongside payroll, supplier payments, taxes, loan repayments and investment. Customer receipts should be scheduled for the dates on which payment is realistically expected.</p>
<p>Our guide to <a href="/en/ressources/blog/flux-de-tresorerie">cash flow and forecasting</a> explains the distinction between accounting profit and cash movements.</p>
<p>One approach is to compare a base scenario with a delayed-collection scenario. For each remuneration option, examine the lowest forecast cash balance and the expenditure that could become difficult to fund.</p>
<h2 id="arbitrage">What if the budget cannot support the desired income?</h2>
<p>Make the gap visible before taking on commitments.</p>
<p>The director can review the proposed amount, its timing and other business decisions. Some expenditure can be reconsidered; other payments reflect obligations or existing commitments. Any changes must take account of the rules that apply to each type of payment.</p>
<p>The cause of the gap matters too. A delayed customer payment calls for a different response from an operation that remains insufficiently profitable. Repeatedly borrowing to fund remuneration does not resolve an operating imbalance.</p>
<h2 id="documents">Which documents help support the decision?</h2>
<p>A useful review can start with:</p>
<ul><li>The latest annual accounts and recent management accounts.</li><li>A breakdown of current remuneration and payments.</li><li>Customer receivables and supplier payables, including due dates.</li><li>The schedule of taxes, social contributions and loan payments.</li><li>The recruitment and investment budget.</li><li>Advisers’ calculations, with their dates and assumptions.</li><li>The contracts and supporting documents for any arrangements under consideration.</li></ul>
<p>The CFO reconciles this information and prepares the scenarios. The director decides with the relevant advisers, then identifies the events that should trigger a fresh review: a downturn, delayed receipts, recruitment or a change in personal circumstances.</p>
<p>At Iter Advisors, <a href="/en/fractional-cfo">fractional CFO services</a> combine budgeting, cash flow forecasting and decision support. The scope is defined around the available data and the company’s needs.</p>
<p><a href="/en/contact">Discuss my financial management needs</a></p>`,
  },
  es: {
    ...common,
    meta: { title: 'Remuneración y tesorería de la pyme | Iter Advisors', description: 'Prepare un presupuesto de remuneración compatible con la tesorería de su pyme: coste total, calendario de pagos, escenarios y comprobaciones necesarias.' },
    h1: 'Remuneración del directivo: ¿cuánto puede pagar su pyme sin comprometer su tesorería?',
    category: 'Gestión financiera',
    breadcrumbs: { resourcesLabel: 'Recursos', resourcesHref: '/es/recursos', blogLabel: 'Blog', blogHref: '/es/recursos/blog' },
    htmlContent: `
<p>Una remuneración sostenible permite al directivo cubrir sus necesidades personales y deja a la empresa los recursos necesarios para operar e invertir. Para determinarla, hay que relacionar los ingresos personales deseados con el coste total para la sociedad y las fechas en las que tendrá que pagar.</p>
<p>El trabajo empieza con un presupuesto. Después se cuantifican y validan las opciones de remuneración periódica, dividendos y otros mecanismos según la situación del directivo y de la empresa.</p>
<p><strong>Ámbito:</strong> los mecanismos jurídicos y fiscales mencionados en esta guía corresponden a una sociedad francesa. El método de planificación de tesorería puede aplicarse en otros países con hipótesis adaptadas a la normativa local. No se deben trasladar estos mecanismos automáticamente a una sociedad española.</p>
<h2 id="revenu">¿Qué ingresos personales hay que financiar?</h2>
<p>El primer importe que debe concretarse es el ingreso que el directivo desea percibir, indicando si se expresa antes o después de sus impuestos personales.</p>
<p>Conviene separar las necesidades mensuales recurrentes de un objetivo anual adicional. Un ingreso estable durante todo el año plantea condiciones distintas de un pago puntual, previsto después de revisar las cuentas y la tesorería.</p>
<p>Esta distinción permite construir escenarios comparables. Evita tratar un salario neto mensual, un dividendo bruto anual y un ahorro fiscal estimado como si fueran importes equivalentes.</p>
<h2 id="cout-complet">¿Cómo calcular el coste total para la empresa?</h2>
<p>El presupuesto debe recoger todos los flujos asociados a la opción estudiada y sus vencimientos. El importe que llega a la cuenta personal del directivo no representa necesariamente la totalidad de las salidas de caja de la sociedad.</p>
<p>Para cada escenario, prepare una ficha sencilla:</p>
<table><thead><tr><th scope="col">Elemento que debe concretarse</th><th scope="col">Pregunta que debe resolverse</th></tr></thead><tbody>
<tr><th scope="row">Ingresos del directivo</th><td>¿Qué importe queda disponible antes y después de los impuestos personales?</td></tr>
<tr><th scope="row">Coste para la sociedad</th><td>¿Qué pagos, cotizaciones, honorarios y otros costes hay que financiar?</td></tr>
<tr><th scope="row">Calendario</th><td>¿En qué fechas se produce cada salida de caja?</td></tr>
<tr><th scope="row">Condiciones</th><td>¿Qué validaciones y trámites se necesitan?</td></tr>
<tr><th scope="row">Consecuencias</th><td>¿Qué efectos tiene sobre la protección social, la tesorería y los proyectos?</td></tr>
</tbody></table>
<p>Las hipótesis fiscales y de cotización deben prepararlas o validarlas los profesionales competentes. El CFO las incorpora después al presupuesto y a la previsión de tesorería.</p>
<h2 id="dividendes-redevance">¿Qué papel tienen los dividendos y los cánones de marca?</h2>
<p>Los dividendos se analizan teniendo en cuenta los derechos de los socios, la situación de la sociedad y las condiciones del reparto. Su fiscalidad también depende del beneficiario. La ficha oficial de <a href="https://entreprendre.service-public.gouv.fr/vosdroits/F32963">Service Public sobre dividendos en Francia (en francés)</a> sirve como punto de partida para preparar ese análisis.</p>
<p>El canon de marca responde a otra lógica: remunera un derecho de uso. Exige examinar, entre otras cuestiones, la titularidad de la marca, su valor económico, su utilización y las condiciones del contrato. No debe tratarse como una partida de remuneración que pueda sustituir sin más a un salario.</p>
<p>La <a href="https://remup.fr/blog/redevance-de-marque-2026/">guía de RemUp sobre cánones de marca (en francés)</a> presenta el enfoque de este especialista. Para el CFO, el siguiente paso consiste en integrar las hipótesis del proyecto en las cuentas previsionales y en el calendario de pagos. La calificación y las consecuencias jurídicas, fiscales y de cotización deben validarse con los asesores competentes.</p>
<p>Un ahorro fiscal estimado no basta para demostrar que un mecanismo sea adecuado para la empresa. También deben examinarse sus costes, obligaciones y salidas de tesorería.</p>
<h2 id="previsionnel">¿Cómo integrar la remuneración en la previsión de tesorería?</h2>
<p>El presupuesto anual muestra el coste global. La previsión de tesorería señala cuándo necesitará la empresa disponer del dinero.</p>
<p>Los pagos al directivo deben figurar junto a las nóminas, los proveedores, los impuestos, las cuotas de préstamos y las inversiones. Los cobros de clientes deben situarse en la fecha en la que razonablemente se espera recibirlos.</p>
<p>Nuestra guía sobre <a href="/es/recursos/blog/flux-de-tresorerie">flujos de caja y previsiones</a> explica esta diferencia entre el resultado contable y los movimientos de dinero.</p>
<p>Un método consiste en comparar un escenario central con otro de retrasos en los cobros. Para cada opción de remuneración, se analiza el saldo mínimo previsto y los gastos que podrían resultar difíciles de financiar.</p>
<h2 id="arbitrage">¿Qué hacer si el presupuesto no permite alcanzar los ingresos deseados?</h2>
<p>La diferencia debe hacerse visible antes de asumir compromisos.</p>
<p>El directivo puede revisar el importe previsto, su calendario y las demás decisiones de la empresa. Algunos gastos pueden reconsiderarse; otros responden a obligaciones o compromisos ya adquiridos. Los cambios deben respetar las reglas aplicables a cada tipo de pago.</p>
<p>También hay que comprender el origen de la diferencia. Una tensión causada por el retraso de un cliente requiere una respuesta distinta de una actividad que no es suficientemente rentable de forma continuada. Financiar sistemáticamente la remuneración con nuevos préstamos no resuelve un desequilibrio operativo.</p>
<h2 id="documents">¿Qué documentos conviene preparar para decidir?</h2>
<p>Una revisión útil puede partir de estos documentos:</p>
<ul><li>Las últimas cuentas anuales y una situación contable reciente.</li><li>El detalle de las remuneraciones y los pagos actuales.</li><li>Las cuentas a cobrar y a pagar, con sus vencimientos.</li><li>El calendario de impuestos, cotizaciones y préstamos.</li><li>El presupuesto de contratación e inversiones.</li><li>Las simulaciones de los asesores, con sus fechas e hipótesis.</li><li>Los contratos y justificantes de los mecanismos previstos.</li></ul>
<p>El CFO concilia esta información y prepara los escenarios. El directivo decide con los asesores correspondientes y determina qué situaciones exigirán una nueva revisión: caída de actividad, retrasos en los cobros, contrataciones o cambios en su situación personal.</p>
<p>En Iter Advisors, los servicios de <a href="/es/externalizacion-daf">CFO externo</a> combinan presupuesto, previsiones de tesorería y apoyo a las decisiones. El alcance se define según los datos disponibles y las necesidades de la empresa.</p>
<p><a href="/es/contact">Consultar mis necesidades de gestión financiera</a></p>`,
  },
};
