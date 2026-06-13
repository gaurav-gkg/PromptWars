"use client";

import { NutritionSummary } from "../types";

interface NutritionCardProps {
  nutrition: NutritionSummary;
}

export function NutritionCard({ nutrition }: NutritionCardProps) {
  // Let's create visual scales for macro bars
  const totalMacros = (nutrition.protein || 0) + (nutrition.carbs || 0) + (nutrition.fat || 0) || 1;
  const pPct = Math.round(((nutrition.protein || 0) / totalMacros) * 100);
  const cPct = Math.round(((nutrition.carbs || 0) / totalMacros) * 100);
  const fPct = Math.round(((nutrition.fat || 0) / totalMacros) * 100);

  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-md flex flex-col gap-sm">
      <div className="flex items-center gap-sm border-b border-[#f3f3f3] pb-xs">
        <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">monitoring</span>
        <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Daily Nutrition Summary</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-md pt-xs">
        {/* Calories */}
        <div className="flex flex-col items-center justify-center p-xs bg-[#f9f9f9] dark:bg-[#2f3131]/20 rounded-xl">
          <span className="text-[20px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">{nutrition.calories}</span>
          <span className="text-[11px] text-[#40493d] dark:text-[#bfcaba] uppercase tracking-wider font-semibold">Calories</span>
        </div>
        
        {/* Protein */}
        <div className="flex flex-col items-center justify-center p-xs bg-[#f9f9f9] dark:bg-[#2f3131]/20 rounded-xl">
          <span className="text-[20px] font-bold text-[#0d631b] dark:text-[#a3f69c]">{nutrition.protein}g</span>
          <span className="text-[11px] text-[#40493d] dark:text-[#bfcaba] uppercase tracking-wider font-semibold">Protein</span>
        </div>

        {/* Carbs */}
        <div className="flex flex-col items-center justify-center p-xs bg-[#f9f9f9] dark:bg-[#2f3131]/20 rounded-xl">
          <span className="text-[20px] font-bold text-[#3c6842] dark:text-[#bdefbe]">{nutrition.carbs}g</span>
          <span className="text-[11px] text-[#40493d] dark:text-[#bfcaba] uppercase tracking-wider font-semibold">Carbs</span>
        </div>

        {/* Fat */}
        <div className="flex flex-col items-center justify-center p-xs bg-[#f9f9f9] dark:bg-[#2f3131]/20 rounded-xl">
          <span className="text-[20px] font-bold text-[#ba1a1a] dark:text-[#ffb4ab]">{nutrition.fat}g</span>
          <span className="text-[11px] text-[#40493d] dark:text-[#bfcaba] uppercase tracking-wider font-semibold">Fat</span>
        </div>
      </div>

      {/* Tonal Ratio bar */}
      <div className="mt-sm">
        <h4 className="text-[11px] text-[#40493d] dark:text-[#bfcaba] font-semibold mb-xs uppercase tracking-wider">Macro Ratio</h4>
        <div className="w-full h-3 rounded-full flex overflow-hidden">
          <div className="bg-[#0d631b] h-full" style={{ width: `${pPct}%` }} title={`Protein: ${pPct}%`} />
          <div className="bg-[#3c6842] h-full" style={{ width: `${cPct}%` }} title={`Carbs: ${cPct}%`} />
          <div className="bg-[#ba1a1a] h-full" style={{ width: `${fPct}%` }} title={`Fat: ${fPct}%`} />
        </div>
        <div className="flex justify-between text-[10px] text-[#707a6c] dark:text-[#bfcaba] mt-xs">
          <span>Protein ({pPct}%)</span>
          <span>Carbs ({cPct}%)</span>
          <span>Fat ({fPct}%)</span>
        </div>
      </div>
    </section>
  );
}
