// pages/author/MenuAuthor.tsx
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import MyTasks from './MyTasks';
import Drafts from './Drafts';
import MyPublications from './MyPublications';

const MenuAuthor = () => {
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
                return <MyTasks />;
            case 'drafts':
                return <Drafts />;
            case 'publications':
                return <MyPublications />;
            default:
                return <MyTasks />;
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar vh-100">
                    <div className="position-sticky pt-3">
                        <div className="text-center mb-4">
                            <h4 className="text-white">Автор</h4>
                        </div>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'tasks' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('tasks')}
                                >
                                    <i className="bi bi-list-task me-2"></i>
                                    Мои задачи
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'drafts' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('drafts')}
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    Черновики
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className={`nav-link ${activeMenu === 'publications' ? 'active bg-primary text-white' : 'text-white'}`}
                                    onClick={() => setActiveMenu('publications')}
                                >
                                    <i className="bi bi-journal-bookmark-fill me-2"></i>
                                    Мои публикации
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
                        <h1 className="h2">Панель автора</h1>
                    </div>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default MenuAuthor;