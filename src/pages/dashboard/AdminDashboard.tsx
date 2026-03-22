// pages/dashboard/AdminDashboard.tsx
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Административная панель</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Пользователи</h2>
                    <p className="text-gray-600">Управление пользователями системы</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Роли и права</h2>
                    <p className="text-gray-600">Настройка доступа</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Статистика</h2>
                    <p className="text-gray-600">Общая статистика системы</p>
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                Выйти
            </button>
        </div>
    );
};

export default AdminDashboard;