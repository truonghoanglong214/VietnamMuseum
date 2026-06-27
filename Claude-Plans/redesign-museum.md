# Kế Hoạch Thiết Kế Lại Bảo Tàng 3D

> Dự án: MLN131 — Bảo tàng Lịch sử và Bản chất Dân chủ  
> Stack: React + React Three Fiber + @react-three/drei  
> Mục tiêu: Làm sống động như bảo tàng Việt Nam thực tế — cây cảnh, phụ kiện, NPC đi bộ, mỗi phòng 1 ảnh chủ đạo.

---

## 1. Tổng Quan Thay Đổi

| Hạng mục | Hiện tại | Sau khi thiết kế lại |
|---|---|---|
| Số tranh/phòng | 4–5 tranh | **1 ảnh chủ đạo** trên tường Bắc (tường đối diện khi vào) |
| Phụ kiện phòng | Không có | Chậu cây, băng ghế, bệ trưng bày, trụ rào chắn |
| Cây cảnh | Không có | Cây góc phòng (Lobby), cây hành lang, chậu cây nhỏ |
| NPC | Không có | 6–8 NPC tự di chuyển, dừng lại ngắm tranh |
| Ánh sáng | Đèn trần vàng | Giữ nguyên + thêm spotlight chiếu thẳng vào ảnh |

---

## 2. Cấu Trúc File Mới Cần Tạo

```
src/
  scene/
    Museum.jsx          ← Sửa: giảm số tranh, thêm Trees/Props/NPCs
    Room.jsx            ← Giữ nguyên
    Frame.jsx           ← Giữ nguyên  
    Player.jsx          ← Giữ nguyên
    NPC.jsx             ← TẠO MỚI: NPC đi bộ ngắm tranh
    DecoTree.jsx        ← TẠO MỚI: cây cảnh low-poly
    RoomProps.jsx       ← TẠO MỚI: băng ghế, bệ, chậu hoa, trụ rào
  museumData.js         ← Sửa: giảm còn 1 exhibit/phòng + thêm propData
```

---

## 3. Danh Sách 1 Ảnh Chủ Đạo Mỗi Phòng

Theo nội dung `noidung.md`, mỗi phòng giữ **đúng 1 tranh** — treo tường Bắc, kích thước lớn (~3.0 × 3.6m), khung vàng gold, spotlight chiếu trực tiếp.

| Phòng | ID | Ảnh chủ đạo | Vị trí Z | Nội dung |
|---|---|---|---|---|
| Sảnh Đón Tiếp | lobby | "Bản đồ hành trình tham quan" | z=-4.88 | Sơ đồ tổng thể bảo tàng, lời chào |
| Phòng 1 | room1 | "DEMOKRATOS — Bình minh của quyền lực" | z=-4.88 | Tượng Hy Lạp + từ khóa Demos/Kratos |
| Phòng 2 | room2 | "Ba Nấc Thang Lịch Sử" | z=-4.88 | Tranh tổng hợp 3 giai đoạn: chủ nô → phong kiến → tư sản |
| Phòng 3 | room3 | "Cách mạng Tháng Mười Nga — 1917" | z=-4.88 | Ảnh biểu tượng Cách mạng Tháng Mười |
| Phòng 4 | room4 | "Ba Trụ Cột Dân Chủ XHCN" | z=-4.88 | Đồ họa 3 trụ cột: Chính trị, Kinh tế, Tư tưởng |
| Phòng Kết | roomket | "Dân chủ VN — Di Sản & Tương Lai" | z=-4.88 | Thành tựu + câu HCM + bảng khảo sát |

> **Tất cả tranh còn lại trong `museumData.js` hiện tại bị xóa.** Mỗi phòng chỉ render 1 `<Frame>`.

---

## 4. Thiết Kế Từng Phòng

### 4.1 Sảnh Đón Tiếp (Lobby — x=0)

**Không khí:** Trang trọng, chào đón — giống sảnh Bảo tàng Lịch sử Quốc gia Hà Nội.

**1 ảnh chủ đạo:** "Bản đồ hành trình tham quan" — treo tường Bắc (z=-4.88), size [3.6, 3.2], frame `gold`.

**Phụ kiện:**
- `DecoTree` × 2: góc Tây-Bắc `[-5, 0, -3.5]` và góc Đông-Bắc `[5, 0, -3.5]` — cây cọ nhỏ trong chậu đất nung.
- `BenchProp` × 2: băng gỗ màu mahogany, đặt giữa phòng song song với tường Nam: `[-2.5, 0, 3]` và `[2.5, 0, 3]`.
- `InfoStand` (bục thông tin): trước cửa vào hướng Đông `[4, 0, 0]` — tấm biển "Kính chào quý khách".
- Thảm đỏ trung tâm: `BoxGeometry [4, 0.01, 6]` màu đỏ sẫm `#6b1010`, trải từ cửa vào đến giữa phòng.

**NPC:** 2 NPC — 1 đứng cạnh bục thông tin (PointNPC), 1 đi vòng quanh lobby nhìn vào tường.

---

### 4.2 Phòng 1 — Cội Nguồn của Quyền Lực (x=18)

**Không khí:** Cổ đại, học thuật — gợi lên Athens Hy Lạp. Tường màu `#ddd3ae` (đang có), thêm chi tiết đá cổ.

**1 ảnh chủ đạo:** "DEMOKRATOS" — treo tường Bắc, căn giữa `[18, 2.8, -4.88]`, size [3.2, 3.6], frame `gold`.  
Spotlight `<spotLight>` chiếu từ trần `[18, 4.5, -3]` nhắm vào tranh, intensity 30, color `#fff3d0`.

**Phụ kiện:**
- `ColumnProp` × 2: hai trụ cột đá kiểu Hy Lạp (cylinder stack) ở `[14, 0, 2]` và `[22, 0, 2]` — gợi kiến trúc Parthenon.
- `PedestalProp` × 1: bệ trưng bày (hình trụ ngắn) ở `[18, 0, 1.5]` — trên đặt quả cầu đất nung nhỏ (sphere màu `#c8a060`) tượng trưng "bình minh dân chủ".
- `BenchProp` × 1: băng dài phía Nam `[18, 0, 3.5]` để NPC ngồi ngắm.
- Chậu cây nhỏ × 1: `[14.5, 0, -3]`.

**NPC:** 1 NPC đứng trước tranh (hướng mặt vào tường Bắc), 1 NPC đi vòng quanh phòng.

---

### 4.3 Phòng 2 — Những Nấc Thang Thời Đại (x=36)

**Không khí:** Lịch sử trải dài — gợi cảm giác "hành lang thời gian". Tường màu hiện tại, thêm 3 bệ nhỏ biểu trưng 3 giai đoạn.

**1 ảnh chủ đạo:** "Ba Nấc Thang Lịch Sử" — tường Bắc `[36, 2.8, -4.88]`, size [3.6, 3.6], frame `bronze`.  
Spotlight chiếu từ `[36, 4.5, -3]`, intensity 28, color `#ffeac0`.

**Phụ kiện:**
- `PedestalProp` × 3: 3 bệ thấp dần đặt dọc trục Z, mô phỏng "3 nấc thang":
  - Bệ 1 "Chủ nô" tại `[33, 0, 0]` — cao nhất (h=0.9), màu trắng `#f0ede0`.
  - Bệ 2 "Phong kiến" tại `[36, 0, 0]` — trung bình (h=0.6), màu xám `#8a8078`.
  - Bệ 3 "Tư sản" tại `[39, 0, 0]` — cao vừa (h=0.75), màu be `#d4c9a0`.
- `RopeBarrier` × 2: trụ rào vàng + dây nhung đỏ bảo vệ khu bệ trưng bày.
- Chậu cây × 2: góc phòng `[33, 0, 3.5]` và `[39, 0, 3.5]`.

**NPC:** 2 NPC đi theo chiều dọc phòng như "đang bước qua các thời đại", dừng lại tại từng bệ.

---

### 4.4 Phòng 3 — Bước Ngoặt Cách Mạng (x=54)

**Không khí:** Mạnh mẽ, cách mạng — màu đỏ nổi bật. Thêm chi tiết màu đỏ sẫm và biểu tượng ngôi sao.

**1 ảnh chủ đạo:** "Cách mạng Tháng Mười Nga — 1917" — tường Bắc `[54, 2.8, -4.88]`, size [3.6, 3.8], frame `gold`.  
Spotlight mạnh hơn, intensity 35, color `#ffd0b0` (ấm, kịch tính).

**Phụ kiện:**
- `StarDecor` × 2: ngôi sao 5 cánh (LatheGeometry hoặc box ghép) treo 2 bên tranh trên tường Bắc — màu đỏ `#cc1a1a`, emissive nhẹ.
- `BannerProp`: dải băng đỏ treo ngang giữa phòng ở độ cao 3.5m — `BoxGeometry [6, 0.25, 0.02]` màu đỏ `#8b0000`.
- `PedestalProp` × 1: bệ trưng bày ở `[54, 0, 1.5]` — trên đặt hình trụ nhỏ màu đỏ (biểu trưng "nhà nước công nông").
- `BenchProp` × 2: `[51, 0, 3]` và `[57, 0, 3]`.
- Chậu cây × 1: góc Tây-Nam `[51, 0, 3.5]`.

**NPC:** 2 NPC — 1 đứng ngước nhìn tranh lớn, 1 ngồi trên băng ghế.

---

### 4.5 Phòng 4 — Linh Hồn của Chế Độ Mới (x=72)

**Không khí:** Trang nghiêm, hiện đại, thể hiện 3 trụ cột. 3 trụ cột vật lý đặt giữa phòng là điểm nhấn chính.

**1 ảnh chủ đạo:** "Ba Trụ Cột Dân Chủ XHCN" — tường Bắc `[72, 2.8, -4.88]`, size [3.2, 3.6], frame `gold`.

**Phụ kiện — 3 trụ cột vật lý:**
- Trụ cột Chính trị `[69, 0, 0]`: cylinder cao 3m, đường kính 0.35, màu đỏ `#8b2020`. Trên đỉnh: ngôi sao vàng nhỏ.
- Trụ cột Kinh tế `[72, 0, 0]`: cylinder cao 3m, màu vàng `#c4a84a`, trên đỉnh: hình bánh răng nhỏ (torus geometry).
- Trụ cột Tư tưởng `[75, 0, 0]`: cylinder cao 3m, màu xanh navy `#1a2060`, trên đỉnh: hình sách nhỏ (box geometry).
- `RopeBarrier`: quây xung quanh 3 trụ.
- Bảng tên nhỏ trước mỗi trụ (InfoPlate — thin box với text trên placeholder canvas).
- Spotlight × 3: chiếu sáng từng trụ một từ trần phòng.
- Chậu cây × 2: `[68, 0, 3.5]` và `[76, 0, 3.5]`.

**NPC:** 3 NPC — mỗi người đứng trước 1 trụ, hướng mặt nhìn vào trụ cột của mình.

---

### 4.6 Phòng Kết — Di Sản và Tương Lai (x=90)

**Không khí:** Hy vọng, tương lai — sáng hơn, ấm hơn. Bảng khảo sát tương tác theo noidung.md.

**1 ảnh chủ đạo:** Câu trích dẫn HCM "Nước ta là nước dân chủ..." — tường Đông (x=95.88), size [4.0, 3.0], frame `gold`.

**Phụ kiện:**
- `SuggestionBox`: hộp ý kiến — box nhỏ màu gỗ `[90, 0.8, 2]`, khe bỏ phiếu trên nắp, biển "Ý KIẾN SINH VIÊN".
- `BannerProp`: băng chào màu vàng `[90, 4.2, 0]` — text "Cảm ơn bạn đã tham quan".
- `DecoTree` × 2: cây cọ góc `[85, 0, 3.5]` và `[95, 0, 3.5]` — đây là phòng có nhiều cây nhất.
- `BenchProp` × 2: `[87, 0, 3]` và `[93, 0, 3]`.
- Thảm đỏ ngắn trước tranh chính.

**NPC:** 2 NPC — 1 đứng đọc câu trích dẫn HCM, 1 đứng cạnh hộp ý kiến.

---

## 5. Component `DecoTree.jsx`

Cây cảnh bảo tàng Việt Nam — low-poly, không dùng model 3D để giữ hiệu năng.

```
DecoTree({ position, type = 'palm' | 'shrub' })
├── Chậu: CylinderGeometry(r=0.25, top=0.3, h=0.5) — màu đất nung #b55a2a
├── Thân: CylinderGeometry(r=0.04, h=1.4) — màu #4a3010 (palm) | #2d4a10 (shrub)
└── Tán lá: (palm) 3× SphereGeometry lệch nhau ở đỉnh, màu #2d6a1a
            (shrub) 1× SphereGeometry to ở giữa, màu #3a7a20
```

Đặt trong `<group position={position}>`, không có animation (tĩnh, tiết kiệm tài nguyên).

---

## 6. Component `RoomProps.jsx`

Tập hợp các prop tái sử dụng:

```jsx
export function BenchProp({ position, rotation = [0,0,0] })
// Băng ghế gỗ: mặt ngồi [1.4, 0.06, 0.4] + 4 chân [0.06, 0.45, 0.06]
// Màu gỗ #3a2010, roughness 0.85

export function PedestalProp({ position, height = 0.8, color = '#e0dbd0' })
// Bệ trưng bày: box [0.7, height, 0.7] + tấm kính trên cùng mỏng

export function RopeBarrierProp({ posts })
// posts: mảng [x,z] — mỗi post là cylinder vàng 0.06r × 1.0h + torusDây nhung đỏ nối các trụ

export function InfoStandProp({ position, text })
// Bục thông tin: chân + tấm bảng nghiêng, dùng CanvasTexture để in text

export function ColumnProp({ position, height = 3.5 })
// Trụ kiểu cổ đại: base CylGeo + shaft CylGeo + capital CylGeo, màu đá #d8d0c0

export function StarDecorProp({ position })
// Ngôi sao 5 cánh ghép từ 2 cone, màu đỏ + emissive nhẹ
```

---

## 7. Component `NPC.jsx`

NPC đơn giản — không dùng animation rigged, chỉ dùng geometry.

### 7.1 Hình dạng NPC

```
NPC
├── Đầu: SphereGeometry r=0.18 — màu da #e8c49a
├── Thân: CylinderGeometry(r=0.14, h=0.7) — màu áo (random từ palette Việt Nam)
├── Chân L/R: 2× CylinderGeometry(r=0.06, h=0.6) — màu quần
└── Tay L/R: 2× CylinderGeometry(r=0.05, h=0.4) — nghiêng ra 30°
```

Palette áo: `['#1a3a6b', '#8b1a1a', '#1a5c2e', '#4a3010', '#6b3a1a']`

### 7.2 Hành vi NPC (useFrame loop)

```
State machine đơn giản:
  WALKING  → di chuyển tới target, tốc độ 0.8 m/s
  LOOKING  → dừng lại 3–6 giây, xoay mặt về phía exhibit gần nhất
  IDLE     → đứng yên 1–2 giây rồi chọn target mới

Logic chọn target:
  - Nếu gần exhibit (<2m) → sang LOOKING
  - Ngược lại → chọn random point trong walkZone của phòng hiện tại
  - Clamp vị trí trong walkZone để không đi xuyên tường
```

### 7.3 Danh sách 8 NPC khởi tạo

```js
const NPC_CONFIGS = [
  { id: 1, startPos: [-1, 1.6, 1],    roomId: 'lobby',   behavior: 'wander'  },
  { id: 2, startPos: [2,  1.6, -1],   roomId: 'lobby',   behavior: 'point'   },  // đứng cạnh InfoStand
  { id: 3, startPos: [18, 1.6, 1.5],  roomId: 'room1',   behavior: 'wander'  },
  { id: 4, startPos: [36, 1.6, 0.5],  roomId: 'room2',   behavior: 'wander'  },
  { id: 5, startPos: [39, 1.6, 0],    roomId: 'room2',   behavior: 'point'   },
  { id: 6, startPos: [54, 1.6, 1],    roomId: 'room3',   behavior: 'wander'  },
  { id: 7, startPos: [72, 1.6, 0],    roomId: 'room4',   behavior: 'point'   },
  { id: 8, startPos: [90, 1.6, 2],    roomId: 'roomket', behavior: 'wander'  },
]
```

`behavior: 'point'` = NPC này chỉ đứng 1 chỗ + xoay người nhìn về phía exhibit, không lang thang.

---

## 8. Spotlight Chiếu Vào Tranh

Thêm vào `Museum.jsx` — 1 spotlight cho mỗi ảnh chủ đạo:

```jsx
// [x tranh, cao, z phía trước tranh] → nhắm vào [x tranh, 2.8, -4.88]
const EXHIBIT_SPOTS = [
  { from: [0,  4.5, -2.5], to: [0,  2.8, -4.88], roomId: 'lobby'   },
  { from: [18, 4.5, -2.5], to: [18, 2.8, -4.88], roomId: 'room1'   },
  { from: [36, 4.5, -2.5], to: [36, 2.8, -4.88], roomId: 'room2'   },
  { from: [54, 4.5, -2.5], to: [54, 2.8, -4.88], roomId: 'room3'   },
  { from: [72, 4.5, -2.5], to: [72, 2.8, -4.88], roomId: 'room4'   },
  { from: [91, 4.5,  0.5], to: [95.88, 2.6, 0],  roomId: 'roomket' },
]
// <spotLight position={from} target-position={to} intensity={28} angle={0.3} penumbra={0.4} color="#fff5e0" />
```

---

## 9. Thứ Tự Thực Hiện

1. **Bước 1** — Cập nhật `museumData.js`: xóa tất cả exhibits hiện tại, chỉ giữ 1 exhibit/phòng theo bảng mục 3.
2. **Bước 2** — Tạo `DecoTree.jsx`: cây palm + shrub tĩnh trong chậu.
3. **Bước 3** — Tạo `RoomProps.jsx`: BenchProp, PedestalProp, RopeBarrierProp, ColumnProp, InfoStandProp, StarDecorProp.
4. **Bước 4** — Tạo `NPC.jsx`: body geometry + state machine wander/looking/idle + useFrame.
5. **Bước 5** — Cập nhật `Museum.jsx`: thêm spotlight, import và đặt DecoTree + RoomProps + NPC theo từng phòng.
6. **Bước 6** — Kiểm tra hiệu năng: nếu FPS < 30 → tắt N8AO hoặc giảm số NPC.

---

## 10. Lưu Ý Kỹ Thuật

- **NPC va chạm**: NPC không cần va chạm với player — chỉ clamp trong `walkZones` là đủ.
- **Performance**: Dùng `<Instances>` nếu muốn 10+ NPC, nhưng với 8 NPC thì render thường là đủ.
- **Cây cảnh**: Dùng `castShadow={false}` cho cây để tránh chi phí shadow map.
- **Spotlight target**: Dùng `useRef` + `<primitive object={spotRef.current.target}>` để target đúng vị trí tranh.
- **Palette áo NPC**: Random seed theo `id` để màu không đổi mỗi lần render (`id % palette.length`).
- **Ảnh placeholder**: Các ảnh chưa có file thật vẫn hiển thị placeholder canvas đẹp nhờ logic sẵn có trong `Frame.jsx`.
