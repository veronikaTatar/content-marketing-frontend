// pages/admin/SystemSettings.tsx
import { useState } from 'react';

const SystemSettings = () => {
    const [settings, setSettings] = useState({
        companyName: 'БГУИР Контент-Маркетинг',
        logo: '',
        emailNotifications: true,
        defaultTaskDeadline: 3,
        language: 'ru'
    });

    const handleSave = () => {
        alert('Настройки сохранены');
    };

    return (
        <div>
            <h3>Настройки системы</h3>

            <div className="card mt-4">
                <div className="card-body">
                    <h5>Общие настройки</h5>
                    <div className="mb-3">
                        <label className="form-label">Название компании</label>
                        <input
                            type="text"
                            className="form-control"
                            value={settings.companyName}
                            onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Логотип</label>
                        <input type="file" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                checked={settings.emailNotifications}
                                onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                            />
                            <label className="form-check-label">Включить email-уведомления</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Дедлайн по умолчанию (дней)</label>
                        <input
                            type="number"
                            className="form-control"
                            value={settings.defaultTaskDeadline}
                            onChange={(e) => setSettings({...settings, defaultTaskDeadline: parseInt(e.target.value)})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Язык интерфейса</label>
                        <select
                            className="form-select"
                            value={settings.language}
                            onChange={(e) => setSettings({...settings, language: e.target.value})}
                        >
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                            <option value="be">Беларуская</option>
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={handleSave}>
                        Сохранить настройки
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SystemSettings;