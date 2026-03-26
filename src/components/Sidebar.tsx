import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

const Sidebar = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <aside className="sidebar">
            <div className="brand">
                <div className="brand-mark">CM</div>
                <div>
                    <div className="brand-title">Контент-маркетинг</div>
                    <div className="brand-subtitle">Центр управления</div>
                </div>
            </div>

            <div className="nav-group">
                <span className="nav-label">Рабочее пространство</span>
                <NavLink to="/dashboard" className={linkClass}>Дашборд</NavLink>
                <NavLink to="/tasks" className={linkClass}>Задачи</NavLink>
                <NavLink to="/content" className={linkClass}>Контент</NavLink>
                <NavLink to="/drafts" className={linkClass}>Черновики</NavLink>
                <NavLink to="/calendar" className={linkClass}>Календарь</NavLink>
                {user?.role === 'MANAGER' && (
                    <>
                        <NavLink to="/analytics" className={linkClass}>Аналитика</NavLink>
                        <NavLink to="/kpi" className={linkClass}>KPI</NavLink>
                        <NavLink to="/reports" className={linkClass}>Отчёты</NavLink>
                    </>
                )}
            </div>

            {user?.role === 'ADMIN' && (
                <div className="nav-group">
                    <span className="nav-label">Администрирование</span>
                    <NavLink to="/channels" className={linkClass}>Каналы</NavLink>
                    <NavLink to="/users" className={linkClass}>Пользователи</NavLink>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
