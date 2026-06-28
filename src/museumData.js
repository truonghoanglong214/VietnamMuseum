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
  { xMin: -5.8, xMax: 5.9, zMin: -4.8, zMax: 4.8 }, // lobby
  { xMin: 5.8, xMax: 12.2, zMin: -1.3, zMax: 1.3 }, // corr1
  { xMin: 12.1, xMax: 23.9, zMin: -4.8, zMax: 4.8 }, // room1
  { xMin: 23.8, xMax: 30.2, zMin: -1.3, zMax: 1.3 }, // corr2
  { xMin: 30.1, xMax: 41.9, zMin: -4.8, zMax: 4.8 }, // room2
  { xMin: 41.8, xMax: 48.2, zMin: -1.3, zMax: 1.3 }, // corr3
  { xMin: 48.1, xMax: 59.9, zMin: -4.8, zMax: 4.8 }, // room3
  { xMin: 59.8, xMax: 66.2, zMin: -1.3, zMax: 1.3 }, // corr4
  { xMin: 66.1, xMax: 77.9, zMin: -4.8, zMax: 4.8 }, // room4
  { xMin: 77.8, xMax: 84.2, zMin: -1.3, zMax: 1.3 }, // corr5
  { xMin: 84.1, xMax: 95.9, zMin: -4.8, zMax: 4.8 }, // roomket
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
    src: '/Pics/anh_sanh.png',
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
    src: '/Pics/anh_phong1.jpeg',
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
    src: '/Pics/anh_phong2.png',
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
    src: '/Pics/anh_phong3.jpg',
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
    src: '/Pics/anh_phong4.jpg',
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
    src: '/Pics/phong-cuoi.png',
    title: '"Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ"',
    meta: 'Hồ Chí Minh · 1953',
    body: 'Câu nói bất hủ của Chủ tịch Hồ Chí Minh — kim chỉ nam xuyên suốt nền Dân chủ Xã hội chủ nghĩa Việt Nam.',
  },
  // Phòng 3 (Bổ sung) — tường Nam, x=54, z=4.88
  {
    type: 'image',
    position: [54, 2.8, 4.88],
    rotation: [0, Math.PI, 0],
    size: [3.6, 2.6],
    frame: 'gold',
    src: '/Pics/Chien-ham-Rang-Dong.jpg',
    title: 'Tàu Tuần Dương Rạng Đông (Aurora)',
    meta: 'Chiến hạm biểu tượng · Khai hỏa 1917',
    body: 'Tiếng súng đại bác từ tàu tuần dương Rạng Đông vào đêm 7/11/1917 tại Saint Petersburg đã phát lệnh tấn công Cung điện Mùa Đông, mở ra kỷ nguyên mới cho nền dân chủ công-nông.',
  },
  // Phòng Kết (Bổ sung) — tường Bắc, x=90, z=-4.88
  {
    type: 'image',
    position: [90, 2.8, -4.88],
    rotation: [0, 0, 0],
    size: [3.2, 3.8],
    frame: 'gold',
    src: '/Pics/ChandungHCM.jpg',
    title: 'Chân dung Chủ tịch Hồ Chí Minh',
    meta: 'Lãnh tụ vĩ đại · Khai sinh nước VNDCCH 1945',
    body: 'Chủ tịch Hồ Chí Minh đã vận dụng sáng tạo chủ nghĩa Mác-Lênin vào thực tiễn Việt Nam, khẳng định "Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân".',
  },
]

// =============================================================
//  DANH SÁCH HỆ THỐNG TƯƠNG TÁC (PHASE 1: Interactables)
// =============================================================
export const interactables = [
  // === TRANH TREO TƯỜNG (type: 'image') ===
  {
    id: 'lobby-map',
    type: 'image',
    position: [0, 2.8, -4.88],
    imageSrc: '/Pics/anh_sanh.png',
    title: 'Bản đồ hành trình tham quan',
    meta: 'Sảnh Đón Tiếp',
    description: 'Sơ đồ tổng thể của bảo tàng, dẫn dắt người xem qua 4 phòng chính từ cội nguồn đến tương lai của dân chủ.',
    interactRadius: 3.5,
  },
  {
    id: 'demokratos',
    type: 'image',
    position: [18, 2.8, -4.88],
    imageSrc: '/Pics/anh_phong1.jpeg',
    title: 'DEMOKRATOS — Bình minh của quyền lực',
    meta: 'Thế kỷ VII–VI TCN · "Demos" + "Kratos"',
    description: 'Thuật ngữ "Dân chủ" xuất hiện vào thế kỷ VII–VI trước Công nguyên tại Hy Lạp. "Demos" là nhân dân, "Kratos" là cai trị — nhân dân cai trị.',
    interactRadius: 3.5,
  },
  {
    id: 'ba-nac-thang',
    type: 'image',
    position: [36, 2.8, -4.88],
    imageSrc: '/Pics/anh_phong2.png',
    title: 'Ba Nấc Thang Lịch Sử',
    meta: 'Chủ nô → Phong kiến → Tư sản',
    description: 'Ba giai đoạn tiến hóa của nền dân chủ nhân loại: từ dân chủ chủ nô Athens, qua vùng tối phong kiến, đến nền dân chủ tư sản với Cách mạng Pháp 1789.',
    interactRadius: 3.5,
  },
  {
    id: 'cach-mang-thang-muoi',
    type: 'image',
    position: [54, 2.8, -4.88],
    imageSrc: '/Pics/anh_phong3.jpg',
    title: 'Cách mạng Tháng Mười Nga — 1917',
    meta: 'Petrograd · 7/11/1917 · Bước ngoặt lịch sử',
    description: 'Cuộc cách mạng vô sản đầu tiên thành công trong lịch sử nhân loại. Giai cấp công nhân lần đầu tiên nắm quyền làm chủ đất nước, khai sinh nền dân chủ XHCN.',
    interactRadius: 3.5,
  },
  {
    id: 'ba-tru-cot',
    type: 'image',
    position: [72, 2.8, -4.88],
    imageSrc: '/Pics/anh_phong4.jpg',
    title: 'Ba Trụ Cột Dân Chủ XHCN',
    meta: 'Chính trị · Kinh tế · Tư tưởng - Văn hóa',
    description: 'Dân chủ XHCN được xây dựng trên 3 trụ cột: (1) Sự lãnh đạo của Đảng, (2) Công hữu tư liệu sản xuất, (3) Hệ tư tưởng Mác-Lênin.',
    interactRadius: 3.5,
  },
  {
    id: 'ho-chi-minh-quote',
    type: 'image',
    position: [95.88, 2.6, 0],
    imageSrc: '/Pics/phong-cuoi.png',
    title: '"Nước ta là nước dân chủ, địa vị cao nhất là dân, vì dân là chủ"',
    meta: 'Hồ Chí Minh · 1953',
    description: 'Câu nói bất hủ của Chủ tịch Hồ Chí Minh — kim chỉ nam xuyên suốt nền Dân chủ Xã hội chủ nghĩa Việt Nam.',
    interactRadius: 3.5,
  },
  {
    id: 'tau-rang-dong',
    type: 'image',
    position: [54, 2.8, 4.88],
    imageSrc: '/Pics/Chien-ham-Rang-Dong.jpg',
    title: 'Tàu Tuần Dương Rạng Đông (Aurora)',
    meta: 'Chiến hạm biểu tượng · Khai hỏa 1917',
    description: 'Tiếng súng đại bác từ tàu tuần dương Rạng Đông vào đêm 7/11/1917 tại Saint Petersburg đã phát lệnh tấn công Cung điện Mùa Đông, mở ra kỷ nguyên mới cho nền dân chủ công-nông.',
    interactRadius: 3.5,
  },
  {
    id: 'ho-chi-minh-portrait',
    type: 'image',
    position: [90, 2.8, -4.88],
    imageSrc: '/Pics/ChandungHCM.jpg',
    title: 'Chân dung Chủ tịch Hồ Chí Minh',
    meta: 'Lãnh tụ vĩ đại · Khai sinh nước VNDCCH 1945',
    description: 'Chủ tịch Hồ Chí Minh đã vận dụng sáng tạo chủ nghĩa Mác-Lênin vào thực tiễn Việt Nam, khẳng định "Bao nhiêu lợi ích đều vì dân. Bao nhiêu quyền hạn đều của dân".',
    interactRadius: 3.5,
  },

  // === ASSET 3D (type: 'model') ===
  {
    id: 'trong-dong',
    type: 'model',
    position: [0, 0, 0],
    modelUrl: '/Assets/trong_ong_ong_son_-_viet_nam.glb',
    title: 'Trống Đồng Đông Sơn',
    meta: 'Sảnh Đón Tiếp · Biểu tượng văn hóa Việt',
    description: 'Trống đồng Đông Sơn là biểu tượng tiêu biểu của nền văn minh Việt cổ, thể hiện trình độ đúc đồng và nghệ thuật trang trí tinh xảo của người Việt cổ.',
    interactRadius: 2.5,
  },
  {
    id: 'tribe-staff',
    type: 'model',
    position: [18, 0, 1.5],
    modelUrl: '/Assets/tribe_staff.glb',
    title: 'Gậy Thù Trưởng — Dân Chủ Nguyên Thủy',
    meta: 'Phòng 1 · Thời kỳ Cộng sản Nguyên thủy',
    description: '“Dân chủ nguyên thủy” được xem là hình thức manh nha của nền dân chủ đầu tiên của nhân loại. — Ph.Ăng-ghen',
    interactRadius: 2.5,
  },
  {
    id: 'spartan-helmet',
    type: 'model',
    position: [15.5, 0, -1.8],
    modelUrl: '/Assets/pbr_spartan_helmet.glb',
    title: 'Nón Chiến Binh Spartan',
    meta: 'Phòng 1 · Vũ khí và Giáp trụ Hy Lạp',
    description: 'Mũ cối chiến binh Spartan biểu tượng cho tinh thần dũng cảm và kỷ luật của các thành quốc Hy Lạp cổ đại.',
    interactRadius: 2.5,
  },
  {
    id: 'tuong-bac',
    type: 'model',
    position: [20.5, 0, -1.8],
    modelUrl: '/Assets/tuong_bac.glb',
    title: 'Tượng Chủ tịch Hồ Chí Minh',
    meta: 'Lãnh tụ vĩ đại của Dân tộc Việt Nam',
    description: `Bức tượng khắc họa chân dung Chủ tịch Hồ Chí Minh — Anh hùng giải phóng dân tộc, Danh nhân văn hóa thế giới, người đặt nền móng cho nền dân chủ nhân dân tại Việt Nam.

- Chế độ mới (03/09/1945): Khai sinh chế độ dân chủ với bản chất cốt lõi là "dân làm chủ".
- Bản chất chính quyền (1953): Khẳng định chính quyền thuộc về nhân dân, "nhân dân là ông chủ nắm chính quyền".`,
    interactRadius: 2.5,
  },
  {
    id: 'ancient-scroll',
    type: 'model',
    position: [18, 0, -2.0],
    modelUrl: '/Assets/ancient_scroll_and_parchment.glb',
    title: 'Cuộn Sách Cổ Hy Lạp',
    meta: 'Phòng 1 · Tác phẩm triết học',
    description: 'Những cuộn sách da ghi chép tư tưởng triết học và định ước pháp lý đầu tiên của văn minh Địa Trung Hải.',
    interactRadius: 2.5,
  },
  {
    id: 'round-chain',
    type: 'model',
    position: [33, 0, 0],
    modelUrl: '/Assets/round_chain.glb',
    title: 'Xiềng Xích Nô Lệ',
    meta: 'Phòng 2 · Thời kỳ Dân chủ Chủ nô',
    description: 'Xiềng xích tượng trưng cho sự bóc lột người nô lệ trong thời kỳ dân chủ chủ nô, thể hiện việc người nô lệ hoàn toàn không có bất kỳ quyền chính trị nào.',
    interactRadius: 2.5,
  },
  {
    id: 'crown',
    type: 'model',
    position: [36, 0, 0],
    modelUrl: '/Assets/Crown.glb',
    title: 'Vương Miện Phong Kiến',
    meta: 'Phòng 2 · Biểu tượng Quyền lực Chế độ Phong kiến',
    description: 'Mô hình xã hội điển hình của thời kỳ phong kiến, mọi quyết định đều phụ thuộc vào ý chí của người đứng đầu là nhà vua.',
    interactRadius: 2.5,
  },
  {
    id: 'money-stacks',
    type: 'model',
    position: [39, 0, 0],
    modelUrl: '/Assets/money_stacks.glb',
    title: 'Cập Tiền Tư Sản (Tư Liệu Sản Xuất)',
    meta: 'Phòng 2 · Nền Dân chủ Tư sản',
    description: `Biểu tượng cho giai cấp tư sản và chế độ tư hữu tư liệu sản xuất.

Theo lý luận Mác - Lênin, mặc dù nền dân chủ tư sản mở rộng nhiều quyền hơn trước, nhưng kinh tế vẫn dựa trên chế độ sở hữu tư nhân. Do đó, quyền lực kinh tế và lợi ích xã hội cốt lõi vẫn chủ yếu thuộc về giai cấp tư sản.`,
    interactRadius: 2.5,
  },
  {
    id: 'wheat-field',
    type: 'model',
    position: [51.5, 0, 1.5],
    modelUrl: '/Assets/Field of wheat.glb',
    title: 'Cánh Đồng Lúa — Biểu Tượng Nông Dân',
    meta: 'Phòng 3 · Mô hình Công - Nông',
    description: 'Mô hình công nông: Mục tiêu của nền dân chủ xã hội chủ nghĩa là xây dựng nhà nước của dân, do dân và vì dân, thực hiện quyền lực của đại đa số nhân dân thông qua nhà nước chuyên chính vô sản.',
    interactRadius: 2.5,
  },
  {
    id: 'hammer-sickle',
    type: 'model',
    position: [54, 0, 1.5],
    modelUrl: '/Assets/hammer__sickle.glb',
    title: 'Biểu Tượng Búa Liềm — Sự Phát Triển Trường Tồn',
    meta: 'Phòng 3 · Quá trình Phát triển Lâu dài & Kế thừa',
    description: 'Theo quan điểm Mác – Lênin, đây là một quá trình phát triển lâu dài. Nó kế thừa những giá trị tiến bộ của nền dân chủ tư sản, như quyền tự do và bình đẳng, nhưng đồng thời bổ sung những giá trị mới phù hợp với mục tiêu xây dựng chủ nghĩa xã hội.',
    interactRadius: 2.5,
  },
  {
    id: 'gear',
    type: 'model',
    position: [56.5, 0, 1.5],
    modelUrl: '/Assets/Gear.glb',
    title: 'Bánh Răng — Biểu Tượng Công Nhân',
    meta: 'Phòng 3 · Mô hình Công - Nông',
    description: 'Mô hình công nông: Mục tiêu của nền dân chủ xã hội chủ nghĩa là xây dựng nhà nước của dân, do dân và vì dân, thực hiện quyền lực của đại đa số nhân dân thông qua nhà nước chuyên chính vô sản.',
    interactRadius: 2.5,
  },
  {
    id: 'brown-book',
    type: 'model',
    position: [68.4, 0, 0],
    modelUrl: '/Assets/brown book.glb',
    title: 'Sách Lý Luận & Tri Thức',
    meta: 'Phòng 4 · Phương diện Chính trị Dân chủ XHCN',
    description: 'Về phương diện chính trị, nền dân chủ xã hội chủ nghĩa được đặt dưới sự lãnh đạo của Đảng Cộng sản – đội tiên phong của giai cấp công nhân. Đồng thời, nhân dân có quyền tham gia rộng rãi vào công việc quản lý nhà nước thông qua đại biểu đại diện hoặc trực tiếp đóng góp ý kiến.',
    interactRadius: 2.5,
  },
  {
    id: 'growth-coins',
    type: 'model',
    position: [71.8, 0, 0],
    modelUrl: '/Assets/growth_of_coins_money_and_wealth.glb',
    title: 'Tăng Trưởng Kinh Tế & Công Hữu',
    meta: 'Phòng 4 · Phương diện Kinh tế Dân chủ XHCN',
    description: `Biểu tượng cho kinh tế, sự phát triển kinh tế và là nền móng vững chắc của xã hội.

Nền dân chủ xã hội chủ nghĩa được xây dựng trên cơ sở chế độ công hữu đối với các tư liệu sản xuất chủ yếu, đồng thời thực hiện phân phối lợi ích chủ yếu theo kết quả lao động. Mục tiêu là giải phóng sức sản xuất, thúc đẩy nền kinh tế phát triển và đáp ứng ngày càng tốt hơn nhu cầu vật chất cũng như tinh thần của nhân dân.`,
    interactRadius: 2.5,
  },
  {
    id: 'globe',
    type: 'model',
    position: [75.2, 0, 0],
    modelUrl: '/Assets/Globe.glb',
    title: 'Quả Địa Cầu — Tư Tưởng & Văn Hóa',
    meta: 'Phòng 4 · Bản chất Tư tưởng, Văn hóa & Xã hội',
    description: 'Nền dân chủ xã hội chủ nghĩa lấy chủ nghĩa Mác – Lênin làm nền tảng tư tưởng, đồng thời kế thừa những giá trị truyền thống của dân tộc và tiếp thu tinh hoa văn hóa của nhân loại. Mục tiêu là kết hợp hài hòa giữa lợi ích cá nhân, lợi ích tập thể và lợi ích của toàn xã hội.',
    interactRadius: 2.5,
  },
  {
    id: 'one-pillar-pagoda',
    type: 'model',
    position: [90, 0, 0],
    modelUrl: '/Assets/one_pillar_pagoda_-_vietnam.glb',
    title: 'Chùa Một Cột',
    meta: 'Phòng Kết · Di sản Văn hóa Việt Nam',
    description: 'Chùa Một Cột là công trình kiến trúc độc đáo, biểu tượng văn hóa và tâm linh trường tồn của dân tộc Việt Nam.',
    interactRadius: 2.5,
  },
  {
    id: 'lotus-flower-left',
    type: 'model',
    position: [88.5, 0, 0],
    modelUrl: '/Assets/lotus_flower_-_low_poly.glb',
    title: 'Hoa Sen Việt Nam',
    meta: 'Phòng Kết · Quốc hoa Việt Nam',
    description: 'Hoa sen tượng trưng cho sự thanh cao, sức sống mãnh liệt và bản sắc văn hóa của con người Việt Nam.',
    interactRadius: 2.5,
  },
  {
    id: 'lotus-flower-right',
    type: 'model',
    position: [91.5, 0, 0],
    modelUrl: '/Assets/lotus_flower_-_low_poly.glb',
    title: 'Hoa Sen Việt Nam',
    meta: 'Phòng Kết · Quốc hoa Việt Nam',
    description: 'Hoa sen tượng trưng cho sự thanh cao, sức sống mãnh liệt và bản sắc văn hóa của con người Việt Nam.',
    interactRadius: 2.5,
  },
]