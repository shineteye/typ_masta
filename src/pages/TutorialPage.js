import React from "react";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import { useProgress } from "../contexts/ProgressContext";
import { getLevel } from "../lib/levels";
import styles from "./TutorialPage.module.css";

const TIPS = {
  begin: [
    "Rest your index fingers on F and J — most keyboards have a raised bump on both.",
    "Keep your wrists off the desk and your fingers curled, not flat.",
    "Accuracy first. Speed is what accuracy turns into once it is automatic.",
  ],
  adv: [
    "Reach for the top and bottom rows from the home row, then return to it.",
    "Look at the text, not your hands. Glancing down resets the habit.",
    "Read one or two words ahead of what you are typing.",
  ],
  pro: [
    "Keep an even rhythm. Steady beats bursts followed by corrections.",
    "Let your eyes lead. Your hands will follow where you are already reading.",
    "Push pace in short sessions, then do a slow accuracy set to reset.",
  ],
};

/**
 * The level's tutorial video plus the technique notes for that level, with
 * practice one click away. The old page branched three times over nearly
 * identical markup; the level object carries the differences now.
 */
export default function TutorialPage() {
  const { level } = useProgress();
  const current = getLevel(level);
  const tips = TIPS[current.id] ?? TIPS.begin;

  return (
    <AppShell>
      <div className={styles.page}>
        <Button to="/levels" variant="ghost" size="sm" className={styles.back}>
          <Icon name="arrowLeft" size={16} />
          All levels
        </Button>

        <header className={styles.header}>
          <p
            className={styles.eyebrow}
            style={{ color: current.accent }}
          >
            {current.name}
          </p>
          <h1 className={styles.title}>{current.tagline}</h1>
          <p className={styles.description}>{current.description}</p>
        </header>

        <div className={styles.layout}>
          <section className={styles.videoSection}>
            {/* Aspect-ratio box: the old page hard-coded 560x315, which overflowed
                on phones and left gaps on wide screens. */}
            <div className={styles.videoFrame}>
              <iframe
                className={styles.video}
                src={current.video}
                title={current.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </section>

          <aside className={styles.tips} aria-labelledby="tips-heading">
            <h2 className={styles.tipsTitle} id="tips-heading">
              <Icon name="target" size={16} />
              Before you start
            </h2>
            <ol className={styles.tipList}>
              {tips.map((tip, index) => (
                <li key={index} className={styles.tip}>
                  <span className={styles.tipNumber}>{index + 1}</span>
                  {tip}
                </li>
              ))}
            </ol>

            <Button to="/practice" size="lg" block className={styles.cta}>
              <Icon name="play" size={18} />
              Start practising
            </Button>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
