"use client";

import { useState } from "react";
import { TimelineEvent } from "../types";

interface TimelineCardProps {
  timeline: TimelineEvent[];
}

export function TimelineCard({ timeline }: TimelineCardProps) {
  const [completedIds, setCompletedIds] = useState<Record<number, boolean>>({});

  const toggleEvent = (idx: number) => {
    setCompletedIds(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] border border-[#bfcaba]/40 shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-md md:p-xl relative overflow-hidden">
      {/* Background structural line */}
      <div className="absolute left-[31px] top-[32px] bottom-[32px] w-[2px] bg-[#eeeeee] dark:bg-[#2f3131] hidden sm:block z-0" />

      <div className="space-y-lg relative z-10">
        {timeline.map((event, idx) => {
          const isDone = completedIds[idx] || false;
          // The active event is the first one that is NOT done
          const isActive = !isDone && (idx === 0 || completedIds[idx - 1] === true);

          return (
            <div 
              key={idx} 
              onClick={() => toggleEvent(idx)}
              className="flex items-start gap-md cursor-pointer group"
            >
              {/* Timeline Indicator Badge */}
              <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-[#ffffff] dark:bg-[#1a1c1c] rounded-full z-10">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full border-2 border-[#0d631b] dark:border-[#a3f69c] bg-[#0d631b] dark:bg-[#a3f69c] transition-colors flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-white dark:text-[#1a1c1c]">check</span>
                  </div>
                ) : isActive ? (
                  <div className="w-6 h-6 rounded-full border-4 border-[#0d631b] dark:border-[#a3f69c] bg-[#ffffff] dark:bg-[#1a1c1c] transition-colors flex items-center justify-center shadow-[0_0_0_4px_rgba(13,99,27,0.1)]" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#707a6c] dark:border-[#bfcaba] bg-[#ffffff] dark:bg-[#1a1c1c] transition-colors flex items-center justify-center group-hover:border-[#0d631b]" />
                )}
              </div>

              {/* Event details */}
              <div className="flex-grow pt-1 border-b border-[#f3f3f3]/60 pb-md">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-xs">
                  <div>
                    <h4 className={`font-semibold text-lg transition-all ${
                      isDone ? "line-through text-[#707a6c] dark:text-[#bfcaba]/60" : "text-[#1a1c1c] dark:text-[#ffffff]"
                    }`}>
                      {event.task}
                    </h4>
                    <p className={`text-sm transition-all mt-xs ${
                      isDone ? "text-[#707a6c]/80 dark:text-[#bfcaba]/40" : "text-[#40493d] dark:text-[#bfcaba]"
                    }`}>
                      {event.description}
                    </p>
                  </div>
                  <div className={`font-medium text-xs px-sm py-xs rounded-md whitespace-nowrap transition-all ${
                    isDone 
                      ? "text-[#707a6c] bg-[#f3f3f3] dark:bg-[#2f3131]" 
                      : isActive 
                        ? "text-[#0d631b] bg-[#cbffc2]/30 dark:bg-[#2e7d32]/20 font-bold flex items-center gap-1"
                        : "text-[#40493d] bg-[#f3f3f3] dark:bg-[#2f3131]"
                  }`}>
                    {isActive && (
                      <span className="material-symbols-outlined text-[14px]">notifications_active</span>
                    )}
                    {event.time}
                  </div>
                </div>

                {/* Chef's tip for active element */}
                {isActive && idx === 2 && (
                  <div className="mt-md bg-[#cbffc2]/10 dark:bg-[#2e7d32]/10 rounded-lg p-md border border-[#0d631b]/20">
                    <div className="flex items-center gap-sm mb-sm text-[#0d631b] dark:text-[#a3f69c]">
                      <span className="material-symbols-outlined text-[18px]">tips_and_updates</span>
                      <span className="font-semibold text-xs">Chef's Glazing Tip</span>
                    </div>
                    <p className="text-xs text-[#40493d] dark:text-[#bfcaba]">
                      Reserve 2 tablespoons of glaze ingredients beforehand. Avoid raw contamination for final brushing.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
