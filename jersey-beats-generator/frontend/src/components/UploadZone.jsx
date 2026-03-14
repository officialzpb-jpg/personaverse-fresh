import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useBeatStore } from '../store/beatStore'

const JERSEY_PRESETS = [
  { name: 'Classic Club', bpm: 145, energy: 'high', description: 'Bed squeaks, triplet kicks, chopped vocals' },
  { name: 'TikTok Viral', bpm: 148, energy: 'max', description: 'Heavy drops, viral-ready energy' },
  { name: 'Smooth Jersey', bpm: 142, energy: 'medium', description: 'R&B vibes, melodic chops' },
  { name: 'Underground', bpm: 140, energy: 'high', description: 'Raw, gritty, basement energy' }
]

export default function UploadZone() {
  const [selectedPreset, setSelectedPreset] = useState(JERSEY_PRESETS[0])
  const [customBpm, setCustomBpm] = useState(145)
  const [uploadedFiles, setUploadedFiles] = useState([])
  
  const { generateFromUpload, isGenerating } = useBeatStore()

  const onDrop = useCallback((acceptedFiles) => {
    const audioFiles = acceptedFiles.filter(file => 
      file.type.startsWith('audio/') || file.name.match(/\.(mp3|wav|flac|m4a)$/i)
    )
    setUploadedFiles(prev => [...prev, ...audioFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.flac', '.m4a']
    },
    maxFiles: 2
  })

  const handleGenerate = async () => {
    if (uploadedFiles.length === 0) return
    
    await generateFromUpload(uploadedFiles, {
      preset: selectedPreset.name,
      bpm: customBpm,
      energy: selectedPreset.energy
    })
  }

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Remix Your Tracks</h2>
        <p className="text-white/60 text-sm">
          Upload 1-2 songs and we'll Jersey-fy them with AI. We'll extract stems, 
          analyze the energy, and rebuild it with that signature Jersey bounce.
        </p>
      </div>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragActive
            ? 'border-jersey-pink bg-jersey-pink/10'
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        <input {...getInputProps()} />
        <div className="text-4xl mb-3">🎵</div>
        <p className="font-medium">
          {isDragActive ? 'Drop the heat here...' : 'Drag & drop audio files'}
        </p>
        <p className="text-sm text-white/50 mt-1">
          MP3, WAV, FLAC up to 20MB each
        </p>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-white/70">Uploaded:</p>
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-2">
              <div className="flex items-center gap-3">
                <span>🎵</span>
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-white/40">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
              </div>
              <button
                onClick={() => removeFile(idx)}
                className="text-white/40 hover:text-red-400 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Preset Selection */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white/70">Choose your vibe:</p>
        <div className="grid grid-cols-2 gap-3">
          {JERSEY_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => {
                setSelectedPreset(preset)
                setCustomBpm(preset.bpm)
              }}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedPreset.name === preset.name
                  ? 'border-jersey-pink bg-jersey-pink/10'
                  : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className="font-medium">{preset.name}</div>
              <div className="text-xs text-white/50 mt-1">{preset.description}</div>
              <div className="text-xs text-jersey-cyan mt-2">{preset.bpm} BPM · {preset.energy} energy</div>
            </button>
          ))}
        </div>
      </div>

      {/* BPM Slider */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium text-white/70">Target BPM</span>
          <span className="text-jersey-cyan font-mono">{customBpm}</span>
        </div>
        <input
          type="range"
          min="135"
          max="155"
          value={customBpm}
          onChange={(e) => setCustomBpm(Number(e.target.value))}
          className="w-full accent-jersey-pink"
        />
        <div className="flex justify-between text-xs text-white/40">
          <span>135</span>
          <span>145</span>
          <span>155</span>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={uploadedFiles.length === 0 || isGenerating}
        className="btn-primary w-full py-4 text-lg"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚡</span>
            Jersey-fying...
          </span>
        ) : (
          `🔥 Generate Jersey Beat (${uploadedFiles.length} track${uploadedFiles.length !== 1 ? 's' : ''})`
        )}
      </button>
    </div>
  )
}
