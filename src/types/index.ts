/*Это TypeScript интерфейсы — "ДЖЕНЕРИКИ" для TypeScript
* Где используется:

    После входа в систему

    При показе профиля

    Для проверки прав доступа TypeScript сам проверит что вы не ошиблись с полями
* */
// types/index.ts
export type UserRole = 'ADMIN' | 'CONTENT_MANAGER' | 'AUTHOR';

export interface User {
    id: number;
    email: string;
    fullName: string;
    role: UserRole;
}

export interface OAuthUserData {
    role: UserRole;
    fullName: string;
    email: string;
}

export interface LoginCredentials {
    login: string;
    password: string;
}

export interface RegisterData {
    login: string;
    email: string;
    password: string;
    fullName: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    refreshToken: string;
    role: UserRole;
    fullName: string;
    email: string;
}