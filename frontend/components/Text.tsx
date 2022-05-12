import { useEffect, useState, useRef } from 'react';

type Props = {
    words: string[];
};

const Text = ({ words }: Props) => {
    enum GameState {
        waiting,
        started,
        finished,
    }

    // TODO: implement changing time
    const timeInSeconds: number = 120;

    const [wordsToType, setWordsToType] = useState(['']);
    const [_, setTimer] = useState(timeInSeconds);
    const [currentInput, setCurrentInput] = useState('');
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentLetterIndex, setCurrentLetterIndex] = useState(-1);
    const [currentLetter, setCurrentLetter] = useState('');
    const [correctWordCount, setCorrectWordCount] = useState(0);
    const [incorrectWordCount, setIncorrectWordCount] = useState(0);
    const [gameState, setGameState] = useState(GameState.waiting);
    const [numberOfLettersTyped, setCharactersTyped] = useState(0);

    const [globalLetterIndex, setGlobalLetterIndex] = useState(0);

    // TODO: make the typed text keep its colors
    const [lettersToType, setLettersToType] = useState(['']);
    const [typedLetters, setTypedLetters] = useState(['']);

    const inputElement = useRef<HTMLInputElement>(null);

    // TODO: implement generating a list of words
    useEffect(() => {
        setWordsToType(words);
        setLettersToType(words.map((word) => (word + ' ').split('')).flat());
    }, [words]);

    useEffect(() => {
        if (gameState === GameState.started) {
            inputElement?.current?.focus();
        }
    }, [GameState.started, gameState]);

    const start = () => {
        // Resets state after the game has finished
        if (gameState === GameState.finished) {
            setWordsToType(words);
            setCurrentWordIndex(0);
            setCorrectWordCount(0);
            setIncorrectWordCount(0);
            setCurrentLetterIndex(-1);
            setCurrentLetter('');
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
            <input
                ref={inputElement}
                hidden={gameState !== GameState.started}
                type='text'
                className='input'
                onKeyDown={handleKeyDown}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
            />
            <button
                hidden={gameState === GameState.started}
                className='start-btn'
                onClick={start}
            >
                start the typing test
            </button>
            <div hidden={gameState !== GameState.started} className='text'>
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
                    <div className='wpm'>
                        wpm:
                        {(numberOfLettersTyped / 5 - incorrectWordCount) /
                            (timeInSeconds / 60)}
                    </div>
                    <div className='accuracy'>
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
