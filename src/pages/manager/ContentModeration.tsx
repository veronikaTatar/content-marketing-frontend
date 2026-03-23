// pages/manager/ContentModeration.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface TaskForReview {
    id: number;
    title: string;
    content: string;
    author: string;
    submittedDate: string;
    comments?: string;
}

const ContentModeration = () => {
    const [tasks, setTasks] = useState<TaskForReview[]>([]);
    const [selectedTask, setSelectedTask] = useState<TaskForReview | null>(null);
    const [reviewComment, setReviewComment] = useState('');

    useEffect(() => {
        fetchTasksForReview();
    }, []);

    const fetchTasksForReview = async () => {
        try {
            const response = await api.get('/manager/tasks/review');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleApprove = async (taskId: number) => {
        try {
            await api.post(`/manager/tasks/${taskId}/approve`, { comment: reviewComment });
            fetchTasksForReview();
            setSelectedTask(null);
            setReviewComment('');
        } catch (error) {
            console.error('Error approving task:', error);
        }
    };

    const handleReject = async (taskId: number) => {
        try {
            await api.post(`/manager/tasks/${taskId}/reject`, { comment: reviewComment });
            fetchTasksForReview();
            setSelectedTask(null);
            setReviewComment('');
        } catch (error) {
            console.error('Error rejecting task:', error);
        }
    };

    return (
        <div>
            <h3>Модерация контента</h3>

            <div className="row mt-4">
                <div className="col-md-5">
                    <div className="list-group">
                        {tasks.map((task) => (
                            <button
                                key={task.id}
                                className={`list-group-item list-group-item-action ${selectedTask?.id === task.id ? 'active' : ''}`}
                                onClick={() => setSelectedTask(task)}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{task.title}</h6>
                                    <small>{new Date(task.submittedDate).toLocaleDateString()}</small>
                                </div>
                                <small className="text-muted">Автор: {task.author}</small>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="col-md-7">
                    {selectedTask ? (
                        <div className="card">
                            <div className="card-header">
                                <h5>{selectedTask.title}</h5>
                                <small className="text-muted">Автор: {selectedTask.author}</small>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{selectedTask.content}</p>
                                <hr />
                                <div className="mb-3">
                                    <label className="form-label">Комментарий к ревью</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Оставьте комментарий для автора..."
                                    ></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-success"
                                        onClick={() => handleApprove(selectedTask.id)}
                                    >
                                        <i className="bi bi-check-lg me-2"></i>
                                        Принять
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleReject(selectedTask.id)}
                                    >
                                        <i className="bi bi-x-lg me-2"></i>
                                        Отклонить
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Выберите задачу для проверки
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContentModeration;