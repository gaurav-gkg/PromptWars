"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CookingPlanResponse, UserPreferences } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { TimelineCard } from "../../components/TimelineCard";
import { ChecklistCard } from "../../components/ChecklistCard";

export default function TimelinePage() {
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
      <div className="min-h-screen flex items-center justify-center p-md text-center bg-background dark:bg-[#121315]">
        <div className="max-w-md p-lg bg-surface dark:bg-[#1f2022] rounded-2xl border border-outline-variant/50 shadow-sm flex flex-col items-center">
          <span className="material-symbols-outlined text-[48px] text-[#ba1a1a] mb-sm">warning</span>
          <h2 className="text-xl font-bold text-on-surface dark:text-[#ffffff] mb-xs">No active cooking plan found</h2>
          <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-md">
            Please configure your schedule and ingredients in the planner first.
          </p>
          <Link href="/plan" className="bg-primary text-[#ffffff] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[#2e7d32] transition-colors">
            Go to Planner
          </Link>
        </div>
      </div>
    );
  }

  // Fallback checklist if the model missed generating it
  const checklist = activePlan.cookingChecklist && activePlan.cookingChecklist.length > 0
    ? activePlan.cookingChecklist
    : [
        { id: "1", task: "Rinse and chop all vegetables (tomatoes, onions, greens).", isDone: false },
        { id: "2", task: "Preheat cooking pans and organize required spices and herbs.", isDone: false },
        { id: "3", task: "Prepare breakfast ingredients (whisk eggs or smash avocado).", isDone: false },
        { id: "4", task: "Boil quinoa or rice for lunch bowl preparations.", isDone: false },
        { id: "5", task: "Sear or roast dinner proteins (salmon, chicken, or tofu alternative).", isDone: false }
      ];

  // Fallback timeline if the model missed generating it
  const timeline = activePlan.cookingTimeline && activePlan.cookingTimeline.length > 0
    ? activePlan.cookingTimeline
    : [
        { time: "08:00 AM", task: "Inventory Check", description: "Verify all shopping list ingredients are present on the kitchen counter." },
        { time: "08:10 AM", task: "Prep Breakfast", description: "Prepare avocado, slice tomatoes, toast slices, and plate breakfast." },
        { time: "12:30 PM", task: "Boil Quinoa & Roast Sweet Potatoes", description: "Start cooking grains and roast vegetables for the lunch bowl." },
        { time: "01:00 PM", task: "Assemble & Eat Lunch", description: "Toss ingredients with dressing and serve lunch fresh." },
        { time: "07:00 PM", task: "Dinner Prep & Sear Salmon", description: "Sear dinner proteins, steam greens, boil wild rice, and garnish." },
      ];

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-[#121315] transition-colors duration-200">
      
      {/* TopNavBar */}
      <header className="bg-surface dark:bg-[#1f2022] shadow-sm sticky top-0 z-50 transition-colors">
        <div className="flex justify-between items-center w-full px-container-margin-mobile md:px-container-margin-desktop max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-md">
            <Link 
              href="/results" 
              className="p-2 rounded-full hover:bg-surface-variant dark:hover:bg-[#2f3131] transition-colors text-on-surface"
              aria-label="Go Back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div className="text-xl font-bold text-primary dark:text-[#a3f69c] tracking-tight">CookFlow AI</div>
          </div>
          
          <div className="flex items-center gap-md">
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
            <Link href="/" className="bg-[#f3f3f3] dark:bg-[#2f3131] text-[#1a1c1c] dark:text-[#ffffff] px-6 py-2 rounded-full font-semibold text-sm hover:bg-[#eeeeee]/70 transition-colors border border-outline-variant/30">
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-container-margin-mobile md:px-container-margin-desktop py-xl">
        <div className="mb-xl text-center md:text-left">
          <h1 className="text-[28px] md:text-[32px] font-bold text-on-surface dark:text-[#ffffff] mb-sm">
            Prep Timeline & Checklist
          </h1>
          <p className="text-sm md:text-[16px] text-on-surface-variant dark:text-[#bfcaba]">
            Chronological cooking flow and interactive task checklist scaled for {activePreferences.people} servings.
          </p>
        </div>

        {/* Dynamic Timeline/Checklist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          
          {/* Chronological Prep Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-md">
            <div className="flex items-center gap-xs border-b border-[#f3f3f3] pb-xs">
              <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">schedule</span>
              <h3 className="font-bold text-lg text-on-surface dark:text-[#ffffff]">Chronological Timeline</h3>
            </div>
            <TimelineCard timeline={timeline} />
          </div>

          {/* Interactive Cooking Checklist */}
          <div className="lg:col-span-5 flex flex-col gap-md">
            <div className="flex items-center gap-xs border-b border-[#f3f3f3] pb-xs">
              <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">checklist</span>
              <h3 className="font-bold text-lg text-on-surface dark:text-[#ffffff]">Kitchen Tasks Checklist</h3>
            </div>
            <ChecklistCard initialTasks={checklist} />
          </div>

        </div>
      </main>
    </div>
  );
}
