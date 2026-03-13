
interface CharacterCardProps {
    character: string;
    romanji: string;
}

// Affiche un caractère japonais (hiragana ou katakana)
// Affiche le rōmaji (prononciation)
// Props : character (string), romanji (string)
export const CharacterCard = ({ character, romanji }: CharacterCardProps) => {
    return (
        <div className="kana-card"> {/* */}
            <div className="kana-char">{character}</div> {/* */}
            <div className="kana-romanji">{romanji}</div> {/* */}
        </div>
    );
};

export default CharacterCard;