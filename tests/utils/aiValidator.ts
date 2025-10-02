import OpenAI from "openai";
import type { TripResult, Preferences } from "../../shared/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Validate a TripResult against user Preferences.
 * The validator ensures:
 * - Destination matches the preference
 * - Highlights make sense and are 2–4 items
 * - Season is reasonable as the best time to visit
 */
export async function validateTripPlan(
  prefs: Preferences,
  plan: TripResult
): Promise<{
  pass: boolean;
  reason?: string;
}> {
  const systemPrompt = `
You are an assistant that validates AI-generated trip plans.
Respond ONLY in strict JSON with the following keys:
- pass (boolean)
- reason (string: short explanation if not valid)
`;

  const userPrompt = `
Here are the travel preferences from the user:

${JSON.stringify(prefs, null, 2)}

Here is the generated trip plan:

${JSON.stringify(plan, null, 2)}

Validation Rules:
1. destination must be a real, plausible travel destination.
2. highlights must be 2–4 non-empty strings describing places or activities.
3. season must describe the best season or time to visit.
4. The trip plan must make sense given the preferences 
   (e.g., if user wants skiing, suggest a cold/mountain destination, not a desert).
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No validation response received from OpenAI");
  }

  return JSON.parse(content) as { pass: boolean; reason?: string };
}
