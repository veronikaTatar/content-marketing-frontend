import { useEffect, useState } from 'react';
import { reportsApi } from '../api/reports';
import type { PublicationReport } from '../types';

const Reports = () => {
    const [reports, setReports] = useState<PublicationReport[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setError(null);
        reportsApi.publications()
            .then((res) => setReports(res.data.content))
            .catch((err) => {
                setReports([]);
                setError(err?.response?.data?.message || 'Не удалось загрузить отчёт');
            });
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Отчёт по публикациям</h1>
                    <p className="muted">Эффективность опубликованных постов.</p>
                </div>
                <button className="btn ghost">Экспорт CSV</button>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Контент</span>
                        <span>Канал</span>
                        <span>Опубликовано</span>
                        <span>Вовлечённость</span>
                    </div>
                    {reports.map((r) => (
                        <div key={r.idPublication} className="table-row">
                            <span>{r.contentTitle}</span>
                            <span>{r.channelName}</span>
                            <span>{r.publishedAt || '-'}</span>
                            <span>{r.likes + r.comments + r.reposts} / {r.views}</span>
                        </div>
                    ))}
                    {!reports.length && <div className="muted">Отчётов пока нет.</div>}
                </div>
            </div>
        </div>
    );
};

export default Reports;
