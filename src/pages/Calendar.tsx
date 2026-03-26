import { useEffect, useState } from 'react';
import { publicationsApi } from '../api/publications';
import { contentApi } from '../api/content';
import { channelsApi } from '../api/channels';
import type { Publication, Content, Channel } from '../types';

const Calendar = () => {
    const [items, setItems] = useState<Publication[]>([]);
    const [contents, setContents] = useState<Content[]>([]);
    const [channels, setChannels] = useState<Channel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        idContent: '',
        idChannel: '',
        scheduledAt: '',
    });

    const load = () => {
        const from = new Date();
        const to = new Date();
        to.setDate(to.getDate() + 14);
        setError(null);
        publicationsApi.calendar(from.toISOString(), to.toISOString())
            .then((res) => setItems(res.data.content))
            .catch((err) => {
                setItems([]);
                setError(err?.response?.data?.message || 'Не удалось загрузить календарь');
            });
    };

    useEffect(() => {
        load();
        contentApi.search('')
            .then((res) => setContents(res.data.content))
            .catch(() => setContents([]));
        channelsApi.list()
            .then((res) => setChannels(res.data.content))
            .catch(() => setChannels([]));
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSchedule = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await publicationsApi.schedule({
                idContent: Number(form.idContent),
                idChannel: Number(form.idChannel),
                scheduledAt: form.scheduledAt ? new Date(form.scheduledAt).toISOString() : null,
            });
            setForm({ idContent: '', idChannel: '', scheduledAt: '' });
            load();
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Не удалось запланировать публикацию');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Календарь публикаций</h1>
                    <p className="muted">Запланированные публикации на ближайшие две недели.</p>
                </div>
            </div>

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleSchedule}>
                    <label>
                        Контент
                        <select name="idContent" value={form.idContent} onChange={onChange} required>
                            <option value="">Выберите контент</option>
                            {contents.map((c) => (
                                <option key={c.idContent} value={c.idContent}>{c.title}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Канал
                        <select name="idChannel" value={form.idChannel} onChange={onChange} required>
                            <option value="">Выберите канал</option>
                            {channels.map((ch) => (
                                <option key={ch.idChannel} value={ch.idChannel}>{ch.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Время публикации
                        <input name="scheduledAt" type="datetime-local" value={form.scheduledAt} onChange={onChange} />
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Планируем...' : 'Запланировать публикацию'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Контент</span>
                        <span>Канал</span>
                        <span>Статус</span>
                        <span>Запланировано</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.idPublication} className="table-row">
                            <span>#{item.idContent}</span>
                            <span>#{item.idChannel}</span>
                            <span className="badge">{item.status}</span>
                            <span>{item.scheduledAt || '-'}</span>
                        </div>
                    ))}
                    {!items.length && <div className="muted">Нет запланированных публикаций.</div>}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
