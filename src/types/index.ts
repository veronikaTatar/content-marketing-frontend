/*Это TypeScript интерфейсы — "ДЖЕНЕРИКИ" для TypeScript
* Где используется:

    После входа в систему

    При показе профиля

    Для проверки прав доступа TypeScript сам проверит что вы не ошиблись с полями
* */
export type Role = 'ADMIN' | 'MANAGER' | 'AUTHOR';

export interface LoginCredentials {
    login?: string;
    email?: string;
    password: string;
}

export interface RegisterData {
    login: string;
    email: string;
    password: string;
    fullName: string;
    role: Role;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    role: Role;
    fullName: string;
    email: string;
}

export interface User {
    email: string;
    fullName: string;
    role: Role;
}

export interface Task {
    idTask: number;
    title: string;
    brief?: string | null;
    status: string;
    priority: number;
    complexity: number;
    deadlineAt?: string | null;
    idUser: number;
}

export interface Content {
    idContent: number;
    title: string;
    body: string;
    status: string;
    idUser: number;
    idTask?: number | null;
    tags: string[];
}

export interface Channel {
    idChannel: number;
    name: string;
    platform: string;
    isActive: boolean;
}

export interface Publication {
    idPublication: number;
    idContent: number;
    idChannel: number;
    status: string;
    scheduledAt?: string | null;
    publishedAt?: string | null;
}

export interface PublicationReport {
    idPublication: number;
    contentTitle: string;
    channelName: string;
    publishedAt?: string | null;
    likes: number;
    views: number;
    reposts: number;
    comments: number;
}

export interface PageResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}

