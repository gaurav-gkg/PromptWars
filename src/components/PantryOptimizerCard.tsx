"use client";

import { PantryOptimizer } from "../types";

interface PantryOptimizerCardProps {
  optimizer: PantryOptimizer;
}

export function PantryOptimizerCard({ optimizer }: PantryOptimizerCardProps) {
  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-md flex flex-col gap-sm">
      <div className="flex items-center justify-between border-b border-[#f3f3f3] pb-xs">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">insights</span>
          <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Pantry Optimizer</h3>
        </div>
        <span className="text-[11px] font-bold text-[#0d631b] dark:text-[#a3f69c] bg-[#cbffc2]/30 dark:bg-[#2e7d32]/20 px-3 py-1 rounded-full">
          -{optimizer.costReductionPercentage}% grocery cost
        </span>
      </div>

      <p className="text-xs text-[#40493d] dark:text-[#bfcaba]">
        We analyzed your kitchen pantry and incorporated these available ingredients into your recipes to minimize shopping trip costs:
      </p>

      {optimizer.reusedIngredients && optimizer.reusedIngredients.length > 0 ? (
        <div className="flex flex-wrap gap-xs pt-xs">
          {optimizer.reusedIngredients.map((ing, idx) => (
            <span 
              key={idx} 
              className="bg-[#cbffc2]/10 dark:bg-[#2e7d32]/10 text-[#0d631b] dark:text-[#a3f69c] border border-[#0d631b]/20 px-sm py-xs rounded-full text-xs font-semibold flex items-center gap-xs"
            >
              <span className="material-symbols-outlined text-[14px]">check</span>
              {ing}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#707a6c] dark:text-[#bfcaba] italic">No items from your pantry were matched. Try adding more items next time!</p>
      )}
    </section>
  );
}
