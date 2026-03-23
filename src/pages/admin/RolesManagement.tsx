// pages/admin/RolesManagement.tsx
const RolesManagement = () => {
    const roles = [
        { name: 'ADMIN', description: 'Полный доступ ко всем функциям системы', permissions: 15 },
        { name: 'CONTENT_MANAGER', description: 'Управление задачами, публикациями и аналитикой', permissions: 10 },
        { name: 'AUTHOR', description: 'Создание и редактирование контента', permissions: 5 },
    ];

    return (
        <div>
            <h3>Управление ролями и правами доступа</h3>
            <div className="row mt-4">
                {roles.map((role) => (
                    <div key={role.name} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-header bg-primary text-white">
                                <h5 className="mb-0">{role.name}</h5>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{role.description}</p>
                                <p className="text-muted">Количество прав: {role.permissions}</p>
                                <button className="btn btn-outline-primary btn-sm">
                                    Настроить права
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RolesManagement;