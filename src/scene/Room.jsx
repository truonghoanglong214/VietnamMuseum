import React from 'react'

const T = 0.2       // độ dày tường
const DOOR_W = 3    // chiều rộng cửa
const DOOR_H = 3    // chiều cao cửa

// Màu trang trí kiến trúc — phong cách bảo tàng Việt Nam
const CLR_BASEBOARD = '#2a1a08'  // gỗ đen-nâu chân tường
const CLR_CORNICE   = '#c4a84a'  // vàng đồng — gờ trần

function Wall({ side, size, hasDoor, color }) {
  const [w, h, d] = size
  const boxes = []
  const isEW = side === 'east' || side === 'west'
  const span = isEW ? d : w
  const sign = side === 'east' || side === 'south' ? 1 : -1
  const axisPos = (isEW ? w : d) / 2 * sign

  const push = (len, center) => {
    if (len <= 0.001) return
    if (isEW) {
      boxes.push({ args: [T, h, len], pos: [axisPos, h / 2, center] })
    } else {
      boxes.push({ args: [len, h, T], pos: [center, h / 2, axisPos] })
    }
  }

  if (!hasDoor) {
    push(span, 0)
  } else {
    const segLen = span / 2 - DOOR_W / 2
    push(segLen, -(DOOR_W / 2 + segLen / 2))
    push(segLen,  DOOR_W / 2 + segLen / 2)
    const lintelH = h - DOOR_H
    if (lintelH > 0.001) {
      if (isEW) boxes.push({ args: [T, lintelH, DOOR_W], pos: [axisPos, DOOR_H + lintelH / 2, 0] })
      else       boxes.push({ args: [DOOR_W, lintelH, T], pos: [0, DOOR_H + lintelH / 2, 0] })
    }
  }

  return (
    <>
      {boxes.map((b, i) => (
        <mesh key={i} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.args} />
          <meshStandardMaterial color={color} roughness={0.88} metalness={0} />
        </mesh>
      ))}
    </>
  )
}

export default function Room({ room }) {
  const { position, size, walls, floorColor, wallColor } = room
  const [w, h, d] = size

  // Vị trí bề mặt trong của từng tường (tính từ tâm phòng)
  const n = d / 2 - T / 2   // bề mặt tường Bắc (z âm)
  const s = d / 2 - T / 2   // bề mặt tường Nam (z dương)
  const e = w / 2 - T / 2   // bề mặt tường Đông (x dương)
  const we = w / 2 - T / 2  // bề mặt tường Tây (x âm)

  // Khoảng nhô của gờ trần ra phía trong phòng
  const CORNICE_DEPTH = 0.07

  return (
    <group position={position}>

      {/* Sàn gỗ — mahogany đánh bóng */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[w, 0.1, d]} />
        <meshStandardMaterial color={floorColor} roughness={0.22} metalness={0.1} envMapIntensity={0.9} />
      </mesh>

      {/* Trần — trắng ngà nhẹ */}
      <mesh position={[0, h, 0]} receiveShadow>
        <boxGeometry args={[w, 0.1, d]} />
        <meshStandardMaterial color={'#1e1a12'} roughness={1} metalness={0} />
      </mesh>

      {/* ── Gờ chân tường (baseboard) ── */}
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[w - 0.02, 0.18, d - 0.02]} />
        <meshStandardMaterial color={CLR_BASEBOARD} roughness={0.9} />
      </mesh>

      {/* ── Gờ trần (cornice) — vàng đồng ── */}

      {walls.north !== 'door' && (
        <mesh position={[0, h - 0.11, -(n - CORNICE_DEPTH / 2)]}>
          <boxGeometry args={[w, 0.2, CORNICE_DEPTH]} />
          <meshStandardMaterial color={CLR_CORNICE} roughness={0.55} metalness={0.3} />
        </mesh>
      )}
      {walls.south !== 'door' && (
        <mesh position={[0, h - 0.11, s - CORNICE_DEPTH / 2]}>
          <boxGeometry args={[w, 0.2, CORNICE_DEPTH]} />
          <meshStandardMaterial color={CLR_CORNICE} roughness={0.55} metalness={0.3} />
        </mesh>
      )}
      {walls.west !== 'door' && (
        <mesh position={[-(we - CORNICE_DEPTH / 2), h - 0.11, 0]}>
          <boxGeometry args={[CORNICE_DEPTH, 0.2, d]} />
          <meshStandardMaterial color={CLR_CORNICE} roughness={0.55} metalness={0.3} />
        </mesh>
      )}
      {walls.east !== 'door' && (
        <mesh position={[e - CORNICE_DEPTH / 2, h - 0.11, 0]}>
          <boxGeometry args={[CORNICE_DEPTH, 0.2, d]} />
          <meshStandardMaterial color={CLR_CORNICE} roughness={0.55} metalness={0.3} />
        </mesh>
      )}

      {/* ── Tường ── */}
      <Wall side="north" size={size} hasDoor={walls.north === 'door'} color={wallColor} />
      <Wall side="south" size={size} hasDoor={walls.south === 'door'} color={wallColor} />
      <Wall side="east"  size={size} hasDoor={walls.east  === 'door'} color={wallColor} />
      <Wall side="west"  size={size} hasDoor={walls.west  === 'door'} color={wallColor} />
    </group>
  )
}
