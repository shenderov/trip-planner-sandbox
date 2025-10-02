export const TEST_IDS = {
  app: {
    title: "app-title",
  },
  form: {
    container: "trip-form",
    title: "trip-form-title",
    submit: "trip-form-submit",
    inputs: {
      preference: "trip-form-input-preference",
      budget: "trip-form-input-budget",
      companions: "trip-form-input-companions",
      climate: "trip-form-input-climate",
      duration: "trip-form-input-duration",
    } as const,
  },
  loading: {
    message: "trip-loading",
  },
  result: {
    container: "trip-result-container",
    error: "trip-result-error",
    destination: "trip-result-destination",
    highlightsSection: "trip-result-highlights-section",
    highlightsSubtitle: "trip-result-highlights-subtitle",
    highlightsList: "trip-result-highlights-list",
    highlightsListItem: "trip-result-highlights-list-item",
    noHighlights: "trip-result-no-highlights",
    seasonSection: "trip-result-season-section",
    seasonSubtitle: "trip-result-season-subtitle",
    bestSeason: "trip-result-season-value",
  },
};