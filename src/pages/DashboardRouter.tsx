// pages/DashboardRouter.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';
import MenuAdmin from './admin/MenuAdmin';
import MenuManager from './manager/MenuManager';
import MenuAuthor from './author/MenuAuthor';

const DashboardRouter = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Роутинг на основе роли
    switch (user.role) {
        case 'ADMIN':
            return <MenuAdmin />;
        case 'CONTENT_MANAGER':
            return <MenuManager />;
        case 'AUTHOR':
            return <MenuAuthor />;
        default:
            return <MenuAuthor />;
    }
};

export default DashboardRouter;