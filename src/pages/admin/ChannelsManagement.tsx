// pages/admin/ChannelsManagement.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface SocialChannel {
    id: number;
    platformName: string;
    accountName: string;
    isActive: boolean;
}

const ChannelsManagement = () => {
    const [channels, setChannels] = useState<SocialChannel[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newChannel, setNewChannel] = useState({ platformName: '', accountName: '' });

    useEffect(() => {
        fetchChannels();
    }, []);

    const fetchChannels = async () => {
        try {
            const response = await api.get('/admin/channels');
            setChannels(response.data);
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    };

    const handleAddChannel = async () => {
        try {
            await api.post('/admin/channels', newChannel);
            setShowForm(false);
            setNewChannel({ platformName: '', accountName: '' });
            fetchChannels();
        } catch (error) {
            console.error('Error adding channel:', error);
        }
    };

    const handleDeleteChannel = async (id: number) => {
        if (window.confirm('Удалить канал?')) {
            try {
                await api.delete(`/admin/channels/${id}`);
                fetchChannels();
            } catch (error) {
                console.error('Error deleting channel:', error);
            }
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Каналы для публикаций</h3>
                <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Добавить канал
                </button>
            </div>

            {showForm && (
                <div className="card mb-4">
                    <div className="card-body">
                        <h5>Добавление канала</h5>
                        <div className="row">
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Платформа (VK, Telegram и т.д.)"
                                    value={newChannel.platformName}
                                    onChange={(e) => setNewChannel({ ...newChannel, platformName: e.target.value })}
                                />
                            </div>
                            <div className="col-md-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Название аккаунта"
                                    value={newChannel.accountName}
                                    onChange={(e) => setNewChannel({ ...newChannel, accountName: e.target.value })}
                                />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-success me-2" onClick={handleAddChannel}>
                                    Сохранить
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowForm(false)}>
                                    Отмена
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="row">
                {channels.map((channel) => (
                    <div key={channel.id} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{channel.platformName}</h5>
                                <p className="card-text">{channel.accountName}</p>
                                <span className={`badge ${channel.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                    {channel.isActive ? 'Активен' : 'Неактивен'}
                                </span>
                                <button
                                    className="btn btn-danger btn-sm float-end"
                                    onClick={() => handleDeleteChannel(channel.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChannelsManagement;