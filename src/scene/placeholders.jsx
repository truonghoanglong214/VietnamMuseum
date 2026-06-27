import React, { useMemo } from 'react'
import * as THREE from 'three'

// ---- Texture mặt trống: ngôi sao nhiều cánh + các vành hoa văn ----
function useSunTexture() {
  return useMemo(() => {
    const s = 512
    const c = document.createElement('canvas')
    c.width = c.height = s
    const ctx = c.getContext('2d')
    const cx = s / 2
    // nền đồng
    const g = ctx.createRadialGradient(cx, cx, 10, cx, cx, cx)
    g.addColorStop(0, '#8a6d3b')
    g.addColorStop(1, '#4f3f20')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, s, s)
    // các vành tròn đồng tâm
    ctx.strokeStyle = 'rgba(20,14,8,0.55)'
    for (let r = 40; r < cx; r += 26) {
      ctx.lineWidth = r % 52 === 40 ? 3 : 1.5
      ctx.beginPath()
      ctx.arc(cx, cx, r, 0, Math.PI * 2)
      ctx.stroke()
    }
    // ngôi sao 14 cánh ở trung tâm
    const rays = 14
    ctx.fillStyle = '#e7c878'
    ctx.beginPath()
    for (let i = 0; i < rays * 2; i++) {
      const ang = (Math.PI / rays) * i
      const rad = i % 2 === 0 ? 64 : 24
      const x = cx + Math.cos(ang) * rad
      const y = cx + Math.sin(ang) * rad
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = '#4f3f20'
    ctx.beginPath()
    ctx.arc(cx, cx, 14, 0, Math.PI * 2)
    ctx.fill()
    const tex = new THREE.CanvasTexture(c)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return tex
  }, [])
}

export function TrongDong(props) {
  const sun = useSunTexture()
  const profile = useMemo(
    () =>
      [
        [0.50, 0.00],
        [0.42, 0.08],
        [0.30, 0.22],
        [0.40, 0.40],
        [0.46, 0.52],
        [0.50, 0.58],
        [0.52, 0.62],
      ].map(([r, y]) => new THREE.Vector2(r, y)),
    []
  )
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 64]} />
        <meshStandardMaterial color="#6b5326" metalness={0.9} roughness={0.45} envMapIntensity={1.1} />
      </mesh>
      {/* mặt trống */}
      <mesh position={[0, 0.625, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <circleGeometry args={[0.52, 64]} />
        <meshStandardMaterial map={sun} metalness={0.85} roughness={0.5} envMapIntensity={1} />
      </mesh>
    </group>
  )
}

export function Vase(props) {
  const profile = useMemo(
    () =>
      [
        [0.00, 0.00],
        [0.18, 0.02],
        [0.24, 0.10],
        [0.30, 0.30],
        [0.22, 0.52],
        [0.14, 0.66],
        [0.18, 0.74],
        [0.15, 0.78],
      ].map(([r, y]) => new THREE.Vector2(r, y)),
    []
  )
  return (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 48]} />
        <meshPhysicalMaterial color="#6e8a7b" roughness={0.25} metalness={0.05} clearcoat={0.6} clearcoatRoughness={0.3} envMapIntensity={1} />
      </mesh>
    </group>
  )
}

export function Plant(props) {
  const foliage = '#3f6b3a'
  return (
    <group {...props}>
      {/* chậu */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.36, 24]} />
        <meshStandardMaterial color="#8a4b2f" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.03, 24]} />
        <meshStandardMaterial color="#2c2018" roughness={1} />
      </mesh>
      {/* thân */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.06, 0.7, 12]} />
        <meshStandardMaterial color="#5a4632" roughness={0.9} />
      </mesh>
      {/* tán lá */}
      {[
        [0, 1.15, 0, 0.42],
        [0.22, 1.0, 0.1, 0.3],
        [-0.2, 1.05, -0.08, 0.28],
        [0.05, 1.35, -0.1, 0.26],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <icosahedronGeometry args={[r, 1]} />
          <meshStandardMaterial color={foliage} roughness={0.85} flatShading />
        </mesh>
      ))}
    </group>
  )
}
