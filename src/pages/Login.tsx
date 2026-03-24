import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store';

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({ loginOrEmail: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = formData.loginOrEmail.includes('@')
            ? { email: formData.loginOrEmail, password: formData.password }
            : { login: formData.loginOrEmail, password: formData.password };
        const result = await dispatch(login(payload));
        if (login.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-brand">Content Marketing</div>
                <h1>Welcome Back</h1>
                <p className="muted">Sign in to manage content, tasks and analytics.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        Login or Email
                        <input
                            type="text"
                            name="loginOrEmail"
                            value={formData.loginOrEmail}
                            onChange={handleChange}
                            placeholder="mary@gmail.com"
                        />
                    </label>
                    <label>
                        Password
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                        />
                    </label>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="btn primary" disabled={isLoading}>
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
                <div className="auth-footer">
                    <span>New here?</span>
                    <Link to="/register">Create an account</Link>
                </div>
            </div>
            <div className="auth-visual">
                <div className="orb" />
                <div className="grid-lines" />
                <div className="auth-copy">
                    <h2>Plan. Publish. Measure.</h2>
                    <p>One workspace for content planning, approvals, and performance.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
