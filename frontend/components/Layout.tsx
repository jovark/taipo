import Nav from './Nav';
import Meta from './Meta';
import styles from '../styles/Layout.module.css';
import Footer from './Footer';

type Props = {
    children: any;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Meta />
            <div className='container'>
                <Nav />
                <div className='main'>{children}</div>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
