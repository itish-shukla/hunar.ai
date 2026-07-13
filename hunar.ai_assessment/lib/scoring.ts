import { TIMES, type Day, type RedialInterval } from "./constants";

// Penalty dictionaries — from "FE assignment - penalty dictionary.xlsx".
// score = 100 + sum of the four penalties (each ≤ 0), floored at 0.
const REDIAL_COUNT_PENALTY: Record<number, number> = {
  0: -100, 1: -90, 2: -55, 3: -31, 4: -13, 5: 0, 6: 0, 7: 0, 8: -19, 9: -43, 10: -76,
};
const INTERVAL_PENALTY: Record<RedialInterval, number> = {
  "3 hours": 0, "6 hours": 0, "9 hours": -12, "12 hours": -22, "24 hours": -34,
};
// Keyed by number of selected days. The dictionary starts at 1; 0 days means
// the campaign can't call at all, so we treat it as the worst defined penalty.
const DAYS_PENALTY: Record<number, number> = {
  0: -40, 1: -40, 2: -30, 3: -20, 4: -10, 5: 0, 6: 0, 7: 0,
};
// Keyed by window duration in hours. 8–13h → 0; under 3h clamps to the worst.
const WINDOW_PENALTY: Record<number, number> = {
  3: -33, 4: -26, 5: -20, 6: -13, 7: -7,
};

export type Level = 1 | 2 | 3 | 4;

export type CampaignSettings = {
  selectedDays: readonly Day[];
  /** [startIndex, endIndex] into TIMES */
  callingWindow: [number, number];
  redialCount: number;
  redialInterval: RedialInterval;
};

export type Penalties = {
  callingDays: number;
  callingWindow: number;
  redialCount: number;
  redialInterval: number;
  total: number;
};

export type ScoreResult = {
  penalties: Penalties;
  score: number;
  level: Level;
  windowHours: number;
};

function windowPenaltyFor(hours: number): number {
  if (hours >= 8) return 0;
  return WINDOW_PENALTY[hours] ?? -33;
}

// score → weather level (1 best … 4 worst)
export function scoreToLevel(score: number): Level {
  if (score >= 82) return 1;
  if (score >= 62) return 2;
  if (score >= 42) return 3;
  return 4;
}

export function computeScore(settings: CampaignSettings): ScoreResult {
  const { selectedDays, callingWindow, redialCount, redialInterval } = settings;

  const windowHours =
    TIMES[callingWindow[1]].value - TIMES[callingWindow[0]].value;

  const callingDays = DAYS_PENALTY[selectedDays.length] ?? 0;
  const window = windowPenaltyFor(windowHours);
  const redial = REDIAL_COUNT_PENALTY[redialCount] ?? 0;
  const interval = INTERVAL_PENALTY[redialInterval] ?? 0;
  const total = callingDays + window + redial + interval;

  const score = Math.max(0, 100 + total);

  return {
    penalties: {
      callingDays,
      callingWindow: window,
      redialCount: redial,
      redialInterval: interval,
      total,
    },
    score,
    level: scoreToLevel(score),
    windowHours,
  };
}
