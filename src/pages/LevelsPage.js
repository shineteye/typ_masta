import React from "react";
import { useNavigate } from "react-router-dom";
import beginnerImg from "../assets/img/beginner.jpg";
import advancedImg from "../assets/img/pro.jpg";
import intermediateImg from "../assets/img/inter.jpg";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import { useProgress } from "../contexts/ProgressContext";
import { LEVELS } from "../lib/levels";
import { passageCount } from "../lib/textBank";
import { summarise } from "../lib/scores";
import styles from "./LevelsPage.module.css";

const IMAGES = {
  begin: beginnerImg,
  adv: intermediateImg,
  pro: advancedImg,
};

/**
 * Level select. Each card is one button, so the whole card is the hit target
 * and keyboard users get a single stop per level rather than an image plus a
 * nested link.
 */
export default function LevelsPage() {
  const { level: activeLevel, setLevel, history } = useProgress();
  const navigate = useNavigate();

  const choose = (id) => {
    setLevel(id);
    navigate("/tutorial");
  };

  return (
    <AppShell>
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>Choose your level</h1>
          <p className={styles.subtitle}>
            Each level opens with a short video, then drops you into practice. You
            can switch levels any time.
          </p>
        </header>

        <ul className={styles.grid}>
          {LEVELS.map((item) => {
            const stats = summarise(history[item.id]);
            const isActive = item.id === activeLevel;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => choose(item.id)}
                  className={[styles.card, isActive ? styles.cardActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span className={styles.media}>
                    <img
                      src={IMAGES[item.id]}
                      alt=""
                      className={styles.image}
                      loading="lazy"
                    />
                    {isActive && (
                      <span className={styles.activeTag}>
                        <Icon name="check" size={12} strokeWidth={2.5} />
                        Current
                      </span>
                    )}
                  </span>

                  <span className={styles.body}>
                    <span
                      className={styles.badge}
                      style={{
                        color: item.accent,
                        background: item.accentSoft,
                      }}
                    >
                      Target {item.targetWpm} wpm
                    </span>

                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.tagline}>{item.tagline}</span>
                    <span className={styles.description}>
                      {item.description}
                    </span>

                    <span className={styles.footer}>
                      <span className={styles.footerStat}>
                        {passageCount(item.id)} passages
                      </span>
                      <span className={styles.footerDivider} aria-hidden="true">
                        ·
                      </span>
                      <span className={styles.footerStat}>
                        {stats.runs === 0
                          ? "No runs yet"
                          : `Best ${Math.round(stats.bestWpm)} wpm`}
                      </span>
                      <Icon
                        name="arrowRight"
                        size={18}
                        className={styles.footerArrow}
                      />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}
