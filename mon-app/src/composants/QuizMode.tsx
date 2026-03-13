import type { Kana } from '../data/kana.ts';
import useQuiz from "../hooks/useQuiz.ts";

interface QuizModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function QuizMode({ script, kanaData }: QuizModeProps) {
    const {
        currentCharacter,
        userAnswer,
        setUserAnswer,
        score,
        highScore,
        feedback,
        inputRef,
        handleSubmit,
    } = useQuiz(kanaData);

    const displayChar = script === 'hiragana' ? currentCharacter.hiragana : currentCharacter.katakana;

    return (
        <div className="quiz-wrapper">
            <div className="quiz-header">
                <div className="score">Score : {score.correct} / {score.total}</div>
                <div className="high-score">Record : {highScore}</div>
            </div>

            <div className="quiz-character">
                <h2>{displayChar}</h2>
            </div>

            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    value={userAnswer}
                    onChange={e => setUserAnswer(e.target.value)}
                    placeholder="Entrez le romanji..."
                />
                <button type="submit">Valider</button>
            </form>

            {feedback && (
                <div className={`feedback ${feedback.includes('Correct') ? 'success-style' : 'error-style'}`}>
                    {feedback}
                </div>
            )}
        </div>
    );
}

export default QuizMode;