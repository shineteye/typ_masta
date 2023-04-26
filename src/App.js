import { Route, Routes } from 'react-router-dom';
// import './App.css';
import { useState } from 'react';
import { ModeContext } from './contexts/modeContext';
import HomePage from './pages/HomePage/Home';
import LaunchPage from './pages/LaunchPage/LaunchPage';
import MenuPage from './pages/MenuPage/MenuPage';
import PracticePage from './pages/PracticePage/PracticePage';
import PracticePageR from './pages/PracticePage/PracticePageR';
import { ProgressPage } from './pages/ProgressPage/ProgressPage';
import TutorialPage from './pages/TutorialPage/TutorialPage';


function App() {

  const [mode, setMode] = useState('beginner')
  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      <div className='App'>
        <Routes>
          <Route exact path='/' element={< LaunchPage />} />
          <Route exact path='home' element={<HomePage />} />
          <Route exact path='menu' element={<MenuPage />} />
          <Route exact path='videotutorials' element={<TutorialPage />} />
          <Route exact path='progress' element={<ProgressPage />} />
          <Route exact path='practice' element={<PracticePage />} />
          <Route exact path='practiceR' element={<PracticePageR />} />
        </Routes>
      </div>
    </ModeContext.Provider>
  );
}

export default App;
