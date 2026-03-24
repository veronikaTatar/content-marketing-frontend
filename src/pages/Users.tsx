const Users = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Users</h1>
                    <p className="muted">Manage roles and access.</p>
                </div>
                <button className="btn primary">Invite user</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Name</span>
                        <span>Email</span>
                        <span>Role</span>
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
