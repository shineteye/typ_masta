import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import Icon from "../ui/Icon";
import styles from "./AppShell.module.css";

const NAV = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/levels", label: "Levels", icon: "levels" },
  { to: "/practice", label: "Practice", icon: "keyboard" },
  { to: "/progress", label: "Progress", icon: "chart" },
];

/**
 * The frame every page sits in: an icon rail on desktop that becomes a bottom
 * tab bar on narrow screens, where a fixed 150px sidebar would eat the width
 * the typing surface needs.
 */
export default function AppShell({ children, wide = false }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.shell}>
      <a href="#main" className={styles.skipLink}>
        Skip to content
      </a>

      <nav className={styles.rail} aria-label="Main">
        <NavLink to="/" className={styles.brand} aria-label="typMasta home">
          <span className={styles.brandMark}>T</span>
          <span className={styles.brandText}>typMasta</span>
        </NavLink>

        <ul className={styles.navList}>
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [styles.navLink, isActive ? styles.navLinkActive : ""]
                    .filter(Boolean)
                    .join(" ")
                }
              >
                <Icon name={item.icon} size={22} />
                <span className={styles.navLabel}>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={20} />
        </button>
      </nav>

      <main
        id="main"
        className={[styles.main, wide ? styles.mainWide : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </main>
    </div>
  );
}
