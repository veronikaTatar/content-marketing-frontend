// pages/dashboard/ManagerDashboard.tsx
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const ManagerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Панель контент-менеджера</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Все задачи</h2>
                    <p className="text-gray-600">Управление задачами авторов</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Модерация</h2>
                    <p className="text-gray-600">Проверка и утверждение контента</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Аналитика</h2>
                    <p className="text-gray-600">Статистика по контенту</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Социальные сети</h2>
                    <p className="text-gray-600">Управление публикациями</p>
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

export default ManagerDashboard;