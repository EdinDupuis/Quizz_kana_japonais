
interface CharacterCardProps {
    character: string;
    romanji: string;
}

// Affiche un caractère japonais (hiragana ou katakana)
// Affiche le rōmaji (prononciation)
// Props : character (string), romanji (string)
// CharacterCard.tsx
export const CharacterCard = ({ character, romanji }: CharacterCardProps) => {
    return (
        <div className="card">
            <div className="japanese-char">{character}</div>
            <div className="romanji-text">{romanji}</div>
        </div>
    );
};

export default CharacterCard;