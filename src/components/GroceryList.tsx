"use client";

import { useState } from "react";
import { GroceryItem } from "../types";

interface GroceryListProps {
  initialItems: GroceryItem[];
}

export function GroceryList({ initialItems }: GroceryListProps) {
  const [items, setItems] = useState<GroceryItem[]>(initialItems);

  const toggleItem = (index: number) => {
    const updated = [...items];
    updated[index].isAvailable = !updated[index].isAvailable;
    setItems(updated);
  };

  const missingItems = items.filter(item => !item.isAvailable);
  const checkedItems = items.filter(item => item.isAvailable);

  return (
    <section className="bg-[#ffffff] dark:bg-[#1a1c1c] rounded-[24px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-[#bfcaba]/40 p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 border-b border-[#f3f3f3] pb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0d631b] dark:text-[#a3f69c]">shopping_basket</span>
          <h3 className="font-semibold text-[16px] text-[#1a1c1c] dark:text-[#ffffff]">Grocery Shopping List</h3>
        </div>
        <span className="text-[11px] font-semibold bg-[#0d631b]/10 text-[#0d631b] dark:text-[#a3f69c] py-0.5 px-2 rounded-full">
          {missingItems.length} items to buy
        </span>
      </div>

      <div className="flex-grow space-y-4">
        {/* Missing items list */}
        {missingItems.length > 0 ? (
          <div>
            <h4 className="font-semibold text-xs text-[#40493d] dark:text-[#bfcaba] uppercase tracking-wider mb-2">Ingredients Needed</h4>
            <ul className="space-y-2">
              {items.map((item, idx) => {
                if (item.isAvailable) return null;
                return (
                  <li key={idx} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      id={`grocery-${idx}`}
                      checked={item.isAvailable}
                      onChange={() => toggleItem(idx)}
                      className="rounded border-[#707a6c] text-[#0d631b] focus:ring-[#0d631b] w-4 h-4"
                    />
                    <label
                      htmlFor={`grocery-${idx}`}
                      className="font-medium text-sm text-[#1a1c1c] dark:text-[#ffffff] cursor-pointer flex-grow flex justify-between group-hover:text-[#0d631b] dark:group-hover:text-[#a3f69c] transition-colors"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs text-[#40493d] dark:text-[#bfcaba] font-normal">{item.quantity}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="text-center py-6">
            <span className="material-symbols-outlined text-[32px] text-[#0d631b] mb-2">check_circle</span>
            <p className="text-sm text-[#40493d] dark:text-[#bfcaba] font-medium">All ingredients in stock!</p>
          </div>
        )}

        {/* Checked/Available ingredients */}
        {checkedItems.length > 0 && (
          <div className="pt-2 border-t border-[#f3f3f3]/60">
            <h4 className="font-semibold text-xs text-[#707a6c] dark:text-[#bfcaba]/80 uppercase tracking-wider mb-2">Already in Pantry / Acquired</h4>
            <ul className="space-y-2">
              {items.map((item, idx) => {
                if (!item.isAvailable) return null;
                return (
                  <li key={idx} className="flex items-center gap-2 opacity-60">
                    <input
                      type="checkbox"
                      id={`grocery-${idx}`}
                      checked={item.isAvailable}
                      onChange={() => toggleItem(idx)}
                      className="rounded border-[#707a6c] text-[#0d631b] focus:ring-[#0d631b] w-4 h-4"
                    />
                    <label
                      htmlFor={`grocery-${idx}`}
                      className="font-medium text-sm text-[#707a6c] dark:text-[#bfcaba] line-through cursor-pointer flex-grow flex justify-between"
                    >
                      <span>{item.name}</span>
                      <span className="text-xs font-normal">{item.quantity}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
