"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPreferences, CookingPlanResponse } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { sanitizeIngredient, validatePreferences } from "../../utils/validator";

export default function PlanWizard() {
  const router = useRouter();
  
  // Local state for the multi-step wizard
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Preferences state
  const [schedule, setSchedule] = useState<"busy" | "moderate" | "relaxed">("busy");
  const [budget, setBudget] = useState<number>(1000);
  const [currency, setCurrency] = useState<string>("₹");
  const [dietary, setDietary] = useState<string[]>(["Non-Vegetarian"]);
  const [pantryInput, setPantryInput] = useState("");
  const [pantryList, setPantryList] = useState<string[]>(["Tomatoes", "Onions"]);
  const [people, setPeople] = useState<number>(2);

  // loading state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Persisted plan response in local storage
  const [persistedPlan, setPersistedPlan] = useLocalStorage<CookingPlanResponse | null>("cookflow_active_plan", null);
  const [persistedPreferences, setPersistedPreferences] = useLocalStorage<UserPreferences | null>("cookflow_active_preferences", null);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  // Handle chips selection
  const toggleDietary = (pref: string) => {
    if (dietary.includes(pref)) {
      setDietary(prev => prev.filter(p => p !== pref));
    } else {
      setDietary(prev => [...prev, pref]);
    }
  };

  // Add pantry item
  const handlePantryEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const sanitized = sanitizeIngredient(pantryInput);
      if (sanitized && !pantryList.includes(sanitized)) {
        setPantryList(prev => [...prev, sanitized]);
        setPantryInput("");
      }
    }
  };

  const removePantryItem = (item: string) => {
    setPantryList(prev => prev.filter(p => p !== item));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      generatePlan();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Generate cooking plan API call
  const generatePlan = async () => {
    const prefs: UserPreferences = {
      schedule,
      budget,
      currency,
      dietary,
      pantry: pantryList,
      people,
    };

    // Run input validation
    const { valid, errors } = validatePreferences(prefs);
    if (!valid) {
      setErrorMsg(errors.join(" "));
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prefs),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to contact cooking service.");
      }

      const planData: CookingPlanResponse = await response.json();

      // Persist plan data and preferences locally
      setPersistedPlan(planData);
      setPersistedPreferences(prefs);

      // Redirect to results dashboard
      router.push("/results");

    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-md md:p-xl bg-background dark:bg-[#121315] transition-colors duration-200">
      
      {/* Dark Mode toggle upper right */}
      <div className="absolute top-md right-md">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-2 rounded-full hover:bg-surface-container dark:hover:bg-surface-container-high transition-colors"
          aria-label="Toggle dark mode"
        >
          <span className="material-symbols-outlined text-on-surface-variant dark:text-[#bfcaba]">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
      </div>

      {isLoading ? (
        /* Loading Card */
        <div className="w-full max-w-xl bg-surface-container-lowest dark:bg-[#1f2022] rounded-[24px] border border-outline-variant shadow-md p-2xl text-center flex flex-col items-center justify-center min-h-[400px]">
          <span className="material-symbols-outlined text-[64px] text-primary dark:text-[#a3f69c] animate-spin mb-lg">
            progress_activity
          </span>
          <h2 className="text-2xl font-bold text-on-surface dark:text-[#ffffff] mb-sm">CookFlow AI is Cooking</h2>
          <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] max-w-md">
            Analyzing your pantry, estimating cost feasibility, adjusting prep times, and constructing a detailed cooking schedule...
          </p>
        </div>
      ) : (
        /* Wizard Form Card */
        <main className="w-full max-w-2xl bg-surface-container-lowest dark:bg-[#1f2022] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 overflow-hidden flex flex-col min-h-[600px] relative transition-colors">
          {/* Header & Progress */}
          <header className="p-xl border-b border-surface-variant dark:border-[#bfcaba]/20 flex-shrink-0">
            <div className="flex items-center justify-between mb-lg">
              <h1 className="text-2xl font-bold text-on-surface dark:text-[#ffffff] flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary dark:text-[#a3f69c]">restaurant_menu</span>
                Plan Your Meals
              </h1>
              <span className="text-sm font-semibold text-primary dark:text-[#a3f69c] bg-[#cbffc2]/30 dark:bg-[#2e7d32]/20 px-3 py-1 rounded-full">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#eeeeee] dark:bg-[#2f3131] rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary dark:bg-[#a3f69c] transition-all duration-300 ease-out" 
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </header>

          {/* Form Content Area */}
          <div className="flex-grow p-xl relative">
            {errorMsg && (
              <div className="mb-md p-sm bg-[#ffdad6] dark:bg-[#93000a]/20 border border-[#ba1a1a]/20 rounded-xl text-xs text-[#ba1a1a] dark:text-[#ffdad6] font-semibold flex items-center gap-xs">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {errorMsg}
              </div>
            )}

            {/* Step 1: Day Schedule */}
            {currentStep === 1 && (
              <section className="animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-bold mb-xs text-on-surface dark:text-[#ffffff]">How's your day looking?</h2>
                <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-xl">We'll adjust meal preparation times to match your schedule.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                  {/* Busy Card */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="schedule" 
                      value="busy"
                      checked={schedule === "busy"}
                      onChange={() => setSchedule("busy")}
                      className="peer sr-only" 
                    />
                    <div className="h-full border border-outline-variant dark:border-[#bfcaba]/30 rounded-xl p-md flex flex-col items-center justify-center text-center peer-checked:border-primary dark:peer-checked:border-[#a3f69c] peer-checked:bg-[#cbffc2]/10 dark:peer-checked:bg-[#2e7d32]/10 transition-all hover:bg-[#f3f3f3]/50 dark:hover:bg-[#2f3131]/30">
                      <span className="material-symbols-outlined text-[48px] text-[#707a6c] dark:text-[#bfcaba] mb-sm peer-checked:text-primary group-hover:text-primary dark:group-hover:text-[#a3f69c] transition-colors">
                        timer
                      </span>
                      <span className="font-semibold text-sm text-[#1a1c1c] dark:text-[#ffffff] mb-xs">Very Busy</span>
                      <span className="text-xs text-[#40493d] dark:text-[#bfcaba]">Under 20 mins prep</span>
                    </div>
                  </label>
                  
                  {/* Moderate Card */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="schedule" 
                      value="moderate"
                      checked={schedule === "moderate"}
                      onChange={() => setSchedule("moderate")}
                      className="peer sr-only" 
                    />
                    <div className="h-full border border-outline-variant dark:border-[#bfcaba]/30 rounded-xl p-md flex flex-col items-center justify-center text-center peer-checked:border-primary dark:peer-checked:border-[#a3f69c] peer-checked:bg-[#cbffc2]/10 dark:peer-checked:bg-[#2e7d32]/10 transition-all hover:bg-[#f3f3f3]/50 dark:hover:bg-[#2f3131]/30">
                      <span className="material-symbols-outlined text-[48px] text-[#707a6c] dark:text-[#bfcaba] mb-sm peer-checked:text-primary group-hover:text-primary dark:group-hover:text-[#a3f69c] transition-colors">
                        restaurant
                      </span>
                      <span className="font-semibold text-sm text-[#1a1c1c] dark:text-[#ffffff] mb-xs">Moderate</span>
                      <span className="text-xs text-[#40493d] dark:text-[#bfcaba]">30-45 mins prep</span>
                    </div>
                  </label>

                  {/* Relaxed Card */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="schedule" 
                      value="relaxed"
                      checked={schedule === "relaxed"}
                      onChange={() => setSchedule("relaxed")}
                      className="peer sr-only" 
                    />
                    <div className="h-full border border-outline-variant dark:border-[#bfcaba]/30 rounded-xl p-md flex flex-col items-center justify-center text-center peer-checked:border-primary dark:peer-checked:border-[#a3f69c] peer-checked:bg-[#cbffc2]/10 dark:peer-checked:bg-[#2e7d32]/10 transition-all hover:bg-[#f3f3f3]/50 dark:hover:bg-[#2f3131]/30">
                      <span className="material-symbols-outlined text-[48px] text-[#707a6c] dark:text-[#bfcaba] mb-sm peer-checked:text-primary group-hover:text-primary dark:group-hover:text-[#a3f69c] transition-colors">
                        weekend
                      </span>
                      <span className="font-semibold text-sm text-[#1a1c1c] dark:text-[#ffffff] mb-xs">Relaxed</span>
                      <span className="text-xs text-[#40493d] dark:text-[#bfcaba]">1hr+ cooking time</span>
                    </div>
                  </label>
                </div>
              </section>
            )}

            {/* Step 2: Budget Slider */}
            {currentStep === 2 && (
              <section className="animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-bold mb-xs text-on-surface dark:text-[#ffffff]">Set your budget limit</h2>
                <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-xl">Grocery plans will stay within this spending threshold.</p>
                <div className="bg-[#f3f3f3]/60 dark:bg-[#2f3131]/40 rounded-xl p-xl flex flex-col items-center justify-center min-h-[220px]">
                  
                  {/* Currency Selection */}
                  <div className="flex gap-sm mb-md bg-[#ffffff] dark:bg-[#1a1c1c] p-1 rounded-full border border-outline-variant/30">
                    {["₹", "$", "€", "£"].map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => setCurrency(curr)}
                        className={`w-8 h-8 rounded-full text-sm font-bold transition-all ${
                          currency === curr 
                            ? "bg-primary text-[#ffffff]" 
                            : "text-[#40493d] dark:text-[#bfcaba] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]"
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>

                  <div className="text-5xl font-extrabold text-primary dark:text-[#a3f69c] mb-lg select-none">
                    {currency} {budget}
                  </div>
                  
                  <div className="w-full relative px-sm">
                    <input 
                      type="range" 
                      min="100" 
                      max="3000" 
                      step="50"
                      value={budget}
                      onChange={(e) => setBudget(Number(e.target.value))}
                      className="w-full h-2 bg-[#eeeeee] dark:bg-[#2f3131] rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                    <div className="flex justify-between w-full mt-sm text-xs font-semibold text-on-surface-variant dark:text-[#bfcaba]">
                      <span>{currency} 100</span>
                      <span>{currency} 3000</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Step 3: Dietary Preferences */}
            {currentStep === 3 && (
              <section className="animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-bold mb-xs text-on-surface dark:text-[#ffffff]">Any dietary preferences?</h2>
                <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-xl">Select filters to tailor your meal plan recipes.</p>
                <div className="flex flex-wrap gap-md">
                  {["Vegetarian", "Vegan", "Non-Vegetarian", "High Protein", "Gluten-Free"].map((pref) => {
                    const isSelected = dietary.includes(pref);
                    return (
                      <button
                        key={pref}
                        type="button"
                        onClick={() => toggleDietary(pref)}
                        className={`text-sm font-semibold px-5 py-2.5 rounded-full border transition-all cursor-pointer select-none flex items-center gap-2 ${
                          isSelected 
                            ? "bg-[#cbffc2]/30 text-primary border-primary dark:bg-[#2e7d32]/25 dark:text-[#a3f69c] dark:border-[#a3f69c]" 
                            : "border-outline-variant dark:border-[#bfcaba]/30 text-on-surface-variant dark:text-[#bfcaba] hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131]"
                        }`}
                      >
                        {isSelected && (
                          <span className="material-symbols-outlined text-[16px] fill">check</span>
                        )}
                        {pref}
                      </button>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Step 4: Pantry Ingredients */}
            {currentStep === 4 && (
              <section className="animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-bold mb-xs text-on-surface dark:text-[#ffffff]">What's in your pantry?</h2>
                <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-xl">Add available ingredients to minimize grocery costs.</p>
                <div className="w-full">
                  <div className="relative mb-md">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-[#bfcaba] text-[20px]">
                      search
                    </span>
                    <input 
                      type="text" 
                      value={pantryInput}
                      onChange={(e) => setPantryInput(e.target.value)}
                      onKeyDown={handlePantryEnter}
                      placeholder="Type ingredient and press Enter..." 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface-container-lowest dark:bg-[#1a1c1c] text-sm text-[#1a1c1c] dark:text-[#ffffff] outline-none transition-all"
                    />
                  </div>
                  
                  {/* Tag Chips Area */}
                  <div className="flex flex-wrap gap-sm p-md bg-[#f3f3f3]/60 dark:bg-[#2f3131]/30 rounded-xl min-h-[140px] border border-surface-variant dark:border-[#bfcaba]/20">
                    {pantryList.map((item) => (
                      <div 
                        key={item} 
                        className="inline-flex items-center gap-1 bg-[#ffffff] dark:bg-[#1a1c1c] border border-outline-variant/30 px-3 py-1.5 rounded-md text-xs font-semibold text-on-surface"
                      >
                        <span>{item}</span>
                        <button 
                          type="button" 
                          onClick={() => removePantryItem(item)}
                          className="text-on-surface-variant dark:text-[#bfcaba] hover:text-[#ba1a1a] dark:hover:text-[#ffb4ab] transition-colors flex items-center justify-center"
                        >
                          <span className="material-symbols-outlined text-[16px]">close</span>
                        </button>
                      </div>
                    ))}
                    {pantryList.length === 0 && (
                      <span className="text-xs text-[#707a6c] dark:text-[#bfcaba] italic p-sm self-center">Pantry is empty. Start typing to add items!</span>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Step 5: Number of People Stepper */}
            {currentStep === 5 && (
              <section className="animate-[fadeIn_0.2s_ease-out]">
                <h2 className="text-xl font-bold mb-xs text-on-surface dark:text-[#ffffff]">How many people are dining?</h2>
                <p className="text-sm text-on-surface-variant dark:text-[#bfcaba] mb-xl">We'll scale the recipes and portions to match your table count.</p>
                <div className="flex flex-col items-center justify-center min-h-[220px] bg-[#f3f3f3]/60 dark:bg-[#2f3131]/40 rounded-xl border border-surface-variant dark:border-[#bfcaba]/20">
                  <span className="material-symbols-outlined text-[48px] text-primary dark:text-[#a3f69c] mb-md">
                    groups
                  </span>
                  <div className="flex items-center gap-xl">
                    {/* Decrement */}
                    <button 
                      type="button" 
                      onClick={() => setPeople(prev => Math.max(1, prev - 1))}
                      className="w-12 h-12 rounded-full bg-[#ffffff] dark:bg-[#1a1c1c] flex items-center justify-center text-on-surface hover:bg-[#f3f3f3] dark:hover:bg-[#2f3131] transition-colors shadow-sm border border-outline-variant/30"
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    
                    {/* Value */}
                    <div className="w-16 text-center select-none">
                      <span className="text-4xl font-extrabold text-on-surface dark:text-[#ffffff] transition-all">
                        {people}
                      </span>
                    </div>

                    {/* Increment */}
                    <button 
                      type="button" 
                      onClick={() => setPeople(prev => Math.min(20, prev + 1))}
                      className="w-12 h-12 rounded-full bg-primary text-[#ffffff] flex items-center justify-center hover:bg-[#2e7d32] transition-colors shadow-sm"
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Navigation Footer */}
          <footer className="p-xl border-t border-surface-variant dark:border-[#bfcaba]/20 bg-surface dark:bg-[#1b1c1e] flex items-center justify-between flex-shrink-0 transition-colors">
            <button 
              type="button" 
              onClick={handleBack}
              className={`font-semibold text-sm px-6 py-2.5 rounded-full text-primary dark:text-[#a3f69c] hover:bg-primary-container/10 dark:hover:bg-[#cbffc2]/10 transition-colors ${
                currentStep === 1 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              Back
            </button>
            <button 
              type="button" 
              onClick={handleNext}
              className="font-semibold text-sm px-8 py-2.5 rounded-full bg-primary text-[#ffffff] hover:bg-[#2e7d32] transition-colors shadow-[0_2px_4px_rgba(13,99,27,0.15)] ml-auto"
            >
              {currentStep === totalSteps ? "Generate Plan" : "Next"}
            </button>
          </footer>
        </main>
      )}
    </div>
  );
}
