import { PropsWithRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import textStyles from '../styles/Text.module.css';
import { useRouter } from 'next/router';

enum GameState {
    Waiting,
    Started,
    Finished,
}

let interval: any;

const Text = ({
    words,
    time,
}: PropsWithRef<{ words: string; time: number }>) => {
    const [typedChars, setTypedChars] = useState([
        {
            letter: '',
            isMistake: false,
        },
    ]);
    const [currentChar, setCurrentChar] = useState(words.charAt(0));
    const [chars, setChars] = useState(words.substring(1));
    const [seconds, setSeconds] = useState(time);
    const [gameState, setGameState] = useState(GameState.Waiting);
    const [errors, setErrors] = useState(0);
    const [totalCharsTyped, setTotalCharsTyped] = useState(0);
    const [correctCharsTyped, setCorrectCharsTyped] = useState(0);
    const router = useRouter();

    const reset = () => {
        router.replace(router.asPath);
        clearInterval(interval);
        setTypedChars([]);
        setCurrentChar(words.charAt(0));
        setChars(words.substring(1));
        setSeconds(time);
        setGameState(GameState.Waiting);
        setErrors(0);
        setTotalCharsTyped(0);
        setCorrectCharsTyped(0);
    };

    const startGame = () => {
        if (gameState !== GameState.Started) {
            interval = setInterval(() => {
                setSeconds((previousSeconds) => {
                    if (previousSeconds !== 0) {
                        return previousSeconds - 1;
                    }
                    setGameState(GameState.Finished);
                    clearInterval(interval);
                    return time;
                });
            }, 1000);
        }
    };

    useKeyPress((key: string) => {
        if (gameState === GameState.Waiting) {
            startGame();
            setGameState(GameState.Started);
        } else if (gameState === GameState.Finished && key !== 'Tab') {
            return;
        }

        switch (key) {
            case currentChar:
                setTypedChars([
                    ...typedChars,
                    { letter: currentChar, isMistake: false },
                ]);
                setCurrentChar(chars.charAt(0));
                setChars(chars.substring(1));
                setTotalCharsTyped(totalCharsTyped + 1);
                break;
            case 'Backspace':
                if (typedChars.length > 1) {
                    setCurrentChar(typedChars[typedChars.length - 1].letter);
                    setChars(currentChar + chars);
                    setTypedChars(typedChars.splice(0, typedChars.length - 1));
                }
                break;
            case 'Tab':
                reset();
                break;
            default:
                setTypedChars([
                    ...typedChars,
                    { letter: currentChar, isMistake: true },
                ]);
                setCurrentChar(chars.charAt(0));
                setChars(chars.substring(1));
                setTotalCharsTyped(totalCharsTyped + 1);
        }

        // Update wpm and accuracy
        let errorCount = 0;
        let count = 0;

        typedChars.forEach((char) => {
            if (!char.isMistake) {
                errorCount++;
            } else {
                count++;
            }
        });

        setErrors(errorCount);
        setCorrectCharsTyped(count);
    });

    return (
        <>
            {gameState !== GameState.Finished && (
                <>
                    <div>{seconds}</div>
                    <p className={textStyles.text}>
                        {/* 67 */}
                        {typedChars.map((letter, index) => (
                            <span
                                className={
                                    letter.isMistake ? textStyles.incorrect : textStyles.correct
                                }
                                key={index}
                            >
                                {letter.letter}
                            </span>
                        ))}
                        <span className={textStyles.current}>{currentChar}</span>
                        <span className={textStyles.coming}>{chars.substring(0, 300)}</span>
                    </p>
                </>
            )}
            {gameState === GameState.Finished && (
                <div>
                    <div className={textStyles.tab}>wpm: </div>
                    <div className={textStyles.value}>
                        {Math.round(
                            (((typedChars.length - 1) / 5 - errors) / (time / 60)) * 10
                        ) / 10}
                    </div>
                    <div className={textStyles.tab}>acc: </div>
                    <div className={textStyles.value}>
                        {Math.floor((correctCharsTyped / totalCharsTyped) * 100 * 10) / 10}%
                    </div>
                </div>
            )}
        </>
    );
};

export default Text;
