import Image from 'next/image';
import Link from 'next/link';

export interface StackComboTool {
  name: string;
  /**
   * Slug de la fiche outil, ou `null` quand l'outil est cité dans un combo
   * sans avoir de fiche chez nous (SEO-ULT §4b, 2026-08-15). Le nom était
   * jusqu'ici slugifié à la volée, ce qui fabriquait des URL inexistantes —
   * `/ressources/outils/stripe`, et même `/ressources/outils/sap-/-netsuite`,
   * où l'esperluette du nom « SAP / NetSuite » se retrouvait dans le chemin.
   */
  slug: string | null;
  logo: string;
  /** SEO-optimized alt text for the logo (TICKET T3/T4). */
  logoAlt?: string;
  role: string;
}

export interface StackComboProps {
  combo: StackComboTool[];
  title: string;
  description: string;
}

export default function StackCombo({ combo, title, description }: StackComboProps) {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50 rounded-lg border border-gray-200 p-6 md:p-8 my-8">
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{title}</h3>

      {/* Stack visualization */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-3 md:gap-4 my-6 py-6">
        {combo.map((tool, idx) => {
          const card = (
            <div className={`flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 transition-shadow ${tool.slug ? "hover:shadow-md cursor-pointer" : ""}`}>
              <div className="flex items-center justify-center w-12 h-8 flex-shrink-0">
                {tool.logo ? (
                  <Image
                    src={tool.logo}
                    alt={tool.logoAlt ?? `Logo ${tool.name}`}
                    width={80}
                    height={30}
                    sizes="80px"
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-500 px-1.5 py-0.5 rounded bg-gray-100">
                    {tool.name.slice(0, 3).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{tool.name}</p>
                <p className="text-xs text-gray-600">{tool.role}</p>
              </div>
            </div>
          );
          return (
          <div key={`${tool.name}-${idx}`} className="flex items-center gap-4 w-full md:w-auto">
            {/* Un outil sans fiche chez nous reste affiché, mais sans lien :
                mieux vaut une carte inerte qu'un lien vers une page absente. */}
            {tool.slug ? <Link href={`/ressources/outils/${tool.slug}`}>{card}</Link> : card}

            {idx < combo.length - 1 && (
              <div className="flex-shrink-0 text-2xl font-bold text-gray-500 hidden md:block">
                +
              </div>
            )}

            {/* Mobile view: show + below */}
            {idx < combo.length - 1 && (
              <div className="flex-shrink-0 text-2xl font-bold text-gray-500 md:hidden self-center w-full text-center py-2">
                +
              </div>
            )}
          </div>
          );
        })}
      </div>

      {/* Equals sign and result */}
      <div className="border-t-2 border-gray-300 pt-6">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-gray-700">=</span>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-900 text-center">{description}</p>
      </div>
    </div>
  );
}
