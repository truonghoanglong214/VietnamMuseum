# Hướng Dẫn Deploy Dự Án Bảo Tàng 3D Lên Vercel Thông Qua GitHub

Tài liệu này hướng dẫn chi tiết từng bước để đưa dự án **Bảo tàng 3D (React + Vite + Three.js)** từ máy tính cá nhân lên mạng internet miễn phí thông qua **GitHub** và **Vercel**.

---

## 📋 Mục Lục
1. [Bước 1: Chuẩn Bị Dự Án Trước Khi Push](#bước-1-chuẩn-bị-dự-án-trước-khi-push)
2. [Bước 2: Đẩy Mã Nguồn Lên GitHub](#bước-2-đẩy-mã-nguồn-lên-github)
3. [Bước 3: Kết Nối và Deploy Trên Vercel](#bước-3-kết-nối-và-deploy-trên-vercel)
4. [Bước 4: Cập Nhật Dự Án Tự Động (CI/CD)](#bước-4-cập-nhật-dự-án-tự-động-cicd)
5. [⚠️ Các Lưu Ý Quan Trọng Cho Dự Án 3D/Vite](#️-các-lưu-ý-quan-trọng-cho-dự-án-3dvite)

---

## 🛠️ Bước 1: Chuẩn Bị Dự Án Trước Khi Push

### 1.1. Kiểm tra build ở Local
Trước khi đẩy code lên, hãy mở Terminal trong VS Code (hoặc PowerShell tại thư mục dự án) và chạy lệnh thử nghiệm build để đảm bảo không bị lỗi biên dịch:
```bash
npm run build
```
- Nếu lệnh chạy thành công và tạo ra thư mục `dist`, dự án của bạn đã sẵn sàng!
- (Bạn có thể xóa thư mục `dist` này đi hoặc để nguyên vì `.gitignore` sẽ tự bỏ qua nó).

### 1.2. Kiểm tra file `.gitignore`
Đảm bảo file `.gitignore` ở thư mục gốc có các dòng sau để tránh đẩy các file rác hoặc dung lượng lớn không cần thiết:
```text
node_modules
dist
.DS_Store
*.local
```

---

## 🚀 Bước 2: Đẩy Mã Nguồn Lên GitHub

### 2.1. Tạo Repository Mới Trên GitHub
1. Truy cập [github.com](https://github.com) và đăng nhập tài khoản.
2. Nhấn vào dấu **`+`** ở góc trên bên phải -> Chọn **New repository**.
3. Điền thông tin:
   - **Repository name**: `bao-tang-3d-mln131` (hoặc tên tùy chọn).
   - **Description**: *Dự án Bảo tàng Lịch sử và Bản chất Dân chủ 3D*.
   - **Public / Private**: Chọn **Public** hoặc **Private** tùy nhu cầu (cả hai đều deploy được trên Vercel).
   - *Lưu ý*: **KHÔNG** tích chọn "Add a README file", "Add .gitignore", hay License (để repo trống).
4. Nhấn **Create repository**.

### 2.2. Đẩy Code Từ Máy Tính Lên GitHub
Mở Terminal tại thư mục dự án (`d:\Project\ProjectMonHoc\MLN131\files`) và chạy lần lượt các lệnh sau:

```bash
# 1. Khởi tạo Git (nếu chưa khởi tạo)
git init

# 2. Thêm tất cả các file vào trạng thái chờ commit
git add .

# 3. Commit code với thông điệp đầu tiên
git commit -m "Initial commit - Bao tang 3D MLN131"

# 4. Đổi tên branch chính thành main
git branch -M main

# 5. Liên kết với kho chứa trên GitHub (Thay URL bằng URL repo của bạn)
git remote add origin https://github.com/<TEN_TAI_KHOAN_GITHUB>/bao-tang-3d-mln131.git

# 6. Đẩy code lên GitHub
git push -u origin main
```

---

## 🌐 Bước 3: Kết Nối và Deploy Trên Vercel

### 3.1. Đăng Nhập Vercel
1. Truy cập [vercel.com](https://vercel.com).
2. Nhấn **Log In** hoặc **Sign Up** -> Chọn **Continue with GitHub** để liên kết trực tiếp với tài khoản GitHub của bạn.

### 3.2. Import Dự Án Vào Vercel
1. Tại màn hình Dashboard của Vercel, nhấn nút **Add New...** ở góc phải -> Chọn **Project**.
2. Tìm danh sách kho chứa GitHub của bạn:
   - Nếu chưa thấy dự án `bao-tang-3d-mln131`, nhấn vào nút **Adjust GitHub App Permissions** để cấp quyền cho Vercel truy cập repo đó.
3. Nhấn nút **Import** bên cạnh dự án `bao-tang-3d-mln131`.

### 3.3. Cấu Hình Dự Án (Project Configuration)
Vercel sẽ tự động nhận diện dự án của bạn là **Vite**:
- **Framework Preset**: `Vite` (mặc định)
- **Root Directory**: `./` (mặc định)
- **Build Command**: `npm run build` hoặc `vite build`
- **Output Directory**: `dist`

> 💡 *Lưu ý: Bạn không cần phải chỉnh sửa gì thêm ở bước này.*

### 3.4. Tiến Hành Deploy
1. Nhấn nút **Deploy**.
2. Chờ khoảng 1 - 2 phút để Vercel tải code, cài đặt thư viện (`npm install`) và đóng gói dự án.
3. Khi hoàn tất, màn hình sẽ hiển thị pháo hoa chúc mừng! 🎆
4. Bạn có thể nhấn vào hình ảnh xem trước hoặc nút **Visit** để truy cập đường dẫn trang web công khai (ví dụ: `https://bao-tang-3d-mln131.vercel.app`).

---

## 🔄 Bước 4: Cập Nhật Dự Án Tự Động (CI/CD)

Mỗi khi bạn chỉnh sửa code dưới máy tính và muốn cập nhật lên trang web đang chạy:
1. Mở Terminal và chạy các lệnh:
   ```bash
   git add .
   git commit -m "Cập nhật tính năng mới..."
   git push
   ```
2. Vercel sẽ **tự động phát hiện** commit mới và tiến hành deploy lại phiên bản mới nhất trong vòng vài giây mà bạn không cần thao tác gì thêm trên trang Vercel!

---

## ⚠️ Các Lưu Ý Quan Trọng Cho Dự Án 3D / Vite

### 1. Phân biệt chữ hoa/thường trong tên File (Case Sensitivity)
- Máy tính Windows không phân biệt chữ hoa/thường (ví dụ: `Torch 1.glb` và `torch 1.glb` là một).
- Máy chủ Vercel chạy trên Linux **CÓ** phân biệt chữ hoa/thường.
- **Giải pháp**: Hãy đảm bảo đường dẫn trong code (`/Assets/Torch 1.glb` hoặc `/Pics/Chien-ham-Rang-Dong.jpg`) khớp CHÍNH XÁC từng chữ hoa/thường với tên file thực tế trong thư mục `public/`.

### 2. Dung lượng mô hình 3D (`.glb` / `.gltf`)
- Các file mô hình 3D nằm trong thư mục `public/Assets/` sẽ được trình duyệt tải trực tiếp khi người dùng truy cập.
- Nên giữ dung lượng các file `.glb` ở mức vừa phải (dưới 10MB/file) để đảm bảo trang web load nhanh và không bị trễ trên thiết bị di động.

### 3. Lỗi 404 khi Reload (Nếu có dùng Routing)
- Dự án hiện tại là Single Page App (SPA). Nếu sau này có bổ sung `react-router-dom`, hãy tạo một file `vercel.json` ở thư mục gốc với nội dung sau để tránh lỗi 404 khi F5 trang:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---
🎉 **Chúc bạn deploy dự án thành công và đạt điểm cao trong môn học MLN131!**
