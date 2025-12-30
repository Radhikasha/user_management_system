import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Profile from './pages/Profile';
import SecuritySettings from './pages/SecuritySettings';
import ActivityLog from './pages/ActivityLog';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <Users />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Layout>
                  <Profile />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/security" element={
              <ProtectedRoute>
                <Layout>
                  <SecuritySettings />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/activity" element={
              <ProtectedRoute requiredRole="admin">
                <Layout>
                  <ActivityLog />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
