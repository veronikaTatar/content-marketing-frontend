// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import type { User, LoginCredentials, RegisterData, /*AuthResponse,*/ UserRole } from '../../types';
interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;

}

const getStoredUser = (): User | null => {
    try {
        const stored = localStorage.getItem('user');
        if (stored && stored !== 'undefined' && stored !== 'null') {
            const parsed = JSON.parse(stored);
            // ✅ Проверяем, что это валидный пользователь
            if (parsed && typeof parsed === 'object' && 'role' in parsed) {
                return {
                    id: parsed.id || 0,
                    email: parsed.email,
                    fullName: parsed.fullName,
                    role: parsed.role as UserRole,
                };
            }
        }
        return null;
    } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return null;
    }
};

const getStoredToken = (): string | null => {
    const token = localStorage.getItem('token');
    return token && token !== 'undefined' && token !== 'null' ? token : null;
};

const getStoredRefreshToken = (): string | null => {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken && refreshToken !== 'undefined' && refreshToken !== 'null' ? refreshToken : null;
};

const initialState: AuthState = {
    user: getStoredUser(),
    token: getStoredToken(),
    refreshToken: getStoredRefreshToken(),
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials) => {
        const response = await authApi.login(credentials);
        return response.data;
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (data: RegisterData) => {
        const response = await authApi.register(data);
        return response.data;
    }
);

// GitHub OAuth login
export const githubLogin = createAsyncThunk(
    'auth/githubLogin',
    async (code: string) => {
        const response = await authApi.handleGitHubCallback(code);
        return response.data;
    }
);

// Получить GitHub auth URL
export const getGitHubAuthUrl = createAsyncThunk(
    'auth/getGitHubAuthUrl',
    async () => {
        const url = await authApi.getGitHubAuthUrl();
        return url;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
        clearError: (state) => {
            state.error = null;
        },
        setTokensFromUrl: (state) => {
            try {
                const params = new URLSearchParams(window.location.search);
                const token = params.get('token');
                const refreshToken = params.get('refreshToken');
                const role = params.get('role');
                const fullName = params.get('fullName');
                const email = params.get('email');

                if (token && refreshToken && role && fullName && email) {
                    state.token = token;
                    state.refreshToken = refreshToken;
                    state.user = {
                        id: 0,
                        role: role as UserRole,
                        fullName: fullName,
                        email: email,
                    };
                    localStorage.setItem('token', token);
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('user', JSON.stringify(state.user));
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch (error) {
                console.error('Error parsing tokens from URL:', error);
            }
        },
        clearStorage: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    id: 0,
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                };
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
                state.user = null;
                state.token = null;
                state.refreshToken = null;

                // Детальная обработка ошибок
                const errorMessage = action.error.message || 'Login failed';

                if (errorMessage.includes('User not found')) {
                    state.error = 'Пользователь не найден. Проверьте логин или email.';
                } else if (errorMessage.includes('Invalid password')) {
                    state.error = 'Неверный пароль. Попробуйте еще раз.';
                } else if (errorMessage.includes('blocked')) {
                    state.error = 'Ваш аккаунт заблокирован. Обратитесь к администратору.';
                } else if (errorMessage.includes('Network Error')) {
                    state.error = 'Ошибка сети. Убедитесь, что сервер запущен.';
                } else {
                    state.error = errorMessage;
                }
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    id: 0,
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                };
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Registration failed';
            })
            .addCase(githubLogin.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(githubLogin.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = {
                    id: 0,
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                };
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
                localStorage.setItem('user', JSON.stringify(state.user));
            })
            .addCase(githubLogin.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'GitHub login failed';
            });
    },
});

// store/slices/authSlice.ts - в конце файла
export const { logout, clearError, setTokensFromUrl, clearStorage } = authSlice.actions;
export default authSlice.reducer;