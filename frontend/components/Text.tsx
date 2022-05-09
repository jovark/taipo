import styles from '../styles/Text.module.css';

type Props = {
    words: string[];
};

const Text = ({ words }: Props) => {
    return (
        <div className={styles.text}>
            {words.map((word) => (
                <h3 key={word}>{word}</h3>
            ))}
            <div className='word'>
                <div className='letter'></div>
            </div>
        </div>
    );
};

export default Text;
