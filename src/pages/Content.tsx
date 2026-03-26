import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import type { Content } from '../types';

const ContentPage = () => {
    const [items, setItems] = useState<Content[]>([]);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [tags, setTags] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '',
        body: '',
        status: 'draft',
        idTask: '',
        tags: '',
    });

    const search = () => {
        const params = new URLSearchParams();
        if (title) params.set('title', title);
        if (status) params.set('status', status);
        if (tags) {
            tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => params.append('tags', t));
        }
        const query = params.toString() ? `?${params.toString()}` : '';
        setError(null);
        contentApi.search(query)
            .then((res) => setItems(res.data.content))
            .catch((err) => {
                setItems([]);
                setError(err?.response?.data?.message || 'Не удалось загрузить контент');
            });
    };

    useEffect(() => {
        search();
    }, []);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);
        try {
            await contentApi.create({
                title: form.title,
                body: form.body,
                status: form.status,
                idTask: form.idTask ? Number(form.idTask) : null,
                tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
            });
            setForm({ title: '', body: '', status: 'draft', idTask: '', tags: '' });
            search();
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Не удалось создать контент');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Библиотека контента</h1>
                    <p className="muted">Поиск по названию, статусу или тегам.</p>
                </div>
            </div>

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleCreate}>
                    <label>
                        Название
                        <input name="title" value={form.title} onChange={onChange} required />
                    </label>
                    <label>
                        Статус
                        <select name="status" value={form.status} onChange={onChange}>
                            <option value="draft">draft</option>
                            <option value="review">review</option>
                            <option value="approved">approved</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </label>
                    <label>
                        ID задачи (необязательно)
                        <input name="idTask" value={form.idTask} onChange={onChange} />
                    </label>
                    <label>
                        Теги (через запятую)
                        <input name="tags" value={form.tags} onChange={onChange} />
                    </label>
                    <label>
                        Текст
                        <textarea name="body" value={form.body} onChange={onChange} rows={4} />
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Создаём...' : 'Создать контент'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="filters">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Название" />
                <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Статус" />
                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Теги: маркетинг, релиз" />
                <button className="btn ghost" onClick={search}>Найти</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Название</span>
                        <span>Статус</span>
                        <span>Теги</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.idContent} className="table-row">
                            <span>{item.title}</span>
                            <span className="badge">{item.status}</span>
                            <span>{item.tags.join(', ')}</span>
                        </div>
                    ))}
                    {!items.length && <div className="muted">Контент не найден.</div>}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
