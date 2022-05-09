import Nav from "./Nav";
import Meta from "./Meta";
import styles from "../styles/Layout.module.css";

type Props = {
    children: any;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Meta />
            <div className={styles.container}>
                <Nav />
                <main className={styles.main}>{children}</main>
            </div>
        </>
    );
};

export default Layout;
