"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Users,
  FileText,
  Briefcase,
  GraduationCap,
  Scale,
  Heart,
  Building2,
  Shield,
  ClipboardList,
  ChevronDown,
  Wrench,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Audit RH initial & diagnostic": ClipboardList,
  "Personnel administration": ClipboardList,
  "Administración de personal": ClipboardList,
  "Recrutement & talent acquisition": Users,
  "Recruitment": Users,
  "Reclutamiento": Users,
  "Onboarding & offboarding": FileText,
  "Payroll and social charges": FileText,
  "Nómina y cargas sociales": FileText,
  "Rémunération & avantages sociaux": Building2,
  "Training and development": GraduationCap,
  "Formación y desarrollo": GraduationCap,
  "Développement RH & performance": GraduationCap,
  "Organisation & culture": Heart,
  "Company culture": Heart,
  "Cultura de empresa": Heart,
  "Relations sociales & juridique RH": Scale,
  "Social relations": Scale,
  "Relaciones sociales": Scale,
  "SIRH & digitalisation RH": Shield,
  "Health and safety at work": Shield,
  "Salud y seguridad en el trabajo": Shield,
  "Missions ponctuelles (add-ons)": Wrench,
  "Stratégie RH": Briefcase,
  "HR Strategy": Briefcase,
  "Estrategia de RRHH": Briefcase,
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

function CategoryCard({
  category,
  tierLabels,
  addOnLabel,
  index,
}: {
  category: DrhServiceCategory;
  tierLabels: [string, string, string, string];
  addOnLabel: string;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const CatIcon = categoryIcons[category.categoryName] || Briefcase;
  const serviceCount = category.services.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="rounded-2xl border border-border/50 bg-card overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-6 flex items-start gap-4 text-left group"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-iter-chartreuse/15 text-iter-dark flex-shrink-0">
          <CatIcon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-iter-violet transition-colors">
            {category.categoryName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {serviceCount} {serviceCount > 1 ? "services" : "service"}
          </p>
        </div>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 mt-1 text-muted-foreground/50 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-3">
              <div className="border-t border-border/50 pt-4" />
              {category.services.map((srv, idx) => {
                const tiers: string[] = [];
                if (srv.tier1) tiers.push(tierLabels[0]);
                if (srv.tier2) tiers.push(tierLabels[1]);
                if (srv.tier3) tiers.push(tierLabels[2]);
                if (srv.tier4) tiers.push(tierLabels[3]);
                if (srv.isAddOn) tiers.push(addOnLabel);

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
                  >
                    <Check className="w-4 h-4 text-iter-chartreuse flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        {srv.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {srv.description}
                      </p>
                      {tiers.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {tiers.map((tier) => (
                            <span
                              key={tier}
                              className="inline-block px-2 py-0.5 rounded-full bg-iter-violet/10 text-iter-violet text-[10px] font-medium"
                            >
                              {tier}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function DrhServicesGrid({
  categories,
  tierLabels,
  addOnLabel,
}: DrhServicesGridProps) {
  const data = categories?.length ? categories : DRH_SERVICES_DEFAULT;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-1">
      {data.map((cat, i) => (
        <CategoryCard
          key={cat.categoryName}
          category={cat}
          tierLabels={tierLabels}
          addOnLabel={addOnLabel}
          index={i}
        />
      ))}
    </div>
  );
}
