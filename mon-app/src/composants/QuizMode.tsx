
import type {Kana} from "../data/kana.ts";
import { useState, useEffect } from 'react';

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function QuizMode({ script, kanaData }: QuizModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [highScore, setHighScore] = useState(0); // Nouvel état pour le record
    const [feedback, setFeedback] = useState('');

    const currentCharacter = kanaData[currentIndex];
    const displayChar = script === 'hiragana' ? currentCharacter.hiragana : currentCharacter.katakana;

    useEffect(() => {
        const savedHighScore = localStorage.getItem('kanaHighScore');
        if (savedHighScore) {
            setHighScore(parseInt(savedHighScore));
        }
    }, []);

    useEffect(() => {
        if (score.correct > highScore) {
            setHighScore(score.correct);
            localStorage.setItem('kanaHighScore', score.correct.toString());
        }
    }, [score.correct]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Ta logique de validation
        const isCorrect = userAnswer.toLowerCase().trim() === currentCharacter.romanji.toLowerCase();

        setScore({
            correct: score.correct + (isCorrect ? 1 : 0),
            total: score.total + 1
        });

        setFeedback(isCorrect ? 'Correct !' : `Incorrect. C'était ${currentCharacter.romanji}`);
        setUserAnswer('');

        // Passage au suivant
        setTimeout(() => {
            setCurrentIndex((currentIndex + 1) % kanaData.length);
            setFeedback('');
        }, 1500);
    };

    return (
        <div className="quiz-wrapper">
            <div className="quiz-header">
                <div className="score">Score : {score.correct} / {score.total}</div>
                <div className="high-score">Record : {highScore}</div>
            </div>
            <div className="score">
                Score : {score.correct} / {score.total}
            </div>
            <div className="quiz-character">
                <h2>{displayChar}</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="Romanji..."
                    autoFocus
                />
                <button type="submit">Valider</button>
            </form>
            {feedback && <div className="feedback">{feedback}</div>}
        </div>
    );
}

export default QuizMode;