import { PropsWithRef,  useState } from 'react';
import textTestStyles from '../styles/TextTest.module.css';
import useKeyPress from '../hooks/useKeyPress';

const TextTest = ({ words }: PropsWithRef<{ words: string }>) => {
  const [leftPadding, setLeftPadding] = useState(
    new Array(20).fill(' ').join('')
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(words.charAt(0));
  const [incomingChars, setIncomingChars] = useState(words.substring(1));

  useKeyPress((key: string) => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      if (leftPadding.length > 0) {
        setLeftPadding(leftPadding.substring(1));
      }

      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);

      setCurrentChar(incomingChars.charAt(0));

      updatedIncomingChars = incomingChars.substring(1);

      if (updatedIncomingChars.split(' ').length < 10) {
        updatedIncomingChars += ' ' + words;
      }

      setIncomingChars(updatedIncomingChars);
    }
  });

  return (
    <p className={textTestStyles.character}>
      <span className={textTestStyles.out}>
        {(leftPadding + outgoingChars).slice(-20)}
      </span>
      <span className={textTestStyles.current}>{currentChar}</span>
      <span>{incomingChars.substring(0, 50)}</span>
    </p>
  );
};

export default TextTest;
