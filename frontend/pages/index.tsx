import { PropsWithRef } from 'react';
import { randomInt } from 'crypto';
import Text from '../components/Text';
import TextTest from '../components/textTest';

export const getServerSideProps = async () => {
    const apiUri = 'http://localhost:3000/api';

    const res = await fetch(`${apiUri}/text/627e7e604c1d7654f9de3f11`);

    const language = await res.json();

    let words = new Array(100)
        .fill(0)
        .map((_) => language.words[randomInt(language.words.length)])
        .join(' ');

    // let words = [];
    //
    // for (let i = 0; i < 100; i++) {
    //     words.push(language.words[randomInt(language.words.length)]);
    // }

    return {
        props: {
            words,
        },
    };
};

const Home = ({ words }: PropsWithRef<{ words: string }>) => {
    const time: number = 15;

    return (
        <TextTest words={words}></TextTest>
        // <Text words={words} time={time}></Text>
    );
};

export default Home;
