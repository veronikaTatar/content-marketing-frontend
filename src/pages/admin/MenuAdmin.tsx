// pages/admin/MenuAdmin.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import UsersManagement from './UsersManagement';
import RolesManagement from './RolesManagement';
import ChannelsManagement from './ChannelsManagement';
import BudgetManagement from './BudgetManagement';
import SystemSettings from './SystemSettings';

const MenuAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('users');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'users':
                return <UsersManagement />;
            case 'roles':
                return <RolesManagement />;
            case 'channels':
                return <ChannelsManagement />;
            case 'budget':
                return <BudgetManagement />;
            case 'settings':
                return <SystemSettings />;
            default:
                return <UsersManagement />;
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar vh-100">
                    <div className="position-sticky pt-3">
                        <div className="text-center mb-4">
                            <h4 className="text-white">Администрирование</h4>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'users' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('users')}
                                >
                                    <i className="bi bi-people-fill me-2"></i>
                                    Сотрудники
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'roles' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('roles')}
                                >
                                    <i className="bi bi-shield-lock-fill me-2"></i>
                                    Роли и права
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'channels' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('channels')}
                                >
                                    <i className="bi bi-megaphone-fill me-2"></i>
                                    Каналы публикаций
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'budget' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('budget')}
                                >
                                    <i className="bi bi-calculator-fill me-2"></i>
                                    Бюджет
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'settings' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('settings')}
                                >
                                    <i className="bi bi-gear-fill me-2"></i>
                                    Настройки системы
                                </button>
                            </li>
                        </ul>
                        <hr className="text-white" />
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger w-100 mt-3"
                        >
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Выйти
                        </button>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Панель администратора</h1>
                    </div>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default MenuAdmin;