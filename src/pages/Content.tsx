import { useEffect, useState } from 'react';
import { contentApi } from '../api/content';
import type { Content } from '../types';

const ContentPage = () => {
    const [items, setItems] = useState<Content[]>([]);
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('');
    const [tags, setTags] = useState('');

    const search = () => {
        const params = new URLSearchParams();
        if (title) params.set('title', title);
        if (status) params.set('status', status);
        if (tags) {
            tags.split(',').map((t) => t.trim()).filter(Boolean).forEach((t) => params.append('tags', t));
        }
        const query = params.toString() ? `?${params.toString()}` : '';
        contentApi.search(query)
            .then((res) => setItems(res.data.content))
            .catch(() => setItems([]));
    };

    useEffect(() => {
        search();
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Content Library</h1>
                    <p className="muted">Search by title, status, or tags.</p>
                </div>
                <button className="btn primary">Create Content</button>
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
