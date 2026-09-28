import { useCallback, useEffect, useState } from "react";

/**
 * State mirrored into localStorage.
 *
 * Every access is guarded: storage throws in private windows and when site data
 * is blocked, and a corrupt value should not take the app down with it.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initialValue : JSON.parse(raw);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* Storage unavailable — keep running from memory. */
    }
  }, [key, value]);

  // Keep tabs in sync, so finishing a run in one updates progress in another.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key !== key || event.newValue === null) return;
      try {
        setValue(JSON.parse(event.newValue));
      } catch {
        /* Ignore an unparseable write from elsewhere. */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key]);

  const clear = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      /* Nothing to do. */
    }
    setValue(initialValue);
  }, [key, initialValue]);

  return [value, setValue, clear];
}
