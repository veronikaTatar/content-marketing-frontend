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
                setError(err?.response?.data?.message || 'Failed to load content');
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
            setError(err?.response?.data?.message || 'Failed to create content');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Content Library</h1>
                    <p className="muted">Search by title, status, or tags.</p>
                </div>
            </div>

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleCreate}>
                    <label>
                        Title
                        <input name="title" value={form.title} onChange={onChange} required />
                    </label>
                    <label>
                        Status
                        <select name="status" value={form.status} onChange={onChange}>
                            <option value="draft">draft</option>
                            <option value="review">review</option>
                            <option value="approved">approved</option>
                            <option value="rejected">rejected</option>
                        </select>
                    </label>
                    <label>
                        Task ID (optional)
                        <input name="idTask" value={form.idTask} onChange={onChange} />
                    </label>
                    <label>
                        Tags (comma)
                        <input name="tags" value={form.tags} onChange={onChange} />
                    </label>
                    <label>
                        Body
                        <textarea name="body" value={form.body} onChange={onChange} rows={4} />
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating...' : 'Create Content'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="filters">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <input value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Status" />
                <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags: marketing, release" />
                <button className="btn ghost" onClick={search}>Search</button>
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Title</span>
                        <span>Status</span>
                        <span>Tags</span>
                    </div>
                    {items.map((item) => (
                        <div key={item.idContent} className="table-row">
                            <span>{item.title}</span>
                            <span className="badge">{item.status}</span>
                            <span>{item.tags.join(', ')}</span>
                        </div>
                    ))}
                    {!items.length && <div className="muted">No content found.</div>}
                </div>
            </div>
        </div>
    );
};

export default ContentPage;
