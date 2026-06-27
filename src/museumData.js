// =============================================================
//  museumData.js  —  BẢO TÀNG LỊCH SỬ VÀ BẢN CHẤT DÂN CHỦ
//  Cấu trúc theo nội dung môn MLN131:
//   Lobby → Phòng 1 (Cội Nguồn) → Phòng 2 (Nấc Thang)
//        → Phòng 3 (Bước Ngoặt) → Phòng 4 (Linh Hồn) → Phòng Kết
//  Mỗi phòng nối nhau qua hành lang ngắn.
//  Để thêm ảnh: bỏ file vào public/images/ rồi sửa src trong exhibits.
// =============================================================

// Layout thẳng dọc trục X. Mỗi phòng: [rộng=12, cao=5, sâu=10].
// Hành lang: [rộng=6, cao=3.6, sâu=3].
// Tường: 'solid' = kín, 'door' = chừa cửa giữa rộng 3m.
export const rooms = [

  // ── SẢNH ĐÓN TIẾP ───────────────────────────────────────
  {
    id: 'lobby',
    name: 'Sảnh Đón Tiếp — Welcome Lobby',
    position: [0, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'solid', east: 'door' },
    floorColor: '#1c1208',
    wallColor: '#d8cca6',
  },

  // ── HÀNH LANG 1 ─────────────────────────────────────────
  {
    id: 'corr1',
    name: 'Hành lang',
    position: [9, 0, 0],
    size: [6, 3.6, 3],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#141008',
    wallColor: '#c8be9c',
  },

  // ── PHÒNG 1: CỘI NGUỒN CỦA QUYỀN LỰC ────────────────────
  {
    id: 'room1',
    name: 'Phòng 1 — Cội Nguồn của Quyền Lực',
    position: [18, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#1e1209',
    wallColor: '#ddd3ae',
  },

  // ── HÀNH LANG 2 ─────────────────────────────────────────
  {
    id: 'corr2',
    name: 'Hành lang',
    position: [27, 0, 0],
    size: [6, 3.6, 3],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#141008',
    wallColor: '#c8be9c',
  },

  // ── PHÒNG 2: NHỮNG NẤC THANG THỜI ĐẠI ───────────────────
  {
    id: 'room2',
    name: 'Phòng 2 — Những Nấc Thang Thời Đại',
    position: [36, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#1e1209',
    wallColor: '#ddd3ae',
  },

  // ── HÀNH LANG 3 ─────────────────────────────────────────
  {
    id: 'corr3',
    name: 'Hành lang',
    position: [45, 0, 0],
    size: [6, 3.6, 3],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#141008',
    wallColor: '#c8be9c',
  },

  // ── PHÒNG 3: BƯỚC NGOẶT CÁCH MẠNG ───────────────────────
  {
    id: 'room3',
    name: 'Phòng 3 — Bước Ngoặt Cách Mạng',
    position: [54, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#1e1209',
    wallColor: '#ddd3ae',
  },

  // ── HÀNH LANG 4 ─────────────────────────────────────────
  {
    id: 'corr4',
    name: 'Hành lang',
    position: [63, 0, 0],
    size: [6, 3.6, 3],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#141008',
    wallColor: '#c8be9c',
  },

  // ── PHÒNG 4: LINH HỒN CỦA CHẾ ĐỘ MỚI ────────────────────
  {
    id: 'room4',
    name: 'Phòng 4 — Linh Hồn của Chế Độ Mới',
    position: [72, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#1e1209',
    wallColor: '#ddd3ae',
  },

  // ── HÀNH LANG 5 ─────────────────────────────────────────
  {
    id: 'corr5',
    name: 'Hành lang',
    position: [81, 0, 0],
    size: [6, 3.6, 3],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'door' },
    floorColor: '#141008',
    wallColor: '#c8be9c',
  },

  // ── PHÒNG KẾT: DI SẢN VÀ TƯƠNG LAI ─────────────────────
  {
    id: 'roomket',
    name: 'Phòng Kết — Di Sản và Tương Lai',
    position: [90, 0, 0],
    size: [12, 5, 10],
    walls: { north: 'solid', south: 'solid', west: 'door', east: 'solid' },
    floorColor: '#1c1208',
    wallColor: '#d8cca6',
  },
]

// Vùng đi được (collision), overlap nhẹ ở ngưỡng cửa để đi liền mạch.
export const walkZones = [
  { xMin: -5.8,  xMax: 5.9,  zMin: -4.8, zMax: 4.8 }, // lobby
  { xMin: 5.8,   xMax: 12.2, zMin: -1.3, zMax: 1.3 }, // corr1
  { xMin: 12.1,  xMax: 23.9, zMin: -4.8, zMax: 4.8 }, // room1
  { xMin: 23.8,  xMax: 30.2, zMin: -1.3, zMax: 1.3 }, // corr2
  { xMin: 30.1,  xMax: 41.9, zMin: -4.8, zMax: 4.8 }, // room2
  { xMin: 41.8,  xMax: 48.2, zMin: -1.3, zMax: 1.3 }, // corr3
  { xMin: 48.1,  xMax: 59.9, zMin: -4.8, zMax: 4.8 }, // room3
  { xMin: 59.8,  xMax: 66.2, zMin: -1.3, zMax: 1.3 }, // corr4
  { xMin: 66.1,  xMax: 77.9, zMin: -4.8, zMax: 4.8 }, // room4
  { xMin: 77.8,  xMax: 84.2, zMin: -1.3, zMax: 1.3 }, // corr5
  { xMin: 84.1,  xMax: 95.9, zMin: -4.8, zMax: 4.8 }, // roomket
]

// Điểm xuất phát: đứng trong sảnh, nhìn về phía trước (hướng đông).
export const spawn = { position: [-2, 1.6, 0], lookAt: [6, 1.4, 0] }

// =============================================================
//  TRANH TREO TƯỜNG (PHASE 1: Mỗi phòng 1 exhibit)
// =============================================================
export const exhibits = [
  // Lobby — tường Bắc, x=0, z=-4.88
  {
    type: 'image',
    position: [0, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.6, 3.2],
    frame: 'gold',
    title: 'Bản đồ hành trình tham quan',
    meta: 'Sảnh Đón Tiếp',
    body: 'Sơ đồ tổng thể của bảo tàng, dẫn dắt người xem qua 4 phòng chính từ cội nguồn đến tương lai của dân chủ.',
  },
  // Phòng 1 — tường Bắc, x=18, z=-4.88
  {
    type: 'image',
    position: [18, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.2, 3.6],
    frame: 'gold',
    title: 'DEMOKRATOS — Bình minh của quyền lực',
    meta: 'Thế kỷ VII–VI TCN · "Demos" + "Kratos"',
    body: 'Thuật ngữ "Dân chủ" xuất hiện vào thế kỷ VII–VI trước Công nguyên tại Hy Lạp. "Demos" là nhân dân, "Kratos" là cai trị — nhân dân cai trị.',
  },
  // Phòng 2 — tường Bắc, x=36, z=-4.88
  {
    type: 'image',
    position: [36, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.6, 3.6],
    frame: 'bronze',
    title: 'Ba Nấc Thang Lịch Sử',
    meta: 'Chủ nô → Phong kiến → Tư sản',
    body: 'Ba giai đoạn tiến hóa của nền dân chủ nhân loại: từ dân chủ chủ nô Athens, qua vùng tối phong kiến, đến nền dân chủ tư sản với Cách mạng Pháp 1789.',
  },
  // Phòng 3 — tường Bắc, x=54, z=-4.88
  {
    type: 'image',
    position: [54, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.6, 3.8],
    frame: 'gold',
    title: 'Cách mạng Tháng Mười Nga — 1917',
    meta: 'Petrograd · 7/11/1917 · Bước ngoặt lịch sử',
    body: 'Cuộc cách mạng vô sản đầu tiên thành công trong lịch sử nhân loại. Giai cấp công nhân lần đầu tiên nắm quyền làm chủ đất nước, khai sinh nền dân chủ XHCN.',
  },
  // Phòng 4 — tường Bắc, x=72, z=-4.88
  {
    type: 'image',
    position: [72, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.2, 3.6],
    frame: 'gold',
    title: 'Ba Trụ Cột Dân Chủ XHCN',
    meta: 'Chính trị · Kinh tế · Tư tưởng - Văn hóa',
    body: 'Dân chủ XHCN được xây dựng trên 3 trụ cột: (1) Sự lãnh đạo của Đảng, (2) Công hữu tư liệu sản xuất, (3) Hệ tư tưởng Mác-Lênin.',
  },
  // Phòng Kết — tường Đông, x=95.88
  {
    type: 'image',
    position: [95.88, 2.6, 0],
    rotation: [0, -Math.PI / 2, 0],
    size: [4.0, 3.0],
    frame: 'gold',
    title: '"Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ"',
    meta: 'Hồ Chí Minh · 1953',
    body: 'Câu nói bất hủ của Chủ tịch Hồ Chí Minh — kim chỉ nam xuyên suốt nền Dân chủ Xã hội chủ nghĩa Việt Nam.',
  },
]