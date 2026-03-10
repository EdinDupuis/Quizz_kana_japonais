// components/CharacterGrid.tsx
import { CharacterCard } from './CharacterCard';
import type {Kana} from "../data/kana.ts";

interface CharacterGridProps {
    characters: Kana[];
    title: string;
    type: 'hiragana' | 'katakana';
}

export const CharacterGrid = ({ characters, title, type }: CharacterGridProps) => {
    // 1. On regroupe les caractères par leur propriété "row"
    const rows = characters.reduce((acc, char) => {
        if (!acc[char.row]) acc[char.row] = [];
        acc[char.row].push(char);
        return acc;
    }, {} as Record<string, Kana[]>);

    return (
        <section className="kana-section">
            <h2 className="section-title">{title}</h2>

            {/* 2. On boucle sur chaque ligne (a, ka, sa, ya, wa...) */}
            <div className="rows-container">
                {Object.entries(rows).map(([rowName, rowItems]) => (
                    <div key={rowName} className="kana-grid-row">
                        {rowItems.map((item) => (
                            <CharacterCard
                                key={`${type}-${item.romanji}`}
                                character={item[type]}
                                romanji={item.romanji}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
};