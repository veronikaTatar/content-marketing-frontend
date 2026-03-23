// pages/author/Drafts.tsx
import { useState } from 'react';

interface Draft {
    id: number;
    title: string;
    lastEdited: string;
    content: string;
}

const Drafts = () => {
    const [drafts, setDrafts] = useState<Draft[]>([
        { id: 1, title: 'Черновик статьи о контент-маркетинге', lastEdited: '2026-03-20', content: 'Текст статьи...' },
        { id: 2, title: 'Идеи для постов в VK', lastEdited: '2026-03-19', content: 'Список идей...' }
    ]);
    const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
    const [editedContent, setEditedContent] = useState('');

    const handleSaveDraft = () => {
        if (selectedDraft) {
            setDrafts(drafts.map(d =>
                d.id === selectedDraft.id
                    ? { ...d, content: editedContent, lastEdited: new Date().toISOString().split('T')[0] }
                    : d
            ));
            alert('Черновик сохранен');
        }
    };

    const handleDeleteDraft = (id: number) => {
        if (window.confirm('Удалить черновик?')) {
            setDrafts(drafts.filter(d => d.id !== id));
            if (selectedDraft?.id === id) {
                setSelectedDraft(null);
            }
        }
    };

    return (
        <div>
            <h3>Черновики</h3>

            <div className="row mt-4">
                <div className="col-md-5">
                    <div className="list-group">
                        {drafts.map((draft) => (
                            <button
                                key={draft.id}
                                className={`list-group-item list-group-item-action ${selectedDraft?.id === draft.id ? 'active' : ''}`}
                                onClick={() => {
                                    setSelectedDraft(draft);
                                    setEditedContent(draft.content);
                                }}
                            >
                                <div className="d-flex w-100 justify-content-between">
                                    <h6 className="mb-1">{draft.title}</h6>
                                    <small>{draft.lastEdited}</small>
                                </div>
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn btn-primary w-100 mt-3"
                        onClick={() => alert('Создание нового черновика')}
                    >
                        + Новый черновик
                    </button>
                </div>

                <div className="col-md-7">
                    {selectedDraft ? (
                        <div className="card">
                            <div className="card-header">
                                <h5>{selectedDraft.title}</h5>
                            </div>
                            <div className="card-body">
                                <textarea
                                    className="form-control mb-3"
                                    rows={10}
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                ></textarea>
                                <button className="btn btn-success me-2" onClick={handleSaveDraft}>
                                    Сохранить
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteDraft(selectedDraft.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="alert alert-info">
                            Выберите черновик для редактирования
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Drafts;