import { CharacterCard } from './CharacterCard';
import type {Kana} from "../data/kana.ts";

interface StudyModeProps {
    script: 'hiragana' | 'katakana';
    kanaData: Kana[];
}

function StudyMode({ script, kanaData }: StudyModeProps) {
    const rows = kanaData.reduce((acc, kana) => {
        if (!acc[kana.row]) acc[kana.row] = [];
        acc[kana.row].push(kana);
        return acc;
    }, {} as Record<string, Kana[]>);

    return (
        <div className="study-container">
            {Object.entries(rows).map(([rowName, rowItems]) => (
                <div key={rowName} className="kana-grid-row">
                    {rowItems.map((kana) => (
                        <CharacterCard
                            key={kana.romanji}
                            character={script === 'hiragana' ? kana.hiragana : kana.katakana}
                            romanji={kana.romanji}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default StudyMode;