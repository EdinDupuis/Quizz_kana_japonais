import { useState } from 'react';
import { kanaData } from './data/kana';
import StudyMode from "./composants/StudyMode.tsx";
import QuizMode from "./composants/QuizMode.tsx";
import './App.css';

function App() {
    // États demandés
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');
    const [mode, setMode] = useState<'study' | 'quiz'>('study');

    return (
        <div className="app-container">
            <header>
                <h1>Apprentissage du Japonais - Kana</h1>

                {/* Navigation mode */}
                <nav className="main-nav">
                    <button onClick={() => setMode('study')} className={mode === 'study' ? 'active' : ''}>Étude</button>
                    <button onClick={() => setMode('quiz')} className={mode === 'quiz' ? 'active' : ''}>Quiz</button>
                </nav>

                {/* Sélection script (uniquement en mode étude comme suggéré) */}
                {mode === 'study' && (
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
                )}
            </header>

            <main>
                {/* Affichage conditionnel selon tes props */}
                {mode === 'study' && <StudyMode script={script} kanaData={kanaData} />}
                {mode === 'quiz' && <QuizMode script={script} kanaData={kanaData} />}
            </main>
        </div>
    );
}

export default App;