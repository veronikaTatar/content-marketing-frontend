import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

interface Props {
    children?: ReactNode;
}

const Layout = ({ children }: Props) => {
    return (
        <div className="app-shell">
            <Sidebar />
            <div className="app-main">
                <Topbar />
                <div className="app-content">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;
