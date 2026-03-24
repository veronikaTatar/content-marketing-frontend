import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../store/slices/authSlice';
import type { AppDispatch, RootState } from '../store';
import type { Role } from '../types';

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        fullName: '',
        role: 'AUTHOR' as Role,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await dispatch(register(formData));
        if (register.fulfilled.match(result)) {
            navigate('/dashboard');
        }
    };

    return (
        <div className="auth-shell">
            <div className="auth-card">
                <div className="auth-brand">Content Marketing</div>
                <h1>Create Account</h1>
                <p className="muted">Set up a profile to start managing your content pipeline.</p>
                <form onSubmit={handleSubmit} className="auth-form">
                    <label>
                        Full name
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Мария Сергеева"
                        />
                    </label>
                    <label>
                        Login
                        <input
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            placeholder="mary"
                        />
                    </label>
                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
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
                    <label>
                        Role
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="AUTHOR">Author</option>
                            <option value="MANAGER">Manager</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </label>
                    {error && <div className="error">{error}</div>}
                    <button type="submit" className="btn primary" disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create account'}
                    </button>
                </form>
                <div className="auth-footer">
                    <span>Already have access?</span>
                    <Link to="/login">Sign in</Link>
                </div>
            </div>
            <div className="auth-visual">
                <div className="orb" />
                <div className="grid-lines" />
                <div className="auth-copy">
                    <h2>Structure the workflow.</h2>
                    <p>Assign roles, manage channels, and approve content faster.</p>
                </div>
            </div>
        </div>
    );
};

export default Register;
