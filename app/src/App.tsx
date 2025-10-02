import { useState } from "react";
import { QuestionForm } from "./components/QuestionForm";
import { ResultView } from "./components/ResultView";
import type {
  Preferences,
  TripApiResponse,
  TripResult,
} from "../../shared/types";
import "./App.css";
import { TEST_IDS } from "../../shared/testIds";

export const App = () => {
  const [result, setResult] = useState<TripResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (preferences: Preferences) => {
    try {
      setLoading(true);
      setResult(null);
      setError(null);

      const response = await fetch("http://localhost:3001/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const raw: TripApiResponse = await response.json();

      if (!raw.success) {
        throw new Error(raw.error || "Unknown backend error");
      }

      const data = raw.data;
      if (
        !data.destination ||
        !Array.isArray(data.highlights) ||
        !data.season
      ) {
        throw new Error("Invalid response shape");
      }

      setResult(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error fetching trip plan:", err.message);
      }
      setError(
        "We couldn’t contact the backend. Please ensure the server is running and the ChatGPT API key is set."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title" data-testid={TEST_IDS.app.title}>
        AI Trip Planner Sandbox
      </h1>
      <QuestionForm onSubmit={handleSubmit} />

      {loading && (
        <div
          className="trip-loading"
          role="status"
          aria-live="polite"
          data-testid={TEST_IDS.loading.message}
        >
          Planning your trip
          <span className="dots" aria-hidden="true">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>
      )}

      <ResultView result={error ? null : result} error={error} />
    </div>
  );
};
