/**
 * Score history.
 *
 * The old build did `localStorage.setItem(mode, ...)`, which kept exactly one
 * result per level and threw away everything before it — so "progress" could
 * never show progress. Runs are now appended to a capped history per level.
 */

export const STORAGE_KEY = "typmasta.history.v1";
const MAX_RUNS_PER_LEVEL = 100;

export function emptyHistory() {
  return { begin: [], adv: [], pro: [] };
}

/**
 * Append a run and return the new history. Pure, so it composes with setState.
 */
export function addRun(history, levelId, run) {
  const existing = history?.[levelId] ?? [];
  const entry = {
    at: run.at ?? Date.now(),
    wpm: round(run.wpm, 1),
    raw: round(run.raw, 1),
    accuracy: round(run.accuracy, 1),
    consistency: round(run.consistency, 1),
    durationMs: Math.round(run.durationMs ?? 0),
    chars: run.chars ?? 0,
    errors: run.errors ?? 0,
  };

  return {
    ...emptyHistory(),
    ...history,
    [levelId]: [...existing, entry].slice(-MAX_RUNS_PER_LEVEL),
  };
}

/**
 * Aggregate stats for one level's run list.
 */
export function summarise(runs = []) {
  if (runs.length === 0) {
    return {
      runs: 0,
      bestWpm: 0,
      avgWpm: 0,
      lastWpm: 0,
      avgAccuracy: 0,
      bestAccuracy: 0,
      totalTimeMs: 0,
      totalChars: 0,
      trend: 0,
    };
  }

  const wpms = runs.map((r) => r.wpm);
  const accs = runs.map((r) => r.accuracy);

  return {
    runs: runs.length,
    bestWpm: Math.max(...wpms),
    avgWpm: round(mean(wpms), 1),
    lastWpm: wpms[wpms.length - 1],
    avgAccuracy: round(mean(accs), 1),
    bestAccuracy: Math.max(...accs),
    totalTimeMs: runs.reduce((sum, r) => sum + r.durationMs, 0),
    totalChars: runs.reduce((sum, r) => sum + r.chars, 0),
    trend: trendOf(wpms),
  };
}

/**
 * Change in WPM between the first and second half of recent runs. Positive
 * means improving. Needs at least four runs to say anything useful.
 */
function trendOf(wpms) {
  const recent = wpms.slice(-10);
  if (recent.length < 4) return 0;
  const mid = Math.floor(recent.length / 2);
  return round(mean(recent.slice(mid)) - mean(recent.slice(0, mid)), 1);
}

/**
 * Overall stats across every level.
 */
export function summariseAll(history) {
  const all = Object.values(history ?? {}).flat();
  const summary = summarise(all);
  return { ...summary, levels: Object.keys(history ?? {}).length };
}

function mean(numbers) {
  return numbers.reduce((a, b) => a + b, 0) / numbers.length;
}

function round(value, places = 0) {
  if (!Number.isFinite(value)) return 0;
  const factor = 10 ** places;
  return Math.round(value * factor) / factor;
}
