import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

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
                <NavLink to="/dashboard" className="nav-link">Dashboard</NavLink>
                <NavLink to="/tasks" className="nav-link">Tasks</NavLink>
                <NavLink to="/content" className="nav-link">Content</NavLink>
                <NavLink to="/drafts" className="nav-link">Drafts</NavLink>
                <NavLink to="/calendar" className="nav-link">Calendar</NavLink>
                <NavLink to="/analytics" className="nav-link">Analytics</NavLink>
                <NavLink to="/kpi" className="nav-link">KPI</NavLink>
                <NavLink to="/reports" className="nav-link">Reports</NavLink>
            </div>

            {user?.role === 'ADMIN' && (
                <div className="nav-group">
                    <span className="nav-label">Admin</span>
                    <NavLink to="/channels" className="nav-link">Channels</NavLink>
                    <NavLink to="/users" className="nav-link">Users</NavLink>
                </div>
            )}
        </aside>
    );
};

export default Sidebar;
