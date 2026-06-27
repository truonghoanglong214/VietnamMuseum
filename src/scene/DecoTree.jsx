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
        [0, 2.0 * s, 0, 0.38 * s],
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
