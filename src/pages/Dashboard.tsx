import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks';
import type { Task } from '../types';

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
                    <h1>Dashboard</h1>
                    <p className="muted">Overview of your content pipeline.</p>
                </div>
                <div className="header-actions">
                    <button className="btn ghost">New Task</button>
                    <button className="btn primary">Plan Publication</button>
                </div>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Active Tasks</span>
                    <strong>{tasks.length}</strong>
                    <span className="stat-foot">Tracked today</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Drafts</span>
                    <strong>6</strong>
                    <span className="stat-foot">In review</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Scheduled</span>
                    <strong>4</strong>
                    <span className="stat-foot">Next 7 days</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Engagement</span>
                    <strong>+18%</strong>
                    <span className="stat-foot">MoM</span>
                </div>
            </div>

            <div className="grid-two">
                <div className="panel">
                    <h3>Priority Tasks</h3>
                    <div className="list">
                        {tasks.slice(0, 5).map((task) => (
                            <div key={task.idTask} className="list-item">
                                <div>
                                    <div className="list-title">{task.title}</div>
                                    <div className="muted">Priority {task.priority} · Complexity {task.complexity}</div>
                                </div>
                                <span className="badge">{task.status}</span>
                            </div>
                        ))}
                        {!tasks.length && <div className="muted">No tasks yet.</div>}
                    </div>
                </div>
                <div className="panel">
                    <h3>Next Publications</h3>
                    <div className="timeline">
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Launch post</div>
                                <div className="muted">Telegram · Tomorrow 10:00</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Blog recap</div>
                                <div className="muted">Website · Friday 15:30</div>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot" />
                            <div>
                                <div className="list-title">Product demo</div>
                                <div className="muted">YouTube · Monday 09:00</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
