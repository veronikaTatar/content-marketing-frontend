// pages/dashboard/AuthorDashboard.tsx
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const AuthorDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Панель автора</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Мои задачи</h2>
                    <p className="text-gray-600">Список ваших задач</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Создать контент</h2>
                    <p className="text-gray-600">Новая публикация</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Мои публикации</h2>
                    <p className="text-gray-600">Управление контентом</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">Статистика</h2>
                    <p className="text-gray-600">Просмотры и охваты</p>
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

export default AuthorDashboard;