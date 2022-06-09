import layoutStyles from '../styles/Layout.module.css';
import Nav from './Nav';
import Meta from './Meta';
import Footer from './Footer';
import { PropsWithChildren, ReactElement } from 'react';

const Layout = ({ children }: PropsWithChildren<{}>): ReactElement => {
    return (
        <>
            <Meta />
            <div className={layoutStyles.container}>
                <Nav />
                <div className={layoutStyles.main}>{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
