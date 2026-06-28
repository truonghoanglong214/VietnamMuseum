import React, { useEffect, useState } from 'react'

export default function RoomHeader({ title }) {
  const [displayTitle, setDisplayTitle] = useState(title)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (title && title !== displayTitle) {
      setAnimating(true)
      const timer = setTimeout(() => {
        setDisplayTitle(title)
        setAnimating(false)
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [title, displayTitle])

  if (!displayTitle) return null

  return (
    <div className={`room-header ${animating ? 'room-header--changing' : ''}`}>
      <span className="room-header__icon">🏛️</span>
      <h2 className="room-header__title">{displayTitle}</h2>
    </div>
  )
}
