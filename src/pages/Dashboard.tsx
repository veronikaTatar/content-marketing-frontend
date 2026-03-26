import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks';
import type { Task } from '../types';

const statusLabels: Record<string, string> = {
    new: 'Новая',
    in_progress: 'В работе',
    review: 'На проверке',
    completed: 'Завершена',
};

const getStatusLabel = (status: string) => statusLabels[status] || status;

const Dashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        tasksApi.listMine()
            .then((res) => setTasks(res.data.content))
            .catch(() => setTasks([]));
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Дашборд</h1>
                    <p className="muted">Обзор вашей контент-воронки.</p>
                </div>
                <div className="header-actions">
                    <button className="btn ghost">Новая задача</button>
                    <button className="btn primary">Запланировать публикацию</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Активные задачи</span>
                    <strong>{tasks.length}</strong>
                    <span className="stat-foot">Сегодня в работе</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Черновики</span>
                    <strong>6</strong>
                    <span className="stat-foot">На проверке</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Запланировано</span>
                    <strong>4</strong>
                    <span className="stat-foot">Ближайшие 7 дней</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Вовлечённость</span>
                    <strong>+18%</strong>
                    <span className="stat-foot">М/М</span>
                </div>
            </div>

            <div className="grid-two">
                <div className="panel">
                    <h3>Приоритетные задачи</h3>
                    <div className="list">
                        {tasks.slice(0, 5).map((task) => (
                            <div key={task.idTask} className="list-item">
                                <div>
                                    <div className="list-title">{task.title}</div>
                                    <div className="muted">Приоритет {task.priority} · Сложность {task.complexity}</div>
                                </div>
                                <span className="badge">{getStatusLabel(task.status)}</span>
                            </div>
                        ))}
                        {!tasks.length && <div className="muted">Задач пока нет.</div>}
                    </div>
                </div>
                <div className="panel">
                    <h3>Ближайшие публикации</h3>
                    <div className="timeline">
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Анонс запуска</div>
                                <div className="muted">Telegram · Завтра 10:00</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Итоги в блоге</div>
                                <div className="muted">Сайт · Пятница 15:30</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Демо продукта</div>
                                <div className="muted">YouTube · Понедельник 09:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
