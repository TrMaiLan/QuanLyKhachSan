/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
// ============================================
// App.tsx - cấu hình React Router (Bài 5.1)
// dùng: BrowserRouter, Route, Switch/Routes
// bảo vệ route bằng PrivateRoute
// ============================================

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/layout/Layout';

// Import các trang
import LoginPage from './pages/Auth/LoginPage';
import Dashboard from './pages/Dashboard/Dashboard';
import PhongPage from './pages/Room/PhongPage';
import DatPhongPage from './pages/Booking/DatPhongPage';

// PrivateRoute - bảo vệ trang cần đăng nhập
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  // Nếu chưa login thì redirect về trang login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Layout>{children}</Layout>;
};

// PublicRoute - nếu đã login thì không cho vào trang login
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Trang công khai */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Trang cần đăng nhập */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/phong"
            element={
              <PrivateRoute>
                <PhongPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dat-phong"
            element={
              <PrivateRoute>
                <DatPhongPage />
              </PrivateRoute>
            }
          />

          {/* Redirect mặc định */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;