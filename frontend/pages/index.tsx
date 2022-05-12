import type { NextPage } from 'next';
import Text from '../components/Text';

const Home: NextPage = () => {
    const words: string[] = [
        'testing',
        'the',
        'typing',
        'game',
        'text',
        'faaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    ];

    return <Text words={words}></Text>;
};

export default Home;
