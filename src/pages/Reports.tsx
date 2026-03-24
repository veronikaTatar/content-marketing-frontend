import { useEffect, useState } from 'react';
import { reportsApi } from '../api/reports';
import type { PublicationReport } from '../types';

const Reports = () => {
    const [reports, setReports] = useState<PublicationReport[]>([]);

    useEffect(() => {
        reportsApi.publications()
            .then((res) => setReports(res.data.content))
            .catch(() => setReports([]));
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Publication Report</h1>
                    <p className="muted">Performance of published posts.</p>
                </div>
                <button className="btn ghost">Export CSV</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Content</span>
                        <span>Channel</span>
                        <span>Published</span>
                        <span>Engagement</span>
                    </div>
                    {reports.map((r) => (
                        <div key={r.idPublication} className="table-row">
                            <span>{r.contentTitle}</span>
                            <span>{r.channelName}</span>
                            <span>{r.publishedAt || '-'}</span>
                            <span>{r.likes + r.comments + r.reposts} / {r.views}</span>
                        </div>
                    ))}
                    {!reports.length && <div className="muted">No reports yet.</div>}
                </div>
            </div>
        </div>
    );
};

export default Reports;
