// pages/author/MyTasks.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface Task {
    id: number;
    title: string;
    description: string;
    deadline: string;
    status: string;
    kpi: string;
}

const MyTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [content, setContent] = useState('');
    const [showSubmitForm, setShowSubmitForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const fetchMyTasks = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        console.log('Token exists:', !!token);

        if (!token) {
            setError('Не авторизован. Пожалуйста, войдите в систему.');
            setLoading(false);
            return;
        }

        try {
            const response = await api.get('/author/tasks');
            console.log('Tasks response:', response.data);
            setTasks(response.data);
        } catch (error: any) {
            console.error('Error fetching tasks:', error);
            if (error.response?.status === 401) {
                setError('Сессия истекла. Пожалуйста, войдите заново.');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            } else if (error.code === 'ERR_NETWORK') {
                setError('Ошибка сети. Убедитесь, что бэкенд запущен на http://localhost:8080');
            } else {
                setError(error.response?.data?.message || 'Ошибка загрузки задач');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitTask = async (taskId: number) => {
        try {
            await api.post(`/author/tasks/${taskId}/submit`, { content });
            alert('Задача отправлена на проверку');
            setShowSubmitForm(false);
            setContent('');
            fetchMyTasks();
        } catch (error) {
            console.error('Error submitting task:', error);
            alert('Ошибка при отправке задачи');
        }
    };

    const handleDeclineTask = async (taskId: number) => {
        if (window.confirm('Вы уверены, что хотите отказаться от задачи?')) {
            try {
                await api.post(`/author/tasks/${taskId}/decline`);
                fetchMyTasks();
            } catch (error) {
                console.error('Error declining task:', error);
                alert('Ошибка при отказе от задачи');
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

    const getStatusText = (status: string) => {
        switch (status) {
            case 'NEW': return 'Новая';
            case 'IN_PROGRESS': return 'В работе';
            case 'REVIEW': return 'На проверке';
            case 'COMPLETED': return 'Выполнена';
            default: return status;
        }
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-2">Загрузка задач...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                <h5>Ошибка загрузки</h5>
                <p>{error}</p>
                <button className="btn btn-primary" onClick={fetchMyTasks}>
                    Попробовать снова
                </button>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="alert alert-info" role="alert">
                <h5>Нет задач</h5>
                <p>У вас пока нет активных задач. Ожидайте назначения от контент-менеджера.</p>
            </div>
        );
    }

    return (
        <div>
            <h3>Мои задачи</h3>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="list-group">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                className={`list-group-item list-group-item-action ${selectedTask?.id === task.id ? 'active' : ''}`}
                                onClick={() => setSelectedTask(task)}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{task.title}</h6>
                                    <span className={`badge ${getStatusBadge(task.status)}`}>
                                        {getStatusText(task.status)}
                                    </span>
                                </div>
                                <small className="text-muted">
                                    Дедлайн: {new Date(task.deadline).toLocaleDateString()}
                                </small>
                                <br />
                                <small>KPI: {task.kpi}</small>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-md-6">
                    {selectedTask && (
                        <div className="card">
                            <div className="card-header">
                                <h5>{selectedTask.title}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{selectedTask.description}</p>
                                <hr />
                                {selectedTask.status !== 'COMPLETED' && selectedTask.status !== 'REVIEW' && (
                                    <>
                                        {showSubmitForm && selectedTask.id === selectedTask.id ? (
                                            <>
                                                <div className="mb-3">
                                                    <label className="form-label">Ваш материал</label>
                                                    <textarea
                                                        className="form-control"
                                                        rows={5}
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}
                                                        placeholder="Введите текст материала..."
                                                    ></textarea>
                                                </div>
                                                <button
                                                    className="btn btn-success me-2"
                                                    onClick={() => handleSubmitTask(selectedTask.id)}
                                                >
                                                    Отправить на проверку
                                                </button>
                                                <button
                                                    className="btn btn-secondary"
                                                    onClick={() => setShowSubmitForm(false)}
                                                >
                                                    Отмена
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn btn-primary me-2"
                                                    onClick={() => setShowSubmitForm(true)}
                                                >
                                                    Сдать материал
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() => handleDeclineTask(selectedTask.id)}
                                                >
                                                    Отказаться от задачи
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                                {selectedTask.status === 'REVIEW' && (
                                    <div className="alert alert-warning">
                                        <i className="bi bi-clock-history me-2"></i>
                                        Материал на проверке у контент-менеджера
                                    </div>
                                )}
                                {selectedTask.status === 'COMPLETED' && (
                                    <div className="alert alert-success">
                                        <i className="bi bi-check-circle-fill me-2"></i>
                                        Задача выполнена!
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyTasks;