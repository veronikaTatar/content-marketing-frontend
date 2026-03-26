import { useEffect, useState } from 'react';
import { channelsApi } from '../api/channels';
import type { Channel } from '../types';

const Channels = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', platform: '', isActive: true });

    const load = () => {
        setError(null);
        channelsApi.list()
            .then((res) => setChannels(res.data.content))
            .catch((err) => {
                setChannels([]);
                setError(err?.response?.data?.message || 'Не удалось загрузить каналы');
            });
    };

    useEffect(() => {
        load();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.name === 'isActive' ? e.target.value === 'true' : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await channelsApi.create(form);
            setForm({ name: '', platform: '', isActive: true });
            load();
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Не удалось создать канал');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Каналы</h1>
                    <p className="muted">Управление каналами публикации.</p>
                </div>
            </div>

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleCreate}>
                    <label>
                        Название
                        <input name="name" value={form.name} onChange={onChange} required />
                    </label>
                    <label>
                        Платформа
                        <input name="platform" value={form.platform} onChange={onChange} required />
                    </label>
                    <label>
                        Активен
                        <select name="isActive" value={String(form.isActive)} onChange={onChange}>
                            <option value="true">Активен</option>
                            <option value="false">Пауза</option>
                        </select>
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Сохраняем...' : 'Добавить канал'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Название</span>
                        <span>Платформа</span>
                        <span>Статус</span>
                    </div>
                    {channels.map((ch) => (
                        <div key={ch.idChannel} className="table-row">
                            <span>{ch.name}</span>
                            <span>{ch.platform}</span>
                            <span className={`badge ${ch.isActive ? '' : 'muted'}`}>{ch.isActive ? 'Активен' : 'Пауза'}</span>
                        </div>
                    ))}
                    {!channels.length && <div className="muted">Каналы не найдены.</div>}
                </div>
            </div>
        </div>
    );
};

export default Channels;
