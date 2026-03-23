// pages/manager/PublicationsManagement.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Publication {
    id: number;
    title: string;
    content: string;
    scheduledDate: string;
    status: string;
    platform: string;
}

const PublicationsManagement = () => {
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        fetchPublications();
    }, []);

    const fetchPublications = async () => {
        try {
            const response = await api.get('/manager/publications');
            setPublications(response.data);
        } catch (error) {
            console.error('Error fetching publications:', error);
        }
    };

    const handleEdit = (id: number) => {
        alert(`Редактирование публикации ${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Удалить публикацию?')) {
            try {
                await api.delete(`/manager/publications/${id}`);
                fetchPublications();
            } catch (error) {
                console.error('Error deleting publication:', error);
            }
        }
    };

    return (
        <div>
            <h3>Управление публикациями</h3>
            <div className="table-responsive mt-4">
                <table className="table table-striped">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Платформа</th>
                        <th>Дата публикации</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {publications.map((pub) => (
                        <tr key={pub.id}>
                            <td>{pub.id}</td>
                            <td>{pub.title}</td>
                            <td>{pub.platform}</td>
                            <td>{new Date(pub.scheduledDate).toLocaleDateString()}</td>
                            <td>
                                    <span className={`badge ${pub.status === 'PUBLISHED' ? 'bg-success' : 'bg-warning'}`}>
                                        {pub.status === 'PUBLISHED' ? 'Опубликовано' : 'Запланировано'}
                                    </span>
                            </td>
                            <td>
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(pub.id)}>
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(pub.id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PublicationsManagement;