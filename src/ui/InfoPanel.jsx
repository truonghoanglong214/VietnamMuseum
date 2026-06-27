import React from 'react'

export default function InfoPanel({ exhibit, onClose }) {
  const open = !!exhibit
  return (
    <aside className={`panel ${open ? 'panel--open' : ''}`} aria-hidden={!open}>
      {exhibit && (
        <>
          <p className="panel__kicker">Hiện vật</p>
          <h2 className="panel__title">{exhibit.title}</h2>
          {exhibit.meta && <p className="panel__meta">{exhibit.meta}</p>}
          <div className="panel__rule" />
          <div className="panel__body">{exhibit.body || 'Chưa có mô tả cho hiện vật này.'}</div>
          <button className="panel__close" onClick={onClose}>
            Đóng & tiếp tục
          </button>
        </>
      )}
    </aside>
  )
}
