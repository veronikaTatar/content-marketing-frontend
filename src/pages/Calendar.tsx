import { useEffect, useState } from 'react';
import { publicationsApi } from '../api/publications';
import type { Publication } from '../types';

const Calendar = () => {
    const [items, setItems] = useState<Publication[]>([]);

    useEffect(() => {
        const from = new Date();
        const to = new Date();
        to.setDate(to.getDate() + 14);
        publicationsApi.calendar(from.toISOString(), to.toISOString())
            .then((res) => setItems(res.data.content))
            .catch(() => setItems([]));
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Publication Calendar</h1>
                    <p className="muted">Scheduled posts for the next two weeks.</p>
                </div>
                <button className="btn primary">Schedule Publication</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Content</span>
                        <span>Channel</span>
                        <span>Status</span>
                        <span>Scheduled</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.idPublication} className="table-row">
                            <span>#{item.idContent}</span>
                            <span>#{item.idChannel}</span>
                            <span className="badge">{item.status}</span>
                            <span>{item.scheduledAt || '-'}</span>
                        </div>
                    ))}
                    {!items.length && <div className="muted">No scheduled items.</div>}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
