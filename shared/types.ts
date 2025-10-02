// shared/types.ts

/** Preferences collected from the user via QuestionForm */
export type Preferences = {
  /** Travel style (beaches, mountains, cities, etc.) */
  preference: string;
  /** Expected budget (e.g. $500, low, medium, high) */
  budget: string;
  /** Travel companions (alone, partner, family, group) */
  companions: string;
  /** Preferred climate (hot, mild, cold) */
  climate: string;
  /** Planned travel duration (e.g. "1 week", "10 days") */
  duration: string;
};

/** Structured trip suggestion returned by the backend (from ChatGPT API) */
export type TripResult = {
  destination: string;
  highlights: string[];
  season: string;
};

/** Standardized API response shape */
export type TripApiResponse =
  | { success: true; data: TripResult }
  | { success: false; error: string };
