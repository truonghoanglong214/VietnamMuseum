import React, { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { interactables } from '../museumData.js'

export function getRoomTitleByX(x) {
  if (x < 6) return 'Sảnh Đón Tiếp — Welcome Lobby'
  if (x >= 12 && x <= 24) return 'Phòng 1 – Cội nguồn của quyền lực'
  if (x >= 30 && x <= 42) return 'Phòng 2 – Những nấc thang thời đại'
  if (x >= 48 && x <= 60) return 'Phòng 3 – Bước ngoặt cách mạng'
  if (x >= 66 && x <= 78) return 'Phòng 4 – Linh hồn của chế độ mới'
  if (x >= 84) return 'PHÒNG KẾT – DI SẢN VÀ TƯƠNG LAI'
  return null
}

export default function InteractSystem({ onNearestChange, onRoomChange }) {
  const { camera } = useThree()
  const lastNearestIdRef = useRef(null)
  const lastRoomTitleRef = useRef(null)

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

    const roomTitle = getRoomTitleByX(playerPos.x)
    if (roomTitle && roomTitle !== lastRoomTitleRef.current) {
      lastRoomTitleRef.current = roomTitle
      if (onRoomChange) {
        onRoomChange(roomTitle)
      }
    }
  })

  return null
}
