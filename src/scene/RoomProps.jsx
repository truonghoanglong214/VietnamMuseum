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

function PedestalPlaque({ title, yPos }) {
  const tex = useMemo(() => {
    if (!title) return null
    const W = 512, H = 128
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const ctx = c.getContext('2d')
    
    // Nền đồng thau vàng kim bảo tàng
    const grad = ctx.createLinearGradient(0, 0, W, H)
    grad.addColorStop(0, '#d4af37')
    grad.addColorStop(0.5, '#fff2a3')
    grad.addColorStop(1, '#aa820a')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, H)
    
    // Viền sang trọng
    ctx.strokeStyle = '#2a1a08'
    ctx.lineWidth = 8
    ctx.strokeRect(8, 8, W - 16, H - 16)

    ctx.strokeStyle = '#8b0000'
    ctx.lineWidth = 3
    ctx.strokeRect(16, 16, W - 32, H - 32)
    
    // Chữ tiêu đề
    ctx.fillStyle = '#1c0e04'
    ctx.font = "bold 28px 'Merriweather', 'Be Vietnam Pro', 'Segoe UI', sans-serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(title, W / 2, H / 2)
    
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 8
    return t
  }, [title])

  if (!tex) return null

  return (
    <mesh position={[0, yPos, 0.355]} castShadow>
      <boxGeometry args={[0.52, 0.13, 0.012]} />
      <meshStandardMaterial map={tex} roughness={0.35} metalness={0.6} />
    </mesh>
  )
}

// ── Bệ trưng bày ─────────────────────────────────────────────
export function PedestalProp({ position = [0, 0, 0], height = 0.8, color = '#e0dbd0', title = null, children }) {
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
      {/* Tấm bảng tên hiện vật */}
      {title && <PedestalPlaque title={title} yPos={height * 0.65} />}
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
    const W = 1024, H = 768
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const ctx = c.getContext('2d')
    ctx.fillStyle = '#f0e8d4'
    ctx.fillRect(0, 0, W, H)
    ctx.strokeStyle = '#8B2020'; ctx.lineWidth = 24
    ctx.strokeRect(24, 24, W - 48, H - 48)
    ctx.strokeStyle = '#c4a84a'; ctx.lineWidth = 8
    ctx.strokeRect(56, 56, W - 112, H - 112)
    ctx.fillStyle = '#2c1a08'
    ctx.font = "bold 64px 'Merriweather', 'Be Vietnam Pro', 'Segoe UI', sans-serif"
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const words = text.split(' ')
    const lines = []; let cur = ''
    for (const w of words) {
      const t = cur ? cur + ' ' + w : w
      if (ctx.measureText(t).width > W - 160 && cur) { lines.push(cur); cur = w }
      else cur = t
    }
    if (cur) lines.push(cur)
    const lh = 88
    const sy = H / 2 - (lines.length - 1) * lh / 2
    lines.forEach((l, i) => ctx.fillText(l, W / 2, sy + i * lh))
    const t2 = new THREE.CanvasTexture(c)
    t2.colorSpace = THREE.SRGBColorSpace
    t2.anisotropy = 8
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
