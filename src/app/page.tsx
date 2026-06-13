"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f9f9f9] dark:bg-[#121315] text-[#1a1c1c] dark:text-[#e3e2e5] transition-colors duration-200">
      {/* TopNavBar */}
      <nav className="bg-[#ffffff] dark:bg-[#1f2022] shadow-sm sticky top-0 z-50 transition-colors">
        <div className="flex justify-between items-center w-full px-4 md:px-6 max-w-7xl mx-auto h-16">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined fill text-primary dark:text-[#a3f69c] text-[32px]">restaurant_menu</span>
            <span className="text-xl font-bold text-primary dark:text-[#a3f69c] tracking-tight">CookFlow AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a className="text-[#40493d] dark:text-[#bfcaba] font-medium text-sm hover:text-primary dark:hover:text-[#a3f69c] transition-colors duration-200" href="#features">Features</a>
            <a className="text-[#40493d] dark:text-[#bfcaba] font-medium text-sm hover:text-primary dark:hover:text-[#a3f69c] transition-colors duration-200" href="#about">About</a>
            <a className="text-[#40493d] dark:text-[#bfcaba] font-medium text-sm hover:text-primary dark:hover:text-[#a3f69c] transition-colors duration-200" href="#pricing">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-[#eeeeee] dark:hover:bg-[#292a2c] transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[#40493d] dark:text-[#bfcaba]">
                {isDark ? "light_mode" : "dark_mode"}
              </span>
            </button>
            <button className="hidden md:block font-semibold text-sm text-primary dark:text-[#a3f69c] hover:bg-[#cbffc2]/20 px-4 py-2 rounded-full transition-colors">
              Sign In
            </button>
            <Link href="/plan" className="bg-primary text-[#ffffff] font-semibold text-sm px-6 py-2 rounded-full hover:bg-[#2e7d32] transition-colors shadow-sm">
              Plan Now
            </Link>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 px-4 md:px-6 overflow-hidden bg-[#ffffff] dark:bg-[#0d0e10] transition-colors">
          <div className="absolute inset-0 bg-pattern opacity-10 pointer-events-none"></div>
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="flex flex-col gap-6 items-start">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#bdefbe] dark:bg-[#2e7d32]/30 text-[#426e47] dark:text-[#cbffc2] font-semibold text-xs">
                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                <span>Meet your new AI Sous Chef</span>
              </div>
              <h1 className="text-5xl md:text-[64px] md:leading-[72px] font-extrabold text-[#1a1c1c] dark:text-[#ffffff] tracking-tight">
                Smart Meals,<br />
                <span className="text-primary dark:text-[#a3f69c]">Zero Stress.</span>
              </h1>
              <p className="text-[#40493d] dark:text-[#bfcaba] max-w-lg text-lg">
                AI-powered meal planning tailored to your budget, schedule, and taste. Spend less time planning and more time enjoying delicious, healthy food.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                <Link href="/plan" className="bg-primary text-[#ffffff] font-semibold px-8 py-4 rounded-full hover:bg-[#2e7d32] transition-colors shadow-sm flex items-center justify-center gap-2 text-lg w-full sm:w-auto">
                  Plan My Meals
                  <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
                <button className="bg-[#f9f9f9] dark:bg-[#1f2022] text-primary dark:text-[#a3f69c] font-semibold px-8 py-4 rounded-full border border-[#bfcaba] hover:bg-[#eeeeee] dark:hover:bg-[#292a2c] transition-colors flex items-center justify-center gap-2 text-lg w-full sm:w-auto">
                  <span className="material-symbols-outlined">play_circle</span>
                  Watch Demo
                </button>
              </div>
            </div>
            
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden shadow-sm border border-[#bfcaba]/30 bg-[#eeeeee] dark:bg-[#2f3131]">
              <img 
                alt="Hero Image" 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrc_BC8MjxafEqfANuxWfYZh3AdLPTE0IIc6bW9skSA_rqOiOH9a78y7XcSoUdt-RHGPtxzO9sZeLYbBLDi0IKOLUxcLQ0XreUP27g0cMlx4-NqR8e7-hjHQMmXf9Hs4unH-2MH7Z62Khs3R6TSwyJD-3aI0X-1pAW1UM7NyVYycRaRlavl5jdiR7HJcOwmTwsnqLRP1IyakiEJEAopHHN1nrXnUsWKFRmKqgzkFaOQhHcqeRcGIS7XLp00iqEcspNwx9ALLrVlQ"
              />
              {/* Floating UI Element */}
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-72 bg-[#ffffff]/90 dark:bg-[#1f2022]/90 backdrop-blur-md rounded-2xl p-4 shadow-sm border border-[#bfcaba]/50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#cbffc2] dark:bg-[#2e7d32] flex items-center justify-center text-[#cbffc2] shrink-0">
                  <span className="material-symbols-outlined text-[#0d631b] dark:text-[#cbffc2]">check_circle</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#40493d] dark:text-[#bfcaba]">Weekly Plan Ready</p>
                  <p className="font-semibold text-[#1a1c1c] dark:text-[#ffffff] text-[16px]">Saved 2.5 hours!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section id="features" className="py-24 px-4 md:px-6 bg-[#f9f9f9] dark:bg-[#1b1c1e] transition-colors">
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-12">
            <div className="text-center max-w-2xl mx-auto flex flex-col gap-2">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">Everything you need to cook smarter</h2>
              <p className="text-[#40493d] dark:text-[#bfcaba]">Our AI analyzes your preferences to create a seamless cooking experience from planning to plating.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Feature 1: AI Meal Planning */}
              <div className="lg:col-span-2 bg-[#ffffff] dark:bg-[#1a1c1c] rounded-2xl p-8 border border-[#bfcaba]/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow flex flex-col justify-between overflow-hidden relative group">
                <div className="relative z-10 flex flex-col gap-4 max-w-md">
                  <div className="w-14 h-14 rounded-2xl bg-[#cbffc2]/45 dark:bg-[#2e7d32]/30 flex items-center justify-center text-primary dark:text-[#a3f69c] mb-2">
                    <span className="material-symbols-outlined text-[28px]">calendar_month</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">AI Meal Planning</h3>
                  <p className="text-sm text-[#40493d] dark:text-[#bfcaba]">Personalised weekly schedules that adapt to your dietary needs, fitness goals, and busy lifestyle. Just tell us what you like, and we'll handle the rest.</p>
                </div>
                <div className="mt-8 relative h-48 -mx-8 -mb-8 bg-[#eeeeee] rounded-t-2xl border-t border-[#bfcaba]/30 overflow-hidden">
                  <img 
                    alt="Meal Prep" 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEGZSZyM1POFLtZXjyUGnQiS8_2VrBYsw3Cba5p0Gb6jG-gvoDhPu8FfeEsK-r2LKSn1pQ3sPulilnPr4FTcs3jJ0SQFGu7sa_mejgM8-gPerMLrp_vZdbHHb6U170Jiv57-iesX55H7B4IDHdtB6nptkGZY7mbznmpqEmxPJT-jJt2TX2IpROQ-PDz6ZYqfP6zDCxU4wUcc_ISAEQVUDFoW7yWlT4j-XrxD9J4x7_9F1b7mSMhhHdI4J4Xtvx_QrWHt9UGnDrFg"
                  />
                </div>
              </div>

              {/* Feature 2: Grocery List */}
              <div className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-2xl p-8 border border-[#bfcaba]/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#cbffc2]/45 dark:bg-[#2e7d32]/30 flex items-center justify-center text-primary dark:text-[#a3f69c] mb-2">
                  <span className="material-symbols-outlined text-[28px]">shopping_cart</span>
                </div>
                <h3 className="text-[22px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">Grocery List Generator</h3>
                <p className="text-sm text-[#40493d] dark:text-[#bfcaba] flex-grow">Automated shopping lists categorized by aisle. We combine ingredients from your weekly plan to ensure zero waste and faster shopping trips.</p>
                <ul className="flex flex-col gap-2 mt-4 border-t border-[#bfcaba]/30 pt-4">
                  <li className="flex items-center gap-2 text-sm text-[#40493d] dark:text-[#bfcaba]"><span className="material-symbols-outlined text-primary dark:text-[#a3f69c] text-[18px]">check</span> Auto-categorization</li>
                  <li className="flex items-center gap-2 text-sm text-[#40493d] dark:text-[#bfcaba]"><span className="material-symbols-outlined text-primary dark:text-[#a3f69c] text-[18px]">check</span> Pantry integration</li>
                </ul>
              </div>

              {/* Feature 3: Budget Analysis */}
              <div className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-2xl p-8 border border-[#bfcaba]/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow flex flex-col gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#cbffc2]/45 dark:bg-[#2e7d32]/30 flex items-center justify-center text-primary dark:text-[#a3f69c] mb-2">
                  <span className="material-symbols-outlined text-[28px]">savings</span>
                </div>
                <h3 className="text-[22px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">Budget Analysis</h3>
                <p className="text-sm text-[#40493d] dark:text-[#bfcaba]">Stay within your daily spending goals. Our AI optimizes recipes to use seasonal, cost-effective ingredients without sacrificing flavor or nutrition.</p>
                <div className="mt-auto pt-4">
                  <div className="w-full bg-[#eeeeee] dark:bg-[#2f3131] rounded-full h-2 mb-2">
                    <div className="bg-primary dark:bg-[#a3f69c] h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-[#40493d] dark:text-[#bfcaba] font-semibold">
                    <span>Weekly Goal: ₹1000</span>
                    <span>₹250 left</span>
                  </div>
                </div>
              </div>

              {/* Feature 4: Smart Substitutions */}
              <div className="lg:col-span-2 bg-[#ffffff] dark:bg-[#1a1c1c] rounded-2xl p-8 border border-[#bfcaba]/50 shadow-[0_1px_3px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-8 items-center">
                <div className="flex-1 flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#cbffc2]/45 dark:bg-[#2e7d32]/30 flex items-center justify-center text-primary dark:text-[#a3f69c] mb-2">
                    <span className="material-symbols-outlined text-[28px]">swap_horiz</span>
                  </div>
                  <h3 className="text-[22px] font-bold text-[#1a1c1c] dark:text-[#ffffff]">Smart Substitutions</h3>
                  <p className="text-sm text-[#40493d] dark:text-[#bfcaba]">Missing an ingredient? Our AI suggests perfect swaps based on what's already in your pantry, considering flavor profiles and dietary restrictions.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-3 py-1 bg-[#f3f3f3] dark:bg-[#2f3131] text-on-surface dark:text-[#ffffff] text-xs rounded-full font-semibold">Gluten-Free Swaps</span>
                    <span className="px-3 py-1 bg-[#f3f3f3] dark:bg-[#2f3131] text-on-surface dark:text-[#ffffff] text-xs rounded-full font-semibold">Vegan Alternatives</span>
                    <span className="px-3 py-1 bg-[#f3f3f3] dark:bg-[#2f3131] text-on-surface dark:text-[#ffffff] text-xs rounded-full font-semibold">Spice Replacements</span>
                  </div>
                </div>
                <div className="w-full sm:w-64 h-48 rounded-2xl overflow-hidden shadow-sm shrink-0 border border-[#bfcaba]/30">
                  <img 
                    alt="Pantry Ingredients" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-it6YuIVrylvFqFhXs9u_PEf7175i_3eWBRnhnL4tUyjin_-Vborx5sARZKed1O13xwhiX6R8LLMt2FJgYrQ_SJJiTPJBWeBo1rvlG17tU-kmI5qmdLoBhm5P7gxOvt1UxBGCMbNYyM7Tqyc3NUtgRMvmhI7ipEcbS1u7p7dGcHPnq3_cIQOmEkNhOpgZgDMCmlxFbh0f5S3R1js1JaGs5XMlk14x-FlR5UAtTPcvLDSzoIDyLeHVjB688TdV2r7nlqEyuWM7yQ"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface dark:bg-[#121315] border-t border-outline-variant dark:border-outline py-8 transition-colors">
        <div className="w-full px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
          <span className="text-md font-bold text-on-surface dark:text-[#bfcaba] tracking-tight">CookFlow AI</span>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <a className="text-[#40493d] dark:text-[#bfcaba] text-xs hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="text-[#40493d] dark:text-[#bfcaba] text-xs hover:text-primary hover:underline transition-all" href="#">Terms of Service</a>
            <a className="text-[#40493d] dark:text-[#bfcaba] text-xs hover:text-primary hover:underline transition-all" href="#">Help Center</a>
            <a className="text-[#40493d] dark:text-[#bfcaba] text-xs hover:text-primary hover:underline transition-all" href="#">Contact Us</a>
          </div>
          <span className="text-xs text-[#40493d] dark:text-[#bfcaba]">&copy; 2026 CookFlow AI. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
