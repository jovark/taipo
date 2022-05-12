type Props = {
    words: string[];
};

const Text = ({ words }: Props) => {
    return (
        <div className='text'>
            {words.map((word) => (
                <div className='word' key={word}>
                    {word}
                </div>
            ))}
        </div>
    );
};

export default Text;
