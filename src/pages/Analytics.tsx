const Analytics = () => {
    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Аналитика</h1>
                    <p className="muted">Отслеживайте вовлечённость и охват.</p>
                </div>
                <button className="btn ghost">Синхронизировать метрики</button>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <span className="stat-label">Просмотры</span>
                    <strong>124 400</strong>
                    <span className="stat-foot">+12% за неделю</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Лайки</span>
                    <strong>8 320</strong>
                    <span className="stat-foot">+6% за неделю</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Репосты</span>
                    <strong>1 140</strong>
                    <span className="stat-foot">+3% за неделю</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Комментарии</span>
                    <strong>940</strong>
                    <span className="stat-foot">Стабильно</span>
                </div>
            </div>

            <div className="panel">
                <h3>Инсайты</h3>
                <p className="muted">Короткие форматы дают больше вовлечённости в будни. Планируйте ключевые публикации на вт–чт в 10:00.</p>
            </div>
        </div>
    );
};

export default Analytics;
