import React from "react";
import { formatDuration } from "../../lib/metrics";
import Icon from "../ui/Icon";
import styles from "./StatBar.module.css";

/**
 * Live metrics during a run.
 *
 * Values are announced politely rather than on every tick, so a screen reader
 * is not reading out a new WPM ten times a second.
 */
export default function StatBar({
  wpm,
  accuracy,
  elapsedMs,
  errorCount,
  progress,
  hasStarted,
}) {
  const items = [
    { icon: "zap", label: "WPM", value: hasStarted ? Math.round(wpm) : "—" },
    {
      icon: "target",
      label: "Accuracy",
      value: hasStarted ? `${Math.round(accuracy)}%` : "—",
    },
    { icon: "clock", label: "Time", value: formatDuration(elapsedMs) },
    { icon: "restart", label: "Errors", value: errorCount },
  ];

  return (
    <div className={styles.bar}>
      <dl className={styles.stats}>
        {items.map((item) => (
          <div className={styles.stat} key={item.label}>
            <dt className={styles.label}>
              <Icon name={item.icon} size={14} />
              {item.label}
            </dt>
            <dd className={styles.value} aria-live="polite" aria-atomic="true">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-label="Passage progress"
      >
        <div
          className={styles.fill}
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </div>
  );
}
