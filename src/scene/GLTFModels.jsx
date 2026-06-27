import React, { useMemo, useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function ModelInner({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, targetSize = null, castShadow = true, receiveShadow = true }) {
  const { scene } = useGLTF(url)

  const { clone, offset, finalScale } = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
      }
    })

    c.updateMatrixWorld(true)
    // Tính toán Bounding Box để căn giữa chân đế Y=0 và tâm X,Z=0
    const box = new THREE.Box3().setFromObject(c)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const normScale = targetSize ? (targetSize / maxDim) : 1

    const fScale = Array.isArray(scale)
      ? scale.map(v => v * normScale)
      : [scale * normScale, scale * normScale, scale * normScale]

    // Offset để đáy vật thể nằm đúng Y=0 và tâm tại (0,0) sau khi scale
    const off = [
      -center.x * fScale[0],
      -box.min.y * fScale[1],
      -center.z * fScale[2]
    ]

    return { clone: c, offset: off, finalScale: fScale }
  }, [scene, targetSize, castShadow, receiveShadow, scale])

  return (
    <group position={position} rotation={rotation}>
      <primitive
        object={clone}
        position={offset}
        scale={finalScale}
      />
    </group>
  )
}

export function GLTFAsset(props) {
  return (
    <Suspense fallback={null}>
      <ModelInner {...props} />
    </Suspense>
  )
}

// ── Danh sách các Asset cụ thể đã được chuẩn hóa kích thước & vị trí ──

// Sảnh Lobby
export function TrongDongModel(props) {
  return <GLTFAsset url="/Assets/trong_ong_ong_son_-_viet_nam.glb" targetSize={1.4} {...props} />
}

export function ReceptionDeskModel(props) {
  return <GLTFAsset url="/Assets/Desk.glb" targetSize={1.4} {...props} />
}

// Phòng 1
export function SocratesModel(props) {
  return <GLTFAsset url="/Assets/socrates_.obj.glb" targetSize={0.7} {...props} />
}

export function SpartanHelmetModel(props) {
  return <GLTFAsset url="/Assets/pbr_spartan_helmet.glb" targetSize={0.4} {...props} />
}

export function SpartanShieldModel(props) {
  return <GLTFAsset url="/Assets/pbr_spartan_shield.glb" targetSize={0.75} {...props} />
}

export function AncientScrollModel(props) {
  return <GLTFAsset url="/Assets/ancient_scroll_and_parchment.glb" targetSize={0.5} {...props} />
}

export function GreekColumnModel(props) {
  return <GLTFAsset url="/Assets/Column.glb" targetSize={3.0} {...props} />
}

// Phòng 2
export function GoddessOfJusticeModel(props) {
  return <GLTFAsset url="/Assets/greek_goddess_of_justice_stl_for_plaabsresin.glb" targetSize={0.75} {...props} />
}

export function CrownModel(props) {
  return <GLTFAsset url="/Assets/Crown.glb" targetSize={0.35} {...props} />
}

// Phòng 3
export function HammerSickleModel(props) {
  return <GLTFAsset url="/Assets/hammer__sickle.glb" targetSize={0.6} {...props} />
}

function FireEffect({ position = [0, 1.15, 0] }) {
  const lightRef = useRef()
  const flame1Ref = useRef()
  const flame2Ref = useRef()
  const flame3Ref = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lightRef.current) {
      lightRef.current.intensity = 16 + Math.sin(t * 12) * 4 + Math.cos(t * 22) * 3
    }
    if (flame1Ref.current) {
      flame1Ref.current.scale.y = 1 + Math.sin(t * 10) * 0.15 + Math.cos(t * 17) * 0.1
      flame1Ref.current.scale.x = 1 + Math.cos(t * 14) * 0.1
      flame1Ref.current.scale.z = flame1Ref.current.scale.x
      flame1Ref.current.rotation.y = t * 1.5
    }
    if (flame2Ref.current) {
      flame2Ref.current.scale.y = 1 + Math.cos(t * 13) * 0.18 + Math.sin(t * 19) * 0.1
      flame2Ref.current.rotation.y = -t * 2.2
    }
    if (flame3Ref.current) {
      flame3Ref.current.scale.y = 1 + Math.sin(t * 16) * 0.2
      flame3Ref.current.rotation.y = t * 3
    }
  })

  return (
    <group position={position}>
      <pointLight
        ref={lightRef}
        color="#ff7700"
        intensity={18}
        distance={8}
        decay={2}
      />
      <mesh ref={flame1Ref} position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffee66"
          emissiveIntensity={4.5}
          roughness={0.1}
        />
      </mesh>
      <mesh ref={flame2Ref} position={[0, 0.18, 0]}>
        <coneGeometry args={[0.13, 0.38, 8]} />
        <meshStandardMaterial
          color="#ff5500"
          emissive="#ff6600"
          emissiveIntensity={3.5}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh ref={flame3Ref} position={[0, 0.26, 0]}>
        <coneGeometry args={[0.18, 0.5, 8]} />
        <meshStandardMaterial
          color="#cc1100"
          emissive="#ff2200"
          emissiveIntensity={2.5}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  )
}

export function TorchModel(props) {
  return (
    <group {...props}>
      <GLTFAsset url="/Assets/Torch 1.glb" targetSize={1.2} />
      <FireEffect position={[0, 1.15, 0]} />
    </group>
  )
}

// Phòng 4
export function WheatFieldModel(props) {
  return <GLTFAsset url="/Assets/Field of wheat.glb" targetSize={1.0} {...props} />
}

export function GearModel(props) {
  return <GLTFAsset url="/Assets/Gear.glb" targetSize={0.65} {...props} />
}

export function BrownBookModel(props) {
  return <GLTFAsset url="/Assets/brown book.glb" targetSize={0.4} {...props} />
}

export function GlobeModel(props) {
  return <GLTFAsset url="/Assets/Globe.glb" targetSize={0.7} {...props} />
}

// Phòng Kết
export function OnePillarPagodaModel(props) {
  return <GLTFAsset url="/Assets/one_pillar_pagoda_-_vietnam.glb" targetSize={2.2} {...props} />
}

export function LotusFlowerModel(props) {
  return <GLTFAsset url="/Assets/lotus_flower_-_low_poly.glb" targetSize={0.4} {...props} />
}
