"use client";

import { useState } from "react";
import { ChecklistItem } from "../types";

interface ChecklistCardProps {
  initialTasks: ChecklistItem[];
}

export function ChecklistCard({ initialTasks }: ChecklistCardProps) {
  const [tasks, setTasks] = useState<ChecklistItem[]>(initialTasks);

  const toggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const completedCount = tasks.filter(t => t.isDone).length;
  const totalCount = tasks.length;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-4 md:p-8 flex flex-col gap-4">
      <div>
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">task_alt</span>
            <h3 className="font-semibold text-lg text-[#1a1c1c] dark:text-[#ffffff]">Actionable Cooking Checklist</h3>
          </div>
          <span className="text-xs font-semibold text-[#0d631b] dark:text-[#a3f69c] bg-[#cbffc2]/30 dark:bg-[#2e7d32]/20 px-3 py-1 rounded-full">
            {completedCount} of {totalCount} completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="w-full bg-[#eeeeee] dark:bg-[#2f3131] rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-[#0d631b] dark:bg-[#a3f69c] h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-[#40493d] dark:text-[#bfcaba] mt-1 font-medium">
            <span>Kitchen Progress</span>
            <span>{completionPercentage}% Done</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[#f3f3f3]/60 pt-4">
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li 
              key={task.id} 
              className={`flex items-start gap-2 p-2 rounded-lg hover:bg-[#f3f3f3]/40 dark:hover:bg-[#2f3131]/30 transition-colors cursor-pointer ${
                task.isDone ? "opacity-60" : ""
              }`}
              onClick={() => toggleTask(task.id)}
            >
              <input
                type="checkbox"
                id={`task-${task.id}`}
                checked={task.isDone}
                readOnly
                className="rounded border-[#707a6c] text-[#0d631b] focus:ring-[#0d631b] w-4 h-4 mt-0.5"
              />
              <span className={`text-sm text-[#1a1c1c] dark:text-[#ffffff] select-none flex-grow ${
                task.isDone ? "line-through text-[#707a6c] dark:text-[#bfcaba]" : ""
              }`}>
                {task.task}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
