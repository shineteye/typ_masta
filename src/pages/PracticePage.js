import React, { useCallback, useEffect, useRef, useState } from "react";
import AppShell from "../components/layout/AppShell";
import ResultsPanel from "../components/typing/ResultsPanel";
import StatBar from "../components/typing/StatBar";
import TypingSurface from "../components/typing/TypingSurface";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useProgress } from "../contexts/ProgressContext";
import useTypingEngine from "../hooks/useTypingEngine";
import { getLevel, LEVELS } from "../lib/levels";
import { summarise } from "../lib/scores";
import { getPassage } from "../lib/textBank";
import styles from "./PracticePage.module.css";

/**
 * The practice screen.
 *
 * There is no Start button: the clock starts on your first keystroke, which is
 * both the correct way to measure a run and one less thing between you and
 * typing. `runKey` remounts the surface on a reset so the hidden input is
 * re-focused and the caret goes back to the first character.
 */
export default function PracticePage() {
  const { level, setLevel, history, recordRun } = useProgress();
  const current = getLevel(level);

  const [passage, setPassage] = useState(() => getPassage(level));
  const [result, setResult] = useState(null);
  const [runKey, setRunKey] = useState(0);
  const [isBest, setIsBest] = useState(false);

  // Read the pre-run best once per run, so finishing does not immediately make
  // the new score its own baseline.
  const bestBeforeRun = useRef(summarise(history[level]).bestWpm);

  const handleFinish = useCallback(
    (run) => {
      setResult(run);
      setIsBest(run.wpm > bestBeforeRun.current);
      recordRun(level, run);
    },
    [level, recordRun]
  );

  const engine = useTypingEngine(passage, { onFinish: handleFinish });

  // Switching level mid-session should hand you that level's text immediately.
  // Skipped on mount: useState already picked a passage, and re-picking here
  // would throw it away and draw a different one on the first paint.
  const mountedLevel = useRef(level);
  useEffect(() => {
    if (mountedLevel.current === level) return;
    mountedLevel.current = level;

    bestBeforeRun.current = summarise(history[level]).bestWpm;
    setPassage(getPassage(level));
    setResult(null);
    setIsBest(false);
    setRunKey((n) => n + 1);
    // history is deliberately not a dependency: recording a run must not
    // reset the passage the user just finished.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  /**
   * Clear the run state and re-arm the surface. `newPassage` distinguishes
   * "next passage" from "retry this one".
   *
   * Called from a click, so `history` here already includes the run that just
   * finished — which is what makes the refreshed best a correct baseline.
   */
  const startFresh = useCallback(
    ({ newPassage }) => {
      bestBeforeRun.current = summarise(history[level]).bestWpm;
      if (newPassage) {
        setPassage((previous) => getPassage(level, previous));
      }
      engine.reset();
      setResult(null);
      setIsBest(false);
      setRunKey((n) => n + 1);
    },
    [engine, history, level]
  );

  const retry = useCallback(
    () => startFresh({ newPassage: false }),
    [startFresh]
  );
  const next = useCallback(
    () => startFresh({ newPassage: true }),
    [startFresh]
  );

  // Tab and Escape restart from anywhere on the page, including after a run has
  // finished when the hidden input is disabled and cannot receive the key.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Tab" && event.key !== "Escape") return;
      const onSurface = event.target?.id === "typing-input";
      if (onSurface) return; // The surface handles its own case.
      event.preventDefault();
      if (result) next();
      else retry();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [result, next, retry]);

  return (
    <AppShell>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerMeta}>
            <p className={styles.eyebrow} style={{ color: current.accent }}>
              {current.name}
            </p>
            <h1 className={styles.title}>{current.tagline}</h1>
          </div>

          {/* Level switcher: changing level here beats walking back through the
              menu, which is what the old flow required. */}
          <div
            className={styles.levelSwitch}
            role="group"
            aria-label="Practice level"
          >
            {LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLevel(item.id)}
                className={[
                  styles.levelButton,
                  item.id === level ? styles.levelButtonActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={item.id === level}
              >
                {item.name}
              </button>
            ))}
          </div>
        </header>

        <StatBar
          wpm={engine.wpm}
          accuracy={engine.accuracy}
          elapsedMs={engine.elapsedMs}
          errorCount={engine.errorCount}
          progress={engine.progress}
          hasStarted={engine.hasStarted}
        />

        <div className={styles.surfaceCard}>
          <TypingSurface
            key={runKey}
            chars={engine.chars}
            typed={engine.typed}
            isFinished={engine.isFinished}
            onInput={engine.handleInput}
            onRestart={retry}
          />
        </div>

        {result ? (
          <ResultsPanel
            result={result}
            level={current}
            isPersonalBest={isBest}
            onRetry={retry}
            onNext={next}
          />
        ) : (
          <div className={styles.controls}>
            <Button onClick={retry} variant="secondary">
              <Icon name="restart" size={18} />
              Restart
            </Button>
            <Button onClick={next} variant="ghost">
              Skip passage
              <Icon name="arrowRight" size={18} />
            </Button>
            <Button to="/tutorial" variant="ghost" className={styles.pushRight}>
              <Icon name="video" size={18} />
              Watch the tutorial
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
