import { Metadata } from "next";
import BlogPostPageRefonte from "@/components/pages/BlogPostPageRefonte";
import { getCmsNavigation } from "@/lib/strapi";
import { Callout, StatGrid, ProseTable, InlineCta } from "@/components/blog";

export const metadata: Metadata = {
  title: "Fiscalidad Francia vs España: comparativa completa 2026 | Iter Advisors",
  description:
    "IS, IVA, cotizaciones sociales, régimen Beckham: guía completa para empresas que operan entre Francia y España. Ahorra hasta 7.500 €/empleado. Diagnóstico gratuito.",
  alternates: {
    canonical: "https://www.iteradvisors.com/es/recursos/blog/regimes-fiscaux-france-vs-espagne",
    languages: {
      "fr-FR": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
      "es-ES": "https://www.iteradvisors.com/es/recursos/blog/regimes-fiscaux-france-vs-espagne",
      "x-default": "https://www.iteradvisors.com/ressources/blog/regimes-fiscaux-france-vs-espagne",
    },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Fiscalidad Francia vs España: comparativa completa 2026",
    description:
      "IS, IVA, cotizaciones sociales, régimen Beckham: guía completa para empresas que operan entre Francia y España.",
    type: "article",
    images: [{ url: "/images/og-logo.png", alt: "Fiscalidad Francia vs España — Comparativa completa 2026" }],
  },
};

export default async function Page() {
  const cmsNavigation = await getCmsNavigation("es");

  return (
    <BlogPostPageRefonte
      locale="es"
      cmsNavigation={cmsNavigation}
      breadcrumbs={{
        resourcesLabel: "Recursos",
        resourcesHref: "/es/recursos",
        blogLabel: "Blog",
        blogHref: "/es/recursos/blog",
      }}
      slug="regimes-fiscaux-france-vs-espagne"
      category="Fiscalidad internacional"
      title="Fiscalidad Francia vs España: comparativa completa 2026"
      dek="IS, IVA, cotizaciones sociales, regímenes especiales. Cómo optimizar tu estructura fiscal entre Francia y España con datos actualizados a 2026."
      author={{
        name: "Benjamin Ziza",
        url: "/es/quienes-somos/benjamin-ziza",
        avatar: "/images/team/benjamin-ziza.webp",
        jobTitle: "Cofundador — CFO e Inversor, Iter Advisors",
      }}
      readingTime={8}
      dateModified="2026-07-25T00:00:00Z"
      heroImage="/images/blog/covers/regimes-fiscaux-france-vs-espagne.svg"
      toc={[
        { id: "impuesto-sociedades", label: "1. Impuesto sobre Sociedades (IS)" },
        { id: "iva", label: "2. IVA y número intracomunitario" },
        { id: "cotizaciones", label: "3. Cotizaciones sociales y coste laboral" },
        { id: "regimenes-especiales", label: "4. Regímenes especiales (Beckham, autónomo)" },
        { id: "tu-perfil", label: "5. ¿Qué régimen encaja con tu perfil?" },
      ]}
      faqItems={[
        {
          question: "¿Necesito una holding para operar entre Francia y España?",
          answer:
            "No necesariamente. Una holding tiene sentido cuando tu facturación supera los 2–3 M€ o gestionas varias entidades. Para pymes en crecimiento, una estructura binacional sencilla (SARL/SAS en Francia + SL en España) es suficiente para aprovechar el diferencial de cotizaciones sociales (~15 puntos porcentuales). Una auditoría de estructura con un CFO externo identificará el esquema óptimo antes de cualquier cambio.",
        },
        {
          question: "¿Cómo evitar la doble imposición entre Francia y España?",
          answer:
            "El Convenio de doble imposición Francia-España (firmado en 1995, revisado en 2011) evita la doble imposición sobre beneficios empresariales, dividendos y salarios. En la práctica: los beneficios generados en España tributan sólo en España si existe establecimiento permanente (local, empleados). Los dividendos de la filial española a la holding francesa se benefician de una retención reducida (5–15%). Consulte siempre a un experto fiscal antes de cualquier reestructuración.",
        },
        {
          question: "¿Puede una empresa francesa recuperar el IVA español?",
          answer:
            "Sí, conforme a la Directiva 2008/9/CE. Una sociedad francesa sujeta a IVA puede recuperar el IVA español pagado en compras profesionales en España, siempre que presente la solicitud electrónica de devolución antes del 30 de septiembre del año siguiente. El plazo de devolución suele ser de 4 a 6 meses. El importe mínimo para solicitud trimestral es de 50 €.",
        },
        {
          question: "¿Quién puede acogerse al régimen Beckham en España?",
          answer:
            "Las personas físicas que trasladen su residencia fiscal a España después de haber permanecido fuera del país al menos 5 años. El régimen se aplica durante 6 años y limita el tipo impositivo al 24% sobre rentas de fuente española hasta 600.000 €. Los directivos que se incorporan a una filial española procedentes del extranjero son los principales beneficiarios. La solicitud debe presentarse en los 6 meses siguientes al primer contrato laboral en España.",
        },
      ]}
      relatedArticles={[
        {
          url: "/es/recursos/blog/cfo-externo-pymes-precio-2026",
          category: "CFO externo",
          title: "CFO externo para pymes: funciones y precio en 2026",
        },
        {
          url: "/ressources/fiscalite/double-imposition-france-espagne",
          category: "Fiscalidad internacional",
          title: "Convenio fiscal Francia-España: evitar la doble imposición",
        },
        {
          url: "/ressources/fiscalite/impot-revenu-espagne",
          category: "Fiscalidad",
          title: "Barème IRPF Espagne 2026 : tranches et calcul",
        },
      ]}
      metaDescription="Comparativa completa IS, IVA y cotizaciones sociales entre Francia y España. Ahorros potenciales y regímenes optimizados. Guía experta Iter Advisors 2026."
      tldr={
        <>
          <p>
            <strong>Francia:</strong> IS 25,83% (tipo reducido 15% hasta 38k€), IVA 20%,
            cotizaciones sociales elevadas (~45% del salario bruto)
          </p>
          <p>
            <strong>España:</strong> IS 25% (19% startups), IVA 21%, regímenes PVN y PAC para
            pequeñas estructuras con cotizaciones reducidas
          </p>
          <p>
            <strong>Conclusión clave:</strong> La diferencia puede alcanzar 7.500 €/empleado/año.
            Consultar a un experto fiscal antes de cambiar de régimen.
          </p>
        </>
      }
    >
      <h2 id="impuesto-sociedades">1. Impuesto sobre Sociedades (IS)</h2>

      <p>
        El Impuesto sobre Sociedades es una de las principales diferencias entre Francia y España.
        El tipo, la base imponible y los regímenes especiales varían de forma significativa.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Criterio</th>
            <th>Francia</th>
            <th>España</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tipo general IS</td>
            <td>25,83%</td>
            <td>25%</td>
          </tr>
          <tr>
            <td>Tipo reducido (startups/pymes)</td>
            <td>15% hasta 38.000 €</td>
            <td>19% (startups, 1er año)</td>
          </tr>
          <tr>
            <td>Plusvalías</td>
            <td>IS + recargo CSG</td>
            <td>IS únicamente</td>
          </tr>
          <tr>
            <td>Deducción de intereses</td>
            <td>Limitada al EBITDA × 30%</td>
            <td>Limitada al 25% del EBIT</td>
          </tr>
          <tr>
            <td>Compensación de pérdidas</td>
            <td>Sin límite temporal</td>
            <td>Hasta 18 años</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="info" title="Punto clave">
        <strong>Francia:</strong> El recargo social del 3,3% eleva el tipo efectivo de IS al
        25,83% para empresas con beneficios superiores a 763k€. Por debajo de ese umbral, el tipo
        efectivo es del 25%.
      </Callout>

      <p>
        En España, el tipo general del 25% se aplica de forma uniforme. Las startups se
        benefician de un tipo reducido del 19% en su primer ejercicio con beneficios y el
        siguiente. Las pequeñas pymes (facturación inferior a 600.000 €) pueden acogerse al
        régimen especial PVN.
      </p>

      <h2 id="iva">2. IVA y número intracomunitario</h2>

      <p>
        El IVA es un impuesto indirecto que grava el valor añadido en cada fase de producción y
        distribución. Los tipos difieren entre Francia y España, con implicaciones significativas
        para los negocios B2B y B2C.
      </p>

      <ProseTable>
        <thead>
          <tr>
            <th>Tipo de IVA</th>
            <th>Francia</th>
            <th>España</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tipo general</td>
            <td>20%</td>
            <td>21%</td>
          </tr>
          <tr>
            <td>Tipo reducido</td>
            <td>5,5% (alimentos, libros)</td>
            <td>10% (alimentos, libros)</td>
          </tr>
          <tr>
            <td>Tipo superreducido</td>
            <td>2,1% (prensa, medicamentos)</td>
            <td>4% (alimentos básicos)</td>
          </tr>
          <tr>
            <td>Umbral de alta obligatoria</td>
            <td>34.400 € de facturación</td>
            <td>Ninguno (alta obligatoria desde el primer euro)</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Atención">
        En España, el alta en IVA es obligatoria desde el primer euro de facturación, a diferencia
        de Francia, donde existe un umbral de 34.400 € anuales. Esto afecta especialmente a las
        pequeñas estructuras transfronterizas.
      </Callout>

      <h2 id="cotizaciones">3. Cotizaciones sociales y coste laboral</h2>

      <p>
        Las cotizaciones sociales representan la mayor carga financiera para las empresas. Cubren
        la seguridad social, el seguro de salud, las pensiones y otras prestaciones.
      </p>

      <StatGrid
        items={[
          {
            label: "Cotización patronal Francia",
            value: "~45%",
            sublabel: "del salario bruto (S.S., pensión, desempleo)",
          },
          {
            label: "Cotización patronal España",
            value: "~30%",
            sublabel: "del salario bruto (TGSS + contingencias)",
          },
          {
            label: "Diferencia anual",
            value: "7.500 €",
            sublabel: "por empleado en SMI (brecha acumulada)",
          },
        ]}
        columns={3}
      />

      <ProseTable>
        <thead>
          <tr>
            <th>Cotización</th>
            <th>Francia (%)</th>
            <th>España (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Seguridad social</td>
            <td>8,55%</td>
            <td>6,35%</td>
          </tr>
          <tr>
            <td>Pensión complementaria</td>
            <td>3,60%</td>
            <td>Incluida</td>
          </tr>
          <tr>
            <td>Seguro de desempleo</td>
            <td>4,05%</td>
            <td>5,50%</td>
          </tr>
          <tr>
            <td>Otros (mutua, AT/EP)</td>
            <td>~20%</td>
            <td>~18%</td>
          </tr>
          <tr>
            <td>Total estimado</td>
            <td>42–45%</td>
            <td>28–32%</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="success" title="Ventaja España">
        La carga social notablemente inferior en España explica el creciente atractivo de las
        estructuras binacionales Francia-España, con equipos operativos ubicados en España.
      </Callout>

      <h2 id="regimenes-especiales">4. Regímenes especiales (Beckham, autónomos, PVN)</h2>

      <h3>Francia: microempresa</h3>
      <p>
        El régimen de microempresa se aplica a facturas anuales de hasta:
      </p>
      <ul>
        <li>176.200 € en actividades comerciales</li>
        <li>72.500 € en prestación de servicios y profesiones liberales</li>
      </ul>
      <p>
        Ventajas: contabilidad simplificada, cotizaciones reducidas (~20–24% de la facturación),
        sin IS. Inconveniente: no se pueden deducir los gastos reales.
      </p>

      <h3>España: PVN y régimen de autónomos</h3>
      <p>
        <strong>PVN (Pequeño Volumen de Negocios):</strong> Disponible para facturaciones
        inferiores a 600.000 €. Permite un régimen trimestral simplificado de IVA en lugar de la
        declaración mensual.
      </p>
      <p>
        Los autónomos en España están obligados a cotizar a la Seguridad Social desde el primer
        día, incluso con ingresos cero (mínimo 294 €/mes en 2026 bajo la cotización por ingresos
        reales).
      </p>

      <h3>España: Régimen Beckham (impatriados)</h3>
      <p>
        Las personas físicas que trasladen su residencia fiscal a España después de haber
        permanecido fuera del país al menos 5 años pueden acogerse al{" "}
        <a href="/ressources/fiscalite/beckham-law" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
          régimen Beckham
        </a>
        : un tipo fijo del 24% sobre rentas de fuente española hasta 600.000 €, durante 6 años.
        Una ventaja muy relevante para directivos que se incorporan a una filial española desde
        el extranjero.
      </p>

      <Callout type="success" title="Régimen Beckham: hasta 23 puntos de ahorro">
        Un directivo que tributa al 47% en Francia y pasa al régimen Beckham paga el 24% sobre
        sus rentas españolas. El ahorro puede superar los 50.000 €/año para un salario de
        150.000 €.{" "}
        <a href="/ressources/fiscalite/beckham-law" className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline">
          Ver condiciones de elegibilidad →
        </a>
      </Callout>

      <h2 id="tu-perfil">5. ¿Qué régimen encaja con tu perfil?</h2>

      <p>
        La elección del régimen fiscal depende de tu estructura, rentabilidad, facturación y
        estrategia de crecimiento. Estos son los casos más habituales:
      </p>

      <h3>Caso 1: Startup tecnológica (0–500k€ de facturación)</h3>
      <p><strong>Recomendación:</strong> España (IS 19%) o Francia (IS 15% tipo reducido).</p>
      <ul>
        <li>Tipo reducido de IS en ambos países</li>
        <li>Cotizaciones sociales más bajas en España</li>
        <li>Francia ofrece más ayudas para empresas jóvenes (CIR, JEI)</li>
      </ul>

      <h3>Caso 2: Pyme en crecimiento (500k–2M€ de facturación)</h3>
      <p><strong>Recomendación:</strong> Optimización binacional (Francia + España).</p>
      <ul>
        <li>Francia: sede social + I+D (crédito fiscal a la investigación)</li>
        <li>España: operaciones y soporte (menores costes sociales)</li>
        <li>Ahorro potencial: 10–15% de la masa salarial</li>
      </ul>

      <h3>Caso 3: Holding o grupo multinacional</h3>
      <p><strong>Recomendación:</strong> Estructura con entidades dedicadas.</p>
      <ul>
        <li>Optimización de precios de transferencia</li>
        <li>Aprovechamiento de créditos fiscales locales</li>
        <li>Gestión centralizada de tesorería</li>
      </ul>

      <InlineCta
        title="¿Necesitas una optimización fiscal a medida?"
        body="Nuestro equipo de expertos analiza tu situación e identifica los ahorros potenciales. Auditoría 100% gratuita, sin compromiso."
        ctaLabel="Solicitar una auditoría fiscal gratuita"
        ctaHref="/es/contacto"
      />

      <ProseTable>
        <thead>
          <tr>
            <th>Escenario</th>
            <th>Mejor opción</th>
            <th>Ahorro potencial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Autónomo (0–100k€)</td>
            <td>Microempresa FR o PVN ES</td>
            <td>500–1.500 €/año</td>
          </tr>
          <tr>
            <td>Pyme en crecimiento (500k–2M€)</td>
            <td>Holding binacional</td>
            <td>10k–20k €/año</td>
          </tr>
          <tr>
            <td>Startup (primer año)</td>
            <td>ES (IS 19%) o FR (IS 15%)</td>
            <td>5k–10k € en IS</td>
          </tr>
          <tr>
            <td>Equipo amplio (50+ empleados)</td>
            <td>Estructura FR-ES mixta</td>
            <td>7.500 €/empleado/año</td>
          </tr>
        </tbody>
      </ProseTable>

      <Callout type="warning" title="Advertencia importante">
        La optimización fiscal conlleva riesgos legales. Asegúrate de que tus estructuras
        tienen sustancia económica real. Una optimización «de papel» sin actividad real puede
        ser recalificada por la administración tributaria.
      </Callout>

      <div className="my-10 rounded-lg border border-iter-violet/20 bg-iter-violet/5 p-6 md:p-8">
        <h3 className="mb-3 text-lg font-semibold text-slate-900">
          ¿Estructurando tu negocio entre Francia y España?
        </h3>
        <p className="mb-5 text-slate-700">
          Iter Advisors acompaña a pymes y scale-ups binacionales desde Barcelona, París y
          Toulouse. Nuestros CFOs externos conocen los dos entornos fiscales y contables — IS/IRPF,
          IVA intracomunitario, régimen Beckham, convenios de doble imposición — y saben
          estructurar una actividad binacional sin riesgo de recalificación.
        </p>
        <ul className="space-y-2 text-slate-700">
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Descubre nuestro servicio de{" "}
              <a
                href="/es/externalizacion-daf"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                CFO externo
              </a>
              {" "}— dirección financiera completa desde 2 días/mes.
            </span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden className="text-iter-violet">→</span>
            <span>
              Para la captación de inversión en España o Francia, consulta nuestro servicio de{" "}
              <a
                href="/es/services/soporte-financiacion"
                className="text-iter-violet font-semibold underline underline-offset-2 hover:no-underline"
              >
                apoyo a la financiación
              </a>
              .
            </span>
          </li>
        </ul>
      </div>
    </BlogPostPageRefonte>
  );
}
