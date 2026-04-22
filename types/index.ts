// Types - định nghĩa kiểu dữ liệu (Bài 2)

export interface NguoiDung {
  maND: number;
  tenDangNhap: string;
  hoTen: string;
  vaiTro: string;
}

export interface LoaiPhong {
  maLoaiPhong: number;
  ma: string;
  ten: string;
  moTa: string;
  soKhachToiDa: number;
}

export interface Phong {
  maPhong: number;
  soPhong: string;
  maLoaiPhong: number;
  tenLoaiPhong: string;
  tinhTrang: 'SanSang' | 'DonDep' | 'BaoTri' | 'DangO';
}

export interface Gia {
  maGia: number;
  maLoaiPhong: number;
  tenLoaiPhong: string;
  tuNgay: string;
  denNgay: string;
  giaMoiDem: number;
  giaMoiGio: number;
  ghiChu: string;
}

export interface Khach {
  maKhach: number;
  hoTen: string;
  dienThoai: string;
  email: string;
  cmnd: string;
  diaChi: string;
}

export interface DatPhong {
  maDatPhong: number;
  maDat: string;
  maKhach: number;
  tenKhach: string;
  dienThoai: string;
  maPhong: number;
  soPhong: string;
  maLoaiPhong: number;
  tenLoaiPhong: string;
  ngayNhan: string;
  ngayTra: string;
  soKhach: number;
  trangThai: string;
  nguoiTaoTen: string;
  ngayTao: string;
  ghiChu: string;
}

export interface DichVu {
  maDV: number;
  ma: string;
  ten: string;
  donGia: number;
  thue: number;
}

export interface HoaDon {
  maHD: number;
  soHD: string;
  maKhach: number;
  tenKhach: string;
  dienThoai: string;
  maND: number;
  nguoiLap: string;
  ngayLap: string;
  tongTien: number;
  hinhThucThanhToan: string;
  soTienDaTra: number;
  soTienConNo: number;
}

export interface HoaDonChiTiet {
  maCTHD: number;
  maHD: number;
  maDatPhong: number | null;
  maDV: number | null;
  soLuong: number;
  donGia: number;
  thanhTien: number;
  tenDichVu: string;
  soPhong: string;
  tenLoaiPhong: string;
}

// Props cho form đăng nhập
export interface LoginForm {
  tenDangNhap: string;
  matKhau: string;
}

// Response từ API
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}