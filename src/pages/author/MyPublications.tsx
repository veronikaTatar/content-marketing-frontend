// pages/author/MyPublications.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Publication {
    id: number;
    title: string;
    publishedDate: string;
    platform: string;
    status: string;
    likes?: number;
    comments?: number;
}

const MyPublications = () => {
    const [publications, setPublications] = useState<Publication[]>([]);

    useEffect(() => {
        fetchMyPublications();
    }, []);

    const fetchMyPublications = async () => {
        try {
            const response = await api.get('/author/publications');
            setPublications(response.data);
        } catch (error) {
            console.error('Error fetching publications:', error);
        }
    };

    return (
        <div>
            <h3>Мои публикации</h3>

            <div className="table-responsive mt-4">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Платформа</th>
                        <th>Дата публикации</th>
                        <th>Лайки</th>
                        <th>Комментарии</th>
                    </tr>
                    </thead>
                    <tbody>
                    {publications.map((pub) => (
                        <tr key={pub.id}>
                            <td>{pub.id}</td>
                            <td>{pub.title}</td>
                            <td>{pub.platform}</td>
                            <td>{new Date(pub.publishedDate).toLocaleDateString()}</td>
                            <td>{pub.likes || 0}</td>
                            <td>{pub.comments || 0}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPublications;