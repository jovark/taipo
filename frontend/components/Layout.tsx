import layoutStyles from '../styles/Layout.module.css';
import Nav from './Nav';
import Meta from './Meta';
import Footer from './Footer';

type Props = {
    children: any;
};

const Layout = ({ children }: Props) => {
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
