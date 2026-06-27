import React, { Suspense, useCallback, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import Museum from './scene/Museum.jsx'
import InfoPanel from './ui/InfoPanel.jsx'
import InteractHint from './ui/InteractHint.jsx'
import ExhibitPopup from './ui/ExhibitPopup.jsx'
import { spawn } from './museumData.js'

export default function App() {
  const controlsRef = useRef()
  const [started, setStarted] = useState(false)
  const [locked, setLocked] = useState(false)
  const [selected, setSelected] = useState(null)
  const [nearestInteractable, setNearestInteractable] = useState(null)
  const [viewingExhibit, setViewingExhibit] = useState(null)

  const lock = useCallback(() => {
    setStarted(true)
    controlsRef.current?.lock?.()
  }, [])

  const onSelect = useCallback((ex) => {
    setSelected(ex)
    document.exitPointerLock?.()
  }, [])

  const onClose = useCallback(() => {
    setSelected(null)
    controlsRef.current?.lock?.()
  }, [])

  const onInteract = useCallback((item) => {
    setViewingExhibit(item)
    document.exitPointerLock?.()
  }, [])

  const closeExhibitPopup = useCallback(() => {
    setViewingExhibit(null)
    controlsRef.current?.lock?.()
  }, [])

  const showIntro = !locked && !selected && !viewingExhibit

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ fov: 62, near: 0.05, far: 120, position: spawn.position }}
        onCreated={({ gl }) => { gl.toneMappingExposure = 1.1 }}
      >
        <Suspense fallback={null}>
          <Museum
            controlsRef={controlsRef}
            onSelect={onSelect}
            onLockChange={setLocked}
            onNearestChange={setNearestInteractable}
            nearestInteractable={nearestInteractable}
            onInteract={onInteract}
          />
        </Suspense>
      </Canvas>

      {locked && !viewingExhibit && <div className="crosshair" />}

      {locked && nearestInteractable && !viewingExhibit && (
        <InteractHint item={nearestInteractable} />
      )}

      {showIntro && (
        <div className="intro" onClick={lock}>
          <div className="intro__inner">
            <div className="star-emblem" />
            <p className="intro__eyebrow">Môn học MLN131 · Bảo tàng 3D</p>
            <h1 className="intro__title">Lịch sử và Bản chất<br />Dân chủ</h1>
            <p className="intro__lead">
              {started
                ? 'Nhấn để quay lại không gian trưng bày.'
                : 'Hành trình qua 4 phòng — từ cội nguồn DEMOKRATOS đến nền Dân chủ Xã hội chủ nghĩa Việt Nam. Tiến lại gần hiện vật và nhấn phím E để xem chi tiết.'}
            </p>
            <span className="intro__cta">{started ? 'Tiếp tục tham quan' : 'Bước vào bảo tàng'}</span>
            <p className="intro__hint">
              Di chuyển <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd>
              {' '}· Nhìn quanh bằng <kbd>chuột</kbd>
              {' '}· Tương tác <kbd>E</kbd>
              {' '}· Thoát <kbd>Esc</kbd>
            </p>
          </div>
        </div>
      )}

      <InfoPanel exhibit={selected} onClose={onClose} />

      {viewingExhibit && (
        <ExhibitPopup item={viewingExhibit} onClose={closeExhibitPopup} />
      )}

      <Loader
        containerStyles={{ background: '#100c08' }}
        barStyles={{ background: '#c9a24b', height: '3px' }}
        dataStyles={{ color: '#c9a24b', fontFamily: 'Be Vietnam Pro, sans-serif', fontSize: '13px', letterSpacing: '0.1em' }}
        dataInterpolation={(p) => `Đang dựng bảo tàng… ${p.toFixed(0)}%`}
      />
    </>
  )
}
