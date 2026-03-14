import { useState } from 'react'
import UploadZone from './components/UploadZone'
import PromptGenerator from './components/PromptGenerator'
import WaveformPlayer from './components/WaveformPlayer'
import GenerationQueue from './components/GenerationQueue'
import { useBeatStore } from './store/beatStore'

function App() {
  const [activeTab, setActiveTab] = useState('upload') // 'upload' | 'prompt'
  const { currentBeat, isGenerating } = useBeatStore()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-white/10 bg-jersey-dark/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 jersey-gradient rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
            <h1 className="text-xl font-bold">Jersey Beats</h1>
          </div>
          <div className="text-sm text-white/60">
            AI-Powered Jersey Club Generator
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="glass-panel p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('upload')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'upload'
                  ? 'jersey-gradient text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              🎵 Remix Upload
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-6 py-2 rounded-xl font-medium transition-all ${
                activeTab === 'prompt'
                  ? 'jersey-gradient text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              ✨ Generate from Prompt
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === 'upload' ? <UploadZone /> : <PromptGenerator />}
            
            {currentBeat && (
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-4">Your Jersey Beat</h3>
                <WaveformPlayer audioUrl={currentBeat.url} />
                <div className="flex gap-3 mt-4">
                  <a
                    href={currentBeat.url}
                    download
                    className="btn-primary flex-1 text-center"
                  >
                    Download Beat
                  </a>
                  <button className="btn-secondary">
                    🔄 Regenerate
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Queue & History */}
          <div className="space-y-6">
            <GenerationQueue />
            
            <div className="glass-panel p-6">
              <h3 className="text-lg font-semibold mb-4">Jersey Club Tips</h3>
              <ul className="space-y-2 text-sm text-white/70">
                <li>🥁 BPM: 140-150 for that bounce</li>
                <li>💥 Triplet kicks are essential</li>
                <li>🛏️ Bed squeak samples add flavor</li>
                <li>✂️ Chop vocals on the 3rd beat</li>
                <li>🔥 Build energy with risers</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
