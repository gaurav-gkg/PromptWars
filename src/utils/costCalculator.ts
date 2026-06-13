/**
 * Utility functions for budget calculations in CookFlow AI
 */

/**
 * Calculates remaining budget amount
 */
export function calculateRemainingBudget(limit: number, totalCost: number): number {
  if (limit < 0 || totalCost < 0) return 0;
  return Math.max(0, limit - totalCost);
}

/**
 * Checks if the estimated cost is within the budget limit
 */
export function isBudgetFeasible(limit: number, totalCost: number): boolean {
  if (limit <= 0 || totalCost < 0) return false;
  return totalCost <= limit;
}

/**
 * Calculates estimated savings from using pantry items
 * @param reusedCount Number of ingredients reused from pantry
 * @param totalCount Total ingredients required for all meals
 */
export function calculateSavingsPercentage(reusedCount: number, totalCount: number): number {
  if (totalCount <= 0 || reusedCount < 0) return 0;
  const clampedReused = Math.min(reusedCount, totalCount);
  return Math.round((clampedReused / totalCount) * 100);
}
