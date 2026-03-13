import { useState, useEffect, useRef, useMemo, type FormEvent } from 'react';
import type { Kana } from '../data/kana';
import useLocalStorage from './useLocalStorage';

function useQuiz(kanaData: Kana[]) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [highScore, setHighScore] = useLocalStorage<number>('kanaHighScore', 0);
    const [feedback, setFeedback] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // Mélange mémoïsé : ne se recalcule que si kanaData change
    const shuffledData = useMemo(() => {
        return [...kanaData].sort(() => Math.random() - 0.5);
    }, [kanaData]);

    const currentCharacter = shuffledData[currentIndex];

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentIndex]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const isCorrect = userAnswer.toLowerCase().trim() === currentCharacter.romanji.toLowerCase();
        const newCorrect = score.correct + (isCorrect ? 1 : 0);

        setScore({ correct: newCorrect, total: score.total + 1 });
        setFeedback(isCorrect ? 'Correct !' : `Incorrect. C'était ${currentCharacter.romanji}`);
        setUserAnswer('');

        if (newCorrect > highScore) {
            setHighScore(newCorrect);
        }

        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % shuffledData.length);
            setFeedback('');
        }, 1500);
    };

    return {
        currentCharacter,
        userAnswer,
        setUserAnswer,
        score,
        highScore,
        feedback,
        inputRef,
        handleSubmit,
    };
}
export default useQuiz;