const Users = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Пользователи</h1>
                    <p className="muted">Управление ролями и доступом.</p>
                </div>
                <button className="btn primary">Пригласить пользователя</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Имя</span>
                        <span>Email</span>
                        <span>Роль</span>
                    </div>
                    <div className="table-row">
                        <span>Мария Сергеева</span>
                        <span>mary@gmail.com</span>
                        <span className="badge">AUTHOR</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
