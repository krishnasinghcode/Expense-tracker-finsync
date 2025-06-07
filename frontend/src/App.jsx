import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';

import Navbar from './components/Navbar';
import Login from './pages/Login';
import Expenses from './pages/Expenses';
import AccountStatement from './pages/AccountStatement';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import { ThemeProvider } from './context/ThemeContext.jsx';

const AppContent = () => {
  const location = useLocation();
  const noNavbarRoutes = ['/login', '/signup'];

  const showNavbar = !noNavbarRoutes.includes(location.pathname);

  return (
    <div className="flex">
      {showNavbar && <Navbar />}
      <div className={showNavbar ? "ml-64 w-full bg-background text-text min-h-screen p-6" : "w-full bg-background text-text min-h-screen p-6"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account-statement"
            element={
              <ProtectedRoute>
                <AccountStatement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
