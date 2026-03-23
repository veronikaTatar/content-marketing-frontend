// pages/manager/TasksManagement.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Task {
    id: number;
    title: string;
    description: string;
    author: string;
    deadline: string;
    status: string;
    kpi: string;
}

const TasksManagement = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        authorId: '',
        deadline: '',
        kpi: ''
    });
    const [authors, setAuthors] = useState<any[]>([]);

    useEffect(() => {
        fetchTasks();
        fetchAuthors();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('/manager/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const fetchAuthors = async () => {
        try {
            const response = await api.get('/manager/authors');
            setAuthors(response.data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const handleCreateTask = async () => {
        try {
            await api.post('/manager/tasks', newTask);
            setShowModal(false);
            setNewTask({ title: '', description: '', authorId: '', deadline: '', kpi: '' });
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleDeleteTask = async (id: number) => {
        if (window.confirm('Удалить задачу?')) {
            try {
                await api.delete(`/manager/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error('Error deleting task:', error);
            }
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'NEW': return 'bg-secondary';
            case 'IN_PROGRESS': return 'bg-primary';
            case 'REVIEW': return 'bg-warning';
            case 'COMPLETED': return 'bg-success';
            default: return 'bg-secondary';
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Управление задачами</h3>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Создать задачу
                </button>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex={-1}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Новая задача</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Название задачи</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Описание</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Автор</label>
                                    <select
                                        className="form-select"
                                        value={newTask.authorId}
                                        onChange={(e) => setNewTask({...newTask, authorId: e.target.value})}
                                    >
                                        <option value="">Выберите автора</option>
                                        {authors.map(author => (
                                            <option key={author.id} value={author.id}>{author.fullName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Дедлайн</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newTask.deadline}
                                        onChange={(e) => setNewTask({...newTask, deadline: e.target.value})}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">KPI (целевые показатели)</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Например: минимум 100 лайков, 50 комментариев"
                                        value={newTask.kpi}
                                        onChange={(e) => setNewTask({...newTask, kpi: e.target.value})}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Отмена
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleCreateTask}>
                                    Создать
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Название</th>
                        <th>Автор</th>
                        <th>Дедлайн</th>
                        <th>Статус</th>
                        <th>KPI</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.id}</td>
                            <td>{task.title}</td>
                            <td>{task.author}</td>
                            <td>{new Date(task.deadline).toLocaleDateString()}</td>
                            <td>
                                    <span className={`badge ${getStatusBadge(task.status)}`}>
                                        {task.status === 'NEW' && 'Новая'}
                                        {task.status === 'IN_PROGRESS' && 'В работе'}
                                        {task.status === 'REVIEW' && 'На проверке'}
                                        {task.status === 'COMPLETED' && 'Выполнена'}
                                    </span>
                            </td>
                            <td>{task.kpi}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteTask(task.id)}
                                >
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

export default TasksManagement;