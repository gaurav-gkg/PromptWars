"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CookingPlanResponse, UserPreferences } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { MealCard } from "../../components/MealCard";
import { GroceryList } from "../../components/GroceryList";
import { BudgetCard } from "../../components/BudgetCard";
import { SubstitutionCard } from "../../components/SubstitutionCard";
import { NutritionCard } from "../../components/NutritionCard";
import { PantryOptimizerCard } from "../../components/PantryOptimizerCard";
import { LeftoverReuseCard } from "../../components/LeftoverReuseCard";

export default function ResultsDashboard() {
  const router = useRouter();

  // Retrieve plan and preferences from local storage
  const [activePlan, setActivePlan] = useLocalStorage<CookingPlanResponse | null>("cookflow_active_plan", null);
  const [activePreferences, setActivePreferences] = useLocalStorage<UserPreferences | null>("cookflow_active_preferences", null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  if (!activePlan || !activePreferences) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center bg-background dark:bg-[#121315]">
        <div className="max-w-md p-6 bg-surface dark:bg-[#1f2022] rounded-2xl border border-outline-variant/50 shadow-sm flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-[#ba1a1a] mb-2">warning</span>
          <h2 className="text-xl font-bold text-on-surface dark:text-[#ffffff] mb-1">No active cooking plan found</h2>
          <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-4">
            Please configure your schedule and ingredients in the planner first.
          </p>
          <Link href="/plan" className="bg-primary text-[#ffffff] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#2e7d32] transition-colors">
            Go to Planner
          </Link>
        </div>
      </div>
    );
  }

  const handleStartCooking = () => {
    router.push("/timeline");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#121315] transition-colors duration-200">
      
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-[#1f2022] shadow-sm sticky top-0 z-50 transition-colors">
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-4">
            <Link 
              href="/plan" 
              className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-[#2f3131] transition-colors text-on-surface"
              aria-label="Go Back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="text-xl font-bold text-primary dark:text-[#a3f69c] tracking-tight">CookFlow AI</div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-on-surface-variant dark:text-[#bfcaba]">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button className="hidden md:block bg-surface-variant dark:bg-[#2f3131] text-on-surface-variant dark:text-[#ffffff] px-5 py-2 rounded-full font-semibold text-sm hover:bg-[#e8e8e8]/75 transition-colors border border-outline-variant/30">
              Save Plan
            </button>
            <button 
              onClick={handleStartCooking}
              className="bg-primary text-[#ffffff] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#2e7d32] transition-colors shadow-sm"
            >
              Start Cooking
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-6 py-8">
        
        {/* Banner Headers */}
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <div>
            <h1 className="text-[28px] md:text-[32px] font-bold text-on-surface dark:text-[#ffffff] mb-2">
              Your Daily Cooking Plan
            </h1>
            <p className="text-sm md:text-[16px] text-on-surface-variant dark:text-[#bfcaba]">
              Plan optimized for a {activePreferences.schedule} schedule, scaling portions for {activePreferences.people} diners.
            </p>
          </div>
          <div className="flex items-center gap-2 text-primary dark:text-[#a3f69c]">
            <span className="material-symbols-outlined fill">check_circle</span>
            <span className="font-semibold text-sm">All dietary criteria met</span>
          </div>
        </div>

        {/* Dashboard layout grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Meal plans */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <h3 className="font-bold text-lg text-on-surface dark:text-[#ffffff] border-b border-[#f3f3f3] pb-1">Generated Meals</h3>
            <MealCard meal={activePlan.breakfast} type="Breakfast" />
            <MealCard meal={activePlan.lunch} type="Lunch" />
            <MealCard meal={activePlan.dinner} type="Dinner" />
          </div>

          {/* Right Column: Sidebar summaries */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h3 className="font-bold text-lg text-on-surface dark:text-[#ffffff] border-b border-[#f3f3f3] pb-1">Feasibility & Checklist</h3>
            
            {/* Daily Cost Breakdown */}
            <BudgetCard 
              estimatedCost={activePlan.estimatedCost} 
              budgetAnalysis={activePlan.budgetAnalysis}
              limit={activePreferences.budget}
            />

            {/* Shopping List */}
            <GroceryList initialItems={activePlan.groceryList} />

            {/* Pantry Optimization summary */}
            {activePlan.pantryOptimizer && (
              <PantryOptimizerCard optimizer={activePlan.pantryOptimizer} />
            )}

            {/* Substitutions */}
            <SubstitutionCard substitutions={activePlan.substitutions} />

            {/* Nutrition metrics */}
            {activePlan.nutritionSummary && (
              <NutritionCard nutrition={activePlan.nutritionSummary} />
            )}

            {/* Leftovers suggestions */}
            {activePlan.leftoverReuse && (
              <LeftoverReuseCard suggestions={activePlan.leftoverReuse} />
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button for Mobile Cooking Checklist */}
      <button 
        onClick={handleStartCooking}
        aria-label="Start Cooking" 
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-[#ffffff] rounded-2xl shadow-[0_4px_8px_rgba(13,99,27,0.2)] flex items-center justify-center hover:bg-[#2e7d32] transition-colors md:hidden z-50"
      >
        <span className="material-symbols-outlined fill text-[24px]">play_arrow</span>
      </button>
    </div>
  );
}
