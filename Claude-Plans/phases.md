# Phases Thực Hiện — Thiết Kế Lại Bảo Tàng

> Thực hiện theo đúng thứ tự. Mỗi phase độc lập — hoàn thành 1 phase rồi mới qua phase tiếp theo.  
> Xem chi tiết thiết kế tại: `Claude-Plans/redesign-museum.md`

---

## Phase 1 — Dọn Tranh, Giữ 1 Ảnh/Phòng

**File sửa:** `src/museumData.js`  
**Mục tiêu:** Xóa toàn bộ exhibits cũ, mỗi phòng chỉ còn 1 exhibit lớn trên tường Bắc.

### Việc cần làm

- [ ] **1.1** Xóa toàn bộ mảng `exhibits` hiện tại (từ dòng 163 đến cuối file)
- [ ] **1.2** Thay bằng mảng `exhibits` mới gồm đúng 6 entry — 1 entry/phòng:

```js
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
```

- [ ] **1.3** Kiểm tra lại: chạy `npm run dev`, vào từng phòng, xác nhận mỗi phòng chỉ có đúng 1 tranh.

---

## Phase 2 — Tạo Cây Cảnh `DecoTree.jsx`

**File tạo mới:** `src/scene/DecoTree.jsx`  
**Mục tiêu:** Component cây cảnh low-poly trong chậu đất nung — 2 loại: `palm` và `shrub`.

### Việc cần làm

- [x] **2.1** Tạo file `src/scene/DecoTree.jsx` với nội dung sau:

```jsx
import React from 'react'

export default function DecoTree({ position = [0, 0, 0], type = 'palm', scale = 1 }) {
  const s = scale

  // ── Chậu đất nung ──
  const pot = (
    <mesh position={[0, 0.25 * s, 0]} castShadow={false}>
      <cylinderGeometry args={[0.3 * s, 0.22 * s, 0.5 * s, 10]} />
      <meshStandardMaterial color="#b55a2a" roughness={0.9} metalness={0} />
    </mesh>
  )

  // ── Đất trong chậu ──
  const soil = (
    <mesh position={[0, 0.49 * s, 0]} castShadow={false}>
      <cylinderGeometry args={[0.28 * s, 0.28 * s, 0.06 * s, 10]} />
      <meshStandardMaterial color="#3a2010" roughness={1} />
    </mesh>
  )

  // ── Cây cọ (palm) ──
  const palmTree = (
    <>
      {/* Thân */}
      <mesh position={[0, 1.2 * s, 0]} castShadow={false}>
        <cylinderGeometry args={[0.045 * s, 0.07 * s, 1.4 * s, 7]} />
        <meshStandardMaterial color="#4a3010" roughness={0.95} />
      </mesh>
      {/* Tán lá — 3 cụm sphere lệch nhau */}
      {[
        [0,    2.0 * s, 0,    0.38 * s],
        [0.2 * s, 1.88 * s, 0.15 * s, 0.28 * s],
        [-0.18 * s, 1.85 * s, -0.12 * s, 0.26 * s],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow={false}>
          <sphereGeometry args={[r, 7, 5]} />
          <meshStandardMaterial color={i === 0 ? '#2d6a1a' : '#3a7a22'} roughness={0.85} />
        </mesh>
      ))}
    </>
  )

  // ── Cây bụi (shrub) ──
  const shrubTree = (
    <>
      {/* Thân ngắn */}
      <mesh position={[0, 0.8 * s, 0]} castShadow={false}>
        <cylinderGeometry args={[0.05 * s, 0.08 * s, 0.6 * s, 6]} />
        <meshStandardMaterial color="#2d4a10" roughness={0.95} />
      </mesh>
      {/* Tán lá tròn */}
      <mesh position={[0, 1.3 * s, 0]} castShadow={false}>
        <sphereGeometry args={[0.48 * s, 8, 6]} />
        <meshStandardMaterial color="#3a7a20" roughness={0.85} />
      </mesh>
      {/* Cụm lá phụ */}
      <mesh position={[0.2 * s, 1.18 * s, 0.2 * s]} castShadow={false}>
        <sphereGeometry args={[0.28 * s, 7, 5]} />
        <meshStandardMaterial color="#2d6a18" roughness={0.85} />
      </mesh>
    </>
  )

  return (
    <group position={position}>
      {pot}
      {soil}
      {type === 'palm' ? palmTree : shrubTree}
    </group>
  )
}
```

- [x] **2.2** Điều chỉnh màu sắc nếu cần (chậu, lá, thân) cho phù hợp thẩm mỹ.
- [x] **2.3** Điều chỉnh `scale` prop nếu cây quá to/nhỏ so với phòng (chiều cao phòng = 5m).

---

## Phase 3 — Tạo Phụ Kiện Phòng `RoomProps.jsx`

**File tạo mới:** `src/scene/RoomProps.jsx`  
**Mục tiêu:** Tập hợp các prop tái sử dụng — ghế, bệ, trụ rào, trụ cột, ngôi sao, bục thông tin.

### Việc cần làm

- [x] **3.1** Tạo file `src/scene/RoomProps.jsx`:

```jsx
import React, { useMemo } from 'react'
import * as THREE from 'three'

const WOOD = { color: '#3a2010', roughness: 0.85, metalness: 0 }
const STONE = { color: '#d8d0c0', roughness: 0.9, metalness: 0 }
const GOLD_POST = { color: '#b58a3a', roughness: 0.4, metalness: 0.85 }

// ── Băng ghế gỗ ──────────────────────────────────────────────
export function BenchProp({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Mặt ngồi */}
      <mesh position={[0, 0.48, 0]} castShadow>
        <boxGeometry args={[1.4, 0.07, 0.42]} />
        <meshStandardMaterial {...WOOD} />
      </mesh>
      {/* Thanh dựa lưng */}
      <mesh position={[0, 0.78, -0.17]} castShadow>
        <boxGeometry args={[1.4, 0.32, 0.05]} />
        <meshStandardMaterial {...WOOD} />
      </mesh>
      {/* 4 chân */}
      {[[-0.58, -0.18], [0.58, -0.18], [-0.58, 0.18], [0.58, 0.18]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.22, z]} castShadow>
          <boxGeometry args={[0.06, 0.45, 0.06]} />
          <meshStandardMaterial {...WOOD} />
        </mesh>
      ))}
    </group>
  )
}

// ── Bệ trưng bày ─────────────────────────────────────────────
export function PedestalProp({ position = [0, 0, 0], height = 0.8, color = '#e0dbd0', children }) {
  return (
    <group position={position}>
      {/* Thân bệ */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.7, height, 0.7]} />
        <meshStandardMaterial color={color} roughness={0.85} metalness={0} />
      </mesh>
      {/* Tấm trên */}
      <mesh position={[0, height + 0.03, 0]} castShadow>
        <boxGeometry args={[0.76, 0.05, 0.76]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.1} />
      </mesh>
      {children}
    </group>
  )
}

// ── Trụ rào nhung + dây nối ──────────────────────────────────
// posts: mảng [[x, z], [x, z], ...] — tọa độ trong không gian world
export function RopeBarrierProp({ posts = [], y = 0 }) {
  return (
    <group position={[0, y, 0]}>
      {posts.map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Trụ vàng */}
          <mesh position={[0, 0.5, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.0, 8]} />
            <meshStandardMaterial {...GOLD_POST} />
          </mesh>
          {/* Đầu trụ tròn */}
          <mesh position={[0, 1.02, 0]}>
            <sphereGeometry args={[0.055, 8, 6]} />
            <meshStandardMaterial {...GOLD_POST} />
          </mesh>
        </group>
      ))}
      {/* Dây nhung đỏ nối các trụ */}
      {posts.slice(0, -1).map(([x1, z1], i) => {
        const [x2, z2] = posts[i + 1]
        const mx = (x1 + x2) / 2
        const mz = (z1 + z2) / 2
        const len = Math.sqrt((x2 - x1) ** 2 + (z2 - z1) ** 2)
        const angle = Math.atan2(z2 - z1, x2 - x1)
        return (
          <mesh key={'r' + i} position={[mx, 0.78, mz]} rotation={[0, -angle, 0]}>
            <boxGeometry args={[len, 0.025, 0.025]} />
            <meshStandardMaterial color="#6b0000" roughness={0.9} />
          </mesh>
        )
      })}
    </group>
  )
}

// ── Bục thông tin (InfoStand) ────────────────────────────────
export function InfoStandProp({ position = [0, 0, 0], rotation = [0, 0, 0], text = 'Kính chào quý khách' }) {
  const tex = useMemo(() => {
    const W = 256, H = 192
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#f0e8d4'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#8B2020'; ctx.lineWidth = 6
    ctx.strokeRect(6, 6, W - 12, H - 12)
    ctx.strokeStyle = '#c4a84a'; ctx.lineWidth = 2
    ctx.strokeRect(14, 14, W - 28, H - 28)
    ctx.fillStyle = '#2c1a08'
    ctx.font = 'bold 16px Georgia, serif'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const words = text.split(' ')
    const lines = []; let cur = ''
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w
      if (ctx.measureText(t).width > W - 40 && cur) { lines.push(cur); cur = w }
      else cur = t
    }
    if (cur) lines.push(cur)
    const lh = 22
    const sy = H / 2 - (lines.length - 1) * lh / 2
    lines.forEach((l, i) => ctx.fillText(l, W / 2, sy + i * lh))
    const t2 = new THREE.CanvasTexture(c)
    t2.colorSpace = THREE.SRGBColorSpace
    return t2
  }, [text])

  return (
    <group position={position} rotation={rotation}>
      {/* Chân đứng */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.1, 6]} />
        <meshStandardMaterial color="#6b5326" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Đế */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.08, 8]} />
        <meshStandardMaterial color="#6b5326" roughness={0.5} metalness={0.7} />
      </mesh>
      {/* Bảng nghiêng */}
      <mesh position={[0, 1.05, 0.04]} rotation={[-0.35, 0, 0]} castShadow>
        <boxGeometry args={[0.52, 0.38, 0.025]} />
        <meshStandardMaterial map={tex} roughness={0.8} />
      </mesh>
    </group>
  )
}

// ── Trụ cột kiểu cổ đại (Hy Lạp) ───────────────────────────
export function ColumnProp({ position = [0, 0, 0], height = 3.2 }) {
  return (
    <group position={position}>
      {/* Đế dưới */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.32, 0.34, 0.24, 10]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      {/* Thân trụ */}
      <mesh position={[0, height / 2 + 0.12, 0]} castShadow>
        <cylinderGeometry args={[0.21, 0.26, height, 10]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      {/* Đầu trụ (capital) */}
      <mesh position={[0, height + 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.35, 0.24, 0.32, 10]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
      {/* Tấm ngang */}
      <mesh position={[0, height + 0.56, 0]} castShadow>
        <boxGeometry args={[0.72, 0.18, 0.72]} />
        <meshStandardMaterial {...STONE} />
      </mesh>
    </group>
  )
}

// ── Ngôi sao 5 cánh (trang trí tường) ───────────────────────
export function StarDecorProp({ position = [0, 0, 0], size = 0.3 }) {
  // Ghép từ 2 cone quay ngược nhau
  const s = size
  return (
    <group position={position}>
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * Math.PI * 2 - Math.PI / 2
        return (
          <mesh key={i} position={[Math.cos(angle) * s * 0.6, Math.sin(angle) * s * 0.6, 0]}
                rotation={[0, 0, angle + Math.PI / 2]}>
            <coneGeometry args={[s * 0.28, s * 1.1, 3]} />
            <meshStandardMaterial color="#cc1a1a" emissive="#aa0000" emissiveIntensity={0.4} roughness={0.5} />
          </mesh>
        )
      })}
      {/* Tâm ngôi sao */}
      <mesh>
        <circleGeometry args={[s * 0.3, 8]} />
        <meshStandardMaterial color="#cc1a1a" emissive="#aa0000" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

// ── Trụ cột tượng trưng (Phòng 4 — 3 trụ cột DCXHCN) ────────
export function PillarProp({ position = [0, 0, 0], color = '#8b2020', topSymbol = 'star' }) {
  return (
    <group position={position}>
      {/* Bệ đế */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[0.55, 0.2, 0.55]} />
        <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
      </mesh>
      {/* Thân trụ */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.2, 3.0, 10]} />
        <meshStandardMaterial color={color} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Đỉnh */}
      <mesh position={[0, 3.3, 0]}>
        <cylinderGeometry args={[0.22, 0.18, 0.18, 10]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Symbol đỉnh */}
      {topSymbol === 'star' && (
        <StarDecorProp position={[0, 3.55, 0.02]} size={0.18} />
      )}
      {topSymbol === 'gear' && (
        <mesh position={[0, 3.52, 0]}>
          <torusGeometry args={[0.15, 0.05, 6, 12]} />
          <meshStandardMaterial color="#c4a84a" metalness={0.9} roughness={0.3} />
        </mesh>
      )}
      {topSymbol === 'book' && (
        <mesh position={[0, 3.52, 0]} rotation={[0.15, 0, 0]}>
          <boxGeometry args={[0.26, 0.06, 0.2]} />
          <meshStandardMaterial color="#e8e0c8" roughness={0.8} />
        </mesh>
      )}
    </group>
  )
}

// ── Hộp ý kiến sinh viên ────────────────────────────────────
export function SuggestionBoxProp({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Chân đỡ */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 6]} />
        <meshStandardMaterial {...WOOD} />
      </mesh>
      {/* Hộp */}
      <mesh position={[0, 0.9, 0]} castShadow>
        <boxGeometry args={[0.5, 0.38, 0.36]} />
        <meshStandardMaterial color="#5a3a18" roughness={0.85} />
      </mesh>
      {/* Khe bỏ phiếu */}
      <mesh position={[0, 1.06, 0.185]}>
        <boxGeometry args={[0.2, 0.02, 0.01]} />
        <meshStandardMaterial color="#1a0a00" />
      </mesh>
      {/* Biển chữ */}
      <mesh position={[0, 0.75, 0.19]}>
        <planeGeometry args={[0.42, 0.12]} />
        <meshStandardMaterial color="#c4a84a" roughness={0.5} />
      </mesh>
    </group>
  )
}
```

- [x] **3.2** Kiểm tra import không lỗi bằng cách thêm tạm 1 component vào `Museum.jsx` và xem console.
- [x] **3.3** Điều chỉnh kích thước/màu nếu cần sau khi chạy thử.

---

## Phase 4 — Tạo NPC Đi Bộ `NPC.jsx`

**File tạo mới:** `src/scene/NPC.jsx`  
**Mục tiêu:** NPC hình người đơn giản, tự di chuyển trong phòng, dừng lại ngắm tranh.

### Việc cần làm

- [x] **4.1** Tạo file `src/scene/NPC.jsx`:

```jsx
import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { walkZones } from '../museumData.js'

const SHIRT_PALETTE = ['#1a3a6b', '#8b1a1a', '#1a5c2e', '#4a3010', '#5c3a6b']
const PANT_PALETTE  = ['#1a1a2e', '#2e1a0a', '#0a2e1a', '#1a1a1a', '#2e2a1a']
const SPEED = 0.8       // m/s
const LOOK_TIME_MIN = 3 // giây
const LOOK_TIME_MAX = 6
const IDLE_TIME = 1.5

// Tìm walkZone chứa điểm [x, z]
function findZone(x, z) {
  return walkZones.find(wz => x >= wz.xMin && x <= wz.xMax && z >= wz.zMin && z <= wz.zMax)
}

// Random điểm trong zone
function randInZone(zone) {
  if (!zone) return null
  return [
    zone.xMin + Math.random() * (zone.xMax - zone.xMin),
    zone.zMin + Math.random() * (zone.zMax - zone.zMin),
  ]
}

// Clamp vị trí vào zone
function clampToZone(x, z, zone) {
  if (!zone) return [x, z]
  return [
    Math.max(zone.xMin + 0.3, Math.min(zone.xMax - 0.3, x)),
    Math.max(zone.zMin + 0.3, Math.min(zone.zMax - 0.3, z)),
  ]
}

export function NPCBody({ shirtColor, pantColor }) {
  return (
    <group>
      {/* Đầu */}
      <mesh position={[0, 1.58, 0]} castShadow>
        <sphereGeometry args={[0.16, 8, 6]} />
        <meshStandardMaterial color="#e8c49a" roughness={0.8} />
      </mesh>
      {/* Tóc */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.165, 7, 4]} />
        <meshStandardMaterial color="#1a0a00" roughness={0.95} />
      </mesh>
      {/* Thân */}
      <mesh position={[0, 1.05, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.11, 0.6, 8]} />
        <meshStandardMaterial color={shirtColor} roughness={0.85} />
      </mesh>
      {/* Tay trái */}
      <mesh position={[-0.19, 1.1, 0]} rotation={[0, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.42, 6]} />
        <meshStandardMaterial color={shirtColor} roughness={0.85} />
      </mesh>
      {/* Tay phải */}
      <mesh position={[0.19, 1.1, 0]} rotation={[0, 0, -0.5]} castShadow>
        <cylinderGeometry args={[0.04, 0.035, 0.42, 6]} />
        <meshStandardMaterial color={shirtColor} roughness={0.85} />
      </mesh>
      {/* Chân trái */}
      <mesh position={[-0.07, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.05, 0.55, 6]} />
        <meshStandardMaterial color={pantColor} roughness={0.85} />
      </mesh>
      {/* Chân phải */}
      <mesh position={[0.07, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.05, 0.55, 6]} />
        <meshStandardMaterial color={pantColor} roughness={0.85} />
      </mesh>
      {/* Giày */}
      {[-0.07, 0.07].map((x, i) => (
        <mesh key={i} position={[x, 0.08, 0.04]} castShadow>
          <boxGeometry args={[0.1, 0.08, 0.2]} />
          <meshStandardMaterial color="#1a0a00" roughness={0.9} />
        </mesh>
      ))}
    </group>
  )
}

// ── NPC đứng 1 chỗ (point NPC) ──────────────────────────────
export function PointNPC({ position, lookAt, id = 0 }) {
  const groupRef = useRef()
  const shirt = SHIRT_PALETTE[id % SHIRT_PALETTE.length]
  const pant  = PANT_PALETTE[id % PANT_PALETTE.length]

  useFrame(() => {
    if (!groupRef.current || !lookAt) return
    const dx = lookAt[0] - position[0]
    const dz = lookAt[2] - position[2]
    groupRef.current.rotation.y = Math.atan2(dx, dz)
  })

  return (
    <group ref={groupRef} position={position}>
      <NPCBody shirtColor={shirt} pantColor={pant} />
    </group>
  )
}

// ── NPC đi bộ (wander NPC) ───────────────────────────────────
export default function WanderNPC({ startPos, id = 0, exhibitPos = null }) {
  const groupRef  = useRef()
  const stateRef  = useRef('IDLE')
  const timerRef  = useRef(0)
  const targetRef = useRef(null)
  const posRef    = useRef([startPos[0], startPos[2]])

  const shirt = SHIRT_PALETTE[id % SHIRT_PALETTE.length]
  const pant  = PANT_PALETTE[id % PANT_PALETTE.length]

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const [px, pz] = posRef.current
    timerRef.current -= delta

    if (stateRef.current === 'IDLE') {
      if (timerRef.current <= 0) {
        // Nếu có exhibit gần → đi tới gần đó
        let tx, tz
        if (exhibitPos) {
          tx = exhibitPos[0] + (Math.random() - 0.5) * 2
          tz = exhibitPos[2] + 1.5 + Math.random()
        } else {
          const zone = findZone(px, pz)
          const rp = randInZone(zone)
          if (!rp) return
          ;[tx, tz] = rp
        }
        targetRef.current = [tx, tz]
        stateRef.current = 'WALKING'
      }
      return
    }

    if (stateRef.current === 'WALKING') {
      const [tx, tz] = targetRef.current
      const dx = tx - px, dz = tz - pz
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < 0.15) {
        stateRef.current = 'LOOKING'
        timerRef.current = LOOK_TIME_MIN + Math.random() * (LOOK_TIME_MAX - LOOK_TIME_MIN)
        // Quay mặt về phía tranh
        if (exhibitPos) {
          const adx = exhibitPos[0] - px
          const adz = exhibitPos[2] - pz
          groupRef.current.rotation.y = Math.atan2(adx, adz)
        }
        return
      }
      const step = SPEED * delta
      const nx = px + (dx / dist) * step
      const nz = pz + (dz / dist) * step
      const zone = findZone(nx, nz) || findZone(px, pz)
      const [cx, cz] = clampToZone(nx, nz, zone)
      posRef.current = [cx, cz]
      groupRef.current.position.set(cx, startPos[1] - 1.6, cz)
      groupRef.current.rotation.y = Math.atan2(dx, dz)
      return
    }

    if (stateRef.current === 'LOOKING') {
      if (timerRef.current <= 0) {
        stateRef.current = 'IDLE'
        timerRef.current = IDLE_TIME
        targetRef.current = null
      }
    }
  })

  return (
    <group ref={groupRef} position={[startPos[0], 0, startPos[2]]}>
      <NPCBody shirtColor={shirt} pantColor={pant} />
    </group>
  )
}
```

- [x] **4.2** Kiểm tra NPC xuất hiện đúng phòng, không bị chui qua tường.
- [x] **4.3** Điều chỉnh `SPEED` (dòng 13) nếu NPC đi quá nhanh/chậm.
- [x] **4.4** Điều chỉnh `LOOK_TIME_MIN/MAX` nếu muốn NPC đứng ngắm lâu hơn hay ngắn hơn.

---

## Phase 5 — Cập Nhật `Museum.jsx`

**File sửa:** `src/scene/Museum.jsx`  
**Mục tiêu:** Import và đặt tất cả props, cây, NPC vào đúng phòng + thêm spotlight cho tranh.

### Việc cần làm

- [x] **5.1** Thêm các import vào đầu `Museum.jsx`:

```js
import DecoTree from './DecoTree.jsx'
import {
  BenchProp, PedestalProp, RopeBarrierProp,
  InfoStandProp, ColumnProp, StarDecorProp,
  PillarProp, SuggestionBoxProp
} from './RoomProps.jsx'
import WanderNPC, { PointNPC } from './NPC.jsx'
```

- [x] **5.2** Thêm **spotlight cho từng tranh chủ đạo** — dán vào trong `<>...</>` của Museum, ngay sau `<ambientLight>`:

```jsx
{/* ── Spotlight chiếu tranh chủ đạo ── */}

{/* Lobby */}
<SpotlightOnExhibit from={[0, 4.5, -2.5]} to={[0, 2.8, -4.88]} intensity={28} />

{/* Phòng 1 */}
<SpotlightOnExhibit from={[18, 4.5, -2.5]} to={[18, 2.8, -4.88]} intensity={30} color="#fff3d0" />

{/* Phòng 2 */}
<SpotlightOnExhibit from={[36, 4.5, -2.5]} to={[36, 2.8, -4.88]} intensity={28} color="#ffeac0" />

{/* Phòng 3 */}
<SpotlightOnExhibit from={[54, 4.5, -2.5]} to={[54, 2.8, -4.88]} intensity={35} color="#ffd0b0" />

{/* Phòng 4 */}
<SpotlightOnExhibit from={[72, 4.5, -2.5]} to={[72, 2.8, -4.88]} intensity={30} />

{/* Phòng Kết */}
<SpotlightOnExhibit from={[91, 4.5, 0.5]} to={[95.88, 2.6, 0]} intensity={32} />
```

Thêm helper `SpotlightOnExhibit` ngay trên `function Fixture` trong cùng file:

```jsx
function SpotlightOnExhibit({ from, to, intensity = 28, color = '#fff5e0' }) {
  const ref = useRef()
  useEffect(() => { if (ref.current) ref.current.target.position.set(...to) }, [])
  return (
    <>
      <spotLight
        ref={ref}
        position={from}
        intensity={intensity}
        angle={0.32}
        penumbra={0.45}
        color={color}
        castShadow={false}
      />
      <primitive object={ref.current?.target ?? { position: { set: () => {} } }} />
    </>
  )
}
```

> **Lưu ý:** Cần `import { useRef, useEffect } from 'react'` ở đầu file nếu chưa có.

- [x] **5.3** Thêm **cây + phụ kiện + NPC cho Lobby** (x=0):

```jsx
{/* ── LOBBY ── */}
{/* Cây góc */}
<DecoTree position={[-5, 0, -3.5]} type="palm" />
<DecoTree position={[ 5, 0, -3.5]} type="palm" />
{/* Ghế */}
<BenchProp position={[-2.5, 0, 3]} rotation={[0, 0, 0]} />
<BenchProp position={[ 2.5, 0, 3]} rotation={[0, 0, 0]} />
{/* Bục thông tin */}
<InfoStandProp position={[4, 0, 0]} rotation={[0, Math.PI, 0]} text="Kính chào quý khách đến tham quan" />
{/* Thảm đỏ */}
<mesh position={[2, 0.005, 0]} receiveShadow>
  <boxGeometry args={[4, 0.01, 2]} />
  <meshStandardMaterial color="#6b1010" roughness={0.9} />
</mesh>
{/* NPC */}
<PointNPC position={[3, 1.6, 0.8]} lookAt={[0, 1.6, 0]} id={0} />
<WanderNPC startPos={[-1, 1.6, 1]} id={1} />
```

- [x] **5.4** Thêm **cây + phụ kiện + NPC cho Phòng 1** (x=18):

```jsx
{/* ── PHÒNG 1 ── */}
<DecoTree position={[14.5, 0, -3]} type="shrub" />
<ColumnProp position={[14, 0, 2]} height={3.0} />
<ColumnProp position={[22, 0, 2]} height={3.0} />
<PedestalProp position={[18, 0, 1.5]} height={0.9} color="#e8dfc0">
  {/* Quả cầu đất nung trên bệ */}
  <mesh position={[0, 0.95 + 0.15, 0]}>
    <sphereGeometry args={[0.15, 8, 6]} />
    <meshStandardMaterial color="#c8a060" roughness={0.85} />
  </mesh>
</PedestalProp>
<BenchProp position={[18, 0, 3.5]} />
<PointNPC position={[18, 1.6, -2.5]} lookAt={[18, 2.8, -4.88]} id={2} />
<WanderNPC startPos={[15, 1.6, 1]} id={3} exhibitPos={[18, 2.8, -4.88]} />
```

- [x] **5.5** Thêm **cây + phụ kiện + NPC cho Phòng 2** (x=36):

```jsx
{/* ── PHÒNG 2 ── */}
<DecoTree position={[33, 0, 3.5]} type="shrub" />
<DecoTree position={[39, 0, 3.5]} type="shrub" />
<PedestalProp position={[33, 0, 0]} height={0.9} color="#f0ede0" />
<PedestalProp position={[36, 0, 0]} height={0.6} color="#8a8078" />
<PedestalProp position={[39, 0, 0]} height={0.75} color="#d4c9a0" />
<RopeBarrierProp posts={[[31.5, -1.3],[31.5, 1.3],[40.5, 1.3],[40.5, -1.3],[31.5, -1.3]]} />
<WanderNPC startPos={[33, 1.6, 2]} id={4} exhibitPos={[36, 2.8, -4.88]} />
<WanderNPC startPos={[39, 1.6, 2]} id={5} exhibitPos={[36, 2.8, -4.88]} />
```

- [x] **5.6** Thêm **cây + phụ kiện + NPC cho Phòng 3** (x=54):

```jsx
{/* ── PHÒNG 3 ── */}
<DecoTree position={[51, 0, 3.5]} type="palm" />
{/* Ngôi sao 2 bên tranh */}
<StarDecorProp position={[51.2, 3.2, -4.82]} size={0.28} />
<StarDecorProp position={[56.8, 3.2, -4.82]} size={0.28} />
{/* Băng đỏ ngang */}
<mesh position={[54, 3.8, 0]}>
  <boxGeometry args={[6, 0.22, 0.025]} />
  <meshStandardMaterial color="#8b0000" roughness={0.9} />
</mesh>
<PedestalProp position={[54, 0, 1.5]} height={0.8} color="#8b2020">
  <mesh position={[0, 0.85 + 0.12, 0]}>
    <cylinderGeometry args={[0.1, 0.1, 0.24, 8]} />
    <meshStandardMaterial color="#cc1a1a" roughness={0.6} />
  </mesh>
</PedestalProp>
<BenchProp position={[51, 0, 3]} />
<BenchProp position={[57, 0, 3]} />
<PointNPC position={[54, 1.6, -2]} lookAt={[54, 2.8, -4.88]} id={6} />
<WanderNPC startPos={[51, 1.6, 2]} id={7} exhibitPos={[54, 2.8, -4.88]} />
```

- [x] **5.7** Thêm **cây + phụ kiện + NPC cho Phòng 4** (x=72):

```jsx
{/* ── PHÒNG 4 ── */}
<DecoTree position={[68, 0, 3.5]} type="shrub" />
<DecoTree position={[76, 0, 3.5]} type="shrub" />
{/* 3 trụ cột vật lý */}
<PillarProp position={[69, 0, 0]} color="#8b2020" topSymbol="star" />
<PillarProp position={[72, 0, 0]} color="#c4a84a" topSymbol="gear" />
<PillarProp position={[75, 0, 0]} color="#1a2060" topSymbol="book" />
{/* Rào quanh 3 trụ */}
<RopeBarrierProp posts={[[67.5,-1.4],[67.5,1.4],[76.5,1.4],[76.5,-1.4],[67.5,-1.4]]} />
{/* Spotlight từng trụ */}
<SpotlightOnExhibit from={[69, 4.5, 0]} to={[69, 0, 0]} intensity={20} color="#ffcccc" />
<SpotlightOnExhibit from={[72, 4.5, 0]} to={[72, 0, 0]} intensity={20} color="#ffe8a0" />
<SpotlightOnExhibit from={[75, 4.5, 0]} to={[75, 0, 0]} intensity={20} color="#aaccff" />
{/* NPC */}
<PointNPC position={[69, 1.6, 1.8]} lookAt={[69, 1.5, 0]} id={8} />
<PointNPC position={[72, 1.6, 1.8]} lookAt={[72, 1.5, 0]} id={9} />
<PointNPC position={[75, 1.6, 1.8]} lookAt={[75, 1.5, 0]} id={10} />
```

- [x] **5.8** Thêm **cây + phụ kiện + NPC cho Phòng Kết** (x=90):

```jsx
{/* ── PHÒNG KẾT ── */}
<DecoTree position={[85, 0, 3.5]} type="palm" />
<DecoTree position={[95, 0, 3.5]} type="palm" />
<BenchProp position={[87, 0, 3]} />
<BenchProp position={[93, 0, 3]} />
<SuggestionBoxProp position={[90, 0, 2.5]} />
{/* Băng chào màu vàng */}
<mesh position={[90, 4.3, 0]}>
  <boxGeometry args={[7, 0.2, 0.025]} />
  <meshStandardMaterial color="#c4a84a" roughness={0.7} metalness={0.2} />
</mesh>
<PointNPC position={[93, 1.6, -2]} lookAt={[95.88, 2.6, 0]} id={11} />
<WanderNPC startPos={[88, 1.6, 2]} id={12} exhibitPos={[95.88, 2.6, 0]} />
```

- [x] **5.9** Chạy `npm run dev`, kiểm tra toàn bộ bảo tàng từ đầu đến cuối.
- [x] **5.10** Nếu FPS thấp: tắt `<N8AO>` trong `EffectComposer` hoặc giảm số NPC.

---

## Checklist Tổng

| Phase | Nội dung | Trạng thái |
|---|---|---|
| Phase 1 | Dọn tranh → 1 ảnh/phòng trong `museumData.js` | ☑ |
| Phase 2 | Tạo `DecoTree.jsx` | ☑ |
| Phase 3 | Tạo `RoomProps.jsx` | ☑ |
| Phase 4 | Tạo `NPC.jsx` | ☑ |
| Phase 5.1 | Import vào `Museum.jsx` | ☑ |
| Phase 5.2 | Thêm spotlight tranh | ☑ |
| Phase 5.3 | Props + NPC Lobby | ☑ |
| Phase 5.4 | Props + NPC Phòng 1 | ☑ |
| Phase 5.5 | Props + NPC Phòng 2 | ☑ |
| Phase 5.6 | Props + NPC Phòng 3 | ☑ |
| Phase 5.7 | Props + NPC Phòng 4 | ☑ |
| Phase 5.8 | Props + NPC Phòng Kết | ☑ |
| Phase 5.9 | Kiểm tra toàn bộ + fix lỗi | ☑ |
