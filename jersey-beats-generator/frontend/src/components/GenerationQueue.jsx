import { useBeatStore } from '../store/beatStore'

const STATUS_ICONS = {
  pending: '⏳',
  uploading: '📤',
  processing: '⚙️',
  generating: '✨',
  completed: '✅',
  failed: '❌'
}

const STATUS_COLORS = {
  pending: 'text-white/50',
  uploading: 'text-jersey-cyan',
  processing: 'text-jersey-purple',
  generating: 'text-jersey-pink',
  completed: 'text-green-400',
  failed: 'text-red-400'
}

export default function GenerationQueue() {
  const { queue, history, removeFromQueue, setCurrentBeat } = useBeatStore()

  return (
    <div className="glass-panel p-6 space-y-4">
      <h3 className="text-lg font-semibold">Generation Queue</h3>

      {queue.length === 0 && history.length === 0 ? (
        <div className="text-center py-8 text-white/40">
          <div className="text-3xl mb-2">🎵</div>
          <p className="text-sm">No beats yet. Upload or generate! 🎧</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {/* Active Queue */}
          {queue.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg p-3 border border-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className={STATUS_COLORS[item.status] || 'text-white/50'}>
                    {STATUS_ICONS[item.status] || '⏳'}
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {item.type === 'upload' 
                        ? `Remix: ${item.files?.[0] || 'Upload'}`
                        : 'Prompt Generation'
                      }
                    </p>
                    <p className={`text-xs ${STATUS_COLORS[item.status]}`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </p>
                  </div>
                </div>
                
                {item.status === 'completed' && item.result && (
                  <button
                    onClick={() => setCurrentBeat(item.result)}
                    className="text-xs text-jersey-cyan hover:underline"
                  >
                    View →
                  </button>
                )}
                
                {(item.status === 'failed' || item.status === 'completed') && (
                  <button
                    onClick={() => removeFromQueue(item.id)}
                    className="text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              {item.status === 'processing' && (
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full jersey-gradient animate-pulse w-2/3" />
                </div>
              )}
            </div>
          ))}

          {/* History */}
          {history.length > 0 && queue.length > 0 && (
            <div className="border-t border-white/10 pt-3 mt-3">
              <p className="text-xs text-white/40 mb-2">Recent</p>
            </div>
          )}

          {history.slice(0, 5).map((beat, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentBeat(beat)}
              className="w-full text-left bg-white/5 hover:bg-white/10 rounded-lg p-3 
                         border border-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>🎵</span>
                  <span className="text-sm truncate max-w-[150px]">
                    {beat.name || 'Jersey Beat'}
                  </span>
                </div>
                <span className="text-xs text-white/40">
                  {beat.bpm || '145'} BPM
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
