import { useEffect, useState } from 'react';
import { tasksApi } from '../api/tasks';
import type { Task } from '../types';

const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [sortBy, setSortBy] = useState('priority');
    const [sortDir, setSortDir] = useState('asc');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        brief: '',
        status: 'new',
        priority: 1,
        complexity: 1,
        deadlineAt: '',
    });

    const load = () => {
        setError(null);
        tasksApi.listMineSorted(sortBy, sortDir)
            .then((res) => setTasks(res.data.content))
            .catch((err) => {
                setTasks([]);
                setError(err?.response?.data?.message || 'Failed to load tasks');
            });
    };

    useEffect(() => {
        load();
    }, [sortBy, sortDir]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await tasksApi.create({
                title: form.title,
                brief: form.brief || null,
                status: form.status,
                priority: Number(form.priority),
                complexity: Number(form.complexity),
                deadlineAt: form.deadlineAt ? new Date(form.deadlineAt).toISOString() : null,
                idUser: null,
            });
            setForm({
                title: '',
                brief: '',
                status: 'new',
                priority: 1,
                complexity: 1,
                deadlineAt: '',
            });
            load();
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to create task');
        } finally {
            setIsSubmitting(false);
        }
    };

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

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleCreate}>
                    <label>
                        Title
                        <input name="title" value={form.title} onChange={onChange} required />
                    </label>
                    <label>
                        Brief
                        <input name="brief" value={form.brief} onChange={onChange} />
                    </label>
                    <label>
                        Status
                        <select name="status" value={form.status} onChange={onChange}>
                            <option value="new">new</option>
                            <option value="in_progress">in_progress</option>
                            <option value="review">review</option>
                            <option value="completed">completed</option>
                        </select>
                    </label>
                    <label>
                        Priority
                        <input name="priority" type="number" min={1} max={5} value={form.priority} onChange={onChange} />
                    </label>
                    <label>
                        Complexity
                        <input name="complexity" type="number" min={1} max={5} value={form.complexity} onChange={onChange} />
                    </label>
                    <label>
                        Deadline
                        <input name="deadlineAt" type="datetime-local" value={form.deadlineAt} onChange={onChange} />
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Task'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
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
