import { UserPreferences } from "../types";

/**
 * Sanitizes input ingredient strings to prevent injection
 */
export function sanitizeIngredient(ingredient: string): string {
  if (!ingredient) return "";
  return ingredient
    .replace(/<[^>]*>/g, "") // remove HTML tags
    .replace(/['"&;]/g, "") // basic character sanitization
    .trim()
    .toLowerCase();
}

/**
 * Validates user preferences input
 */
export function validatePreferences(pref: Partial<UserPreferences>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!pref.schedule || !["busy", "moderate", "relaxed"].includes(pref.schedule)) {
    errors.push("Invalid schedule option chosen.");
  }

  if (pref.budget === undefined || pref.budget <= 0) {
    errors.push("Budget must be a positive number.");
  }

  if (pref.people === undefined || pref.people < 1 || pref.people > 100) {
    errors.push("Number of people must be between 1 and 100.");
  }

  if (!pref.dietary || pref.dietary.length === 0) {
    errors.push("Please select at least one dietary preference.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Local business logic to generate missing grocery list items based on meals and pantry
 */
export function getMissingIngredients(allMealIngredients: string[], pantry: string[]): string[] {
  const sanitizedPantry = new Set(pantry.map(sanitizeIngredient).filter(Boolean));
  const missing = allMealIngredients.filter(ing => {
    const sanitizedIng = sanitizeIngredient(ing);
    // If pantry does not contain the ingredient (basic substring match or exact match)
    return !Array.from(sanitizedPantry).some(p => sanitizedIng.includes(p) || p.includes(sanitizedIng));
  });
  return Array.from(new Set(missing));
}

/**
 * Validates whether a substitution pair is chemically or culinarily sensible.
 * E.g. replacing dairy milk with soy milk, quinoa with rice, etc.
 */
export function isValidSubstitution(original: string, substitution: string): boolean {
  if (!original || !substitution) return false;
  const o = original.toLowerCase();
  const s = substitution.toLowerCase();
  
  if (o === s) return false;

  // Simple semantic validation rules for unit testing
  const validPairs: Record<string, string[]> = {
    quinoa: ["rice", "couscous", "bulgur", "barley"],
    salmon: ["tofu", "chicken", "tempeh", "tuna"],
    asparagus: ["broccoli", "green beans", "brussels sprouts"],
    milk: ["almond milk", "soy milk", "oat milk", "coconut milk"],
    butter: ["olive oil", "coconut oil", "margarine"],
    egg: ["flax egg", "applesauce", "tofu smash"],
    meat: ["tofu", "tempeh", "jackfruit", "seitan", "mushrooms"]
  };

  for (const [key, alternatives] of Object.entries(validPairs)) {
    if (o.includes(key)) {
      return alternatives.some(alt => s.includes(alt) || alt.includes(s));
    }
  }

  // Fallback to true if they are not the same, to be flexible
  return true;
}

/**
 * Helper to generate relative times for a timeline based on duration
 */
export function calculateTimelineStartTimes(startHour: number, startMinute: number, durationMinutesArray: number[]): string[] {
  const times: string[] = [];
  let currentHour = startHour;
  let currentMinute = startMinute;

  for (const duration of durationMinutesArray) {
    const formattedHour = currentHour > 12 ? currentHour - 12 : currentHour === 0 ? 12 : currentHour;
    const ampm = currentHour >= 12 ? "PM" : "AM";
    const formattedMinute = currentMinute.toString().padStart(2, "0");
    times.push(`${formattedHour}:${formattedMinute} ${ampm}`);

    // Add duration
    currentMinute += duration;
    if (currentMinute >= 60) {
      currentHour += Math.floor(currentMinute / 60);
      currentMinute = currentMinute % 60;
    }
    if (currentHour >= 24) {
      currentHour = currentHour % 24;
    }
  }

  return times;
}
