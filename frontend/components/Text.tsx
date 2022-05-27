import { PropsWithRef, useState } from 'react';
import useKeyPress from '../hooks/useKeyPress';
import textStyles from '../styles/Text.module.css';

const Text = ({ words }: PropsWithRef<{ words: string }>) => {
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
      setChars(updatedChars);
    } else if (key === 'Backspace') {
      setCurrentChar(typedChars.charAt(typedChars.length - 1));

      updatedChars = currentChar + chars;
      setChars(updatedChars);

      updatedTypedChars = typedChars.slice(0, -1);
      setTypedChars(updatedTypedChars);
    } else {
      // :TODO add visual indicator for making mistakes
    }
  });

  return (
    <p className={textStyles.text}>
      <span className={textStyles.typed}>{typedChars}</span>
      <span className={textStyles.current}>{currentChar}</span>
      <span className={textStyles.coming}>{chars.substring(0, 250)}</span>
    </p>
  );
};

export default Text;
