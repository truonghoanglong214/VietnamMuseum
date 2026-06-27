import React, { useEffect, useState } from 'react'
import * as THREE from 'three'

const FRAME_COLORS = {
  wood:   { color: '#4a3526', metalness: 0.1,  roughness: 0.7  },
  bronze: { color: '#6b5326', metalness: 0.85, roughness: 0.45 },
  gold:   { color: '#b58a3a', metalness: 0.9,  roughness: 0.35 },
}

// Tạo placeholder kiểu bảng trưng bày bảo tàng Việt Nam:
// nền kem, viền đỏ–vàng, tiêu đề canh giữa.
function makePlaceholder(title) {
  const W = 1024, H = 1280
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  // Nền kem-ngà
  ctx.fillStyle = '#f0e8d4'
  ctx.fillRect(0, 0, W, H)

  // Viền ngoài đỏ sẫm
  ctx.strokeStyle = '#8B2020'
  ctx.lineWidth = 16
  ctx.strokeRect(20, 20, W - 40, H - 40)

  // Viền trong vàng đồng
  ctx.strokeStyle = '#c4a84a'
  ctx.lineWidth = 6
  ctx.strokeRect(44, 44, W - 88, H - 88)

  // Dải màu trên và dưới
  ctx.fillStyle = '#8B2020'
  ctx.fillRect(44, 44, W - 88, 10)
  ctx.fillRect(44, H - 54, W - 88, 10)

  // Góc trang trí (dấu thập nhỏ)
  ;[[64, 64], [W - 64, 64], [64, H - 64], [W - 64, H - 64]].forEach(([cx, cy]) => {
    ctx.fillStyle = '#c4a84a'
    ctx.fillRect(cx - 16, cy - 3, 32, 6)
    ctx.fillRect(cx - 3, cy - 16, 6, 32)
  })

  // Tiêu đề (căn giữa, tự xuống dòng)
  ctx.fillStyle = '#2c1a08'
  ctx.font = "bold 44px 'Merriweather', 'Be Vietnam Pro', 'Segoe UI', serif"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  const text = title || 'Hiện vật'
  const maxW = W - 160
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const word of words) {
    const test = cur ? cur + ' ' + word : word
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur)
      cur = word
    } else {
      cur = test
    }
  }
  if (cur) lines.push(cur)

  const lineH = 60
  const totalH = lines.length * lineH
  const startY = H / 2 - totalH / 2 - 40

  lines.forEach((ln, i) => ctx.fillText(ln, W / 2, startY + i * lineH))

  // Ghi chú phía dưới
  ctx.fillStyle = '#8B2020'
  ctx.font = "28px 'Be Vietnam Pro', 'Segoe UI', sans-serif"
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('[ Hình ảnh sẽ được cập nhật ]', W / 2, H / 2 + totalH / 2 + 76)

  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

// Nạp ảnh; nếu thiếu file → tạo placeholder.
function useArtTexture(src, title) {
  const [tex, setTex] = useState(null)
  useEffect(() => {
    let alive = true
    if (!src) {
      if (alive) setTex(makePlaceholder(title))
      return
    }
    new THREE.TextureLoader().load(
      src,
      (t) => {
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = 8
        if (alive) setTex(t)
      },
      undefined,
      () => alive && setTex(makePlaceholder(title))
    )
    return () => { alive = false }
  }, [src, title])
  return tex
}

export default function Frame({ exhibit, onSelect }) {
  const { position, rotation = [0, 0, 0], size = [1.4, 1.8], frame = 'gold' } = exhibit
  const [w, h] = size
  const tex = useArtTexture(exhibit.src, exhibit.title)
  const fw = 0.09
  const fm = FRAME_COLORS[frame] || FRAME_COLORS.gold
  const [hover, setHover] = useState(false)

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e) => { e.stopPropagation(); onSelect?.(exhibit) }}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      {/* Tấm nền sau */}
      <mesh position={[0, 0, -0.035]} castShadow>
        <boxGeometry args={[w + fw, h + fw, 0.045]} />
        <meshStandardMaterial color="#1a140d" roughness={1} />
      </mesh>

      {/* Mặt tranh */}
      <mesh position={[0, 0, 0.006]}>
        <planeGeometry args={[w, h]} />
        {tex && (
          <meshStandardMaterial
            map={tex}
            emissiveMap={tex}
            emissive={'#ffffff'}
            emissiveIntensity={hover ? 0.42 : 0.22}
            roughness={0.65}
            metalness={0}
          />
        )}
      </mesh>

      {/* Kính bảo vệ */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[w, h]} />
        <meshPhysicalMaterial
          transparent opacity={0.06}
          roughness={0.04} metalness={0}
          envMapIntensity={1.4}
        />
      </mesh>

      {/* 4 thanh khung chính */}
      {[
        { args: [w + 2 * fw, fw, 0.08], pos: [0,  h / 2 + fw / 2, 0.02] },
        { args: [w + 2 * fw, fw, 0.08], pos: [0, -h / 2 - fw / 2, 0.02] },
        { args: [fw, h,       0.08], pos: [-w / 2 - fw / 2, 0, 0.02] },
        { args: [fw, h,       0.08], pos: [ w / 2 + fw / 2, 0, 0.02] },
      ].map((b, i) => (
        <mesh key={i} position={b.pos} castShadow>
          <boxGeometry args={b.args} />
          <meshStandardMaterial color={fm.color} metalness={fm.metalness} roughness={fm.roughness} envMapIntensity={1.2} />
        </mesh>
      ))}

      {/* Gờ nổi trong khung (chi tiết trang trí) */}
      {[
        { args: [w + 2 * fw - 0.02, 0.018, 0.03], pos: [0,  h / 2 + fw * 0.55, 0.05] },
        { args: [w + 2 * fw - 0.02, 0.018, 0.03], pos: [0, -h / 2 - fw * 0.55, 0.05] },
        { args: [0.018, h - 0.02, 0.03], pos: [-w / 2 - fw * 0.55, 0, 0.05] },
        { args: [0.018, h - 0.02, 0.03], pos: [ w / 2 + fw * 0.55, 0, 0.05] },
      ].map((b, i) => (
        <mesh key={'inner-' + i} position={b.pos}>
          <boxGeometry args={b.args} />
          <meshStandardMaterial color={fm.color} metalness={Math.min(fm.metalness + 0.05, 1)} roughness={Math.max(fm.roughness - 0.1, 0.1)} />
        </mesh>
      ))}

      {/* Viền sáng khi rê chuột */}
      {hover && (
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[w + 2 * fw + 0.05, h + 2 * fw + 0.05]} />
          <meshBasicMaterial color="#c9a24b" transparent opacity={0.14} />
        </mesh>
      )}
    </group>
  )
}
