import textStyles from '../styles/Text.module.css';
import { useEffect, useState, useRef } from 'react';

type Props = {
    words: string[];
    time: number;
};

const Text = ({ words, time }: Props) => {
    enum GameState {
        waiting,
        started,
        finished,
    }

    // TODO: implement changing time
    const timeInSeconds: number = time;

    const [wordsToType, setWordsToType] = useState(['']);
    const [timer, setTimer] = useState(timeInSeconds);
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
    const [currentLetter, setCurrentLetter] = useState('');
    const [correctWordCount, setCorrectWordCount] = useState(0);
    const [incorrectWordCount, setIncorrectWordCount] = useState(0);
    const [gameState, setGameState] = useState(GameState.waiting);
    const [numberOfLettersTyped, setCharactersTyped] = useState(0);
    const [typedLetters, setTypedLetters] = useState(['']);

    // TODO: make the typed text keep its colors
    const [lettersToType, setLettersToType] = useState(['']);
    const [globalLetterIndex, setGlobalLetterIndex] = useState(0);

    const inputElement = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setWordsToType(words);
        // setLettersToType(words.map((word) => (word + ' ').split('')).flat());
    }, [words]);

    useEffect(() => {
        if (gameState === GameState.started) {
            inputElement?.current?.focus();
        }
    }, [GameState.started, gameState]);

    const start = () => {
        // Resets state after the game has finished
        if (gameState === GameState.finished) {
            resetGame();
        }

        // Starts the game
        if (gameState !== GameState.started) {
            setGameState(GameState.started);

            let interval = setInterval(() => {
                setTimer((prevCountDown) => {
                    if (prevCountDown === 1) {
                        clearInterval(interval);
                        setGameState(GameState.finished);
                        setCurrentInput('');
                        return timeInSeconds;
                    }
                    return prevCountDown - 1;
                });
            }, 1000);
        }
    };

    const resetGame = () => {
        setWordsToType(words);
        setCurrentWordIndex(0);
        setCorrectWordCount(0);
        setIncorrectWordCount(0);
        setCurrentLetterIndex(-1);
        setCurrentLetter('');
    };

    const handleKeyDown = ({ keyCode, key }: any) => {
        const modifiers: number[] = [16, 8, 17, 18];

        // Spacebar
        if (keyCode === 32) {
            checkMatch();
            setCurrentInput('');
            setCurrentWordIndex(currentWordIndex + 1);
            setCurrentLetterIndex(-1);
            // BackSpace
        } else if (keyCode === 8) {
            setCurrentLetterIndex(currentLetterIndex - 1);
            setCurrentLetter(typedLetters[numberOfLettersTyped - 1]);
            // Tab
        } else if (keyCode === 9) {
            // resetGame();
            // setGameState(GameState.waiting);
        } else {
            setCurrentLetterIndex(currentLetterIndex + 1);
            setCurrentLetter(key);
        }

        if (!modifiers.includes(keyCode)) {
            setCharactersTyped(numberOfLettersTyped + 1);
            setTypedLetters([...typedLetters, key]);
        }
    };

    const checkMatch = () => {
        const wordToCompare = wordsToType[currentWordIndex];
        if (wordToCompare === currentInput.trim()) {
            setCorrectWordCount(correctWordCount + 1);
        } else {
            setIncorrectWordCount(incorrectWordCount + 1);
        }
    };

    const getLetterClass = (
        wordIndex: number,
        letterIndex: number,
        letter: string
    ) => {
        if (
            wordIndex === currentWordIndex &&
            letterIndex === currentLetterIndex &&
            currentLetter &&
            gameState !== GameState.finished
        ) {
            if (letter === currentLetter) {
                return 'correct';
            } else {
                return 'incorrect';
            }
        } else if (
            wordIndex === currentWordIndex &&
            currentLetterIndex >= words[currentWordIndex].length
        ) {
            return 'incorrect';
        } else {
            return '';
        }
    };

    return (
        <>
            <div
                hidden={gameState !== GameState.started}
                className={textStyles.timer}
            >
                {timer}
            </div>
            <input
                ref={inputElement}
                hidden={gameState !== GameState.started}
                type='text'
                className={textStyles.input}
                onKeyDown={handleKeyDown}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
            />
            <button
                hidden={gameState === GameState.started}
                className={textStyles.btn}
                onClick={start}
            >
                start the typing test
            </button>
            <div
                hidden={gameState !== GameState.started}
                className={textStyles.text}
            >
                {wordsToType.map((word, i) => (
                    <span key={i}>
                        <span>
                            {word.split('').map((letter, idx) => (
                                <span
                                    className={getLetterClass(i, idx, letter)}
                                    key={idx}
                                >
                                    {letter}
                                </span>
                            ))}
                        </span>
                        <span> </span>
                    </span>
                ))}
            </div>
            {gameState === GameState.finished && (
                <>
                    <div className={textStyles.wpm}>
                        wpm:
                        {Math.round(
                            (numberOfLettersTyped / 5 - incorrectWordCount) /
                                (timeInSeconds / 60)
                        )}
                    </div>
                    <div className={textStyles.accuracy}>
                        accuracy:{' '}
                        {Math.round(
                            correctWordCount /
                                (correctWordCount + incorrectWordCount)
                        ) * 100}
                        %
                    </div>
                </>
            )}
        </>
    );
};

export default Text;
