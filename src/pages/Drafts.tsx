const Drafts = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Черновики</h1>
                    <p className="muted">Черновые материалы, связанные с задачами.</p>
                </div>
                <button className="btn primary">Новый черновик</button>
            </div>

            <div className="panel">
                <div className="list">
                    <div className="list-item">
                        <div>
                            <div className="list-title">Анонс запуска</div>
                            <div className="muted">Задача #12 · v3</div>
                        </div>
                        <span className="badge">Черновик</span>
                    </div>
                    <div className="list-item">
                        <div>
                            <div className="list-title">Серия писем</div>
                            <div className="muted">Задача #18 · v1</div>
                        </div>
                        <span className="badge">На проверке</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drafts;
