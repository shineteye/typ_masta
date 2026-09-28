import React, { useCallback, useEffect, useMemo, useRef } from "react";
import styles from "./TypingSurface.module.css";

/**
 * The typing surface.
 *
 * A visually hidden input holds focus and receives the keystrokes, while the
 * passage itself is rendered character by character underneath. That gives a
 * real caret and correct mobile-keyboard behaviour without showing the user a
 * textarea they have to click into first — you land on the page and type.
 *
 * Text is split into words wrapped in non-breaking spans so a word never breaks
 * across two lines mid-character, which is what makes long passages readable.
 */
export default function TypingSurface({
  chars,
  typed,
  isFinished,
  onInput,
  onRestart,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const scrollerRef = useRef(null);

  const focusInput = useCallback(() => {
    if (!disabled && !isFinished) inputRef.current?.focus();
  }, [disabled, isFinished]);

  // Claim focus on mount and whenever a new run becomes typeable.
  useEffect(() => {
    focusInput();
  }, [focusInput]);

  // Keep the active line in view on long passages.
  useEffect(() => {
    const caret = caretRef.current;
    const scroller = scrollerRef.current;
    if (!caret || !scroller) return;

    const caretBox = caret.getBoundingClientRect();
    const scrollBox = scroller.getBoundingClientRect();
    const overshoot = caretBox.bottom - (scrollBox.bottom - 8);
    const undershoot = scrollBox.top + 8 - caretBox.top;

    if (overshoot > 0) scroller.scrollTop += overshoot;
    else if (undershoot > 0) scroller.scrollTop -= undershoot;
  }, [typed]);

  const handleKeyDown = useCallback(
    (event) => {
      // Tab restarts, the convention in typing apps. Escape also restarts,
      // and both are announced in the hint below the surface.
      if (event.key === "Tab" || event.key === "Escape") {
        event.preventDefault();
        onRestart?.();
        return;
      }
      // Enter would submit nothing and only blur intent; passages are one line
      // of prose, so it is not a character we ever want.
      if (event.key === "Enter") event.preventDefault();
    },
    [onRestart]
  );

  /**
   * Group characters into words so wrapping happens at spaces only.
   * A trailing space belongs to the word it follows, so the caret sitting on a
   * space still renders at the end of that word rather than jumping lines.
   */
  // With the buffer full but characters still wrong, the run stays open. The
  // hint below the passage has to explain that, or it reads as a stuck app.
  const errorCount = useMemo(
    () => chars.filter((entry) => entry.state === "wrong").length,
    [chars]
  );
  const hasErrorsAtEnd =
    !isFinished && typed.length >= chars.length && errorCount > 0;

  const words = useMemo(() => {
    const out = [];
    let current = [];

    chars.forEach((entry, index) => {
      current.push({ ...entry, index });
      if (entry.char === " ") {
        out.push(current);
        current = [];
      }
    });

    if (current.length > 0) out.push(current);
    return out;
  }, [chars]);

  return (
    <div
      className={[styles.surface, isFinished ? styles.finished : ""]
        .filter(Boolean)
        .join(" ")}
      onMouseDown={(event) => {
        // Clicking anywhere on the passage returns focus to the input without
        // the browser also trying to place a text selection.
        event.preventDefault();
        focusInput();
      }}
    >
      <div className={styles.scroller} ref={scrollerRef}>
        <p className={styles.passage} aria-hidden="true">
          {words.map((word, wordIndex) => (
            <span className={styles.word} key={wordIndex}>
              {word.map(({ char, state, isCaret, index }) => (
                <span
                  key={index}
                  ref={isCaret ? caretRef : null}
                  className={[
                    styles.char,
                    styles[state],
                    isCaret && !isFinished ? styles.caret : "",
                    char === " " ? styles.space : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </span>
          ))}
        </p>
      </div>

      {/* The real input: off-screen but focusable, so keystrokes and mobile
          keyboards behave exactly as the platform expects. */}
      <label htmlFor="typing-input" className="sr-only">
        Type the passage shown above
      </label>
      <input
        id="typing-input"
        ref={inputRef}
        className={styles.hiddenInput}
        value={typed}
        onChange={(event) => onInput(event.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || isFinished}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-describedby="typing-hint"
      />

      <p
        className={[styles.hint, hasErrorsAtEnd ? styles.hintWarn : ""]
          .filter(Boolean)
          .join(" ")}
        id="typing-hint"
        aria-live="polite"
      >
        {isFinished ? (
          "Run complete"
        ) : hasErrorsAtEnd ? (
          // The run only ends on a fully correct passage, so say what is left.
          <>
            Fix the highlighted {errorCount === 1 ? "character" : "characters"} to
            finish — backspace to correct
          </>
        ) : (
          <>
            Just start typing — <kbd className={styles.kbd}>Tab</kbd> restarts
          </>
        )}
      </p>
    </div>
  );
}
