"use client";

import { useState } from "react";
import { Meal } from "../types";

interface MealCardProps {
  meal: Meal;
  type: "Breakfast" | "Lunch" | "Dinner";
}

export function MealCard({ meal, type }: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Icon mapping
  const icon = type === "Breakfast" ? "sunny" : type === "Lunch" ? "restaurant" : "nightlight";

  return (
    <article className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row">
        {/* Left Side: Header/Meta for meal */}
        <div className="sm:w-1/3 min-h-[160px] sm:min-h-auto relative bg-[#eeeeee] dark:bg-[#2f3131] flex flex-col items-center justify-center p-md text-center">
          <div className="absolute top-sm left-sm bg-[#ffffff]/90 dark:bg-[#1a1c1c]/90 backdrop-blur-sm text-[#1a1c1c] dark:text-[#ffffff] px-sm py-xs rounded-full font-medium text-[11px] tracking-wider uppercase flex items-center gap-xs shadow-sm">
            <span className="material-symbols-outlined text-[14px]">{icon}</span>
            {type}
          </div>
          
          <span className="material-symbols-outlined text-[48px] text-[#0d631b] dark:text-[#a3f69c] mb-sm">
            {type === "Breakfast" ? "cookie" : type === "Lunch" ? "rice_bowl" : "dinner_dining"}
          </span>
          <h3 className="font-semibold text-lg text-[#1a1c1c] dark:text-[#ffffff] px-sm">{meal.name}</h3>
        </div>

        {/* Right Side: Quick info & Description */}
        <div className="p-md sm:p-lg sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-sm">
              <h2 className="font-bold text-[20px] text-[#1a1c1c] dark:text-[#ffffff] group-hover:text-[#0d631b] dark:group-hover:text-[#a3f69c] transition-colors">
                {meal.name}
              </h2>
            </div>
            <p className="text-[#40493d] dark:text-[#bfcaba] text-sm mb-md line-clamp-2">
              {meal.description}
            </p>
          </div>

          <div className="flex items-center gap-sm flex-wrap">
            <div className="flex items-center gap-xs text-[#40493d] dark:text-[#bfcaba] bg-[#f3f3f3] dark:bg-[#2f3131] py-xs px-sm rounded-md">
              <span className="material-symbols-outlined text-[16px]">timer</span>
              <span className="font-semibold text-[11px]">{meal.preparationTime} min</span>
            </div>
            <div className="flex items-center gap-xs text-[#40493d] dark:text-[#bfcaba] bg-[#f3f3f3] dark:bg-[#2f3131] py-xs px-sm rounded-md">
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span className="font-semibold text-[11px]">{meal.calories} kcal</span>
            </div>
            {meal.dietaryTag && (
              <div className="flex items-center gap-xs text-[#0d631b] dark:text-[#a3f69c] bg-[#cbffc2]/30 dark:bg-[#2e7d32]/20 py-xs px-sm rounded-md">
                <span className="font-medium text-[11px]">{meal.dietaryTag}</span>
              </div>
            )}
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-auto flex items-center gap-xs text-[#0d631b] dark:text-[#a3f69c] font-semibold text-sm hover:underline"
            >
              {isExpanded ? "Collapse" : "View Details"}
              <span className="material-symbols-outlined text-[16px] transition-transform duration-200">
                {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded view for ingredients & steps */}
      {isExpanded && (
        <div className="border-t border-[#bfcaba]/30 p-md sm:p-lg bg-[#f9f9f9] dark:bg-[#1a1c1c]/40 animate-[fadeIn_0.2s_ease-out]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Ingredients */}
            <div>
              <h4 className="font-semibold text-[#1a1c1c] dark:text-[#ffffff] text-sm mb-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px] text-[#0d631b] dark:text-[#a3f69c]">shopping_basket</span>
                Ingredients Required
              </h4>
              <ul className="list-disc pl-5 text-sm text-[#40493d] dark:text-[#bfcaba] space-y-1">
                {meal.ingredients.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Cooking Steps */}
            <div>
              <h4 className="font-semibold text-[#1a1c1c] dark:text-[#ffffff] text-sm mb-sm flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px] text-[#0d631b] dark:text-[#a3f69c]">receipt_long</span>
                Preparation Steps
              </h4>
              <ol className="list-decimal pl-5 text-sm text-[#40493d] dark:text-[#bfcaba] space-y-1">
                {meal.cookingSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
