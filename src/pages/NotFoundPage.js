import React from "react";
import AppShell from "../components/layout/AppShell";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <AppShell>
      <div className={styles.page}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>No page here</h1>
        <p className={styles.text}>
          That route does not exist. Everything lives behind the four icons in the
          navigation.
        </p>
        <Button to="/">
          <Icon name="home" size={18} />
          Back to home
        </Button>
      </div>
    </AppShell>
  );
}
