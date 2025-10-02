import { expect, type Locator, type Page } from "@playwright/test";
import { TEST_IDS } from "../../shared/testIds";
import type { Preferences, TripResult } from "../../shared/types";
import { validateTripPlan } from "../utils/aiValidator";

export class TripPlannerPage {
  readonly page: Page;
  readonly appTitle: Locator;
  readonly tripFormTitle: Locator;
  readonly tripFormInputPreferences: Locator;
  readonly tripFormInputBudget: Locator;
  readonly tripFormInputCompanions: Locator;
  readonly tripFormInputClimate: Locator;
  readonly tripFormInputDuration: Locator;
  readonly tripFormSubmitButton: Locator;
  readonly tripLoadingMessage: Locator;
  readonly tripResultError: Locator;
  readonly tripResultDestination: Locator;
  readonly tripResultHighlightsListItem: Locator;
  readonly tripResultBestSeason: Locator;

  constructor(page: Page) {
    this.page = page;
    this.appTitle = this.page.getByTestId(TEST_IDS.app.title);
    this.tripFormTitle = this.page.getByTestId(TEST_IDS.form.title);
    this.tripFormInputPreferences = this.page.getByTestId(
      TEST_IDS.form.inputs.preference
    );
    this.tripFormInputBudget = this.page.getByTestId(
      TEST_IDS.form.inputs.budget
    );
    this.tripFormInputCompanions = this.page.getByTestId(
      TEST_IDS.form.inputs.companions
    );
    this.tripFormInputClimate = this.page.getByTestId(
      TEST_IDS.form.inputs.climate
    );
    this.tripFormInputDuration = this.page.getByTestId(
      TEST_IDS.form.inputs.duration
    );
    this.tripFormSubmitButton = this.page.getByTestId(TEST_IDS.form.submit);
    this.tripLoadingMessage = this.page.getByTestId(TEST_IDS.loading.message);
    this.tripResultError = this.page.getByTestId(TEST_IDS.result.error);
    this.tripResultDestination = this.page.getByTestId(
      TEST_IDS.result.destination
    );
    this.tripResultHighlightsListItem = this.page.getByTestId(
      TEST_IDS.result.highlightsListItem
    );
    this.tripResultBestSeason = this.page.getByTestId(
      TEST_IDS.result.bestSeason
    );
  }

  async goto() {
    await this.page.goto("/");
  }

  async fillTripFormInputPreferences(preferences: string) {
    await this.tripFormInputPreferences.fill(preferences);
  }

  async fillTripFormInputBudget(budget: string) {
    await this.tripFormInputBudget.fill(budget);
  }

  async fillTripFormInputCompanions(companions: string) {
    await this.tripFormInputCompanions.fill(companions);
  }

  async fillTripFormInputClimate(climate: string) {
    await this.tripFormInputClimate.fill(climate);
  }

  async fillTripFormInputDuration(duration: string) {
    await this.tripFormInputDuration.fill(duration);
  }

  async clickOnSubmitButton() {
    await this.tripFormSubmitButton.click();
  }

  async fillPreferences(prefs: Preferences) {
    await this.fillTripFormInputPreferences(prefs.preference);
    await this.fillTripFormInputBudget(prefs.budget);
    await this.fillTripFormInputCompanions(prefs.companions);
    await this.fillTripFormInputClimate(prefs.climate);
    await this.fillTripFormInputDuration(prefs.duration);
  }

  async getTripResult(): Promise<TripResult> {
    const destination =
      (await this.tripResultDestination.textContent())?.trim() || "";
    const season =
      (await this.tripResultBestSeason.textContent())?.trim() || "";

    const highlights = await this.tripResultHighlightsListItem.allInnerTexts();
    const cleanedHighlights = highlights.map((h) => h.trim()).filter(Boolean);

    return {
      destination,
      highlights: cleanedHighlights,
      season,
    };
  }

  async assertDestinationIsNotEmpty() {
    await expect(this.tripResultDestination).toHaveText(/.+/);
  }

  async assertBestSeasonIsNotEmpty() {
    await expect(this.tripResultBestSeason).toHaveText(/.+/);
  }

  async assertNumberOfHighlightsInRange(min: number = 2, max: number = 4) {
    const highlights = await this.tripResultHighlightsListItem.allInnerTexts();
    expect(highlights.length).toBeGreaterThanOrEqual(min);
    expect(highlights.length).toBeLessThanOrEqual(max);
  }

  async assertResultIsValid(
    prefs: Preferences,
    tripResult: TripResult,
    expectFailure = false
  ) {
    const result = await validateTripPlan(prefs, tripResult);

    if (expectFailure) {
      expect(
        result.pass,
        `Expected failure but validation passed. Reason: ${result.reason || "N/A"}`
      ).toBeFalsy();
    } else {
      expect(
        result.pass,
        `Validation failed. Reason: ${result.reason || "N/A"}`
      ).toBeTruthy();
    }
  }
}
