// pages/manager/MenuManager.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import TasksManagement from './TasksManagement';
import PublicationsManagement from './PublicationsManagement';
import ContentModeration from './ContentModeration';
import Analytics from './Analytics';
import SocialMedia from './SocialMedia';

const MenuManager = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [activeMenu, setActiveMenu] = useState('tasks');

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'tasks':
                return <TasksManagement />;
            case 'publications':
                return <PublicationsManagement />;
            case 'moderation':
                return <ContentModeration />;
            case 'analytics':
                return <Analytics />;
            case 'social':
                return <SocialMedia />;
            default:
                return <TasksManagement />;
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar vh-100">
                    <div className="position-sticky pt-3">
                        <div className="text-center mb-4">
                            <h4 className="text-white">Контент-менеджер</h4>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'tasks' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('tasks')}
                                >
                                    <i className="bi bi-list-task me-2"></i>
                                    Задачи
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'publications' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('publications')}
                                >
                                    <i className="bi bi-calendar-week me-2"></i>
                                    Публикации
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'moderation' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('moderation')}
                                >
                                    <i className="bi bi-check2-circle me-2"></i>
                                    Модерация
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'analytics' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('analytics')}
                                >
                                    <i className="bi bi-graph-up me-2"></i>
                                    Аналитика
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'social' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('social')}
                                >
                                    <i className="bi bi-share-fill me-2"></i>
                                    Социальные сети
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

                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Панель контент-менеджера</h1>
                    </div>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default MenuManager;
