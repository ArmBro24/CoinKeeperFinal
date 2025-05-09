import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import StatsPage from './pages/StatsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('token'); // временная проверка

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/login" />} />
          <Route path="/stats" element={isAuthenticated ? <StatsPage /> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <SettingsPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
  );
}

export default App;
