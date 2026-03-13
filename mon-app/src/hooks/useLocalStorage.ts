import { useState } from 'react';

function useLocalStorage<T>(cle: string, valeurInitiale: T): [T, (valeur: T) => void] {
    const [valeur, setValeurState] = useState<T>(() => {
        try {
            const item = localStorage.getItem(cle);
            return item ? JSON.parse(item) : valeurInitiale;
        } catch {
            return valeurInitiale;
        }
    });

    const setValeur = (nouvelleValeur: T) => {
        try {
            setValeurState(nouvelleValeur);
            localStorage.setItem(cle, JSON.stringify(nouvelleValeur));
        } catch {
            console.error(`Erreur lors de l'écriture dans localStorage (clé: ${cle})`);
        }
    };

    return [valeur, setValeur];
}

export default useLocalStorage;