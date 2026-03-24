import api from './axios';
import type { PageResponse, Task } from '../types';

export const tasksApi = {
    list: () => api.get<PageResponse<Task>>('/tasks'),
    listMine: () => api.get<PageResponse<Task>>('/tasks/my'),
    listMineSorted: (by: string, dir: string) => api.get<PageResponse<Task>>(`/tasks/my/sorted?by=${by}&dir=${dir}`),
    create: (payload: Partial<Task>) => api.post<Task>('/tasks', payload),
    approve: (id: number) => api.patch<Task>(`/tasks/${id}/approve`),
    reject: (id: number) => api.patch<Task>(`/tasks/${id}/reject`),
};
