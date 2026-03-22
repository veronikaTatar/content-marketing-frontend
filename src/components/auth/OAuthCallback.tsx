// components/auth/OAuthCallback.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { githubLogin, setTokensFromUrl } from '../../store/slices/authSlice';
import type { AppDispatch, RootState } from '../../store';

export const OAuthCallback = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error, token: reduxToken } = useSelector((state: RootState) => state.auth);
    const [processed, setProcessed] = useState(false);

    useEffect(() => {
        const handleCallback = async () => {
            if (processed) return;

            const params = new URLSearchParams(window.location.search);
            const tokenFromUrl = params.get('token');
            const code = params.get('code');

            console.log('OAuthCallback: tokenFromUrl=', tokenFromUrl, 'code=', code);

            // Случай 1: токены уже в URL (редирект от бэкенда)
            if (tokenFromUrl) {
                console.log('Случай 1: токены в URL');
                dispatch(setTokensFromUrl());
                setProcessed(true);
                // Ждем немного, чтобы Redux успел обновиться
                setTimeout(() => {
                    navigate('/dashboard', { replace: true });
                }, 100);
                return;
            }

            // Случай 2: есть код (бэкенд возвращает JSON)
            if (code) {
                console.log('Случай 2: есть код, отправляем на бэкенд');
                const result = await dispatch(githubLogin(code));
                if (githubLogin.fulfilled.match(result)) {
                    setProcessed(true);
                    navigate('/dashboard', { replace: true });
                } else {
                    console.error('GitHub login failed:', result.error);
                    navigate('/login?error=github_auth_failed', { replace: true });
                }
                return;
            }

            // Случай 3: ничего нет
            console.log('Случай 3: нет токенов и нет кода');
            navigate('/login', { replace: true });
        };

        handleCallback();
    }, [dispatch, navigate, processed]);

    // Если уже есть токен в Redux и мы не в процессе обработки
    useEffect(() => {
        if (reduxToken && processed) {
            navigate('/dashboard', { replace: true });
        }
    }, [reduxToken, navigate, processed]);

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-600 text-xl mb-2">Ошибка</div>
                    <div className="text-gray-600">{error}</div>
                    <div className="text-gray-400 text-sm mt-4">Перенаправление на страницу входа...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <div className="text-gray-600">Вход через GitHub...</div>
            </div>
        </div>
    );
};