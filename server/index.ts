import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import type { Preferences, TripResult, TripApiResponse } from "../shared/types";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api/plan-trip", async (req, res) => {
  try {
    const { preferences } = req.body as { preferences?: Preferences };

    if (!preferences || typeof preferences !== "object") {
      const errorResponse: TripApiResponse = {
        success: false,
        error: "Preferences are required in JSON format",
      };
      return res.status(400).json(errorResponse);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful travel planner. Always respond in strict JSON with keys: destination (string: suggested destination based on Preferences), highlights (array of 2 to 4 strings: places to visit or activities to do), season (string: the best season to visit this destination)."
},
        {
          role: "user",
          content: `Plan a trip based on these preferences:\n${JSON.stringify(
            preferences,
            null,
            2
          )}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      const errorResponse: TripApiResponse = {
        success: false,
        error: "No content returned from OpenAI",
      };
      return res.status(500).json(errorResponse);
    }

    const trip: TripResult = JSON.parse(content);

    const successResponse: TripApiResponse = { success: true, data: trip };
    return res.json(successResponse);
  } catch (err: any) {
    console.error("Backend error:", err);

    if (err.response?.status) {
      const errorResponse: TripApiResponse = {
        success: false,
        error: err.response.data?.error?.message || "OpenAI API error",
      };
      return res.status(err.response.status).json(errorResponse);
    }

    const errorResponse: TripApiResponse = {
      success: false,
      error:
        "Could not get trip plan from ChatGPT. Check API key and backend logs.",
    };
    return res.status(500).json(errorResponse);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
