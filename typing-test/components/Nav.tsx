import Link from "next/link";
import styles from "../styles/Nav.module.css";

const Nav = () => {
    return (
        <nav className={styles.nav}>
            <ul>
                <li className={styles.logo}>
                    <Link href='/'>Typing Test</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
