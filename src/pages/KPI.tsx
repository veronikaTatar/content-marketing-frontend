const KPI = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>KPI Goals</h1>
                    <p className="muted">Set monthly engagement targets.</p>
                </div>
                <button className="btn primary">Save goals</button>
            </div>

            <div className="panel form-grid">
                <label>
                    Target Likes
                    <input type="number" placeholder="5000" />
                </label>
                <label>
                    Target Views
                    <input type="number" placeholder="120000" />
                </label>
                <label>
                    Target Reposts
                    <input type="number" placeholder="1200" />
                </label>
            </div>
        </div>
    );
};

export default KPI;
