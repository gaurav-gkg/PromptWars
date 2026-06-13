"use client";

import { BudgetAnalysis, EstimatedCost } from "../types";
import { isBudgetFeasible, calculateRemainingBudget } from "../utils/costCalculator";

interface BudgetCardProps {
  estimatedCost: EstimatedCost;
  budgetAnalysis: BudgetAnalysis;
  limit: number;
}

export function BudgetCard({ estimatedCost, budgetAnalysis, limit }: BudgetCardProps) {
  const isFeasible = isBudgetFeasible(limit, estimatedCost.total);
  const remaining = calculateRemainingBudget(limit, estimatedCost.total);
  const percentage = Math.min(100, Math.round((estimatedCost.total / limit) * 100));

  // Determine status color theme
  const themeColor = isFeasible ? "bg-[#0d631b] dark:bg-[#a3f69c]" : "bg-[#ba1a1a] dark:bg-[#ffb4ab]";
  const textColor = isFeasible ? "text-[#0d631b] dark:text-[#a3f69c]" : "text-[#ba1a1a] dark:text-[#ffb4ab]";
  
  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">account_balance_wallet</span>
        <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Budget Feasibility Breakdown</h3>
      </div>
      
      <div className="flex justify-between items-end mt-2">
        <div className="text-[28px] font-bold text-[#1a1c1c] dark:text-[#ffffff] leading-none">
          {estimatedCost.currency} {estimatedCost.total}
        </div>
        <div className="text-[11px] font-semibold text-[#40493d] dark:text-[#bfcaba] pb-1">
          Est. Cost for Plan
        </div>
      </div>

      <div className="mt-2">
        <div className="flex justify-between text-[11px] font-semibold mb-1">
          <span className="text-[#40493d] dark:text-[#bfcaba]">Limit: {estimatedCost.currency} {limit}</span>
          <span className={`${textColor} font-bold`}>
            {isFeasible ? "On Track" : "Over Budget"} ({percentage}%)
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#eeeeee] dark:bg-[#2f3131] rounded-full h-2 overflow-hidden">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${themeColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <p className="text-xs text-[#40493d] dark:text-[#bfcaba] mt-2">
          {isFeasible 
            ? `Remaining budget: ${estimatedCost.currency} ${remaining}. Great job!` 
            : `Exceeded budget limit by ${estimatedCost.currency} ${estimatedCost.total - limit}. Try substituting premium ingredients.`}
        </p>
      </div>

      {budgetAnalysis.savingsSuggestions && budgetAnalysis.savingsSuggestions.length > 0 && (
        <div className="mt-4 border-t border-[#f3f3f3] pt-4 bg-[#f3f3f3]/20 dark:bg-[#2f3131]/20 p-2 rounded-xl">
          <div className="flex items-center gap-1 mb-1 text-[#0d631b] dark:text-[#a3f69c] font-semibold text-xs">
            <span className="material-symbols-outlined text-[16px]">tips_and_updates</span>
            AI Savings Tips
          </div>
          <ul className="list-disc pl-4 text-xs text-[#40493d] dark:text-[#bfcaba] space-y-1">
            {budgetAnalysis.savingsSuggestions.map((suggestion, idx) => (
              <li key={idx}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
