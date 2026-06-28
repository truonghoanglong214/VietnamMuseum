import React, { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import * as THREE from 'three'
import { walkZones, spawn } from '../museumData.js'

const EYE = 1.6
const SPEED = 3.2

function inWalk(x, z) {
  for (const r of walkZones) {
    if (x >= r.xMin && x <= r.xMax && z >= r.zMin && z <= r.zMax) return true
  }
  return false
}

export default function Player({ controlsRef, onLockChange, nearestInteractable, onInteract, isPopupOpen }) {
  const { camera } = useThree()
  const keys = useRef({})
  const locked = useRef(false)
  const nearestRef = useRef(nearestInteractable)
  nearestRef.current = nearestInteractable
  const onInteractRef = useRef(onInteract)
  onInteractRef.current = onInteract

  // vị trí xuất phát
  useEffect(() => {
    camera.position.set(...spawn.position)
    camera.lookAt(...spawn.lookAt)
  }, [camera])

  // phím
  useEffect(() => {
    const down = (e) => {
      keys.current[e.code] = true
      if ((e.code === 'KeyE' || e.key === 'e' || e.key === 'E') && nearestRef.current) {
        if (document.pointerLockElement != null) {
          document.exitPointerLock?.()
        }
        onInteractRef.current?.(nearestRef.current)
      }
    }
    const up = (e) => (keys.current[e.code] = false)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])


  // theo dõi trạng thái khóa chuột
  useEffect(() => {
    const onChange = () => {
      locked.current = document.pointerLockElement != null
      onLockChange?.(locked.current)
    }
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [onLockChange])

  useEffect(() => {
    if (isPopupOpen) {
      if (document.pointerLockElement != null) {
        document.exitPointerLock?.()
      }
    }
  }, [isPopupOpen])

  const front = useRef(new THREE.Vector3())
  const right = useRef(new THREE.Vector3())

  useFrame((_, dt) => {
    if (isPopupOpen || !locked.current) return
    const k = keys.current
    const fwd = (k['KeyW'] || k['ArrowUp'] ? 1 : 0) - (k['KeyS'] || k['ArrowDown'] ? 1 : 0)
    const str = (k['KeyD'] || k['ArrowRight'] ? 1 : 0) - (k['KeyA'] || k['ArrowLeft'] ? 1 : 0)
    if (!fwd && !str) {
      camera.position.y = EYE
      return
    }
    camera.getWorldDirection(front.current)
    front.current.y = 0
    front.current.normalize()
    right.current.set(-front.current.z, 0, front.current.x)

    const move = new THREE.Vector3()
    move.addScaledVector(front.current, fwd)
    move.addScaledVector(right.current, str)
    if (move.lengthSq() > 0) move.normalize().multiplyScalar(SPEED * Math.min(dt, 0.05))

    // di chuyển từng trục để trượt dọc tường
    const nx = camera.position.x + move.x
    if (inWalk(nx, camera.position.z)) camera.position.x = nx
    const nz = camera.position.z + move.z
    if (inWalk(camera.position.x, nz)) camera.position.z = nz
    camera.position.y = EYE
  })

  if (isPopupOpen) return null
  return <PointerLockControls ref={controlsRef} />
}
