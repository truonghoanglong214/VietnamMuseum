import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { interactables } from '../museumData.js'

export default function InteractSystem({ onNearestChange }) {
  const { camera } = useThree()
  const lastNearestIdRef = useRef(null)

  useFrame(() => {
    const playerPos = camera.position
    let nearest = null
    let minDist = Infinity

    for (const item of interactables) {
      const dx = playerPos.x - item.position[0]
      const dz = playerPos.z - item.position[2]
      const dist = Math.sqrt(dx * dx + dz * dz)
      if (dist < item.interactRadius && dist < minDist) {
        nearest = item
        minDist = dist
      }
    }

    const nearestId = nearest ? nearest.id : null
    if (nearestId !== lastNearestIdRef.current) {
      lastNearestIdRef.current = nearestId
      if (onNearestChange) {
        onNearestChange(nearest)
      }
    }
  })

  return null
}
