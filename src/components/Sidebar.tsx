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
                    <div className="brand-title">Content Marketing</div>
                    <div className="brand-subtitle">Control Hub</div>
                </div>
            </div>

            <div className="nav-group">
                <span className="nav-label">Workspace</span>
                <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
                <NavLink to="/tasks" className={linkClass}>Tasks</NavLink>
                <NavLink to="/content" className={linkClass}>Content</NavLink>
                <NavLink to="/drafts" className={linkClass}>Drafts</NavLink>
                <NavLink to="/calendar" className={linkClass}>Calendar</NavLink>
                <NavLink to="/analytics" className={linkClass}>Analytics</NavLink>
                <NavLink to="/kpi" className={linkClass}>KPI</NavLink>
                <NavLink to="/reports" className={linkClass}>Reports</NavLink>
            </div>

            {user?.role === 'ADMIN' && (
                <div className="nav-group">
                    <span className="nav-label">Admin</span>
                    <NavLink to="/channels" className={linkClass}>Channels</NavLink>
                    <NavLink to="/users" className={linkClass}>Users</NavLink>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
