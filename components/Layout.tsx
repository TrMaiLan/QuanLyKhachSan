// Layout chính - Bài 3 Components, Props
// dùng: Props, React Router Link, useAuth context

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Danh sách menu - Bài 4.2 Lists & Keys
  const menuItems = [
    { path: '/dashboard', label: 'Tổng quan', icon: '📊' },
    { path: '/phong', label: 'Quản lý phòng', icon: '🏠' },
    { path: '/dat-phong', label: 'Đặt phòng', icon: '📅' },
    { path: '/hoa-don', label: 'Hóa đơn', icon: '🧾' },
    { path: '/dich-vu', label: 'Dịch vụ', icon: '🛎️' },
  ];

  return (
    <div style={styles.wrapper}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: collapsed ? 60 : 240 }}>
        {/* Logo */}
        <div style={styles.logo}>
          {!collapsed && <span style={styles.logoText}>🏨 Hotel Manager</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            style={styles.collapseBtn}
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Menu - dùng map (Bài 4.2) */}
        <nav>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.menuItem,
                background:
                  location.pathname === item.path
                    ? '#1a3a5c'
                    : 'transparent',
                borderLeft:
                  location.pathname === item.path
                    ? '3px solid #f4d03f'
                    : '3px solid transparent',
              }}
            >
              <span style={styles.menuIcon}>{item.icon}</span>
              {/* Render có điều kiện - Bài 4.1 */}
              {!collapsed && (
                <span style={styles.menuLabel}>{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Thông tin user ở dưới sidebar */}
        {!collapsed && (
          <div style={styles.userBox}>
            <div style={styles.userName}>👤 {user?.hoTen}</div>
            <div style={styles.userRole}>{user?.vaiTro}</div>
            <button onClick={logout} style={styles.logoutBtn}>
              Đăng xuất
            </button>
          </div>
        )}
      </aside>

      {/* Nội dung chính */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.header}>
          <h2 style={styles.pageTitle}>
            {menuItems.find((m) => m.path === location.pathname)?.label ||
              'Dashboard'}
          </h2>
          <span style={styles.headerUser}>
            Xin chào, <strong>{user?.hoTen}</strong>
          </span>
        </header>

        {/* Nội dung trang */}
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: { display: 'flex', height: '100vh', fontFamily: "'Segoe UI', sans-serif" },
  sidebar: {
    background: '#0f3460', color: 'white',
    display: 'flex', flexDirection: 'column',
    transition: 'width 0.3s', overflow: 'hidden', flexShrink: 0,
  },
  logo: {
    padding: '20px 16px', display: 'flex',
    alignItems: 'center', justifyContent: 'space-between',
    borderBottom: '1px solid #1a3a5c',
  },
  logoText: { fontSize: '15px', fontWeight: 'bold', color: '#f4d03f' },
  collapseBtn: {
    background: 'none', border: '1px solid #f4d03f',
    color: '#f4d03f', cursor: 'pointer',
    borderRadius: '4px', padding: '2px 8px', fontSize: '12px',
  },
  menuItem: {
    display: 'flex', alignItems: 'center',
    padding: '12px 16px', color: '#ecf0f1',
    textDecoration: 'none', transition: 'background 0.2s',
    cursor: 'pointer',
  },
  menuIcon: { fontSize: '18px', minWidth: '24px' },
  menuLabel: { marginLeft: '12px', fontSize: '14px' },
  userBox: {
    marginTop: 'auto', padding: '16px',
    borderTop: '1px solid #1a3a5c',
  },
  userName: { fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' },
  userRole: {
    fontSize: '11px', color: '#bdc3c7',
    marginBottom: '10px',
  },
  logoutBtn: {
    width: '100%', padding: '8px',
    background: '#e74c3c', color: 'white',
    border: 'none', borderRadius: '6px',
    cursor: 'pointer', fontSize: '13px',
  },
  main: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  header: {
    background: 'white', padding: '16px 24px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  pageTitle: { margin: 0, fontSize: '20px', color: '#2c3e50' },
  headerUser: { fontSize: '14px', color: '#7f8c8d' },
  content: { flex: 1, overflow: 'auto', padding: '24px', background: '#f0f2f5' },
};

export default Layout;