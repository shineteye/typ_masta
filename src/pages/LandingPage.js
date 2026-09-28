import React from "react";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useProgress } from "../contexts/ProgressContext";
import { getLevel, LEVELS } from "../lib/levels";
import { summarise, summariseAll } from "../lib/scores";
import styles from "./LandingPage.module.css";

/**
 * The landing page. The old one was a bare heading and a Get Started button;
 * this one says what the app does, gets you into a run in one click, and — once
 * you have history — leads with where you left off.
 */
export default function LandingPage() {
  const { level, history } = useProgress();
  const overall = summariseAll(history);
  const current = getLevel(level);
  const returning = overall.runs > 0;

  return (
    <AppShell>
      <div className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Touch typing trainer</p>
          <h1 className={styles.title}>
            Type faster.
            <br />
            <span className={styles.titleAccent}>Without looking down.</span>
          </h1>
          <p className={styles.lede}>
            Three levels, from home-row drills to full passages. Real words per
            minute, honest accuracy, and a record of every run so you can see the
            curve bend.
          </p>

          <div className={styles.ctaRow}>
            <Button to="/practice" size="lg">
              <Icon name="play" size={18} />
              {returning ? `Continue ${current.name}` : "Start typing"}
            </Button>
            <Button to="/levels" variant="secondary" size="lg">
              {returning ? "Change level" : "Pick a level"}
            </Button>
          </div>

          {returning && (
            <dl className={styles.quickStats}>
              <div>
                <dt>Best</dt>
                <dd>{Math.round(overall.bestWpm)} wpm</dd>
              </div>
              <div>
                <dt>Average</dt>
                <dd>{Math.round(overall.avgWpm)} wpm</dd>
              </div>
              <div>
                <dt>Runs</dt>
                <dd>{overall.runs}</dd>
              </div>
            </dl>
          )}
        </section>

        <section className={styles.levels} aria-labelledby="levels-heading">
          <h2 className={styles.sectionTitle} id="levels-heading">
            Where you are
          </h2>
          <ul className={styles.levelList}>
            {LEVELS.map((item) => {
              const stats = summarise(history[item.id]);
              const pct = Math.min(
                100,
                Math.round((stats.bestWpm / item.targetWpm) * 100)
              );

              return (
                <li key={item.id} className={styles.levelRow}>
                  <span
                    className={styles.levelDot}
                    style={{ background: item.accent }}
                    aria-hidden="true"
                  />
                  <div className={styles.levelMeta}>
                    <p className={styles.levelName}>{item.name}</p>
                    <p className={styles.levelTagline}>{item.tagline}</p>
                  </div>
                  <div className={styles.levelProgress}>
                    <div className={styles.levelTrack}>
                      <div
                        className={styles.levelFill}
                        style={{
                          width: `${pct}%`,
                          background: item.accent,
                        }}
                      />
                    </div>
                    <p className={styles.levelNumbers}>
                      {stats.runs === 0
                        ? "Not started"
                        : `${Math.round(stats.bestWpm)} / ${item.targetWpm} wpm`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
