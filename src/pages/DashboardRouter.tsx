// pages/DashboardRouter.tsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '../store';
import AdminDashboard from './dashboard/AdminDashboard';
import ManagerDashboard from './dashboard/ManagerDashboard';
import AuthorDashboard from './dashboard/AuthorDashboard';

const DashboardRouter = () => {
    const { user, token } = useSelector((state: RootState) => state.auth);

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    // Роутинг на основе роли
    switch (user.role) {
        case 'ADMIN':
            return <AdminDashboard />;
        case 'CONTENT_MANAGER':
            return <ManagerDashboard />;
        case 'AUTHOR':
            return <AuthorDashboard />;
        default:
            return <AuthorDashboard />;
    }
};

export default DashboardRouter;