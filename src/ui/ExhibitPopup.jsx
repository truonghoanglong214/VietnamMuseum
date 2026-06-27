import React, { useEffect, useState, useMemo, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center, useGLTF } from '@react-three/drei'

function ModelItem({ url }) {
  const { scene } = useGLTF(url)
  const clone = useMemo(() => scene.clone(true), [scene])
  return <primitive object={clone} />
}

function makePlaceholderDataUrl(title) {
  const W = 1024, H = 640
  const c = document.createElement('canvas')
  c.width = W; c.height = H
  const ctx = c.getContext('2d')

  // Nền kem-ngà
  ctx.fillStyle = '#f0e8d4'
  ctx.fillRect(0, 0, W, H)

  // Viền ngoài đỏ sẫm
  ctx.strokeStyle = '#8B2020'
  ctx.lineWidth = 16
  ctx.strokeRect(20, 20, W - 40, H - 40)

  // Viền trong vàng đồng
  ctx.strokeStyle = '#c4a84a'
  ctx.lineWidth = 6
  ctx.strokeRect(44, 44, W - 88, H - 88)

  // Dải màu trên và dưới
  ctx.fillStyle = '#8B2020'
  ctx.fillRect(44, 44, W - 88, 12)
  ctx.fillRect(44, H - 56, W - 88, 12)

  // Góc trang trí (dấu thập nhỏ)
  ;[[64, 64], [W - 64, 64], [64, H - 64], [W - 64, H - 64]].forEach(([cx, cy]) => {
    ctx.fillStyle = '#c4a84a'
    ctx.fillRect(cx - 16, cy - 3, 32, 6)
    ctx.fillRect(cx - 3, cy - 16, 6, 32)
  })

  // Tiêu đề (căn giữa, tự xuống dòng)
  ctx.fillStyle = '#2c1a08'
  ctx.font = "bold 44px 'Merriweather', 'Be Vietnam Pro', 'Segoe UI', serif"
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  const text = title || 'Hiện vật'
  const maxW = W - 160
  const words = text.split(' ')
  const lines = []
  let cur = ''
  for (const word of words) {
    const test = cur ? cur + ' ' + word : word
    if (ctx.measureText(test).width > maxW && cur) {
      lines.push(cur)
      cur = word
    } else {
      cur = test
    }
  }
  if (cur) lines.push(cur)

  const lineH = 60
  const totalH = lines.length * lineH
  const startY = H / 2 - totalH / 2 - 30

  lines.forEach((ln, i) => ctx.fillText(ln, W / 2, startY + i * lineH))

  // Ghi chú phía dưới
  ctx.fillStyle = '#8B2020'
  ctx.font = "28px 'Be Vietnam Pro', 'Segoe UI', sans-serif"
  ctx.textBaseline = 'alphabetic'
  ctx.fillText('[ Hình ảnh triển lãm sẽ được cập nhật ]', W / 2, H / 2 + totalH / 2 + 60)

  return c.toDataURL('image/png')
}

export default function ExhibitPopup({ item, onClose }) {
  const [imgSrc, setImgSrc] = useState(null)

  useEffect(() => {
    if (!item) return
    if (item.type === 'image') {
      if (item.imageSrc) {
        setImgSrc(item.imageSrc)
      } else {
        setImgSrc(makePlaceholderDataUrl(item.title))
      }
    }
  }, [item])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.code === 'Escape') {
        onClose?.()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!item) return null

  return (
    <div className="exhibit-popup">
      <div className={`exhibit-popup__container exhibit-popup__container--${item.type}`}>
        <button className="exhibit-popup__close" onClick={onClose} title="Đóng (Escape)">
          ✕
        </button>

        {item.type === 'image' ? (
          <div className="exhibit-popup__image-view">
            <h2 className="exhibit-popup__title">{item.title}</h2>
            {item.meta && <div className="exhibit-popup__meta">{item.meta}</div>}
            <div className="exhibit-popup__image-wrapper">
              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={item.title}
                  onError={() => setImgSrc(makePlaceholderDataUrl(item.title))}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="exhibit-popup__model-view">
            <div className="exhibit-popup__viewer">
              <Canvas camera={{ position: [0, 1.2, 3.2], fov: 45 }}>
                <ambientLight intensity={0.9} color="#ffffff" />
                <directionalLight position={[5, 8, 5]} intensity={1.5} />
                <directionalLight position={[-5, -2, -5]} intensity={0.6} color="#ffe8c0" />
                <Suspense fallback={null}>
                  <Center>
                    <ModelItem url={item.modelUrl} />
                  </Center>
                </Suspense>
                <OrbitControls autoRotate autoRotateSpeed={2.5} enablePan={false} enableZoom={true} />
              </Canvas>
              <div className="exhibit-popup__viewer-hint">Dùng chuột để xoay / zoom 3D model</div>
            </div>
            <div className="exhibit-popup__info">
              <h2 className="exhibit-popup__title">{item.title}</h2>
              {item.meta && <div className="exhibit-popup__meta">{item.meta}</div>}
              <div className="exhibit-popup__divider" />
              <p className="exhibit-popup__desc">{item.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
