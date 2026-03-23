// pages/admin/BudgetManagement.tsx
import { useState } from 'react';

const BudgetManagement = () => {
    const [budget, setBudget] = useState({
        totalBudget: 10000,
        spent: 4500,
        authorPayments: 3000,
        advertising: 1500
    });

    return (
        <div>
            <h3>Управление бюджетом</h3>

            <div className="row mt-4">
                <div className="col-md-3">
                    <div className="card bg-primary text-white">
                        <div className="card-body">
                            <h6>Общий бюджет</h6>
                            <h3>{budget.totalBudget} BYN</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-warning text-dark">
                        <div className="card-body">
                            <h6>Потрачено</h6>
                            <h3>{budget.spent} BYN</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-info text-white">
                        <div className="card-body">
                            <h6>Остаток</h6>
                            <h3>{budget.totalBudget - budget.spent} BYN</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card bg-success text-white">
                        <div className="card-body">
                            <h6>ROI</h6>
                            <h3>+45%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Расходы по категориям</h5>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label>Оплата авторам: {budget.authorPayments} BYN</label>
                                <div className="progress">
                                    <div
                                        className="progress-bar bg-info"
                                        style={{ width: `${(budget.authorPayments / budget.spent) * 100}%` }}
                                    >
                                        {Math.round((budget.authorPayments / budget.spent) * 100)}%
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Реклама: {budget.advertising} BYN</label>
                                <div className="progress">
                                    <div
                                        className="progress-bar bg-warning"
                                        style={{ width: `${(budget.advertising / budget.spent) * 100}%` }}
                                    >
                                        {Math.round((budget.advertising / budget.spent) * 100)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Финансовые отчеты</h5>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-outline-primary w-100 mb-2">
                                Отчет по эффективности публикаций
                            </button>
                            <button className="btn btn-outline-primary w-100 mb-2">
                                Отчет по оплатам авторам
                            </button>
                            <button className="btn btn-outline-primary w-100">
                                Сводный финансовый отчет
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetManagement;