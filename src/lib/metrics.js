/**
 * Typing metrics.
 *
 * The standard definition of a "word" for typing speed is 5 characters,
 * including spaces. Using actual whitespace-delimited words makes the score
 * depend on vocabulary rather than on typing, so every scoring system worth
 * comparing against uses the 5-character convention.
 */

export const CHARS_PER_WORD = 5;

/**
 * Gross WPM: everything typed, mistakes included.
 */
export function grossWpm(charsTyped, elapsedMs) {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return charsTyped / CHARS_PER_WORD / minutes;
}

/**
 * Net WPM: the number that actually gets reported. Only correct characters
 * count toward speed, so hammering keys at random cannot inflate it.
 */
export function netWpm(correctChars, elapsedMs) {
  if (elapsedMs <= 0) return 0;
  const minutes = elapsedMs / 60000;
  return correctChars / CHARS_PER_WORD / minutes;
}

/**
 * Accuracy over the whole attempt, counting every keystroke ever pressed —
 * not just the characters still in the buffer. A character typed wrong and
 * then backspaced still happened, and still costs accuracy.
 */
export function accuracyPct(correctKeystrokes, totalKeystrokes) {
  if (totalKeystrokes <= 0) return 100;
  return (correctKeystrokes / totalKeystrokes) * 100;
}

/**
 * Consistency: how even the typing rhythm was, as a percentage. Derived from
 * the coefficient of variation of per-character intervals, so a steady typist
 * scores high even if they are slow.
 */
export function consistencyPct(intervals) {
  const usable = intervals.filter((ms) => ms > 0 && ms < 3000);
  if (usable.length < 2) return 0;

  const mean = usable.reduce((a, b) => a + b, 0) / usable.length;
  if (mean === 0) return 0;

  const variance =
    usable.reduce((sum, ms) => sum + (ms - mean) ** 2, 0) / usable.length;
  const cv = Math.sqrt(variance) / mean;

  return Math.max(0, Math.min(100, (1 - cv) * 100));
}

/**
 * mm:ss for a duration in milliseconds.
 */
export function formatDuration(ms) {
  const total = Math.max(0, Math.round(ms / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
