import { useEffect, useRef, useState } from 'react'
import WaveSurfer from 'wavesurfer.js'

export default function WaveformPlayer({ audioUrl }) {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return

    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#8b5cf6',
      progressColor: '#ec4899',
      cursorColor: '#06b6d4',
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 80,
      normalize: true
    })

    wavesurfer.current.load(audioUrl)

    wavesurfer.current.on('ready', () => {
      setDuration(wavesurfer.current.getDuration())
    })

    wavesurfer.current.on('audioprocess', () => {
      setCurrentTime(wavesurfer.current.getCurrentTime())
    })

    wavesurfer.current.on('finish', () => {
      setIsPlaying(false)
    })

    return () => {
      wavesurfer.current?.destroy()
    }
  }, [audioUrl])

  const togglePlay = () => {
    if (wavesurfer.current) {
      wavesurfer.current.playPause()
      setIsPlaying(!isPlaying)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-4">
      <div ref={waveformRef} className="w-full" />
      
      <div className="flex items-center justify-between">
        <button
          onClick={togglePlay}
          className="w-12 h-12 jersey-gradient rounded-full flex items-center justify-center
                     hover:opacity-90 transition-all transform hover:scale-105"
        >
          {isPlaying ? (
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="text-sm font-mono text-white/60">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => wavesurfer.current?.setPlaybackRate(0.5)}
            className="px-2 py-1 text-xs bg-white/10 rounded hover:bg-white/20"
          >
            0.5x
          </button>
          <button
            onClick={() => wavesurfer.current?.setPlaybackRate(1)}
            className="px-2 py-1 text-xs bg-jersey-purple/30 rounded hover:bg-jersey-purple/50"
          >
            1x
          </button>
        </div>
      </div>
    </div>
  )
}
