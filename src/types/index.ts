export interface Meal {
  name: string;
  description: string;
  ingredients: string[];
  preparationTime: number; // in minutes
  cookingSteps: string[];
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  dietaryTag: string; // e.g. "Vegetarian", "Vegan", "High Protein", "Gluten-Free"
}

export interface GroceryItem {
  name: string;
  quantity: string;
  isAvailable: boolean;
}

export interface Substitution {
  original: string;
  alternative: string;
}

export interface EstimatedCost {
  total: number;
  currency: string;
}

export interface BudgetAnalysis {
  status: string; // e.g. "On Track" or "Over Budget"
  savingsSuggestions: string[];
}

export interface TimelineEvent {
  time: string; // e.g. "8:00 AM" or "18:00"
  task: string;
  description: string;
}

export interface ChecklistItem {
  id: string;
  task: string;
  isDone: boolean;
}

export interface PantryOptimizer {
  reusedIngredients: string[];
  costReductionPercentage: number;
}

export interface LeftoverSuggestion {
  mealName: string;
  description: string;
}

export interface NutritionSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CookingPlanResponse {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  groceryList: GroceryItem[];
  substitutions: Substitution[];
  estimatedCost: EstimatedCost;
  budgetAnalysis: BudgetAnalysis;
  cookingTimeline: TimelineEvent[];
  cookingChecklist: ChecklistItem[];
  pantryOptimizer: PantryOptimizer;
  leftoverReuse: LeftoverSuggestion[];
  nutritionSummary: NutritionSummary;
}

export interface UserPreferences {
  schedule: "busy" | "moderate" | "relaxed";
  budget: number;
  currency: string;
  dietary: string[];
  pantry: string[];
  people: number;
}
