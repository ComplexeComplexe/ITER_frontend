"use client";

import { Fragment } from "react";
import { Check, Users, FileText, Briefcase, GraduationCap, Scale, Heart, Building2, Shield, ClipboardList } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Administration du personnel": ClipboardList,
  "Personnel administration": ClipboardList,
  "Administración de personal": ClipboardList,
  "Paie et charges sociales": FileText,
  "Payroll and social charges": FileText,
  "Nómina y cargas sociales": FileText,
  "Recrutement": Users,
  "Recruitment": Users,
  "Reclutamiento": Users,
  "Formation et développement": GraduationCap,
  "Training and development": GraduationCap,
  "Formación y desarrollo": GraduationCap,
  "Relations sociales": Scale,
  "Social relations": Scale,
  "Relaciones sociales": Scale,
  "Santé et sécurité au travail": Shield,
  "Health and safety at work": Shield,
  "Salud y seguridad en el trabajo": Shield,
  "Stratégie RH": Briefcase,
  "HR Strategy": Briefcase,
  "Estrategia de RRHH": Briefcase,
  "Culture d'entreprise": Heart,
  "Company culture": Heart,
  "Cultura de empresa": Heart,
  "Reporting RH": Building2,
  "HR Reporting": Building2,
  "Informes de RRHH": Building2,
};
import type { DrhServiceCategory } from "@/lib/content/drh-services-data";
import { DRH_SERVICES_DEFAULT } from "@/lib/content/drh-services-data";

export interface DrhServicesGridProps {
  /** From Strapi or fallback; if empty, uses DRH_SERVICES_DEFAULT */
  categories?: DrhServiceCategory[] | null;
  tierLabels: [string, string, string, string];
  addOnLabel: string;
}

export default function DrhServicesGrid({
  categories,
  tierLabels,
  addOnLabel,
}: DrhServicesGridProps) {
  const data = categories?.length ? categories : DRH_SERVICES_DEFAULT;
  const [t1, t2, t3, t4] = tierLabels;
  let rowIndex = 0;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-sm font-semibold text-foreground w-[8%]">#</th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground w-[28%]">
              Service
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground w-[36%]">
              Description
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground text-center w-[7%]">
              {t1}
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground text-center w-[7%]">
              {t2}
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground text-center w-[7%]">
              {t3}
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground text-center w-[7%]">
              {t4}
            </th>
            <th className="px-4 py-3 text-sm font-semibold text-foreground text-center w-[7%]">
              {addOnLabel}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat) => (
            <Fragment key={cat.categoryName}>
              <tr className="bg-iter-violet/5">
                <td
                  colSpan={8}
                  className="px-4 py-3 text-sm font-semibold text-iter-violet border-b border-border/50"
                >
                  <span className="inline-flex items-center gap-2">
                    {(() => {
                      const CatIcon = categoryIcons[cat.categoryName] || Briefcase;
                      return <CatIcon size={16} className="text-iter-violet/70" />;
                    })()}
                    {cat.categoryName}
                  </span>
                </td>
              </tr>
              {cat.services.map((srv, idx) => (
                <tr
                  key={`${cat.categoryName}-${idx}`}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {++rowIndex}
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-foreground">
                    {srv.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">
                    {srv.description}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {srv.tier1 ? (
                      <Check className="w-4 h-4 text-iter-chartreuse mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {srv.tier2 ? (
                      <Check className="w-4 h-4 text-iter-chartreuse mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {srv.tier3 ? (
                      <Check className="w-4 h-4 text-iter-chartreuse mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {srv.tier4 ? (
                      <Check className="w-4 h-4 text-iter-chartreuse mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {srv.isAddOn ? (
                      <Check className="w-4 h-4 text-iter-violet mx-auto" />
                    ) : (
                      <span className="text-muted-foreground/40">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
