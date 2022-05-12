type Props = {
    words: string[];
};

const Text = ({ words }: Props) => {
    return (
        <div className='text'>
            {words.map((word) => (
                <h3 className='word' key={word}>
                    {word}
                </h3>
            ))}
        </div>
    );
};

export default Text;
