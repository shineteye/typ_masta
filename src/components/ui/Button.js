import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

/**
 * One button, three variants, three sizes. Renders as <Link> when given `to`,
 * so navigation buttons stop being a <button> wrapped in an <a>.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  block = false,
  className = "",
  ...rest
}) {
  const classes = [
    styles.btn,
    styles[variant],
    styles[size],
    block ? styles.block : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
