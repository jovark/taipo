import { PropsWithRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import textTestStyles from '../styles/TextTest2.module.css';

const TextTest2 = ({ words }: PropsWithRef<{ words: string }>) => {
    const [typedChars, setTypedChars] = useState('');
    const [currentChar, setCurrentChar] = useState(words.charAt(0));
    const [chars, setChars] = useState(words.substring(1));

    useKeyPress((key: string) => {
        let updatedTypedChars = typedChars;
        let updatedChars = chars;

        if (key === currentChar) {
            updatedTypedChars += currentChar;
            setTypedChars(updatedTypedChars);

            setCurrentChar(chars.charAt(0));

            updatedChars = chars.substring(1);

            if (updatedChars.split(' ').length < 10) {
                updatedChars += ' ' + words;
            }

            setChars(updatedChars);
        }
    });

    return (
        <p className={textTestStyles.text}>
            <span className={textTestStyles.typed}>{typedChars}</span>
            <span className={textTestStyles.current}>{currentChar}</span>
            <span className={textTestStyles.coming}>{chars.substring(0, 250)}</span>
        </p>
    );
};

export default TextTest2;
