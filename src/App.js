import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProgressProvider } from "./contexts/ProgressContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import LandingPage from "./pages/LandingPage";
import LevelsPage from "./pages/LevelsPage";
import NotFoundPage from "./pages/NotFoundPage";
import PracticePage from "./pages/PracticePage";
import ProgressPage from "./pages/ProgressPage";
import TutorialPage from "./pages/TutorialPage";

export default function App() {
  return (
    <ThemeProvider>
      <ProgressProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/levels" element={<LevelsPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/progress/:mode" element={<ProgressPage />} />

          {/* The old build's routes, kept so existing links and bookmarks still
              land somewhere sensible. */}
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/menu" element={<Navigate to="/levels" replace />} />
          <Route
            path="/videotutorials"
            element={<Navigate to="/tutorial" replace />}
          />
          <Route path="/practiceR" element={<Navigate to="/practice" replace />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ProgressProvider>
    </ThemeProvider>
  );
}
