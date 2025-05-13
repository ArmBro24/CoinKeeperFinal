import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';
import ProtectedRoute from './api/ProtectedRoute';
import './App.css';

function LayoutWrapper({ children }) {
    const location = useLocation();
    const hideNav = ['/login', '/register'].includes(location.pathname);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            {!hideNav && <Navbar />}
            <div className="main-content">
                {children}
            </div>
            <Footer />
        </div>
    );
}

function App() {
    return (
        <Router>
            <LayoutWrapper>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/dashboard" element={
                        <ProtectedRoute><DashboardPage /></ProtectedRoute>
                    } />
                    <Route path="/stats" element={
                        <ProtectedRoute><StatsPage /></ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute><SettingsPage /></ProtectedRoute>
                    } />
                </Routes>
            </LayoutWrapper>
        </Router>
    );
}

export default App;
