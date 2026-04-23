// ============================================
// Trang Đăng Nhập (Bài 8.1)
// dùng: useState, useEffect, react-hook-form
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { authService } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dùng react-hook-form để quản lý form (Bài 6.1.3.5)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // Xử lý submit form (Bài 5.2)
  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setError('');

      const response = await authService.login(data.tenDangNhap, data.matKhau);
      const { token, user } = response.data;

      login(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      {/* Phần bên trái - hình ảnh khách sạn */}
      <div style={styles.leftPanel}>
        <div style={styles.overlay}>
          <h1 style={styles.brandName}>🏨 Hotel Manager</h1>
          <p style={styles.brandDesc}>Hệ thống quản lý khách sạn chuyên nghiệp</p>
          <div style={styles.features}>
            <div style={styles.featureItem}>✓ Quản lý đặt phòng dễ dàng</div>
            <div style={styles.featureItem}>✓ Theo dõi doanh thu theo thời gian thực</div>
            <div style={styles.featureItem}>✓ Quản lý dịch vụ linh hoạt</div>
          </div>
        </div>
      </div>

      {/* Phần bên phải - form đăng nhập */}
      <div style={styles.rightPanel}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Đăng nhập</h2>
          <p style={styles.subtitle}>Vui lòng nhập thông tin tài khoản</p>

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div style={styles.errorBox}>
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input tên đăng nhập */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Tên đăng nhập</label>
              <input
                type="text"
                placeholder="Nhập tên đăng nhập"
                style={{
                  ...styles.input,
                  borderColor: errors.tenDangNhap ? '#e74c3c' : '#ddd',
                }}
                {...register('tenDangNhap', {
                  required: 'Vui lòng nhập tên đăng nhập',
                })}
              />
              {errors.tenDangNhap && (
                <span style={styles.errorText}>{errors.tenDangNhap.message}</span>
              )}
            </div>

            {/* Input mật khẩu */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Mật khẩu</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu"
                style={{
                  ...styles.input,
                  borderColor: errors.matKhau ? '#e74c3c' : '#ddd',
                }}
                {...register('matKhau', {
                  required: 'Vui lòng nhập mật khẩu',
                  minLength: {
                    value: 3,
                    message: 'Mật khẩu phải từ 3 ký tự trở lên',
                  },
                })}
              />
              {errors.matKhau && (
                <span style={styles.errorText}>{errors.matKhau.message}</span>
              )}
            </div>

            {/* Nút đăng nhập */}
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.btnLogin,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p style={styles.hint}>
            Tài khoản mẫu: <strong>admin01</strong> / <strong>123456</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: 'flex',
    height: '100vh',
    fontFamily: "'Segoe UI', sans-serif",
  },
  leftPanel: {
    flex: 1,
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  overlay: {
    color: 'white',
    textAlign: 'center',
  },
  brandName: {
    fontSize: '36px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#f4d03f',
  },
  brandDesc: {
    fontSize: '16px',
    color: '#bdc3c7',
    marginBottom: '40px',
  },
  features: {
    textAlign: 'left',
    display: 'inline-block',
  },
  featureItem: {
    fontSize: '15px',
    color: '#ecf0f1',
    marginBottom: '12px',
    paddingLeft: '8px',
  },
  rightPanel: {
    width: '460px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    padding: '40px',
  },
  formCard: {
    background: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    width: '100%',
  },
  title: {
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#2c3e50',
    margin: '0 0 8px 0',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '14px',
    marginBottom: '28px',
  },
  errorBox: {
    background: '#ffeaea',
    border: '1px solid #e74c3c',
    color: '#c0392b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2c3e50',
    marginBottom: '8px',
  },
  input: {
    width: '100%',
    padding: '11px 14px',
    fontSize: '14px',
    border: '1.5px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: '12px',
    marginTop: '5px',
    display: 'block',
  },
  btnLogin: {
    width: '100%',
    padding: '13px',
    background: '#0f3460',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    marginTop: '8px',
    transition: 'background 0.2s',
  },
  hint: {
    textAlign: 'center' as const,
    color: '#7f8c8d',
    fontSize: '13px',
    marginTop: '20px',
  },
};

export default LoginPage;