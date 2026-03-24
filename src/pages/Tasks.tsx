import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks';
import type { Task } from '../types';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortBy, setSortBy] = useState('priority');
    const [sortDir, setSortDir] = useState('asc');

    const load = () => {
        tasksApi.listMineSorted(sortBy, sortDir)
            .then((res) => setTasks(res.data.content))
            .catch(() => setTasks([]));
    };

    useEffect(() => {
        load();
    }, [sortBy, sortDir]);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Tasks</h1>
                    <p className="muted">Sort by priority or complexity.</p>
                </div>
                <div className="header-actions">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="priority">Priority</option>
                        <option value="complexity">Complexity</option>
                    </select>
                    <select value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                </div>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Title</span>
                        <span>Status</span>
                        <span>Priority</span>
                        <span>Complexity</span>
                    </div>
                    {tasks.map((task) => (
                        <div key={task.idTask} className="table-row">
                            <span>{task.title}</span>
                            <span className="badge muted">{task.status}</span>
                            <span>{task.priority}</span>
                            <span>{task.complexity}</span>
                        </div>
                    ))}
                    {!tasks.length && <div className="muted">No tasks loaded.</div>}
                </div>
            </div>
        </div>
    );
};

export default Tasks;
