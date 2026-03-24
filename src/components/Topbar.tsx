import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

const Topbar = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <header className="topbar">
            <div className="topbar-title">Content Control Center</div>
            <div className="topbar-actions">
                <div className="user-chip">
                    <div className="user-avatar">{user?.fullName?.[0] || 'U'}</div>
                    <div>
                        <div className="user-name">{user?.fullName || 'User'}</div>
                        <div className="user-role">{user?.role || 'ROLE'}</div>
                    </div>
                </div>
                <button className="btn ghost" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Topbar;
