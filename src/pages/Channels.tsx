import { useEffect, useState } from 'react';
import { channelsApi } from '../api/channels';
import type { Channel } from '../types';

const Channels = () => {
    const [channels, setChannels] = useState<Channel[]>([]);

    useEffect(() => {
        channelsApi.list()
            .then((res) => setChannels(res.data.content))
            .catch(() => setChannels([]));
    }, []);

    return (
        <div className="page">
            <div className="page-header">
                <div>
                    <h1>Channels</h1>
                    <p className="muted">Manage publication channels.</p>
                </div>
                <button className="btn primary">Add Channel</button>
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
