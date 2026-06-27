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
    <group ref={groupRef} position={[position[0], position[1] ?? 0, position[2]]}>
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

  const groundY = startPos[1] ?? 0

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
      groupRef.current.position.set(cx, groundY, cz)
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
    <group ref={groupRef} position={[startPos[0], groundY, startPos[2]]}>
      <NPCBody shirtColor={shirt} pantColor={pant} />
    </group>
  )
}
