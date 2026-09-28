import React from "react";
import { formatDuration } from "../../lib/metrics";
import WpmChart from "../charts/WpmChart";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import styles from "./ResultsPanel.module.css";

/**
 * Shown when a run completes. WPM is the hero number — it is the one figure
 * people come back for — with the supporting metrics beneath it and the
 * pace chart to its side.
 */
export default function ResultsPanel({
  result,
  level,
  isPersonalBest,
  onRetry,
  onNext,
}) {
  const stats = [
    { label: "Accuracy", value: `${result.accuracy.toFixed(1)}%` },
    { label: "Raw", value: Math.round(result.raw) },
    { label: "Consistency", value: `${Math.round(result.consistency)}%` },
    { label: "Time", value: formatDuration(result.durationMs) },
    { label: "Characters", value: result.chars },
    { label: "Errors", value: result.errors },
  ];

  const chartPoints = result.samples?.map((s) => ({
    wpm: s.wpm,
    label: `${s.t}s`,
  }));

  const target = level.targetWpm;
  const hitTarget = result.wpm >= target;

  return (
    <section className={styles.panel} aria-label="Run results">
      <div className={styles.grid}>
        <div className={styles.heroCol}>
          {isPersonalBest && (
            <p className={styles.badge}>
              <Icon name="trophy" size={14} />
              Personal best
            </p>
          )}

          <p className={styles.heroLabel}>Words per minute</p>
          <p className={styles.hero}>{Math.round(result.wpm)}</p>

          <p className={styles.target}>
            <Icon
              name={hitTarget ? "check" : "target"}
              size={14}
              style={{ color: hitTarget ? "var(--success)" : "var(--text-faint)" }}
            />
            {hitTarget
              ? `Past the ${level.name} target of ${target}`
              : `${Math.max(1, Math.round(target - result.wpm))} to go for the ${
                  level.name
                } target of ${target}`}
          </p>

          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div className={styles.stat} key={stat.label}>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {chartPoints && chartPoints.length > 1 && (
          <div className={styles.chartCol}>
            <h3 className={styles.chartTitle}>Pace through the run</h3>
            <WpmChart points={chartPoints} xLabel="Seconds" />
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <Button onClick={onNext} variant="primary">
          <Icon name="restart" size={18} />
          Next passage
        </Button>
        <Button onClick={onRetry} variant="secondary">
          Retry this one
        </Button>
        <Button to="/progress" variant="ghost">
          See progress
          <Icon name="arrowRight" size={18} />
        </Button>
      </div>
    </section>
  );
}
