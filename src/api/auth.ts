import api from './axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types';

export const authApi = {
    login: (credentials: LoginCredentials) =>
        api.post<AuthResponse>('/auth/login', credentials),

    register: (data: RegisterData) =>
        api.post<AuthResponse>('/auth/register', data),  // ← ДОБАВИТЬ

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    },
};