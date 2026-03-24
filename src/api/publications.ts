import api from './axios';
import type { PageResponse, Publication } from '../types';

export const publicationsApi = {
    calendar: (from: string, to: string) => api.get<PageResponse<Publication>>(`/publications/calendar?from=${from}&to=${to}`),
    schedule: (payload: Partial<Publication>) => api.post<Publication>('/publications/schedule', payload),
    publish: (id: number) => api.patch<Publication>(`/publications/${id}/publish`),
    list: () => api.get<PageResponse<Publication>>('/publications'),
};
