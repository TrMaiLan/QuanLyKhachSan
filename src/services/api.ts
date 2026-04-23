// services/api.ts - Gọi API (Bài 4.6)
// dùng: axios, async/await

import axios from 'axios';

// ===== Cấu hình axios =====
const BASE_URL = 'https://localhost:7001/api'; // ← sửa port theo API .NET của bạn

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Tự động gắn token vào mọi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Xử lý lỗi 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===== Auth =====
export const authService = {
  login: (tenDangNhap: string, matKhau: string) =>
    api.post('/account/login', { tenDangNhap, matKhau }),
};

// ===== Phòng =====
export const roomService = {
  getAll: () => api.get('/room'),
  getById: (id: number) => api.get(`/room/${id}`),
  create: (data: any) => api.post('/room', data),
  update: (id: number, data: any) => api.put(`/room/${id}`, data),
  delete: (id: number) => api.delete(`/room/${id}`),
};

// ===== Loại phòng =====
export const roomTypeService = {
  getAll: () => api.get('/roomtype'),
  getById: (id: number) => api.get(`/roomtype/${id}`),
  create: (data: any) => api.post('/roomtype', data),
  update: (id: number, data: any) => api.put(`/roomtype/${id}`, data),
  delete: (id: number) => api.delete(`/roomtype/${id}`),
};

// ===== Đặt phòng =====
export const bookingService = {
  getAll: () => api.get('/booking'),
  getById: (id: number) => api.get(`/booking/${id}`),
  create: (data: any) => api.post('/booking', data),
  update: (id: number, data: any) => api.put(`/booking/${id}`, data),
  delete: (id: number) => api.delete(`/booking/${id}`),
};

// ===== Khách hàng =====
export const customerService = {
  getAll: () => api.get('/customer'),
  getById: (id: number) => api.get(`/customer/${id}`),
  create: (data: any) => api.post('/customer', data),
  update: (id: number, data: any) => api.put(`/customer/${id}`, data),
  delete: (id: number) => api.delete(`/customer/${id}`),
};

// ===== Hóa đơn =====
export const invoiceService = {
  getAll: () => api.get('/invoice'),
  getById: (id: number) => api.get(`/invoice/${id}`),
  getDetail: (id: number) => api.get(`/invoice/${id}/detail`),
  create: (data: any) => api.post('/invoice', data),
  update: (id: number, data: any) => api.put(`/invoice/${id}`, data),
};

// ===== Dịch vụ =====
export const serviceService = {
  getAll: () => api.get('/service'),
  getById: (id: number) => api.get(`/service/${id}`),
  create: (data: any) => api.post('/service', data),
  update: (id: number, data: any) => api.put(`/service/${id}`, data),
  delete: (id: number) => api.delete(`/service/${id}`),
};

// ===== Bảng giá =====
export const roomRateService = {
  getAll: () => api.get('/roomrate'),
  create: (data: any) => api.post('/roomrate', data),
  update: (id: number, data: any) => api.put(`/roomrate/${id}`, data),
  delete: (id: number) => api.delete(`/roomrate/${id}`),
};

export default api;