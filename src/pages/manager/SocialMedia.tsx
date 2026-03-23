// pages/manager/SocialMedia.tsx
import { useState } from 'react';
import api from '../../api/axios';

const SocialMedia = () => {
    const [connectedAccounts, setConnectedAccounts] = useState([
        { platform: 'VK', connected: true, account: 'vk.com/bguir' },
        { platform: 'Telegram', connected: false, account: '' },
        { platform: 'Instagram', connected: false, account: '' }
    ]);

    const handleConnect = async (platform: string) => {
        try {
            const response = await api.get(`/auth/github/url`);
            alert(`Подключение к ${platform} через OAuth`);
        } catch (error) {
            console.error('Error connecting:', error);
        }
    };

    const handleDisconnect = async (platform: string) => {
        if (window.confirm(`Отключить ${platform}?`)) {
            alert(`${platform} отключен`);
        }
    };

    return (
        <div>
            <h3>Управление социальными сетями</h3>

            <div className="row mt-4">
                {connectedAccounts.map((account) => (
                    <div key={account.platform} className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{account.platform}</h5>
                                {account.connected ? (
                                    <>
                                        <p className="card-text text-success">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Подключен: {account.account}
                                        </p>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDisconnect(account.platform)}
                                        >
                                            Отключить
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p className="card-text text-muted">
                                            Не подключен
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleConnect(account.platform)}
                                        >
                                            Подключить
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mt-4">
                <div className="card-header">
                    <h5>Публикация в социальные сети</h5>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <label className="form-label">Выберите пост для публикации</label>
                        <select className="form-select">
                            <option>Пост 1: Новый контент-план на апрель</option>
                            <option>Пост 2: Аналитика эффективности</option>
                            <option>Пост 3: Советы по контент-маркетингу</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Выберите платформы</label>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="vk" />
                            <label className="form-check-label" htmlFor="vk">
                                VK
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="telegram" />
                            <label className="form-check-label" htmlFor="telegram">
                                Telegram
                            </label>
                        </div>
                    </div>
                    <button className="btn btn-primary">
                        Опубликовать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SocialMedia;