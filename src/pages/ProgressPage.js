import React, { useState } from "react";
import { useParams } from "react-router-dom";
import WpmChart from "../components/charts/WpmChart";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useProgress } from "../contexts/ProgressContext";
import { isLevelId, LEVELS } from "../lib/levels";
import { formatDuration } from "../lib/metrics";
import { summarise, summariseAll } from "../lib/scores";
import styles from "./ProgressPage.module.css";

/**
 * Progress across every run, not just the most recent one.
 *
 * `/progress/:mode` still works, so links from the old flow keep landing on the
 * right level.
 */
export default function ProgressPage() {
  const { mode } = useParams();
  const { history, clearHistory } = useProgress();

  const [selected, setSelected] = useState(() =>
    isLevelId(mode) ? mode : "all"
  );
  const [confirmingClear, setConfirmingClear] = useState(false);

  const overall = summariseAll(history);
  const hasAnyRuns = overall.runs > 0;

  const activeRuns =
    selected === "all"
      ? Object.values(history).flat().sort((a, b) => a.at - b.at)
      : history[selected] ?? [];
  const activeStats = summarise(activeRuns);

  const chartPoints = activeRuns.map((run, index) => ({
    wpm: run.wpm,
    label: new Date(run.at).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
    index,
  }));

  const headline = [
    { label: "Best", value: Math.round(activeStats.bestWpm), unit: "wpm" },
    { label: "Average", value: Math.round(activeStats.avgWpm), unit: "wpm" },
    {
      label: "Accuracy",
      value: activeStats.avgAccuracy.toFixed(1),
      unit: "%",
    },
    { label: "Runs", value: activeStats.runs, unit: "" },
  ];

  return (
    <AppShell>
      <div className={styles.page}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Progress</h1>
            <p className={styles.subtitle}>
              {hasAnyRuns
                ? `${overall.runs} ${
                    overall.runs === 1 ? "run" : "runs"
                  } · ${formatDuration(overall.totalTimeMs)} typing · ${
                    overall.totalChars
                  } characters`
                : "Finish a run and it will show up here."}
            </p>
          </div>

          {hasAnyRuns &&
            (confirmingClear ? (
              <div className={styles.confirm}>
                <span className={styles.confirmText}>Delete all runs?</span>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    clearHistory();
                    setConfirmingClear(false);
                  }}
                >
                  Delete
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setConfirmingClear(false)}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setConfirmingClear(true)}
              >
                <Icon name="trash" size={16} />
                Reset history
              </Button>
            ))}
        </header>

        {!hasAnyRuns ? (
          <div className={styles.empty}>
            <Icon name="chart" size={32} className={styles.emptyIcon} />
            <h2 className={styles.emptyTitle}>Nothing recorded yet</h2>
            <p className={styles.emptyText}>
              Your words per minute, accuracy and consistency are saved after
              every completed passage — all of it stays in this browser.
            </p>
            <Button to="/practice">
              <Icon name="play" size={18} />
              Start a run
            </Button>
          </div>
        ) : (
          <>
            <div
              className={styles.tabs}
              role="group"
              aria-label="Filter by level"
            >
              <button
                type="button"
                onClick={() => setSelected("all")}
                className={[
                  styles.tab,
                  selected === "all" ? styles.tabActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={selected === "all"}
              >
                All levels
              </button>
              {LEVELS.map((level) => (
                <button
                  key={level.id}
                  type="button"
                  onClick={() => setSelected(level.id)}
                  className={[
                    styles.tab,
                    selected === level.id ? styles.tabActive : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-pressed={selected === level.id}
                >
                  {level.name}
                  <span className={styles.tabCount}>
                    {(history[level.id] ?? []).length}
                  </span>
                </button>
              ))}
            </div>

            <dl className={styles.headline}>
              {headline.map((item) => (
                <div className={styles.headlineStat} key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.value}
                    {item.unit && (
                      <span className={styles.unit}>{item.unit}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <section className={styles.card} aria-labelledby="chart-heading">
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle} id="chart-heading">
                  Words per minute over time
                </h2>
                {activeStats.trend !== 0 && (
                  <p
                    className={styles.trend}
                    style={{
                      color:
                        activeStats.trend > 0
                          ? "var(--success)"
                          : "var(--danger)",
                    }}
                  >
                    {activeStats.trend > 0 ? "▲" : "▼"}{" "}
                    {Math.abs(activeStats.trend)} wpm recently
                  </p>
                )}
              </div>
              <WpmChart
                points={chartPoints}
                xLabel="Run"
                emptyMessage="No runs at this level yet."
              />
            </section>

            {activeRuns.length > 0 && (
              <section className={styles.card} aria-labelledby="recent-heading">
                <h2 className={styles.cardTitle} id="recent-heading">
                  Recent runs
                </h2>
                <div className={styles.tableScroll}>
                  <table className={styles.runTable}>
                    <thead>
                      <tr>
                        <th scope="col">When</th>
                        <th scope="col">WPM</th>
                        <th scope="col">Raw</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Consistency</th>
                        <th scope="col">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeRuns
                        .slice()
                        .reverse()
                        .slice(0, 12)
                        .map((run, index) => (
                          // The timestamp alone could repeat across levels in
                          // the combined view, so pair it with the position.
                          <tr key={`${run.at}-${index}`}>
                            <td className={styles.when}>
                              {new Date(run.at).toLocaleString(undefined, {
                                month: "short",
                                day: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </td>
                            <td className={styles.strong}>
                              {Math.round(run.wpm)}
                            </td>
                            <td>{Math.round(run.raw)}</td>
                            <td>{run.accuracy.toFixed(1)}%</td>
                            <td>{Math.round(run.consistency)}%</td>
                            <td>{formatDuration(run.durationMs)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
