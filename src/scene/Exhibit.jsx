import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useGLTF, MeshTransmissionMaterial } from '@react-three/drei'
import { TrongDong, Vase, Plant } from './placeholders.jsx'

function GLBModel({ src, ...props }) {
  const { scene } = useGLTF(src)
  return <primitive object={scene.clone()} {...props} />
}

function ModelInner({ exhibit }) {
  const { model, scale = 1, rotation = [0, 0, 0] } = exhibit
  const common = { scale, rotation }
  if (model === 'trongdong') return <TrongDong {...common} />
  if (model === 'vase') return <Vase {...common} />
  if (model === 'plant') return <Plant {...common} />
  return (
    <Suspense fallback={null}>
      <GLBModel src={model} {...common} />
    </Suspense>
  )
}

function Pedestal() {
  return (
    <group>
      <mesh position={[0, 0.06, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.05, 0.12, 1.05]} />
        <meshStandardMaterial color="#15110c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.55, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.85, 0.86, 0.85]} />
        <meshStandardMaterial color="#221a12" roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.99, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.95, 0.05, 0.95]} />
        <meshStandardMaterial color="#0f0b07" roughness={0.7} />
      </mesh>
    </group>
  )
}

function GlassCase() {
  return (
    <group position={[0, 1.66, 0]}>
      <mesh>
        <boxGeometry args={[0.92, 1.3, 0.92]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.05}
          roughness={0.02}
          ior={1.5}
          chromaticAberration={0.02}
          transparent
          backside={false}
        />
      </mesh>
      {/* gờ đáy lồng kính */}
      <mesh position={[0, -0.66, 0]}>
        <boxGeometry args={[0.96, 0.04, 0.96]} />
        <meshStandardMaterial color="#3a2e1e" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  )
}

function ExhibitLight() {
  const light = useRef()
  const target = useRef()
  useEffect(() => {
    if (light.current && target.current) {
      light.current.target = target.current
      light.current.target.updateMatrixWorld()
    }
  }, [])
  return (
    <>
      <spotLight
        ref={light}
        position={[0, 3.4, 1.3]}
        angle={0.5}
        penumbra={0.6}
        intensity={120}
        distance={14}
        decay={2}
        color="#fff2d4"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0005}
      />
      <object3D ref={target} position={[0, 1.2, 0]} />
    </>
  )
}

export default function Exhibit({ exhibit, onSelect }) {
  const { position, pedestal, glassCase, light } = exhibit
  const [hover, setHover] = useState(false)
  const modelY = pedestal ? 1.02 : 0

  return (
    <group position={position}>
      {pedestal && <Pedestal />}
      {light && <ExhibitLight />}

      <group
        position={[0, modelY, 0]}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(exhibit)
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <ModelInner exhibit={exhibit} />
      </group>

      {glassCase && <GlassCase />}

      {hover && exhibit.title && (
        <mesh position={[0, pedestal ? 0.1 : 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.62, 48]} />
          <meshBasicMaterial color="#c9a24b" transparent opacity={0.5} />
        </mesh>
      )}
    </group>
  )
}
