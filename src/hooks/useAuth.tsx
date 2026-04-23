// useAuth - Context API + Custom Hook (Bài 4.4 + 6.1.3.3 + 6.1.3.4)
// dùng: createContext, useContext, useState, useReducer

import React, { createContext, useContext, useReducer } from 'react';
import { NguoiDung } from '../types';

// ===== 1. Định nghĩa kiểu =====
interface AuthState {
  user: NguoiDung | null;
  token: string | null;
  isLoggedIn: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; user: NguoiDung; token: string }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  login: (user: NguoiDung, token: string) => void;
  logout: () => void;
}

// ===== 2. Reducer - Bài 6.1.3.4 useReducer =====
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.user, token: action.token, isLoggedIn: true };
    case 'LOGOUT':
      return { user: null, token: null, isLoggedIn: false };
    default:
      return state;
  }
};

// ===== 3. Tạo Context - Bài 4.4 =====
const AuthContext = createContext<AuthContextType | null>(null);

// ===== 4. Lấy state ban đầu từ localStorage =====
const getInitialState = (): AuthState => {
  try {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (token && userStr) {
      return { user: JSON.parse(userStr), token, isLoggedIn: true };
    }
  } catch {}
  return { user: null, token: null, isLoggedIn: false };
};

// ===== 5. AuthProvider bọc toàn app =====
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, getInitialState());

  const login = (user: NguoiDung, token: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', user, token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ===== 6. Custom Hook - Bài 6.1.3.5 Custom Hooks =====
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth phải dùng trong AuthProvider');
  return ctx;
};

export default useAuth;