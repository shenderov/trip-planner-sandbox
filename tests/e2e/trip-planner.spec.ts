import { test, expect } from "@playwright/test";
import { TripPlannerPage } from "../pages/trip-planner.page";
import { validInputs, nonsensicalInputs, confusingInputs, forgedTripResults, trickyInputs } from "../data/tripPreferences";

test.describe("Trip Planner - Valid Inputs", () => {
  for (const prefs of validInputs) {
    test(`should generate a valid trip plan for ${JSON.stringify(prefs)}`, async ({ page }) => {
      const plannerPage = new TripPlannerPage(page);
      await plannerPage.goto();
      await plannerPage.fillPreferences(prefs);
      await plannerPage.clickOnSubmitButton();

      // Expect: destination exists
      await plannerPage.assertDestinationIsNotEmpty();
      // Expect: highlights 2–4 items
      await plannerPage.assertNumberOfHighlightsInRange();
      // Expect: season text present
      await plannerPage.assertBestSeasonIsNotEmpty();
      // Assert validity of result using AI
      await plannerPage.assertResultIsValid(prefs, await plannerPage.getTripResult());
    });
  }
});

test.describe("Trip Planner - Nonsensical Inputs", () => {
  for (const prefs of nonsensicalInputs) {
    test(`should handle nonsensical input gracefully: ${JSON.stringify(prefs)}`, async ({ page }) => {
      const plannerPage = new TripPlannerPage(page);
      await plannerPage.goto();

      await plannerPage.fillPreferences(prefs);
      await plannerPage.clickOnSubmitButton();

      // Expect: destination exists
      await plannerPage.assertDestinationIsNotEmpty();
      // Expect: highlights 2–4 items
      await plannerPage.assertNumberOfHighlightsInRange();
      // Expect: season text present
      await plannerPage.assertBestSeasonIsNotEmpty();
      // Assert validity of result using AI - expecting failures
      await plannerPage.assertResultIsValid(prefs, await plannerPage.getTripResult(), true);
    });
  }
});

test.describe("Trip Planner - Confusing Inputs", () => {
  for (const prefs of confusingInputs) {
    test(`confusing input: ${JSON.stringify(prefs)}`, async ({ page }) => {
      const plannerPage = new TripPlannerPage(page);
      await plannerPage.goto();

      await plannerPage.fillPreferences(prefs);
      await plannerPage.clickOnSubmitButton();

      // Expect: destination exists
      await plannerPage.assertDestinationIsNotEmpty();
      // Expect: highlights 2–4 items
      await plannerPage.assertNumberOfHighlightsInRange();
      // Expect: season text present
      await plannerPage.assertBestSeasonIsNotEmpty();
      // Assert validity of result using AI - confusing requests expected to fail
      await plannerPage.assertResultIsValid(prefs, await plannerPage.getTripResult(), true);
    });
  }
});

test.describe("AI Validator - Forged Responses", () => {
  for (const plan of forgedTripResults) {
    test(`forged TripResult: ${JSON.stringify(plan)}`, async ({ page }) => {
      const prefs = validInputs[0]!;
      const plannerPage = new TripPlannerPage(page);
      // All forged requests expected to fail
      await plannerPage.assertResultIsValid(prefs, plan, true);
    });
  }
});

test.describe("Trip Planner - Tricky Inputs", () => {
  for (const prefs of trickyInputs) {
    test(`tricky input: ${JSON.stringify(prefs)}`, async ({ page }) => {
      const plannerPage = new TripPlannerPage(page);
      await plannerPage.goto();

      await plannerPage.fillPreferences(prefs);
      await plannerPage.clickOnSubmitButton();

      // Expect: destination exists
      await plannerPage.assertDestinationIsNotEmpty();
      // Expect: highlights 2–4 items
      await plannerPage.assertNumberOfHighlightsInRange();
      // Expect: season text present
      await plannerPage.assertBestSeasonIsNotEmpty();
      // Assert validity of result using AI - confusing requests expected to fail
      await plannerPage.assertResultIsValid(prefs, await plannerPage.getTripResult(), true);
    });
  }
});