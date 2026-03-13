import {useState} from 'react';
import {Routes, Route, NavLink} from 'react-router-dom';
import {kanaData} from './data/kana';
import StudyMode from "./composants/StudyMode";
import QuizMode from "./composants/QuizMode";
import './App.css';

function App() {
    const [script, setScript] = useState<'hiragana' | 'katakana'>('hiragana');

    return (
        <div className="app-container">
            <header>
                <h1>Apprentissage du Japonais - Kana</h1>
                <nav className="main-nav">
                    <NavLink to="/" className={({isActive}: { isActive: boolean }) => isActive ? 'active' : ''}>
                        Étude
                    </NavLink>
                    <NavLink to="/quiz" className={({isActive}: { isActive: boolean }) => isActive ? 'active' : ''}>
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
                    <Route path="/" element={<StudyMode script={script} kanaData={kanaData}/>}/>
                    <Route path="/quiz" element={<QuizMode script={script} kanaData={kanaData}/>}/>
                </Routes>
            </main>
        </div>
    );
}

export default App;

