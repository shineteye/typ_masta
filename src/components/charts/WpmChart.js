import React, { useMemo, useState } from "react";
import styles from "./WpmChart.module.css";

const W = 640;
const H = 180;
const PAD = { top: 12, right: 12, bottom: 24, left: 34 };

/**
 * WPM over a run or across runs. One series, so no legend box — the title names
 * it. Axes are recessive, the line is 2px, and a crosshair tooltip follows the
 * pointer. A table view carries the same numbers for anyone the chart fails.
 */
export default function WpmChart({
  points,
  xLabel = "Run",
  emptyMessage = "No runs yet.",
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  const geometry = useMemo(() => {
    if (!points || points.length === 0) return null;

    const values = points.map((p) => p.wpm);
    const maxRaw = Math.max(...values, 10);
    // Round the ceiling up to a clean step so gridline labels read well.
    const step = maxRaw <= 40 ? 10 : maxRaw <= 100 ? 20 : 40;
    const max = Math.ceil(maxRaw / step) * step;

    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;

    const x = (i) =>
      points.length === 1
        ? PAD.left + plotW / 2
        : PAD.left + (i / (points.length - 1)) * plotW;
    const y = (value) => PAD.top + plotH - (value / max) * plotH;

    const coords = points.map((p, i) => ({ ...p, cx: x(i), cy: y(p.wpm) }));

    const line = coords
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.cx.toFixed(1)} ${p.cy.toFixed(1)}`)
      .join(" ");

    const area =
      coords.length > 1
        ? `${line} L${coords[coords.length - 1].cx.toFixed(1)} ${(
            PAD.top + plotH
          ).toFixed(1)} L${coords[0].cx.toFixed(1)} ${(PAD.top + plotH).toFixed(
            1
          )} Z`
        : null;

    const ticks = [];
    for (let v = 0; v <= max; v += step) ticks.push({ v, y: y(v) });

    return { coords, line, area, ticks, max, plotH, plotW };
  }, [points]);

  if (!geometry) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  const { coords, line, area, ticks, plotH } = geometry;
  const hovered = hoverIndex === null ? null : coords[hoverIndex];

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    // Map pointer position into the SVG's own coordinate space.
    const svgX = ((event.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    coords.forEach((p, i) => {
      const distance = Math.abs(p.cx - svgX);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setHoverIndex(nearest);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.plot}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className={styles.svg}
          role="img"
          aria-label={`Words per minute across ${points.length} ${
            points.length === 1 ? "entry" : "entries"
          }`}
          onMouseMove={handleMove}
          onMouseLeave={() => setHoverIndex(null)}
        >
          {/* Gridlines and y labels: recessive, behind the data. */}
          {ticks.map((tick) => (
            <g key={tick.v}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={tick.y}
                y2={tick.y}
                className={styles.grid}
              />
              <text
                x={PAD.left - 8}
                y={tick.y}
                className={styles.axisLabel}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {tick.v}
              </text>
            </g>
          ))}

          {area && <path d={area} className={styles.area} />}
          <path d={line} className={styles.line} />

          {/* Markers only when there are few enough to read. */}
          {coords.length <= 20 &&
            coords.map((p, i) => (
              <circle
                key={i}
                cx={p.cx}
                cy={p.cy}
                r={4}
                className={styles.dot}
              />
            ))}

          {hovered && (
            <g className={styles.crosshair}>
              <line
                x1={hovered.cx}
                x2={hovered.cx}
                y1={PAD.top}
                y2={PAD.top + plotH}
                className={styles.crosshairLine}
              />
              {/* A surface ring separates the active marker from the line. */}
              <circle cx={hovered.cx} cy={hovered.cy} r={6} className={styles.dotActive} />
            </g>
          )}

          <text
            x={W - PAD.right}
            y={H - 4}
            className={styles.axisLabel}
            textAnchor="end"
          >
            {xLabel} →
          </text>
        </svg>

        {hovered && (
          <div
            className={styles.tooltip}
            style={{
              left: `${(hovered.cx / W) * 100}%`,
              top: `${(hovered.cy / H) * 100}%`,
            }}
          >
            <strong>{Math.round(hovered.wpm)} wpm</strong>
            {hovered.label && <span>{hovered.label}</span>}
          </div>
        )}
      </div>

      {/* Same data, reachable without the chart. */}
      <details className={styles.tableToggle}>
        <summary>View as table</summary>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">{xLabel}</th>
              <th scope="col">WPM</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p, i) => (
              <tr key={i}>
                <td>{p.label ?? i + 1}</td>
                <td>{Math.round(p.wpm)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
