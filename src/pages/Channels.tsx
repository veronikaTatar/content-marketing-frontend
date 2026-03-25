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
                setError(err?.response?.data?.message || 'Failed to load channels');
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
            setError(err?.response?.data?.message || 'Failed to create channel');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Channels</h1>
                    <p className="muted">Manage publication channels.</p>
                </div>
            </div>

            <div className="panel form-grid">
                <form className="form-grid" onSubmit={handleCreate}>
                    <label>
                        Name
                        <input name="name" value={form.name} onChange={onChange} required />
                    </label>
                    <label>
                        Platform
                        <input name="platform" value={form.platform} onChange={onChange} required />
                    </label>
                    <label>
                        Active
                        <select name="isActive" value={String(form.isActive)} onChange={onChange}>
                            <option value="true">Active</option>
                            <option value="false">Paused</option>
                        </select>
                    </label>
                    <button className="btn primary" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Add Channel'}
                    </button>
                </form>
                {error && <div className="error">{error}</div>}
            </div>

            <div className="panel">
                <div className="table">
                    <div className="table-row table-head">
                        <span>Name</span>
                        <span>Platform</span>
                        <span>Status</span>
                    </div>
                    {channels.map((ch) => (
                        <div key={ch.idChannel} className="table-row">
                            <span>{ch.name}</span>
                            <span>{ch.platform}</span>
                            <span className={`badge ${ch.isActive ? '' : 'muted'}`}>{ch.isActive ? 'Active' : 'Paused'}</span>
                        </div>
                    ))}
                    {!channels.length && <div className="muted">No channels found.</div>}
                </div>
            </div>
        </div>
    );
};

export default Channels;
