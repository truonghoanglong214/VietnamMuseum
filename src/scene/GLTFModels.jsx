import React, { useMemo, Suspense } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

function ModelInner({ url, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, targetSize = null, castShadow = true, receiveShadow = true }) {
  const { scene } = useGLTF(url)

  const { clone, offset, normScale } = useMemo(() => {
    const c = scene.clone(true)
    c.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = castShadow
        child.receiveShadow = receiveShadow
      }
    })

    // Tính toán Bounding Box để căn giữa chân đế Y=0 và tâm X,Z=0
    const box = new THREE.Box3().setFromObject(c)
    const center = new THREE.Vector3()
    const size = new THREE.Vector3()
    box.getCenter(center)
    box.getSize(size)

    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const nScale = targetSize ? (targetSize / maxDim) : 1

    // Offset để đáy vật thể nằm đúng Y=0 và tâm tại (0,0)
    const off = [-center.x, -box.min.y, -center.z]

    return { clone: c, offset: off, normScale: nScale }
  }, [scene, targetSize, castShadow, receiveShadow])

  const finalScale = Array.isArray(scale)
    ? scale.map(v => v * normScale)
    : [scale * normScale, scale * normScale, scale * normScale]

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

export function TorchModel(props) {
  return <GLTFAsset url="/Assets/Torch 1.glb" targetSize={1.2} {...props} />
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
