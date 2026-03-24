import api from './axios';
import type { Channel, PageResponse } from '../types';

export const channelsApi = {
    list: () => api.get<PageResponse<Channel>>('/channels'),
    create: (payload: Partial<Channel>) => api.post<Channel>('/channels', payload),
    update: (id: number, payload: Partial<Channel>) => api.put<Channel>(`/channels/${id}`, payload),
    remove: (id: number) => api.delete(`/channels/${id}`),
};
