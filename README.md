# typMasta

A touch typing trainer. Three levels, from home-row drills to full passages,
with live words per minute, honest accuracy, and a record of every run.

## Running it

```bash
npm install
npm start          # http://localhost:3000
npm run build      # production bundle in build/
```

No backend and no accounts — every score is kept in the browser's
`localStorage`.

## How it is put together

```
src/
  lib/            Pure logic, no React
    metrics.js      WPM / accuracy / consistency formulas
    scores.js       Run history: append, summarise, trend
    levels.js       The three levels and everything that differs between them
    textBank.js     Practice passages, grouped by level
  hooks/
    useTypingEngine.js   One typing attempt: timing, per-character state, metrics
    useLocalStorage.js   Persisted state, guarded for blocked storage
  contexts/
    ProgressContext.js   Selected level + run history (both persisted)
    ThemeContext.js      Dark/light, driving `data-theme` on <html>
  components/
    typing/         TypingSurface, StatBar, ResultsPanel
    charts/         WpmChart
    layout/         AppShell — rail on desktop, tab bar on mobile
    ui/             Button, Icon
  pages/          One file per route
  styles/theme.css  Design tokens + reset
```

### How scoring works

A "word" is **5 characters, including spaces** — the standard convention, so
scores are comparable with other typing tests and do not depend on how long the
words in a passage happen to be.

- **WPM** (net) counts only correct characters, so random hammering cannot
  inflate it.
- **Raw** counts everything typed, mistakes included.
- **Accuracy** is measured over every keystroke of the attempt. A character
  typed wrong and then backspaced still counts against it.
- **Consistency** comes from the variation in per-character timing, so a steady
  typist scores well even at a low speed.

The clock starts on the **first keystroke**, not when the passage appears, so
pausing to read costs nothing.

### Styling

CSS Modules, with all color, spacing and type values coming from tokens in
`src/styles/theme.css`. Dark is the default; the toggle in the navigation sets
`data-theme` on `<html>` and the light palette takes over. Chart marks use their
own token, a step deeper than the UI accent, so large filled areas do not glare
against the dark surface.

## Routes

| Route             | Page                                  |
| ----------------- | ------------------------------------- |
| `/`               | Landing, with progress per level      |
| `/levels`         | Level select                          |
| `/tutorial`       | Video and technique notes for a level |
| `/practice`       | The typing screen                     |
| `/progress`       | History, chart and recent runs        |
| `/progress/:mode` | History for one level                 |

The previous build's routes (`/home`, `/menu`, `/videotutorials`, `/practiceR`)
redirect to their replacements.
