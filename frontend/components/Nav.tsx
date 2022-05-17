import navStyles from '../styles/Nav.module.css';
import Link from 'next/link';

const Nav = () => {
    return (
        <div className={navStyles.nav}>
            <ul>
                <li className={navStyles.logo}>
                    <Link href='/'>typingtest</Link>
                </li>
                <li>
                    <Link href='/about'>about</Link>
                </li>
                <li>
                    <Link href='/settings'>settings</Link>
                </li>
            </ul>
        </div>
    );
};

export default Nav;
