import Link from 'next/link';

const Nav = () => {
    return (
        <div className='nav'>
            <ul>
                <li className='logo'>
                    <Link href='/'>TypingTest</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
