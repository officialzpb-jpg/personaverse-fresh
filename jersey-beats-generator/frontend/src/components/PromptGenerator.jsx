import { useState } from 'react'
import { useBeatStore } from '../store/beatStore'

const VIBE_TAGS = [
  'Bed squeaks', 'Triplet kicks', 'Chopped vocals', 'Heavy bass',
  'Risers', 'Trap influence', 'Baltimore bounce', 'TikTok viral',
  'Smooth R&B', 'Underground gritty', 'Festival energy', 'Late night'
]

const INSTRUMENT_OPTIONS = [
  '808s', 'Trap drums', 'Club kicks', 'Hi-hats', 'Open hats',
  'Snare rolls', 'Percussion', 'Synths', 'Bass', 'Vocal chops'
]

export default function PromptGenerator() {
  const [prompt, setPrompt] = useState('')
  const [selectedVibes, setSelectedVibes] = useState(['Bed squeaks', 'Triplet kicks'])
  const [selectedInstruments, setSelectedInstruments] = useState(['808s', 'Club kicks'])
  const [bpm, setBpm] = useState(145)
  const [duration, setDuration] = useState(30)
  
  const { generateFromPrompt, isGenerating } = useBeatStore()

  const toggleVibe = (vibe) => {
    setSelectedVibes(prev => 
      prev.includes(vibe) 
        ? prev.filter(v => v !== vibe)
        : [...prev, vibe]
    )
  }

  const toggleInstrument = (inst) => {
    setSelectedInstruments(prev => 
      prev.includes(inst)
        ? prev.filter(i => i !== inst)
        : [...prev, inst]
    )
  }

  const handleGenerate = async () => {
    const fullPrompt = buildPrompt()
    await generateFromPrompt(fullPrompt, {
      bpm,
      duration,
      vibes: selectedVibes,
      instruments: selectedInstruments
    })
  }

  const buildPrompt = () => {
    const parts = []
    
    if (prompt.trim()) {
      parts.push(prompt.trim())
    }
    
    parts.push(`Jersey Club beat at ${bpm} BPM`)
    
    if (selectedVibes.length > 0) {
      parts.push(`with ${selectedVibes.join(', ')}`)
    }
    
    if (selectedInstruments.length > 0) {
      parts.push(`featuring ${selectedInstruments.join(', ')}`)
    }
    
    parts.push(`${duration} seconds, high quality, professional production`)
    
    return parts.join('. ')
  }

  return (
    <div className="glass-panel p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Generate from Description</h2>
        <p className="text-white/60 text-sm">
          Describe the vibe or use our tags to craft the perfect Jersey Club beat. 
          AI will generate it from scratch.
        </p>
      </div>

      {/* Custom Prompt */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-white/70">Describe your vision (optional)</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Dark underground Jersey beat with heavy 808s, perfect for late night drives..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 
                     focus:border-jersey-pink focus:outline-none resize-none
                     placeholder:text-white/30"
          rows={3}
        />
      </div>

      {/* Vibe Tags */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white/70">Select vibes:</p>
        <div className="flex flex-wrap gap-2">
          {VIBE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleVibe(tag)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedVibes.includes(tag)
                  ? 'jersey-gradient text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Instruments */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-white/70">Key instruments:</p>
        <div className="flex flex-wrap gap-2">
          {INSTRUMENT_OPTIONS.map((inst) => (
            <button
              key={inst}
              onClick={() => toggleInstrument(inst)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                selectedInstruments.includes(inst)
                  ? 'bg-jersey-cyan text-jersey-dark font-medium'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {inst}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">BPM</span>
            <span className="text-jersey-cyan font-mono">{bpm}</span>
          </div>
          <input
            type="range"
            min="135"
            max="155"
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-jersey-pink"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium text-white/70">Duration</span>
            <span className="text-jersey-cyan font-mono">{duration}s</span>
          </div>
          <input
            type="range"
            min="15"
            max="60"
            step="5"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-jersey-pink"
          />
        </div>
      </div>

      {/* Preview Prompt */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <p className="text-xs text-white/50 mb-1">AI will generate:</p>
        <p className="text-sm text-white/80 italic">"{buildPrompt()}"</p>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="btn-primary w-full py-4 text-lg"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚡</span>
            Cooking up your beat...
          </span>
        ) : (
          '✨ Generate from Prompt'
        )}
      </button>
    </div>
  )
}
