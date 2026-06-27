import React from 'react'

export default function InteractHint({ item }) {
  if (!item) return null

  return (
    <div className="interact-hint">
      <div className="interact-hint__key">E</div>
      <div className="interact-hint__content">
        <span className="interact-hint__action">Nhấn [E] để xem chi tiết</span>
        <span className="interact-hint__title">"{item.title}"</span>
      </div>
    </div>
  )
}
