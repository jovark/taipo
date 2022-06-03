import { PropsWithRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import textStyles from '../styles/Text.module.css';

enum GameState {
    Waiting,
    Started,
    Finished,
}

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
    const [correctTyped, setCorrectTyped] = useState('');

    const startGame = () => {
        if (gameState === GameState.Finished) {
            setChars(words.substring(1));
            setTypedChars([]);
            setCurrentChar(words.charAt(0));
            setSeconds(time);
        }
        if (gameState !== GameState.Started) {
            let interval = setInterval(() => {
                setSeconds((previousSeconds) => {
                    if (previousSeconds === 0) {
                        clearInterval(interval);
                        setGameState(GameState.Finished);
                        return time;
                    } else {
                        return previousSeconds - 1;
                    }
                });
            }, 1000);
        }
    };

    useKeyPress((key: string) => {
        if (gameState != GameState.Started) {
            startGame();
            setGameState(GameState.Started);
        }

        if (key === currentChar) {
            setTypedChars([...typedChars, { letter: key, isMistake: false }]);
            setCorrectTyped(correctTyped + currentChar);
            setCurrentChar(chars.charAt(0));
            setChars(chars.substring(1));
        } else if (key === 'Backspace') {
            if (typedChars.length > 1) {
                setCurrentChar(correctTyped.charAt(correctTyped.length - 1));
                // setCurrentChar(typedChars[typedChars.length - 1].letter);
                setChars(currentChar + chars);
                setTypedChars(typedChars.splice(0, typedChars.length - 1));
                setCorrectTyped(correctTyped.slice(0, -1));
            }
        } else {
            setTypedChars([...typedChars, { letter: key, isMistake: true }]);
            setCorrectTyped(correctTyped + currentChar);
            setCurrentChar(chars.charAt(0));
            setChars(chars.substring(1));
        }
    });

    return (
        <>
            <div>{seconds}</div>
            {gameState !== GameState.Finished && (
                <p className={textStyles.text}>
                    {/* 67 */}
                    {typedChars.map((letter, index) => (
                        <span
                            className={letter.isMistake ? textStyles.error : textStyles.typed}
                            key={index}
                        >
                            {letter.letter}
                        </span>
                    ))}
                    <span className={textStyles.current}>{currentChar}</span>
                    <span className={textStyles.coming}>{chars.substring(0, 300)}</span>
                </p>
            )}
        </>
    );
};

export default Text;
