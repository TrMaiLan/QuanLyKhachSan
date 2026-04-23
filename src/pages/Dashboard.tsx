// Dashboard - Bài 6.1.3.2 useEffect, Bài 4.6 gọi API
import React, { useState, useEffect } from 'react';
import { roomService, bookingService } from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    tongPhong: 0, phongTrong: 0,
    datPhongHomNay: 0, doanhThu: 0,
  });
  const [loading, setLoading] = useState(true);

  // useEffect gọi API khi component mount - Bài 6.1.3.2
  useEffect(() => {
    const loadStats = async () => {
      try {
        const [phongRes, datPhongRes] = await Promise.all([
          roomService.getAll(),
          bookingService.getAll(),
        ]);
        const phong = phongRes.data || [];
        const datPhong = datPhongRes.data || [];
        setStats({
          tongPhong: phong.length,
          phongTrong: phong.filter((p: any) => p.tinhTrang === 'SanSang').length,
          datPhongHomNay: datPhong.filter((d: any) =>
            new Date(d.ngayTao).toDateString() === new Date().toDateString()
          ).length,
          doanhThu: 0,
        });
      } catch (err) {
        console.error('Lỗi load dashboard:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  // Dữ liệu thẻ thống kê - dùng map (Bài 4.2 Lists & Keys)
  const statCards = [
    { label: 'Tổng số phòng', value: stats.tongPhong, icon: '🏠', color: '#3498db' },
    { label: 'Phòng trống', value: stats.phongTrong, icon: '✅', color: '#2ecc71' },
    { label: 'Đặt phòng hôm nay', value: stats.datPhongHomNay, icon: '📅', color: '#e67e22' },
    { label: 'Doanh thu tháng', value: `${stats.doanhThu.toLocaleString()}đ`, icon: '💰', color: '#9b59b6' },
  ];

  if (loading) return <div style={styles.loading}>Đang tải...</div>;

  return (
    <div>
      <h3 style={styles.sectionTitle}>Tổng quan hệ thống</h3>

      {/* Thẻ thống kê - dùng map + key (Bài 4.2) */}
      <div style={styles.cardGrid}>
        {statCards.map((card) => (
          <div key={card.label} style={{ ...styles.card, borderTop: `4px solid ${card.color}` }}>
            <div style={styles.cardIcon}>{card.icon}</div>
            <div>
              <div style={styles.cardValue}>{card.value}</div>
              <div style={styles.cardLabel}>{card.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  loading: { textAlign: 'center', padding: '40px', fontSize: '16px' },
  sectionTitle: { margin: '0 0 20px 0', color: '#2c3e50', fontSize: '18px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  card: {
    background: 'white', borderRadius: '10px',
    padding: '20px', display: 'flex',
    alignItems: 'center', gap: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardIcon: { fontSize: '36px' },
  cardValue: { fontSize: '24px', fontWeight: 'bold', color: '#2c3e50' },
  cardLabel: { fontSize: '13px', color: '#7f8c8d', marginTop: '4px' },
};

export default Dashboard;