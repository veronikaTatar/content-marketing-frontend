// pages/admin/UsersManagement.tsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';

interface User {
    idUser: number;
    login: string;
    email: string;
    fullName: string;
    role: string;
    isActive: boolean;
    authProvider?: string;
    idProvider?: string;
}

const UsersManagement = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<'login' | 'fullName' | 'email' | 'role' | 'isActive'>('login');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [formData, setFormData] = useState({
        login: '',
        email: '',
        password: '',
        fullName: '',
        role: 'AUTHOR'
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        filterAndSortUsers();
    }, [users, searchTerm, sortField, sortOrder]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await api.get('/admin/users');
            console.log('Users fetched:', response.data);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            alert('Ошибка загрузки пользователей');
        } finally {
            setLoading(false);
        }
    };

    const filterAndSortUsers = () => {
        let filtered = [...users];

        // Поиск
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.login.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Сортировка
        filtered.sort((a, b) => {
            let aVal = a[sortField];
            let bVal = b[sortField];

            if (sortField === 'isActive') {
                aVal = a.isActive ? 1 : 0;
                bVal = b.isActive ? 1 : 0;
            }

            if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setFilteredUsers(filtered);
    };

    const handleSort = (field: 'login' | 'fullName' | 'email' | 'role' | 'isActive') => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    const handleAddUser = () => {
        setIsEditing(false);
        setSelectedUser(null);
        setFormData({
            login: '',
            email: '',
            password: '',
            fullName: '',
            role: 'AUTHOR'
        });
        setShowModal(true);
    };

    const handleEditUser = (user: User) => {
        setIsEditing(true);
        setSelectedUser(user);
        setFormData({
            login: user.login,
            email: user.email,
            password: '', // Не заполняем пароль при редактировании
            fullName: user.fullName,
            role: user.role
        });
        setShowModal(true);
    };

    const handleDeleteUser = (user: User) => {
        setSelectedUser(user);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        if (!selectedUser) return;

        try {
            await api.delete(`/admin/users/${selectedUser.idUser}`);
            alert('Пользователь удален');
            fetchUsers();
            setShowDeleteConfirm(false);
            setSelectedUser(null);
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Ошибка при удалении пользователя');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEditing && selectedUser) {
                // Редактирование
                await api.patch(`/admin/users/${selectedUser.idUser}`, {
                    login: formData.login,
                    email: formData.email,
                    fullName: formData.fullName,
                    role: formData.role,
                    ...(formData.password && { password: formData.password })
                });
                alert('Пользователь обновлен');
            } else {
                // Создание нового пользователя
                await api.post('/admin/users', formData);
                alert('Пользователь создан');
            }
            setShowModal(false);
            fetchUsers();
        } catch (error: any) {
            console.error('Error saving user:', error);
            alert(error.response?.data?.message || 'Ошибка при сохранении пользователя');
        }
    };

    const handleBlockToggle = async (user: User) => {
        const action = user.isActive ? 'заблокировать' : 'разблокировать';
        if (window.confirm(`Вы уверены, что хотите ${action} пользователя ${user.fullName}?`)) {
            try {
                if (user.isActive) {
                    await api.patch(`/admin/users/${user.idUser}/block`);
                } else {
                    await api.patch(`/admin/users/${user.idUser}/unblock`);
                }
                fetchUsers();
            } catch (error) {
                console.error('Error toggling user status:', error);
                alert('Ошибка при изменении статуса пользователя');
            }
        }
    };

    const getRoleBadge = (role: string) => {
        switch (role) {
            case 'ADMIN':
                return <span className="badge bg-danger">Администратор</span>;
            case 'CONTENT_MANAGER':
                return <span className="badge bg-primary">Контент-менеджер</span>;
            case 'AUTHOR':
                return <span className="badge bg-success">Автор</span>;
            default:
                return <span className="badge bg-secondary">{role}</span>;
        }
    };

    const getSortIcon = (field: string) => {
        if (sortField !== field) return <i className="bi bi-arrow-down-up ms-1"></i>;
        return sortOrder === 'asc'
            ? <i className="bi bi-arrow-up ms-1"></i>
            : <i className="bi bi-arrow-down ms-1"></i>;
    };

    if (loading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
                <p className="mt-2">Загрузка пользователей...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3>Управление сотрудниками</h3>
                <button className="btn btn-primary" onClick={handleAddUser}>
                    <i className="bi bi-plus-circle me-2"></i>
                    Добавить сотрудника
                </button>
            </div>

            {/* Поиск */}
            <div className="mb-4">
                <div className="input-group">
                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Поиск по логину, email или ФИО..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => setSearchTerm('')}
                        >
                            <i className="bi bi-x-lg"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Таблица пользователей */}
            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('login')}>
                            Логин {getSortIcon('login')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('fullName')}>
                            ФИО {getSortIcon('fullName')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('email')}>
                            Email {getSortIcon('email')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('role')}>
                            Роль {getSortIcon('role')}
                        </th>
                        <th style={{ cursor: 'pointer' }} onClick={() => handleSort('isActive')}>
                            Статус {getSortIcon('isActive')}
                        </th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center py-4">
                                <div className="text-muted">
                                    <i className="bi bi-inbox fs-1"></i>
                                    <p className="mt-2">Пользователи не найдены</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        filteredUsers.map((user) => (
                            <tr key={user.idUser}>
                                <td>{user.login}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{getRoleBadge(user.role)}</td>
                                <td>
                                        <span className={`badge ${user.isActive ? 'bg-success' : 'bg-secondary'}`}>
                                            {user.isActive ? 'Активен' : 'Заблокирован'}
                                        </span>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => handleEditUser(user)}
                                        title="Редактировать"
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        className={`btn btn-sm ${user.isActive ? 'btn-outline-warning' : 'btn-outline-success'} me-2`}
                                        onClick={() => handleBlockToggle(user)}
                                        title={user.isActive ? 'Заблокировать' : 'Разблокировать'}
                                    >
                                        <i className={`bi ${user.isActive ? 'bi-lock' : 'bi-unlock'}`}></i>
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDeleteUser(user)}
                                        title="Удалить"
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Статистика */}
            <div className="mt-3 text-muted">
                <small>
                    Всего: {users.length} |
                    Активных: {users.filter(u => u.isActive).length} |
                    Заблокированных: {users.filter(u => !u.isActive).length} |
                    Найдено: {filteredUsers.length}
                </small>
            </div>

            {/* Модальное окно добавления/редактирования */}
            {showModal && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {isEditing ? 'Редактирование пользователя' : 'Добавление пользователя'}
                                </h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Логин *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.login}
                                            onChange={(e) => setFormData({...formData, login: e.target.value})}
                                            required
                                            disabled={isEditing}
                                        />
                                        {isEditing && <small className="text-muted">Логин нельзя изменить</small>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Email *</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">
                                            {isEditing ? 'Новый пароль (оставьте пустым, чтобы не менять)' : 'Пароль *'}
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={formData.password}
                                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                                            required={!isEditing}
                                            minLength={6}
                                        />
                                        {!isEditing && <small className="text-muted">Минимум 6 символов</small>}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">ФИО *</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Роль</label>
                                        <select
                                            className="form-select"
                                            value={formData.role}
                                            onChange={(e) => setFormData({...formData, role: e.target.value})}
                                        >
                                            <option value="AUTHOR">Автор</option>
                                            <option value="CONTENT_MANAGER">Контент-менеджер</option>
                                            <option value="ADMIN">Администратор</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                        Отмена
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        {isEditing ? 'Сохранить' : 'Создать'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно подтверждения удаления */}
            {showDeleteConfirm && selectedUser && (
                <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Подтверждение удаления</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Вы уверены, что хотите удалить пользователя?</p>
                                <p><strong>{selectedUser.fullName}</strong> ({selectedUser.login})</p>
                                <p className="text-danger">Это действие нельзя отменить!</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>
                                    Отмена
                                </button>
                                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersManagement;