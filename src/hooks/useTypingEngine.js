import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  accuracyPct,
  consistencyPct,
  grossWpm,
  netWpm,
} from "../lib/metrics";

const TICK_MS = 100;

/**
 * Drives a single typing attempt over `target`.
 *
 * The clock starts on the first keystroke, never on mount — a run you have not
 * started yet has no elapsed time, and starting the timer when the text renders
 * penalises anyone who pauses to read it.
 *
 * Returns per-character state for rendering, live metrics, and the keystroke
 * handler to feed from the input.
 */
export default function useTypingEngine(target, { onFinish } = {}) {
  const [typed, setTyped] = useState("");
  const [startedAt, setStartedAt] = useState(null);
  const [finishedAt, setFinishedAt] = useState(null);
  const [now, setNow] = useState(null);

  // Cumulative across the whole attempt, so backspaced errors still count.
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);

  // Per-character timings, for consistency and the WPM-over-time chart.
  const intervalsRef = useRef([]);
  const lastKeyAtRef = useRef(null);
  const samplesRef = useRef([]);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const isRunning = startedAt !== null && finishedAt === null;
  const isFinished = finishedAt !== null;

  const elapsedMs = useMemo(() => {
    if (startedAt === null) return 0;
    return (finishedAt ?? now ?? startedAt) - startedAt;
  }, [startedAt, finishedAt, now]);

  /* --- Ticker: only while a run is actually in flight. ------------------- */
  useEffect(() => {
    if (!isRunning) return undefined;
    const id = setInterval(() => setNow(Date.now()), TICK_MS);
    return () => clearInterval(id);
  }, [isRunning]);

  /* --- Live metrics ------------------------------------------------------ */
  const correctSoFar = useMemo(() => {
    let n = 0;
    for (let i = 0; i < typed.length; i += 1) {
      if (typed[i] === target[i]) n += 1;
    }
    return n;
  }, [typed, target]);

  const wpm = netWpm(correctSoFar, elapsedMs);
  const raw = grossWpm(typed.length, elapsedMs);
  const accuracy = accuracyPct(correctKeystrokes, totalKeystrokes);
  const progress = target.length ? typed.length / target.length : 0;

  /* --- Per-character render state ---------------------------------------- */
  const chars = useMemo(() => {
    // With the buffer full but a character still wrong, the caret would have no
    // index to sit at. Park it on the last character so there is always a
    // visible cursor while the run is unfinished.
    const caretAt =
      typed.length >= target.length && target.length > 0
        ? target.length - 1
        : typed.length;

    return target.split("").map((char, i) => {
      let state = "pending";
      if (i < typed.length) {
        state = typed[i] === char ? "correct" : "wrong";
      }
      return { char, state, isCaret: i === caretAt };
    });
  }, [target, typed]);

  /* --- Sample WPM once per second, for the results chart. ---------------- */
  useEffect(() => {
    if (!isRunning) return;
    const second = Math.floor(elapsedMs / 1000);
    const samples = samplesRef.current;
    if (second > 0 && (samples.length === 0 || samples[samples.length - 1].t < second)) {
      samples.push({ t: second, wpm: Math.round(wpm) });
    }
  }, [elapsedMs, isRunning, wpm]);

  const reset = useCallback(() => {
    setTyped("");
    setStartedAt(null);
    setFinishedAt(null);
    setNow(null);
    setTotalKeystrokes(0);
    setCorrectKeystrokes(0);
    setErrorCount(0);
    intervalsRef.current = [];
    samplesRef.current = [];
    lastKeyAtRef.current = null;
  }, []);

  const finish = useCallback(
    (endedAt) => {
      const end = endedAt ?? Date.now();
      setFinishedAt(end);
      return end;
    },
    []
  );

  /**
   * Feed this the input element's full value on every change. Working from the
   * whole value (rather than individual keydowns) keeps paste, IME, autocorrect
   * and mobile keyboards behaving correctly.
   */
  const handleInput = useCallback(
    (nextRaw) => {
      if (isFinished) return;

      // Never let the buffer run past the target.
      const next = nextRaw.slice(0, target.length);
      const t = Date.now();

      let begunAt = startedAt;
      if (begunAt === null && next.length > 0) {
        begunAt = t;
        setStartedAt(t);
        setNow(t);
      }

      // Count only forward progress as keystrokes; backspacing is a correction,
      // not a new attempt at a character.
      let addedCorrect = 0;
      let addedTotal = 0;

      if (next.length > typed.length) {
        const added = next.slice(typed.length);
        addedTotal = added.length;

        added.split("").forEach((char, offset) => {
          const index = typed.length + offset;
          if (char === target[index]) addedCorrect += 1;
        });

        const addedWrong = addedTotal - addedCorrect;

        setTotalKeystrokes((n) => n + addedTotal);
        setCorrectKeystrokes((n) => n + addedCorrect);
        if (addedWrong > 0) setErrorCount((n) => n + addedWrong);

        if (lastKeyAtRef.current !== null) {
          intervalsRef.current.push(t - lastKeyAtRef.current);
        }
        lastKeyAtRef.current = t;
      }

      setTyped(next);

      const correctFinal = next
        .split("")
        .filter((char, i) => char === target[i]).length;

      // Complete only when the buffer fills the target AND every character
      // matches. Ending on length alone would lock in a wrong final character
      // with no chance to backspace and fix it.
      const isComplete =
        target.length > 0 &&
        next.length === target.length &&
        correctFinal === target.length;

      if (isComplete) {
        const end = finish(t);

        // The keystroke counters are still one render behind, so fold in this
        // batch by hand. Counting only the correct ones toward the numerator
        // matters: errors made and then corrected still cost accuracy.
        onFinishRef.current?.({
          wpm: netWpm(correctFinal, end - begunAt),
          raw: grossWpm(next.length, end - begunAt),
          accuracy: accuracyPct(
            correctKeystrokes + addedCorrect,
            totalKeystrokes + addedTotal
          ),
          consistency: consistencyPct(intervalsRef.current),
          durationMs: end - begunAt,
          chars: next.length,
          correctChars: correctFinal,
          errors: next.length - correctFinal,
          samples: samplesRef.current.slice(),
        });
      }
    },
    [
      correctKeystrokes,
      finish,
      isFinished,
      startedAt,
      target,
      totalKeystrokes,
      typed,
    ]
  );

  return {
    typed,
    chars,
    isRunning,
    isFinished,
    hasStarted: startedAt !== null,
    elapsedMs,
    wpm,
    raw,
    accuracy,
    errorCount,
    progress,
    handleInput,
    reset,
  };
}
