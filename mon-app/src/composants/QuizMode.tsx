import { useState } from 'react';
import type {Kana} from "../data/kana.ts";

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function QuizMode({ script, kanaData }: QuizModeProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [feedback, setFeedback] = useState('');

    const currentCharacter = kanaData[currentIndex];
    const displayChar = script === 'hiragana' ? currentCharacter.hiragana : currentCharacter.katakana;

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