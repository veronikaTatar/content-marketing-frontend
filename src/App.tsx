import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Content from './pages/Content';
import Calendar from './pages/Calendar';
import Channels from './pages/Channels';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import KPI from './pages/KPI';
import Drafts from './pages/Drafts';
import Users from './pages/Users';
import OAuth2Callback from './pages/OAuth2Callback';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/oauth2/callback" element={<OAuth2Callback />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Layout>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tasks"
                element={
                    <ProtectedRoute allowedRoles={['AUTHOR', 'MANAGER']}>
                        <Layout>
                            <Tasks />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/content"
                element={
                    <ProtectedRoute allowedRoles={['AUTHOR', 'MANAGER']}>
                        <Layout>
                            <Content />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/calendar"
                element={
                    <ProtectedRoute allowedRoles={['MANAGER']}>
                        <Layout>
                            <Calendar />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/channels"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <Layout>
                            <Channels />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/reports"
                element={
                    <ProtectedRoute allowedRoles={['MANAGER']}>
                        <Layout>
                            <Reports />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/analytics"
                element={
                    <ProtectedRoute allowedRoles={['MANAGER', 'AUTHOR']}>
                        <Layout>
                            <Analytics />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/kpi"
                element={
                    <ProtectedRoute allowedRoles={['MANAGER']}>
                        <Layout>
                            <KPI />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/drafts"
                element={
                    <ProtectedRoute allowedRoles={['AUTHOR', 'MANAGER']}>
                        <Layout>
                            <Drafts />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route
                path="/users"
                element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                        <Layout>
                            <Users />
                        </Layout>
                    </ProtectedRoute>
                }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
    );
}

export default App;
