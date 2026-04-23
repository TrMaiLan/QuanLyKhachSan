// Trang Quản lý Phòng - Bài 4.1, 4.2, 4.6
// dùng: useState, useEffect, render có điều kiện, list & keys

import React, { useState, useEffect } from 'react';
import { roomService } from '../services/api';
import { Phong } from '../types';

const RoomPage: React.FC = () => {
  const [phongList, setPhongList] = useState<Phong[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Phong | null>(null);
  const [form, setForm] = useState({ soPhong: '', maLoaiPhong: 1, tinhTrang: 'SanSang' });
  const [error, setError] = useState('');

  // Load danh sách phòng
  useEffect(() => {
    loadPhong();
  }, []);

  const loadPhong = async () => {
    try {
      setLoading(true);
      const res = await roomService.getAll();
      setPhongList(res.data || []);
    } catch {
      setError('Không thể tải danh sách phòng');
    } finally {
      setLoading(false);
    }
  };

  // Mở form thêm mới
  const handleAdd = () => {
    setEditing(null);
    setForm({ soPhong: '', maLoaiPhong: 1, tinhTrang: 'SanSang' });
    setShowForm(true);
  };

  // Mở form sửa
  const handleEdit = (phong: Phong) => {
    setEditing(phong);
    setForm({ soPhong: phong.soPhong, maLoaiPhong: phong.maLoaiPhong, tinhTrang: phong.tinhTrang });
    setShowForm(true);
  };

  // Xóa phòng
  const handleDelete = async (id: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa phòng này?')) return;
    try {
      await roomService.delete(id);
      loadPhong();
    } catch {
      alert('Xóa thất bại!');
    }
  };

  // Submit form thêm/sửa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await roomService.update(editing.maPhong, form);
      } else {
        await roomService.create(form);
      }
      setShowForm(false);
      loadPhong();
    } catch {
      alert('Lưu thất bại!');
    }
  };

  // Màu tình trạng phòng
  const getTinhTrangColor = (tt: string) => {
    const map: { [key: string]: string } = {
      SanSang: '#2ecc71', DonDep: '#f39c12',
      BaoTri: '#e74c3c', DaNhan: '#3498db',
    };
    return map[tt] || '#95a5a6';
  };

  return (
    <div>
      {/* Header trang */}
      <div style={styles.pageHeader}>
        <h3 style={styles.title}>Danh sách phòng</h3>
        <button onClick={handleAdd} style={styles.btnAdd}>+ Thêm phòng</button>
      </div>

      {/* Render có điều kiện - Bài 4.1 */}
      {error && <div style={styles.errorBox}>{error}</div>}
      {loading ? (
        <div style={styles.loading}>Đang tải...</div>
      ) : (
        <div style={styles.tableWrap}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thead}>
                <th style={styles.th}>Số phòng</th>
                <th style={styles.th}>Loại phòng</th>
                <th style={styles.th}>Tình trạng</th>
                <th style={styles.th}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {/* Lists & Keys - Bài 4.2 */}
              {phongList.map((phong) => (
                <tr key={phong.maPhong} style={styles.tr}>
                  <td style={styles.td}><strong>{phong.soPhong}</strong></td>
                  <td style={styles.td}>{phong.tenLoaiPhong || phong.maLoaiPhong}</td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, background: getTinhTrangColor(phong.tinhTrang) }}>
                      {phong.tinhTrang}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button onClick={() => handleEdit(phong)} style={styles.btnEdit}>Sửa</button>
                    <button onClick={() => handleDelete(phong.maPhong)} style={styles.btnDelete}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal form - render có điều kiện Bài 4.1 */}
      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3 style={styles.modalTitle}>
              {editing ? 'Sửa phòng' : 'Thêm phòng mới'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Số phòng</label>
                <input
                  style={styles.input}
                  value={form.soPhong}
                  onChange={(e) => setForm({ ...form, soPhong: e.target.value })}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Tình trạng</label>
                <select
                  style={styles.input}
                  value={form.tinhTrang}
                  onChange={(e) => setForm({ ...form, tinhTrang: e.target.value })}
                >
                  <option value="SanSang">Sẵn sàng</option>
                  <option value="DonDep">Đang dọn dẹp</option>
                  <option value="BaoTri">Bảo trì</option>
                  <option value="DaNhan">Đã nhận</option>
                </select>
              </div>
              <div style={styles.modalFooter}>
                <button type="button" onClick={() => setShowForm(false)} style={styles.btnCancel}>
                  Hủy
                </button>
                <button type="submit" style={styles.btnSave}>
                  {editing ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  title: { margin: 0, color: '#2c3e50', fontSize: '18px' },
  btnAdd: { padding: '10px 20px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' },
  errorBox: { background: '#ffeaea', border: '1px solid #e74c3c', color: '#c0392b', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  loading: { textAlign: 'center', padding: '40px' },
  tableWrap: { background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  thead: { background: '#f8f9fa' },
  th: { padding: '14px 16px', textAlign: 'left', fontSize: '13px', color: '#7f8c8d', fontWeight: '600', borderBottom: '1px solid #eee' },
  tr: { borderBottom: '1px solid #f0f0f0' },
  td: { padding: '14px 16px', fontSize: '14px', color: '#2c3e50' },
  badge: { padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: 'white', fontWeight: '500' },
  btnEdit: { padding: '6px 14px', background: '#3498db', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', marginRight: '8px', fontSize: '13px' },
  btnDelete: { padding: '6px 14px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' },
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modal: { background: 'white', borderRadius: '12px', padding: '32px', width: '440px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' },
  modalTitle: { margin: '0 0 24px 0', color: '#2c3e50', fontSize: '18px' },
  formGroup: { marginBottom: '16px' },
  label: { display: 'block', fontSize: '14px', fontWeight: '500', color: '#2c3e50', marginBottom: '6px' },
  input: { width: '100%', padding: '10px 12px', border: '1.5px solid #ddd', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
  modalFooter: { display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '24px' },
  btnCancel: { padding: '10px 20px', background: '#ecf0f1', color: '#2c3e50', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  btnSave: { padding: '10px 20px', background: '#0f3460', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
};

export default RoomPage;