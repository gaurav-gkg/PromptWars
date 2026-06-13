import { calculateRemainingBudget, isBudgetFeasible, calculateSavingsPercentage } from "./costCalculator";
import { sanitizeIngredient, validatePreferences, getMissingIngredients, isValidSubstitution, calculateTimelineStartTimes } from "./validator";

console.log("==================================================");
console.log("RUNNING COOKFLOW AI UNIT TESTS");
console.log("==================================================\n");

let passedTestsCount = 0;
let failedTestsCount = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTestsCount++;
  } else {
    console.error(`[FAIL] ${testName}`);
    failedTestsCount++;
  }
}

// 1. Budget Calculation Tests
console.log("--- Budget Calculation Tests ---");
assert(calculateRemainingBudget(1000, 450) === 550, "Remaining budget calculation for 1000 - 450 is 550");
assert(calculateRemainingBudget(500, 600) === 0, "Remaining budget handles over-budget values by clamping to 0");
assert(isBudgetFeasible(1000, 450) === true, "Budget feasibility check is true when within limit");
assert(isBudgetFeasible(500, 600) === false, "Budget feasibility check is false when exceeding limit");
assert(calculateSavingsPercentage(2, 10) === 20, "Reusing 2 of 10 items yields 20% savings");
assert(calculateSavingsPercentage(15, 10) === 100, "Clamps savings percentage to max 100%");

// 2. Grocery List Generation Tests
console.log("\n--- Grocery List Generation Tests ---");
const mealsIngs = ["Avocado", "Quinoa", "Jasmine Rice", "Salmon Fillet"];
const pantryIngs = ["rice", "avocado"];
const missing = getMissingIngredients(mealsIngs, pantryIngs);
assert(missing.length === 2, "Reuses pantry items and identifies 2 missing ingredients");
assert(missing.includes("Quinoa"), "Identifies Quinoa as missing");
assert(missing.includes("Salmon Fillet"), "Identifies Salmon Fillet as missing");
assert(!missing.includes("Avocado"), "Correctly filters out Avocado since it is in pantry");

// 3. Input Validation Tests
console.log("\n--- Input Validation & Sanitization Tests ---");
assert(sanitizeIngredient("  <script>Tomato</script>  ") === "tomato", "Sanitizes ingredient and removes HTML tags");
assert(sanitizeIngredient("Onions;") === "onions", "Sanitizes and removes semi-colons");

const validPrefs = {
  schedule: "busy" as const,
  budget: 1000,
  currency: "₹",
  dietary: ["Vegetarian"],
  pantry: ["Onions"],
  people: 2,
};
const validation1 = validatePreferences(validPrefs);
assert(validation1.valid === true, "Accepts valid user preference configs");

const invalidPrefs = {
  schedule: "overnight" as any, // invalid schedule
  budget: -50, // invalid budget
  people: 0, // invalid guest count
  dietary: [], // empty list
  pantry: [],
  currency: "₹",
};
const validation2 = validatePreferences(invalidPrefs);
assert(validation2.valid === false, "Rejects invalid user preferences");
assert(validation2.errors.length === 4, "Accurately identifies all 4 preference validation errors");

// 4. Timeline Generation Tests
console.log("\n--- Timeline Generation Tests ---");
const startTimes = calculateTimelineStartTimes(8, 0, [10, 15, 20]);
assert(startTimes[0] === "8:00 AM", "Timeline starts correctly at 8:00 AM");
assert(startTimes[1] === "8:10 AM", "Adds 10 mins offset for second timeline step");
assert(startTimes[2] === "8:25 AM", "Adds 15 mins offset for third timeline step");

// 5. Substitution Logic Tests
console.log("\n--- Ingredient Substitution Tests ---");
assert(isValidSubstitution("Quinoa", "Rice") === true, "Allows substituting Quinoa with Rice");
assert(isValidSubstitution("Salmon", "Tofu") === true, "Allows substituting Salmon with Tofu");
assert(isValidSubstitution("Milk", "Soy Milk") === true, "Allows substituting Milk with Soy Milk");
assert(isValidSubstitution("Asparagus", "Asparagus") === false, "Rejects substituting an ingredient with itself");

console.log("\n==================================================");
console.log(`TEST RESULTS: ${passedTestsCount} Passed, ${failedTestsCount} Failed`);
console.log("==================================================");

if (failedTestsCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
