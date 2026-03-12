import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { kanaData } from './data/kana';
import StudyMode from "./composants/StudyMode.tsx";
import QuizMode from "./composants/QuizMode.tsx";
import './App.css';

function App() {
    // On garde 'script' ici pour que le choix Hiragana/Katakana
    // soit conservé quand on navigue entre les pages.
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');

    return (
        <Router>
            <div className="app-container">
                <header>
                    <h1>Apprentissage du Japonais - Kana</h1>

                    <nav className="main-nav">
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                            Étude
                        </NavLink>
                        <NavLink to="/quiz" className={({ isActive }) => isActive ? 'active' : ''}>
                            Quiz
                        </NavLink>
                    </nav>

                    <div className="script-toggle">
                        <label>
                            <input
                                type="radio"
                                name="script"
                                checked={script === 'hiragana'}
                                onChange={() => setScript('hiragana')}
                            />
                            Hiragana
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="script"
                                checked={script === 'katakana'}
                                onChange={() => setScript('katakana')}
                            />
                            Katakana
                        </label>
                    </div>
                </header>

                <main>
                    <Routes>
                        {/* Route par défaut : Mode Étude */}
                        <Route path="/" element={
                            <StudyMode script={script} kanaData={kanaData} />
                        } />

                        {/* Route Quiz */}
                        <Route path="/quiz" element={
                            <QuizMode script={script} kanaData={kanaData} />
                        } />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;