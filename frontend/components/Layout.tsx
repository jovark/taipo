import layoutStyles from '../styles/Layout.module.css';
import Nav from './Nav';
import Meta from './Meta';
import Footer from './Footer';
import { ReactElement } from 'react';

type Props = {
    children: any;
};

const Layout = ({ children }: Props): ReactElement => {
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
