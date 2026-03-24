const Drafts = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Drafts</h1>
                    <p className="muted">Work-in-progress content linked to tasks.</p>
                </div>
                <button className="btn primary">New Draft</button>
            </div>

            <div className="panel">
                <div className="list">
                    <div className="list-item">
                        <div>
                            <div className="list-title">Launch teaser</div>
                            <div className="muted">Task #12 · v3</div>
                        </div>
                        <span className="badge">Draft</span>
                    </div>
                    <div className="list-item">
                        <div>
                            <div className="list-title">Email sequence</div>
                            <div className="muted">Task #18 · v1</div>
                        </div>
                        <span className="badge">Review</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drafts;
