const Analytics = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Analytics</h1>
                    <p className="muted">Track engagement and reach trends.</p>
                </div>
                <button className="btn ghost">Sync metrics</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Views</span>
                    <strong>124 400</strong>
                    <span className="stat-foot">+12% this week</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Likes</span>
                    <strong>8 320</strong>
                    <span className="stat-foot">+6% this week</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Reposts</span>
                    <strong>1 140</strong>
                    <span className="stat-foot">+3% this week</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Comments</span>
                    <strong>940</strong>
                    <span className="stat-foot">Stable</span>
                </div>
            </div>

            <div className="panel">
                <h3>Insights</h3>
                <p className="muted">Short-form content yields higher engagement on weekdays. Consider scheduling peak posts on Tue–Thu 10:00.</p>
            </div>
        </div>
    );
};

export default Analytics;
