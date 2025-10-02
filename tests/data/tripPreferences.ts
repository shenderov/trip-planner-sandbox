import type { Preferences, TripResult } from "../../shared/types";

export const validInputs: Preferences[] = [
  {
    preference: "beaches",
    budget: "$1,000",
    companions: "family",
    climate: "hot",
    duration: "7 days",
  },
  {
    preference: "mountains",
    budget: "moderate",
    companions: "alone",
    climate: "cold",
    duration: "2 weeks",
  },
  {
    preference: "cities",
    budget: "luxury",
    companions: "partner",
    climate: "mild",
    duration: "10 days",
  },
];

export const nonsensicalInputs: Preferences[] = [
  {
    preference: "skiing",
    budget: "high",
    companions: "family",
    climate: "hot", // skiing + hot climate → contradiction
    duration: "1 week",
  },
  {
    preference: "desert beaches",
    budget: "low",
    companions: "alone",
    climate: "snowy", // desert + snowy → nonsense
    duration: "3 days",
  },
  {
    preference: "underwater safari",
    budget: "moderate",
    companions: "friends",
    climate: "mild",
    duration: "2 weeks",
  },
];

export const confusingInputs: Preferences[] = [
  {
    preference: "mountains and beaches at the same time but no water",
    budget: "medium",
    companions: "partner",
    climate: "mild",
    duration: "1 week",
  },
  {
    preference: "climate must be both hot and cold",
    budget: "luxury",
    companions: "family",
    climate: "mixed",
    duration: "5 days",
  },
  {
    preference: "travel anywhere but Earth",
    budget: "infinite",
    companions: "alone",
    climate: "any",
    duration: "forever",
  },
];

export const forgedTripResults: TripResult[] = [
  { destination: "", highlights: [], season: "" },
  { destination: "Paris", highlights: ["Eiffel Tower"], season: "summer" },
  { destination: "Mars Colony", highlights: ["Spacewalk"], season: "always" },
  {
    destination: "Tokyo",
    highlights: Array(10).fill("Random"),
    season: "Spring",
  },
];

export const trickyInputs: Preferences[] = [
  {
    preference: "nightlife",
    budget: "trillion dollars",
    companions: "friends",
    climate: "warm",
    duration: "10 years",
  },
  {
    preference: "countryside",
    budget: "0",
    companions: "my cat",
    climate: "cold",
    duration: "half a day",
  },
  {
    preference: "Springfield",
    budget: "banana",
    companions: "42",
    climate: "triangular",
    duration: "forever and ever",
  },
  {
    preference: "🏖️",
    budget: "💸",
    companions: "AI assistant",
    climate: "❄️",
    duration: "7 days",
  },
];
