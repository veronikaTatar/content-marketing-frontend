/*Это TypeScript интерфейсы — "ДЖЕНЕРИКИ" для TypeScript
* Где используется:

    После входа в систему

    При показе профиля

    Для проверки прав доступа TypeScript сам проверит что вы не ошиблись с полями
* */
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
    role: string;
    fullName: string;
    email: string;
}

export interface User {
    id: number;
    email: string;
    fullName: string;
    role: 'ADMIN' | 'CONTENT_MANAGER' | 'AUTHOR';
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: 'CREATED' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';
    authorId?: number;
    createdAt: string;
}

