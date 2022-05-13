import { randomInt } from 'crypto';
import Text from '../components/Text';

export const getServerSideProps = async () => {
    const apiUri = 'http://localhost:3000/api';

    const res = await fetch(`${apiUri}/text/627e7e604c1d7654f9de3f11`);

    const language = await res.json();

    let words = [];

    for (let i = 0; i < 200; i++) {
        words.push(language.words[randomInt(99)]);
    }

    return {
        props: {
            words,
        },
    };
};

type Props = {
    words: string[];
};

const Home = ({ words }: Props) => {
    const time: number = 15;

    return <Text words={words} time={time}></Text>;
};

export default Home;
