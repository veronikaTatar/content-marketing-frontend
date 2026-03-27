import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2Callback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');
        const role = params.get('role');
        const fullName = params.get('fullName');
        const email = params.get('email');

        if (accessToken && refreshToken && role && fullName && email) {
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('user', JSON.stringify({ role, fullName, email }));
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    return (
        <div className="page">
            <div className="panel">
                <h3>Подключаем Google...</h3>
                <p className="muted">Если страница не перенаправила автоматически, вернитесь на дашборд.</p>
            </div>
        </div>
    );
};

export default OAuth2Callback;
