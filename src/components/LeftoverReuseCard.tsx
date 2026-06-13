"use client";

import { LeftoverSuggestion } from "../types";

interface LeftoverReuseCardProps {
  suggestions: LeftoverSuggestion[];
}

export function LeftoverReuseCard({ suggestions }: LeftoverReuseCardProps) {
  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 border-b border-[#f3f3f3] pb-1">
        <span className="material-symbols-outlined text-[#3c6842] dark:text-[#a3f69c]">difference</span>
        <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Leftover & Zero Waste Reuse</h3>
      </div>

      <p className="text-xs text-[#40493d] dark:text-[#bfcaba]">
        Here are chef-recommended ways to recycle excess ingredients or portions from this meal plan to avoid waste:
      </p>

      {suggestions && suggestions.length > 0 ? (
        <div className="space-y-2 pt-1">
          {suggestions.map((sug, idx) => (
            <div key={idx} className="bg-[#f9f9f9] dark:bg-[#2f3131]/20 p-2 rounded-xl border border-[#bfcaba]/10">
              <h4 className="font-bold text-xs text-[#0d631b] dark:text-[#a3f69c] mb-1">{sug.mealName}</h4>
              <p className="text-xs text-[#40493d] dark:text-[#bfcaba]">{sug.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#707a6c] dark:text-[#bfcaba] italic">No leftover suggestions required. Everything is portion-sized!</p>
      )}
    </section>
  );
}
