// components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { UserRole } from '../types';

interface Props {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
    const { user, token } = useSelector((state: RootState) => state.auth);

    // Проверяем валидность токена
    const isValidToken = token && token !== 'undefined' && token !== 'null' && token.length > 20;

    if (!isValidToken) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        return <Navigate to="/login" replace />;
    }

    // Проверяем роль, если указаны allowedRoles
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Если роль не подходит, редирект на соответствующий дашборд
        switch (user.role) {
            case 'ADMIN':
                return <Navigate to="/dashboard" replace />;
            case 'CONTENT_MANAGER':
                return <Navigate to="/dashboard" replace />;
            default:
                return <Navigate to="/dashboard" replace />;
        }
    }

    return <>{children}</>;
};

export default ProtectedRoute;