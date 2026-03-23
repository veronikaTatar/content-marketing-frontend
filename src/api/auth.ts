// api/auth.ts
import api from './axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types';

export const authApi = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await api.post<AuthResponse>('/auth/login', credentials);
            return response;
        } catch (error: any) {
            // Пробрасываем детальную ошибку
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            if (error.response?.status === 401) {
                throw new Error('Неверный логин или пароль');
            }
            if (error.response?.status === 403) {
                throw new Error('Доступ запрещен. Ваш аккаунт может быть заблокирован.');
            }
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Ошибка сети. Убедитесь, что сервер запущен на http://localhost:8080');
            }
            throw error;
        }
    },

    register: async (data: RegisterData) => {
        try {
            const response = await api.post<AuthResponse>('/auth/register', data);
            return response;
        } catch (error: any) {
            if (error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },

    getGitHubAuthUrl: async (): Promise<string> => {
        try {
            const response = await api.get<string>('/auth/github/url');
            return response.data;
        } catch (error: any) {
            console.error('Error getting GitHub auth URL:', error);
            throw new Error('Не удалось получить ссылку для входа через GitHub');
        }
    },

    handleGitHubLogin: async () => {
        try {
            const url = await authApi.getGitHubAuthUrl();
            window.location.href = url;
        } catch (error) {
            console.error('GitHub login error:', error);
            throw error;
        }
    },

    handleGitHubCallback: (code: string) =>
        api.get<AuthResponse>(`/auth/github/callback?code=${code}`),

    saveOAuthTokens: (token: string, refreshToken: string, user: any) => {
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('user', JSON.stringify(user));
    },

    getTokensFromUrl: () => {
        try {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const refreshToken = params.get('refreshToken');
            const role = params.get('role');
            const fullName = params.get('fullName');
            const email = params.get('email');

            if (token && refreshToken) {
                const user = { role, fullName, email };
                authApi.saveOAuthTokens(token, refreshToken, user);
                window.history.replaceState({}, document.title, window.location.pathname);
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error getting tokens from URL:', error);
            return false;
        }
    }
};