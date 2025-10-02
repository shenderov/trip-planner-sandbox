import "./ResultView.css";
import type { TripResult } from "../../../shared/types";
import { TEST_IDS } from "../../../shared/testIds";

type Props = {
  result: TripResult | null;
  error?: string | null;
};

export const ResultView = ({ result, error }: Props) => {
  if (!result && !error) return null;

  if (error) {
    return (
      <div className="trip-result" data-testid={TEST_IDS.result.container}>
        <p className="trip-error" data-testid={TEST_IDS.result.error}>{error}</p>
      </div>
    );
  }

  return (
    <div className="trip-result" data-testid={TEST_IDS.result.container}>
      <header>
        <h2 className="trip-destination" data-testid={TEST_IDS.result.destination}>{result!.destination}</h2>
      </header>

      <section className="trip-section" data-testid={TEST_IDS.result.highlightsSection}>
        <h3 className="trip-subtitle" data-testid={TEST_IDS.result.highlightsSubtitle}>Highlights</h3>
        {result!.highlights.length > 0 ? (
          <ul className="trip-list" data-testid={TEST_IDS.result.highlightsList}>
            {result!.highlights.map((h, i) => (
              <li key={i} className="trip-list-item" data-testid={TEST_IDS.result.highlightsListItem}>
                {h}
              </li>
            ))}
          </ul>
        ) : (
          <p className="trip-text" data-testid={TEST_IDS.result.noHighlights}>No highlights provided.</p>
        )}
      </section>

      <section className="trip-section" data-testid={TEST_IDS.result.seasonSection}>
        <h3 className="trip-subtitle" data-testid={TEST_IDS.result.seasonSubtitle}>Best Season</h3>
        <p className="trip-text" data-testid={TEST_IDS.result.bestSeason}>{result!.season}</p>
      </section>
    </div>
  );
};
