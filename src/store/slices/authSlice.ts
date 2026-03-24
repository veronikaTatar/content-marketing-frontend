import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api/auth';
import type { User, LoginCredentials, RegisterData } from '../../types';

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('token'),
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                const user: User = {
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                };
                state.user = user;
                state.token = action.payload.accessToken;
                localStorage.setItem('token', action.payload.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Login failed';
            })
            .addCase(register.fulfilled, (state, action) => {
                const user: User = {
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                };
                state.user = user;
                state.token = action.payload.accessToken;
                localStorage.setItem('token', action.payload.accessToken);
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
