// pages/manager/Analytics.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

const Analytics = () => {
    const [stats, setStats] = useState({
        totalPublications: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        avgEngagement: 0
    });
    const [period, setPeriod] = useState('week');

    useEffect(() => {
        fetchStats();
    }, [period]);

    const fetchStats = async () => {
        try {
            const response = await api.get(`/manager/analytics?period=${period}`);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    return (
        <div>
            <h3>Аналитика эффективности контента</h3>

            <div className="mb-4">
                <select
                    className="form-select w-auto"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                >
                    <option value="week">За неделю</option>
                    <option value="month">За месяц</option>
                    <option value="quarter">За квартал</option>
                    <option value="year">За год</option>
                </select>
            </div>

            <div className="row mb-4">
                <div className="col-md-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <h6>Всего публикаций</h6>
                            <h3>{stats.totalPublications}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h6>Лайки</h6>
                            <h3>{stats.totalLikes}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h6>Комментарии</h6>
                            <h3>{stats.totalComments}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-warning text-white">
                        <div className="card-body">
                            <h6>Репосты</h6>
                            <h3>{stats.totalShares}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h5>Вовлеченность аудитории</h5>
                </div>
                <div className="card-body">
                    <div className="progress mb-3" style={{ height: '30px' }}>
                        <div
                            className="progress-bar bg-success"
                            style={{ width: `${(stats.totalLikes / (stats.totalLikes + stats.totalComments + stats.totalShares)) * 100 || 0}%` }}
                        >
                            Лайки
                        </div>
                        <div
                            className="progress-bar bg-info"
                            style={{ width: `${(stats.totalComments / (stats.totalLikes + stats.totalComments + stats.totalShares)) * 100 || 0}%` }}
                        >
                            Комментарии
                        </div>
                        <div
                            className="progress-bar bg-warning"
                            style={{ width: `${(stats.totalShares / (stats.totalLikes + stats.totalComments + stats.totalShares)) * 100 || 0}%` }}
                        >
                            Репосты
                        </div>
                    </div>
                    <p className="text-center">
                        Средняя вовлеченность: <strong>{stats.avgEngagement}%</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;