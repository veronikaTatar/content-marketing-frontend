// App.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardRouter from './pages/DashboardRouter';
import Tasks from './pages/Tasks';
import ProtectedRoute from './components/ProtectedRoute';
import { OAuthCallback } from './components/auth/OAuthCallback';
import type { RootState } from './store';

function App() {
    const { token, user } = useSelector((state: RootState) => state.auth);

    // Определяем начальный редирект на основе роли
    const getInitialRedirect = () => {
        if (!token) return '/login';

        switch (user?.role) {
            case 'ADMIN':
                return '/admin/users';
            case 'CONTENT_MANAGER':
                return '/dashboard';
            default:
                return '/dashboard';
        }
    };

    return (
        <Routes>
            <Route
                path="/"
                element={
                    token ? <Navigate to={getInitialRedirect()} /> : <Navigate to="/login" />
                }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />

            {/* Дашборд - разные страницы в зависимости от роли */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <DashboardRouter />
                    </ProtectedRoute>
                }
            />

            {/* Задачи - доступны для менеджеров и авторов */}
            <Route
                path="/tasks"
                element={
                    <ProtectedRoute allowedRoles={['CONTENT_MANAGER', 'AUTHOR']}>
                        <Tasks />
                    </ProtectedRoute>
                }
            />

            {/* Админские маршруты */}
            <Route
                path="/admin/users"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <div>Управление пользователями</div>
                    </ProtectedRoute>
                }
            />

            <Route
                path="/admin/roles"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <div>Управление ролями</div>
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;