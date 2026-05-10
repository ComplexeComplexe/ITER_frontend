import Image from 'next/image';
import Link from 'next/link';

export interface StackComboTool {
  name: string;
  slug: string;
  logo: string;
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
        {combo.map((tool, idx) => (
          <div key={tool.slug} className="flex items-center gap-4 w-full md:w-auto">
            <Link href={`/ressources/outils/${tool.slug}`}>
              <div className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-8 h-8 flex-shrink-0">
                  <Image
                    src={tool.logo}
                    alt={`Logo ${tool.name}`}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{tool.name}</p>
                  <p className="text-xs text-gray-600">{tool.role}</p>
                </div>
              </div>
            </Link>

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
        ))}
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
