import React, { useEffect, useRef, useState } from 'react'

export default function MusicPlayer({ started }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.25)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (started && audioRef.current && !isPlaying) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.log('Tự động phát nhạc bị chặn bởi trình duyệt:', err)
      })
    }
  }, [started])

  const toggleMusic = (e) => {
    e.stopPropagation()
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => console.log(err))
    }
  }

  const handleVolumeChange = (e) => {
    e.stopPropagation()
    const newVol = parseFloat(e.target.value)
    setVolume(newVol)
    if (newVol > 0 && !isPlaying && audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const getIcon = () => {
    if (!isPlaying || volume === 0) return '🔇'
    if (volume < 0.4) return '🔉'
    return '🔊'
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/Music/Centuries_in_Stone.mp3"
        loop
        preload="auto"
      />
      <div
        className="music-controls"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="music-btn"
          onClick={toggleMusic}
          title={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
        >
          <span className="music-btn__icon">{getIcon()}</span>
          <span className="music-btn__text">{isPlaying ? 'Nhạc' : 'Tắt'}</span>
        </button>
        <div className="music-slider-wrapper">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="music-slider"
            title={`Âm lượng: ${Math.round(volume * 100)}%`}
          />
          <span className="music-volume-text">{Math.round(volume * 100)}%</span>
        </div>
      </div>
    </>
  )
}
