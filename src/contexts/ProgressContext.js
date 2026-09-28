import React, { createContext, useCallback, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { DEFAULT_LEVEL, isLevelId } from "../lib/levels";
import { addRun, emptyHistory, STORAGE_KEY } from "../lib/scores";

const ProgressContext = createContext(null);

/**
 * Holds the selected level and the run history, both persisted.
 *
 * The old build kept the level in memory only, so a refresh — or opening
 * /practice directly — silently dropped you back to beginner text.
 */
export function ProgressProvider({ children }) {
  const [level, setLevelRaw] = useLocalStorage(
    "typmasta.level",
    DEFAULT_LEVEL
  );
  const [history, setHistory, clearHistory] = useLocalStorage(
    STORAGE_KEY,
    emptyHistory()
  );

  const setLevel = useCallback(
    (id) => {
      if (isLevelId(id)) setLevelRaw(id);
    },
    [setLevelRaw]
  );

  const recordRun = useCallback(
    (levelId, run) => setHistory((current) => addRun(current, levelId, run)),
    [setHistory]
  );

  // A level read out of storage could be stale or hand-edited.
  const safeLevel = isLevelId(level) ? level : DEFAULT_LEVEL;

  const value = useMemo(
    () => ({
      level: safeLevel,
      setLevel,
      history: { ...emptyHistory(), ...history },
      recordRun,
      clearHistory,
    }),
    [safeLevel, setLevel, history, recordRun, clearHistory]
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside a ProgressProvider");
  }
  return context;
}

export default ProgressContext;
