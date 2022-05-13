import type { NextPage } from 'next';
import Text from '../components/Text';

const Home: NextPage = () => {
    var words: string[] = ['bla', 'bla', 'bla'];
    const time: number = 15;

    return <Text words={words} time={time}></Text>;
};

export default Home;
