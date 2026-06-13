"use client";

import { Substitution } from "../types";

interface SubstitutionCardProps {
  substitutions: Substitution[];
}

export function SubstitutionCard({ substitutions }: SubstitutionCardProps) {
  return (
    <section className="bg-[#f3f3f3] dark:bg-[#2f3131] rounded-[24px] p-4 border border-[#bfcaba]/30">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-[#3c6842] dark:text-[#a3f69c]">swap_horiz</span>
        <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Ingredient Substitutions</h3>
      </div>
      
      {substitutions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {substitutions.map((sub, idx) => (
            <span 
              key={idx} 
              className="bg-[#ffffff] dark:bg-[#1a1c1c] px-2 py-1 border border-[#bfcaba]/30 rounded-full text-xs text-[#1a1c1c] dark:text-[#ffffff] flex items-center gap-1 shadow-sm"
            >
              <span className="font-semibold">{sub.original}</span>
              <span className="material-symbols-outlined text-[12px] text-[#707a6c]">arrow_forward</span>
              <span className="text-[#0d631b] dark:text-[#a3f69c] font-medium">{sub.alternative}</span>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#40493d] dark:text-[#bfcaba]">No ingredient substitutions recommended for this plan.</p>
      )}
    </section>
  );
}
