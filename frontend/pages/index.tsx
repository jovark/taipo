import { PropsWithRef } from 'react';
import { randomInt } from 'crypto';
import Text from '../components/Text';

export const getServerSideProps = async () => {
    const apiUri = 'http://localhost:3000/api';

    const res = await fetch(`${apiUri}/text/627e7e604c1d7654f9de3f11`);

    const language = await res.json();

    let words = new Array(100)
        .fill(0)
        .map((_) => language.words[randomInt(language.words.length)])
        .join(' ');

    return {
        props: {
            words,
        },
    };
};

const Home = ({ words }: PropsWithRef<{ words: string }>) => {
    const time: number = 15;

    return (
        <Text words={words}></Text>
        // <Text words={words} time={time}></Text>
    );
};

export default Home;
