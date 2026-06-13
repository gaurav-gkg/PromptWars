import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { schedule, budget, currency, dietary, pantry, people } = body;

    // Validate inputs locally for security
    if (!schedule || !budget || !currency || !dietary || !people) {
      return NextResponse.json({ error: "Missing required fields in request body." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        error: "Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables." 
      }, { status: 500 });
    }

    // Single GenAI request enforcing structured JSON
    const prompt = `You are an expert AI Sous Chef. Create a detailed daily meal plan for ${people} people.
    Preferences:
    - Prep time schedule: ${schedule} (busy = meals must require under 20 mins prep, moderate = 30-45 mins prep, relaxed = 1hr+ cooking/prep time)
    - Budget limit: ${currency} ${budget}
    - Dietary preference/filters: ${dietary.join(", ")}
    - Available pantry ingredients to reuse: ${pantry.join(", ")}
    
    You must output a structured JSON response matching the following TypeScript interface:
    {
      "breakfast": {
        "name": string,
        "description": string,
        "ingredients": string[],
        "preparationTime": number, // in minutes
        "cookingSteps": string[],
        "calories": number,
        "protein": number, // in grams
        "carbs": number, // in grams
        "fat": number, // in grams
        "dietaryTag": string
      },
      "lunch": {
        "name": string,
        "description": string,
        "ingredients": string[],
        "preparationTime": number, // in minutes
        "cookingSteps": string[],
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "dietaryTag": string
      },
      "dinner": {
        "name": string,
        "description": string,
        "ingredients": string[],
        "preparationTime": number, // in minutes
        "cookingSteps": string[],
        "calories": number,
        "protein": number,
        "carbs": number,
        "fat": number,
        "dietaryTag": string
      },
      "groceryList": { "name": string, "quantity": string, "isAvailable": boolean }[],
      "substitutions": { "original": string, "alternative": string }[],
      "estimatedCost": { "total": number, "currency": string },
      "budgetAnalysis": { "status": string, "savingsSuggestions": string[] },
      "cookingTimeline": { "time": string, "task": string, "description": string }[],
      "cookingChecklist": { "id": string, "task": string, "isDone": boolean }[],
      "pantryOptimizer": { "reusedIngredients": string[], "costReductionPercentage": number },
      "leftoverReuse": { "mealName": string, "description": string }[],
      "nutritionSummary": { "calories": number, "protein": number, "carbs": number, "fat": number }
    }

    Rules:
    1. Try to reuse ingredients specified in the pantry list to reduce grocery costs. Mark items in groceryList as isAvailable: true if they are in the pantry. Otherwise mark isAvailable: false.
    2. Substitutions should specify how to replace missing ingredients with alternative options.
    3. estimatedCost.total must be a realistic estimate for the missing ingredients (isAvailable: false).
    4. budgetAnalysis.status must be "On Track" if estimatedCost.total <= budget, or "Over Budget" if it exceeds the budget. Provide actionable savingsSuggestions in budgetAnalysis.
    5. cookingTimeline must present an ordered chronological sequence of prep tasks from morning to dinner serving (e.g. 8:00 AM - Check ingredients, 8:05 AM - Prep veggies, etc.)
    6. cookingChecklist should contain atomic cooking tasks that the user can check off in the kitchen.
    7. nutritionSummary must be the sum of breakfast, lunch, and dinner.
    8. Return ONLY valid raw JSON. No markdown wrappers.
    `;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "OBJECT",
            properties: {
              breakfast: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  description: { type: "STRING" },
                  ingredients: { type: "ARRAY", items: { type: "STRING" } },
                  preparationTime: { type: "INTEGER" },
                  cookingSteps: { type: "ARRAY", items: { type: "STRING" } },
                  calories: { type: "INTEGER" },
                  protein: { type: "INTEGER" },
                  carbs: { type: "INTEGER" },
                  fat: { type: "INTEGER" },
                  dietaryTag: { type: "STRING" }
                },
                required: ["name", "description", "ingredients", "preparationTime", "cookingSteps", "calories", "protein", "carbs", "fat", "dietaryTag"]
              },
              lunch: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  description: { type: "STRING" },
                  ingredients: { type: "ARRAY", items: { type: "STRING" } },
                  preparationTime: { type: "INTEGER" },
                  cookingSteps: { type: "ARRAY", items: { type: "STRING" } },
                  calories: { type: "INTEGER" },
                  protein: { type: "INTEGER" },
                  carbs: { type: "INTEGER" },
                  fat: { type: "INTEGER" },
                  dietaryTag: { type: "STRING" }
                },
                required: ["name", "description", "ingredients", "preparationTime", "cookingSteps", "calories", "protein", "carbs", "fat", "dietaryTag"]
              },
              dinner: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING" },
                  description: { type: "STRING" },
                  ingredients: { type: "ARRAY", items: { type: "STRING" } },
                  preparationTime: { type: "INTEGER" },
                  cookingSteps: { type: "ARRAY", items: { type: "STRING" } },
                  calories: { type: "INTEGER" },
                  protein: { type: "INTEGER" },
                  carbs: { type: "INTEGER" },
                  fat: { type: "INTEGER" },
                  dietaryTag: { type: "STRING" }
                },
                required: ["name", "description", "ingredients", "preparationTime", "cookingSteps", "calories", "protein", "carbs", "fat", "dietaryTag"]
              },
              groceryList: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    name: { type: "STRING" },
                    quantity: { type: "STRING" },
                    isAvailable: { type: "BOOLEAN" }
                  },
                  required: ["name", "quantity", "isAvailable"]
                }
              },
              substitutions: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    original: { type: "STRING" },
                    alternative: { type: "STRING" }
                  },
                  required: ["original", "alternative"]
                }
              },
              estimatedCost: {
                type: "OBJECT",
                properties: {
                  total: { type: "INTEGER" },
                  currency: { type: "STRING" }
                },
                required: ["total", "currency"]
              },
              budgetAnalysis: {
                type: "OBJECT",
                properties: {
                  status: { type: "STRING" },
                  savingsSuggestions: { type: "ARRAY", items: { type: "STRING" } }
                },
                required: ["status", "savingsSuggestions"]
              },
              cookingTimeline: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    time: { type: "STRING" },
                    task: { type: "STRING" },
                    description: { type: "STRING" }
                  },
                  required: ["time", "task", "description"]
                }
              },
              cookingChecklist: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    id: { type: "STRING" },
                    task: { type: "STRING" },
                    isDone: { type: "BOOLEAN" }
                  },
                  required: ["id", "task", "isDone"]
                }
              },
              pantryOptimizer: {
                type: "OBJECT",
                properties: {
                  reusedIngredients: { type: "ARRAY", items: { type: "STRING" } },
                  costReductionPercentage: { type: "INTEGER" }
                },
                required: ["reusedIngredients", "costReductionPercentage"]
              },
              leftoverReuse: {
                type: "ARRAY",
                items: {
                  type: "OBJECT",
                  properties: {
                    mealName: { type: "STRING" },
                    description: { type: "STRING" }
                  },
                  required: ["mealName", "description"]
                }
              },
              nutritionSummary: {
                type: "OBJECT",
                properties: {
                  calories: { type: "INTEGER" },
                  protein: { type: "INTEGER" },
                  carbs: { type: "INTEGER" },
                  fat: { type: "INTEGER" }
                },
                required: ["calories", "protein", "carbs", "fat"]
              }
            },
            required: [
              "breakfast", "lunch", "dinner", "groceryList", "substitutions", 
              "estimatedCost", "budgetAnalysis", "cookingTimeline", "cookingChecklist", 
              "pantryOptimizer", "leftoverReuse", "nutritionSummary"
            ]
          }
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Gemini API error: ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!responseText) {
      return NextResponse.json({ error: "Empty response from Gemini." }, { status: 500 });
    }

    // Sanitize any extra spacing and parse
    const cleanText = responseText.trim();
    const parsedJson = JSON.parse(cleanText);

    return NextResponse.json(parsedJson);

  } catch (error: any) {
    console.error("Error in api/generate:", error);
    return NextResponse.json({ error: error.message || "Failed to generate plan." }, { status: 500 });
  }
}
